var appa = require('appa');
appa.timer();
Ti.API.info('')

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
/*
var view1 = Ti.UI.createView({
	top : "0%",
	width : "100%",
	height : 250,
	layout : 'absolute',
	//backgroundColor :
});
win1.add(view1);

//画像
var topImage = Ti.UI.createImageView({
	image : "image/bihada.jpg"
});
view1.add(topImage);
*/
//時計
/*
var timer = Ti.UI.createLabel({
	font : {
		fontSize : 48,
		fontFamily:"Helvetica Neue"
	},
	textAlign:"center",
	width:"auto",
	top:40,
	height:60,
});

setInterval(function(){
	var d = new Date();
	var t = {};
	t.hour = ("0" + d.getHours() ).slice(-2);
	t.minute = ("0" + d.getMinutes() ).slice(-2);
	t.second = ("0" + d.getSeconds() ).slice(-2);
	timer.text = t.hour + ":" + t.minute + ":" + t.second;
},100 );	
*/
//view1.add(timer);


//下View
/*
var view2 = Ti.UI.createView({
	top : "80%",
	width : "100%",
	height : 150,
	layout : 'absolute',
	//backgroundColor : 'black'
});
win1.add(view2);

//未解決新しいtabかWindowを開いてページ遷移
var buttonIn = Ti.UI.createButton({
	title : '布団IN!',
	height : 50,
	top : '10%',
	width : 80,
	left : 20,
});
var buttonOut = Ti.UI.createButton({
	title : '布団OUT!',
	height : 50,
	top : '10%',
	width : 80,
	right : 20,
});

buttonIn.addEventListener('click', function() {
	var win = Ti.UI.createWindow({
		url : "LOG/In.js",
		backgroundColor : "#fff"
	});
	win.open();
	//Ti.UI.currentTab.open(win);
	Ti.API.info('IN')
});

buttonOut.addEventListener('click', function() {
	//tabGroup.open(tabS);
	var win = Ti.UI.createWindow({
		url : "LOG/out.js",
		backgroundColor : "fff"
	});
	win.open();
	Ti.API.info('out')
});

view2.add(buttonIn);
view2.add(buttonOut);
*/
//グラフ
var winG = Titanium.UI.createWindow({
	
    ExampleWindow = require('/Highcharts');
	exwin = new ExampleWindow();
	exwin.open(); 

	//path : "/etc/graph/Highcharts/highcharts"
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





//プッシュ通知
var notification;

Ti.API.info("notification schduled");
notification = Ti.App.iOS.scheduleLocalNotification({
	date : new Date(new Date().getTime() + 10000),
	repeat : "daily",
	alertBody : "起動から10秒後だよ！",
	alertAction : "アプリを開く",
	badge : (new Date).getSeconds(),
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

