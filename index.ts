export class SetEx<T> {
  private uniqueKey: keyof T;
  private _onExist?: (oldData: T, newData: T) => void;
  private _onNotExist?: (newData: T) => void;
  private _replaceWhenExits: boolean;
  private _data: Map<any, T>;

  /**
   * @param key 识别是否存在的对象的属性名
   * @param onExist 当存在时作何操作? oldData/newData 哪个将添加到set,由replaceItemWhenExits决定,默认是oldData生效
   * @param onNotExist 当不存在时作何操作?
   * @param replaceWhenExits 当存在时是否覆盖？
   * @param values 初始数组
   */
  constructor (
    key: keyof T | {
      key: keyof T;
      onExist?: (oldData: T, newData: T) => void;
      onNotExist?: (newData: T) => void;
      replaceWhenExits?: boolean;
      values?: ReadonlyArray<T> | null;
    },
    onExist?: (oldData: T, newData: T) => void,
    replaceWhenExits = false,
    values?: ReadonlyArray<T> | null,
    onNotExist?: (newData: T) => void
  ) {
    this._data = new Map();
    if (typeof key === 'object') {
      this._onExist = key.onExist;
      this.uniqueKey = key.key;
      this._replaceWhenExits = key.replaceWhenExits === true;
      this._onNotExist = key.onNotExist;
      if (key.values) {
        this.addAll(...key.values);
      }
    } else {
      this._onExist = onExist;
      this.uniqueKey = key;
      this._replaceWhenExits = replaceWhenExits;
      this._onNotExist = onNotExist;
      if (values) {
        this.addAll(...values);
      }
    }
  }
  /**
   *
   * 添加返回 链式操作
   * @param {T} value
   * @returns {this}
   */
  add(value: T): this {
    this.addAll2(value);
    return this;
  }
  /**
   *
   * 添加返回 链式操作
   * @param {...T[]} value
   * @returns {this}
   * @memberof SetEx
   */
  addAll(...value: T[]): this {
    this.addAll2(...value);
    return this;
  }
  /**
    * 添加并返回添加成功的对象:可能是新加入集合的，也可能是原本存在的
    * @param {T} value
    * @returns {this}
    */
  add2(value: T): this {
    this.addAll2(value);
    return this;
  }
  /**
   * 添加并返回添加成功的对象:可能是新加入集合的，也可能是原本存在的
   * @param {...T[]} items
   * @returns {T[]}
   * @memberof SetEx
   */
  addAll2(...items: T[]): T[] {
    const result = new Array<T>();
    for (const value of items) {
      const key = value[this.uniqueKey];
      if (this._data.has(key)) {
        if (this._onExist) {
          this._onExist(this._data.get(key)!, value);
        }
        if (this._replaceWhenExits === true) {
          this._data.set(key, value);
        }
      } else {
        if (this._onNotExist) {
          this._onNotExist(value);
        }
        this._data.set(key, value);
      }
      result.push(this._data.get(key)!);
    }
    return result;
  }
  /**
   * 用key找到匹配的第一个对象或者进行函数匹配
   * @param {T[keyof T]} key
   * @returns {(T | undefined)}
   * @memberof SetEx
   */
  get(key: T[keyof T]): T | undefined {
    return this._data.get(key);
  }
  /**
   * 删除key对应的对象
   * @param {*} value 这是对象的关键属性,而非对象
   * @returns {boolean}
   */
  delete(key: T[keyof T]): boolean {
    return this._data.delete(key);
  }
  /**
   *
   * 用函数回调找到匹配的第一个对象
   * @param {(item: T) => boolean} fn
   * @returns {T}
   * @memberof SetEx
   */
  find(fn: (item: T, key?: string) => boolean): T | undefined {
    let result: T | undefined;
    this._data.forEach((item, key) => {
      if (fn(item, key) === true) {
        result = item;
        return false;
      }
    });
    return result;
  }
  /**
   *
   * 用函数回调找到匹配的所有对象
   * @param {(item: T) => boolean} fn
   * @returns {T[]}
   */
  filter(fn: (item: T, key?: string) => boolean): T[] {
    const result = new Array<T>();
    this._data.forEach((item, key) => {
      if (fn(item, key) === true) {
        result.push(item);
      }
    });
    return result;
  }
  /**
   *
   * 是否存在key对应的对象
   * @param {*} value 这是对象的关键属性,而非对象
   * @returns {boolean}
   */
  has(key: T[keyof T]): boolean {
    return this._data.has(key);
  }

  toArray(): T[] {
    return Array.from(this._data.values());
  }

  keys(): any[] {
    return Array.from(this._data.keys());
  }

  clear() {
    this._data.clear();
  }

  size() {
    return this._data.size;
  }

  entries() {
    return this._data.entries();
  }

  valueEntries() {
    return this._data.values();
  }

  keyEntries() {
    return this._data.keys();
  }

  every(fn: (item: T, key?: string) => boolean) {
    let result = true;
    this._data.forEach((item, key) => {
      if (fn(item, key) === false) {
        result = false;
        return false;
      }
    });
    return result;
  }

  some(fn: (item: T, key?: string) => boolean) {
    let result = false;
    this._data.forEach((item, key) => {
      if (fn(item, key) === true) {
        result = true;
        return false;
      }
    });
    return result;
  }

  forEach(fn: (item: T, key?: string) => void) {
    this._data.forEach((item, key) => {
      fn(item, key);
    });
  }

  /**
   *
   * 重置
   * @param {({
   *     key?: keyof T;
   *     onExist?: (oldData: T, newData: T) => void;
   *     onNotExist?: (newData: T) => void;
   *     replaceWhenExits?: boolean;
   *   })} {key, onExist, onNotExist, replaceWhenExits}
   * @returns {this}
   * @memberof SetEx
   */
  reset({key, onExist, onNotExist, replaceWhenExits}: {
    key?: keyof T;
    onExist?: (oldData: T, newData: T) => void;
    onNotExist?: (newData: T) => void;
    replaceWhenExits?: boolean;
  }): this {
    if (onExist !== undefined) {
      this._onExist = onExist;
    }
    if (onNotExist !== undefined) {
      this._onNotExist = onNotExist;
    }
    if (key) {
      this.uniqueKey = key;
    }
    if (replaceWhenExits !== undefined) {
      this._replaceWhenExits = replaceWhenExits;
    }
    this.clear();
    return this;
  }

  set onExist(onExist: ((oldData: T, newData: T) => void) | undefined) {
    this._onExist = onExist;
  }
  set key(key: keyof T) {
    this.uniqueKey = key;
  }
  set replaceWhenExits(replaceWhenExits: boolean) {
    this._replaceWhenExits = replaceWhenExits;
  }
  set onNotExist(onNotExist: (newData: T) => void | undefined) {
    this._onNotExist = onNotExist;
  }
}
export class MapEx<K, V> extends Map<K, V> {
  constructor (entries?: readonly (readonly [K, V])[] | {[key: string]: any}) {
    super(entries ? (Array.isArray(entries) ? entries : Object.entries(entries)) : undefined);
  }

