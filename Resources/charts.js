Ti.API.info("chart");
function Highcharts(nav) {

	var view = Titanium.UI.createView({  
    	backgroundColor:'#ffffff'
	});

	var webView = Ti.UI.createWebView({
		url: '/etc/graph/highcharts/highcharts.html'
	});
	//win.add(webView);
	return view;
};
module.exports = Highcharts;

