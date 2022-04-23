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
var UserInfoApp = function () {
	"use strict";
	
	/************************************************
	 *전역 객체 선언부 (return 상위부분에 선언해야함)
	 ************************************************/
	
	// [El]사용자 그리드
	var $userInfoGrid = $("#userInfoGrid");
	return {
        init: function () {
        	//사용자 Grid생성
        	fnListUser();

        	//사용자 이벤트
        	fnUserEvents();
        	
        	//권역목록
        	fnGetAreaNameList();
	    },
	    getGrid: function(){
	    	return $userInfoGrid;
	    }
    };
    
    //[Fn] 사용자이벤트
    function fnUserEvents(){
    	//검색폼 사용자아이디 엔터키 이벤트
    	$("#userInfoUserId, #userInfoUserName, #userInfoCallExt").enterEvent({
    		callBack:function(value){
    			var data = {
    					userId : $("#userInfoUserId").val(),
    					userNm : $("#userInfoUserName").val(),
    					callExt : $("#userInfoCallExt").val()
    				};
    			$("#userInfoGrid").paragonGridSearch(data);
    		}
    	})
    	
    	//사용자등록 버튼
    	$("#userInfoAddRowBtn").click(function(){
    		fnSaveUserModal();
    	});
    	
    	//사용자 검색버튼
    	$("#userInfoSearchBtn").click(function(){
    		fnSearchListProgram();
    	});
    	
    	//사용자 상세보기 및 수정
    	$("#userInfoUpdateBtn").click(function(){
    		fnModifyUserModal();
    	});

    	//권한그룹 SelectBox
    	$("#userInfoPositionCode").change(function(){
    		fnSearchListProgram();
    	});
    }

    //[Fn] 사용자 등록화면 modal 팝업창 
    function fnSaveUserModal(){
    	PopApp.paragonOpenPopup({
			ajaxUrl: '/ctrl/settings/user/saveUserPop',
 			id: 'modalUserSavePop',
 			width: '700px',
 			btnName:"저장",
 			title:"사용자 등록",
			onload:function(modal){
    			modal.show();
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
    			Util.MakeSelectOptions($('#userInfoAreaSeq'), result);
    		}
    	});
    }
    
    //[Fn] 검색 조건 매핑
    function fnSearchListProgram(){
    	var data = {
				userId : $("#userInfoUserId").val(),
				userNm : $("#userInfoUserName").val(),
				callExt : $("#userInfoCallExt").val(),
				areaSeq : $('#userInfoAreaSeq').val(),
				useYn  : $("#userInfoPositionCode option:selected").val()
		};
		$("#userInfoGrid").paragonGridSearch(data);
    }
    
    /********************************************************************
     * 사용자 그리드 생성
     * Since   : 2016-11-16
     * 작성자  : Han Seong Jin
     * 수정내역: 
     ********************************************************************/
    //[Fn] 사용자 그리드 생성 
    function fnListUser() {
    	$userInfoGrid.paragonGrid({
    		url : '/ctrl/settings/user/listUser',
//    		height : 600,
    		rowNum : 15,
    		sortable : true,
    		colModel:[
    		          {name:'USER_SEQ', hidden:true},
    		          {name:'ASP_COMP_CD', hidden:true},
    		          {name:'USER_NO', align:"center"},
    		          {name:'USER_ID', align:"center"},
    		          {name:'USER_NM', align:"center"},
    		          {name:'USER_POSITION', hidden:true},
    		          {name:'USER_POSITION_NM', align:"center"},
    		          {name:'AREA_SEQ', hidden:true},
    		          {name:'AREA_NM', align:"center"},
		              {name:'USER_PHONE',align:"center"},
		              {name:'USER_EMAIL',align:"center"},
		              {name :'CALL_EXT', sortable : false, align:"center"}, 
		              {name:'LIVE_YN', align:"center"},
    		          {name:'USER_JOIN_DATE', align:"center", sortable:false},
    		          {name:'LIVE_DATE', align:"center", sortable:false, formatter:fnGetLiveDate}
//    		          {name:'IN_USER_ID', align:"center"},
    		         ],
    		caption : "사원관리",
    		pager:"userInfoGridNavi",
    		ondblClickRow:function(id, iRow, iCol, e){
            	
//            	var astSeq = $userInfoGrid.getRowData( id ).AST_SEQ;
            	
            	var pop = PopApp.paragonOpenPopup({
            		ajaxUrl: '/ctrl/settings/user/viewUserPop',
//            		data:{"astSeq":astSeq},
            		id: 'viewUserInfoPopup',
            		width: '700px',	    		
            		title :"사원 상세정보",
            		onload:function(modal){
            			UserInfoViewPopApp.fnSetData(modal);
            		}
        		});
            	
            },
    	})
    }
    
    //[Fn] 근속 기간
    function fnGetLiveDate(cellvalue){
    	var year = parseInt(cellvalue / 12);
    	var month = cellvalue % 12;
    	return year+"년 "+month+"월";
    }
    
    function fnModifyUserModal(){
    	var rowId = $userInfoGrid.jqGrid('getGridParam','selrow');
    	var aspCompCd = $userInfoGrid.jqGrid('getCell', rowId, 'ASP_COMP_CD');
    	var positionCd = $userInfoGrid.jqGrid('getCell', rowId, 'USER_POSITION');
    	var areaSeq = $userInfoGrid.jqGrid('getCell', rowId, 'AREA_SEQ');
    	
    	var sendData = {
			"aspCompCd"	: aspCompCd	,
			"positionCd": positionCd,
			"areaSeq"	: areaSeq	,
    	};
    	
    	if(rowId === null){
    		alert("수정할 사원을 선택해 주시기 바랍니다.");
    	}else{
    		PopApp.paragonOpenPopup({
    			ajaxUrl: '/ctrl/settings/user/modifyUserPop',
    			data:{"sendData":sendData},
    			id: 'modalUserModifyPop',
    			width: '700px',
    			btnName:"수정",
    			title:"사용자 정보 수정",
    			onload:function(modal){
    				UserInfoModifyPopApp.fnGetUserInfo(modal);
    			}
    		});
    	}
    }

    function TestFun(modal){
    	modal.show();
    }
}();

$(document).ready(function() {
	UserInfoApp.init();
});