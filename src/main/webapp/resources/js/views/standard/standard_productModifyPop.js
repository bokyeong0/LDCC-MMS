/** Copyright (c) 2016 VertexID RND, Inc.
 * 
 * Application Name : 사용자 등록 관리 [companySaveApp]
 * Program Code     : PC0028
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Han Seong Jin 	2016. 11. 16.  		First Draft.
 */

var StandardProductModifyPopApp = function () {
	"use strict";
	
	
	/*******************************
	 ****전역 객체 선언부 시작******
	 ******************************/
	var $standardProductGrid = $("#standardProductGrid");
	var prdJson = $('#modalStandardProductModifyPop').PopAppGetData().sendData;
	
    return {
        init: function () {
        	// 회사 등록 이벤트
        	fnProductModifyEvents();
        
        	fnParsleyGroupSet();
        	
        	//제품군 목록
        	fnListComboJson($("#standardProductModifyPopPrdTypeLv1"), "SC0022", "제품군선택", prdJson.prdTypeLv1);
        	
        	//제품군 목록
        	fnListComboJson($("#standardProductModifyPopPrdTypeLv2"), "SC0023", "제품군선택", prdJson.prdTypeLv2);
        	
        	//제품군 목록
        	fnListComboJson($("#standardProductModifyPopPrdTypeLv3"), "SC0025", "제품군선택", prdJson.prdTypeLv3);
        	
        	//제품군 목록
        	fnListComboJson($("#standardProductModifyPopPrdTypeLv4"), "SC0026", "제품군선택", prdJson.prdTypeLv4);
	    },
	    fnSetData : function(modal) {
    		// 정보 조회
	    	fnGetProductInfo(modal, prdJson.prdCd);
    	}
    }
    
    //[Fn] 회사 등록 이벤트
    function fnProductModifyEvents(){
    	//사용자 등록 버튼
    	$("#standardProductModifyPopUpdateBtn").click(function(){
    		fnUpdateParsley(prdJson.prdCd);
    	});
    	$("#standardProductModifyPopDelBtn").click(function(){
    		if(confirm("삭제 하시겠습니까?")){
    			fnDeleteProduct(prdJson.prdCd);
    		}
    	});
    	$("#standardProductModifyPopPrdTypeLv1Btn").click(function(){
    		fnCommCodePopup($('#standardProductModifyPopPrdTypeLv1'),"SC0022", "품목군 선택", "품목군 추가");
    	});
    	
    	$("#standardProductModifyPopPrdTypeLv2Btn").click(function(){
    		fnCommCodePopup($('#standardProductModifyPopPrdTypeLv2'),"SC0023", "대분류 선택", "대분류 추가");
    	});
    	$("#standardProductModifyPopPrdTypeLv3Btn").click(function(){
    		fnCommCodePopup($('#standardProductModifyPopPrdTypeLv3'),"SC0025", "중분류 선택", "중분류 추가");
    	});
    	
    	$("#standardProductModifyPopPrdTypeLv4Btn").click(function(){
    		fnCommCodePopup($('#standardProductModifyPopPrdTypeLv4'),"SC0026", "소분류 선택", "소분류 추가");
    	});
    	
    	$('#standardProductModifyPopPrdCd').prop('disabled', true);
    	
    	$('#standardProductModifyPopPrdTypeLv1').combobox();
    	$('#standardProductModifyPopPrdTypeLv2').combobox();
    	$('#standardProductModifyPopPrdTypeLv3').combobox();
    	$('#standardProductModifyPopPrdTypeLv4').combobox();
    }
    
    //공통코드 팝업
	function fnCommCodePopup(target, codeGroupCd, first, title){
		PopApp.paragonOpenPopup({
    		ajaxUrl: '/ctrl/settings/system/code/commCodePop',
    		data:{"codeGroupCd" : codeGroupCd},
    		id: 'modalSystemCommCodePop',
    		width: '600px',
    		btnName:"저장",
    		title: title,
    		onload:function(modal){
    			modal.show();
    		},
    		closeEvent:function(data){
   				fnListComboJson(target, codeGroupCd, first);
    		}
    	});
	}
    function fnListComboJson(target, groupCd, first, select){
    	$.ajax({
    		url : "/ctrl/settings/system/code/listCodeGroupComboJson",
    		data :{codeGroupCd:groupCd},
    		type : "POST",
    		dataType : "json",
    		cache: false,
    		success : function(result) {
    			//타겟, 데이터, 초기화, 기본값,선택 
    			//(El,json,first,reset,select) 
    			Util.MakeBootstrapSelectBox(target, result, first, select);
    		}
    	});
    }
    
    
  //parsley set
    function fnParsleyGroupSet(){
    	$('#standardProductModifyPopPrdTypeLv1').attr({
    		'data-parsley-required' : "true" ,
    		'data-parsley-group'	: "wizard-step-prd" });
    	$('#standardProductModifyPopPrdTypeLv2').attr({
	    	'data-parsley-required' : "true" ,
	    	'data-parsley-group'	: "wizard-step-prd" });
    	$('#standardProductModifyPopPrdTypeLv3').attr({
    		'data-parsley-required' : "true" ,
    		'data-parsley-group'	: "wizard-step-prd" });
    	$('#standardProductModifyPopPrdTypeLv4').attr({
    		'data-parsley-required' : "true" ,
    		'data-parsley-group'	: "wizard-step-prd" });
		$('#standardProductModifyPopPrdCd').attr({
			'data-parsley-required' : "true" ,
			'data-parsley-group'	: "wizard-step-prd" });
    }
    
    function fnUpdateParsley(){
    	if (false === $('form[id="standardProductModifyPop"]').parsley().validate('wizard-step-prd')) {
            return false;
        }else{
        	if(confirm("저장 하시겠습니까?")){
        		fnUpdateProduct();
        	}
        }
    }
    
    function fnGetProductInfo(modal, prdCd){
    	$.ajax({
    		url:'/ctrl/standard/product/getProductInfo',
    		data : {"prdCd":prdCd},
    		success: function(result){
    			$('#standardProductModifyPopPrdCd').val(prdCd)				;
    			$('#standardProductModifyPopPrdNm').val(result.PRD_NM)		;
    			$('#standardProductModifyPopPrdSpec').val(result.PRD_SPEC)	;				
    	    	$('#standardProductModifyPopPrdPrc').val(result.PRD_PRC)	;	
    	    	$('#standardProductModifyPopPrdOrder').val(result.PRD_ORDER);	
    	    	$('#standardProductModifyPopMemo').val(result.MEMO)			;
    	    	
    	    	modal.show();
    		}
    	})
    }
    
    function fnUpdateProduct() {
    	var prdCd		= prdJson.prdCd;
    	var prdTypeLv1	= $('#standardProductModifyPopPrdTypeLv1 option:selected').val();
    	var prdTypeLv2  = $('#standardProductModifyPopPrdTypeLv2 option:selected').val();
    	var prdTypeLv3	= $('#standardProductModifyPopPrdTypeLv3 option:selected').val();
    	var prdTypeLv4  = $('#standardProductModifyPopPrdTypeLv4 option:selected').val();
    	var prdNm		= $('#standardProductModifyPopPrdNm').val()						;
    	var prdSpec		= $('#standardProductModifyPopPrdSpec').val()					;
    	var prdPrc		= $('#standardProductModifyPopPrdPrc').val()					;
    	var prdOrder	= $('#standardProductModifyPopPrdOrder').val()					;
    	var memo		= $('#standardProductModifyPopMemo').val()						;
    	
    	var sendData = {
    			
    			"prdCd"			: prdCd			,
    			"prdTypeLv1"	: prdTypeLv1	,
    			"prdTypeLv2"	: prdTypeLv2	,
    			"prdTypeLv3"	: prdTypeLv3	,
    			"prdTypeLv4"	: prdTypeLv4	,
    			"prdNm"			: prdNm			,
    			"prdSpec"		: prdSpec		,
    			"prdPrc"		: prdPrc		,
    			"prdOrder"		: prdOrder		,
    			"memo"			: memo			,
    	};
    	$.ajax({
    		url:"/ctrl/standard/product/updateProduct",
    		data: sendData,
    		dataType : "json",
    		success: function(result){
				$("#modalStandardProductModifyPop").paragonClosePopup();
    			$standardProductGrid.paragonGridReload();
    		}
    	});
    	
    }
    function fnDeleteProduct(prdCd) {
    	$.ajax({
    		url:"/ctrl/standard/product/deleteProduct",
    		data: {"prdCd":prdCd},
    		cache: false,
    		success: function(result){
				$("#modalStandardProductModifyPop").paragonClosePopup();
    			$standardProductGrid.paragonGridReload();
    		}
    	});
    	
    }
    
}();

$(document).ready(function() {
	StandardProductModifyPopApp.init();
});
