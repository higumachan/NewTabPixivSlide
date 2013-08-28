// ログインをするときに使うフラグ
var loggingIn = false;
var urls;

// 画像を1枚ずつ表示する.
var slideImage = function() {
  var num = Math.floor( Math.random() * urls.length);
  console.log(urls[num]);

  document.getElementById('image').src = urls[num];
};

// 画像を表示
var showImages = function(geturls){
  urls = geturls;
  console.log(urls);
  $(urls).each(function() {
    $("<img>").attr("src", this).appendTo(".image");
  });
/*
  $(function(){
    $('img.image').maxImage({
      isBackground: true,
      slideShow: true,
      slideShowTitle: false,
      slideDelay: 5,
      overflow: 'auto',
      verticalAlign:'top'
    });
  });*/
};

var getIllust = function(type){
//  while (loop){
  console.log("kita");
  chrome.runtime.sendMessage({type: type}, function(response) {
    if (response.urls === "0"){
      var obj= document.getElementById("no_bookmark_urls");
      obj.style.display = "";
      type = "getDailyRanking";
      getIllust(type);
    }
    else if (response.urls.length){
      loop = false;
      console.log(response.urls);
      showImages(response.urls);
    }
    else {
      // いると思ったんだが
      // loggedIn = true; 
      console.log(typeof response.urls);
      console.log("reload前");
      location.reload();
    }
    return;
  });
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
    var loop = true;
    var type = loggedIn ? "getFavoritedIllusts" : "getDailyRanking";
    getIllust(type);
  });
});

