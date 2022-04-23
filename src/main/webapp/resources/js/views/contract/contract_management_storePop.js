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

var ContractManageMentStorePopApp = function () {
	"use strict";
	
	/************************************************
	 *전역 객체 선언부 (return 상위부분에 선언해야함)
	 ************************************************/
	
	var $modalContractManagementAstPop = $("#modalContractManagementAstPop");
	var $contarctMngStorePopGrid = $("#contarctMngStorePopGrid");
	var $contarctMngStorePopAstGrid = $("#contarctMngStorePopAstGrid");
	
	var popupData = $modalContractManagementAstPop.PopAppGetData();
	var prdTypeLv1 = popupData.prdTypeLv1;
	var prdTypeLv2 = popupData.prdTypeLv2;
	
	var aspCompCd = popupData.MTN_COMP_CODE;
	var compCd = popupData.DIV_ID;
	
	
    return {
        init: function () {
        	$modalContractManagementAstPop.setTitle("점포 단위 계약 수량관리");
        	
        	fnMakePosCntSelectBox();
        	
        	MMSUtil.fnMakeAreaCombo($('#contarctMngStorePopAreaCd'), "", aspCompCd);
        	MMSUtil.fnMakeBrndCombo($("#contarctMngStorePopBrndCd"), compCd, '', '선택'); 
        	
        	fnContractMngStorePopEvents();
        	
        	
        	App.prcsEnd();
        	
        	$modalContractManagementAstPop.show();
        	
        	fnContractStoreListGrid();
        	

        	fnContractAssetListGrid();
    		var data = {
    				conId		: popupData.CON_ID,
					conYear		: popupData.CON_YEAR,
					mtnItemId	: popupData.MTN_ITEM_ID,
    				aspCompCd	: aspCompCd,
    				compCd		: compCd,
    				prdTypeLv1	: prdTypeLv1,
    				prdTypeLv2	: prdTypeLv2,
    				brndCd		: $("#contarctMngStorePopBrndCd").val(),
    				posCnt		: $('#contarctMngStorePopPrdPosCnt').val()
    		};
    		$contarctMngStorePopGrid.search(data);
    		$contarctMngStorePopAstGrid.search(data);
	    }
    };
    
    //[Fn] 이벤트 
    function fnContractMngStorePopEvents(){
    	$("#contarctMngStorePopStrNm").enterEvent({
    		callBack:function(value){
    			if($("#contarctMngStorePopPrdTypeLv1").val() === ""){
    				alert("제품범주를 선택해 주세요");
    				return;
    			}
    			if($("#contarctMngStorePopPrdTypeLv2").val() === ""){
    				alert("제품군을 선택해 주세요");
    				return;
    			}
    			
    			var data = {
    					conId		: popupData.CON_ID,
    					conYear		: popupData.CON_YEAR,
    					mtnItemId	: popupData.MTN_ITEM_ID,
    					aspCompCd	: aspCompCd,
    					compCd		: compCd,
    					prdTypeLv1	: prdTypeLv1,
    					prdTypeLv2	: prdTypeLv2,
    					brndCd		: $("#contarctMngStorePopBrndCd").val(),
    					strNm		: $("#contarctMngStorePopStrNm").val(),
    					areaCd		: $("#contarctMngStorePopAreaCd").val(),
    					maYn		: $("#contarctMngStorePopMaYn").val(),
    					costYn		: $("#contarctMngStorePopCostYn").val(),
				};
    			
    			$contarctMngStorePopAstGrid.search(data);
    		}
    	});
    	
    	$("#contarctMngStorePopSearchBtn").click(function(){
			if($("#contarctMngStorePopPrdTypeLv1").val() === ""){
				alert("제품범주를 선택해 주세요");
				return;
			}
			if($("#contarctMngStorePopPrdTypeLv2").val() === ""){
				alert("제품군을 선택해 주세요");
				return;
			}
			
			var data = {
					conId		: popupData.CON_ID,
					conYear		: popupData.CON_YEAR,
					mtnItemId	: popupData.MTN_ITEM_ID,
					aspCompCd	: aspCompCd,
					compCd		: compCd,
					prdTypeLv1	: prdTypeLv1,
					prdTypeLv2	: prdTypeLv2,
					brndCd		: $("#contarctMngStorePopBrndCd").val(),
					strNm		: $("#contarctMngStorePopStrNm").val(),
					areaCd		: $("#contarctMngStorePopAreaCd").val(),
					maYn		: $("#contarctMngStorePopMaYn").val(),
					costYn		: $("#contarctMngStorePopCostYn").val(),
			};
			$contarctMngStorePopAstGrid.search(data);
    	});
    	
    	MMSUtil.MakeProductComboSet({
    		prdTypeLv1Id : '#contarctMngStorePopPrdTypeLv1',
    		prdTypeLv2Id : '#contarctMngStorePopPrdTypeLv2',
    	});
    	
    	
    	$('#contarctMngStorePopAstSaveBtn').click(function(){
    		var camelObj = {
        			modFlag		: "MOD_FLAG",
        			maYn		: "MA_YN",
    		}
        	
        	// 그리드에서 저장이 필요한 데이터만 가져옴
        	var	gridData = $contarctMngStorePopAstGrid.getGridData(camelObj);
        	
        	if(gridData.length === 0){
        		alert("변경사항이 없습니다.");
        		return;
        	}
    		
    		fnAssetUpdate();
    	});
    	
    	$('#contarctMngStorePopCfmBtn').click(function(){
    		if($contarctMngStorePopAstGrid.getModCount() !== 0){
    			alert("변경된 자산이 있습니다.\n 저장해주세요.");
    			return;
    		}
    		
    		fnContractConfirm();
    	});
    	
    	$("#contarctMngStorePopBrndCd").change(function(){
    		var data = {
    				conId		: popupData.CON_ID,
					conYear		: popupData.CON_YEAR,
					mtnItemId	: popupData.MTN_ITEM_ID,
    				aspCompCd	: aspCompCd,
    				compCd		: compCd,
    				prdTypeLv1	: prdTypeLv1,
    				prdTypeLv2	: prdTypeLv2,
    				brndCd		: $("#contarctMngStorePopBrndCd").val(),
    				posCnt		: $('#contarctMngStorePopPrdPosCnt').val()
    		};
    		$contarctMngStorePopGrid.search(data);
    		$contarctMngStorePopAstGrid.search(data);
    	});
    	
    	$('#contarctMngStorePopPrdPosCnt').change(function(){
    		var data = {
    				conId		: popupData.CON_ID,
					conYear		: popupData.CON_YEAR,
					mtnItemId	: popupData.MTN_ITEM_ID,
					aspCompCd	: aspCompCd,
					compCd		: compCd,
					prdTypeLv1	: prdTypeLv1,
					prdTypeLv2	: prdTypeLv2,
					brndCd		: $("#contarctMngStorePopBrndCd").val(),
					posCnt		: $('#contarctMngStorePopPrdPosCnt').val()
			};
    		$contarctMngStorePopGrid.search(data);
    		$contarctMngStorePopAstGrid.search(data);
    	});
    	
    }
    
    function fnMakePosCntSelectBox(){
    	var El = $('#contarctMngStorePopPrdPosCnt');
    	El.html("<option value='ALL'>전체</option>");
    	El.append("<option value='ZERO'>0 제외 모든점포</option>");
    	for (var i = 1; i <= 26; i++) {
    		var option = $("<option>", {value: i});
    		option.text(i+"대 점포")
    		El.append(option);   	
    	}
    }
    
    
    
    function fnContractStoreListGrid(){
		$contarctMngStorePopGrid.paragonGrid({
        	url: '/ctrl/contract/mng/listStore',
			sortable: false,
			firstData:false,
			height:"340px",
			rownumbers : true,
			colNames : ['점포코드','회사코드','브랜드코드','그룹분류','점포유형코드','점포형태코드','브랜드명','점포명','지역','점포형태','관리코드','POS 대수'],
			colModel : [ 
	            {name : 'STR_CD', hidden:true}, 
	            {name : 'COMP_CD', hidden:true}, 
	            {name : 'BRND_CD', hidden:true}, 
	            {name : 'COMP_CATE', hidden:true}, 
	            {name : 'STR_TYPE', hidden:true}, 
	            {name : 'STR_ST', hidden:true}, 
	            {name : 'BRND_NM', align:"center"}, 
	            {name : 'STR_NM', align:"center"}, 
	            {name : 'AREA_NM', align:"center"}, 
	            {name : 'STR_TYPE_NM', align:"center", width:100}, 
	            {name : 'MNG_CD', align:"center", width:100}, 
	            {name : 'COUNT', align:"center", width:100}, 
			],
            pager: "#contarctMngStorePopGridNavi",
        });
    }
    
    function fnContractAssetListGrid(){
    	$contarctMngStorePopAstGrid.paragonGrid({
        	url: '/ctrl/contract/mng/listStoreAsset',
			sortable: true,
			rownumbers: true,
			firstData:false,
			rowNum: 300,
			rowList: [300,1000,2000,5000],
			rowEditable : true,
			height:"340px",
			caption:"자산목록",
			colNames : ['점포명','담당부서','모델명','SPEC', '시리얼','위치','POS 번호','도입일','계약유무','자산SEQ','품목코드'],
			colModel : [ 
	            {name : 'STR_NM', align:"center", width:"120px"},		//점포명
	            {name : 'AREA_NM', align:"center", width:"120px"},		//담당부서	            
	            {name : 'PRD_NM', align:"center"},						//제품명
	            {name : 'PRD_SPEC', align:"center"},					//제품규격
	            {name : 'AST_SERIAL', align:"center"},					//시리얼
	            {name : 'AST_TYPE1', align:"center"},					//위치
	            {name : 'AST_TYPE2', align:"center"},					//POS 번호
	            {name : 'FREE_START_DT', align:"center"},				//도입일
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
            pager: "#contarctMngStorePopAstGridNavi",
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
    	
    	var gridData = $contarctMngStorePopAstGrid.getGridData(camelObj);
    	
    	var sendData = {
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
    			$contarctMngStorePopGrid.search();
    			$contarctMngStorePopAstGrid.search();
    		}
    	});
    }
    
    function fnContractConfirm(){
    	if(!confirm('저장 하시겠습니까?')){
    		return;
    	}
    	
    	var sendData = {
    			modFlag		: "STORE",
    			conYear 	: popupData.CON_YEAR,
    			conId 		: popupData.CON_ID,
    			mtnItemId 	: popupData.MTN_ITEM_ID,
    			detItemId 	: popupData.DET_ITEM_ID,
    			detItemType	: popupData.DET_ITEM_TYPE,
    			detItemName	: popupData.DET_ITEM_NAME,
    			aspCompCd	: aspCompCd,
    			compCd		: compCd,
    			prdTypeLv1	: $('#contarctMngViewPopPrdTypeLv1').val(),
				prdTypeLv2	: $('#contarctMngViewPopPrdTypeLv2').val(),
				brndCd		: $('#contarctMngStorePopBrndCd').val(),
				posCnt		: $('#contarctMngStorePopPrdPosCnt').val()
    	}
		//console.info(sendData);
    	
    	$.ajax({
    		url : '/ctrl/contract/mng/saveContract',
    		data:sendData,
    		success : function(result){
    			//console.log(result);
    			$modalContractManagementAstPop.popupCallback(result.posItemCnt);
    		}
    	});
    }
}();

$(document).ready(function() {
	ContractManageMentStorePopApp.init();
});

