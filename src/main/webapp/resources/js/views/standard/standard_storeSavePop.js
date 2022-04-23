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

var StandardStoreSavePopApp = function () {
	"use strict";
	
	
	/*******************************
	 ****전역 객체 선언부 시작******
	 ******************************/
	var $standardStoreGrid = $("#standardStoreGrid");
	var compCd = '';
	
    return {
        init: function () {
        	//기업분류 콤보박스
        	fnListBootstrapComboJson($("#standardStoreSavePopCompCate"), "SC0019");

        	//고객사 콤보박스
        	fnGetCompNameList();
        	
        	//매장 유형 콤보박스
        	fnListCommCodeJson($("#standardStoreSavePopStrType"), "SC0021");
        	
        	//매장 상태 콤보박스
        	fnListCommCodeJson($("#standardStoreSavePopStrSt"), "SC0024");
        	
        	//통신사 콤보박스
        	fnListCommCodeJson($("#standardStoreSavePopTeleCommunity"), "AT0004");
        	fnListCommCodeJson($("#standardStoreSavePopApYn"), "AT0005");
        	
        	//Site 등록 이벤트
        	fnStoreSaveEvents();
        	
	    }
    };
    
    //[Fn] Site 등록 이벤트
    function fnStoreSaveEvents(){
    	//Site 등록 버튼
    	$("#standardStoreSavePopSaveBtn").click(function(){
    		fnCheckMagCd();
    	});
    	
    	//위도 경도 조회 api
    	$("#standardStoreSavePopGetStrXYBtn").click(function(){
    		fnGetStrXY();
    	});
    	
    	//주소 검색 버튼
    	$("#standardStoreSavePopZipCdBtn").postcodifyPopUp();
    	
    	$('#standardStoreSavePopAddr2').focusin(function(){
    		if($('#standardStoreSavePopAddr1').val() != ''){
    			fnGetStrXY();
    		}
    		return false;
    	})
    	
    	$('#standardStoreSavePopCompCate').combobox();
    	$('#standardStoreSavePopCompNm').combobox();
    	$('#standardStoreSavePopBrndNm').combobox();
    	
    	//그룹분류 선택시 회사 조회
    	$("#standardStoreSavePopCompCate").change(function(){
    		fnGetCompNameList();
    	});
    	
    	$('#standardStoreSavePopOpenDt').datepicker({
    		todayHighlight: true,
            autoclose: true,
    	});
    	
    	$('#standardStoreSavePopRenewalDt').datepicker({
    		todayHighlight: true,
            autoclose: true,
    	});
    	
    	$('#standardStoreSavePopRelocationDt').datepicker({
    		todayHighlight: true,
            autoclose: true,
    	});
    	
    	$('#standardStoreSavePopAreaBtn').click(function(){
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
	    			console.log(data);
	    			$('#standardStoreSavePopAreaNm').val(data.areaNm);
	    			$('#standardStoreSavePopAreaSeq').val(data.areaSeq);
	    		}
	    	});
    	});
    	
       	//브랜드 조회
    	$("#standardStoreSavePopBrndNm").combobox();
    	//고객사 선택시 브랜드 조회
    	$("#standardStoreSavePopCompNm").change(function(){
        	compCd = $(this).val();
    		MMSUtil.fnMakeBrndCombo($("#standardStoreSavePopBrndNm"), $(this).val(), '', '선택');
    	});
    	
    }
    
    //[FN] 관리코드 중복검사
    function fnCheckMagCd(){
	 	var mngCd		= $('#standardStoreSavePopMngCd').val();
		var aspCdErrorField = $('#standardStoreSavePopMngCd').parsley();
		aspCdErrorField.reset();
		
		if ( mngCd == "" ) {
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
//    		success : function(result){
//    			var compData = result.dt_grid[0];
//
//    			if ( compData ){
//    				newMngCd = "";
//    				$('#standardStoreSavePopMngCd').val("");
//    				alert("동일한 관리코드가 있습니다. 변경해주세요.");
//    			}else{
//    				newMngCd = mngCd;
//    			}
//    		}
    	})
    	
    }

    //selectBox 생성
    function fnGetStrXY(){
		var apiKey = "9f7272f1cfcad43fd1f14db4bfaa33b4";
		var address = $('#standardStoreSavePopAddr1').val();
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
					
					$('#standardStoreSavePopStrX').val(strX);
					$('#standardStoreSavePopStrY').val(strY);
				}
			});
		}
    }
    //selectBox 생성
    function fnListCommCodeJson(target, groupId){
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
    
    //selectBox 생성
    function fnListBootstrapComboJson(target, groupId){
    	$.ajax({
    		url : "/ctrl/settings/system/code/listCodeGroupComboJson",
    		data :{codeGroupCd:groupId},
    		type : "POST",
    		dataType : "json",
    		cache: false,
    		success : function(result) {
    			Util.MakeBootstrapSelectBox(target, result, "그룹분류");
    		}
    	});
    }
    
    //고객사 목록 조회
    function fnGetCompNameList(){
    	$('#standardStoreSavePopCompNm').combobox();
    	MMSUtil.fnMakeCompCombo($('#standardStoreSavePopCompNm'), '', '선택');
    }
    
    //parsley set
    function fnStoreParsley(){
    	$('#standardStoreSavePopCompNm').attr('data-parsley-required', "true");
    	if($("#standardStoreSavePopBrndNm option").size() !== 1){
    		$('#standardStoreSavePopBrndNm').attr('data-parsley-required',"true");
    	}else{
    		$('#standardStoreSavePopBrndNm').attr('data-parsley-required',"false");
    	}
    	$('#standardStoreSavePopStrNm').attr('data-parsley-required',"true");
    	$('#standardStoreSavePopAreaNm').attr('data-parsley-required',"true");
    	
    	if($('#standardStoreSavePop').parsley().validate()){
    		if(confirm("저장 하시겠습니까?")){
    			fnSaveStore();
    		}
    	}
    }
    
    //[Fn]Site 등록
    function fnSaveStore() {
    	   	
    	var compCd		= $('#standardStoreSavePopCompNm').val()	;
    	var brndCd		= $('#standardStoreSavePopBrndNm').val()	;
    	var compCate	= $('#standardStoreSavePopCompCate').val();
    	var strNm		= $('#standardStoreSavePopStrNm').val()	;
    	var strType		= $('#standardStoreSavePopStrType').val()	;
    	var strSt		= $('#standardStoreSavePopStrSt').val()	;
    	var corpNum		= $('#standardStoreSavePopCorpNum').val()	;
    	var mngCd		= $('#standardStoreSavePopMngCd').val()	;
        	
    	var ceoNm		= $('#standardStoreSavePopCeoNm').val()	;
    	var zipCd		= $('#standardStoreSavePopZipCd').val()	;
    	var addr1		= $('#standardStoreSavePopAddr1').val()	;
    	var addr2		= $('#standardStoreSavePopAddr2').val()	;
    	var addrExt		= $('#standardStoreSavePopAddrExt').val()	;
    	var strX		= $('#standardStoreSavePopStrX').val()	;
    	var strY		= $('#standardStoreSavePopStrY').val()	;
    	var areaSeq		= $('#standardStoreSavePopAreaNm').val()	;
    	var phoneNum	= $('#standardStoreSavePopPhoneNum').val();
    	var faxNum		= $('#standardStoreSavePopFaxNum').val()	;
    	var bigo		= $('#standardStoreSavePopBigo').val()	;
    	
    	
    	var openDt		  = $('#standardStoreSavePopOpenDt').val()		;
    	var renewalDt	  = $('#standardStoreSavePopRenewalDt').val()		;
    	var relocationDt  = $('#standardStoreSavePopRelocationDt').val()	;
    	var addOperStr	  = $('#standardStoreSavePopAddMngStr').val()		;
    	var chargeSv	  = $('#standardStoreSavePopChargeSv').val()		;
    	var herbModel	  = $('#standardStoreSavePopHerbModel').val()		;
    	var vpnModel	  = $('#standardStoreSavePopVpnModel').val()		;
    	var teleCommnuity = $('#standardStoreSavePopTeleCommunity').val()	;
    	var apYn		  = $('#standardStoreSavePopApYn').val()			;
    	var etcMemo		  = $('#standardStoreSavePopEtcMemo').val()		;
    	
    	var sendData = {
    			
    			//매장 정보
    			"compCd"	: compCd	,
    			"brndCd"	: brndCd	,
    			"compCate"	: compCate	,
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
    			"bigo"		: bigo	,
    			"openDt"		: openDt	,
    			"renewalDt"		: renewalDt	,
    			"relocationDt"	: relocationDt	,
    			"addOperStr"	: addOperStr	,
    			"chargeSv"		: chargeSv	,
    			"herbModel"		: herbModel	,
    			"vpnModel"		: vpnModel	,
    			"teleCommnuity"	: teleCommnuity	,
    			"apYn"			: apYn	,
    			"etcMemo"		: etcMemo	,
    	};
    	$.ajax({
    		url:"/ctrl/standard/store/saveStore",
    		data: sendData,
    		dataType:"json",
    		cache: false,
    		success: function(result){
    			var stsCd = result.stsCd;
    			if ( stsCd == 100 ) {
        			$("#modalStandardStoreSavePopup").paragonClosePopup();
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
	StandardStoreSavePopApp.init();
});
