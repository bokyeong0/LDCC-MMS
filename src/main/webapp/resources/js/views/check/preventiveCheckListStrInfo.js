/** Copyright (c) 2017 VertexID RND, Inc.
 * 
 * Application Name : 예방점검목록 점포상세보기[StandardDepartmentApp]
 * Program Code     : 
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * MINE 김선호		2018. 1.  4. 		First Draft.        javascript
 */

var PreventiveCheckStrInfoViewApp = function (modal) {
	"use strict";
	
	/************************************************
	 *전역 객체 선언부 (return 상위부분에 선언해야함)
	 ************************************************/
	
	var $preventiveCheckListStrInfoGrid = $("#preventiveCheckListStrInfoGrid"); //자산내역
	
	var sendData = $('#viewPreventiveCheckStrInfoPopup').PopAppGetData();
	
	var fileNm = '';
	var filePath = '';
	var mngSignNm = '';
	var mngSignPath = '';
	var engrSignNm = '';
	var engrSignPath = '';
	
	// [Data]그룹코드 유형 콤보박스 데이터
	var obsFlagSelect;
	
    return {
        init: function () {
        	
        	//장애여부SELECTBOX
        	fnObsFlagSelectBox();
        	
        	//예방점검 점포정보
        	fnPreventiveCheckStrInfo();
        	
	    	//예방점검 점포별 상세점검리스트
        	fnPreventiveCheckStrInfoList();
	    	
	    	fnAssetManagerViewEvents();
	    	
	    }
    };
    
	function returnDate(date){
		return date.getFullYear() +"-"+date.getMonth() +"-"+ date.getDate();
	}
	
	function fnPreventiveCheckStrInfo(){
		console.log(sendData);
		$.ajax({
			url		: '/ctrl/preventiveCheck/preventiveCheckList/getPreventiveCheckStrInfo',
			data: {	
				"checkSeq"	:	sendData.CHECK_SEQ
				},
			type: 'POST',
			success: function (result) {	 
				result = result.dt_grid[0];
				$('#prventiveCheckStrInfoViewAspCompNm').text(result.ASP_COMP_NM);
				$('#prventiveCheckStrInfoViewCompNm').text(result.COMP_NM);
				$('#prventiveCheckStrInfoViewBrndNm').text(result.BRND_NM);
				$('#prventiveCheckStrInfoViewStrNm').text(result.STR_NM);
				$('#prventiveCheckStrInfoViewAreaNm').text(result.AREA_NM);
				
				fileNm = result.ATTACH_NM;
				filePath = result.ATTACH_PATH;
				mngSignNm = result.MNG_SIGN_NM;
				mngSignPath = result.MNG_SIGN_PATH;
				engrSignNm = result.ENGR_SIGN_NM;
				engrSignPath = result.ENGR_SIGN_PATH;
				
				console.log(filePath);
			}
		})	

	}
	
    //자산 목록
    function fnPreventiveCheckStrInfoList(){
    	$preventiveCheckListStrInfoGrid.paragonGrid({
        	url			: 	'/ctrl/preventiveCheck/preventiveCheckList/getPreventiveCheckStrInfoList',
        	postData	:	{
							"checkSeq"	:	sendData.CHECK_SEQ
        					},
        	width		:	"1200px",
			sortable	: 	true,
			rownumbers: true,
			rowNum : 10,
			colNames : ["자산번호","점포코드", "품목코드", "첨부VIEW경로","관리자서명VIEW경로","엔지니어서명VIEW경로",
			            "제품범주", "제품군", "제조사", "모델명", "SPEC", "엔지니어이름", "점검일시", "정상유무", "메모"],
			colModel : [ 
	            {name : 'AST_SEQ', hidden : true}, 						//자산번호
	            {name : 'STR_CD', align:"center", hidden : true},		//점포코드
	            {name : 'PRD_CD', align:"center", hidden : true},		//품목코드
	            {name : 'ATTACH_VIEW_PATH', align:"center", width:"200px", hidden : true},					//첨부파일경로
	            {name : 'MNG_SIGN_VIEW_PATH', align:"center", width:"200px", hidden : true},					//첨부파일경로
	            {name : 'ENGR_SIGN_VIEW_PATH', align:"center", width:"200px", hidden : true},					//첨부파일경로
	            {name : 'PRD_TYPE_LV1', align:"center", width:"100px"},				//제품범주  
	            {name : 'PRD_TYPE_LV2', align:"center", width:"100px"},				//제품군
	            {name : 'PRD_TYPE_LV3', align:"center", width:"100px"},				//제조사  
	            {name : 'PRD_NM', align:"center", width:"200px"},						//모델명
	            {name : 'PRD_SPEC', align:"center", width:"150px"},					//제품규격
	            {name : 'ENGR_NM', align:"center", width:"100px"},		//엔지니어이름
	            {name : 'CHECK_DT', align:"center", width:"150px"},					//점검일시
	            {name : 'OBS_YN', align:"center", width: "100px",
	            	edittype:'select',
	            	formatter:'select',
			    	editoptions: {
			    		value : obsFlagSelect
			    	}
	            },         					//정상유무
	            {name : 'OBS_MEMO', align:"center"},	
			],
            pager: "#preventiveCheckListStrInfoGridNavi",
            domainId : "예방점검 점포별 점검내역"
        });
	}
    
    function fnObsFlagSelectBox(){
    	$.ajax({
    		url : "/ctrl/preventiveCheck/preventiveCheckDetail/getPrventiveCheckObsFlag",
    		type : "POST",
    		dataType : "json",
    		cache: false,
    		async:false,
    		success : function(result) {
    			obsFlagSelect = Util.MakeGridOptions(result);
			}
    	});
    }
    
    //[Fn] 이벤트 
    function fnAssetManagerViewEvents(modal){
    	$('#prventiveCheckStrInfoViewAttachDownBtn').click(function(){
     		
			var webPath = filePath;
			var webName = fileNm;
    		
    		if(webPath == undefined){
    			alert('첨부파일이 없습니다.');
    			return false;
    		}else{
    			alert('첨부파일이 있습니다.');
    		}

    	});
    	
    	$('#prventiveCheckStrInfoViewMngSignDownBtn').click(function(){
    		
			var webPath = mngSignPath;
			var webName = mngSignNm;
    		
    		if(webPath == ''){
    			alert('관리자서명이 없습니다.');
    			return false;
    		}else{
    			fnSignViewPopup(webPath, webName);
    		}
    	});

    	$('#prventiveCheckStrInfoViewEngrSignDownBtn').click(function(){
    		
			var webPath = engrSignPath;
			var webName = engrSignNm;
    		
    		if(webPath == ''){
    			alert('엔지니어서명이 없습니다.');
    			return false;
    		}else{
    			fnSignViewPopup(webPath, webName);
			}
//			$("#callObsStsSignFileAdd").paragonClosePopup();
    	});
    }
    
    function fnSignViewPopup(webPath, webName){
		var form = $("<div/>");
		var viewForm = $("<div />",{id:"signSaveFilePrevView","class":"min-height-200 p-5"});
		viewForm.append('<img src="'+webPath+'" data-img="'+webPath+'" alt="'+webName+'" class="superbox-img" />')
		form.append(viewForm);
		
		PopApp.paragonOpenWindow({
			id : 'prventiveCheckStrInfoSignView',
			width : '500px',
			title : "서명확인",
			body:form,
			onload : function(modal) {
				modal.show();
			}
		
		});
//		$("#callObsStsSighFileNmView").html(webName+" ");
//		$("#callObsStsSighFileNmView").append(prevBtn);
		
		
    }
    
    function fnDtNullCheck(dtData){ //MariaDb Date null
    	if(dtData == null || dtData == '0000-00-00' || dtData == '1000-01-01' || dtData == '0002-11-30'){
    		dtData = '';
    	}
    	return dtData;
    }
    
    //null체크
    function fnIsNull(strData) {
    	if ( strData == null)
    		return "";

    	return strData; 
    }
    
}();

$(document).ready(function() {
	PreventiveCheckStrInfoViewApp.init();
});
