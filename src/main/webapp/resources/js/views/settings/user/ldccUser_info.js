/** Copyright (c) 2016 VertexID RND, Inc.
 * 
 * Application Name : 사용자 관리 [UserInfoApp]
 * Program Code     : PC0028
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Han Seong Jin 	2016. 11. 16.  		First Draft.
 */
var LdccUserInfoApp = function () {
	"use strict";
	
	/************************************************
	 *전역 객체 선언부 (return 상위부분에 선언해야함)
	 ************************************************/
	
	// [El]사용자 그리드
	var $ldccUserInfoGrid = $("#ldccUserInfoGrid");
	var userInfo = Util.getUserInfo();
	var userInfoId = userInfo.s_userId;
	var sendData = '';
	
	return {
        init: function () {
        	//사용자 Grid생성
        	fnListUser();

        	//사용자 이벤트
        	fnUserEvents();
        	
	    }
    };
    
    //[Fn] 사용자이벤트
    function fnUserEvents(){
    	//검색폼 사용자아이디 엔터키 이벤트
    	$("#ldccUserInfoUserId, #ldccUserInfoUserName, #ldccUserInfoCallExt").enterEvent({
    		callBack:function(value){
    			var data = {
    					userId : $("#ldccUserInfoUserId").val(),
    					userNm : $("#ldccUserInfoUserName").val(),
    					userDept : $("#ldccUserInfoUserDept option:selected").val(),    					
    					callExt : $("#ldccUserInfoCallExt").val()
    				};
    			$ldccUserInfoGrid.paragonGridSearch(data);
    		}
    	})
    	
    	//사용자등록 버튼
    	$("#ldccUserInfoAddRowBtn").click(function(){
    		sendData = '';
    		fnSaveUserModal(sendData);
    	});
    	
    	//사용자 검색버튼
    	$("#ldccUserInfoSearchBtn").click(function(){
    		fnSearchListProgram();
    	});
    	
    	//사용자 상세보기 및 수정
    	$("#ldccUserInfoUpdateBtn").click(function(){
    		fnModifyUserModal();
    	});

    	//권한그룹 SelectBox
    	$("#ldccUserInfoUseYn").change(function(){
    		fnSearchListProgram();
    	});
    	
    	//초기비번 발부
    	$("#ldccUserCreateTempPwd").click(function(){
    		fnCreateTempPassword();
    	});
    }

    //[Fn] 검색 조건 매핑
    function fnSearchListProgram(){
    	var data = {
				userId 	: $("#ldccUserInfoUserId").val(),
				userNm 	: $("#ldccUserInfoUserName").val(),
				userDept : $("#ldccUserInfoUserDept").val(),    				
				useYn  	: $("#ldccUserInfoUseYn option:selected").val(),
				callExt : $("#ldccUserInfoCallExt").val()
		};
    	$ldccUserInfoGrid.paragonGridSearch(data);
    }
    
    /********************************************************************
     * 사용자 그리드 생성
     * Since   : 2016-11-16
     * 작성자  : Han Seong Jin
     * 수정내역: 
     ********************************************************************/
    //[Fn] 사용자 그리드 생성 
    function fnListUser() {
    	$ldccUserInfoGrid.paragonGrid({
    		url 		: '/ctrl/settings/user/listLdccUser',
    		rowNum 		: 15,
    		sortable 	: true,
    		colNames	: [
    		        	   '사용자순번', '파트너사코드', '직책', "권한", //hidden
    		        	   '아이디','사용자명','담당부서','권한','이메일','사무실전화번호','계정상태'
    		        	   ],
    		colModel:[
    		          {name:'USER_SEQ', hidden:true},
    		          {name:'ASP_COMP_CD', hidden:true},
    		          {name:'USER_POSITION', hidden:true},
    		          {name:'USER_AUTH', hidden:true},
    		          {name:'USER_ID', align:"center"},
    		          {name:'USER_NM', align:"center"},
    		          {name:'USER_DEPT', align:"center"},
    		          {name:'USER_AUTH_NM', align:"center"},
		              {name:'USER_EMAIL',align:"center"},
		              {name:'CALL_EXT', sortable : false, align:"center"}, 
		              {name:'USE_YN', align:"center"},	

    		         ],
    		caption : "LDCC 사용자 관리",
    		pager	:"ldccUserInfoGridNavi",
    		ondblClickRow	: function(id, iRow, iCol, e){
            	var userSeq = $ldccUserInfoGrid.getRowData( id ).USER_SEQ;
            	
            	var pop = PopApp.paragonOpenPopup({
            		ajaxUrl	: '/ctrl/settings/user/viewLdccUserPop',
            		data	: { "userSeq" : userSeq },
            		id		: 'viewLdccUserInfoPopup',
            		width	: '800px',	    		
            		title	: "LDCC 사용자 관리",
            		onload	: function(modal){
            			modal.show();
            			
            		}
        		});
            	
            },
    	})
    }
    //수정버튼
    function fnModifyUserModal(){
    	var rowId = $ldccUserInfoGrid.jqGrid('getGridParam','selrow');
    	var userSeq = $ldccUserInfoGrid.jqGrid('getCell', rowId, 'USER_SEQ'); 
    	var userId = $ldccUserInfoGrid.jqGrid('getCell', rowId, 'USER_ID');
    	var userAuth = $ldccUserInfoGrid.jqGrid('getCell', rowId, 'USER_AUTH');
    	var useYn = $ldccUserInfoGrid.jqGrid('getCell', rowId, 'USE_YN');

    	sendData = {
    			"userSeq"	: userSeq,
    			"userId"	: userId,
    			"userAuth"	: userAuth,
    			"useYn"		: useYn,
    			"userInfoId": userInfoId
    	}
    	
    	if(rowId === null){
    		alert("수정할 사원을 선택해 주시기 바랍니다.");
    	}else{
    		fnSaveUserModal(sendData);
    	}
    }
    
    //[Fn] 사용자 등록화면 modal 팝업창 
    function fnSaveUserModal(sendData){
		PopApp.paragonOpenPopup({
			ajaxUrl	: '/ctrl/settings/user/modifyLdccUserPop',
			data	: {
				"sendData" : sendData
			},
			id		: 'modalLdccUserModifyPop',
			width	: '800px',
			title	: "LDCC 사용자 관리",
			onload	: function(modal){
				modal.show();
			}
		});
    }
    
    //[Fn] 초기비번 발부
	function fnCreateTempPassword(){
		App.prcsStart();
		
		$.ajax({
    		url : "/ctrl/settings/user/createTempPwd",
    		data : {"userType":"1"},
    		type : "POST",
    		dataType : "json",
    		success : function(result) {
    			App.prcsEnd();
    			
    			console.info(result);
    			alert(result + "건의 임시비밀번호가 발부되어 등록하신 이메일로 전송 되었습니다.");
    		}
    	});
	}

}();

$(document).ready(function() {
	LdccUserInfoApp.init();
});