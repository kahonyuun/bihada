/*var twi = require('twi');
 twi.tweet();
*/
 //self.top = 0;
 //self.height = 410;
 
//Ti.API.info('OUT')
win = Ti.UI.createWindow;
self = Ti.UI.currentWindow;
self.top = 0;
self.height = 410;

//DB
function get_time(){
var db = Ti.Database.open('db');//本番はtime_db
//rowidを取得
// http://docs.appcelerator.com/titanium/latest/#!/api/Titanium.Database.ResultSet
//結果はresultsetオブジェクトとし返る
var rows = db.execute('select rowid from date_test order by rowid desc limit 1');
var target_rowid = rows.fieldByName('rowid');

//Ti.API.info(target_rowid);
db.execute('update date_test set out_time=CURRENT_TIMESTAMP where rowid=?', target_rowid);


var rows = db.execute('select rowid,* from date_test');
//Ti.API.info('row count = '+rows.getRowCount());

//id自体には何も入っておらず、rowidが連番になっていく
while(rows.isValidRow()){
//	Ti.API.info('id:'+rows.fieldByName('rowid')+' IN_TIME:'+ rows.fieldByName('in_time')+'　OUT_TIME:'+ rows.fieldByName('out_time'))
	rows.next();
}
rows.closed;
db.close();
//db.remove();
};
get_time();


Ti.include("../lib/twitter_api.js");
// 初回のみ認証処理
// 再度認証したい時はアプリを削除 or Twitter 管理画面で許可を解除
Ti.App.twitterApi = new TwitterApi({
    consumerKey:'pyUVBLV3HgjUsn5k44lSzQ',
    consumerSecret:'hjMU6MUg0vOj01d4wefwK7l2QImX3MxHtqUwlspouc'
});
var twitterApi = Ti.App.twitterApi;
twitterApi.init();

// ツイートする
function tweet(){	
 twitterApi.statuses_update({
    onSuccess: function(responce){
   //     alert('テストだお！ひなだお！うそだお！');
        Ti.API.info(responce);
    },
    onError: function(error) {
        Ti.API.error(error);
    },
    // API 経由で直近 10 件の重複投稿はブロックされる。
    parameters:{status: 'テストだお！'}
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

tweet_button.addEventListener('click', function(){
	tweet()
});


// haman
Ti.API.info('sleep_time.js');

/* DBから必要なデータを取得 */
//exports.get_sleep_time = function(){
	var db = Ti.Database.open('db');
	var rows = db.execute('select rowid,* from date_test');
	while (rows.isValidRow()) {
		// For Debug
		Ti.API.info('＝＝＝id: ' + rows.fieldByName('rowid') + '＝＝＝＝＝＝＝');
		Ti.API.info('IN_TIME: ' + rows.fieldByName('in_time'));
		//2013-02-21 05:58:26みたいな感じ
		Ti.API.info('OUT_TIME: ' + rows.fieldByName('out_time'));

		// 変数に入れる
		var in_time_string = rows.fieldByName('in_time');
		var out_time_string = rows.fieldByName('out_time');

		// timestamp型に変換、4桁の数字
		reggie = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g;
		dateArray = reggie.exec(in_time_string);
		var in_time_date = new Date((+dateArray[1]), (+dateArray[2]) - 1, // Careful, month starts at 0!
		(+dateArray[3]), (+dateArray[4]), (+dateArray[5]), (+dateArray[6]));
		var in_time_timestamp = in_time_date.getTime();

		// TODO: out_time も同様に処理する
		reggie = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g;
		outArray = reggie.exec(out_time_string);
		if (outArray == null) {
			var out_time_timestamp = null;
		} else {
			var out_time_date = new Date((+outArray[1]), (+outArray[2]) - 1, (+outArray[3]), (+outArray[4]), (+outArray[5]), (+outArray[6]));
			var out_time_timestamp = out_time_date.getTime();
		}

		// For Debug
		// Ti.API.info('in_time_date: ' + in_time_timestamp);
		// Ti.API.info('out_time_date: ' + out_time_timestamp);

		// 睡眠時間を計算する
		var sleep_time_timestamp = null;
		if (out_time_timestamp != null && in_time_timestamp != null) {
			sleep_time_timestamp = out_time_timestamp - in_time_timestamp;
			//Ti.API.info("in time :" + in_time_timestamp);
			//Ti.API.info('out time :' + out_time_timestamp);
			// Ti.API.info('sleep_time_timestamp: ' + sleep_time_timestamp);//5530000みたいなん
		} else {
			Ti.API.info('sleep_time_timestamp: ' + '計算できない');
		}

		// db.close();
		// throw new Error("exit()");
		// 時間(:分)に変換する。
		if (sleep_time_timestamp != null) {
			hour = Math.round(sleep_time_timestamp / 60 / 60 / 1000 /64+ 25569);
			minute = Math.round(sleep_time_timestamp / 60 / 1000);
			Ti.API.info('sleep_time_hour: ' + hour + '時間');
			Ti.API.info('sleep_time_min: ' + minute + '分');
		} else {
			Ti.API.info('sleep_time_hour: ' + '計算できない');
		}

		// 次の要素に進む
		rows.next();
	};
//};
//get_sleep_time();

//ツイート文選択・読み込み・表示
/*
 1,IN/OUTボタンを押した時にcurrent timeをget/insertされたDBの時間を持ってくる
 2,特定時間がpostすべき時間と重なったら
 3,IN/OUTページに表示
 4,ツイートさせる
 */

