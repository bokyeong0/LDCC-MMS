/** Copyright (c) 2016 VertexID RND, Inc.
 * 
 * Application Name : 공통코드 관리[SystemCodeApp]
 * Program Code     : PC0003
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Kim Jin Ho  		2016. 10. 24.  		First Draft.
 */
var SystemTestApp = function () {
	"use strict";
	
	/************************************************
	 *전역 객체 선언부 (return 상위부분에 선언해야함)
	 ************************************************/
	
	// [El]그룹코드 그리드
	var $productGrid = $("#systemProductGrid");
	
	// [El]공통코드 그리드
	var $manufacturerGrid = $("#systemManufacturerGrid");
	
	// [El]공통코드 그리드
	var $equipmentGrid = $("#systemEquipmentGrid");

	// [Data]그룹코드 유형 콤보박스 데이터
//	var testGroupComboJson;
	 
	
    return {
        init: function () {
        	
        	fnProductEvents();
        	
        	fnListProduct();

        	fnManufacturerEvents();
        	
        	fnListManufacturer();
        	
        	
	    }
	    
    };
    
    //제품군 events
    function fnProductEvents() {
    	//검색폼 제품군 코드 엔터키
    	$("#productCd").enterEvent({
    		callBack:function(value){
    			if(value.length > 1){
    				fnGetProductNames({"productCd":value});
    			}else{
    				alert("코드명을 2자리 이상 입력해주세요.");
    			}
    		}
    	});
    	//검색폼 제품군명 엔터키 이벤트
    	$("#productName").enterEvent({
    		callBack:function(value){
    			//그리드 수정 여부 체크
    			if(fnModCheck($productGrid)){
    				var data = {
    						productCd : "",
    						productNm : $("#productName").val()
    				};
    				console.log(JSON.stringify(data));
    				$productGrid.paragonGridSearch(data);
    				$("#productName").autocomplete("close");
    			}
    		}
    	});
    	
    	//제품군 검색버튼
    	$("#productSearchBtn").click(function(){
    		fnSearchListProduct();
    	});
    	//제품군 행추가버튼
    	$("#productAddRowBtn").click(function(){
    		$productGrid.appendRow();
    	});
    	//제품군 행삭제버튼
    	$("#productDelRowBtn").click(function(){
    		$productGrid.rowDel();
    	});
    	//제품군 저장버튼
    	$("#productSaveRowBtn").click(function(){
    		fnSaveProductRows();
    	});
    }
    
    //제조사 events
    function fnManufacturerEvents() {
    	//검색폼 제조사 코드 엔터키
    	$("#manufacturerCd").enterEvent({
    		callBack:function(value){
    			if(value.length > 1){
    				fnGetManufacturerNames({"manufacturerCd":value});
    			}else{
    				alert("코드명을 2자리 이상 입력해주세요.");
    			}
    		}
    	});
    	//검색폼 제조사명 엔터키 이벤트
    	$("#manufacturerName").enterEvent({
    		callBack:function(value){
    			//그리드 수정 여부 체크
    			if(fnModCheck($manufacturerGrid)){
    				var data = {
    						productCd : "",
    						manufacturerCd : "",
    						manufacturerNm : $("#manufacturerName").val()
    				};
    				$manufacturerGrid.paragonGridSearch(data);
    				$("#manufacturerName").autocomplete("close");
    			}
    		}
    	});
    	
    	//제조사 검색버튼
    	$("#manufacturerSearchBtn").click(function(){
    		fnSearchListManufacturer();
    	});
    	//제조사 행추가버튼
    	$("#manufacturerAddRowBtn").click(function(){
    		fnAddRowManufacturer();
    	});
    	//제조사 행삭제버튼
    	$("#manufacturerDelRowBtn").click(function(){
    		$manufacturerGrid.rowDel();
    	});
    	//제조사 저장버튼
    	$("#manufacturerSaveRowBtn").click(function(){
    		fnSaveManufacturerRows();
    	});
    }
    
    
    /********************************************************************
     * 제품군 그리드 생성
     * Since   : 2017-02-10
     * COMP_ID : 
     * 작성자  : Han Seong Jin
     * 수정내역: 
     ********************************************************************/
    function fnListProduct() {
    	$productGrid.paragonGrid({
    		url : '/ctrl/settings/system/test/listProduct',
    		componentId :"",
    		height : 170,
    		rowNum : 15,
    		rowEditable : true,
    		scroll : 1,
    		colModel:[
    		          {name:'PRODUCT_SEQ',hidden:true},
    		          {editable:true, name:'PRODUCT_CD', align:"center"},
    		          {editable:true, name:'PRODUCT_NM', align:"center"},
    		          {editable:true, name:'PRODUCT_DESC', width:300},
    		          {
    	                	editable: true, 
    	                	name:'USE_YN', 
    	                	align:"center",
    	                	width:"100px",
    	                	fixed :true,
    	                	edittype: "custom",
    	                	editoptions: {
    	                        custom_value: fnGetRadioElValue,
    	                        custom_element: fnCreateRadioEl
    	                    }
    	        	  },
    		          {name:'IN_USER_ID', align:"center"},
    		          {name:'IN_DT', align:"center", sortable:false}
    		         ],
    		caption : "제품군 목록",
    		//로우 선택식 호출함수 (연속호출 x)
    		onSelectRowEvent : function(currRowData, prevRowData) {
    			var productCd = currRowData.PRODUCT_CD
    			$("#manufacturerCd").val("");
				$("#manufacturerName").val("");
				$manufacturerGrid.paragonGridSearch({
					"productCd" : productCd,
					manufacturerNm : "",
					manufacturerCd : ""
				});
    		}
    		
    	})
    }
    
    //[Fn 공통]  라디오 값 get/set
    function fnGetRadioElValue(elem, oper, value) {
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
	//[Fn 공통]  라디오 Ui 생성
    function fnCreateRadioEl(value, editOptions) {
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
    
    //[Fn 공통] 그리드 수정 여부 체크
    function fnModCheck(grid){
    	return grid.paragonGridModConfirm("수정된 내용이 있습니다. 계속 진행하시겠습니까?");
    }
    
    
    //[Fn] 제품군 코드명 가져오기 자동완성
    function fnGetProductNames(data){
    	$.ajax({
    		url : "/ctrl/settings/system/test/listProductNames",
    		data : data,
    		type : "POST",
    		dataType : "json",
    		cache : false,
    		success : function(result) {
    			//자동완성 생성
    			$('#productName').autocomplete({
    				source: result,
    				minLength:0
    			});
    			$('#productName').autocomplete("search", "");
    			$('#productName').val("").focus();
    		}
    			
    	})
    }
    
    //[Fn] 제품군 코드 검색 조건 조회
    function fnSearchListProduct(){
    	//수정 여부 체크
    	if(fnModCheck($productGrid)){
    		var data = {
    			productCd : "",
    			productNm : $("#productName").val()
    		};
    		//그리드 조회
    		$productGrid.paragonGridSearch(data);
    	}
    }
    
    //[Fn]제품군코드 수정 내용 저장
    function fnSaveProductRows() {
    	
    	var parseCamelData = {
    			modFlag		: "MOD_FLAG",
    			productSeq		: "PRODUCT_SEQ",
    			productCd		: "PRODUCT_CD",
    			productNm		: "PRODUCT_NM",
    			productDesc		: "PRODUCT_DESC",
    			useYn		: "USE_YN"
    	}
    	var jsonData = $productGrid.getJsonData("dt_product", parseCamelData);
    	
    	if(!jsonData){
    		alert("변경된 데이터가 없습니다.");
    		return;
    	}
    	
    	$.ajax({
    		url : "/ctrl/settings/system/test/saveProduct",
    		data : jsonData,
    		contentType : 'application/json; charset=utf-8',
    		cache : false,
    		success : function(result) {
    			alert(result.msgTxt);
    			$productGrid.trigger("reloadGrid");
    		}
    	})
    }
    
    /********************************************************************
     * 제조사 그리드 생성
     * Since   : 2017-02-10
     * COMP_ID : 
     * 작성자  : Han Seong Jin
     * 수정내역: 
     ********************************************************************/
    function fnListManufacturer() {
    	$manufacturerGrid.paragonGrid({
    		url : '/ctrl/settings/system/test/listManufacturer',
    		componentId :'',
    		rowEditable : true,
    		height : 500,
    		rowNum : 10,
    		scroll : 1,
    		colModel:[
    		          {name:'MANUFACTURER_SEQ',hidden:true},
    		          {name:'PRODUCT_CD', align:"center", rowspan:true},
    		          {editable:true, name:'MANUFACTURER_CD', align:"center"},
    		          {editable:true, name:'MANUFACTURER_NM', align:"center"},
    		          {editable:true, name:'MANUFACTURER_DESC', width:300},
    		          {
    	                	editable: true, 
    	                	name:'USE_YN', 
    	                	align:"center",
    	                	width:"100px",
    	                	fixed :true,
    	                	edittype: "custom",
    	                	editoptions: {
    	                        custom_value: fnGetRadioElValue,
    	                        custom_element: fnCreateRadioEl
    	                    }
    	        	  },
    		          {name:'IN_USER_ID', align:"center"},
    		          {name:'IN_DT', align:"center", sortable:false}
    		],
    		caption : "제조사 목록",
    		rowspan:true
    	})
    }
    
  //[Fn 공통]  라디오 값 get/set
    function fnGetRadioElValue(elem, oper, value) {
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
	//[Fn 공통]  라디오 Ui 생성
    function fnCreateRadioEl(value, editOptions) {
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
    
    //[Fn] 제조사 코드명 가져오기 자동완성
    function fnGetManufacturerNames(data){
    	$.ajax({
    		url : "/ctrl/settings/system/test/listManufacturerNames",
    		data : data,
    		type : "POST",
    		dataType : "json",
    		cache : false,
    		success : function(result) {
    			//자동완성 생성
    			$('#manufacturerName').autocomplete({
    				source: result,
    				minLength:0
    			});
    			$('#manufacturerName').autocomplete("search", "");
    			$('#manufacturerName').val("").focus();
    		}
    			
    	})
    }
    
    //[Fn] 제조사 코드 검색 조건 조회
    function fnSearchListManufacturer(){
    	//수정 여부 체크
    	if(fnModCheck($manufacturerGrid)){
    		var data = {
    			manufacturerCd : "",
    			manufacturerNm : $("#ManufacturerName").val()
    		};
    		//그리드 조회
    		$manufacturerGrid.paragonGridSearch(data);
    	}
    }
    
    //[Fn] 제조사 행추가
    function fnAddRowManufacturer() {
    	//제품군 코드 선택행
    	var rowid = $productGrid.jqGrid('getGridParam','selrow');
    	//제품군 코드 선택행 데이터
    	var lastRowData = $productGrid.getRowData(rowid);
    	//제품군 코드 선택행 데이터 PRODUCT_CD
    	var productCd = lastRowData.PRODUCT_CD;
    	
    	//행추가시 기본값세팅 addData,  행추가 하기전 실행 함수 :startCallBack
    	$manufacturerGrid.paragonGridAddRow({
    		addData : {'PRODUCT_CD':productCd},
    		startCallBack : function(){
    			var modFlag = lastRowData.MOD_FLAG;
    			
    			if(rowid == null){
    				alert("제품군 그룹을 선택해주세요.");
    				return false;
    			}else if(productCd == "" || modFlag == "INSERT"){
    				alert("제품군 그룹을 선택해주세요.");
    				return false;
    			}
    			return true;
    		}
    	});
    }
    //[Fn]제조사 코드 수정 내용 저장
    function fnSaveManufacturerRows() {
    	
    	var parseCamelData = {
    			modFlag				: "MOD_FLAG",
    			productCd			: "PRODUCT_CD",
    			manufacturerSeq		: "MANUFACTURER_SEQ",
    			manufacturerCd		: "MANUFACTURER_CD",
    			manufacturerNm		: "MANUFACTURER_NM",
    			manufacturerDesc	: "MANUFACTURER_DESC",
    			useYn		: "USE_YN"
    	}
    	var jsonData = $manufacturerGrid.getJsonData("dt_manufacturer", parseCamelData);
    	
    	if(!jsonData){
    		alert("변경된 데이터가 없습니다.");
    		return;
    	}
    	
    	$.ajax({
    		url : "/ctrl/settings/system/test/saveManufacturer",
    		data : jsonData,
    		contentType : 'application/json; charset=utf-8',
    		cache : false,
    		success : function(result) {
    			alert(result.msgTxt);
    			$manufacturerGrid.trigger("reloadGrid");
    		}
    	})
    }
    
    /********************************************************************
     * 제조사 그리드 생성
     * Since   : 2017-02-10
     * COMP_ID : 
     * 작성자  : Han Seong Jin
     * 수정내역: 
     ********************************************************************/
    function fnListEquipment() {
    	$manufacturerGrid.paragonGrid({
    		url : '/ctrl/settings/system/test/listEquipment',
    		componentId :'',
    		rowEditable : true,
    		height : 500,
    		rowNum : 10,
    		scroll : 1,
    		colModel:[
    		          {name:'EQUIPMENT_SEQ',hidden:true},
    		          {name:'PRODUCT_CD', align:"center", rowspan:true},
    		          {name:'MANUFACTURER_CD', align:"center", rowspan:true},
    		          {editable:true, name:'EQUIPMENT_CD', align:"center"},
    		          {editable:true, name:'EQUIPMENT_NM', align:"center"},
    		          {editable:true, name:'EQUIPMENT_DESC', width:300},
    		          {
    	                	editable: true, 
    	                	name:'USE_YN', 
    	                	align:"center",
    	                	width:"100px",
    	                	fixed :true,
    	                	edittype: "custom",
    	                	editoptions: {
    	                        custom_value: fnGetRadioElValue,
    	                        custom_element: fnCreateRadioEl
    	                    }
    	        	  },
    		          {name:'IN_USER_ID', align:"center"},
    		          {name:'IN_DT', align:"center", sortable:false}
    		],
    		caption : "제조사 목록",
    		rowspan:true
    	})
    }
    
}();

$(document).ready(function() {
	SystemTestApp.init();
});
