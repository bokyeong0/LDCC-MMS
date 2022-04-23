/**
 * Copyright (c) 2017 VertexID RND, Inc.
 * 
 * Application Name : 장애유형관리[StandardObstacleApp] Program Code : PC0101
 * Description : Revision History Author Date Description ------------
 * ------------- ------------------ 이현주 2017. 3. 16. First Draft. javascript
 */
var StandardObstacleApp = function() {
	"use strict";

	/***************************************************************************
	 * 전역 객체 선언부 (return 상위부분에 선언해야함)
	 **************************************************************************/

	// [El]장애분류 LV1 그리드
	var $standardObstacleLv1Grid = $("#standardObstacleLv1Grid");
	// [El]장애분류 LV2 그리드
	var $standardObstacleLv2Grid = $("#standardObstacleLv2Grid");
	// [El]장애분류 LV3 그리드
	var $standardObstacleLv3Grid = $("#standardObstacleLv3Grid");
	// [El]장애분류 LV4 그리드
	var $standardObstacleLv4Grid = $("#standardObstacleLv4Grid");

	return {
		init : function() {
			// 장애유형 Grid생성
			fnMakeObstacleGrid();

			// 장애유형 이벤트
			fnObstacleEvents();

			//TEST 시작시 장애분류(대) 검색
			stndObsCompSearchInit();
			
			
        	//LDCC 제품범주와 제품군 사용으로 버튼들 삭제
        	//$('#standardObstacleLv2DelRowBtn').remove();
        	//$('#standardObstacleLv3DelRowBtn').remove();
        	//$('#standardObstacleLv4DelRowBtn').remove();

		}
	};

	// [Fn] 이벤트
	function fnObstacleEvents() {
	 	MMSUtil.fnMakeObjstacleLv1Combo($("#standardObstacleLv1ComboBox"),"");
		// 장애분류 (대) 행추가버튼
		$("#standardObstacleLv1AddRowBtn").click(function() {
			fnObstacleLv1AddRow();
		});
		// 장애분류 (대) 행삭제버튼
		$("#standardObstacleLv1DelRowBtn").click(function() {
			$standardObstacleLv1Grid.rowDel();
		});
		// 장애분류 (대) 저장버튼
		$("#standardObstacleLv1SaveRowBtn").click(function() {
			fnSaveObstacleRows($standardObstacleLv1Grid,"1");
		});

		// 장애분류 (중) 행추가버튼
		$("#standardObstacleLv2AddRowBtn").click(function() {
			fnObstacleLv2AddRow();
		});
		// 장애분류 (중) 행삭제버튼
		$("#standardObstacleLv2DelRowBtn").click(function() {
			$standardObstacleLv2Grid.addRowDel("이미 저장된 장애구분은 삭제가 불가능합니다.");
		});
		// 장애분류 (중) 저장버튼
		$("#standardObstacleLv2SaveRowBtn").click(function() {
			fnSaveObstacleRows($standardObstacleLv2Grid,"2");
		});

		// 장애분류 (소) 행추가버튼
		$("#standardObstacleLv3AddRowBtn").click(function() {
			fnObstacleLv3AddRow();
		});
		// 장애분류 (소) 행삭제버튼
		$("#standardObstacleLv3DelRowBtn").click(function() {
			$standardObstacleLv3Grid.addRowDel("이미 저장된 장애유형은 삭제가 불가능합니다.");
		});
		// 장애분류 (소) 저장버튼
		$("#standardObstacleLv3SaveRowBtn").click(function() {
			fnSaveObstacleRows($standardObstacleLv3Grid,"3");
		});

		// 장애분류 (내용) 행추가버튼
		$("#standardObstacleLv4AddRowBtn").click(function() {
			fnObstacleLv4AddRow();
		});
		// 장애분류 (내용) 행삭제버튼
		$("#standardObstacleLv4DelRowBtn").click(function() {
			$standardObstacleLv4Grid.addRowDel("이미 저장된 장애원인은 삭제가 불가능합니다.");
		});
		// 장애분류 (내용) 저장버튼
		$("#standardObstacleLv4SaveRowBtn").click(function() {
			fnSaveObstacleRows($standardObstacleLv4Grid,"4");
		});

	 	
	    //=> 장애유형관리 제품범주 SELECT
		$("#standardObstacleLv1ComboBox").change(function(){
			$standardObstacleLv1Grid.paragonGridSearch({
				prdTypePrtCd : $(this).val()
			});
			$standardObstacleLv2Grid.paragonGridClear();
			$standardObstacleLv3Grid.paragonGridClear();
			$standardObstacleLv4Grid.paragonGridClear();			
		});	


	}

	function stndObsCompSearchInit(){
		$standardObstacleLv1Grid.paragonGridSearch({
			prdTypePrtCd : "CR20180101000118"
		});		
		$standardObstacleLv1Grid.paragonGridSearch();
		$standardObstacleLv2Grid.paragonGridClear();
		$standardObstacleLv3Grid.paragonGridClear();
		$standardObstacleLv4Grid.paragonGridClear();

	}
	
	
	function fnSearchListObstacle() {
		// 그리드 수정 여부 체크
		var data = {
				prdTypePrtCd : $("#standardObstaclePrdTypeSeq option:selected").val(),
			obsNm : $("#standardObstacleNm").val()
		};
		// 그리드 조회
		//console.log(data);
		$standardObstacleLv1Grid.paragonGridSearch(data);
	}

	
	/***************************************************************************
	 * 권역정보관리 그리드 생성 Since : 2016-10-24 작성자 : Kim Jin Ho 수정내역:
	 **************************************************************************/
	// [Fn] jqgrid 권역정보관리 목록
	function fnMakeObstacleGrid() {
		$standardObstacleLv1Grid.paragonGrid({
			url : '/ctrl/standard/product/type/listStndPrdTypeLv2',
			rowEditable : false,
			scroll : 1,
			sortable : true,
			hidegrid : false,
			firstData : false,
			rowClickColor:"yellow",
			postData : {},
			colNames : [ "PRD_TYPE_CD", "제품군", "순번","사용여부", "선택" ],
			colModel : [  {
				name 		: 'PRD_TYPE_CD',
				hidden 		: true
			}, {
				name 		: 'PRD_TYPE_NM',
				editable 	: false
			}, {
				name 		: 'PRD_TYPE_ORDER',
				width		: '50px',
				hidden 		: true,
				editable 	: false,
				align		: "center"
			}, {						
				name 		: 'USE_YN',
				width 		: "65px",
				hidden 		: true,
				editable 	: false,
				align 		: "center",
				fixed 		: true,
				edittype	: 'select',
				formatter	: 'select',
				editoptions : {
					value 	: "Y:사용;N:미사용",
				}
			}, {
				editable 	: false,
				width 		: "70px",
				align 		: "center",
				name 		: 'EVENT',
				formatter 	: inMakeActionButtion
			} ],
			caption 		: "제품군",
			onSaveRowValidate : function(currSaveData,currRowId,grid) {
				var obsNm = $("#"+currRowId+"_OBS_NM",grid);
				if (obsNm.val() == "") {
					alert("분류명을 입력해주세요.");
					obsNm.focus();
					return false;
				}
				return true;
			}
		});		
		$standardObstacleLv2Grid.paragonGrid({
					url : '/ctrl/standard/obstacle/listStndObs',
					rowEditable : true,
					scroll : 1,
					sortable : true,
					firstData : false,
					hidegrid : false,
					rowClickColor:"yellow",
					colNames : [ "SEQ", "OBS_PRT_SEQ",  "장애구분", "사용여부","순번", "선택" ],
					colModel : [ {
						name 		: 'OBS_SEQ',
						hidden 		: true
					}, {
						name 		: 'OBS_PRT_SEQ',
						hidden 		: true

					}, {
						name 		: 'OBS_NM',
						width 		: "200px",
						editable 	: true
					}, {
						name 		: 'USE_YN',
						width 		: "65px",
						editable 	: true,
						align 		: "center",
						fixed 		: true,
						edittype 	: 'select',
						formatter 	: 'select',
						editoptions : {
							value 	: "Y:사용;N:미사용",
						}
					}, {
						name 		: 'OBS_ORDER',
						width		: '50px',
						editable 	: true,
						align		: "center"
					
					}, {
						
						editable 	: false,
						width 		: "70px",
						align 		: "center",
						name 		: 'EVENT',
						formatter 	: inMakeActionButtion
					} ],
					caption : "장애구분",
					onSaveRowValidate : function(currSaveData,currRowId,grid) {
						var obsNm = $("#"+currRowId+"_OBS_NM",grid);
						if (obsNm.val() == "") {
							alert("분류명을 입력해주세요.");
							obsNm.focus();
							return false;
						}
						return true;
					}
				});
		$standardObstacleLv3Grid.paragonGrid({
					url : '/ctrl/standard/obstacle/listStndObs',
					rowEditable : true,
					scroll : 1,
					sortable : true,
					firstData : false,
					hidegrid : false,
					rowClickColor:"yellow",
					colNames : [ "SEQ", "OBS_PRT_SEQ", "장애유형","사용여부","순번", "선택" ],
					colModel : [ {
						name 		: 'OBS_SEQ',
						hidden 		: true
					}, {
						name 		: 'OBS_PRT_SEQ',
						hidden 		: true
					}, {
						name 		: 'OBS_NM',
						editable 	: true
					}, {
						name 		: 'USE_YN',
						width 		: "65px",
						editable 	: true,
						align 		: "center",
						fixed 		: true,
						edittype 	: 'select',
						formatter 	: 'select',
						editoptions : {
							value 	: "Y:사용;N:미사용",
						}
					}, {
						name 		: 'OBS_ORDER',
						width		: '50px',
						editable 	: true,
						align		: "center"					
					}, {
						editable 	: false,
						width 		: "70px",
						align 		: "center",
						name 		: 'EVENT',
						formatter 	: inMakeActionButtion
					} ],
					caption 		: "장애유형",
					onSaveRowValidate : function(currSaveData,currRowId,grid) {
						var obsNm = $("#"+currRowId+"_OBS_NM",grid);
						if (obsNm.val() == "") {
							alert("분류명을 입력해주세요.");
							obsNm.focus();
							return false;
						}
						return true;
					}
				});
		$standardObstacleLv4Grid.paragonGrid({
					url : '/ctrl/standard/obstacle/listStndObs',
					rowEditable : true,
					scroll : 1,
					sortable : true,
					firstData : false,
					hidegrid : false,
					rowClickColor:"yellow",
					colNames : [ "SEQ", "OBS_PRT_SEQ",  "장애원인", "매뉴얼","순번",
							"사용여부" ],
					colModel : [ {
						name 		: 'OBS_SEQ',
						hidden 		: true
					}, {
						name 		: 'OBS_PRT_SEQ',
						hidden 		: true
					}, {
						name 		: 'OBS_NM',
						width 		: "100px",
						editable 	: true
					}, {
						editable 	: true,
						name 		: 'OBS_MANUAL',
						width 		: "60px",
						edittype 	: 'textarea',
						editoptions : {
							rows : 5
						}
					}, {
						name 		: 'OBS_ORDER',
						width		: '50px',
						editable 	: true,
						align		: "center"
					}, {						
						name 		: 'USE_YN',
						width 		: "65px",
						editable 	: true,
						align 		: "center",
						fixed 		: true,
						edittype 	: 'select',
						formatter 	: 'select',
						editoptions : {
							value 	: "Y:사용;N:미사용",
						}
					}, ],
					caption 		: "장애원인",	
					onSaveRowValidate : function(currSaveData,currRowId,grid) {
						var obsNm = $("#"+currRowId+"_OBS_NM",grid);
						if (obsNm.val() == "") {
							alert("분류명을 입력해주세요.");
							obsNm.focus();
							return false;
						}
						return true;
					}
				});
		function inMakeActionButtion(cellvalue, options, rowObject) {
		//	console.log(rowObject);
		//	console.log(cellvalue);
			var prtSeq = rowObject.OBS_SEQ;
			if(rowObject.PRD_TYPE_CD){
				prtSeq = rowObject.PRD_TYPE_CD;
			}			
			if(prtSeq){
				var reLoadButton = '<button type="button" class="btn btn-info btn-xs m-r-5 select-btn" value="'+ prtSeq + '" >선택</button>'
				return reLoadButton;
			}else{
				return "-";
			}
		}
		$standardObstacleLv1Grid.find('.select-btn').off().live('click',function(e) {
			e.stopPropagation();
			if($(this).val() !== "undefined" && $(this).val() != ""){
				$standardObstacleLv1Grid.focusToRow();
				$standardObstacleLv2Grid.paragonGridSearch({
					obsPrtSeq : $(this).val()
				});
				$standardObstacleLv3Grid.paragonGridClear();
				$standardObstacleLv4Grid.paragonGridClear();
			}else{
				alert("저장후 선택해주세요");
			}
		});
		$standardObstacleLv2Grid.find('.select-btn').off().live('click',function(e) {
			e.stopPropagation();
//			alert($(this).val());
			if($(this).val() !== "undefined" ){
				$standardObstacleLv2Grid.focusToRow();
				$standardObstacleLv3Grid.paragonGridSearch({
					obsPrtSeq : $(this).val()
				});
				$standardObstacleLv4Grid.paragonGridClear();
			}else{
				alert("저장후 선택해주세요");
			}
		});
		$standardObstacleLv3Grid.find('.select-btn').off().live('click',function(e) {
			e.stopPropagation();
			if($(this).val() !== "undefined" ){
				$standardObstacleLv3Grid.focusToRow();
				$standardObstacleLv4Grid.paragonGridSearch({
					obsPrtSeq : $(this).val()
				});
			}else{
				alert("저장후 선택해주세요");
			}
		});
	}

	function fnObstacleLv1AddRow() {
//		var stndObsCompCd = $("#stndObsCompSearch").val();
//		if (stndObsCompCd === "") {
//			alert("회사를 선택해주세요.");
//			return;
//		}
		$standardObstacleLv1Grid.paragonGridAddRow({
			addData : {
//				COMP_CD : stndObsCompCd,/////
//				OBS_SEQ : null,
				OBS_ORDER	: "",
				OBS_PRT_SEQ : "",
				USE_YN 		: "Y"
			}
		});
	}
	function fnObstacleLv2AddRow() {
		var obsPrtSeq = $standardObstacleLv1Grid.selectRowData("PRD_TYPE_CD");
//		var stndObsCompCd = $standardObstacleLv1Grid.focusRowData("COMP_CD"); 
		if (!obsPrtSeq) {
			alert("장애분류(대)를 선택해주세요.");
			return;
		}
		$standardObstacleLv2Grid.paragonGridAddRow({
			addData : {
//				COMP_CD : stndObsCompCd,
//				OBS_SEQ : null,
//				OBS_SEQ 	: obsPrtSeq,
				OBS_ORDER	: "",
				OBS_PRT_SEQ : obsPrtSeq,
				USE_YN 		: "Y"
			}
		});
	}
	function fnObstacleLv3AddRow() {
		var obsPrtSeq = $standardObstacleLv2Grid.selectRowData("OBS_SEQ");
//		var stndObsCompCd = $standardObstacleLv2Grid.focusRowData("COMP_CD");
		if (!obsPrtSeq) {
			alert("장애분류(중)를 선택해주세요.");
			return;
		}
		$standardObstacleLv3Grid.paragonGridAddRow({
			addData : {
//				COMP_CD : stndObsCompCd,
//				OBS_SEQ : null,
				OBS_ORDER	: "",
				OBS_PRT_SEQ : obsPrtSeq,
				USE_YN 		: "Y"
			}
		});
	}
	function fnObstacleLv4AddRow() {
		var obsPrtSeq = $standardObstacleLv3Grid.selectRowData("OBS_SEQ");
//		var stndObsCompCd = $standardObstacleLv3Grid.focusRowData("COMP_CD");
		if (!obsPrtSeq) {
			alert("장애분류(소)를 선택해주세요.");
			return;
		}
		$standardObstacleLv4Grid.paragonGridAddRow({
			addData : {
//				COMP_CD : stndObsCompCd,
//				OBS_SEQ : "",
				OBS_ORDER	: "",
				OBS_PRT_SEQ : obsPrtSeq,
				USE_YN 		: "Y"
			}
		});
	}

	// [Fn] 공통코드 수정된 내용저장
	function fnSaveObstacleRows($targetGrid,obsLv) {

		var sendData = {
				obsLv: obsLv
		};
		var parseCamelData = {
			modFlag 	: "MOD_FLAG",
			obsSeq 		: "OBS_SEQ",
			obsPrtSeq 	: "OBS_PRT_SEQ",
			obsOrder 	: "OBS_ORDER",
//			compCd : "COMP_CD",
			obsNm 		: "OBS_NM",
			obsManual 	: "OBS_MANUAL",
			useYn 		: "USE_YN",
		}
		// 그리드에서 저장이 필요한 데이터만 가져옴
		var jsonData = $targetGrid.getJsonParamsData("dt_obstacle",parseCamelData, sendData);
//		var jsonData = $targetGrid.getJsonData("dt_obstacle", parseCamelData);
		var caption = $targetGrid.getCaption();
		if (!jsonData) {
			alert(caption + " : 변경된 데이터가 없습니다. ");
			return;
		}

		$.ajax({
			url : "/ctrl/standard/obstacle/saveObstacle",
			data : jsonData,
			contentType : 'application/json; charset=utf-8',
			success : function(result) {
				alert(result.msgTxt);
				$targetGrid.paragonGridReload();
			}
		});
	}
}();

$(document).ready(function() {
	StandardObstacleApp.init();
});
