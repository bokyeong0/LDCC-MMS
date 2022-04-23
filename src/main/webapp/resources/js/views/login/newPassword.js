/** Copyright (c) 2016 VertexID RND, Inc.
 * 
 * Application Name : 사용자 관리 [LoginApp]
 * Program Code     : PC0028
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Han Seong Jin 	2016. 10. 20.  		First Draft.
 */
var NewPasswordApp = function () {
	"use strict";
	
	/*******************************
	 ****전역 객체 선언부 시작******
	 ******************************/
	var $modalNewPasswordPopup = $('#modalNewPasswordPopup');
	
    return {
        init: function () {
        	// 사용자 등록 이벤트
        	fnPwdSaveEvents();
        	
        	//유효성 검사등록
        	fnAddValidation();
	    }
    };
    
    function fnPwdSaveEvents(){
    	//변경 버튼
    	$("#loginSaveNewPasswordBtn").click(function(){
    		console.log("#loginSaveNewPasswordBtn");
    		fnAjaxPwdCheck();
    	});
    }
    
    //회원정보수정 parsley validation 체크
    function fnAddValidation(){
    	//새비밀번호
    	$('#loginNewPassword').attr({
    		'data-parsley-required':"true",
			'data-parsley-error-message' : "숫자,영문,특수문자를 포함만 8~16자리를 입력해 주세요.",
			'data-parsley-range': "[8, 16]" ,
			'data-parsley-pattern' : "^.*(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&+=]).*$"
    	});
    	//비밀번호 확인
    	$('#loginConfirmPassword').attr({
    		'data-parsley-required':"true",
			'data-parsley-equalto' : "#loginNewPassword"
    	});
    }
    
    //[Fn] 스크립트 암호키 생성
    function fnGenerateKey(){
    	var time = new Date().getTime();
    	var random = Math.floor(65536*Math.random());
    	return (time*random).toString();	
    }
    
    //[Fn] TEA키 암호화
    function EncryptTEA(k, text){	
    	return Tea.encrypt(text, k);	
    }
    
    //[Fn] RSA 암호화
    function EncryptRSA(m, e, text){
    	var rsa = new RSAKey();
    	rsa.setPublic(m, e);
    	return rsa.encrypt(text);
    }
    
    //[Fn] PWD Validation 및 서버키 생성후 가져옴
    function fnAjaxPwdCheck(){
    	if(!$('#loginNewPasswordForm').parsley().validate()){
    		return;
    	}
    	
    	if($("#loginNewPassword").val() == ""){
    		alert("새로운 비밀번호를 입력해주세요");
    		$("#loginNewPassword").focus();
    		return;
    	}else if($("#loginConfirmPassword").val() == ""){
    		alert("새로운 비밀번호를 환인해주세요");
    		$("#loginConfirmPassword").focus();
    		return;
    	}

    	App.prcsStart();
    	
    	$.ajax({
    		url : "/ctrl/sign/getKey",
    		type : "POST",
    		dataType : "json",
    		success : function(data){
    			var publicKeyM = data.publicKeyM;
    			var publicKeyE = data.publicKeyE;
    			
    			fnSavePassword(publicKeyM, publicKeyE);
    		}
    	});
    	
    }
    
    //[Fn] ID, PWD, 암호키 암호화 후 로그인
    function fnSavePassword(publicKeyM, publicKeyE){
    	var newPwd = $("#loginNewPassword").val();
    	
    	var key = fnGenerateKey();
    	var eNewPwd = EncryptTEA(key, newPwd);			//비밀번호 암호화
    	var eKey = EncryptRSA(publicKeyM, publicKeyE, key); //암호키를 서버키로 2중 암호화
    	
    	var sendData = {
    			"userNewPwd"  : eNewPwd,
    			"eKey" : eKey
    	};
    	
    	
    	$.ajax({
    		url : "/ctrl/sign/savePassword",
    	    data : sendData,
    		type : "POST",
    		dataType : "json",
    	    success : function(data) {
    	    	App.prcsEnd();
    	    	
    	    	var sysCd = data.sysCd;
    	    	var stsCd = data.stsCd;
    	    	var msgTxt = data.msgTxt;
    	    	
    	    	if(msgTxt != undefined) { 
    	    		alert(msgTxt);
				}
    	    	
//    	    	200 // 저장 실패, 유효성체크 오류등으로 비밀번호만 다시
    	    	if(stsCd != 100) {
    	    		$("#loginNewPassword").val();
    	    		$("#loginConfirmPassword").val();
    	    	}
    	    	else {
    	    		$modalNewPasswordPopup.paragonClosePopup();
	    			location.href="/";
    	    	}
    	    },
    	});
    }
}();

$(document).ready(function() {
	NewPasswordApp.init();
});