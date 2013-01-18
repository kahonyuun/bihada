/*var common = require('../common/common');
 common.init();

 self.top = 0;
 self.height = 410;
 */
win = Ti.UI.createWindow;
self = Ti.UI.currentWindow;

self.top = 0;
self.height = 410;



// Create a Button.
var aButton = Ti.UI.createButton({
	title : 'aButton',
	height : 100,
	width : 100,
	top : 10,
	left : 50
});

// Add to the parent view.
self.add(aButton);


//Twitter
/*function tweet (message){
oAuthAdapter.send(
'https://api.twitter.com/1/statuses/update.json',
[['status', message]],
'Twitter',
'せいこうしたよ',
'せいこうしなかったよ'
);

if (oAuthAdapter.isAuthorized() == false) {
var receivePin = function() {
oAuthAdapter.getAccessToken(
'https://api.twitter.com/oauth/access_token'
);
oAuthAdapter.saveAccessToken('twitter');
};
oAuthAdapter.showAuthorizeUI(
'https://api.twitter.com/oauth/authorize?' +
oAuthAdapter.getRequestToken(
'https://api.twitter.com/oauth/request_token'
),
receivePin
);
};

var aLabel = Ti.UI.createLabel({
text : 'ねるのぜ',
color : '#',
font : {fontSize:myFontSize},
height : 100,
width : 200,
top : 20,
textAlign : 'center'
});

self.add(aLabel);

//TWEETボタン
var tweet_button = Ti.UI.createButton({
title:"Tweet",
top:170
});

var post = tweet_button.addEventListener('click',function(){
//tweet;

});

self.add(tweet_button);
*/

var tabGroup = Ti.UI.currentWindow.tabGroup;
//function selectd_close(){
	var close = Ti.UI.currentWindow.close(); 
	var selected = tabGroup.addEventListener('focus',function(e){
		//Ti.API.info('e')
	});
//};
//selected_close();

