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
	var h = 17;
	if (h == 13) { var time_tweet = "午後タイムだよ！";
	}else if (h == 14) { var time_tweet = "14時";
	}else if(h == 16) { var time_tweet = "もう16時";
	}else if(16 < h < 18){var time_tweet = "１７じくらいだお";
	}else if (h == 22) { var time_tweet = "ネロイマスグニダ";
	}else if (h == 1){var time_tweet = "今更寝てもおそい";
	}else{ var time_tweet = "22時に寝始める準備はできたかな？";
	};

// ツイートする文
var twi_sentence = time_tweet;

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


//テキスト部分
var twi_label = Ti.UI.createLabel({
	text : twi_sentence,
	height : 100,
	width : 200,
	top : 50,
	left : 30,
	textAlign : 'center'
});

//ツイートボタン
var tweet_button = Ti.UI.createButton({
	title : 'ツイートする',
	height : 20,
	width : 100,
	top : 200,
	left : 50,
	//backgroundImage:'tweet.png'
});

self.add(twi_label);
self.add(tweet_button);

tweet_button.addEventListener('click', function() {
	tweet()
});
