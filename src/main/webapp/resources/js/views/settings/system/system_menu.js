/** Copyright (c) 2016 VertexID RND, Inc.
 * 
 * Application Name : 메뉴 관리[SystemMenuApp]
 * Program Code     : PC0007
 * Description      :
 * Revision History
 * Menuor          	Date           		Description
 * ------------		-------------		------------------
 * Kim Jin Ho  		2016. 10. 24.  		First Draft.
 */
var SystemMenuApp = function () {
	"use strict";
	
	/************************************************
	 *전역 객체 선언부 (return 상위부분에 선언해야함)
	 ************************************************/
	 
	// [El]메뉴 트리 그리드
	var $systemMenuGrid = $("#systemMenuGrid");
	
    return {
        init: function () {
        	
        	fnListMenu();
        	//메뉴 Event
        	fnMenuEvents();
	    },
	    initPopup: function () {
	    	//메뉴 등록수정 POPUP창 Event
	    	fnNewPopupEvent();
	    }
    };
    
    //[Fn] 이벤트 
    function fnMenuEvents(){
    	
    	
    	//메뉴등록 Popup
    	$("#systemMenuAddBtn").click(function(){
    		
    		
    		var pop = PopApp.paragonOpenPopup({
	    		ajaxUrl: '/ctrl/settings/system/menu/newPopup',
	    		id: 'menuNewPopUp',
	    		width: '700px',	    		
	    		btnName:"저장",
	    		visible: true, //기본값 false :바로 활성화  TODO 사용설명서 명시해야함
	    		title :"메뉴 등록",
	    		onload:function(){
	    			//POPUP창 이벤트 실행
	    			SystemMenuApp.initPopup();
	    			var rowid= $systemMenuGrid.jqGrid('getGridParam','selrow');
	        		var selectBox = $("#popMenuParentSeq");
	    			if(rowid != null){
	    				var lastRowData = $systemMenuGrid.getRowData( rowid );
	    				var menuSeq = lastRowData.MENU_SEQ;
	    				var menuNm = lastRowData.MENU_NM;
	    				var option = $("<option>", {value: menuSeq , selected: true });
	    				option.text(menuNm)
	    				selectBox.append(option);
	    				
	    			}
	    		}
    		});
    	});
    	
    	//저장버튼
    	$("#systemMenuSaveRowBtn").click(function(){
    		fnMenuSave();
    	});
    	//행삭제버튼
    	$("#systemMenuDelRowBtn").click(function(){
    		$systemMenuGrid.rowDel();
    	});
    }
    
    
    /********************************************************************
     * 메뉴관리 그리드 생성
     * Since   : 2016-10-24
     * COMP_ID : CP0010
     * 작성자  : Kim J. H 
     * 수정내역: 
     ********************************************************************/
    function fnListMenu(){
		$systemMenuGrid.paragonGrid({
        	url: '/ctrl/settings/system/menu/listMenu',
			countable:false,
			componentId:"CP0010",
			pageable:false,
			sortable:false,
			rowEditable : true,
			colModel:[
			    {name:'MENU_SEQ',hidden:true,key:true},
			    {name:"MENU_PARENT_SEQ",hidden:true},
			    {editable: true, name:'MENU_NM',width:100},
			    {editable: true, align:"center",name:'PRO_CD',width:50},
			    {align:"center",name:'PRO_NM',width:100},
			    {name:'CALL_URL',width:150},
			    {editable: true, align:"center",name:'MENU_ORDER',width:50},
			    {
			    	editable: true, 
			    	name:'MENU_ICO',
			    	width:80,
			    	edittype: "custom",
			    	formatter : inMakeMenuIcon,
			    	editoptions: {
			    		custom_value: inGetIconElValue,
			    		custom_element: inCreateIconEl
			    	}
			    },
				{
			    	editable: true, 
			    	name:'USE_YN', 
			    	align:"center",
			    	edittype: "custom",
			    	width:50,
			    	editoptions: {
			    		custom_value: inGetRadioElValue,
			    		custom_element: inCreateRadioEl
			    	}
		        },
		        {name:'IN_USER_ID', align:"center",width:70},
		        {name:'IN_DT', align:"center",width:70,sortable:false}
            ],
            height:"620",			//TODO [테트트 필요함] 그리드 사이즈 조정 불가
            caption: "메뉴 목록",
			treeGrid:true,
			ExpandColumn:"MENU_NM",
			treedatatype:"json",
			treeGridModel:"adjacency",
			treeReader:{
				parent_id_field:"MENU_PARENT_SEQ",
				level_field:"LEVEL",
				leaf_field:"ISLEAF",
				expanded_field:"expanded",
				loaded:"loaded"
			},
        });
		
		//[In]  Icon UI 생성
		function inMakeMenuIcon(value, options, rowObject) {
			value = (value === null) ? "" :value ;
        	var div =$("<div/>");
			var iconEl = $("<i/>");
			var iconTxt = $("<label/>");
			iconEl.addClass("fa "+value);
			iconTxt.text(value);
			iconTxt.addClass("ico-label");
			iconTxt.css("text-indent",10);
			div.append(iconEl).append(iconTxt);
			
            return div.html();
		}
		//[In]  Icon 값 get
		function inGetIconElValue(elem, oper, value) {
			if (oper === "get") {
				return $(elem).val();
			}
		}
		//[In]  Icon input 박스 생성
		function inCreateIconEl(elem, editOptions) {
			var div =$("<div/>");
			div.html(elem);
			var value = div.find(".ico-label").text();
			return $("<input>", {value:value });
		}
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
	}
    
    //[Fn] POPUP Event
    function fnNewPopupEvent(){
    	
    	$("#popMenuIcon").focusout(function(){
    		var ico = $("<i/>")
    		ico.addClass("fa "+$(this).val());
    		$("#popMenuIconLabel").html(ico);
    		$("#popMenuIconLabel").append(" 아이콘");
    		
    	});
    	$("#popMenuOrder").onlyNumber();
    	
    	//메뉴저장버튼
    	$("#menuPopupSaveBtn").click(function(){
    		fnNewPopUpMenu();
	    });
    }
    
   
    
    //[Fn] POPUP 저장(등록)
    function fnNewPopUpMenu() {
    	var menuParentSeq= $("#popMenuParentSeq").val();
    	var menuNm   	 = $("#popMenuNm").val()		;
    	var proCd 	 	 = $("#popMenuProCd").val()	;
    	var callUrl  	 = $("#popMenuCallUrl").val()	;
    	var menuOrder  	 = $("#popMenuOrder").val()	;
    	var menuIco  	 = $("#popMenuIcon").val()	;
    	var useYn  	 = $("input[name='popMenuUseYn']:checked").val()	;
    	
    	if($.trim(menuNm).length == 0){
    		alert("메뉴명을 입력해주세요.");
    		$("#popMenuNm").focus();
    		return;
    	}else if($.trim(menuOrder).length == 0){
    		alert("순번을 입력해주세요.");
    		$("#popMenuOrder").focus();
    		return;
    	}
    	
    	var sendData = {
    			"menuParentSeq"	: menuParentSeq ,
    			"menuNm"		: menuNm 	,
    			"proCd"			: proCd 	,
    			"callUrl"		: callUrl 	,
    			"menuOrder"		: menuOrder ,
    			"menuIco"		: menuIco 	,
    			"useYn"			: useYn 	
    	};
		$.ajax({
			url : "/ctrl/settings/system/menu/newMenu",
    		data : sendData,
    		success : function(result) {
    			$("#menuNewPopUp").paragonClosePopup();
    			$("#leftMenu").resetLeftMenu();
    			alert(result.msgTxt);
    			$systemMenuGrid.paragonGridReload();
    			
    		}
    	});
    }
   
    
    //[Fn] 메뉴 내용저장
    function fnMenuSave(){
    	
    	//ParamsData Key : GridData Key 
    	var parseCamelData = { 
    			modFlag		 : "MOD_FLAG" 	,
    			menuSeq		 : "MENU_SEQ" 	,
    			menuParentSeq: "MENU_PARENT_SEQ",
    			menuNm		 : "MENU_NM" 	,
    			proCd		 : "PRO_CD" 	,
    			callUrl		 : "CALL_URL" 	,
    			menuOrder	 : "MENU_ORDER" ,
    			menuIco	 	 : {gridKey:"MENU_ICO",gridClass:"ico-label"} 	,
    			useYn		 : "USE_YN" 	
		}
    	// 그리드에서 저장이 필요한 데이터만 가져옴
    	var jsonData = $systemMenuGrid.getJsonData("dt_menu",parseCamelData);
    	if(!jsonData){
    		alert("변경된 데이터가 없습니다.");
    		return;
    	}
    	$.ajax({
    		url : "/ctrl/settings/system/menu/saveMenu",
    		data :jsonData,
    		contentType: 'application/json; charset=utf-8',
    		success : function(result) {
    			alert(result.msgTxt);
    			$("#leftMenu").resetLeftMenu();
    			$systemMenuGrid.paragonGridReload();
    		}
    	});
    }
    
}();

$(document).ready(function() {
	SystemMenuApp.init();
});
