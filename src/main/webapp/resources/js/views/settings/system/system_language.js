/** Copyright (c) 2016 VertexID RND, Inc.
 * 
 * Application Name : 언어 관리[SystemLanguageApp]
 * Program Code     : PC0029
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Kim Jin Ho  		2016. 10. 24.  		First Draft.
 */
var SystemLanguageApp = function () {
	"use strict";
	
	/************************************************
	 *전역 객체 선언부 (return 상위부분에 선언해야함)
	 ************************************************/
	
	// [El]프로그램 그리드
	var $languageGrid = $("#systemLanguageGrid");
	
	// [Data]local 언어 콤보박스 데이터
	var localLangComboJson;
	
    return {
        init: function () {
        	
        	//그룹코드 유형 콤보박스 데이터 조회
        	fnListLocalLangJson("SC0013");
        	
        	//언어관리 Grid생성
        	fnListLanguage();
        	//언어관리 이벤트
        	fnLanguageEvents();
	    }
    };
    
    
    //[Fn] 이벤트 
    function fnLanguageEvents(){
    	
    	//검색폼 프로그램코드 엔터키 이벤트
    	$("#langProgramCode, #langCompId, #langCompNm").enterEvent({
    		callBack:function(value){
    			var data = {
						proCd : $("#langProgramCode").val(),
						compId : $("#langCompId").val(), 
						compNm : $("#langCompNm").val()
				};
    			$languageGrid.paragonGridSearch(data);
    		}
    	})
    	
    	//저장버튼
    	$("#languageSaveRowBtn").click(function(){
    		fnSaveLanguageRows();
    	});
    	//행추가버튼
    	$("#languageAddRowBtn").click(function(){
    		$languageGrid.appendRow();
    	});
    	//검색버튼
    	$("#languageSearchBtn").click(function(){
    		fnSearchListProgram();
    	});
    	//행삭제버튼
    	$("#languageDelRowBtn").click(function(){
    		$languageGrid.rowDel();
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
    		$languageGrid.paragonGridSearch(data);
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
    			//드롭다운 부분을 닫기 위함
    			$("#programName").autocomplete("search", "");
    			$("#programName").val("").focus();
    		}
    	});
    }
    /********************************************************************
     * 언어관리 그리드 생성
     * Since   : 2016-10-24
     * COMP_ID : CP0009
     * 작성자  : Kim Jin Ho
     * 수정내역: 
     ********************************************************************/
    //[Fn] grid 언어관리 목록 
    function fnListLanguage(){
		$languageGrid.paragonGrid({
        	url: '/ctrl/settings/system/language/listLanguage',
			sortable: true,
			componentId: "CP0009",
			rowEditable : true,
            colModel:[
                {name:'LANG_SEQ', align:"center",hidden:true},
                {name:'PRO_CD', align:"center",width:80, rowspan:true},
                {name:'PRO_NM', align:"center",width:80, rowspan:true},
                {name:'COMP_NM', align:"center"},
                {editable: true,name:'COMP_ID', align:"center",width:80},
                {
                	editable: true, 
		        	align:"center",
		        	name:'LANG_CD',
		        	width:80,
		        	edittype: "custom",
		        	editoptions: {
		        		custom_value: inGetSelectBoxElValue,
		        		custom_element: inCreateSelectBoxElement
		        	}
		        },
                {editable: true,name:'LANG_VALUE',width:700},
                {
			    	editable: true, 
			    	name:'USE_YN', 
			    	align:"center",
			    	edittype: "custom",
			    	width:80,
			    	editoptions: {
			    		custom_value: inGetRadioElValue,
			    		custom_element: inCreateRadioEl
			    	}
		        },
                {name:'IN_USER_ID', align:"center",width:50},
                {name:'IN_DT', align:"center",width:70,sortable:false}
            ],
            pager: "#systemLanguageGridNavi",
            caption: "언어관리 목록",
            rowspan: true,
        });
		//[In]  라디오 값 get/set
	    function inGetRadioElValue(elem, oper, value) {
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
		//[In]  라디오 Ui 생성
	    function inCreateRadioEl(value, editOptions) {
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
	    //[In]  SELECT박스 값 get/set
	    function inGetSelectBoxElValue(elem, oper, value) {
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
	    //[In]  SELECT박스 Ui 생성
	    function inCreateSelectBoxElement(value, editOptions) {
	    	if(value == ""){
	    		value = "Y";
	    	}
	    	var div =$("<div/>");
	    	var select =$("<select/>");
	    	for (var i = 0; i < localLangComboJson.length; i++) {
	    		var thisValue = localLangComboJson[i].value;
	    		var thisName = localLangComboJson[i].name;
	    		var option = $("<option>", {value: thisValue , selected: value == thisValue });
	    		option.text(thisName)
	    		select.append(option);   	
			}
	    	div.append(select);
	    	return div;
	    }
	}
    
    //[Fn] 그룹코드 콤보박스 JSON 조회 
    function fnListLocalLangJson(groupId){
    	$.ajax({
    		url : "/ctrl/settings/system/code/listCodeGroupComboJson",
    		data :{codeGroupCd:groupId},
    		type : "POST",
    		dataType : "json",
    		cache: false,
    		success : function(result) {
    			localLangComboJson = result;
    		}
    	});
    }
    
    //그리드 수정 여부 체크
    function fnModCheck(){
    	return $languageGrid.paragonGridModConfirm("수정된 내용이 있습니다. 계속 진행하시겠습니까?");
	}
    //[Fn] 수정된 내용저장
    function fnSaveLanguageRows() {
    	
    	//ParamsData Key : GridData Key application
    	var formatData = {
    			modFlag:"MOD_FLAG" ,
    			langSeq:"LANG_SEQ" ,
    			compId:"COMP_ID" ,
    			langCd:"LANG_CD" ,
    			langValue:"LANG_VALUE" ,
				useYn:"USE_YN" 
		}
    	
    	// $systemAuthGrid.getJsonData("dt_menuauth",formatData); (return json)
		// grid에서 formatData에 정의된 데이터를 'dt_language' 키값으로 parsing
    	var jsonData = $languageGrid.getJsonData("dt_language",formatData);
    	
    	if(!jsonData){
    		alert("변경된 데이터가 없습니다.");
    		return;
    	}
		$.ajax({
    		url : "/ctrl/settings/system/language/saveLanguage",
    		data :jsonData,
    		contentType: 'application/json; charset=utf-8',
    		cache: false,
    		success : function(result) {
    			alert(result.msgTxt);
    			$languageGrid.trigger("reloadGrid");
    		}
    	});
    		
    }
    
}();

$(document).ready(function() {
	SystemLanguageApp.init();
});
