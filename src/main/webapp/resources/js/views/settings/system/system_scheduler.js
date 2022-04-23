/** Copyright (c) 2016 VertexID RND, Inc.
 * 
 * Application Name : 스케줄러 관리[SystemSchedulerApp]
 * Program Code     : PC0005
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Kim Jin Ho  		2016. 10. 24.  		First Draft.
 */
var SystemSchedulerApp = function () { 
	"use strict";
	
	/************************************************
	 *전역 객체 선언부 (return 상위부분에 선언해야함)
	 ************************************************/
	
	// [El]프로그램 그리드
	var $systemSchedulerGrid = $("#systemSchedulerGrid");
	
    return {
        init: function () {
        	//스케줄관리 Grid생성
        	fnListScheduler();
        	//스케줄관리 Event
        	fnSchedulerEvents();
	    }
    };
    
    //[Fn] 이벤트 
    function fnSchedulerEvents(){
    	
    	//검색폼 프로그램명 엔터키 이벤트
    	$("#systemSchedulerName").enterEvent({
    		callBack:function(value){
    			//그리드 수정 여부 체크
    			if(fnModCheck()){
    				var data = {
    						scheNm : $("#systemSchedulerName").val()
    				};
    				$systemSchedulerGrid.paragonGridSearch(data);
    			}
			}
    	})
    	
    	//저장버튼
    	$("#systemSchedulerSaveRowBtn").click(function(){
    		fnSaveScheduleRows();
    	});
    	//행추가버튼
    	$("#systemSchedulerAddRowBtn").click(function(){
    		$systemSchedulerGrid.appendRow();
    	});
    	//검색버튼
    	$("#systemSchedulerSearchBtn").click(function(){
    		fnSearchListProgram();
    	});
    	//행삭제버튼
    	$("#systemSchedulerDelRowBtn").click(function(){
    		$systemSchedulerGrid.rowDel();
    	});
    }
    
    
    //[Fn] 스케줄러 검색
    function fnSearchListProgram(){
    	//그리드 수정 여부 체크
    	if(fnModCheck()){
	    	var data = {
	    			scheNm : $("#systemSchedulerName").val()
			};
    		$systemSchedulerGrid.paragonGridSearch(data);
    	}
    }
    /********************************************************************
     * 스케줄러 그리드 생성
     * Since   : 2016-10-24
     * COMP_ID : CP0005
     * 작성자  : Kim Jin Ho
     * 수정내역: 
     ********************************************************************/
    //[Fn] grid 스케줄러 목록 
    function fnListScheduler(){
		$systemSchedulerGrid.paragonGrid({
        	url: '/ctrl/settings/system/scheduler/listScheduler',
			componentId: "CP0005",
			rowEditable:true,
			scroll: 1,
			colNames:[
					     'SCHE_SEQ',
					     '스케줄러명',
					     '설명',
					     '클래스 경로',
					     '초',
					     '분',
					     '시',
					     '일',
					     '월',
					     '년',
					     '실행상태',
					     '작성자',
					     '작성일',
					     '처리',
					],
            colModel:[
				{align:"center",editable: true, name:'SCHE_SEQ',width:50,hidden:true},
                {align:"center",editable: true, name:'SCHE_NM',width:50},
                {editable: true, name:'SCHE_DESC'},
                {editable: true, name:'SCHE_CLASS_PATH'},
                {align:"center",editable: true, name:'SCHE_SEC',width:"30px"},
                {align:"center",editable: true, name:'SCHE_MIN',width:"30px"},
                {align:"center",editable: true, name:'SCHE_HOUR',width:"30px"},
                {align:"center",editable: true, name:'SCHE_DAY',width:"30px"},
                {align:"center",editable: true, name:'SCHE_MONTH',width:"30px"},
                {align:"center",editable: true, name:'SCHE_YEAR',width:"30px"},
                {align:"center",name:'USE_YN',width:50},
                {align:"center",name:'IN_USER_ID',width:50},
                {align:"center",name:'IN_DT', width:50},
                {align:"center",name:'EVENT',editable: false,width:50,formatter:inMakeActionButtion}
            ],
            caption: "Scheduler 목록",
            
        });
		//[In] 스케줄러 실행/중지 버튼생성
		function inMakeActionButtion(cellvalue, options, rowObject) {
            var reLoadButton = '<button class="btn btn-danger btn-xs m-r-2 stop-btn" value="'+(rowObject.SCHE_SEQ)+'" >중지</button>'
            var runButton = '<button class="btn btn-primary btn-xs run-btn" value="'+(rowObject.SCHE_SEQ)+'" >실행</button>'
            return reLoadButton+runButton;
		}
		//스케줄러 중지버튼 Event
		$systemSchedulerGrid.find('.stop-btn').off().live('click', function (e) {
			e.stopPropagation();
            inStopScheduleJob($(this).val())
         });
		//스케줄러 실행버튼 Event
        $systemSchedulerGrid.find('.run-btn').off().live('click', function (e) {
        	e.stopPropagation();
        	inRunScheduleJob($(this).val())
        });
        //[In] 스케줄러 실행
        function inRunScheduleJob(id) {
        	var jsonData = JSON.stringify({"scheSeq":id,"useYn":"Y"});
        	$.ajax({
        		url : "/ctrl/settings/system/scheduler/start",
        		data :jsonData,
        		contentType: 'application/json; charset=utf-8',
        		success : function(result) {
                	$systemSchedulerGrid.trigger("reloadGrid");
                	alert(result.msgTxt);
        		}
        	});
        }
        //[In] 스케줄러 중지
        function inStopScheduleJob(id) {
        	var jsonData = JSON.stringify({"scheSeq":id,"useYn":"N"});
        	$.ajax({
        		url : "/ctrl/settings/system/scheduler/stop",
        		data :jsonData,
        		contentType: 'application/json; charset=utf-8',
        		success : function(result) {
        			$systemSchedulerGrid.trigger("reloadGrid");
        			alert(result.msgTxt);
        		}
        	});
        }
	}
    //[Fn] 그리드 수정 여부 체크
    function fnModCheck(){
    	return $systemSchedulerGrid.paragonGridModConfirm("수정된 내용이 있습니다. 계속 진행하시겠습니까?");
	}
    
    //[Fn] 라디오 값 get/set
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
    
    //[Fn] 수정된 내용저장
    function fnSaveScheduleRows() {
    	
    	//ParamsData Key : GridData Key application
    	var rowData = {
    			modFlag		   : "MOD_FLAG" ,
    			scheSeq        : "SCHE_SEQ",
				scheNm         : "SCHE_NM",
				scheDesc       : "SCHE_DESC",
				scheClassPath : "SCHE_CLASS_PATH",
				scheSec        : "SCHE_SEC",
				scheMin        : "SCHE_MIN",
				scheHour       : "SCHE_HOUR",
				scheDay        : "SCHE_DAY",
				scheMonth      : "SCHE_MONTH",
				scheYear       : "SCHE_YEAR",
				useYn          : "USE_YN"
		}
    	
    	var jsonData = $systemSchedulerGrid.getJsonData("dt_scheduler",rowData);
    	if(!jsonData){
    		alert("변경된 데이터가 없습니다.");
    		return;
    	}
		$.ajax({
    		url : "/ctrl/settings/system/scheduler/saveScheduler",
    		data :jsonData,
    		contentType: 'application/json; charset=utf-8',
    		success : function(result) {
    			$systemSchedulerGrid.trigger("reloadGrid");
    			alert(result.msgTxt);
    		}
    	});
    }
    
}();

$(document).ready(function() {
	SystemSchedulerApp.init();
});
