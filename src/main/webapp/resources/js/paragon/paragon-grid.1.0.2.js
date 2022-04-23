(function ($) {
	
	/* Data : 2017-08-01　 　　　　　　　　　　　　　　　　　  */
	/* ┌───────────────────────────────────────────────┐ */
	/* │　　　　　　　 PARAGON GRID 함수정리　시작　　　　 │ */
	/* └───────────────────────────────────────────────┘ */
	
	/********************************************************************
	 * MENUAL 001 : 그리드 맨앞줄 행추가
	 ********************************************************************/ 
	$.fn.prependRow = function(callBack){
		addNewRow("first",callBack,$(this));
	}
	
	
	/********************************************************************
	 * MENUAL 002 : 그리드 맨뒷줄 행추가
	 ********************************************************************/ 
	$.fn.appendRow = function(callBack){
		addNewRow("last",callBack,$(this));
	}
	
	/********************************************************************
	 * MENUAL 003 : 그리드에서 선택된 로우는 modFlag를 DELETE로 변경
	 ********************************************************************/ 
	$.fn.rowDel = function(){
		var grid = $(this);
    	var rowid= grid.jqGrid('getGridParam','selrow');
    	fnChkDeleteToggle(grid,rowid);
	}
	
	$.fn.addRowDel = function(msg){
		var grid = $(this);
		var rowid= grid.jqGrid('getGridParam','selrow');
		var rowData = grid.getRowData(rowid);
		
		if(rowData.MOD_FLAG == "INSERT"){
			grid.jqGrid('delRowData',rowid);
		}else if(msg !== undefined){
			alert(msg);
		}
//		fnChkDeleteToggle(grid,rowid);
	}
	
	/********************************************************************
     * MENUAL 004 : 체크 박스에 체크된 로우는 modFlag를 DELETE로 변경
     * 		      multiselect: true에서만 작동
     ********************************************************************/ 
	$.fn.chkRowDel = function(){
		var grid = $(this);
		var ids = grid.getDataIDs();
		var gridId = grid.attr("id");
		for (var i = 0; i < ids.length; i++) {
			var chk = $("input:checkbox[id='jqg_"+gridId+"_" + ids[i] + "']").is(":checked");
			if(chk == true){
				fnChkDeleteToggle(grid,ids[i])
			}
		}
	}
	
	/********************************************************************
	 * MENUAL 005 : 그리드에서 선택된 로우 제거
	 ********************************************************************/ 
	$.fn.rowRemove = function(){
		var grid = $(this);
		var rowid= grid.jqGrid('getGridParam','selrow');
		if(!rowid){
			return false;
		}else{
			grid.jqGrid('delRowData',rowid);
		}
		
	}
	
	/********************************************************************
	 * MENUAL 006 : 체크 박스에 체크된 로우 제거
	 * 		      multiselect: true에서만 작동
	 ********************************************************************/ 
	$.fn.chkRowRemove = function(){
		var grid = $(this);
		var ids = grid.getDataIDs();
		var gridId = grid.attr("id");
		for (var i = 0; i < ids.length; i++) {
			var chk = $("input:checkbox[id='jqg_"+gridId+"_" + ids[i] + "']").is(":checked");
			if(chk == true){
				grid.jqGrid('delRowData',ids[i]);
			}
		}
	}
	
	/********************************************************************
 	 * MENUAL 007 : 해당로우의 object또는dataKey가 존제시 value값을 리턴
 	 *              rowid값이 없을경우 select된로우값 리턴
 	 ********************************************************************/
 	$.fn.getRow = function(rowid,dataKey,all){
		var grid = $(this);
		if(!rowid || rowid ==""){
			rowid= grid.jqGrid('getGridParam','selrow');
		}
		if(!rowid){
			return false;
		}
		var rowData = grid.getRowData(rowid);
		var returnData = fnCheckInput(rowData,all,rowid);
		if(dataKey != "" && typeof dataKey == "string"){
			return returnData[dataKey];
		}else if(typeof dataKey == "object"){
			return fnObjToCamel(rowData,dataKey);
		}
		return returnData;
	}
 	
	/********************************************************************
	 * MENUAL 008 : 체크 박스에 체크된 로우값을 ArrayObject로 return
	 * 		      체크된 로우가 없으면 false
	 ********************************************************************/ 
	$.fn.getChkRow = function(camelObj){
		var grid = $(this);
		
		//마지막행 수정여부 체크
		if(!fnRowModifyCheck(grid)){
			return false;
		}
		
		var ids = grid.getDataIDs();
		var gridId = grid.attr("id");
		var rtnArrayData = [];
		for (var i = 0; i < ids.length; i++) {
			var rowid = ids[i];
			var chk = $("input:checkbox[id='jqg_"+gridId+"_" + rowid + "']").is(":checked");
			if(chk == true){
				
				var gridRowData = grid.getRow(rowid);
				var rtnRowData ={};
				if(camelObj){
					rtnRowData= fnObjToCamel(gridRowData,camelObj)
				}else{
					rtnRowData= fnCheckInput(gridRowData);
				}
				rtnArrayData.push(rtnRowData);
			}
		}
		if(rtnArrayData.length == 0){
			return false;
		}else{
			return rtnArrayData;
		}
	}
	
	/********************************************************************
	 * MENUAL 009 : 그리드에서 수정된  로우데이터를 가져온다
	 *              getGridData(obj, true) 호출시 미수정 데이터도 리턴
	 ********************************************************************/
	$.fn.getGridData = function(camelObj,allFlag){
		var grid = $(this);
        if(!fnCheckEditMode(grid)){
        	return false;
		}
		var gridRowData = grid.getRowData();
		var rtnArrayData = [];
		if(camelObj){
			for (var i = 0; i < gridRowData.length; i++) {
				if(gridRowData[i].MOD_CHECK != "" || allFlag){
					var rtnRowData = fnObjToCamel(gridRowData[i],camelObj);
					rtnArrayData.push(rtnRowData);
				}
			}
		}else{
			for (var i = 0; i < gridRowData.length; i++) {
				if(gridRowData[i].MOD_CHECK != "" ||  allFlag ){
					var rtnRowData = fnCheckInput(gridRowData[i]);
					rtnArrayData.push(rtnRowData);
				}
			}
		}
		var editMode = grid.data("edit-mode");
		if(editMode){
			startEditMode(grid);
		}
		return rtnArrayData;
	}
	
	/********************************************************************
	 * MENUAL 010 : 그리드의 모든 로우데이터 삭제 
	 ********************************************************************/ 
	$.fn.delRows = function(){
		var grid = $(this);
		var ids = grid.getDataIDs();
        for (var i = 0; i < ids.length; i++) {
        	grid.jqGrid('delRowData',ids[i]);
        }
	}
	
	/********************************************************************
     * MENUAL 011 : 그리드 완전석제
     ********************************************************************/ 
	$.fn.delGrid = function(){
		var grid = $(this);
		var gridId = $(this).attr("id");
		var gridWapper =  $("#"+gridId+"_wrap");
		var newGrid = $("<table />",{id:gridId});
		gridWapper.html(newGrid);
		return newGrid;
	}
	
	/********************************************************************
     * MENUAL 012 : 그리드 로우 선택 제거 
     ********************************************************************/ 
	$.fn.unSelect = function(){
		var grid = $(this);
		grid.data("lastSelection","");
		grid.data("pravSelection","");
		grid.resetSelection();		 
	}
	
	/********************************************************************
	 * MENUAL 013 : 그리드 타이틀 가져오기(Caption)
	 ********************************************************************/ 
	$.fn.getCaption = function(){
		var id = $(this).attr("id");
		var caption = $("#"+id+"_caption").text();
		return caption;
	}
	
	/********************************************************************
	 * MENUAL 014 :그리드 타이들 변경하기 (Caption)
	 ********************************************************************/ 
	$.fn.setCaption = function(text){
		var id = $(this).attr("id");
		$("#"+id+"_caption").html(text);
	}
	
	/********************************************************************
	 * MENUAL 015 : 그리드에서 중복된 데이터 체크 (key:키값,value:데이터값, rowid:기준rowid)
	 ********************************************************************/ 
	$.fn.checkOverLap = function(key, value, rowid){
		var grid = $(this);
		var ids = grid.jqGrid('getDataIDs');
		if(value){
			for (var i = 0; i <= ids.length; i++) {
				if (rowid != ids[i]) {
					var lastRowData = grid.getRowData(ids[i]);
					if (lastRowData[key] == value) {
						return true;
					}
				}
			}
		}
		return false;
	}
	
	/********************************************************************
	 * MENUAL 016 : 그리드 검색조회
	 ********************************************************************/ 
 	$.fn.search = function(data) {
        $(this).setGridParam({
        	datatype: "json",
        	page: 1,
            postData:data
        }).trigger("reloadGrid");
 	};
 	/********************************************************************
 	 * MENUAL 017 : 그리드 refresh
 	 ********************************************************************/ 
 	$.fn.reload = function() {
 		$(this).trigger("reloadGrid");
 	};
 	
 	/********************************************************************
 	 * MENUAL 018 : 그리드 수정된 데이터 확인 (수정된 데이터가 있으면 false & 없으면 true)
 	 * 			    msg가 넘어올경우 해당 문자로 confirm창을 연다 
 	 ********************************************************************/
 	$.fn.modCheck = function(msg){
		var data = $(this).getRowData();
		for (var i = 0; i < data.length; i++) {
			if(data[i].MOD_FLAG != "" && data[i].MOD_FLAG !== undefined){
				if(msg){
					if(confirm(msg)){
						$(this).data("lastSelection","");
						return true;
					}else{
						return false;
					}
				}else{
					return false;
				}
			}
		}
		$(this).data("lastSelection","");
		return true;
	}
 	
 	/********************************************************************
 	 * MENUAL 019 : 해당로우의 dataKey에 value값 삽입
 	 *              rowid값이 없을경우 select된로우에 삽입
 	 ********************************************************************/
 	$.fn.setCell = function(dataKey,value,rowid){
 		var grid = $(this);
 		if(!rowid || rowid ==""){
 			rowid= grid.jqGrid('getGridParam','selrow');
 		}
 		var rowData = grid.getRowData(rowid);
 		var targetValue = rowData[dataKey];
 		if(targetValue && targetValue.length > 0 && targetValue.indexOf('input') > 0 ){
 			var obj = $(targetValue); 	
 			if(!obj.is( "input[type='text']" ) ){
 				var el = $("#"+rowid+"_"+dataKey);
 				if(!el.is("input[type='text']")){
 					el.find("input").val(value);
 				}else{
 					el.val(value);
 				}
			}else{
				$("#"+obj.attr("id")).val(value);
			}
			
		}else{
			var editMode = grid.data("edit-mode");
			if(editMode){
				grid.jqGrid('editRow',rowid,false,'clientArray');
				grid.jqGrid('setCell', rowid, dataKey, value);
				startEditModeRow(grid,rowid);
			}else{
				grid.jqGrid('setCell', rowid, dataKey, value);
				grid.jqGrid('saveRow',rowid,false,'clientArray');
				
			}
		}
 		fnChkModFlag(grid, rowid);
 	}
 	/********************************************************************
 	 * # paragon Grid 옵션에 rowClickFocus:true를 주게되면
 	 * # 로우 선택시 자동으로 Focus 된다  
 	 * # Focus는 grid 자체 select된 로우값외에 별도로 관리 할수 있다
 	 * 
 	 *   MENUAL 020 : focus된 로우의 object또는dataKey가 존제시 value값을 리턴
 	 *              rowid값이 없을경우 select된로우값 리턴
 	 ********************************************************************/
 	$.fn.getFocusRow = function(dataKey){
		var grid = $(this);
		var rowid= grid.find("tbody > tr.jqgrow.focus-row").attr('id'); 
		var rowData = grid.getRowData(rowid);
		
		var returnData = fnCheckInput(rowData);
		if(dataKey){
			return returnData[dataKey];
		}
		return returnData;
	}
 	/********************************************************************
 	 * MENUAL 021 : focus된 로우의 rowid값 리턴
 	 ********************************************************************/
	$.fn.getFocusRowId = function(){
		var grid = $(this);
		return grid.find("tbody > tr.jqgrow.focus-row").attr('id'); 
	}
	/********************************************************************
	 * MENUAL 022 : 모든 포커스 해제
	 ********************************************************************/
	$.fn.unFocus = function(){
		var grid = $(this);
		grid.find("tbody > tr.jqgrow").removeClass("focus-row");
	}
	/********************************************************************
	 * MENUAL 023 : 선택된 로우 또는 해당ID값의 로우에 focus한다
	 ********************************************************************/
	$.fn.setFocus = function(id){
		var grid = $(this);
		if(id){
			grid.find("#"+id).addClass("focus-row");
		}else{
			var rowid= grid.jqGrid('getGridParam','selrow');
			grid.find("tbody > tr.jqgrow").removeClass("focus-row");
			grid.find("#"+rowid).addClass("focus-row");
		}
	}
 	
	/********************************************************************
	 * MENUAL 024 : 그리드 row의 카운트를 리턴
	 ********************************************************************/
	$.fn.getCount = function(){
		var grid = $(this);
		return grid.getGridParam("reccount");
	}
	/********************************************************************
	 * MENUAL 025 : 그리드의 modFlag가 DELETE인 카운트를 리턴
	 ********************************************************************/
	$.fn.getDelCount= function(){
		var grid = $(this);
		var gridRowData = grid.getRowData();
		var delCount = 0;
		for (var i = 0; i < gridRowData.length; i++) {
			if(gridRowData[i].MOD_FLAG == "DELETE" ){
				delCount ++;
			}
		}
		return delCount;
	}
	
	/********************************************************************
	 * MENUAL 025 : 그리드의 modFlag가 UPDATE인 카운트를 리턴
	 ********************************************************************/
	$.fn.getModCount= function(){
		var grid = $(this);
		var gridRowData = grid.getRowData();
		var upCount = 0;
		for (var i = 0; i < gridRowData.length; i++) {
			if(gridRowData[i].MOD_FLAG == "UPDATE" ){
				upCount ++;
			}
		}
		return upCount;
	}
	
	/********************************************************************
	 * MENUAL 025 : 그리드의 rowid 리턴
	 ********************************************************************/
	$.fn.getRowid= function(){
		
		return $(this).jqGrid('getGridParam','selrow');
	}
	
	/********************************************************************
	 * MENUAL 025 : 그리드의 rowid 리턴
	 ********************************************************************/
	$.fn.frozenCheckBox= function(){
		var grid = $(this);

		grid.jqGrid('setColProp', 'cb', {frozen: true});
		grid.jqGrid('setGridParam', {multiselect: false});
		grid.jqGrid('setFrozenColumns');
		grid.jqGrid('setGridParam', {multiselect: true});
	}
	
	

	
	/*****************************(공통)*********************************
	 * MENUAL 000 : 로우데이터가 Edit모드일경우 일반모드로 변경
	 ********************************************************************/
	function fnCheckEditMode(grid){
		var lastSelection = grid.data("lastSelection");
		var lastCellSelection = grid.data("lastCellSelection");
		var ids = grid.jqGrid('getDataIDs');
		var model = grid.jqGrid ('getGridParam', 'colModel');
		var editMode = grid.data("edit-mode");
		var options=  grid.jqGrid('getGridParam');
		var ids = grid.jqGrid('getDataIDs');

        if(editMode){
        	 for (var i = 0; i < ids.length; i++) {
        		var rowid =ids[i];
        		if(options.onSaveRowValidate ){
        			if(!options.onSaveRowValidate( grid.getRow( rowid),rowid,grid)){
        				grid.setSelection(rowid,false);
        				return false;
        			}
        		}
        		
				grid.jqGrid('saveRow',rowid,false,'clientArray');
        		
        		var lastRowData = grid.getRowData(rowid);
    			var lastOriVal = lastRowData.MOD_VAL;
    			var lastModCheck = lastRowData.MOD_CHECK;
    			var lastModFalg = lastRowData.MOD_FLAG;

    			var lastVal = "";
    			for (var g = 0; g < model.length; g++) { 
    				if (model[g].editable) {
    					lastVal += (lastRowData[model[g].name] + "|");
    				}
    			}
    			var gridId = grid.attr("id");
    			if (lastModFalg != "DELETE" ) {
					if (lastOriVal != lastVal ) {
						if (lastModFalg != "INSERT"  ) {
							grid.jqGrid('setCell', rowid, 'MOD_CHECK','<i class="fa fa-repeat" />');
							if (lastModCheck == "" || lastModFalg == "DELETE") {
								grid.jqGrid('setCell', rowid, 'MOD_FLAG','UPDATE');
							}
						}
					} else {
						if (lastModFalg != "INSERT") {
							grid.jqGrid('setCell', rowid, 'MOD_CHECK', null);
							grid.jqGrid('setCell', rowid, 'MOD_FLAG', null);
						}
					}
				}
    			
    			grid.data("rowid","");
    			grid.jqGrid('editRow',rowid,false,'clientArray');
			}
        	 for (var i = 0; i < ids.length; i++) {
         		var rowid2 =ids[i];
         		grid.jqGrid('saveRow',rowid2,false,'clientArray');
         	}
     	   	return true;
        }
		
		//cell수정모드
		var celEditable = options.cellEditable;
		if(options.onSaveRowValidate && lastSelection && lastSelection !=""){
			if(!options.onSaveRowValidate( grid.getRow( lastSelection),lastSelection,grid)){
				grid.setSelection(lastSelection,false);
				return false;
			}
		}
		if(celEditable){
			for (var i = 1; i <= ids.length; i++) {
				grid.jqGrid('saveRow',ids[ids.length-i],false,'clientArray');
			}
	        grid.jqGrid('setGridParam', {cellEdit: true});
			grid.jqGrid('saveCell', lastSelection, lastCellSelection, true);
			grid.jqGrid('setGridParam', {cellEdit: false});
		}else{
			for (var i = 1; i <= ids.length; i++) {
				grid.jqGrid('saveRow',ids[ids.length-i],false,'clientArray');
			}
		}

		if (lastSelection) {
			var lastRowData = grid.getRowData(lastSelection);
			var lastOriVal = lastRowData.MOD_VAL;
			var lastModCheck = lastRowData.MOD_CHECK;
			var lastModFalg = lastRowData.MOD_FLAG;

			var lastVal = "";
			for (var i = 0; i < model.length; i++) {
				if (model[i].editable) {
					lastVal += (lastRowData[model[i].name] + "|");
				}
			}
			if (lastOriVal != lastVal) {
				if (lastModFalg != "INSERT") {
					grid.jqGrid('setCell', lastSelection, 'MOD_CHECK','<i class="fa fa-repeat" />');
					if (lastModCheck == "" || lastModFalg == "DELETE") {
						grid.jqGrid('setCell', lastSelection, 'MOD_FLAG','UPDATE');
					}
				}
			} else {
				if (lastModFalg != "INSERT") {
					grid.jqGrid('setCell', lastSelection, 'MOD_CHECK', null);
					grid.jqGrid('setCell', lastSelection, 'MOD_FLAG', null);
				}
			}
			grid.data("lastSelection","");
        }
		return true;
	}
	
	
	
	
	/*****************************(공통)*********************************
	 * MENUAL 000 : 해당데이터에 input이 있을경우 값을 input값 변경
	 ********************************************************************/
	function fnCheckInput(rowData, all,rowid){
		if(!all){
			delete rowData["MOD_CHECK"];
			delete rowData["MOD_VAL"];
		}
		var returnData = {};
		$.each( rowData, function( key, value ) {
			if(value.length > 0 && value.indexOf('input', 1) > 0 ){
				var obj = $(value);
				if(obj.is( "input[type=radio]" ) ){
					value = obj.is(":checked") ?"Y":"N";
					returnData[key] = value;
				}else if(!obj.is( "input[type='text']" ) ){
					returnData[key] =obj.find("input[type='text']").val();
				}else{
					returnData[key] = $("#"+obj.attr("id")).val();
				}
			}else{
				var selectEl = $("select#"+rowid+'_'+key);
				if(selectEl.is("select")){
					returnData[key] = selectEl.val();
				}else{
					returnData[key] = value;
				}
			}
		});
		return returnData;
	}
	/*****************************(공통)*********************************
	 * MENUAL 000 : 해당데이터로우 데이터에서 원하는 값을 camel로 변경
	 ********************************************************************/
	function fnObjToCamel(dataObj, camelObj){
		
		var returnData = {};
		$.each( camelObj, function( camelKey, camelValue ) {
			if(camelValue.gridClass){
				var tempObj = $("<div/>");
				tempObj.html(dataObj[camelValue.gridKey]);
				var objValue = tempObj.find("."+camelValue.gridClass).text();
				rtnRowData[camelKey] = objValue;
			}else{
				var objValue = dataObj[camelValue];
				if(objValue){
					if(objValue.length > 0 && objValue.indexOf('input', 1) > 0 ){
						var el = $(objValue);
						if(el.is( "input[type=radio]" ) ){
							returnData[camelKey] = el.is(":checked") ?"Y":"N";
						}else{
							returnData[camelKey] = $("#"+el.attr("id")).val();
						}
					}else if(objValue.length > 0 && objValue.indexOf('button', 1) > 0 ){
						returnData[camelKey] = "";
					}else{
						returnData[camelKey] = objValue;
					}
				}else{
					returnData[camelKey] = "";
				}
				
			}
		});
		return returnData;
	}
	
	
	/*****************************(공통)*********************************
	 * MENUAL 000 : 그리드 로우추가 flag :first앞에추가,last 뒤에추가
	 ********************************************************************/ 
	function addNewRow(flag,callBack,grid){

		var maxRowId = grid.data("maxRowId");
		console.log(maxRowId);
		if(!fnRowModifyCheck(grid)){
			return false;
		}
		var maxRowId = grid.data("maxRowId");
 		var settings = $.extend({
 			addData : {},
			startCallBack : null
        }, callBack );

 		if(settings.startCallBack){
			if(!settings.startCallBack()){
				return;
			}
		}
 		var initDefaultdata = {'MOD_FLAG':'INSERT','MOD_CHECK':'<i class="fa fa-plus" />'};
 		$.each( settings.addData, function( key, value ) {
 			initDefaultdata[key] = value;
		});
    	var ids = grid.getDataIDs();
    	var thisRowId = "add"+(ids.length+1);
    	
    	if($.isNumeric(maxRowId)){
    		thisRowId = parseInt(maxRowId)+1;
    	}else if(maxRowId){
    		var numid = maxRowId.substring(3);
    		thisRowId = parseInt(numid)+1;
    	}
		var parameters ={
		    rowID : thisRowId ,
		    initdata : initDefaultdata,
		    position :flag,
		    useDefValues : false,
		    useFormatter : false,
		    addRowParams : {extraparam:{}}
		}
		
		grid.jqGrid('addRow',parameters);
		grid.jqGrid('editRow',thisRowId, {keys: true} );
		grid.data("lastSelection",thisRowId);
		grid.data("lastSelectionIdx",1);
		grid.data("lastCellSelection",null);
		grid.data("maxRowId",thisRowId);
	}
	
	
	/*****************************(공통)*********************************
	 * MENUAL 000 : 그리드(grid)의 ROW EDIT모드시 마지막 선택행 로우(rowid) 수정 여부 체크
	 ********************************************************************/ 
	function fnRowModifyCheck(grid){
		
		var lastSelection = grid.data("lastSelection");
        var lastCellSelection = grid.data("lastCellSelection");
		// 미저장 로우 저장
		var ids = grid.jqGrid('getDataIDs');
		var options=  grid.jqGrid('getGridParam');
		var celEditable = options.cellEditable;
		var editMode = grid.data("edit-mode");
		if(options.onSaveRowValidate && lastSelection && lastSelection !=""){
			if(!editMode){
				if(!options.onSaveRowValidate( grid.getRow( lastSelection),lastSelection,grid)){
					grid.setSelection(lastSelection,false);
					return false;
				}
			}
		}
		
		if(!editMode){
			if(celEditable){
				for (var i = 1; i <= ids.length; i++) {
					grid.jqGrid('saveRow',ids[ids.length-i],false,'clientArray');
				}
		        grid.jqGrid('setGridParam', {cellEdit: true});
				grid.jqGrid('saveCell', lastSelection, lastCellSelection, true);
				grid.jqGrid('setGridParam', {cellEdit: false});
			}else{
				for (var i = 1; i <= ids.length; i++) {
					grid.jqGrid('saveRow',ids[ids.length-i],false,'clientArray');
				}
			}
		}
		var model = grid.jqGrid ('getGridParam', 'colModel');

		if (lastSelection) {
			var lastRowData = grid.getRowData(lastSelection);
			var lastOriVal = lastRowData.MOD_VAL;
			var lastModCheck = lastRowData.MOD_CHECK;
			var lastModFalg = lastRowData.MOD_FLAG;
			var lastVal = "";
			for (var i = 0; i < model.length; i++) {
				if (model[i].editable) {
					lastVal += (lastRowData[model[i].name] + "|");
				}
			}
			if (lastOriVal != lastVal) {
				if (lastModFalg != "INSERT") {
					grid.jqGrid('setCell', lastSelection, 'MOD_CHECK','<i class="fa fa-repeat" />');
					if (lastModCheck == "" || lastModFalg == "DELETE") {
						grid.jqGrid('setCell', lastSelection, 'MOD_FLAG','UPDATE');
					}
				}
			} else {
				if (lastModFalg != "INSERT") {
					grid.jqGrid('setCell', lastSelection, 'MOD_CHECK', null);
					grid.jqGrid('setCell', lastSelection, 'MOD_FLAG', null);
				}
			}
			grid.data("lastSelection","");
		}
		return true;
		
	}
	/*****************************(공통)*********************************
	 * MENUAL 000 : 그리드(grid)의 해당로우 삭제 상태 토글
	 ********************************************************************/ 
	function fnChkDeleteToggle(grid,rowid){
		grid.jqGrid('saveRow',rowid,false,'clientArray');
		var rowData = grid.getRowData(rowid);
		var rowData = grid.getRowData(rowid);
		var model = grid.jqGrid ('getGridParam', 'colModel');
		var lastOriVal = rowData.MOD_VAL;
		
		if(rowData.MOD_FLAG == "INSERT"){
			grid.jqGrid('delRowData',rowid);
		}else if(rowData.MOD_FLAG == "DELETE" ){
			var lastVal = "";
			for (var f = 0; f < model.length; f++) {
				if (model[f].editable) {
					lastVal += (rowData[model[f].name] + "|");
				}
			}
			if (lastOriVal != lastVal && lastOriVal != "") {
				grid.jqGrid('setCell', rowid, 'MOD_CHECK','<i class="fa fa-repeat" />');
				grid.jqGrid('setCell', rowid, 'MOD_FLAG','UPDATE');
			} else {
				grid.jqGrid('setCell', rowid, 'MOD_CHECK', null);
				grid.jqGrid('setCell', rowid, 'MOD_FLAG', null);
			}
		}else{
			grid.jqGrid('setCell',rowid,'MOD_FLAG','DELETE');
			grid.jqGrid('setCell',rowid,'MOD_CHECK','<i class="fa fa-minus text-danger" />');
		}
//		var editMode = grid.data("edit-mode");
//		if(!editMode){
//			grid.jqGrid('saveRow',rowid,false,'clientArray');
//		}else{
//			grid.jqGrid('editRow',rowid,false,'clientArray');
//		}
	} 
	/*****************************(공통)*********************************
	 * MENUAL 000 : 그리드수정사항에 따라 modFlag만 변경
	 ********************************************************************/ 
	function fnChkModFlag(grid,rowid){
		console.log("fnChkModFlag");
		var model = grid.jqGrid ('getGridParam', 'colModel');
		var ids = grid.jqGrid('getDataIDs');

		var lastRowData = grid.getRow(rowid,"",true);
		var lastOriVal = lastRowData.MOD_VAL;
		var lastModCheck = lastRowData.MOD_CHECK;
		var lastModFalg = lastRowData.MOD_FLAG;
		var lastVal = "";
		for (var i = 0; i < model.length; i++) {
			if (model[i].editable) {
				lastVal += (lastRowData[model[i].name] + "|");
			}
		}
		if (lastOriVal != lastVal) {
			if (lastModFalg != "INSERT") {
				grid.jqGrid('setCell', rowid, 'MOD_CHECK','<i class="fa fa-repeat" />');
				if (lastModCheck == "" || lastModFalg == "DELETE") {
					grid.jqGrid('setCell', rowid, 'MOD_FLAG','UPDATE');
				}
			}
		} else {
			if (lastModFalg != "INSERT") {
				grid.jqGrid('setCell', rowid, 'MOD_CHECK', null);
				grid.jqGrid('setCell', rowid, 'MOD_FLAG', null);
			}
		}
        grid.data("lastSelection","");
	} 
	/*****************************(공통)*********************************
	 * MENUAL 000 : 그리드(grid)수정모드로 변경
	 ********************************************************************/
	function startEditMode(grid) {  
        var model = grid.jqGrid('getGridParam', 'colModel');
        var ids = grid.jqGrid('getDataIDs');
        
        for (var i = 0; i < ids.length; i++) {
        	 startEditModeRow(grid,ids[i]);
        }
    };
    /*****************************(공통)*********************************
	 * MENUAL 000 : 그리드(grid)수정모드로 변경
	 ********************************************************************/
    function startEditModeRow(grid,ids) {  
    	console.log("startEditModeRow");
    	var model = grid.jqGrid('getGridParam', 'colModel');
    		
		var rowData = grid.getRowData( ids );
		if(rowData.MOD_VAL == ""){
			var thissVal = "";
			for (var f = 0; f < model.length; f++) {
				if (model[f].editable) {
					thissVal += (rowData[model[f].name] + "|");
				}
			}
			grid.jqGrid('setCell', ids, 'MOD_VAL', thissVal);
		}
		if(rowData.MOD_FLAG != "INSERT"){
			for (var g = 0; g < model.length; g++) {
				if (model[g].disabled) {
					$("#"+ids+"_"+model[g].name).prop("disabled",true);
					$("#"+ids+"_"+model[g].name).css("background","#f0f0f0");
				}
			}
		}
		var inputs =  grid.find("#"+ids+".jqgrow[role='row'] input[type='text']");
		inputs.data("row-id",ids);
		inputs.on("focus", function() { 
			var rowid = $(this).data("row-id");
			var lastSelection = grid.data("lastSelection");
			grid.setSelection(rowid,false);
			if(lastSelection != rowid ){
				grid.data("lastSelection",rowid);
				if(lastSelection && lastSelection != ""){
					fnChkModFlag(grid,lastSelection);
				}
			}
		});
		var buttons =  grid.find("#"+ids+".jqgrow[role='row'] button");
		buttons.data("row-id",ids);
		buttons.on("focus", function() { 
			var rowid = $(this).data("row-id");
			var lastSelection = grid.data("lastSelection");
			grid.setSelection(rowid,false);
			if(lastSelection != rowid ){
				grid.data("lastSelection",rowid);
				if(lastSelection && lastSelection != ""){
					fnChkModFlag(grid,lastSelection);
				}
			}
		});
    };
	



}( jQuery ));