  every(fn: (item: V, key?: K) => boolean) {
    let result = true;
    this.forEach((item, key) => {
      if (fn(item, key) === false) {
        result = false;
        return false;
      }
    });
    return result;
  }

  some(fn: (item: V, key?: K) => boolean) {
    let result = false;
    this.forEach((item, key) => {
      if (fn(item, key) === true) {
        result = true;
        return false;
      }
    });
    return result;
  }
  /**
 *
 * 用函数回调找到匹配的第一个对象
 * @param {(item: T) => boolean} fn
 * @returns {T}
 * @memberof SetEx
 */
  find(fn: (item: V, key?: K) => boolean): [K, V] | undefined {
    let result: [K, V] | undefined;
    this.forEach((item, key) => {
      if (fn(item, key) === true) {
        result = [key, item];
        return false;
      }
    });
    return result;
  }
  /**
   *
   * 用函数回调找到匹配的所有对象
   * @param {(item: T) => boolean} fn
   * @returns {T[]}
   */
  filter(fn: (item: V, key?: K) => boolean): Array<[K, V]> {
    const result = new Array<[K, V]>();
    this.forEach((item, key) => {
      if (fn(item, key) === true) {
        result.push([key, item]);
      }
    });
    return result;
  }
}
export class MapClass<T> extends MapEx<string, T> {
  /**
   *
   * 反向转换为class
   * @returns {T}
   */
  toClass(): T {
    const result: {[key: string]: any} = {};
    for (const [key, value] of this.entries()) {
      result[key] = value;
    }
    return result as T;
  }
}
