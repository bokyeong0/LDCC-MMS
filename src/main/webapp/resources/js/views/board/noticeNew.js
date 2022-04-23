/** Copyright (c) 2017 VertexID RND, Inc.
 * 
 * Application Name : 공지사항 등록 [BoardNoticeNewApp]
 * Program Code     : PC0801
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * MINE 김선호		2017. 12. 11. 		First Draft.        javascript
 */

var BoardNoticeNewApp = function (modal) {
	"use strict";
	
	/************************************************
	 *전역 객체 선언부 (return 상위부분에 선언해야함)
	 ************************************************/
	// 사용자 정보
	var userInfo = Util.getUserInfo();

	var $boardNoticePopup = $("#boardNoticePopup");
	var $boardNoticeNewSelectGrid = $("#boardNoticeNewSelectGrid");
	// 공지사항 그리드
	var $boardNoticeGrid = $("#boardNoticeGrid");	
	// [Data]그룹코드 유형 콤보박스 데이터
	var partnerSelectCombo;
	
    return {
        init: function () {
        	
        	//파트너사콤보박스
        	fnListPartnerStatus();
        	
        	//달력
        	toDateSetEvent();
        	
        	//공지사항 팝업 이벤트
	    	fnBoardNoticeNewEvents();
	    	
	    	//대상 파트너사 그리드
	    	fnListBoardNoticePartnerSelectGrid();
	    	
	    }
    };
	//datepicker Set up today.
    function toDateSetEvent() {
    	$('#boardNoticeNewStartDt, #boardNoticeNewEndDt').datepicker({ 
    		todayHighlight: true,  
    		autoclose: true,
    	});    	
    	
        $("#boardNoticeNewStartDt").datepicker("setDate", new Date());
        
		var boardNoticeNewStartDt = new Date($('#boardNoticeNewStartDt').val())
		boardNoticeNewStartDt.setDate (boardNoticeNewStartDt.getDate() + 7);
		
		$('#boardNoticeNewEndDt').datepicker("setDate", boardNoticeNewStartDt);
    }
    
    //[Fn] 이벤트 
    function fnBoardNoticeNewEvents(){
    	
    	$("#boardNoticeNewWriter").val(userInfo.s_userNm); 
    	
    	//저장버튼
    	$("#boardNoticeNewSaveBtn").click(function(){
    		saveBtn();
    	});
    	
    	//추가버튼
    	$("#boardNoticeNewPartnerAddBtn").click(function(){
    		$boardNoticeNewSelectGrid.appendRow();
    	});
    	
    	//삭제버튼
    	$("#boardNoticeNewPartnerDelBtn").click(function(){
    		$boardNoticeNewSelectGrid.paragonGridSelectDelete();
    	});    	
    	
    }
    
    function setData(){
    	var title 			= $("#boardNoticeNewTitle").val().trim();
    	var writer   		= $("#boardNoticeNewWriter").val().trim(); 
    	var startDt 		= $("#boardNoticeNewStartDt").val().trim();
    	var endDt 			= $("#boardNoticeNewEndDt").val().trim();
    	var content 		= $("#boardNoticeNewContent").val().trim();
    	
    	var camelObj = {

    			aspCompCd		: "ASP_COMP_CD"
    	};    	
    	
    	var	gridData = $boardNoticeNewSelectGrid.getGridData(camelObj);    	
    	var sendData = {
    			dt_data			: gridData,
    			title			: title,
    			writer 			: writer,
    			startDt			: startDt,
    			endDt			: endDt,
    			content			: content,
    	}
        var jsonStr = JSON.stringify(sendData);

    	return jsonStr;
    }
    
    function setDataValidation(sendData){
    	if(sendData != undefined && $.trim(sendData.partner).length == 0){
    		alert('대상 파트너사를 선택해주세요');
    		$boardNoticeNewSelectGrid.paragonGridAddRow();
    	}
    }
    
    function saveBtn() {
       
    	/*
    	if($boardNoticeNewSelectGrid.modCheck()){
			alert("대상 파트너사목록이 저장되지 않았습니다.");
			return false;
    	}
    	*/
    	if(!$("#boardNoticeNewTitle").val()){
    	  alert("제목을 입력해주세요.");	 
    	  $("#boardNoticeNewTitle").focus();
    	  return false;

    	}
    	if(!$("#boardNoticeNewWriter").val()){
      	  alert("작성자를 입력해주세요.");	 
    	  $("#boardNoticeNewWriter").focus();      	  
      	  return false;
      	}
    	
    	var sendData = setData();
    	console.log(sendData);
    	if(!confirm("저장하시겠습니까?")){
    		return;
    	}

    	$.ajax({
			url : "/ctrl/board/notice/saveBoardNotice",
    		data : sendData,
    		contentType: 'application/json; charset=utf-8',    		
    		success : function(result) {
    			alert('공지사항이 저장되었습니다.');
    			$boardNoticePopup.paragonClosePopup();
    			$boardNoticeGrid.reload();
    		}
    	});
    }
    
    function fnListBoardNoticePartnerSelectGrid(){
    	$boardNoticeNewSelectGrid.paragonGrid({
			rowEditable : true,   
			sortable: false,
			scroll : 1,
			firstData : true,
			loadui: "disable",			
			loadonce: true,			
        	height 	: 	"150px",			
			caption	:"대상 파트너사",
			colNames : [
			            "파트너사"
			            ],
			colModel : [ 
	            {	name : 'ASP_COMP_CD',
	            	editable: true,
	            	align:"center",
	            	fixed :true,
	            	width : "620px",
	            	edittype:'select',
	            	formatter:'select',
	            	editoptions: {
	            		value:partnerSelectCombo
	            	}
                },
			],
			onSaveRowValidate : function(currRowData,currRowId,grid) {
				var rowData = grid.getRow(currRowId);
				var partnerNm = rowData.ASP_COMP_CD;
				
				if (grid.checkOverLap("ASP_COMP_CD",partnerNm,currRowId)) {
					alert("중복된 파트너사가 존재 합니다.");
					return false;
				}
				return true;
			},
        });
    	$boardNoticeNewSelectGrid.find('.select-btn').off().live('click',function(e) {
    		e.stopPropagation();
    		if(!$boardNoticeNewSelectGrid.modCheck()){
    			return false;
    		}
    	});
	}
    
    function fnListPartnerStatus(){
        $.ajax({
            url : "/ctrl/board/notice/noticeNewPartnerComboList",
            type : "POST",
            dataType : "json",
            cache: false,
            async:false,
            success : function(result) {
            	partnerSelectCombo = Util.MakeGridOptions(result);
            }
        });
    }
}();

$(document).ready(function() {
	BoardNoticeNewApp.init();
});

