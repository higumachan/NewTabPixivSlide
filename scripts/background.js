// pixivのAPI叩く
$(function () {
	var $images = $("#images");
	var match;
	$.get("http://spapi.pixiv.net/iphone/ranking.php?mode=day",
		function (data) {
			console.log("oooooo");
			var comp = /http:\/\/(.+?)mw\.jpg/g;
			match = data.match(comp);
			$images.val(match[0]);
		});
	console.log(match);
});

 
 // 右上のボタンが押された時
chrome.browserAction.onClicked.addListener(function () {
	chrome.tabs.create({
		url: chrome.extension.getURL("newtab/newtab.html")
	});
});

// pixiv のAPIを叩きたい 