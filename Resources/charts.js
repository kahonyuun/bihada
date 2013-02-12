Ti.API.info("chart");
function Highcharts(nav) {

	var view = Titanium.UI.createView({  
    	backgroundColor:'#ffffff'
	});

	var webView = Ti.UI.createWebView({
		url: '/etc/graph/highcharts/highcharts.html'
	});
	view.add(webView);
	return view;
	Ti.API.info('return');
};
module.exports = Highcharts;

