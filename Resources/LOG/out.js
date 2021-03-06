/*var twi = require('twi');
 twi.tweet();
 */
win = Ti.UI.createWindow;
self = Ti.UI.currentWindow;
self.top = 0;
self.height = 410;

//現在日時の取得
var current_date = new Date();
var hour = current_date.getHours();
var minute = current_date.getMinutes();

Ti.API.info('minute ' + hour + minute);
//現在時刻
var current_hour_str = ("0"+hour).slice(-2);
var current_minute_str=("0"+minute).slice(-2);
var current_time_str = current_hour_str + current_minute_str;

var current_time_int = Number(current_time_str);
//For Debug＊＊＊＊＊＊＊＊＊
Ti.API.info('現在時刻　' + current_time_int);
//＊＊＊＊＊＊＊＊＊＊＊＊＊

//IN/OUT.jsに時間をもってく




//布団OUTタイムを挿入
function update_outTime() {
	var db = Ti.Database.open('db');
	//本番はtime_db
	//rowidを取得
	// http://docs.appcelerator.com/titanium/latest/#!/api/Titanium.Database.ResultSet
	//結果はresultsetオブジェクトとし返る
	var rows = db.execute('select rowid from date_test order by rowid desc limit 1');
	var target_rowid = rows.fieldByName('rowid');
	//outボタンを押したらタイムスタンプ追加
	db.execute('update date_test set out_time=datetime("now", "localtime") where rowid=?', target_rowid);
	//データ数
	var rows = db.execute('select rowid, * from date_test');

	Ti.API.info('row count = ' + rows.getRowCount());
	//id自体には何も入っておらず、rowidが連番になっていく
	while (rows.isValidRow()) {
		//	Ti.API.info('id:'+rows.fieldByName('rowid')+' IN_TIME:'+ rows.fieldByName('in_time')+'　OUT_TIME:'+ rows.fieldByName('out_time'))
		rows.next();
	}
	rows.closed
	db.close();
	//db.remove();
};
update_outTime();
//DBからstring型のintimeをとってタイムスタンプ型に変換
var db = Ti.Database.open('db');
var rows = db.execute('select rowid,* from date_test');
while (rows.isValidRow()) {

	// For Debug------------------
	Ti.API.info('＝＝＝id: ' + rows.fieldByName('rowid') + '＝＝＝＝＝＝＝');
	Ti.API.info('IN_TIME: ' + rows.fieldByName('in_time'));
	Ti.API.info('OUT_TIME: ' + rows.fieldByName('out_time'));
	//----------------------------

	// 変数に入れる
	var in_time_string = rows.fieldByName('in_time');
	var out_time_string = rows.fieldByName('out_time');
	// timestamp型に変換
	//gフラグがあると、前回マッチした次の部分から検索を開始する(連番になる)
	in_reg = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g;

	//メモ execメソッド：マッチ成功⇒配列を返す、失敗⇒null
	dateArray = in_reg.exec(in_time_string);
	//Ti.API.info( dateArray);オブジェクト型・正規表現2013-03-14 10:12:13,2013,03,14,10,12,13

	var in_time_date = new Date((+dateArray[1]), //年
	(+dateArray[2]) - 1, // Careful, month starts at 0!
	(+dateArray[3]), //日
	(+dateArray[4]), //時
	(+dateArray[5]), //分
	(+dateArray[6]));
	//秒

	var in_time_timestamp = in_time_date.getTime();
	Ti.API.info("にゅーめりっく" + in_time_timestamp);

	// out_time
	out_reg = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g;
	outArray = out_reg.exec(out_time_string);
	//Ti.API.info('ourArray: ' + outArray);
	if (outArray == null) {
		var out_time_timestamp = null;
	} else {
		var out_time_date = new Date((+outArray[1]), //年
		(+outArray[2]) - 1, //月 ←0がないから-1！
		(+outArray[3]), //日
		(+outArray[4]), //時
		(+outArray[5]), //分
		(+outArray[6]));
		//秒

		var out_time_timestamp = out_time_date.getTime();
	}
	// For Debug
	// Ti.API.info('in_time_date: ' + in_time_timestamp);
	// Ti.API.info('out_time_date: ' + out_time_timestamp);

	// 睡眠時間を計算する
	sleep_time_timestamp = null;
	if (out_time_timestamp != null && in_time_timestamp != null) {
		sleep_time_timestamp = out_time_timestamp - in_time_timestamp;
		//Ti.API.info("in time :" + in_time_timestamp);
		//Ti.API.info('out time :' + out_time_timestamp);
		//F Ti.API.info('sleep_time_timestamp: ' + sleep_time_timestamp);//5530000みたいなん
	} else {
		Ti.API.info('sleep_time_timestamp: ' + '計算できない');
	}

	// 時間(:分)に変換する。
	if (sleep_time_timestamp != null) {
		//TODO hourの数字の割り出しがなんかおかしい。。
		hour = Math.round(sleep_time_timestamp / 60 / 60 / 1000);
		minute = Math.round(sleep_time_timestamp / 60 / 1000);
		//Ti.API.info(sleep_time_timestamp);
		//Ti.API.info('sleep_time_hour: ' + hour + '時間');
		Ti.API.info('sleep_time_min: ' + minute + '分');

		var limited_rows = db.execute('select rowid from date_test order by rowid desc limit 1');
		var target_rowid = limited_rows.fieldByName('rowid');
		//睡眠時間(数字)をDBへ
		db.execute('update date_test set sleep_time=? where rowid=?', minute, target_rowid);
		// //データ数
		// var rows = db.execute('select rowid,* from date_test');
		// //Ti.API.info('row count = ' + rows.getRowCount());
		//
		// //id自体には何も入っておらず、rowidが連番になっていく
		// while (rows.isValidRow()) {
		//
		// Ti.API.info('id:' + rows.fieldByName('rowid') + ' IN_TIME:' + rows.fieldByName('in_time') + '　OUT_TIME:' + rows.fieldByName('out_time') + ' 睡眠時間:' + rows.fieldByName('sleep_time'))
		// rows.next();
		// }
	} else {
		Ti.API.info('sleep_time_hour: ' + '計算できない');
	}
	// 次の要素に進む
	rows.next();
};


