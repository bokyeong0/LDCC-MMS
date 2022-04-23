/** Copyright (c) 2017 VertexID RND, Inc.
 * 
 * Application Name : 권역관리[StandardStoreApp]
 * Program Code     : PC0101
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * MINE 한성진		2017. 3. 16. 		First Draft.        javascript
 */
var StandardStoreApp = function () {
	"use strict";
	
	/************************************************
	 *전역 객체 선언부 (return 상위부분에 선언해야함)
	 ************************************************/
	
	// [El]권역정보 그리드standardCompanyGrid 
	var $standardStoreGrid = $("#standardStoreGrid");
	
    return {
        init: function () {
        	//권역정보관리 Grid생성
        	fnListStore();
        	//권역정보관리 Event
        	fnStoreEvents();
        	//기업분류 콤보박스
//        	fnListComboJson($("#standardStoreCompCate"), "SC0019");
        	//점포 유형
        	fnListComboJson($("#standardStoreType"), "SC0021");
        	//점포 상태
        	fnListComboJson($("#standardStoreSt"), "SC0024");
        	//지역 SelectBox
        	fnAreaComboJson($("#standardStoreAreaLv1Nm"));
        	
        	fnGetCompNameList();
        	
        	fnListAutoStrNm();
	    }
    };
    
    
    //[Fn] 이벤트 
    function fnStoreEvents(){
    	var startDate = $("#standardStoreStartDate").val();
    	var endDate = $("#standardStoreEndDate").val();
    	if(startDate === "" && endDate !== ""){
    		alert("시작일을 선택해 주세요.");
    		return;
    	}
    	if(startDate !== "" && endDate === ""){
    		alert("종료일을 선택해 주세요.");
    		return;
    	}
    	//검색폼 권역정보명 엔터키 이벤트
    	$("#standardStoreNm, #standardStoreMngCd, #standardStoreCompCd").enterEvent({
    		callBack:function(value){
   				var data = {
//   						compCate 	: $("#standardStoreCompCate").val(),
   						areaSeq 	: $("#standardStoreAreaNm").val(),
   						strSt 		: $("#standardStoreSt").val(),
   						strType 	: $("#standardStoreType").val(),
   						compCd 		: $("#standardStoreCompCd").val(),
   						brndCd 	 	: $("#standardStoreBrndCd").val(),
   						mngCd 	 	: $("#standardStoreMngCd").val(),
   						strNm 		: $("#standardStoreNm").val(),
   						startDate 	: startDate,
   						endDate 	: endDate
   				};
   				$standardStoreGrid.paragonGridSearch(data);
			}
    	})
    	
    	//검색버튼
    	$("#standardStoreSearchBtn").click(function(){
    		fnSearchListStore();
    	});
    	//행수정버튼
    	$("#standardStoreModifyBtn").click(function(){
    		fnModifyStore();
    	});
    	//행추가버튼
    	$("#standardStoreInsertBtn").click(function(){
    		var sendData = '';
    		fnSaveStore(sendData);
    	});
    	//좌표 배치
    	$("#saveLoc").click(function(){
    		fnListStrList();
    	});
    	
    	//기업분류 선택시 회사 조회
//    	$("#standardStoreCompCate").change(function(){
//    		fnGetCompNameList(this.value);
//    	});
    	$("#standardStoreCompCd").change(function(){
    		var compCd = $("#standardStoreCompCd").val();
    		fnListAutoStrNm(compCd);
    		fnGetBrndNameList(this.value);
    	});
    	$("#standardStoreBrndCd").change(function(){
    		var compCd = $("#standardStoreCompCd").val();
    		var brndCd = $("#standardStoreBrndCd").val();
    		fnListAutoStrNm(compCd, brndCd);
    	});
    	
    	$('#standardStoreCompCd').combobox({inMode:true});
    	
    	$('#standardStoreStartDate').datepicker({
    		todayHighlight: true,
    		endDate: new Date(),
            autoclose: true,
            clearBtn:true
    	});
    	
    	$('#standardStoreEndDate').datepicker({
    		autoclose: true,
    		clearBtn: true,
    		endDate: new Date(),
    	});
    	
    	$('#standardStoreAreaLv1Nm').change(function(){
    		var areaLv1Cd = $('#standardStoreAreaLv1Nm').val();
    		MMSUtil.fnMakeAreaLv2Combo($('#standardStoreAreaLv2Nm'), areaLv1Cd);
    	});
    	
    }
    
    function fnListAutoStrNm(compCd, brndCd){
    	$('#standardStoreNm').strNmAutoComplate({
			compCd:compCd,
			brndCd:brndCd,
		});
    }
    function fnAreaComboJson(target){
    	MMSUtil.fnMakeAreaLv1Combo(target);
    	$('#standardStoreAreaLv2Nm').html("<option value=''>선택</option>");
    }
	
	function fnSaveStrLatLng(result){
		for(var i in result){
			var strCd = result[i].STR_CD;
			var address = result[i].ADDR1;
			if(address != null){
				$.ajax({
					url : "/ctrl/standard/store/updateStoreLoc",
					data :{
						strCd: strCd,
						address: address,
					},
					type : "POST",
					dataType : "json",
					cache: false,
					success : function(result) {
					}
				});
			}
		}
	}
	// 배치 점포정보 가져오기
	function fnListStrList(){
		var compCd = $('#standardStoreCompCd').val();
		
		if(!compCd){
			alert("고객사를 선택해주세요");
			return;
		}
		
    	$.ajax({
    		url : "/ctrl/standard/store/listStndStrLoc",
    		data :{'compCd':compCd},
    		type : "POST",
    		dataType : "json",
    		cache: false,
    		success : function(result) {
    			console.log(result);
    			if(result.dt_grid.length == 0){
    				alert("좌표 배치할 점포가 없습니다.");
    				return;
    			}
    			fnSaveStrLatLng(result.dt_grid);
    		}
    	});
    }
	
    //[Fn] 검색 조건 매핑
    function fnSearchListStore(){
    	var startDate = $("#standardStoreStartDate").val();
    	var endDate = $("#standardStoreEndDate").val();
    	if(startDate === "" && endDate !== ""){
    		alert("시작일을 선택해 주세요.");
    		return;
    	}
    	if(startDate !== "" && endDate === ""){
    		alert("종료일을 선택해 주세요.");
    		return;
    	}
    	var areaSeq = $("#standardStoreAreaLv2Nm").val();
    	if(areaSeq == undefined || areaSeq == "") areaSeq = $("#standardStoreAreaLv1Nm").val();
	   	var data = {
//	   			compCate : $("#standardStoreCompCate").val(),
				areaSeq : areaSeq,
				strSt   : $("#standardStoreSt").val(),
				strType : $("#standardStoreType").val(),
				compCd 	: $("#standardStoreCompCd").val(),
				brndCd 	: $("#standardStoreBrndCd").val(),
				mngCd 	: $("#standardStoreMngCd").val(),
				strNm 	: $("#standardStoreNm").val(),
				startDate 	: startDate,
				endDate 	: endDate
		};
    	$standardStoreGrid.paragonGridSearch(data);
    }
    
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
    
    //고객사 목록 조회
    function fnGetCompNameList(compCate){
    	$.ajax({
    		url : "/ctrl/standard/company/listMaCompName",
    		data : {"compCate":compCate},
    		type : "POST",
    		cache: false,
    		success : function(result) {
    			var result = result.dt_grid;
    			Util.MakeBootstrapSelectBox($('#standardStoreCompCd'), result, "선택");
    		}
    	});
    }
    //권역 목록 조회
    function fnGetBrndNameList(compCd){
    	$("#standardStoreBrndCd").html('<option value="">선택</option>');
    	$.ajax({
    		url : "/ctrl/standard/company/listMaBrandName",
    		data : {"compCd":compCd},
    		type : "POST",
    		cache: false,
    		success : function(result) {
    			var result = result.dt_grid;
    			Util.MakeSelectOptions($('#standardStoreBrndCd'), result);
    		}
    	});
    }
    
    /********************************************************************
     * 권역정보관리 그리드 생성
     * Since   : 2016-10-24
     * 작성자  : Kim Jin Ho
     * 수정내역: 
     ********************************************************************/
    //[Fn] jqgrid 권역정보관리 목록 
    function fnListStore(){
		$standardStoreGrid.paragonGrid({
        	url: '/ctrl/standard/store/listStndStr',
			sortable: true,
			rownumbers : true,
			reportExcelBtn: true,
			colNames : ['회사코드','브랜드코드','점포유형코드','점포형태코드','통신사','AP여부','점포관리코드','고객사명','브랜드명','점포명','지역','주소','점포유형','점포형태','사업자번호','점포코드','대표자명','대표번호','팩스번호','작성자','작성일'],
			colModel : [ 
	            {name : 'COMP_CD', hidden:true}, 
	            {name : 'BRND_CD', hidden:true}, 
	            {name : 'STR_TYPE', hidden:true}, 
	            {name : 'STR_ST', hidden:true}, 
	            {name : 'TELECOMMUNITY_CD', align:"center", hidden:true}, 
	            {name : 'AP_YN', align:"center", hidden:true},
	            {name : 'STR_CD', align:"center",}, 
	            {name : 'COMP_NM', align:"center"}, 
	            {name : 'BRND_NM', align:"center"}, 
	            {name : 'STR_NM', align:"center"}, 
	            {name : 'AREA_NM', align:"center"}, 
	            {name : 'ADDR1', align:"center"}, 
	            {name : 'STR_TYPE_NM', align:"center", width:100}, 
	            {name : 'STR_ST_NM', align:"center", width:100}, 	            
	            {name : 'CORP_NUM', align:"center", width:120}, 
	            {name : 'MNG_CD', align:"center", width:100}, 
	            {name : 'CEO_NM', align:"center", width:100}, 
	            {name : 'PHONE_NUM', align:"center", width:120}, 
	            {name : 'FAX_NUM', align:"center", width:120}, 
	            {name:'IN_USER_ID', align:"center", width:70},
				{name : 'IN_DT', sortable : false, align:"center", width:70}
			],
            pager: "#standardStoreGridNavi",
            caption:'점포 목록',
            ondblClickRow: function(){
            	var rowId = $standardStoreGrid.jqGrid('getGridParam','selrow');
            	var strCd = $standardStoreGrid.jqGrid('getCell', rowId, 'STR_CD');
            	var compCd = $standardStoreGrid.jqGrid('getCell', rowId, 'COMP_CD');
            	var brndCd = $standardStoreGrid.jqGrid('getCell', rowId, 'BRND_CD');
            	var strType = $standardStoreGrid.jqGrid('getCell', rowId, 'STR_TYPE');
            	var strSt = $standardStoreGrid.jqGrid('getCell', rowId, 'STR_ST');
            	var compCate = $standardStoreGrid.jqGrid('getCell', rowId, 'COMP_CATE');
            	
            	var sendData = {
        		
        			"strCd"		: strCd		,
        			"compCd"	: compCd	,
        			"brndCd"	: brndCd	,
        			"strType"	: strType	,
        			"strSt"		: strSt		,
        			"compCate"	: compCate	,
            	};
            	
            	if(rowId === null){
            		alert("수정할 행 선택");
            	}else{
        	    	PopApp.paragonOpenPopup({
        	    		ajaxUrl: '/ctrl/standard/store/viewStorePop',
        	    		data:{"sendData":sendData},
        	    		id: 'modalStandardStoreViewPop',
        	    		width: '700px',
        	    		title:"점포 상세보기",
        	    		onload:function(modal){
        	    			modal.show();
        	    		}
        	    	});
            	}
            }
        });
	}
    
  //[Fn] 회사 등록 팝업 
    function fnSaveStore(sendData){
    	PopApp.paragonOpenPopup({
//    		ajaxUrl: '/ctrl/standard/store/saveStorePopup',
    		ajaxUrl: '/ctrl/standard/store/modifyStorePopup',
    		data : {"sendData" : sendData},
    		id: 'modalStandardStoreModifyPopup',
    		width: '750px',
    		title:"점포 관리",
    		onload:function(modal){
    			modal.show();
    		}
    	});
    }
    
    //[Fn] 회사 수정 팝업 
    function fnModifyStore(){
    	var rowId = $standardStoreGrid.jqGrid('getGridParam','selrow');
    	
    	if(rowId === null){
    		alert("수정할 행을 선택하세요");
    		return false;
    	}
    	
    	var strCd = $standardStoreGrid.jqGrid('getCell', rowId, 'STR_CD');
    	var compCd = $standardStoreGrid.jqGrid('getCell', rowId, 'COMP_CD');
    	var brndCd = $standardStoreGrid.jqGrid('getCell', rowId, 'BRND_CD');
    	var strType = $standardStoreGrid.jqGrid('getCell', rowId, 'STR_TYPE');
    	var strSt = $standardStoreGrid.jqGrid('getCell', rowId, 'STR_ST');
    	var compCate = $standardStoreGrid.jqGrid('getCell', rowId, 'COMP_CATE');
    	var teleComm = $standardStoreGrid.jqGrid('getCell', rowId, 'TELECOMMUNITY_CD');
    	var apYn = $standardStoreGrid.jqGrid('getCell', rowId, 'AP_YN');
    	
    	var sendData = {
			"strCd"		: strCd		,
			"compCd"	: compCd	,
			"brndCd"	: brndCd	,
			"strType"	: strType	,
			"strSt"		: strSt		,
			"compCate"	: compCate	,
			"teleComm"	: teleComm	,
			"apYn"		: apYn		,
    	};
    	
    	return fnSaveStore(sendData);
    	
    }
    
}();

$(document).ready(function() {
	StandardStoreApp.init();
});