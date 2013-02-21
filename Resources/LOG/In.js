/*var appa = require('appa');
 common.timer();
 */
self = Ti.UI.currentWindow;
self.top = 0;
self.height = 410;

//DB
function get_time() {
	var db = Ti.Database.open('db');
	//db.execute('create table if not exists date(id INTEGER,in_time DATETIME DEFAULT CURRENT_TIMESTAMP,out_time DATETIME DEFAULT CURRENT_TIMESTAMP)');
	//db.execute('insert into date (id,in_time,out_time) values (?,CURRENT_TIMESTAMP,null)');

	db.execute('create table if not exists date(id INTEGER,in_time DATETIME DEFAULT CURRENT_TIMESTAMP,out_time DATETIME DEFAULT CURRENT_TIMESTAMP)');
	db.execute('insert into date (id,in_time,out_time) values (?,CURRENT_TIMESTAMP,null)');

	var rows = db.execute('select rowid,* from date');
	Ti.API.info('row count = ' + rows.getRowCount());
	//Ti.API.info(rows);

	while (rows.isValidRow()) {
		Ti.API.info('id:' + rows.fieldByName('rowid') + ' IN_TIME:' + rows.fieldByName('in_time') + ' OUT_TIME:' + rows.fieldByName('out_time'))
		rows.next();
	}

	rows.closed
	db.close();
};

/*
 * 使えない↓
 function delete_db(){
 var db = Ti.Database.open('db');
 db.execute('DELETE FROM db');
 }
 */
get_time();
//delete_db();

Ti.include("../lib/twitter_api.js");
// 初回のみ認証処理
// 再度認証したい時はアプリを削除 or Twitter 管理画面で許可を解除
Ti.App.twitterApi = new TwitterApi({
	consumerKey : 'pyUVBLV3HgjUsn5k44lSzQ',
	consumerSecret : 'hjMU6MUg0vOj01d4wefwK7l2QImX3MxHtqUwlspouc'
});
var twitterApi = Ti.App.twitterApi;
twitterApi.init();

// ツイートする
function tweet() {
	twitterApi.statuses_update({
		onSuccess : function(responce) {
			//     alert('テストだお！ひなだお！うそだお！');
			Ti.API.info(responce);
		},
		onError : function(error) {
			Ti.API.error(error);
		},
		// API 経由で直近 10 件の重複投稿はブロックされる。
		parameters : {
			status : 'テストだお！'
		}
	});

	// Add item to window.
	self.open();
};

//ツイートボタン
var tweet_button = Ti.UI.createButton({
	title : 'ツイートする',
	height : 20,
	width : 100,
	top : 200,
	left : 50,
	//backgroundImage:'tweet.png'
});

self.add(tweet_button);

tweet_button.addEventListener('click', function() {
	tweet()
});

// added by hamada
Ti.API.info('hamada');
/* DBから必要なデータを取得 */
var db = Ti.Database.open('db');
var rows = db.execute('select rowid,* from date');
while (rows.isValidRow()) {
	// For debug
	Ti.API.info('id: ' + rows.fieldByName('rowid'));
	Ti.API.info('IN_TIME: ' + rows.fieldByName('in_time'));
	Ti.API.info('OUT_TIME: ' + rows.fieldByName('out_time'));

	// 変数に入れる
	var in_time_string = rows.fieldByName('in_time');
	var out_time_string = rows.fieldByName('out_time');
	
	// timestamp型に変換
	reggie = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g;
	dateArray = reggie.exec(in_time_string);
	var in_time_date = new Date(
		(+dateArray[1]),
		(+dateArray[2]) - 1, // Careful, month starts at 0!
	    (+dateArray[3]),
	    (+dateArray[4]),
	    (+dateArray[5]),
	    (+dateArray[6])
	   );	   
	var in_time_timestamp = in_time_date.getTime();
	
	// TODO: out_time も同様に処理する
	// 一旦ダミーをあててる
	var out_time_timestamp = 1360909999000;
	Ti.API.info('in_time_date: ' + in_time_timestamp);
	Ti.API.info('out_time_date: ' + out_time_timestamp);
	
	// 睡眠時間を計算する
	var sleep_time_timestamp = out_time_timestamp - in_time_timestamp;
	Ti.API.info('sleep_time_timestamp: ' + sleep_time_timestamp)
	
	// TODO: 時間(:分)に変換する

	// 次の要素に進む
	rows.next();
}

/* データの加工 */
var sleep_total_array = [6, 7.5, 8, 9];

