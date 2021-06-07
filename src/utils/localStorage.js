// 操作 localStorage

// 设置的时候需要将对象转换成字符串
export const setLocal = (key, value) => {
  if (typeof value === "object") {
    value = JSON.stringify(value);
  }
  localStorage.setItem(key, value);
};

// 获取本地的值，需要转换成对象
export const getLocal = (key) => {
  let value = localStorage.getItem(key) || "";
  if (value.startsWith("[") || value.startsWith("{")) {
    return JSON.parse(value);
  } else {
    return value;
  }
};
