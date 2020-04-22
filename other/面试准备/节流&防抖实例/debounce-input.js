function debounce(fn, wait) {
  let timeoutId = null;

  return function (...args) {
    if (timeout != null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = null;
    }, wait);
  };
}

function judgeInput(inputValue) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          resolve("可以使用");
        } else {
          reject("已存在");
        }
      }
    };

    xhr.open("GET", `www.baidu.com?name=${inputValue}`);
    xhr.send();
  });
}

const input = document.createElement("input");
input.onchange = debounce(judgeInput, 500);
