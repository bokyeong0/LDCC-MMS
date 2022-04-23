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

var UserInfoViewPopApp = function () {
	"use strict";
	
	
	/*******************************
	 ****전역 객체 선언부 시작******
	 ******************************/
	
	var $userInfoGrid = UserInfoApp.getGrid();
	
    return {
        init: function () {
        	//Site 정보 조회
//        	fnGetStoreInfo(strJson);
        	
	    },
	    fnSetData : function(modal) {
	    	fnGetStoreInfo(modal);
	    }
    };
    
    //[Fn]Site 정보 조회
    function fnGetStoreInfo(modal) {
    	var rowId = $userInfoGrid.jqGrid('getGridParam','selrow');
    	var userSeq = $userInfoGrid.jqGrid('getCell', rowId, 'USER_SEQ');
    	
    	$.ajax({
    		type : "POST",
    		url : "/ctrl/settings/user/userInfoView",
    		data : {"userSeq": userSeq},
    		success: function(data){
    			var uData = data.data[0];
    			
    			$("#userInfoViewPopCompNm").text(uData.ASP_COMP_NM);
    			$("#userInfoViewPopUserNo").text(uData.USER_NO);
    			$("#userInfoViewPopUserId").text(uData.USER_ID);
    			$("#userInfoViewPopUserNm").text(uData.USER_NM);
    			
    			$("#userInfoViewPopUserPosition").text(uData.CODE_NM);
    			$("#userInfoViewPopUserJoinDate").text(uData.USER_JOIN_DATE);
    			
    			$("#userInfoViewPopAreaNm").text(uData.AREA_NM);
    			
    			$("#userInfoViewPopUserBirthDay").text(uData.USER_BIRTH_DATE);
    			$("#userInfoViewPopUserPhone").text(uData.USER_PHONE);
    			$("#userInfoViewPopUserEmail").text(uData.USER_EMAIL);
    			$("#userInfoViewPopCallExt").text(uData.CALL_EXT);
    			
    			$("#userInfoViewPopUseYn").text(uData.USE_YN);
    			
    			modal.show();
    		}
    	});
    }
    
}();

$(document).ready(function() {
	UserInfoViewPopApp.init();
});
