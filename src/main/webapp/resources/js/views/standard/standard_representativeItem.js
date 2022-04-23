/**
 * Copyright (c) 2017 VertexID RND, Inc.
 * 
 * Application Name : 파트너사 대표품목관리[StandardRepresentativeItemApp] Program Code : PC0114
 * Description : Revision History Author Date Description ------------
 * ------------- ------------------ 김선호 2017. 12. 13. First Draft. javascript
 */

var StandardRepresentativeItemApp = function() {
	"use strict";

	/***************************************************************************
	 * 전역 객체 선언부 (return 상위부분에 선언해야함)
	 **************************************************************************/

	// [El]제품범주 그리드
//	var $standardRepreItemLv1Grid = $("#standardRepreItemLv1Grid");
	// [El]제품군 그리드
//	var $standardRepreItemLv2Grid = $("#standardRepreItemLv2Grid");
	// [El]파트너사 - 제품범주 - 제품군 그리드
	var $standardRepreItemGrid = $("#standardRepreItemGrid");
	
	// [El]고객사 그리드
	var $standardRepreItemComp = $("#standardRepreItemComp");
	// [El]브랜드 그리드
	var $standardRepreItemBrnd = $("#standardRepreItemBrnd");
	// [El]점포 & 유지보수시작일 그리드
	var $standardRepreItemStrAndDt = $("#standardRepreItemStrAndDt");
	
	var gridSelectAspCompCd = '';
	var gridSelectPrdLv1 = '';
	var gridSelectPrdLv2 = '';
	
	var selectedRowId = '';

	return {
		init : function() {
			
			//콤보박스 초기화
			fnGridSelectBoxAspInit('');
			fnGridSelectBoxPrdLv1Init('');
			fnGridSelectBoxPrdLv2Init('');
			
			// 장애유형 Grid생성
			fnMakeRepreItemGrid();

			// 장애유형 이벤트
			fnRepreItemEvents();


			//TEST 시작시 파트너사 검색
//			stndRepreItemAspCompCdSearchInit();
			
		}
	};

	// [Fn] 이벤트
	function fnRepreItemEvents(){
		// 점포 & 유지보수시작일 행저장버튼
		$("#standardRepreItemDtSaveBtn").click(function() {
			fnRepreItemDtSaveRows($standardRepreItemStrAndDt);
		});
		
		// 파트너사-제품범주-제품군 행추가버튼
		$("#standardRepreItemGridAddBtn").click(function() {
			$standardRepreItemGrid.appendRow();
		});
		
		// 파트너사-제품범주-제품군 행삭제버튼
		$("#standardRepreItemGridDelBtn").click(function() {
			$standardRepreItemGrid.rowDel();
		});
		
		// 파트너사-제품범주-제품군 행저장버튼
		$("#standardRepreItemGridSaveBtn").click(function() {
			fnRepreItemGridSaveRows($standardRepreItemGrid);
		});
	}
	
	function fnObstacleLv1AddRow() {
		$standardRepreItemGrid.paragonGridAddRow({
			addData : {
				ASP_COMP_CD	: "",
				PRD_TYPE_LV1_NM : "",
				PRD_TYPE_LV2_NM 		: ""
			}
		});
	}
	
	/***************************************************************************
	 * 권역정보관리 그리드 생성 Since : 2016-10-24 작성자 : Kim Jin Ho 수정내역:
	 **************************************************************************/
	// [Fn] jqgrid 권역정보관리 목록
	function fnMakeRepreItemGrid() {
		$standardRepreItemGrid.paragonGrid({
			url : '/ctrl/standard/representativeItem/listPartnerPrdLvGrid',
            rowEditable:true,
            cellEditable:true,
            sortable: true,
            shrinkToFit: false,
            loadonce:true,
			rowClickColor:"yellow",
			colNames : ["순번", "제품군코드", "파트너사", "제품범주", "제품군", "선택"],
			colModel : [ 
             {
  				name 		: 'REPRESENT_SEQ',
 				hidden	 	: true,
        	}, {
 				name 		: 'PRD_TYPE_LV2_CD',
 				hidden	 	: true,
        	}, {
				name 		: 'ASP_COMP_CD',
				editable 	: true,
				align		: "center",
		      	edittype	: 'select',
//		      	formatter : 'select',
	        	editoptions: { value : gridSelectAspCompCd
	        	}
			}, {
				name 		: 'PRD_TYPE_LV1_NM',
				editable 	: true,
				align		: "center",
		      	edittype	: 'select',
//		      	formatter : 'select',
	        	editoptions : {
	        					value : gridSelectPrdLv1
//	        					,    
//	        	    			
//	        		        	dataEvents: [
//	        		        	             {
//	        		        	               type: 'change',
//	        		        	               fn: function (e) {
//	        		        	                 var rowid = $("#standardRepreItemGrid").getGridParam( "selrow" );   
//	        		        	                 console.log(rowid);
//	        		        	                  var rowData =  $("#standardRepreItemGrid").getRowData(rowid);
//	        		        	                  console.log(rowData);
//	        		        	                  var value= rowData['PRD_TYPE_LV1_NM'];
//	        		        	                  var evalue = $(e.target).val();
//	        		        	                  console.log(evalue);
//	        		        	                  console.log(value);
//	        		        	                $("#select_box > option[value='"+$(e.target).val()+"']").attr("selected", "true");
//	        		        	                detailChanged(grid, "PRD_TYPE_LV2_NM",$(e.target).val());  
//    		        	               			},
//		        	             	}]
	        	}
		},{
				name 		: 'PRD_TYPE_LV2_NM',
				editable 	: true,
				align		: "center",
		      	edittype	: 'select',
//	        	formatter	: 'select',
	        	editoptions : {
	        		value	:	gridSelectPrdLv2
	        	}
		}, {
				editable 	: false,
				width 		: "70px",
				align 		: "center",
				name 		: 'EVENT',
				formatter 	: inMakeActionButtionPrd
		}],
		caption 		: "제품범주",
		//수정모드에서 일반모드로 전환시 유효성검사
		onSaveRowValidate : function(currRowData,currRowId,grid) {
			var rowData = grid.getRow(currRowId);
			var aspCompCd = rowData.ASP_COMP_CD;
			
			if (aspCompCd === "") {
				console.log(aspCompCd);
				alert("파트너사를 선택해주세요.");
				return false;
			//checkOverLap은 loadonce: true 에서만 사용
			}else if (grid.checkOverLap("ASP_COMP_CD",aspCompCd,currRowId)) {
				alert("중복된 파트너사가 존재 합니다.");
				return false;
			}
			return true;
		}
		});
		$standardRepreItemComp.paragonGrid({
					url : '/ctrl/standard/representativeItem/getCompanyList',
					rowEditable : false,
					scroll : 1,
					sortable : true,
					firstData : false,
					hidegrid : false,
					rowClickColor:"yellow",
					colNames : [ "고객사코드", "고객사그룹",  "고객사명", "선택" ],
					colModel : [ {
						name 		: 'COMP_CD',
						hidden 		: true
					}, {
						name 		: 'COMP_CATE',
						hidden 		: true
					}, {
						name 		: 'COMP_NM',
						width 		: "200px",
						editable 	: false,
						align		: "center",					
					}, {
						
						editable 	: false,
						width 		: "70px",
						align 		: "center",
						name 		: 'EVENT',
						formatter 	: inMakeActionButtionComp
					} ],
					caption : "고객사"
				});
		$standardRepreItemBrnd.paragonGrid({
					url : '/ctrl/standard/representativeItem/getBrandInfo',
					rowEditable : false,
					scroll : 1,
					sortable : true,
					firstData : false,
					hidegrid : false,
					rowClickColor:"yellow",
					colNames : [ "브랜드코드", "브랜드명", "선택" ],
					colModel : [ {
						name 		: 'BRND_CD',
						hidden 		: true
					}, {
						name 		: 'BRND_NM',
						align		: "center",
						editable	: false
					}, {
						editable 	: false,
						width 		: "70px",
						align 		: "center",
						name 		: 'EVENT',
						formatter 	: inMakeActionButtionComp
					} ],
					caption 		: "브랜드"
				});
			$standardRepreItemStrAndDt.paragonGrid({
					url : '/ctrl/standard/representativeItem/getStoreInfo',
					rowEditable : true,
					scroll 		: 1,
					rowNum		: 999,
					sortable 	: true,
					firstData 	: false,
					hidegrid 	: false,
					rowClickColor:"yellow",
					colNames : [ "점포코드", "점포명", "유지보수시작일" ],
					colModel : [{
						name 		: 'STR_CD',
						hidden 		: true
					}, {
						name 		: 'STR_NM',
						editable	: false,
						align		: "center",
					}, {
						name 		: 'MA_START_DT',
						width 		: "100px",
						editable 	: true,
						align		: "center",
	                    editoptions: {
	                        dataInit: function(el) {
	                            $(el).datepicker({
	                        		todayHighlight: true,  
	                        		autoclose: true,
	                            });
	                        }
	                    }
					}],
					caption 		: "점포 및 유지보수시작일",	
					onSaveRowValidate : function(currSaveData,currRowId,grid) {
						var startDt = $("#"+currRowId+"_START_DT",grid);
						if (startDt.val() == "") {
							alert("유지보수시작일을 선택해주세요.");
							startDt.focus();
							return false;
						}
						return true;
					},
					onSaveRowValidate : function(currRowData,currRowId,grid) {
						var rowData = grid.getRow(currRowId);
						var strCd = rowData.STR_CD;
						
						if (grid.checkOverLap("STR_CD",strCd,currRowId)) {
							alert("중복된 점포가 존재 합니다.");
							return false;
						}
						return true;
					}
		});
			
		//파트너사-제품군 그리드 관련 선택버튼
		function inMakeActionButtionPrd(cellvalue, options, rowObject) {
			var REPRESENT_SEQ = rowObject.REPRESENT_SEQ;
			if(REPRESENT_SEQ){
				var reLoadButton = '<button type="button" class="btn btn-info btn-xs m-r-5 select-btn" value="'+ REPRESENT_SEQ + '" >선택</button>'
				return reLoadButton;
			}else{
				return "-";
			}
		}
		//고객사관련 선택버튼
		function inMakeActionButtionComp(cellvalue, options, rowObject) {
			var compCd = rowObject.COMP_CD;
			if(rowObject.BRND_CD){
				compCd = rowObject.BRND_CD;
			}			
			if(compCd){
				var reLoadButton = '<button type="button" class="btn btn-info btn-xs m-r-5 select-btn" value="'+ compCd + '" >선택</button>'
				return reLoadButton;
			}else{
				return "-";
			}
		}		
		
		//제품군 선택버튼 클릭
		$standardRepreItemGrid.find('.select-btn').off().live('click',function(e) {
			e.stopPropagation();
			
			if($(this).val() !== "undefined" ){
				$standardRepreItemGrid.focusToRow();
				$standardRepreItemComp.paragonGridSearch();
				$standardRepreItemBrnd.paragonGridClear();
				$standardRepreItemStrAndDt.paragonGridClear();
			}else{
//				alert("저장후 선택해주세요");
			}
		});		
		//고객사 선택버튼 클릭
		$standardRepreItemComp.find('.select-btn').off().live('click',function(e) {
			e.stopPropagation();
			
			if($(this).val() !== "undefined" ){
				$standardRepreItemComp.focusToRow();
				$standardRepreItemBrnd.paragonGridSearch({
					compCd : $(this).val()
				});
				$standardRepreItemBrnd.paragonGridClear();
				$standardRepreItemStrAndDt.paragonGridClear();
			}else{
//				alert("저장후 선택해주세요");
			}
		});
		//브랜드 선택버튼 클릭
		$standardRepreItemBrnd.find('.select-btn').off().live('click',function(e) {
			e.stopPropagation();

			if($(this).val() !== "undefined" ){
				$standardRepreItemBrnd.focusToRow();
				$standardRepreItemStrAndDt.paragonGridSearch({
					brndCd		:	$(this).val(),
					aspCompCd	:	$standardRepreItemGrid.getRow('','ASP_COMP_CD',''),
					prdTypeCd	:	$standardRepreItemGrid.getRow('','PRD_TYPE_LV2_CD',''),
				});
			}else{
//				alert("저장후 선택해주세요");
			}
		});
		$standardRepreItemBrnd.find('.select-btn').off().live('change',function(e) {
			
		});
		
	}
	
	//파트너사 콤보박스
	function fnGridSelectBoxAspInit(){
    	$.ajax({
    		url : "/ctrl/standard/representativeItem/getAspCompanyList",
    		type : "POST",
    		dataType : "json",
    		cache: false,
    		async:false,
    		success : function(result) {
    			gridSelectAspCompCd = Util.MakeGridOptions(result);
    		}
    	});
	};
	//제품범주 콤보박스
	function fnGridSelectBoxPrdLv1Init(){
    	$.ajax({
    		url : "/ctrl/standard/representativeItem/listStndPrdTypeLv1",
    		type : "POST",
    		dataType : "json",
    		cache: false,
    		async:false,
    		success : function(result) {
    			gridSelectPrdLv1 = Util.MakeGridOptions(result);
    		}
    	});
	};
	//제품군 콤보박스
	function fnGridSelectBoxPrdLv2Init(sendData){
		console.log(sendData);
    	$.ajax({
    		url : "/ctrl/standard/representativeItem/listStndPrdTypeLv2",
    		data :{prdTypeLv1:sendData},
    		type : "POST",
    		dataType : "json",
    		cache: false,
    		async:false,
    		success : function(result) {
    			gridSelectPrdLv2 = Util.MakeGridOptions(result);
    		}
    	});
	};
	
	// [Fn] 공통코드 수정된 내용저장
	function fnRepreItemDtSaveRows($targetGrid) {
		
		var compCd		=	$standardRepreItemComp.getRow('','COMP_CD','');
		var brndCd		=	$standardRepreItemBrnd.getRow('','BRND_CD','');
    	
    	var camelObj = {
			modFlag		: 	"MOD_FLAG",
			strCd		:	"STR_CD",
			maStartDt	:	"MA_START_DT"
    	};    	
    	
    	var	gridData = $standardRepreItemStrAndDt.getGridData(camelObj);    	
    	
    	var sendData = {
    			"dt_data"		: gridData,
    			"compCd"		: compCd,
    			"brndCd"		: brndCd,
    	}
        var jsonStr = JSON.stringify(sendData);
		
    	//수정여부체크 js 추가

		$.ajax({
			url : "/ctrl/standard/representativeItem/insertStoreAndMaStartDt",
			data : jsonStr,
			contentType : 'application/json; charset=utf-8',
			success : function(result) {
				alert(result.msgTxt);
				$targetGrid.paragonGridReload();
			}
		});
	}
	
	// [Fn] 공통코드 수정된 내용저장
	function fnRepreItemGridSaveRows($targetGrid) {
    	
    	var camelObj = {
			modFlag			: 	"MOD_FLAG",
			representSeq	:	"REPRESENT_SEQ",
			aspCompCd		:	"ASP_COMP_CD",
			prdTypeLv2Cd	:	"PRD_TYPE_LV2_CD",
			prdTypeLv2Nm	:	"PRD_TYPE_LV2_NM"
    	};    	

    	var	gridData = $standardRepreItemGrid.getGridData(camelObj);    
	    	
    	var sendData = {
    			"dt_data"		: gridData,
    	}
        var jsonStr = JSON.stringify(sendData);
		
    	//수정여부체크 js 추가

		$.ajax({
			url : "/ctrl/standard/representativeItem/updatePartnerPrdLvGrid",
			data : jsonStr,
			contentType : 'application/json; charset=utf-8',
			success : function(result) {
				alert(result.msgTxt);
				$standardRepreItemGrid.search();
			}
		});
	}
	
}();

$(document).ready(function() {
	StandardRepresentativeItemApp.init();
});
