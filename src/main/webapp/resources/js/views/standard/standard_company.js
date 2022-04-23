/** Copyright (c) 2017 VertexID RND, Inc.
 * 
 * Application Name : 권역관리[StandardCompanyApp]
 * Program Code     : PC0101
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * MINE 한성진		2017. 3. 16. 		First Draft.        javascript
 */
var StandardCompanyApp = function () {
	"use strict";
	
	/************************************************
	 *전역 객체 선언부 (return 상위부분에 선언해야함)
	 ************************************************/
	
	// [El]권역정보 그리드
	var $standardCompanyGrid = $("#standardCompanyGrid");
	
    return {
        init: function () {
        	//권역정보관리 Grid생성
        	fnListCompany();
        	//권역정보관리 Event
        	fnCompanyEvents();
        	
        	//LDCC 고객사 사용으로 등록버튼 삭제
        	$('#standardCompanyInsertBtn').remove();
        	
        	$('#standardCompanyNm').combobox({inMode:true});
        	//MMSUtil.fnMakeCompCombo($('#standardCompanyNm'), '', '선택');
        	fnGetCompNameList();
	    }
    };
  //고객사 목록 조회
    function fnGetCompNameList(compCate){
    	$.ajax({
    		url : "/ctrl/standard/company/listMaCompName",
    		data : {"compCate":compCate},
    		type : "POST",
    		cache: false,
    		success : function(result) {
    			var result = result.dt_grid;
    			Util.MakeBootstrapSelectBox($('#standardCompanyNm'), result, "선택");
    		}
    	});
    }
    //[Fn] 이벤트 
    function fnCompanyEvents(){
    	//검색버튼
    	$("#standardCompanySearchBtn").click(function(){
    		fnSearchListCompany();
    	});
    	//회사 수정 버튼
    	$("#standardCompanyModifyBtn").click(function(){
    		fnModifyCompany();
    	});
    	//회사 등록 버튼
    	$("#standardCompanyInsertBtn").click(function(){
    		fnSaveCompany();
    	});
    	
    }
    
    //[Fn] 공통코드 SelectBox
    function fnListComboJson(target, groupId){
    	$.ajax({
    		url : "/ctrl/settings/system/code/listCodeGroupComboJson",
    		data :{codeGroupCd:groupId},
    		type : "POST",
    		dataType : "json",
    		cache: false,
    		success : function(result) {
    			Util.MakeSelectOptions(target, result);
    		}
    	});
    }
    
    //[Fn] 검색 조건 매핑
    function fnSearchListCompany(){
    	//그리드 수정 여부 체크
	   	var data = {
//				compCate : $("#standardCompanyCompCate").val(),
				compCd : $("#standardCompanyNm").val(),
		};
    	$standardCompanyGrid.search(data);
    }
    
    
    /********************************************************************
     * 회사정보관리 그리드 생성
     * Since   : 2016-10-24
     * 작성자  : Kim Jin Ho
     * 수정내역: 
     ********************************************************************/
    //[Fn] jqgrid 회사정보관리 목록 
    function fnListCompany(){
		$standardCompanyGrid.paragonGrid({
        	url: '/ctrl/standard/company/listCompany',
			sortable: true,
			colNames:['고객타입','고객사코드','고객사명','대표자명','대표전화','작성자','작성일'],
			colModel:[
    		          {name:'COMP_TYPE' , hidden:true},
    		          {name:'COMP_CD' ,align:"center", width:80},
    		          {name:'COMP_NM'},
    		          {name:'CEO_NM' , align:"center", width:100},
    		          {name:'PHONE_NUM' , align:"center", width:100},
    		          {name:'IN_USER_ID', align:"center", width:70},
    				  {name:'IN_DT', sortable : false, align:"center", width:70} 
    		  ],
    		caption : "고객사 목록",
    		pager: "standardCompanyGridNavi",
    		ondblClickRow: function(){
            	var rowId = $standardCompanyGrid.jqGrid('getGridParam','selrow');
            	var compCd = $standardCompanyGrid.jqGrid('getCell', rowId, 'COMP_CD');
            	
            	var sendData = {
        			"compCd"	: compCd	,
            	};
            	
            	if(rowId === null){
            		alert("수정할 고객사를 선택하세요.");
            	}else{
        	    	PopApp.paragonOpenPopup({
        	    		ajaxUrl: '/ctrl/standard/company/viewCompanyPop',
        	    		data:{"sendData":sendData},
        	    		id: 'modalStandardCompanyViewPop',
        	    		width: '750px',
        	    		title:"고객사 상세보기",
        	    	});
            	}
            }
        });
	}
    
    //[Fn] 회사 등록 팝업 
    function fnSaveCompany(){
    	PopApp.paragonOpenPopup({
			ajaxUrl: '/ctrl/standard/company/saveCompanyPopup',
			id: 'modalStandardCompanySavePopup',
			width: '700px',
			btnName:"저장",
			title:"고객사등록",
			onload:function(modal){
	            modal.show();
			}
		});
    }
    //[Fn] 회사 수정 팝업 
    function fnModifyCompany(){
    	var rowId = $standardCompanyGrid.jqGrid('getGridParam','selrow');
    	var compCate = $standardCompanyGrid.jqGrid('getCell', rowId, 'COMP_CATE');
    	var compType = $standardCompanyGrid.jqGrid('getCell', rowId, 'COMP_TYPE');
    	var compCd = $standardCompanyGrid.jqGrid('getCell', rowId, 'COMP_CD');
    	
    	var sendData = {
			"compCate"	: compCate	,
			"compType"	: compType	,
			"compCd"	: compCd	,
    	};
    	
    	if(rowId === null){
    		alert("수정할 행 선택");
    	}else{
	    	PopApp.paragonOpenPopup({
	    		ajaxUrl: '/ctrl/standard/company/modifyCompanyPopup',
	    		data:{"sendData":sendData},
	    		id: 'modalStandardCompanyModifyPopup',
	    		width: '700px',
	    		btnName:"수정",
	    		title:"고객사 수정"
	    			,
				onload:function(modal){
		            modal.show();
				}
	    	});
    	}
    }
    
    
}();

$(document).ready(function() {
	StandardCompanyApp.init();
});
