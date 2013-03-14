//currentでhtmlを開くためのプリッジファイル
//柳田神

function Highcharts(nav) {
	Ti.API.info("chart_test.js");
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

	//チャートに表示する時間をDBから取得
	var db = Ti.Database.open('db');
	var rows = db.execute('select rowid, * from date_test');

	var chart_contain = [];
	while (rows.isValidRow()) {
		var rowid = rows.fieldByName('rowid');
		var sleep_time = rows.fieldByName('sleep_time');
		chart_contain[rowid] = sleep_time;

		//Ti.API.info("睡眠時間"+rows.fieldByName('sleep_time'));
		//Ti.API.info(rows.fieldByName('rowid'));
		rows.next();
	}
	rows.closed
	db.close();

	//睡眠時間をto chart_test.htmlへ配達
	webView.addEventListener('load', function(e) {
		var days = contain_days;
		var hours = chart_contain;

		Ti.API.info(hours);
		Ti.API.info(days);
		//はい
		//Ti.API.info(hours[0]);
		//Ti.API.info(hours[1]);

		//webView.evalJS("chart( HOUR = " + hours + ")");
		webView.evalJS("chart( HOUR = " + JSON.stringify(hours) + " )");

		//webView.evalJS("viewChart(TITLE = '睡眠時間',TITLE2 = '睡眠時間2')");
	});
	self.add(view);
	view.add(webView);
	return view;
};
module.exports = Highcharts;
