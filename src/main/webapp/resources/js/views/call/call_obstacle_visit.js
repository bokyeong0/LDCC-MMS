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
function fnAppFileUploadSign(message, obj){
	try {
    	var jsonString = decodeURI(obj);
		var data = $.parseJSON(jsonString);
		MobileUtil.WriteLog(data);
		
	
		var imgList = data.dt_saveFileInfo;
		$("#resultFileInfo").val($("#resultFileInfo").val()+"\nfileSize : "+imgList.length+"\n");
		for (var i = 0; i < imgList.length; i++) {
	//		$("#signSaveFilePrevView").html('<img src="'+imgList[i].webPath+'" data-img="'+imgList[i].webPath+'" alt="" class="superbox-img" />')
			$("#signSaveFileWebPath").val(imgList[i].webPath);
			$("#signSaveFileWebName").val(imgList[i].fileName);
			$("#resultFileInfo").val($("#resultFileInfo").val()+imgList[i].webPath+"\n");
			$("#resultFileInfo").val($("#resultFileInfo").val()+imgList[i].fileName+"\n");
		}
		var prevBtn = $('<i title="미리보기" class="fa fa-search cursor-pointer"></i>');
		var webName = $("#signSaveFileWebName").val();
		var webPath = $("#signSaveFileWebPath").val();
		prevBtn.click(function(){
			var form = $("<div/>");
			var width = $("#mainMasterBody").width();
			var viewForm = $("<div />",{id:"signSaveFilePrevView","class":"min-height-200 p-5"});
			viewForm.css(width,width);
			viewForm.append('<img src="'+webPath+'" data-img="'+webPath+'" alt="'+webName+'" class="superbox-img" />')
			form.append(viewForm);
			
			PopApp.paragonOpenWindow({
				id : 'callObsVisitSighFileView',
				width : '360px',
				title : "서명확인",
				body:form,
				onload : function(modal) {
					modal.show();
				}
			
			});
		});
		$("#callObsVisitSighFileNmView").html(webName+" ");
		$("#callObsVisitSighFileNmView").append(prevBtn);
	} catch (e) {
//		$("#resultFileInfo").val("ERROR2 : "+e);
	}
};


