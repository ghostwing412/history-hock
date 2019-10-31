/**
 * 历史队列虚拟插件
 * @demo 1、window.historyQueue.init(function(queueItem){})
 * 2、在打开虚拟页面的地方window.historyQueue.push(title, 页面object)
 */
!(function (window) {
  var historyQueue = function () {
    this.index = 0;
    this.queue = [];
  };
  /**
   * 许哟的地方将虚拟页面推入历史队列
   * @param title
   * @param obj
   */
  historyQueue.prototype.push = function (title, obj) {
    // console.log('push+++++++++++++');
    this.index++;
    var state = {
      title: title,
      url: "#",
    };
    this.queue.unshift({
      title: title
      , obj: obj
    });
    window.history.pushState(state, title, "#");
    // console.log(window.history);
  };
  /**
   * 初始化历史队列
   * @param listener 监听函数
   */
  historyQueue.prototype.init = function (listener) {
    var _that = this;
    window.addEventListener("popstate", function (e) {
      var hashLocation = window.location.hash; // 获取点击后的页面的hash值
      var hashSplit = hashLocation.split("#!/"); // 将哈希值装进数组（这里可以在控制台打印看效果）
      var hashName = hashSplit[1]; // 取数组的第一个
      if (hashName === undefined) {
        var queueItem = _that.queue.shift();
        if(queueItem){
          // console.log('title:'+queueItem.title);
          // if(queueItem.title === 'base'){
          //   history.go(-1);
          // }else{
            listener(queueItem);
          // }
        }else{
          history.back();
          // console.log("queueItem undefined");
        }
      }else{
        // console.log('hashName:'+hashName)
      }
    }, false);
    // this.push("base");
  };
  if(!window.historyQueue){
    window.historyQueue = new historyQueue();
  }
})(window);
