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

var StandardCompanyModifyPopApp = function () {
	"use strict";
	/*******************************
	 ****전역 객체 선언부 시작******
	 ******************************/
	var $modalStandardCompanyModifyPopup = $("#modalStandardCompanyModifyPopup");
	var $standardCompanyGrid = $("#standardCompanyGrid");
	var compJson = $('#modalStandardCompanyModifyPopup').PopAppGetData().sendData;
	//브랜드 Data
	var brandObj = [];
	//기존 브랜드 data
	var brandTemp = [];
	
	var strCd = "";
	var oldMngCd = "";
	
    return {
        init: function () {
        	// 회사 등록 이벤트
        	fnCompanyModifyEvents();
        	
        	//Form bwizard 플러그인
        	fnFormWizard();
        	
        	//브랜드 Tagit 플러그인
        	fnBrndTagIt();
        	
        	//기업분류 콤보박스
//        	fnListComboJson($("#standardCompanyModifyPopCompCate"), "SC0019", compJson.compCate);
        	
        	//기업타입 콤보박스
        	fnListComboJson($("#standardCompanyModifyPopCompType"), "SC0020", compJson.compType);
        	
        	//LDCC 고객사 사용으로 삭베버튼 삭제
        	$("#standardCompanyModifyPopDelBtn").remove();
//        	$("#standardCompanyModifyPopCompCate").attr("disabled",true);
        	$("#standardCompanyModifyPopCompNm").attr("disabled",true);
        	
        	fnGetCompanyInfo(compJson.compCd);
	    }
//    ,
//	    fnSetCompData : function(modal) {
//	    	//회사 정보 조회
//	    	fnGetCompanyInfo(compJson.compCd, modal);
//	    }
    };
    
    //[Fn] 회사 등록 이벤트
    function fnCompanyModifyEvents(){
    	//회사 수정 버튼
    	$("#standardCompanyModifyPopUpdateBtn").click(function(){
    		fnCheckMagCd();
//    		fnFormParsley();
    	});
    	
    	//회사 삭제 버튼
    	$("#standardCompanyModifyPopDelBtn").click(function(){
    		if(confirm("브랜드 및 본사 매장 정보도 삭제 됩니다. 삭제하시겠습니까?")){
    			fnDeleteCompany();
    		}
    	});
    	
    	//주소 검색 버튼
    	$("#standardCompanyModifyPopStrZipCdBtn").postcodifyPopUp();
    	
    	//위도 경도 조회 api
    	$("#standardCompanyModifyPopGetStrXYBtn").click(function(){
    		fnGetStrXY();
    	});
    	
        $('#standardCompanyModifyPopStrAddr2').focusin(function(){
        	if($('#standardCompanyModifyPopStrAddr1').val() != ''){
        		fnGetStrXY();
        	}
        });
//    	$("#standardCompanyModifyPopcheckMagCdBtn").click(function(){
//    		fnCheckMagCd();
//    	});
    }
    
    function fnCheckMagCd(){
	 	var mngCd		= $('#standardCompanyModifyPopStrMngCd').val();
	 	var aspCdErrorField = $('#standardCompanyModifyPopStrMngCd').parsley();
	 	
	 	if ( mngCd == "" ) {
	 		fnFormParsley();
	 		return;
	 	}

	 	if ( oldMngCd == mngCd ){
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
    				$("#standardCompanyModifyPopWizard").bwizard("show","2");
    				window.ParsleyUI.addError(aspCdErrorField, "myCustomError", '관리 코드가 존재합니다.');
    			}else{
    				fnFormParsley();
    			}
    		}
		})
    }
    
    //[Fn] 공통코드 SelectBox
    function fnListComboJson(target, groupId, select){
    	$.ajax({
    		url : "/ctrl/settings/system/code/listCodeGroupComboJson",
    		data :{codeGroupCd:groupId},
    		type : "POST",
    		dataType : "json",
    		cache: false,
    		success : function(result) {
    			Util.MakeSelectOptions(target, result, select);
    		}
    	});
    }
    
    //[Fn] 위도 경도 조회
    function fnGetStrXY(){
		var apiKey = "9f7272f1cfcad43fd1f14db4bfaa33b4";
		var address = $('#standardCompanyModifyPopStrAddr1').val();
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
    				
    				$('#standardCompanyModifyPopStrX').val(strX);
    				$('#standardCompanyModifyPopStrY').val(strY);
    			}
    		});
		}
    }
    
    //[Fn] 브랜드 TagIt 플러그인
    function fnBrndTagIt(){
    	$('#standardCompanyModifyPopBrnd').tagit({
            allowSpaces: true,
            singleField : true,
            ondblClickTag : function(event, ui){
            	$("#standardCompanyModifyPopBrnd").unbind('click');
	            var elem = $(ui.tag);
	            var input = $('<input type="text" id="replaceInput" value="'+ ui.tagLabel + '" style="color:#000" />');
	            var temp = ui.tagLabel;
	            input.bind('blur',function(){
	            	var instance = $("#standardCompanyModifyPopBrnd").data("tagit");
	            	var tags = instance.assignedTags();
	            	var val = $(this).val();
	            	
	                for(var i in tags){
	                	if (tags[i] === val){
	                		input.val(temp);
	                	}
	                }

	                $(this).closest('.tagit-label').empty().append($(this).val());
	                
	                if ( $(this).val() === temp ) {
	                	return ;
	                }
	                	
	                for(var i in tags){
	                	if (tags[i] === temp){
	                		tags[i] = $(this).val();
	                	}
	                }
	                
	                ui.tag.data("modFlag", "UPDATE");
	                instance._updateSingleTagsField(tags);
	               
	            });                 
	            elem.find('.tagit-label').empty().append(input);
	            input.focus();
            },
            afterTagAdded	: function(event, ui){
            	var value = event.timeStamp;
            	var name = ui.tagLabel;
            	
            	var varKey =ui.tag.data("key"); 
            	
            	if (!varKey){
            		ui.tag.data("key", "");
                    ui.tag.data("modFlag", "INSERT");
            	}
            },
            beforeTagRemoved : function(event, ui){
            	return true;
            },
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
    	fnParsleyGroupSet();
    	$("#standardCompanyModifyPopWizard").bwizard({
    		validating: function (e, data){  
	    		if(data.index === 0){
	    			if (false === $('form[name="standardCompanyModifyPop"]').parsley().validate('wizard-step-company')) {
	                    return false;
	                }
	    			return true;
		        }
	    	}
    	});
    }
    
    function fnGetCompanyInfo(compCd){
    	console.log("fnGetCompanyInfo")
    	$.ajax({
    		url : '/ctrl/standard/company/companyInfo',
    		data : {"compCd" : compCd},
    		type : "POST",
    		dataType : "json",
    		cache: false,
    		success : function(result){
    			var compData = result.dt_company[0]; 
    			var brndData = result.dt_brand; 
    			var strData = result.dt_store[0];
    			
    			
    			//회사정보
    			$('#standardCompanyModifyPopCompNm').val(compData.COMP_NM);
    			$('#standardCompanyModifyPopMngCd').val(compData.MNG_CD)	;
    			$('#standardCompanyModifyPopMemo').val(compData.MEMO)		;
    			
    			//브랜드
    			if(brndData != null){
    				for(var i in brndData){
    					var brndCd = brndData[i].BRND_CD;
    					var brndNm = brndData[i].BRND_NM;
    					
    					$('#standardCompanyModifyPopBrnd').tagit("createTagMod", brndNm, brndCd, "", true);
    				}
    			}
    			
    			//매장 유형 콤보박스
    			if(strData != null){
    				// 매장 코드 ( Key )
    				strCd = strData.STR_CD;
	            	fnListComboJson($("#standardCompanyModifyPopStrType"), "SC0021", strData.STR_TYPE);
	            	fnListComboJson($("#standardCompanyModifyPopStrSt"), "SC0024", strData.STR_ST);
	    			$('#standardCompanyModifyPopStrMngCd').val(strData.MNG_CD)		;
	    			$('#standardCompanyModifyPopStrCeoNm').val(strData.CEO_NM)		;
	    			$('#standardCompanyModifyPopStrZipCd').val(strData.ZIP_CD)		;
	    			$('#standardCompanyModifyPopStrAddr1').val(strData.ADDR1)			;
	    			$('#standardCompanyModifyPopStrAddr2').val(strData.ADDR2)			;
	    			$('#standardCompanyModifyPopStrAddrExt').val(strData.ADDR_EXT)	;
	    			$('#standardCompanyModifyPopStrX').val(strData.STR_LAT)		;
	    			$('#standardCompanyModifyPopStrY').val(strData.STR_LNG)		;
	    			$('#standardCompanyModifyPopStrPhoneNum').val(strData.PHONE_NUM)	;
	    			$('#standardCompanyModifyPopStrFaxNum').val(strData.FAX_NUM)		;
	    			$('#standardCompanyModifyPopStrBigo').val(strData.FAX_NUM)		;
	    			oldMngCd = strData.MNG_CD;
    			}
    			
//    			$modalStandardCompanyModifyPopup.show();
    		}
    	});
    }
    
	//parsley group set
    function fnParsleyGroupSet(){
    	$('#standardCompanyModifyPopCompNm').attr({
    		'data-parsley-required': "true",
    		'data-parsley-group':"wizard-step-company"
    	});
    }
    
    function fnFormParsley(){
    	var compNm = $('#standardCompanyModifyPopCompNm').val();
    	
    	if(compNm == "" || compNm == undefined){
    		$("#standardCompanyModifyPopWizard").bwizard("show","0");
    		if (false === $('form[id="standardCompanyModifyPop"]').parsley().validate('wizard-step-company')) {
                return false;
    		}
    	}else{
    		if(confirm("저장 하시겠습니까?")){
    			fnUpdateCompany();
    		}
        }
    }
    
    //[Fn]회사 등록
    function fnUpdateCompany() {
    	
    	var compNm		= $('#standardCompanyModifyPopCompNm').val()	;
    	var compCate	= null;//$('#standardCompanyModifyPopCompCate').val();
    	var compType	= $('#standardCompanyModifyPopCompType').val();
    	var mngCd		= $('#standardCompanyModifyPopMngCd').val()	;
    	var memo		= $('#standardCompanyModifyPopMemo').val()	;
    	
    	//매장 test
    	var strType		= $('#standardCompanyModifyPopStrType').val()		;
    	var strSt		= $('#standardCompanyModifyPopStrSt').val()		;
    	var mngCd		= $('#standardCompanyModifyPopStrMngCd').val()	;
    	var ceoNm		= $('#standardCompanyModifyPopStrCeoNm').val()	;
    	var zipCd		= $('#standardCompanyModifyPopStrZipCd').val()	;
    	var addr1		= $('#standardCompanyModifyPopStrAddr1').val()	;
    	var addr2		= $('#standardCompanyModifyPopStrAddr2').val()	;
    	var addrExt		= $('#standardCompanyModifyPopStrAddrExt').val()	;
    	var strX		= $('#standardCompanyModifyPopStrX').val()		;
    	var strY		= $('#standardCompanyModifyPopStrY').val()		;
    	var phoneNum	= $('#standardCompanyModifyPopStrPhoneNum').val()	;
    	var faxNum		= $('#standardCompanyModifyPopStrFaxNum').val()	;
    	
    	var instance = $("#standardCompanyModifyPopBrnd").data("tagit");
    	var brandData = instance.getTagsData(true);

		var sendData = {
    			
    			"compCd"	: compJson.compCd 	,
    			"compNm"	: compNm			,
    			"compCate"	: compCate			,
    			"compType"	: compType			,
    			"mngCd"		: mngCd				,
    			"memo"		: memo				,
    			
    			"dt_brand"	: brandData	,
    			
    			"strCd"		: strCd		,
    			"strType"	: strType	,
    			"strSt"		: strSt		,
    			"ceoNm"		: ceoNm		,
    			"zipCd"		: zipCd		,
    			"addr1"		: addr1		,
    			"addr2"		: addr2		,
    			"addrExt"	: addrExt	,
    			"strX"		: strX		,
    			"strY"		: strY		,
    			"phoneNum"	: phoneNum	,
    			"faxNum"	: faxNum	
    	};
		
    	$.ajax({
    		url:"/ctrl/standard/company/updateCompany",
    		data: JSON.stringify(sendData),
    		dataType : "json",
    		contentType: 'application/json; charset=utf-8',
    		cache: false,
    		success: function(result){

    			var stsCd = result.stsCd;
    			if ( stsCd == 100 ) {
    				alert(result.msgTxt);
    				$modalStandardCompanyModifyPopup.paragonClosePopup();
        			$standardCompanyGrid.paragonGridReload();
    			} else {
    				alert(result.msgTxt);
    			}

    		}
    	});
    }
    
    function fnDeleteCompany(){
    	var compCd = compJson.compCd;
    	$.ajax({
    		url:"/ctrl/standard/company/deleteCompany",
    		data: {"compCd"	: compCd},
    		success: function(result){
	   			var stsCd = result.stsCd;
    			if ( stsCd == 100 ) {
    				$("#modalStandardCompanyModifyPopup").paragonClosePopup();
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
	StandardCompanyModifyPopApp.init();
});
