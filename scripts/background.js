// pixivのAPiを叩く
var getIllusts = function(callback, url) {
	$.get(url,　function(data) {
		var match = data.match(/"http:\/\/[^"]+?mw\.jpg[^"]*?"/g);
		// 画像を表示する
    var urls = $(match).map(function() {
      return this.replace(/^"|"$/g, "");
    });
    console.log("urls get" + urls);
    callback(urls);
  });
};

var getDailyRanking = function (callback) {
  getIllusts(callback, "http://spapi.pixiv.net/iphone/ranking.php?mode=day");
};

var checkValidPHPSESSID = function (url, callback){
  $.get(url,　function(data) {
    var state = true;
    console.log(data);
    if (data === "" || data === "0"){
      state = false;
    }
    callback(state);
  });
};

var getFavoritedIllusts = function (callback) {
  // PHPSESSIDが有効かチェック
  var checkurl = "http://spapi.pixiv.net/iphone/bookmark.php?c_mode=count&PHPSESSID=" +
    encodeURIComponent(localStorage.phpsessid);
  var state;
  checkValidPHPSESSID(checkurl, function(callback){
    state = callback;

    // 有効:ブックマーク画像を表示 
    if (state){
      console.log(state);
      getIllusts(callback,
      "http://spapi.pixiv.net/iphone/bookmark.php?PHPSESSID=" +
      encodeURIComponent(localStorage.phpsessid));
    }
    // 無効:
    else {
      console.log("mujki- kita");
      localStorage.removeItem("phpsessid");
    }
  });

  /*
  $.get(checkurl,　function(data) {
    if (data === ""){
      localStorage.removeItem("phpsessid");
      callback = null;
      return;
    }
    console.log(localStorage.phpsessid);
  });
  */
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
