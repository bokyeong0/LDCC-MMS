 (function ($) {

	 $.fn.removeGrid = function(){
		 var grid = $(this);
		 var gridId = $(this).attr("id");
		 var gridWapper =  $("#"+gridId+"_wrap");
		 var newGrid = $("<table />",{id:gridId});
		 gridWapper.html(newGrid);
		 return newGrid;
		 
	 }
	 $.fn.resetSelectionGrid = function(){
		var grid = $(this);
		grid.data("lastSelection","");
		grid.data("pravSelection","");
		grid.resetSelection();		 
	 }
	 $.fn.getParams = function(key){
		 var grid = $(this);
		 return "1500";
		 
	 }
	 $.fn.getCaption = function(){
		 var id = $(this).attr("id");
		 var caption = $("#"+id+"_caption").text();
		 return caption;
	 }
	 // 수정모드시 로우 데이터 삭제
	$.fn.paragonGridSelectDelete = function(){
		var grid = $(this);
    	var rowid= grid.jqGrid('getGridParam','selrow');
    	var ids = grid.getDataIDs();


    	if(rowid === null){
    		alert("삭제할 행을 선택해주세요.");
    		return;
    	}

    	var gridId = grid.attr("id");
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
				grid.jqGrid('setCell', rowid, 'MOD_CHECK','<i class="fa fa-check" />');
				grid.jqGrid('setCell', rowid, 'MOD_FLAG','UPDATE');
			} else {
				grid.jqGrid('setCell', rowid, 'MOD_CHECK', null);
				grid.jqGrid('setCell', rowid, 'MOD_FLAG', null);
			}

    	}else{
			grid.jqGrid('setCell',rowid,'MOD_FLAG','DELETE');
			grid.jqGrid('setCell',rowid,'MOD_CHECK','<i class="fa fa-check text-danger" />');
			$("#jqg_"+gridId+"_" + rowid).prop("checked", true);
    	}
	}
	$.fn.selectRowData = function(dataKey){
		var grid = $(this);
		var rowid= grid.jqGrid('getGridParam','selrow');
		var rowData = grid.getRowData(rowid);
		var returnData;
		if(dataKey){
			returnData = rowData[dataKey];
			if(!returnData){
				returnData = false;
			}
		}else{
			returnData = rowData;
		}
		return returnData;
	}
	$.fn.focusRowData = function(dataKey){
		var grid = $(this);
//		var rowid= grid.jqGrid('getGridParam','selrow');
		var rowid= grid.find("tbody > tr.jqgrow.focus-row").attr('id'); 
//		$("#"+rowid).addClass("focus-row");
		var rowData = grid.getRowData(rowid);
		var returnData;
		if(dataKey){
			returnData = rowData[dataKey];
			if(!returnData){
				returnData = false;
			}
		}else{
			returnData = rowData;
		}
		return returnData;
	}
	$.fn.focusRowId = function(){
		var grid = $(this);
		return grid.find("tbody > tr.jqgrow.focus-row").attr('id'); 
	}

	$.fn.focusRemove = function(){
		var grid = $(this);
		grid.find("tbody > tr.jqgrow").removeClass("focus-row");
	}
	//로우 선택시 선택효과 주기
	$.fn.focusToRow = function(id){
		var grid = $(this);
		if(id){
			grid.find("#"+id).addClass("focus-row");
		}else{
			var rowid= grid.jqGrid('getGridParam','selrow');
			grid.find("tbody > tr.jqgrow").removeClass("focus-row");
			grid.find("#"+rowid).addClass("focus-row");
		}
	}
	//다른 그리드내 선택효과 있는지 확인
	$.fn.findDiffFocusCheckYn = function(grid){
		var value = grid.find("tbody > tr.jqgrow.focus-row").length;
		if(value == 0){
			value = false;
		}else{
			value = true;
		}
		return value;
	}
	// 수정모드시 로우 데이터 삭제
	$.fn.paragonGridClear = function(){
		var grid = $(this);
		var ids = grid.getDataIDs();
        for (var i = 0; i < ids.length; i++) {
        	grid.jqGrid('delRowData',ids[i]);
        }
		
	}
	// 수정모드시 체크박스 데이터 삭제
	$.fn.paragonGridCheckedDelete = function(){
		var grid = $(this);
		var gridCheckRowIds = grid.getGridParam('selarrrow');

		var rowLen = gridCheckRowIds.length;
		if(gridCheckRowIds.length == 0 ){
			alert("삭제할 행을 선택해주세요.");
			return;
		}
		var model = grid.jqGrid ('getGridParam', 'colModel');
		var gridId = grid.attr("id");

		for (var i = 0; i < rowLen; i++) {
			//TODO 그리드 로우삭제시 변수 배열이 삭제되는 현상(버그) 0번째로만 가져오기로 처리
			var rowid= gridCheckRowIds[i];
			var rowData = grid.getRowData(rowid);

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
					grid.jqGrid('setCell', rowid, 'MOD_CHECK','<i class="fa fa-check" />');
					grid.jqGrid('setCell', rowid, 'MOD_FLAG','UPDATE');
				} else {
					grid.jqGrid('setCell', rowid, 'MOD_CHECK', null);
					grid.jqGrid('setCell', rowid, 'MOD_FLAG', null);
				}

			}else{
				grid.jqGrid('setCell',rowid,'MOD_FLAG','DELETE');
				grid.jqGrid('setCell',rowid,'MOD_CHECK','<i class="fa fa-check text-danger" />');
			}
		}

	}
	// 중복키 체크 : 조회된 그리드에서만 체크 로컬만 사용
	$.fn.checkOverLap = function(key, value, rowid){
		var grid = $(this);
		var ids = grid.jqGrid('getDataIDs');
		if(value){
			for (var i = 1; i <= ids.length; i++) {
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
	// 수정모드시 수정된데이터 json 으로 변환
	$.fn.getJsonDeleteData = function(dataTableName, getData){
		var grid = $(this);
		
		var lastSelection = grid.data("lastSelection");
		var lastCellSelection = grid.data("lastCellSelection");
		// 미저장 로우 저장
		var ids = grid.jqGrid('getDataIDs');
		
		var options=  grid.jqGrid('getGridParam');
		var celEditable = options.cellEditable;
		
		if(options.onSaveRowValidate && lastSelection){
			if(!options.onSaveRowValidate( $(this).getRowData( lastSelection),lastSelection,grid)){
				return;
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
			var gridId = grid.attr("id");
			if (lastOriVal != lastVal) {
				if (lastModFalg != "INSERT") {
					grid.jqGrid('setCell', lastSelection, 'MOD_CHECK','<i class="check" />');
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
		
		
		
		var gridRowData = grid.getRowData();
		var rtnArrayData = [];
		
		
		if(getData){
			for (var i = 0; i < gridRowData.length; i++) {
				if(gridRowData[i].MOD_CHECK != "" && gridRowData[i].MOD_FLAG != "DELETE" ){
					
					var rtnRowData = {};
					$.each( getData, function( key, value ) {
						if(value.gridClass){
							var obj = $("<div/>");
							obj.html(gridRowData[i][value.gridKey]);
							var objValue = obj.find("."+value.gridClass).text();
							rtnRowData[key] = objValue;
						}else{
							rtnRowData[key] = gridRowData[i][value];
						}
					});
					rtnArrayData.push(rtnRowData);
				}
			}
		}else{
			var rowKeys = gridRowData[0];
			delete rowKeys["MOD_VAL"];
			delete rowKeys["MOD_CHECK"];
			for (var i = 0; i < gridRowData.length; i++) {
				if(gridRowData[i].MOD_CHECK != "" ){
					
					var rtnRowData = {};
					$.each( rowKeys, function(key) {
						rtnRowData[key] = gridRowData[i][key];
					});
					rtnArrayData.push(rtnRowData);
				}
			}
		}
		
		
		if(rtnArrayData.length == 0){
			return false;
		}else{
			var returnJsonData = {};
			returnJsonData[dataTableName] = rtnArrayData;
			return JSON.stringify(returnJsonData);
		}
	}
	$.fn.getJsonData = function(dataTableName,getData){
		var grid = $(this);

		var lastSelection = grid.data("lastSelection");
		var lastCellSelection = grid.data("lastCellSelection");
		// 미저장 로우 저장
		var ids = grid.jqGrid('getDataIDs');

		var options=  grid.jqGrid('getGridParam');
		var celEditable = options.cellEditable;

		if(options.onSaveRowValidate && lastSelection){
			if(!options.onSaveRowValidate( $(this).getRowData( lastSelection),lastSelection,grid)){
				return;
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
			var gridId = grid.attr("id");
			if (lastOriVal != lastVal) {
				if (lastModFalg != "INSERT") {
					grid.jqGrid('setCell', lastSelection, 'MOD_CHECK','<i class="fa fa-check" />');
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



		var gridRowData = grid.getRowData();
		var rtnArrayData = [];


		if(getData){
			for (var i = 0; i < gridRowData.length; i++) {
				if(gridRowData[i].MOD_CHECK != "" ){

					var rtnRowData = {};
					$.each( getData, function( key, value ) {
						if(value.gridClass){
							var obj = $("<div/>");
							obj.html(gridRowData[i][value.gridKey]);
							var objValue = obj.find("."+value.gridClass).text();
							rtnRowData[key] = objValue;
						}else{
							var thisVal = gridRowData[i][value];
							if(thisVal.indexOf('<input') !== -1 && thisVal.indexOf('radio') !== -1 ){
								rtnRowData[key] =  $(thisVal).is(":checked") ?"Y":"N";
							}else{
								rtnRowData[key] = gridRowData[i][value];
							}
							
						}
					});
					rtnArrayData.push(rtnRowData);
				}
			}
		}else{
			var rowKeys = gridRowData[0];
			delete rowKeys["MOD_VAL"];
			delete rowKeys["MOD_CHECK"];
			for (var i = 0; i < gridRowData.length; i++) {
				if(gridRowData[i].MOD_CHECK != "" ){

					var rtnRowData = {};
					$.each( rowKeys, function(key) {
						var value = gridRowData[i][key];
						if($(value).is( "input[type=radio]" ) ){
							value = $(value).is(":checked") ?"Y":"N";
						}
						rtnRowData[key] = value;
					});
					rtnArrayData.push(rtnRowData);
				}
			}
		}


		if(rtnArrayData.length == 0){
			return false;
		}else{
			var returnJsonData = {};
			returnJsonData[dataTableName] = rtnArrayData;
			return JSON.stringify(returnJsonData);
		}
	}

	$.fn.getJsonDeleteData = function(dataTableName, getData){
		var grid = $(this);

		var lastSelection = grid.data("lastSelection");
		var lastCellSelection = grid.data("lastCellSelection");
		// 미저장 로우 저장
		var ids = grid.jqGrid('getDataIDs');

		var options=  grid.jqGrid('getGridParam');
		var celEditable = options.cellEditable;

		if(options.onSaveRowValidate && lastSelection){
			if(!options.onSaveRowValidate( $(this).getRowData( lastSelection),lastSelection,grid)){
				return;
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
			var gridId = grid.attr("id");
			if (lastOriVal != lastVal) {
				if (lastModFalg != "INSERT") {
					grid.jqGrid('setCell', lastSelection, 'MOD_CHECK','<i class="fa fa-check" />');
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



		var gridRowData = grid.getRowData();
		var rtnArrayData = [];


		if(getData){
			for (var i = 0; i < gridRowData.length; i++) {
				if(gridRowData[i].MOD_CHECK != "" && gridRowData[i].MOD_FLAG != "DELETE" ){

					var rtnRowData = {};
					$.each( getData, function( key, value ) {
						if(value.gridClass){
							var obj = $("<div/>");
							obj.html(gridRowData[i][value.gridKey]);
							var objValue = obj.find("."+value.gridClass).text();
							rtnRowData[key] = objValue;
						}else{
							rtnRowData[key] = gridRowData[i][value];
						}
					});
					rtnArrayData.push(rtnRowData);
				}
			}
		}else{
			var rowKeys = gridRowData[0];
			delete rowKeys["MOD_VAL"];
			delete rowKeys["MOD_CHECK"];
			for (var i = 0; i < gridRowData.length; i++) {
				if(gridRowData[i].MOD_CHECK != "" ){

					var rtnRowData = {};
					$.each( rowKeys, function(key) {
						rtnRowData[key] = gridRowData[i][key];
					});
					rtnArrayData.push(rtnRowData);
				}
			}
		}


		if(rtnArrayData.length == 0){
			return false;
		}else{
			var returnJsonData = {};
			returnJsonData[dataTableName] = rtnArrayData;
			return JSON.stringify(returnJsonData);
		}
	}

	$.fn.getSelectedJsonData = function(dataTableName,getData){
		var grid = $(this);
		var lastSelection = grid.data("lastSelection");
        var lastCellSelection = grid.data("lastCellSelection");
		// 미저장 로우 저장
		var ids = grid.jqGrid('getDataIDs');
		var options=  grid.jqGrid('getGridParam');
		var celEditable = options.cellEditable;
		if(options.onSaveRowValidate && lastSelection){
			if(!options.onSaveRowValidate( $(this).getRowData( lastSelection),lastSelection,grid)){
				return;
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
			var gridId = grid.attr("id");
			if (lastOriVal != lastVal) {
				if (lastModFalg != "INSERT") {
					grid.jqGrid('setCell', lastSelection, 'MOD_CHECK','<i class="fa fa-check" />');
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



		var gridRowData = grid.getGridParam('selarrrow');
		var rtnArrayData = [];
		if(getData){
			var rowKeys = grid.getRowData(gridRowData[1]);
			delete rowKeys["MOD_VAL"];
			delete rowKeys["MOD_CHECK"];
			for (var i = 0; i < gridRowData.length; i++) {
				var rtnRowData = {};

				$.each( getData, function( key, value ) {
					rtnRowData[key] = grid.getRowData(gridRowData[i])[value];
				});

				rtnArrayData.push(rtnRowData);
			}

		}else{

			var rowKeys = grid.getRowData(gridRowData[1]);
			delete rowKeys["MOD_VAL"];
			delete rowKeys["MOD_CHECK"];
			for (var i = 0; i < gridRowData.length; i++) {
				var rtnRowData = {};
				$.each( rowKeys, function(key) {
					rtnRowData[key] = grid.getRowData(gridRowData[i])[key];
				});
				rtnArrayData.push(rtnRowData);
			}

		}

		if(rtnArrayData.length == 0){
			return false;
		}else{
			var returnJsonData = {};
			returnJsonData[dataTableName] = rtnArrayData;
			return JSON.stringify(returnJsonData);
		}
	}
	// 수정모드시 수정된데이터 json 으로 변환
	$.fn.getObjectData = function(dataTableName,getData){
		var grid = $(this);
		var lastSelection = grid.data("lastSelection");
        var lastCellSelection = grid.data("lastCellSelection");
		// 미저장 로우 저장
		var ids = grid.jqGrid('getDataIDs');
		var options=  grid.jqGrid('getGridParam');
		var celEditable = options.cellEditable;
		if(options.onSaveRowValidate && lastSelection){
			if(!options.onSaveRowValidate( $(this).getRowData( lastSelection),lastSelection,grid)){
				return;
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
			var gridId = grid.attr("id");
			if (lastOriVal != lastVal) {
				if (lastModFalg != "INSERT") {
					grid.jqGrid('setCell', lastSelection, 'MOD_CHECK','<i class="fa fa-check" />');
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



		var gridRowData = grid.getRowData();
		var rtnArrayData = [];


		if(getData){
			for (var i = 0; i < gridRowData.length; i++) {
				if(gridRowData[i].MOD_CHECK != "" ){

					var rtnRowData = {};
					$.each( getData, function( key, value ) {
						rtnRowData[key] = gridRowData[i][value];
					});
					rtnArrayData.push(rtnRowData);
				}
			}
		}else{
			var rowKeys = gridRowData[0];
			delete rowKeys["MOD_VAL"];
			delete rowKeys["MOD_CHECK"];
			for (var i = 0; i < gridRowData.length; i++) {
				if(gridRowData[i].MOD_CHECK != "" ){

					var rtnRowData = {};
					$.each( rowKeys, function(key) {
						rtnRowData[key] = gridRowData[i][key];
					});
					rtnArrayData.push(rtnRowData);
				}
			}
		}


		if(rtnArrayData.length == 0){
			return false;
		}else{
			var returnJsonData = {};
			returnJsonData[dataTableName] = rtnArrayData;
			return returnJsonData;
		}
	}
	// 수정모드시 수정된데이터 json 으로 변환
	$.fn.getSelectedObjData = function(dataTableName,getData){
		var grid = $(this);
		var lastSelection = grid.data("lastSelection");
        var lastCellSelection = grid.data("lastCellSelection");
		// 미저장 로우 저장
		var ids = grid.jqGrid('getDataIDs');
		var options=  grid.jqGrid('getGridParam');
		var celEditable = options.cellEditable;
		if(options.onSaveRowValidate && lastSelection){
			if(!options.onSaveRowValidate( $(this).getRowData( lastSelection),lastSelection,grid)){
				return;
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
		var model = grid.jqGrid ('getGridParam', 'colModel');

		if (lastSelection) {
			var lastRowData = grid.getRowData(lastSelection);
			var lastOriVal = lastRowData.MOD_VAL;
			var lastModCheck = lastRowData.MOD_CHECK;
			var lastModFalg = lastRowData.MOD_FLAG;
			var lastVal = "";

			var lastVal = "";
			for (var i = 0; i < model.length; i++) {
				if (model[i].editable) {
					lastVal += (lastRowData[model[i].name] + "|");
				}
			}
			var gridId = grid.attr("id");
			if (lastOriVal != lastVal) {
				if (lastModFalg != "INSERT") {
					grid.jqGrid('setCell', lastSelection, 'MOD_CHECK','<i class="fa fa-check" />');
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



		var gridRowData = grid.getGridParam('selarrrow');
		var rtnArrayData = [];

		if(getData){
			var rowKeys = grid.getRowData(gridRowData[1]);
			delete rowKeys["MOD_VAL"];
			delete rowKeys["MOD_CHECK"];
			for (var i = 0; i < gridRowData.length; i++) {
				var rtnRowData = {};
				$.each( getData, function( key, value ) {
					rtnRowData[key] = grid.getRowData(gridRowData[i])[value];
				});

				rtnArrayData.push(rtnRowData);
			}
		}else{
			var rowKeys = grid.getRowData(gridRowData[1]);
			delete rowKeys["MOD_VAL"];
			delete rowKeys["MOD_CHECK"];
			for (var i = 0; i < gridRowData.length; i++) {
				var rtnRowData = {};
				$.each( rowKeys, function(key) {
					rtnRowData[key] = grid.getRowData(gridRowData[i])[key];
				});
				rtnArrayData.push(rtnRowData);
			}
		}


		if(rtnArrayData.length == 0){
			return false;
		}else{
			var returnJsonData = {};
			if(dataTableName){
				returnJsonData[dataTableName] = rtnArrayData;
			}else{
				return rtnArrayData;
			}
			return returnJsonData;
		}
	}

	// 수정모드시 수정된데이터 jsonParams 으로 변환
	$.fn.getJsonSelectedParamsData = function(dataTableName,getData,addedParmas){

		var grid = $(this);
		var lastSelection = grid.data("lastSelection");
        var lastCellSelection = grid.data("lastCellSelection");
		// 미저장 로우 저장
		var ids = grid.jqGrid('getDataIDs');
		var options=  grid.jqGrid('getGridParam');
		var celEditable = options.cellEditable;
		if(options.onSaveRowValidate){
			if(!options.onSaveRowValidate( $(this).getRowData( lastSelection),lastSelection,grid)){
				return;
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
			var gridId = grid.attr("id");
			if (lastOriVal != lastVal) {
				if (lastModFalg != "INSERT") {
					grid.jqGrid('setCell', lastSelection, 'MOD_CHECK','<i class="fa fa-check" />');
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



		var gridRowData = grid.getGridParam('selarrrow');
		var rtnArrayData = [];
		if(getData){
			var rowKeys = grid.getRowData(gridRowData[1]);
			delete rowKeys["MOD_VAL"];
			delete rowKeys["MOD_CHECK"];
			for (var i = 0; i < gridRowData.length; i++) {
				var rtnRowData = {};

				$.each( getData, function( key, value ) {
					rtnRowData[key] = grid.getRowData(gridRowData[i])[value];
				});

				rtnArrayData.push(rtnRowData);
			}

		}else{

			var rowKeys = grid.getRowData(gridRowData[1]);
			delete rowKeys["MOD_VAL"];
			delete rowKeys["MOD_CHECK"];
			for (var i = 0; i < gridRowData.length; i++) {
				var rtnRowData = {};
				$.each( rowKeys, function(key) {
					rtnRowData[key] = grid.getRowData(gridRowData[i])[key];
				});
				rtnArrayData.push(rtnRowData);
			}

		}

		if(rtnArrayData.length == 0){
			return false;
		}else{
			addedParmas[dataTableName] = rtnArrayData;
			return JSON.stringify(addedParmas);
		}


	}
	// 수정모드시 수정된데이터 jsonParams 으로 변환
	$.fn.getJsonParamsData = function(dataTableName,getData,addedParmas){
		var grid = $(this);
		var lastSelection = grid.data("lastSelection");
        var lastCellSelection = grid.data("lastCellSelection");
		// 미저장 로우 저장
		var ids = grid.jqGrid('getDataIDs');
		var options=  grid.jqGrid('getGridParam');
		var celEditable = options.cellEditable;

		if(options.onSaveRowValidate){
			if(!options.onSaveRowValidate( $(this).getRowData( lastSelection),lastSelection,grid)){
				return;
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
			var gridId = grid.attr("id");
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



		var gridRowData = grid.getRowData();
		var rtnArrayData = [];


		if(getData){
			for (var i = 0; i < gridRowData.length; i++) {
				if(gridRowData[i].MOD_CHECK != "" ){

					var rtnRowData = {};
					$.each( getData, function( key, value ) {
						rtnRowData[key] = gridRowData[i][value];
					});
					rtnArrayData.push(rtnRowData);
				}
			}
		}else{
			var rowKeys = gridRowData[0];
			delete rowKeys["MOD_VAL"];
			delete rowKeys["MOD_CHECK"];
			for (var i = 0; i < gridRowData.length; i++) {
				if(gridRowData[i].MOD_CHECK != "" ){

					var rtnRowData = {};
					$.each( rowKeys, function(key) {
						rtnRowData[key] = gridRowData[i][key];
					});
					rtnArrayData.push(rtnRowData);
				}
			}
		}


		if(rtnArrayData.length == 0){
			return false;
		}else{
			addedParmas[dataTableName] = rtnArrayData;
			return JSON.stringify(addedParmas);
		}
	}



	// 수정모드시 행추가
	$.fn.paragonGridAddRow = function(callBack){
		var lastSelection = $(this).data("lastSelection");
		var lastCellSelection = $(this).data("lastCellSelection");

		var lastSelectionIdx = $(this).data("lastSelectionIdx");

		var options=   $(this).jqGrid('getGridParam');
		var celEditable = options.cellEditable;
		var maxRowId = $(this).data("maxRowId");




		if(options.onSaveRowValidate && lastSelection){
			if(!options.onSaveRowValidate( $(this).getRowData( lastSelection),lastSelection,$(this))){
				return;
			}
		}
		if(lastCellSelection){
			$(this).jqGrid('setGridParam', {cellEdit: true});
			$(this).jqGrid('saveCell', lastSelection, lastCellSelection, true);
			$(this).jqGrid('setGridParam', {cellEdit: false});
		}

		$(this).jqGrid('saveRow',lastSelection,false,'clientArray');
 		//jqGrid 기본값
 		var settings = $.extend({
 			addData : "",
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
    	var ids = $(this).getDataIDs();
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
		    position :"first",
		    useDefValues : false,
		    useFormatter : false,
		    addRowParams : {extraparam:{}}
		}
//		$(this).closest(".ui-jqgrid-bdiv").scrollTop(0);

		$(this).jqGrid('addRow',parameters);
		$(this).jqGrid('editRow',thisRowId, {keys: true} );
		$(this).data("lastSelection",thisRowId);
		$(this).data("lastSelectionIdx",1);
		$(this).data("lastCellSelection",null);
		$(this).data("maxRowId",thisRowId);
	}
	// 수정모드시 행추가
//	$.fn.paragonGridAddRow = function(){
//		var ids = $(this).getDataIDs();
//		var parameters ={
//				rowID : ids.length+1,
//				initdata : {'MOD_FLAG':'INSERT','MOD_CHECK':'<i class="fa fa-check" />'},
//				position :"first",
//				useDefValues : false,
//				useFormatter : false,
//				addRowParams : {extraparam:{}}
//		}
//		$(this).jqGrid('addRow',parameters);
//		$(this).jqGrid('editRow',ids.length+1, {keys: true} );
//		$(this).data("lastSelection",ids.length+1);
//	}


	//수정데이터 여부 확인 - 전송할 데이터가 있을시 false
	$.fn.paragonGridModCheck = function(){
		var data = $(this).getRowData();
		for (var i = 0; i < data.length; i++) {
			if(data[i].MOD_FLAG != "" ){
				break;
				return false;
			}
		}
		return true;
	}

	//수정데이터 여부 확인 - 전송할 데이터가 있을시 false
	$.fn.paragonGridModConfirm = function(msg){
		var data = $(this).getRowData();
		for (var i = 0; i < data.length; i++) {
			if(data[i].MOD_FLAG != "" ){
				if(confirm(msg)){
					$(this).data("lastSelection","");
					return true;
				}else{
					return false;
				}
			}
		}
		$(this).data("lastSelection","");
		return true;
	}

 	$.fn.paragonGrid = function(options) {
 		var proCd = $(".main-tab.active > a").data("proCd");
 		var chkcell = {};
 		//jqGrid 기본값
 		var settings = $.extend({
 			url: '',
 			componentUrl:'/ctrl/settings/system/domain/listColnames',
 			componentId:'',
            mtype: "GET",
            datatype: "json",
            pageable: true,
            rowEditable: false,
            cellEditable: false,
            firstData: true,
            rownumbersdesc : true,
			viewrecords: true,
			recordtext:"목록 {0} ~ {1}  &nbsp; &nbsp; &nbsp; 총 {2} 건",
            cellsubmit : 'clientArray',
            page: 1,
            height: 530,
            rowHeight:"M",
            autowidth: true,
            multiselectone: false,
            rowList: [15, 30, 50,100],
            colModel:[],
            colNames:[],
            customModel:[],
            customMode:"",
            rowNum: 15,
            data:{},
            domainId: null,
            headerNms: [],
            columnIds: [],
            columnNms: [],
            excelColunmNms: [],
            excelColunmIds: [],
            loadonce: false,
            reportExcelBtn: false,
            reportPreBtn: false,
            reportPdfBtn: false,
            onClickPdfBtn: null,
            onClickExcelBtn: null,
            onClickPreBtn: null,
            onClickPreBtnDefault: onClickPreBtnDefault,
            onClickPdfBtnDefault: onClickPdfBtnDefault,
            onClickExcelBtnDefault: onClickExcelBtnDefault,
            ajaxGridOptions: {
     			headers: {
    	 			"AjaxType":"paragon",
    	 			"proCd": proCd
     	    	},
 				type : "POST",
     	    	error : function(jqXHR, textStatus, errorThrown) {
     	    		if(jqXHR.status != ""){
     	    			if(jqXHR.status === 404 ) {
     	    				alert("일시적이 오류가 발생했습니다.\n담장자에게 문의하세요.");
     	    			}else if(jqXHR.status === 999 ) {
     	    				alert(jqXHR.responseText);
     	    				window.location.replace("/");
//     	    				PopApp.paragonOpenPopup({
//     	 			    		ajaxUrl: '/ctrl/sign/loginPopup',
//     	 			    		id: 'loginPopup',
//     	 			    		width: '400px',
//     	 			    		btnName:"로그인",
//     	 			    		title:"로그인",
//     	 			    		onload:function(modal){
//     	 			    			modal.show();
//     	 			    		}
//     	 			    	});
     	    			}else if(jqXHR.status === 997 ) {
     	    				var jsonData = $.parseJSON(jqXHR.responseText);
     	    				alert(jsonData.errMsg);
//     	    			}else{
//     	    				alert(jqXHR.responseText);
     	    			}
     	    		}
     	        }
     		},
            navgrid:{
            	edit: false,
     			add: false,
     			del: false,
     			search: false,
     			refresh: true
            },
            checkBox : {
				editable : true,
				align : "center",
				edittype : "checkbox",
				editoptions : {
					value : "Y:N"
				},
				formatter : "checkbox",
				formatoptions : {
					disabled : false
				}
			},
			sortable : false,
			rowspan: false,
			onSaveRowValidate : null,
			onSelectRowEvent : null,
			onClickRowEvent : null,
			gridComplete:function(){},
			groupHeaders:[],
			rowClickFocus:false,
			rowClickColor:"default",
            gridResize : {}
        }, options );
 		/**
 		url				: 그리드 목록조회,
		componentUrl	: '/settings/system/language/listLangColumns', 언어 컬럼 조회 기본 URL
		componentId		: '', 컴포넌트 아이디 언어 변환
        mtype			: "GET",
        datatype		: "json",
        pageable		: true, 	자동 페이징 처리 true시 자동 카운트 조회됨
        rowEditable		: false,	그리드 수정,저장,삭제 행추가 기능 사용여부
        page			: 1,		시작시 페이지
        height			: 530,		그리드 기본 높이
        autowidth		: true,
        rowList			: [15, 30, 50,100], 로우 싸이즈 콤보박스
        colNames		:[],		컬럼명 (갯수가 colModel보다 작거나 같아야 함)
        colModel		:[],		로우 모델
        customModel		:[],		서버에서 생성된 모델 componentUrl 수정으로 직접 데이서 생성해서 매핑 가능
        rowNum			: 15,		기본  그리드 리스트수
        navgrid:{
        	edit		: false, 	jqGrid API 에디터기능
 			add			: false, 	jqGrid API 추가기능
 			del			: false, 	jqGrid API 삭제기능
 			search		: false,	jqGrid API 검색기능
 			refresh		: true		jqGrid API 새로고침기능
        },
        sortable: function (permutation) {
        },
        gridResize : {}
 		**/

 		//
 		var $targetGrid = $(this);

 		if(settings.rowspan){
 			settings.gridComplete = rowSpan;
 		}
 		if(!settings.firstData){
 			settings.datatype = "local";
 		}
 		
 		var excelColunmNms = [];
 		var excelColunmIds = [];
 		if(settings.colNames.length > 0 && settings.excelColunmIds.length ==0 ){
 			for (var i = 0; i < settings.colModel.length; i++) {
 				var colId = settings.colModel[i].name;
 				var colNm = settings.colNames[i];
 				if(!settings.colModel[i].hidden){
 					excelColunmNms.push(colNm);
 					excelColunmIds.push(colId);
 				}
 			}
 			settings.excelColunmNms = excelColunmNms;
 			settings.excelColunmIds = excelColunmIds;
 			
 		}
 		
 		var dt_colnames = [];
 		var columnIds = [];
 		var columnNms = [];
 		var columnHeader = [];
// 		if(settings.colModel.length != 0 && settings.customModel.length == 0){
//			for (var i = 0; i < settings.colModel.length; i++) {
//				dt_colnames.push({"colname":settings.colModel[i].name});
//				if(!settings.colModel[i].hidden){
//					columnIds.push(settings.colModel[i].name);
////					columnHeader.push(settings.colModel[i].name);
//				}
//			}
//			settings.columnIds = columnIds;
// 		}else if(settings.customModel.length != 0 && settings.colModel.length == 0){
// 			for (var i = 0; i < settings.customModel.length; i++) {
// 				dt_colnames.push({"colname":settings.customModel[i].name});
// 				if(!settings.customModel[i].hidden){
// 					columnIds.push(settings.customModel[i].name);
//// 					columnHeader.push(settings.customModel[i].name);
// 				}
// 			}
// 			settings.columnIds = columnIds;
// 		}
 		//colNames 지정시, columnNms 데이터 밀어넣기
// 		if(settings.columnNms.length == 0){
// 			console.log(settings.customModel);
// 			console.log(settings.columnNms);
// 			
// 			for (var i = 0; i < settings.colNames.length; i++) { 			
// 				dt_colnames.push({"colname":settings.colNames[i]});
//// 				if(!settings.customModel[i].hidden){
// 					columnNms.push(settings.colNames[i]);
//// 				}
// 			}
// 			settings.columnNms = columnNms;
// 		}
// 		if(settings.columnNms.length == 0){
// 			for (var i = 0; i < settings.colNames.length; i++) { 			
// 				dt_colnames.push({"colname":settings.colNames[i]});
// 				columnNms.push(settings.colNames[i]);
// 			}
// 			settings.columnNms = columnNms;
// 		}
		//그리드 수정모드 기본 추가 필드 생성
		if(options.rowHight){
			if(!options.height && settings.rowHight == "S"){
				settings.height = 550;
			}else if(!options.height && settings.rowHight == "L"){
				settings.height = 530;
			}
			if(!options.rowNum && settings.rowHight == "S"){
				settings.rowNum = 25;
			}else if(!options.rowNum && settings.rowHight == "L"){
				settings.rowNum = 10;
			}
			if(!options.rowList && settings.rowHight == "S"){
				settings.rowList = [25,50,100,200];
			}else if(!options.rowList && settings.rowHight == "L"){
				settings.rowList = [10,20,50,100];
			}
//			rowList: [15, 30, 50,100],
//			settings.rowNum = 25;
//			rowHight: "S",
//			height: "550px",
//			rowNum: 25,
		}
 		//그리드 수정모드 기본 추가 필드 생성
 		if(settings.rowEditable){
 			if(!settings.onSelectRow){
 				settings.onSelectRow = editSelectRow;
 			}else{
 				settings.onSelectRow = editSelectRowDefault;
 			}
 			if(!settings.ondblClickRow){
 				settings.ondblClickRow = editClickRow;
 			}
 			settings.colModel.unshift({frozen: true,name:'MOD_CHECK',align:"center",width:"25px",fixed: true , sortable:false});
 			settings.colModel.unshift({frozen: true,name:'MOD_FLAG',align:"center",width:"20px",hidden:true});
 			settings.colModel.unshift({frozen: true,name:'MOD_VAL',align:"center",width:"20px",hidden:true});
 			if(settings.multiselectone){
				settings.beforeSelectRow = function (rowid, e) {
					e.stopPropagation();
					var $myGrid = $(this);
					$myGrid.jqGrid('resetSelection');
					return true;
				};
 			}
 		//CELL 수정 모드시
 		}else if(settings.cellEditable){
 			if(!settings.onSelectRow){
 				settings.onCellSelect  = editSelectCell;
 			}else{
 				settings.onCellSelect  = editSelectCellDefault;
 			}
 			if(!settings.ondblClickRow){
 				settings.ondblClickRow = editDblClickCell;
 			}
 			settings.colModel.unshift({frozen: true,name:'MOD_CHECK',align:"center",width:"25px",fixed: true , sortable:false});
 			settings.colModel.unshift({frozen: true,name:'MOD_FLAG',align:"center",width:"20px",hidden:true});
 			settings.colModel.unshift({frozen: true,name:'MOD_VAL',align:"center",width:"20px",hidden:true});
 			if(settings.multielonly){
 				if(settings.multiselectone){
 					settings.beforeSelectRow = function (rowid, e) {
 						e.stopPropagation();
 						var $myGrid = $(this);
 						$myGrid.jqGrid('resetSelection');
 						var i = $.jgrid.getCellIndex($(e.target).closest('td')[0]);
 						var cm = $myGrid.jqGrid('getGridParam', 'colModel');
 						return (cm[i].name === 'cb');
 					};
 				}else{
 					settings.beforeSelectRow = function (rowid, e) {
 						e.stopPropagation();
 						var $myGrid = $(this);
 						var i = $.jgrid.getCellIndex($(e.target).closest('td')[0]);
 						var cm = $myGrid.jqGrid('getGridParam', 'colModel');
 						return (cm[i].name === 'cb');
 					};
 				}
 			}else if(settings.multiselectone){
 					settings.beforeSelectRow = function (rowid, e) {
 						e.stopPropagation();
 						var $myGrid = $(this);
 						$myGrid.jqGrid('resetSelection');
 						return true;
 					};
 			}
 		}else{
 			if(!settings.onSelectRow){
 				settings.onSelectRow = editSelectRow;
 			}else{
 				settings.onSelectRow = editSelectRowDefault;
 			}
 			if(!settings.ondblClickRow){
 				settings.ondblClickRow = editClickRow;
 			}
 			if(settings.multiselectone){
				settings.beforeSelectRow = function (rowid, e) {
					e.stopPropagation();
					var $myGrid = $(this);
					$myGrid.jqGrid('resetSelection');
					return true;
				};
 			}
 		}

 		//기본 컬럼데이터가 없음 ,  컴포넌트 아이디 입력시 컬런 Locale 정보 얻어옴
 		if(settings.colNames.length ==0){
// 			var jsonData = JSON.stringify({"COMP_ID":settings.componentId});

 			var jsonData ={};
 			if(settings.data){
 				jsonData = settings.data;
 			}
 			jsonData["dt_colnames"] = dt_colnames;
 			jsonData["columnIds"] = columnIds;
// 			jsonData["columnNms"] = colNames;
 			if(settings.domainId){
 				jsonData["domainId"] = settings.domainId;
 			}
 			var headers = settings.groupHeaders;
 			var headerIds = [];
			if(headers.length > 0){
				for (var i = 0; i < headers.length; i++) {
					var rowData = headers[i];
					var header = rowData.header;
//					var group =[];
					for (var f = 0; f < header.length; f++) {
						var obj = header[f];
						var domain = obj.domain == undefined ? "" :obj.domain;
						headerIds.push(domain);						
					}
				}
			}
			
			jsonData["headerIds"] = headerIds;
			
			jsonData = JSON.stringify(jsonData);
 			
 			$.ajax({
 				url: settings.componentUrl,
// 				dataType : "json",
 				data:jsonData,
 	    		contentType: 'application/json; charset=utf-8',

 				success: function(data) {
 					if(settings.colModel.length == 0 && settings.customModel.length > 0){
 						settings.colModel = settings.customModel;
 						for (var i = 0; i < data.customModel.length; i++) {

 							var customModel = {align:"center",name: data.customModel[i].CODE_CD};
 							if(settings.customMode == "checkbox" && data.customModel[i].CUSTOM_MODE =="checkbox"){
 								$.each( settings.checkBox, function( key, value ) {
 									customModel[key] = value;
 								});
 							}
 							settings.colModel.push(customModel);
 							columnIds.push(data.customModel[i].CODE_CD);

						}
 					}
 					
 					settings.headerNms = data.headerNms;
 					if(settings.domainId){
 						settings.caption = data.caption;
 		 			}
 					for (var i = 0; i < settings.colModel.length; i++) {
 						if(settings.colModel[i] !== undefined && settings.colModel[i].searchBtnClick !== undefined){
 							settings.colModel[i].edittype = "custom";
 							var thisFunction = settings.colModel[i].searchBtnClick;
 							var disabled = settings.colModel[i].disabled;
 							settings.colModel[i].editoptions ={
// 								editoptions: {
 									custom_value : function(elem, oper, value) {
 										var rtnVal = $(elem).find("input").val();
 										if (oper === "get") {
 											return rtnVal;
 										}else{
 											return $(elem).find("input").val(value);
 										}

 									},
 									disabled: disabled,
 									custom_function: thisFunction,
 						    		custom_element: function(elem, editOptions) {
 						    			var div =$("<div/>");
 						    			var model = $(this).jqGrid ('getGridParam', 'colModel');
 						    			var str = "";
 						    			var intput =$("<input value='"+elem+"' "+str+" id='"+editOptions.id+"' >");
 						    			var button =$("<button type='buttion' value='"+elem+"' ></button>");
 						    			intput.addClass("cel-input");
 						    			intput.css("width","96%");
 						    			intput.css("padding-right","30px");

 						    			var iel = $("<i/>");
 						    			iel.addClass("fa fa-search");
 						    			button.append(iel);
 						    			button.css("margin-left","-25px");
 						    			button.data("function",editOptions.custom_function)
 						    			button.data("rowid",editOptions.rowId)
 						    			button.data("colid",editOptions.id)
// 						    			var rowData = $targetGrid.getRowData( editOptions.id );
// 						    			button.data("rowData",rowData);
 						    			button.click(function(e){
 						    				e.stopPropagation();
 						    				$(this).parent("div").attr("id","");
 						    				var thisFunction= $(this).data("function");
 						    				var value = $(this).prev().val();
 						    				var rowid = $(this).data("rowid");
 						    				var colid = $(this).data("colid");
 						    				thisFunction(value,rowid,colid);
 						    			});
 						    			div.append(intput);
 						    			div.append(button);

 						    			return div;//$("<input size='5' value='"+elem+"'>");
 						    		}
// 						    	}
 					    	};
 						}
 					}
 					if(settings.rowspan){
 			 			settings.gridComplete = rowSpan;
 			 			for (var i = 0; i < settings.colModel.length; i++) {
 			 				if(settings.colModel[i].rowspan){
 			 					settings.colModel[i]["cellattr"]= checkRowspanCell;
 			 				}
 			 			}
 			 		}
 					settings.colNames = data.colNames;
 					settings.columnIds = columnIds;
 					settings.columnNms = data.columnNms;
 					if((settings.rowEditable || settings.cellEditable) && settings.colNames.length > 0){
 						settings.colNames.unshift(' ');
 						settings.colNames.unshift('MOD_FLAG');
 						settings.colNames.unshift('MOD_VAL');
 					}
 					var colModelLen = settings.colModel.length;
 					var colNamesLen = settings.colNames.length;
 					if(colModelLen > colNamesLen){
 						var gap = colModelLen - colNamesLen;
 						for (var i = (colModelLen - gap) ; i < colModelLen; i++) {
 							settings.colNames.push(settings.colModel[i].name);
 						}
 					}
 					fnMakeJqgrid();
 					
 					var headers = settings.groupHeaders;
 					var headerNms = settings.headerNms;
 					if(headers.length > 0){
 						for (var i = 0; i < headers.length; i++) {
 							var rowData = headers[i];
 							var header = rowData.header;
 							var group =[];
 							for (var f = 0; f < header.length; f++) {
 								var obj = header[f];
 								var start = obj.start == undefined ? "" :obj.start;
 								var leng = obj.length == undefined ? 1 :obj.length;
 								var domain = obj.domain == undefined ? "" :obj.domain;
 								var text = obj.text == undefined ? "" :obj.text ;
 								if(domain in headerNms){
 									text = headerNms[domain];
 								}
 								group.push({
 									startColumnName: start,
 									numberOfColumns: leng,
 									titleText: '<i data-domain-id="'+domain+'">'+text+'</i>' 
 								});
 							}
 							$targetGrid.jqGrid('setGroupHeaders', {
 				             	useColSpanStyle: rowData.rowspan, 
 				             	groupHeaders:group
 				            });
 						}
 					}
 				}
 	        });
 		}else{
			if((settings.rowEditable || settings.cellEditable) && settings.colNames.length > 0){
				settings.colNames.unshift(' ');
				settings.colNames.unshift('MOD_FLAG');
				settings.colNames.unshift('MOD_VAL');
			}
 			fnMakeJqgrid();
 			
 			
 			var headers = settings.groupHeaders;
			if(headers.length > 0){
				for (var i = 0; i < headers.length; i++) {
					var rowData = headers[i];
					var header = rowData.header;
					var group =[];
					for (var f = 0; f < header.length; f++) {
						var obj = header[f];
						var start = obj.start == undefined ? "" :obj.start;
						var leng = obj.length == undefined ? 1 :obj.length;
						var domain = obj.domain == undefined ? "" :obj.domain;
						var text = obj.text == undefined ? "" :obj.text ;
						group.push({
							startColumnName: start,
							numberOfColumns: leng,
							titleText: '<i data-domain-id="'+domain+'">'+text+'</i>' 
						});
					}
					$targetGrid.jqGrid('setGroupHeaders', {
		             	useColSpanStyle: rowData.rowspan, 
		             	groupHeaders:group
		            });
				}
			}
 			
 		}


 		//jqGrid  생성
        function fnMakeJqgrid(){
        	var gridWapper = $targetGrid.parent();
        	gridWapper.attr("id",$targetGrid.attr("id")+"_wrap");
    		$targetGrid.jqGrid(settings,function(){
    			$(this).trigger("reloadGrid");
    		});
    		if(settings.loadonce){
    			settings.rowNum ="";
    		}
    		$targetGrid.navGrid(settings.pager,settings.navgrid);

    		if(settings.gridResize != null){
    			$targetGrid.jqGrid('gridResize',settings.gridResize);
    		}
    		var firstWidth = gridWapper.width();
//    		var firstWidth = $(".grid-wrapper:visible").eq(0).width();
    		$targetGrid.jqGrid('gridResize',{minWidth:firstWidth, maxWidth:firstWidth});
    		$targetGrid.data("grid-wrapper",firstWidth);
    		$targetGrid.jqGrid('setFrozenColumns');

    		gridWapper.bind('resize', function () {
               var width = $(this).width();
               var privWidth = $targetGrid.data("grid-wrapper");
               if(privWidth != width){
            	   $targetGrid.setGridWidth(width);
            	   $targetGrid.jqGrid('gridResize',{minWidth:width, maxWidth:width});
            	   $targetGrid.data("grid-wrapper",width);
               }
    		}).trigger("resize");
       }
        function editSelectRowDefault(id) {
        	var grid = $targetGrid;
			var lastSelection = grid.data("lastSelection");
			var pravSelection = grid.data("pravSelection");
    		if(settings.onSelectRowEvent && id != pravSelection){
				settings.onSelectRowEvent(grid.getRowData(id),grid.getRowData( lastSelection));
			}
    		$targetGrid.data("pravSelection",id);
        }


       //로우선택시 로우데이터 저장 및 수정데이터 체크
       function editSelectRow(id) {
			var grid = $targetGrid;
			var lastSelection = grid.data("lastSelection");
			var pravSelection = grid.data("pravSelection");
			
			if(settings.onClickRowEvent){
				settings.onClickRowEvent(id);
			}
			if(lastSelection){
				var model = grid.jqGrid ('getGridParam', 'colModel');
				if(settings.onSaveRowValidate){
					if(!settings.onSaveRowValidate(grid.getRowData( lastSelection),lastSelection,grid)){
						return;
					}else{
						grid.jqGrid('saveRow',lastSelection,false,'clientArray');
						$targetGrid.data("lastSelection","");
					}
				}else{
					grid.jqGrid('saveRow',lastSelection,false,'clientArray');
					$targetGrid.data("lastSelection","");
				}
				if(settings.onSelectRowEvent && id != pravSelection){
					settings.onSelectRowEvent(grid.getRowData(id),grid.getRowData( lastSelection));
				}

	       		var lastRowData = grid.getRowData( lastSelection );
	       		var lastOriVal = lastRowData.MOD_VAL;
	       		var lastModCheck = lastRowData.MOD_CHECK;
	       		var lastModFalg = lastRowData.MOD_FLAG;
	       		var lastVal = "";
	   			for (var i = 0; i < model.length; i++) {
	   				if(model[i].editable){
	   					lastVal +=(lastRowData[model[i].name]+"|");
	   				}
	   			}
	   			var gridId = grid.attr("id");
	       		if(lastOriVal != lastVal){
	       			if(lastModFalg != "INSERT"){
	        			grid.jqGrid('setCell',lastSelection,'MOD_CHECK','<i class="fa fa-repeat" />');
	        			var checkBox = $("#jqg_"+gridId+"_" + lastSelection);
	        			var pravVal = checkBox.data("pravVal");
	        			if(lastModCheck == "" ||lastModFalg == "DELETE"){
	        				grid.jqGrid('setCell',lastSelection,'MOD_FLAG','UPDATE');
	        				if(!pravVal){
	        					if(!checkBox.is(":checked")){
	    							   checkBox.trigger("click");
	    							   checkBox.prop("checked", true);
	    						   }
	        					checkBox.data("pravVal", lastVal);
	        				}
	        			}
        				if(pravVal && pravVal != "" && pravVal != lastVal){
        					if(!checkBox.is(":checked")){
 							   checkBox.trigger("click");
 							   checkBox.prop("checked", true);
 						   }
        					checkBox.data("pravVal", lastVal);
//        				}else if(!pravVal){
//        					checkBox.prop("checked", true);
//        					checkBox.data("pravVal", lastVal);
        				}
	       			}
	       		}else{
	       			if(lastModFalg != "INSERT"){
	       				grid.jqGrid('setCell',lastSelection,'MOD_CHECK',null);
	       				grid.jqGrid('setCell',lastSelection,'MOD_FLAG',null);
	       			}
	       		}
	       		//lastSelection ="";
           }else{
        	   if(settings.onSelectRowEvent && id != pravSelection){
					settings.onSelectRowEvent(grid.getRowData(id),{});
        	   }
           }
			$targetGrid.data("pravSelection",id);
		}
		/**
		 * CEL 에디터 함수
		 */
       // CELL 더블클릭 수정모드
       function editDblClickCell(id, iRow, iCol, e) {

    	   var grid = $targetGrid;
    	   var rowData = grid.getRowData( id );
    	   var model = grid.jqGrid('getGridParam', 'colModel');
    	   if (rowData.MOD_VAL == "") {

    		   var thissVal = "";
    		   for (var i = 0; i < model.length; i++) {
    			   if (model[i].editable) {
    				   thissVal += (rowData[model[i].name] + "|");
    			   }
    		   }
    		   grid.jqGrid('setCell', id, 'MOD_VAL', thissVal);
    	   }
//    	   grid.editCell(id, iCol, true);
//    	   grid.jqGrid('editCell',id, iCol,true);

    	   grid.jqGrid('setGridParam', {cellEdit: true});
    	   grid.jqGrid('editCell', iRow, iCol, true);
    	   grid.jqGrid('setGridParam', {cellEdit: false});
    	   if(rowData.MOD_FLAG != "INSERT"){
    		   for (var i = 0; i < model.length; i++) {
    			   if (model[i].disabled) {
    				   $("#"+id+"_"+model[i].name).prop("disabled",true);
    				   $("#"+id+"_"+model[i].name).css("background","#f0f0f0");
    			   }
    		   }
    	   }
    	   $targetGrid.data("lastCellSelection",iCol);
    	   $targetGrid.data("lastSelection",iRow);
       }

       // CELL선택시 기본함수
       function editSelectCellDefault(id,cellidx, cellvalue) {
			var grid = $targetGrid;
			var lastSelection = grid.data("lastSelection");
			var pravSelection = grid.data("pravSelection");
			var lastCellSelection = grid.data("lastCellSelection");
			if (settings.onSelectRowEvent && id != pravSelection) {
				settings.onSelectRowEvent(grid.getRowData(id), grid.getRowData(lastSelection));
			}
			$targetGrid.data("pravSelection", id);
			$targetGrid.data("lastCellSelection", cellidx);
       }
       // CELL선택시 로우데이터 저장 및 수정데이터 체크
       function editSelectCell(id, cellidx, cellvalue) {
    	   var grid = $targetGrid;
    	   var lastSelection = grid.data("lastSelection");
    	   var pravSelection = grid.data("pravSelection");
    	   var lastCellSelection = grid.data("lastCellSelection");
    	   var ids = grid.getDataIDs();

    	   if(lastSelection){
    		   grid.jqGrid('saveRow',lastSelection,false,'clientArray');
    		   var model = grid.jqGrid ('getGridParam', 'colModel');
    		   if(settings.onSaveRowValidate){
    			   if(!settings.onSaveRowValidate(grid.getRowData( lastSelection),lastSelection,grid)){
    				   return;
    			   }else{
    				   if(lastCellSelection){
    					   grid.jqGrid('setGridParam', {cellEdit: true});
    					   grid.jqGrid('saveCell', lastSelection, lastCellSelection, true);
    					   grid.jqGrid('setGridParam', {cellEdit: false});
    				   }
    			   }
    		   }else{
    			   if(lastCellSelection){
	    			   grid.jqGrid('setGridParam', {cellEdit: true});
	    			   grid.jqGrid('saveCell', lastSelection, lastCellSelection, true);
	    			   grid.jqGrid('setGridParam', {cellEdit: false});
    			   }
    		   }
    		   if(settings.onSelectRowEvent && id != pravSelection){
    			   settings.onSelectRowEvent(grid.getRowData(id),grid.getRowData( lastSelection));
    		   }


    		   var lastRowData = grid.getRowData( lastSelection );
    		   var lastOriVal = lastRowData.MOD_VAL;
    		   var lastModCheck = lastRowData.MOD_CHECK;
    		   var lastModFalg = lastRowData.MOD_FLAG;

    		   var lastVal = "";
    		   for (var i = 0; i < model.length; i++) {
    			   if(model[i].editable){
    				   lastVal +=(lastRowData[model[i].name]+"|");
    			   }
    		   }
    		   var gridId = grid.attr("id");
    		   if(lastOriVal != lastVal){
    			   if(lastModFalg != "INSERT"){
    				   grid.jqGrid('setCell',lastSelection,'MOD_CHECK','<i class="fa fa-repeat" />');
    				   var checkBox = $("#jqg_"+gridId+"_" + lastSelection);
    				   var pravVal = checkBox.data("pravVal");
    				   if(lastModCheck == "" ||lastModFalg == "DELETE"){
    					   grid.jqGrid('setCell',lastSelection,'MOD_FLAG','UPDATE');
    					   if(!pravVal){
    						   if(!checkBox.is(":checked")){
    							   checkBox.trigger("click");
    							   checkBox.prop("checked", true);
    						   }
    	    					checkBox.data("pravVal", lastVal);
    	    				}
    				   }
    				if(pravVal && pravVal != "" && pravVal != lastVal){
    					if(!checkBox.is(":checked")){
							   checkBox.trigger("click");
							   checkBox.prop("checked", true);
						   }
    					checkBox.data("pravVal", lastVal);
    				}

    			   }
    		   }else{
    			   if(lastModFalg != "INSERT"){
    				   grid.jqGrid('setCell',lastSelection,'MOD_CHECK',null);
    				   grid.jqGrid('setCell',lastSelection,'MOD_FLAG',null);
//    				   $("#jqg_"+gridId+"_" + lastSelection).prop("checked", false);
    			   }

    		   }
    	   }else{
    		   if(settings.onSelectRowEvent && id != pravSelection){
    			   settings.onSelectRowEvent(grid.getRowData(id),{});
    		   }
    	   }

    	   $targetGrid.data("pravSelection",id);
       }


       function rowSpan(){
 			//그룹 로우 합치기
 			var grid = this;
 			$("td[name='cellRowspan']",grid).each(function(){
 				var spans =$("td[rowspanid='"+this.id+"']",grid).length+1;
 				if(spans > 1 ){
 					$(this).attr('rowspan',spans);
 				}
 			});
 			chkcell = {};
       }


       function checkRowspanCell(rowid, val, rowObject, cm, rdata){
			var result = "";
			var colId = this.id +'-'+cm.name;
			if(!chkcell[colId]){
				chkcell[colId] = {cellId:undefined,chkval:undefined};
			}
			if(chkcell[colId].chkval != val){
				var cellId = this.id +'_row_'+rowid+'-'+cm.name;
				result = ' rowspan="1" id="'+cellId+'" name="cellRowspan"';
				chkcell[colId] = {cellId:cellId,chkval:val};
			}else{
				result = 'style="display:none;" rowspanid="'+chkcell[colId].cellId+'"';
			}
			return result;
		}
		// 로우 더블클릭 수정모드
       function editClickRow(id, iRow, iCol, e) {
           var grid = $targetGrid;
           var rowData = grid.getRowData( id );
           var model = grid.jqGrid('getGridParam', 'colModel');
           if (rowData.MOD_VAL == "") {

				var thissVal = "";
				for (var i = 0; i < model.length; i++) {
					if (model[i].editable) {
						thissVal += (rowData[model[i].name] + "|");
					}
				}
				grid.jqGrid('setCell', id, 'MOD_VAL', thissVal);
           }
           grid.jqGrid('editRow',id, {focusField: iCol});

           if(rowData.MOD_FLAG != "INSERT"){
        	   for (var i = 0; i < model.length; i++) {
        		   if (model[i].disabled) {
        			   $("#"+id+"_"+model[i].name).prop("disabled",true);
        			   $("#"+id+"_"+model[i].name).css("background","#f0f0f0");
        		   }
        	   }
           }
           $targetGrid.data("lastSelection",id);
       }
       function onClickExcelBtnDefault(options) {
    	   var searchData = options.postData;
    	   delete searchData["pageSize"];
    	   delete searchData["countable"];
    	   delete searchData["pageable"];
    	   delete searchData["_search"];
    	   delete searchData["page"];
    	   delete searchData["sortable"];
    	   delete searchData["orderType"];
    	   $targetGrid.downloadExcel(JSON.stringify(searchData));

       }
       
       function onClickPdfBtnDefault(options) {
    	   console.log("pdf btn");
    	   console.log(options);

       }

       function onClickPreBtnDefault(options) {
    	   var gridData = options.ori_data;
    	   var columnIds = options.columnIds;
    	   var columnNms = options.columnNms;
    	   if(gridData.length == 0){
    		   alert("조회된 데이터가 없습니다.");
    		   return;
    	   }
    	   if(!columnNms || columnNms.length == 0){
    		   columnNms = options.colNames;
    	   }
    	   var sheetNm = options.caption;
    	   var sendData={
    			   "sheetNm":sheetNm,
    			   "columnNms":columnNms,
    			   "columnIds":columnIds,
    			   "dt_grid":gridData
    	   };
    	   var jsonData = JSON.stringify(sendData);
    	   App.prcsStart();
    		$.ajax({
 				url: "/ctrl/comm/view/excel",
 				data:jsonData,
 	    		contentType: 'application/json; charset=utf-8',
 				success: function(data) {
 					PopApp.paragonOpenPopup({
 						ajaxUrl: '',
 			 			id: '저장',
 			 			body: data.body,
 			 			width: '900px',
 			 			btnName:"저장",
 						title :"미리보기",
 						visible:true,
 						click:function(){
 							alert("!!!!!");
 						},
 						onload : function(modal) {
 							modal.show();
 						}
	 				});
 					App.prcsEnd();
 				}
    		});

       }
 	};


 	//그리드 조건부 조회
 	$.fn.paragonGridSearch = function(data) {
        $(this).setGridParam({
        	datatype: "json",
            postData:data
        }).trigger("reloadGrid");
 	};
 	$.fn.paragonGridReload = function() {
 		$(this).trigger("reloadGrid");
 	};

 	/**
 	 *  수정모드시 체크박스 데이터 삭제
 	 *  Data:2017-04-13
 	 *  Author:Lee Sung Guk.
 	 */
 	$.fn.paragonGridCheckedDeleteData = function(){
		var grid = $(this);
		var gridCheckRowIds = grid.getGridParam('selarrrow');
		var addFlag = true;
		var rowLen = gridCheckRowIds.length;

        if(gridCheckRowIds.length == 0 ){
			alert("삭제할 행을 선택해주세요.");
			return;
		}

        for (var i = rowLen -1; i>=0; i--) {
            var rowid= gridCheckRowIds[i];
            var rowData = grid.getRowData(rowid);

            if(rowData.MOD_FLAG == "INSERT"){
                grid.jqGrid('delRowData', rowid);
            }else if(rowData.MOD_FLAG == "DELETE" ) {
				grid.jqGrid('setCell', rowid, 'MOD_CHECK', null);
                grid.jqGrid('setCell', rowid, 'MOD_FLAG',  null);
            }else{
                grid.jqGrid('setCell', rowid, 'MOD_FLAG',  'DELETE');
                grid.jqGrid('setCell', rowid, 'MOD_CHECK', '<i class="fa fa-check text-danger" />');
                addFlag = false;
            }
        }
        return addFlag;
	}

    /**
     * Seleted grid row data.
     * Data: 2017-04-13
     * Author: Lee Sung Guk.
	 * Description: 매개변수에 해당 그리드 객체를 넘겨준다.
	 *
	*/
	$.fn.getSelectedJsonDataChk = function(dataTableName, getData, gridTable){
         var grid = gridTable;
         var lastSelection = grid.data("lastSelection");
         var lastCellSelection = grid.data("lastCellSelection");
         // 미저장 로우 저장
         var ids = grid.jqGrid('getDataIDs');
         var options=  grid.jqGrid('getGridParam');
         var celEditable = options.cellEditable;

         if(options.onSaveRowValidate && lastSelection){
             if(!options.onSaveRowValidate( $(this).getRowData( lastSelection),lastSelection,grid)){
                 return;
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

             var gridId = grid.attr("id");

             if (lastOriVal != lastVal){
                 if (lastModFalg != "INSERT"){
                     grid.jqGrid('setCell', lastSelection, 'MOD_CHECK','<i class="fa fa-repeat" />');
                     if (lastModCheck == "" || lastModFalg == "DELETE") {
                         grid.jqGrid('setCell', lastSelection, 'MOD_FLAG','UPDATE');
                     }
                 }
             }else{
                 if(lastModFalg != "INSERT"){
                     grid.jqGrid('setCell', lastSelection, 'MOD_CHECK', null);
                     grid.jqGrid('setCell', lastSelection, 'MOD_FLAG', null);
                 }
             }
             grid.data("lastSelection","");
         }

         var gridRowData = grid.getGridParam('selarrrow');
         var rtnArrayData = [];
         if(getData){
             var rowKeys = grid.getRowData(gridRowData[1]);
             delete rowKeys["MOD_VAL"];
             delete rowKeys["MOD_CHECK"];
             for (var i = 0; i < gridRowData.length; i++) {
                 var rtnRowData = {};

                 $.each( getData, function( key, value ) {
                     rtnRowData[key] = grid.getRowData(gridRowData[i])[value];
                 });

                 rtnArrayData.push(rtnRowData);
             }

         }else{
             var rowKeys = grid.getRowData(gridRowData[1]);

             delete rowKeys["MOD_VAL"];
             delete rowKeys["MOD_CHECK"];

             for (var i = 0; i < gridRowData.length; i++) {
                 var rtnRowData = {};
                 $.each( rowKeys, function(key) {
                     rtnRowData[key] = grid.getRowData(gridRowData[i])[key];
                 });
                 rtnArrayData.push(rtnRowData);
             }
         }

         if(rtnArrayData.length == 0){
             return false;
         }else{
             var returnJsonData = {};
             returnJsonData[dataTableName] = rtnArrayData;
             return JSON.stringify(returnJsonData);
         }
     }
    function itoStr($num){
        $num < 10 ? $num = '0'+$num : $num;
        return $num.toString();
    }
	//엑셀다운로드
//	function setExcelData(data, options){
//	    var columnIds = options.columnIds;
//        var columnNms = options.columnNms;
// 	    if(!columnNms || columnNms.length == 0){
//		    columnNms = options.colNames;
//	    }
//        
//        var date = new Date();
//        var year =  itoStr( date.getFullYear() );
//        var month = itoStr( date.getMonth() + 1 );
//        var day =   itoStr( date.getDate() );
//        var hour =  itoStr( date.getHours() );
//        var mins =  itoStr( date.getMinutes() );
//
//        //엑셀 파일명 지정
//        var sheetNm = options.caption;
//        if(sheetNm == '' || sheetNm.indexOf(':') != -1){
//            sheetNm = 'Excel_NoName_' + year + month + day + "_" + hour + mins;
//        }else{
//        	sheetNm = 'Excel_' + options.caption + '_' + year + month + day + "_" + hour + mins;
//        }
//        
//        var sendData={
//                "sheetNm"	:	sheetNm,
//                "columnNms"	:	columnNms,
//                "columnIds"	:	columnIds,
//				"dt_grid"	:   data.dt_grid,                
//                "caption"	:	options.caption
//        };
//        return sendData;
//	}
	$.fn.downloadExcel = function(searchData){
		var date = new Date();
        var year =  itoStr( date.getFullYear() );
        var month = itoStr( date.getMonth() + 1 );
        var day =   itoStr( date.getDate() );
        var hour =  itoStr( date.getHours() );
        var mins =  itoStr( date.getMinutes() );
        
        var grid = $(this);
		var options = grid.jqGrid('getGridParam');
		if(!searchData){
			searchData = JSON.stringify(options.postData);
		}
		
		var sheetNm = options.caption;
		var url = options.url;
		
		App.prcsStart("Excel 파일 생성중입니다.",120000);
		$.ajax({
			url: url,
			data:searchData,
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
		        //엑셀 파일명 지정
		        if(sheetNm == '' || sheetNm.indexOf(':') != -1){
		            sheetNm = 'Excel_NoName_' + year + month + day + "_" + hour + mins;
		        }else{
		        	sheetNm = 'Excel_' + options.caption + '_' + year + month + day + "_" + hour + mins;
		        }
				
				if(data.dt_grid.length > 0 ){
					var sendData={
							"sheetNm":sheetNm,
							"excelColunmIds":options.excelColunmIds,
							"excelColunmNms":options.excelColunmNms,
							"caption":options.caption,
							"dt_grid":data.dt_grid,
					};
					fnExcelMakeAndDownload(sendData);
				}else{
					App.prcsEnd();
					alert("조회된 내용이 없습니다.");
				}
			}
		});
	}
	
	function fnExcelMakeAndDownload(sendData){
		var jsonData = JSON.stringify(sendData);
		var request = new XMLHttpRequest();   // new HttpRequest instance
		
		request.open("POST", "/ctrl/comm/download/excel", true);
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


}( jQuery ));