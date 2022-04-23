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
var CustomerInfoApp = function () {
	"use strict";
	
	/************************************************
	 *전역 객체 선언부 (return 상위부분에 선언해야함)
	 ************************************************/
	
	// [El]사용자 그리드
	var $customerInfoGrid = $("#customerInfoGrid");
	var sendData = '';
	var compCd = '';
	
	return {
        init: function () {
        	//사용자 Grid생성
        	fnListCustomer();

        	//사용자 이벤트
        	fnCustomerEvents();
        	
        	fnGetCompNameList(); //고객사
	    }
    };
    
    //[Fn] 사용자이벤트
    function fnCustomerEvents(){
    	//검색폼 사용자아이디 엔터키 이벤트
    	$("#customerInfoUserId, #customerInfoUserNm, #customerInfoCompCd, #customerInfoBrndCd, #customerInfoCallExt").enterEvent({
    		callBack:function(value){
    			var data = {
    					userId : $("#customerInfoUserId").val(),
    					userNm : $("#customerInfoUserNm").val(),
    					compCd : $("#customerInfoCompCd").val(),
    					brndCd : $("#customerInfoBrndCd").val(),
    					callExt : $("#customerInfoCallExt").val()    					
    				};
    			$customerInfoGrid.paragonGridSearch(data);
    		}
    	})
    	
    	//사용자등록 버튼
    	$("#customerInfoInsertBtn").click(function(){
    		sendData = '';
    		fnSaveUserModal(sendData);
    	});
    	
    	//사용자 검색버튼
    	$("#customerInfoSearchBtn").click(function(){
    		fnSearchListProgram();
    	});
    	
    	//사용자 상세보기 및 수정
    	$("#customerInfoUpdateBtn").click(function(){
    		fnModifyUserModal();
    	});

    	//권한그룹 SelectBox
    	$("#customerInfoUseYn").change(function(){
    		fnSearchListProgram();
    	});
    	
    	//초기비번 발부
    	$("#customerCreateTempPwd").click(function(){
    		fnCreateTempPassword();
    	});
    	
       	//브랜드 조회
    	$("#customerInfoBrndCd").combobox();
    	//고객사 선택시 브랜드 조회
    	$("#customerInfoCompCd").change(function(){
        	compCd = $(this).val();
    		MMSUtil.fnMakeBrndCombo($("#customerInfoBrndCd"), $(this).val(), '', '선택');
    	});
    	
    }

    //[Fn] 사용자 등록화면 modal 팝업창 
    function fnSaveCustomerModal(){
    	PopApp.paragonOpenPopup({
			ajaxUrl: '/ctrl/settings/user/saveCustomerPop',
 			id: 'modalCustomerSavePop',
 			width: '800px', //700이하시 글자(도메인)수 7자 이상 2줄
 			btnName:"저장",
 			title:"고객사 사용자 관리",
			onload:function(modal){
    			modal.show();
			}
		});
    }
    
    //[Fn] 검색 조건 매핑
    function fnSearchListProgram(){
    	var data = {
				userId : $("#customerInfoUserId").val(),
				userNm : $("#customerInfoUserNm").val(),
				compCd : $("#customerInfoCompCd").val(),
				brndCd : $("#customerInfoBrndCd").val(),
				useYn  	: $("#customerInfoUseYn option:selected").val(),
				callExt : $("#customerInfoCallExt").val()  
		};
    	$customerInfoGrid.paragonGridSearch(data);
    }
    
    /********************************************************************
     * 사용자 그리드 생성
     * Since   : 2016-11-16
     * 작성자  : Han Seong Jin
     * 수정내역: 
     ********************************************************************/
    //[Fn] 사용자 그리드 생성 
    function fnListCustomer() {
    	$customerInfoGrid.paragonGrid({
    		url 		: '/ctrl/settings/user/listCustomer',
    		rowNum 		: 15,
    		sortable 	: true,
    		colNames	: [
    		        	   '사용자순번', '파트너사코드', '고객사코드', '브랜드코드', '직책','권한',	//hidden
    		        	   '아이디','사용자명','고객사','브랜드명','사무실전화번호','이메일','계정상태',
    		        	   ],
    		colModel:[
    		          {name : 'USER_SEQ', hidden:true},
    		          {name : 'ASP_COMP_CD', hidden:true},
    		          {name : 'COMP_CD', hidden:true},
    		          {name : 'BRND_CD', hidden:true},
    		          {name : 'USER_POSITION', hidden:true},
    		          {name : 'USER_AUTH', hidden:true},
    		          {name : 'USER_ID', align:"center"},//아이디
    		          {name : 'USER_NM', align:"center"},//이름
    		          {name : 'COMP_NM', align:"center"},//고객사
    		          {name : 'BRND_NM', align:"center"},//브랜드명
		              {name : 'CALL_EXT',align:"center"},//사무실전화번호
		              {name : 'USER_EMAIL',align:"center"},//이메일
		              {name : 'USE_YN', align:"center"},//계정상태
    		         ],
    		caption : "고객사 사용자 관리",
    		pager:"customerInfoGridNavi",
    		ondblClickRow:function(id, iRow, iCol, e){
    			var userSeq = $customerInfoGrid.getRowData(id).USER_SEQ;
    	    	
            	var pop = PopApp.paragonOpenPopup({
            		ajaxUrl	: '/ctrl/settings/user/viewCustomerPop',
            		data	: {
            			"userSeq"	: userSeq

            		},
            		id		: 'viewCustomerInfoPopup',
            		width	: '800px',	    		
            		title 	: "고객사 사용자 관리",
            		onload	: function(modal){
            			modal.show();
            		}
        		});
            	
            },
    	})
    }
    
    function fnModifyUserModal(sendData){
    	var rowId = $customerInfoGrid.jqGrid('getGridParam','selrow');
    	var userSeq = $customerInfoGrid.jqGrid('getCell', rowId, 'USER_SEQ');
    	var compCd = $customerInfoGrid.jqGrid('getCell', rowId, 'COMP_CD');
    	var brndCd = $customerInfoGrid.jqGrid('getCell', rowId, 'BRND_CD');
    	var userAuth = $customerInfoGrid.jqGrid('getCell', rowId, 'USER_AUTH');
    	var useYn = $customerInfoGrid.jqGrid('getCell', rowId, 'USE_YN');
    	
    	sendData = {
    		"userSeq"   : userSeq,
    		"compCd"	: compCd,
    		"brndCd"	: brndCd,
			"userAuth"	: userAuth,
			"useYn"		: useYn
    	};
    	
    	if(rowId === null){
    		alert("수정할 사원을 선택해 주시기 바랍니다.");
    	}else{
    		fnSaveUserModal(sendData);
    	}
    }
    
    function fnSaveUserModal(sendData){
		PopApp.paragonOpenPopup({
			ajaxUrl	: '/ctrl/settings/user/modifyCustomerPop',
			data	: {
				"sendData" : sendData
			},
			id		: 'modalCustomerModifyPop',
			width	: '800px',
			btnName	: "수정",
			title	: "고객사 사용자 관리",
			onload 	: function(modal){
				modal.show();
			}
		});
    }
    
    //[Fn] 초기비번 발부
	function fnCreateTempPassword(){
		App.prcsStart();
		
		$.ajax({
    		url : "/ctrl/settings/user/createTempPwd",
    		data : {"userType":"3"},
    		type : "POST",
    		dataType : "json",
    		success : function(result) {
    			App.prcsEnd();
    			
    			console.info(result);
    			alert(result + "건의 임시비밀번호가 발부되어 등록하신 이메일로 전송 되었습니다.");
    		}
    	});
	}
	
    //고객사 목록 조회
    function fnGetCompNameList(){
    	$('#customerInfoCompCd').combobox();
    	MMSUtil.fnMakeCompCombo($('#customerInfoCompCd'), '', '선택');
    }
	
}();

$(document).ready(function() {
	CustomerInfoApp.init();
});
