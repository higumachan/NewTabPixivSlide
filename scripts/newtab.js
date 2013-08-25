var showImages = function(urls){
  $(urls).each(function() {
    $("<img>").attr("src", this).appendTo("#images");
  });
};

chrome.runtime.sendMessage({type: "getURL"}, function(response) {
  console.log("new tab");
  console.log(response.urls);
  showImages(response.urls);
});

