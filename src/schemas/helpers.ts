import Joi = require('@hapi/joi');

export const J = Joi.defaults(x => x);

export function lazySchema(thunk: () => Joi.ObjectSchema) {
    return (value: any) => {
        J.assert(value, thunk(), {abortEarly: false});
        return value;
    };
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
