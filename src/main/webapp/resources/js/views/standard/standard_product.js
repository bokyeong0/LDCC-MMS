/** Copyright (c) 2017 VertexID RND, Inc.
 * 
 * Application Name : 권역관리[StandardProductApp]
 * Program Code     : PC0101
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * MINE 한성진		2017. 3. 16. 		First Draft.        javascript
 */
var StandardProductApp = function () {
	"use strict";
	
	/************************************************
	 *전역 객체 선언부 (return 상위부분에 선언해야함)
	 ************************************************/
	
	// [El]권역정보 그리드
	var $standardProductGrid = $("#standardProductGrid");
	
	var $standardPartGrid = $("#standardPartGrid");
	
	return {
	    init: function () {
	    	//권역정보관리 Grid생성
	    	fnListProduct();
	    	
	    	//제품군 목록
	    	fnListComboJson($("#standardProductPrdTypeLv1"), "SC0022", "", "선택");
	    	
	    	//제품군 목록
	    	fnListComboJson($("#standardProductPrdTypeLv2"), "SC0023", "", "선택");
	    	
	    	//제품군 목록
	    	fnListComboJson($("#standardProductPrdTypeLv3"), "SC0025", "", "선택");
	    	
	    	//제품군 목록
	    	fnListComboJson($("#standardProductPrdTypeLv4"), "SC0026", "", "선택");
	    
	    	//권역정보관리 Event
	    	fnProductEvents();
	    	
	    }
	};
	
	
	//[Fn] 이벤트 
	function fnProductEvents(){
		//검색폼 권역정보명 엔터키 이벤트
		$("#standardProductCd, #standardProductNm, #standardProductSpec").enterEvent({
			callBack:function(value){
		    	var data = {
		    			prdCd : $('#standardProductCd').val(),
		    			prdNm : $('#standardProductNm').val(),
		    			prdSpec	: $('#standardProductSpec').val(),
		    			prdTypeLv1 : $("#standardProductPrdTypeLv1 option:selected").val(),
						prdTypeLv2 : $("#standardProductPrdTypeLv2 option:selected").val(),
						prdTypeLv3 : $("#standardProductPrdTypeLv3 option:selected").val(),
						prdTypeLv4 : $("#standardProductPrdTypeLv4 option:selected").val(),
				};
		    	//그리드 조회
		    	$standardProductGrid.paragonGridSearch(data);
			}
		})
		
		//검색버튼
		$("#standardProductSearchBtn").click(function(){
			fnSearchListProduct();
		});
		//수정버튼
		$("#standardProductModifyBtn").click(function(){
			fnModifyProduct();
		});
		//등록버튼
		$("#standardProductInsertBtn").click(function(){
			fnInsertProduct();
		});
		
	}
	
	function fnListComboJson(target, groupCd, select, first){
    	$.ajax({
    		url : "/ctrl/settings/system/code/listCodeGroupComboJson",
    		data :{codeGroupCd:groupCd},
    		type : "POST",
    		dataType : "json",
    		cache: false,
    		success : function(result) {
    			Util.MakeSelectOptions(target, result, select, first);
    		}
    	});
    }
	
	//[Fn] 그룹코드 검색 조건 조회
	function fnSearchListProduct(){
    	var data = {
    			prdCd : $('#standardProductCd').val(),
    			prdNm : $('#standardProductNm').val(),
    			prdSpec	: $('#standardProductSpec').val(),
    			prdTypeLv1 : $("#standardProductPrdTypeLv1 option:selected").val(),
				prdTypeLv2 : $("#standardProductPrdTypeLv2 option:selected").val(),
				prdTypeLv3 : $("#standardProductPrdTypeLv3 option:selected").val(),
				prdTypeLv4 : $("#standardProductPrdTypeLv4 option:selected").val(),
		};
    	$standardProductGrid.paragonGridSearch(data);
	}
	/********************************************************************
	 * 권역정보관리 그리드 생성
	 * Since   : 2016-10-24
	 * 작성자  : Kim Jin Ho
	 * 수정내역: 
	 ********************************************************************/
	//[Fn] jqgrid 권역정보관리 목록 
	function fnListProduct(){
		$standardProductGrid.paragonGrid({
	    	url: '/ctrl/standard/product/listStndPrd',
	    	rowEditable:true,
			sortable: true,
			colModel : [ 
	            {name : 'PRD_CD', align:"center"}, 
	            {name : 'PRD_NM', align:"center", width:300}, 
	            {name : 'PRD_SPEC', align:"center"}, 
	            {name : 'PRD_TYPE_LV1',align:"center", hidden:true}, 
	            {name : 'PRD_TYPE_LV2',align:"center", hidden:true}, 
	            {name : 'PRD_TYPE_LV3',align:"center", hidden:true}, 
	            {name : 'PRD_TYPE_LV4',align:"center", hidden:true}, 
	            {name : 'PRD_TYPE_LV1_NM',align:"center"}, 
	            {name : 'PRD_TYPE_LV2_NM',align:"center"}, 
	            {name : 'PRD_TYPE_LV3_NM',align:"center"}, 
	            {name : 'PRD_TYPE_LV4_NM',align:"center"}, 
				{name : 'PRD_ORDER',align:"center", width:70}, 
				{name : 'MEMO'}, 
			],
	        pager: "#standardProductGridNavi",
	        onSelectRowEvent : function(currRowData, prevRowData) {
				//로우선택시 공통코드 목록 조회
				var prdCd = currRowData.PRD_CD;
				$("#standardProductNm").val("");
				$standardPartGrid.paragonGridSearch({
					"prdCd" : prdCd,
				});
			},
			ondblClickRow: function(){
				var rowId = $standardProductGrid.jqGrid('getGridParam','selrow');
		    	var prdCd = $standardProductGrid.jqGrid('getCell', rowId, 'PRD_CD');
		    	var prdTypeLv1Nm = $standardProductGrid.jqGrid('getCell', rowId, 'PRD_TYPE_LV1_NM');
		    	var prdTypeLv2Nm = $standardProductGrid.jqGrid('getCell', rowId, 'PRD_TYPE_LV2_NM');
		    	var prdTypeLv3Nm = $standardProductGrid.jqGrid('getCell', rowId, 'PRD_TYPE_LV3_NM');
		    	var prdTypeLv4Nm = $standardProductGrid.jqGrid('getCell', rowId, 'PRD_TYPE_LV4_NM');
		    	
		    	var sendData = {
		    			"prdCd"			: prdCd			,
		    			"prdTypeLv1Nm"	: prdTypeLv1Nm	,
		    			"prdTypeLv2Nm"	: prdTypeLv2Nm	,
		    			"prdTypeLv3Nm"	: prdTypeLv3Nm	,
		    			"prdTypeLv4Nm"	: prdTypeLv4Nm	,
		    	}
		    	
				if(rowId === null){
					alert("수정할 행 선택");
				}else{
			    	PopApp.paragonOpenPopup({
			    		ajaxUrl: '/ctrl/standard/product/viewProductPop',
			    		data:{"sendData":sendData},
			    		id: 'modalStandardProductViewPop',
			    		width: '650px',
			    		btnName:"수정",
			    		title:"장비 상세보기",
			    		onload:function(modal){
			    			StandardProductViewPopApp.fnSetData(modal);
			    		}
			    	});
				}
			}
	    });
	}
	
	//[Fn] 품목 등록 팝업 
	function fnInsertProduct(){
		PopApp.paragonOpenPopup({
			ajaxUrl: '/ctrl/standard/product/saveProductPop',
			id: 'modalStandardProductSavePop',
			width: '650px',
			btnName:"저장",
			title:"장비 등록",
			onload:function(modal){
				modal.show();
			}
		});
	}
	
	//[Fn] 품목 수정 팝업 
	function fnModifyProduct(){
		var rowId = $standardProductGrid.jqGrid('getGridParam','selrow');
    	var prdCd = $standardProductGrid.jqGrid('getCell', rowId, 'PRD_CD');
    	var prdTypeLv1 = $standardProductGrid.jqGrid('getCell', rowId, 'PRD_TYPE_LV1');
    	var prdTypeLv2 = $standardProductGrid.jqGrid('getCell', rowId, 'PRD_TYPE_LV2');
    	var prdTypeLv3 = $standardProductGrid.jqGrid('getCell', rowId, 'PRD_TYPE_LV3');
    	var prdTypeLv4 = $standardProductGrid.jqGrid('getCell', rowId, 'PRD_TYPE_LV4');
    	
    	var sendData = {
    			"prdCd"		: prdCd		,
    			"prdTypeLv1": prdTypeLv1,
    			"prdTypeLv2": prdTypeLv2,
    			"prdTypeLv3": prdTypeLv3,
    			"prdTypeLv4": prdTypeLv4,
    	}
    	
		if(rowId === null){
			alert("수정할 행 선택");
		}else{
	    	PopApp.paragonOpenPopup({
	    		ajaxUrl: '/ctrl/standard/product/modifyProductPop',
	    		data:{"sendData":sendData},
	    		id: 'modalStandardProductModifyPop',
	    		width: '650px',
	    		btnName:"수정",
	    		title:"품목 수정",
	    		onload:function(modal){
	    			StandardProductModifyPopApp.fnSetData(modal);
	    		}
	    	});
		}
	}
}();

$(document).ready(function() {
	StandardProductApp.init();
});
