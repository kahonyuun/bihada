function get_data(){
var db = Ti.Database.open('db');
db.execute('select rowid from date order by ');
db.execute('insert into date (id,in_time,out_time) values (?,CURRENT_TIMESTAMP,null)');

var rows = db.execute('select rowid,* from date');
Ti.API.info('row count = '+rows.getRowCount());
//Ti.API.info(rows);

while(rows.isValidRow()){
	Ti.API.info('id:'+rows.fieldByName('rowid')+' IN_TIME:'+ rows.fieldByName('in_time')+' OUT_TIME:'+ rows.fieldByName('out_time'))
	rows.next();
}

rows.closed;
db.close();
};
get_data();
