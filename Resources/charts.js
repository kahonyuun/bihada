Ti.API.info("chart1");
function Highcharts(nav) {

	var self = Ti.UI.currentWindow
	var view = Ti.UI.createView({  
    	backgroundColor:'#ffffff'
	});

	var webView = Ti.UI.createWebView({
		url: '/etc/graph/highcharts/highcharts.html'
	});
	self.add(view);
	view.add(webView);
	return view;
};
module.exports = Highcharts;