/**
 * @ignore
 */
export function assertInstanceOf(val: any, Ctor: typeof val): true {
    if (val instanceof Ctor) {
        return true;
    }
    throw Object.assign(
        new Error(`Value ${val} not instance of constructor ${Ctor.name}`),
        { val, Ctor }
    );
}

/**
 * @ignore
 */
export function assertIsNotEmpty(val: any): true {
    if (val) {
        return true;
    }
    throw new Error(`${val} is empty`);
}
