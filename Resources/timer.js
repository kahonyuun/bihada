exports.init = function(){
	Ti.API.info('timer.js');

//画像
/*var topImage = Ti.UI.createImageView({
	image:"image/bihada.jpg"
})
*/
};

exports.timer = function(){
	//Ti.API.info('timer');
	
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
};
