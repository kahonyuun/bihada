// create tab group
function app (){
var tabGroup = Titanium.UI.createTabGroup();

// BASE
var win1 = Titanium.UI.createWindow({
	url:'appb.js',
});
var tab1 = Titanium.UI.createTab({
	icon : 'KS_nav_views.png',
	title : 'LOG',
	window : win1
});
//グラフ
var winG = Titanium.UI.createWindow({
	url :"toChart.js" 
});
var tabG = Titanium.UI.createTab({
	icon : 'KS_nav_ui.png',
	title : 'グラフ',
	window : winG
});

//Tips
var winT = Titanium.UI.createWindow({
	url : "Tips/top.js"
});
var tabT = Titanium.UI.createTab({
	icon : 'KS_nav_views.png',
	title : 'お肌',
	window : winT
});

//設定
var winS = Titanium.UI.createWindow({
	title : '設定',
	url : "setting.js"
});
var tabS = Titanium.UI.createTab({
	icon : 'KS_nav_views.png',
	title : '設定',
	window : winS
});

//  add tabs
tabGroup.addTab(tab1);
tabGroup.addTab(tabG);
tabGroup.addTab(tabT);
tabGroup.addTab(tabS);

// open tab group
tabGroup.open();
}
app();

//プッシュ通知②
/*Ti.App.iOS.cancelAllLocalNotifications();
var notifications = [];
notification_params = {
      alertBody: '2/7だよこんにちは',
      alertAction: 'OK',
      userInfo: {
        notice:"通知の時間"// {param1:'これはparam1', param2:'これはparam2'}
      },
      sound: "default",//'sound.mp3',
      repeat: 'daily',
//      date:new Date((new Date()).getTime() +(1000 * 10))
    };
notifications.push(Ti.App.iOS.scheduleLocalNotification
	(notification_params));
/*notifications.push(Ti.App.iOS.scheduleLocalNotification
	(userInfo));
	*/	/*
Ti.App.iOS.addEventListener("notification", function(e) {
	Ti.API.info(e.userInfo.notice);
});
*/

//↓キーと値でデータを管理できるオブジェクト,
Ti.App.Properties.setString('message', 'オブジェクト！');
Ti.App.Properties.setString('when',new Date((new Date()).getTime() +(1000 * 10)));
var service = Ti.App.iOS.registerBackgroundService({url:'parse.js'});



//プッシュ通知①
/*
var notification;

Ti.API.info("notification schduled");
notification = Ti.App.iOS.scheduleLocalNotification({
	date : new Date(new Date().getTime() + (1000 * 10)),
	repeat : "daily",
	alertBody : "起動から10秒後だよ！",
	alertAction : "アプリを開く",
	//badge : (new Date).getSeconds(),
	sound : "default",
	userInfo : {
		foo : "push"
	}
});

Ti.App.iOS.addEventListener("notification", function(e) {
	Ti.API.info(e.userInfo.foo);
});

Ti.App.addEventListener("resume", function() {
	Ti.API.info("notification canceld");
	notification.cancel();
	// Ti.App.iOS.cancelAllLocalNotifications();
});
*/

//create DB
/*function get_time(){
var db = Ti.Database.open('test1');

db.execute('create table if not exists date(id INTEGER,in_time DATETIME DEFAULT CURRENT_TIMESTAMP,out_time DATETIME DEFAULT CURRENT_TIMESTAMP)');
//db.remove();
db.close();
};*/