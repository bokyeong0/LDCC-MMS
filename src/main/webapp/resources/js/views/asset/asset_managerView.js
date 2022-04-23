/** Copyright (c) 2017 VertexID RND, Inc.
 * 
 * Application Name : 자산관리 추가[StandardDepartmentApp]
 * Program Code     : PC0101
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * MINE 최판석		2017. 3. 24. 		First Draft.        javascript
 */

var AssetManagerViewApp = function (modal) {
	"use strict";
	
	/************************************************
	 *전역 객체 선언부 (return 상위부분에 선언해야함)
	 ************************************************/
	
	var $assetManagerHistoryGrid = $("#assetManagerHistoryGrid"); //자산내역
	var $assetManagerRcptHistoryGrid = $("#assetManagerRcptHistoryGrid");	//장애내역
	var $assetManagerPreventiveCheckHistoryGrid = $("#assetManagerPreventiveCheckHistoryGrid");	//예방점검내역
	
	var assetSeq = $('#viewAssetManagerPopup').PopAppGetData().astSeq;
	var serialNo = $('#viewAssetManagerPopup').PopAppGetData().serialNo;
	
	// [Data]그룹코드 유형 콤보박스 데이터
	var gridCodeGroupOptionsTemp;
	var gridAstStIgList;
	
    return {
        init: function () {
        	
//        	fnListComboJsonOptionSelected("AT0003");
        	fnListAstStIgSelected("AT0003");
        	
	    	//자산상세보기 
	    	fnAssetManagerViewInfo(modal);
	    	
	    	//자산정보내역
	    	fnListAssetManagerHistory();
	    	
	    	//장애내역보기
	    	fnAssetObsStsMakeGrid();
	    	
	    	//예방점검내역
	    	fnAssetPrevenCheckMakeGrid();
	    	
	    	fnAssetManagerViewEvents();
	    	
	    	fnCssControl();
	    	
	    }
    };
    
    //자산상세보기
    function fnAssetManagerViewInfo(modal){
		$.ajax({
    		url 	: '/ctrl/asset/asset/getAssetManagerInfo',
    		data 	: {	"astSeq"	:	assetSeq	},
    		type 	: "POST",
    		success : function(result){
    			var astData = result.dt_grid[0];
    			
    			$('#assetManagerViewAspCompCd').val(fnIsNull(astData.ASP_COMP_CD));
    			$('#assetManagerViewCompNm').text(fnIsNull(astData.COMP_NM));
    			$('#assetManagerViewBrndNm').text(fnIsNull(astData.BRND_NM));
    			$('#assetManagerViewStrNm').text(fnIsNull(astData.STR_NM));
    			$('#assetManagerViewStrCd').val(fnIsNull(astData.STR_CD));
    			$('#assetManagerViewPrdTypeLv2').text(fnIsNull(astData.PRD_TYPE_LV2_NM));
    			$('#assetManagerViewPrdTypeLv3').text(fnIsNull(astData.PRD_TYPE_LV3_NM));
    			$('#assetManagerViewPrdNm').text(fnIsNull(astData.PRD_NM));
    			$('#assetManagerViewPrdCd').val(fnIsNull(astData.PRD_CD));
    			$('#assetManagerViewPrdSpec').text(fnIsNull(astData.PRD_SPEC));
    			$('#assetManagerViewSerialNo').text(fnIsNull(astData.AST_SERIAL));
    			$('#assetManageViewSlaYn').text(fnIsNull(astData.MA_YN));
    			$('#assetManagerViewAstType1').text(fnIsNull(astData.AST_TYPE1));
    			$('#assetManagerViewAstType2').text(fnIsNull(astData.AST_TYPE2));
    			$('#assetManagerViewMfrDt').text(fnIsNull(fnDtNullCheck(astData.AST_MFR_DT)));
    			$('#assetManagerViewFreeStartDt').text(fnIsNull(fnDtNullCheck(astData.FREE_START_DT)));
    			$('#assetManagerViewFreeEndDt').text(fnIsNull(fnDtNullCheck(astData.FREE_END_DT)));
    			$('#assetManagerViewState').text(fnIsNull(astData.AST_ST_NM));
    			$('#assetManagerViewCostStartDt').text(fnIsNull(fnDtNullCheck(astData.COST_START_DT)));
    			$('#assetManagerViewCostEndDt').text(fnIsNull(fnDtNullCheck(astData.COST_END_DT)));
    			$('#assetManagerViewContent').text(fnIsNull(astData.AST_CONT));
    		}
    	});
    }
    
	function returnDate(date){
		return date.getFullYear() +"-"+date.getMonth() +"-"+ date.getDate();
	}
    
    //자산 목록
    function fnListAssetManagerHistory(){
    	$assetManagerHistoryGrid.paragonGrid({
        	url			: 	'/ctrl/asset/asset/getAseetManagerHistoryList',
        	postData	:	{
        					"astSeq" 	: assetSeq,
        					"serialNo"	: serialNo
        					},
			rowEditable	:	true,
			rownumbers 	: true,
			sortable	: true,
        	height 		: 	"150px",
        	width		:	"1000px",
			colNames 	:	['자산내역SEQ', '자산SEQ', //hidden
			         	 	 '구분', '일자', '내용', '작성자', '작성일'],
			colModel 	: [ 
			            {name : 'AST_HST_SEQ', hidden : true}, 
			            {name : 'AST_SEQ', align:"center", hidden : true},
			            {
		                	editable: true, 
				        	align:"center",
				        	width:100,
				        	name:'AST_HST_ST',
					      	edittype:'select',
					      	formatter : 'select',
	    		        	editoptions: {
	    		        		value:gridAstStIgList
	    		        	}
				        }, {
							name : 'AST_HST_DT',
							editable : true,
							width:60,
							align:"center",
							editoptions : {
								dataInit : function(el) {
									$(el).datepicker({
								   		todayHighlight: true,  
							    		autoclose: true
									});
								}
							}
						}, 
			            {editable : true, name : 'AST_HST_CONT'},	
						{name : 'IN_USER_ID', width:60, align:"center"},
						{name : 'IN_DT',sortable : false,  width:60, align:"center"} 
			],
            pager		: "#assetManagerHistoryGridNavi",
            domainId 	: "AST_MNG",
			caption		: "자산내역"
        });
		
	}
    
    //장애내역
    function fnAssetObsStsMakeGrid(){
    	$assetManagerRcptHistoryGrid.paragonGrid({
			url			: '/ctrl/asset/asset/listAssetViewAssetOpsSt',
			rowEditable : false,
			rownumbers 	: true,
			sortable	: true,
			height		: "150px",
			postData	: {"astSeq" : assetSeq},
			rowList		: [10, 20, 50,100],
			colNames 	:[
				           "RCPT_SEQ","STR_CD","AST_SEQ", //hidden
				           "접수번호","접수일","접수시간","접수자","경과 시간",
				           "회사","Site명","신고자","연락처","장애분류","담당자","처리상태","시리얼"
            ],
			colModel : [ 
			            {name : 'RCPT_SEQ', align:"center",hidden:true},
			            {name : 'STR_CD', align:"center",hidden:true}, 
			            {name : 'AST_SEQ', align:"center",hidden:true}, 
						{name : 'RCPT_NO', width:"90px",align:"center"}, 
						{name : 'RCPT_DT', width:"70px",align:"center"}, 
						{name : 'RCPT_TIME', width:"60px",align:"center"}, 
						{name : 'IN_USER_NM', width:"70px",align:"center"}, 
						{name : 'RCPT_CMPL_DT', width:"110px",align:"right",classes:"p-r-15"}, 
						{name : 'COMP_NM', width:"110px",align:"center"}, 
						{name : 'STR_NM', width:"100px",align:"center"}, 
						{name : 'RCPT_CUST_NM', width:"60px",align:"center"}, 
						{name : 'PHONE_NUM', width:"90px",align:"center" }, 
						{name : 'RCPT_OBS_NM', width:"320px",align:"left"}, 
						{name : 'RCPT_ENGR_NM', width:"60px",align:"center"}, 
						{name : 'RCPT_STS_NM', width:"70px",align:"center"},
						{name : 'AST_SERIAL', width:"70px",align:"center"},
			],
			pager		: "#assetManagerRcptHistoryGridNavi",
			caption		: "장애내역",
			ondblClickRow: function(id, iRow, iCol, e){
            	var rcptSeq = $assetManagerRcptHistoryGrid.getRowData( id ).RCPT_SEQ;
            	var astSeq = $assetManagerRcptHistoryGrid.getRowData( id ).AST_SEQ;
            	var strCd = $assetManagerRcptHistoryGrid.getRowData( id ).STR_CD;
				PopApp.paragonOpenPopup({
					ajaxUrl : '/ctrl/call/obstacle/hist/obstacleHistoryRcptPopupMove',
					id : 'callObsStsHistRcptViewPopup',
					width : '1000px',
					data:{
						rcptSeq:rcptSeq,
						astSeq:astSeq,
						strCd:strCd,
						modFlag:"UPDATE"
					},
					title : "장애정보보기",
				});
			}
        });
    }
    
    
    //예방점검 내역
    function fnAssetPrevenCheckMakeGrid(){
    	$assetManagerPreventiveCheckHistoryGrid.paragonGrid({
			url			: '/ctrl/asset/asset/listAssetViewpPreventiveCheck',
			rowEditable : false,
			rownumbers 	: true,
			sortable	: true,
			height		: "150px",
			postData	: {
						"astSeq" : assetSeq
			},
			rowList		: [10, 20, 50,100],
			colNames 	:[
				           "CHECK_SEQ","AST_SEQ", //hidden
				           "점검일자","점검자","파트너사명","점검파일유무","엔지니어서명유무",
				           "담당자서명유무","장애유무","장애내용"
           ],
			colModel : [ 
			            {name : 'CHECK_SEQ', align:"center",hidden:true},
			            {name : 'AST_SEQ', align:"center",hidden:true}, 
						{name : 'CHECK_DT', width:"100px",align:"center"}, 
						{name : 'ENGR_NM', width:"75px",align:"center"}, 
						{name : 'ASP_COMP_NM', width:"100px",align:"center"}, 
						{name : 'ATTACH_YN', width:"60px",align:"center"}, 
						{name : 'ENGR_SIGN_YN', width:"60px",align:"center"}, 
						{name : 'MNG_SIGN_YN', width:"60px",align:"center"}, 
						{name : 'OBS_YN', width:"50px",align:"center"}, 
						{name : 'OBS_MEMO', align:"center"}
			],
			pager		: "#assetManagerPreventiveCheckGridNavi",
			caption		: "예방점검내역"
        });
    }
    
    //[Fn] 이벤트 
    function fnAssetManagerViewEvents(modal){
    	
    	//저장버튼
    	$("#assetManagerViewSaveRowBtn").click(function(){
    		saveRows();
    	});
    	
    	//행추가버튼
    	$("#assetManagerViewAddRowBtn").click(function(){
    		$assetManagerHistoryGrid.paragonGridAddRow();
//    		$assetManagerHistoryGrid.appendRow();
    		
    	});
    	
    	//행삭제
    	$("#assetManagerViewDelRowBtn").click(function(){
    		$assetManagerHistoryGrid.rowDel();
    	});
    	
    }
    
    //null체크
    function fnIsNull(strData) {
    	if ( strData == null)
    		return "";

    	return strData; 
    }

    //[Fn] 수정된 내용저장
    function saveRows() {
    	var aspCompCd	=	$('#assetManagerViewAspCompCd').val();
    	var strCd	=	$('#assetManagerViewStrCd').val();
    	var prdCd	=	$('#assetManagerViewPrdCd').val();
    	var serialNo	=	$('#assetManagerViewSerialNo').val();
    
    	// 데이터 키 : Value Key
    	var rowData = {
    			modFlag		: "MOD_FLAG" ,
    			astHstSeq	: "AST_HST_SEQ",
				astHstSt	: "AST_HST_ST" ,
				astHstDt	: "AST_HST_DT" ,
				astHstCont	: "AST_HST_CONT",
		}
    	
    	var	gridData = $assetManagerHistoryGrid.getGridData(rowData);    	
    	var sendData = {
    			dt_data			: gridData,
    			aspCompCd		: aspCompCd,
    			strCd 			: strCd,
    			prdCd			: prdCd,
    			serialNo		: serialNo,
    			astSeq			: assetSeq
    	}
        var jsonStr = JSON.stringify(sendData);

    	var gridData = $assetManagerHistoryGrid.getRowData();
    	
    	for(var i = 0; i < gridData.length; i++){
    		var astHstDtCheck = '';
    		if(gridData[i].AST_HST_DT == ''){
    			alert('일자 항목은 필수입력입니다. ');
    			return false;
    		}
    	}
    	
    	if(!gridData){
    		alert("변경된 데이터가 없습니다.");
    		return;
    	}
		$.ajax({
    		url : "/ctrl/asset/asset/saveAssetManagerHistory",
    		data :jsonStr,
    		contentType: 'application/json; charset=utf-8',
    		success : function(result) {
    			alert(result.msgTxt);
    			$assetManagerHistoryGrid.paragonGridReload();
    		}
    	});
    		
    }
    
    //공통코드 조회, custom
    function fnListAstStIgSelected(groupCd){
    	$.ajax({
    		url : "/ctrl/asset/asset/listAssetViewAssetHstSt",
    		data :{codeGroupCd:groupCd},
    		type : "POST",
    		dataType : "json",
    		cache: false,
    		async:false,
    		success : function(result) {
    			gridAstStIgList = Util.MakeGridOptions(result);
//    			gridAstStIgList= result;
    		}
    	});
    }
       
    function fnDtNullCheck(dtData){ //MariaDb Date null
    	if(dtData == null || dtData == '0000-00-00' || dtData == '1000-01-01' || dtData == '0002-11-30'){
    		dtData = '';
    	}
    	return dtData;
    }
    
    //CSS 커스터마이징
    function fnCssControl(){
    	$('.serialPre > div').css('min-height', '55px');
    	$('.serialPre > div').css('padding-bottom', '0px');
    	$('.serialPre > label').css('padding-top', '20px');
    	$('.serialPre > .serialBro').css('padding-top', '10px');
    }
    
}();

$(document).ready(function() {
	AssetManagerViewApp.init();
});
