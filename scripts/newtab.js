// ログインをするときに使うフラグ
var loggingIn = false;
var urls;

// 画像を表示する.
var slideImage = function() {
  var num = Math.floor( Math.random() * 50);
  console.log(urls[num]);
  document.getElementById('image').src = urls[num];
};
var showImages = function(geturls){
  urls = geturls;
  console.log(urls);
/*  $(urls).each(function() {
    $("<img>").attr("src", this).appendTo("#images");
  });
*/
  
  var inttime = 400;
  console.log("kita");
  slideImage();
  console.log("owta");
};




jQuery(function($) {
  // ログインがクリックされたら
  $(".login_link a").click(function(event) {
    // ログイン処理中にする
    loggingIn = true;
  });
  // ログインが終了し、ページの表示が変わったら
  document.addEventListener("webkitvisibilitychange", function() {
    // ページが開かれている かつ ログイン処理中
    if (!document.webkitHidden && loggingIn)
      // 画面をリロードする
      location.reload();
  });

  // ログイン状態(phpsessidがあるか)を確かめる -> background
  chrome.runtime.sendMessage({type: "getLoginStatus"}, function(loggedIn) {
    // ログイン状態だと
    if (loggedIn) 
      // .login_link は見えなくなる
      $("body").addClass('logged_in');

    // ログイン->ユーザーのブックマーク / 非ログイン->デイリーランキング    
    var type = loggedIn ? "getFavoritedIllusts" : "getDailyRanking";
    chrome.runtime.sendMessage({type: type}, function(response) {
      if (response.urls.length){
        console.log(response.urls);
        showImages(response.urls);
      }
      else {
        loggedIn = true;
        location.reload();
      }
      return;
    });
  });
});

