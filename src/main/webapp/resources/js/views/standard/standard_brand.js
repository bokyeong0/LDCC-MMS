/** Copyright (c) 2017 VertexID RND, Inc.
 * 
 * Application Name : 권역관리[StandardBrandApp]
 * Program Code     : PC0101
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * MINE 한성진		2017. 3. 16. 		First Draft.        javascript
 */
var StandardBrandApp = function () {
	"use strict";
	
	/************************************************
	 *전역 객체 선언부 (return 상위부분에 선언해야함)
	 ************************************************/
	
	// [El]권역정보 그리드
	var $standardBrandGrid = $("#standardBrandGrid");
	
    return {
        init: function () {
        	//권역정보관리 Grid생성
        	fnListBrand();
        	//권역정보관리 Event
        	fnBrandEvents();
	    }
    };
    
    
    //[Fn] 이벤트 
    function fnBrandEvents(){
    	
    	//검색폼 권역정보명 엔터키 이벤트
    	$("#standardBrandName").enterEvent({
    		callBack:function(value){
    			//그리드 수정 여부 체크
    			if(fnModCheck()){
    				var data = {
    						PRO_CD : "",
    						PRO_NM : $("#standardBrandName").val()
    				};
    				$standardBrandGrid.paragonGridSearch(data);
    				$("#standardBrandName").autocomplete( "close" );
    			}
			}
    	})
    	
    	//저장버튼
    	$("#standardBrandSaveRowBtn").click(function(){
    		saveRows();
    	});
    	//행추가버튼
    	$("#standardBrandAddRowBtn").click(function(){
    		fnAddRowBrand();
    	});
    	//검색버튼
    	$("#standardBrandSearchBtn").click(function(){
    		fnSearchListBrand();
    	});
    	//행삭제버튼
    	$("#standardBrandDelRowBtn").click(function(){
    		$standardBrandGrid.rowDel();
    	});
    }
    
    //[Fn] 검색 조건 매핑
    function fnSearchListBrand(){
    	//그리드 수정 여부 체크
    	if(fnModCheck()){
	    	var data = {
					PRO_CD : $("#standardBrandCode").val(),
					PRO_NM : $("#standardBrandName").val()
			};
    		$standardBrandGrid.paragonGridSearch(data);
    	}
    }
    
    
    
    //[Fn] 권역정보명 가져오기 자동완성            
    function fnGetBrandNms(data){
    	$.ajax({
    		url : "/ctrl/standard/brand/listMaBrandName",
    		data :data,
    		type : "POST",
    		dataType : "json",
    		cache: false,
    		success : function(result) {
    			$('#standardBrandName').autocomplete({
    				source: result,
    				minLength:0 
    			});
    			$("#standardBrandName").autocomplete("search", "");
    			$("#standardBrandName").val("").focus();
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
    function fnListBrand(){
		$standardBrandGrid.paragonGrid({
        	url: '/ctrl/standard/brand/listStndBrand',
        	rowEditable:true,
			sortable: true,
//			rowHight: "L",
//			height: "550px",
//			rowNum: 25,
			colModel : [ 
	            {editable : true,name : 'NUM_INT',}, 
	            {editable : true,name : 'NUM_FLOAT',}, 
	            {editable : true,name : 'MONEY',}, 
				{editable : true,name : 'CALC_INT1'}, 
				{editable : true,name : 'CALC_INT2'}, 
				{editable : true,name : 'CALC_SUM'}, 
				{editable : true,name : 'DATE_POP'}, 
				{editable : true,name : 'CUST_BTN'}, 
				{editable : true, name : 'USE_YN'}, 
				{name : 'IN_USER_ID'},
				{name : 'IN_DT',sortable : false} 
			],
            pager: "#standardBrandGridNavi",
            domainId : "AREA_LIST",
        });
		
		
	}
    //그리드 수정 여부 체크
    function fnModCheck(){
    	return $standardBrandGrid.paragonGridModConfirm("수정된 내용이 있습니다. 계속 진행하시겠습니까?");
	}
    
    // [Function] 라디오 값 get/set
    function getRadioElValue(elem, oper, value) {
        if (oper === "set") {
            var radioButton = $(elem).find("input:radio[value='" + value + "']");
            if (radioButton.length > 0) {
                radioButton.prop("checked", true);
            }
        }
        if (oper === "get") {
            return $(elem).find("input:radio:checked").val();
        }
    }
	//[Fn] 라디오 Ui 생성
    function createRadioEl(value, editOptions) {
    	if(value == ""){
    		value = "Y";
    	}
        var div =$("<div/>");
        var label = $("<label class='radio-inline'></label>");
        var radio = $("<input>", { type: "radio", value: "Y", name: editOptions.id, id: "useY", checked: value == 'Y'  });
		label.append(radio).append("Y");
        var label1 = $("<label class='radio-inline'></label>");
        var radio1 = $("<input>", { type: "radio", value: "N", name: editOptions.id, id: "useN", checked: value == 'N' });
		label1.append(radio1).append("N");        
        div.append(label).append(label1);
        return div;
    }
    
    //[Fn] grid 행추가
    function fnAddRowBrand() {
    	$standardBrandGrid.appendRow();
    }
    
    //[Fn] 수정된 내용저장
    function saveRows() {
    	
    	// 데이터 키 : Value Key
    	var rowData = {
    			modFlag:"MOD_FLAG" ,
				callUrl:"CALL_URL" ,
				jsPath:"JS_PATH" ,
				proCd:"PRO_CD" ,
				proDesc:"PRO_DESC" ,
				proNm:"PRO_NM" ,
				useYn:"USE_YN" 
		}
    	// $systemAuthGrid.getJsonData("dt_menuauth",formatData); (return json)
		// grid에서 formatData에 정의된 데이터를 'dt_program' 키값으로 parsing 
    	var jsonData = $standardBrandGrid.getJsonData("dt_program",rowData);
    	
    	if(!jsonData){
    		alert("변경된 데이터가 없습니다.");
    		return;
    	}
		$.ajax({
    		url : "/ctrl/standard/brand/saveStndBrand",
    		data :jsonData,
    		contentType: 'application/json; charset=utf-8',
    		success : function(result) {
    			alert(result.msgTxt);
    			$standardBrandGrid.paragonGridReload();
    		}
    	});
    		
    }
    
}();

$(document).ready(function() {
	StandardBrandApp.init();
});
