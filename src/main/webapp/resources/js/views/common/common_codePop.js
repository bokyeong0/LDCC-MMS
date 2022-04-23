/** Copyright (c) 2016 VertexID RND, Inc.
 * 
 * Application Name : 공통코드 관리[SystemCodeApp]
 * Program Code     : PC0003
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Kim Jin Ho  		2016. 10. 24.  		First Draft.
 */
var CommCodePopApp = function () {
	"use strict";
	
	/************************************************
	 *전역 객체 선언부 (return 상위부분에 선언해야함)
	 ************************************************/

	// [El]공통코드 그리드
	var $commCodePopGrid = $("#commCodePopGrid");
	
	// [Data]그룹코드 유형 콤보박스 데이터
	var codeGroupComboJson;
	
	var codeGroupCd = $("#modalSystemCommCodePop").PopAppGetData().codeGroupCd;
	
    return {
        init: function () {
        	//공통코드 Grid생성
        	fnListCode();
        	
        	//공통코드 이벤트
        	fnCodePopEvents();
	    }
	    
    };
    
	//[Fn] 공통코드이벤트 
    function fnCodePopEvents(){
    	//검색폼 공통코드명 엔터키 이벤트
    	$("#commCodePopCd, #commCodePopNm").enterEvent({
    		callBack:function(value){
    			//그리드 수정 여부 체크
//    			if(fnModCheck($commCodePopGrid)){
    				var data = {
    						codeGroupCd : codeGroupCd,
    						codeCd : $("#commCodePopCd").val(),
    						codeNm : $("#commCodePopNm").val()
    				};
    				$commCodePopGrid.paragonGridSearch(data);
//    			}
    		}
    	});
    	
    	
    	//공통코드 검색버튼
    	$("#commCodePopSearchBtn").click(function(){
    		fnSearchListCommCode();
    	});
    	//공통코드 행추가버튼
    	$("#commCodePopAddRowBtn").click(function(){
    		$commCodePopGrid.appendRow();
    	});
    	//공통코드 행삭제버튼
    	$("#commCodePopDelRowBtn").click(function(){
    		$commCodePopGrid.rowDel();
    	});
    	//공통코드 저장버튼
    	$("#commCodePopSaveRowBtn").click(function(){
    		fnSaveCodeRows();
    	});
    }
    
    /********************************************************************
     * 공통코드(상세 코드 목록) 그리드 생성
     * Since   : 2016-10-24
     * COMP_ID : CP0008
     * 작성자  : Kim Jin Ho 
     * 수정내역: 
     ********************************************************************/
    //[Fn] 공통코드 그리드 생성
    function fnListCode(){
    	$commCodePopGrid.paragonGrid({
        	url: '/ctrl/settings/system/code/listCode',
        	postData:{"codeGroupCd" : codeGroupCd},
			rowEditable:true,
			height: 300,
    		rowNum: 10,
//    		loadonce:true,
    		scroll: 1,
            colModel:[
                {name:'CODE_SEQ',hidden:true},
                {name:'CODE_CD', align:"center", readonly:true },
                {editable: true, name:'CODE_NM', align:"center"},
                {editable: true, name:'CODE_DESC',width:220},
                {editable: true, name:'CODE_ORDER', align:"center",width:120},
            ],
//            pager: "#commCodePopGridNavi",
            caption: "공통코드 목록",
            rowspan:true,
        });
	}
    //[Fn] 공통코드 수정된 내용저장
    function fnSaveCodeRows() {
    	
    	//ParamsData Key : GridData Key 
    	var parseCamelData = { 
    			modFlag		 : "MOD_FLAG",
    			codeSeq		 : "CODE_SEQ",
    			codeNm		 : "CODE_NM",
    			codeDesc	 : "CODE_DESC",
    			codeOrder	 : "CODE_ORDER",
		}
    	
    	// 그리드에서 저장이 필요한 데이터만 가져옴
    	var jsonData = $commCodePopGrid.getJsonData("dt_codePop",parseCamelData);
    	if(!jsonData){
    		alert("변경된 데이터가 없습니다.");
    		return;
    	}
    	
    	var objData = $.parseJSON(jsonData);
    	
    	var jsonData = {
    			"dt_codePop" : objData.dt_codePop,
    			"codeGroupCd": codeGroupCd,
    			"useYn"		 : "Y",
    	}
    	
    	$.ajax({
    		url : "/ctrl/settings/system/code/saveCode",
    		data :JSON.stringify(jsonData),
    		contentType: 'application/json; charset=utf-8',
    		success : function(result) {
    			alert(result.msgTxt);
    			$commCodePopGrid.paragonGridReload();
    		}
    	});
    }
    
    //[Fn] 공통코드 검색 조건 조회
    function fnSearchListCommCode(){
   		var data = {
   				codeGroupCd : codeGroupCd,
				codeCd : $("#commCodePopCd").val(),
				codeNm : $("#commCodePopNm").val()
		};
   		//그리드 조회
   		$commCodePopGrid.paragonGridSearch(data);
    }
}();

$(document).ready(function() {
	CommCodePopApp.init();
});
