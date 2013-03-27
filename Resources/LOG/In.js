/*var appa = require('appa');
 common.timer();
 */
self = Ti.UI.currentWindow;
self.top = 0;
self.height = 410;

//DB
function get_time() {
	var db = Ti.Database.open('db');
	//db.execute('create table if not exists date(id INTEGER,in_time DATETIME DEFAULT datetime("now", "localtime"),out_time DATETIME DEFAULT datetime("now", "localtime"))');
	//db.execute('insert into date (in_time,out_time) values (?,datetime("now", "localtime"),null)');
	//
	//db.execute("DROP TABLE IF EXISTS date_test");
	db.execute('create table if not exists date_test(in_time DATETIME,out_time DATETIME,sleep_time INTEGER)');
	db.execute('insert into date_test (in_time,out_time) values (datetime("now", "localtime"),null)');

	var rows = db.execute('select rowid, * from date_test');
	//Ti.API.info('row count = ' + rows.getRowCount());
	Ti.API.info(rows);

	while (rows.isValidRow()) {
		//Ti.API.info('id:' + rows.fieldByName('rowid') + ' IN_TIME:' + rows.fieldByName('in_time') + ' OUT_TIME:' + rows.fieldByName('out_time'))
		rows.next();
	}
	
	rows.closed
	db.close();
};
get_time();




Ti.include("../lib/twitter_api.js");
// 初回のみ認証処理
// 再度認証したい時はアプリを削除 or Twitter 管理画面で許可を解除
Ti.App.twitterApi = new TwitterApi({
	consumerKey : 'pyUVBLV3HgjUsn5k44lSzQ',
	consumerSecret : 'hjMU6MUg0vOj01d4wefwK7l2QImX3MxHtqUwlspouc'
});
var twitterApi = Ti.App.twitterApi;
twitterApi.init();

//TODO ツイート文と時間制御
var h　= 
if(13 < h < 15){
	alert :"午後タイムだよ！";
}else if(15 < h <18){
	alert :"夕方もがんがる！";
} else if(h == 22){
	alert :"ネロイマスグニダ";
};



// ツイートする
var twi_sentence= 'てえっっす';
Ti.App.test = twi_sentence;

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
			status : Ti.App.test
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
