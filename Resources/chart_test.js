function Highcharts(nav) {
Ti.API.info("chart_test.js");
	var self = Ti.UI.currentWindow
	var view = Ti.UI.createView({  
    	backgroundColor:'#ffffff'
	});
	
	var html = ''
	var webView = Ti.UI.createWebView({
		url: '/etc/graph/highcharts/chart_test.html'//highcharts
		// url で指定したファイルに変数をわたしたい hamada
		// param: total_sleep_array,
		
	});
	webView.addEventListener('load',function(e)
	{
		//webView.evalJS("viewChart(TITLE = '睡眠時間',TITLE2 = '睡眠時間2')");
	});
	self.add(view);
	view.add(webView);
	return view;
};
module.exports = Highcharts;
