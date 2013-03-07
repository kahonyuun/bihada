//currentでhtmlを開くためのプリッジファイル
//柳田神

function Highcharts(nav) {
Ti.API.info("chart_test.js");
	var self = Ti.UI.currentWindow
	var view = Ti.UI.createView({  
    	backgroundColor:'#ffffff'
	});
	
	
	 html = ''
	 webView = Ti.UI.createWebView({
		url: '/etc/graph/highcharts/chart_test.html'//highcharts
		// url で指定したファイルに変数をわたしたい
		// param: total_sleep_array,
		
	});
		/*3.1out.jsからget_min(minute)を読み込む
		var get_min = require("../../../LOG/out")
		out.get_min();
		*/
	
//チャートに表示するintの取得
		/*var db = Ti.Database.open('db');
		db.execute('select rowid, * from date_test');
		while(rows.isValidRow()){
		var id = rows.fieldByName('rowid');
		//var test = [1,2,9];
		
		rows.next();
		}
		rows.closed;
		db.close();
		*/
	//以下柳田神
	webView.addEventListener('load',function(e)
	{
		//out.jsのminuteがほしい
	// webView.evalJS(get_min);
		
		//webView.evalJS("viewChart(TITLE = '睡眠時間',TITLE2 = '睡眠時間2')");
	});
	self.add(view);
	view.add(webView);
	return view;
};
module.exports = Highcharts;
