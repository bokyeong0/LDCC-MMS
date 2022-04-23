/** Copyright (c) 2016 VertexID RND, Inc.
 * 
 * Application Name : 파트너사사용자 관리 [PartnerUserInfoApp]
 * Program Code     : PC0028
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Han Seong Jin 	2016. 11. 16.  		First Draft.
 */
var PartnerInfoApp = function () {
	"use strict";
	
	/************************************************
	 *전역 객체 선언부 (return 상위부분에 선언해야함)
	 ************************************************/
	
	// [El]사용자 그리드
	var $partnerInfoGrid = $("#partnerInfoGrid");
	var sendData = '';
	var userInfo = Util.getUserInfo();
	var aspCompCd = userInfo.s_companyCd;
	var userInfoId = userInfo.s_userId;
	var userType = userInfo.s_userType;
	
	return {
        init: function () {

        	//사용자 이벤트
        	fnPartnerEvents();
        	
        	//파트너사 콤보박스
        	fnGetAspCompNameList(); //파트너사
        	
        	//사용자 Grid생성
        	fnListPartner();
	    }
    };
    
    //[Fn] 사용자이벤트
    function fnPartnerEvents(){
    	//검색폼 사용자아이디 엔터키 이벤트
    	$("#partnerInfoUserId, #partnerInfoUserNm, #partnerInfoCallExt, #partnerInfoUserAreaCd").enterEvent({
    		callBack:function(value){
    			var data = {
    					userId 		: $("#partnerInfoUserId").val(),
    					userNm 		: $("#partnerInfoUserNm").val(),
    					aspCompCd 	: $("#partnerInfoAspCompCd option:selected").val(),
    					userDept	: $("#partnerInfoUserAreaCd").val(),
    					useYn 		: $("#partnerInfoUseYn option:selected").val(),
    					callExt 	: $("#partnerInfoCallExt").val()    					
    				};
    			$("#partnerInfoGrid").paragonGridSearch(data);
    		}
    	})
    	
    	//사용자등록 버튼
    	$("#partnerInfoInsertBtn").click(function(){
    		sendData = '';
    		fnSaveUserModal(sendData);
    	});
    	
    	//사용자 검색버튼
    	$("#partnerInfoSearchBtn").click(function(){
    		fnSearchListProgram();
    	});
    	
    	//사용자 상세보기 및 수정
    	$("#partnerInfoUpdateBtn").click(function(){
    		fnModifyPartnerModal();
    	});
    	
    	//권한그룹 SelectBox
    	$("#partnerUserInfoUseYn").change(function(){
    		fnSearchListProgram();
    	});
    	
    	//초기비번 발부
    	$("#partnerCreateTempPwd").click(function(){
    		fnCreateTempPassword();
    	});

    	//파트너사 부서 조회
    	$("#partnerInfoUserAreaCd").combobox();
    	//파트너사 선택시 담당부서 조회
    	$("#partnerInfoAspCompCd").change(function(){
        	aspCompCd = $(this).val();
    		MMSUtil.fnMakeAreaCombo($("#partnerInfoUserAreaCd"), '', aspCompCd, '선택', true);
    	});
    	
    }
    
    //파트너사 목록 조회
    function fnGetAspCompNameList(){
    	$("#partnerInfoAspCompCd").combobox();
    	MMSUtil.fnMaMakePartnerCombo($("#partnerInfoAspCompCd"), aspCompCd);

    	if(userType == 2){
    		$('#partnerInfoAspCompCd_input, #partnerInfoAspCompCd_input + span').attr('disabled', true);
    		MMSUtil.fnMakeAreaCombo($("#partnerInfoUserAreaCd"), '', aspCompCd, '선택', true);
    	}
    }
    
    //[Fn] 검색 조건 매핑
    function fnSearchListProgram(){
    	var data = {
				userId : $("#partnerInfoUserId").val(),
				userNm : $("#partnerInfoUserNm").val(),
				aspCompCd : $("#partnerInfoAspCompCd").val(),
				areaCd : $("#partnerInfoUserAreaCd").val(),
				useYn : $("#partnerInfoUseYn option:selected").val(),
				callExt : $("#partnerInfoCallExt").val()
		};
    	$partnerInfoGrid.paragonGridSearch(data);
    }
    
    /********************************************************************
     * 사용자 그리드 생성
     * Since   : 2016-11-16
     * 작성자  : Han Seong Jin
     * 수정내역: 
     ********************************************************************/
    //[Fn] 사용자 그리드 생성 
    function fnListPartner() {
    	$partnerInfoGrid.paragonGrid({
    		url 		: '/ctrl/settings/user/listPartner',
    		rowNum 		: 15,
    		sortable 	: true,
    		postData	: {
    			"aspCompCd"	:	aspCompCd
    		},
    		colNames	:	[
    		        	 	 '아이디','사용자명','파트너사명','담당부서','권한','이메일','사무실전화번호','계정상태',
    		        	 	 '사용자번호','파트너사코드','부서코드','직책','권한','작성일시'//hidden
    		        	 	 ],
    		colModel:[		          
    		          {name : 'USER_ID', align:"center"},
    		          {name : 'USER_NM', align:"center"},
    		          {name : 'ASP_COMP_NM', align:"center"},
    		          {name : 'AREA_NM', align:"center"},
    		          {name : 'USER_AUTH_NM', align:"center"},
		              {name : 'USER_EMAIL',align:"center"},
		              {name	: 'CALL_EXT',align:"center"},
		              {name : 'USE_YN', align:"center"},	          
    		          {name : 'USER_SEQ', hidden:true},
    		          {name : 'ASP_COMP_CD', hidden:true},
    		          {name : 'AREA_CD', hidden:true},
    		          {name : 'USER_POSITION', hidden:true},   
    		          {name	: 'USER_AUTH', hidden:true},
    				  {name : 'IN_DT', sortable : false, align:"center", hidden:true}//작성일시
    		         ],
    		caption : "파트너사 사용자관리",
    		pager	:"partnerInfoGridNavi",
    		ondblClickRow	: function(id, iRow, iCol, e){
    			var rowId = $partnerInfoGrid.jqGrid('getGridParam','selrow');
            	var userSeq = $partnerInfoGrid.getRowData( id ).USER_SEQ;
            	
            	var pop = PopApp.paragonOpenPopup({
            		ajaxUrl	: '/ctrl/settings/user/viewPartnerPop',
            		data	: { "userSeq" : userSeq },
            		id		: 'viewPartnerInfoPopup',
            		width	: '800px',	    		
            		title 	: "파트너 사용자 관리",
            		onload	: function(modal){
            			modal.show();
            		}
        		});
            	
            },
    	})
    }
    
    function fnModifyPartnerModal(){
    	var rowId = $partnerInfoGrid.jqGrid('getGridParam','selrow');
    	var userSeq = $partnerInfoGrid.jqGrid('getCell', rowId, 'USER_SEQ');
    	var userId = $partnerInfoGrid.jqGrid('getCell', rowId, 'USER_ID');
    	var areaCd = $partnerInfoGrid.jqGrid('getCell', rowId, 'AREA_CD');
    	var aspCompCd = $partnerInfoGrid.jqGrid('getCell', rowId, 'ASP_COMP_CD');
    	var userAuth = $partnerInfoGrid.jqGrid('getCell', rowId, 'USER_AUTH');
    	var useYn = $partnerInfoGrid.jqGrid('getCell', rowId, 'USE_YN');

    	sendData = {
    		"userSeq"       : userSeq,
    		"userId" 	    : userId,
    		"areaCd"		: areaCd,
    		"aspCompCd"     : aspCompCd,
    		"userAuth"		: userAuth,
    		"useYn"			: useYn,
    		"userInfoId"	: userInfoId
    	};
    	
    	if(rowId === null){
    		alert("수정할 사원을 선택해 주시기 바랍니다.");
    	}else{
    		fnSaveUserModal(sendData);
    	}
    }
    
    //[Fn] 사용자 등록화면 modal 팝업창 
    function fnSaveUserModal(sendData){
		PopApp.paragonOpenPopup({
			ajaxUrl	: '/ctrl/settings/user/modifyPartnerPop',
			data	: {
				"sendData"  :sendData
				},
			id		: 'modalPartnerModifyPop',
			width	: '800px',
			title	: "파트너 사용자 관리",
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
    		data : {"userType":"2"},
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
	PartnerInfoApp.init();
});
