exports.init = function(){
	//Ti.API.info('init')
	
	 self = Ti.UI.currentWindow;
	//self.barColor = "black";
	Ti.API.info(self);
	
	//commonになくともapp.jsに書いておけば全てのwinに色が適用される
	var color = Titanium.UI.setBackgroundColor('pink');
	var View = Ti.UI.createView;
	
	


};
