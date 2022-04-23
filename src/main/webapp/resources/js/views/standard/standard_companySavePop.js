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

var StandardCompanySavePopApp = function () {
	"use strict";
	
	/*******************************
	 ****전역 객체 선언부 시작******
	 ******************************/
	var $standardCompanyGrid = $("#standardCompanyGrid");
	var brandObj = [];
	
//	var newMngCd = "";
	
    return {
        init: function () {
        	// 회사 등록 이벤트
        	fnCompanySaveEvents();
        	
        	//Form bwizard 플러그인
        	fnFormWizard();
        	
        	//브랜드 Tagit 플러그인
        	fnBrndTagIt();
        	
        	//기업분류 콤보박스
        	fnListComboJson($("#standardCompanySavePopCompCate"), "SC0019");
        	
        	//기업타입 콤보박스
        	fnListComboJson($("#standardCompanySavePopCompType"), "SC0020");
        	
        	//매장 유형 콤보박스
        	fnListComboJson($("#standardCompanySavePopStrType"), "SC0021");
        	
        	//매장 상태 콤보박스
        	fnListComboJson($("#standardCompanySavePopStrSt"), "SC0024");
        	
	    }
    };
    
    //[Fn] 회사 등록 이벤트
    function fnCompanySaveEvents(){
    	//사용자 등록 버튼
    	$("#standardCompanySavePopSaveBtn").click(function(){
    		fnCheckMagCd();
//    		fnFormParsley();
    	});
    	
    	$("#standardCompanySavePopCloseBtn").click(function(){
    		$("#standardCompanySavePop").paragonClosePopup();
    	});
    	
    	$("#headerCloseBtn").click(function(){
    		$("#standardCompanySavePop").paragonClosePopup();
    	});
    	
    	$("#standardCompanySavePopStrZipCdBtn").postcodifyPopUp();
    	
    	//위도 경도 조회 api
    	$("#standardCompanySavePopGetStrXYBtn").click(function(){
    		fnGetStrXY();
    	});
    	
    	$('#standardCompanySavePopStrAddr2').focusin(function(){
        	if($('#standardCompanySavePopStrAddr1').val() != ''){
        		fnGetStrXY();
        	}
        });
    	
    	$('#standardCompanySavePopStrNm').val("본사");

    	
    	//사용자 등록 버튼
    	$("#standardCompanySavePopcheckMagCdBtn").click(function(){
    		fnCheckMagCd();
    	});

    }
    
    //[Fn] 고객코드 중복 체크
    function fnCheckMagCd(){
	 	var mngCd		= $('#standardCompanySavePopStrMngCd').val();
	 	var aspCdErrorField = $('#standardCompanySavePopStrMngCd').parsley();
	 	
	 	if ( mngCd == "" ) {
	 		fnFormParsley();
	 		return;
	 	}
	 	
		$.ajax({
    		url : '/ctrl/standard/company/checkManagerCodeCompany',
    		data : { "mngCd" : mngCd },
    		type : "POST",
    		success: function(data){
    			// parsley.attr reset
    			aspCdErrorField.reset();
    			if(data.result === 1){
    				$("#standardCompanySavePopWizard").bwizard("show","2");
    				window.ParsleyUI.addError(aspCdErrorField, "myCustomError", '관리 코드가 존재합니다.');
    			}else{
    				fnFormParsley();
    			}
    		}
    	});
    }
  
    
    //[Fn] 공통코드 SelectBox
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
    
    //[Fn] 위도 경도 조회
    function fnGetStrXY(){
    	var apiKey = "9f7272f1cfcad43fd1f14db4bfaa33b4";
		var address = $('#standardCompanySavePopStrAddr1').val();
		
		if(address == "" || address == undefined){
			alert("주소를 검색해 주세요.");
		}else{
			$.ajax({
    			url:'https://apis.daum.net/local/geo/addr2coord',
    			data:{
    				"output":"json",
    				"apikey":apiKey,
    				"q":address		
    			},
    			type:"POST",
    			dataType:"jsonp",
    			success : function (result){
    				//위도
    				var strX = result.channel.item[0].lat;
    				//경도
    				var strY = result.channel.item[0].lng;
    				
    				$('#standardCompanySavePopStrX').val(strX);
    				$('#standardCompanySavePopStrY').val(strY);
    			}
    		});
		}
    }
    
    //[Fn] 브랜드 TagIt 플러그인
    function fnBrndTagIt(){
    	
    	$('#standardCompanySavePopBrndNm').tagit({
            allowSpaces: true,
            removeConfirmation:true,
            afterTagAdded	: function(event, ui){
            	var value = event.timeStamp;
            	var name = ui.tagLabel;
	            brandObj.push({"value":value, "name":name});
            },
            afterTagRemoved    : function(event, ui){
            	brandObj = $.grep(brandObj,function(o,i) { 
            		return o.name === ui.tagLabel; 
            	}, true);
            },
    	});
    	
    	$('.bootstrap-tagsinput input').focus(function() {
            $(this).closest('.bootstrap-tagsinput').addClass('bootstrap-tagsinput-focus');
        });
    	
        $('.bootstrap-tagsinput input').focusout(function() {
            $(this).closest('.bootstrap-tagsinput').removeClass('bootstrap-tagsinput-focus');
        });
        
    }
    
    
    //[Fn] Form bWizard
    function fnFormWizard(){
    	fnParsleyGroupSet();
    	$("#standardCompanySavePopWizard").bwizard({
    		validating: function (e, data){
	    		if(data.index === 0){
	    			if (false === $('form[id="standardCompanySavePop"]').parsley().validate('wizard-step-company')) {
	    			    return false;
	                }
	    			return true;
		        }
	    	}
    	});
    }
    
    //parsley group set
    function fnParsleyGroupSet(){
    	$('#standardCompanySavePopCompNm').attr({
    		'data-parsley-required': "true",
    		'data-parsley-group':"wizard-step-company"
    	});
    }
    
    function fnFormParsley(){
    	var compNm = $('#standardCompanySavePopCompNm').val();
    	
    	if(compNm == "" || compNm == undefined){
    		$("#standardCompanySavePopWizard").bwizard("show","0");
    		if (false === $('form[id="standardCompanySavePop"]').parsley().validate('wizard-step-company')) {
                return false;
    		}
    	}else{
    		if(confirm("저장 하시겠습니까?")){
    			fnSaveCompany();
    		}
        }
    }
    
    //[Fn]회사 등록
    function fnSaveCompany() {
    	var compNm		= $('#standardCompanySavePopCompNm').val()					;
    	var compCate	= $('#standardCompanySavePopCompCate option:selected').val()	;
    	var compType	= $('#standardCompanySavePopCompType option:selected').val()	;
    	var mngCd		= $('#standardCompanySavePopMngCd').val()						;
    	var memo		= $('#standardCompanySavePopMemo').val()						;
    	
    	//매장 test
    	var strType		= $('#standardCompanySavePopStrType').val()		;
    	var strSt		= $('#standardCompanySavePopStrSt').val()			;
    	var mngCd		= $('#standardCompanySavePopStrMngCd').val()		;
    	var ceoNm		= $('#standardCompanySavePopStrCeoNm').val()		;
    	var zipCd		= $('#standardCompanySavePopStrZipCd').val()		;
    	var addr1		= $('#standardCompanySavePopStrAddr1').val()		;
    	var addr2		= $('#standardCompanySavePopStrAddr2').val()		;
    	var addrExt		= $('#standardCompanySavePopStrAddrExt').val()	;
    	var strX		= $('#standardCompanySavePopStrX').val()			;
    	var strY		= $('#standardCompanySavePopStrY').val()			;
    	var phoneNum	= $('#standardCompanySavePopStrPhoneNum').val()	;
    	var faxNum		= $('#standardCompanySavePopStrFaxNum').val()		;
		
    	var sendData = {
    			
    			"compNm"	: compNm	,
    			"compCate"	: compCate	,
    			"compType"	: compType	,
    			"mngCd"		: mngCd		,
    			"memo"		: memo		,
    			
    			//브랜드정보
    			"dt_brand"	: brandObj	,
    			
    			//매장 정보
    			"strType"	: strType	,
    			"strSt"		: strSt		,
    			"mngCd"		: mngCd		,
    			"zipCd"		: zipCd		,
    			"addr1"		: addr1		,
    			"addr2"		: addr2		,
    			"addrExt"	: addrExt	,
    			"strX"		: strX		,
    			"strY"		: strY		,
    			"phoneNum"	: phoneNum	,
    			"faxNum"	: faxNum	,
    	};
    	$.ajax({
    		url:"/ctrl/standard/company/saveCompany",
    		data: JSON.stringify(sendData),
    		dataType : "json",
    		contentType: 'application/json; charset=utf-8',
    		cache: false,
    		success: function(result){
		    	
		    	var stsCd = result.stsCd;
    			if ( stsCd == 100 ) {
    		    	$("#modalStandardCompanySavePopup").paragonClosePopup();
    		    	$standardCompanyGrid.paragonGridReload();
	    			alert(result.msgTxt);
    			} else {
    				alert(result.msgTxt);
    			}

    		}
    	});
    	
    }
    
}();

$(document).ready(function() {
	StandardCompanySavePopApp.init();
});
