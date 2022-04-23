/** Copyright (c) 2016 VertexID RND, Inc.
 * 
 * Application Name : 사용자 등록 관리 [UserInfoSaveApp]
 * Program Code     : PC0028
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Han Seong Jin 	2016. 11. 16.  		First Draft.
 */

var AspCompanySavePopApp = function () {
	"use strict";
	
	/*******************************
	 ****전역 객체 선언부 시작******
	 ******************************/
	// [El] 파트너사 저장 팝업
	var $modalAspCompanySavePop = $('#modalAspCompanySavePop');
	// [El] 파트너사 그리드
	var $aspCompanyGrid = $("#aspCompanyGrid");
	
	var popUpData = $modalAspCompanySavePop.PopAppGetData();
	var aspCompCd = popUpData.aspCompCd;
	
    return {
        init: function () {
        	if(popUpData.flag === "INSERT"){
        		$modalAspCompanySavePop.setTitle("파트너사 등록");
        		$modalAspCompanySavePop.show();
        	}else{
        		$modalAspCompanySavePop.setTitle("파트너사 수정");
        		fnGetAspCompInfo();
        		$('#modal-footer').prepend('<a href="javascript:;" id="aspCompanySavePopDelBtn" class="btn btn-sm btn-danger" data-authRule="AUTH_DEL">삭제</a> ');
            	
            	$('#aspCompanySavePopCd').prop('disabled', true);
            	
        	}
        	// 사용자 등록 이벤트
        	fnAspSavePopEvents();
        	
        	//LDCC 고객사 사용으로 삭베버튼 삭제
        	$('#aspCompanySavePopDelBtn').remove();
        	$("#aspCompanySavePopNm").attr("disabled",true); 
	    }
    };
    
    //[Fn] 파트너사 저장 이벤트
    function fnAspSavePopEvents(){
    	//파트너사 저장 버튼
    	$("#aspCompanySavePopSaveBtn").click(function(){
    		fnCheckAspCd();
    	});
		$('#aspCompanySavePopDelBtn').click(function(){
			fnDeleteAspComp();
		})

    }
    function fnDeleteAspComp(){
    	$.ajax({
    		url : '/ctrl/asp/company/deleteAspCompany',
    		data : {"aspCompCd":aspCompCd},
    		type : "POST",
    		success : function(result){
    			alert(result.msgTxt);
    			$modalAspCompanySavePop.paragonClosePopup();
    			$aspCompanyGrid.reload();
    		}
    	});
    }
    
    //[Fn] 파트너사 정보조회
    function fnGetAspCompInfo(){
    	var aspCompCd = popUpData.aspCompCd;
    	$.ajax({
    		url : '/ctrl/asp/company/getAspCompInfo',
    		data : {'aspCompCd':aspCompCd},
    		type : "POST",
    		success : function(result){
    			$('#aspCompanySavePopCd').val(aspCompCd)				;
    			$('#aspCompanySavePopNm').val(result.ASP_COMP_NM)		;
    			$('#aspCompanySavePopCorpNum').val(result.ASP_CORP_NUM)	;
    			$('#aspCompanySavePopCeoNm').val(result.ASP_CEO_NM)		;
    			$('#aspCompanySavePopUserNm').val(result.ASP_USER_NM)	;
    			$('#aspCompanySavePopPhone').val(result.PHONE)			;
    			$('#aspCompanySavePopMemo').val(result.MEMO)			;
    			
    			$modalAspCompanySavePop.show();
    		}
    	});
    }
    
    //[Fn] 파트너사 코드 중복조회
    function fnCheckAspCd(){
    	var aspCompCd = $("#aspCompanySavePopCd").val();
    	var aspCdErrorField = $('#aspCompanySavePopCd').parsley();
    	if ( aspCompCd == ""){
    		window.ParsleyUI.addError(aspCdErrorField, "myCustomError", 'ASP 서비스코드를 입력해주세요.');
    		return;
    	}
    	$.ajax({
    		url : "/ctrl/asp/company/checkAspCompCd",
    		data : {"aspCompCd":aspCompCd},
    		type : "POST",
    		success: function(data){
    			// parsley.attr reset
    			aspCdErrorField.reset();
    			if(data.result === 1){
    				window.ParsleyUI.addError(aspCdErrorField, "myCustomError", 'ASP 서비스코드가 중복입니다.');
    			}else{
    				fnValidation();
    			}
    		}
    	});
    }
  
    //Asp서비스회사 등록  parsley validation 체크
    function fnValidation(){
		if(confirm("저장하시겠습니까?")){
			fnSaveAspCompany();
		}
	
	}
    
    //[Fn]사용자 등록
    function fnSaveAspCompany() {
    	var flag		= popUpData.flag;
    	var aspCompCd	= $('#aspCompanySavePopCd').val()		;
    	var aspCompNm	= $('#aspCompanySavePopNm').val()		;
    	var aspCorpNum	= $('#aspCompanySavePopCorpNum').val()	;
    	var aspCeoNm	= $('#aspCompanySavePopCeoNm').val()	;
    	var aspUserNm	= $('#aspCompanySavePopUserNm').val()	;
    	var phone		= $('#aspCompanySavePopPhone').val()	;
    	var memo		= $('#aspCompanySavePopMemo').val()		;
    	
    	var sendData = {
    			
    			"modFlag"	: flag	 	, 
    			"aspCompCd"	: aspCompCd , 
    			"aspCompNm"	: aspCompNm ,
    			"aspCorpNum": aspCorpNum,
    			"aspCeoNm"	: aspCeoNm  ,
    			"aspUserNm"	: aspUserNm	,
    			"phone"		: phone		,
    			"memo"		: memo		,
    	};

    	$.ajax({
    		url:"/ctrl/asp/company/saveAspCompany",
    		data: sendData,
    		success: function(result){
    			var stsCd = result.stsCd;
    			if ( stsCd == 100 ) {
    				alert(result.msgTxt);
    				$modalAspCompanySavePop.paragonClosePopup();
        			$aspCompanyGrid.paragonGridReload();
    			} else {
    				alert(result.msgTxt);
    			}
    		}
    	});
    	
    }
    
}();

$(document).ready(function() {
	AspCompanySavePopApp.init();
});
