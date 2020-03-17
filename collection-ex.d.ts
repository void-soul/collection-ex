declare namespace CollectionEx {
  class SetEx<T> {
    /**
     * 设置 当存在时作何操作? 回调
     * @memberof SetEx
     */
    set onExist(onExist: ((oldData: T, newData: T) => void) | undefined);
    /**
     * 设置主键
     * @memberof SetEx
     */
    set key(key: keyof T);
    /**
     * 设置当存在时是否覆盖？
     * @memberof SetEx
     */
    set replaceWhenExits(replaceWhenExits: boolean);
    /**
     * 设置 当不存在时作何操作
     * @memberof SetEx
     */
    set onNotExist(onNotExist: (newData: T) => void | undefined);
    /**
     * @param key 识别是否存在的对象的属性名
     */
    constructor (key: keyof T);
    /**
     * @param key 识别是否存在的对象的属性名
     * @param onExist 当存在时作何操作? oldData/newData 哪个将添加到set,由replaceItemWhenExits决定,默认是oldData生效
     */
    constructor (key: keyof T, onExist: (oldData: T, newData: T) => void);
    /**
     * @param key 识别是否存在的对象的属性名
     * @param onExist 当存在时作何操作? oldData/newData 哪个将添加到set,由replaceItemWhenExits决定,默认是oldData生效
     * @param replaceWhenExits 当存在时是否覆盖？
     */
    constructor (key: keyof T, onExist: (oldData: T, newData: T) => void, replaceWhenExits: boolean);
    /**
     * @param key 识别是否存在的对象的属性名
     * @param onExist 当存在时作何操作? oldData/newData 哪个将添加到set,由replaceItemWhenExits决定,默认是oldData生效
     * @param replaceWhenExits 当存在时是否覆盖？
     * @param values 初始数组
     */
    constructor (key: keyof T, onExist: (oldData: T, newData: T) => void, replaceWhenExits: boolean, values: ReadonlyArray<T>);
    /**
     * @param key 识别是否存在的对象的属性名
     * @param onExist 当存在时作何操作? oldData/newData 哪个将添加到set,由replaceItemWhenExits决定,默认是oldData生效
     * @param replaceWhenExits 当存在时是否覆盖？
     * @param values 初始数组
     * @param onNotExist 当不存在时作何操作?
     */
    constructor (key: keyof T, onExist: (oldData: T, newData: T) => void, replaceWhenExits: boolean, values: ReadonlyArray<T> | null, onNotExist: (newData: T) => void);
    /**
     * @param key 识别是否存在的对象的属性名
     * @param onExist 当存在时作何操作? oldData/newData 哪个将添加到set,由replaceItemWhenExits决定,默认是oldData生效
     * @param onNotExist 当不存在时作何操作?
     * @param replaceWhenExits 当存在时是否覆盖？
     * @param values 初始数组
     */
    constructor (param: {key: keyof T; onExist?: (oldData: T, newData: T) => void; onNotExist?: (newData: T) => void; replaceWhenExits?: boolean; values?: ReadonlyArray<T> | null})
    /**
     *
     * 添加返回 链式操作
     * @param {T} value
     * @returns {this}
     */
    add(value: T): this;
    /**
     *
     * 添加返回 链式操作
     * @param {...T[]} value
     * @returns {this}
     * @memberof SetEx
     */
    addAll(...value: T[]): this;
    /**
      * 添加并返回添加成功的对象:可能是新加入集合的，也可能是原本存在的
      * @param {T} value
      * @returns {this}
      */
    add2(value: T): T;
    /**
     * 添加并返回添加成功的对象:可能是新加入集合的，也可能是原本存在的
     * @param {...T[]} items
     * @returns {T[]}
     * @memberof SetEx
     */
    addAll2(...items: T[]): T[];
    /**
     * 用key找到匹配的第一个对象或者进行函数匹配
     * @param {T[keyof T]} key
     * @returns {(T | undefined)}
     * @memberof SetEx
     */
    get(key: T[keyof T]): T | undefined;
    /**
     * 删除key对应的对象
     * @param {*} value 这是对象的关键属性,而非对象
     * @returns {boolean}
     */
    delete(key: T[keyof T]): boolean;
    /**
     *
     * 用函数回调找到匹配的第一个对象
     * @param {(item: T) => boolean} fn
     * @returns {T}
     * @memberof SetEx
     */
    find(fn: (item: T, key?: string | undefined) => boolean): T | undefined;
    /**
     * 用函数回调找到匹配的所有对象
     * @param {(item: T) => boolean} fn
     * @returns {T[]}
     */
    filter(fn: (item: T, key?: string | undefined) => boolean): T[];
    /**
     * 是否存在key对应的对象
     * @param {*} value 这是对象的关键属性,而非对象
     * @returns {boolean}
     */
    has(key: T[keyof T]): boolean;
    /**
     * 转换为数组
     * @returns {T[]}
     * @memberof SetEx
     */
    toArray(): T[];
    /**
     * 所有的key转为数组
     * @returns {any[]}
     * @memberof SetEx
     */
    keys(): any[];
    /**
     * 清空
     * @memberof SetEx
     */
    clear(): void;
    /**
     * 条数
     * @returns {number}
     * @memberof SetEx
     */
    size(): number;
    /**
     * 返回迭代器
     * @returns {IterableIterator<[any, T]>}
     * @memberof SetEx
     */
    entries(): IterableIterator<[any, T]>;
    /**
     * 返回值的迭代器
     * @returns {IterableIterator<T>}
     * @memberof SetEx
     */
    valueEntries(): IterableIterator<T>;
    /**
     * 返回key的迭代器
     * @returns {IterableIterator<any>}
     * @memberof SetEx
     */
    keyEntries(): IterableIterator<any>;
    /**
     * 每个元素都满足函数，才返回true
     * @param {((item: T, key?: string | undefined) => boolean)} fn
     * @returns {boolean}
     * @memberof SetEx
     */
    every(fn: (item: T, key?: string | undefined) => boolean): boolean;
    /**
     * 有一个元素满足函数就返回true
     * @param {((item: T, key?: string | undefined) => boolean)} fn
     * @returns {boolean}
     * @memberof SetEx
     */
    some(fn: (item: T, key?: string | undefined) => boolean): boolean;
    /**
     * 函数迭代
     * @param {((item: T, key?: string | undefined) => void)} fn
     * @memberof SetEx
     */
    forEach(fn: (item: T, key?: string | undefined) => void): void;
    /**
     *
     * 重置
     * @param {({
      *     key?: keyof T;
      *     onExist?: (oldData: T, newData: T) => void | null;
      *     onNotExist?: (newData: T) => void | null;
      *     replaceWhenExits?: boolean;
      *   })} {key, onExist, onNotExist, replaceWhenExits}
      * @returns {this}
      * @memberof SetEx
      */
    reset({key, onExist, onNotExist, replaceWhenExits}: {
      key?: keyof T | undefined;
      onExist?: ((oldData: T, newData: T) => void | null) | undefined;
      onNotExist?: ((newData: T) => void | null) | undefined;
      replaceWhenExits?: boolean | undefined;
    }): this;

  }
  class MapEx<K, V> extends Map<K, V>{
    constructor ();
    /**
     * 从二维数组映射为一个map
     * @param {readonly} entries
     * @memberof MapEx
     */
    constructor (entries: readonly (readonly [K, V])[]);
    /**
     * 将一个class映射为一个map
     * @param {{[key: string]: any}} data
     * @memberof MapEx
     */
    constructor (data: {[key: string]: any});

    /**
     * 所有的键值对都满足返回true
     * @param fn
     */
    every(fn: (item: V, key?: K | undefined) => boolean): boolean;
    /**
     * 一个键值对满足就返回true
     * @param fn
     */
    some(fn: (item: V, key?: K | undefined) => boolean): boolean;
    /**
     * 查找匹配的第一个键值对
     * @param fn
     */
    find(fn: (item: V, key?: K | undefined) => boolean): [K, V] | undefined;
    /**
     * 查找匹配的所有键值对
     * @param fn
     */
    filter(fn: (item: V, key?: K | undefined) => boolean): [K, V][];
  }
  class MapClass<T> extends MapEx<string, T>{
    /**
     * 反向转换为一个class
     * @returns {T}
     * @memberof MapClass
     */
    toClass(): T;
  }
}
export = CollectionEx;
