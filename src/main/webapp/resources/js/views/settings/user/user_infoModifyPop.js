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
var UserInfoModifyPopApp = function () {
	"use strict";
	
	/*******************************
	 ****전역 객체 선언부 시작******
	 ******************************/
	var $userInfoGrid = UserInfoApp.getGrid();
	var pwdFlag = false; //비밀번호 수정여부
	var userJson = $('#modalUserModifyPop').PopAppGetData().sendData;
	
	var OldId = "";
	var userSeq = "";
	
    return {
        init: function () {
        	//직책 콤보박스
        	fnListCommCodeJson($("#userInfoModifyUserPosition"), "SC0016", userJson.positionCd);
        	
        	//회사 콤보박스
//        	fnGetAspNameList(userJson.aspCompCd);
        	//권역 목록 조회
        	fnGetAreaNameList(userJson.areaSeq);
        	
        	//사용자 상세보기 이벤트
        	fnUserDetailEvents();
        	
	    },
    	fnGetUserInfo: function (modal, callback) {
    		//사용자 상세조회
    		fnUserInfo(modal);
    	}
    };
  
    //[Fn] 사용자 상세보기 이벤트
    function fnUserDetailEvents(){
    	
    	//사용자 수정 저장버튼
    	$("#userInfoModifyUpdateBtn").click(function(){
    		fnCheckUserId();
    	});
    	
    	
    	//사용자 삭제버튼
    	$("#userInfoModifyDeleteBtn").click(function(){
    		if(confirm("삭제하시겠습니까?")){
     			fnDeleteUser();
     		}
    	});
    	
    	$('#userInfoModifyUserJoinDate').datepicker({
    		todayHighlight: true,
            autoclose: true
    	});
    	
    	//사번, 비밀번호  readonly
    	$('#userInfoModifyUserNo').prop('readonly', true);
    	$('#userInfoModifyUserPwd').prop('readonly', true);
    	$('#userInfoModifyUserPwdVisible').prop('readonly', true);
    	
    	//비밀번호 변경 체크박스
    	$('#passwordChange').click(function(){
    		var isChecked = $('#passwordChange').prop("checked");
    		
    		if(isChecked){
    			$('#userInfoModifyUserPwd').prop('readonly', false);
    	    	$('#userInfoModifyUserPwdVisible').prop('readonly', false);
    	    	pwdFlag = true;
    		}else{
    			$('#userInfoModifyUserPwd').prop('readonly', true);
    	    	$('#userInfoModifyUserPwdVisible').prop('readonly', true);
    	    	pwdFlag = false;
    		}
    		
    	});
    }
    
    //회사코드 selectBox
    function fnListCommCodeJson(target, groupCd, select){
    	$.ajax({
    		url : "/ctrl/settings/system/code/listCodeGroupComboJson",
    		data :{codeGroupCd:groupCd},
    		type : "POST",
    		dataType : "json",
    		cache: false,
    		success : function(result) {
    			Util.MakeSelectOptions(target, result, select);
    		}
    	});
    }
    
    //권역 목록 조회
    function fnGetAspNameList(select){
    	$.ajax({
    		url : "/ctrl/asp/company/listAspCompanyComboJson",
    		type : "POST",
    		cache: false,
    		success : function(result) {
    			Util.MakeSelectOptions($('#userInfoModifyAspCompCd'), result, select);
    		}
    	});
    }
    
    //권역 목록 조회
    function fnGetAreaNameList(select){
    	$.ajax({
    		url : "/ctrl/standard/area/listStndAreaName",
    		type : "POST",
    		cache: false,
    		success : function(result) {
//    			console.log(result)
    			var result = result.dt_grid;
    			Util.MakeSelectOptions($('#userInfoModifyUserAreaNm'), result, select);
    		}
    	});
    }
    
    //parsley validation 세팅
    function fnParsleyRequiredSet(){
    	$('#userInfoModifyUserNo').attr('data-parsley-required', "true");
    	if(pwdFlag){
    		$('#userInfoModifyUserPwd').attr('data-parsley-required', "true");
    		$('#userInfoModifyUserPwdVisible').attr('data-parsley-required', "true");
    	}
    	$('#userInfoModifyUserNm').attr('data-parsley-required', "true");
    }
    
    //[Fn] 아이디 중복조회
    function fnCheckUserId(){
    	
    	var userId = $("#userInfoModifyUserId").val();
    	
    	if ( OldId != userId) {
        	var userIdErrorField = $('#userInfoModifyUserId').parsley();
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
    	
    	$('#userInfoModifyUserNo').attr({
    		'data-parsley-error-message' : "사번 9자리를 입력해 주세요.",
    		'data-parsley-minlength': "9" ,
    		'data-parsley-maxlength': "9" ,
    		'data-parsley-type'		: "digits"
    	});
    	if(pwdFlag){
    		$('#userInfoModifyUserPwd').attr({
    			'data-parsley-error-message' : "숫자,영문,특수문자를 포함만 8~16자리를 입력해 주세요.",
    			'data-parsley-range': "[8, 16]" ,
    			'data-parsley-pattern' : "^.*(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&+=]).*$"
    		});
    		$('#userInfoModifyUserPwdVisible').attr({
    			'data-parsley-error-message' : "위의 비밀번호를 똑같이 입력해 주세요",
    			'data-parsley-equalto' : "#userInfoModifyUserPwd"
    		});
    	}
    	$('#userInfoModifyUserNm').attr({
    		'data-parsley-error-message' : "2자 이상 한글을 입력해주세요.",
    		'data-parsley-minlength' : "2",
    		'data-parsley-maxlength': "10" ,
    		'data-parsley-pattern' : "^[가-힣]+$"
    	});
    	$('#userInfoModifyUserBirthDate').attr({
    		'data-parsley-error-message' : "-제외한 생년월일 8자리를 입력해 주세요.",
    		'data-parsley-minlength': "8" ,
    		'data-parsley-maxlength': "8" ,
    		'data-parsley-required' : "false",
    		'data-parsley-type'	: "digits"
    	});
    	$('#userInfoModifyUserPhone').attr({
    		'data-parsley-error-message' : "-제외한 휴대폰 번호를 입력해 주세요.",
    		'data-parsley-minlength': "10" ,
    		'data-parsley-maxlength': "11" ,
    		'data-parsley-required' : "false",
    		'data-parsley-type' : "digits"
    	});
    	$('#userInfoModifyUserEmail').attr({
    		'data-parsley-maxlength': "80" ,
    		'data-parsley-required' : "false",
    		'data-parsley-type'		: "email"
    	});
    	if($('#userInfoModify').parsley().validate()){
    		if(confirm("저장하시겠습니까?")){
    			fnUpdateUser();
    		}
    	}
    	
    }
  
    //[Fn] 사용자 상세정보
    function fnUserInfo(modal){
    	var rowId = $userInfoGrid.jqGrid('getGridParam','selrow');
    	userSeq = $userInfoGrid.jqGrid('getCell', rowId, 'USER_SEQ');
    	
    	$.ajax({
    		type : "POST",
    		url : "/ctrl/settings/user/userInfo",
    		data : {"userSeq": userSeq},
    		success: function(data){
    			var uData = data.data[0];
    			$("#userInfoModifyUserNo").val(uData.USER_NO);
    			$("#userInfoModifyUserId").val(uData.USER_ID);
    			OldId = uData.USER_ID;
    			$("#userInfoModifyUserNm").val(uData.USER_NM);
    			$('#userInfoModifyUserJoinDate').datepicker('setDate', uData.USER_JOIN_DATE);
    			$('input:radio[name="userInfoModifyUseYn"][value="'+uData.USE_YN+'"]').prop('checked', true);
    			$("#userInfoModifyUserBirthDate").val(uData.USER_BIRTH_DATE.replace(/\-/g,''));
    			$("#userInfoModifyUserPhone").val(uData.USER_PHONE.replace(/\-/g,''));
    			$("#userInfoModifyUserEmail").val(uData.USER_EMAIL);
    			$("#userInfoModifyCallExt").val(uData.CALL_EXT);
    			
    			modal.show();
    			 
    		}
    	});
    }
    
    //[Fn] 사용자 수정정보 저장
    function fnUpdateUser() {
//    	var aspCompCd	 	= $('#userInfoModifyAspCompCd option:selected').val()		;
    	var userNo			= $('#userInfoModifyUserNo').val()						  	;
    	var userId			= $('#userInfoModifyUserId').val()						  	;
    	var userNm		 	= $('#userInfoModifyUserNm').val()						  	;
    	var userPosition 	= $('#userInfoModifyUserPosition option:selected').val()	;
    	var userJoinDate	= $('#userInfoModifyUserJoinDate').val()					;
    	var areaSeq			= $('#userInfoModifyUserAreaNm option:selected').val()		;
    	var userBirthDate	= $('#userInfoModifyUserBirthDate').val()					;
    	var userPhone	 	= $('#userInfoModifyUserPhone').val()					 	;
    	var userEmail	 	= $('#userInfoModifyUserEmail').val()					 	;
    	var callExt		 	= $('#userInfoModifyCallExt').val()					 		;
    	var useYn	 		= $('input:radio[name="userInfoModifyUseYn"]:checked').val();
    	
    	userPhone = numFomatter(userPhone);
    	userBirthDate = numFomatter(userBirthDate);
    	
    	var sendData = {
    			"userSeq"      : userSeq		,
    			"userNo"	   : userNo			, 
    			"userId"	   : userId			, 
    			"userNm"	   : userNm			, 
    			"userPosition" : userPosition	,
    			"userJoinDate" : userJoinDate	, 
    			"areaSeq"	   : areaSeq		, 
    			"userBirthDate": userBirthDate	, 
    			"userPhone"	   : userPhone		, 
    			"userEmail"	   : userEmail		,
    			"callExt"	   : callExt		,
    			"useYn"		   : useYn			,
    	};
    	
    	if(pwdFlag){
	    	sendData.userPwd = $('#userInfoModifyUserPwd').val();
		}
    	
    	$.ajax({
    		type:"POST",
    		data: sendData,
    		dataType:"json",
    		url:"/ctrl/settings/user/updateUser",
    		success: function(result){
    		
    			var stsCd = result.stsCd;
    			if ( stsCd == 100 ) {
    				$("#modalUserModifyPop").paragonClosePopup();
        			$userInfoGrid.paragonGridReload();
	    			alert(result.msgTxt);
    			} else {
    				alert(result.msgTxt);
    			}
    			
    		}
    	});
    }
    
    //[Fn] 사용자 삭제
    function fnDeleteUser() {
//    	var userNo = $('#userInfoModifyUserNo').val();
    	
	    $.ajax({
	    	type:"POST",
	   		data: {"userSeq": userSeq},
	   		dataType:"json",
	   		url:"/ctrl/settings/user/deleteUser",
	   		success: function(result){

	   			var stsCd = result.stsCd;
    			if ( stsCd == 100 ) {
    				$("#modalUserModifyPop").paragonClosePopup();
    	   			$userInfoGrid.paragonGridReload();
	    			alert(result.msgTxt);
    			} else {
    				alert(result.msgTxt);
    			}
    			
	   		}
	   	});
    }
    
    //휴대폰번호, 생년월일 Fomatter
    function numFomatter(num){
	    var formatNum = '';
	    
	    if(num.length == 11){
	    	formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
	    }else if(num.length == 10){
	    	formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
	    }else{
	    	formatNum = num.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
	    }
	    
	    return formatNum;
	}
}();

$(document).ready(function() {
	UserInfoModifyPopApp.init();
});
