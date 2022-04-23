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

var UserInfoSavePopApp = function () {
	"use strict";
	
	
	/*******************************
	 ****전역 객체 선언부 시작******
	 ******************************/
	// [El]사용자 그리드
	var $userInfoGrid = $("#userInfoGrid");
	
    return {
        init: function () {
        	// 사용자 등록 이벤트
        	fnUserSaveEvents();
        	
        	//직책 콤보박스
        	fnListCommCodeJson($("#userInfoSaveUserPosition"), "SC0016");
        	
        	//권역 목록 조회
//        	fnGetAspNameList();
        	
        	//권역 목록 조회
        	fnGetAreaNameList();
	    }
    };
    
    //[Fn] 사용자 등록 이벤트
    function fnUserSaveEvents(){
    	
    	//사용자 등록 버튼
    	$("#userInfoSaveInsertBtn").click(function(){
    		fnCheckUserNo();
    	});
    	$('#userInfoSaveUserJoinDate').datepicker({
    		todayHighlight: true,
            autoclose: true,
    	});
    	
    	$('#userInfoSaveUserJoinDate').datepicker('setDate', 'today');
    	
    }
    
    //회사코드 selectBox
    function fnListCommCodeJson(target, groupCd){
    	$.ajax({
    		url : "/ctrl/settings/system/code/listCodeGroupComboJson",
    		data :{codeGroupCd:groupCd},
    		type : "POST",
    		dataType : "json",
    		cache: false,
    		success : function(result) {
    			Util.MakeSelectOptions(target,result);
    		}
    	});
    }
    
    //회사 목록 조회
    function fnGetAspNameList(){
    	$.ajax({
    		url : "/ctrl/asp/company/listAspCompanyComboJson",
    		type : "POST",
    		cache: false,
    		success : function(result) {
    			$('#userInfoSaveAspCompCd').html('<option value="">회사 선택</option>');
    			Util.MakeSelectOptions($('#userInfoSaveAspCompCd'), result);
    		}
    	});
    }
    
    //권역 목록 조회
    function fnGetAreaNameList(){
    	$.ajax({
    		url : "/ctrl/standard/area/listStndAreaName",
    		type : "POST",
    		cache: false,
    		success : function(result) {
    			var result = result.dt_grid;
    			$('#userInfoSaveUserAreaNm').html('<option value="">권역 선택</option>');
    			Util.MakeSelectOptions($('#userInfoSaveUserAreaNm'), result);
    		}
    	});
    }
    
    
    //parsley validation 세팅
    function fnParsleyRequiredSet(){
    	$('#userInfoSaveUserNo').attr('data-parsley-required', "true");
    	$('#userInfoSaveUserId').attr('data-parsley-required', "true");
    	$('#userInfoSaveUserPwd').attr('data-parsley-required', "true");
    	$('#userInfoSaveUserPwdVisible').attr('data-parsley-required', "true");
    	$('#userInfoSaveUserNm').attr('data-parsley-required', "true");
    	$('#userInfoSaveUserPosition').attr('data-parsley-required', "true");
    }
    
    //[Fn] 사번 중복조회
    function fnCheckUserNo(){
    	var userNo = $("#userInfoSaveUserNo").val();
    	var userId = $("#userInfoSaveUserId").val();
    	var userNoErrorField = $('#userInfoSaveUserNo').parsley();
    	var userIdErrorField = $('#userInfoSaveUserId').parsley();
    	$.ajax({
    		url : "/ctrl/settings/user/checkUserNo",
    		data : {"userNo":userNo, "userId":userId},
    		type : "POST",
    		success: function(data){
    			// parsley.attr reset
    			userNoErrorField.reset();
    			userIdErrorField.reset();
    			if(data.result === 1){
//    				window.ParsleyUI.removeError(userNoErrorField, "myCustomError"); 
    				window.ParsleyUI.addError(userNoErrorField, "myCustomError", '사번이 중복입니다.');
    			}else if(data.result === 2){
    				window.ParsleyUI.addError(userIdErrorField, "myCustomError", '같은 아이디가 존재합니다.');
    			}else if(data.result === 3){
    				window.ParsleyUI.addError(userIdErrorField, "myCustomError", '같은 아이디가 존재합니다.');
    				window.ParsleyUI.addError(userNoErrorField, "myCustomError", '사번이 중복입니다.');
    			}
    			else{
    				fnValidation();
    			}
    		}
    	});
    }
    
    
    //회원가입 parsley validation 체크
    function fnValidation(){
    	
    	fnParsleyRequiredSet();
    	
    	$('#userInfoSaveUserNo').attr({
    		'data-parsley-minlength': "9" ,
    		'data-parsley-maxlength': "9" ,
    		'data-parsley-type'		: "digits"
    	});
    	$('#userInfoSaveUserId').attr({
    		'data-parsley-minlength': "5" ,
    		'data-parsley-maxlength': "20"
    	});
    	$('#userInfoSaveUserPwd').attr({
    		'data-parsley-error-message' : "숫자,영문,특수문자를 포함만 8~16자리를 입력해 주세요.",
    		'data-parsley-range': "[8, 16]" ,
    		'data-parsley-pattern' : "^.*(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&+=]).*$"
    	});
    	$('#userInfoSaveUserPwdVisible').attr({
    		'data-parsley-equalto' : "#userInfoSaveUserPwd"
    	});
    	$('#userInfoSaveUserNm').attr({
    		'data-parsley-error-message' : "2자 이상 한글을 입력해주세요.",
    		'data-parsley-minlength' : "2",
    		'data-parsley-maxlength': "10" ,
    		'data-parsley-pattern' : "^[가-힣]+$"
    	});
    	$('#userInfoSaveUserBirthDate').attr({
    		'data-parsley-minlength': "8" ,
    		'data-parsley-maxlength': "8" ,
    		'data-parsley-type'	: "digits"
    	});
    	$('#userInfoSaveUserPhone').attr({
    		'data-parsley-minlength': "10" ,
    		'data-parsley-maxlength': "11" ,
    		'data-parsley-type' : "digits" 
    	});
    	$('#userInfoSaveUserEmail').attr({
    		'data-parsley-maxlength': "80" ,
    		'data-parsley-type'		: "email"
    	});
    	if($('#userSavePop').parsley().validate()){
    		if(confirm("저장하시겠습니까?")){
    			fnSaveUser();
    		}
    	}
    	
    }
    
    //[Fn]사용자 등록
    function fnSaveUser() {
//    	var aspCompCd	  = $('#userInfoSaveAspCompCd option:selected').val()	;
    	var userNo 		  = $('#userInfoSaveUserNo').val()						;
    	var userId 		  = $('#userInfoSaveUserId').val()						;
    	var userPwd 	  = $('#userInfoSaveUserPwd').val()						;
    	var userName 	  = $('#userInfoSaveUserNm').val()						;
    	var userPosition  = $('#userInfoSaveUserPosition option:selected').val();
    	var userJoinDate  = $('#userInfoSaveUserJoinDate').val()				;
    	var areaSeq		  = $('#userInfoSaveUserAreaNm option:selected').val()	;
    	var userBirthDate = $('#userInfoSaveUserBirthDate').val()				;
    	var userPhone 	  = $('#userInfoSaveUserPhone').val()					;
    	var userEmail 	  = $('#userInfoSaveUserEmail').val()					;
    	var callExt 	  = $('#userInfoSaveCallExt').val()						;
    	
    	userPhone = numFomatter(userPhone);
    	userBirthDate = numFomatter(userBirthDate);
    	
    	var sendData = {
    			
//    			"aspCompCd"	   	 : aspCompCd	, 
    			"userNo"	  	 : userNo		,
    			"userId"	  	 : userId		,
    			"userPwd"	   	 : userPwd		,
    			"userNm"	   	 : userName		,
    			"userPosition" 	 : userPosition	,
    			"userJoinDate" 	 : userJoinDate	,
    			"areaSeq" 		 : areaSeq		,
    			"userBirthDate"	 : userBirthDate,
    			"userPhone"	  	 : userPhone	,
    			"userEmail"	  	 : userEmail	,
    			"callExt"	  	 : callExt		,
    	};

    	$.ajax({
    		url:"/ctrl/settings/user/saveUser",
    		data: sendData,
    		success: function(result){

    			var stsCd = result.stsCd;
    			if ( stsCd == 100 ) {
    				$("#modalUserSavePop").paragonClosePopup();
        			$userInfoGrid.paragonGridReload();
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
	UserInfoSavePopApp.init();
});
