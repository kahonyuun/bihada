var win = Ti.UI.createWindow();
/*var view = Ti.UI.createView({

backgroundColor : "black",
title : "美肌アラーム"
});
*/

//Top
//function TabGroup (){
var TabGroup = Ti.UI.createTabGroup();

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
TabGroup.addTab(tab1);  
TabGroup.addTab(tabG);
TabGroup.addTab(tabT);
TabGroup.addTab(tabS);


//ボタン
var button = Ti.UI.createButton({
	title:'START',
	height:100,
	width:100,
	top:350,
	bottom:50,
	color:'#eea2b5'
});

win.add(button);

botton.addEventListener('click', function(e){
TabGroup.open();
});