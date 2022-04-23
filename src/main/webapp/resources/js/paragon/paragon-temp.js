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

var TempUtil = function () {
	"use strict";
	return {
		makePieChart : function(options){
			var chart = new pieChart(options);
			chart.init();
			return chart;
		},
		makeLineChart : function(options){
			var chart = new lineChart(options);
			chart.init();
			return chart;
		}
    };
    

    function pieChart(options) {
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
			pageable:false,
			postData:{
				countable:false,
				pageable:false,
				page:1
			},
			canvasClass:'',
			totalRowCnt:'',
			endRow:'',
			data:{},
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
		var sp = settings.postData;
		var thisPageSize = settings.chartIds.length;
		if(settings.pageable){
			sp.countable = true;
			sp.pageable = true;
			sp.pageSize = thisPageSize;
			sp.page = 1;
		}
    	
    	return {
    		init : function(){
    			createChart(settings);
    		},
    		reload : function(options){
    			if(options){
    				settings.postData = options;
    			}
    			if(settings.pageable){
        			if(sp.totalRowCnt/sp.pageSize <= sp.page){
        				sp.page = 1;
        			}else{
        				sp.page++;
        			}
        		}
    			ajax(settings);
    		},
    		set : function(options){
    			settings = $.extend(settings,options);
    		},
    		next : function(options){
    			if(sp.totalRowCnt/sp.pageSize <= sp.page){
    				sp.page = 1;
    			}else{
    				sp.page++;
    			}
    			ajax(settings);
    		},
    		prev : function(options){
    			if(sp.page == 1){
    				sp.page = Math.ceil(sp.totalRowCnt/sp.pageSize);
    			}else{
    				sp.page--;
    			}
    			ajax(settings);
    		}
    		
    	};
    	
    	function createChart(settings){
    		var chartElArray = [];
    		for (var i = 0; i < settings.chartIds.length; i++) {
	    		var el = $(settings.chartIds[i]);
	    		var chartEl = el.find(settings.canvasClass);
	    		pieChart = new Chart(chartEl, {
	    			type: 'pie',
	    			responsive: false, 
	    			maintainAspectRatio: false,
	    			data: {},
	    		});
	    		chartElArray.push(pieChart);
    		}
    		settings.pieChart = chartElArray;
    		if(settings.labelKey){
    			settings.labelName = settings.labelKey;
    		}
    		ajax(settings);
    	} 
    	function ajax(settings){
    		$.ajax({
    			url: settings.ajaxUrl,
				data:settings.postData,
				success: function(data) {
					var result = data[settings.resultKey];
					var chartValue = settings.dataKey;
					
					for (var i = 0; i < settings.chartIds.length; i++) {
						if(result[i].COMP_NM){
							var el = $(settings.chartIds[i]);
							var chartTitle = el.find(".chart-title");
							var chartBottom = el.find(".chart-bottom");
								chartTitle.text(result[i].COMP_NM);
								chartBottom.html("");
								chartBottom.append('<p><strong>총 건수</strong> '+result[i].RCPT_CNT.comma()+' / <strong>처리중</strong> '+result[i].RCPT_CMPL_CNT.comma()+' / <strong>완료</strong> '+result[i].RCPT_CMPL_N_CNT.comma()+' </p>');
						}
						
						var chart = settings.pieChart[i];
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
						}else{
							chartData = [1];
						}
						var pieData = {
								datasets: [{
									data: chartData,
									backgroundColor:settings.options.backgroundColor,
									borderColor:fillColorLightArr,
									borderWidth: 1
								}], 
								labels:settings.labelName
						};
						chart.data = pieData;
						chart.update();
					}
					
					
					if(settings.pageable){
						sp.page		= data.page;
						sp.startRow	= data.startRow;
						sp.totalRowCnt = data.totalRowCnt;
					}
				}
    		});
    	} 
    };
    
    
    function lineChart(options) {
//    	var chart = $(this);
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
			pageable:false,
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
//		chart.settings = settings;
		var sp = settings.postData;
		var thisPageSize = settings.dataKey.length;
		if(settings.pageable){
			sp.countable = true;
			sp.pageable = true;
			sp.pageSize = thisPageSize;
			sp.page = 1;
		}
		
    	return {
    		init : function(){
    			createChart(settings);
    		},
    		reload : function(options){
    			if(options){
//    				settings = $.extend(settings,options);
    				settings.postData = options;
    				
    			}
    			if(settings.pageable){
        			if(sp.totalRowCnt/sp.pageSize <= sp.page){
        				sp.page = 1;
        			}else{
        				sp.page++;
        			}
        		}
    			ajax(settings);
    		}
    		
    	};
    	
    	function createChart(settings){
    		var chart = $(settings.lineChart);
			lineChart = new Chart(chart, {
				type: 'line',
				data: {},
			});
			settings.lineChart = lineChart;
    		ajax(settings);
    	} 
    	function ajax(settings){
    		$.ajax({
				url: settings.ajaxUrl,
				data:settings.postData,
				success: function(data) {
					var value = [];
					var label = [];
					var dataSet = [];
					var labelName = [];
					
					var chart = settings.lineChart;
					var name = data.labelData;
					
					var result = data[settings.resultKey];
					var chartValue = settings.dataKey;
					
					for(var i=0; i<chartValue.length; i++){
						for(var k=0; k<result.length; k++){
							value.push(result[k][chartValue[i]]);
							if(i === 0){
								label.push(result[k][settings.xKey]);
							}
						}
						
						
						
						if(settings.labelKey){
//							for(var s=0; s<chartValue.length; s++){
							labelName.push(name[i][settings.labelKey]);
//							}
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
					}
					var lineChartData = {};
					
					lineChartData.labels = label;
					lineChartData.datasets = dataSet;
					chart.data = lineChartData;
					chart.update();
					
					if(settings.pageable){
						sp.page		= data.page;
						sp.startRow	= data.startRow;
						sp.totalRowCnt = data.totalRowCnt;
					}
				}
			});
    	}
    };
    
}();