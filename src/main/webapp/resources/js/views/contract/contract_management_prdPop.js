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

var ContractManageMentPrdPopApp = function () {
	"use strict";
	
	/************************************************
	 *전역 객체 선언부 (return 상위부분에 선언해야함)
	 ************************************************/
	
	var $modalContractManagementAstPop = $("#modalContractManagementAstPop");
	var $contarctMngPrdPopGrid = $("#contarctMngPrdPopGrid");
	var $contarctMngPrdPopAstGrid = $("#contarctMngPrdPopAstGrid");
	
	var popupData = $modalContractManagementAstPop.PopAppGetData();
	
	var aspCompCd = popupData.MTN_COMP_CODE;
	var compCd = popupData.DIV_ID;
	
	
    return {
        init: function () {
        	$modalContractManagementAstPop.setTitle("품목 단위 계약 수량관리");
        	
        	MMSUtil.fnMakeBrndCombo($('#contarctMngPrdPopBrndCd'), compCd);
        	
        	MMSUtil.fnMakeAreaCombo($('#contarctMngPrdPopAreaCd'), "", aspCompCd);
        	
        	App.prcsEnd();
        	$modalContractManagementAstPop.show();
        	
        	fnContractMngViewPopEvents();
        	
        	fnContractAssetListGrid();
	    }
    };
    
    
    //[Fn] 이벤트 
    function fnContractMngViewPopEvents(){
    	$("#contarctMngPrdPopStrNm").enterEvent({
    		callBack:function(value){
    			var data = {
    					conId		: popupData.CON_ID,
    					conYear		: popupData.CON_YEAR,
    					mtnItemId	: popupData.MTN_ITEM_ID,
    					aspCompCd	: aspCompCd,
    					compCd		: compCd,
    					prdTypeLv1	: $("#contarctMngPrdPopPrdTypeLv1").val(),
    					prdTypeLv2	: $("#contarctMngPrdPopPrdTypeLv2").val(),
    					maYn		: $("#contarctMngPrdPopMaYn").val(),
    					costYn		: $("#contarctMngPrdPopCostYn").val(),
    					prdNm		: $("#contarctMngPrdPopPrdNm").val(),
    					brndCd		: $("#contarctMngPrdPopBrndCd").val(),
    					areaCd		: $("#contarctMngPrdPopAreaCd").val(),
    					strNm		: $("#contarctMngPrdPopStrNm").val(),
				};
    			
    			if($("#contarctMngPrdPopPrdTypeLv1").val() === ""){
    				alert("제품범주를 선택해 주세요");
    				return;
    			}
    			if($("#contarctMngPrdPopPrdTypeLv2").val() === ""){
    				alert("제품군을 선택해 주세요");
    				return;
    			}
    			$contarctMngPrdPopGrid.search(data);
    		}
    	});
    	
    	$("#contarctMngPrdPopSearchBtn").click(function(){
			if($("#contarctMngPrdPopPrdTypeLv1").val() === ""){
				alert("제품범주를 선택해 주세요");
				return;
			}
			if($("#contarctMngPrdPopPrdTypeLv2").val() === ""){
				alert("제품군을 선택해 주세요");
				return;
			}
			
			var data = {
					conId		: popupData.CON_ID,
					conYear		: popupData.CON_YEAR,
					mtnItemId	: popupData.MTN_ITEM_ID,
					aspCompCd	: aspCompCd,
					compCd		: compCd,
					prdTypeLv1	: $("#contarctMngPrdPopPrdTypeLv1").val(),
					prdTypeLv2	: $("#contarctMngPrdPopPrdTypeLv2").val(),
					maYn		: $("#contarctMngPrdPopMaYn").val(),
					costYn		: $("#contarctMngPrdPopCostYn").val(),
					prdNm		: $("#contarctMngPrdPopPrdNm").val(),
					brndCd		: $("#contarctMngPrdPopBrndCd").val(),
					areaCd		: $("#contarctMngPrdPopAreaCd").val(),
					strNm		: $("#contarctMngPrdPopStrNm").val(),
			};
			$contarctMngPrdPopGrid.search(data);
    	});
    	
    	MMSUtil.MakeProductComboSet({
    		prdTypeLv1Id : '#contarctMngPrdPopPrdTypeLv1',
    		prdTypeLv2Id : '#contarctMngPrdPopPrdTypeLv2',
    	});
    	
    	
    	$('#contarctMngAstSaveBtn').click(function(){
    		var camelObj = {
        			modFlag		: "MOD_FLAG",
        			maYn		: "MA_YN",
    		}
        	
        	// 그리드에서 저장이 필요한 데이터만 가져옴
        	var	gridData = $contarctMngPrdPopGrid.getGridData(camelObj);
        	
        	if(gridData.length === 0){
        		alert("저장할 데이터가 없습니다.");
        		return;
        	}
    		
    		fnAssetUpdate();
    	});
    	
    	$('#contarctMngPrdPopCfmBtn').click(function(){
    		
    		var camelObj = {
        			modFlag		: "MOD_FLAG",
        			maYn		: "MA_YN",
    		}
        	
        	// 그리드에서 저장이 필요한 데이터만 가져옴
        	var	gridData = $contarctMngPrdPopGrid.getGridData(camelObj);
        	
        	if(gridData.length !== 0){
        		alert("변경된 자산이 있습니다.\n 저장해주세요.");
        		return;
        	}
        	
    		fnContractConfirm();
    	});
    	
    }
    
    function fnContractAssetListGrid(){
    	$contarctMngPrdPopGrid.paragonGrid({
        	url: '/ctrl/contract/mng/listContractAsset',
			sortable: true,
			rownumbers: true,
			firstData:false,
			rowNum: 300,
			rowList: [300,1000,2000,5000],
			rowEditable : true,
			height:"340px",
			caption:"자산목록",
			colNames : ['점포명','담당부서','모델명','SPEC', '시리얼','위치','POS 번호','도입일','유상유지보수시작일','계약유무', '자산SEQ','품목코드'],
			colModel : [ 
	            {name : 'STR_NM', align:"center", width:"120px"},		//점포명
	            {name : 'AREA_NM', align:"center", width:"120px"},		//담당부서	            
	            {name : 'PRD_NM', align:"center"},						//제품명
	            {name : 'PRD_SPEC', align:"center"},					//제품규격
	            {name : 'AST_SERIAL', align:"center"},					//시리얼
	            {name : 'AST_TYPE1', align:"center"},					//위치
	            {name : 'AST_TYPE2', align:"center"},					//POS 번호
	            {name : 'FREE_START_DT', align:"center"},				//도입일
	            {name : 'COST_START_DT', align:"center"},				//유상유지보수시작일
		    	{ 
	              editable: true, 
		      	  name:'MA_YN', 
		      	  align:"center",
		      	  edittype:'select',
		      	  formatter:'select',
				      editoptions: {
				    		value:"Y:Y;N:N",
				      }
		    	},
	            {name : 'AST_SEQ', hidden : true}, 	    //자산SEQ
	            {name : 'PRD_CD',hidden:true},			//품목코드  
			],
            pager: "#contarctMngPrdPopGridNavi",
        });
	}
    
    function fnAssetUpdate(){
    	var camelObj = {
    			modFlag		: "MOD_FLAG",
    			astSerial	: "AST_SERIAL",
    			astSeq		: "AST_SEQ",
    			prdCd		: "PRD_CD",
    			maYn		: "MA_YN",
    	}
    	
    	var gridData = $contarctMngPrdPopGrid.getGridData(camelObj);
    	
    	var sendData = {
    			conYear		: popupData.CON_YEAR,
    			divId		: popupData.DIV_ID,
    			conId		: popupData.CON_Id,
    			mtnItemId	: popupData.MTN_ITEM_ID,
    			detItemId	: popupData.DET_ITEM_ID,
    			detItemType	: popupData.DET_ITEM_TYPE,
    			detItemName	: popupData.DET_ITEM_NAME,
    			dt_asset 	: gridData,
    	}
    	
    	var jsonData = JSON.stringify(sendData);
    	
    	$.ajax({
    		url : '/ctrl/contract/mng/saveAssetMaYn',
    		data:jsonData,
    		contentType: 'application/json; charset=utf-8',
    		cache: false,
    		success : function(result){
    			alert(result.cnt +"건이 저장되었습니다.");
    			$contarctMngPrdPopGrid.search();
    		}
    	});
    }
    
    function fnContractConfirm(){
    	if($("#contarctMngPrdPopPrdTypeLv1").val() === ""){
    		alert("제품범주를 선택해 주세요");
    		return;
    	}
    	if($("#contarctMngPrdPopPrdTypeLv2").val() === ""){
    		alert("제품군을 선택해 주세요");
    		return;
    	}
    	
    	if(!confirm('저장 하시겠습니까?')){
    		return;
    	}
    	
    	var sendData = {
    			modFlag		: "PRODUCT",
    			conYear 	: popupData.CON_YEAR,
    			conId 		: popupData.CON_ID,
    			mtnItemId 	: popupData.MTN_ITEM_ID,
    			detItemId 	: popupData.DET_ITEM_ID,
    			detItemType	: popupData.DET_ITEM_TYPE,
    			detItemName	: popupData.DET_ITEM_NAME,
    			aspCompCd	: aspCompCd,
    			compCd		: compCd,
    			prdTypeLv1	: $("#contarctMngPrdPopPrdTypeLv1").val(),
				prdTypeLv2	: $("#contarctMngPrdPopPrdTypeLv2").val(),
				maYn		: "Y",
				costYn		: $("#contarctMngPrdPopCostYn").val(),
				prdNm		: $("#contarctMngPrdPopPrdNm").val(),
				brndCd		: $("#contarctMngPrdPopBrndCd").val(),
				areaCd		: $("#contarctMngPrdPopAreaCd").val(),
				strNm		: $("#contarctMngPrdPopStrNm").val(),
    	}
    	
    	$.ajax({
    		url : '/ctrl/contract/mng/saveContract',
    		data:sendData,
    		success : function(result){
    			$modalContractManagementAstPop.popupCallback(result.posItemCnt);
    		}
    	});
    }
}();

$(document).ready(function() {
	ContractManageMentPrdPopApp.init();
});

