//view1=上View
//view2=下view

var win = Ti.UI.currentWindow;
var view1 = Ti.UI.createView({
	top : "0%",
	width : "100%",
	height : 299,
	layout : 'absolute',
	//backgroundColor :
});
win.add(view1);

//画像
var topImage = Ti.UI.createImageView({
	image : "image/image.jpg",
	top : 0,
	height : 299,
	width : "100%"
});
view1.add(topImage);

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
var view2 = Ti.UI.createView({
	top : 300,
	width : "100%",
	//height : 150,
	layout : 'absolute',
	//backgroundColor : 'black'
});
win.add(view2);

//TODO :１日に1度しかin/outできない
//function judge_count(){
var db = Ti.Database.open('db');
var rows = db.execute('select rowid, *  from date_test');
var limited_rows = db.execute('select rowid from date_test order by rowid desc limit 1');

//var rowid = rows.fieldByName('rowid');
//var in_count = db.execute('select in_time from date_test order by in_time desc');
//var out_count = db.execute('select out_time from date_test order by out_time desc');

//最新のIN/OUTタイムを格納
var in_time_string = rows.fieldByName('in_time');
//2013-03-19 15:30:13
var out_time_string = rows.fieldByName('out_time');

//stringを処理して、int化
var inArray = in_time_string.split(" ")[0].split("-").join("");
var inArray_int = Number(inArray);
var a = typeof (inArray_int);
Ti.API.info("うひょ" + inArray_int);
//var in_time_timestamp = in_time_date.getTime();
rows.closed
db.close();

//Ti.API.info("あう " + in_time_timestamp);

//現在日時の取得
var current_time = new Date();
var year = current_time.getYear();
var mon = current_time.getMonth() + 1;
var day = current_time.getDate();

//西暦の処理とゼロパディング。113=>2013
year = (year < 2000) ? year + 1900 : year;
if (mon < 10) {
	mon = "0" + mon;
}
if (day < 10) {
	day = "0" + day;
}

//string=>int
var current_time_join = year + mon + day;
Ti.API.info('year/mon/day:' + current_time_join);

var current_time_int = Number(current_time_join);
//Ti.API.info("現在時刻" + current_time_int);
//var a = typeof(current_time_int);
//Ti.API.info('type :' + a);

//outした時すでに同日にoutしている場合はupdateできない
// if(outした日にち=db最新のoutの日にち){
// alert :"今日はもうoutしてます";
// }else{
// out_buttonのaddEvent
// }

//};

buttonIn.addEventListener('click', function() {
	if (current_time_int != inArray_int) {
		alert("GO");
		var win = Ti.UI.createWindow({
			url : "LOG/In.js",
			backgroundColor : "#fff"
		});
		//win.open();新しいwinを作られて戻れなくなる
		Ti.UI.currentTab.open(win);
		Ti.API.info('IN')
	} else {
		alert('同じ日にINボタンが押されています');
	}
});

buttonOut.addEventListener('click', function() {
	//tabGroup.open(tabS);
	if (current_time_int != inArray_int) {
		alert("GO");
		var win = Ti.UI.createWindow({
			url : "LOG/out.js",
			backgroundColor : "fff"
		});
		Ti.UI.currentTab.open(win);
		Ti.API.info('out')
	} else {
		alert('同じ日にINボタンが押されています');
	}
});

view2.add(buttonIn);
view2.add(buttonOut);

//現在時刻＝最新IN/OUTタイム
function compare() {
	if (current_time_int == inArray_int) { alert :"同じ日にINボタンが押されています";
	};
}

//時計
var timer = Ti.UI.createLabel({
	font : {
		fontSize : 48,
		fontFamily : "Helvetica Neue"
	},
	textAlign : "center",
	width : "auto",
	top : 40,
	height : 60,
});

setInterval(function() {
	var d = new Date();
	var t = {};
	//0はd.get~を文字列にするためにある。sliceは文字列にしかきかない
	t.hour = ("0" + d.getHours() ).slice(-2);
	//後ろから二文字とる
	t.minute = ("0" + d.getMinutes() ).slice(-2);
	t.second = ("0" + d.getSeconds() ).slice(-2);
	timer.text = t.hour + ":" + t.minute + ":" + t.second;
	//Ti.API.info("hour:" + t.hour);ミリコンマ
}, 100);

view1.add(timer);

//TODO:in_timeの12h(43200秒)後に起きた？alert
//http://selfkleptomaniac.org/archives/2136
Ti.App.iOS.cancelAllLocalNotifications();
var notifications = [];
notification_params = {
	alertBody : '起きてますかあああ！！',
	alertAction : 'wake up OK',
	userInfo : {
		//      data: {param1:'これはparam1', param2:'これはparam2'}
	},
	//sound: 'sound.mp3',
	repeat : 'daily',
	//↓ここがよくわかってない、Inした時間から12h後にしたい
	date : new Date((new Date()).getTime() + (1000 * 10))//12h.1h=3600秒
};
notifications.push(Ti.App.iOS.scheduleLocalNotification(notification_params));