//TODO ツイート文選択・読み込み・表示//TWITTER関係
Ti.include("../lib/twitter_api.js");
// 初回のみ認証処理
// 再度認証したい時はアプリを削除 or Twitter 管理画面で許可を解除
Ti.App.twitterApi = new TwitterApi({
	consumerKey : 'pyUVBLV3HgjUsn5k44lSzQ',
	consumerSecret : 'hjMU6MUg0vOj01d4wefwK7l2QImX3MxHtqUwlspouc'
});
var twitterApi = Ti.App.twitterApi;
twitterApi.init();

//TODO ツイート文と時間制御、time_tweetが冗長できもい、比較演算子使うとおかしい
//ここにappbの時間をもってくるようにする
// var current_time = require('appb');
// appb.Ti.App.current_time_forTwi();
//Ti.API.info('out_appb :' +  Ti.App.current_time_forTwi);
var h = current_time_int;


if (1200 < h < 1300) {
	var time_tweet = "午後タイムだよ！";
} else if (h == 1400) {
	var time_tweet = "14時";
} else if (h == 1600) {
	var time_tweet = "もう16時";
	//}else if(16 < h < 18){var time_tweet = "１７じくらいだお";
} else if (h == 2200) {
	var time_tweet = "ナゼ今オキタ";
} else if (h == 1000) {
	var time_tweet = "もうちょいネロ";
} else {
	var time_tweet = "22時に寝始める準備はできたかな？";
}
;

Ti.API.info('h :' + h);
// ツイートする文
var twi_sentence = time_tweet;
Ti.API.info('twi_sentence :' + time_tweet);
function tweet() {
	twitterApi.statuses_update({
		onSuccess : function(responce) {
			//     alert('テストだお！ひなだお！うそだお！');
			Ti.API.info("response" + responce);
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

//テキスト部分
var twi_label = Ti.UI.createLabel({
	text : twi_sentence,
	height : 100,
	width : 200,
	top : 50,
	left : 30,
	textAlign : 'center',
});

// ツイートする
function tweet() {
	twitterApi.statuses_update({
		onSuccess : function(responce) {
			alert('ツイートが成功しました');
			//TODO 成功したらチャートへ移動（途中）
			Ti.UI.createWindow({
				url : "toChart.js"
			});
			Ti.API.info(responce);
		},
		onError : function(error) {
			Ti.API.error(error);
			alert("ツイートが失敗しました。どんまいです。");
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
self.add(twi_label);

tweet_button.addEventListener('click', function() {
	tweet()
});
