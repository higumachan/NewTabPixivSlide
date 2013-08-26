// Cookieを確認 phpsessid -> background
var match = document.cookie.match(/PHPSESSID=(.+?)(?:;|$)/);
if (match) {
  chrome.runtime.sendMessage({type: "sendPHPSESSID", phpsessid: match[1]});
  console.log("data " + match[1]);
  // background.jsに送りたい
  console.log("sended");
}
else {
  chrome.runtime.sendMessage({type: "sendPHPSESSID", phpsessid: null});
}

if (location.pathname == "/mypage.php" && location.hash == "#close_now")
  window.close();


/*

chrome.extension.sendRequest({type: "sendPHPSESSID"}, function(phpsessid) {
  console.log("sended" + phpsessid);
});

var phpsessid = cookie[15];
phpsessid.replace(/PHPSESSID/, "");  
console.log(phpsessid);
*/
/*
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
  if (request.type == "sendPixiv"){
    console.log("sendpi" + cookie);
    sendResponse(cookie);
  }
});
*_
/*
PHPSESSID=5055711_ab269e6a1e204674db2c623cc0249c99
PHPSESSID=5055711_150a229829883e6e8a52d05bab64501d

PHPSESSIDが違う、持ってない→ログインページ飛ばす

jQueryのPHPSESSIDを探す.
→ローカルストレージに保存
*/