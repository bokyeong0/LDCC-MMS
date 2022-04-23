/** Copyright (c) 2016 VertexID RND, Inc.
 * 
 * Application Name : 사용자 상세보기 관리[LdccUserInfoModifyApp]
 * Program Code     : PC0028
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Han Seong Jin 	2016. 11. 16.  		First Draft.
 */
var LdccUserInfoModifyPopApp = function () {
	"use strict";
	
	/*******************************
	 ****전역 객체 선언부 시작******
	 ******************************/
	var $ldccUserInfoGrid =	$('#ldccUserInfoGrid');
	var pwdFlag = false; //비밀번호 수정여부
	var sendData = $('#modalLdccUserModifyPop').PopAppGetData().sendData;
	var userInfo = Util.getUserInfo();
	var userType = userInfo.s_userType;

	var OldId = '';
	
    return {
        init: function () {
        	
        	//사용자권한 콤보박스
        	fnLdccUserAuthComboBox();
        	
        	//사용자정보조회
    		fnUserInfo();
        	
        	//사용자 상세보기 이벤트
        	fnUserDetailEvents(sendData);
        	
        	//비밀번호 초기화
        	userPwdInitCheck();
        	
	    }
    };
  
    //[Fn] 사용자 상세보기 이벤트
    function fnUserDetailEvents(sendData){
    	
    	//사용자 수정 저장버튼
    	$("#ldccUserInfoModifyUpdateBtn").click(function(){
    		fnCheckUserId(sendData);
    	});
    	
    	//사용자 삭제버튼
    	$("#ldccUserInfoModifyDeleteBtn").click(function(){
    		if(confirm("삭제하시겠습니까?")){
     			fnDeleteUser();
     		}
    	});
    	
    }
    
    //parsley validation 세팅
    function fnParsleyRequiredSet(){
    	$('#ldccUserInfoModifyUserId').attr('data-parsley-required', "true");
    	$('#ldccUserInfoModifyUserNm').attr('data-parsley-required', "true");
    	$('#ldccUserInfoModifyUserEmail').attr('data-parsley-required', "true");
    }
    
    //[Fn] 아이디 중복조회
    function fnCheckUserId(sendData){
    	
    	var userId = $("#ldccUserInfoModifyUserId").val();
    	
    	if ( OldId != userId) {
        	var userIdErrorField = $('#ldccUserInfoModifyUserId').parsley();
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
        				fnValidation(sendData);
        			}
        		}
        	});    		
    	} else {
			fnValidation(sendData);
    	}
    	
    }
    
    //[Fn] 사용자 수정 Validation
    function fnValidation(sendData){
    	
    	fnParsleyRequiredSet();
    	
    	$('#ldccUserInfoModifyUserId').attr({
    		'data-parsley-minlength': "5" ,
    		'data-parsley-maxlength': "20"
    	});
    	$('#ldccUserInfoModifyUserNm').attr({
    		'data-parsley-error-message' : "2자 이상 한글을 입력해주세요.",
    		'data-parsley-minlength' : "2",
    		'data-parsley-maxlength': "10" ,
    		'data-parsley-pattern' : "^[가-힣]+$"
    	});
    	$('#ldccUserInfoModifyUserEmail').attr({
    		'data-parsley-maxlength': "80" ,
    		'data-parsley-type'		: "email"
    	});
    	if($('#ldccUserInfoModify').parsley().validate()){
    		if(confirm("저장하시겠습니까?")){
    			fnUpdateUser(sendData);
    		}
    	}
    }
  
    //[Fn] 사용자 상세정보
    function fnUserInfo(){
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
//    			console.log(result);
    			if(result !== undefined){
        			$('#ldccUserInfoModifyUserId').attr("readonly", true);
        			$("#ldccUserInfoModifyUserId").val(result.USER_ID);
        			OldId = result.USER_ID;
        			$("#ldccUserInfoModifyUserNm").val(result.USER_NM);
        			$("#ldccUserInfoModifyUserPosition").val(result.USER_POSITION);
        			$("select[id='ldccUserInfoModifyUserAuth'] option[value="+result.USER_AUTH+"]").attr('selected', 'selected');
        			$("#ldccUserInfoModifyUserDept").val(result.USER_DEPT);
        			$("#ldccUserInfoModifyCallExt").val(result.CALL_EXT.replace(/\-/g,''));
        			$("#ldccUserInfoModifyUserEmail").val(result.USER_EMAIL);
        			$("#ldccUserInfoModifyUseYn option:contains('"+result.USE_YN+"')").attr('selected', 'selected');
    			}else{
    				$('#ldccUserInfoModifyPwdInitBtn').remove();
        			$('#ldccUserInfoModifyDeleteBtn').remove();
    			}
    		}
    	});
    }
    
    //[Fn] 사용자 수정정보 저장
    function fnUpdateUser(sendData) {
    	var userId			= $('#ldccUserInfoModifyUserId').val();
    	var userNm		 	= $('#ldccUserInfoModifyUserNm').val();
    	var userAuth		= $('#ldccUserInfoModifyUserAuth option:selected').val();
    	var userPosition 	= $('#ldccUserInfoModifyUserPosition').val();
    	var userDept	  	= $('#ldccUserInfoModifyUserDept').val();
    	var userEmail	 	= $('#ldccUserInfoModifyUserEmail').val();
    	var callExt		 	= $('#ldccUserInfoModifyCallExt').val();
    	var useYn 			= $('#ldccUserInfoModifyUseYn').val();
    	
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

    	var sendData = {
    			"modFlag"	   : modFlag,
    			"userSeq"      : userSeq,
    			"userId"	   : userId	, 
    			"userNm"	   : userNm	, 
    			"userAuth"	   : userAuth,
    			"authFlag"	   : authFlag,    			
    			"userPosition" : userPosition,
    			"userDept" 	   : userDept,    			
    			"userEmail"	   : userEmail,
    			"callExt"	   : callExt,
    			"useYn"		   : useYn,
    			"lastLoginDtYn": lastLoginDtYn
    	};
    	
    	$.ajax({
    		type:"POST",
    		data: sendData,
    		dataType:"json",
    		url:"/ctrl/settings/user/updateLdccUser",
    		success: function(result){
    			var stsCd = result.stsCd;
    			if ( stsCd == 100 ) {
    				$("#modalLdccUserModifyPop").paragonClosePopup();
        			$ldccUserInfoGrid.paragonGridReload();
	    			alert(result.msgTxt);
    			} else {
    				alert(result.msgTxt);
    			}
    		}
    	});
    }
    
    //[Fn] 사용자 삭제
    function fnDeleteUser() {
	    $.ajax({
	    	type:"POST",
	   		data: {"userSeq": sendData.userSeq},
	   		dataType:"json",
	   		url:"/ctrl/settings/user/deleteUser",
	   		success: function(result){

	   			var stsCd = result.stsCd;
    			if ( stsCd == 100 ) {
    				$("#modalLdccUserModifyPop").paragonClosePopup();
    	   			$ldccUserInfoGrid.paragonGridReload();
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
    	$('#ldccUserInfoModifyPwdInitBtn').click(function(){
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
		    				$ldccUserInfoGrid.paragonGridReload();
		    			}
			   		}
				});
    		};
    	});
	}      
    
    function fnLdccUserAuthComboBox(){
    	$.ajax({
    		url : "/ctrl/settings/user/ldccUserAuthCombo",
    		type : "POST",
    		cache: false,
    		async:false,
    		success : function(result) {
    			$("#ldccUserInfoModifyUserAuth").empty().append('<option value="">권한없음</option>');
    			Util.MakeSelectOptions($("#ldccUserInfoModifyUserAuth"), result , '');
    			if(sendData != '' && sendData.userInfoId == sendData.userId){
    				$("#ldccUserInfoModifyUserAuth").attr('disabled', true);
    			}
			}
    	});
    }
    
}();

$(document).ready(function() {
	LdccUserInfoModifyPopApp.init();
});
