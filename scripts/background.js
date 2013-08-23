 // jQuery読み込み


 
 // 右上のボタンが押された時
chrome.browserAction.onClicked.addListener(function () {
	chrome.tabs.create({
		url: chrome.extension.getURL("newtab/newtab.html")
	});
});

// pixiv のAPIを叩きたい 