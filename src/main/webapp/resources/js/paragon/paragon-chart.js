
(function ($){
//	var blue		= '#348fe2',
//	    blueLight	= '#5da5e8',
//	    blueDark	= '#1993E4',
//	    aqua		= '#49b6d6',
//	    aquaLight	= '#6dc5de',
//	    aquaDark	= '#3a92ab',
//	    green		= '#00acac',
//	    greenLight	= '#33bdbd',
//	    greenDark	= '#008a8a',
//	    orange		= '#f59c1a',
//	    orangeLight	= '#f7b048',
//	    orangeDark	= '#c47d15',
//	    dark		= '#2d353c',
//	    grey		= '#b6c2c9',
//	    purple		= '#727cb6',
//	    purpleLight	= '#8e96c5',
//	    purpleDark	= '#5b6392',
//	    red         = '#ff5b57';
	
	var timeUnitSize = {
			"second"  : 1000,
			"minute"  : 60 * 1000,
			"hour"	  : 60 * 60 * 1000,
			"day"	  : 24 * 60 * 60 * 1000,
			"month"	  : 30.436875 * 24 * 60 * 60 * 1000,
			"quarter" : 3 * 30.436875 * 24 * 60 * 60 * 1000,
			"year"	  : 365.2425 * 24 * 60 * 60 * 1000
		};
	
	var defColor = [ '#348fe2',
	                 '#5b6392',
	                 '#b6c2c9',
	                 '#f7b048',
	                 '#33bdbd',
	                 '#6dc5de',
	                 '#8e96c5',
	                 '#2d353c',
	                 '#f59c1a',
	                 '#00acac',
	                 '#49b6d6',
	                 '#5da5e8',
	                 '#1993E4',
	                 '#3a92ab',
	                 '#008a8a',
	                 '#c47d15',
	                 '#727cb6',
	                 '#ff5b57'];
	
	// white
	var white = 'rgba(255,255,255,1.0)';
	var fillBlack = 'rgba(45, 53, 60, 0.6)';
	var fillBlackLight = 'rgba(45, 53, 60, 0.2)';
	var strokeBlack = 'rgba(45, 53, 60, 0.8)';
	var highlightFillBlack = 'rgba(45, 53, 60, 0.8)';
	var highlightStrokeBlack = 'rgba(45, 53, 60, 1)';

	// blue
	var fillBlue = 'rgba(52, 143, 226, 0.6)';
	var fillBlueLight = 'rgba(52, 143, 226, 0.2)';
	var strokeBlue = 'rgba(52, 143, 226, 0.8)';
	var highlightFillBlue = 'rgba(52, 143, 226, 0.8)';
	var highlightStrokeBlue = 'rgba(52, 143, 226, 1)';

	// grey
	var fillGrey = 'rgba(182, 194, 201, 0.6)';
	var fillGreyLight = 'rgba(182, 194, 201, 0.2)';
	var strokeGrey = 'rgba(182, 194, 201, 0.8)';
	var highlightFillGrey = 'rgba(182, 194, 201, 0.8)';
	var highlightStrokeGrey = 'rgba(182, 194, 201, 1)';

	// green
	var fillGreen = 'rgba(0, 172, 172, 0.6)';
	var fillGreenLight = 'rgba(0, 172, 172, 0.2)';
	var strokeGreen = 'rgba(0, 172, 172, 0.8)';
	var highlightFillGreen = 'rgba(0, 172, 172, 0.8)';
	var highlightStrokeGreen = 'rgba(0, 172, 172, 1)';

	// purple
	var fillPurple = 'rgba(114, 124, 182, 0.6)';
	var fillPurpleLight = 'rgba(114, 124, 182, 0.2)';
	var strokePurple = 'rgba(114, 124, 182, 0.8)';
	var highlightFillPurple = 'rgba(114, 124, 182, 0.8)';
	var highlightStrokePurple = 'rgba(114, 124, 182, 1)';
	
	var fillColorArr = [fillPurple, fillGreen, fillPurple, fillGrey, fillBlack];
	var fillColorLightArr = [fillPurpleLight, fillGreenLight, fillPurpleLight, fillGreyLight, fillBlackLight];
	var strokeColorArr = [strokePurple, strokeGreen, strokePurple, strokeGrey, strokeBlack];
	var highlightFillArr = [highlightFillPurple, highlightFillGreen, highlightFillPurple, highlightFillGrey, highlightFillBlack];
	var highlightStrokeArr = [highlightStrokePurple, highlightStrokeGreen, highlightStrokePurple, highlightStrokeGrey, highlightStrokeBlack];
	
	$.fn.paragonPieSearch = function(data) {
        that.settings.postData = data;
        ChartUtil.makePieChart(data);
 	};
	
	
	$.fn.flotPieChart = function(options) {
		 var chart = $(this);
			
		 var defaultKey = ['show','radius','innerRadius','startAngle','tilt','offset','shadow','label','combine','highlight'];
		 var settings = $.extend({
	 			ajaxUrl: '',
	 			mtype: "GET",
	            datatype: "json",
	            label : [],
	            customColor : [],
	            resultKey : "dt_chart",
	            labelKey : "label",
				dataKey : "data",
				colorKey : "color",
				
				show: true,
    			radius: 0.9,  // pie-chart 레이블크기   0~1백분율/ 픽셀단위 설정가능
//    			innerRadius: 0.45, // donut-chart 안쪽 반지름 설정     0~1백분율/ 픽셀단위 설정가능
    			startAngle: 1.5,
    			tilt: 1, // 기울기 0~1 백분율
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
    				radius: 0.5,
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
    			
	            option : {
	            	series: {
	            		pie: {
	            		}
	            	},
	            	grid:{
	            		hoverable:true, clickable: true
	            	},
    				legeabelBoxBorderColor :"none"
	            }
		 }, options);
		 
		 for(var i in defaultKey){
			 if(settings[defaultKey[i]]){
				 settings.option.series.pie[defaultKey[i]] = settings[defaultKey[i]];
			 }
		 }
		 
		 if(settings.ajaxUrl){
			 $.ajax({
				 url: settings.ajaxUrl,
				 success: function(result) { 
					 var chartData = result[settings.resultKey];
					 var dataSet = [];
					 for(var i in chartData){
						 var color = chartData[i][settings.colorKey];
						 if(color == undefined && settings.customColor[i] == null){
							 if(defColor.length < i){
								 color = "#ccc";
							 }else{
								 color = defColor[i];
							 }
						 }else{
							 color = settings.customColor[i];
						 }
						 dataSet.push({
							label	: chartData[i][settings.labelKey],
						 	data	: chartData[i][settings.dataKey],
						 	color	: color
						 });
					 }
					 if(chartData.length > 0){
						 chart.plot(dataSet, settings.option);
					 }
				 }
			 });
		 }
	}
	
	$.fn.flotBarChart = function(options) {
		var chart = $(this);
		
		var settings = $.extend({
			ajaxUrl: '',
			mtype: "GET",
			datatype: "json",
			xKey:"x",
			yKey:"y",
			resultKey:"dt_chart",
			labelKey:'',
//			color:"purple",
			colorKey:[],
			option: {
				series : {
					bars : {
						show : true,
						barWidth : 0.3,
						align : 'center',
						fill : true,
						fillColor : purple,
						order : 1,
						zero : true
					}
				},
				xaxis : {
					mode : ["categories"],
//					tickLength: 0,
//		            tickSize: [],
//		            axisLabel: [],
//		            axisLabelUseCanvas: true,
//		            axisLabelFontSizePixels: 13,
//		            axisLabelFontFamily: 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
//		            axisLabelPadding: 15,
					tickColor : '#ddd',
//					tickLength : 0
				},
				grid : {
					borderWidth : 0
				}
			},
			color:[purple]
		
		}, options);
		
		if(options.colorKey){
			settings.option.series.bars.fillColor = options.colorKey;
			settings.color = options.colorKey;
		}
		
		if(settings.ajaxUrl){
			$.ajax({
				url: settings.ajaxUrl,
				success: function(result) {
					var chartData = result[settings.resultKey];
					var value = [];
					for(var i in chartData){
						value.push([chartData[i][settings.xKey], chartData[i][settings.yKey]]);
					}
					
					var dataSet = [{label:settings.labelKey, data:value, color:settings.color}];
					chart.plot(dataSet, settings.option);
				}
			});
		}
	}
	
	$.fn.flotLineChart = function(options){
		var chart = $(this);
		var mode;	// categories , time
		var min;	// 좌표 최소값
		var max;	// 좌표 최대값
		var unit;	// 좌표 단위
		
		var settings = $.extend({
			ajaxUrl: '',
			mtype: "GET",
			datatype: "json",
			resultKey:"dt_chart",
			labelKey:'',
			labelName:'',
			colorKey:[],
			pointKey:[],
			xKey:'',
			yKey:[],
			lKey:'',
			unit:'',
			format:'',
			multiLine:false,
			option:{
				xaxis: {
		            min: '',
		            max: '',
		            mode: '',
		            ticks: '',
		            tickSize:[],
		            timeformat:'',
		            tickLength: '',
		            axisLabel: '',
		        },
		        yaxis: {
					tickColor:'#ddd', 
					show:true,
				},
		        grid: { 
	                hoverable: true, 
	                clickable: true,
	                tickColor: "#ccc",
	                borderWidth: 1,
	                borderColor: '#ddd'
	            },
	            legend: {
	                labelBoxBorderColor: '#ddd',
	                margin: 0,
	                noColumns: 1,
	                show: true
	            },
	            lines: {
	            	show: true, 
	            	fill:false, 
	            	lineWidth: 2 
	            }, 
	            points: { 
	            	show: true, 
	            	radius: 3, 
	            	fillColor:'#727cb6' 
	            }
	            
			}
		},options);
		
		if(settings.xaxis){
			settings.option.xaxis = settings.xaxis;
			mode = settings.option.xaxis.mode;
		}
		
		if(mode == "time"){
			unit = settings.unit.toLowerCase();
			
			switch (unit){
				case "year" 	: unit = timeUnitSize.year	  ; break;
				case "quarter"  : unit = timeUnitSize.quarter ; break;
				case "month" 	: unit = timeUnitSize.month	  ; break;
				case "day" 		: unit = timeUnitSize.day	  ; break;
				case "hour" 	: unit = timeUnitSize.hour	  ; break;
				case "minute" 	: unit = timeUnitSize.minute  ; break;
				case "second" 	: unit = timeUnitSize.second  ; break;
			}
			
		}
		
		if(settings.format == "comma"){
			settings.option.yaxis.tickFormatter = function(val, axis) {
			    // insert comma logic here and return the string
				return val.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
			};
		}
		
		if(settings.ajaxUrl){
			$.ajax({
				url: settings.ajaxUrl,
				success: function(result) {
					var chartData = result[settings.resultKey];
					var labelData;
					var length = chartData.length-1;
					var value = [];
					var dataSet = [];
					var xTicks = [];
					if(mode == "categories"){
						for(var k in settings.yKey){
							for(var i in chartData){
								value.push([parseInt(i), chartData[i][settings.yKey[k]]]);
							}
							if(settings.labelKey === ''){
								dataSet.push({data:value, label:settings.labelName[k], lines: settings.option.lines, points: settings.option.points});
							}else{
								labelData = result[settings.labelKey];
								dataSet.push({data:value, label:labelData[k][settings.lKey], lines:settings.option.lines, points: settings.option.points });
							}
							value = [];
						}
						
//						for(var k in settings.yKey){
//							for(var i=0; i<settings.option.xaxis.tickLength; i++){
////								if(chartData[i][settings.yKey[k]] === undefined){
////									console.log(chartData[i][settings.yKey[k]]);
////								}
//								value.push([(min+(unit*i)), chartData[i][settings.yKey[k]]]);
//							}
//							if(settings.pointKey[k] == null){
//								dataSet.push({data:value, label:settings.labelKey[k], points:settings.option.points, lines:settings.option.lines});
//							}else{
//								dataSet.push({data:value, label:settings.labelKey[k], point:settings.pointKey[k]});
//							}
//							value = [];
//						}
						
						for(var j in chartData){
							xTicks.push([parseInt(j), chartData[j][settings.xKey]]);
						}
						settings.xaxis.ticks = xTicks;
					}
					if(mode == "time"){
						var size = length*unit;
						if(settings.option.xaxis.min && settings.option.xaxis.max){
							min = new Date(settings.option.xaxis.min).getTime();
							max = new Date(settings.option.xaxis.max).getTime();
						}else if(!settings.option.xaxis.min && settings.option.xaxis.max){
							var maxDate = new Date(settings.option.xaxis.max);
							max = maxDate.getTime();
							min = max-size-(maxDate.getPassTime()); 
						}else if(settings.option.xaxis.min && !settings.option.xaxis.max){
							var minDate = new Date(settings.option.xaxis.min);
							min = minDate.getTime();
							max = min+size-(minDate.getPassTime()); 
						}else{
							var now = new Date();
							max = now.getTime();
							min = (max-size)-(now.getPassTime());
						}
						
						settings.option.xaxis.min = min;  
						settings.option.xaxis.max = max;
						
						
						for(var k in settings.yKey){
							for(var i=0; i<chartData.length; i++){
								value.push([(min+(unit*i)), chartData[i][settings.yKey[k]]]);
							}
							if(settings.pointKey[k] == null){
								dataSet.push({data:value, label:settings.labelKey[k], points:settings.option.points, lines:settings.option.lines});
							}else{
								dataSet.push({data:value, label:settings.labelKey[k], point:settings.pointKey[k]});
							}
							value = [];
						}
					}
					plothover(chart);
					showTooltip();
					chart.plot(dataSet, settings.option);
				}
			});
		}
	}
	$.fn.paragonPieChart = function(options){
		var chart = $(this);
		var that = this;
//		var data = {};
		var datasets = [];
		var pieChart = null;
		var settings = $.extend({
			ajaxUrl: '',
			mtype: "GET",
			datatype: "json",
			resultKey:"dt_grid",
			labelKey:'',
			labelName:'',
			dataKey:'',
			chartIds:[],
			pageable:true,
			postData:{
				countable:false,
				pageable:false,
				page:1
			},
			page:1,
			totalRowCnt:'',
			endRow:'',
			data:[],
			pieChart:null,
			option:{
				fillColor : fillBlackLight,
	            strokeColor : strokeBlack,
	            pointColor : strokeBlack,
	            pointStrokeColor : white,
	            pointHighlightFill : white,
	            pointHighlightStroke : strokeBlack,
			}
		},options);
		var thisPageSize = settings.chartIds.length;
		
		if(settings.pageable){
			var page = 1;
			if(settings.page){
				console.log("settings.page");
				console.log(settings.page);
				page = settings.page;
			}
			settings.postData={
				countable:true,
				pageable:true,
				page : page,
				pageSize : thisPageSize
			}
		}
		
		chart.settings = settings;
		
		if(settings.ajaxUrl){
			$.ajax({
				url: settings.ajaxUrl,
				data:settings.postData,
				success: function(data) {
					var totalRowCnt = data.totalRowCnt;
					var endRow = data.endRow;
					var result = data[settings.resultKey];
					var chartValue = settings.dataKey;
					
					
					var chartElArray = [];
					
					for (var i = 0; i < settings.chartIds.length; i++) {
						var el = $(settings.chartIds[i]);
						var chartEl = el.find(".chart-canvas");
						var chartTitle = el.find(".chart-title");
						var chartBottom = el.find(".chart-bottom");
						if(result[i]){
							
							var cnt = 0;
							var chartData = [];
							for(var f=0; f<chartValue.length; f++){
								chartData.push(result[i][chartValue[f]]);
								cnt += chartData[f];
							}
							// 모든데이터가 0이면 기본 폼만 그리기 위함
							if(cnt == 0){
								chartData = [1];
							}
							if(result[i].COMP_NM){
								chartTitle.text(result[i].COMP_NM);
								chartBottom.html("");
								chartBottom.append('<p><strong>총 건수</strong> '+result[i].RCPT_CNT.comma()+' / <strong>처리중</strong> '+result[i].RCPT_CMPL_CNT.comma()+' / <strong>완료</strong> '+result[i].RCPT_CMPL_N_CNT.comma()+' </p>');
							}else{
								chartTitle.text("--------------");
							}
							
						}else{
							chartData = [1];
						}
						
						var data = {
								datasets: [{
									data: chartData,
									backgroundColor:settings.options.backgroundColor,
									borderColor:fillColorLightArr,
									borderWidth: 1
								}], 
								labels:settings.labelName
						};
						if(that.settings){
							var thisChart = that.settings.pieChart[i];
							if(thisChart === undefined){
								pieChart = new Chart(chartEl, {
									type: 'pie',
									responsive: false, 
									maintainAspectRatio: false,
									data: data,
								});
								chartElArray.push(pieChart);
							}else{
								thisChart.data = data;
								thisChart.update();
							}
						}else{
							pieChart = new Chart(chartEl, {
								type: 'pie',
								responsive: false, 
								maintainAspectRatio: false,
								data: data,
							});
							chartElArray.push(pieChart);
						}
					}
					settings.totalRowCnt = totalRowCnt;
					settings.endRow = endRow;
					settings.pieChart = chartElArray;
					that["settings"] = settings;
					
				}
			});
		}
	}
	
	$.fn.paragonLineChart = function(options){
		var chart = $(this);
		var that = this;
		var value = [];
		var dataSet = [];
		var label = [];
		var chartData = [];
		var lineChart = null;
		
		var settings = $.extend({
			ajaxUrl: '',
			mtype: "GET",
			datatype: "json",
			resultKey:"dt_grid",
			xKey:'',
			labelKey:'',
			labelName:'',
			dataKey:'',
			type:'',
			pageable:true,
			postData:{
				countable:false,
				pageable:false,
				page:1
			},
			pageSize:'',
			page:1,
			data:{},
			lineChart:null,
			option:{
				fillColor : fillBlackLight,
	            strokeColor : strokeBlack,
	            pointColor : strokeBlack,
	            pointStrokeColor : white,
	            pointHighlightFill : white,
	            pointHighlightStroke : strokeBlack,
			}
		}, options);
		chart.settings = settings;
		
		var pageSize = settings.pageSize;
		
		if(settings.pageable){
			var page = 1;
			if(settings.page){
				page = settings.page;
			}
			settings.postData.countable = true;
			settings.postData.pageable = true;
			settings.postData.page = page;
			settings.postData.pageSize = pageSize;
		}
		
		if(settings.ajaxUrl){
			$.ajax({
				url: settings.ajaxUrl,
				data:settings.postData,
				success: function(data) {
					var totalRowCnt;
					var endRow;
					var page;
					var name = data.compNm;
					
					if(settings.pageable){
						totalRowCnt = data.totalRowCnt;
						endRow = data.endRow;
						page = data.page;
						name = data.compNm;
					}
					
					var labelName = [];
					var result = data[settings.resultKey];
					var chartValue = settings.dataKey;
					var chartElArray = [];
					
					for(var i=0; i<chartValue.length; i++){
						for(var k=0; k<result.length; k++){
							value.push(result[k][chartValue[i]]);
							if(i === 0){
								label.push(result[k][settings.xKey]);
							}
						}
						
						if(settings.labelName === ''){
							for(var s=0; s<chartValue.length; s++){
								labelName.push(name[s].COMP_NM);
							}
							settings.labelName = labelName;
						}
						
						dataSet.push({
							label:settings.labelName[i],
							backgroundColor:fillColorArr[i],
							borderColor:fillColorLightArr[i],
							borderWidth: 1,
							data : value
						});
						value = [];
						console.log(dataSet);
					}
					var lineChartData = {};
					
					lineChartData.labels = label;
					lineChartData.datasets = dataSet;
					label = [];
					
					
					if(that.settings){
						var thisChart = that.settings.lineChart;
						console.log("기존 line");
						if(thisChart === undefined){
							lineChart = new Chart(chart, {
								type: 'line',
								data: lineChartData,
							});
							chartElArray.push(lineChart);
						}else{
							thisChart.data = lineChartData;
							thisChart.update();
						}
					}else{
						console.log("신규 line");
						lineChart = new Chart(chart, {
							type: 'line',
							height:"400px",
							data: lineChartData,
						});
						chartElArray.push(lineChart);
						settings.totalRowCnt = totalRowCnt;
						settings.page = page;
						settings.lineChart = lineChart;
						that["settings"] = settings;
					}
				}
			});
		}
	}
	
	
	function plothover(chart){
		var previousPoint = null;
		$(this).bind("plothover", function (event, pos, item) {
	        $("#x").text(pos.x);
	        $("#y").text(pos.y);
	        if (item) {
	            if (previousPoint !== item.dataIndex) {
	                previousPoint = item.dataIndex;
	                $("#tooltip").remove();
	                var y = item.datapoint[1];
	                
	                var content = item.series.label + " " + y.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
	                showTooltip(item.pageX, item.pageY, content);
	            	}
	        	} else {
	            	$("#tooltip").remove();
	            	previousPoint = null;            
	        	}
	        	event.preventDefault();
		});
	}
	
	function showTooltip(x, y, contents) {
	if(contents){
		$('<div id="tooltip" class="flot-tooltip">' + contents + '</div>').css(
				{
					top : y - 45,
					left : x - 55
				}).appendTo("body").fadeIn(200);
		}
	}
}(jQuery));






