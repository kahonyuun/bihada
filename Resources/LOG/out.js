/*var common = require('../common/common');
 common.init();

 self.top = 0;
 self.height = 410;
 */
Ti.API.info('OUT')
win = Ti.UI.createWindow;
self = Ti.UI.currentWindow;
self.top = 0;
self.height = 410;

//DB
function get_time(){
var db = Ti.Database.open('db');
//rowidを取得
// http://docs.appcelerator.com/titanium/latest/#!/api/Titanium.Database.ResultSet
var rows = db.execute('select rowid from date order by rowid desc limit 1');
//
var target_rowid = rows.fieldByName('rowid');

Ti.API.info(target_rowid);
db.execute('update date set out_time=CURRENT_TIMESTAMP where rowid=?', target_rowid);
//db.execute('insert into users (name,sales) values (?,?)','suzuki',300);

var rows = db.execute('select rowid,* from date');
Ti.API.info('row count = '+rows.getRowCount());

while(rows.isValidRow()){
	Ti.API.info('id:'+rows.fieldByName('rowid')+' IN_TIME:'+ rows.fieldByName('in_time')+'　OUT_TIME:'+ rows.fieldByName('out_time'))
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


/*
	var blur = self.addEventListener('blur',function(e){
	Ti.UI.currentWindow.close();
	});
*/