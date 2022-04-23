/** Copyright (c) 2017 VertexID RND, Inc.
 * 
 * Application Name : 예방점검[preventiveCheck]
 * Program Code     : PC0700
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * MINE 김선호		2017. 11. 23. 		First Draft.        javascript
 */
var PreventiveCheckNewApp = function () {
	"use strict";
	
	/************************************************
	 *전역 객체 선언부 (return 상위부분에 선언해야함)
	 ************************************************/
	
	var sendData = $('#prventivecheckListNoticeNewPop').PopAppGetData().sendData;
	var sendContent = '';
	
	return {
        init: function () {
        	
    		fnPreventiveCheckViewNew();
    		fnPreventiveCheckNewEvent();
        	
	    }
    };
    
    function fnPreventiveCheckViewNew(){
    	$.ajax({
    		url		: "/ctrl/preventiveCheck/preventiveCheckDetail/noticeContent",
    		type 	: "POST",
    		success : function(result){
    			var sendContent = result.dt_grid[0].CONTENT;
    			sendContent = sendContent.replace(/<br \/>/gi, '\n');
    			$('#preventiveCheckNoticeContentNewInsert').val(sendContent);
    			
    		}
    	});
    }
    
    function fnPreventiveCheckNewEvent(){
    	$(document).on('click', '#preventiveCheckNoticeNewSaveBtn',function(){
    		fnPreventiveCheckNoticeSave();
    	})
    }
    
    
    function fnPreventiveCheckNoticeSave(){
    	var updateContent = $('#preventiveCheckNoticeContentNewInsert').val();
    	if(sendContent == updateContent){
    		alert('수정된 내용이없습니다.');
    		return false;
    	}else{
    		updateContent = updateContent.replace(/(?:\r\n|\r|\n)/g, '<br />');
    		
        	var sendData = {
        			content : updateContent
        	}
        	$.ajax({
        		url		: "/ctrl/preventiveCheck/preventiveCheckList/noticeNewSave",
        		data 	: sendData,
        		type 	: "POST",
        		success : function(result){
        			alert('등록성공');
        	    	$('#prventivecheckListNoticeNewPop').paragonClosePopup();
        		}
        	});
    	}
    };
    
}();

$(document).ready(function() {
	PreventiveCheckNewApp.init();
});

