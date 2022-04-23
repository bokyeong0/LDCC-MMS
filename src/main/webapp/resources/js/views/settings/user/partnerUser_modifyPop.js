/** Copyright (c) 2016 VertexID RND, Inc.
 * 
 * Application Name : 사용자 상세보기 관리[UserInfoModifyApp]
 * Program Code     : PC0028
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Han Seong Jin 	2016. 11. 16.  		First Draft.
 */
var PartnerModifyPopApp = function () {
	"use strict";
	
	/*******************************
	 ****전역 객체 선언부 시작******
	 ******************************/
	var $partnerInfoGrid = $("#partnerInfoGrid");
//	var pwdFlag = false; //비밀번호 수정여부
	var sendData = $('#modalPartnerModifyPop').PopAppGetData().sendData;
	var userInfo = Util.getUserInfo();
	var aspCompCd = userInfo.s_companyCd;
	var userType = userInfo.s_userType;
	
	var OldId = "";
	
	
    return {
        init: function () {
        	
        	//사용자 상세보기 이벤트
        	fnPartnerDetailEvents(sendData);
        	
        	//비밀번호 초기화
        	userPwdInitCheck();
        	
        	//파트너사 목록조회
        	fnGetAspCompNameList(); //파트너사
        	
//        	//파트너사 목록조회
//			fnGetAspCompCdNameList($("#partnerModifyPopUserAspCompCd"), null, sendData.aspCompCd);
			
			//담당부서 목록조회
//			fnGetUserAreaCdList($("#partnerModifyPopUserAreaCd"), sendData.aspCompCd, sendData.areaCd);
			
			//사용자 권한
			fnPartnerUserAuthComboBox();
			
    		//사용자 상세조회
    		fnPartnerInfo();
	    }
    };
  
    //[Fn] 사용자 상세보기 이벤트
    function fnPartnerDetailEvents(sendData){
    	
    	//사용자 수정 저장버튼
    	$("#partnerModifyPopUpdateBtn").click(function(){
    		fnCheckUserId(sendData);
    	});
    	
    	//사용자 삭제버튼
    	$("#partnerModifyPopDeleteBtn").click(function(){
    		if(confirm("삭제하시겠습니까?")){
     			fnDeleteUser();
     		}
    	});
    	
//    	$('select#partnerModifyPopUserAspCompCd').change(function(){
//    		$('select#partnerModifyPopUserAspCompCd option:selected').each(function(){
//	    		var aspCompCd = $(this).val();
//	        	//파트너사 부서 목록조회
//	    		document.getElementById("partnerModifyPopUserAreaCd").options.length=0;
//	    		fnGetUserAreaCdList($("#partnerModifyPopUserAreaCd"), aspCompCd, "");    
//    		});
//    	})
    	
    	//파트너사 선택시 담당부서 조회
    	$("#partnerModifyPopUserAspCompCd").change(function(){
    		aspCompCd = $(this).val();
    		MMSUtil.fnMakeAreaCombo($("#partnerModifyPopUserAreaCd"), '', aspCompCd, '선택', true);
    	});
    	
    }
    
    //파트너사 목록조회
    function fnGetAspCompCdNameList(target, result, select){
    	$.ajax({
    		url : "/ctrl/settings/user/listPartnerAspCompCd",
    		type : "POST",
    		cache: false,
    		success : function(result) {
    			var result = result.dt_grid;
    			Util.MakeSelectOptions(target, result, select);
    		}
    	});
    	
    }
    
    //담당부서 목록조회
    function fnGetUserAreaCdList(target, result, select){
        		$.ajax({
        			url 	: "/ctrl/settings/user/listUserAreaNm",
        			data 	: {"aspCompCd" : result} ,
        			type 	: "POST",
        			cache	: false,
        			success : function(result){
        				var result = result.dt_grid;
        				target.empty().append('<option value="">전체</option>');
            			Util.MakeSelectOptions(target, result, select);
        			}
        		});	

	}
    //parsley validation 세팅
    function fnParsleyRequiredSet(){
    	$('#partnerModifyPopUserId').attr('data-parsley-required', "true");
    	$('#partnerModifyPopUserAspCompCd').attr('data-parsley-required', "true");
    	$('#partnerModifyPopUserNm').attr('data-parsley-required', "true");
    	$('#partnerModifyPopUserEmail').attr('data-parsley-required', "true");
    }
    
    //[Fn] 아이디 중복조회
    function fnCheckUserId(){
    	
    	var userId = $("#partnerModifyPopUserId").val();
    	
    	if ( OldId != userId) {
        	var userIdErrorField = $('#partnerModifyPopUserId').parsley();
        	
        	$.ajax({
        		url : "/ctrl/settings/user/checkUserId",
        		data : {"userId":userId},
        		type : "POST",
        		success: function(data){
        			// parsley.attr reset
        			userIdErrorField.reset();
        			if(data.result === 1){
        				window.ParsleyUI.addError(userIdErrorField, "myCustomError", '같은 아이디가 존재합니다.');
        			}else {
        				fnValidation();
        			}
        		}
        	});    		
    	} else {
			fnValidation();
    	}
    	
    }
    
    //[Fn] 사용자 수정 Validation
    function fnValidation(){
    	
    	fnParsleyRequiredSet();
    	
    	$('#partnerModifyPopUserId').attr({
    		'data-parsley-minlength': "5" ,
    		'data-parsley-maxlength': "20"
    	});
    	$('#partnerModifyPopCompNm').attr({
    		'data-parsley-error-message' : "2자 이상 고객사를 검색해주세요.",
    	});
    	$('#partnerModifyPopUserNm').attr({
    		'data-parsley-error-message' : "2자 이상 한글을 입력해주세요.",
    		'data-parsley-minlength' : "2",
    		'data-parsley-maxlength': "10" ,
    		'data-parsley-pattern' : "^[가-힣]+$"
    	});
    	$('#partnerModifyPopUserEmail').attr({
    		'data-parsley-maxlength': "80" ,
    		'data-parsley-type'		: "email"
    	});
    	if($('#partnerModifyPop').parsley().validate()){
    		if(confirm("저장하시겠습니까?")){
    			fnUpdatePartner(sendData);
    		}
    	}
    	
    }
  
    //[Fn] 사용자 상세정보
    function fnPartnerInfo(modal){
    	var userSeq = '';
    	if(sendData.userSeq){
    		userSeq = sendData.userSeq
    	}
    	$.ajax({
    		type 	: "POST",
    		url 	: "/ctrl/settings/user/userInfoView",
    		data 	: {
    			"userSeq"	:	userSeq
    			},
    		success	: function(result){
    			var result = result.data[0];
    			if(result !== undefined){
        			$('#partnerModifyPopUserId').attr("readonly", true);
        			$("#partnerModifyPopUserId").val(result.USER_ID);
        			OldId = result.USER_ID;
        			$("#partnerModifyPopUserNm").val(result.USER_NM);
        			$("#partnerModifyPopUserPosition").val(result.USER_POSITION);
        			$("select[id='partnerModifyPopUserAuth'] option[value="+result.USER_AUTH+"]").attr('selected', 'selected');
        			$("select[id='partnerModifyPopUserAspCompCd'] option[value="+sendData.ASP_COMP_CD+"]").attr('selected', 'selected');    			
        			aspCompCd = result.aspCompCd;
        			$("select[id='partnerModifyPopUserAreaCd'] option:contains("+sendData.userDept+")").attr("selected", "selected");
        			$("#partnerModifyPopCallExt").val(result.CALL_EXT.replace(/\-/g,''));
        			$("#partnerModifyPopUserEmail").val(result.USER_EMAIL);
        			$("#partnerModifyPopUseYn option:contains('"+result.USE_YN+"')").attr('selected', 'selected');
    			}else{
    				$('#partnerModifyPopUserPwdInitBtn').remove();
        			$('#partnerModifyPopDeleteBtn').remove();
    			}
    		}
    	});
    }
    
    //[Fn] 사용자 수정정보 저장
    function fnUpdatePartner(sendData) {
    	var userId			= $('#partnerModifyPopUserId').val();
    	var userNm		 	= $('#partnerModifyPopUserNm').val();
    	var userAuth		= $('#partnerModifyPopUserAuth option:selected').val();
    	var userPosition 	= $('#partnerModifyPopUserPosition').val();
    	var aspCompCd 	    = $('#partnerModifyPopUserAspCompCd option:selected').val();
    	var areaCd		 	= $('#partnerModifyPopUserAreaCd option:selected').val();
    	var callExt	 		= $('#partnerModifyPopCallExt').val();
    	var userEmail	 	= $('#partnerModifyPopUserEmail').val();
    	var useYn			= $('#partnerModifyPopUseYn').val();
    	
    	callExt = numFomatter(callExt);    	
    	
    	var modFlag = '';
    	var authFlag = '';
    	var userSeq = '';
    	
    	if(sendData){
    		modFlag = 'UPDATE'
			userSeq = sendData.userSeq	
    	}else{
    		modFlag = 'INSERT'
    	}
    	if(!sendData){
    		if(userAuth == ''){
    		}else{
        		authFlag = 'INSERT'
    		}
    	}else{
    		if(sendData.userAuth != userAuth){
        		authFlag = 'UPDATE'
        		if(sendData.userAuth == ''){
            		authFlag = 'INSERT'
        		}
    			if(userAuth == ''){
    	    		authFlag = 'DELETE'
    			}
			}
    	} 
    	
    	var lastLoginDtYn = '';
    	//휴면 아이디 정상화 로직
    	if(sendData.useYn == '휴면' && useYn == 'Y'){
    		lastLoginDtYn = 1;

    	}
    	
    	sendData = {
    			"modFlag"			: modFlag,
    			"userSeq"	   		: userSeq,
    			"userId"	  	 	: userId,
    			"userNm"	   	 	: userNm,
    			"userAuth"			: userAuth,
    			"authFlag"			: authFlag,   
    			"userPosition" 	 	: userPosition,
    			"aspCompCd" 	 	: aspCompCd,    			
    			"areaCd" 	 		: areaCd,
    			"callExt"	    	: callExt,
    			"userEmail"	  	 	: userEmail,
    			"useYn"				: useYn,
    			"lastLoginDtYn"		: lastLoginDtYn
    	};
    	
    	$.ajax({
    		type:"POST",
    		data: sendData,
    		dataType:"json",
    		url:"/ctrl/settings/user/updatePartnerUser",
    		success: function(result){
    			var stsCd = result.stsCd;
    			if ( stsCd == 100 ) {
    				$("#modalPartnerModifyPop").paragonClosePopup();
        			$partnerInfoGrid.paragonGridReload();
        			
	    			alert(result.msgTxt);
    			} else {
    				alert(result.msgTxt);
    			}
    		}
    	});
    }
    
    //[Fn] 사용자 삭제
    function fnDeleteUser() {
    	var userSeq = sendData.userSeq;
    	
	    $.ajax({
	    	type:"POST",
	    	data: {"userSeq": userSeq},
	   		dataType:"json",
	   		url:"/ctrl/settings/user/deleteUser",
	   		success: function(result){
	   			
	   			var stsCd = result.stsCd;
    			if ( stsCd == 100 ) {
    				$("#modalPartnerModifyPop").paragonClosePopup();
    	   			$partnerInfoGrid.paragonGridReload();
	    			alert(result.msgTxt);
    			} else {
    				alert(result.msgTxt);
    			}
    			
	   		}
	   	});
    }
	    
    //휴대폰번호, 사무실전화번호 Fomatter
    function numFomatter(num){
	    var formatNum = '';
	    
	    if(num.length == 11){
	    	formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
	    }else if(num.length == 10){
	    	formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
	    }else if(num.length == 9){
	    	formatNum = num.replace(/(\d{2})(\d{3})(\d{4})/, '$1-$2-$3');
	    }else {
	    	formatNum = num.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
	    }
	    
	    return formatNum;
	}
    
    // 비밀번호 초기화 버튼 클릭시 확인
    function userPwdInitCheck(){
    	$('#partnerModifyPopUserPwdInitBtn').click(function(){
    		if(confirm('비밀번호를 초기화하시겠습니까?')){
				$.ajax({
			    	type:"POST",
			    	data: {
			    		"userSeq"	: sendData.userSeq
			    		},
			   		dataType:"json",
			   		url:"/ctrl/settings/user/updateUserTempPwd",
			   		success: function(result){
			   			var cnt = result.cnt;
		    			if (cnt == 1) {
		    	   			alert(result.userName+'님의 임시비밀번호가 '+result.userEmail+'로 발송되었습니다.');
		    				$("#modalCustomerModifyPop").paragonClosePopup();
		    	   			$customerInfoGrid.paragonGridReload();
		    			}
			   		}
				});
    		};
    	});
	}  
    
    function fnPartnerUserAuthComboBox(){
    	$.ajax({
    		url : "/ctrl/settings/user/partnerUserAuthCombo",
    		type : "POST",
    		cache: false,
    		async:false,
    		success : function(result) {
    			$("#partnerModifyPopUserAuth").empty().append('<option value="">권한없음</option>');
    			Util.MakeSelectOptions($("#partnerModifyPopUserAuth"), result , '');
    			if(sendData != '' && sendData.userInfoId == sendData.userId){
    				$("#partnerModifyPopUserAuth").attr('disabled', true);
    			}
			}
    	});
    }
   
    //파트너사 목록 조회
    function fnGetAspCompNameList(){
    	$("#partnerModifyPopUserAspCompCd").combobox();
    	$("#partnerModifyPopUserAreaCd").combobox();

    	if(sendData == ''){
    		MMSUtil.fnMaMakePartnerCombo($("#partnerModifyPopUserAspCompCd"), aspCompCd);

        	if(userType == 2){//등록
        		//등록시 파트너사는 부서만 변경등록할수있다.
            	$('#partnerModifyPopUserAspCompCd_input, #partnerModifyPopUserAspCompCd_input + span').attr('disabled', true);
        	}
    		
    	}else{
    		MMSUtil.fnMaMakePartnerCombo($("#partnerModifyPopUserAspCompCd"), sendData.aspCompCd);
    		//수정시 모든 사용자는 파트너사 및 부서를 변경할수없다.
        	$('#partnerModifyPopUserAspCompCd_input, #partnerModifyPopUserAspCompCd_input + span').attr('disabled', true);
    	}

    	MMSUtil.fnMakeAreaCombo($("#partnerModifyPopUserAreaCd"), sendData.areaCd, aspCompCd, '선택', true);
    }
    
    
}();

$(document).ready(function() {
	PartnerModifyPopApp.init();
});
