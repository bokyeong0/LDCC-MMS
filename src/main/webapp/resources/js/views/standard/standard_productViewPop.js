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

var StandardProductViewPopApp = function () {
	"use strict";
	
	/*******************************
	 ****전역 객체 선언부 시작******
	 ******************************/
	var $standardProductGrid = $("#standardProductGrid");
	var $standardPartGrid = $("#standardPartGrid");
	var prdJson = $('#modalStandardProductViewPop').PopAppGetData().sendData;
	
    return {
        init: function () {
        	$("#standardProductViewPopPrdTypeLv1").text(prdJson.prdTypeLv1Nm);
        	$("#standardProductViewPopPrdTypeLv2").text(prdJson.prdTypeLv2Nm);
        	$("#standardProductViewPopPrdTypeLv3").text(prdJson.prdTypeLv3Nm);
        	$("#standardProductViewPopPrdTypeLv4").text(prdJson.prdTypeLv4Nm);
        },
    	fnSetData : function(modal) {
    		// 정보 조회
    		fnGetProductInfo(modal, prdJson.prdCd);
    	}
    }
    
    // [Fn]조회
    function fnGetProductInfo(modal, prdCd) {
    	$.ajax({
    		url:"/ctrl/standard/product/getProductInfo",
    		data: {"prdCd":prdCd},
    		cache: false,
    		success: function(result){
    			$("#standardProductViewPopPrdCd").text(prdCd);
    			$("#standardProductViewPopPrdNm").text(result.PRD_NM);
    			$("#standardProductViewPopPrdSpec").text(result.PRD_SPEC);
    			$("#standardProductViewPopPrdPrc").text(result.PRD_PRC);
    			$("#standardProductViewPopPrdOrder").text(result.PRD_ORDER);
    			$("#standardProductViewPopMemo").text(result.MEMO);
    			modal.show();
    		}
    	});
    	
    }
}();

$(document).ready(function() {
	StandardProductViewPopApp.init();
});
