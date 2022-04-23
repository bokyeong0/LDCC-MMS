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
var StatusProductApp = function () {
	"use strict";
	
	/************************************************
	 *전역 객체 선언부 (return 상위부분에 선언해야함)
	 ************************************************/
	
	// [El]메뉴 트리 그리드
	var $statusProductGrid = $("#statusProductGrid");
	
	var userInfo = Util.getUserInfo();
	
    return {
        init: function () {
        	fnStatusProductEvent();
        	
        	fnStatusProductGrid();
	    }
    };
    function fnStatusProductEvent(){
    	$('#statusProductAspCompCd').combobox();
    	$('#statusProductCompCd').combobox();
    	
    	$("#statusProductCompNm, #statusProductPrdNm").enterEvent({
    		callBack:function(value){
    			var data = {
    					searchYear	: $("#statusProductYearSearch").val(),
    					prdTypeLv1	: $("#statusProductTypeLv1").val(),
    					prdTypeLv2	: $("#statusProductTypeLv2").val(),
    					prdTypeLv3	: $("#statusProductTypeLv3").val(),
    					prdNm		: $("#statusProductPrdNm").val(),
    					aspCompCd	: $("#statusProductAspCompCd").val(),
    					compCd		: $("#statusProductCompCd").val(),
    					brndCd		: $("#statusProductBrndCd").val(),
    					};
    			$statusProductGrid.paragonGridSearch(data);
    		}
    	});
    	
    	$("#statusProductSearchBtn").click(function(){
    		fnSearch();
    	});
    	
    	MMSUtil.MakeProductComboSet({
    		prdTypeLv1Id : '#statusProductTypeLv1',
    		prdTypeLv2Id : '#statusProductTypeLv2',
    		prdTypeLv3Id : '#statusProductTypeLv3',
    	});
    	
    	MMSUtil.MakePartnerSet({
    		aspCompCdId : '#statusProductAspCompCd',
    		compCdId 	: '#statusProductCompCd',
    		brndCdId 	: '#statusProductBrndCd',
    	});
    	
    	
    	$("#statusProductYearSearch").datepicker({todayHighlight: true, autoclose: true, format:'yyyy', minViewMode:'years' });
    	$("#statusProductYearSearch").datepicker('setDate', Util.LocalDate());
    }
    
    function fnSearch(){
   		var data = {
   				searchYear	: $("#statusProductYearSearch").val(),
				prdTypeLv1	: $("#statusProductTypeLv1").val(),
				prdTypeLv2	: $("#statusProductTypeLv2").val(),
				prdTypeLv3	: $("#statusProductTypeLv3").val(),
				prdNm		: $("#statusProductPrdNm").val(),
				aspCompCd	: $("#statusProductAspCompCd").val(),
				compCd		: $("#statusProductCompCd").val(),
				brndCd		: $("#statusProductBrndCd").val(),
   		};
   		$statusProductGrid.paragonGridSearch(data);
    }
	
    function fnStatusProductGrid(){
    	$statusProductGrid.paragonGrid({
    		url : '/ctrl/status/listRcptPrd',
    		rowNum : 15,
			reportExcelBtn: true,
			postData:{aspCompCd:userInfo.s_companyCd},
			colNames:['제품범주','제품군','제조사','모델명','총 건수','미완료','유상건수','1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
    		colModel:[
    		          {name:'PRD_TYPE_LV1_NM' , align:"center"},
			          {name:'PRD_TYPE_LV2_NM' , align:"center"},
			          {name:'PRD_TYPE_LV3_NM' , align:"center"},
			          {name:'PRD_NM', align:"center", width:'200px'},
			          {name:'RCPT_CNT', align:"right", classes:"p-r-10", formatter : function(value, options, rowObject) {return value.comma()}},
			          {name:'RCPT_CMPL_CNT', align:"right", classes:"p-r-10", formatter : function(value, options, rowObject) {return value.comma()}},
			          {name:'RCPT_COST_Y_CNT', align:"right", classes:"p-r-10", formatter : function(value, options, rowObject) {return value.comma()}},
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
    		pager:"statusProductGridNavi",
// 					loadonce : true,
// 					rowNum: 10,
// 					rowList: [10, 20, 50,100],
			caption : "품목별 연간 장애처리 현황",
			params:["totalRcptCount"],
			hidegrid : false,
			rownumbers : true,
			footerrow: true,
            userDataOnFooter: true, 
//            toolbar: [true,"top"],
		});
//    	fnSetTopToolbar($("#t_statusProductGrid"));
		// 텝 그리드 생성
    }
//    function fnSetTopToolbar(target){
//    	var totalRcptCount = $statusProductGrid.getParams("totalRcptCount");
//    	target.addClass("form-inline");
//		target.append('<div class="form-group"><div class="input-group input-group-sm mini"><span class="span-info  input-group-addon">합계</span><input type="text" class="form-control text-right" size="5" value="12,115" ></div></div>');
// 				target.append('<div class="form-group"><div class="input-group input-group-sm mini"><span class="span-success  input-group-addon">완료</span><input type="text" class="form-control text-right" size="4" value="9,912" ></div></div>');
// 				target.append('<div class="form-group"><div class="input-group input-group-sm mini"><span class="span-warning  input-group-addon">처리중</span><input type="text" class="form-control text-right" size="4" value="335" ></div></div>');
// 				target.append('<div class="form-group"><div class="input-group input-group-sm mini"><span class="span-warning  input-group-addon">유상</span><input type="text" class="form-control text-right" size="5" value="2,010" ></div></div>');
// 				target.append('<div class="form-group"><div class="input-group input-group-sm mini"><span class="span-inverse  input-group-addon">무상</span><input type="text" class="form-control text-right" size="5" value="10,105" ></div></div>');
// 				var todaySt ='';
// 					todaySt +='<div class="form-group pull-right">';
// 				    todaySt +='<div class="input-group input-group-sm mini ">';
// 				    todaySt +='<span class="input-group-addon span-danger">오늘</span>';
// 					todaySt +='<div class="progress progress-striped   active m-b-0 width-xs ">';
// 					todaySt +='<div class="progress-bar progress-bar-success" style="width: 78%">78%</div>';
// 					todaySt +='</div>';
// 					todaySt +='</div>';
// 					todaySt +='</div>';
// 				target.append(todaySt); 
// 				var totalSt ='';
// 				totalSt +='<div class="form-group pull-right">';
// 				totalSt +='<div class="input-group input-group-sm mini  ">';
// 				totalSt +='<span class="input-group-addon span-danger">총</span>';
// 				totalSt +='<div class="progress progress-striped   active m-b-0 width-xs ">';
// 				totalSt +='<div class="progress-bar progress-bar-success" style="width: 98%">98%</div>';
// 				totalSt +='</div>';
// 				totalSt +='</div>';
// 				totalSt +='</div>'; 
// 				target.append(totalSt); 
//    }
    
    function fnPdf(options){
    	console.log("excel");
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
	StatusProductApp.init();
});
