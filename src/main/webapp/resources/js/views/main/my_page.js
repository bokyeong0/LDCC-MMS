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

var MypagePopApp = function () {
	"use strict";
	
	
	/*******************************
	 ****전역 객체 선언부 시작******
	 ******************************/
	// [El]사용자 그리드
	var $mainMyPageLoginInfoGrid 	= $("#mainMyPageLoginInfoGrid");
	var $mainMyPagePopup 	= $("#mainMyPagePopup");
	var $userInfoTab 		= $("#mainBasicUserInfo");
	var $userPwdTab			= $("#mainPassword");
	var $userLoginInfoTab 	= $("#mainLoginInfo");
	
	// [Data]그룹코드 유형 콤보박스 데이터
	var gridMobileTypeOptions;
	
    return {
        init: function () {
        	// 사용자 등록 이벤트
        	fnUserSaveEvents();
        	
        	//내정보 가져오기
        	fnGetMyInfo();
        	
        	//유효성 검사등록
        	fnAddValidation();
        	
        	//수정모드 안보이게
        	$mainMyPagePopup.find(".save-mod").hide();
	    }
    };
    
    //[Fn] 사용자 등록 이벤트
    function fnUserSaveEvents(){
    	
    	//기본정보 수정모드 취소
    	$("#mainBasicChangeCancelBtn").click(function(){
    		$userInfoTab.find(".save-mod").hide();
    		$userInfoTab.find(".view-mod").show();
    		var currAreaSeq = $("#mainMyInfoSavePopAreaNm").data("prev-data");
    		
        	var userBirthDate = $('#mainMyInfoSavePopUserBirthDay').data("prev-data");
        	var userPhone 	  = $('#mainMyInfoSavePopUserPhone').data("prev-data");
        	var userEmail 	  = $('#mainMyInfoSavePopUserEmail').data("prev-data");
        	var userExt 	  = $('#mainMyInfoSavePopUserExt').data("prev-data");
    		
    		$("#mainMyInfoSavePopAreaNm").val(currAreaSeq);
			$("#mainMyInfoSavePopUserBirthDay").val(userBirthDate);
			$("#mainMyInfoSavePopUserPhone").val(userPhone);
			$("#mainMyInfoSavePopUserEmail").val(userEmail);
			$("#mainMyInfoSavePopUserExt").val(userExt);
			$('#mainBasicUserInfoForm').parsley().validate();
    	});
    	//기본정보 수정모드 변경
    	$("#mainBasicMyInfoModBtn").click(function(){
    		$userInfoTab.find(".save-mod").show();
    		$userInfoTab.find(".view-mod").hide();
    	});
    	//기본정보 수정 저장
    	$("#mainBasicMyInfoSaveBtn").click(function(){
    		fnSaveMyInfo();
    	});
    	//비밀번호 수정저장
    	$("#mainBasicMyPwdSaveBtn").click(function(){
    		fnSaveMyPwd();
    	});
    }

    //내정보 보회권역 목록 조회
    function fnGetMyInfo(){
    	$.ajax({
    		type : "POST",
    		url : "/ctrl/settings/user/myInfo",
//    		data : {"userSeq": userSeq},
    		success: function(data){ 
    			$("#mainMyInfoViewPopUserNo").text(data.USER_NO);
    			$("#mainMyInfoViewPopUserId").text(data.USER_ID);
    			$("#mainMyInfoViewPopUserNm").text(data.USER_NM);
    			$("#mainMyInfoViewPopUserPosition").text(data.USER_POSITION);
    			$('#mainMyInfoViewPopUserJoinDate').text(data.CODE_NM);
    			$("#mainMyInfoViewPopUserBirthDay").text(data.USER_BIRTH_DATE);
    			$("#mainMyInfoViewPopUserPhone").text(data.USER_PHONE);
    			$("#mainMyInfoViewPopUserEmail").text(data.USER_EMAIL);
    			$("#mainMyInfoViewPopUserExt").text(data.CALL_EXT);
    			
    			
    			var userBirthDate = "";
    			var userPhone = "";
    			if(data.USER_BIRTH_DATE != undefined) userBirthDate = data.USER_BIRTH_DATE.replace(/\-/g,'');
    			if(data.USER_PHONE != undefined) userPhone = data.USER_PHONE.replace(/\-/g,'');
    			var userEmail = data.USER_EMAIL;
    			var userExt = data.CALL_EXT;
            	
    			$("#mainMyInfoSavePopUserBirthDay").data("prev-data",userBirthDate);
    			$("#mainMyInfoSavePopUserPhone").data("prev-data",userPhone);
    			$("#mainMyInfoSavePopUserEmail").data("prev-data",userEmail);
    			$("#mainMyInfoSavePopUserExt").data("prev-data",userExt);
    			
    			//권역 목록 조회
    			$("#mainMyInfoSavePopUserBirthDay").val(userBirthDate);
    			$("#mainMyInfoSavePopUserPhone").val(userPhone);
    			$("#mainMyInfoSavePopUserEmail").val(userEmail);
    			$("#mainMyInfoSavePopUserExt").val(userExt);
    			
            	
            	//모바일 인증 목록 조회
            	fnMakeMobileGrid();
//    			modal.show();
    		}
    	});
    }
    
    //권역 목록 조회
    function fnMakeMobileKey(){
    	var gridRowData = $mainMyPageGrid.getRowData();
    	if(gridRowData.length >= 5){
    		alert("최대 5개만 등록 하실수 있습니다.");
    		return;
    	}
    	$.ajax({
    		url : "/ctrl/settings/user/makeMobileKey",
    		type : "POST",
    		cache: false,
    		success : function(result) {
    			console.log(result);
    			$mainMyPageGrid.paragonGridAddRow({
    				addData : {'MOBILE_AUTH_KEY':result,"MOBILE_AUTH_YN":result}
    	    	});
    			
    		}
    	});
    }
    
    function fnMakeMobileGrid(){
    	var userId = $("#mainMyInfoViewPopUserId").text();
    	console.log("userId : "+userId);
    	var data = {
    			userId : $("#mainMyInfoViewPopUserId").text()
    	};
    	$mainMyPageLoginInfoGrid.paragonGrid({
			url : '/ctrl/setting/log/getLoginList',
			rowEditable : false,
			height: 180,
			postData: data,
			colNames:[
			     'IP 정보',
			     '로그인 일자',
			     '상태'
			],
			colModel:[
				 {editable:false, name:'CONNECT_IP', hidden:false, align:'center'},
			     {editable:false, name:'LL_DT', hidden:false, align:'center'},
			     {editable:false, name:'FLAG_NM', hidden:false, width:50, align:'center'}
			],
			pager : "#mainMyPageLoginInfoGridNavi",
		});
    }
    
    //[Fn]내정보 수정
    function fnUpdateMobileSend(mobileSeq) {
    	
    	$.ajax({
    		url:"/ctrl/settings/user/updateMobile",
    		data: {"mobileSeq":mobileSeq},
    		success: function(result){
    			
    			if ( result.stsCd == 100 ) {
//    				fnGetMyInfo();
    				alert("변경되었습니다.");
    			} else {
    				alert(result.msgTxt);
    			}
    		}
    	});
    }
    function fnSaveMyInfo() {
    	if(!$('#mainBasicUserInfoForm').parsley().validate()){
    		return;
    	}
    	var userBirthDate = $('#mainMyInfoSavePopUserBirthDay').val()				;
    	var userPhone 	  = $('#mainMyInfoSavePopUserPhone').val()					;
    	var userEmail 	  = $('#mainMyInfoSavePopUserEmail').val()					;
    	var userExt 	  = $('#mainMyInfoSavePopUserExt').val()					;
    	
    	userPhone = numFomatter(userPhone);
    	userBirthDate = numFomatter(userBirthDate);
    	
    	//alert("fnSaveMyInfo");
    	if(!confirm("저장하시겠습니까?")){
    		return;
		}
    	var sendData = {
    			"userBirthDate"	 : userBirthDate,
    			"userPhone"	  	 : userPhone	,
    			"userEmail"	  	 : userEmail	,
    			"callExt"	  	 : userExt	,
    	};

    	$.ajax({
    		url:"/ctrl/settings/user/saveMyInfo",
    		data: sendData,
    		success: function(result){

    			var stsCd = result.stsCd;
    			if ( stsCd == 100 ) {
    				fnGetMyInfo();
    				$userInfoTab.find(".save-mod").hide();
    	    		$userInfoTab.find(".view-mod").show();
	    			alert(result.msgTxt);
    			} else {
    				alert(result.msgTxt);
    			}
    		}
    	});
    }
    //[Fn]내비밀번호 변경
    function fnSaveMyPwd() {
    	if(!$('#mainBasicUserPwdForm').parsley().validate()){
    		return;
    	}
    	
    	var userPwd = $('#mainMyInfoSavePopCurrPwd').val();
    	var userNewPwd 	  = $('#mainMyInfoSavePopNewPwd').val();
    	var userNewPwdCheck = $('#mainMyInfoSavePopNewPwdCheck').val();
    	
    	if(userNewPwd != userNewPwdCheck){
    		alert("비밀번호가 서로 다릅니다.");
    	}
    	
    	if(!confirm("저장하시겠습니까?")){
    		return;
    	}
    	var sendData = {
    			"userPwd"	 : userPwd,
    			"userNewPwd" : userNewPwd	
    	};
    	$.ajax({
    		url:"/ctrl/settings/user/savePassword",
    		data: sendData,
    		success: function(result){
    			
    			var stsCd = result.stsCd;
    			if ( stsCd == 100 ) {
    				$('#mainMyInfoSavePopCurrPwd').val("");
    		    	$('#mainMyInfoSavePopNewPwd').val("");
    		    	$('#mainMyInfoSavePopNewPwdCheck').val("");
    				alert(result.msgTxt);
    			} else {
    				alert(result.msgTxt);
    			}
    		}
    	});
    }
    
    //핸드폰번호, 생년월일 Fomatter
    function numFomatter(num){
	    var formatNum = '';
	    if(num != undefined) {
		    if(num.length == 11){
		    	formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
		    }else if(num.length == 10){
		    	formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
		    }else{
		    	formatNum = num.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
		    }
	    }
	    
	    return formatNum;
	}
    
  //회원정보수정 parsley validation 체크
    function fnAddValidation(){
    	
    	//현제비밀번호
    	$('#mainMyInfoSavePopCurrPwd').attr({
			'data-parsley-required':"true"
    	});
    	//새비밀번호
    	$('#mainMyInfoSavePopNewPwd').attr({
    		'data-parsley-required':"true",
			'data-parsley-error-message' : "숫자,영문,특수문자를 포함만 8~16자리를 입력해 주세요.",
			'data-parsley-range': "[8, 16]" ,
			'data-parsley-pattern' : "^.*(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&+=]).*$"
    	});
    	//비밀번호 확인
    	$('#mainMyInfoSavePopNewPwdCheck').attr({
    		'data-parsley-required':"true",
			'data-parsley-equalto' : "#mainMyInfoSavePopNewPwd"
    	});
    	
    	//생일
    	$('#mainMyInfoSavePopUserBirthDay').attr({
    		'data-parsley-minlength': "8" ,
    		'data-parsley-maxlength': "8" ,
    		'data-parsley-type'	: "digits"
    	});
    	//폰
    	$('#mainMyInfoSavePopUserPhone').attr({
    		'data-parsley-minlength': "10" ,
    		'data-parsley-maxlength': "11" ,
    		'data-parsley-type' : "digits" 
    	});
    	//이메일
    	$('#mainMyInfoSavePopUserEmail').attr({
    		'data-parsley-maxlength': "80" ,
    		'data-parsley-type'		: "email"
    	});
    }
    
}();

$(document).ready(function() {
	MypagePopApp.init();
});
