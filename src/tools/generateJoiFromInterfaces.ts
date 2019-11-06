import { join } from 'path';
import * as ts from 'typescript';
import _ = require('lodash');
import { readdirSync, readFileSync, writeFileSync } from 'fs';

// import {inspect} from 'util';

function recursiveSearchPath(dir: string): string[] {
    return _.flattenDeep(readdirSync(dir, { withFileTypes: true })
        .map(e => {
            if (e.isFile()) {
                return join(dir, e.name);
            } else if (e.isDirectory()) {
                return recursiveSearchPath(join(dir, e.name));
            } else {
                return null;
            }
        })
        .filter(Boolean) as (string | string[])[]);
}

function getEscapedName(id: ts.Identifier): string {
    if (_.isString(id)) {
        return id;
    } else if (id && 'escapedText' in id) {
        return (id as any).escapedText;
    } else {
        throw new Error(String(id));
    }
}

type TypeInfo = {
    arrayDepth: number;
    name: string;
    isDictionary?: boolean;
    node?: any;
};

type MemberInfo = {
    isOptional: boolean;
    type: TypeInfo;
    name: string;
};

function getJoiTypeInfo(
    mi: MemberInfo,
    enumNames: Set<string>,
    interfaceNames: Set<string>
): string {
    if (mi.type.isDictionary) {
        return `J.object().pattern(J.string(), ${getJoiTypeInfo(
            {
                ...mi,
                type: { name: mi.type.name, arrayDepth: mi.type.arrayDepth - 1 }
            },
            enumNames,
            interfaceNames
        )})`;
    }
    if (mi.type.arrayDepth > 0) {
        return `J.array().items(${getJoiTypeInfo(
            {
                ...mi,
                type: { name: mi.type.name, arrayDepth: mi.type.arrayDepth - 1 }
            },
            enumNames,
            interfaceNames
        )})`;
    }
    if (mi.type.name === 'any') {
        return 'J.any()';
    } else if (mi.type.name === 'number') {
        return 'J.number()';
    } else if (mi.type.name === 'string') {
        return `J.string().allow('')`;
    } else if (mi.type.name === 'boolean') {
        return 'J.boolean()';
    } else if (enumNames.has(mi.type.name)) {
        return `J.any().valid(...new Set(getEnumValues(${mi.type.name})))`;
    } else if (interfaceNames.has(mi.type.name)) {
        return `J.any().custom(lazySchema(() =>${mi.type.name}Schema))`;
    } else {
        console.error(mi);
        return 'J.any()';
        //throw new Error(mi.name);
    }
}

export function generateSchemas(
    sourceFile: ts.SourceFile
): { imports: string[]; schemaText: string } {
    const interfaces: { name: string; members: MemberInfo[] }[] = [];
    const enumNames: Set<string> = new Set<string>();

    delintNode(sourceFile);

    function getType(member: any): TypeInfo {
        const type: any = member.type;
        switch (type.kind as ts.SyntaxKind) {
            case ts.SyntaxKind.StringKeyword:
                return {
                    name: 'string',
                    arrayDepth: 0
                };
                break;
            case ts.SyntaxKind.NumberKeyword:
                return {
                    name: 'number',
                    arrayDepth: 0
                };
                break;
            case ts.SyntaxKind.BooleanKeyword:
                return {
                    name: 'boolean',
                    arrayDepth: 0
                };
                break;
            case ts.SyntaxKind.ArrayType:
                if (ts.isArrayTypeNode(type)) {
                    const { arrayDepth, name: typeName } = getType({
                        type: type.elementType
                    });
                    return {
                        name: typeName,
                        arrayDepth: arrayDepth + 1
                    };
                }
                break;
            case ts.SyntaxKind.TypeReference:
                const name = getEscapedName((type as any).typeName);
                if (name === 'Dictionary') {
                    const [typeArgument] = type.typeArguments;
                    if (typeArgument.typeName) {
                        return {
                            name: getType({ type: typeArgument }).name,
                            isDictionary: true,
                            arrayDepth: 0
                        };
                    } else {
                        return {
                            name: getType({ type: { kind: typeArgument.kind } })
                                .name,
                            isDictionary: true,
                            arrayDepth: 0
                        };
                    }
                }
                return {
                    name: name,
                    arrayDepth: 0
                };
                break;
        }
        console.error(member);
        return {
            name: 'any',
            arrayDepth: 0,
            node: member
        };
        // throw new Error(ts.SyntaxKind[type.kind]);
    }

    function delintNode(node: ts.Node) {
        if (ts.isInterfaceDeclaration(node)) {
            // @ts-ignore
            interfaces.push({
                name: getEscapedName(node.name),
                members: node.members.map(member => {
                    const { questionToken } = member;
                    return {
                        isOptional: !!questionToken,
                        type: getType(member),
                        name: getEscapedName((member as any).name)
                    };
                })
            });
        } else if (ts.isEnumDeclaration(node)) {
            enumNames.add(getEscapedName(node.name));
        }
        ts.forEachChild(node, delintNode);
    }

    const interfaceNames = new Set(interfaces.map(e => e.name));
    const usedEnums: Set<string> = new Set<string>();
    return {
        schemaText: interfaces
            .map(interf => {
                return `export const ${interf.name}Schema: Joi.ObjectSchema = J.object({\n`
                    .concat(
                        interf.members
                            .map((e: MemberInfo) => {
                                const joiTypeInfo: string = getJoiTypeInfo(
                                    e,
                                    enumNames,
                                    interfaceNames
                                );
                                if (enumNames.has(e.type.name)) {
                                    usedEnums.add(e.type.name);
                                }
                                return `  ${e.name}: ${joiTypeInfo}.${
                                    e.isOptional
                                        ? 'allow(null).optional()'
                                        : 'required()'
                                }`;
                            })
                            .join(',\n')
                    )
                    .concat(`\n}).id('${interf.name}');`)
                    .concat('\n');
            })
            .join('\n\n'),
        imports: [...usedEnums]
    };
}

(async () => {
    const entries = recursiveSearchPath(
        join(process.cwd(), 'src', 'apiInterfaces')
    )
        .map(p => readFileSync(p, 'utf8'))
        .join('\n\n')
        .split('\n')
        .filter(line => !line.includes(`export * from`))
        .join('\n');
    Object.assign(ts, {});

    const sourceFile = ts.createSourceFile(
        'api-interfaces.ts',
        entries,
        ts.ScriptTarget.ES2019,
        true
    );

    // generateSchemas it
    const { imports, schemaText } = generateSchemas(sourceFile);
    const content: string = `
    import Joi = require('@hapi/joi');
    import {J, getEnumValues, lazySchema} from './helpers';
    import {
    ${_.chunk([...imports], 3)
        .map(chunk => chunk.join(', '))
        .join(',\n')}
    } from '../apiInterfaces';

    `
        .trim()
        .concat('\n\n', schemaText);

    writeFileSync(
        join(process.cwd(), 'src', 'schemas', 'generated.ts'),
        content
    );
})()
    .then(() => console.log('Generated schemas from interfaces'))
    .then(() => process.exit())
    .catch(e => {
        setImmediate(() => {
            throw e;
        });
    });
