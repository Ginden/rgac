/**
 * @ignore
 */
export function assertInstanceOf(val: unknown, Ctor: Function): true {
    if (val instanceof Ctor) {
        return true;
    }
    throw Object.assign(new Error(`Value ${val} not instance of constructor ${Ctor.name}`), { val, Ctor });
}

/**
 * @ignore
 */
export function assertIsNotEmpty(val: unknown): true {
    if (val) {
        return true;
    }
    throw new Error(`${val} is empty`);
}
