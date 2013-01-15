var common = require('common');
common.init();

//Ti.API.info('common')


var text = Ti.UI.createLabel({
	text:'Twitter',
	width:'auto',
	height:'auto',
	left : 20,
	top:'10%'
});

self.add(text);

//test
var buttonIn = Ti.UI.createButton({
	title : '布団IN!',
	height : 50,
	top : '10%',
	width : 80,
	left:20,
});
self.add(buttonIn);


buttonIn.addEventListener('focus', function(e){
	ActiveWinTab.activeWindow = self;
	//Ti.UI.createWindow({
		//url: "app.js",
	//})
});


//Twitter





//Facebook
Ti.Facebook.appid="438588009541791";
Ti.Facebook.permission = ['publish_stream', 'read_stream'];

//ボタン
var facebook_button = Ti.Facebook.createLoginButton({
	style : Ti.Facebook.BUTTON_STYLE_WIDE,
	top:50
});

self.add(facebook_button);

//ここどうなってるか調べる
Ti.Facebook.requestWithGraphPath('me', {}, "GET",function(e){
	if(e.success){
		var obj = JSON.parse(e.result);
		alert(obj.name + "!");
		
	}
});

