/** Copyright (c) 2016 VertexID RND, Inc.
 * 
 * Application Name : 사용자 등록 관리 [UserInfoSaveApp]
 * Program Code     : PC0028
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Han Seong Jin 	2016. 11. 16.  		First Draft.
 */

var AspCompanyViewPopApp = function () {
	"use strict";
	
	/*******************************
	 ****전역 객체 선언부 시작******
	 ******************************/
	// [El] 파트너사 상세보기 팝업
	var $modalAspCompanyViewPop = $('#modalAspCompanyViewPop');
	
	var aspCompCd = $('#modalAspCompanyViewPop').PopAppGetData().aspCompCd;
	
    return {
        init: function () {
        	// 사용자 등록 이벤트
        	fnGetAspCompInfo();
        	
        	fnAspViewPopEvent();
    	}
    };
    
    function fnAspViewPopEvent(){
    		$("#aspCompanyViewPopDelBtn").click(function(){
    			if(confirm("삭제하시겠습니까?")){
    				fnDeleteAspComp();
    			}
    		});
    }
    
    function fnGetAspCompInfo(){
    	$.ajax({
    		url : '/ctrl/asp/company/getAspCompInfo',
    		data : {"aspCompCd":aspCompCd},
    		type : "POST",
    		success : function(result){
    			$('#aspCompanyViewPopCd').text(aspCompCd)				;
    			$('#aspCompanyViewPopNm').text(result.ASP_COMP_NM)		;
    			$('#aspCompanyViewPopCorpNum').text(result.ASP_CORP_NUM);
    			$('#aspCompanyViewPopCeoNm').text(result.ASP_CEO_NM)	;
    			$('#aspCompanyViewPopUserNm').text(result.ASP_USER_NM)	;
    			$('#aspCompanyViewPopPhone').text(result.PHONE)			;
    			$('#aspCompanyViewPopMemo').text(result.MEMO)			;
    			
    			$modalAspCompanyViewPop.show();
    		}
    	});
    }
    
}();


$(document).ready(function() {
	AspCompanyViewPopApp.init();
});
