var EventUtil = {
  addHandler: (element, type, handler) => {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent("on" + type, handler);
    } else {
      element["on" + type] = handler;
    }
  },
  removeHandler: (element, type, handler) => {
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.detachEvent("on" + type, handler);
    } else {
      element["on" + type] = handler;
    }
  },
};

var btn = document.getElementById("btn");
var handler = function (e) {
  console.log("first handler");
};
// 事件兼容性的处理。
EventUtil.addHandler(btn, "click", handler);

EventUtil.removeHandler(btn, "click", handler);
