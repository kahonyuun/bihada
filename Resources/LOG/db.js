/*var common = require('common');
common.init();
var self = Ti.UI.currentWindow;
*/
function db_test (){
var db = Ti.Database.open('testdb');

db.execute('create table if not exists users(name text,sales integer)');
db.execute('insert into users (name,sales) values (?,?)','taguchi',200);
//db.execute('insert into users (name,sales) values (?,?)','suzuki',300);

var rows = db.execute('select rowid,* from users');
Ti.API.info('row count = '+rows.getRowCount());

while(rows.isValidRow()){
	Ti.API.info('id:'+rows.fieldByName('rowid')+'name:'+rows.field(1)+ 'sales:'+ rows.fieldByName('sales'))
	rows.next();
}
rows.closed;
db.close();
};
db_test();
//db.remove();
