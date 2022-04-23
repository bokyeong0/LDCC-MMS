var TempUtil = function () {
	"use strict";
	return {
		makePieChart : function(options){
			var chart = new PieChart(options);
			chart.init();
			return chart;
		}
    };
    

    function PieChart(options) {
    	console.log("차트생성2 : "+options);
    	var settings = $.extend({
    		data1: '',
    		data2: '',
    		data3: '',
    		chartData: {},
    	},options);
    	
    	var thisChart = this;
    	
    	return {
    		init : function(){
    			createChart(settings);
    		},
    		reload : function(params){
    			console.log(settings.data1);
    			console.log(settings.data2);
    			console.log(settings.data3);
    			ajax(params);
    		},
    		set : function(options){
    			 settings = $.extend(settings,options);
    		}
    	};
    	
    	function createChart(settings){
    		console.log("차트생성 chartData : ");
    		console.log(settings);
    		ajax(settings);
    	} 
    	function ajax(settings){
    		console.log("차트생성 chartData : ");
    		console.log(settings);
//    		thisChart.set();
    		success:function(result){
    			settings.data = result;
    			reload();
    		}
    	} 
    };
    
}();