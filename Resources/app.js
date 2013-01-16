var common = require('common');
common.init();

function FirstView(){
var win = Ti.UI.createWindow();
var view = Ti.UI.createView({

backgroundColor : "black",
title : "美肌アラーム"
});


//Top
var myself= Ti.UI.createTabGroup();


var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'LOG',
    window:win
});

//グラフ
var winG = Titanium.UI.createWindow({  
    url:"LOG/log.js"
});
var tabG = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'グラフ',
    window:winG
});

//Tips
var winT = Titanium.UI.createWindow({  
  url:"Tips/top.js"
});
var tabT = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'お肌',
    window:winT
});


//設定
var winS = Titanium.UI.createWindow({  
    title:'設定',
    url:"setting.js"
});
var tabS = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'設定',
    window:winS
});



//  add tabs
myself.addTab(tab1);  
myself.addTab(tabG);
myself.addTab(tabT);
myself.addTab(tabS);


//ボタン
var botton = Ti.UI.createButton({
	title:'START',
	height:100,
	width:100,
	top:350,
	bottom:50,
	color:'#eea2b5'
});

self.add(botton);

botton.addEventListener('click', function(){
myself.open();

});


};



FirstView();
