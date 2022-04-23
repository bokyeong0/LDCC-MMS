/** Copyright (c) 2017 VertexID RND, Inc.
 * 
 * Application Name : 공지사항[StandardAreaApp]
 * Program Code     : PC0800
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * MINE 김선호		2017. 12. 08 		First Draft.        javascript
 */
var BoardNoticeApp = function () {
	"use strict";
	
	/************************************************
	 *전역 객체 선언부 (return 상위부분에 선언해야함)
	 ************************************************/
	
	// 공지사항 그리드
	var $boardNoticeGrid = $("#boardNoticeGrid");

	return {
        init: function () {
        	//달력
        	toDateSetEvent();
        	//이벤트
        	fnBoardNoticeEvent();
        	//공지사항 Grid생성
        	fnListBoardNotice();
        }
    };
    
	//datepicker Set up today.
    function toDateSetEvent() {
    	$('#boardNoticeStartDt, #boardNoticeEndDt').datepicker({ 
    		todayHighlight: true,  
    		autoclose: true,
    	});    	
    	
        $("#boardNoticeStartDt").datepicker("setDate", new Date());
		var boardNoticeStartDt = new Date($('#boardNoticeStartDt').val())
		boardNoticeStartDt.setDate (boardNoticeStartDt.getDate() + 7);
        $("#boardNoticeEndDt").datepicker("setDate", boardNoticeStartDt);

    }
    
    /********************************************************************
     * 자산관리 그리드 생성
     * Since   : 2017-12-08
     * 작성자  : 김 선 호 
     * 수정내역: 
     ********************************************************************/
    //[Fn] jqgrid 자산관리 목록 
    function fnListBoardNotice(){
    	$boardNoticeGrid.paragonGrid({
        	url: '/ctrl/board/notice/listBoardNotice',
			sortable: true,
			caption:"공지사항",
			postData : {
				startDt:$("#boardNoticeStartDt").val(),
				endDt:$("#boardNoticeEndDt").val(),		
				},			
			rownumbers : true,			
			rowNum: 10,
			rowList: [10, 20, 50,100],
			colNames : [
			             "제목", "공지기간",	"등록일시",	"작성자", "NOTICE_SEQ"
			            ],
			colModel : [ 
	            {width:"300px", name : 'TITLE', align:"left"},
	            {width:"120px", name : 'NOTICE_DATE', align:"center"},
	            {width:"120px", name : 'IN_DT', align:"center"},	            
	            {width:"120px", name : 'WRITER', align:"center"},         
	            {align:"center", name : 'NOTICE_SEQ', hidden:"hidden"},
	            ],
            pager: "#boardNoticeGridNavi",
            /*
            onSelectRowEvent : function(currRowData, prevRowData){
           //    var NotiSeq = currRowData.NOTICE_SEQ;   	
            //   fnBoardNoticeView(NotiSeq);
            },
            */
			ondblClickRow: function(id, iRow, iCol, e){
            	var NotiSeq = $boardNoticeGrid.getRowData(id).NOTICE_SEQ;
                   fnBoardNoticeView(NotiSeq);
			}
        });
	}
    
    //[Fn] 이벤트 
    function fnBoardNoticeEvent(){
    	
    	//자산등록 버튼
    	$("#boardNoticeInsertBtn").click(function(){
    		fnBoardNoticeNewPopup();
    	});
    	
    	//검색 버튼
    	$("#boardNoticeSearchBtn").click(function(){
    		fnSearchBoardNotice();
    	});

    	//삭제 버튼
    	$("#boardNoticeDelBtn").click(function(){
    	
    	});
       	
   
    	//수정 버튼
    	$("#boardNoticeModBtn").click(function(){
    		var rowData = $boardNoticeGrid.getRow();
    		var notiSeq = rowData.NOTICE_SEQ;
    		if(!notiSeq){
    			alert("대상을 선택해주세요.");
    		    return false;
    		}
    		
    		PopApp.paragonOpenPopup({
        		ajaxUrl: '/ctrl/board/notice/noticeModPopup',
    			id : 'boardNoticeModPopup',
    			data:{notiSeq : notiSeq, modFlag:"UPDATE"},
    			width : '700px',
    			btnName : "수정",
    			title : "공지사항 수정",
    			onload : function(modal) {
    				modal.show();
    			}

    		});
    	});	   	
    	
    }
    
    //[Fn] 검색 조건 매핑
    function fnSearchBoardNotice(){
		var data = {
			startDt	: $("#boardNoticeStartDt").val().trim(),
			endDt	: $("#boardNoticeEndDt").val().trim(),
		};
		$boardNoticeGrid.paragonGridSearch(data);
    }

	//공지사항 등록 팝업
	function fnBoardNoticeNewPopup(){
		PopApp.paragonOpenPopup({
    		ajaxUrl: '/ctrl/board/notice/noticeNewPopup',
    		id: 'boardNoticePopup',
    		width: '700px',	    		
    		btnName:"저장",
    		title :"공지사항 등록",
    		onload:function(modal){
    			modal.show();
    		}
		});
	}
	
	//공지사항 보기 팝업
	function fnBoardNoticeView(notiSeq){

		PopApp.paragonOpenPopup({
    		ajaxUrl: '/ctrl/board/notice/noticeViewPopup',
    		id: 'boardNoticeViewPopup',
    		width: '700px',	    		
    		btnName:"보기",
    		title :"공지사항 보기",
			data:{notiSeq : notiSeq},
    		onload:function(modal){
    			modal.show();
    		}
		});	  
	}

	
	
	
}();

$(document).ready(function() {
	BoardNoticeApp.init();
});
