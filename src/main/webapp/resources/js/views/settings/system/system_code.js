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
var SystemCodeApp = function () {
	"use strict";
	
	/************************************************
	 *전역 객체 선언부 (return 상위부분에 선언해야함)
	 ************************************************/
	
	// [El]그룹코드 그리드
	var $codeGroupGrid = $("#systemCodeGroupGrid");
	
	// [El]공통코드 그리드
	var $codeGrid = $("#systemCodeGrid");
	
	// [Data]그룹코드 유형 콤보박스 데이터
	var gridCodeGroupOptions;
	 
	
    return {
        init: function () {
        	//그룹코드 유형 콤보박스 데이터 조회
        	fnListCodeGroupTypeJson("SC0001");
        	
        	//그룹코드 Grid생성
        	fnListCodeGroup(); 
        	//그룹코드 이벤트
        	fnCodeGroupEvents();
        	
        	//공통코드 Grid생성
        	fnListCode();
        	//공통코드 이벤트
        	fnCodeEvents();
	    }
	    
    };
    
    //[Fn] 그룹코드이벤트 
    function fnCodeGroupEvents(){
    	// 그룹타입 변경 이벤트
    	$("#codeGroupType").change(function() {
    		$("#codeGroupCd").val("");
    		$("#codeGroupName").val("");
    	});
    	
    	//검색폼 그룹코드 코드 엔터키 이벤트
    	$("#codeGroupCd").enterEvent({
    		callBack:function(value){
    			if(value.length > 1){
    				fnGetCodeGroupNames({"codeGroupCd":value});
    			}else{
    				alert("코드명을 2자리 이상 입력해주세요.");
    			}
    		}
    	});
    	//검색폼 그룹코드명 엔터키 이벤트
    	$("#codeGroupName").enterEvent({
    		callBack:function(value){
    			//그리드 수정 여부 체크
    			if(fnModCheck($codeGroupGrid) && fnModCheck($codeGrid)){
    				var data = {
    						codeGroupCd : "",
    						codeGroupType : $("#codeGroupType").val(),
    						codeGroupNm : $("#codeGroupName").val()
    				};
    				$codeGroupGrid.paragonGridSearch(data);
    				$("#codeGroupName").autocomplete( "close" );
    			}
    		}
    	});
    	
    	//그룹코드 저장버튼
    	$("#codeGroupSaveRowBtn").click(function(){
    		fnSaveCodeGroupRows();
    	});
    	//그룹코드 행추가버튼
    	$("#codeGroupAddRowBtn").click(function(){
    		$codeGroupGrid.appendRow();
    	});
    	//그룹코드 검색버튼
    	$("#codeGroupSearchBtn").click(function(){
    		fnSearchListCodeGroup();
    	});
    	//그룹코드 행삭제버튼
    	$("#codeGroupDelRowBtn").click(function(){
    		$codeGroupGrid.rowDel();
    	});
    	
    }
	//[Fn] 공통코드이벤트 
    function fnCodeEvents(){
    	
    	//검색폼 공통코드 코드 엔터키 이벤트
    	$("#commoncodeCd").enterEvent({
    		callBack:function(value){
    			if(value.length > 0){
    				fnGetCodeNames({"codeCd":value});
    			}else{
    				alert("코드명을 1자리 이상 입력해주세요.");
    			}
    		}
    	});
    	//검색폼 공통코드명 엔터키 이벤트
    	$("#commonCodeName").enterEvent({
    		callBack:function(value){
    			//그리드 수정 여부 체크
    			if(fnModCheck($codeGroupGrid) && fnModCheck($codeGrid)){
    				var data = {
    						codeGroupCd : "",
    						codeCd : "",
    						codeNm : $("#commonCodeName").val()
    				};
    				$codeGrid.paragonGridSearch(data);
    				$("#commonCodeName").autocomplete("close");
    			}
    		}
    	});
    	
    	
    	//공통코드 저장버튼
    	$("#commonCodeSaveRowBtn").click(function(){
    		fnSaveCodeRows();
    	});
    	//공통코드 행추가버튼
    	$("#commonCodeAddRowBtn").click(function(){
    		fnAddRowCode();
    	});
    	//공통코드 검색버튼
    	$("#commonCodeSearchBtn").click(function(){
    		fnSearchListCommonCode();
    	});
    	//공통코드 행삭제버튼
    	$("#commonCodeDelRowBtn").click(function(){
    		$codeGrid.rowDel();
    	});
    }
    //[Fn] 그룹코드 콤보박스 JSON 조회 
    function fnListCodeGroupTypeJson(groupCd){
    	$.ajax({ 
    		url : "/ctrl/settings/system/code/listCodeGroupComboJson",
    		data :{codeGroupCd:groupCd},
    		type : "POST",
    		dataType : "json",
    		cache: false,
    		async:false,
    		success : function(result) {
//    			codeGroupComboJson = result;
    			gridCodeGroupOptions = Util.MakeGridOptions(result);
    			console.log(gridCodeGroupOptions)
    			Util.MakeSelectOptions($("#codeGroupType"),result);    
    		}
    	});
    }
	
    
    
    
    /********************************************************************
     * 공통코드 그리드 생성
     * Since   : 2016-10-24
     * COMP_ID : CP0007
     * 작성자  : Kim Jin Ho
     * 수정내역: 
     ********************************************************************/
    //[Fn] 그룹코드 그리드 생성 
    function fnListCodeGroup() {
		$codeGroupGrid.paragonGrid({
			url : '/ctrl/settings/system/code/listCodeGroup',
			height : 170,
			rowNum : 500,
			sortable: true,
			rowEditable : true,
			loadonce: true,
			scroll : 1,
			colModel:[
    		          {name:'CODE_GROUP_SEQ',hidden:true},
    		          {editable: true, name:'CODE_GROUP_CD', align:"center"},
    		          {editable: true, name:'CODE_GROUP_NM', align:"center"},
    		          {editable: true, name:'CODE_GROUP_DESC',width:300},
    		          {
    		        	  editable: true, 
    		        	  align:"center",
    		        	  name:'CODE_GROUP_TYPE',
    		        	  edittype:'select',
    		        	  formatter:'select',
    		        	  editoptions: {
    		        		  value:gridCodeGroupOptions,
    		        	  }
    		        		  
    		          },{
    		        	  editable: true, 
    		        	  name:'SYS_YN', 
    		        	  align:"center",
    		        	  edittype:'select',
    		        	  formatter:'select',
    				      editoptions: {
    				    		value:"Y:사용;N:미사용",
    				      }
    		          },{
    		        	  editable: true, 
    		        	  name:'USE_YN', 
    		        	  align:"center",
    		        	  edittype:'select',
    		        	  formatter:'select',
    		        	  editoptions: {
    		        		  value:"Y:사용;N:미사용",
    		        	  }
    		          
    		          },
    		          {name:'IN_USER_ID', align:"center"},
    		          {name:'IN_DT', align:"center",sortable:false}
	          ],
			caption : "공통코드 그룹 목록",
			//로우 선택식 호출함수 [연속 호출 안함]
			onSelectRowEvent : function(currRowData, prevRowData) {
				//로우선택시 공통코드 목록 조회
				var codeGroupCd = currRowData.CODE_GROUP_CD;				
				if(codeGroupCd){
					$("#commoncodeCd").val("");
					$("#commonCodeName").val("");
					$codeGrid.paragonGridSearch({
						"codeGroupCd" : codeGroupCd,
						codeNm : "",
						codeCd : ""
					});
				}
			},
			//수정모드에서 일반모드로 전환시 유효성검사
			onSaveRowValidate : function(currSaveData,currRowId) {
				console.log(currSaveData);
				console.log(currRowId);
				var grid = $codeGroupGrid;
				var codeGroupCd = $("#"+currRowId+"_CODE_GROUP_CD",grid).val();
				if (codeGroupCd == "") {
					alert("그룹코드를 입력해주세요.");
					return false;
				//checkOverLap은 loadonce: true 에서만 사용
				}else if (grid.checkOverLap("CODE_GROUP_CD",codeGroupCd,currRowId)) {
					alert("중복된 키가 존재 합니다.");
					return false;
				}
				return true;
			},
		});
    }
    
    
    /********************************************************************
     * 공통코드(상세 코드 목록) 그리드 생성
     * Since   : 2016-10-24
     * COMP_ID : CP0008
     * 작성자  : Kim Jin Ho 
     * 수정내역: 
     ********************************************************************/
    //[Fn] 공통코드 그리드 생성
    function fnListCode(){
    	
		$codeGrid.paragonGrid({
        	url: '/ctrl/settings/system/code/listCode',
        	firstData:false,
        	loadonce: true,
			rowEditable:true,
			height: 300,
    		rowNum: 500,
    		scroll: 1,
            colModel:[
                {name:'CODE_SEQ',hidden:true},
                {name:'CODE_GROUP_CD', align:"center", rowspan:true},
                {editable: true, name:'CODE_CD', align:"center"},
                {editable: true, name:'CODE_NM', align:"center"},
                {editable: true, name:'CODE_DESC',width:300},
                {editable: true, name:'CODE_ORDER', align:"center",width:100},
                {editable: true, name:'CODE_OTHER1', align:"center",width:100},
                {editable: true, name:'CODE_OTHER2', align:"center",width:100},
                {editable: true, name:'CODE_OTHER3', align:"center",width:100},
                {editable: true, name:'CODE_OTHER4', align:"center",width:100},
                {editable: true, name:'CODE_OTHER5', align:"center",width:100},
                {
                	editable: true, 
                	name:'USE_YN', 
                	align:"center",
                	width:"100px",
                	fixed :true,
                	edittype:'select',
		        	  formatter:'select',
		        	  editoptions: {
		        		  value:"Y:사용;N:미사용",
		        	  }
        		},
                {name:'IN_USER_ID', align:"center"},
                {name:'IN_DT', align:"center",sortable:false}
            ],
            pager: "#systemCodeGridNavi",
            caption: "공통코드 목록",
            rowspan:true,
        });
	}
    
    
    //[Fn]그룹코드 수정된 내용저장
    function fnSaveCodeGroupRows() {
    	
    	//ParamsData Key : GridData Key 
    	var parseCamelData = {
    			modFlag			: "MOD_FLAG",
    			codeGroupSeq	: "CODE_GROUP_SEQ",
    			codeGroupCd		: "CODE_GROUP_CD",
    			codeGroupNm		: "CODE_GROUP_NM",
    			codeGroupDesc	: "CODE_GROUP_DESC",
    			codeGroupType	: "CODE_GROUP_TYPE",
    			sysYn			: "SYS_YN",
				useYn			: "USE_YN" 
		}
    	// 그리드에서 저장이 필요한 데이터만 가져옴
    	var jsonData = $codeGroupGrid.getJsonData("dt_codegroup",parseCamelData);
    	if(!jsonData){
    		alert("변경된 데이터가 없습니다.");
    		return;
    	}
    	
    	$.ajax({
    		url : "/ctrl/settings/system/code/saveCodeGroup",
    		data :jsonData,
    		contentType: 'application/json; charset=utf-8',
    		cache: false,
    		success : function(result) {
    			alert(result.msgTxt);
//    			$codeGroupGrid.trigger("reloadGrid");
				var data = {
						codeGroupCd : "",
						codeGroupType : $("#codeGroupType").val(),
						codeGroupNm : $("#codeGroupName").val()
				};
				$codeGroupGrid.paragonGridSearch(data);
    		}
    	});
    }
    
    //[Fn] 공통코드 수정된 내용저장
    function fnSaveCodeRows() {
    	
    	//ParamsData Key : GridData Key 
    	var parseCamelData = { 
    			modFlag		 : "MOD_FLAG",
    			codeGroupCd	 : "CODE_GROUP_CD",
    			codeSeq		 : "CODE_SEQ",
    			codeCd		 : "CODE_CD",
    			codeNm		 : "CODE_NM",
    			codeDesc	 : "CODE_DESC",
    			codeOrder	 : "CODE_ORDER",
    			codeOther1	 : "CODE_OTHER1",
    			codeOther2	 : "CODE_OTHER2",
    			codeOther3	 : "CODE_OTHER3",
    			codeOther4	 : "CODE_OTHER4",
    			codeOther5	 : "CODE_OTHER5",
				useYn		 : "USE_YN" 
		}
    	// 그리드에서 저장이 필요한 데이터만 가져옴
    	var jsonData = $codeGrid.getJsonData("dt_code",parseCamelData);
    	if(!jsonData){
    		alert("변경된 데이터가 없습니다.");
    		return;
    	}
    	
    	$.ajax({
    		url : "/ctrl/settings/system/code/saveCode",
    		data :jsonData,
    		contentType: 'application/json; charset=utf-8',
    		success : function(result) {
    			alert(result.msgTxt);
//    			$codeGrid.trigger("reloadGrid");
    			var codeGroupCd = $codeGroupGrid.selectRowData("CODE_GROUP_CD");
				$codeGrid.paragonGridSearch({
					"codeGroupCd" : codeGroupCd,
					codeNm : "",
					codeCd : ""
				});
    		}
    	});
    }
    
    //[Fn] 그룹코드 검색 조건 조회
    function fnSearchListCodeGroup(){
    	//그리드 수정 여부 체크
    	if(fnModCheck($codeGroupGrid) && fnModCheck($codeGrid)){
	    	var data = {
	    			codeGroupType : $("#codeGroupType").val().trim(),
	    			codeGroupCd : $("#codeGroupCd").val().trim(),
	    			codeGroupNm : $("#codeGroupName").val().trim()
			};
	    	//그리드 조회
    		$codeGroupGrid.paragonGridSearch(data);
    	}
    }
    //[Fn] 공통코드 검색 조건 조회
    function fnSearchListCommonCode(){
    	//그리드 수정 여부 체크
    	if(fnModCheck($codeGrid) && fnModCheck($codeGroupGrid)){
    		var data = {
    				codeGroupCd : "",
					codeCd : "",
					codeNm : $("#commonCodeName").val()
			};
    		//그리드 조회
			$codeGrid.paragonGridSearch(data);
    	}
    }
    
    //[Fn] 코드명 가져오기 자동완성            
    function fnGetCodeNames(data){
    	$.ajax({
    		url : "/ctrl/settings/system/code/listCodeNames",
    		data :data,
    		type : "POST",
    		dataType : "json",
    		cache: false,
    		success : function(result) {
    			//자동완성 생성
    			$('#commonCodeName').autocomplete({
    				source: result,
    				minLength:0 
    			});
    			$("#commonCodeName").autocomplete("search", "");
    			$("#commonCodeName").val("").focus();
    		}
    	});
    }
    //[Fn] 그룹코드명 가져오기 자동완성            
    function fnGetCodeGroupNames(data){
    	$.ajax({
    		url : "/ctrl/settings/system/code/listCodeGroupNames",
    		data :data,
    		type : "POST",
    		dataType : "json",
    		cache: false,
    		success : function(result) {
    			$('#codeGroupName').autocomplete({
    				source: result,
    				minLength:0 
    			});
    			$("#codeGroupName").autocomplete("search", "");
    			$("#codeGroupName").val("").focus();
    		}
    	});
    }
    //[Fn 공통] 그리드 수정 여부 체크
    function fnModCheck(grid){
		return grid.paragonGridModConfirm("수정된 내용이 있습니다. 계속 진행하시겠습니까?");
	}
    
    //[Fn] 공통코드 행추가
    function fnAddRowCode() {
    	//그룹코드 선택행
    	var rowid= $codeGroupGrid.jqGrid('getGridParam','selrow');
    	//그룹코드 선택행 데이터
		var lastRowData = $codeGroupGrid.getRowData( rowid );
		//그룹코드 선택행 데이터 CODE_GROUP_CD
		var codeGroupCd = lastRowData.CODE_GROUP_CD;
		
		//행추가시 기본값세팅 addData,  행추가 하기전 실행 함수 :startCallBack
		$codeGrid.paragonGridAddRow({
			addData : {'CODE_GROUP_CD':codeGroupCd},
    		startCallBack : function(){
    			var modFlag = lastRowData.MOD_FLAG;
    			
    			if(rowid === null){
    				alert("코드 그룹을 선택해주세요.");
    				return false;
    			}else if(codeGroupCd == "" || modFlag == "INSERT"){
    				alert("코드 그룹을 저장해주세요.");
    				return false;
    			}
    			return true;
    		}
    	});
		
    }
}();

$(document).ready(function() {
	SystemCodeApp.init();
});
