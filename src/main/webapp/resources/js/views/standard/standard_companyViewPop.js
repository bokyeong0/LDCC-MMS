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

var StandardCompanyViewPopApp = function () {
	"use strict";
	/*******************************
	 ****전역 객체 선언부 시작******
	 ******************************/
	var $modalStandardCompanyViewPop = $("#modalStandardCompanyViewPop");
	var $standardCompanyGrid = $("#standardCompanyGrid");
	var compJson = $modalStandardCompanyViewPop.PopAppGetData().sendData;
	
    return {
        init: function () {
        	//고객사 정보 조회
        	fnGetCompanyInfo(compJson.compCd);
        	
        	//Form bwizard 플러그인
        	fnFormWizard();
        	
        	//브랜드 Tagit 플러그인
        	fnBrndTagIt();
	    }
    };
    
    //[Fn] 브랜드 TagIt 플러그인
    function fnBrndTagIt(){
    	$('#standardCompanyViewPopBrnd').tagit({
            readOnly : true,
            singleField : true,
    	});
    	
    	$('.bootstrap-tagsinput input').focus(function() {
            $(this).closest('.bootstrap-tagsinput').addClass('bootstrap-tagsinput-focus');
        });
    	
        $('.bootstrap-tagsinput input').focusout(function() {
            $(this).closest('.bootstrap-tagsinput').removeClass('bootstrap-tagsinput-focus');
        });
        
    }
    
    /**
     * [Fn] Form bWizard
     * 
     * 
     * 
     */
    function fnFormWizard(){
    	$("#standardCompanyViewPopWizard").bwizard();
    }
    
    function fnGetCompanyInfo(compCd, modal){
    	$.ajax({
    		url : '/ctrl/standard/company/companyInfo',
    		data : {"compCd" : compCd},
    		type : "POST",
    		dataType : "json",
    		cache: false,
    		success : function(result){
    			console.log(result);
    			var compData = result.dt_company[0]; 
    			var brndData = result.dt_brand; 
    			var strData = result.dt_store[0];
    			var strBrndCd = "";
    			console.log(compData.MNG_CD);
    			//회사정보
    			$('#standardCompanyViewPopCompNm').text(compData.COMP_NM)		;
//    			$("#standardCompanyViewPopCompCate").text(compData.COMP_CATE_NM);
            	$("#standardCompanyViewPopCompType").text(compData.COMP_TYPE_NM);
    			$('#standardCompanyViewPopMngCd').text(compData.MNG_CD)			;
    			$('#standardCompanyViewPopMemo').text(compData.MEMO)			;
    			
    			//브랜드
    			if(brndData != null){
    				for(var i in brndData){
    					$('#standardCompanyViewPopBrnd').tagit("createTag", brndData[i].BRND_NM);
    				}
    			}
    			if(strData != null){
    				console.log(strData);
	            	$("#standardCompanyViewPopStrType").text(strData.STR_TYPE_NM);
	            	$("#standardCompanyViewPopStrSt").text(strData.STR_ST_NM)	;
	    			$('#standardCompanyViewPopZipCd').text(strData.ZIP_CD)		;
	    			$('#standardCompanyViewPopAddr1').text(strData.ADDR1)		;
	    			$('#standardCompanyViewPopAddr2').text(strData.ADDR2)		;
	    			$('#standardCompanyViewPopAddrExt').text(strData.ADDR_EXT)	;
	    			$('#standardCompanyViewPopStrX').text(strData.STR_LAT)		;
	    			$('#standardCompanyViewPopStrY').text(strData.STR_LNG)		;
	    			$('#standardCompanyViewPopPhoneNum').text(strData.PHONE_NUM);
	    			$('#standardCompanyViewPopFaxNum').text(strData.FAX_NUM)	;
    			}
    			$modalStandardCompanyViewPop.show();
    		}
    	});
    }
    
}();

$(document).ready(function() {
	StandardCompanyViewPopApp.init();
});
