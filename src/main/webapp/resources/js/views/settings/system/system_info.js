
var SystemInfoApp = function () {
	"use strict";
	
	/*******************************
	 ****전역 객체 선언부 시작******
	 ******************************/
	
	// [El]프로그램 그리드
	var $programGrid = $("#systemInfoGrid");
	
	
	/*******************************
	 ****전역 객체 선언부 종료******
	 ******************************/
	
    return {
        init: function () {
//        	fnListProgram();
        	fnEvents();
	    }
    };
    
    var lastSelection;
    //[function] 이벤트 
    function fnEvents(){
    	
    	
    	$('#customValue_rangeSlider').ionRangeSlider({
    		from: 9,
            values: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15', '무제한'],
            hasGrid: false,
            type: 'single'
        });
    	
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
    						PRO_CD : "",
    						PRO_NM : $("#programName").val()
    				};
    				$programGrid.paragonGridSearch(data);
    				$("#programName").autocomplete( "close" );
    			}
			}
    	})
    	
    	// 수정모드 토글
    	$("#programModGridBtn").click(function(){
    		if($(this).data("btn-mod")=="nomal"){
    			$(this).data("btn-mod","mod");
    			$(this).html('<i class="fa fa-edit "></i> 수정 취소');
    			startEdit();
    		}else{
    			$(this).data("btn-mod","nomal");
    			$(this).html('<i class="fa fa-edit "></i> 수정');
    			restoreRow();
    		}
    	});
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
    		fnDeleteRowProgram();
    	});
    	//배포버튼
    	$("#locDeployBtn").click(function(){
    		replaceADSSss("http://jenkins.vertexid.com/j_acegi_security_check?j_username=admin&j_password=1234");
    		locDeploy();
    	});
    	$("#devDeployBtn").click(function(){
    		devDeploy();
    	});
    	$("#relDeployBtn").click(function(){
    		relDeploy();
    	});
    }
    
    function locDeploy(){
    	$.ajax({
			url : "http://jenkins.vertexid.com/job/mms-loc-deploy/build?token=MMSLocalDeploy",
			cache : false,
			dataType : 'jsonp',
			complete : function(result){
				if(result.status == 200){
					alert("로컬 배포가 실행되었습니다.");
				}else{
					alert("배포가 실패했습니다.\njenkins서버를 확인해주세요.");
				}
			}
		});
//    	location.href="http://jenkins.vertexid.com/j_acegi_security_check?j_username=admin&j_password=1234&targer=_blank"
//    	var div = $("<div id='jenkins' />");
//    	div.hide();
//    	$("body").append(div);
//    	$("#jenkins").load("http://jenkins.vertexid.com/j_acegi_security_check?j_username=admin&j_password=1234",function(){
//    		$.ajax({
//    			url : "http://jenkins.vertexid.com/job/mms-loc-deploy/build?token=MMSLocalDeploy",
//    			cache : false,
//    			dataType : 'jsonp',
//    			complete : function(result){
//    				if(result.status == 200){
//    					alert("로컬 배포가 실행되었습니다.");
//    				}else{
//    					alert("배포가 실패했습니다.\njenkins서버를 확인해주세요.");
//    				}
//    			}
//    		});
//    	});
//    	var jekins = window.open('http://jenkins.vertexid.com/j_acegi_security_check?j_username=admin&j_password=1234','_blank');
    }
    
    function replaceADSSss(URL)  //이 부분에서 URL 경로를 innerHTML에 넣어준다.
    {
     document.getElementById("jenkinsDiv").innerHTML = getHttprequest(URL); 
    }

   function getHttprequest(URL) {
      // 기본적인 변수 선언
      var xmlhttp = null;
      // FF일 경우 window.XMLHttpRequest 객체가 존재한다.
      if(window.XMLHttpRequest) {
       // FF 로 객체선언
       xmlhttp = new XMLHttpRequest();
      } else {
       // IE 경우 객체선언
       xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }
    
      // GET 모드로 URL 주소의 값을 가져온다
      // 주의 해야 할점은 무조건 UTF 로 값이 들어옴
      xmlhttp.open('GET', URL,false);
    
      // 값을 가져 왔을경우 호출할 메소드를 바로 선언
      xmlhttp.onreadystatechange = function() {
    
       // readyState 가 4 고 status 가 200 일 경우 올바르게 가져옴
       if(xmlhttp.readyState==4 && xmlhttp.status == 200 && xmlhttp.statusText=='OK') {
        // responseText 에 값을 저장
        responseText = xmlhttp.responseText;
       }
      }
      xmlhttp.send('');
    
      // 가져온 xmlhttp 객체의 responseText 값을 반환
      return responseText = xmlhttp.responseText;
     }


    
    function devDeploy(){
    	$.ajax({
    		url : "http://jenkins.vertexid.com/job/mms-dev-deploy/build?token=MMSDevDeploy",
    		cache : false,
    		dataType : 'jsonp',
    		complete : function(result){
    			if(result.status == 200){
    				alert("개발 배포가 실행되었습니다.");
    			}else{
    				alert("배포가 실패했습니다.\njenkins서버를 확인해주세요.");
    			}
    		}
    	});
    }
    function relDeploy(){
    	$.ajax({
    		url : "http://jenkins.vertexid.com/job/mms-rel-deploy/build?token=MMSRelDeploy",
    		cache : false,
    		dataType : 'jsonp',
    		complete : function(result){
    			if(result.status == 200){
    				alert("운영 배포가 실행되었습니다.");
    			}else{
    				alert("배포가 실패했습니다.\njenkins서버를 확인해주세요.");
    			}
    		}
    	});
    }
    
    
    //[function] 검색 조건 매핑
    function fnSearchListProgram(){
    	//그리드 수정 여부 체크
    	if(fnModCheck()){
	    	var data = {
					PRO_CD : $("#programCode").val(),
					PRO_NM : $("#programName").val()
			};
    		$programGrid.paragonGridSearch(data);
    	}
    }
    
    //[function] 선택 행삭제
    function fnDeleteRowProgram(){
    	
    	var grid = $programGrid;
    	var rowid= grid.jqGrid('getGridParam','selrow');
    	var rowData = grid.getRowData(rowid);
    	if(rowData.MOD_FLAG == "INSERT"){
    		grid.jqGrid('delRowData',rowid);
    	}else{
			grid.jqGrid('setCell',rowid,'MOD_FLAG','DELETE');
			grid.jqGrid('setCell',rowid,'MOD_CHECK','<i class="fa fa-check text-danger" />');
    	}
    }
    
    
    //[function] 프로그램명 가져오기 자동완성            
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
//    				,select: function(result,ui){
//	    				$('#programCode').val(ui.item.pcd);
//	    				$('#programName').val(ui.item.name);
//    					fnSearchListProgram();
//    				}
    			});
    			$("#programName").autocomplete("search", "");
    			$("#programName").val("").focus();
    		}
    	});
    }
    //[function] jqgrid 프로그램 목록 
    function fnListProgram(){
		$programGrid.paragonGrid({
        	url: '/ctrl/settings/system/program/listProgram',
        	rowNum: 5,
        	height: 180,
			colNames:['','','','','프로그램명', '설명', 'URL','js Path','사용여부','작성자','등록일자'],
            colModel:[
                {name:'MOD_VAL',align:"center",width:20,hidden:true},
                {name:'MOD_FLAG',align:"center",width:20,hidden:true},
                {name:'MOD_CHECK',align:"center",width:20},
                {editable: true, name:'PRO_CD', align:"center"},
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
//            pager: "#systemProgramGridNavi",
            caption: "프로그램 목록",
            onSelectRow: editSelectRow,
      		ondblClickRow: editClickRow
            
        });
		

		// 수정된 내용 저장및 수정 사항 체크
		function editSelectRow(id) {
			var grid = $programGrid;
			grid.jqGrid('saveRow',lastSelection);
			var model = grid.jqGrid ('getGridParam', 'colModel');
			
			if(lastSelection){
        		var lastRowData = grid.getRowData( lastSelection );
        		
        		var lastOriVal = lastRowData.MOD_VAL;
        		var lastModCheck = lastRowData.MOD_CHECK;
        		var lastModFalg = lastRowData.MOD_FLAG;
        		var lastVal = "";
        		
        		var lastVal = "";
    			for (var i = 0; i < model.length; i++) {
    				if(model[i].editable){
    					lastVal +=(lastRowData[model[i].name]+"|");
    				}
    			}
        		if(lastOriVal != lastVal){
        			if(lastModFalg != "INSERT"){
	        			grid.jqGrid('setCell',lastSelection,'MOD_CHECK','<i class="fa fa-check" />');
	        			if(lastModCheck == "" ||lastModFalg == "DELETE"){
	        				grid.jqGrid('setCell',lastSelection,'MOD_FLAG','UPDATE');
	        			}
        			}
        		}else{
        			if(lastModFalg != "INSERT"){
        				grid.jqGrid('setCell',lastSelection,'MOD_CHECK',null);
        				grid.jqGrid('setCell',lastSelection,'MOD_FLAG',null);
        			}
        		}
        		lastSelection ="";
            }
		}
		
		// 로우 더블클릭 수정모드
        function editClickRow(id, iRow, iCol, e) {
            var grid = $programGrid;
            
            var rowData = grid.getRowData( id );
            if(rowData.MOD_VAL == ""){
            	var model = grid.jqGrid ('getGridParam', 'colModel');
            	
            	var thissVal = "";
            	for (var i = 0; i < model.length; i++) {
    				if(model[i].editable){
    					thissVal +=(rowData[model[i].name]+"|");
    				}
    			}
            	grid.jqGrid('setCell',id,'MOD_VAL',thissVal);
            }
            grid.jqGrid('editRow',id, {focusField: iCol});
            if(rowData.MOD_FLAG != "INSERT"){
            	$("#"+id+"_PRO_CD").prop("disabled",true);
            	$("#"+id+"_PRO_CD").css("background","#f0f0f0");
            }
            lastSelection = id;
        }
	}
    //그리드 수정 여부 체크
    function fnModCheck(){
		var data = $programGrid.getRowData();
		for (var i = 0; i < data.length; i++) {
			if(data[i].MOD_FLAG != "" ){
				if(!confirm("수정된 내용이 있습니다. 계속 진행하시겠습니까?")){
					return false;
				}else{
					break;
					return true;
				}
			}
		}
		return true;
	}
    
    // 유효성 검사
    function checkingEdit(value, column){
    	alert(value +" "+ column);
    }
    // [function] 라디오 값 get/set
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
	//[function] 라디오 Ui 생성
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
    
	//[function] grid 수정모드
    function startEdit() {
    	var grid = $programGrid;
    	var ids = grid.jqGrid('getDataIDs');
    	for (var i = 1; i <= ids.length; i++) {
    		grid.jqGrid('editRow',ids[ids.length-i]);
    	}
    };
    //[function] grid 수정모드 취소
    function restoreRow() {
        var grid = $programGrid;
        var ids = grid.jqGrid('getDataIDs');
        for (var i = 1; i <= ids.length; i++) {
            grid.jqGrid('restoreRow',ids[ids.length-i]);
        }
    };
    //[function] grid 행추가
    function fnAddRowProgram() {
    	var ids = $programGrid.getDataIDs();
		var parameters ={
		    rowID : ids.length+1,
		    initdata : {'MOD_FLAG':'INSERT','MOD_CHECK':'<i class="fa fa-check" />'},
		    position :"first",
		    useDefValues : false,
		    useFormatter : false,
		    addRowParams : {extraparam:{}}
		}
		$programGrid.jqGrid('addRow',parameters);
		$programGrid.jqGrid('editRow',ids.length+1, {keys: true} );
		lastSelection = ids.length+1;
    }
    
    //[function] 수정된 내용저장
    function saveRows() {
    	
    	// 저장하지 않은 데이터 저장처리
    	var grid = $programGrid;
        var ids = grid.jqGrid('getDataIDs');
        for (var i = 1; i <= ids.length; i++) {
            grid.jqGrid('saveRow',ids[ids.length-i]);
        }
//        var dataObject = $programGrid.getRowData();
//        
//        for (var i = 0; i < dataObject.length; i++) {
//        	if(dataObject[i].MOD_CHECK == "" ){
//        		//미수정 데이터 삭제
//        		delete dataObject[i];
//        	}else{
//        		//불필요한 데이터 삭제
//				delete dataObject[i].MOD_VAL;
//				delete dataObject[i].MOD_CHECK;
//				delete dataObject[i].IN_DT;
//				delete dataObject[i].IN_USER_ID;
//        	}
//        }
//        var strJson = JSON.stringify(dataObject);
//        console.log(strJson)
        
        
        var data = $programGrid.getRowData();
        var senData = [];
		for (var i = 0; i < data.length; i++) {
			if(data[i].MOD_CHECK != "" ){
				var rowData = {
						"callUrl":data[i].CALL_URL ,
						"jsPath":data[i].JS_PATH ,
						"modFlag":data[i].MOD_FLAG ,
						"proCd":data[i].PRO_CD ,
						"proDesc":data[i].PRO_DESC ,
						"proNm":data[i].PRO_NM ,
						"useYn":data[i].USE_YN 
				}
				senData.push(rowData);
			}
		}
		if(senData.length == 0){
			alert("변경된 데이터가 없습니다.");
			return;
		}
		var jsonData = JSON.stringify({"dt_program":senData});
		$.ajax({
    		url : "/ctrl/settings/system/program/saveProgram",
    		data :jsonData,
    		type : "POST",
    		dataType : "json",
    		contentType: 'application/json; charset=utf-8',
    		cache: false,
    		success : function(result) {
    			alert("저장되었습니다.");
    			$programGrid.trigger("reloadGrid");
    		}
    	});
    		
    		
    }
    
}();

$(document).ready(function() {
	SystemInfoApp.init();
	
	
});
