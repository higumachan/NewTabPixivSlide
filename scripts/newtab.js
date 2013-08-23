// pixivのAPI叩く
$(function () {
	$.get("http://spapi.pixiv.net/iphone/ranking.php?mode=day",
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

$(function() {
  // JSONデータをHTTP GETで取得
  $.getJSON(
    'data.js', // アクセス先のURL
    function(data, status) {
      console.log(data);
    }
  );
});