var ObsRcptStsApp = function () {
	"use strict";
	
	
	// [El]자산정보 그리드
	var $callObsVisitGrid = $("#callObsVisitGrid");
	var $callObsVisitHistGrid = $("#callObsVisitHistGrid");
	// 서명 등록 시(Javscript 용) 필요.
	// SignaturePad js가 로드 된 이 후 해당 Api를 불러야 오류가 나지 않음.
	var canvas = $('#visit-signature-pad canvas')[0];
	var sign = new SignaturePad(canvas, {
		backgroundColor: 'rgb(255, 255, 255)'
	});
	var userInfo = Util.getUserInfo();
	var userID = userInfo.s_userId;
	var getEngr = null;

    return {

    	RcptView: function (rcptSeq) {
    		fnGetObsRcptView(rcptSeq);
    		$callObsVisitGrid.paragonGridReload();
    	},
        init: function () {
        	//이벤트 생성
        	fnObsStatusEvent();
        	//그리드 생성
        	fnObsStsMakeGrid();
        	//Canvas 초기화
        	fnCanvasInit();
    		$("#visit-signature-pad").hide();      	
	    }
    };
    
    
    //[Fn] 이벤트 
    function fnObsStatusEvent(){
    	/*
    	if(userInfo.s_userType !=2){
    		alert("파트너사 엔지니어 이용 메뉴 입니다.");
    		return false;
    	} 
    	*/ 	
    	//웹 모드
    	$("#callObsVisitLv4Search").combobox({inMode:true});
    	$("#callObsVisitModSaveWebBtn").hide();
		$("#callObsVisitModCancelWebBtn").hide();
		$("#callObsVisitSaveWebBtn").hide();
		$("#callObsVisitView").hide();
		$("#callObsVisitStsView").hide();
		
		$("#callObsVisitModSaveMobileBtn").hide();
		$("#callObsVisitModCancelMobileBtn").hide();
		
		// 장애 처리 등록
		$("#callObsVisitStsAddBtn").click(function(){
			$("#callObsVisitView").hide();
			$("#callObsVisitSaveWebBtn").show();
			$("#callObsVisitStsView").show();
			$("#callObsVisitLastYn").val("Y");
			$("#callObsVisitSighFileNmView").html("");		
			$("#saveFormTitle").text("장애처리 등록");
		});
		//장애 처리 등록 닫기
		$("#callObsVisitSaveCancelMobileBtn").click(function(){
			$("#callObsVisitView").show();
			$("#callObsVisitStsView").hide();
			$callObsVisitHistGrid.resetSelectionGrid();
		});
		//장애 내용 닫기
		$("#callObsVisitViewCloseBtn").click(function(){
			$("#callObsVisitView").hide();
			$("#callObsVisitGrid_wrap").show();
			$callObsVisitGrid.resetSelectionGrid();
		});
		
		
    	//장애분류  Lv4 콤보박스 생성(값이 없어도 리셋안되도록 nonReset:true ,(일반콤보박스처럼)inMode:true,(멀티searchForm일경우)searchMode:true)
    	$("#callObsVisitEngrSearch").combobox({inMode:true});

    	//권역 콤보박스 생성
    	MMSUtil.fnMakeAreaCombo($("#callObsVisitAreaSearch"));
        getEngr = EngrInfo(userInfo.s_userId);	
    	//=> 엔지니어 정보
    	MMSUtil.fnMakeEngrCombo($("#callObsVisitEngr"),{areaCd:getEngr.AREA_CD}, userInfo.s_userId); 
	
    	//권역 변경
		//$("#callObsVisitAreaSearch").change(function(){
		//	var selectVal = $(this).val();
		//	MMSUtil.fnMakeEngrCombo($("#callObsVisitEngrSearch"),{areaSeq:selectVal});
		//});
	 	//엔지니어 선택
    	$("#callObsVisitEngr").change(function(){   
    		EngrInfo($("#callObsVisitEngr").val());
    	});	  
    	
    	//공통코드 콤보박스 생성(처리구분)
    	MMSUtil.fnMakeCommCombo($("#callObsVisitTypeSearch, #callObsVisitType"),"OS0001","","선택");
    	//공통코드 콤보박스 생성(유상구분)
    	MMSUtil.fnMakeCommCombo($("#callObsVisitCostTypeSearch"),"OS0002","","선택");
    	MMSUtil.fnMakeCommCombo($("#callObsVisitCostType"),"OS0002","","");
    	
    	$("#callObsVisitRcptDateForm").datepicker({todayHighlight: true, autoclose: true,clearBtn:true});
    	
    	//장애분류 이벤트
//		MMSUtil.fnObsRcptComboBox({
//			compCdId 	 : "#callObsVisitCompSearch",
//			obsRcptLv1Id : "#callObsVisitLv1Search",
//			obsRcptLv2Id : "#callObsVisitLv2Search",
//			obsRcptLv3Id : "#callObsVisitLv3Search",
//			obsRcptLv4Id : "#callObsVisitLv4Search",
//		});
		
    	//회사 콤보박스 생성
//		fnMakeSerchCompCombo();
		
		
		//회사변경시 회사별 장애 분류 조회
		$("#callObsVisitCompSearch").change(function() {
			var compCd = $(this).val();
			MMSUtil.fnMakeObsRcptCombo($("#callObsVisitLv1Search"), compCd, "", "", "대분류");
		});
		
		//검색버튼
		$("#callObsVisitSearchWebBtn ,#callObsVisitSearchMobileBtn ").click(function(){
			$("#callObsVisitView").hide();
			$("#callObsVisitStsView").hide();
			$("#callObsVisitSaveWebBtn").hide();	
			$("#callObsVisitModSaveWebBtn").hide();				
			$("#callObsVisitModCancelWebBtn").hide();			
			$("#callObsVisitGrid_wrap").show();
			$callObsVisitGrid.resetSelectionGrid();
			fnObsStsGridSearch();
		});
		//접수번호  엔터 검색
		$("#callObsVisitRcptNoSearch , #callObsVisitStrNmSearch, #callObsVisitEngrSearch_input").enterEvent({
    		callBack:function(value){
    			$("#callObsVisitView").hide();
    			$("#callObsVisitStsView").hide();
    			$("#callObsVisitGrid_wrap").show();
    			$callObsVisitGrid.resetSelectionGrid();
    			fnObsStsGridSearch();
    		}
    	});
    	
    	//처리일자
    	$("#callObsVisitCompDtForm").datepicker({todayHighlight: true,autoclose: true,clearBtn:true});
    	$("#callObsVisitDt").datepicker('setDate', Util.LocalDate());
    	//처리시간
    	$("#callObsVisitTime").timepicker({ showMeridian:false,clearBtn:true});
    	//방문일자
    	$("#callObsVisitDtForm").datepicker({todayHighlight: true,autoclose: true,clearBtn:true});
      	//방문시간
    	$("#callObsVisitVisitTime").timepicker({showMeridian:false ,defaultTime:false});	
    	
    	//입금일
    	$("#callObsVisitCostDtForm").datepicker({todayHighlight: true,autoclose: true,clearBtn:true});
    	//금액
    	$("#callObsVisitCost").onlyMoney();
    	
    	//장애접수 수정
    	$("#callObsVisitModBtn").click(function(){
    		var rcptSeq = $callObsVisitGrid.focusRowData("RCPT_SEQ");
        	PopApp.paragonOpenPopup({
				ajaxUrl : '/ctrl/call/obstacle/status/obstacleStatusRcptPopupMove',
				id : 'obstacleStatusRcptPopup',
				data : {rcptSeq:rcptSeq},
				width : '800px',
				btnName : "수정",
				title : "장애처리수정",
				onload : function(modal) {
					modal.show();
				}
	
			});
    	});
    	
    	//장애처리 수정모드 취소
    	$("#callObsVisitModCancelWebBtn,  #callObsVisitModCancelMobileBtn").click(function(){
    		$callObsVisitHistGrid.focusRemove();
    		
    		$("#callObsVisitType").val("");
        	$("#callObsVisitCostType").val("");
        	$("#callObsVisitDpstYn").val("");
        	$("#callObsVisitCostDt").val("");        	
        	$("#callObsVisitDpstNm").val("");
        	$("#callObsVisitCost").val("");
        	$("#callObsVisitDt").datepicker('setDate', Util.LocalDate());
        	$("#callObsVisitTime").val(Util.LocalTime(24));
        	$("#callObsVisitCont").val("");
        	
        	$("#callObsVisitSelectRcptStsSeq").val("");
        	$("#callObsVisitLastYn").val("");
    		
        	//웹 모드
			//$("#callObsVisitSaveWebBtn").show();
			$("#callObsVisitModSaveWebBtn").hide();
			$("#callObsVisitModCancelWebBtn").hide();
			
			//모바일 모드
			$("#callObsVisitSaveMobileBtn").show();
			$("#callObsVisitSaveCancelMobileBtn").show();
			$("#callObsVisitModSaveMobileBtn").hide();
			$("#callObsVisitModCancelMobileBtn").hide();
			
			$("#callObsVisitView").show();
			$("#callObsVisitStsView").hide();
			$callObsVisitHistGrid.resetSelectionGrid();
		});
    	
    	
    	
		// 장애처리 신규저장
		$("#callObsVisitSaveWebBtn, #callObsVisitSaveMobileBtn").click(function(){
			fncallObsVisitSave("INSERT");
		});
		// 장애처리 수정저장
		$("#callObsVisitModSaveWebBtn, #callObsVisitModSaveMobileBtn").click(function(){
			fncallObsVisitSave("UPDATE");
		});
		// 증빙서류 등록
		$("#callObsVisitCompFileAddBtn").click(function(){
			fnPopNewCompFile();
		});
		// 사인등록
		$("#callObsVisitSignFileAddBtn").click(function(){
			fnPopNewSignFile();
		});
		//Browser Window Resize Event
		$(window).on("resize", function(){
			resizeCanvas();
		});
		
		$("#visit-signClearBtn").click(function () {
			sign.clear();
		});
		
		$("#visit-signCloseBtn").click(function () {
			$('#visit-signature-pad').hide();
		});
		
		$("#visit-signSaveBtn").click(function () {
			if (sign.isEmpty()){
				alert("사인이 되지 않았습니다.");
				return;
			}
			
			fnSaveSign();
		});
		
		
//		$("#obsAutoPrdSearch").prdAutoComplate({
//			prdTypeId 	: "#obsAutoPrdType",
//			prdMfrId 	: "#obsAutoPrdMfr",
//			prdId 		: "#obsAutoPrd",
//			patId 		: "#obsAutoPat",
//		});

		//=> 장애원인
    	//처리상태 변경 값 처리 
		$("#callObsVisitType").change(function(){
			var selectVal = $(this).val();	
			var array_info = ['01', '07'];
			if($.inArray(selectVal, array_info) > -1){ 
			    //=> 장애원인 추가 
			    $("#callObsVisitLv4").attr("disabled",true);
			}else{	
		        $("#callObsVisitLv4").attr("disabled",false);
			}
		});
    }
    
    // 장애 접수 검색
    function fnObsStsGridSearch(rowid) {
    	var stsRcptNoSearch 	= $("#callObsVisitRcptNoSearch").val();
    	var stsStartDateSearch 	= $("#callObsVisitRcptDateStartSearch").val();
    	var stsEndDateSearch 	= $("#callObsVisitRcptDateEndSearch").val();
    	var stsTypeSearch 		= $("#callObsVisitTypeSearch").val();
    	var stsCostTypeSearch 	= $("#callObsVisitCostTypeSearch").val();
    	
    	var stsCompSearch 		= $("#callObsVisitCompSearch").val();
    	var stsRcptLv1Search 	= $("#callObsVisitLv1Search").val();
    	var stsRcptLv2Search 	= $("#callObsVisitLv2Search").val();
    	var stsRcptLv3Search 	= $("#callObsVisitLv3Search").val();
    	var stsRcptLv4Search 	= $("#callObsVisitLv4Search").val();
    	
    	var stsAreaSearch 		= $("#callObsVisitAreaSearch").val();
    	var stsEngrSearch 		= $("#callObsVisitEngrSearch").val();
    	var stsStrNmSearch 		= $("#callObsVisitStrNmSearch").val();
    	
    	var searchData ={
    			stsRcptNoSearch 	: stsRcptNoSearch 	,
    			stsStartDateSearch 	: stsStartDateSearch, 	
    			stsEndDateSearch 	: stsEndDateSearch 	,
    			stsTypeSearch 		: stsTypeSearch 	,	
    			stsCostTypeSearch 	: stsCostTypeSearch ,	
    			stsCompSearch 		: stsCompSearch 	,	
    			stsRcptLv1Search 	: stsRcptLv1Search 	,
    			stsRcptLv2Search 	: stsRcptLv2Search 	,
    			stsRcptLv3Search 	: stsRcptLv3Search 	,
    			stsRcptLv4Search 	: stsRcptLv4Search 	,
    			stsAreaSearch 		: stsAreaSearch 	,	
    			stsEngrSearch 		: stsEngrSearch 	,	
    			stsStrNmSearch 		: stsStrNmSearch 	,	
    	}
    	$callObsVisitGrid.paragonGridSearch(searchData);
    	if(rowid){
    		$callObsVisitGrid.focusToRow(rowid);
    	}
    }
    
   
    function fnObsStsMakeGrid(){
    	$callObsVisitGrid.paragonGrid({
			url : '/ctrl/call/obstacle/receipt/listObsRept',
			rowEditable : false,
			height: "365px",
			postData : {stsEngrSearch:userID, cntFlag:"incmpl"},
			shrinkToFit: false,
//			rowClickFocus:true,
			rowNum: 10,
			rowList: [10, 20, 50,100],
			colNames :["RCPT_SEQ","STR_CD","AST_SEQ","접수번호","접수일시","고객사명","브랜드명","점포명","지역","신고자","장애유형","현장방문일시","경과 시간","처리상태","접수자","완료시간","파트너사","담당부서","담당엔지니어","유무상","금액"],
			colModel : [ 
	            {align:"center",name : 'RCPT_SEQ',hidden:true}, 
	            {align:"center",name : 'STR_CD',hidden:true}, 
	            {align:"center",name : 'AST_SEQ',hidden:true}, 
				{width:"90px",align:"center",name : 'RCPT_NO'}, //접수번호
				{width:"120px",align:"center",name : 'ACCEPT_DT'},   //접수일시
				{width:"110px",align:"center",name : 'COMP_NM'},   //고객사명
				{width:"110px",align:"center",name : 'BRND_NM'},   //브랜드명	
				{width:"100px",align:"center",name : 'STR_NM'},     //점포명
				{width:"70px",align:"center",name : 'AREA_NM'},   //지역 
				{width:"60px",align:"center",name : 'RCPT_CUST_NM'},   //신고자	
				{width:"250px",align:"left",name : 'RCPT_OBS_NM'},     //장애유형
				{width:"120px",align:"center",name : 'RCPT_VISIT_DT'},   //현장방문일시
				{width:"110px",align:"right",name : 'RCPT_CMPL_DT',classes:"p-r-15"}, //경과 시간 
				{width:"70px",align:"center",name : 'RCPT_STS_NM'},   //처리상태				
				{width:"70px",align:"center",name : 'IN_USER_NM'},   //접수자
				{width:"120px",align:"center",name : 'RCPT_COMP_DT'},   //완료시간
				{width:"100px",align:"center",name : 'ASP_COMP_NM'},   //파트너사
				{width:"100px",align:"center",name : 'ASP_PART_NM'},   //담당부서				
				{width:"90px",align:"center",name : 'RCPT_ENGR_NM'},   //담당엔지니어				
				{width:"90px",align:"center",name : 'RCPT_STS_COST_TYPE' },  //유무상
				{width:"90px",align:"center",name : 'RCPT_STS_COST' },  //금액
			],
			rownumbers : true,
			pager: "#callObsVisitGridNavi",
//            toolbar: [true,"top"],
            onSelectRowEvent : function(currRowData, prevRowData) {
				//로우선택시 공통코드 목록 조회
				var rcptSeq = currRowData.RCPT_SEQ;
                console.log("onSelect:"+ rcptSeq);				
				fnGetObsRcptView(rcptSeq);
			},
			/*
			ondblClickRow: function(id, iRow, iCol, e){

            	var rcptSeq = $callObsVisitGrid.getRowData( id ).RCPT_SEQ;
            	var astSeq = $callObsVisitGrid.getRowData( id ).AST_SEQ;
            	var strCd = $callObsVisitGrid.getRowData( id ).STR_CD;
                console.log("double:"+ rcptSeq);				
				PopApp.paragonOpenPopup({
					ajaxUrl : '/ctrl/call/obstacle/status/obstacleStatusRcptPopupMove',
					id : 'callObsVisitRcptModPopup',
					width : '1000px',
					data:{
						rcptSeq:rcptSeq,
						astSeq:astSeq,
						strCd:strCd,
						modFlag:"UPDATE"
					},
					title : "장애수정",

				});
			}
			*/
        });
//    	fnSetTopToolbar($("#t_callObsVisitGrid"));
		
		
        /********************************************************************
         * 처리현황 그리드 생성
         * Since   : 2016-10-24
         * 작성자  : Kim Jin Ho
         * 수정내역: 
         ********************************************************************/
		$callObsVisitHistGrid.paragonGrid({
			url: '/ctrl/call/obstacle/status/listObsSts',
			page : 1,
			sortable : true,
			hidegrid: false,
			height: "100px",
			//rowHight : "S",
			firstData : false,
			shrinkToFit: false,
			
			colNames :["RCPT_STS_SEQ","RCPT_STS_COST_TYPE","RCPT_STS_TYPE","SIGN_PATH","SIGN_NM","RCPT_STS_CONT","RCPT_STS_COST_TYPE_NM","RCPT_STS_DPST_YN","RCPT_STS_COST","RCPT_STS_COST_DT","LAST_PROC_YN", "RCPT_VISIT_DT", "RCPT_VISIT_TIME", "구분","처리일","시간","유무상","서명", "선택"],
			colModel : [ 
				{width:"100px",name : 'RCPT_STS_SEQ', hidden : true}, 
				{width:"100px",name : 'RCPT_STS_TYPE', hidden:true},		
				{width:"100px",name : 'RCPT_STS_COST_TYPE', hidden : true},		
				{width:"100px",name : 'SIGN_PATH', hidden : true},		
				{width:"100px",name : 'SIGN_NM', hidden : true},
				
				{width:"60px",name : 'RCPT_STS_CONT', hidden : true},	
				{width:"60px",name : 'RCPT_STS_COST_TYPE_NM', hidden : true},	
				{width:"60px",name : 'RCPT_STS_DPST_YN', hidden : true},	
				{width:"60px",name : 'RCPT_STS_COST', hidden : true},					
				{width:"80px",name : 'RCPT_STS_COST_DT', hidden : true},		
				{width:"80px",name : 'RCPT_VISIT_DT', hidden:true},		
				{width:"80px",name : 'RCPT_VISIT_TIME', hidden:true},					
				{width:"80px",name : 'LAST_PROC_YN', hidden:true},	
				
				{width:"50px",name : 'RCPT_STS_TYPE_NM', align:"center"},		
				{width:"70px",name : 'RCPT_STS_DT', align:"center"},			
				{width:"40px",name : 'RCPT_STS_TIME', align:"center"},			
				{width:"60px",name : 'RCPT_STS_COST_TYPE_NM', align:"center"},
				{width:"60px",name : 'SIGH_CKECK', align:"center"},	
				/*{width:"60px",editable: false,align:"center",name:'SIGH_CKECK',formatter:inMakePrevBution},*/
				{width:"50px",editable: false,align:"center",name:'EVENT',formatter:inMakeActionBution}
			],
			loadonce : true,
			caption : "처리현황",
			rownumbers : true,
		});
		/*
		//[FN] 선택버튼생성
		function inMakePrevBution(cellvalue, options, rowObject) {
			var reLoadButton ='-';
			if(cellvalue == 'Y'){
				reLoadButton = '<button type="button" class="btn btn-info btn-xs m-r-5 select-prev-btn" value="'+(options.rowId)+'" > <i class="fa fa-search " ><i/> 보기</button>';
			}
			return reLoadButton;
		}
		$callObsVisitHistGrid.find('.select-prev-btn').off().live('click', function (e) {
			e.stopPropagation();
			var rowData = $callObsVisitHistGrid.getRowData($(this).val());
			var filePath = rowData.SIGN_PATH;
			var fileName = rowData.SIGN_NM;
			var form = $("<div/>");
			var viewForm = $("<div />",{id:"compNewFilePrevView","class":"min-height-200 p-5"});
			viewForm.append('<img src="'+filePath+'" data-img="'+filePath+'" alt="'+fileName+'" class="superbox-img" />')
			form.append(viewForm);
			
			PopApp.paragonOpenWindow({
				id : 'callObsVisitCompFileView',
				width : '360px',
				title : "증빙서류",
				body:form,
				onload : function(modal) {
					modal.show();
				}

			});
		});
		*/
		function inMakeActionBution(cellvalue, options, rowObject) {
            var reLoadButton = '<button type="button" class="btn btn-warning btn-xs m-r-5 select-mod-btn" value="'+(options.rowId)+'" >수정</button>';
            return reLoadButton;
		}
		$callObsVisitHistGrid.find('.select-mod-btn').off().live('click', function (e) {
        	e.stopPropagation();
        	var rowData = $callObsVisitHistGrid.getRowData($(this).val());
        	$callObsVisitHistGrid.focusToRow();
             console.log("---처리현황---");
             console.log(rowData);
             
   			//=> 처리내역변경 
 			$("#callObsVisitType").val(rowData.RCPT_STS_TYPE).trigger("change");  
             
        	$("#callObsVisitSelectRcptStsSeq").val(rowData.RCPT_STS_SEQ);
        	$("#callObsVisitType").val(rowData.RCPT_STS_TYPE);
        	$("#callObsVisitCostType").val(rowData.RCPT_STS_COST_TYPE);
        	
        	$("#callObsVisitDpstYn").val(rowData.RCPT_STS_DPST_YN);
        	$("#callObsVisitCostDt").val(rowData.RCPT_STS_COST_DT);        	
        	$("#callObsVisitDpstNm").val(rowData.RCPT_STS_DPST_NM);
        	$("#callObsVisitCost").val(rowData.RCPT_STS_COST);
        	$("#callObsVisitDt").val(rowData.RCPT_STS_DT);
        	$("#callObsVisitTime").val(rowData.RCPT_STS_TIME);
        	$("#callObsVisitVisitDt").val(rowData.RCPT_VISIT_DT);
        	$("#callObsVisitVisitTime").val(rowData.RCPT_VISIT_TIME);       	
        	$("#callObsVisitCont").val(rowData.RCPT_STS_CONT);
        	$("#callObsVisitLastYn").val(rowData.LAST_PROC_YN);
        	
        	$("#callObsVisitSaveWebBtn").hide();
			$("#callObsVisitModSaveWebBtn").show();
			$("#callObsVisitModCancelWebBtn").show();
			
			$("#callObsVisitSaveMobileBtn").hide();
			$("#callObsVisitSaveCancelMobileBtn").hide();
			$("#callObsVisitModSaveMobileBtn").show();
			$("#callObsVisitModCancelMobileBtn").show();
			
			/*
			var webPath = rowData.SIGN_PATH;
			var webName = rowData.SIGN_NM
			if(webPath != "") {
				
				var prevBtn = $('<i title="미리보기" class="fa fa-search cursor-pointer"></i>');
				prevBtn.click(function(){
					
					var form = $("<div/>");
					var viewForm = $("<div />",{id:"signSaveFilePrevView","class":"min-height-200 p-5"});
					viewForm.append('<img src="'+webPath+'" data-img="'+webPath+'" alt="'+webName+'" class="superbox-img" />')
					form.append(viewForm);
					
					PopApp.paragonOpenWindow({
						id : 'callObsVisitSighFileView',
						width : '360px',
						title : "서명확인",
						body:form,
						onload : function(modal) {
							modal.show();
						}
					
					});
				});
				$("#callObsVisitSighFileNmView").html(webName+" ");
				$("#callObsVisitSighFileNmView").append(prevBtn);
			}
			*/
			
			$("#callObsVisitSighFileNmView").html("");			
			$("#callObsVisitView").hide();
			$("#callObsVisitStsView").show();

			$("#saveFormTitle").text("장애처리 수정");
			
        });
		$callObsVisitHistGrid.find('.select-cancel-btn').off().live('click', function (e) {
			e.stopPropagation();
			$callObsVisitHistGrid.focusRemove();
    		
    		$("#callObsVisitType").val("");
        	$("#callObsVisitCostType").val("");
        	$("#callObsVisitDpstYn").val("");
        	$("#callObsVisitCostDt").val("");        	
        	$("#callObsVisitDpstNm").val("");
        	$("#callObsVisitCost").val("");
        	$("#callObsVisitDt").datepicker('setDate', Util.LocalDate());
        	$("#callObsVisitTime").val(Util.LocalTime(24));
        	$("#callObsVisitCont").val("");
    		
        	//웹 모드
			$("#callObsVisitSaveWebBtn").show();
			$("#callObsVisitModSaveWebBtn").hide();
			$("#callObsVisitModCancelWebBtn").hide();
			
			//모바일 모드
			$("#callObsVisitSaveMobileBtn").show();
			$("#callObsVisitSaveCancelMobileBtn").show();
			$("#callObsVisitModSaveMobileBtn").hide();
			$("#callObsVisitModCancelMobileBtn").hide();
			$("#callObsVisitSighFileNmView").html("");
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
    						width : '360px',
    						btnName : "수정",
    						title : "장애내용",
    						body:"<div>장애내용 상세보기 개발예정</div>",
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
    				//TODO PRD_TYPE_SEQ 수정
    				listTitle.append("["+astDr.AST_HST_DT+"][<strong>"+astDr.AST_HST_ST_NM+"</strong>] SN : "+astDr.AST_SERIAL+"<br>"+astDr.PRD_TYPE_SEQ_NM+">"+astDr.MFR_SEQ_NM+">"+astDr.PRD_NM+" ");
    				listLi.append(listBody.append(listTitle).append(astDr.AST_HST_CONT));
    				$("#obsAstHstList").append(listLi);
    			} 
    		}
    	});
    }
    
    //접수정보 상세보기
    function fnGetObsRcptView(rcptSeq){
    	$.ajax({
    		url : "/ctrl/call/obstacle/receipt/viewObsRcpt",
    		data :{rcptSeq:rcptSeq},
    		type : "POST",
    		dataType : "json",
    		cache: false,
    		success : function(result) {
				var compNm = result.COMP_NM
				var brndNm = result.BRND_NM
				var strNm = result.STR_NM
				
				$callObsVisitHistGrid.paragonGridSearch({
					rcptSeq : rcptSeq
				});
				var filePath = result.COMP_FILE
				var fileName = result.COMP_FILE_NM
				
				//그리드 접수내역 상세보기 증빙서류 미리보기
				var prevBtn = $('<i title="미리보기" class="fa fa-search cursor-pointer"></i>');
				prevBtn.click(function(){
					var form = $("<div/>");
					var viewForm = $("<div />",{id:"compNewFilePrevView","class":"min-height-200 p-5"});
					viewForm.append('<img src="'+filePath+'" data-img="'+filePath+'" alt="'+fileName+'" class="superbox-img" />')
					form.append(viewForm);
					
					PopApp.paragonOpenWindow({
						id : 'callObsVisitCompFileView',
						width : '360px',
						title : "증빙서류",
						body:form,
						onload : function(modal) {
							modal.show();
						}

					});
				});
				var sumCompNm = compNm+(brndNm ==""?" > ":" > "+brndNm+" > ")+strNm;
				$("#callObsVisitSelectRcptSeq").val(rcptSeq);
				$("#callObsVisitSelectCompCd").val(result.COMP_CD);
    			$("#callObsVisitCompNmView").text(sumCompNm);
    			if(fileName != ""){
    				$("#callObsVisitCompFileNmView").html(fileName+" ");
    				$("#callObsVisitCompFileNmView").append(prevBtn);
    			}else{
    				$("#callObsVisitCompFileNmView").html("");
    			}
    			$("#callObsVisitObsNmView").text(result.RCPT_OBS_NM);
    			$("#callObsVisitPrdNmView").text(result.RCPT_PRD_NM);
    			$("#callObsVisitEngrmView").text(result.RCPT_ENGR_NM);
    			$("#callObsVisitAreaNmView").text(result.ASP_PART_NM);
    			$("#callObsVisitContView").text(result.RCPT_CONT);
    			$("#callObsVisitCustNmView").text(result.RCPT_CUST_NM);
    			$("#callObsVisitObsDtTimeView").text(result.RCPT_DT+" "+result.RCPT_TIME);
    			//=> 장애원인
    			 MMSUtil.fnMakeObsRcptComboEtc($("#callObsVisitLv4"), "", result.RCPT_OBS_LV3, "", "장애원인", result.RCPT_OBS_LV4);
    			console.log(result);
    			 $("#callObsVisitView").show();
    			$("#callObsVisitGrid_wrap").hide();
    			 
//    			App.prcsEnd(); 
    			
    		}
    	});
    }
    
    
    //[Fn]Canvas 초기화
    function fnCanvasInit(){
		
    }
    //[Fn]Canvas Resize
	function resizeCanvas(){

		var ratio =  Math.max(window.devicePixelRatio || 1, 1);
		canvas.width = canvas.offsetWidth * ratio;
	//	console.log("canvas.width : "+canvas.width);
		canvas.height = canvas.offsetHeight * ratio;
	//	console.log("canvas.height : "+canvas.height);
		canvas.getContext("2d").scale(ratio, ratio);
		
		sign.clear();
	}

    
    //장애 접수 저장
    function fncallObsVisitSave(modFlag){
    	
        //접수정보 
    	
    	//장애코드
    	var rcptSeq = $("#callObsVisitSelectRcptSeq").val();
    	//장애처리코드
    	var rcptStsSeq = $("#callObsVisitSelectRcptStsSeq").val();
		
   	    if(rcptStsSeq =="" && modFlag =="UPDATE"){
   	    	alert("잘못된 처리현황입니다.");
   	    	return;
   	    }
		
		//처리구분
		var rcptStsType = $("#callObsVisitType").val();
		//담당자
		var rcptStsEngr = $("#callObsVisitEngr").val();
		var rcptStsEngrSeq = $("#callObsStsPopupEngrID").val();	
		var rcptStsEngrNm = $("#callObsStsPopupEngrNm").val();	
		
		//유무상
		var rcptStsCostType = $("#callObsVisitCostType").val();
		//입금여부
		var rcptStsDpstYn = $("#callObsVisitDpstYn").val();
		//입금일
		var rcptStsCostDt = $("#callObsVisitCostDt").val();
		//입금자
		var rcptStsDpstNm = $("#callObsVisitDpstNm").val();
		//유상금액
		var rcptStsCost = $("#callObsVisitCost").val();
		//방문일자
		var rcptStsVisitDt = $("#callObsVisitVisitDt").val();		
		//방문시간
		var rcptStsVisitTime = $("#callObsVisitVisitTime").val();	
		//처리일자
		var rcptStsDt = $("#callObsVisitDt").val();
		//처리시간
		var rcptStsTime = $("#callObsVisitTime").val();
		//처리내용
		var rcptStsCont = $("#callObsVisitCont").val();
		//처리최종
		var rcptLastYn  = $("#callObsVisitLastYn").val();

		var signPath = $("#signSaveFileWebPath").val();
		var signNm = $("#signSaveFileWebName").val();
		
		
		if(rcptStsType =="" ){
			alert("처리상태을 선택해주세요.");
			$("#callObsVisitType").focus();
			return;
		}else if(rcptStsDt =="" ){
			alert("완료일시를 입력해주세요.");
			$("#callObsVisitDt").focus();
			return;
		}else if(rcptStsTime =="" ){
			alert("완료시간을 입력해주세요.");
			$("#rcptStsTime").focus();
			return;
		}else if(rcptStsCostType == "02" && rcptStsCost == ""){
	    	alert("유상처리일경우 금액을 입력해주세요.");
	    	$("#callObsVisitCost").focus();
	    	return;
		}else if(rcptStsCont =="" ){
			alert("완료내용을 입력해주세요.");
			$("#callObsVisitCont").focus();
			return;
		}
		
		//별도 장애원인 접수 현황 처리
		var array_info = ['100', '110', '120', '140'];
		var obsStsLv4 = $("#callObsVisitLv4").val();
		if($.inArray($("#callObsVisitType").val(), array_info) > -1){ 
			if(!obsStsLv4){
				alert("장애원인을 입력해주세요.");
				$("#callObsVisitLv4").focus();	
				return;
			}
		}
		var array_info = ['120', '130'];		
		if($.inArray($("#callObsVisitType").val(), array_info) > -1){ 	
			if(!rcptStsVisitDt){
				alert("방문일를 입력해주세요.");	
				$("#callObsVisitVisitDt").focus();	
				return;				
			}
			if(!rcptStsVisitTime){
				alert("방문시간을 입력해주세요.");	
				$("#callObsVisitVisitTime").focus();	
				return;				
			}
		}
		
		if(modFlag =="INSERT"){
			if(!confirm("장애처리 내용을 저장하시겠습니까?")){
				return;
			}
		}else{
			if(!confirm("장애처리 수정내용을 저장하시겠습니까?")){
				return;
			}
		}
		var saveObsData = {
			
			modFlag  	: modFlag ,
			rcptSeq  	: rcptSeq ,
			rcptStsEngr  : rcptStsEngr ,
			rcptStsEngrSeq  : rcptStsEngrSeq ,
			rcptStsEngrNm   : rcptStsEngrNm  ,			
			areaCd   	 : getEngr.AREA_CD, 
			rcptStsSeq   : rcptStsSeq ,
			rcptStsType  : rcptStsType ,
			rcptStsVisitDt  : rcptStsVisitDt,
			rcptStsVisitTime  : rcptStsVisitTime,			
			rcptStsDt    : rcptStsDt   ,
			rcptStsTime  : rcptStsTime ,
			rcptStsCont  : rcptStsCont ,
			obsStsLv4    : obsStsLv4,
			
			rcptStsCost  	: rcptStsCost ,
			rcptStsCostType : rcptStsCostType ,
			rcptStsDpstYn   : rcptStsDpstYn ,
			rcptStsCostDt   : rcptStsCostDt ,
			rcptStsDpstNm   : rcptStsDpstNm ,
			rcptLastYn      : rcptLastYn,
			signPath   	: signPath, 
			signNm   	: signNm, 
		};
//    	return;
    	$.ajax({
    		url : "/ctrl/call/obstacle/status/saveObsSts",
    		data :saveObsData,
    		type : "POST",
    		dataType : "json",
    		cache: false,
    		success : function(result) {
    			var focusRowId = $callObsVisitGrid.focusRowId();
    			if(result.stsCd == 100){
    				fnObsStsGridSearch();
    				$callObsVisitHistGrid.paragonGridSearch({
    					rcptSeq : rcptSeq
    				});
    				if(modFlag =="UPDATE"){

    		    		$("#callObsVisitType").val("");
    		        	$("#callObsVisitCostType").val("");
    		        	$("#callObsVisitDpstYn").val("");
    		        	$("#callObsVisitCostDt").val("");        	
    		        	$("#callObsVisitDpstNm").val("");
    		        	$("#callObsVisitCost").val("");
    		        	$("#callObsVisitDt").datepicker('setDate', Util.LocalDate());
    		        	$("#callObsVisitTime").val(Util.LocalTime(24));
    		        	$("#callObsVisitCont").val("");
    		    		
    		        	//웹 모드
    					//$("#callObsVisitSaveWebBtn").show();
    					$("#callObsVisitModSaveWebBtn").hide();
    					$("#callObsVisitModCancelWebBtn").hide();
    					
    					//모바일 모드
    					$("#callObsVisitSaveMobileBtn").show();
    					$("#callObsVisitSaveCancelMobileBtn").show();
    					$("#callObsVisitModSaveMobileBtn").hide();
    					$("#callObsVisitModCancelMobileBtn").hide();
    				}
    			}
    			$("#callObsVisitView").show();
    			$("#callObsVisitStsView").hide();
    			$("#callObsVisitSaveWebBtn").hide();
    			alert(result.msgTxt);
    		}
    	});
    }
    
    //회사 콤보박스 생성
    function fnMakeSerchCompCombo() {
		$.ajax({
			url : "/ctrl/standard/company/listCompany",
			type : "POST",
			dataType : "json",
			data :{"callYn":"Y"},
			cache : false,
			success : function(result) {
				var json = result.dt_grid;
				var targetEl = $("#callObsVisitCompSearch");
				targetEl.combobox({inMode:true});
				targetEl.html("");
				var option = $("<option value='' />");
				option.text("회사명")
				targetEl.append(option);
				for (var i = 0; i < json.length; i++) {
					var thisValue = json[i].COMP_CD;
					var thisName = json[i].COMP_NM;
					var option = $("<option>", {
						value : thisValue
					});
					option.text(thisName)
					targetEl.append(option);
				}
				targetEl.data('combobox').refresh();
			}
		});
	}

    function EngrInfo(selEngrID){
        var rtn = null;
		var getData = { 
						user_type :  2,
						EngrID : selEngrID,
			};	
		$.ajax({
			url : "/ctrl/call/obstacle/receipt/EngrDeInfo",
			type : "POST",
			data : getData , 
			dataType : "json",
			async:false,
			cache: false,
			success : function(result) {
				var result = result.dt_grid;
				if(selEngrID){
				  if(result.length > 0){
				    $("#callObsStsPopupEngrNm").val(result[0].USER_NM);					
				    $("#callObsStsPopupEngrID").val(result[0].USER_SEQ);
				  }
				}else{
					  $("#callObsStsPopupEngrNm").val("");					
					  $("#callObsStsPopupEngrID").val("");					  
				}

				if(result.length == 0){
				  var data = new Array({USER_SEQ:'', USER_NM:'', AREA_CD:''});	
				  result.push(data);
				  result = JSON.stringify(data);
				}

			    rtn = result[0];
			}
		});
		return rtn;
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
    	$("#obsRcptDate").val(Util.LocalDate());
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
		$("#obsSelectStrAddr1").text("("+result.ZIP_CD+")"+result.ADDR1);
		$("#obsSelectStrAddr2").text(result.ADDR2+" "+result.ADDR_EXT);
		$("#obsSelectStrArea").text(result.AREA_NM);
    }
    //회사 파일등록 팝업
    function fnPopNewCompFile(){
		var compCd = $("#callObsVisitSelectCompCd").val();
		if($.trim(compCd) == ""){
			alert("접수정보를 선택해주세요.");
			return;
		}
		var form = $("<div/>");
		var file = $("<input type='file' />",{id:"compNewFile"});
		var filePathVal = $("<input type='hidden' id='compNewFileWebPath' />");
		var fileNameVal = $("<input type='hidden'  id='compNewFileWebName'/>");
		var viewForm = $("<div />",{id:"compNewFilePrevView","class":"min-height-200 p-5"});
		form.append(file);
		form.append(filePathVal);
		form.append(fileNameVal);
		form.append(viewForm);
		
		
		// 선택파일 미리 보기
		file.change(function(){
			
			var input = $(this);       		
    		
        	var infiles = input[0].files;
			var formData = new FormData();
			
        	if(infiles.length > 0) {
        		for (var i = 0; i < infiles.length; i++) {
	        		var addfile = infiles[i];
	        		var fileNm = addfile.name;
	        		var fsize = addfile.size;
	        		formData.append('files',addfile);
        		}
        	}else{
        		alert("선택된 파일이 없습니다.");
        		return;
        	}
        	$.ajax({
        		url : "/ctrl/call/obstacle/status/saveCompFile",
        		data : formData,
        		type : "POST",
        		dataType : "json",
        		cache: false,
                contentType: false,
                processData: false,
        		success : function(data) {
        			var imgList = data.dt_saveFileInfo;
        			for (var i = 0; i < imgList.length; i++) {
        				$("#compNewFilePrevView").html('<img src="'+imgList[i].webPath+'" data-img="'+imgList[i].webPath+'" alt="" class="superbox-img" />')
        				$("#compNewFileWebPath").val(imgList[i].webPath);
    					$("#compNewFileWebName").val(imgList[i].fileName);
					}
        		}
        	}); 
		});
		// 파일 등록창 띄우기
		PopApp.paragonOpenPopup({
			id : 'callObsVisitCompFileAdd',
			width : '360px',
			btnName : "저장",
			title : "증빙서류 등록",
			body:form,
			onload : function(modal) {
				modal.show();
			},
			click:function(){
				var webPath = $("#compNewFileWebPath").val();
				var webName = $("#compNewFileWebName").val();
				var compCd = $("#callObsVisitSelectCompCd").val();
				if(webPath == "") {
	        		alert("선택된 파일이 없습니다.");
	        		return;
	        	}
				if(compCd == "") {
					alert("선택된 접수정보가 없습니다.");
					return;
				}
				var saveCompData={
						webName : webName,
						webPath : webPath,
						compCd : compCd
				}
				// 등록 파일 최종 저장
				$.ajax({
		    		url : "/ctrl/standard/company/updateCompFile",
		    		data :saveCompData,
		    		type : "POST",
		    		dataType : "json",
		    		cache: false,
		    		success : function(result) {
		    			
		    			// 상세정보 미리보기 버튼 생성
		    			if(result.stsCd == 100){
		    				var prevBtn = $('<i title="미리보기" class="fa fa-search cursor-pointer"></i>');
		    				prevBtn.click(function(){
		    					
		    					var form = $("<div/>");
		    					var viewForm = $("<div />",{id:"compNewFilePrevView","class":"min-height-200 p-5"});
		    					viewForm.append('<img src="'+webPath+'" data-img="'+webPath+'" alt="'+webName+'" class="superbox-img" />')
		    					form.append(viewForm);
		    					
		    					PopApp.paragonOpenWindow({
		    						id : 'callObsVisitCompFileView',
		    						width : '360px',
		    						title : "증빙서류",
		    						body:form,
		    						onload : function(modal) {
		    							modal.show();
		    						}

		    					});
		    				});
		    				$("#callObsVisitCompFileNmView").html(webName+" ");
		        			$("#callObsVisitCompFileNmView").append(prevBtn);
		        			alert(result.msgTxt);
		        			$("#callObsVisitCompFileAdd").paragonClosePopup();
		        			
		    			}
		    		}
		    	});
			}

		});
	}

    function fnSaveSign(){
		var dataURL = sign.toDataURL();	// toDataURL()의 Mime Type은 image/png
		// dataURL로 저장을 할려고 하였으나 argument mismatch가 발생을 하여 Blob으로 변환 하여 파일 업로드 진행함.
		var blob = dataURItoBlob(dataURL);
		var formData = new FormData();
		// Blob으로 변환할 때 이미지 파일 명이 없어 강제로 image0.png 하드 코딩함.
		formData.append('files',blob,"image0.png");
		
		$.ajax({
			url : "/ctrl/call/obstacle/status/saveReptSign",
    		data : formData,
    		type : "POST",
    		dataType : "json",
    		cache: false,
            contentType: false,
            processData: false,
			success: function (result) {
	    		$("#visit-signature-pad").hide();
				
				var imgList = result.dt_saveFileInfo;
				$("#resultFileInfo").val($("#resultFileInfo").val()+"\nfileSize : "+imgList.length+"\n");
				for (var i = 0; i < imgList.length; i++) {
			//		$("#signSaveFilePrevView").html('<img src="'+imgList[i].webPath+'" data-img="'+imgList[i].webPath+'" alt="" class="superbox-img" />')
					$("#signSaveFileWebPath").val(imgList[i].webPath);
					$("#signSaveFileWebName").val(imgList[i].fileName);
					$("#resultFileInfo").val($("#resultFileInfo").val()+imgList[i].webPath+"\n");
					$("#resultFileInfo").val($("#resultFileInfo").val()+imgList[i].fileName+"\n");
				}
				var prevBtn = $('<i title="미리보기" class="fa fa-search cursor-pointer"></i>');
				var webName = $("#signSaveFileWebName").val();
				var webPath = $("#signSaveFileWebPath").val();
				prevBtn.click(function(){
					var form = $("<div/>");
					var viewForm = $("<div />",{id:"signSaveFilePrevView","class":"min-height-200 p-5"});
					viewForm.append('<img src="'+webPath+'" data-img="'+webPath+'" alt="'+webName+'" class="superbox-img" />')
					form.append(viewForm);
					
					PopApp.paragonOpenWindow({
						id : 'callObsStsSighFileView',
						width : '500px',
						title : "서명확인",
						body:form,
						onload : function(modal) {
							modal.show();
						}
					
					});
				});
				//$("#callObsStsSighFileNmView").html(webName+" ");
				$("#callObsVisitSighFileNmView").append(prevBtn);
				
			}
		});
    }
    
  //[Fn] dataURL -> Blob으로 변환
    function dataURItoBlob(dataURI) {
    	var byteString;
    	if(dataURI.split(',')[0].indexOf('base64') >= 0){
    		byteString = atob(dataURI.split(',')[1]);
    	}
    	else{
    		byteString = unescape(dataURI.split(',')[1]);
    	}
    	
    	var mimeTypeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    	console.log("mimetype : "+mimeTypeString);
    	var ia = new Uint8Array(byteString.length);
    	for (var i = 0; i < byteString.length; i++) {
    		ia[i] = byteString.charCodeAt(i);
    	}
    	
    	return new Blob([ia], {type:mimeTypeString});
    }    
    function fnPopNewSignFile(){
       	$('#visit-signature-pad').show();
		resizeCanvas();
    }
    
}();

$(document).ready(function() {
	App.setSlimScroll();
	ObsRcptStsApp.init();
});
