var loggingIn = false;

var showImages = function(urls){
  console.log(urls);
  $(urls).each(function() {
    $("<img>").attr("src", this).appendTo("#images");
  });
  
   //$("<img>").attr("src", urls[0]).appendTo("#images");
};
/*
chrome.runtime.sendMessage({type: "getURL"}, function(response) {
  console.log("new tab");
  console.log(response.urls);
  console.log("no error");
 // showImages(response.urls);
});
*/
jQuery(function($) {
  $(".login_link a").click(function(event) {
    loggingIn = true;
  });
  document.addEventListener("webkitvisibilitychange", function() {
    if (!document.webkitHidden && loggingIn)
      location.reload();
  });

  chrome.runtime.sendMessage({type: "getLoginStatus"}, function(loggedIn) {
    if (loggedIn) 
      $("body").addClass('logged_in');
    var type = loggedIn ? "getFavoritedIllusts" : "getDailyRanking";

    chrome.runtime.sendMessage({type: type}, function(response) {
        console.log("new tab");
        console.log(response.urls);
        console.log("no error");
        showImages(response.urls);
    });
  });
});



//Port: Could not establish connection. REceiving end does not exist.