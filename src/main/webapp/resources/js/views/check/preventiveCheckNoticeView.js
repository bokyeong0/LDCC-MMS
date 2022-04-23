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
var PreventiveCheckViewApp = function () {
	"use strict";
	
	/************************************************
	 *전역 객체 선언부 (return 상위부분에 선언해야함)
	 ************************************************/
	var strCd		= $('#prventiveCheckNoticePop').PopAppGetData().strCd;
	var aspCompCd	= $('#prventiveCheckNoticePop').PopAppGetData().aspCompCd;
	
	return {
        init: function () {
        	
    		fnPreventiveCheckViewContent();
        	
	    }
    };
    
    
    function fnPreventiveCheckViewContent(){
    	$.ajax({
    		url		: "/ctrl/preventiveCheck/preventiveCheckDetail/noticeContent",
    		data	: {
    			"strCd"		:	strCd,
    			"aspCompCd"	:	aspCompCd
    			},
    		type 	: "POST",
    		success : function(result){
    			if(!result.dt_grid[0]){
    				alert("예방점검 유의사항 내용이 없습니다. ");
    				$("#prventivecheckNoticePop").paragonClosePopup();
    			}else{
        			var getData = result.dt_grid;
        			var contents = '';
        			var idx = 1;
        			$.each(getData, function(index, value){
        				index += idx;
        				contents += '<p>'+index+'. '+value.PRD_TYPE_NM+'</p>'
        						+ '<p>'+value.CONTENT+'</p>';	
        			});
        			$('#preventiveCheckNoticeContent').prepend(contents);
    			}
    		}
    	});
    }
    
}();

$(document).ready(function() {
	PreventiveCheckViewApp.init();
});


