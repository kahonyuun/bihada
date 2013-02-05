var win = Ti.UI.currentWindow;

var view1 = Ti.UI.createView({
	top : "0%",
	width : "100%",
	height : 250,
	layout : 'absolute',
	//backgroundColor :
});
win.add(view1);

//画像
var topImage = Ti.UI.createImageView({
	image : "image/bihada.jpg"
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
	top : "80%",
	width : "100%",
	height : 150,
	layout : 'absolute',
	//backgroundColor : 'black'
});
win.add(view2);
buttonIn.addEventListener('click', function() {
	var win1 = Ti.UI.createWindow({
		url : "LOG/In.js",
		backgroundColor : "#fff"
	});
	//win.open();
	Ti.UI.currentTab.open(win1);
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
/*
//Parse
//insert global variavles containing credentialsつまり証明書
Ti.include('credentials.js')

//include Parse module
var parse = require('parse');

//create Parse Client
var client  = new parse.Client(APPLICATION_ID,MASTER_KEY);

*/

Ti.App.Properties.setString('message', 'こんにちん');
Ti.App.Properties.setString('when','2013/02/01 018:15:00');
var service = Ti.App.iOS.registerBackgroundService({url:'perse.js'});




