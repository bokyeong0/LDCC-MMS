/** Copyright (c) 2017 VertexID RND, Inc.
 * 
 * Application Name : 콜센터 장에 등록[ObstacleReceiptApp]
 * Program Code     : PC0101
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * 김진호			2017. 3. 16. 		First Draft.        javascript
 */

var ObsRcptStsHistApp = function () {
	"use strict";
	
	// [El]자산정보 그리드
	var $callObsHistGrid = $("#callObsHistGrid");
	var userInfo = Util.getUserInfo();
	var compCd = userInfo.s_compCd;
	var tabData = $("#main-tab-id-84").getTabData();
	var defSearch = tabData.dafaultSearch;
	var userInfo = Util.getUserInfo();
	var getEngr = null;
	var todayDate = new Date(Util.LocalDate());
    return {

        init: function () {
        	//이벤트 생성
        	fnObsStatusEvent();
        	//그리드 생성
        	if(defSearch){
        		$("#callObsStsHistRcptDateStartSearch").val(tabData.sdate);
            	$("#callObsStsHistRcptDateEndSearch").val(tabData.edate);
//            	$("#callObsStsHistCompSearch").val(tabData.compCd);
//            	$("#callObsStsHistBrndNmSearch").val(tabData.brndCd);
        	}
//        	var postData ={
//        		stsCompSearch:tabData.compCd,
//        		strBrndNmSearch:tabData.brndCd,
//        		stsStartDateSearch:tabData.sdate,
//        		stsEndDateSearch:tabData.edate,
//        		cntFlag:tabData.cntFlag,
//        	};
//        	
//        	if(compCd){
//        		postData.stsCompSearch = compCd;
//        	}
        	fnObsStsMakeGrid();
	    },
	    reload:function(reloadData){
	    	var sdate = reloadData.sdate;
	    	var edate = reloadData.edate;
	    	var cntFlag = reloadData.cntFlag;
	    	var compCd = tabData.compCd;
	    	var brndCd = tabData.brndCd;
	    	$("#callObsStsHistRcptDateStartSearch").val(sdate);
        	$("#callObsStsHistRcptDateEndSearch").val(edate);
        	$("#callObsStsHistCompSearch").val(compCd);
        	$("#callObsStsHistBrndNmSearch").val(brndCd);
	    	var postData ={
	        		stsCompSearch:tabData.compCd,
	        		strBrndNmSearch:tabData.brndCd,
	        		stsStartDateSearch:tabData.sdate,
	        		stsEndDateSearch:tabData.edate,
	        		cntFlag:tabData.cntFlag,
	    	};
	    	$callObsHistGrid.search(postData);
	    }
    };
    
    
    //[Fn] 이벤트 
    function fnObsStatusEvent(){
  
    	$("#callObsStsHistRcptDateStartSearch, #callObsStsHistRcptDateEndSearch").datepicker({todayHighlight: true, autoclose: true,clearBtn:true});
    	todayDate.setDate (todayDate.getDate() -30);
    	$("#callObsStsHistRcptDateStartSearch").datepicker("setDate", todayDate);
    	$("#callObsStsHistRcptDateEndSearch").datepicker("setDate", Util.LocalDate());
    	
    	
    	$("#callObsStsHistLv4Search").combobox({inMode:true});
		
    	//장애분류  Lv4 콤보박스 생성
    	$("#callObsStsHistEngrSearch").combobox({inMode:true});
    	
		//고객사선택
		$("#callObsStsHistCompSearch").change(function(){
			$("#callObsStsHistBrndNmSearch").html("<option value=''>브랜드명</option>");
			$("#callObsStsHistStrNmSearch").val("");	
			fnGetBrndNameList($(this).val());
		});
    	
		//브랜드선택
		$("#callObsStsHistBrndNmSearch").change(function(){
			$("#callObsStsHistStrNmSearch").val("");	
    		var compCd = $("#callObsStsHistCompSearch").val();
    		var brndCd = $("#callObsStsHistBrndNmSearch").val();
    		//fnListAutoStrNm(compCd, brndCd);
    		MMSUtil.fnMakeStrCombo($("#callObsStsHistStrNmSearch"), compCd, brndCd, '선택');
    		$("#callObsStsHistStrNmSearch").data('combobox').refresh();
		});
		
    	//권역 콤보박스 생성 [파트너사 지정]
	   	(userInfo.s_userType == 2)? $("#obsRctStsHistPaterSearch").attr('disabled','true'):"";		
    	MMSUtil.fnMakePartnerCombo($("#obsRctStsHistPaterSearch"),userInfo.s_companyCd);
    	//$("#callObsStsPartSearch").combobox({inMode:true,searchMode:true});
    	//권역 콤보박스 생성 [파트너사 지역 정보]
    	if(userInfo.s_authSeq != "200" && userInfo.s_areaCd){
    		$("#callObsStsHistPartSearch").prop('disabled','disabled');
    	}
    		
    	MMSUtil.fnMakeAreaCombo($("#callObsStsHistPartSearch"), userInfo.s_areaCd, userInfo.s_companyCd);
    	
  
    	$("#callObsStsHistEngrSearch").combobox({inMode:true});  //담당엔지니어 자동완성
    	MMSUtil.fnMakeEngrCombo($("#callObsStsHistEngrSearch"),{areaCd:userInfo.s_areaCd, aspCompCd:userInfo.s_companyCd},"");  //담당엔지니어

    	$("#callObsRcptHistWriterNmSearch").combobox({inMode:true});  //접수자 자동완성
    	MMSUtil.fnMakeEngrCombo($("#callObsRcptHistWriterNmSearch"),{areaCd:userInfo.s_areaCd, aspCompCd:userInfo.s_companyCd},"");  //접수자		
    	
    	//부서 변경 
		$("#obsRctStsHistPaterSearch").change(function(){  	
			var selectVal = $(this).val();
			MMSUtil.fnMakeAreaCombo($("#callObsStsHistPartSearch"),'', selectVal);
			MMSUtil.fnMakeEngrCombo($("#callObsStsHistEngrSearch"),{areaCd:'', aspCompCd:selectVal});
			MMSUtil.fnMakeEngrCombo($("#callObsRcptHistWriterNmSearch"),{areaCd:'', aspCompCd:selectVal});
		});
    	
     	//엔지니어 변경
		$("#callObsStsHistPartSearch").change(function(){
			var selectVal = $(this).val();
			MMSUtil.fnMakeEngrCombo($("#callObsStsHistEngrSearch"),{areaCd:selectVal, aspCompCd:$("#obsRctStsHistPaterSearch").val() });
			MMSUtil.fnMakeEngrCombo($("#callObsRcptHistWriterNmSearch"),{areaCd:selectVal, aspCompCd:$("#obsRctStsHistPaterSearch").val()});
		});


		
    	
    	//공통코드 콤보박스 생성(처리구분)
    	MMSUtil.fnMakeCommCombo($("#callObsStsHistType"),"OS0001","","전체");
		//검색시 (처리구분)
		MMSUtil.fnObsRcptAllotComboBox($("#callObsStsHistType2Search"),"OS0001","","other3");
		//검색시 (처리상태)		
		MMSUtil.fnObsRcptAllotComboBox($("#callObsStsHistTypeSearch"),"OS0001","",""); 
		
    	//공통코드 콤보박스 생성(유상구분)
    	MMSUtil.fnMakeCommCombo($("#callObsStsHistCostTypeSearch"),"OS0002","","전체");

    	//장애분류 이벤트
		MMSUtil.fnObsRcptComboRelay({
			compCdId 	 : "#callObsHistCompSearch",
			obsRcptLv1Id : "#callObsStsHistLv1Search",
			obsRcptLv2Id : "#callObsStsHistLv2Search",
			obsRcptLv3Id : "#callObsStsHistLv3Search",
			obsRcptLv4Id : "#callObsStsHistLv4Search",
			obsRcptPrdId : "#callObsStsHistPrdSearch",
		});
		
		
		
		//검색버튼
		$("#callObsStsHistSearchWebBtn").click(function(){
	    		fnObsStsGridSearch();
		});
		//접수번호 Site명 엔터 검색
		$("#callObsStsHistRcptNoSearch , #callObsStsHistStrNmSearch, #callObsStsHistSerialSearch").enterEvent({
    		callBack:function(value){
    			fnObsStsGridSearch();
    		}
    	});
		MMSUtil.fnMakeObjstacleLv1Combo($("#callStndStsHistLv1Search"),"","제품범주");
		
    	//=>제품범주 선택
        $("#callStndStsHistLv1Search").change(function(){
        	if(!$(this).val()) $("#callObsStsHistLv1Search").html('<option value="">제품군</option>');
        	else MMSUtil.fnMakeObsRcptCombo($("#callObsStsHistLv1Search"), "",$(this).val(), "", "제품군");
			$("#callObsStsHistLv2Search").html('<option value="">장애구분</option>');
	    	$("#callObsStsHistLv3Search").html('<option value="">장애유형</option>');
	    	$("#callObsStsHistLv4Search").html('<option value="">장애원인</option>');
	    	$("#callObsStsHistLv4Search").data('combobox').refresh();
			$("#callObsStsHistPrdSearch").html("<option value=''>모델명</option>");
        });
		
		
		//=> 엑셀조회 다운로드
		$("#callSearchHistDownloadExcel").click( function () {
			$callObsHistGrid.downloadExcel();
		});
		//=> 서비스리포트 다운로드
		$("#callObsStsHistDownloadExcel").click( function () {
			fnServiceReportExcelDownload();
		});
	
    	//고객사 콤보박스 생성
//		fnMakeSerchCompCombo();
		$("#callObsStsHistCompSearch").combobox({inMode:true});
		MMSUtil.fnMakeCompCombo($("#callObsStsHistCompSearch"), userInfo.s_compCd, '전체');
		
		$("#callObsStsHistStrNmSearch").combobox({inMode:true});
		MMSUtil.fnMakeStrCombo($("#callObsStsHistStrNmSearch"), '', '', '선택');
		
    	//검색시 (처리상태)
    	$("#callObsStsHistType2Search").change(function(){
    		console.log($(this).val());
    	 	MMSUtil.fnObsRcptAllotComboBox($("#callObsStsHistTypeSearch"),"OS0001",$(this).val(),"");  	 
    	});
    	
    }
    
    function fnServiceReportExcelDownload() {
    	///ctrl/call/obstacle/receipt/serviceReportExcel, rcptSeq
    	var rowId = $callObsHistGrid.jqGrid('getGridParam','selrow');
    	var rcptSeq = $callObsHistGrid.jqGrid('getCell',rowId,'RCPT_SEQ');
    	if (typeof rcptSeq === 'undefined') {
    		alert("선택 된 항목이 없습니다.");
    		
    		return;
    	}
    	console.log("rcptSeq : "+rcptSeq);
    	var data = {
    			rcptSeq : rcptSeq
    	};
    	
		App.prcsStart();
		var jsonData = JSON.stringify(data);
		//console.log("jsonData" + jsonData);
		var request = new XMLHttpRequest();   // new HttpRequest instance 
		request.open("POST", "/ctrl/call/obstacle/receipt/serviceReportExcel", true);
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
    
    // 장애 접수 검색
    function fnObsStsGridSearch(rowid) {
    	var stsRcptNoSearch 	= $("#callObsStsHistRcptNoSearch").val(); //접수번호
    	var stsDateTypeSearch   = $("#hist-date-search-type").val();   //기간검색유형
    	var stsStartDateSearch 	= $("#callObsStsHistRcptDateStartSearch").val(); //시작일
    	var stsEndDateSearch 	= $("#callObsStsHistRcptDateEndSearch").val();  //종료일
    	var stsType2Search 		= $("#callObsStsHistType2Search").val();  //처리구분
    	var stsTypeSearch 		= $("#callObsStsHistTypeSearch").val();  //처리상태    	
    	var stsCostTypeSearch 	= $("#callObsStsHistCostTypeSearch").val(); //유무상
    	var stsCompSearch 		= $("#callObsStsHistCompSearch").val(); //고객사명
    	var strObsBrndNmSearch  = $("#callObsStsHistBrndNmSearch").val();  //브랜드명
    	//var stsStrNmSearch 		= $("#callObsStsHistStrNmSearch").val(); //점포명
    	var stsStrCdSearch 		= $("#callObsStsHistStrNmSearch").val(); //점포명    	
    	var strObsRctPaterSearch  = $("#obsRctStsHistPaterSearch").val(); //파트너사
    	var strObsPartSearch    = $("#callObsStsHistPartSearch").val(); //담당부서
    	var stsEngrSearch       = $("#callObsStsHistEngrSearch").val(); //담당엔지니어
        var stsWriterSearch     = $("#callObsRcptHistWriterNmSearch").val(); //접수자
    	var stsStndLv1Search    = $("#callStndStsHistLv1Search").val(); //제품범주
    	var stsRcptLv1Search 	= $("#callObsStsHistLv1Search").val();  //품목군
    	var stsRcptLv2Search 	= $("#callObsStsHistLv2Search").val();  //장애구분
    	var stsRcptLv3Search 	= $("#callObsStsHistLv3Search").val();  //장애유형
    	var stsRcptLv4Search 	= $("#callObsStsHistLv4Search").val();  //장애원인
    	var stsRcptPrdSearch 	= $("#callObsStsHistPrdSearch").val();  //모델명

    	var stsSerialSearch     = $("#callObsStsHistSerialSearch").val();

    	
    	var searchData ={
    			stsRcptNoSearch 	: stsRcptNoSearch 	,
    			stsDateTypeSearch 	: stsDateTypeSearch , 	  
    			stsStartDateSearch 	: stsStartDateSearch, 	
    			stsEndDateSearch 	: stsEndDateSearch 	,
    			stsType2Search 		: stsType2Search 	,	
    			stsTypeSearch 		: stsTypeSearch 	,	
    			stsCostTypeSearch 	: stsCostTypeSearch ,	
    			stsCompSearch 		: stsCompSearch 	,
    			strBrndNmSearch     : strObsBrndNmSearch,    
    			strObsRctPaterSearch : strObsRctPaterSearch ,
    			strObsPartSearch    : strObsPartSearch  ,
    			stsEngrSearch       : stsEngrSearch     ,
    			stsWriterSearch     : stsWriterSearch   , 
    			stsStndLv1Search    : stsStndLv1Search  ,
    			stsRcptLv1Search 	: stsRcptLv1Search 	,
    			stsRcptLv2Search 	: stsRcptLv2Search 	,
    			stsRcptLv3Search 	: stsRcptLv3Search 	,
    			stsRcptLv4Search 	: stsRcptLv4Search 	,
    			stsRcptPrdSearch 	: stsRcptPrdSearch 	,
    			stsSerialSearch 	: stsSerialSearch 	,	
    			stsStrCdSearch      : stsStrCdSearch    ,
    	}
    	$callObsHistGrid.paragonGridSearch(searchData);
    	$callObsHistGrid.paragonGridClear();
    	if(rowid){
    		$callObsHistGrid.focusToRow(rowid);
    	}
    }
   
    function fnObsStsMakeGrid(){
    	$callObsHistGrid.paragonGrid({
			url : '/ctrl/call/obstacle/receipt/listObsRept',
			rowEditable : false,
			reportExcelBtn: true,
			sortable : true,
		//	postData : postData,
			postData : {
				stsDateTypeSearch:$("#hist-date-search-type").val(),   //기간검색유형 추가
				stsStartDateSearch:$("#callObsStsHistRcptDateStartSearch").val(),
				stsEndDateSearch:$("#callObsStsHistRcptDateEndSearch").val(),
				stsCompSearch:tabData.compCd,
        		strBrndNmSearch:tabData.brndCd,
        		cntFlag:tabData.cntFlag
				},			
			shrinkToFit: false,			
			rowList: [10, 20, 50,100],
			colNames :["접수번호","접수일시","고객사명","브랜드명","점포명","지역","신고자","접수내용","제품범주", "제품군", "모델명", "장애구분", "장애유형", "장애원인","처리내용","현장방문일시","경과 시간","처리상태","접수자","완료시간","파트너사","담당부서","담당엔지니어","유무상","금액","시리얼","RCPT_SEQ","STR_CD","AST_SEQ",],
			colModel : [ 
				{width:"90px",align:"center",name : 'RCPT_NO'},  //접수번호
				{width:"120px",align:"center",name : 'ACCEPT_DT'},   //접수일시
				{width:"110px",align:"center",name : 'COMP_NM'},   //회사명		
				{width:"110px",align:"center",name : 'BRND_NM'},   //브랜드명
				{width:"100px",align:"center",name : 'STR_NM'},     //점포명
				{width:"70px",align:"center",name : 'AREA_NM'},   //지역
				{width:"60px",align:"center",name : 'RCPT_CUST_NM'},   //신고자
				{width:"100px",align:"center",name : 'RCPT_CONT'},  //장애접수
				{width:"90px",align:"center",name : 'RCPT_STND_PRD_LV1_NM'},  //제품범주
				{width:"90px",align:"center",name : 'RCPT_OBS_LV1_NM'},  //제품군		
				{width:"90px",align:"center",name : 'PRD_NM'},  //모델명		
				{width:"90px",align:"center",name : 'RCPT_OBS_LV2_NM'},  //장애구분		
				{width:"90px",align:"center",name : 'RCPT_OBS_LV3_NM'},  //장애유형	
				{width:"90px",align:"center",name : 'RCPT_OBS_LV4_NM'},  //장애원인		
				{width:"100px",align:"center",name : 'RCPT_STS_CONT'},    //처리내용				
				{width:"120px",align:"center",name : 'RCPT_VISIT_DT'},   //현장방문일시
				{width:"110px",align:"right",name : 'RCPT_CMPL_DT',classes:"p-r-15"}, //경과 시간
				{width:"70px",align:"center",name : 'RCPT_STS_NM'},   //처리상태
				{width:"70px",align:"center",name : 'IN_USER_NM'},   //접수자
				{width:"120px",align:"center",name : 'RCPT_COMP_DT'},   //완료시간
				{width:"100px",align:"center",name : 'ASP_COMP_NM'},   //파트너사
				{width:"100px",align:"center",name : 'ASP_PART_NM'},   //담당부서
				{width:"90px",align:"center",name : 'RCPT_ENGR_NM'},   //담당엔지니어				
				{width:"90px",align:"center",name : 'RCPT_STS_COST_TYPE' },  //유무상
				{width:"90px",align:"center",name : 'RCPT_STS_COST' },  //금액									
				{width:"200px",align:"center",name : 'AST_SERIAL'},  //시리얼넘버
	            {align:"center",name : 'RCPT_SEQ',hidden:true}, 
	            {align:"center",name : 'STR_CD',hidden:true}, 
	            {align:"center",name : 'AST_SEQ',hidden:true}, 				
			],
			rownumbers : true,
			pager: "#callObsHistGridNavi",
			caption:"장애접수내역",
			ondblClickRow: function(id, iRow, iCol, e){
            	var rcptSeq = $callObsHistGrid.getRowData( id ).RCPT_SEQ;
            	var astSeq = $callObsHistGrid.getRowData( id ).AST_SEQ;
            	var strCd = $callObsHistGrid.getRowData( id ).STR_CD;
				PopApp.paragonOpenPopup({
					ajaxUrl : '/ctrl/call/obstacle/hist/obstacleHistoryRcptPopupMove',
					id : 'callObsStsHistRcptViewPopup',
					width : '1000px',
					data:{
						rcptSeq:rcptSeq,
						astSeq:astSeq,
						strCd:strCd,
						modFlag:"UPDATE"
					},
					title : "장애정보보기",
				});
			}
        });
    }
    
    function fnMakeSerchCompCombo() {
    	var asp_cd = $("#obsRctStsHistPaterSearch").val();
    	var part_cd = $("#callObsStsHistPartSearch").val();
    	var compCd = tabData.compCd;
		$.ajax({
			url : "/ctrl/standard/company/listAstComp",
			type : "POST",
			dataType : "json",
			data :{asp_cd : asp_cd , 
				   part_cd : part_cd
				  },
			cache : false,
			success : function(result) {
				var json = result.suggestions;
				var targetEl = $("#callObsStsHistCompSearch");
				targetEl.combobox({inMode:true});
				targetEl.html("");
				var option = $("<option value='' />");
				option.text("고객사명")
				targetEl.append(option);
				for (var i = 0; i < json.length; i++) {
					var thisValue = json[i].COMP_CD;
					var thisName = json[i].name;
					var option = $("<option>", {
						value : thisValue, selected:compCd == thisValue
					});
					option.text(thisName)
					targetEl.append(option);
				}
				targetEl.data('combobox').refresh();
			}
		});
		
		if(compCd){
			fnGetBrndNameList(compCd, tabData.brndCd);
		}
	}
    
    //브랜드 목록 조회
    function fnGetBrndNameList(compCd, brndCd){
    	MMSUtil.fnMakeBrndCombo($("#callObsStsHistBrndNmSearch"), compCd, '', '브랜드명');
//    	$("#callObsStsHistBrndNmSearch").html('<option value="">브랜드명</option>');
//    	$.ajax({
//    		url : "/ctrl/standard/company/listBrandName",
//    		data : {"compCd":compCd},
//    		type : "POST",
//    		cache: false,
//    		success : function(result) {
//    			var result = result.dt_grid;
//    			Util.MakeSelectOptions($('#callObsStsHistBrndNmSearch'), result, brndCd);
//    		}
//    	});
    }
 
   
}();
$(document).ready(function() {
	ObsRcptStsHistApp.init();
});
