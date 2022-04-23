/** Copyright (c) 2016 VertexID RND, Inc.
 * 
 * Application Name : 사용자 관리 [aspCompanyApp]
 * Program Code     : PC0028
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Han Seong Jin 	2017. 02. 27.  		First Draft.
 */
var AspCompanyApp = function () {
	"use strict";
	
	/************************************************
	 *전역 객체 선언부 (return 상위부분에 선언해야함)
	 ************************************************/
	
	// [El]사용자 그리드
	var $aspCompanyGrid = $("#aspCompanyGrid");

	return {
        init: function () {
        	//사용자 Grid생성
        	fnListAspCompany();

        	//사용자 이벤트
        	fnAspCompanyEvents();

        	//LDCC 파트너사 사용으로 등록버튼 삭제
        	$('#aspCompanyInsertBtn').remove();
        	
        	$('#aspCompanyNm').combobox();
        	MMSUtil.fnMaMakePartnerCombo($('#aspCompanyNm'),'','');
        	
	    }
    };
	
    //[Fn] 사용자이벤트
    function fnAspCompanyEvents(){
    	//검색폼 사용자아이디 엔터키 이벤트
    	$("#aspCompanyCd, #aspCompanyNm").enterEvent({
    		callBack:function(value){
    			var aspCompNm = $("#aspCompanyNm option:selected").text();
    			if(aspCompNm == "선택"){
    				aspCompNm = "";
    			}
    			
    			var data = {
    					aspCompCd : $("#aspCompanyCd").val(),
    					aspCompNm : aspCompNm
    					};
    			$aspCompanyGrid.search(data);
    		}
    	})
    	//검색 버튼
    	$("#aspCompanySearchBtn").click(function(){
    		fnSearchListAspCompany();
    	});
    	//수정 버튼
    	$("#aspCompanyModifyBtn").click(function(){
    		var aspCompCd = $aspCompanyGrid.getRow().ASP_COMP_CD;
    		
    		if(!aspCompCd){
    			alert("수정할 파트너사를 선택하세요.");
    			return;
    		}
    		
    		fnSaveAspCompany("UPDATE", aspCompCd);
    	});
    	//등록 버튼
    	$("#aspCompanyInsertBtn").click(function(){
    		fnSaveAspCompany("INSERT");
    	});
    	
    }
    
    function fnSearchListAspCompany(){
    	var aspCompNm = $("#aspCompanyNm option:selected").text();
		if(aspCompNm == "선택"){
			aspCompNm = "";
		}
   		var data = {
   				aspCompCd : $("#aspCompanyCd").val(),
   				aspCompNm : aspCompNm
   		};
   		
   		$aspCompanyGrid.search(data);
    }
    
    /********************************************************************
     * 파트너사 그리드 생성
     * Since   : 2016-11-16
     * 작성자  : Han Seong Jin
     * 수정내역: 
     ********************************************************************/
    //[Fn] 파트너사 그리드 생성 
    function fnListAspCompany() {
    	$aspCompanyGrid.paragonGrid({
    		url : '/ctrl/asp/company/listAspCompany',
    		rowNum : 15,
    		sortable : true,
    		rowEditable : true,
    		colNames:["파트너사코드","파트너사명","대표자","사업자번호","관리자","연락처","작성자","작성일"],
    		colModel:[
    		          {name:'ASP_COMP_CD' , align:"center"},
    		          {name:'ASP_COMP_NM' , align:"center"},
    		          {name:'ASP_CEO_NM', align:"center"},
		              {name:'ASP_CORP_NUM',align:"center"},
		              {name:'ASP_USER_NM',align:"center"},
		              {name:'PHONE',align:"center"},
    		          {name:'IN_USER_ID', align:"center"},
    		          {name:'IN_DT', align:"center", sortable:false}
    		         ],
    		caption : "파트너사 목록",
    		ondblClickRow : function(){
    	    	var aspCompCd = $aspCompanyGrid.getRow().ASP_COMP_CD;
    	    	
    	    	if(!aspCompCd){
    	    		alert("파트너사를 선택해 주세요.");
    	    	}else{
    	    		PopApp.paragonOpenPopup({
    	    			ajaxUrl: '/ctrl/asp/company/viewAspPop',
    	    			data:{'aspCompCd':aspCompCd},
    	    			id: 'modalAspCompanyViewPop',
    	    			width: '600px',
    	    			title:'파트너사 상세보기',
    	    		});
    	    	}
    		},
    		pager:"aspCompanyGridNavi",
    	})
    }
    
    //[Fn] 파트너사 저장 팝업 
    function fnSaveAspCompany(flag,aspCompCd){
		PopApp.paragonOpenPopup({
			ajaxUrl: '/ctrl/asp/company/saveAspPop',
			data:{flag:flag, aspCompCd:aspCompCd},
			id: 'modalAspCompanySavePop',
			width: '600px',
			btnName:"저장",
		});
    }
    
    
}();

$(document).ready(function() {
	AspCompanyApp.init();
});
