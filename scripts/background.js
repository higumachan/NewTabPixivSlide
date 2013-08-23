// jQuery読み込み
chrome.tabs.executeScript(null, {file: "jquery.js"}, console.log("tsurai"));

// 右上のボタンが押された時
chrome.browserAction.onClicked.addListener(function () {
	chrome.tabs.create({
		url: chrome.extension.getURL("newtab/newtab.html")
	});
});


