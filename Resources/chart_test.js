Ti.API.info("chart_test");
function Highcharts(nav) {

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

/*// DBアクセス
var db = Titanium.Database.install('testdb.db', 'db');
var dbRows = db.execute('select * from url ');

var tblRows = [];

// 取得したデータの全行に対してデータを取得する
while(dbRows.isValidRow()){
	tblRows.push({title:'' + dbRows.fieldByName('title') + '' ,hasChild:true, url:'' + dbRows.fieldByName('url') + ''});
	dbRows.next();
}

// DBのデータ取得後にCloseしておく。
db.close();

var tblView = Titanium.UI.createTableView({
	data:tblRows
});

*/

//select rowid from date order by rowid desc limit 1