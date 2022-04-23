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

/** Copyright (c) 2017 VertexID RND, Inc.
 * 
 * Application Name : 권역관리[StandardCompanyApp]
 * Program Code     : PC0101
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * MINE 한성진		2017. 3. 16. 		First Draft.        javascript
 */
var DashboardApp = function () {
	"use strict";
	
	/************************************************
	 *전역 객체 선언부 (return 상위부분에 선언해야함)
	 ************************************************/
	
	// [El]권역정보 그리드
	var $chart1 = $('#chart1');
	var $chart2 = $('#chart2');
	var $noticeList = $('#noticeList');
	var $div1 = $('#div1');
	var $div2 = $('#div2');
	var $div3 = $('#div3');
	
	var userInfo = Util.getUserInfo();
	var compCd = userInfo.s_compCd;
    return {
        init: function () {
        	if(compCd){
        		$('#pidTitle').html("브랜드별 장애율");
        		
        		$('.dash-notice').remove();
        	}
        	fnDashboardEvent();
        	
        	fnGetWeekObsProcRate(); //주간 장애처리율  
        	fnGetYearObsProcRate(); //연간 장애처리율
        	fnGetTodayObsStatus(); //오늘 장애현황
        	
        	fnGetLineChart(); //연간 건별 처리 현황 LINE-CHART(꺾은선 차트)
        	
    		fnGetPieChart(); //고객사별 장애율 PIE-CHART
        	fnGetNoticeList(); //공지사항
	    }
    };
    
    function fnDashboardEvent(){
    	
        $("#linkNoticeMore").click(function(){ // 공지사항 더보기
        	tabs.addTab({
        		title: '공지사항',
        		id: '106',
        		closable: true,
        		ajaxUrl: '/ctrl/board/notice',
        		proCd: 'PC0800',
        		icon: 'fa fa-folder-open-o fa-lg'
        	});
        });   	
    }
    
    function fnGetYearObsProcRate(){ //연간 장애처리율
    	$.ajax({
    		url : '/ctrl/status/getMonthObsProcRate',
    		type:"POST",
    		success : function(data){
    			var rcptCnt = parseInt(data.RCPT_CNT);
    			var rcptCmplCnt = parseInt(data.RCPT_CMPL_CNT);
    			var yearMonth = data.Y_MONTH;					// 년도
    			var month = data.MONTH
    			var rcptMonthRate = 0;
    			
    			if(rcptCnt == 0){
    				rcptMonthRate = 100;
    			}else if(rcptCmplCnt == 0){
    				rcptMonthRate = 0;
    			}else{
    				rcptMonthRate = ((rcptCmplCnt/rcptCnt)*100);
    				if(rcptMonthRate !== 100){
    					rcptMonthRate = rcptMonthRate.toFixed(2);
    				}
    			}
    			$div3.append('<h4>'+month+'월 장애현황 <br>('+yearMonth+')</h4>');
    			$div3.append('<p>'+rcptCmplCnt+'/'+rcptCnt+' ('+rcptMonthRate+'%)</p>');
    			
    		}
    	});
    }

    function fnGetWeekObsProcRate(){ //주간 장애현황
    	$.ajax({
    		url : '/ctrl/status/getWeekObsProcRate',
    		type:"POST",
    		success : function(data){
    			var rcptCnt = data.RCPT_CNT;
    			var rcptCmplCnt = data.RCPT_CMPL_CNT;
    			var startDay = data.START_DAY; 				// 시작일
    			var endDay = data.END_DAY; 					// 오늘
    			var rcptWeekRate = 0;
    			
    			if(rcptCnt == 0){
    				rcptWeekRate = 100;
    			}else if(rcptCmplCnt == 0){
    				rcptWeekRate = 0;
    			}else{
    				rcptWeekRate = ((rcptCmplCnt/rcptCnt)*100);
    				if(rcptWeekRate !== 100){
    					rcptWeekRate = rcptWeekRate.toFixed(2);
    				}
    			}
    			
    			$div2.append('<h4>주간 장애현황<br>('+startDay+' ~ '+endDay+')</h4>');
    			$div2.append('<p>'+rcptCmplCnt+'/'+rcptCnt+' ('+rcptWeekRate+'%)</p>');
    		}
    	});
    }
    
    function fnGetTodayObsStatus(){ //오늘 장애현황
    	$.ajax({
    		url : '/ctrl/status/getTodayObsStatus',
    		type:"POST",
    		success : function(data){
    			var endDay = data.END_DAY; 					// 오늘
    			var rcptCnt = data.RCPT_TODAY_CNT;		// 오늘 장애 건수
    			var rcptCmplCnt = data.RCPT_CMPL_TODAY_CNT; // 오늘 장애 처리 건수
    			var rcptTodayRate = 0;
    			
    			if(!rcptCnt){
    				rcptCnt = 0;
    			}
    			if(!rcptCmplCnt){
    				rcptCmplCnt = 0;
    			}
    			
    			if(rcptCnt == 0){
    				rcptTodayRate = 100;
    			}else if(rcptCmplCnt == 0){
    				rcptTodayRate = 0;
    			}else{
    				rcptTodayRate = ((rcptCmplCnt/rcptCnt)*100);
    				if(rcptTodayRate !== 100){
    					rcptTodayRate = rcptTodayRate.toFixed(2);
    				}
    			}
    			
    			$div1.append('<h4>오늘 장애현황<br>('+endDay+')</h4>');
    			$div1.append('<p>'+rcptCmplCnt+'/'+rcptCnt+' ('+rcptTodayRate+'%)</p>');
    		}
    	});
    }
    function fnGetLineChart(){ //연간 건별 처리 현황 LINE-CHART(꺾은선 차트)
    	$chart1.flotLineChart({
			ajaxUrl:"/ctrl/status/getLineChart",
			resultKey : "dt_chart",
			yKey : ["RCPT_TOTAL", "RCPT_CMPL_CNT", "RCPT_CMPT_N_CNT", "RCPT_COSY_Y_CNT"],
			labelName : ["총건수", "처리완료", "미완료", "유상 건수"],
			xKey : "XTICK",
			xaxis: {
				mode: "categories",
		   },
		   yaxis: {  
			   ticks: 10, 
			   tickColor: '#ddd', 
			   show:true,
		   },
		   grid: { 
               hoverable: true, 
               clickable: true,
               tickColor: "#ddd",
               borderWidth: 1,
               backgroundColor: '#fff',
               borderColor: '#ddd'
           },
           legend: {
               labelBoxBorderColor: '#ddd',
               margin: 10,
               noColumns: 1,
               show: true
           }
		});
    }
    
    function fnGetPieChart(){ //고객사별 장애율 PIE-CHART
    	var url = "/ctrl/status/getPieChart";
    	var labelKey = "COMP_NM";
    	if(compCd){
    		url = "/ctrl/status/getBrndPieChart";
    		labelKey = "BRND_NM"
    	}
    	
    	$chart2.flotPieChart({
			ajaxUrl:url,
			innerRadius:0.55,
			resultKey : "dt_chart",
			labelKey : labelKey,
			dataKey : "CNT",
			label: {
				show: true,
				radius: 0.71,
				formatter: function(label, series){
//					return '<div style="font-size:11px; text-align:center; padding:2px; color:white;">'+label+'<br/>'+Math.round(series.percent)+'%</div>';
					return '<div style="font-size:11px; text-align:center; padding:2px; color:white;">'+Math.round(series.percent)+'%</div>';
				},
				background:{
					opacity: 0.8,
				}
			},
		});
    }
	//공지사항 보기 팝업
	function fnBoardNoticeView(notiSeq){

		PopApp.paragonOpenPopup({
    		ajaxUrl: '/ctrl/board/notice/noticeViewPopup',
    		id: 'boardNoticeViewPopup',
    		width: '700px',	    		
    		btnName:"보기",
    		title :"공지사항 보기",
			data:{notiSeq : notiSeq, modFlag:"MAIN"},
    		onload:function(modal){
    			modal.show();
    		}
		});	  
	}
	//공지사항 리스트
    function fnGetNoticeList(){
    	$noticeList.paragonGrid({
        	url: '/ctrl/board/notice/listBoardNotice',
			sortable: true,
			rownumbers : true,	
			height: "180px",
			width: "1000px",	
			postData : {rowData:5},
			caption:"최근 공지사항",
			colNames : [
			             "제목", "공지기간",	"등록일시",	"작성자", "NOTICE_SEQ"
			            ],

			colModel : [ 
			            {width:"300px", name : 'TITLE', align:"left"},
			            {width:"120px", name : 'NOTICE_DATE', align:"center"},
			            {width:"120px", name : 'IN_DT', align:"center"},	            
			            {width:"120px", name : 'WRITER', align:"center"},         
			            {align:"center", name : 'NOTICE_SEQ', hidden:"hidden"},
			            ],			
            pager: "#boardNoticeGridNavi",
			ondblClickRow: function(id, iRow, iCol, e){
            	var NotiSeq = $noticeList.getRowData(id).NOTICE_SEQ;
                   fnBoardNoticeView(NotiSeq);
			}
        });
    };
}();

$(document).ready(function() {
	App.initAction();
	DashboardApp.init();
});
