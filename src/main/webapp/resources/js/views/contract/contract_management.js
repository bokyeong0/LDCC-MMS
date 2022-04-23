/** Copyright (c) 2017 VertexID RND, Inc.
 * 
 * Application Name : 권역관리[StandardStoreApp]
 * Program Code     : PC0101
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * MINE 한성진		2017. 3. 16. 		First Draft.        javascript
 */
var ContractManagementApp = function () {
	"use strict";
	
	/************************************************
	 *전역 객체 선언부 (return 상위부분에 선언해야함)
	 ************************************************/
	
	// [El]권역정보 그리드standardCompanyGrid 
	var $contractMngGrid = $("#contractMngGrid");
	
	var userInfo = Util.getUserInfo();
	var aspCompCd = userInfo.s_companyCd;
	
    return {
        init: function () {
        	//권역정보관리 Grid생성
        	fnContractMngList();
//        	//권역정보관리 Event
        	fnContractMngEvents();
        	
        	fnListComboJson($("#contractMngDetItemType"), "CN0001");
        }
    }
    
    
    //[Fn] 이벤트 
    function fnContractMngEvents(){
    	//검색폼 권역정보명 엔터키 이벤트
    	$("#contractMngConId, #contractMngConNm").enterEvent({
    		callBack:function(value){
   				var data = {
   						detItemType : $("#contractMngDetItemType").val(),
   	    				conId		: $("#contractMngConId").val(),
   	    				conName		: $("#contractMngConNm").val(),
   	    				aspCompCd	: $("#contractMngAspCompCd").val(),
   	    				compCd		: $("#contractMngCompCd").val(),
   				};
   				$contractMngGrid.search(data);
			}
    	})
    	
    	//검색버튼
    	$("#contractMngSearchBtn").click(function(){
    		var data = {
    				detItemType : $("#contractMngDetItemType").val(),
    				conId		: $("#contractMngConId").val(),
    				conName		: $("#contractMngConNm").val(),
    				aspCompCd	: $("#contractMngAspCompCd").val(),
    				compCd		: $("#contractMngCompCd").val(),
    		};
        	$contractMngGrid.search(data);
    	});
    	
    	MMSUtil.MaMakePartnerSet({
    		aspCompCdId : '#contractMngAspCompCd',
    		compCdId 	: '#contractMngCompCd',
    	});
    	
    	$('#contractMngCompCd').combobox({inMode:true});
    }
    
    //[Fn] 공통코드 Select Box
    function fnListComboJson(target, groupId){
    	$.ajax({
    		url : "/ctrl/settings/system/code/listCodeGroupComboJson",
    		data :{codeGroupCd:groupId},
    		type : "POST",
    		dataType : "json",
    		cache: false,
    		success : function(result) {
    			Util.MakeSelectOptions(target, result);
    		}
    	});
    }
    
    
    /********************************************************************
     * 권역정보관리 그리드 생성
     * Since   : 2017-12-12
     * 작성자  : Han Seong Jin
     * 수정내역: 
     ********************************************************************/
    //[Fn] jqgrid 계약 목록 
    function fnContractMngList(){
		$contractMngGrid.paragonGrid({
        	url: '/ctrl/contract/mng/listContractMng',
        	postData:{aspCompCd:aspCompCd},
			sortable: true,
			rownumbers : true,
			colNames : ['고객사코드','CON_ID','계약ID','계약유형','유지보수항목명','고객사명','계약명','유지보수 시작일','유지보수 종료일','유지보수 파트너사','계약년도','유지보수항목ID','상세항목유형명','상세항목ID','상세항목 변경일자','상세항목 상태','CON_CFM_YN','계약 확정 유무','파트너사코드','상세항목유형명','품목 수량','장애해결목표시간'],
			colModel : [ 
			            {name : 'DIV_ID', hidden:true},
			            {name : 'CON_ID', hidden:true},
			            {name : 'CON_ID_NM', align:"center"},
			            {name : 'DET_ITEM_TYPE_NM', align:"center"},
			            {name : 'MTN_ITEM_NAME', hidden:true},
			            {name : 'COMP_NM', align:"center"},
			            {name : 'CON_NAME', align:"center"},
			            {name : 'MTN_STR_DATE', align:"center"},
			            {name : 'MTN_END_DATE', align:"center"},
			            {name : 'ASP_COMP_NM', align:"center"},
			            {name : 'CON_YEAR', hidden:true},
			            {name : 'MTN_ITEM_ID', hidden:true},
			            {name : 'DET_ITEM_NAME', hidden:true},
			            {name : 'DET_ITEM_ID', hidden:true},
			            {name : 'CHANG_DATE', hidden:true},
			            {name : 'DET_ITEM_FLAG', hidden:true},
			            {name : 'CON_CFM_YN', hidden:true},
			            {name : 'POS_CFM_YN', align:"center", width:"80px"},
			            {name : 'MTN_COMP_CODE', hidden:true},
			            {name : 'DET_ITEM_TYPE', hidden:true},
			            {name : 'DET_ITEM_CNT', hidden:true},
			            {name : 'ERROR_SOLV_TRGT_TIME', hidden:true},
			],
            pager: "#contractMngGridNavi",
            caption:'계약 목록',
            ondblClickRow: function(){
            	var rowid = $contractMngGrid.jqGrid('getGridParam','selrow');
            	var rowData = $contractMngGrid.getRowData(rowid);
    	    	PopApp.paragonOpenPopup({
    	    		ajaxUrl: '/ctrl/contract/mng/viewPop',
    	    		data:rowData,
    	    		id: 'modalContractManagementViewPop',
    	    		width: '1024px',
    	    		title:"계약 세부항목 목록조회",
    	    		closeEvent:function(){
    	    			$contractMngGrid.search();
    	    		}
    	    	});
    	    	
            }
        });
	}
}();

$(document).ready(function() {
	ContractManagementApp.init();
});
