export const deepClone = (obj: any, cache = new WeakMap()) => {
  // 判断是否是引用数据类型，基础数据类型本身就是地址拷贝
  if (obj === null || typeof obj !== "object") return obj;
  if (obj instanceof Date) return new Date(obj); // 处理时间函数
  if (obj instanceof RegExp) return new RegExp(obj); // 处理正则
  // 判断是否存在循环引用
  if (cache.get(obj)) return cache.get(obj);

  // 判断是数组还是对象
  const result = obj instanceof Array ? [] : ({} as any);
  //
  cache.set(obj, result);
  // 将每个源对象和拷贝的对象存到cache中，上面判断cache中是否存在循环引用
  for (const key in obj) {
    if (obj[key] && typeof obj[key] === "object") {
      result[key] = deepClone(obj[key], cache);
    } else {
      result[key] = obj[key];
    }
  }
  return result;
};

// 节流
export const throttle = function (func: Function, wait: number, options: any) {
  // 并且不能不能同时设置 leading 和 trailing 都为false
  let timer: any;
  let previous = 0;
  if (!options) options = {};
  return function (this: unknown, ...args: any) {
    const now = new Date().getTime();

    //
    // 控制是否，一进入就执行
    if (!previous && options.leading === false) {
      previous = now;
    }
    if (now - previous > wait) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      func.apply(this, args);

      previous = now;
    } else if (!timer && options.trailing !== false) {
      // 控制离开后是否还执行最后一次
      timer = setTimeout(() => {
        func.apply(this, args);
        timer = null;
        previous = new Date().getTime();
      }, wait);
    }
  };
};
// 防抖，防止许连续操作
export const debounce = function (
  func: Function,
  wait: number,
  immediate?: boolean
) {
  let timer: any;
  let result: Function;
  const debounced = function (this: unknown, ...args: any) {
    // 核心1：清除上一次的定时器
    if (timer) clearTimeout(timer);
    // 如果立即执行
    if (immediate) {
      const callNow = !timer;
      timer = setTimeout(() => {
        // 此处如果添加，在一开始立即执行，wait之后还会再次执行一次
        // func.apply(this, args);
        timer = null;
      }, wait);
      if (callNow) result = func.apply(this, args);
    } else {
      timer = setTimeout(() => {
        // 核心2：修改this指向，参数传递
        func.apply(this, args);
      }, wait);
    }
    return result;
  };

  debounced.cancel = function () {
    clearTimeout(timer);
    timer = null;
  };

  return debounced;
};

export const isExternal = (path: string) => {
  return /^(https?:|mailto:|tel:)/.test(path);
};

export const urlToBlob = (theUrl: string, callback: any) => {
  const xhr = new XMLHttpRequest(); // 初始化实例对象
  xhr.open("get", theUrl, true); // 初始化一个异步请求
  xhr.responseType = "blob"; // 实例返回类型/ArrayBuffer/Blob/Document;
  // eslint-disable-next-line func-names
  xhr.onload = function () {
    if (this.status === 200) {
      if (callback) {
        callback(this.response);
      }
    }
  };
  xhr.send();
};
/**
 * @description base64转换为blob类型
 */
export const base64ToBlob = (code: string) => {
  const parts = code.split(";base64,");
  const contentType = parts[0].split(":")[1];
  const raw = window.atob(parts[1]);
  const rawLength = raw.length;
  const uInt8Array = new Uint8Array(rawLength);
  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }
  return new Blob([uInt8Array], { type: contentType });
};
