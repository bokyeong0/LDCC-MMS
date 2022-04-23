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

var PartnerInfoViewPopApp = function () {
	"use strict";
	
	
	/*******************************
	 ****전역 객체 선언부 시작******
	 ******************************/
	
	var $partnerInfoGrid = $('#partnerInfoGrid');
	var userSeq = $('#viewPartnerInfoPopup').PopAppGetData().userSeq;
	
    return {
        init: function () {
        	//Site 정보 조회
//        	fnGetStoreInfo(strJson);
        	
        	//파트너 사용자 정보
        	fnGetPartnerInfo(userSeq);
        	
	    }
    };
    
    //[Fn]Site 정보 조회
    function fnGetPartnerInfo(userSeq) {
    	$.ajax({
    		type 	: "POST",
    		url 	: "/ctrl/settings/user/userInfoView",
    		data 	: {
    			"userSeq"	: userSeq
    		},
    		success	: function(result){
    			var result = result.data[0];

    			$("#partnerInfoViewPopUserId").text(result.USER_ID);
    			$("#partnerInfoViewPopUserNm").text(result.USER_NM);
    			$("#partnerInfoViewPopUserAuth").text(result.USER_AUTH_NM);
    			$("#partnerInfoViewPopUserPosition").text(result.USER_POSITION);
    			$("#partnerInfoViewPopUserAspCompNm").text(result.ASP_COMP_NM);
    			$("#partnerInfoViewPopUserAreaCd").text(result.AREA_NM);    			
    			$("#partnerInfoViewPopUserPhone").text(result.USER_PHONE);
    			$("#partnerInfoViewPopCallExt").text(result.CALL_EXT);
    			$("#partnerInfoViewPopUserEmail").text(result.USER_EMAIL);
    			$("#partnerInfoViewPopUseYn").text(result.USE_YN);	
    			
    		}
    	});
    }
    
}();

$(document).ready(function() {
	PartnerInfoViewPopApp.init();
});
