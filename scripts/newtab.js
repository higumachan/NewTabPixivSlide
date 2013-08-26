var showImages = function(urls){
  console.log(urls);
  $(urls).each(function() {
    $("<img>").attr("src", this).appendTo("#images");
  });
  
   //$("<img>").attr("src", urls[0]).appendTo("#images");
};

chrome.runtime.sendMessage({type: "getURL"}, function(response) {
  console.log("new tab");
  console.log(response.urls);
  console.log("no error");
  showImages(response.urls);
});

//Port: Could not establish connection. REceiving end does not exist.