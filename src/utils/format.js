export default {
  format(date) {
    let o = {
      "M+": new Date().getMonth() + 1,
      "d+": new Date().getDate(),
      "h+": new Date().getHours(),
      "m+": new Date().getMinutes(),
      "s+": new Date().getSeconds(),
      "q+": Math.floor((new Date().getMonth() + 3) / 3),
      "S+": new Date().getMilliseconds(),
    };
    if (/(y+)/.test(date))
      date = date.replace(
        RegExp.$1,
        (new Date().getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    for (var k in o)
      if (new RegExp("(" + k + ")").test(date))
        date = date.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? o[k]
            : ("00" + o[k]).substr(("" + o[k]).length)
        );
    return date;
  },
};
