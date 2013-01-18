/* グラフ描画関連
*/
function Graph() {
// var self = Ti.UI.createView({
// backgroundColor : "#29373a",
// })
var PrettyCharts = require('com.gnddesign.prettycharts');
var self = PrettyCharts.createChart({
/* basic */
// backgroundColor : "#29373a",
top : "0%",
width : "100%",
height : 200,
// layout : 'vertical',

leftChartType: 0,　// 0:棒グラフ 1:折れ線グラフ
leftChartColor: 2, // 0:青 1:緑 2:赤 3:オレンジ 4: 黄 5:紫
leftDataTitle: "一緒にいた時間",
leftDataUnit: "時間",
leftDataArray: [ 10, 11, 13, 15, 11, 24, 9, 19, 20, 21, 24, 11, 13.2, 15, 12, 13, 19, 20, 21.5, 17, 9, 12, 13, 11, 24, 17, 24],
});;

return self;
}
//make constructor function the public component interface
module.exports = Graph;