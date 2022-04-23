/** Copyright (c) 2016 VertexID RND, Inc.
 * 
 * Application Name : 점포 관리 [companySaveApp]
 * Program Code     : PC0028
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Han Seong Jin 	2016. 11. 16.  		First Draft.
 */

var StandardStoreModifyPopApp = function () {
	"use strict";
	
	
	/*******************************
	 ****전역 객체 선언부 시작******
	 ******************************/
	var $standardStoreGrid = $("#standardStoreGrid");
	
	//매장 Data
	var strJson = $('#modalStandardStoreModifyPopup').PopAppGetData().sendData;
	
	var oldMngCd = "";
	var newMngCd = "";
	var compCd = "";

    return {
        init: function () {
        	//수정폼
        	if(strJson != ''){
        		fnGetStoreInfo(strJson);
        	}
        	
        	//회사 목록 조회
        	fnGetCompNameList(strJson.compCd);
        	
        	//브랜드 목록 조회
        	fnGetBrandNameList(strJson.compCd, strJson.brndCd);
        	
        	//매장 유형 콤보박스
        	fnListComboJson($("#standardStoreModifyPopStrType"), "SC0021", strJson.strType);
        	
        	//매장 상태 콤보박스
        	fnListComboJson($("#standardStoreModifyPopStrSt"), "SC0024", strJson.strSt);

        	//통신사 콤보박스
        	fnListComboJson($("#standardStoreModifyPopTeleCommunity"), "AT0004", strJson.teleComm);
        	fnListComboJson($("#standardStoreModifyPopApYn"), "AT0005", strJson.apYn);
        	
        	// 회사 등록 이벤트
        	fnStoreModifyEvents();
        	
        	$("#standardStoreModifyPopDelBtn").remove();
        	
	    }
    };
    
    //[Fn] 매장 수정 이벤트
    function fnStoreModifyEvents(){
    	//매장 수정 버튼
    	$("#standardStoreModifyPopUpdateBtn").click(function(){
    		fnCheckMagCd();
    	});
    	
    	
    	//위도 경도 조회 api
    	$("#standardStoreModifyPopGetStrXYBtn").click(function(){
    		fnGetStrXY();
    	});
    	
    	//수정폼
    	if(strJson != ''){
        	$('#standardStoreModifyPopCompNm_input, #standardStoreModifyPopCompNm_input + span').attr('disabled', true);
        	$('#standardStoreModifyPopBrndNm_input, #standardStoreModifyPopBrndNm_input + span').attr('disabled', true);
    	}
    	
    	$("#standardStoreModifyPopZipCdBtn").postcodifyPopUp();
    	
    	$('#standardStoreModifyPopAddr2').focusin(function(){
    		if($('#standardStoreModifyPopAddr1').val() != ''){
    			fnGetStrXY();
    		}
    		return false;
    	})
    	
    	$('#standardStoreModifyPopOpenDt').datepicker({
    		todayHighlight: true,
            autoclose: true,
    	});
    	
    	$('#standardStoreModifyPopRenewalDt').datepicker({
    		todayHighlight: true,
            autoclose: true,
    	});
    	
    	$('#standardStoreModifyPopRelocationDt').datepicker({
    		todayHighlight: true,
            autoclose: true,
    	});
    	
    	
    	$('#standardStoreModifyPopAreaBtn').click(function(){
    		fnAreaModifyBtn();
		});
    	
    	   //[Fn]브랜드 목록 조회
    	$("#standardStoreModifyPopBrndNm").combobox();
    	//고객사 선택시 브랜드 조회
    	$("#standardStoreModifyPopCompNm").change(function(){
        	compCd = $(this).val();
    		MMSUtil.fnMakeMaBrndCombo($("#standardStoreModifyPopBrndNm"), $(this).val(), '', '선택');
    	});
    }
    
    function fnAreaModifyBtn(){
		PopApp.paragonOpenPopup({
    		ajaxUrl: '/ctrl/settings/system/code/commAreaPop',
    		data:{multiSelect:false},
    		id: 'modalCommAreaPop',
    		width: '500px',
    		btnName:"수정",
    		title:"지역",
    		multiSelect:false,
    		onload:function(modal){
    			modal.show();
    		},
    		callback:function(data){
    			$('#standardStoreModifyPopAreaNm').val(data.areaNm);
    			$('#standardStoreModifyPopAreaSeq').val(data.areaSeq);
    		}
    	});
    }
    
    function fnCheckMagCd(){
	 	var mngCd		= $('#standardStoreModifyPopMngCd').val();
	 	var aspCdErrorField = $('#standardStoreModifyPopMngCd').parsley();
		// parsley.attr reset
		aspCdErrorField.reset();
		
	 	if ( mngCd == "" ) {
	 		fnStoreParsley();
	 		return;
	 	}

	 	//수정폼
	 	if (oldMngCd != '' && oldMngCd == mngCd ){
	 		fnStoreParsley();
	 		return;
	 	}
	 	
		$.ajax({
    		url : '/ctrl/standard/company/checkManagerCodeCompany',
    		data : { "mngCd" : mngCd },
    		type : "POST",
    		success: function(data){
    			if(data.result === 1){
    				window.ParsleyUI.addError(aspCdErrorField, "myCustomError", '관리 코드가 존재합니다.');
    			}else{
    				fnStoreParsley();
    			}
    		}
    	})
    }
    
    //공통코드 selectBox
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

    function fnListBootstrapComboJson(target, groupId, select){
    	$.ajax({
    		url : "/ctrl/settings/system/code/listCodeGroupComboJson",
    		data :{codeGroupCd:groupId},
    		type : "POST",
    		dataType : "json",
    		cache: false,
    		success : function(result) {
    			if(select){
        			Util.MakeBootstrapSelectBox(target, result, "그룹분류", select);
    			}else{
        			Util.MakeBootstrapSelectBox(target, result, "그룹분류");
    			}
    		}
    	});
    }
    
    //고객사 목록 조회
    function fnGetCompNameList(compCd){
    	$('#standardStoreModifyPopCompNm').combobox();
    	MMSUtil.fnMakeMaCompCombo($('#standardStoreModifyPopCompNm'), compCd, '선택');
    }
    
    //[Fn]브랜드 목록 조회
    function fnGetBrandNameList(compCd, brndCd){
    	$('#standardStoreModifyPopBrndNm').combobox();
    	MMSUtil.fnMakeMaBrndCombo($("#standardStoreModifyPopBrndNm"), compCd, brndCd, '선택');
    }
    
    function fnGetStrXY(){
		var apiKey = "KakaoAK 99eb65a56fa09dc65ed0dc90e81cdae8"; //롯데
//		var apiKey = "KakaoAK dc98a6c60f90db49fd29ec10448bbbe2"; //내부
		var address = $('#standardStoreModifyPopAddr1').val();
		if(address == "" || address == undefined){
			alert("주소를 검색해 주세요.");
		}else{
			
			var geocoder = new daum.maps.services.Geocoder();

			var callback = function(result, status) {
			    if (status === daum.maps.services.Status.OK) {
					var strX; 
			        var strY; 
			        if(!result[0].road_address){
			        	strX = result[0].x;
			        	strY = result[0].y;
			        }else{
			        	strX = result[0].road_address.y;  //위도
			        	strY = result[0].road_address.x;  //경도
			        }
					$('#standardStoreModifyPopStrX').val(strX.substr(0,15));
					$('#standardStoreModifyPopStrY').val(strY.substr(0,15));
			    }
			};
			geocoder.addressSearch(address, callback);
		}    	
    	
/*    	
		var apiKey = "9f7272f1cfcad43fd1f14db4bfaa33b4";
		var address = $('#standardStoreModifyPopAddr1').val();
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
    				
    				$('#standardStoreModifyPopStrX').val(strX);
    				$('#standardStoreModifyPopStrY').val(strY);
    			}
    		});
		}*/
    }
    
    //[Fn]매장 정보 조회
    function fnGetStoreInfo(storeData) {
    	var strCd = storeData.strCd;
    	
    	$.ajax({
    		url:"/ctrl/standard/store/storeInfo",
    		data: {"strCd":strCd},
    		success: function(result){
    			var strData = result.dt_store[0];
    			console.log(strData);
    			$('#standardStoreModifyPopAreaSeq').val(strData.AREA_SEQ)		;
    			$('#standardStoreModifyPopAreaNm').val(strData.AREA_NM)			;
		    	$('#standardStoreModifyPopStrNm').val(strData.STR_NM)			;
		    	$('#standardStoreModifyPopCorpNum').val(strData.CORP_NUM)		;
		    	$('#standardStoreModifyPopMngCd').val(strData.MNG_CD)			;
		    	$('#standardStoreModifyPopCeoNm').val(strData.CEO_NM)			;
		    	$('#standardStoreModifyPopZipCd').val(strData.ZIP_CD)			;
		    	$('#standardStoreModifyPopAddr1').val(strData.ADDR1)			;
		    	$('#standardStoreModifyPopAddr2').val(strData.ADDR2)			;
		    	$('#standardStoreModifyPopAddrExt').val(strData.ADDR_EXT)		;
		    	$('#standardStoreModifyPopStrX').val(strData.STR_LAT)			;
		    	$('#standardStoreModifyPopStrY').val(strData.STR_LNG)			;
		    	$('#standardStoreModifyPopPhoneNum').val(strData.PHONE_NUM)		;
		    	$('#standardStoreModifyPopFaxNum').val(strData.FAX_NUM)			;
		    	$('#standardStoreModifyPopBigo').val(strData.BIGO)				;
		    	oldMngCd = strData.MNG_CD;
		    	
		    	$('#standardStoreModifyPopOpenDt').val(strData.OPEN_DATE)			;
		    	$('#standardStoreModifyPopRenewalDt').val(strData.RENEWAL_DATE)		;
		    	$('#standardStoreModifyPopRelocationDt').val(strData.RELOCATION_DATE);
		    	$('#standardStoreModifyPopAddMngStr').val(strData.OPER_STR_NM)		;
		    	$('#standardStoreModifyPopChargeSv').val(strData.CHARGE_SV)			;
		    	$('#standardStoreModifyPopHerbModel').val(strData.HERBMODEL_NM)		;
		    	$('#standardStoreModifyPopVpnModel').val(strData.VPNMODEL_NM)		;
		    	$('#standardStoreModifyPopApYn').val(strData.AP_YN)					;
		    	$('#standardStoreModifyPopEtcMemo').val(strData.ETC_MEMO)			;
		    	
		    	
    		}
    	});
    }
    
    
    //parsley set
    function fnStoreParsley(){
    	$('#standardStoreModifyPopCompNm').attr('data-parsley-required', "true");
		if($("#standardStoreModifyPopBrndNm option").size() !== 1){
			$('#standardStoreModifyPopBrndNm').attr('data-parsley-required',"true");
		}else{
			$('#standardStoreModifyPopBrndNm').attr('data-parsley-required',"false");
		}
    	$('#standardStoreModifyPopStrNm').attr('data-parsley-required',"true");
    	$('#standardStoreModifyPopAreaNm').attr('data-parsley-required',"true");
    	
    	if($('#standardStoreModifyPop').parsley().validate()){
    		if(confirm("저장 하시겠습니까?")){
    			fnUpdateStore();
    		}
    	}
    }
    
    //[Fn]매장 수정
    function fnUpdateStore() {
    	var modFlag = '';
		var compCd 	= '';
		var brndCd 	= '';
		var strCd 	= '';
    	if(strJson){
    		modFlag = 'UPDATE'
			compCd 		= strJson.compCd;
        	brndCd 		= strJson.brndCd;
    		strCd 		= strJson.strCd;
    	}else{
    		modFlag = 'INSERT'
			compCd 		= $('#standardStoreModifyPopCompNm').val();
        	brndCd 		= $('#standardStoreModifyPopBrndNm').val();
    		strCd 		= $('#standardStoreModifyPopStrNm').val();
    	}
    	

    	var strNm		= $('#standardStoreModifyPopStrNm').val()		;
    	var strType		= $('#standardStoreModifyPopStrType').val()		;
    	var strSt		= $('#standardStoreModifyPopStrSt').val()		;
    	var corpNum		= $('#standardStoreModifyPopCorpNum').val()		;
    	var mngCd		= $('#standardStoreModifyPopMngCd').val()		;
    	
    	var ceoNm		= $('#standardStoreModifyPopCeoNm').val()		;
    	var zipCd		= $('#standardStoreModifyPopZipCd').val()		;
    	var addr1		= $('#standardStoreModifyPopAddr1').val()		;
    	var addr2		= $('#standardStoreModifyPopAddr2').val()		;
    	var addrExt		= $('#standardStoreModifyPopAddrExt').val()		;
    	var strX		= $('#standardStoreModifyPopStrX').val()		;
    	var strY		= $('#standardStoreModifyPopStrY').val()		;
    	var areaSeq		= $('#standardStoreModifyPopAreaSeq').val()		;
    	var phoneNum	= $('#standardStoreModifyPopPhoneNum').val()	;
    	var faxNum		= $('#standardStoreModifyPopFaxNum').val()		;
    	var bigo		= $('#standardStoreModifyPopBigo').val()		;
    	
      	var openDt		  = $('#standardStoreModifyPopOpenDt').val()	;
    	var renewalDt	  = $('#standardStoreModifyPopRenewalDt').val()	;
    	var relocationDt  = $('#standardStoreModifyPopRelocationDt').val()	;
    	var addOperStr	  = $('#standardStoreModifyPopAddMngStr').val()	;
    	var chargeSv	  = $('#standardStoreModifyPopChargeSv').val()	;
    	var vpnModel	  = $('#standardStoreModifyPopVpnModel').val()	;
    	var teleCommnuity = $('#standardStoreModifyPopTeleCommunity').val()	;
    	var apYn		  = $('#standardStoreModifyPopApYn').val()	;
    	var etcMemo		  = $('#standardStoreModifyPopEtcMemo').val()	;
    	
    	var sendData = {
    			"modFlag"	: modFlag	,
    			"compCd"	: compCd	,
    			"brndCd"	: brndCd	,
    			"strCd"		: strCd		,
    			"strNm"		: strNm		,
    			"strType"	: strType	,
    			"strSt"		: strSt		,
    			"corpNum"	: corpNum	,
    			"mngCd"		: mngCd		,
    			"ceoNm"		: ceoNm		,
    			"zipCd"		: zipCd		,
    			"addr1"		: addr1		,
    			"addr2"		: addr2		,
    			"addrExt"	: addrExt	,
    			"strX"		: strX		,
    			"strY"		: strY		,
    			"areaSeq"	: areaSeq	,
    			"phoneNum"	: phoneNum	,
    			"faxNum"	: faxNum	,
    			"bigo"		: bigo		,
    			"openDt"		: openDt	,
    			"renewalDt"		: renewalDt	,
    			"relocationDt"	: relocationDt	,
    			"addOperStr"	: addOperStr	,
    			"chargeSv"		: chargeSv	,
    			"vpnModel"		: vpnModel	,
    			"teleCommnuity"	: teleCommnuity	,
    			"apYn"			: apYn	,
    			"etcMemo"		: etcMemo	,
    	};
   
    	$.ajax({
    		url:"/ctrl/standard/store/updateStore",
    		data: sendData,
    		dataType:"json",
    		cache: false,
    		success: function(result){
    			
    			var stsCd = result.stsCd;
    			if ( stsCd == 100 ) {
    				$('#modalStandardStoreModifyPopup').paragonClosePopup();
        			$standardStoreGrid.paragonGridReload();
	    			alert(result.msgTxt);
    			} else {
    				alert(result.msgTxt);
    			}
    		}
    	});
    }
    
}();

$(document).ready(function() {
	StandardStoreModifyPopApp.init();
});