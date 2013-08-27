// pixivのAPiを叩く
var getIllusts = function(callback, url) {
	$.get(url,　function(data) {
		var match = data.match(/"http:\/\/[^"]+?mw\.jpg[^"]*?"/g);
		// 画像を表示する
    var urls = $(match).map(function() {
      return this.replace(/^"|"$/g, "");
    });
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

// newtab -> DailyRankingのURL郡を返す -> newtab  
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
  if (request.type != "getDailyRanking") return;

  getDailyRanking(function(urls) {
    sendResponse({urls: urls});
  });
  return true;
});

// newtab -> FavoritedIllustsのURL郡を返す -> newtab
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
  if (request.type != "getFavoritedIllusts") return;

  getFavoritedIllusts(function(urls) {
    sendResponse({urls: urls});
  });
  return true;
});

// phpsessidの有無 -> newtab
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
  if (request.type != "getLoginStatus") return;

  sendResponse(localStorage.hasOwnProperty("phpsessid"));
});

// contentからphpsessidの中身が来る -> ある:中身を返す/ない:null
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
  if (request.type != "sendPHPSESSID") return;

  if (request.phpsessid) {
    console.log(request.phpsessid);
    // ローカルストレージに保存 
    localStorage.phpsessid = request.phpsessid;
  }
  else {
    // ローカルストレージの中身を消去
    localStorage.removeItem("phpsessid");
  }
});

