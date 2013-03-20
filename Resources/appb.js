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
	top :0,
	height:299,
	width:"100%"
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
buttonIn.addEventListener('click', function() {
	var win = Ti.UI.createWindow({
		url : "LOG/In.js",
		backgroundColor : "#fff"
	});
	//win.open();新しいwinを作られて戻れなくなる
	Ti.UI.currentTab.open(win);
	Ti.API.info('IN')
});

buttonOut.addEventListener('click', function() {
	//tabGroup.open(tabS);
	var win = Ti.UI.createWindow({
		url : "LOG/out.js",
		backgroundColor : "fff"
	});
	Ti.UI.currentTab.open(win);
	Ti.API.info('out')
});

view2.add(buttonIn);
view2.add(buttonOut);

//時計
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
	//0はd.get~を文字列にするためにある。sliceは文字列にしかきかない
	t.hour = ("0" + d.getHours() ).slice(-2);//後ろから二文字とる
	t.minute = ("0" + d.getMinutes() ).slice(-2);
	t.second = ("0" + d.getSeconds() ).slice(-2);
	timer.text = t.hour + ":" + t.minute + ":" + t.second;
	//Ti.API.info("hour:" + t.hour);
},100 );	

view1.add(timer);

//TODO:in_timeの12h(43200秒)後に起きた？alert 
//http://selfkleptomaniac.org/archives/2136
Ti.App.iOS.cancelAllLocalNotifications();
var notifications = [];
notification_params = {
      alertBody: '起きてますかあああ！！',
      alertAction: 'wake up OK',
      userInfo: {
  //      data: {param1:'これはparam1', param2:'これはparam2'}
      },
      //sound: 'sound.mp3',
      repeat: 'daily',
   //↓ここがよくわかってない、Inした時間から12h後にしたい
      date: new Date((new Date()).getTime() +(1000 * 10))//12h.1h=3600秒
    };
notifications.push(Ti.App.iOS.scheduleLocalNotification(notification_params));


