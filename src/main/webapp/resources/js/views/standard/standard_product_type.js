/** Copyright (c) 2016 VertexID RND, Inc.
 * 
 * Application Name : 비품분류 관리[AssetCategoryApp]
 * Program Code     : NS1109
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Han Seong Jin  	2017. 11. 06.  		First Draft.
 */
var StandardProductTypeApp = function () {
	"use strict";
	
	/************************************************
	 *전역 객체 선언부 (return 상위부분에 선언해야함)
	 ************************************************/
	
	// [El]비품분류관리 그리드
	var $standardProductTypeLv1Grid = $("#standardProductTypeLv1Grid");
	var $standardProductTypeLv2Grid = $("#standardProductTypeLv2Grid");
	var $standardProductTypeLv3Grid = $("#standardProductTypeLv3Grid");
	var $standardProductTypeLv4Grid = $("#standardProductTypeLv4Grid");
	
	var gridReasonOptions;
	
    return {
        init: function () {
        	//공통코드 Select Box
        	fnCommCodeJson("SC0025");
        	
        	//제품범주 Grid생성
        	fnProductTypeLv1GridList(); 
        	//제품군 Grid생성
        	fnProductTypeLv2GridList(); 
        	//제조사 Grid생성
        	fnProductTypeLv3GridList(); 
        	//모델명 Grid생성
        	fnProductTypeLv4GridList(); 
        	
        	//품목분류관리 이벤트
        	fnProductTypeEvents();
        	
        	//LDCC 제품범주와 제품군 사용으로 버튼들 삭제
        	$('#standardProductTypeLv1AddRowBtn').remove();
        	$('#standardProductTypeLv2AddRowBtn').remove();
        	$('#standardProductTypeLv1DelRowBtn').remove();
        	$('#standardProductTypeLv2DelRowBtn').remove();
        	$('#standardProductTypeLv1SaveRowBtn').remove();
        	$('#standardProductTypeLv2SaveRowBtn').remove();
        	//$('#standardProductTypeLv3DelRowBtn').remove();
        	//$('#standardProductTypeLv4DelRowBtn').remove();
        	
	    }
    };
    
    //[Fn] 품목분류관리 이벤트 
    function fnProductTypeEvents(){
    	//제품범주 수정불가버튼
    	$("#standardProductTypeLv1BanBtn").click(function(){
    		alert("제품범주는 수정할 수 없습니다. LDCC 관리자에게 문의하세요.");
    	});

    	//제품군 수정불가버튼
    	$("#standardProductTypeLv2BanBtn").click(function(){
    		alert("제품군은 수정할 수 없습니다. LDCC 관리자에게 문의하세요.");
    	});

    	//제품범주 추가버튼
    	$("#standardProductTypeLv1AddRowBtn").click(function(){
    		if(!$standardProductTypeLv2Grid.modCheck()){
    			alert("제품군에 수정된 내용이 있습니다.\n제품군의 그룹을 저장해주세요.");
    			return;
    		}
    		if(!$standardProductTypeLv3Grid.modCheck()){
    			alert("제조사에 수정된 내용이 있습니다.\n제조사의 그룹을 저장해주세요.");
    			return;
    		}
    		$standardProductTypeLv1Grid.appendRow();
    	});
    	
    	
    	//제품군 추가버튼
    	$("#standardProductTypeLv2AddRowBtn").click(function(){
    		// ldcc 제품범주사용
//    		if(!$standardProductTypeLv1Grid.modCheck()){
//    			alert("제품범주에 수정된 내용이 있습니다.\n제품번주의 그룹을 저장해주세요.");
//    			return;
//    		}
    		if(!$standardProductTypeLv3Grid.modCheck()){
    			alert("제조사에 수정된 내용이 있습니다.\n제조사의 그룹을 저장해주세요.");
    			return;
    		}
    		if(!$standardProductTypeLv1Grid.getFocusRowId()){
    			alert("제품범주를 선택해주세요.");
    			return;
    		}
    		$standardProductTypeLv2Grid.appendRow();
    	});
    	
    	//제조사 추가버튼
    	$("#standardProductTypeLv3AddRowBtn").click(function(){
    		// ldcc 제품범주사용
//    		if(!$standardProductTypeLv1Grid.modCheck()){
//    			alert("제품범주에 수정된 내용이 있습니다.\n제품범주의 그룹을 저장해주세요.");
//    			return;
//    		}
    		// ldcc 제품군사용
//    		if(!$standardProductTypeLv2Grid.modCheck()){
//    			alert("제품군에 수정된 내용이 있습니다.\n제품군의 그룹을 저장해주세요.");
//    			return;
//    		}
    		if(!$standardProductTypeLv2Grid.getFocusRowId()){
    			alert("제품군을 선택해주세요.");
    			return;
    		}
    		$standardProductTypeLv3Grid.appendRow();
    	});
    	
    	//모델명 추가버튼
    	$("#standardProductTypeLv4AddRowBtn").click(function(){
    		// ldcc 제품범주사용
//    		if(!$standardProductTypeLv1Grid.modCheck()){
//    			alert("제품범주에 수정된 내용이 있습니다.\n제품범주의 그룹을 저장해주세요.");
//    			return;
//    		}
    		// ldcc 제품군사용
//    		if(!$standardProductTypeLv2Grid.modCheck()){
//    			alert("제품군에 수정된 내용이 있습니다.\n제품군의 그룹을 저장해주세요.");
//    			return;
//    		}
    		if(!$standardProductTypeLv2Grid.getFocusRowId()){
    			alert("제조사를 선택해주세요.");
    			return;
    		}
    		$standardProductTypeLv4Grid.appendRow();
    	});
    	
    	//제품범주 삭제버튼
    	$("#standardProductTypeLv1DelRowBtn").click(function(){
    		$standardProductTypeLv1Grid.rowDel();
    	});
    	//제품군 삭제버튼
    	$("#standardProductTypeLv2DelRowBtn").click(function(){
    		$standardProductTypeLv2Grid.rowDel();
    	});
    	//제조사 삭제버튼
    	$("#standardProductTypeLv3DelRowBtn").click(function(){
    		$standardProductTypeLv3Grid.addRowDel("이미 저장된 제조사는 삭제가 불가능합니다.");
    	});
    	//모델명 삭제버튼
    	$("#standardProductTypeLv4DelRowBtn").click(function(){
    		$standardProductTypeLv4Grid.addRowDel("이미 저장된 모델명은 삭제가 불가능합니다.");
    	});
    	
    	//제품범주 저장버튼
    	$("#standardProductTypeLv1SaveRowBtn").click(function(){
    		var prdTypeLv = "1";
    		fnSavePrdTypeGridRows($standardProductTypeLv1Grid, prdTypeLv, '#');
    	});
    	//제품군 저장버튼
    	$("#standardProductTypeLv2SaveRowBtn").click(function(){
    		var rowid = $standardProductTypeLv1Grid.getFocusRowId();
    		var prdTypePrtCd = $standardProductTypeLv1Grid.getRow(rowid).PRD_TYPE_CD;
    		var prdTypeLv = "2";
    		fnSavePrdTypeGridRows($standardProductTypeLv2Grid, prdTypeLv, prdTypePrtCd);
    	});
    	//제조사 저장버튼
    	$("#standardProductTypeLv3SaveRowBtn").click(function(){
    		var rowid = $standardProductTypeLv2Grid.getFocusRowId();
    		var prdTypePrtCd = $standardProductTypeLv2Grid.getRow(rowid).PRD_TYPE_CD;
    		var prdTypeLv = "3";
    		console.log($standardProductTypeLv2Grid.getRow(rowid));
    		console.log(prdTypePrtCd);
    		fnSavePrdTypeGridRows($standardProductTypeLv3Grid, prdTypeLv, prdTypePrtCd);
    		
    	});
    	//모델명 저장버튼
    	$("#standardProductTypeLv4SaveRowBtn").click(function(){
    		fnSavePrdRows();
    	});
    	
    	$('#standardProductTypeLv4ExcelDownBtn').click(function(){
			//다운 시 필요한 COLUMN 명을 입력
			pageTotalExcelDown();
			
    	})
    	
    }
    
    function pageTotalExcelDown(){
//    	App.prcsEnd();
		location.href='/ctrl/standard/product/pageTotalExcelDown';
    }
    
    //[Fn] Grid Select 옵션 
    function fnCommCodeJson(commCode){
    	$.ajax({
    		url : "/ctrl/settings/system/code/listCodeGroupComboJson",
    		data :{codeGroupCd:commCode},
    		type : "POST",
    		dataType : "json",
    		cache: false,
    		async:false,
    		success : function(result) {
    			gridReasonOptions = Util.MakeGridOptions(result);
    		}
    	});
    }
    
    /********************************************************************
     * 제품범주 그리드 생성
     * Since   : 2017-11-07
     * 작성자  : Han Seong Jin
     * 수정내역: 
     ********************************************************************/
    function fnProductTypeLv1GridList() {
    	$standardProductTypeLv1Grid.paragonGrid({
			url : '/ctrl/standard/product/type/listStndPrdTypeLv1',
			height : 600,
			rowNum : 9999,
			countable:false,
			sortable:true,
			rowEditable : false,
			scroll : 1,
			loadonce: true,
			rowClickColor:"yellow",
            colNames:['코드','제품범주',/*'순번','사용여부',*/'선택'],
			colModel:[
    		          {name:'PRD_TYPE_CD', hidden:true},
    		          {editable: false, name:'PRD_TYPE_NM', align:"center",
    		        	  editoptions : {
    		        		  maxlength: 30,
    		        	  }
    		          },
//    		          {editable: true, name:'PRD_TYPE_ORDER', align:"center",width:"40px", fixed :true},
//    		          {editable: true, name:'USE_YN', align:"center", width:"80px", fixed :true,
//    	                	edittype:'select',
//    			        	formatter:'select',
//    				    	editoptions: {
//    				    		value:"Y:사용;N:미사용"
//    				    	}
//    		          },
    		          {editable:false, width:"70px", align:"center", name:'EVENT', sortable:false, formatter: inMakeActionButtion}
	          ],
			caption : "제품범주",
			//로우 선택식 호출함수 [연속 호출 안함]
//			onSelectRowEvent : function(currRowData, prevRowData) {
//				//로우선택시 중분류코드 목록 조회
//				var rowid= $standardProductTypeLv1Grid.jqGrid('getGridParam','selrow');
//				var rowData = $standardProductTypeLv1Grid.getRow( rowid );
//				var prdTypeSeq = rowData.PRD_TYPE_CD;
//				if(!prdTypeSeq){
//					return;
//				}
//				$standardProductTypeLv2Grid.search({
//					"prdTypePrtCd" : prdTypeSeq,
//				});
//				$standardProductTypeLv3Grid.paragonGridClear();
//			},
			//수정모드에서 일반모드로 전환시 유효성검사
			onSaveRowValidate : function(currRowData,currRowId,grid) {
				var rowData = grid.getRow(currRowId);
				var prdTypeNm = rowData.PRD_TYPE_NM;
				
				if (prdTypeNm === "") {
					console.log(prdTypeNm);
					alert("제품범주명를 입력해주세요.");
					return false;
				//checkOverLap은 loadonce: true 에서만 사용
				}else if (grid.checkOverLap("PRD_TYPE_NM",prdTypeNm,currRowId)) {
					alert("중복된 제품범주가 존재 합니다.");
					return false;
				}
//				
//				if(!$standardProductTypeLv1Grid.modCheck()){
//					alert("저장후 선택해주세요");
//	    			return;
//				}
				return true;
			},
		});
    	
    	$standardProductTypeLv1Grid.find('.select-btn').off().live('click',function(e) {
    		e.stopPropagation();
    		// ldcc 제품범주사용
//    		if(!$standardProductTypeLv1Grid.modCheck()){
//    			return;
//    		}
    		if($(this).val() !== "undefined" && $(this).val() != ""){
    			$standardProductTypeLv1Grid.setFocus();
    			$standardProductTypeLv2Grid.paragonGridSearch({
    				prdTypePrtCd : $(this).val()
    			});
    			$standardProductTypeLv3Grid.paragonGridClear();
    			$standardProductTypeLv4Grid.paragonGridClear();
    		}else{
    			alert("저장후 선택해주세요");
    		}
    	});
    }
    
    /********************************************************************
     * 제품군 그리드 생성
     * Since   : 2017-11-07
     * 작성자  : Han Seong Jin
     * 수정내역: 
     ********************************************************************/
    function fnProductTypeLv2GridList() {
    	$standardProductTypeLv2Grid.paragonGrid({
    		url : '/ctrl/standard/product/type/listStndPrdTypeLv2',
    		height : 600,
    		rowNum : 9999,
    		countable:false,
    		sortable:true,
    		firstData:false,
    		rowEditable : false,
    		scroll : 1,
    		loadonce:true,
    		rowClickColor:"yellow",
    		colNames:['코드','제품군',/*'순번','사용여부',*/'선택'],
    		colModel:[
    		          {name:'PRD_TYPE_CD', hidden:true},
    		          {editable: false, name:'PRD_TYPE_NM', align:"center",
    		        	  editoptions : {
    		        		  maxlength: 30,
    		        	  }
    		          },
//    		          {editable: false, name:'PRD_TYPE_ORDER', align:"center", width:"40px", fixed :true},
//    		          {editable: false, name:'USE_YN', align:"center", width:"80px", fixed :true,
//    		        	  edittype:'select',
//    		        	  formatter:'select',
//    		        	  editoptions: {
//    		        		  value:"Y:사용;N:미사용",
//    		        	  }
//    		          },
    		          {editable:false, width: "70px", align: "center", name: 'EVENT',sortable:false, formatter: inMakeActionButtion}
    		          ],
    		          caption : "제품군",
    		          //로우 선택식 호출함수 [연속 호출 안함]
//    		          onSelectRowEvent : function(currRowData, prevRowData) {
//    		        	  //로우선택시 중분류코드 목록 조회
//    		        	  var rowData = $standardProductTypeLv2Grid.getRow();
//    		        	  var prdTypeSeq = rowData.PRD_TYPE_CD;
//    		        	  if(!prdTypeSeq){
//    		        		  return;
//    		        	  }
//    		        	  $standardProductTypeLv3Grid.search({
//    		        		  "prdTypePrtCd" : prdTypeSeq,
//    		        	  });
//    		          },
    		          //수정모드에서 일반모드로 전환시 유효성검사
    		          onSaveRowValidate : function(currRowData,currRowId,grid) {
    		        	  var rowData = grid.getRow(currRowId);
    		        	  var prdTypeNm = rowData.PRD_TYPE_NM;
    		        	  
    		        	  if (prdTypeNm === "") {
    		        		  alert("제품군을 입력해주세요.");
    		        		  return;
    		        		  //checkOverLap은 loadonce: true 에서만 사용
    		        	  }else if (grid.checkOverLap("PRD_TYPE_NM",prdTypeNm,currRowId)) {
    		        		  alert("중복된 제품군이 존재 합니다.");
    		        		  return false;
    		        	  }
    		        	  return true;
    		          },
    	});
    	
    	$standardProductTypeLv2Grid.find('.select-btn').off().live('click',function(e) {
    		e.stopPropagation();
    		// ldcc 제품군사용
//    		if(!$standardProductTypeLv2Grid.modCheck()){
//    			return;
//    		}
    		if($(this).val() !== "undefined" && $(this).val() != ""){
    			$standardProductTypeLv2Grid.setFocus();
    			$standardProductTypeLv3Grid.paragonGridSearch({
    				prdTypePrtCd : $(this).val()
    			});
    			$standardProductTypeLv4Grid.paragonGridClear();
    		}else{
    			alert("저장후 선택해주세요");
    		}
    	});
    	
    }
    
    /********************************************************************
     * 제조사 그리드 생성
     * Since   : 2017-11-07
     * 작성자  : Han Seong Jin
     * 수정내역: 
     ********************************************************************/
    function fnProductTypeLv3GridList(){
    	$standardProductTypeLv3Grid.paragonGrid({
			url : '/ctrl/standard/product/type/listStndPrdTypeLv3',
			firstData : false,
			height : 600,
			rowNum : 9999,
			rowEditable : true,
			countable:false,
			sortable:true,
			scroll : 1,
			loadonce:true,
			rowClickColor:"yellow",
			colNames:['코드','제조사','순번','사용여부','선택'],
    		colModel:[
    		          {name:'PRD_TYPE_CD', hidden:true},
    		          {editable: true, name:'PRD_TYPE_NM', align:"center", 
    		        	  edittype:'select',
    		        	  formatter:'select',
    		        	  editoptions: {
    		        		  value:gridReasonOptions,
    		        	  }
    		          },
    		          {name:'PRD_TYPE_ORDER', align:"center",editable: true, width:"40px", fixed :true},
    		          {editable: true, name:'USE_YN', align:"center", width:"86px", fixed :true,
    		        	  edittype:'select',
    		        	  formatter:'select',
    		        	  editoptions: {
    		        		  value:"Y:사용;N:미사용",
    		        	  }
    		          },
    		          {editable:false, align:"center",width: "70px", name: 'EVENT',sortable:false, formatter: inMakeActionButtion}
    		          ],
    		          caption : "제조사",
    		          //수정모드에서 일반모드로 전환시 유효성검사
    		          onSaveRowValidate : function(currRowData,currRowId,grid) {
    		        	  var rowData = grid.getRow(currRowId);
    		        	  var prdTypeNm = rowData.PRD_TYPE_NM;
    		        	  
    		        	  if (prdTypeNm === "") {
    		        		  alert("제조사명를 입력해주세요.");
    		        		  return false;
    		        		  //checkOverLap은 loadonce: true 에서만 사용
    		        	  }else if (grid.checkOverLap("PRD_TYPE_NM",prdTypeNm,currRowId)) {
    		        		  alert("중복된 제조사가 존재 합니다.");
    		        		  return false;
    		        	  }
    		        	  return true;
    		          },
    	});
    	
    	
    	$standardProductTypeLv3Grid.find('.select-btn').off().live('click',function(e) {
    		e.stopPropagation();
    		
    		if(!$standardProductTypeLv3Grid.modCheck()){
    			return;
    		}
    		if($(this).val() !== "undefined" && $(this).val() != ""){
    			var prdTypeLv1 = $standardProductTypeLv1Grid.getRow().PRD_TYPE_CD;
    			var prdTypeLv2 = $standardProductTypeLv2Grid.getRow().PRD_TYPE_CD;
    			$standardProductTypeLv3Grid.setFocus();
    			$standardProductTypeLv4Grid.paragonGridSearch({
    				prdTypeLv1:prdTypeLv1, 
    				prdTypeLv2:prdTypeLv2, 
    				prdTypeLv3:$(this).val()
    			});
    		}else{
    			alert("저장후 선택해주세요");
    		}
    	});
    }
    
    /********************************************************************
     * 모델명 그리드 생성
     * Since   : 2017-11-07
     * 작성자  : Han Seong Jin
     * 수정내역: 
     ********************************************************************/
    function fnProductTypeLv4GridList(){
    	$standardProductTypeLv4Grid.paragonGrid({
    		url : '/ctrl/standard/product/listProduct',
    		firstData : false,
    		height : 600,
    		rowNum : 9999,
    		rowEditable : true,
    		countable:false,
    		sortable:true,
    		shrinkToFit: true,
    		scroll : 1,
    		loadonce:true,
    		rowClickColor:"yellow",
    		colNames:['품목코드','모델명','스펙','순번','사용여부'],
    		colModel:[
    		          {editable: false, name:'PRD_CD', align:"center", width:"90px", fixed :true},
    		          {editable: true, name:'PRD_NM', align:"center", width:"120px", fixed :true},
    		          {editable: true, name:'PRD_SPEC', align:"center", width:"150px", fixed :true},
    		          {editable: true,name:'PRD_ORDER', align:"center", width:"40px", fixed :true},
    		          {editable: true, name:'USE_YN', align:"center", width:"80px", fixed :true,
    		        	  edittype:'select',
    		        	  formatter:'select',
    		        	  editoptions: {
    		        		  value:"Y:사용;N:미사용",
    		        	  }
    		          },
    		          ],
    		          caption : "모델명",
    		          //수정모드에서 일반모드로 전환시 유효성검사
    		          onSaveRowValidate : function(currRowData,currRowId,grid) {
    		        	  var rowData = grid.getRow(currRowId);
    		        	  var prdNm = rowData.PRD_NM;
    		        	  
    		        	  if (prdNm === "") {
    		        		  alert("모델명를 입력해주세요.");
    		        		  return;
    		        		  //checkOverLap은 loadonce: true 에서만 사용
    		        	  }else if (grid.checkOverLap("PRD_NM",prdNm,currRowId)) {
    		        		  alert("중복된 모델명이 존재 합니다.");
    		        		  return;
    		        	  }
    		        	  return true;
    		          },
    	});
    }
    
    function inMakeActionButtion(cellvalue, options, rowObject) {
		var prdTypePrtCd = rowObject.PRD_TYPE_CD;
		if(prdTypePrtCd){
			var reLoadButton = '<button type="button" class="btn btn-info btn-xs select-btn" value="'+ prdTypePrtCd + '" >선택</button>'
			return reLoadButton;
		}else{
			return "-";
		}
	}
    
    
    //[Fn]대,중,소 분류코드 수정된 내용저장
    function fnSavePrdTypeGridRows(grid, prdTypeLv, prdTypePrtCd) {
    	//ParamsData Key : GridData Key 
    	var camelObj = {
    			modFlag		: "MOD_FLAG",
    			prdTypeCd	: "PRD_TYPE_CD",
    			prdTypeNm	: "PRD_TYPE_NM",
    			prdTypeOrder: "PRD_TYPE_ORDER",
    			useYn		: "USE_YN",
		}
    	
    	// 그리드에서 저장이 필요한 데이터만 가져옴
    	var	gridData = grid.getGridData(camelObj);
    	
    	if(gridData.length === 0){
    		alert("저장할 데이터가 없습니다.");
    		return;
    	}
    	var sendData = {
				dt_product		: gridData		,
				prdTypeLv		: prdTypeLv		,
				prdTypePrtCd	: prdTypePrtCd	,
		}
    	console.log(sendData)
    	$.ajax({
    		url : "/ctrl/standard/product/type/saveProductType",
    		data :JSON.stringify(sendData),
    		contentType: 'application/json; charset=utf-8',
    		cache: false,
    		success : function(result) {
    			alert(result.msgTxt);
    			
    			if(prdTypeLv === "1"){
    	    		$standardProductTypeLv1Grid.search("");
    				$standardProductTypeLv2Grid.paragonGridClear();
    				$standardProductTypeLv3Grid.paragonGridClear();
    	    	}else if(prdTypeLv === "2"){
    	    		$standardProductTypeLv2Grid.search({prdTypePrtCd:prdTypePrtCd});
    	    		$standardProductTypeLv3Grid.paragonGridClear();
    	    		$standardProductTypeLv4Grid.paragonGridClear();
    	    	}else if(prdTypeLv === "3"){
    	    		$standardProductTypeLv3Grid.search({prdTypePrtCd:prdTypePrtCd});
    	    		$standardProductTypeLv4Grid.paragonGridClear();
    	    	}
    		}
    	});
    }
    
    //[Fn] 모델 그룹 저장
    function fnSavePrdRows(){
    	var camelObj = {
    			modFlag		: "MOD_FLAG",
    			prdCd		: "PRD_CD",
    			prdNm		: "PRD_NM",
    			prdSpec		: "PRD_SPEC",
    			prdOrder	: "PRD_ORDER",
    			useYn		: "USE_YN",
		}
    	
    	var	gridData = $standardProductTypeLv4Grid.getGridData(camelObj);
    	if(gridData.length === 0){
    		alert("저장할 데이터가 없습니다.");
    		return;
    	}
    	
    	var lv1Rowid = $standardProductTypeLv1Grid.getFocusRowId();
    	var lv2Rowid = $standardProductTypeLv2Grid.getFocusRowId();
    	var lv3Rowid = $standardProductTypeLv3Grid.getFocusRowId();
    	
		var prdTypeLv1 = $standardProductTypeLv1Grid.getRow(lv1Rowid).PRD_TYPE_CD;
		var prdTypeLv2 = $standardProductTypeLv2Grid.getRow(lv2Rowid).PRD_TYPE_CD;
		var prdTypeLv3 = $standardProductTypeLv3Grid.getRow(lv3Rowid).PRD_TYPE_CD;
		
		var prdTypeLv3Nm = $standardProductTypeLv3Grid.getRow(lv3Rowid).PRD_TYPE_NM;
		
    	
    	var sendData = {
				dt_product		: gridData		,
				prdTypeLv1		: prdTypeLv1	,
				prdTypeLv2		: prdTypeLv2	,
				prdTypeLv3		: prdTypeLv3	,
				prdTypeLv3Nm	: prdTypeLv3Nm	,
		}
    	
    	$.ajax({
    		url : "/ctrl/standard/product/saveProduct",
    		data :JSON.stringify(sendData),
    		contentType: 'application/json; charset=utf-8',
    		cache: false,
    		success : function(result) {
    			alert(result.msgTxt);
    			
	    		$standardProductTypeLv4Grid.search({prdTypeLv1:prdTypeLv1,
	    											prdTypeLv2:prdTypeLv2,
	    											prdTypeLv3:prdTypeLv3 });
    		}
    	});
    }
}();

$(document).ready(function() {
	StandardProductTypeApp.init();
});
