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

var StandardStoreViewPopApp = function () {
	"use strict";
	
	
	/*******************************
	 ****전역 객체 선언부 시작******
	 ******************************/
	var $standardStoreGrid = $("#standardStoreGrid");
	
	//Site Data
	var strJson = $("#modalStandardStoreViewPop").PopAppGetData().sendData;
	
    return {
        init: function () {
        	//Site 정보 조회
        	fnGetStoreInfo(strJson);
	    }
    };
    
    //[Fn]Site 정보 조회
    function fnGetStoreInfo(storeData) {
    	var strCd = storeData.strCd;
    	
    	$.ajax({
    		url:"/ctrl/standard/store/storeInfo",
    		data: {"strCd":strCd},
    		success: function(result){
    			var strData = result.dt_store[0];
    			
//    			$("#standardStoreViewPopCompCate").text(strData.COMP_CATE_NM);
    			$("#standardStoreViewPopCompNm").text(strData.COMP_NM)		;
    			$("#standardStoreViewPopBrndNm").text(strData.BRND_NM)		;
            	$("#standardStoreViewPopStrType").text(strData.STR_TYPE_NM)	;
            	$("#standardStoreViewPopStrSt").text(strData.STR_ST_NM)		;
		    	$('#standardStoreViewPopStrNm').text(strData.STR_NM)		;
		    	$('#standardStoreViewPopCorpNum').text(strData.CORP_NUM)	;
		    	$('#standardStoreViewPopAreaNm').text(strData.AREA_NM)		;
		    	$('#standardStoreViewPopMngCd').text(strData.MNG_CD)		;
		    	$('#standardStoreViewPopCeoNm').text(strData.CEO_NM)		;
		    	$('#standardStoreViewPopZipCd').text(strData.ZIP_CD)		;
		    	$('#standardStoreViewPopAddr1').text(strData.ADDR1)			;
		    	$('#standardStoreViewPopAddr2').text(strData.ADDR2)			;
		    	$('#standardStoreViewPopAddrExt').text(strData.ADDR_EXT)	;
		    	$('#standardStoreViewPopStrX').text(strData.STR_LAT)		;
		    	$('#standardStoreViewPopStrY').text(strData.STR_LNG)		;
		    	$('#standardStoreViewPopPhoneNum').text(strData.PHONE_NUM)	;
		    	$('#standardStoreViewPopFaxNum').text(strData.FAX_NUM)		;
		    	$('#standardStoreViewPopBigo').text(strData.BIGO)			;
		    	
		    	$('#standardStoreViewPopupOpenDt').text(strData.OPEN_DATE)				;
		    	$('#standardStoreViewPopupRenewalDt').text(strData.RENEWAL_DATE)		;
		    	$('#standardStoreViewPopupRelocationDt').text(strData.RELOCATION_DATE)	;
		    	$('#standardStoreViewPopupAddMngStr').text(strData.OPER_STR_NM)			;
		    	$('#standardStoreViewPopupChargeSv').text(strData.CHARGE_SV)			;
		    	$('#standardStoreViewPopupHerbModel').text(strData.HERBMODEL_NM)		;
		    	$('#standardStoreViewPopupVpnModel').text(strData.VPNMODEL_NM)			;
		    	$('#standardStoreViewPopupApYn').text(strData.AP_NM)					;
		    	$('#standardStoreViewPopupEtcMemo').text(strData.ETC_MEMO)				;
		    	$('#standardStoreViewPopupTeleCommunity').text(strData.TELECOMMUNITY_NM);
		    	
    		}
    	});
    }
    
}();

$(document).ready(function() {
	StandardStoreViewPopApp.init();
});
