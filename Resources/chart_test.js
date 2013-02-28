function Highcharts(nav) {
Ti.API.info("chart_test.js");
	var self = Ti.UI.currentWindow
	var view = Ti.UI.createView({  
    	backgroundColor:'#ffffff'
	});

	var webView = Ti.UI.createWebView({
		url: '/etc/graph/highcharts/chart_test.html'//highcharts
		// url で指定したファイルに変数をわたしたい hamada
		// param: total_sleep_array,
	});
	self.add(view);
	view.add(webView);
	return view;
};
module.exports = Highcharts;
