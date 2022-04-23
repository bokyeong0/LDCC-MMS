/** Copyright (c) 2017 VertexID RND, Inc.
 * 
 * Application Name : 권역관리[StandardAreaApp]
 * Program Code     : PC0101
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * MINE 최판석		2017. 3. 20. 		First Draft.        javascript
 */
var StatusEngrApp = function () {
	"use strict";
	
	/************************************************
	 *전역 객체 선언부 (return 상위부분에 선언해야함)
	 ************************************************/
	
	// [El]메뉴 트리 그리드
	var $statusEngrGrid = $("#statusEngrGrid");
	
	var userInfo = Util.getUserInfo();
	
    return {
        init: function () {
        	//엔지니어 장해현황 Event
        	fnStatusEngrEvent();
        	//엔지니어 장애현황 Grid
        	fnStatusEngrGrid();
        	
        	if(userInfo.s_companyCd){
        		MMSUtil.fnMakeAreaCombo($('#statusEngrAreaCd'), userInfo.s_areaCd, userInfo.s_companyCd, '담당 부서');
        	}
        	
	    }
    };
    
    //[Fn] 엔지니어 현황 이벤트
    function fnStatusEngrEvent(){
    	$('#statusEngrAspCompCd').combobox();
    	$('#statusEngrCompCd').combobox();
    	
    	$("#statusEngrUserNm, #statusEngrAreaNm").enterEvent({
    		callBack:function(value){
    			var data = {
    					searchYear	: $("#statusEngrYearSearch").val(),
    					userNm		: $("#statusEngrUserNm").val(),
    					aspCompCd	: $("#statusEngrAspCompCd").val(),
    					compCd		: $("#statusEngrCompCd").val(),
    					brndCd		: $("#statusEngrBrndCd").val(),
    					areaCd		: $("#statusEngrAreaCd").val(),
    					};
    			$statusEngrGrid.paragonGridSearch(data);
    		}
    	});
    	
    	$("#statusEngrSearchBtn").click(function(){
    		fnSearch();
    	});
    	
    	MMSUtil.MakePartnerSet({
    		aspCompCdId : '#statusEngrAspCompCd',
    		compCdId 	: '#statusEngrCompCd',
    		brndCdId 	: '#statusEngrBrndCd',
    	});
    	
    	$('#statusEngrAspCompCd').change(function(){
    		var aspCompCd = $('#statusEngrAspCompCd').val();
    		MMSUtil.fnMakeAreaCombo($('#statusEngrAreaCd'), "", aspCompCd)
    	});
//    	$('#statusEngrBrndCd').change(function(){
//    		var areaLv1Cd = $('#statusEngrAreaLv1Nm').val();
//    		MMSUtil.fnMakeAreaLv2Combo($('#statusEngrAreaLv2Nm'), areaLv1Cd);
//    	});
    	
    	
    	$("#statusEngrYearSearch").datepicker({todayHighlight: true, autoclose: true, format:'yyyy', minViewMode:'years' });
    	$("#statusEngrYearSearch").datepicker('setDate', Util.LocalDate());
    	
    	
    	
    }
    
    function fnSearch(){
   		var data = {
   				searchYear	: $("#statusEngrYearSearch").val(),
				userNm		: $("#statusEngrUserNm").val(),
				aspCompCd	: $("#statusEngrAspCompCd").val(),
				compCd		: $("#statusEngrCompCd").val(),
				brndCd		: $("#statusEngrBrndCd").val(),
				areaCd		: $("#statusEngrAreaCd").val(),
   		};
   		$statusEngrGrid.paragonGridSearch(data);
    }
	
    //지역 목록 조회
    function fnAreaComboJson(target){
    	MMSUtil.fnMakeAreaLv1Combo(target);
    	$('#statusEngrAreaLv2Nm').html("<option value=''>선택</option>");
    	
    }
//    //파트너사 목록 조회
//    function fnPartnerComboJson(target){
//    	MMSUtil.fnMakePartnerCombo(target);
//    }
//    //고객사 목록 조회
//    function fnCompComboJson(target, aspCompCd){
//    	MMSUtil.fnMakeCompCombo(target);
//    	$('#statusEngrBrndCd').html("<option value=''>선택</option>");
//    }
//    //브랜드 목록 조회
//    function fnBrndComboJson(target, aspCompCd, compCd){
//    	MMSUtil.fnMakeBrndCombo(target);
//    }
    
    function fnStatusEngrGrid(){
    	$statusEngrGrid.paragonGrid({
    		url : '/ctrl/status/listRcptUser',
    		rowNum : 15,
			reportExcelBtn: true,
			postData:{aspCompCd:userInfo.s_companyCd},
			colNames:['부서','이름','총 건수','미완료건','1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
    		colModel:[
			          {name:'AREA_NM' , align:"center"},
			          {name:'USER_NM', align:"center"},
			          {name:'RCPT_TOT_CNT', align:"right", classes:"p-r-10", formatter : function(value, options, rowObject) {return value.comma()}},
			          {name:'RCPT_CMPL_N_CNT',align:"right", classes:"p-r-10",formatter : function(value, options, rowObject) {return value.comma()}},
			          {name:'MON_01', align:"right", classes:"p-r-10", formatter : function(value, options, rowObject) {return value.comma()}},
			          {name:'MON_02', align:"right", classes:"p-r-10", formatter : function(value, options, rowObject) {return value.comma()}},
			          {name:'MON_03', align:"right", classes:"p-r-10", formatter : function(value, options, rowObject) {return value.comma()}},
			          {name:'MON_04', align:"right", classes:"p-r-10", formatter : function(value, options, rowObject) {return value.comma()}},
			          {name:'MON_05', align:"right", classes:"p-r-10", formatter : function(value, options, rowObject) {return value.comma()}},
			          {name:'MON_06', align:"right", classes:"p-r-10", formatter : function(value, options, rowObject) {return value.comma()}},
			          {name:'MON_07', align:"right", classes:"p-r-10", formatter : function(value, options, rowObject) {return value.comma()}},
			          {name:'MON_08', align:"right", classes:"p-r-10", formatter : function(value, options, rowObject) {return value.comma()}},
			          {name:'MON_09', align:"right", classes:"p-r-10", formatter : function(value, options, rowObject) {return value.comma()}},
			          {name:'MON_10', align:"right", classes:"p-r-10", formatter : function(value, options, rowObject) {return value.comma()}},
			          {name:'MON_11', align:"right", classes:"p-r-10", formatter : function(value, options, rowObject) {return value.comma()}},
			          {name:'MON_12', align:"right", classes:"p-r-10", formatter : function(value, options, rowObject) {return value.comma()}},
			         ],
    		pager:"statusEngrGridNavi",
			caption : "엔지니어별 연간 장애처리 현황",
			hidegrid : false,
			rownumbers : true,
			footerrow: true,
            userDataOnFooter: true, 
    	});
    }
    	
    function fnPdf(options){
    	   var gridData = options.data;
    	   var columnIds = options.columnIds;
    	   if(gridData.length == 0){
    		   alert("조회된 데이터가 없습니다.");
    		   return;
    	   }
    	   
    	   var columnNms = [];
    	   var idx = 0;
    	   
    	   if(options.rowEditable|| options.cellEditable){
    		   idx = 3;
    	   }
    	   for (var i = idx; i < options.paragonColNames.length; i++) {
    		   columnNms.push(options.paragonColNames[i]);
    	   }
    	   var sheetNm = options.caption;
    	   var sendData={
    			   "sheetNm":sheetNm,
    			   "columnNms":columnNms,
    			   "columnIds":columnIds,
    			   "dt_grid":gridData
    	   };
    	   var jsonData = JSON.stringify(sendData);
    	   App.prcsStart();
    		$.ajax({
 				url: "/ctrl/comm/view/excel",
 				data:jsonData,
 	    		contentType: 'application/json; charset=utf-8',
 				success: function(data) {
 					PopApp.paragonOpenPopup({
 						ajaxUrl: '',
 			 			id: '저장',
 			 			body: data.body,
 			 			width: '900px',
 			 			btnName:"저장",
 						title :"preve",
 						visible:true,
 						click:function(){
 							alert("!!!!!");
 						},
 						onload : function(modal) {
 							modal.show();
 						}
	 				});
 					App.prcsEnd();
 				}
    		});
    }
}();

$(document).ready(function() {
	StatusEngrApp.init();
});
