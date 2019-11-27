import Joi = require('@hapi/joi');

export const J = Joi.defaults(x => x);

export function referenceSchema(thunk: () => Joi.ObjectSchema): Joi.AnySchema {
    return J.any().custom((value: any) => {
        J.assert(value, thunk(), { abortEarly: false, debug: true });
        return value;
    });
}

/**
 *
 * @param obj
 */
export function getEnumValues(obj: any): any[] {
    return Object.keys(obj)
        .filter(k => !Number.isFinite(Number(k))) // Ignore numeric keys
        .map(k => obj[k]);
}

export function enumSchema(en: object): Joi.AnySchema {
    return J.any().valid(...new Set(getEnumValues(en)));
}
