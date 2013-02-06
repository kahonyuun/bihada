Ti.API.info("chart");
function Highcharts(nav) {

	var win = Titanium.UI.createWindow({  
    	backgroundColor:'#ffffff'
	});

	var webView = Ti.UI.createWebView({
		url: '/etc/graph/highcharts/highcharts.html'
	});
	win.add(webView);
Ti.API.info('graph');
	return win;
};
module.exports = Highcharts;

