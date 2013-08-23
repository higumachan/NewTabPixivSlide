// pixivのAPI叩く
$(function () {
	$.getJSON("http://spapi.pixiv.net/iphone/ranking.php?mode=day",
		function (data) {
			console.log("oooooo");
			$.each(data, function() {
				if (data.match(/http:\/\/(.+?)mw\.jpg/) !== -1){
				//	$str.appendTo("#images");
					console.log("ok");
					return;
				}
			});
		});
});
