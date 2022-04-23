/** Copyright (c) 2017 VertexID RND, Inc.
 * 
 * Application Name : 자산관리 추가[StandardDepartmentApp]
 * Program Code     : PC0101
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * MINE 최판석		2017. 3. 24. 		First Draft.        javascript
 */

var AssetManagerModifyApp = function () {
	"use strict";
	
	/************************************************
	 *전역 객체 선언부 (return 상위부분에 선언해야함)
	 ************************************************/
	var $assetManagerGrid = $("#assetManagerGrid");
	var $preventiveCheckGrid = $('#preventiveCheckGrid');
	var sendData = $('#AssetManagerPopup').PopAppGetData().sendData;
	var userInfo = Util.getUserInfo();
	var aspCompCd = userInfo.s_companyCd;
	var areaCd = userInfo.s_areaCd;
	var userType = userInfo.s_userType;

	return {
        init: function () {
        	
        	if(sendData.astSeq == null || sendData.astSeq == '' ){
    			fnListComboJsonOptionSelected($("#assetManagerModifyState"), "SC0028", null);	
        	}else{
        		fnListComboJsonOptionSelected($("#assetManagerModifyState"), "SC0029", null);
        	}
        	
        	//이벤트
        	fnGetAspCompNameList(); //파트너사
        	
        	fnAssetManagerModifyEvents();
        	
	    	fnGetAssetManagerInfo(sendData.astSeq);
        	
	    }
    };
    
    //[Fn] 이벤트 
    function fnAssetManagerModifyEvents(){
    	
    	//입력방지 항목(검색 시 조회) 
     	$("#assetManagerModifyStrNm, #assetManagerModifyCompNm, #assetManagerModifyBrndNm, #assetAutoPrdNm").attr("readonly",true);
    	
    	// Site 자동완성
		$("#assetManagerModifyStrSearchNm").strInAssetAutoComplete({
			onSelect: function(result){
				$("#assetManagerModifyStrCd").val(result.STR_CD);
				$("#assetManagerModifyStrNm").val(result.STR_NM);
				$("#assetManagerModifyCompNm").val(result.COMP_NM);
				$("#assetManagerModifyBrndNm").val(result.BRND_NM);
				$("#assetManagerModifyBrndNmHiddenNm").val(result.BRND_NM);	
				fnBrndInAssetAutoSearch(result.BRND_NM);
			}
		});
		//자동완성 리셋 버튼
    	$('#assetAutoPrdNmResetBtn').click(function(){
    		$('#assetAutoPrdSearch').val("");
    		$('#assetAutoPrdCd').val("");
    		$('#assetAutoPrdNm').val("");
    		$("#assetAutoPrdSearch").focus();
    	})
    	
    	//저장버튼
    	$("#assetManagerSaveBtn").click(function(){
    		var getData = aseetDataSet();
    		
    		if(!getData){
    			return false;
    		}else if ( sendData.astSeq == "" || sendData.astSeq == null) {//신규
    			fnSaveAssetManager(getData);
    		}else { 	//수정
    			fnUpdateAssetManager(getData);
    		}
	    });
    	//달력 (datePicker 옵션)
    	$('#assetManagerModifyMfrDt').datepicker({ todayHighlight: true,  autoclose: true});
    	$('#assetManagerModifyIntroDt').datepicker({ todayHighlight: true,  autoclose: true});
    	$('#assetManagerModifyFreeStartDt').datepicker({ todayHighlight: true,  autoclose: true});
    	$('#assetManagerModifyFreeEndDt').datepicker({ todayHighlight: true,  autoclose: true});
    	$('#assetManagerModifyCostStartDt').datepicker({ todayHighlight: true,  autoclose: true});
    	$('#assetManagerModifyCostEndDt').datepicker({ todayHighlight: true,  autoclose: true});
    	//유상유지보수시작일 입력시 자동으로 무상유지보수 종료일 입력
    	$('#assetManagerModifyCostStartDt').change(function(){
    		var value = $(this).val().trim();
    		if(value != ''){
	    		var costStartDtDate = new Date(value);
	    		costStartDtDate.setDate (costStartDtDate.getDate() - 1);
    			$('#assetManagerModifyFreeEndDt').datepicker("setDate", costStartDtDate);
    		}else{
    			$('#assetManagerModifyFreeEndDt').datepicker("setDate", null);
    		}
    	});
    	//도입일 입력시 무상유지보수시작일 입력
    	$('#assetManagerModifyIntroDt').change(function(){
    		var value = $(this).val().trim();
    		if(value != ''){
	    		var freeStartDtDate = new Date(value);
    			$('#assetManagerModifyFreeStartDt').datepicker("setDate", freeStartDtDate);
    		}else{
    			$('#assetManagerModifyFreeStartDt').datepicker("setDate", null);
    		}
    	});
    	//파트너사 부서 조회

    	//파트너사 선택시 담당부서 조회
    	$("#assetManagerModifyAspCompCd").change(function(){
    		aspCompCd = $(this).val();
    		MMSUtil.fnMakeAreaCombo($("#assetManagerModifyAreaCd"), '', aspCompCd, '선택');
    	});
    	
    }
    
    function fnBrndInAssetAutoSearch(brndNm){
    	$("#assetAutoPrdSearch").prdInAssetAutoComplate({
			brndNm 	:	brndNm,
			onSelect: function(result){
				console.log(result);
				var prdCd = result.PRD_CD;		//품번
				var prdNm = result.PRD_NM;		//품명
				var prdSpec = result.PRD_SPEC;	//규격
				
				$("#assetAutoPrdCd").val(prdCd);	
				$("#assetAutoPrdNm").val(prdCd+" ["+prdNm+' '+prdSpec+"]"); // 품명 [규격]	
			}
		});
    }
    function fnGetAssetManagerInfo(astSeq){
    	
		$.ajax({
    		url : '/ctrl/asset/asset/getAssetManagerInfo',
    		data : {"astSeq":astSeq},
    		type : "POST",
    		success : function(result){
    			var astData = result.dt_grid[0];
//    			console.log(astData);

    			if(astData != null){
        			$('#assetManagerModifyStrCd').val(astData.STR_CD);
        			$('#assetManagerModifyStrNm').val(astData.STR_NM);
    				$('#assetManagerModifyCompNm').val(astData.COMP_NM);
    				$('#assetManagerModifyBrndNm').val(astData.BRND_NM);
    				$('#assetManagerModifyMngCd').val(astData.MNG_CD);	
    				fnBrndInAssetAutoSearch(astData.BRND_NM);
        			
    				if(astData.AREA_NM != null){
    					MMSUtil.fnMakeAreaCombo($("#assetManagerModifyAreaCd"), astData.AREA_CD, astData.ASP_COMP_CD, '선택');
    				}
    				
        			$('#assetAutoPrdCd').val(astData.PRD_CD);
        			$('#assetAutoPrdNm').val(astData.PRD_CD+" ["+astData.PRD_NM+" "+astData.PRD_SPEC+"]");
    				
        			$('#assetManagerModifySerialNo').val(astData.AST_SERIAL);
        			$('#assetManagerModifyAstType1').val(astData.AST_TYPE1);
        			$('#assetManagerModifyAstType2').val(astData.AST_TYPE2);
        			$("select[id='assetManageModifySlaYn'] option:contains("+astData.MA_YN+")").attr("selected", "selected");
        			$('#assetManagerModifyContent').val(astData.AST_CONT);   
        			$("select[id='assetManagerModifyState'] option[value="+astData.AST_ST+"]").attr('selected', 'selected');
        	        $("#assetManagerModifyMfrDt").datepicker("setDate", astData.AST_MFR_DT);
        	        $("#assetManagerModifyIntroDt").datepicker("setDate", astData.FREE_START_DT);
       	            $("#assetManagerModifyFreeStartDt").datepicker("setDate", fnDtNullCheck(astData.FREE_START_DT));
    	            $("#assetManagerModifyFreeEndDt").datepicker("setDate", fnDtNullCheck(astData.FREE_END_DT));
    	            $("#assetManagerModifyCostStartDt").datepicker("setDate", fnDtNullCheck(astData.COST_START_DT));
    	            $("#assetManagerModifyCostEndDt").datepicker("setDate",fnDtNullCheck(astData.COST_END_DT));
    			}
    			return astData;
    		}
    	});
    }
    
    function aseetDataSet(){
    	var aspCompCd		= $('#assetManagerModifyAspCompCd_input').val().trim();
    	var strCd 			= $("#assetManagerModifyStrCd").val().trim();
    	var strNm 			= $("#assetManagerModifyStrNm").val().trim();
    	var searchNm 		= $("#assetManagerModifyStrSearchNm").val().trim();
    	var compNm 			= $("#assetManagerModifyCompNm").val().trim();
    	var brndNm 			= $("#assetManagerModifyBrndNm").val().trim();   
    	var mngCd			= $('#assetManagerModifyMngCd').val().trim();
    	var aspCompCd		= $('#assetManagerModifyAspCompCd').val().trim();
    	var areaCd			= $('#assetManagerModifyAreaCd').val().trim();
    	var prdSearch   	= $("#assetAutoPrdSearch").val().trim();
    	var prdCd   		= $("#assetAutoPrdCd").val().trim();
    	var prdNm   		= $("#assetAutoPrdNm").val().trim();    	
    	var serialNo  	 	= $("#assetManagerModifySerialNo").val().trim();
    	var astType1  	 	= $("#assetManagerModifyAstType1").val().trim();
    	var astType2  	 	= $("#assetManagerModifyAstType2").val().trim();
    	var slaYn	 		= $("#assetManageModifySlaYn option:selected").val().trim();
    	var astCont 		= $("#assetManagerModifyContent").val().trim();
    	var astSt 	 		= $("#assetManagerModifyState").val().trim();
    	var astStNm	 		= $("#assetManagerModifyState option:selected").text().trim();
    	var astMftDt 	 	= $("#assetManagerModifyMfrDt").val().trim();
    	var astIntroDt 	 	= $("#assetManagerModifyIntroDt").val().trim(); 	
    	var freeStartDt 	= $("#assetManagerModifyFreeStartDt").val().trim();	   	
    	var freeEndDt 	 	= $("#assetManagerModifyFreeEndDt").val().trim();		
    	var costStartDt 	= $("#assetManagerModifyCostStartDt").val().trim();	
    	var costEndDt 	 	= $("#assetManagerModifyCostEndDt").val().trim();	
    	
    	//Validation, 필수값체크
    	if($.trim(strNm).length == 0){
    		alert("점포를 검색해주세요.");
    		$("#assetManagerModifyStrSearchNm").focus();
    		return false;
    	}else if($.trim(prdNm).length == 0){
    		alert("품목을 검색해주세요.");
    		$("#assetAutoPrdNm").focus();
    		return false;
    	}else if($.trim(astMftDt).length == 0){
    		alert("설치일을 입력해 주세요.");
    		$("#assetManagerModifyMfrDt").focus();
    		return false;
    	}else if($.trim(astIntroDt).length == 0){
    		alert("도입일을 입력해 주세요.");
    		$("#assetManagerModifyIntroDt").focus();
    		return false;
    	}else if($.trim(costStartDt).length == 0){
    		alert("유상유지보수시작일을 입력해 주세요.");
    		$("#assetManagerModifyCostStartDt").focus();
    		return false;
    	}
    	
    	var getData = {
    			"astSeq"		: sendData.astSeq,
    			"strCd"			: strCd,
    			"strNm"			: strNm,
    			"aspCompCd"		: aspCompCd,
    			"areaCd"		: areaCd,
    			"searchNm"		: searchNm,
    			"compNm"		: compNm,
    			"brndNm"		: brndNm,
    			"mngCd"			: mngCd,
    			"prdSearch"		: prdSearch,
    			"prdCd"			: prdCd,
    			"prdNm"			: prdNm,
    			"serialNo"		: serialNo,
    			"astType1"		: astType1,
    			"astType2"		: astType2,
    			"astSt"			: astSt,
    			"astStNm"		: astStNm,
    			"astCont"		: astCont,
    			"astMftDt"		: astMftDt,
    			"astIntroDt"	: astIntroDt,
    			"freeStartDt"	: freeStartDt,
    			"freeEndDt"		: freeEndDt,
    			"costStartDt"	: costStartDt,
    			"costEndDt"		: costEndDt,
    			"slaYn"			: slaYn 			
    	};
    	return getData;
    }
    
    
    function fnSaveAssetManager(getData) {
    	
    	if(!confirm("저장하시겠습니까?")){
    		return;
    	}

    	$.ajax({
			url : "/ctrl/asset/asset/saveAssetManager",
    		data : getData,
    		success : function(result) {
    			var stsCd = result.stsCd;
    			if ( stsCd == 100 ) {
    				$("#AssetManagerPopup").paragonClosePopup();
        			$assetManagerGrid.paragonGridReload();  
    			} else {
    				alert(result.msgTxt);
    			}
    		}
    	});
    }
   
    function fnUpdateAssetManager(getData) {
    	//팝업 母GRID에서 가져온 데이터와 비교
    	if(sendData.astSt != getData.astSt){
        	if(!confirm("자산상태가 ["+sendData.astStNm+"]에서 ["+getData.astStNm+"] 으로 변경되었습니다. 저장하시겠습니까?")){
        		return;
        	}
        	
        	if(getData.astSt == 340 && $('#assetManagerModifyCostEndDt').val() == ''){
        		alert("자산 폐기시 유상유지보수종료일은 필수 입력해야합니다.");
        		$("#assetManagerModifyCostEndDt").focus();
        		return false;
        	}
    	}else{
        	if(!confirm("저장하시겠습니까?")){
        		return;
        	}
    	}

		$.ajax({
			url : "/ctrl/asset/asset/updateAssetManager",
    		data : getData,
    		success : function(result) {
    			var stsCd = result.stsCd;
    			if ( stsCd == 100 ) {
    				$("#AssetManagerPopup").paragonClosePopup();
        			$assetManagerGrid.paragonGridReload();
        			if($preventiveCheckGrid){
        				$preventiveCheckGrid.paragonGridReload();
        			}
	    			alert(result.msgTxt);
    			} else {
    				alert(result.msgTxt);
    			}
    		}
    	});
    }
    
    function fnListComboJsonOptionSelected(target, groupCd, first){
    	$.ajax({
    		url : "/ctrl/settings/system/code/listCodeGroupComboJson",
    		data :{codeGroupCd:groupCd},
    		type : "POST",
    		dataType : "json",
    		cache: false,
    		success : function(result) {
    			Util.MakeSelectOptions(target, result, "", first);
    		}
    	});
    }
       
    function fnDtNullCheck(dtData){ //MariaDb Date null
    	if(dtData == null || dtData == '0000-00-00' || dtData == '1000-01-01' || dtData == '0002-11-30'){
    		dtData = '';
    	}
    	return dtData;
    }
    
    //파트너사 목록 조회
    function fnGetAspCompNameList(){
    	$("#assetManagerModifyAspCompCd").combobox();
    	$("#assetManagerModifyAreaCd").combobox();

    	if(sendData == ''){
    		MMSUtil.fnMaMakePartnerCombo($("#assetManagerModifyAspCompCd"), aspCompCd);

        	if(userType == 2){//등록
        		//등록시 파트너사는 부서만 변경등록할수있다.
            	$('#assetManagerModifyAspCompCd_input, #assetManagerModifyAspCompCd_input + span').attr('disabled', true);
        	}
    		
    	}else{
    		MMSUtil.fnMakePartnerCombo($("#assetManagerModifyAspCompCd"), sendData.aspCompCd);
    		//수정시 모든 사용자는 파트너사 및 부서를 변경할수없다.
        	$('#assetManagerModifyAspCompCd_input, #assetManagerModifyAspCompCd_input + span').attr('disabled', true);
    	}

    	MMSUtil.fnMakeAreaCombo($("#assetManagerModifyAreaCd"), sendData.areaCd, aspCompCd, '선택');
    }
    
}();

$(document).ready(function() {
	AssetManagerModifyApp.init();
});
