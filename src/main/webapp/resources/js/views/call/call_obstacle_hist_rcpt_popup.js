/** Copyright (c) 2017 VertexID RND, Inc.
 * 
 * Application Name : 콜센터 장애 접수 현황 POP [ObstacleReceiptApp]
 * Program Code     : PC0101
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * 김진호			2017. 3. 16. 		First Draft.        javascript
 */


var ObsStsRcptHistPopupApp = function () {
	"use strict";
	
	// [El]장애정보보기 POP
	var $callObsStsHistRcptViewPopup = $("#callObsStsHistRcptViewPopup");
	
	// [El]자산정보 그리드
	var $callObsStsHistPopupAstGrid =  $("#callObsStsHistPopupAstGrid"); 
	
	// 팝업 파라메터
	var popUpData = $callObsStsHistRcptViewPopup.PopAppGetData();
	
	// 장애번호
	var parasRcptSeq = popUpData.rcptSeq;
	// Site코드
	var paramsStrCd = popUpData.strCd;
	
    return {
        init: function () {
        	
        	//그리드 생성
        	fnObsStsPopupMakeGrid(parasRcptSeq);
        	
        	fnGetObsRcptView(parasRcptSeq)
	    }
    };
    function fnGetObsRcptView(rcptSeq){
    	$.ajax({
    		url : "/ctrl/call/obstacle/receipt/viewObsRcpt",
    		data :{rcptSeq:rcptSeq},
    		type : "POST",
    		dataType : "json",
    		cache: false,
    		success : function(result) {
				var compNm = result.COMP_NM
				var brndNm = result.BRND_NM
				var strNm = result.STR_NM
//				$callObsStsHistHistGrid.paragonGridSearch({
//					rcptSeq : rcptSeq
//				});
				//그리드 접수내역 상세보기 증빙서류 미리보기
				var sumCompNm = compNm+(brndNm ==""?" > ":" > "+brndNm+" > ")+strNm;
				$("#callObsStsHistSelectRcptSeq").val(rcptSeq);
				$("#callObsStsHistSelectCompCd").val(result.COMP_CD);
    			$("#callObsStsHistCompNmView").text(sumCompNm);
    			$("#callObsStsHistObsNmView").text(result.RCPT_OBS_NM);
    			$("#callObsStsHistPrdNmView").text(result.RCPT_PRD_NM);
    			$("#callObsStsHistEngrmView").text(result.RCPT_ENGR_NM);
    			$("#callObsStsHistAreaNmView").text(result.AREA_NM);
    			$("#callObsStsHistContView").text(result.RCPT_CONT);
    			$("#callObsStsHistWriterNmView").text(result.IN_USER_NM);
    			$("#callObsStsHistCustInfoView").text(result.RCPT_CUST_INFO);
    			$("#callObsStsHistObsDtTimeView").text(result.RCPT_DT+" "+result.RCPT_TIME);
    			$("#callObsStsHistSerialView").text(result.AST_SERIAL);
    			
    			$callObsStsHistRcptViewPopup.show();
    		}
    	});
    }
   
    function fnObsStsPopupMakeGrid(rcptSeq){
    	
    	$callObsStsHistPopupAstGrid.paragonGrid({
			url: '/ctrl/call/obstacle/status/listObsSts',
			page : 1,
			sortable : true,
			hidegrid: false,
			height: "150px",
			postData:{rcptSeq : rcptSeq},
			colNames :["RCPT_STS_SEQ","RCPT_STS_COST_TYPE","RCPT_STS_TYPE","SIGN_PATH","SIGN_NM","RCPT_STS_ENGR","RCPT_STS_AREA_SEQ","RCPT_STS_DPST_YN","RCPT_STS_COST_DT","RCPT_STS_DPST_NM","RCPT_STS_COST","AST_SEQ","AST_ST","처리일","처리시간","처리내용","처리구분","담당부서","담당자","유무상","서명"],
			colModel : [ 
				{width:"100px",name : 'RCPT_STS_SEQ', hidden : true}, 
				{width:"100px",name : 'RCPT_STS_TYPE', hidden:true},		
				{width:"100px",name : 'RCPT_STS_COST_TYPE', hidden : true},		
				{width:"100px",name : 'SIGN_PATH', hidden : true},		
				{width:"100px",name : 'SIGN_NM', hidden : true},		
				{width:"80px",name : 'RCPT_STS_ENGR', hidden:true},			
				{width:"80px",name : 'RCPT_STS_AREA_SEQ', hidden:true},	
				{width:"80px",name : 'RCPT_STS_DPST_YN', hidden:true},	
				{width:"80px",name : 'RCPT_STS_COST_DT', hidden:true},	
				{width:"80px",name : 'RCPT_STS_DPST_NM', hidden:true},	
				{width:"80px",name : 'RCPT_STS_COST', hidden:true},	
				{width:"80px",name : 'AST_SEQ', hidden:true},	
				{width:"80px",name : 'AST_ST', hidden:true},	
				{width:"80px",name : 'RCPT_STS_DT', align:"center"},			
				{width:"60px",name : 'RCPT_STS_TIME', align:"center"},				
				{width:"300px",name : 'RCPT_STS_CONT', align:"left"},			
				{width:"80px",name : 'RCPT_STS_TYPE_NM', align:"center"},		
				{width:"120px",name : 'AREA_NM', align:"center"},			
				{width:"80px",name : 'RCPT_STS_ENGR_NM', align:"center"},			
				{width:"80px",name : 'RCPT_STS_COST_TYPE_NM', align:"center"},		
				{width:"60px",name : 'SIGH_CKECK', align:"center"},	
				/*{width:"100px",editable: false,align:"center",name:'SIGH_CKECK',formatter:inMakePrevBution},*/
			],
			loadonce : true,
			caption : "처리내역",
			rownumbers : true,
		});
    	/*
    	function inMakePrevBution(cellvalue, options, rowObject) {
			var reLoadButton ='-';
			if(cellvalue == 'Y'){
				reLoadButton = '<button type="button" class="btn btn-info btn-xs m-r-5 select-prev-btn" value="'+(options.rowId)+'" > <i class="fa fa-search " ><i/> 보기</button>';
			}
			return reLoadButton;
		}
    	$callObsStsHistPopupAstGrid.find('.select-prev-btn').off().live('click', function (e) {
			e.stopPropagation();
			var rowData = $callObsStsHistGrid.getRowData($(this).val());
			var filePath = rowData.SIGN_PATH;
			var fileName = rowData.SIGN_NM;
			var form = $("<div/>");
			var viewForm = $("<div />",{id:"compNewFilePrevView","class":"min-height-200 p-5"});
			viewForm.append('<img src="'+filePath+'" data-img="'+filePath+'" alt="'+fileName+'" class="superbox-img" />')
			form.append(viewForm);
			
			PopApp.paragonOpenWindow({
				id : 'callObsStsCompFileView',
				width : '500px',
				title : "사인서류",
				body:form,
				onload : function(modal) {
					modal.show();
				}

			});
		});  */
    }
    
    
}();

$(document).ready(function() {
	ObsStsRcptHistPopupApp.init();
});
