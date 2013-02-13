 function webView(){
	 chartView = require('/charts');
	chview = new chartView();
	chview.show(); 
Ti.API.info('toChart2')
};
webView();

// ツールバー表示
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