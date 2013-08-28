// ログインをするときに使うフラグ
var loggingIn = false;

var setImages = function(urls){
  console.log("set" , urls);
  $(urls).each(function() {
    $("<img>").attr("src", this).appendTo(".bgmaximage");
    /* 
    <img src="hogehoge"> として追加されているみたいだが、
    class="bgmaximage"にはなってないみたい.
    var tmp = ;
    console.log($("img").attr("src")); # => http://i2.pixiv.net/img54/img/asukaziye/mobile/38074165_480mw.jpg 
    console.log($(".bgmaximage").attr("src")); # => undefined 
    */
  });
};

var slideImage = function(){
  console.log("kiteru");
  $("img").attr('class', 'tst');
  console.log($("div").attr("src"));
  console.log($(".bgmaximage").attr("src"));
  $('img.bgmaximage').maxImage({
    isBackground: true,
    slideShow: true,
    slideShowTitle: false,
    slideDelay: 5,
    overflow: 'auto',
    verticalAlign:'top'
  });
};

// 画像を表示
var showImages = function(urls){
  console.log(urls);
  // 画像をimgタグに突っ込む
  $("#no_bookmark_urls").show();
  setImages(urls);
  // 画像をスライドさせる
  slideImage();
};


var getIllust = function(type){
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