var ChartUtil = function () {
	"use strict";
	
	

	var defColor = [ '#348fe2',
	                 '#5b6392',
	                 '#b6c2c9',
	                 '#f7b048',
	                 '#33bdbd',
	                 '#6dc5de',
	                 '#8e96c5',
	                 '#2d353c',
	                 '#f59c1a',
	                 '#00acac',
	                 '#49b6d6',
	                 '#5da5e8',
	                 '#1993E4',
	                 '#3a92ab',
	                 '#008a8a',
	                 '#c47d15',
	                 '#727cb6',
	                 '#ff5b57'];
	
	// white
	var white = 'rgba(255,255,255,1.0)';
	var fillBlack = 'rgba(45, 53, 60, 0.6)';
	var fillBlackLight = 'rgba(45, 53, 60, 0.2)';
	var strokeBlack = 'rgba(45, 53, 60, 0.8)';
	var highlightFillBlack = 'rgba(45, 53, 60, 0.8)';
	var highlightStrokeBlack = 'rgba(45, 53, 60, 1)';

	// blue
	var fillBlue = 'rgba(52, 143, 226, 0.6)';
	var fillBlueLight = 'rgba(52, 143, 226, 0.2)';
	var strokeBlue = 'rgba(52, 143, 226, 0.8)';
	var highlightFillBlue = 'rgba(52, 143, 226, 0.8)';
	var highlightStrokeBlue = 'rgba(52, 143, 226, 1)';

	// grey
	var fillGrey = 'rgba(182, 194, 201, 0.6)';
	var fillGreyLight = 'rgba(182, 194, 201, 0.2)';
	var strokeGrey = 'rgba(182, 194, 201, 0.8)';
	var highlightFillGrey = 'rgba(182, 194, 201, 0.8)';
	var highlightStrokeGrey = 'rgba(182, 194, 201, 1)';

	// green
	var fillGreen = 'rgba(0, 172, 172, 0.6)';
	var fillGreenLight = 'rgba(0, 172, 172, 0.2)';
	var strokeGreen = 'rgba(0, 172, 172, 0.8)';
	var highlightFillGreen = 'rgba(0, 172, 172, 0.8)';
	var highlightStrokeGreen = 'rgba(0, 172, 172, 1)';

	// purple
	var fillPurple = 'rgba(114, 124, 182, 0.6)';
	var fillPurpleLight = 'rgba(114, 124, 182, 0.2)';
	var strokePurple = 'rgba(114, 124, 182, 0.8)';
	var highlightFillPurple = 'rgba(114, 124, 182, 0.8)';
	var highlightStrokePurple = 'rgba(114, 124, 182, 1)';
	
	var fillColorArr = [fillPurple, fillGreen, fillPurple, fillGrey, fillBlack];
	var fillColorLightArr = [fillPurpleLight, fillGreenLight, fillPurpleLight, fillGreyLight, fillBlackLight];
	var strokeColorArr = [strokePurple, strokeGreen, strokePurple, strokeGrey, strokeBlack];
	var highlightFillArr = [highlightFillPurple, highlightFillGreen, highlightFillPurple, highlightFillGrey, highlightFillBlack];
	var highlightStrokeArr = [highlightStrokePurple, highlightStrokeGreen, highlightStrokePurple, highlightStrokeGrey, highlightStrokeBlack];
	
	
	
	
	var that = {};
	
	
	return  {
		makePieChart: function (options) {
			var pieChart = new mekePieChar( options);
		},
		reload: function (options) {
			mekePieChar( options,true);
		}
    };
    
    function mekePieChar(options, reload){
    	

//		var chart = $(this);
		console.log(this);
//		console.log(chart.attr("id"));
		var datasets = [];
		var pieChart = null;
		var settings = $.extend({
			ajaxUrl: '',
			mtype: "GET",
			datatype: "json",
			resultKey:"dt_grid",
			labelKey:'',
			labelName:'',
			dataKey:'',
			chartIds:[],
			pageable:true,
			postData:{
				countable:false,
				pageable:false,
				page:1
			},
			page:1,
			canvasClass:'',
			totalRowCnt:'',
			endRow:'',
			data:[],
			pieChart:[],
			option:{
				fillColor : fillBlackLight,
	            strokeColor : strokeBlack,
	            pointColor : strokeBlack,
	            pointStrokeColor : white,
	            pointHighlightFill : white,
	            pointHighlightStroke : strokeBlack,
			}
		},options);
		var thisPageSize = settings.chartIds.length;
		if(settings.pageable){
			var page = 1;
			if(settings.page){
				page = settings.page;
			}
			settings.page = page;
			settings.postData.countable = true;
			settings.postData.pageable = true;
			settings.postData.page = page;
			settings.postData.pageSize = thisPageSize;
		}
		
//		chart.settings = settings;
		
		
		if(settings.ajaxUrl){
			$.ajax({
				url: settings.ajaxUrl,
				data:settings.postData,
				success: function(data) {
					var totalRowCnt;
					var endRow;
					var page;
					if(settings.pageable){
						totalRowCnt = data.totalRowCnt;
						endRow = data.endRow;
						page = data.page;
					}
					var result = data[settings.resultKey];
					var chartValue = settings.dataKey;
					var chartElArray = [];
					
					
					for (var i = 0; i < settings.chartIds.length; i++) {
						var el = $(settings.chartIds[i]);
						var chartEl = el.find(".chart-canvas");
						if(settings.canvasClass){
							chartEl = el.find(settings.canvasClass);
						}
						var chartTitle = el.find(".chart-title");
						var chartBottom = el.find(".chart-bottom");
						if(result[i]){
							var cnt = 0;
							var chartData = [];
							for(var f=0; f<chartValue.length; f++){
								chartData.push(result[i][chartValue[f]]);
								cnt += chartData[f];
							}
							// 모든데이터가 0이면 기본 폼만 그리기 위함
							if(cnt == 0){
								chartData = [1];
							}
							if(result[i].COMP_NM){
								chartTitle.text(result[i].COMP_NM);
								chartBottom.html("");
								chartBottom.append('<p><strong>총 건수</strong> '+result[i].RCPT_CNT.comma()+' / <strong>처리중</strong> '+result[i].RCPT_CMPL_CNT.comma()+' / <strong>완료</strong> '+result[i].RCPT_CMPL_N_CNT.comma()+' </p>');
							}else{
								chartTitle.text("--------------");
							}
							
						}else{
							chartData = [1];
						}
						
						var data = {
								datasets: [{
									data: chartData,
									backgroundColor:settings.options.backgroundColor,
									borderColor:fillColorLightArr,
									borderWidth: 1
								}], 
								labels:settings.labelName
						};
						if(reload){
//							var thisChart = that.settings.pieChart[i];
							if(settings.pieChart.length  == 0){
								pieChart = new Chart(chartEl, {
									type: 'pie',
									responsive: false, 
									maintainAspectRatio: false,
									data: data,
								});
								chartElArray.push(pieChart);
								console.log("신규");
							}else{
								thisChart.data = data;
								thisChart.update();
								console.log("기존");
							}
						}else{
							console.log("신규");
							pieChart = new Chart(chartEl, {
								type: 'pie',
								responsive: false, 
								maintainAspectRatio: false,
								data: data,
							});
							chartElArray.push(pieChart);
						}
					}
					settings.totalRowCnt = totalRowCnt;
					settings.page = page;
					settings.endRow = endRow;
					settings.pieChart = chartElArray;
					that["settings"] = settings;
				}
			});
		}
		
		return that;
    	
    	
    }
}();