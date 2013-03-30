//currentでhtmlを開くためのプリッジファイル

function Highcharts(nav) {
	//Ti.API.info("chart.js");
	var self = Ti.UI.currentWindow
	var view = Ti.UI.createView({
		backgroundColor : '#ffffff'
	});

	html = ''
	webView = Ti.UI.createWebView({
		url : '/etc/graph/highcharts/chart.html', 
		// url で指定したファイルに変数をわたしたい
		// param: total_sleep_array,
		top : 0,
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
		disableBounce : true
	});

	//チャートに表示する時間の取得
	var db = Ti.Database.open('db');
	var rows = db.execute('select rowid, * from date_test');

	//チャートX軸(時間)
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

	//TODO 早急にリファクタリング
	var db = Ti.Database.open('db');
	var rows = db.execute('select rowid, * from date_test');

	//チャートY軸 (日にち)
	var contain_days = [];
	while (rows.isValidRow()) {
		var rowid = rows.fieldByName('rowid');
		var in_time_string = rows.fieldByName('in_time');
		//Ti.API.info("in_time" + in_time);

		in_reg = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g;
		//文字列から変換
		dateArray = in_reg.exec(in_time_string)
		var in_time_date = new Date((+dateArray[1]), //年
		(+dateArray[2]) - 1, // Careful, month starts at 0!
		(+dateArray[3]));

		Ti.API.info("in_time_date :" + in_time_date);

		//TODO 詳しい挙動調査
		var in_time_timestamp = in_time_date.getTime();

		var sleep_days = dateArray[2] + "/" + dateArray[3];
		Ti.API.info("sleep_days: " + sleep_days);

		contain_days[rowid] = sleep_days;
		//Ti.API.info(contain_days);

		//チャートX軸（GT時間）
		// var gt_contain = [];
		// var gt_time_string = rows.fieldByName('')

		rows.next();
	}
	rows.closed
	db.close();

	//②睡眠時間to chart.htmlへ配達
	webView.addEventListener('load', function(e) {
		var hours = chart_contain;
		var days = contain_days;

		//Ti.API.info(hours);
		//Ti.API.info(hours[0]);
		//Ti.API.info(hours[1]);

		//webView.evalJS("chart( HOUR = " + hours + ")");//でない
		webView.evalJS("chart( HOUR = " + JSON.stringify(hours) + " )");
		webView.evalJS("chart( DAY = " + JSON.stringify(days) + ")");

		//webView.evalJS("viewChart(TITLE = '睡眠時間',TITLE2 = '睡眠時間2')");
	});
	self.add(view);
	view.add(webView);
	return view;
};
module.exports = Highcharts;
