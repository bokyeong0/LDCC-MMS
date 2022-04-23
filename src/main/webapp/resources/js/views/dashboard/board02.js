/** Copyright (c) 2017 VertexID RND, Inc.
 * 
 * Application Name : 콜센터 장에 등록[ObstacleReceiptApp]
 * Program Code     : PC0101
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * 김진호			2017. 3. 16. 		First Draft.        javascript
 */


var Dashboard02App = function () {
	"use strict";
	
	
	
	// [El]자산정보 그리드
	var userInfo = Util.getUserInfo();
	var userNo = userInfo.s_userNo;
	
	var $lineChart = $("#board2line-chart");
	var lineChart = document.getElementById('board2line-chart').getContext('2d');
	var lineChart2 = document.getElementById('board2line-chart');
	
	var pieChartGroup = null;
	var lineGroup = null;
	var strDashboard02Interval =null;
	
	return {
        init: function () {
        	lineChart.canvas.height = 400;
        	lineChart.canvas.width = 1457;
        	
        	fnMakeChart();
        	fnDashboard02Event();
        	
        	
	    }
    };
    
    function fnDashboard02Event(page){
		$("#dashboard02StopBtn").hide();
    	$("#dashboard02StopBtnFull").hide();
    	$("#dashBoard02FullBtn").click(function(){
    		$("#dashboard02Content").addClass("expend-content");
    		$("#dashBoard02FullBtn").hide();
    	});
    	//최소화
    	$("#dashBoard02MinBtn").click(function(){
    		$("#dashboard02Content").removeClass("expend-content");
    		$("#dashBoard02FullBtn").show();
    	});
		//자동 조회
    	$("#dashboard02StartBtn, #dashboard02StartBtnFull").click(function(){
    		if(!strDashboard02Interval){
    			alert("자동조회가 시작되었습니다.");
	    		strDashboard02Interval = setInterval(function () {
	    			fnReloadChart();
	    		}, 5000);
    		}
			$("#dashboard02StartBtn").hide();
			$("#dashboard02StopBtn").show();
			$("#dashboard02StartBtnFull").hide();
			$("#dashboard02StopBtnFull").show();
    	});
    	$("#dashboard02StopBtn, #dashboard02StopBtnFull").click(function(){
			clearInterval(strDashboard02Interval);
			strDashboard02Interval = null;
			alert("자동조회가 중지되었습니다.");
			$("#dashboard02StartBtn").show();
			$("#dashboard02StopBtn").hide();
			$("#dashboard02StartBtnFull").show();
			$("#dashboard02StopBtnFull").hide();
    	});
    	
    	$("#dashBoard02PrevBtn").click(function(){
    		pieChartGroup.prev();
//    		lineGroup.prev();
    	});
    	$("#dashBoard02NextBtn").click(function(){
    		pieChartGroup.next();
//    		lineGroup.next();
    	});
    }
    
    function fnMakeChart(){
    	pieChartGroup = TempUtil.makePieChart({
    		ajaxUrl:'/ctrl/dashboard/viewPieChart02',
     		labelName : ['완료', '처리중'],
     		dataKey : ["RCPT_CMPL_CNT","RCPT_CMPL_N_CNT"],
     		chartIds:["#board2pie-chart1","#board2pie-chart2","#board2pie-chart3","#board2pie-chart4"],
     		headerIds:["#board2p1","#board2p2","#board2p3","#board2p4"],
     		bottomIds:["#board2c1","#board2c2","#board2c3","#board2c4"],
     		canvasClass:".chart-canvas2",
     		pageable:true,
     		options:{
     			backgroundColor:['rgba(52, 143, 226,0.8)', 'rgba(247, 143, 30,1)']
     		}
    	});
    	
    	lineGroup = TempUtil.makeLineChart({
    		ajaxUrl:'/ctrl/dashboard/viewLineChart02',
    		resultKey:"lineChart",
    		dataKey : ["COMP0", "COMP1", "COMP2", "COMP3"],
    		labelKey:"COMP_NM",
    		xKey: 'XTICK',
    		pageSize:4,
    		lineChart:'#board2line-chart',
    		pageable:true,
    		options:{
    			backgroundColor:['rgba(152, 143, 226,0.8)', 'rgba(247, 143, 30,1)']
    		}
    	});
    }
    
    function fnReloadChart(){
    	pieChartGroup.reload();
		lineGroup.reload();
    }
    
}();

$(document).ready(function() {
	Dashboard02App.init();
	var data = {"a":1, "b":2}
	var search = {"aa":100, "b":200}
	var aa = data+search;
	console.log(JSON.stringify(data));
	console.log(JSON.stringify(search));
	console.log(JSON.stringify(aa));
});
