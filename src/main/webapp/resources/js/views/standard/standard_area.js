/** Copyright (c) 2017 VertexID RND, Inc.
 * 
 * Application Name : 권역관리[StandardAreaApp]
 * Program Code     : PC0101
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * 한성진				2017. 11. 06. 		First Draft.        javascript
 */
var StandardAreaApp = function () {
	"use strict";
	
	/************************************************
	 *전역 객체 선언부 (return 상위부분에 선언해야함)
	 ************************************************/
	
	// [El]협력사 그리드
	var $standardAreaAspCompGrid = $("#standardAreaAspCompGrid");
	// [El]권역정보 그리드
	var $standardAreaGrid = $("#standardAreaGrid");
	
	var userInfo = Util.getUserInfo();
	var aspCompCd = userInfo.s_companyCd;
	
    return {
        init: function () {
        	
        	$('#standardAreaAspCompCd').combobox();
        	MMSUtil.fnMaMakePartnerCombo($('#standardAreaAspCompCd'),aspCompCd,'선택');
        	
        	//권역정보관리 Grid생성
        	fnListAspComp();
        	//권역정보관리 Grid생성
        	fnListArea();
        	//권역정보관리 Event
        	fnAreaEvents();
        	
        	
	    }
    };
    
    //[Fn] 이벤트 
    function fnAreaEvents(){
    	$("#standardAreaName").enterEvent({
    		callBack:function(value){
    	    	var aspCompCd = $standardAreaAspCompGrid.selectRowData('ASP_COMP_CD');
    			if (!aspCompCd) {
    				alert("파트너사를 선택해주세요.");
    				return;
    			}
    			var data = {
    					aspCompCd : aspCompCd,
    					areaNm 	: $("#standardAreaName").val()
    			};
    			$standardAreaGrid.search(data);
    		}
    	});
    	
    	//저장버튼
    	$("#standardAreaSaveRowBtn").click(function(){
    		// 데이터 키 : Value Key
        	var camelObj = {
        			modFlag	: "MOD_FLAG",
        			areaCd	: "AREA_CD"	,
    				areaNm	: "AREA_NM"	,
    				memo	: "MEMO"	,
    				useYn	: "USE_YN"	, 
    		}
        	
        	var gridData = $standardAreaGrid.getGridData(camelObj);
        	
        	if(!gridData){
        		return;
        	}
        	fnSaveRows(gridData);
    	});
    	$("#standardAreaAspAreaSearchBtn").click(function(){
        	var aspCompCd = $standardAreaAspCompGrid.selectRowData('ASP_COMP_CD');
    		if (!aspCompCd) {
    			alert("파트너사를 선택해주세요.");
    			return;
    		}
    		var data = {
					aspCompCd : aspCompCd,
					areaNm : $("#standardAreaName").val()
			};
			$standardAreaGrid.search(data);
    	});
    	//행추가버튼
    	$("#standardAreaAddRowBtn").click(function(){
    		fnAddRowArea();
    	});
    	//행삭제버튼
    	$("#standardAreaDelRowBtn").click(function(){
    		$standardAreaGrid.rowDel();
    	});
    	
    	$('#standardAreaAspCompCd').change(function(){
    		if(!userInfo.s_companyCd){
    			aspCompCd = $('#standardAreaAspCompCd').val();
    		}
    		$standardAreaAspCompGrid.search({aspCompCd:aspCompCd});
    		$standardAreaAspCompGrid.resetSelectionGrid();
    	})
    	
    	
    }
    
    /********************************************************************
     * 협력사 그리드 생성
     * Since   : 2017-11-03
     * 작성자  : 한 성 진
     * 수정내역: 
     ********************************************************************/
    //[Fn] jqgrid 권역정보관리 목록 
    function fnListAspComp(){
    	$standardAreaAspCompGrid.paragonGrid({
    		url : '/ctrl/asp/company/listAspCompany',
    		sortable : true,
    		postData:{aspCompCd:aspCompCd},
    		rowEditable : false,
    		height : 230,
    		colNames:["회사코드", "회사명", "사업자등록번호", "대표자명", "관리자", "연락처"],
    		colModel:[
    		          {name:'ASP_COMP_CD' , align:"center"},
    		          {name:'ASP_COMP_NM' , align:"center"},
    		          {name:'ASP_CORP_NUM',align:"center"},
    		          {name:'ASP_CEO_NM', align:"center"},
		              {name:'ASP_USER_NM',align:"center"},
		              {name:'PHONE',align:"center"},
    		         ],
    		pager: "standardAreaAspCompGridNavi",
	        onSelectRowEvent : function(currRowData, prevRowData) {
				//로우선택시 중분류코드 목록 조회
	        	console.log("click");
				var aspCompCd = currRowData.ASP_COMP_CD;
				
				$standardAreaGrid.paragonGridSearch({
					"aspCompCd" : aspCompCd,
				});
//				$standardAreaGrid.paragonGridClear();
			},
    	})
    }
 
    /********************************************************************
     * 권역정보관리 그리드 생성
     * Since   : 2017-03-20
     * 작성자  : 최 판 석
     * 수정내역: 
     ********************************************************************/
    //[Fn] jqgrid 권역정보관리 목록 
    function fnListArea(){
		$standardAreaGrid.paragonGrid({
        	url: '/ctrl/standard/area/listStndArea',
        	rowEditable:true,
			sortable: true,
			height : 300,
			firstData : false,
//			loadonce:true,
			colNames: ["부서코드","부서명","사용여부","메모"],
			colModel : [ 
	            {name : 'AREA_CD', align:"center", fixed:true, width:"150px" }, 
	            {editable : true,name : 'AREA_NM', align:"center" , fixed:true, width:"350px"}, 
				{
                	editable: true, 
                	name:'USE_YN', 
                	align:"center",
                	edittype:'select',
		        	formatter:'select',
			    	editoptions: {
			    		value:"Y:사용;N:미사용",
			    	},
                    fixed:true,
                    width:"150px"
        		},
				{name : 'MEMO',  align:"center",editable : true},
			],
            pager: "#standardAreaGridNavi",
            onSaveRowValidate : function(currRowData,currRowId,grid) {
				var rowData = grid.getRow(currRowId);
				var areaNm = rowData.AREA_NM;
				
				if (areaNm === "") {
					alert("권역명을 입력하세요.");
					return false;
				//checkOverLap은 loadonce: true 에서만 사용
				}else if (grid.checkOverLap("AREA_NM",areaNm,currRowId)) {
					alert("중복된 권역이 존재 합니다.");
					return false;
				}
				return true;
			},
        });
	}
    
    //[Fn] grid 행추가
    function fnAddRowArea() {
    	var aspCompCd = $standardAreaAspCompGrid.selectRowData('ASP_COMP_CD');
		if (!aspCompCd) {
			alert("파트너사를 선택해주세요.");
			return;
		}
    	$standardAreaGrid.appendRow();
    }
    
    //그리드 수정 여부 체크
    function fnModCheck(){
    	return $standardAreaGrid.paragonGridModConfirm("수정된 내용이 있습니다. 계속 진행하시겠습니까?");
	}
    
    //[Fn] 수정된 내용저장
    function fnSaveRows(gridData) {
    	
    	if(!gridData){
    		alert("변경된 데이터가 없습니다.");
    		return;
    	}
    	
    	var aspCompCd = $standardAreaAspCompGrid.selectRowData('ASP_COMP_CD');
    	
    	var jsonData = {
    			'dt_area' 	: gridData,
    			'aspCompCd' : aspCompCd 
    	}
    	
		$.ajax({
    		url : "/ctrl/standard/area/saveStndArea",
    		data :JSON.stringify(jsonData),
    		contentType: 'application/json; charset=utf-8',
    		success : function(result) {
    			alert(result.msgTxt);
    			$standardAreaGrid.search();
    		}
    	});
    		
    }
    
}();

$(document).ready(function() {
	StandardAreaApp.init();
});
