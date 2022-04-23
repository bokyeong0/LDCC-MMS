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

var StandardProductSavePopApp = function () {
	"use strict";
	/*******************************
	 ****전역 객체 선언부 시작******
	 ******************************/
	var $standardProductGrid = $("#standardProductGrid");
//	var prdJson = $("#modalStandardProductSavePopup").PopAppGetData();
	var $stepForm1 ;
	
    return {
        init: function () {
        	// 회사 등록 이벤트
        	fnProductSaveEvents();
        	
        	fnSetParsleyForm();
        	
        	//제품군 목록
        	fnListComboJson($("#standardProductSavePopPrdTypeLv1"), "SC0022", "품목군 선택");

        	//제조사 목록
        	fnListComboJson($("#standardProductSavePopPrdTypeLv2"), "SC0023", "대분류 선택");
        	
        	//제품군 목록
        	fnListComboJson($("#standardProductSavePopPrdTypeLv3"), "SC0025", "중뷴류 선택");
        	
        	//제조사 목록
        	fnListComboJson($("#standardProductSavePopPrdTypeLv4"), "SC0026", "소분류 선택");
        },
    }
    
    //Form Parsley Set
    function fnSetParsleyForm(){
    	$('#standardProductSavePopPrdTypeLv1').attr({
    		'data-parsley-required' : "true" ,
    		'data-parsley-group'	: "wizard-step-prd" });
    	$('#standardProductSavePopPrdTypeLv2').attr({
	    	'data-parsley-required' : "true" ,
	    	'data-parsley-group'	: "wizard-step-prd" });
    	$('#standardProductSavePopPrdTypeLv3').attr({
    		'data-parsley-required' : "true" ,
    		'data-parsley-group'	: "wizard-step-prd" });
    	$('#standardProductSavePopPrdTypeLv4').attr({
    		'data-parsley-required' : "true" ,
    		'data-parsley-group'	: "wizard-step-prd" });
		$('#standardProductSavePopPrdCd').attr({
			'data-parsley-required' : "true" ,
			'data-parsley-group'	: "wizard-step-prd" });
		
    	var parsleyConfig = {
		    errorsContainer: function(parsleyField) {
		        return parsleyField.$element.parents(".parsley-target");
		    }
		};
    	$stepForm1 = $('#standardProductSavePop').parsley(parsleyConfig);
    }

    //[Fn] 회사 등록 이벤트
    function fnProductSaveEvents(){
    	//장비 저장 버튼
    	$("#standardProductSavePopSaveBtn").click(function(){
    		fnSaveParsley();
    	});
    	
    	$("#standardProductSavePopPrdTypeLv1Btn").click(function(){
    		fnCommCodePopup($('#standardProductSavePopPrdTypeLv1'),"SC0022", "품목군 선택", "품목군 추가");
    	});
    	
    	$("#standardProductSavePopPrdTypeLv2Btn").click(function(){
    		fnCommCodePopup($('#standardProductSavePopPrdTypeLv2'),"SC0023", "대분류 선택", "대분류 추가");
    	});
    	$("#standardProductSavePopPrdTypeLv3Btn").click(function(){
    		fnCommCodePopup($('#standardProductSavePopPrdTypeLv3'),"SC0025", "중분류 선택", "중분류 추가");
    	});
    	
    	$("#standardProductSavePopPrdTypeLv4Btn").click(function(){
    		fnCommCodePopup($('#standardProductSavePopPrdTypeLv4'),"SC0026", "소분류 선택", "소분류 추가");
    	});
    	
    	$('#standardProductSavePopPrdTypeLv1').combobox();
    	$('#standardProductSavePopPrdTypeLv2').combobox();
    	$('#standardProductSavePopPrdTypeLv3').combobox();
    	$('#standardProductSavePopPrdTypeLv4').combobox();
//    	fnSaveParsley();
    }
    
    function fnListComboJson(target, groupCd,first){
    	$.ajax({
    		url : "/ctrl/settings/system/code/listCodeGroupComboJson",
    		data :{codeGroupCd:groupCd},
    		type : "POST",
    		dataType : "json",
    		cache: false,
    		success : function(result) {
    			//타겟, 데이터, 초기화, 기본값,선택 
    			//(El,json,first,reset,select) 
    			Util.MakeBootstrapSelectBox(target, result, first);
    		}
    	});
    }
	
    //공통코드 팝업
	function fnCommCodePopup(target, codeGroupCd, first, title){
		PopApp.paragonOpenPopup({
    		ajaxUrl: '/ctrl/settings/system/code/commCodePop',
    		data:{
    			"codeGroupCd" : codeGroupCd,
    			"target" : target,
    			},
    		id: 'modalSystemCommCodePop',
    		width: '600px',
    		btnName:"저장",
    		title: title,
    		onload:function(modal){
//    			var data = modal.PopAppGetData();
    			modal.show();
    		},
    		closeEvent:function(data){
   				fnListComboJson(target, codeGroupCd, first);
    		}
    	});
	}
    
    function fnSaveParsley(){
    	if (false === $stepForm1.validate('wizard-step-prd')) {
            return false;
        }else{
    		fnCheckPrdCd();
        }
    }
    
    function fnCheckPrdCd(){
    	var prdCd = $('#standardProductSavePopPrdCd').val();
    	var aspCdErrorField = $('#standardProductSavePopPrdCd').parsley();
		aspCdErrorField.reset();
		
		$.ajax({
    		url : '/ctrl/standard/product/checkProductCd',
    		data : { "prdCd" : prdCd },
    		type : "POST",
    		success: function(data){
    			console.log(data);
    			if(data === 1){
    				window.ParsleyUI.addError(aspCdErrorField, "myCustomError", '품번이 존재합니다.');
    			}else{
    				if(confirm("저장 하시겠습니까?")){
    					fnSaveProduct();
    				}
    			}
    		}
    	});
    }
    
    //[Fn]회사 등록
    function fnSaveProduct() {
    	var prdTypeLv1	= $('#standardProductSavePopPrdTypeLv1 option:selected').val()	;
    	var prdTypeLv2  = $('#standardProductSavePopPrdTypeLv2 option:selected').val()	;
    	var prdTypeLv3	= $('#standardProductSavePopPrdTypeLv3 option:selected').val()	;
    	var prdTypeLv4  = $('#standardProductSavePopPrdTypeLv4 option:selected').val()	;
    	var prdCd		= $('#standardProductSavePopPrdCd').val()						;
    	var prdNm		= $('#standardProductSavePopPrdNm').val()						;
    	var prdSpec		= $('#standardProductSavePopPrdSpec').val()						;
    	var prdPrc		= $('#standardProductSavePopPrdPrc').val()						;
    	var prdOrder	= $('#standardProductSavePopPrdOrder').val()					;
    	var memo		= $('#standardProductSavePopMemo').val()						;
    	
    	var sendData = {
    			
    			"prdTypeLv1"	: prdTypeLv1	,
    			"prdTypeLv2"	: prdTypeLv2	,
    			"prdTypeLv3"	: prdTypeLv3	,
    			"prdTypeLv4"	: prdTypeLv4	,
    			"prdCd"			: prdCd			,
    			"prdNm"			: prdNm			,
    			"prdSpec"		: prdSpec		,
    			"prdPrc"		: prdPrc		,
    			"prdOrder"		: prdOrder		,
    			"memo"			: memo			,
    	};
    	$.ajax({
    		url:"/ctrl/standard/product/saveProduct",
    		data: sendData,
    		dataType : "json",
    		success: function(result){
    			alert("저장 되었습니다");
				$("#modalStandardProductSavePop").paragonClosePopup();
				$standardProductGrid.paragonGridReload();
    		}
    	});
    }
    
}();

$(document).ready(function() {
	StandardProductSavePopApp.init();
});
