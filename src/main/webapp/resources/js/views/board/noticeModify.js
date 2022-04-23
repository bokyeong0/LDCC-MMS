/** Copyright (c) 2017 VertexID RND, Inc.
 * 
 * Application Name : 공지사항 수정 [BoardNoticeModifyApp]
 * Program Code     : PC0801
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * MINE 유승우		2017. 12. 20. 		First Draft.        javascript
 */
 var BoardNoticeModifyApp = function (modal) {
    "use strict";
    
	// 사용자 정보
	var userInfo = Util.getUserInfo();    
	var $boardNoticeModPopup = $("#boardNoticeModPopup");
	var $boardNoticePopSelectGrid = $("#boardNoticePopSelectGrid");	
	// 공지사항 그리드
	var $boardNoticeGrid = $("#boardNoticeGrid");
	
	// 팝업 파라메터
	var popUpData = $boardNoticeModPopup.PopAppGetData();
	// [Data]그룹코드 유형 콤보박스 데이터
	var partnerSelectCombo;
	
	var asp_comp = null;
	
	return {
        init: function () {        	
        	//달력
        	toDateSetEvent();       
        	//파트너사콤보박스
        	fnListPartnerStatus();        	
        	//내용정보
        	fnGetNoticeView(popUpData.notiSeq);        	
	    	//대상 파트너사 그리드
        	boardNoticePopSelectGrid();
        	//공지사항 팝업 이벤트
	    	fnBoardNoticePopEvents();       	
        	
        }
    };

	//datepicker Set up today.
    function toDateSetEvent() {
    	$('#PopNoticeStartDt, #PopNoticeEndDt').datepicker({ 
    		todayHighlight: true,  
    		autoclose: true,
    	});    	

    }
    
    //[Fn] 이벤트 
    function fnBoardNoticePopEvents(){

    	$("#PopNoticeWriter").val(userInfo.s_userNm); 
    	
    	//저장버튼
    	$("#boardNoticePopSaveBtn").click(function(){
    		fnNoticeSave();
    	});
    	
    	//추가버튼
    	$("#boardNoticePopPartnerAddBtn").click(function(){
    		$boardNoticePopSelectGrid.appendRow();
    	});
    	
    	//삭제버튼
    	$("#boardNoticePopPartnerDelBtn").click(function(){
    		$boardNoticePopSelectGrid.paragonGridSelectDelete();
    	});    	
    }    

    function setData(){
    	var title 			= $("#PopNoticeTitle").val().trim();
    	var writer	  		= $("#PopNoticeWriter").val().trim();    	
    	var startDt 		= $("#PopNoticeStartDt").val().trim();
    	var endDt 			= $("#PopNoticeEndDt").val().trim();
    	var content 		= $("#PopNoticeContent").val().trim();
    	var modFlag         = popUpData.modFlag;
    	var notiSeq         = popUpData.notiSeq;
    	var camelObj = {

    			aspCompCd		: "ASP_COMP_CD"
    	};    	
    	
    	var	gridData = $boardNoticePopSelectGrid.getGridData(camelObj);    	
    	var sendData = {
    			dt_data			: gridData,
    			title			: title,
    			writer 			: writer,
    			startDt			: startDt,
    			endDt			: endDt,
    			content			: content,
    			modFlag         : modFlag,
    			notiSeq         : notiSeq
    	}
        var jsonStr = JSON.stringify(sendData);

    	return jsonStr;
    }    
    
    
    
    function fnGetNoticeView(notiSeq){
    	$.ajax({
    		url : "/ctrl/board/notice/viewBoardNotice",
    		data : {notiSeq : popUpData.notiSeq},
    		type : "POST",
    		dataType : "json",
    		cache: false,
    		success : function(result) {

				var contents	 = result.CONTENT;
				var regDate		 = result.IN_DT;
				var noticeDate	 = result.NOTICE_DATE;
				var startDate    = result.START_DT;
				var endDate      = result.END_DT; 
				var title 		 = result.TITLE;
				var writer		 = result.WRITER;

			    
		      $("#PopNoticeTitle").val(title);	
		      $("#PopNoticeWriter").val(writer);	
		      $("#PopNoticeStartDt").val(startDate);	
		      $("#PopNoticeEndDt").val(endDate);			      
		      $("#PopNoticeContent").val(contents);	
		      fnGetSplitString($boardNoticePopSelectGrid,result.ASP_GROUP, ",");

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
  
    function boardNoticePopSelectGrid(){
    	//$boardNoticePopSelectGrid.resetSelectionGrid();
    	$boardNoticePopSelectGrid.paragonGrid({
        //    url : "/ctrl/board/notice/viewNoticeParterList",
		//	postData : {notiSeq:popUpData.notiSeq},
			rowEditable : true,   
			sortable: false,
			scroll : 1,
			loadui: "disable",
			hidegrid : false,
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
                }
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
    	$boardNoticePopSelectGrid.find('.select-btn').off().live('click',function(e) {
    		e.stopPropagation();
    		if(!$boardNoticePopSelectGrid.modCheck()){
    			return false;
    		}
    	});
	}   
    //=> 구분자 처리
    function fnGetSplitString(obj, val, exp){
       var ret = null;
       var sData =   val.split(exp);
      // console.log("'"+sData[0]+"'");
       if(sData.length >= 1 && sData[0] != "TOTAL"){
        for(var i in sData){
        	obj.paragonGridAddRow({
					addData : {
						ASP_COMP_CD	: sData[i]
					}
	    	});
        	
        }  
       }
       setData();
    }
    //=> 데이터 저장
    function fnNoticeSave(){
/*
    	if($boardNoticePopSelectGrid.modCheck()){
			alert("대상 파트너사목록이 저장되지 않았습니다.");
			return false;
    	}
  */
    	if(!$("#PopNoticeTitle").val()){
      	  alert("제목을 입력해주세요.");	 
      	  $("#PopNoticeTitle").focus();
      	  return false;

      	}
      	if(!$("#PopNoticeWriter").val()){
        	  alert("작성자를 입력해주세요.");	 
      	  $("#PopNoticeWriter").focus();      	  
        	  return false;
        }    	
    	var sendData = setData();
    	//console.log(sendData);
    	if(!confirm("저장하시겠습니까?")){
    		return;
    	}

    	$.ajax({
			url : "/ctrl/board/notice/saveBoardNotice",
    		data : sendData,
    		contentType: 'application/json; charset=utf-8',    		
    		success : function(result) {
    			alert('공지사항이 저장되었습니다.');
    			$boardNoticeModPopup.paragonClosePopup();
    			$boardNoticeGrid.reload();
    		}
    	});    	
    	
    	
    }
    
 }()

 $(document).ready(function() {
	 BoardNoticeModifyApp.init();
 });
