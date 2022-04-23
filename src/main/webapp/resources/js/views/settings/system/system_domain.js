/** Copyright (c) 2016 VertexID RND, Inc.
 * 
 * Application Name : 도메인 관리[SystemDomainApp]
 * Program Code     : PC0032
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Kim Jin Ho  		2016. 10. 24.  		First Draft.
 */
var SystemDomainApp = function () {
	"use strict";
	
	/************************************************
	 *전역 객체 선언부 (return 상위부분에 선언해야함)
	 ************************************************/
	
	// [El]프로그램 그리드
	var $domainGrid = $("#systemDomainGrid");
	
	// [Data]local 도메인 콤보박스 데이터 
	var localLangComboJson;
	// [Data]local 도메인 콤보박스 데이터 
	var localDomainTypeComboJson;
	
    return {
        init: function () {
        	
        	//유형 콤보박스 데이터 조회
        	fnListLocalLangJson("SC0013");
        	
        	//도메인 유형 콤보박스 데이터 조회
        	fnListDomainTypeJson("SC0017");
        	
        	//도메인관리 Grid생성
        	fnListDomain();
        	//도메인관리 이벤트
        	fnDomainEvents();
	    }
    };
    
    
    //[Fn] 이벤트 
    function fnDomainEvents(){
    	
    	//검색폼 프로그램코드 엔터키 이벤트
    	$("#systemDomainId, #systemDomainNm").enterEvent({
    		callBack:function(value){
    			var data = {
    					domainType : $("#systemDomainType").val(),
    					langCd : $("#systemDomainLangCd").val(),
    	    			domainId : $("#systemDomainId").val(),
    					domainNm : $("#systemDomainNm").val()
				};
    			$domainGrid.paragonGridSearch(data);
    		}
    	})
    	
    	//저장버튼
    	$("#domainSaveRowBtn").click(function(){
    		fnSaveDomainRows();
    	});
    	//행추가버튼
    	$("#domainAddRowBtn").click(function(){
    		$domainGrid.appendRow();
    	});
    	//검색버튼
    	$("#domainSearchBtn").click(function(){
    		fnSearchListProgram();
    	});
    	//행삭제버튼
    	$("#domainDelRowBtn").click(function(){
    		$domainGrid.rowDel();
    	});
    }
    
    //[Fn] 검색 조건 매핑
    function fnSearchListProgram(){
    	//그리드 수정 여부 체크
    	if(fnModCheck()){
	    	var data = {
	    			domainType : $("#systemDomainType").val(),
	    			langCd : $("#systemDomainLangCd").val(),
	    			domainId : $("#systemDomainId").val(),
					domainNm : $("#systemDomainNm").val()
			};
    		$domainGrid.paragonGridSearch(data);
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
    			$('#domainName').autocomplete({
    				source: result,
    				minLength:0 
    			});
    			//드릴다운 부분을 닫기 위함
    			$("#domainName").autocomplete("search", "");
    			$("#domainName").val("").focus();
    		}
    	});
    }
    /********************************************************************
     * 도메인관리 그리드 생성
     * Since   : 2016-10-24
     * COMP_ID : CP0009
     * 작성자  : Kim Jin Ho
     * 수정내역: 
     ********************************************************************/
    //[Fn] grid 도메인관리 목록 
    function fnListDomain(){
		$domainGrid.paragonGrid({
        	url: '/ctrl/settings/system/domain/listDomain',
			sortable: true,
			componentId: "CP0009",
			rowEditable : true,
//			loadonce : true,
            colModel:[
                      
                {name:'DOMAIN_SEQ', align:"center",hidden:true},
                {editable: true,name:'DOMAIN_ID', align:"center",width:120},
                {editable: true,name:'DOMAIN_NM', align:"center"},
                {editable: true,name:'DOMAIN_SIMP_NM', align:"center"},
                {
                	editable: true, 
		        	align:"center",
		        	name:'DOMAIN_TYPE',
		        	width:80,
		        	edittype: "custom",
		        	editoptions: {
		        		custom_value: inGetSelectBoxElValue,
		        		custom_element: inCreateTypeSelectBoxElement
		        	}
		        },
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
                {editable: true,name:'DOMAIN_DESC',width:700},
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
            pager: "#systemDomainGridNavi",
            caption: "도메인관리 목록",
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
	    	console.log("elem: "  + JSON.stringify(elem)+ "oper : "+  oper, "value:  "  + value);
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
//	    //[In] 도메인 유형 SELECT박스 값 get/set
//	    function inGetTypeSelectBoxElValue(elem, oper, value) {
//	    	if (oper === "set") {
//	    		var selectBox = $(elem).find("select:option[value='" + value + "']");
//	    		if (selectBox.length > 0) {
//	    			selectBox.prop("selected", true);
//	    		} 
//	    	}
//	    	if (oper === "get") {
//	    		return $(elem).find("select").val();
//	    	}
//	    }
	    //[In]  도메인 유형 SELECT박스 Ui 생성
	    function inCreateTypeSelectBoxElement(value, editOptions) {
	    	if(value == ""){
	    		value = "Y";
	    	}
	    	var div =$("<div/>");
	    	var select =$("<select/>");
	    	for (var i = 0; i < localDomainTypeComboJson.length; i++) {
	    		var thisValue = localDomainTypeComboJson[i].value;
	    		var thisName = localDomainTypeComboJson[i].name;
	    		var option = $("<option>", {value: thisValue , selected: value == thisValue });
	    		option.text(thisName)
	    		select.append(option);   	
	    	}
	    	div.append(select);
	    	return div;
	    }
	}
    
    //[Fn]  콤보박스 JSON 조회 
    function fnListLocalLangJson(groupId){
    	$.ajax({
    		url : "/ctrl/settings/system/code/listCodeGroupComboJson",
    		data :{codeGroupCd:groupId},
    		type : "POST",
    		dataType : "json",
    		cache: false,
    		success : function(result) {
    			console.log(result);
    			localLangComboJson = result;
    			//paragon-util.js 콤보박스 옴션 생성
    			Util.MakeSelectOptions($("#systemDomainLangCd"),result);
    		}
    	});
    }
    //[Fn]  콤보박스 도메인 유형 JSON 조회 
    function fnListDomainTypeJson(groupId){
    	$.ajax({
    		url : "/ctrl/settings/system/code/listCodeGroupComboJson",
    		data :{codeGroupCd:groupId},
    		type : "POST",
    		dataType : "json",
    		cache: false,
    		success : function(result) {
    			console.log(result);
    			localDomainTypeComboJson = result;
    			//paragon-util.js 콤보박스 옴션 생성
    			Util.MakeSelectOptions($("#systemDomainType"),result);
    		}
    	});
    }
    
    
    //그리드 수정 여부 체크
    function fnModCheck(){
    	return $domainGrid.paragonGridModConfirm("수정된 내용이 있습니다. 계속 진행하시겠습니까?");
	}
    //[Fn] 수정된 내용저장
    function fnSaveDomainRows() {
    	
    	
    	
    	
    	//ParamsData Key : GridData Key application
    	var formatData = {
    			modFlag:"MOD_FLAG" ,
    			domainSeq:"DOMAIN_SEQ" ,
    			domainId:"DOMAIN_ID" ,
    			domainNm:"DOMAIN_NM" ,
    			langCd:"LANG_CD" ,
    			domainSimpNm:"DOMAIN_SIMP_NM" ,
    			domainDesc:"DOMAIN_DESC" ,
    			domainType:"DOMAIN_TYPE" ,
				useYn:"USE_YN" 
		}
    	
    	// $systemAuthGrid.getJsonData("dt_menuauth",formatData); (return json)
		// grid에서 formatData에 정의된 데이터를 'dt_domain' 키값으로 parsing
    	var jsonData = $domainGrid.getJsonData("dt_domain",formatData);
    	if(!jsonData){
    		alert("변경된 데이터가 없습니다.");
    		return;
    	}
		$.ajax({
    		url : "/ctrl/settings/system/domain/saveDomain",
    		data :jsonData,
    		contentType: 'application/json; charset=utf-8',
    		cache: false,
    		success : function(result) {
    			alert(result.msgTxt);
    			$domainGrid.trigger("reloadGrid");
    		}
    	});
    		
    }
    
}();

$(document).ready(function() {
	SystemDomainApp.init();
});
