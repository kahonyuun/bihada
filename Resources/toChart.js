//var webView = 
function webView(){
	 ExampleWindow = require('/charts');
	exwin = new ExampleWindow();
	exwin.open(); 
};
webView();
/*
var win = Ti.UI.createWindow();
var viewTop = Ti.UI.createView({
	top:0,
	hight:'50%',
	width:'100%',
});
win.add(viewTop);
//viewTop.add(webView);
*/
// ツールバーを表示する
/*var toolbar = null;
if(Titanium.Platform.name == 'iPhone OS'){
  var button = Titanium.UI.createButton({
    title:'ボタン'
  });
  w.setToolbar([button]);
}
else{
  toolbar = Ti.UI.createView({
    backgroundColor: '#000',
    opacity:0.8,
    bottom:10,
    width:300,
    height:50,
    zIndex:1000
  });
  toolbar.add(Ti.UI.createLabel({
    text: 'ボタン代わり'
  }));
  w.add(toolbar);
};
*/