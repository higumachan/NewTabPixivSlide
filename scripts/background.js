// pixivのAPI叩く
var getURL = function(callback) {
	$.get("http://spapi.pixiv.net/iphone/ranking.php?mode=day",　function(data) {
		var match = data.match(/"http:\/\/[^"]+?mw\.jpg[^"]*?"/g);
		// 画像を表示する
    var urls = $(match).map(function() {
      return this.replace(/^"|"$/g, "");
    });
    console.log("URL get SUCCESS!");
    console.log(urls);
		callback(urls);
  });
};

// newtab.jsに受け取る.
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
  if (request.type == "getURL") {
    console.log("to get URL Message");
    getURL(function(urls) {
      console.log(urls);
      sendResponse({urls: urls});
    });
    return true;
  }
});

