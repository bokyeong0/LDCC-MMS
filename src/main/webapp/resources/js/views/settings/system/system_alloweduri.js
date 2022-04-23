/** Copyright (c) 2016 VertexID RND, Inc.
 * 
 * Application Name : URI 접근허용 관리[AllowedURIApp]
 * Program Code     : PC0004
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Kim Jin Ho  		2016. 10. 24.  		First Draft.
 */
var AllowedURIApp = function () {
	"use strict";
	
	/************************************************
	 *전역 객체 선언부 (return 상위부분에 선언해야함)
	 ************************************************/
	
	// [El]Allowed URI 그리드
	var $systemAllowedURIGrid = $("#systemAllowedURIGrid");
	
    return {
        init: function () {
        	//URI Grid생성
        	fnListAllowedURI();
        	//URI Event
        	fnAllowedURIEvents();
	    }
    };
    
    //[Fn] 이벤트 
    function fnAllowedURIEvents(){
    	
    	//검색폼 URI 엔터키 이벤트
    	$("#systemAllowedUriCode").enterEvent({
    		callBack:function(value){
    			if(fnModCheck()){
    				var data = {
    						allowUriCode : $("#systemAllowedUriCode").val().trim(),
    						allowUriName : $("#systemAllowedUriName").val().trim()
    				};
    				$systemAllowedURIGrid.search(data);
    			}
			}
    	})
    	
    	//검색폼 URI 엔터키 이벤트
    	$("#systemAllowedUriName").enterEvent({
    		callBack:function(value){
    			if(fnModCheck()){
    				var data = {
    						allowUriCode : $("#systemAllowedUriCode").val().trim(),
    						allowUriName : $("#systemAllowedUriName").val().trim()
    				};
    				$systemAllowedURIGrid.search(data);
    			}
			}
    	})

    	//저장버튼
    	$("#systemAllowedUriSaveRowBtn").click(function(){
    		fnSaveRows();
    	});
    	//행추가버튼
    	$("#systemAllowedUriAddRowBtn").click(function(){
    		$systemAllowedURIGrid.appendRow();
    	});
    	//검색버튼
    	$("#systemAllowedUriSearchBtn").click(function(){
    		fnSearchListProgram();
    	});
    	//행삭제버튼
    	$("#systemAllowedUriDelRowBtn").click(function(){
    		$systemAllowedURIGrid.rowDel();
    	});
    }
    
    
    //[Function 공통]  SELECT박스 값 get/set
    function getSelectBoxElValue(elem, oper, value) {
    	if (oper === "set") {
    		var selectBox = $(elem).find("select:option[value='" + value + "']");
    		if (selectBox.length > 0) {
    			selectBox.prop("selected", true);
    		} 
    	}
    	if (oper === "get") {
    		return $(elem).find("select").val();
    	}
    }
    //[Function 공통]  SELECT박스 Ui 생성
    function createSelectBoxEl(value, editOptions) {
    	if(value == ""){
    		value = "Y";
    	}
    	var div =$("<div/>");
    	var select =$("<select/>");
    	var option1 = $("<option>", {value: "A" , selected: value == "A" }).text("A : 전체");
    	var option2 = $("<option>", {value: "L" , selected: value == "L" }).text("L : 로그인");
    	select.append(option1);   	
    	select.append(option2);   	
    	div.append(select);
    	return div;
    }
    
    
    //[Fn] 검색 조건 매핑
    function fnSearchListProgram(){
    	//그리드 수정 여부 체크
    	if(fnModCheck()){
	    	var data = {
	    			allowUriCode : $("#systemAllowedUriCode").val(),
	    			allowUriName : $("#systemAllowedUriName").val()
			};
    		$systemAllowedURIGrid.search(data);
    	}
    }
    
    //[Fn] 프로그램명 가져오기 자동완성            
    function fnGetProgramNms(data){
    	$.ajax({
    		url : "/ctrl/settings/system/systemAllowedUri/listProgramName",
    		data :data,
    		type : "POST",
    		dataType : "json",
    		cache: false,
    		success : function(result) {
    			$('#systemAllowedUriName').autocomplete({
    				source: result,
    				minLength:0 
    			});
    			$("#systemAllowedUriName").autocomplete("search", "");
    			$("#systemAllowedUriName").val("").focus();
    		}
    	});
    }
    /********************************************************************
     * AllowedURI 그리드 생성
     * Since   : 2016-10-24
     * COMP_ID : CP0006
     * 작성자  : Kim J. H 
     * 수정내역: 
     ********************************************************************/
    function fnListAllowedURI(){
		$systemAllowedURIGrid.paragonGrid({
        	url: '/ctrl/settings/system/alloweduri/listAllowedURI',
			componentId:"CP0006",
			rowEditable:true,
			scroll: 1,
			colNames:['ALLOW_SEQ', 'URI', '명칭', '허용범위', '사용여부', '작성자','작성일'],
            colModel:[
                {editable: true, name:'ALLOW_SEQ',hidden:true},
                {editable: true, name:'ALLOW_URI'},
                {editable: true, name:'ALLOW_DESC'},
                {
                	editable: true, 
		        	align:"center",
		        	name:'ALLOW_GBN',
		        	edittype: "custom",
		        	width:50,
		        	editoptions: {
		        		custom_value: getSelectBoxElValue,
		        		custom_element: createSelectBoxEl
		        	}
		        },
                {
                	editable: true, 
                	name:'USE_YN', 
                	align:"center",
                	width:50,
                	edittype: "custom",
                	editoptions: {
                        custom_value: fnGetRadioElValue,
                        custom_element: fnCreateRadioEl
                    }
                		
        		},
                {name:'IN_USER_ID', align:"center",width:50},
                {name:'IN_DT', align:"center",width:50}
            ],
            caption: "접근허용URI 목록"
            
        });

	}
    //그리드 수정 여부 체크
    function fnModCheck(){
    	//
    	return $systemAllowedURIGrid.paragonGridModConfirm("수정된 내용이 있습니다. 계속 진행하시겠습니까?");
	}
    
    //[Function 공통]  라디오 값 get/set
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
	//[Function 공통]  라디오 Ui 생성
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
    
    //[Fn] 수정된 내용저장
    function fnSaveRows() {
    	
    	//ParamsData Key : GridData Key 
    	var rowData = {
    			modFlag		: "MOD_FLAG",
    			allowSeq	: "ALLOW_SEQ",
    			allowUri	: "ALLOW_URI",
    			allowDesc	: "ALLOW_DESC",
    			allowGbn	: "ALLOW_GBN",
				useYn		: "USE_YN" 
		}
    	var jsonData = $systemAllowedURIGrid.getJsonData("dt_alloweduri",rowData);
    	if(!jsonData){
    		alert("변경된 데이터가 없습니다.");
    		return;
    	}
		$.ajax({
    		url : "/ctrl/settings/system/alloweduri/saveAllowedURI",
    		data :jsonData,
    		type : "POST",
    		dataType : "json",
    		contentType: 'application/json; charset=utf-8',
    		cache: false,
    		success : function(result) {
    			alert("저장되었습니다.");
    			$systemAllowedURIGrid.trigger("reloadGrid");
    		}
    	});
    }
    
}();

$(document).ready(function() {
	AllowedURIApp.init();
});
