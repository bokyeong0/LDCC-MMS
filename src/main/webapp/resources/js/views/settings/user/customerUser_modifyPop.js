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
var CustomerModifyPopApp = function () {
	"use strict";
	
	/*******************************
	 ****전역 객체 선언부 시작******
	 ******************************/
	var $customerInfoGrid = $("#customerInfoGrid");
//	var pwdFlag = false; //비밀번호 수정여부
	var sendData = $('#modalCustomerModifyPop').PopAppGetData().sendData;
	
	var OldId = "";
	var strCd = "";
	var compCd = "";
	
    return {
        init: function () {
        	
        	//사용자 상세보기 이벤트
        	fnCustomerDetailEvents();
        	
        	//비밀번호 초기화
        	userPwdInitCheck();

        	//고객사정보
        	fnCustomerInfo();
        	
        	fnGetCompNameList(); //고객사
	    }
    };
  
    //[Fn] 사용자 상세보기 이벤트
    function fnCustomerDetailEvents(){
    	
    	//사용자 수정 저장버튼
    	$("#customerModifyPopUpdateBtn").click(function(){
    		fnCheckUserId(sendData);
    	});
    	
    	//사용자 삭제버튼
    	$("#customerModifyPopDeleteBtn").click(function(){
    		if(confirm("삭제하시겠습니까?")){
     			fnDeleteUser();
     		}
    	});
    	
      	//브랜드 조회
    	//고객사 선택시 브랜드 조회
    	$("#customerModifyPopCompCd").change(function(){
        	compCd = $(this).val();
    		MMSUtil.fnMakeBrndCombo($("#customerModifyPopBrndCd"), $(this).val(), '', '선택');
    	});
    }
    
    //parsley validation 세팅
    function fnParsleyRequiredSet(){
    	$('#customerModifyPopUserId').attr('data-parsley-required', "true");
    	$('#customerModifyPopCompCd').attr('data-parsley-required', "true");
    	$('#customerModifyPopUserNm').attr('data-parsley-required', "true");
    	$('#customerModifyPopUserEmail').attr('data-parsley-required', "true");
    	
    }
    
    //[Fn] 아이디 중복조회
    function fnCheckUserId(sendData){
    	
    	var userId = $("#customerModifyPopUserId").val();
    	
    	if ( OldId != userId) {
        	var userIdErrorField = $('#customerModifyPopUserId').parsley();
        	
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


    	$('#customerModifyPopCompCd').attr({
    		'data-parsley-error-message' : "고객사를 선택해주세요."
    	});
    	$('#customerModifyPopUserId').attr({
    		'data-parsley-minlength': "5" ,
    		'data-parsley-maxlength': "20"
    	});
    	$('#customerModifyPopUserNm').attr({
    		'data-parsley-error-message' : "2자 이상 10자 이하 한글을 입력해주세요.",
    		'data-parsley-minlength' : "2",
    		'data-parsley-maxlength': "10" ,
    		'data-parsley-pattern' : "^[가-힣]+$"
    	});
    	$('#customerModifyPopUserEmail').attr({
    		'data-parsley-maxlength': "80" ,
    		'data-parsley-type'		: "email"
    	});
    	if($('#customerModifyPop').parsley().validate()){
    		if(confirm("저장하시겠습니까?")){
    			fnUpdateCustomer(sendData);
    		}
    	}else{
        	if($('#customerModifyPopCompCd').val() == ''){
        		alert('고객사를 선택해 주세요');
        		return false;
        	}
    	}
    }
  
    //[Fn] 사용자 상세정보
    function fnCustomerInfo(){
    	var userSeq = '';
    	if(sendData.userSeq){
    		userSeq = sendData.userSeq
    	}
    	var collback = '';
    	$.ajax({
    		type 	: "POST",
    		url 	: "/ctrl/settings/user/userInfoView",
    		data 	: {
    				"userSeq" : userSeq
			},
    		success : function(result){
    			var result = result.data[0];
    			
				if(result !== undefined){
					collback = result;
	    			$("#customerModifyPopUserId").val(result.USER_ID);
	    			OldId = result.USER_ID;
	    			$("#customerModifyPopUserNm").val(result.USER_NM);
	    			$("#customerModifyPopUserPosition").val(result.USER_POSITION);
//	    			$("#customerModifyPopUserPhone").val(result.USER_PHONE.replace(/\-/g,''));
	    			$("#customerModifyPopCallExt").val(result.CALL_EXT.replace(/\-/g,''));
	    			$("#customerModifyPopUserEmail").val(result.USER_EMAIL);
	    			$("#customerModifyPopUseYn option:contains('"+result.USE_YN+"')").attr('selected', 'selected');
					
	    			$('#customerModifyPopUserId').attr("readonly", true);
				}else{
	    			$('#customerModifyPopUserPwdInitBtn').remove();
	    			$('#customerModifyPopDeleteBtn').remove();
				}
    		}
    	});
    }
    
    //[Fn] 사용자 수정정보 저장
    function fnUpdateCustomer(sendData) {
    	var compCd 		    = $('#customerModifyPopCompCd').val();
    	var brndCd 		    = $('#customerModifyPopBrndCd').val();
    	var userId			= $('#customerModifyPopUserId').val();
    	var userNm		 	= $('#customerModifyPopUserNm').val();
    	var userPosition 	= $('#customerModifyPopUserPosition').val();
    	var callExt	 		= $('#customerModifyPopCallExt').val();
    	var userEmail	 	= $('#customerModifyPopUserEmail').val();
    	var useYn			= $('#customerModifyPopUseYn option:selected').val();
    	
    	callExt = numFomatter(callExt);    	
    	
    	var modFlag = '';
    	var userSeq = '';
    	
    	if(sendData){
    		modFlag = 'UPDATE'
			userSeq = sendData.userSeq	
    	}else{
    		modFlag = 'INSERT'
    	}
    	
    	var lastLoginDtYn = '';
    	//휴면 아이디 정상화 로직
    	if(sendData.useYn == '휴면' && useYn == 'Y'){
    		lastLoginDtYn = 1;

    	}
    	
    	console.log(lastLoginDtYn);
    	
    	sendData = {
    			"modFlag"			: modFlag,
    			"userSeq"	   		: userSeq,
    			"compCd"		 	: compCd, 
    			"brndCd"		 	: brndCd,
    			"userId"	  	 	: userId,
    			"userNm"	   	 	: userNm,
    			"userPosition" 	 	: userPosition,
    			"callExt"	    	: callExt,
    			"userEmail"	  	 	: userEmail,
    			"useYn"				: useYn,
    			"lastLoginDtYn"		: lastLoginDtYn
    	};
    	
    	$.ajax({
    		type:"POST",
    		data: sendData,
    		dataType:"json",
    		url:"/ctrl/settings/user/updateCustomerUser",
    		success: function(result){
    			var stsCd = result.stsCd;
    			if ( stsCd == 100 ) {
    				$("#modalCustomerModifyPop").paragonClosePopup();
        			$customerInfoGrid.paragonGridReload();
        			
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
    				$("#modalCustomerModifyPop").paragonClosePopup();
    	   			$customerInfoGrid.paragonGridReload();
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
    	$('#customerModifyPopUserPwdInitBtn').click(function(){
    		if(confirm('비밀번호를 초기화하시겠습니까?')){
				$.ajax({
			    	type	:"POST",
			    	data	: {
				    		"userSeq"	: sendData.userSeq
				    		},
			   		dataType: "json",
			   		url		: "/ctrl/settings/user/updateUserTempPwd",
			   		success	: function(result){
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
    
    //고객사 목록 조회
    function fnGetCompNameList(){
    	$('#customerModifyPopCompCd').combobox();
    	$("#customerModifyPopBrndCd").combobox();
    	
    	if(sendData == ''){
    		MMSUtil.fnMakeCompCombo($('#customerModifyPopCompCd'), '', '선택');
    		
    	}else{
    		MMSUtil.fnMakeCompCombo($('#customerModifyPopCompCd'), sendData.compCd, '선택');
    	}
    	
    	
    	MMSUtil.fnMakeBrndCombo($("#customerModifyPopBrndCd"), sendData.compCd, sendData.brndCd, '선택');
    }
    
    
}();

$(document).ready(function() {
	CustomerModifyPopApp.init();
});
