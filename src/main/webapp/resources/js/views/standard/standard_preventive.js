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
var StandardPreventiveApp = function () {
	"use strict";
	
	/************************************************
	 *전역 객체 선언부 (return 상위부분에 선언해야함)
	 ************************************************/
	
	// [El]비품분류관리 그리드
	var $standardPreventiveLv1Grid = $("#standardPreventiveLv1Grid");
	var $standardPreventiveLv2Grid = $("#standardPreventiveLv2Grid");
	var $standardPreventiveLv3Grid = $("#standardPreventiveLv3Grid");
	
	var gridReasonOptions;
	
    return {
        init: function () {
        	
        	//제품범주 Grid생성
        	fnPreventiveLv1GridList(); 
        	//제품군 Grid생성
        	fnPreventiveLv2GridList(); 
        	//제조사 Grid생성
        	fnPreventiveLv3GridList(); 
        	
        	//품목분류관리 이벤트
        	fnPreventiveEvents();
        	
	    }
    };
    
    //[Fn] 품목분류관리 이벤트 
    function fnPreventiveEvents(){
    	//제품범주 수정불가버튼
    	$("#standardPreventiveLv1BanBtn").click(function(){
    		alert("제품범주는 수정할 수 없습니다. LDCC 관리자에게 문의하세요.");
    	});

    	//제품군 수정불가버튼
    	$("#standardPreventiveLv2BanBtn").click(function(){
    		alert("제품군은 수정할 수 없습니다. LDCC 관리자에게 문의하세요.");
    	});
    	//모델명 추가버튼
    	$("#standardPreventiveLv3AddRowBtn").click(function(){
    		if(!$standardPreventiveLv2Grid.getFocusRowId()){
    			alert("제품군을 선택해주세요.");
    			return;
    		}
    		$standardPreventiveLv3Grid.appendRow();
    	});
//    	//모델명 삭제버튼
    	$("#standardPreventiveLv3DelRowBtn").click(function(){
    		$standardPreventiveLv3Grid.rowDel;
    	});
    	
    	//모델명 저장버튼
    	$("#standardPreventiveLv3SaveRowBtn").click(function(){
    		fnSavePreventiveRows();
    	});
    	
    }
    
    /********************************************************************
     * 제품범주 그리드 생성
     * Since   : 2017-11-07
     * 작성자  : Han Seong Jin
     * 수정내역: 
     ********************************************************************/
    function fnPreventiveLv1GridList() {
    	$standardPreventiveLv1Grid.paragonGrid({
			url : '/ctrl/standard/product/type/listStndPrdTypeLv1',
			height : 600,
			rowNum : 9999,
			countable:false,
			sortable:true,
			rowEditable : false,
			scroll : 1,
			loadonce: true,
			rowClickColor:"yellow",
			caption : "제품범주",
            colNames:['코드','제품범주','선택'],
			colModel:[
    		          {name:'PRD_TYPE_CD', hidden:true},
    		          {editable: false, name:'PRD_TYPE_NM', align:"center",
    		        	  editoptions : {
    		        		  maxlength: 30,
    		        	  }
    		          },
    		          {editable:false, width:"70px", align:"center", name:'EVENT', sortable:false, formatter: inMakeActionButtion}
	          ],
		});
    	
    	$standardPreventiveLv1Grid.find('.select-btn').off().live('click',function(e) {
    		e.stopPropagation();
    		
			$standardPreventiveLv1Grid.setFocus();
			$standardPreventiveLv2Grid.search({
				prdTypePrtCd : $(this).val()
			});
			$standardPreventiveLv3Grid.paragonGridClear();
    	});
    }
    
    /********************************************************************
     * 제품군 그리드 생성
     * Since   : 2017-11-07
     * 작성자  : Han Seong Jin
     * 수정내역: 
     ********************************************************************/
    function fnPreventiveLv2GridList() {
    	$standardPreventiveLv2Grid.paragonGrid({
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
    		caption : "제품군",
    		colNames:['코드','제품군','선택'],
    		colModel:[
    		          {name:'PRD_TYPE_CD', hidden:true},
    		          {editable: false, name:'PRD_TYPE_NM', align:"center",
    		        	  editoptions : {
    		        		  maxlength: 30,
    		        	  }
    		          },
    		          {editable:false, width: "70px", align: "center", name: 'EVENT',sortable:false, formatter: inMakeActionButtion}
    		          ],
    	});
    	
    	$standardPreventiveLv2Grid.find('.select-btn').off().live('click',function(e) {
    		e.stopPropagation();
    		
			$standardPreventiveLv2Grid.setFocus();
			$standardPreventiveLv3Grid.search({
				prdTypeLv2 : $(this).val()
			});
			$standardPreventiveLv3Grid.paragonGridClear();
			
    	});
    	
    }
    
    /********************************************************************
     * 모델명 그리드 생성
     * Since   : 2017-11-07
     * 작성자  : Han Seong Jin
     * 수정내역: 
     ********************************************************************/
    function fnPreventiveLv3GridList(){
    	$standardPreventiveLv3Grid.paragonGrid({
    		url : '/ctrl/standard/preventive/listPreventive',
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
    		caption : "점검 유의사항",
    		colNames:['PRD_TYPE_LV2','점검 유의사항','사용여부'],
    		colModel:[
    		          {name:'PRD_TYPE_LV2', align:"center", hidden:true},
    		          {editable : true, name : 'CONTENT', width : "400px",
    		        	  edittype : 'textarea',
    		        	  editoptions : {
    		        		  rows : 20
    		        	  }
    		          },
    		          {editable: true, name:'USE_YN', align:"center", width:"80px", fixed :true,  hidden:true,
    		        	  edittype:'select',
    		        	  formatter:'select',
    		        	  editoptions: {
    		        		  value:"Y:사용;N:미사용",
    		        	  }
    		          },
    		          ],
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
    
    //[Fn] 모델 그룹 저장
    function fnSavePreventiveRows(){
    	var camelObj = {
    			modFlag		: "MOD_FLAG",
    			prdTypeLv2	: "PRD_TYPE_LV2",
    			content		: "CONTENT",
    			useYn		: "USE_YN",
		}
    	
    	var	gridData = $standardPreventiveLv3Grid.getGridData(camelObj);
    	if(gridData.length === 0){
    		alert("저장할 데이터가 없습니다.");
    		return;
    	}
    	
    	var sendData = {
				dt_preventive : gridData,
		}
    	
    	$.ajax({
    		url : "/ctrl/standard/preventive/savePreventive",
    		data :JSON.stringify(sendData),
    		contentType: 'application/json; charset=utf-8',
    		cache: false,
    		success : function(result) {
    			alert(result.msgTxt);
    			var prdTypeLv2 = gridData[0].prdTypeLv2;
	    		$standardPreventiveLv3Grid.search({prdTypeLv2:prdTypeLv2});
    		}
    	});
    }
}();

$(document).ready(function() {
	StandardPreventiveApp.init();
});
