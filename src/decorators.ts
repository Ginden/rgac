/**
 * @ignore
 */
export function CachedGetter<T extends object>(target: T, key: keyof T, descriptor: PropertyDescriptor): void {
    if (!descriptor.get) {
        throw new Error(`descriptor.get is not a function`);
    }
    const method: (this: T) => any = descriptor.get;
    descriptor.get = function (this: T): T[typeof key] {
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
export function NonEnumerable<T extends object>(target: T, key: string): void {
    const symbol = Symbol(`${target.constructor.name}.${key}`);
    Object.defineProperty(target, key, {
        set(this: any, val: any): void {
            this[symbol] = val;
        },
        get(this: any): unknown {
            return this[symbol];
        },
        enumerable: false,
        configurable: true,
    });
}
