/** Copyright (c) 2017 VertexID RND, Inc.
 * 
 * Application Name : 공지사항 보기 [BoardNoticeViewApp]
 * Program Code     : PC0801
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * MINE 유승우		2017. 12. 20. 		First Draft.        javascript
 */
 var BoardNoticeViewApp = function (modal) {
    "use strict";
	var $boardNoticePopup = $("#boardNoticeViewPopup");   
	// 팝업 파라메터
	var popUpData = $boardNoticePopup.PopAppGetData();
	// 공지사항 그리드
	var $boardNoticeGrid = $("#boardNoticeGrid");
	return {
        init: function () {
        	fnGetNoticeView(popUpData.notiSeq); 
        	fnBoardNoticeViewEvents();
        }
    };
    
    function fnBoardNoticeViewEvents(){
    	if(popUpData.modFlag =="MAIN") $("#boardNoticeDelBtn").hide();
    	//삭제버튼
    	$("#boardNoticeDelBtn").click(function(){
    		if(confirm("해당내용을 삭제하시겠습니까?")){
	        	$.ajax({
	        		url : "/ctrl/board/notice/saveBoardNotice",
	        		data : {notiSeq : popUpData.notiSeq, modFlag : "DELETE"},
	        		type : "POST",
	        		dataType : "json",
	        		cache: false,
	        		success : function(result) {
	           			alert('공지사항이 삭제되었습니다.');
	           			$boardNoticePopup.paragonClosePopup();
	        			$boardNoticeGrid.reload();
	        		}
	        	});	
	        	return false;
    		}
    	});     	
    }
    
    
    function fnGetNoticeView(notiSeq){
    	$.ajax({
    		url : "/ctrl/board/notice/viewBoardNotice",
    		data : {notiSeq : notiSeq},
    		type : "POST",
    		dataType : "json",
    		cache: false,
    		success : function(result) {
				var regDate		 = result.IN_DT;
				var noticeDate	 = result.NOTICE_DATE;   	
				var title 		 = result.TITLE;
				var writer       = result.WRITER;
				var contents	 = result.CONTENT;
				contents     =  contents.replace(/\n/g,'<br/>');
				contents     =  contents.replace(/\ /gi,'&nbsp;');


		      $("#callNoticeViewTitle").text(title);	
		      $("#callNoticeViewWriter").text(writer);			      
		      $("#callNoticeViewRegDate").text(regDate);
		      $("#callNoticeViewDate").text(noticeDate);	
		      $("#callNoticeViewContent").html(contents);	
    		}
    	});   	
    }
    
 }()

 $(document).ready(function() {
	 BoardNoticeViewApp.init();
 });
