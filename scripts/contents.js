// Cookieを確認 phpsessidを送る -> background
var match = document.cookie.match(/PHPSESSID=(.+?)(?:;|$)/);
if (match) {
  // Cookieから取得したphpsessidを渡す.
  // match[0]:PHPSESSID=aaa~~
  // match[1]:aaa~~
  chrome.runtime.sendMessage({type: "sendPHPSESSID", phpsessid: match[1]});
  console.log("sended"+ match[1]);
}
else {
  // nullを渡す.
  chrome.runtime.sendMessage({type: "sendPHPSESSID", phpsessid: null});
}

// ログインし終わったら http://www.pixiv.net/mypage.php#close_now に飛ぶ(HTMLに記述)ので、ウィンドウを閉じる
if (location.pathname == "/mypage.php" && location.hash == "#close_now")
  window.close();
