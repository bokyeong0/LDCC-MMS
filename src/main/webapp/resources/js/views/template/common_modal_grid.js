/** Copyright (c) 2016 VertexID RND, Inc.
 * 
 * Application Name : 프로그램 관리[CommonModalApp]
 * Program Code     : PC0001
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Kim Jin Ho  		2016. 10. 24.  		First Draft.
 */
var CommonModalApp = function () {
	"use strict";
	
	/************************************************
	 *전역 객체 선언부 (return 상위부분에 선언해야함)
	 ************************************************/
	
	// [El]프로그램 그리드
	var $commonModalGrid = $("#commonModalGrid");
	
    return {
        init: function () {
        	//프로그램관리 Grid생성
        	fnListProgram();
        	//프로그램관리 Event
        	fnProgramEvents();
	    }
    };
    
    
    //[Fn] 이벤트 
    function fnProgramEvents(){
    	
    	//검색폼 프로그램코드 엔터키 이벤트
    	$("#programCode").enterEvent({
    		callBack:function(value){
    			fnGetProgramNms({"proCd":value});
    		}
    	})
    	//검색폼 프로그램명 엔터키 이벤트
    	$("#programName").enterEvent({
    		callBack:function(value){
    			//그리드 수정 여부 체크
    			if(fnModCheck()){
    				var data = {
    						proCd : "",
    						proNm : $("#programName").val()
    				};
    				$commonModalGrid.paragonGridSearch(data);
    				$("#programName").autocomplete( "close" );
    			}
			}
    	})
    	
    	//저장버튼
    	$("#programSaveRowBtn").click(function(){
    		saveRows();
    	});
    	//행추가버튼
    	$("#programAddRowBtn").click(function(){
    		fnAddRowProgram();
    	});
    	//검색버튼
    	$("#programSearchBtn").click(function(){
    		fnSearchListProgram();
    	});
    	//행삭제버튼
    	$("#programDelRowBtn").click(function(){
    		$commonModalGrid.paragonGridSelectDelete();
    	});
    }
    
    //[Fn] 검색 조건 매핑
    function fnSearchListProgram(){
    	//그리드 수정 여부 체크
    	if(fnModCheck()){
	    	var data = {
					PRO_CD : $("#programCode").val(),
					PRO_NM : $("#programName").val()
			};
    		$commonModalGrid.paragonGridSearch(data);
    	}
    }
    
    
    
    //[Fn] 프로그램명 가져오기 자동완성            
    function fnGetProgramNms(data){
    	$.ajax({
    		url : "/ctrl/settings/system/program/listProgramName",
    		data :data,
    		type : "POST",
    		dataType : "json",
    		cache: false,
    		success : function(result) {
    			$('#programName').autocomplete({
    				source: result,
    				minLength:0 
    			});
    			$("#programName").autocomplete("search", "");
    			$("#programName").val("").focus();
    		}
    	});
    }
    /********************************************************************
     * 프로그램관리 그리드 생성
     * Since   : 2016-10-24
     * COMP_ID : CP0004
     * 작성자  : Kim Jin Ho
     * 수정내역: 
     ********************************************************************/
    //[Fn] jqgrid 프로그램관리 목록 
    function fnListProgram(){
    	console.log()
    	var idddd = $("#exampleInputAC").val();
		$commonModalGrid.paragonGrid({
        	url: '/ctrl/settings/system/program/listProgram',
        	rowEditable:true,
			sortable: true,
			componentId: "CP0004",
			postData:{ASD:idddd},
            colModel:[
                {editable: true, name:'PRO_CD', align:"center", disabled:true},
                {editable: true, name:'PRO_NM', align:"center"},
                {editable: true, name:'PRO_DESC'},
                {editable: true, name:'CALL_URL'},
                {editable: true,name:'JS_PATH',align:"center"},
                {
                	editable: true, 
                	name:'USE_YN', 
                	align:"center",
                	edittype: "custom",
                	editoptions: {
                        custom_value: getRadioElValue,
                        custom_element: createRadioEl
                    }
        		},
                {name:'IN_USER_ID', align:"center"},
                {name:'IN_DT', align:"center",sortable:false}
            ],
            pager: "#systemProgramGridNavi",
            caption: "프로그램 목록",
            ondblClickRow:function(id, iRow, iCol, e){
            	console.log(id, iRow, iCol, e);
            	var proCd = $commonModalGrid.getRowData( iRow ).PRO_CD;
            	if(App.getCallBackEl()){
            		App.getCallBackEl().val(proCd);
            	}
            	App.callBackCasting($commonModalGrid.getRowData( iRow ));
            	
            	$("#modalGrid").paragonClosePopup();
            }
            
        });
		
		
	}
    //그리드 수정 여부 체크
    function fnModCheck(){
    	return $commonModalGrid.paragonGridModConfirm("수정된 내용이 있습니다. 계속 진행하시겠습니까?");
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
    function fnAddRowProgram() {
    	$commonModalGrid.paragonGridAddRow();
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
    	var jsonData = $commonModalGrid.getJsonData("dt_program",rowData);
    	
    	if(!jsonData){
    		alert("변경된 데이터가 없습니다.");
    		return;
    	}
		$.ajax({
    		url : "/ctrl/settings/system/program/saveProgram",
    		data :jsonData,
    		type : "POST",
    		dataType : "json",
    		contentType: 'application/json; charset=utf-8',
    		cache: false,
    		success : function(result) {
    			alert(result.msgTxt);
    			$commonModalGrid.trigger("reloadGrid");
    		}
    	});
    		
    }
    
}();

$(document).ready(function() {
	CommonModalApp.init();
});
