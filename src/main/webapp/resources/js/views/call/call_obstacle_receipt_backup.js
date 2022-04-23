/** Copyright (c) 2017 VertexID RND, Inc.
 * 
 * Application Name : 콜센터 장에 등록[ObstacleReceiptApp]
 * Program Code     : PC0101
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * 김진호			2017. 3. 16. 		First Draft.        javascript
 */
var thisdoc = document.all;
var thisform = document.forms[0];
var objState = document.getElementById( 'AGENTSTATUS' ); 
var REASONCODE = "";

var nMsgLine = 0;
var ObstacleReceiptApp = function () {
	"use strict";
	
	// [El]자산정보 그리드
	var $callObsAssetGrid = $("#callObsAssetGrid");
	var fLogin = true;
    return {
        init: function () {
        	//이벤트 생성
        	fnObsReceiptEvent();
        	//그리드 생성
        	fnObsMakeGrid();
        	
        	fnLoginSoftPhone();
        	
        	REAL_SET_SERVER_IP('27.125.1.226');
        	setTimeout(function(){ 
        		console.log("11");
            	CHECK_BUTTON("Log On");
            }, 3000); 
	    },
	    OnButtonProc:function(arButton){
	    	console.log(arButton);
	    },
	    OnCallNumSelect:function(phoneNum){
	    	fnCallStrView(phoneNum);
	    },
    };
    function fnLoginSoftPhone(){
    	$("#callBtnGroup  .call-btn").prop("disabled",true);
    	$("#callLogonBtn").hide();
    	$("#callDrop").hide();
//    	var USERID = $("#USERID").val();
//    	var EXT = $("#EXT").val();
    	//로그인
		$("#callLogonBtn").click(function(){
			CHECK_BUTTON("Log On");
		});
		$("#callAnswer").click(function(){
			fnCallStrView($("#INBOUNDCUSTOMERNUMBER").val());
			CT_ANSWER();
		});
		$("#callMake").click(function(){
			var callNum = $("#TEMP_CALLNO").val();
			if(callNum != ""){
				CT_MAKECALL(callNum);
			}else{
				alert("발신번호를 입렵하세요");
				$("#TEMP_CALLNO").focus();
			}
		});
		$("#callDrop").click(function(){
			CT_DROPCALL('1000');
		});
    }
    
    
    //[Fn] 이벤트 
    function fnObsReceiptEvent(){
    	//장애분류  Lv4 콤보박스 생성(값이 없어도 리셋안되도록 nonReset:true)
    	$("#obsRcptLv4").combobox({nonReset:true});
    	
    	//권역 콤보박스 생성
    	MMSUtil.fnMakeAreaCombo($("#obsRcptArea"));
    	//공통코드 콤보박스 생성(처리구분)
    	MMSUtil.fnMakeCommCombo($("#obsRcptStsType"),"OS0001","","선택",["01"]);
    	//공통코드 콤보박스 생성(유상구분)
    	MMSUtil.fnMakeCommCombo($("#obsRcptStsCostType"),"OS0002","");
    	//공통코드 콤보박스 생성(CUST_TYPE)
    	MMSUtil.fnMakeCommCombo($("#obsRcptCustType"),"OS0003","04");
    	
    	//접수시간
    	$("#obsRcptDateForm").datepicker({todayHighlight: true,autoclose: true});
//    	$("#obsRcptDate").val(Util.LocalDate());
    	$("#obsRcptDate").datepicker('setDate', Util.LocalDate());
    	//접수시간
    	$("#obsRcptTime").timepicker({showMeridian:false});
    	
    	//처리일자
    	$("#obsRcptStsDateForm").datepicker({todayHighlight: true,autoclose: true});
//    	$("#obsRcptStsDate").val(Util.LocalDate());
    	$("#obsRcptStsDate").datepicker('setDate', Util.LocalDate());
    	//처리시간
    	$("#obsRcptStsTime").timepicker({showMeridian:false});
    	
    	//입금일
    	$("#obsRcptCostDtForm").datepicker({todayHighlight: true,autoclose: true});
    	//금액
    	$("#obsRcptStsCost").onlyMoney();
    	//매뉴얼 버튼
		$("#openObstacleMenual").click(function(){
			var compCd = $("#obsSelectCompCd").val();
			var obsSeqLv4 = $("#obsRcptLv4").val();
			var obsSeqLv3 = $("#obsRcptLv3").val();
			var obsSeqLv2 = $("#obsRcptLv2").val();
			var obsSeqLv1 = $("#obsRcptLv1").val();
			var popUpData = {
				compCd	  :compCd,
				obsSeqLv4: obsSeqLv4,
				obsSeqLv3: obsSeqLv3,
				obsSeqLv2: obsSeqLv2,
				obsSeqLv1: obsSeqLv1
			};
			console.log(popUpData);
			PopApp.paragonOpenWindow({
				ajaxUrl : '/ctrl/call/obstacle/receipt/menual',
				id : 'callObstacleMenualPop',
				width : '900px',
				data : popUpData,
				btnName : "수정",
				title : "장애 매뉴얼",
				onload : function(modal) {
					modal.show();
				},
				visibleEvent : function() {
					ObsRcptManulPopApp.resetMenual();
				},

			});
		});
		$("#callStsBtnGroup > .sts-btn").click(function(){
			$("#callStsBtnGroup .sts-btn").removeClass("btn-primary");
			$(this).addClass("btn-primary");
		});
		// 모두 초기화
		$("#obsRcptRestBtn").click(function(){
			if(confirm("모두초기화 하시겠습니까?")){
				//Site초기화
				fnObsSelectedStrCrear();
				//장애접수초기화
				fnObsSelectedObsCrear();
				//장애처리 초기화
				fnObsSelectedStsCrear();
				//장애이력 초기화
				fnObsSelectedObsHistCrear();
				//자산이력 초기화
				fnObsSelectedAstHistCrear();
				
				$("#obsRcptHstList").html("");
				
				$("#obsAstHstList").html("");
			}
		});
		// Site 초기화
		$("#obsStrSearchReset").click(function(){
			//Site정보 초기화
			fnObsSelectedStrCrear();
			//장애분류 초기화
			fnObsSelectedStndObsCrear();
			$("#obsStrSearchNm").focus();
		});
		$("#callBtn5").click(function(){
			$("#obsRcptStsDate").val(Util.LocalDate());
		});
		// 장애내용 추가
		$("#addObstacleBtn").click(function(){
			fnAddObsRcptLv4();
		});
		$("#obsRcptSaveBtn").click(function(){
			fnObsRcptSave();
		});
		//엔지니어 권역 변경
		$("#obsRcptArea").change(function(){
			$("#obsStrSearchNm").focus();
			var selectVal = $(this).val();
			if(selectVal != ""){
				MMSUtil.fnMakeEngrCombo($("#obsRcptEngr"),{areaSeq:selectVal});
			}
		});
		// Site 자동완성
		$("#obsStrSearchNm").strAutoComplate({
			callYn 		: 'Y',			//콜센터 관리만 조회
			onSelect: function(result){
				//Site정보
				fnObsSelectedStrView(result);
				//엔지니어 권역정보 조회
				var areaSeq = result.AREA_SEQ;
				var compCd = result.COMP_CD;
				var strCd = result.STR_CD;
				$("#obsRcptArea").val(areaSeq);
				//엔지니어 콤보박스 생성
				MMSUtil.fnMakeEngrCombo($("#obsRcptEngr"),{areaSeq:areaSeq});
				//장애분류 콤보박스 생성
				MMSUtil.fnMakeObsRcptCombo($("#obsRcptLv1"), compCd, "", "", "대분류");
				$("#obsRcptLv2").html('<option value="">중분류</option>');
		    	$("#obsRcptLv3").html('<option value="">소분류</option>');
		    	$("#obsRcptLv4").html('<option value="">선택</option>');
		    	$("#obsRcptLv4").data('combobox').refresh();
				//Site 자산정보조회
				$callObsAssetGrid.paragonGridSearch({
					strCd : strCd
				});
				//Site 장애 이력조회
				fnObsHitList(strCd);
				
				//Site 자산 이력조회
				fnAstHitList(strCd);
			}
		});
		// 제품검색 자동완성
		$("#obsAutoPrdSearch").prdAutoComplate({
			prdTypeId 	: "#obsAutoPrdType",
			prdMfrId 	: "#obsAutoPrdMfr",
			prdId 		: "#obsAutoPrd",
			patId 		: "#obsAutoPat",
		});
		//장애분류 이벤트
		MMSUtil.fnObsRcptComboBox({
			compCdId 	 : "#obsSelectCompCd",
			obsRcptLv1Id : "#obsRcptLv1",
			obsRcptLv2Id : "#obsRcptLv2",
			obsRcptLv3Id : "#obsRcptLv3",
			obsRcptLv4Id : "#obsRcptLv4",
		});
    }
    
    function fnObsMakeGrid(){
        
        /********************************************************************
         * 자산정보 그리드 생성
         * Since   : 2016-10-24
         * 작성자  : Kim Jin Ho
         * 수정내역: 
         ********************************************************************/
		$("#callObsAssetGrid").paragonGrid({
			url: '/ctrl/asset/asset/listAssetManager',
			page : 1,
			sortable : true,
			hidegrid: false,
			height: 137,
			rowHight : "S",
			firstData : false,
			colNames :["자산번호","제품코드","파트코드","제조사코드","제품군코드","제품군","제조사","모델명","파트명","시리얼","유형1","유형2","납품일","선택"],
			colModel : [ 
				{name : 'AST_SEQ', hidden : true}, 
				{name : 'PRD_CD', hidden : true}, 
				{name : 'PAT_CD', hidden : true}, 
				{name : 'MFR_SEQ', hidden : true}, 
				{name : 'PRD_TYPE_SEQ', hidden : true}, 
				{name : 'PRD_TYPE_SEQ_NM', align:"center"},		//제품군
				{name : 'MFR_SEQ_NM', align:"center"},			//제조사
				{name : 'PRD_NM', align:"center"},				//장비명
				{name : 'PAT_NM', align:"center"},				//파트명
				{name : 'AST_SERIAL', align:"center"},			//시리얼
				{name : 'AST_TYPE1', align:"center"},			//구분1
				{name : 'AST_TYPE2', align:"center"},			//구분2
				{name : 'AST_MFR_DT', align:"center"},			//제조일
				{editable: false,align:"center",name:'EVENT',formatter:inMakeActionBution}
			],
			loadonce : true,
//			caption : "자산 정보",
			rownumbers : true,
		});
		//[FN] 선택버튼생성
		function inMakeActionBution(cellvalue, options, rowObject) {
            var reLoadButton = '<button type="button" class="btn btn-info btn-xs m-r-5 select-btn" value="'+(options.rowId)+'" >선택</button>'
             				 + ' <button type="button" class="btn btn-danger btn-xs m-r-5 nonselect-btn" value="'+(options.rowId)+'" >취소</button>';
            return reLoadButton;
		}
		//선택 이벤트
		$callObsAssetGrid.find('.select-btn').off().live('click', function (e) {
        	e.stopPropagation();
        	var rowData = $callObsAssetGrid.getRowData($(this).val());
        	$callObsAssetGrid.focusToRow();

        	$('#obsSelectAstSeq').val(rowData.AST_SEQ);
			$('#obsAutoPrdType').val(rowData.PRD_TYPE_SEQ);
			$('#obsAutoPrdMfr').val(rowData.MFR_SEQ);
			console.log(rowData.PAT_CD);
			MMSUtil.fnMakePrdCombo($('#obsAutoPrd'), rowData.PRD_TYPE_SEQ, rowData.MFR_SEQ, rowData.PRD_CD, "제품");
			MMSUtil.fnMakePatCombo($('#obsAutoPat'), rowData.PRD_CD, rowData.PAT_CD, "파트");
        });
		$callObsAssetGrid.find('.nonselect-btn').off().live('click', function (e) {
			e.stopPropagation();
			$callObsAssetGrid.focusRemove();
			$('#obsSelectAstSeq').val("");
			fnObsSelectedPrdCrear();
		});
    }
    //선택 Site 장애이력 조회
    function fnObsHitList(strCd){
    	$.ajax({
    		url : "/ctrl/call/obstacle/receipt/listObsHst",
    		data :{strCd:strCd},
    		type : "POST",
    		dataType : "json",
    		cache: false,
    		success : function(result) {
    			var dtGrid = result.dt_grid;
    			$("#obsRcptHstList").html("");
    			for (var i = 0; i < dtGrid.length; i++) {
    				var obsDr = dtGrid[i];
    				var listLi = $('<li class="media media-sm" />');
    				var listBody = $('<div class="media-body" />');
    				var listTitle = $('<h5 class="media-heading" />');
    				var listViewBtn = $('<i class="fa fa-search cursor-pointer" />');
    				listViewBtn.click(function(){
    					PopApp.paragonOpenWindow({
//    						ajaxUrl : '/ctrl/call/obstacle/receipt/menual',
    						id : 'callObstacleHistory',
    						width : '500px',
    						btnName : "수정",
    						title : "장애내용",
    						body:"<div>장애내용 상세보기 개발예정</dib>",
    						onload : function(modal) {
    							modal.show();
    						}

    					});
    				});
    				listTitle.append("["+obsDr.RCPT_DT+" "+obsDr.RCPT_TIME+"] "+obsDr.RCPT_CUST_NM+" ");
//    				listTitle.append(listViewBtn);
    				listLi.append(listBody.append(listTitle).append(obsDr.RCPT_CONT));
    				$("#obsRcptHstList").append(listLi);
				}
    			
    		}
    	});
    }
    //선택 Site 자산이력 조회
    function fnAstHitList(strCd){
    	$.ajax({
    		url : "/ctrl/call/obstacle/receipt/listAstHst",
    		data :{strCd:strCd},
    		type : "POST",
    		dataType : "json",
    		cache: false,
    		success : function(result) {
    			var dtGrid = result.dt_grid;
    			$("#obsAstHstList").html("");
    			for (var i = 0; i < dtGrid.length; i++) {
    				var astDr = dtGrid[i];
    				var listLi = $('<li class="media media-sm" />');
    				var listBody = $('<div class="media-body" />');
    				var listTitle = $('<h5 class="media-heading" />');
    				listTitle.append("["+astDr.AST_HST_DT+"][<strong>"+astDr.AST_HST_ST_NM+"</strong>] SN : "+astDr.AST_SERIAL+"<br>"+astDr.PRD_TYPE_SEQ_NM+">"+astDr.MFR_SEQ_NM+">"+astDr.PRD_NM+" ");
    				listLi.append(listBody.append(listTitle).append(astDr.AST_HST_CONT));
    				$("#obsAstHstList").append(listLi);
    			} 
    		}
    	});
    }
    //전화온 매장 정보 조회
    function fnCallStrView(phoneNum){
    	$.ajax({
    		url : "/ctrl/standard/store/listCallStr",
    		data :{phoneNum:phoneNum},
    		type : "POST",
    		dataType : "json",
    		cache: false,
    		success : function(result) {
    			console.log(result);
    			fnObsSelectedStrView(result);
				//엔지니어 권역정보 조회
				var areaSeq = result.AREA_SEQ;
				var compCd = result.COMP_CD;
				var strCd = result.STR_CD;
				$("#obsRcptArea").val(areaSeq);
				//엔지니어 콤보박스 생성
				MMSUtil.fnMakeEngrCombo($("#obsRcptEngr"),{areaSeq:areaSeq});
				//장애분류 콤보박스 생성
				MMSUtil.fnMakeObsRcptCombo($("#obsRcptLv1"), compCd, "", "", "대분류");
				$("#obsRcptLv2").html('<option value="">중분류</option>');
		    	$("#obsRcptLv3").html('<option value="">소분류</option>');
		    	$("#obsRcptLv4").html('<option value="">선택</option>');
		    	$("#obsRcptLv4").data('combobox').refresh();
				//Site 자산정보조회
				$callObsAssetGrid.paragonGridSearch({
					strCd : strCd
				});
				//Site 장애 이력조회
				fnObsHitList(strCd);
				
				//Site 자산 이력조회
				fnAstHitList(strCd);
    		}
    	});
    }
    //장애 접수 저장
    function fnObsRcptSave(){
    	
        //접수정보 
    	var strCd = $("#obsSelectStrCd").val();
    	var astSeq = $("#obsSelectAstSeq").val();
    	var rcptCustNm = $("#obsRcptCustNm").val();
    	var rcptCustType = $("#obsRcptCustType").val();
    	var rcptCont = $("#obsRcptCont").val();
    	var rcptDt = $("#obsRcptDate").val();
    	var rcptTime = $("#obsRcptTime").val();
    	var rcptEngr = $("#obsRcptEngr").val();
        //장애분류 
    	var rcptObsLv1 = $("#obsRcptLv1").val();
    	var rcptObsLv2 = $("#obsRcptLv2").val();
    	var rcptObsLv3 = $("#obsRcptLv3").val();
    	var rcptObsLv4 = $("#obsRcptLv4").val();
        	
        //제품
		var prdCd = $("#obsAutoPrd").val();
		var patCd = $("#obsAutoPat").val();
		
//		var rcptDpstYn = $("#obsRcptDpstYn").val();
//		var rcptCostType = $("#obsRcptCostType").val();
//		var rcptCost = $("#obsRcptCost").val();
		
   	    
		
    		
		if(strCd ==""){
			alert("Site을 선택해주세요.");
			$("#obsStrSearchNm").focus();
			return;
		}else if(rcptObsLv1 ==""){
			alert("장애 대분류를 선택해주세요");
			$("#rcptObsLv1").focus();
			return;
		}else if(rcptObsLv2 ==""){
			alert("장애 중분류를 선택해주세요");
			$("#rcptObsLv2").focus();
			return;
//		}else if(rcptObsLv3 ==""){
//			alert("장애 소분류를 선택해주세요");
//			$("#rcptObsLv3").focus();
//			return;
//		}else if(rcptObsLv4 ==""){
//			alert("장애 내용 선택해주세요");
//			$("#rcptObsLv4").focus();
//			return;
		}else if(rcptDt ==""){
			alert("접수일자를 입력해주세요.");
			$("#obsRcptDate").focus();
			return;
		}else if(rcptTime ==""){
			alert("접수시간을 입력해주세요.");
			$("#obsRcptTime").focus();
			return;
		}else if(rcptCont ==""){
			alert("접수내용을 입력해주세요.");
			$("#obsRcptCont").focus();
			return;
		}

		
		//처리
		var rcptStsType = $("#obsRcptStsType").val();
		var rcptStsDt = $("#obsRcptStsDate").val();
		var rcptStsTime = $("#obsRcptStsTime").val();
		var rcptStsCont = $("#obsRcptStsCont").val();
		
		
		 
		
		var rcptStsCost = $("#obsRcptStsCost").val();
		var rcptStsCostType = $("#obsRcptStsCostType").val();
		var rcptStsDpstYn = $("#obsRcptStsDpstYn").val();
		var rcptStsCostDt = $("#obsRcptStsCostDt").val();
		var rcptStsDpstNm = $("#obsRcptStsDpstNm").val();
		
    	if(rcptStsType !="" || rcptStsCont  !=""){
    		if(rcptStsType =="" ){
    			alert("처리구분을 선택해주세요.");
    			$("#obsRcptStsType").focus();
    			return;
    		}else if(rcptStsCont =="" ){
    			alert("처리내용을 입력해주세요.");
    			$("#obsRcptStsCont").focus();
    			return;
    		}else if(rcptStsDt =="" ){
    			alert("처리일자를 입력해주세요.");
    			$("#obsRcptStsDate").focus();
    			return;
    		}else if(rcptStsTime =="" ){
    			alert("처리시간을 입력해주세요.");
    			$("#obsRcptStsTime").focus();
    			return;obsRcptStsCostType
    		}else if(rcptStsCostType == "02" && rcptStsDpstYn == ""){
    			alert("유상처리일경우 입금여부를 선택해주세요.");
    			$("#obsRcptCost").focus();
    			return;
    		}else if(rcptStsCostType == "02" && rcptCost == ""){
		    	alert("금액을 입력해주세요.");
		    	$("#obsRcptCost").focus();
		    	return;
		    }
    	}
    	var prevRcptStsType = "01";
    	//장애등록, 앤지니어 미배정, 장애처리 미선택
    	if(rcptEngr != "" && rcptStsType ==""){
    		rcptStsType ="02";
    	}
		if(!confirm("장애접수내용을 저장하시겠습니까?")){
			return;
		}
		var saveObsData = {
			strCd        : strCd       ,
			astSeq       : astSeq      ,
			rcptCustNm   : rcptCustNm  ,
			rcptCustType : rcptCustType,
			rcptCont     : rcptCont    ,
			rcptDt       : rcptDt      ,
			rcptTime     : rcptTime    ,
			rcptEngr     : rcptEngr    ,
			rcptObsLv1   : rcptObsLv1  ,
			rcptObsLv2   : rcptObsLv2  ,
			rcptObsLv3   : rcptObsLv3  ,
			rcptObsLv4   : rcptObsLv4  ,
			prdCd        : prdCd       ,
			patCd        : patCd       ,
			
			prevRcptStsType  : prevRcptStsType ,	//접수코드
			rcptStsType  : rcptStsType ,
			rcptStsDt    : rcptStsDt   ,
			rcptStsTime  : rcptStsTime ,
			rcptStsCont  : rcptStsCont ,
			
			rcptStsCost  	: rcptStsCost ,
			rcptStsCostType : rcptStsCostType ,
			rcptStsDpstYn   : rcptStsDpstYn ,
			rcptStsCostDt   : rcptStsCostDt ,
			rcptStsDpstNm   : rcptStsDpstNm 
		};
    	$.ajax({
    		url : "/ctrl/call/obstacle/receipt/saveRcpt",
    		data :saveObsData,
    		type : "POST",
    		dataType : "json",
    		cache: false,
    		success : function(result) {
    			if(result.stsCd == 100){
    				alert(result.msgTxt);
    				if(confirm("접수되었습니다.\n모두초기화 하시겠습니까?")){
    					//Site초기화
    					fnObsSelectedStrCrear();
    					//장애접수초기화
    					fnObsSelectedObsCrear();
    					//장애처리 초기화
    					fnObsSelectedStsCrear();
    					//장애이력 초기화
    					fnObsSelectedObsHistCrear();
    					//자산이력 초기화
    					fnObsSelectedAstHistCrear();
    					
    					$("#obsRcptHstList").html("");
    					
    					$("#obsAstHstList").html("");
    				}else{
    					//Site 장애 이력조회
    					fnObsHitList(strCd);
    					
    					//Site 자산 이력조회
    					fnAstHitList(strCd);
    				}
    			}
    		}
    	});
    }
    function fnAddObsRcptLv4(){
    	var options = $("#obsRcptLv4 option");
    	var obsRcptLv4 = $("#obsRcptLv4_input").val();

    	for (var i = 0; i < options.length; i++) {
    		var opTxt = options.eq(i).text();
    		if(opTxt == $.trim(obsRcptLv4)){
    			alert("이미 등록된 장애내용입니다.");
    			return;
    		}
		}
    			
    	var compCd	   = $("#obsSelectCompCd").val();
    	
    	var obsRcptLv1 = $("#obsRcptLv1").val();
		var obsRcptLv2 = $("#obsRcptLv2").val();
		var obsRcptLv3 = $("#obsRcptLv3").val();
		var strCd = $("#obsSelectStrCd").val();
		if(compCd == ""){
			alert("Site을 선택해주세요.");
			$("#obsStrSearchNm").focus();
			return;
		}else if(obsRcptLv1 == ""){
			alert("장애 대분류를 선택해주세요.");
			$("#obsRcptLv1").focus();
			return;
		}else if(obsRcptLv2 == ""){
			alert("장애 중분류를 선택해주세요.");
			$("#obsRcptLv2").focus();
			return;
		}else if(obsRcptLv3 == ""){
			alert("장애 소분류를 선택해주세요.");
			$("#obsRcptLv3").focus();
			return;
		}else if($.trim(obsRcptLv4) == ""){
			alert("장애 내용을 입력해주세요.");
			$("#obsRcptLv4_input").focus();
		}
		
		
		if(!confirm("장애내용을 추가하시겠습니까?")){
			return;
		}
		var obsNewData = {
			obsPrtSeq : obsRcptLv3,
			compCd 	  : compCd,
			obsNm 	  : obsRcptLv4,
			obsLv     : "4",
			obsManual : ""
		};
		$.ajax({
			url : "/ctrl/standard/obstacle/addObstacle",
			data : obsNewData,
			success : function(result) {
				if(result.stsCd == 100){
					var obsSeq = result.obsSeq;
					MMSUtil.fnMakeObsRcptCombo($("#obsRcptLv4"), compCd, obsRcptLv3, obsSeq, "선택",true);
				}else{
					alert(result.msgTxt);
				}
				
			}
		});
    }
    
    
    
    //장애처리 초기화
    function fnObsSelectedStsCrear(){
    	$("#obsRcptStsType").val("");
    	$("#obsRcptStsFreeYn").val("");
    	$("#obsRcptStsDate").val(Util.LocalDate());
    	$("#obsRcptStsTime").val(Util.LocalTime(24));
    	$("#obsRcptStsCont").val("");
    }
    //접수정보 초기화
    function fnObsSelectedObsCrear(){
    	$("#obsRcptCustNm").val("");
    	$("#obsRcptCont").val("");
    	$("#obsRcptArea").val("");
    	$("#obsRcptDate").datepicker('setDate', Util.LocalDate());
    	$("#obsRcptTime").val(Util.LocalTime(24));
    	$("#obsRcptEngr").val("");
		//장애분류
		fnObsSelectedStndObsCrear();
		//제품정보
		fnObsSelectedPrdCrear();
    }
    //장애분류 초기화
    function fnObsSelectedStndObsCrear(){
    	$("#obsRcptLv1").html('<option value="">대분류</option>');
    	$("#obsRcptLv2").html('<option value="">중분류</option>');
    	$("#obsRcptLv3").html('<option value="">소분류</option>');
    	$("#obsRcptLv4").html('<option value="">선택</option>');
    	$("#obsRcptLv4").data('combobox').refresh();
    	
    }
    //제품 초기화
    function fnObsSelectedPrdCrear(){
    	$("#obsAutoPrdSearch").val("");
    	$("#obsAutoPrdType").val("");
		$("#obsAutoPrdMfr").val("");
		$("#obsAutoPrd").html('<option value="">제품</option>');
		$("#obsAutoPat").html('<option value="">파트</option>');
    }
    //장애이력 초기화
    function fnObsSelectedObsHistCrear(){
    }
    //자산이력 초기화
    function fnObsSelectedAstHistCrear(){
    }
    //Site 정보 초기화
    function fnObsSelectedStrCrear(){
    	$("#obsStrSearchNm").val("");
    	//hidden변수
		$("#obsSelectStrCd").val("");
		$("#obsSelectCompCd").val("");
		$("#obsSelectBrndCd").val("");
		
		$("#obsSelectStrNm").text("");
		$("#obsSelectStrCompNm").text("");
		$("#obsSelectStrBrnd").text("");
		$("#obsSelectStrPhone").text("");
		$("#obsSelectStrCompCate").text("");
		$("#obsSelectStrType").text("");
		$("#obsSelectStrSt").text("");
		$("#obsSelectStrMngCd").text("");
		$("#obsSelectStrCeo").text("");
		$("#obsSelectStrAddr1").text("");
		$("#obsSelectStrAddr2").text("");
		$("#obsSelectStrArea").text("");
		$("#callObsRcptCompFileNmView").html("");
		$("#obsSelectStrBigo").html("");
    }
    //Site 정보 보기
    function fnObsSelectedStrView(result){
    	$("#obsSelectStrCd").val(result.STR_CD);
		$("#obsSelectCompCd").val(result.COMP_CD);
		$("#obsSelectBrndCd").val(result.BRND_CD);
		$("#obsSelectStrNm").text(result.STR_NM);
		$("#obsSelectStrCompNm").text(result.COMP_NM);
		$("#obsSelectStrBrnd").text(result.BRND_NM);
		$("#obsSelectStrPhone").text(result.PHONE_NUM);
		$("#obsSelectStrCompCate").text(result.COMP_CATE_NM);
		$("#obsSelectStrType").text(result.STR_TYPE_NM);
		$("#obsSelectStrSt").text(result.STR_ST_NM);
		$("#obsSelectStrMngCd").text(result.MNG_CD);
		$("#obsSelectStrCeo").text(result.CEO_NM);
		var zipCd = result.ZIP_CD;
		if(zipCd != ""){
			zipCd ="("+zipCd+") "
		}
		$("#obsSelectStrAddr1").text(zipCd+result.ADDR1);
		$("#obsSelectStrAddr2").text(result.ADDR2+" "+result.ADDR_EXT);
		$("#obsSelectStrArea").text(result.AREA_NM);
		$("#obsSelectStrBigo").text(result.BIGO);
		
		var filePath = result.COMP_FILE
		var fileName = result.COMP_FILE_NM
		
		//그리드 접수내역 상세보기 증빙서류 미리보기
		var prevBtn = $('<i title="미리보기" class="fa fa-search cursor-pointer"></i>');
		prevBtn.click(function(){
			var form = $("<div/>");
			var viewForm = $("<div />",{id:"rcptCompNewFilePrevView","class":"min-height-200 p-5"});
			viewForm.append('<img src="'+filePath+'" data-img="'+filePath+'" alt="'+fileName+'" class="superbox-img" />')
			form.append(viewForm);
			
			PopApp.paragonOpenWindow({
				id : 'callObsStsCompFileView',
				width : '500px',
				title : "증빙서류",
				body:form,
				onload : function(modal) {
					modal.show();
				}

			});
		});
		if(fileName != ""){
			$("#callObsRcptCompFileNmView").html(fileName+" ");
			$("#callObsRcptCompFileNmView").append(prevBtn);
		}else{
			$("#callObsRcptCompFileNmView").html("");
		}
		
    }
}();

$(document).ready(function() {
	App.setSlimScroll();
	ObstacleReceiptApp.init();
});
