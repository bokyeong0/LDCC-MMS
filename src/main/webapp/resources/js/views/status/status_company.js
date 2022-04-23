/** Copyright (c) 2017 VertexID RND, Inc.
 * 
 * Application Name : 권역관리[StandardAreaApp]
 * Program Code     : PC0101
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Han Seong Jin	2017. 3. 20. 		First Draft.        javascript
 */
var StatusCompanyApp = function () {
	"use strict";
	
	/************************************************
	 *전역 객체 선언부 (return 상위부분에 선언해야함)
	 ************************************************/
	
	// [El]메뉴 트리 그리드
	var $statusCompanyGrid = $("#statusCompanyGrid");
	
	var userInfo = Util.getUserInfo();
	
    return {
        init: function () {
        	fnStatusCompanyEvent();
        	fnStatusCompanyGrid();
        	//Site 유형
        	fnListComboJson($("#statusCompanyStrType"), "SC0021");
        	
        	//매장 상태
        	fnListComboJson($("#statusCompanyStrSt"), "SC0024");
        	//지역 SelectBox
        	fnAreaComboJson($("#statusCompanyAreaLv1Cd"));
        	
        	fnListAutoStrNm();
	    }
    };
    function fnStatusCompanyEvent(){
    	$('#statusCompanyAspCompCd').combobox();
    	$('#statusCompanyCompCd').combobox();
    	
    	$("#statusCompanySearchBtn").click(function(){
    		fnSearch();
    	});
    	
    	$('#statusCompanyAreaLv1Cd').change(function(){
    		var areaLv1Cd = $('#statusCompanyAreaLv1Cd').val();
    		MMSUtil.fnMakeAreaLv2Combo($('#statusCompanyAreaLv2Cd'), areaLv1Cd);
    	});
    	
    	MMSUtil.MakePartnerSet({
    		aspCompCdId : '#statusCompanyAspCompCd',
    		compCdId 	: '#statusCompanyCompCd',
    		brndCdId 	: '#statusCompanyBrndCd',
    	});
    	
    	$('#statusCompanyCompCd').combobox({inMode:true});
        
    	$("#statusCompanyYearSearch").datepicker({todayHighlight: true, autoclose: true, format:'yyyy', minViewMode:'years' });
    	$("#statusCompanyYearSearch").datepicker('setDate', Util.LocalDate());
    	
    	$('#statusCompanyCompCd').change(function(){
    		var compCd = $('#statusCompanyCompCd').val();
    		fnListAutoStrNm(compCd);
    	});
    	
    	$('#statusCompanyBrndCd').change(function(){
    		var compCd = $('#statusCompanyCompCd').val();
    		var brndCd = $('#statusCompanyBrndCd').val();
    		fnListAutoStrNm(compCd, brndCd);
    	});
    	
    }
    
    function fnSearch(){
   		var data = {
   				searchYear	: $("#statusCompanyYearSearch").val(),
				strSt		: $("#statusCompanyStrSt").val(),
				strType		: $("#statusCompanyStrType").val(),
				areaSeq		: $("#statusCompanyAreaLv1Cd").val(),
				areaSeq2	: $("#statusCompanyAreaLv2Cd").val(),
				aspCompCd	: $("#statusCompanyAspCompCd").val(),
				compCd		: $("#statusCompanyCompCd").val(),
				brndCd		: $("#statusCompanyBrndCd").val(),
				strNm		: $("#statusCompanyStrNm").val(),
   		};
   		$statusCompanyGrid.paragonGridSearch(data);
    }
    //지역 목록 조회
    function fnAreaComboJson(target){
    	MMSUtil.fnMakeAreaLv1Combo(target);
    	$('#statusCompanyAreaLv2Cd').html("<option value=''>선택</option>");
    }
    
    function fnListComboJson(target, groupId){
    	$.ajax({
    		url : "/ctrl/settings/system/code/listCodeGroupComboJson",
    		data :{codeGroupCd:groupId},
    		type : "POST",
    		dataType : "json",
    		cache: false,
    		success : function(result) {
    			Util.MakeSelectOptions(target, result, "", "선택");
    		}
    	});
    }
    
    function fnListAutoStrNm(compCd, brndCd){
    	$('#statusCompanyStrNm').strNmAutoComplate({
			compCd:compCd,
			brndCd:brndCd,
		});
    }
    
    function fnStatusCompanyGrid(){
    	$statusCompanyGrid.paragonGrid({
    		url : '/ctrl/status/listRcptStore',
    		rowNum : 15,
			reportExcelBtn: true,
			postData:{aspCompCd:userInfo.s_companyCd},
			colNames:['지역','고객사','브랜드','점포명','점포상태','점포구분','총 건수','미완료','1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
    		colModel:[
			          {name:'AREA_NM', fixed:true, width:'120px'},
			          {name:'COMP_NM' , align:"center", fixed:true, width:'100px'},
			          {name:'BRND_NM', align:"center", fixed:true, width:'80px'},
			          {name:'STR_NM', align:"center", fixed:true, width:'120px'},
			          {name:'STR_ST_NM', align:"center"},
			          {name:'STR_TYPE_NM', align:"center"},
			          {name:'RCPT_TOT_CNT', align:"right", fixed:true, width:'70px', classes:"p-r-10", formatter : function(value, options, rowObject) {return value.comma()}},
			          {name:'RCPT_CMPL_N_CNT', align:"right", fixed:true, width:'70px', classes:"p-r-10", formatter : function(value, options, rowObject) {return value.comma()}},
			          {name:'MON_01', align:"right", fixed:true, width:'70px', classes:"p-r-10", formatter : function(value, options, rowObject) {return value.comma()}},
			          {name:'MON_02', align:"right", fixed:true, width:'70px', classes:"p-r-10", formatter : function(value, options, rowObject) {return value.comma()}},
			          {name:'MON_03', align:"right", fixed:true, width:'70px', classes:"p-r-10", formatter : function(value, options, rowObject) {return value.comma()}},
			          {name:'MON_04', align:"right", fixed:true, width:'70px', classes:"p-r-10", formatter : function(value, options, rowObject) {return value.comma()}},
			          {name:'MON_05', align:"right", fixed:true, width:'70px', classes:"p-r-10", formatter : function(value, options, rowObject) {return value.comma()}},
			          {name:'MON_06', align:"right", fixed:true, width:'70px', classes:"p-r-10", formatter : function(value, options, rowObject) {return value.comma()}},
			          {name:'MON_07', align:"right", fixed:true, width:'70px', classes:"p-r-10", formatter : function(value, options, rowObject) {return value.comma()}},
			          {name:'MON_08', align:"right", fixed:true, width:'70px', classes:"p-r-10", formatter : function(value, options, rowObject) {return value.comma()}},
			          {name:'MON_09', align:"right", fixed:true, width:'70px', classes:"p-r-10", formatter : function(value, options, rowObject) {return value.comma()}},
			          {name:'MON_10', align:"right", fixed:true, width:'70px', classes:"p-r-10", formatter : function(value, options, rowObject) {return value.comma()}},
			          {name:'MON_11', align:"right", fixed:true, width:'70px', classes:"p-r-10", formatter : function(value, options, rowObject) {return value.comma()}},
			          {name:'MON_12', align:"right", fixed:true, width:'70px', classes:"p-r-10", formatter : function(value, options, rowObject) {return value.comma()}},
			         ],
    		pager:"statusCompanyGridNavi",
// 					loadonce : true,
// 					rowNum: 10,
// 					rowList: [10, 20, 50,100],
			caption : "점포별 연간 장애처리 현황",
			params:["totalRcptCount"],
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
	StatusCompanyApp.init();
});
