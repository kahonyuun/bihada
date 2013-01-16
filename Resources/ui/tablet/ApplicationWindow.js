//Application Window Component Constructor
function ApplicationWindow() {
//create component instance
var self = Ti.UI.createWindow({
backgroundColor:'#ffffff'
});
//load component dependencies
var FirstView = require('ui/common/FirstView');

//construct UI
var firstView = new FirstView();

self.add(firstView);

return self;
}
//make constructor function the public component interface
module.exports = ApplicationWindow;