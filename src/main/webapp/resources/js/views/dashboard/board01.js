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


var Dashboard01App = function () {
	"use strict";

	// [El]자산정보 그리드
	var $dashboardGrid = $("#dashboardGrid");
	var $dashboardHistGrid = $("#dashboardHistGrid");
	var userInfo = Util.getUserInfo();
	 
	var strDashboard01Interval = null;
	
	var $c1 = $('#c1');
	var $c2 = $('#c2');
	var $c3 = $('#c3');
	var $c4 = $('#c4');
	
	var $lineChart = $('#board1line-chart');
	var lineChart = document.getElementById('board1line-chart').getContext('2d');
	var lineChart2 = document.getElementById('board1line-chart');
	
	var compCd;
	var brndCd;
	
//	var compCd ="";
	
	var chartGroup = null;
	var lineGroup = null;
	return {
        init: function () {
        	lineChart.canvas.height = 220;
        	lineChart.canvas.width = 1457;
        	fnPieChart();
        	fnGetDashboard(false);
        	fnDashboardEvent();
        	fnGetCompNameList();
    	    
	    }
    };
    
    //회사 목록 조회
    function fnGetCompNameList(){
    	$.ajax({
    		url : "/ctrl/standard/company/listMaCompName",
    		type : "POST",
    		cache: false,
    		success : function(result) {
    			var result = result.dt_grid;
    			Util.MakeBootstrapSelectBox($('#board01CompCd'), result, "선택");
    		}
    	});
    }
    
    function fnPieChart(){
    	chartGroup = TempUtil.makePieChart({
    		ajaxUrl:'/ctrl/dashboard/viewDashboard',
    		labelName : ['완료', '처리중'],
    		data:{},
    		dataKey : ["RCPT_CMPL_CNT","RCPT_CMPL_N_CNT"],
    		chartIds:["#board1pie-chart1","#board1pie-chart2","#board1pie-chart3","#board1pie-chart4"],
    		canvasClass:".chart-canvas",
    		options:{
    			backgroundColor:['rgba(52, 143, 226,0.8)', 'rgba(247, 143, 30,1)']
    		}
    	});
    	console.log(chartGroup);
    	lineGroup = TempUtil.makeLineChart({
    		ajaxUrl:'/ctrl/dashboard/lineChart',
    		resultKey : "lineChart",
    		labelName : ['완료', '처리중'],
    		data:{},
    		dataKey : ['RCPT_CMPL_CNT', 'RCPT_CMPL_N_CNT'],
    		xKey: 'XTICK',
    		pageable:false,
    		lineChart:'#board1line-chart',
    		options:{
    			backgroundColor:['rgba(152, 143, 226,0.8)', 'rgba(247, 143, 30,1)']
    		}
    	});
    }
    
    function fnDashboardEvent(){
    	$('#dashboard01SearchWebBtn').click(function(){
    		var data = {
    				compCd : compCd,
    				brndCd : brndCd,
    		}
    		chartGroup.reload(data);
    		lineGroup.reload(data);
    		fnReloadChart(true, data);
    	});
    	
    	$("#dashboard01StopBtn").hide();
    	$("#dashboard01StopBtnFull").hide();
    	$("#fullDashBoard01Btn").click(function(){
        		$("#dashboard01Content").addClass("expend-content");
        		$("#fullDashBoard01Btn").hide();
    	});
    	
    	//최소화
    	$("#minDashboard01").click(function(){
    		$("#dashboard01Content").removeClass("expend-content");
    		$("#fullDashBoard01Btn").show();
    	});
		//자동 조회
    	$("#dashboard01StartBtn, #dashboard01StartBtnFull").click(function(){
    		var data = {
    				compCd : compCd,
    				brndCd : brndCd,
    		}
    		if(!strDashboard01Interval){
    			alert("자동조회가 시작되었습니다.");
	    		strDashboard01Interval = setInterval(function () {
	    			fnReloadChart(true, data);
	    		}, 600000);
    		}
			$("#dashboard01StartBtn").hide();
			$("#dashboard01StopBtn").show();
			$("#dashboard01StartBtnFull").hide();
			$("#dashboard01StopBtnFull").show();
    	});
    	$("#dashboard01StopBtn, #dashboard01StopBtnFull").click(function(){
    		clearInterval(strDashboard01Interval);
			strDashboard01Interval = null;
			alert("자동조회가 중지되었습니다.");
			$("#dashboard01StartBtn").show();
			$("#dashboard01StopBtn").hide();
			$("#dashboard01StartBtnFull").show();
			$("#dashboard01StopBtnFull").hide();
    	});
    	
    	$('#board01CompCd').change(function(){
    		compCd = $("#board01CompCd").val();
    		MMSUtil.fnMakeBrndCombo($('#board01BrndCd'), compCd, '', '선택');
    	});
    	$('#board01BrndCd').change(function(){
    		brndCd = $("#board01BrndCd").val();
    	});
    	
    }
    
    function fnGetDashboard(reload, data){
    	$.ajax({
    		url:'/ctrl/dashboard/viewDashboard',
    		data:data,
    		success : function(result){
    			var todayData = result.dt_grid[0];
    			var weekData = result.dt_grid[1];
    			var monthData = result.dt_grid[2];
    			var yearData = result.dt_grid[3];
    			
    			var rcptTodayCnt = todayData.RCPT_TOT_CNT; 			  	 // Today 총 건수
    			var rcptCmplTodayYCnt = todayData.RCPT_CMPL_CNT;  		 // Today 완료수
    			var rcptCmplTodayNCnt = todayData.RCPT_CMPL_N_CNT;		 // Today 미완료 수
    			var rcptWeekCnt = weekData.RCPT_TOT_CNT; 			  	 // Week 총 건수
    			var rcptCmplWeekYCnt = weekData.RCPT_CMPL_CNT;  		 // Week 완료수
    			var rcptCmplWeekNCnt = weekData.RCPT_CMPL_N_CNT;	 // Week 미완료 수
    			
    			var rcptMonthCnt = monthData.RCPT_TOT_CNT; 			  	 // Month 총 건수
    			var rcptCmplMonthYCnt = monthData.RCPT_CMPL_CNT;  		 // Month 완료수
    			var rcptCmplMonthNCnt = monthData.RCPT_CMPL_N_CNT;	 // Month 미완료 수
    			
    			var rcptYearCnt = yearData.RCPT_TOT_CNT; 			  	 // Year 총 건수
    			var rcptCmplYearYCnt = yearData.RCPT_CMPL_CNT;  		 // Year 완료수
    			var rcptCmplYearNCnt = yearData.RCPT_CMPL_N_CNT;	 // Year 미완료 수	
    			
    			var today = todayData.DAY;								 // 오늘 날짜
    			var startWeek = weekData.DAY;							 // 일주일 전
    			var startMon = monthData.DAY;							 // 한달 전
    			var startYear = yearData.DAY;							 // 일년 전
    			
    			if(reload || compCd){
	            	$c1.html("");
	    	        $c2.html("");
	    	        $c3.html("");
	    	        $c4.html("");
    			}
    			
    			$('#p1').val(today);
    			$('#p2').val(startWeek+' ~ '+ today);
    			$('#p3').val(startMon+' ~ '+ today);
    			$('#p4').val(startYear+' ~ '+ today);
    			var pie1 ='<p>';
    			    pie1 +='<a href="#" class="hist-view-btn" data-search-sdate="'+today+'" data-search-edate="'+today+'" data-cnt-flag="total" ><strong>총 건수</strong> '+rcptTodayCnt.comma()+'</a> / ';
    			    pie1 +='<a href="#" class="hist-view-btn" data-search-sdate="'+today+'" data-search-edate="'+today+'" data-cnt-flag="incmpl" ><strong>처리중</strong> '+rcptCmplTodayNCnt.comma()+'</a> / '
    			    pie1 +='<a href="#" class="hist-view-btn" data-search-sdate="'+today+'" data-search-edate="'+today+'" data-cnt-flag="cmpl"  ><strong>완료</strong> '+rcptCmplTodayYCnt+'</a> </p>'
    			    pie1 +='</p>';
    	        var pie2 ='<p>';
    	            pie2 +='<a href="#" class="hist-view-btn" data-search-sdate="'+startWeek+'" data-search-edate="'+today+'" data-cnt-flag="total" ><strong>총 건수</strong> '+rcptWeekCnt.comma()+'</a> / ';
    	            pie2 +='<a href="#" class="hist-view-btn" data-search-sdate="'+startWeek+'" data-search-edate="'+today+'" data-cnt-flag="incmpl"><strong>처리중</strong>  '+rcptCmplWeekNCnt.comma()+'</a> / '
    	            pie2 +='<a href="#" class="hist-view-btn" data-search-sdate="'+startWeek+'" data-search-edate="'+today+'" data-cnt-flag="cmpl"  ><strong>완료</strong> '+rcptCmplWeekYCnt.comma()+'</a> </p>'
    	            pie2 +='</p>';
	            var pie3 ='<p>';
    	            pie3 +='<a href="#" class="hist-view-btn" data-search-sdate="'+startMon+'" data-search-edate="'+today+'" data-cnt-flag="total" ><strong>총 건수</strong>'+rcptMonthCnt.comma()+'</a> / ';
    	            pie3 +='<a href="#" class="hist-view-btn" data-search-sdate="'+startMon+'" data-search-edate="'+today+'" data-cnt-flag="incmpl"><strong>처리중</strong> '+rcptCmplMonthNCnt.comma()+'</a> / '
    	            pie3 +='<a href="#" class="hist-view-btn" data-search-sdate="'+startMon+'" data-search-edate="'+today+'" data-cnt-flag="cmpl"  ><strong>완료</strong> '+rcptCmplMonthYCnt.comma()+'</a> </p>'
    	            pie3 +='</p>';
	            var pie4 ='<p>';
    	            pie4 +='<a href="#" class="hist-view-btn" data-search-sdate="'+startYear+'" data-search-edate="'+today+'" data-cnt-flag="total" ><strong>총 건수</strong> '+rcptYearCnt.comma()+'</a> / ';
    	            pie4 +='<a href="#" class="hist-view-btn" data-search-sdate="'+startYear+'" data-search-edate="'+today+'" data-cnt-flag="incmpl"><strong>처리중</strong>  '+rcptCmplYearNCnt.comma()+'</a> / '
    	            pie4 +='<a href="#" class="hist-view-btn" data-search-sdate="'+startYear+'" data-search-edate="'+today+'" data-cnt-flag="cmpl"  ><strong>완료</strong> '+rcptCmplYearYCnt.comma()+'</a> </p>'
    	            pie4 +='</p>';
	            $c1.append(pie1);
	            $c2.append(pie2);
	            $c3.append(pie3);
	            $c4.append(pie4);
	            
	            $("#dashboard01Content").find(".hist-view-btn").click(function(){
	            	var sdate = $(this).data("search-sdate");
	            	var edate = $(this).data("search-edate");
	            	var cntFlag = $(this).data("cnt-flag");
	            	var searchData={
	    				dafaultSearch:true,
	    				sdate:sdate,
	    				edate:edate,
	    				compCd:$('#board01CompCd').val(),
	    				brndCd:$('#board01BrndCd').val(),
	    				cntFlag:cntFlag,
	    			};
	            	console.log(searchData);
	        		var visible = tabs.addTab({
		    			title: 'SR 조회',
		    			id: '84',
		    			data:searchData,
		    			closable: true,
		    			ajaxUrl: '/ctrl/call/obstacle/hist',
		    			proCd: 'PC0204',
		    			icon: 'fa fa-search fa-lg'
		    		});
	        		if(visible =="visible"){
	        			ObsRcptStsHistApp.reload(searchData);
	        		}
	            	
	            });
//    	        $c2.append('<p><strong>총 건수</strong><a href="#" id="weekTotal" > '+rcptWeekCnt.comma()+' / <strong>처리중</strong><a href="#" id="dayTotal" >  '+rcptCmplWeekNCnt.comma()+' / <strong>완료</strong> '+rcptCmplWeekYCnt.comma()+' </p>');
//    	        $c3.append('<p><strong>총 건수</strong><a href="#" id="monthTotal" > '+rcptMonthCnt.comma()+' / <strong>처리중</strong><a href="#" id="dayTotal" >  '+rcptCmplMonthNCnt.comma()+' / <strong>완료</strong> '+rcptCmplMonthYCnt.comma()+' </p>');
//    	        $c4.append('<p><strong>총 건수</strong><a href="#" id="yearTotal" > '+rcptYearCnt.comma()+' / <strong>처리중</strong><a href="#" id="dayTotal" >  '+rcptCmplYearNCnt.comma()+' / <strong>완료</strong> '+rcptCmplYearYCnt.comma()+' </p>');
    			
    		}
    	});
    }
    
    function fnReloadChart(reload, data){
    	chartGroup.reload(data);
    	lineGroup.reload(data);
    	fnGetDashboard(reload, data);
    }
    
}();


$(document).ready(function() {
	Dashboard01App.init();
});