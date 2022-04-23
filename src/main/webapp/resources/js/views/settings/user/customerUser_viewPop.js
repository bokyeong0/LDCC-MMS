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

var customerInfoViewPopApp = function () {
	"use strict";
	
	
	/*******************************
	 ****전역 객체 선언부 시작******
	 ******************************/
	
	var $customerInfoGrid = $("#customerInfoGrid");
	var userSeq = $('#viewCustomerInfoPopup').PopAppGetData().userSeq;
	
    return {
        init: function () {
        	
        	//고객사사용자 정보
        	fnGetCustomerInfo(userSeq);
        	
	    }
    };
    
    //[Fn]Site 정보 조회
    function fnGetCustomerInfo(userSeq) {
    	$.ajax({
    		type 	: "POST",
    		url 	: "/ctrl/settings/user/userInfoView",
    		data 	: {
    			"userSeq" : userSeq
    		},
    		success	: function(result){
    			var result = result.data[0];
    			$("#customerInfoViewPopCompNm").text(result.COMP_NM);
    			$("#customerInfoViewPopBrandNm").text(result.BRND_NM);	
    			$("#customerInfoViewPopUserId").text(result.USER_ID);
    			$("#customerInfoViewPopUserNm").text(result.USER_NM);
    			$("#customerInfoViewPopUserPosition").text(result.USER_POSITION);
    			$("#customerInfoViewPopUserPhone").text(result.USER_PHONE);
    			$("#customerInfoViewPopCallExt").text(result.CALL_EXT);
    			$("#customerInfoViewPopUserEmail").text(result.USER_EMAIL);
    			$("#customerInfoViewPopUseYn").text(result.USE_YN);
    			
    		}
    	});
    }
    
}();

$(document).ready(function() {
	customerInfoViewPopApp.init();
});
