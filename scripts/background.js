// pixivの画像のURLを返す
var getIllusts = function(callback, url) {
	$.get(url,　function(data) {
		var match = data.match(/"http:\/\/[^"]+?mw\.jpg[^"]*?"/g);
		// 画像を表示する
    var urls = $(match).map(function() {
      return this.replace(/^"|"$/g, "");
    });
    //console.log("URL get SUCCESS!");
    //console.log(urls);
		callback(urls);
  });
};

var getDailyRanking = function (callback) {
  getIllusts(callback, "http://spapi.pixiv.net/iphone/ranking.php?mode=day");
};

var getFavoritedIllusts = function (callback) {
  getIllusts(callback,
    "http://spapi.pixiv.net/iphone/bookmark.php?PHPSESSID=" +
    encodeURIComponent(localStorage.phpsessid));
};

// newtab -> DailyRankingを返す  
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
  if (request.type != "getDailyRanking") return;

  getDailyRanking(function(urls) {
    sendResponse({urls: urls});
  });
  return true;
});

// newtab -> FavoritedIllustsを返す  
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
  if (request.type != "getFavoritedIllusts") return;

  getFavoritedIllusts(function(urls) {
    sendResponse({urls: urls});
  });
  return true;
});

// phpsessidがあるか -> newtab
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
  if (request.type != "getLoginStatus") return;

  sendResponse(localStorage.hasOwnProperty("phpsessid"));
});

// content -> phpsessid
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
  if (request.type != "sendPHPSESSID") return;

  if (request.phpsessid) {
    console.log(request.phpsessid);
    localStorage.phpsessid = request.phpsessid;
  }
  else {
    localStorage.removeItem("phpsessid");
  }
});

// http://spapi.pixiv.net/iphone/profile.php?PHPSESSID=
// もしphpsessidが無効ならレスポンスに<table class="profile-table">が入っていない、そしたら localStorage からログイン情報を　（あとはじぶんでかんがえよう）
// これをチェックするタイミングは getLoginStatus でいいと思う