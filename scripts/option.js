// 要素をランダムに並び替える
// http://www.finefinefine.jp/web/kiji2068/
$(function() {
	var arr = [];
	$("#sample div").each(function() {
		arr.push($(this).html());
	});
	arr.sort(function() {
		return Math.random() - Math.random();
	});
	$("#sample").empty();
	for(i=0; i < arr.length; i++) {
		$("#sample").append('<div>' + arr[i] + '</div>');
	}
});

// ファイル名を取得する
// Fileポインタ的なところ
var fs = new ActiveXObject("Scripting.FileSystemObject");

// Folderオブジェクトを取得
var folder = fs.GetFolfer("../img");

// Fileオブジェクトを格納
var files = new Enumerator(folder.files);


fs = null;
