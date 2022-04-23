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

var ContractManageMentViewPopApp = function () {
	"use strict";
	
	/************************************************
	 *전역 객체 선언부 (return 상위부분에 선언해야함)
	 ************************************************/
	//계약 상세 팝업
	var $modalContractManagementViewPop = $("#modalContractManagementViewPop");
	//계약 목록 그리드
	var $contarctMngViewPopGrid = $("#contarctMngViewPopGrid");
	//팝업 Data
	var popupData = $modalContractManagementViewPop.PopAppGetData();
	//계약 타입
	var detItemType = popupData.DET_ITEM_TYPE;
	//확정 여부
	var posCfmYn = popupData.POS_CFM_YN;
	
    return {
        init: function () {
        	if(posCfmYn === "Y"){
//        		$('#contarctMngViewPopCfmBtn').removeClass('btn-info');
//        		$('#contarctMngViewPopCfmBtn').addClass('btn-danger');
//        		$('#contarctMngViewPopCfm').removeClass('fa-check');
//        		$('#contarctMngViewPopCfm').addClass('fa-undo');
//        		$('#contarctMngViewPopCfm').html(" 확정해제")
        		$('#searchForm').remove();
        		$('#contarctMngViewPopCfm').remove();
    		}
        	
        	if(detItemType === "02"){
        		$('#prdDiv').html("");
        	}
        	App.prcsEnd();
        	$modalContractManagementViewPop.show();
        	
        	fnContractDetailListGrid();
        	
        	fnContractMngViewPopEvents();
	    }
    };
    
    
    //[Fn] 이벤트 
    function fnContractMngViewPopEvents(){
    	$('#contarctMngViewPopCfmBtn').click(function(){
    		
    		if(confirm('확정하시겠습니까?')){
    			fnSaveContractCfm("Y");
    		}
//    		if(posCfmYn === "N"){
//    		}else{
//    			if(confirm('확정해제 하시겠습니까?')){
//    				fnSaveContractCfm("N");
//    			}
//    		}
    	});
    	
    	MMSUtil.MakeProductComboSet({
    		prdTypeLv1Id : '#contarctMngViewPopPrdTypeLv1',
    		prdTypeLv2Id : '#contarctMngViewPopPrdTypeLv2',
    	});
    	
    	$('#contarctMngViewPopPrdTypeLv1').val("1");
    	$('#contarctMngViewPopPrdTypeLv2').val("1");
    	
    }
    function fnContractDetailListGrid(){
    	$contarctMngViewPopGrid.paragonGrid({
        	url: '/ctrl/contract/mng/listContractDetail',
        	rowEditable : true,
			sortable: true,
			rownumbers: true,
			postData:{
					  divId 	: popupData.DIV_ID,
					  conId  	: popupData.CON_ID,
					  mtnItemId	: popupData.MTN_ITEM_ID,
					  },
			rowNum: 1000,
			height:"340px",
			colNames:['계약번호','계약명','유지보수명','세부항목명','계약수량','집계수량','DIV_ID','CON_YEAR','MTN_ITEM_ID','DET_ITEM_ID','DET_ITEM_TYPE'],
			colModel : [ 
			            {name : 'CON_ID', align:"center", width:"120px", fixed:true},														
			            {name : 'CON_NAME', align:"center", width:"200px", fixed:true},		
			            {name : 'MTN_ITEM_NAME', align:"center", width:"200px", fixed:true},		
			            {name : 'DET_ITEM_NAME', align:"center", width:"200px", fixed:true},
			            {name : 'DET_ITEM_CNT', align:"right", width:"100px" , fixed:true},
			            {name : 'POS_ITEM_CNT', align:"right", width:"100px", fixed:true, editable : true},
			            {name : 'CON_YEAR', hidden : true},
			            {name : 'DIV_ID', hidden : true},
			            {name : 'MTN_ITEM_ID', hidden : true},
			            {name : 'DET_ITEM_ID', hidden : true},
			            {name : 'DET_ITEM_TYPE', hidden : true},
					],
			ondblClickRow: function(){
				if(posCfmYn === "Y"){
					return;
				}else{
					var url = '/ctrl/contract/mng/prdPop';
					
					var rowid = $contarctMngViewPopGrid.getRowid();
					var rowData = $contarctMngViewPopGrid.getRowData(rowid);
					
					rowData.MTN_COMP_CODE = popupData.MTN_COMP_CODE;
					
					if(detItemType === "03"){
						url = '/ctrl/contract/mng/storePop';
						
						var prdTypeLv1 = $('#contarctMngViewPopPrdTypeLv1').val();
						var prdTypeLv2 = $('#contarctMngViewPopPrdTypeLv2').val();
						
						if(prdTypeLv1 === ""){
							alert('제품범주를 선택해 주세요.');
							return;
						}
						
						if(prdTypeLv2 === ""){
							alert('제품군을 선택해 주세요.');
							return;
						}
						
						rowData.prdTypeLv1 = prdTypeLv1;
						rowData.prdTypeLv2 = prdTypeLv2;
						rowData.count = rowid;
					}
					App.prcsStart();
					PopApp.paragonOpenPopup({
						ajaxUrl: url,
						data:rowData,
						id: 'modalContractManagementAstPop',
						width: '1366px',
						callback:function(count){
							$contarctMngViewPopGrid.setCell('POS_ITEM_CNT',count,rowid);
							$('#modalContractManagementAstPop').paragonClosePopup();
						}
					});
				}
            }
    	});
    }
    
    function fnSaveContractCfm(CfmYn){
		posCfmYn = CfmYn;
    	var camelObj = {
    			modFlag		: "MOD_FLAG",
    			conYear		: "CON_YEAR",
    			conId		: "CON_ID",
    			compCd		: "DIV_ID",
    			mtnItemId	: "MTN_ITEM_ID",
    			detItemId	: "DET_ITEM_ID",
    			posItemCnt 	: "POS_ITEM_CNT",
    	}
    	var gridData = $contarctMngViewPopGrid.getGridData(camelObj, true);
    	if(posCfmYn === "Y"){
        	for(var i=0; i<gridData.length; i++) {
        		var data = gridData[i];
        		if(data.posItemCnt == undefined || data.posItemCnt.length == 0) {
        			alert("집계가 되지않은 세부항목이 존재하여 확정을 하실수 없습니다.");
        			posCfmYn = "N";
        			return;
        		}
        	}
    	}
    	var sendData = {
    			posCfmYn	: posCfmYn,
    			dt_contract	: gridData,
    	}
    	
    	var jsonData = JSON.stringify(sendData);
    	
    	$.ajax({
    		url : '/ctrl/contract/mng/saveContractConfirm',
    		data:jsonData,
    		contentType: 'application/json; charset=utf-8',
    		cache: false,
    		success : function(result){
    			if(posCfmYn === "Y"){
    				alert("확정 되었습니다.");
    				$modalContractManagementViewPop.paragonClosePopup();
    				$("#contractMngGrid").search();
//    			}else{
//    				alert("확정해제 되었습니다.");
//    				$('#contarctMngViewPopCfmBtn').addClass('btn-info');
//        			$('#contarctMngViewPopCfmBtn').removeClass('btn-danger');
//        			$('#contarctMngViewPopCfm').addClass('fa-check');
//        			$('#contarctMngViewPopCfm').removeClass('fa-undo');
//        			$('#contarctMngViewPopCfm').html(" 확정");
//    				$contarctMngViewPopGrid.search();
    			}

    		}
    	});
    }
}();

$(document).ready(function() {
	ContractManageMentViewPopApp.init();
});

