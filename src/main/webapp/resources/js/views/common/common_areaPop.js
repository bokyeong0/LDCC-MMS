/** Copyright (c) 2016 VertexID RND, Inc.
 * 
 * Application Name : 공통코드 관리[SystemCodeApp]
 * Program Code     : PC0003
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Kim Jin Ho  		2016. 10. 24.  		First Draft.
 */
var CommAreaPopApp = function () {
	"use strict";
	
	/************************************************
	 *전역 객체 선언부 (return 상위부분에 선언해야함)
	 ************************************************/

	// [El]공통코드 그리드
	var $areaTree = $("#areaTree");
	var $modalCommAreaPop = $("#modalCommAreaPop");
	
	var popupData = $modalCommAreaPop.PopAppGetData();
	
	var tree;
    return {
        init: function () {
        	//공통코드 이벤트
        	fnCodePopEvents();
        	
        	fnAreaTree();
	    }
    };
    
	//[Fn] 공통코드이벤트 
    function fnCodePopEvents(){
    	$('#commAreaPopSelectBtn').click(function(){
    		var areaData = $areaTree.chkData();
    		if(popupData.multiSelect === false){
    			if(areaData.length > 1){
    				alert("하나의 지역을 선택해 주세요.");
    				return;
    			}
    			areaData = areaData[0];
    			
    			if(areaData.parent === "#" && areaData.CODE_OTHER2 === ""){
    				alert("최상위 지역은 선택할 수 없습니다.\n하위 지역을 선택해 주세요.");
    				return;
    			}
    		}
    		fnPopupCallBack(areaData);
    	});
    }
    
    function fnAreaTree(){
    	$areaTree.paragonTree({
    		ajaxUrl: '/ctrl/settings/system/code/listAreaTreeJson',
    		checkBox:true,
    		checkbox : {
	        	"three_state": false,
		        "whole_node" : false,
		        "cascade"	 : 'undetermined'
		    }
    	});
    }
    
    function fnPopupCallBack(data){
    	var jsonData = {
    			 areaNm  : data.PARENT_NM +" "+data.CODE_NM,
    			 areaSeq : data.CODE_CD
    	}
    	
    	$modalCommAreaPop.popupCallback(jsonData);
    	$modalCommAreaPop.paragonClosePopup();
    }
    
}();

$(document).ready(function() {
	CommAreaPopApp.init();
});
