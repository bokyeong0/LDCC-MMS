/** Copyright (c) 2016 VertexID RND, Inc.
 * 
 * Application Name : 권한 관리[SystemPushApp]
 * Program Code     : PC0007
 * Description      :
 * Revision History
 * Pushor          	Date           		Description
 * ------------		-------------		------------------
 * Kim Jin Ho  		2016. 10. 24.  		First Draft.
 */
var SystemPushApp = function () {
	"use strict";
	
	/************************************************
	 *전역 객체 선언부 (return 상위부분에 선언해야함)
	 ************************************************/
	
	// [El]권한 트리 그리드
	var $systemPushGrid = $("#systemPushGrid");
	var headerCheckBoxFlag = true;
	
	
    return {
        init: function () {
        	
        	//권한 Event
        	fnPushEvents();
        	fnListPushSearchUser("");
	    }
    };
    
    //[Fn] 이벤트 
    function fnPushEvents(){
    	MMSUtil.fnMakeAreaCombo($("#systemPushArea"));
    	//사용자 검색 버튼
    	$("#systemPushUserSearchBtn").click(function(){
    		var value = $("#pushUserSearchWords").val();
			fnListPushSearchUser($.trim(value));
    	});
    	
    	//사용자 검색 엔터키 
    	$("#pushUserSearchWords").enterEvent({
    		callBack:function(value){
				fnListPushSearchUser($.trim(value));
			}
    	})
    	
    	
    	//선택 사용자 전송
    	$("#systemPushSendBtn").click(function(){
    		fnPushSend();
    	});
    	//선택 권역 사용자 전송
    	$("#systemPushAreaSendBtn").click(function(){
    		fnPushAreaSend();
    	});
    	
    	//검색된 모든 사용자 추가
    	$("#pushAddUserAll").click(function(){
    		$( "#pushUserLeft option" ).each(function() {
    			$("#pushUserRight").append($(this));
    	    });
    	});
    	
    	//등록된 모든 사용자 제거
    	$("#pushRemoveUserAll").click(function(){
    		$( "#pushUserRight option" ).each(function() {
    			$("#pushUserLeft").append($(this));
    	    });
    	});
    	
    	//선택된 사용자 추가
    	$("#pushAddUserSelected").click(function(){
    		$( "#pushUserLeft option:selected" ).each(function() {
    			$("#pushUserRight").append($(this));
    		});
    	});
    	
    	//선택된 사용자 제거
    	$("#pushRemoveUserSelected").click(function(){
    		$( "#pushUserRight option:selected" ).each(function() {
    			$("#pushUserLeft").append($(this));
    		});
    	});
    	
    }
    //[Fn] 사용자 검색
    function fnListPushSearchUser(searchWord){
    	
    	var searchWordArr = [];
		// 사용자 검색시 스페이스바(공백)기준으로 잘라서 Like 검색(주소검색같은 기능)
		if(searchWord != ""){
			searchWordArr= searchWord.split( ' ' );
		}
    	// 사용자 검색 초기화
    	$("#pushUserLeft").html("");
    	$.ajax({
    		url : "/ctrl/push/searchUser",
    		data :JSON.stringify({searchWordArr : searchWordArr}),
    		type : "POST",
    		dataType : "json",
    		contentType: 'application/json; charset=utf-8',
    		success : function(result) {
    			for (var i = 0; i < result.length; i++) {
    				var userNo 	 	= result[i].USER_NO;
    				var userNm		= result[i].USER_NM;
    				var userRoleNm 	= result[i].USER_ROLE_NM;
    				var userId		= result[i].USER_ID;
    				
    				
    				var option = $("<option>", {value: userId});
    				var thisName = userNo+' '+userNm+' - '+userRoleNm+'['+userId+']';
    				option.text(thisName)
    				$("#pushUserLeft").append(option);
    				
    			}
    		}
    	});
    }
    
    
    //[Fn] PushSend
    function fnPushAreaSend(){
		
		// 선택된 사용자 저장
    	var pushSendMsg = $("#pushSendMsg").val();
    	var areaSeq = $("#systemPushArea").val();
    	if(pushSendMsg == ""){
    		alert("내용을 입력하세요");
    		$("#pushSendMsg").focus();
    		return;
    	}
    	if(areaSeq == ""){
    		alert("권역을 선택해주세요");
    		$("#systemPushArea").focus();
    		return;
    	}
		var data ={
				PUSH_MSG:pushSendMsg	,
				areaSeq:areaSeq	
		} ;
		var jsonData = JSON.stringify(data);
			
		$.ajax({
    		url : "/ctrl/push/area",
    		data :jsonData,
    		type : "POST",
    		dataType : "json",
    		contentType: 'application/json; charset=utf-8',
    		cache: false,
    		success : function(result) {
    			alert(result.msgTxt);
    		}
    	});
    }
    function fnPushSend(){
    	
    	// 선택된 사용자 저장
    	var pushSendMsg = $("#pushSendMsg").val();
    	if(pushSendMsg == ""){
    		alert("내용을 입력하세요");
    		$("#pushSendMsg").focus();
    		return;
    	}
    	var userIdArr = [];
    	$( "#pushUserRight option" ).each(function() {
    		userIdArr.push($(this).val());
    	});
    	if(userIdArr.length == 0){
    		alert("사원을 선택하세요");
    		return;
    	}
    	var data ={
    			PUSH_MSG:pushSendMsg	,
    			userIdArr:userIdArr	
    	} ;
    	var jsonData = JSON.stringify(data);
    	
    	$.ajax({
    		url : "/ctrl/push/user",
    		data :jsonData,
    		type : "POST",
    		dataType : "json",
    		contentType: 'application/json; charset=utf-8',
    		cache: false,
    		success : function(result) {
    			alert(result.msgTxt);
    		}
    	});
    }
    
}();

$(document).ready(function() {
	SystemPushApp.init();
});
