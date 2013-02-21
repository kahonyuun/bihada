function get_data(){
var db = Ti.Database.install('db','test');
db.execute('select rowid from date order by limit 1');

var rows = db.execute('select * from date');
//Ti.API.info(rows);

while(rows.isValidRow()){
	Ti.API.info('id:'+rows.fieldByName('rowid')+' IN_TIME:'+ rows.fieldByName('in_time')+' OUT_TIME:'+ rows.fieldByName('out_time'))
	rows.next();
}

rows.closed;
db.close();
};
get_data();
