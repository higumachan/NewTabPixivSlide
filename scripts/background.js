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

var checkValidPHPSESSID = function (callback, url){
  var state = false;
  $.get(url,　function(data) {
    if (data === null)
      state = true;
    console.log(data);
  });
  console.log(state);
  callback(state);
};

var getFavoritedIllusts = function (callback) {
  var checkurl = "http://spapi.pixiv.net/iphone/bookmark.php?c_mode=count&PHPSESSID=" +
    encodeURIComponent(localStorage.phpsessid);

  $.get(checkurl,　function(data) {
    if (data === "" || data === "0"){
      if (data === ""){
        localStorage.removeItem("phpsessid");
      }
      callback(data);
      return;
    }
    console.log(localStorage.phpsessid);
  });

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
    //console.log(typeof {usls: usls});
    sendResponse({urls: urls});
  });
  return true;
});

/*
function validPHPSESSID = function(){
  var src = "http://spapi.pixiv.net/iphone/profile.php?PHPSESSID=" +  encodeURIComponent(localStorage.phpsessid);
  var valid = document.getElementsByTagName(src."table"); ? true : false;
});
*/

// phpsessidの有無 -> newtab
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
  if (request.type != "getLoginStatus") return;

  sendResponse(localStorage.hasOwnProperty("phpsessid"));
});

// contentからphpsessidの中身が来る -> ある:中身をlocalStrageに保存/ない:logalStrageを消去
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
