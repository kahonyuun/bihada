var common = require('common');
common.init();

//Ti.API.info('common')

self.top = 0;
self.height = 410;



var text = Ti.UI.createLabel({
	text:'Twitter',
	width:'auto',
	height:'auto',
	left : 20,
	top:'10%'
});

self.add(text);

//Twitter
var screen_name = 'marugotom1kan';
 
//ネットワーク越しのデータ取得で使う
var xhr = Ti.Network.createHTTPClient();//非同期にネットワーク接続を実行
var show = xhr.open("GET","https://api.twitter.com/1/users/user_timeline.json?screen_name"+screen_name);




//Facebook
Ti.Facebook.appid="438588009541791";
Ti.Facebook.permission = ['publish_stream', 'read_stream'];

//ボタン
var facebook_button = Ti.Facebook.createLoginButton({
	style : Ti.Facebook.BUTTON_STYLE_WIDE,
	top:50
});

self.add(facebook_button);

//ユーザ名をアラート。ここどうなってるか調べる
/*Ti.Facebook.requestWithGraphPath('me', {}, "GET",function(e){
	if(e.success){
		var obj = JSON.parse(e.result);
		alert(obj.name + "!");
		
	}
});

*/