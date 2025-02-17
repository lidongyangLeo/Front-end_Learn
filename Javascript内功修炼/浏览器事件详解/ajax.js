const ajax = (option) => {
  // 处理obj
  const objToString = (data) => {
    data.t = new Date().getTime();
    let res = [];

    for (let key in data) {
      res.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
    }
    return res.join("&");
  };

  // 1. 创建异步对象

  var xmlHttp, timer;

  if (window.XMLHttpRequest) {
    xmlHttp = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    // IE
    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  // 2. 请求的设置

  let str = objToString(option.data || {});
  if (option.type.toLowerCase() === "get") {
    //  url 内容不能是中文
    xmlHttp.open(option.type, option.url + "?" + str, true);
    xmlHttp.send();
  } else if (option.type.toLowerCase() === "post") {
    xmlHttp.open(option.type, option.url, true);
    xmlHttp.setRequestHeader(
      "Content-type",
      "application/x-www-form-urlencoded"
    );
    // 发送请求
    xmlHttp.send(str);
  }

  if (option.timeout) {
    timer = setInterval(() => {
      xmlHttp.abort(); //中断请求
      clearInterval(timer);
    }, option.timeout);
  }
};

// 监听状态变化
xmlHttp.onreadystatechange = function (evt) {
  clearInterval(timer); // 清除定时器
  if (xmlHttp.readyState === 4) {
    const status = xmlHttp.status;
    if ((status >= 200 && status < 300) || status === 304) {
      option.success && option.success(xmlHttp.responseText); // 成功
    } else {
      option.error(xmlHttp.responseText); // 失败
    }
  }
};

ajax({
  type: "GET",
  url: "http://localhost:3000/posts",
  timeout: 1000,
  success: (data) => {},
  error: (data) => {},
});
