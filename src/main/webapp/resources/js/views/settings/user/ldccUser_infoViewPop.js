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

var LdccUserInfoViewPopApp = function () {
	"use strict";
	
	
	/*******************************
	 ****전역 객체 선언부 시작******
	 ******************************/
	
	var $ldccUserInfoGrid = $('#ldccUserInfoGrid');
	var userSeq = $('#viewLdccUserInfoPopup').PopAppGetData().userSeq;
	
    return {
        init: function () {
        	//Site 정보 조회
	    	fnGetStoreInfo(userSeq);
	    }
    };
    
    //[Fn]Site 정보 조회
    function fnGetStoreInfo(userSeq) {
    	$.ajax({
    		type : "POST",
    		url : "/ctrl/settings/user/userInfoView",
    		data : {"userSeq": userSeq},
    		success: function(result){
    			var result = result.data[0];
    			
    			$("#ldccUserInfoViewPopCompNm").text(result.ASP_COMP_NM);
    			$("#ldccUserInfoViewPopUserId").text(result.USER_ID);
    			$("#ldccUserInfoViewPopUserNm").text(result.USER_NM);
    			$("#ldccUserInfoViewPopUserAuth").text(result.USER_AUTH_NM);
    			$("#ldccUserInfoViewPopUserPosition").text(result.USER_POSITION);
    			$("#ldccUserInfoViewPopUserDept").text(result.USER_DEPT);
    			$("#ldccUserInfoViewPopUserPhone").text(result.USER_PHONE);
    			$("#ldccUserInfoViewPopUserEmail").text(result.USER_EMAIL);
    			$("#ldccUserInfoViewPopCallExt").text(result.CALL_EXT);
    			$("#ldccUserInfoViewPopUseYn").text(result.USE_YN);
    			
    		}
    	});
    }
    
}();

$(document).ready(function() {
	LdccUserInfoViewPopApp.init();
});
