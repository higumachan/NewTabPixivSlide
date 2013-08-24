

var str = $(function () {
	$.get("http://spapi.pixiv.net/iphone/ranking.php?mode=day",
		function (data) {
			console.log("oooooo");
			return (data);
		});
});

/*
var siii = function;
console.log(siii);

var comp = /http:\/\/(.+?)mw\.jpg/;
var res = comp.exec("http://i2.pixiv.net/img28/img/seeker00/mobile/37975653_128x128.jpg\",,,\"http://i2.pixiv.net/img28/img/seeker00/mobile/37975653_480mw.jpg\",,,\"2013-08-22 00:16:55\",\"東方 西行寺幽々子 風景 魂魄妖夢 東方Project100users入り\"\"http://i2.pixiv.net/img28/img/seeker00/mobile/37975653_480mw.jpg\",\"");
console.log(res);

var comp = /http:\/\/(.+?)mw\.jpg/;
var res = comp.match("http://i2.pixiv.net/img28/img/seeker00/mobile/37975653_128x128.jpg\",,,\"http://i2.pixiv.net/img28/img/seeker00/mobile/37975653_480mw.jpg\",,,\"2013-08-22 00:16:55\",\"東方 西行寺幽々子 風景 魂魄妖夢 東方Project100users入り\"\"http://i2.pixiv.net/img28/img/seeker00/mobile/37975653_480mw.jpg\",\"");
console.log(res);

var source = "http://i2.pixiv.net/img28/img/seeker00/mobile/37975653_128x128.jpg\",,,\"http://i2.pixiv.net/img28/img/seeker00/mobile/37975653_480mw.jpg\",,,\"2013-08-22 00:16:55\",\"東方 西行寺幽々子 風景 魂魄妖夢 東方Project100users入り\"\"http://i2.pixiv.n975653_480mw.jpg\",\"";
var comp = /http:\/\/(.+?)mw\.jpg/g;
var arr = source.match(comp);
console.log(arr);

for (var i = 0; i < str.length; i++){
	if (str[i] == '"'){
		str
	}
}

source.replace(/\"/, "")
*/