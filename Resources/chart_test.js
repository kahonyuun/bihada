//currentでhtmlを開くためのプリッジファイル
//柳田さん


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
		/*3.1
		var get_min = require("../../../LOG/out")
		out.get_min();
		*/
		
	//以下柳田さま
	webView.addEventListener('load',function(e)
	{
		//out.jsのminuteがほしい
		//3.1 webView.evalJS(get_min);
		
		//webView.evalJS("viewChart(TITLE = '睡眠時間',TITLE2 = '睡眠時間2')");
	});
	self.add(view);
	view.add(webView);
	return view;
};
module.exports = Highcharts;
