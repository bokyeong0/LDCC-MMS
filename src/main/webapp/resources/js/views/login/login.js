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
var LoginApp = function () {
	"use strict";
	
	/*******************************
	 ****전역 객체 선언부 시작******
	 ******************************/
	
	// 메인화면 로그인, 팝업로그인 체크
//	var flag = 0;
	var cookieId = getCookie("cookieId");
	var imgIdx = 0;
	var imgUrl = [
			 "/img/main/callcenter/01.jpg"
			,"/img/main/callcenter/02.jpg"
			,"/img/main/callcenter/03.jpg"
			,"/img/main/callcenter/04.jpg"
			,"/img/main/city/01.jpg"
			,"/img/main/city/02.jpg"
			,"/img/main/city/03.jpg"
			,"/img/main/city/04.jpg"
			,"/img/main/nature/01.jpg"
			,"/img/main/nature/02.jpg"
			,"/img/main/nature/03.jpg"
			,"/img/main/nature/04.jpg"
			,"/img/main/nature/05.jpg"
			,"/img/main/nature/06.jpg"
			,"/img/main/road/01.jpg"
			,"/img/main/road/02.jpg"
			,"/img/main/road/03.jpg"
			,"/img/main/technology/01.jpg"
			,"/img/main/technology/02.jpg"
			,"/img/main/technology/03.jpg"
			,"/img/main/technology/04.jpg"
			,"/img/main/technology/05.jpg"
			,"/img/main/technology/06.jpg"
	];

    return {
        init: function () {
        	//캡차 이미지 받아옴
        	fnCaptchaRefresh();
        	
        	//로그인 이벤트
        	fnLoginEvents();
        	
        	//쿠키 값 있는지 체크
        	keepIdCheck();
//        	setInterval(function(){ 
//            	handleLoginPageChangeBackground(); 
//            }, 5000);
	    }
    };
    
//    function handleLoginPageChangeBackground () {
//        var targetImage = '[data-id="login-cover-image"]';
//        var targetImageSrc = imgUrl[imgIdx];
//        var targetImageHtml = '<img src="'+ targetImageSrc +'" data-id="login-cover-image" />';
//        
//        $('.login-cover-image').prepend(targetImageHtml);
//        $(targetImage).not('[src="'+ targetImageSrc +'"]').fadeOut('slow', function() {
//            $(this).remove();
//        });
//        imgIdx++;
//        if(imgIdx > imgUrl.length ){
//        	imgIdx = 0;
//        }
//    };
    //
    function fnLoginEvents(){
    	//로그인 ID 엔터키 이벤드
    	$("#loginUserId").keydown(function(key) {
    		if (key.keyCode == 13) {
    			$("#loginUserPwd").focus();
    		}
    	});
    	
    	//로그인 PWD 엔터키 이벤드
    	$("#loginUserPwd").keydown(function(key) {
    		if (key.keyCode == 13) {
    			$("#captcha").focus();
    		}
    	});

    	//캡차 엔터키 이벤드
    	$("#captcha").keydown(function(key) {
    		if (key.keyCode == 13) {
    			fnAjaxIdCheck();
    		}
    	});

    	//새로고침 버튼
    	$("#refreshBtn").click(function(){
    		fnCaptchaRefresh();
    	});
    	
    	//로그인 버튼
    	$("#loginBtn").click(function(){
    		fnAjaxIdCheck();
    	});
    	
    	//로그인 버튼
    	$("#popupLoginBtn").click(function(){
    		console.log("#popupLoginBtn");
    		var flag = 1;
    		fnAjaxIdCheck(flag);
    	});
    	
    	//keepId 체크박스 클릭
//    	$('input[type=checkbox]').click(function(){
//    		if($("input:checkbox[id='keepId']").is(":checked") == false){
//    			setCookie("cookieId", $("#loginUserId").val(), 30);
//    		}else{
//    			deleteCookie("cookieId");
//    		}
//    	});
    	
    }
    
    function fnCaptchaRefresh(){
    	$("#captchaImg").attr("src", "/ctrl/comm/captcha?id=" + Math.random());
    	$("#captcha").val("");
    }
    
    //쿠키 저장
	function setCookie(cookieName, value, exdays) {
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + exdays);
		var cookieValue = escape(value)
				+ ((exdays == null) ? "" : "; expires=" + exdate.toGMTString());
		document.cookie = cookieName + "=" + cookieValue;
	}
	
	//쿠키 삭제
	function deleteCookie(cookieName) {
		var expireDate = new Date();
		expireDate.setDate(expireDate.getDate() - 1);
		document.cookie = cookieName + "= " + "; expires="
				+ expireDate.toGMTString();
	}
	
	
	//쿠키 값
	function getCookie(cookieName) {
		cookieName = cookieName + '=';
		var cookieData = document.cookie;
		var start = cookieData.indexOf(cookieName);
		var cookieValue = '';
		if (start != -1) {
			start += cookieName.length;
			var end = cookieData.indexOf(';', start);
			if (end == -1)
				end = cookieData.length;
			cookieValue = cookieData.substring(start, end);
		}
		return unescape(cookieValue);
	}
    
    //[Fn] 쿠키 값 체크
    function keepIdCheck(){
    	var cookieId = getCookie("cookieId");
    		if (cookieId) {
    	    	$.ajax({
    	    		url : "/ctrl/sign/decryptId",
    	    		type : "POST",
    	    		data : {encryptId:cookieId},
    	    		dataType : "json",
    	    		success : function(data){
    	    			$("#keepId").attr("checked", true);
    	    			$("#loginUserId").val(data);
    	    		}
    	    	});
    		}
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
    
    //[Fn] ID PWD Validation 및 서버키 생성후 가져옴
    function fnAjaxIdCheck(flag){
    	if($("#loginUserId").val() == ""){
    		alert("아이디를 입력해주세요");
    		$("#loginUserId").focus();
    		return;
    	}else if($("#loginUserPwd").val() == ""){
    		alert("비밀번호를 입력해주세요");
    		$("#loginUserPwd").focus();
    		return;
    	}else if($("#captcha").val() == ""){
    		alert("보안문자를 입력해주세요");
    		$("#captcha").focus();
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
    			
    			fnLoginCheck(publicKeyM, publicKeyE, flag);
    		}
    	});
    	
    }
    
    //[Fn] ID, PWD, 암호키 암호화 후 로그인
    function fnLoginCheck(publicKeyM, publicKeyE, flag){
    	var userId = $("#loginUserId").val();
    	var userPwd = $("#loginUserPwd").val();
    	var captcha = $("#captcha").val();
    	
    	var key = fnGenerateKey();
    	
    	var eId = EncryptTEA(key, userId);				//아이디 암호화
    	var ePwd = EncryptTEA(key, userPwd);			//비밀번호 암호화
    	
    	var eKey = EncryptRSA(publicKeyM, publicKeyE, key); //암호키를 서버키로 2중 암호화
    	
    	var sendData = {
    			"userId"  : eId,
    			"userPwd" : ePwd,
    			"captcha" : captcha,
    			"eKey"	  : eKey,
    			"flag"	  : flag
    	};
    	
    	
    	$.ajax({
    		url : "/ctrl/sign/login",
    	    data : sendData,
    		type : "POST",
    		dataType : "json",
    	    success : function(data) {
    	    	App.prcsEnd();
    	    	
    	    	var sysCd = data.sysCd;
    	    	var stsCd = data.stsCd;
    	    	var msgTxt = data.msgTxt;
    	    	
    	    	console.info(data);
    	    	
    	    	if(stsCd == 102){
    	    		if($("input:checkbox[id='keepId']").is(":checked") == true){
    	    			setCookie("cookieId", data.encryptId, 30);
    	    		}else{
    	    			deleteCookie("cookieId");
    	    		}
    	    	}
//    	    	100 // 응답 성공
//    	    	101 // 응답 성공 msg
//    	    	102 // 응답 성공 url
//    	    	103 // 응답 성공 msg+url
//    	    	500 // 시스템 에러
//    	    	501 // 시스템 에러 msg
//    	    	502 // 시스템 에러 url
	    		switch (stsCd){
	    		
	    			case 100 : $("#loginPopup").paragonClosePopup();$("#leftMenu").resetLeftMenu(); break;
	    			case 101 : alert(msgTxt); break;
    	    		case 102 : if(msgTxt != undefined) { 
    	    						alert(msgTxt);
    	    				   } 
    	    				   location.href="/";
    	    				   break;
    	    		case 103 : fnCaptchaRefresh(); $("#loginUserPwd").val(""); alert(msgTxt); break;
    	    		case 104 : alert(msgTxt);
			    	    		PopApp.paragonOpenPopup({
			    	        		ajaxUrl: '/ctrl/sign/newPassword',
			    	        		id: 'modalNewPasswordPopup',
			    	        		width: '350px',
			    	        		btnName:"저장",
			    	        		title:"비밀번호변경",
			    	        		beforeSend : function(xhr){
			    	    				//var proCd = $(".main-tab.active > a").data("proCd");
			    		    			xhr.setRequestHeader("AjaxType", "paragon");
			    		    			xhr.setRequestHeader("proCd", "PC9999");
			    		        	},
			    	        		onload:function(modal){
			    	        			modal.show();
			    	        		}
			    	        	});
    	    				   break;
	    		}
	    		
    	    },
    	});
    }
    
}();

$(document).ready(function() {
	App.init();
	LoginApp.init();
});