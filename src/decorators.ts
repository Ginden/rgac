/**
 * @ignore
 */
export function CachedGetter<T extends object>(target: T, key: PropertyKey, descriptor: PropertyDescriptor) {
    if (!descriptor.get) {
        throw new Error(`descriptor.get is not a function`);
    }
    const method: (this: T) => any = descriptor.get;
    descriptor.get = function (this: T) {
        const ret: any = method.call(this);
        Object.defineProperty(this, key, {
            value: ret,
            writable: false,
        });
        return ret;
    };
}

/**
 * @ignore
 */
export function NonEnumerable(target: any, key: string) {
    const symbol = Symbol(`${target.constructor.name}.${key}`);
    Object.defineProperty(target, key, {
        set(this: any, val: any) {
            this[symbol] = val;
        },
        get(this: any) {
            return this[symbol];
        },
        enumerable: false,
        configurable: true,
    });
}
