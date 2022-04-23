var ChartApp = function(){
	"use strict";

	//[El] 기본 차트
	var $pieChart = $("#pie-chart");
	
	var $barChart = $("#bar-chart");
	
	var $lineChart = $("#line-Chart");
	
	var $interactiveChart = $("#interactive-chart");
	
	
	return {
		init : function() {
			fnPieChart();
			fnPieChart2();
			fnPieChart3();
			fnPieChart4();
			fnBarChart();
			fnLineChart();
			fnInteractiveChart();
		}
	};
	function fnPieChart(){
		$pieChart.flotPieChart({
			ajaxUrl:"/ctrl/template/chart/pieChartAjax",
			resultKey : "dt_chart",
			labelKey : "LOGIN_OS",
			show: true,
			radius: 0.8,  // pie-chart 레이블크기   0~1백분율/ 픽셀단위 설정가능
			startAngle: 3/2,
			tilt: 0.7, // 기울기 0~1 백분율
			offset: {
				top: 0,	// px단위로 top 띄어쓰기
				left: "auto" // // px단위로 left 띄어쓰기
			},
			shadow: {
				left: 100,	// shadow left offset
				top: 15,	// shadow top offset
				alpha: 0.02	// shadow alpha
			},
			label: {
				show: true,
				radius: 1,
				formatter: function(label, series){
					return '<div style="font-size:11px; text-align:center; padding:2px; color:white;">'+label+'<br/>'+Math.round(series.percent)+'%</div>';
				},
				background:{
					opacity: 0.8,
				}
			},
			combine: {
				threshold: -1,	// percentage at which to combine little slices into one larger slice
				color: null,	// color to give the new slice (auto-generated if null)
				label: "Other"	// label to give the new slice
			},
			highlight: {
				//color: "#fff",		// will add this functionality once parseColor is available
				opacity: 0.5
			},
		});
	}
	function fnPieChart2(){
		$("#pie-chart2").flotPieChart({
			ajaxUrl:"/ctrl/template/chart/pieChartAjax",
			innerRadius:0.3,
//			resultKey : "dt_chart",
			labelKey : "LOGIN_OS",
		});
	}
	function fnPieChart3(){
		$("#pie-chart3").flotPieChart({
			ajaxUrl:"/ctrl/template/chart/pieChartAjax",
			innerRadius:0.5,
//			resultKey : "dt_chart",
			labelKey : "LOGIN_OS",
		});
	}
	function fnPieChart4(){
		$("#pie-chart4").flotPieChart({
			ajaxUrl:"/ctrl/template/chart/pieChartAjax",
			innerRadius:0.7,
//			resultKey : "dt_chart",
			labelKey : "LOGIN_OS",
		});
	}
	function fnBarChart(){
		$barChart.flotBarChart({
			ajaxUrl:"/ctrl/template/chart/barChartAjax",
			resultKey : "dt_chart",
//			labelKey : "LOGIN OS",
//			xKey:"LOGIN_OS",
//			yKey:"data",
			colorKey:"purple"
		});
	}
	function fnLineChart(){
		var year = new Date().getFullYear().toString();
		var month = (new Date().getMonth()+1).toString();
		
		var nowDate = year+"-"+month;
//		
//		var now = new Date().getTime();
//		
//		console.log("::::"+nowDate);
//		
//		console.log("11::"+new Date("2016-12").getTime());
//		console.log("11::"+new Date(nowDate).getTime());
		
		$lineChart.flotLineChart({
			ajaxUrl:"/ctrl/template/chart/interactiveChartAjax",
			resultKey : "dt_chart",
			labelKey : ["loginCount"],
//			xKey:"date",
			yKey:["y"],
			unit:"month",
//			colorKey:"grey"
//			xaxis: {
////				min: 1,
////				max: 31,
//				mode: "categories",
////				xNames:["x"]
////				timeformat:"%d/%m/%y",
////				tickSize: [3, "day"],
////				numberTicks:10,
//				tickLength: 0,
////				axisLabel: 'Month',
////				axisLabelUseCanvas: true,
//		   },
			
		   xaxis: {
//			   min: "2016-01",
			   max: nowDate,
			   mode: "time",
			   tickSize: [1, "month"],
			   timeformat:"%Y-%m",
			   tickLength: 12,
			   axisLabel: "month",
			   axisLabelUseCanvas: true,
		   },
		});
	}
	function fnInteractiveChart(){
		$interactiveChart.flotLineChart({
			ajaxUrl:"/ctrl/template/chart/multiLineChartAjax",
			resultKey : "dt_chart",
			labelKey : ["web", "app"],
			yKey:["web", "app"],
			colorKey:["purple", "grey"],
			unit:"month",
			xaxis: {
//				min: "2016-01-01",
				max: "2016-12",
				mode: "time",
				tickSize: [10, "day"],
				timeformat:"%m-%d",
				axisLabel: "2016",
				axisLabelUseCanvas: true,
		   },
		});
	};
}();



$(document).ready(function() {
	ChartApp.init();
});