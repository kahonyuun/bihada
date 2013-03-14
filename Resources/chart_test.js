//currentでhtmlを開くためのプリッジファイル
//柳田神

function Highcharts(nav) {
	//Ti.API.info("chart_test.js");
	var self = Ti.UI.currentWindow
	var view = Ti.UI.createView({
		backgroundColor : '#ffffff'
	});

	html = ''
	webView = Ti.UI.createWebView({
		url : '/etc/graph/highcharts/chart_test.html'//highcharts
		// url で指定したファイルに変数をわたしたい
		// param: total_sleep_array,
	});

	//チャートに表示する時間の取得
	var db = Ti.Database.open('db');
	var rows = db.execute('select rowid, * from date_test');

	var chart_contain = [];
	while (rows.isValidRow()) {
		var rowid = rows.fieldByName('rowid');
		//DBから睡眠時間とってきて格納⇒②
		var sleep_time = rows.fieldByName('sleep_time');
		chart_contain[rowid] = sleep_time;

		//Ti.API.info("睡眠時間"+rows.fieldByName('sleep_time'));
		//Ti.API.info(rows.fieldByName('rowid'));
		rows.next();
	}
	rows.closed
	db.close();

	//TODO in_timeを月日に分割する
	//TODO 早急にリファクタリング
	// var db = Ti.Database.open('db');
	// var rows = db.execute('select rowid, * from date_test');
// 
	// var contain_days = [];
	// while (rows.isValidRow()) {
		// var rowid = rows.fieldByName('rowid');
		// var in_time = rows.fieldByName('in_time');
		//Ti.API.info("in_time" + in_time);
		//contain_days[rowid] = in_time;
// 
		// rows.next();
	// }
	// rows.closed
	// db.close();

	//②睡眠時間to chart_test.htmlへ配達
	webView.addEventListener('load', function(e) {
		var hours = chart_contain;

	
		//Ti.API.info(hours);
		//Ti.API.info(hours[0]);
		//Ti.API.info(hours[1]);

		//webView.evalJS("chart( HOUR = " + hours + ")");//でないTODO ブログ
		webView.evalJS("chart( HOUR = " + JSON.stringify(hours) + " )");
		//webView.evalJS("chart( DAY = " + JSON.stringify(in_time) + ")");

		//webView.evalJS("viewChart(TITLE = '睡眠時間',TITLE2 = '睡眠時間2')");
	});
	self.add(view);
	view.add(webView);
	return view;
};
module.exports = Highcharts;
