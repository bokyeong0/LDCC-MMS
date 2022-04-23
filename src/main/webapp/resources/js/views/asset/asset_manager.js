/** Copyright (c) 2017 VertexID RND, Inc.
 * 
 * Application Name : 자산목록[AssetManagerApp]
 * Program Code     : PC0301
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * MINE 최판석		2017. 3. 20. 		First Draft.        javascript
 */
var AssetManagerApp = function () {
	"use strict";
	
	/************************************************
	 *전역 객체 선언부 (return 상위부분에 선언해야함)
	 ************************************************/
	
	// [El]권역정보 그리드
	var $assetManagerGrid = $("#assetManagerGrid");
	var userInfo = Util.getUserInfo();
	var aspCompCd = userInfo.s_companyCd;
	var userType = userInfo.s_userType;
	var compCd = '';
	
	return {
        init: function () {
        	
        	//권한 기능삭제
        	fnAuthCheck();
        	
        	//자산정보 Grid생성
        	fnListAssetManager();
        	
        	//종속관계 콤보박스, 제품분류 > 제품군 > 제조사 > 모델명
        	fnSubordinationCombo();
        	
        	//자산정보 Event
        	fnAeestManagerEvents();
        	
        	//조회조건 콤보박스
        	fnAesetComboSetting();
        	
        	fnGetAspCompNameList(); //파트너사
        	fnGetCompNameList(); //고객사
	    }
    };
    
    function fnAuthCheck(){
    	$('#assetManagerAuthExcelUpload').hide();
    }
    
    /********************************************************************
     * 자산관리 그리드 생성
     * Since   : 2017-04-18
     * 작성자  : 최 판 석
     * 수정내역: 
     ********************************************************************/
    //[Fn] jqgrid 자산관리 목록 
    function fnListAssetManager(){
    	$assetManagerGrid.paragonGrid({
        	url: '/ctrl/asset/asset/listAssetManager',
//        	rowEditable:true,
			sortable: true,
			postData : { "aspCompCd" : aspCompCd},
			shrinkToFit: true,
			rownumbers: true,
			rowNum : 15,
			rowList : [15, 30, 100, 500, 1000],
			reportExcelBtn: true,
			caption:"자산목록",
			colNames : [
			            "시리얼", "고객사명", "브랜드명", "점포명", "관리코드", "파트너사", 
			            "제품범주", "제품군",	"제조사", "모델명",	"SPEC",
			            "설치일",   "포스번호", "위치정보",	 "점포구분",
			            "점포코드", "자산번호",	"품목코드", "지역구분", "자산상태코드",	"자산상태", "파트너사코드"],
			colModel : [ 
	            {name : 'AST_SERIAL', align:"center"},					//시리얼
	            {name : 'COMP_NM', align:"center"},						//고객사명       
	            {name : 'BRND_NM', align:"center"},						//고객사명       
	            {name : 'STR_NM', align:"center"},        				//점포명
	            {name : 'MNG_CD', align:"center"},						//관리코드
	            {name : 'ASP_COMP_NM', align:"center"},					//파트너사            
	            {name : 'PRD_TYPE_LV1_NM', align:"center"},				//제품범주
	            {name : 'PRD_TYPE_LV2_NM', align:"center"},				//제품군
	            {name : 'PRD_TYPE_LV3_NM', align:"center"},				//제조사  
	            {name : 'PRD_NM', align:"center"},						//제품명
	            {name : 'PRD_SPEC', align:"center"},					//제품규격
	            {name : 'AST_MFR_DT', align:"center"},					//설치일
	            {name : 'AST_TYPE2', align:"center", width:"90px"},		//포스번호
	            {name : 'AST_TYPE1', align:"center", width:"90px"},		//위치정보
	            {name : 'STR_TYPE_NM', align:"center", width:"90px", hidden:true},	//점포구분, 점포형태	
	            {name : 'STR_CD', align:"center", hidden:true},						//점포코드
	            {name : 'AST_SEQ', hidden : true}, 	            
	            {name : 'PRD_CD', align:"center", hidden:true},						//품목코드  
	            {name : 'AREA_NM', align:"center", hidden:true},					//지역구분
	            {name : 'AST_ST', align:"center", width:"120px", hidden:true},		//자산상태
	            {name : 'AST_ST_NM', align:"center", width:"120px"},	//자산상태명,
	            {name : 'ASP_COMP_CD', align:"center", hidden:true},					//파트너사   
			],
            pager: "#assetManagerGridNavi",
            domainId : "AST_MNG",
			ondblClickRow:function(id, iRow, iCol, e){
            	var astSeq = $assetManagerGrid.getRowData( id ).AST_SEQ;
            	var serialNo = $assetManagerGrid.getRowData( id ).AST_SERIAL;
            	var astSt = $assetManagerGrid.getRowData( id ).AST_ST;
            	var astStNm = $assetManagerGrid.getRowData( id ).AST_ST_NM;
            	
            	var sendData = {
        				"astSeq"	:	astSeq,
        				"serialNo"	:	serialNo,
        				"astStNm"	:	astStNm,
        				"astSt"		:	astSt
        				};
            	
            	PopApp.paragonOpenPopup({
            		ajaxUrl	: '/ctrl/asset/asset/viewAssetManagerPopup',
            		data	: sendData,
            		id		: 'viewAssetManagerPopup',
            		width	: '1200px',	    		
            		btnName	: "자산 상세 보기",
//            		visible: true, //기본값 false :바로 활성화  TODO 사용설명서 명시해야함
            		title 	: "자산 상세정보",
            		onload	: function(modal){
                        App.setElIds();
            			modal.show();
            		}
        		});
            }
        });
	}
    
    function fnSubordinationCombo(){
    	var prdTypeLv1 = "#assetManagerPrdTypeLv1";
    	var prdTypeLv2 = "#assetManagerPrdTypeLv2";
    	var prdTypeLv3 = "#assetManagerPrdTypeLv3";
    	var prdNm = "#assetManagerPrdNm";
    	var option = " option:selected"
    	var optionEq = " option:eq(0)"
    		$("#id option:eq(0)").prop("selected", true);

    		
		$(prdTypeLv2).click(function(){
    		if($(prdTypeLv1 + option).val() == ""){
    			alert("제품범주 항목을 선택해주세요");return
    		}
		})
		$(prdTypeLv3).click(function(){
    		if($(prdTypeLv1 + option).val() == "" || $(prdTypeLv2 + option).val() == ""){
    			alert("제품군 항목을 선택해주세요");return
    		}
		})		
		$(prdNm).click(function(){
    		if($(prdTypeLv1 + option).val() == "" || $(prdTypeLv2 + option).val() == "" || $(prdTypeLv3 + option).val() == ""){
    			alert("제조사 항목을 선택해주세요");return
    		}
		})
    	
    	$('select'+prdTypeLv1).change(function(){
    		$('select'+prdTypeLv1+option).each(function(){
        		var sendData = {
        			"prdTypeCd" : $(this).val()
        		};
        		fnGetComboList("/ctrl/asset/asset/listPrdTypeLv2", $(prdTypeLv2), "선택",sendData);	//제품군
        		$(prdTypeLv3+optionEq).prop("selected", true);
        		$(prdNm+optionEq).prop("selected", true);
    		});
    	})
    	$('select'+prdTypeLv2).change(function(){
    		$('select'+prdTypeLv2 + option).each(function(){
        		var sendData = {
        			"prdTypeCd" : $(this).val()
        		};
        		fnGetComboList("/ctrl/asset/asset/listPrdTypeLv3", $(prdTypeLv3), "선택",sendData);	//제조사
        		$(prdNm+optionEq).prop("selected", true);
    		});
    	})
    	$('select'+prdTypeLv3).change(function(){
    		$('select'+prdTypeLv3 + option).each(function(){
        		var sendData = {
        			"prdTypeCd1" : $(prdTypeLv1).val(),
        			"prdTypeCd2" : $(prdTypeLv2).val(),
        			"prdTypeCd3" : $(this).val()
        		};
        		fnGetComboList("/ctrl/asset/asset/listPrdTypeNm", $(prdNm), "선택",sendData);	//모델명
    		});
    	})
    	
		//모델명별수량
    	if($('#gridCaptionRt').length > 0){
        	$('#gridCaptionRt').remove();	
    	}
    	$('#gview_assetManagerGrid div:first-child:first').append(
    			"<button id='assMngGridCaptRtModelCountPopBtn' " +
					"class='btn pull-right m-r-60 m-t-10 p-t-2' "+
    				"style='border:1.5px solid #676A6C !important; background-color:#F5F5F6 !important; height:20px !important; font-weight:800 !important' >" +
    			"모델명별수량"
    			+"</button>");
    	
		//제품군별수량
    	$('#gview_assetManagerGrid div:first-child:first').append(
    			"<button id='assMngGridCaptRtPrdCountPopBtn' " +
					"class='btn pull-right m-r-20 m-t-10 p-t-2' "+
    				"style='border:1.5px solid #676A6C !important; background-color:#F5F5F6 !important; height:20px !important; font-weight:800 !important' >" +
    			"제품군별수량"
    			+"</button>");
		
    }
    
    function fnAesetComboSetting(){
    	var codeGroupUrl = "/ctrl/settings/system/code/listCodeGroupComboJson";
    	
		fnListComboJson(codeGroupUrl, $("#assetManagerAstSt"), "SC0029","선택", false);	//자산상태
    	
    	fnGetComboList("/ctrl/asset/asset/listPrdTypeLv1", $("#assetManagerPrdTypeLv1"), "","");	//제품범주
    	
    	fnGetComboList("/ctrl/settings/user/listPartnerAspCompCd", $("#assetManagerAspCompCd"), "선택" ,"");	//파트너사
    	
    }
    
    //[Fn] 이벤트 
    function fnAeestManagerEvents(){
    	
    	//자산등록 버튼
    	$("#assetManagerNewBtn").click(function(){
    		var sendData = '';
    		fnAssetManagerNewPopup(sendData);
    	});
    	
    	//검색 버튼
    	$("#assetManagerSearchBtn").click(function(){
    		fnSearchAssetManager();
    	});
    
    	//엑셀업로드 버튼
    	$("#assetManagerAddExcelImportBtn").click(function(){
    		excepUpload();
    	});
    	
    	//엑셀다운로드 버튼
    	$("#assetManagerDownloadExcel").click(function(){
    		$assetManagerGrid.downloadExcel();
    	});
    	
    	//모델별수량 팝업
    	$('#assMngGridCaptRtModelCountPopBtn').click(function(){
    		fnPopupModelCount();
    	});
    	
    	//품목별수량 팝업
    	$('#assMngGridCaptRtPrdCountPopBtn').click(function(){
    		fnPopupPrdCount();
    	});
    	
    	//자산 수정
    	$('#assetManagerModifyBtn').click(function(){
    		fnAssetManagerModifyPopup();
    	});
    	
    	//파트너사 부서 조회
    	$("#assetManagerAreaCd").combobox();
    	//파트너사 선택시 담당부서 조회
    	$("#assetManagerAspCompCd").change(function(){
        	aspCompCd = $(this).val();
    		MMSUtil.fnMakeAreaCombo($("#assetManagerAreaCd"), '', aspCompCd, '선택');
    	});
    	
       	//브랜드 조회
    	$("#assetManagerBrndNm").combobox();
    	//고객사 선택시 브랜드 조회
    	$("#assetManagerCompNm").change(function(){
        	compCd = $(this).val();
    		MMSUtil.fnMakeBrndCombo($("#assetManagerBrndNm"), $(this).val(), '', '선택');
    	});
    	
       	//점포 조회
    	$("#assetManagerStrNm").combobox();
    	//고객사 및 브랜드 선택시 점포 조회
    	$("#assetManagerBrndNm").change(function(){
    		MMSUtil.fnMakeStrCombo($("#assetManagerStrNm"), compCd, $(this).val(), '선택');
    	});
    	
    	//엑셀 업로드 템플릿(양식) 다운로드
    	$('#assetManagerDownloadExcelTemp').click(function(){
    		fnExcelTempDownload();
    	});
    	
    }
    
    function fnGetData(){
    	var data = {
				compCd : $("#assetManagerCompNm").val().trim(),
				brndCd : $("#assetManagerBrndNm").val().trim(),
				strCd : $("#assetManagerStrNm").val().trim(),
				astSt : $("#assetManagerAstSt").val().trim(),
				prdTypeLv1 : $("#assetManagerPrdTypeLv1").val().trim(),
				prdTypeLv2 : $("#assetManagerPrdTypeLv2").val().trim(),
				prdTypeLv3 : $("#assetManagerPrdTypeLv3").val().trim(),
    			prdCd : $("#assetManagerPrdNm").val().trim(),
    			serialNo : $("#assetManagerSerialNo").val().trim(),
    			mngCd : $("#assetManagerMngCd").val().trim(),
    			aspCompCd : $("#assetManagerAspCompCd").val(),
    			areaCd : $("#assetManagerAreaCd").val(),
    			astType2 : $("#assetManagerAstType2").val().trim(),
    			conYearYn : $("#assetManagerConYearYn option:selected").val().trim()
    	}
    	return data;
    }
    
    //[Fn] 검색 조건 매핑
    function fnSearchAssetManager(){
		var data = fnGetData();
    	$assetManagerGrid.paragonGridSearch(data);
    }
 
    function fnListComboJson(targeturl, target, groupCd, first, bootstrap){
    	$.ajax({
    		url : targeturl,
    		data :{codeGroupCd:groupCd},
    		type : "POST",
    		dataType : "json",
    		cache: false,
    		success : function(result) {
    			//타겟, 데이터, 초기화, 기본값,선택 
    			//(El,json,first,reset,select)
    			if ( bootstrap ) {
    				Util.MakeBootstrapSelectBox(target, result, first);
    			}
    			else {
    				Util.MakeSelectOptions(target, result, "", first);
    			}
    		}
    	});
    }
    
    //공통 목록 조회
    function fnGetComboList(url, target, first, sendData){
    	var select = "";
    	$.ajax({
    		url : url,
    		data : sendData,
    		type : "POST",
    		cache: false,
    		success : function(result) {
    			var result = result.dt_grid;
    			Util.MakeSelectOptions(target, result, select, first);
    		}
    	});
    }
    
    //엑셀 업로드
	function checkFileType(filePath) { //파일 확장자 검사
		   var fileFormat = filePath.split(".");
		   if (fileFormat.indexOf("xlsx") > -1) {
		       return true;
		   } else if(fileFormat.indexOf("xls") > -1){
		       return true;
		   }else{
		       return false;
		   }
	}
	function excepUpload(){ //엑셀 업로드 AJAX
		 var file = $("#assetManagerExcelFile").val();
		 if (file == "" || file == null) {
		     alert("파일을 선택해주세요.");
		     return false;
		 } else if (!checkFileType(file)) {
		     alert("엑셀 파일만 업로드 가능합니다.");
		     return false;
		 }
		
		 if (confirm("업로드 하시겠습니까?")) {
				 var form = new FormData(document.getElementById('assetManagerUploadExcelForm'));
				 
				 $.ajax({
				   url: "/ctrl/asset/asset/uploadExcelAstData", //컨트롤러 URL
					 data: form,
					 dataType: 'json',
					 processData: false,
					 contentType: false,
					 type: 'POST',
					 success: function (result) {
						 if(result.NULL_FILE == "Y"){
							 alert("엑셀파일이 없습니다.");
							 return false;
						 }else if(result.NULL_CHECK == 'Y'){
							 alert("필수입력 컬럼 ["+result.CELL_NAME + "] 의 값 중 " +result.ROW_INDEX + "행의 데이터가 비어있습니다.");
							 return false;
						 }else if(result.DUPLICATION_EXCEL_SERIAL == 'Y'){
							 alert("엑셀 데이터 ["+ result.DUP_SERIAL_ARRAY +"] 행의 시리얼번호가 중복존재합니다." );
							 return false;
						 }else if(result.DUPLICATION_DATA_CHECK == 'Y'){
							 alert("엑셀 데이터 ["+ result.STR_CD + "] 의 자산은 이미 자산 등록을 마친 점포자산입니다.");
							 return false;
						 }else if(result.DUPLICATION_SERIAL_DATA_CHECK == 'Y'){
							 alert("엑셀 데이터 ["+result.LIST+ "] 행의 시리얼은 이미 등록된 시리얼입니다.");
							 return false;
						 }else if(result.NOT_FOUND_ASP_COMP_CNT == 'Y'){
							 alert("엑셀 데이터 중 DB에 없는 파트너사코드가 존재합니다.");
							 return false;
						 }else if(result.NOT_FOUND_AREA_CNT == 'Y'){
							 alert("엑셀 데이터 중 DB에 없는 파트너사 부서코드가 존재합니다.");
							 return false;
						 }else if(result.NOT_FOUND_STR_CNT == 'Y'){
							 alert("엑셀 데이터 중 DB에 없는 점포코드가 존재합니다.");
							 return false;
						 }else if(result.NOT_FOUND_PRD_CNT == 'Y'){
							 alert("엑셀 데이터 중 DB에 없는 품목코드가 존재합니다.");
							 return false;
						 }else if(result.NOT_FOUND_COL_NAME == 'Y'){
							 alert("엑셀 데이터 ["+ result.LIST + "] 필수 입력 열이 존재하지 않습니다.");
							 return false;
						 }

						 //업로드성공
						 alert('업로드를 완료했습니다.');
						 $assetManagerGrid.paragonGridSearch();
					 }
			    });
			};
	};//업로드끝
	 
	//모델별 수량 팝업
	function fnPopupModelCount(){
		var sendData = fnGetData();
		PopApp.paragonOpenPopup({
    		ajaxUrl: '/ctrl/asset/asset/assetManagerModelCountPop',
    		data:{"sendData": sendData},
    		id: 'modalAssetManagerModelCountPop',
    		width: '700px',	    		
    		title :"자산목록 모델별 수량",
    		onload:function(modal){
    			modal.show();
    		}
		});
	};
	
	//모델별 수량 팝업
	function fnPopupPrdCount(){
		var sendData = fnGetData();
		PopApp.paragonOpenPopup({
    		ajaxUrl: '/ctrl/asset/asset/assetManagerPrdCountPop',
    		data:{"sendData": sendData},
    		id: 'modalAssetManagerPrdCountPop',
    		width: '700px',	    		
    		title :"자산목록 품목별 수량",
    		onload:function(modal){
    			modal.show();
    		}
		});
	};
	
	//자산등록 팝업
	function fnAssetManagerNewPopup(sendData){
		PopApp.paragonOpenPopup({
    		ajaxUrl: '/ctrl/asset/asset/addAssetManagerPopup',
    		data:{"sendData": sendData},
    		id: 'AssetManagerPopup',
    		width: '700px',	    		
    		title :"자산 관리",
    		onload:function(modal){
    			modal.show();
    		}
		});
	};
	
	//자산수정팝업
	function fnAssetManagerModifyPopup(){
		var rowid= $assetManagerGrid.jqGrid('getGridParam','selrow');
		if(rowid == "" || rowid == undefined){
			alert("자산이 선택되지 않았습니다. 자산 목록의 내용(행)을 선택 후 다시 클릭해주세요");
			return false;
		}
		
		// 선택행 데이터
		var rowData = $assetManagerGrid.getRowData( rowid );
		// 선택행 데이터 AST_SEQ
		var sendData = {
				"astSeq"	:	rowData.AST_SEQ,
				"astSt"		:	rowData.AST_ST,
				"astStNm"	:	rowData.AST_ST_NM,
				"aspCompCd" : 	rowData.ASP_COMP_CD,
				"areaCd"	:	rowData.AREA_CD
		}
		
		return fnAssetManagerNewPopup(sendData);
	}
	
    function fnDtNullCheck(dtData){ //MariaDb Date null
    	if(dtData == null || dtData == '0000-00-00' || dtData == '1000-01-01' || dtData == '0002-11-30'){
    		dtData = '';
    	}
    	return dtData;
    }
    
    //파트너사 목록 조회
    function fnGetAspCompNameList(){
    	$("#assetManagerAspCompCd").combobox();
    	
    	if(userType == 2){
        	MMSUtil.fnMaMakePartnerCombo($("#assetManagerAspCompCd"), aspCompCd);

        	$('#assetManagerAspCompCd_input, #assetManagerAspCompCd_input + span').attr('disabled', true);
    		MMSUtil.fnMakeAreaCombo($("#assetManagerAreaCd"), '', aspCompCd, '선택');
    	}
    	else{
        	MMSUtil.fnMakePartnerCombo($("#assetManagerAspCompCd"), aspCompCd);
    		
    	}
    }
    
    //고객사 목록 조회
    function fnGetCompNameList(){
    	$('#assetManagerCompNm').combobox();
    	MMSUtil.fnMakeCompCombo($('#assetManagerCompNm'), '', '선택');
    }
    
	//엑셀 업로드 템플릿(양식) 다운로드
    function fnExcelTempDownload(){
    	if(!confirm("엑셀 업로드 양식을 다운로드 하시겠습니까? (예시 시트를 참고하여 작성하여 주시기 바랍니다.)")){
    		return false;
    	}else{
    		
			App.prcsEnd();
			location.href='/ctrl/asset/asset/excelUploadTempDownload';
    	}
    };
    
}();

$(document).ready(function() {
	AssetManagerApp.init();
});
