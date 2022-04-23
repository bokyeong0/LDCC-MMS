/** Copyright (c) 2017 VertexID RND, Inc.
 * 
 * Application Name : 계약자산관리[StandardStoreApp]
 * Program Code     : PC0602
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * MINE 한성진		2017. 3. 16. 		First Draft.        javascript
 * MINE 김경수		2018. 7. 16. 		종속관계 콤보박스, 제품분류 > 제품군 > 제조사 > 모델명              javascript
 */
var ContractMngAssetApp = function () {
	"use strict";
	
	/************************************************
	 *전역 객체 선언부 (return 상위부분에 선언해야함)
	 ************************************************/
	
	// [El]계약자산관리 그리드standardCompanyGrid 
	var $contractMngAssetGrid = $("#contractMngAssetGrid");
	
	var userInfo = Util.getUserInfo();
	var aspCompCd = userInfo.s_companyCd;
	var areaCd = userInfo.s_areaCd;
	
	
    return {
        init: function () {
        	fnMakeConYear();
        	
        	//종속관계 콤보박스, 제품분류 > 제품군 > 제조사 > 모델명 A20180716 k2s
        	fnSubordinationCombo();
        	
        	//파트너사 일괄변경 Event
        	fnPartnerContractEvents();
        	
        	if(aspCompCd){
        		MMSUtil.fnMakeAreaCombo($('#contractMngAssetAspArea'), areaCd, aspCompCd, '담당 부서');
            	MMSUtil.fnMakeAreaCombo($('#contractMngAssetChangeAspArea'), '', aspCompCd, '이동할 부서');
        	}
        	
        	//파트너사 일괄변경 Grid
        	fnListPartnerContractFromGrid();
        	
        	fnListAutoStrNm();
        	
	    }
    };
    
    
    //[Fn] 이벤트 
    function fnPartnerContractEvents(){
    	$('#contractMngAssetAspCompCd').combobox();
    	$('#contractMngAssetCompCd').combobox();
    	$('#contractMngAssetConNm').prop("disabled", "disabled");
    	
    	$('#contractMngAssetSearchBtn').click(function(){
    		fnSearch();
    	})
    	
    	$("#contractMngAssetStrNm").enterEvent({
    		callBack:function(value){
    			fnSearch();
			}
    	});
    	
    	$('#contractMngAssetConYear').change(function(){
    		var conYear = $('#contractMngAssetConYear').val();
    		fnGetConId(conYear, aspCompCd);
    	});
    	
    	$('#contractMngAssetChangeConYear').change(function(){
    		var conYear = $('#contractMngAssetChangeConYear').val();
    		fnChangeConId(conYear, aspCompCd);
    	});
    	
    	$('#contractMngAssetAspCompCd').change(function(){
    		aspCompCd = $('#contractMngAssetAspCompCd').val();
    		
    		MMSUtil.fnMakeAreaCombo($('#contractMngAssetAspArea'), '', aspCompCd);
    		MMSUtil.fnMakeAreaCombo($('#contractMngAssetChangeAspArea'), '', aspCompCd, '이동할 부서');
    	});
    	
    	MMSUtil.MaMakePartnerSet({
    		aspCompCdId : '#contractMngAssetAspCompCd',
    		compCdId 	: '#contractMngAssetCompCd',
    		brndCdId 	: '#contractMngAssetBrndCd',
    	});
    	
    	$('#contractMngAssetConfirmBtn').click(function(){
    		fnChangeContract();
    	});
    	
    	$('#contractMngAssetCompCd').change(function(){
    		var compCd = $('#contractMngAssetCompCd').val();
    		fnListAutoStrNm(compCd);
    	});
    	
    	$('#contractMngAssetBrndCd').change(function(){
    		var compCd = $('#contractMngAssetCompCd').val();
    		var brndCd = $('#contractMngAssetBrndCd').val();
    		fnListAutoStrNm(compCd, brndCd);
    	});
    }
    
    function fnListAutoStrNm(compCd, brndCd){
    	$('#contractMngAssetStrNm').strNmAutoComplate({
			compCd:compCd,
			brndCd:brndCd,
		});
    }
    
    function fnSearch(){
    	
    	if($contractMngAssetGrid.getChkRow() !== false){
    		if(!confirm("선택된 자산이 있습니다. 조회 하시겠습니까?")){
    			return;
    		}
    	}
    	
    	var conYear   = $('#contractMngAssetConYear').val();
    	var conId     = $('#contractMngAssetConId').val();
		var conMtnNm  = $('#contractMngAssetConId option:selected').text();
		var mtnItemId = conMtnNm.substring(conId.length+1, conMtnNm.length);
		
		if(conId == ''){
			mtnItemId = '';
		}
		
		var data = {
				conYear		: conYear,
				conId		: conId,
				mtnItemId	: mtnItemId,
				aspCompCd	: $('#contractMngAssetAspCompCd').val(),
				areaCd		: $('#contractMngAssetAspArea').val(),
				compCd		: $('#contractMngAssetCompCd').val(),
				brndCd		: $('#contractMngAssetBrndCd').val(),
				strNm		: $('#contractMngAssetStrNm').val(),
				prdTypeLv1  : $("#contractManagementAssetPrdTypeLv1").val().trim(),
				prdTypeLv2  : $("#contractManagementAssetPrdTypeLv2").val().trim(),
				prdTypeLv3  : $("#contractManagementAssetPrdTypeLv3").val().trim(),
    			prdCd       : $("#contractManagementAssetPrdNm").val().trim(),				
		};
		$contractMngAssetGrid.search(data);
    }
    
    //[Fn] 계약년도 SelectBox
    function fnMakeConYear(){
    	var select = $('#contractMngAssetConYear');
    	var changeSelect = $('#contractMngAssetChangeConYear');
    	var year = new Date().getFullYear();
    	for(var i=0; i<7; i++){
    		select.append('<option value='+year+'>'+year+'</option>');
    		changeSelect.append('<option value='+year+'>'+year+'</option>');
    		year--;
    	}
    };
    
    //[Fn] 계약Id SelectBox
    function fnGetConId(conYear, aspCompCd){
    	$.ajax({
    		url:'/ctrl/contract/mng/listConId',
    		data:{
    				'conYear'  :conYear,
    				'aspCompCd':aspCompCd
    			 },
    		success:function(result){
    			var result = result.dt_grid;
    			Util.MakeSelectOptions($('#contractMngAssetConId'),result, "", "선택");
    		}
    	});
    }
    
    function fnChangeContract(){
    	var conYear = $('#contractMngAssetChangeConYear').val();
    	var conId = $('#contractMngAssetChangeConId').val();
		var conMtnNm = $('#contractMngAssetChangeConId option:selected').text();
		var mtnItemId = conMtnNm.substring(conId.length+1, conMtnNm.length);
    	
		if(!conYear){
			alert("계약연동-계약년도를 선택해 주세요.");
    		return;
		}
		
    	if(!conId){
    		alert("계약연동-계약Id를 선택해 주세요.");
    		return;
    	}
    	
    	var camelObj = {'astSerial':'AST_SERIAL'};
    	
    	var gridData = $contractMngAssetGrid.getChkRow(camelObj);
    	
    	if(gridData === false){
    		alert("선택된 자산이 없습니다.");
    		return;
    	}
    	
    	if(!confirm("계약을 변경하시겠습니까?")){
    		return;
    	}
    	
    	var jsonData = {
    			conYear   : conYear,
    			conId	  : conId,
    			mtnItemId : mtnItemId,
    			areaCd	  : $('#contractMngAssetChangeAspArea').val(),
    			dt_asset  : gridData
    	}
    	
    	$.ajax({
    		url:'/ctrl/contract/mng/saveChangeContract',
    		data:JSON.stringify(jsonData),
    		contentType: 'application/json; charset=utf-8',
    		success:function(result){
    			var cnt = result.cnt;
    			alert(cnt+"건이 변경 되었습니다.");
    			$contractMngAssetGrid.reload();
    		}
    	});
    	
    }
    
    function fnChangeConId(conYear, aspCompCd){
    	$.ajax({
    		url:'/ctrl/contract/mng/listChangeConId',
    		data:{
    				'conYear'	: conYear,
    				'aspCompCd'	: aspCompCd
    			 },
    		success:function(result){
    			var result = result.dt_grid;
    			Util.MakeSelectOptions($('#contractMngAssetChangeConId'),result, "", "계약ID");
    		}
    	});
    }
    
    /* A20180716 k2s 제품범주, 제품군, 제조사, 모델명 검색 조건 추가 FEC 임종윤부장 추가 요청 */
    function fnSubordinationCombo(){
    	
    	fnGetComboList("/ctrl/asset/asset/listPrdTypeLv1", $("#contractManagementAssetPrdTypeLv1"), "","");	//제품범주
    	
    	var prdTypeLv1 = "#contractManagementAssetPrdTypeLv1";
    	var prdTypeLv2 = "#contractManagementAssetPrdTypeLv2";
    	var prdTypeLv3 = "#contractManagementAssetPrdTypeLv3";
    	var prdNm      = "#contractManagementAssetPrdNm";
    	var option     = " option:selected";
    	var optionEq   = " option:eq(0)";
    	
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
    }

    //공통 목록 조회 A20180716 k2s
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
    
    /********************************************************************
     * 계약자산관리 그리드 생성
     * Since   : 2017-12-12
     * 작성자  : Han Seong Jin
     * 수정내역: 
     ********************************************************************/
    //[Fn] jqgrid 계약자산관리 목록 
    function fnListPartnerContractFromGrid(){
		$contractMngAssetGrid.paragonGrid({
        	url: '/ctrl/contract/mng/listAsset',
        	firstData:false,
			sortable: false,
			rownumbers : true,
			rowNum:50,
			rowList:[50,100,250,500],
			height:'500px',
			multiselect:true,
			colNames : ['계약년도','계약ID','고객사명','브랜드명','점포명','파트너사','부서','시리얼','포스번호','제품범주','제품군','제조사','모델명','SPEC','CON_ID','MTN_ITEM_ID'],
			colModel : [ 
			            {name:'CON_YEAR', align:"center", fixed:true, width:"70px"},
			            {name:'CON_MTN_ID', align:"center", fixed:true, width:"120px"},
			            {name:'COMP_NM', align:"center", fixed:true, width:"120px"},
			            {name:'BRND_NM', align:"center", fixed:true, width:"120px"},
			            {name:'STR_NM', align:"center", fixed:true, width:"150px"},
			            {name:'ASP_COMP_NM', align:"center", fixed:true, width:"120px"},
			            {name:'AREA_NM', align:"center", fixed:true, width:"120px"},
			            {name:'AST_SERIAL', align:"center", fixed:true, width:"150px"},
			            {name:'AST_TYPE2', align:"center", fixed:true, width:"60px"},
			            {name:'PRD_TYPE_LV1_NM', align:"center", fixed:true, width:"120px"},
			            {name:'PRD_TYPE_LV2_NM', align:"center", fixed:true, width:"120px"},
			            {name:'PRD_TYPE_LV3_NM', align:"center", fixed:true, width:"120px"},
			            {name:'PRD_NM', align:"center", fixed:true, width:"120px"},
			            {name:'PRD_SPEC', align:"center", fixed:true, width:"120px"},
			            {name:'CON_ID',hidden:true},
			            {name:'MTN_ITEM_ID',hidden:true},
			            ],
            pager: "#contractMngAssetGridNavi",
            caption:'계약 자산 목록',
        });
		
		$contractMngAssetGrid.frozenCheckBox();
	}
    
}();

$(document).ready(function() {
	ContractMngAssetApp.init();
});
