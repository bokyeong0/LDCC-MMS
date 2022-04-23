/** Copyright (c) 2017 VertexID RND, Inc.
 * 
 * Application Name : 예방점검목록[preventiveCheckLIst]
 * Program Code     : PC0701
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * MINE 김선호		2017. 12. 12. 		First Draft.        javascript
 */
var PreventiveCheckListApp = function () {
	"use strict";
	
	/************************************************
	 *전역 객체 선언부 (return 상위부분에 선언해야함)
	 ************************************************/
	
	// [El]권역정보 그리드
	var $preventiveCheckListGrid = $("#preventiveCheckListGrid");
	var userInfo = Util.getUserInfo();
	var aspCompCd = userInfo.s_companyCd;
	var userType = userInfo.s_userType;
	var compCd = '';

	return {
        init: function () {
        	
        	//예방점검목록 이벤트
        	fnPreventiveCheckListEvents();
        	
        	//예방점검목록 그리드
        	fnListPreventiveCheckList();
        	
        	fnGetCompNameList(); //고객사
        	fnGetAspCompNameList(); //파트너사
	    }
    };
    
    function setData(){
    	var sendData = {
    			startDt		:	$('#preventiveCheckListStartDt').val(),
    			endDt		:	$('#preventiveCheckListEndDt').val(),
    			compCd		:	$('#preventiveCheckListCompNm').val(),
    			brndCd		:	$('#preventiveCheckListBrndNm').val(),
    			strCd		:	$('#preventiveCheckListStrNm').val(),
    			aspCompCd	:	$('#preventiveCheckListAspCompNm').val()
    	};
    	
    	sendDataValidation(sendData);
    	
    	return sendData;
    }
    
    function sendDataValidation(sendData){
    	//Validation, 필수값체크
    	if($.trim(sendData.startDt).length == 0){
    		alert("점검일을 입력해 주세요.");
    		$("#preventiveCheckListStartDt").focus();
    		return false;
    	}
    	//Validation, 필수값체크
    	if($.trim(sendData.endDt).length == 0){
    		alert("점검일을 입력해 주세요.");
    		$("#preventiveCheckListEndDt").focus();
    		return false;
    	}
    }
    

    
	function fnPreventiveCheckListEvents(){
		
		//달력 (datePicker 옵션)
		$('#preventiveCheckListStartDt, #preventiveCheckListEndDt').datepicker({ 
			todayHighlight: true,  
			autoclose: true,
		});
		//점검일자 조회조건
		$('#preventiveCheckListStartDt').datepicker("setDate", new Date());
		$('#preventiveCheckListEndDt').datepicker("setDate", new Date());
		
		//검색
		$('#preventiveCheckListSearchBtn').click(function(){
			fnPreventiveCheckListSearch();
		});
		
		//엑셀다운로드
		$('#preventiveCheckListDownloadExcel').click(function(){
			$preventiveCheckListGrid.downloadExcel();
		});
		
    	//유의사항 등록
		$('#preventiveCheckListNoticeNewBtn').click(function(){
			fnPreventiveCheckListNoticeBtn();
		});
		
       	//브랜드 조회
    	$("#preventiveCheckListBrndNm").combobox();
    	//고객사 선택시 브랜드 조회
    	$("#preventiveCheckListCompNm").change(function(){
        	compCd = $(this).val();
    		MMSUtil.fnMakeBrndCombo($("#preventiveCheckListBrndNm"), $(this).val(), '', '선택');
    	});
    	
       	//점포 조회
    	$("#preventiveCheckListStrNm").combobox();
    	//고객사 및 브랜드 선택시 점포 조회
    	$("#preventiveCheckListBrndNm").change(function(){
    		MMSUtil.fnMakeStrCombo($("#preventiveCheckListStrNm"), compCd, $(this).val(), '선택');
    	});
		
		//=> 서비스리포트 다운로드
		$("#preventiveCheckListServiceReportDownloadExcel").click( function () {
			fnServiceReportExcelDownload();
		});
    	
	}
	
	function fnPreventiveCheckListSearch(){
		var sendData = setData();
		
		$preventiveCheckListGrid.paragonGridSearch(sendData);
	};
	
    //[Fn] 이벤트 
 
    /********************************************************************
     * 자산관리 그리드 생성
     * Since   : 2017-11-15
     * 작성자  : 김 선호
     * 수정내역: 
     ********************************************************************/
    //[Fn] jqgrid 예방점검 목록 
    function fnListPreventiveCheckList(){
    	$preventiveCheckListGrid.paragonGrid({
        	url			: '/ctrl/preventiveCheck/preventiveCheckList/getPreventiveCheckList',
//        	rowEditable:true,
			sortable	: true,
			rownumbers	: true,
			shrinkToFit	: false,
			rowNum : 15,
			rowList : [15, 30, 100, 500, 1000],
			reportExcelBtn: true,
            postData: {
					startDt 		: $('#preventiveCheckListStartDt').val(),
					endDt 			: $('#preventiveCheckListEndDt').val()
            	},
			caption		:"예방점검목록",
			colNames 	: [
			            "고객사","브랜드", "점포명", "지역", "점검일자","점검자이름","파트너사명", "점검파일유무", "엔지니어서명유무", "담당자서명유무",
			            "부서코드","고객사코드","브랜드코드","점포코드", "파트너사코드", "점검자아이디", "점검번호" //엑셀다운로드 포함형식은 HIDDEN 이 맨뒤에 위치
			            ],
			colModel : [
	            {name : 'COMP_NM', align:"center"},  
	            {name : 'BRND_NM', align:"center"},
	            {name : 'STR_NM', align:"center"},
	            {name : 'AREA_NM', align:"center", width:"100px"},
	            {name : 'CHECK_DT', align:"center"},
	            {name : 'ENGR_NM', align:"center"},
	            {name : 'ASP_COMP_NM', align:"center"},
	            {name : 'ATTACH_YN', align:"center"},
	            {name : 'ENGR_SIGN_YN', align:"center"},
	            {name : 'MNG_SIGN_YN', align:"center"},          
				{name : 'AREA_CD', align:"center", hidden : true},
	            {name : 'COMP_CD', align:"center", hidden : true},
	            {name : 'BRND_CD', align:"center", hidden : true},
	            {name : 'STR_CD', align:"center", hidden : true},
	            {name : 'ASP_COMP_CD', align:"center", hidden:true},
	            {name : 'ENGR_ID', align:"center", hidden : true},
	            {name : 'CHECK_SEQ', align:"center", hidden : true}
			],
            pager		: "#preventiveCheckListGridNavi",
            domainId 	: "예방점검 점포별 점검내역",
			ondblClickRow:function(id, iRow, iCol, e){
				
            	var checkSeq = $preventiveCheckListGrid.getRowData( id ).CHECK_SEQ;
            	var strCd = $preventiveCheckListGrid.getRowData( id ).STR_CD;

            	var sendData = {
        				"CHECK_SEQ"		:	checkSeq,
        				"STR_CD"		:	strCd
        				};
            	
            	PopApp.paragonOpenPopup({
            		ajaxUrl	: '/ctrl/preventiveCheck/preventiveCheckList/viewPreventiveCheckStrInfoPopup',
            		data	: sendData,
            		id		: 'viewPreventiveCheckStrInfoPopup',
            		width	: '1200px',	    		
            		btnName	: "점검 상세 보기",
//            		visible: true, //기본값 false :바로 활성화  TODO 사용설명서 명시해야함
            		title 	: "점검 상세정보",
            		onload	: function(modal){
                        App.setElIds();
            			modal.show();
            		}
        		});
			}
        });
	}
    
    function fnPreventiveCheckListNoticeBtn(){
    	var sendData = {
    			"content" : 'content'
    	};
        PopApp.paragonOpenPopup({
            ajaxUrl : '/ctrl/preventiveCheck/preventiveCheckList/noticeNew',
            data 	:	{sendData : sendData},
            id 		: 'prventivecheckListNoticeNewPop',
            width 	: '1000px',
            title 	: '예방점검 유의사항 등록',
            onload 	: function(modal) {
                modal.show();
            }
        });
    }
    
    //고객사 목록 조회
    function fnGetCompNameList(){
    	$('#preventiveCheckListCompNm').combobox();
    	MMSUtil.fnMakeCompCombo($('#preventiveCheckListCompNm'), '', '선택');
    }
    
    //파트너사 목록 조회
    function fnGetAspCompNameList(){
    	$("#preventiveCheckListAspCompNm").combobox();
    	MMSUtil.fnMakePartnerCombo($("#preventiveCheckListAspCompNm"), aspCompCd);
    	
    	if(userType == 2){
    		$('#preventiveCheckListAspCompNm_input, #preventiveCheckListAspCompNm_input + span').attr('disabled', true);
    	}
    }
    
    function fnServiceReportExcelDownload() {
    	///ctrl/call/obstacle/receipt/serviceReportExcel, rcptSeq
    	var rowId = $preventiveCheckListGrid.jqGrid('getGridParam','selrow');
    	var checkSeq = $preventiveCheckListGrid.jqGrid('getCell',rowId,'CHECK_SEQ');
    	if (typeof checkSeq === 'undefined') {
    		alert("선택 된 항목이 없습니다.");
    		
    		return;
    	}
    	console.log("checkSeq : "+checkSeq);
    	var data = {
    			checkSeq : checkSeq
    	};
    	
		App.prcsStart();
		var jsonData = JSON.stringify(data);
		//console.log("jsonData" + jsonData);
		var request = new XMLHttpRequest();   // new HttpRequest instance 
		request.open("POST", "/ctrl/preventiveCheck/preventiveCheckList/serviceReportExcel", true);
		request.responseType = 'blob';
		request.setRequestHeader("Content-Type", "application/json");
		request.onload = function(e) {
			App.prcsEnd();
			 if (this.status === 200) {
				 var filename = "";
			        var disposition = request.getResponseHeader('Content-Disposition');
			        if (disposition && disposition.indexOf('attachment') !== -1) {
			            var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
			            var matches = filenameRegex.exec(disposition);
			            if (matches != null && matches[1]) {
			            	filename = decodeURIComponent(matches[1].replace(/['"]/g, ''));
			            }
			        }
		        var blob = this.response;
		        if(window.navigator.msSaveOrOpenBlob) {
		            window.navigator.msSaveBlob(blob, filename);
		        }
		        else{
		        	 var URL = window.URL || window.webkitURL;
		             var downloadUrl = URL.createObjectURL(blob);

		             if (filename) {
		                 // use HTML5 a[download] attribute to specify filename
		                 var a = document.createElement("a");
		                 // safari doesn't support this yet
		                 if (typeof a.download === 'undefined') {
		                     window.location = downloadUrl;
		                 } else {
		                     a.href = downloadUrl;
		                     a.download = filename;
		                     document.body.appendChild(a);
		                     a.click();
		                 }
		             } else {
		                 window.location = downloadUrl;
		             }

		             setTimeout(function () { URL.revokeObjectURL(downloadUrl); }, 100); // cleanup
		         }
		     }
		 };
		request.send(jsonData);

    }
    
    
}();

$(document).ready(function() {
	PreventiveCheckListApp.init();
});


