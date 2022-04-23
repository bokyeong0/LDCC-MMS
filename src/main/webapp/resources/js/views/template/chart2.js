$(document).ready(function() {
//	App.init();
	donutChart();
	interactiveChart();
	interactiveChart2();
	barChart();
	poll();
//	browser();
//	interval();
});
var blue		= '#348fe2',
	blueLight	= '#5da5e8',
	blueDark	= '#1993E4',
	aqua		= '#49b6d6',
	aquaLight	= '#6dc5de',
	aquaDark	= '#3a92ab',
	green		= '#00acac',
	greenLight	= '#33bdbd',
	greenDark	= '#008a8a',
	orange		= '#f59c1a',
	orangeLight	= '#f7b048',
	orangeDark	= '#c47d15',
	dark		= '#2d353c',
	grey		= '#b6c2c9',
	purple		= '#727cb6',
	purpleLight	= '#8e96c5',
	purpleDark	= '#5b6392',
	red         = '#ff5b57';

var epochT = (new Date).getTime(); // 현재 시간
var year = 31556952000;     // 년     365.2425 * 24 * 60 * 60 * 1000
var quarter = 7776000000;   // 분기  3 * 30 * 24 * 60 * 60 * 1000
var month = 2592000000;     // 월     30 * 24 * 60 * 60 * 1000
var day = 86400000;         // 일     24 * 60 * 60 * 1000
var hour = 3600000;         // 시간  60 * 60 * 1000 
var minute = 60000;         // 분     60 * 1000,
var second = 1000;          // 초     1000

function donutChart(){
	$.ajax({
		type:"POST",
		dataType:"json",
		url:"/ctrl/template/chart/donutChartAjax",
		success: function(data){
		        var data = data.dt_dChart; // label, label별 값
		        var series = data.length; // 갯수
		        var option = {
		        		series: {
			                pie: { 
			                	innerRadius: 0.5, // 안쪽 원 반지름
			                    show: true
			                }
			            },
			            grid:{hoverable: true, clickable: true},
			            legend: {show: false}
		        };
		        $.plot($("#donut-chart"), data, option);
			},
		error: function(e, x, o){
			alert(e+": "+x+": "+o);
		}
	});
}

function interactiveChart(){
	$.ajax({
		type:"POST",
		dataType:"json",
		url:"/ctrl/template/chart/interactiveChartAjax",
		success: function(data){
			var x = (epochT - year)+month;
			var iData = data.dt_iChart;
			var result = [];
			var chart = $("#interactive-chart");
			for(var i in iData){
				result.push([x+(month*i), iData[i].y]);
			}
			var dataset = [
			               {
			            	 data: result, label: "카운트", color: purple,
							 lines: { show: true, fill:false, lineWidth: 2 },
							 points: { show: false, radius: 5, fillColor: '#fff' },
							 shadowSize: 0 
			               }
			              ];
			var option ={
						xaxis: {tickColor:'#ddd', mode:"time", timeformat:"%y-%m" ,tickSize:[1, "month"], min:x, max:epochT},
			            yaxis: {tickColor:'#ddd', show:true},
			            grid: {hoverable:true, clickable:true, tickColor:"#ccc", borderWidth:1, borderColor:'#ddd'},
			            legend: {labelBoxBorderColor:'#ddd', margin:0, noColumns:1, show:true}
						};
			showTooltip();
			plothover(chart);
			
			$.plot(chart, dataset, option);
		},
		error: function(e, x, o){
			alert(e+": "+x+": "+o);
		}
	});
}

function barChart(){
	$.ajax({
		type:"POST",
		dataType:"json",
		url:"/ctrl/template/chart/donutChartAjax",
		success: function(data){
				var bData = data.dt_dChart;
				var result = [];
				for(var i in bData){
					result.push([bData[i].label, bData[i].data]);
				}
				var dataset = [ {data:result,color:aquaDark} ];
				var option = {
						 series: {
				                bars: {show: true, barWidth: 0.4, align: 'center', fill: true, fillColor: purple, zero:true }
				            },
				            xaxis: {mode: "categories", tickColor: '#ddd', tickLength: 0 },
				            grid: {borderWidth: 0}
				};
		        $.plot($("#bar-chart"), dataset, option);
		},
		error: function(e, x, o){
			alert(e+": "+x+": "+o);
		}
	});
}

function interactiveChart2(){
	$.ajax({
		type:"POST",
		dataType:"json",
		url:"/ctrl/template/chart/interactiveChartAjax2",
		success: function(data){
			var x = (epochT-year)+month;
			var iData = data.dt_iChart2;
			var app = [];
			var web = [];
			for(var i in iData){
				app.push([x+(month*i), iData[i].app]);
				web.push([x+(month*i), iData[i].web]);
			}
			var dataset = [
			               {label:"app", data:app, color: red},
			               {label:"web", data:web, color: blueDark},
			               ];
			var option ={
					xaxis: {tickColor: '#ddd', mode:"time", timeformat: "%y-%m", tickSize: [1, "month"], min: x, max: epochT},
		            yaxis: {tickColor: '#ddd',show:true},
			        grid: {hoverable: true, clickable: true, tickColor: "#ccc", borderWidth: 1, borderColor: '#ddd' },
			        legend: {labelBoxBorderColor: '#ddd', margin: 0, noColumns: 1, show: true }
			        };
			showTooltip();
			plothover();
			$.plot($("#interactive-chart2"), dataset, option);
		},
		error: function(e, x, o){
			alert(e+": "+x+": "+o);
		}
	});
}
function poll(){
	$.ajax({
		type:"POST",
		dataType:"json",
		url:"/ctrl/template/chart/pollChartAjax",
		success: function(data){
			plothover();
			showTooltip();
			var pData = data.dt_pChart;
			var result = [];
			for(var i in pData){
				result.push([i, pData[i].y]);
			}
			var dataset = [{
			            	data: result, label: "Page Views", color: purple, 
			            	lines: { show: true, fill:false, lineWidth: 2 },
				            points: { show: false, radius: 5, fillColor: '#fff' },
				            shadowSize: 0 
			               }];
			var option = {
					xaxis: {tickColor: '#ddd', show:false },
		            yaxis: {tickColor: '#ddd',show:true, tickSize: 1},
		            grid: {hoverable: true, clickable: true, tickColor: "#ccc", borderWidth: 1, borderColor: '#ddd'},
		            legend: {labelBoxBorderColor: '#ddd', margin: 0, noColumns: 1, show: true}
			};
			
			$.plot($("#live-updated-chart"), dataset, option);
		},
		error: function(e, x, o){
			alert(e+": "+x+": "+o);
		}
	})
}

function interval(){
	setInterval(poll, 9000);
}
function showTooltip(x, y, contents) {
    $('<div id="tooltip" class="flot-tooltip">' + contents + '</div>').css( {
        top: y - 45,
        left: x - 55
    }).appendTo("body").fadeIn(200);
}
function plothover(chart){
	var previousPoint = null;
	$("#live-updated-chart").bind("plothover", function (event, pos, item) {
        $("#x").text(pos.x.toFixed(2));
        $("#y").text(pos.y.toFixed(2));
        if (item) {
            if (previousPoint !== item.dataIndex) {
                previousPoint = item.dataIndex;
                $("#tooltip").remove();
                var y = item.datapoint[1].toFixed(2);
                
                var content = item.series.label + " " + y;
                showTooltip(item.pageX, item.pageY, content);
            }
        } else {
            $("#tooltip").remove();
            previousPoint = null;            
        }
        event.preventDefault();
    });
}