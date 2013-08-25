// pixivのAPI叩く
var getURL = function(callback) {
	$.get("http://spapi.pixiv.net/iphone/ranking.php?mode=day",　function(data) {
		var match = data.match(/"http:\/\/[^"]+?mw\.jpg[^"]*?"/g);
		// 画像を表示する
		// document.getElementById("images").src = match[0];
    var urls = $(match).map(function() {
      return this.replace(/^"|"$/g, "");
    });
		callback(urls);
    console.log(urls);
  });
};

chrome.runtime.onInstalled.addListener(function () {
  // newtab.jsに受け取る.
  chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
    if (request.type == "getURL") {
      getURL(function(urls) {
        sendResponse({urls: urls});
      });
      return true;
    }
  });


  // 右上のボタンが押された時
  chrome.browserAction.onClicked.addListener(function () {
    chrome.tabs.create({
    　 url: chrome.extension.getURL("newtab/newtab.html")
    });
  });
});

