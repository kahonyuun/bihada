// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();


//
// ログページ
var win1 = Titanium.UI.createWindow({  
    backgroundColor:'#fff'
});
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'LOG',
    window:win1
});

var view1 = Ti.UI.createView({
	top:"0%",
	width:"100%",
	height : 250,
	layout: 'absolute',
	//backgroundColor :
});
win1.add(view1);

var topImage = Ti.UI.createImageView({
	image:"image/bihada.jpg"
});

view1.add(topImage);


var view2 = Ti.UI.createView({
	top :"80%",
	width:"100%",
	height:150,
	layout:'absolute',
	backgroundColor:'red',
});


var buttonIn = Ti.UI.createButton({
	title : '布団IN!',
	height : 50,
	top : '0%',
	width : 80,
});

buttonIn.addEventListener('click', function(e){
	Ti.UI.createWindow({
		url: 'first.js',
	})
});

view1.add(buttonIn);


/*var label1 = Titanium.UI.createLabel({
	color:'#999',
	text:'I am Window 1',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

win1.add(label1);
*/


//グラフ
var win2 = Titanium.UI.createWindow({  
    backgroundColor:'#fff'
});
var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Tab 2',
    window:win2
});

//Tips
var win3 = Titanium.UI.createWindow({  
    backgroundColor:'#fff'
});
var tab3 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Tab 1',
    window:win3
});


//設定
var win4 = Titanium.UI.createWindow({  
    title:'設定',
    backgroundColor:'#fff'
});
var tab4 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'設定',
    window:win4
});



//  add tabs
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);
tabGroup.addTab(tab3);
tabGroup.addTab(tab4);


// open tab group
tabGroup.open();
