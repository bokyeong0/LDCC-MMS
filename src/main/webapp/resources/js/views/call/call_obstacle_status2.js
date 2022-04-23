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
function fnAppFileUpload(message, obj){
	try {
    	var jsonString = decodeURI(obj);
		var data = $.parseJSON(jsonString);
		var flag = "";
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
		$("#callObsStsSighFileNmView").html(webName+" ");
		$("#callObsStsSighFileNmView").append(prevBtn);
	} catch (e) {
//		$("#resultFileInfo").val("ERROR2 : "+e);
	}
};


var ObsRcptStsApp = function () {
	"use strict";
	
	
	// [El]자산정보 그리드
	var $callObsStsGrid = $("#callObsStsGrid");
	var $callObsStsHistGrid = $("#callObsStsHistGrid");
	var userInfo = Util.getUserInfo();
	var userNo = userInfo.s_userNo;
    return {

    	RcptView: function (rcptSeq) {
    		fnGetObsRcptView(rcptSeq);
    		$callObsStsGrid.paragonGridReload();
    	},
        init: function () {
        	//이벤트 생성
        	fnObsStatusEvent();
        	//그리드 생성
        	fnObsStsMakeGrid();
        	
        	
//        	PopApp.paragonOpenPopup({
//				ajaxUrl : '/ctrl/call/obstacle/status/obstacleStatusAstPopupMove',
//				id : 'obstacleStatusRcptPopup',
//				width : '800px',
//				btnName : "수정",
//				title : "장애처리수정",
//				onload : function(modal) {
//					modal.show();
//				}
//
//			});
        	
//        	PopApp.paragonOpenPopup({
//        		ajaxUrl : '/ctrl/call/obstacle/status/obstacleStatusRcptPopupMove',
//        		id : 'obstacleStatusRcptPopup',
//        		width : '800px',
//        		btnName : "수정",
//        		title : "장애등록",
//        		onload : function(modal) {
//        			modal.show();
//        		}
//        	
//        	});
//        	
        	
	    }
    };
    
    
    //[Fn] 이벤트 
    function fnObsStatusEvent(){
    	$("#callObsStsLv4Search").combobox({inMode:true,searchMode:true});
    	$("#callObsStsModSaveWebBtn").hide();
		$("#callObsStsModCancelWebBtn").hide();
		
		$("#callObsStsModSaveMobileBtn").hide();
		$("#callObsStsModCancelMobileBtn").hide();
		
		fnGetUserNameList();
    	//장애분류  Lv4 콤보박스 생성(값이 없어도 리셋안되도록 nonReset:true ,(일반콤보박스처럼)inMode:true,(멀티searchForm일경우)searchMode:true)
    	$("#callObsStsEngrSearch").combobox({inMode:true,searchMode:true});
    	
    	MMSUtil.fnMakeEngrCombo($("#callObsStsEngrSearch"),{areaSeq:""},"");
    	//권역 콤보박스 생성
    	MMSUtil.fnMakeAreaCombo($("#callObsStsAreaSearch"));
    	
    	MMSUtil.fnMakeEngrCombo($("#callObsStsEngr"),{areaSeq:""});
    	//권역 변경
		$("#callObsStsAreaSearch").change(function(){
			var selectVal = $(this).val();
			MMSUtil.fnMakeEngrCombo($("#callObsStsEngrSearch"),{areaSeq:selectVal});
		});
		$("#callObsStsPopupArea").change(function(){
//			$("#obsStrSearchNm").focus();
			var selectVal = $(this).val();
			if(selectVal != ""){
				MMSUtil.fnMakeEngrCombo($("#callObsStsPopupEngr"),{areaSeq:selectVal});
			}
		});
    	
		//권역 콤보박스 생성
    	MMSUtil.fnMakeAreaCombo($("#callObsStsArea"));
    	//공통코드 콤보박스 생성(처리구분)
    	MMSUtil.fnMakeCommCombo($("#callObsStsTypeSearch, #callObsStsType"),"OS0001","","선택");
    	//공통코드 콤보박스 생성(유상구분)
    	MMSUtil.fnMakeCommCombo($("#callObsStsCostTypeSearch"),"OS0002","","선택");
    	MMSUtil.fnMakeCommCombo($("#callObsStsCostType"),"OS0002","","");
    	
    	$("#callObsStsRcptDateForm").datepicker({todayHighlight: true, autoclose: true,clearBtn:true});
    	
    	//장애분류 이벤트
		MMSUtil.fnObsRcptComboBox({
			compCdId 	 : "#callObsStsCompSearch",
			obsRcptLv1Id : "#callObsStsLv1Search",
			obsRcptLv2Id : "#callObsStsLv2Search",
			obsRcptLv3Id : "#callObsStsLv3Search",
			obsRcptLv4Id : "#callObsStsLv4Search",
		});
		
    	//회사 콤보박스 생성
		fnMakeSerchCompCombo();
		
		
		//회사변경시 회사별 장애 분류 조회
		$("#callObsStsCompSearch").change(function() {
			var compCd = $(this).val();
			MMSUtil.fnMakeObsRcptCombo($("#callObsStsLv1Search"), compCd, "", "", "대분류");
		});
		
		//검색버튼
		$("#callObsStsSearchWebBtn ,#callObsStsSearchMobileBtn ").click(function(){
			if(fnObsStsModCheck()){
				
			}
			fnObsSelectedClear();
			fnObsStsGridSearch();
		});
		//접수번호 Site명 엔터 검색
		$("#callObsStsRcptNoSearch , #callObsStsStrNmSearch, #callObsStsEngrSearch_input, #callObsRcptWriterNmSearch_input").enterEvent({
    		callBack:function(value){
    			fnObsStsGridSearch();
    		}
    	});
    	
    	//처리일자
    	$("#callObsStsDtForm").datepicker({todayHighlight: true,autoclose: true,clearBtn:true});
    	$("#callObsStsDt").datepicker('setDate', Util.LocalDate());
    	//처리시간
    	$("#callObsStsTime").timepicker({ showMeridian:false,clearBtn:true});
    	
    	//입금일
    	$("#callObsStsCostDtForm").datepicker({todayHighlight: true,autoclose: true,clearBtn:true});
    	//금액
    	$("#callObsStsCost").onlyMoney();
    	
    	//엔지니어 권역 변경
		$("#callObsStsArea").change(function(){
//			$("#obsStrSearchNm").focus();
			var selectVal = $(this).val();
			if(selectVal != ""){
				MMSUtil.fnMakeEngrCombo($("#callObsStsEngr"),{areaSeq:selectVal});
			}
		});
    	
    	//장애접수 수정
    	$("#callObsStsModBtn").click(function(){
    		var rcptSeq = $callObsStsGrid.focusRowData("RCPT_SEQ");
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
    	$("#callObsStsModCancelWebBtn,  #callObsStsModCancelMobileBtn").click(function(){
    		fnCallObsClear();
    		fnCallObsStsClear();
    		$callObsStsHistGrid.focusRemove();
    		$callObsStsHistGrid.removeClass("updateMod");
    		$("#callObsStsType").val("");
        	$("#callObsStsCostType").val("");
        	$("#callObsStsDpstYn").val("");
        	$("#callObsStsCostDt").val("");        	
        	$("#callObsStsDpstNm").val("");
        	$("#callObsStsCost").val("");
        	$("#callObsStsDt").datepicker('setDate', Util.LocalDate());
        	$("#callObsStsTime").val(Util.LocalTime(24));
        	$("#callObsStsCont").val("");
    		
        	//웹 모드
			$("#callObsStsSaveWebBtn").show();
			$("#callObsStsModSaveWebBtn").hide();
			$("#callObsStsModCancelWebBtn").hide();
			
			//모바일 모드
			$("#callObsStsSaveMobileBtn").show();
			$("#callObsStsModSaveMobileBtn").hide();
			$("#callObsStsModCancelMobileBtn").hide();
			
		});
    	
    	
    	
		// 장애처리 신규저장
		$("#callObsStsSaveWebBtn, #callObsStsSaveMobileBtn").click(function(){
			fncallObsStsSave("INSERT");
		});
		// 장애처리 수정저장
		$("#callObsStsModSaveWebBtn, #callObsStsModSaveMobileBtn").click(function(){
			fncallObsStsSave("UPDATE");
		});
		// 증빙서류 등록
		$("#callObsStsCompFileAddBtn").click(function(){
			fnPopNewCompFile();
		});
		// 사인등록
		$("#callObsStsSignFileAddBtn").click(function(){
			fnPopNewSignFile();
		});
    }
    
  //권역 목록 조회
    function fnGetUserNameList(){
    	$.ajax({
    		url : "/ctrl/settings/user/listUserName",
    		type : "POST",
    		success : function(result) {
    			var result = result.dt_grid;
    			Util.MakeSelectOptions($('#callObsRcptWriterNmSearch'), result, "", "선택");
    		}
    	});
    }
    
    // 장애 접수 검색
    function fnObsStsGridSearch(rowid) {
    	var stsRcptNoSearch 	= $("#callObsStsRcptNoSearch").val();
    	var stsStartDateSearch 	= $("#callObsStsRcptDateStartSearch").val();
    	var stsEndDateSearch 	= $("#callObsStsRcptDateEndSearch").val();
    	var stsTypeSearch 		= $("#callObsStsTypeSearch").val();
    	var stsCostTypeSearch 	= $("#callObsStsCostTypeSearch").val();
    	
    	var stsCompSearch 		= $("#callObsStsCompSearch").val();
    	var stsRcptLv1Search 	= $("#callObsStsLv1Search").val();
    	var stsRcptLv2Search 	= $("#callObsStsLv2Search").val();
    	var stsRcptLv3Search 	= $("#callObsStsLv3Search").val();
    	var stsRcptLv4Search 	= $("#callObsStsLv4Search").val();
    	
    	var stsAreaSearch 		= $("#callObsStsAreaSearch").val();
    	var stsEngrSearch 		= $("#callObsStsEngrSearch").val();
    	var stsStrNmSearch 		= $("#callObsStsStrNmSearch").val();
    	var stsWriterSearch 	= $("#callObsRcptWriterNmSearch").val();
    	
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
    			stsWriterSearch 	: stsWriterSearch 	,	
    	}
    	$callObsStsGrid.paragonGridSearch(searchData);
    	if(rowid){
    		$callObsStsGrid.focusToRow(rowid);
    	}
    }
   
    function fnObsStsMakeGrid(){
    	$callObsStsGrid.paragonGrid({
			url : '/ctrl/call/obstacle/receipt/listObsRept',
			rowEditable : false,
			sortable : true,
			height: "368px",
			postData : {stsEngrSearch:userNo},
			shrinkToFit: false,
//			rowClickFocus:true,
			rowNum: 10,
			rowList: [10, 20, 50,100],
			colNames :["RCPT_SEQ","STR_CD","AST_SEQ","접수번호","접수일","접수시간","접수자","경과 시간","회사","Site명","신고자","연락처","장애분류","담당자","처리상태","지역"],
			colModel : [ 
	            {align:"center",name : 'RCPT_SEQ',hidden:true}, 
	            {align:"center",name : 'STR_CD',hidden:true}, 
	            {align:"center",name : 'AST_SEQ',hidden:true}, 
				{width:"90px",align:"center",name : 'RCPT_NO'}, 
				{width:"70px",align:"center",name : 'RCPT_DT'}, 
				{width:"60px",align:"center",name : 'RCPT_TIME'}, 
				{width:"70px",align:"center",name : 'IN_USER_NM'}, 
				{width:"110px",align:"right",name : 'RCPT_CMPL_DT',classes:"p-r-15"}, 
				{width:"110px",align:"center",name : 'COMP_NM'}, 
				{width:"100px",align:"center",name : 'STR_NM'}, 
				{width:"60px",align:"center",name : 'RCPT_CUST_NM'}, 
				{width:"90px",align:"center",name : 'PHONE_NUM' }, 
				{width:"220px",align:"left",name : 'RCPT_OBS_NM'}, 
				{width:"60px",align:"center",name : 'RCPT_ENGR_NM'}, 
				{width:"70px",align:"center",name : 'RCPT_STS_NM'},
				{width:"70px",align:"center",name : 'AREA_NM'},
			],
			rownumbers : true,
			pager: "#callObsStsGridNavi",
            toolbar: [true,"top"],
            onSelectRowEvent : function(currRowData, prevRowData) {
            	var rcptSeq = currRowData.RCPT_SEQ
            	fnObsStsModCheck(rcptSeq);
//            	if($callObsStsHistGrid.hasClass("updateMod")){
//            		if(confirm("수정모드 입니다. 계속 진행 하시겠습니까?")){
//            			$callObsStsHistGrid.removeClass("updateMod");
//            			$callObsStsHistGrid.focusRemove();
//                		$("#callObsStsType").val("");
//                    	$("#callObsStsCostType").val("");
//                    	$("#callObsStsArea").val("");
//                    	$("#callObsStsEngr").val("");
//                    	$("#callObsStsDpstYn").val("");
//                    	$("#callObsStsCostDt").val("");        	
//                    	$("#callObsStsDpstNm").val("");
//                    	$("#callObsStsCost").val("");
//                    	$("#callObsStsDt").datepicker('setDate', Util.LocalDate());
//                    	$("#callObsStsTime").val(Util.LocalTime(24));
//                    	$("#callObsStsCont").val("");
//                		
//                    	//웹 모드
//            			$("#callObsStsSaveWebBtn").show();
//            			$("#callObsStsModSaveWebBtn").hide();
//            			$("#callObsStsModCancelWebBtn").hide();
//            			
//            			//모바일 모드
//            			$("#callObsStsSaveMobileBtn").show();
//            			$("#callObsStsModSaveMobileBtn").hide();
//            			$("#callObsStsModCancelMobileBtn").hide();
//            			$("#callObsStsSighFileNmView").html("");
//            		}else{
//            			return;
//            		}
//            	}
//            	fnGetObsRcptView(rcptSeq);
				//로우선택시 공통코드 목록 조회
			},
			ondblClickRow: function(id, iRow, iCol, e){
            	
            	var rcptSeq = $callObsStsGrid.getRowData( id ).RCPT_SEQ;
            	var astSeq = $callObsStsGrid.getRowData( id ).AST_SEQ;
            	var strCd = $callObsStsGrid.getRowData( id ).STR_CD;
				
				PopApp.paragonOpenPopup({
					ajaxUrl : '/ctrl/call/obstacle/status/obstacleStatusRcptPopupMove',
					id : 'callObsStsRcptModPopup',
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
        });
    	fnSetTopToolbar($("#t_callObsStsGrid"));
		
		
        /********************************************************************
         * 자산정보 그리드 생성
         * Since   : 2016-10-24
         * 작성자  : Kim Jin Ho
         * 수정내역: 
         ********************************************************************/
		$callObsStsHistGrid.paragonGrid({
			url: '/ctrl/call/obstacle/status/listObsSts',
			page : 1,
			sortable : true,
			hidegrid: false,
			height: "150px",
			rowHight : "S",
			firstData : false,
			shrinkToFit: false,
			
			colNames :["RCPT_STS_SEQ","RCPT_STS_COST_TYPE","RCPT_STS_TYPE","SIGN_PATH","SIGN_NM","RCPT_STS_ENGR","RCPT_STS_AREA_SEQ","RCPT_STS_DPST_YN","RCPT_STS_COST_DT","RCPT_STS_DPST_NM","RCPT_STS_COST","처리일","처리시간","처리내용","처리구분","담당지역","담당자","유무상","서명","선택"],
			colModel : [ 
				{width:"100px",name : 'RCPT_STS_SEQ', hidden : true}, 
				{width:"100px",name : 'RCPT_STS_TYPE', hidden:true},		
				{width:"100px",name : 'RCPT_STS_COST_TYPE', hidden : true},		
				{width:"100px",name : 'SIGN_PATH', hidden : true},		
				{width:"100px",name : 'SIGN_NM', hidden : true},		
				{width:"80px",name : 'RCPT_STS_ENGR', hidden:true},			
				{width:"80px",name : 'RCPT_STS_AREA_SEQ', hidden:true},	
				{width:"80px",name : 'RCPT_STS_DPST_YN', hidden:true},	
				{width:"80px",name : 'RCPT_STS_COST_DT', hidden:true},	
				{width:"80px",name : 'RCPT_STS_DPST_NM', hidden:true},	
				{width:"80px",name : 'RCPT_STS_COST', hidden:true},	
				{width:"80px",name : 'RCPT_STS_DT', align:"center"},			
				{width:"60px",name : 'RCPT_STS_TIME', align:"center"},				
				{width:"300px",name : 'RCPT_STS_CONT', align:"left"},			
				{width:"80px",name : 'RCPT_STS_TYPE_NM', align:"center"},		
				{width:"120px",name : 'AREA_NM', align:"center"},			
				{width:"80px",name : 'RCPT_STS_ENGR_NM', align:"center"},			
				{width:"80px",name : 'RCPT_STS_COST_TYPE_NM', align:"center"},		
				{width:"100px",editable: false,align:"center",name:'SIGH_CKECK',formatter:inMakePrevBution},
				{width:"100px",editable: false,align:"center",name:'EVENT',formatter:inMakeActionBution}
			],
			loadonce : true,
			caption : "처리현황",
			rownumbers : true,
//			onSelectRowEvent : function(currRowData, prevRowData) {
//				var codeGroupCd = currRowData.RCPT_STS_SEQ
//				$("#callObsStsSaveWebBtn").hide();
//				$("#callObsStsModSaveWebBtn").show();
//				$("#callObsStsModCancelWebBtn").show();
//			},
		});
		//[FN] 선택버튼생성
		function inMakePrevBution(cellvalue, options, rowObject) {
			var reLoadButton ='-';
			if(cellvalue == 'Y'){
				reLoadButton = '<button type="button" class="btn btn-info btn-xs m-r-5 select-prev-btn" value="'+(options.rowId)+'" > <i class="fa fa-search " ><i/> 보기</button>';
			}
			return reLoadButton;
		}
		$callObsStsHistGrid.find('.select-prev-btn').off().live('click', function (e) {
			e.stopPropagation();
			var rowData = $callObsStsHistGrid.getRowData($(this).val());
			var filePath = rowData.SIGN_PATH;
			var fileName = rowData.SIGN_NM;
			var form = $("<div/>");
			var viewForm = $("<div />",{id:"compNewFilePrevView","class":"min-height-200 p-5"});
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
		function inMakeActionBution(cellvalue, options, rowObject) {
            var reLoadButton = '<button type="button" class="btn btn-warning btn-xs m-r-5 select-mod-btn" value="'+(options.rowId)+'" >수정</button>';
            reLoadButton += ' <button type="button" class="btn btn-danger btn-xs m-r-5 select-cancel-btn" value="'+(options.rowId)+'" >취소</button>';
            return reLoadButton;
		}
		$callObsStsHistGrid.find('.select-mod-btn').off().live('click', function (e) {
        	e.stopPropagation();
        	var rowData = $callObsStsHistGrid.getRowData($(this).val());
        	$callObsStsHistGrid.focusToRow();
        	$callObsStsHistGrid.addClass("updateMod");
        	$("#callObsStsSelectRcptStsSeq").val(rowData.RCPT_STS_SEQ);
        	$("#callObsStsType").val(rowData.RCPT_STS_TYPE);
        	$("#callObsStsCostType").val(rowData.RCPT_STS_COST_TYPE);
        	$("#callObsStsArea").val(rowData.RCPT_STS_AREA_SEQ);
        	$("#callObsStsEngr").val(rowData.RCPT_STS_ENGR);
        	
        	
        	$("#callObsStsDpstYn").val(rowData.RCPT_STS_DPST_YN);
        	$("#callObsStsCostDt").val(rowData.RCPT_STS_COST_DT);        	
        	$("#callObsStsDpstNm").val(rowData.RCPT_STS_DPST_NM);
        	$("#callObsStsCost").val(rowData.RCPT_STS_COST);
        	$("#callObsStsDt").val(rowData.RCPT_STS_DT);
        	$("#callObsStsTime").val(rowData.RCPT_STS_TIME);
        	$("#callObsStsCont").val(rowData.RCPT_STS_CONT);
        	
        	$("#callObsStsSaveWebBtn").hide();
			$("#callObsStsModSaveWebBtn").show();
			$("#callObsStsModCancelWebBtn").show();
			
			$("#callObsStsSaveMobileBtn").hide();
			$("#callObsStsModSaveMobileBtn").show();
			$("#callObsStsModCancelMobileBtn").show();
			
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
						id : 'callObsStsSighFileView',
						width : '500px',
						title : "서명확인",
						body:form,
						onload : function(modal) {
							modal.show();
						}
					
					});
				});
				$("#callObsStsSighFileNmView").html(webName+" ");
				$("#callObsStsSighFileNmView").append(prevBtn);
			}
			
        });
		$callObsStsHistGrid.find('.select-cancel-btn').off().live('click', function (e) {
			e.stopPropagation();
			fnObsStsSelectedClear();
//			$callObsStsHistGrid.focusRemove();
//			$callObsStsHistGrid.removeClass("updateMod");
//    		$("#callObsStsType").val("");
//        	$("#callObsStsCostType").val("");
//        	$("#callObsStsArea").val("");
//        	$("#callObsStsEngr").val("");
//        	$("#callObsStsDpstYn").val("");
//        	$("#callObsStsCostDt").val("");        	
//        	$("#callObsStsDpstNm").val("");
//        	$("#callObsStsCost").val("");
//        	$("#callObsStsDt").datepicker('setDate', Util.LocalDate());
//        	$("#callObsStsTime").val(Util.LocalTime(24));
//        	$("#callObsStsCont").val("");
//    		
//        	//웹 모드
//			$("#callObsStsSaveWebBtn").show();
//			$("#callObsStsModSaveWebBtn").hide();
//			$("#callObsStsModCancelWebBtn").hide();
//			
//			//모바일 모드
//			$("#callObsStsSaveMobileBtn").show();
//			$("#callObsStsModSaveMobileBtn").hide();
//			$("#callObsStsModCancelMobileBtn").hide();
//			$("#callObsStsSighFileNmView").html("");
		});
    }
    
   
    function fnSetTopToolbar(target){
    	target.addClass("form-inline");
		target.append('<div class="form-group"><div class="input-group input-group-sm mini"><span class="span-info  input-group-addon">총</span><input type="text" class="form-control text-right" size="4" value="12,115" ></div></div>');
		target.append('<div class="form-group"><div class="input-group input-group-sm mini"><span class="span-success  input-group-addon">완료</span><input type="text" class="form-control text-right" size="4" value="9,912" ></div></div>');
		target.append('<div class="form-group"><div class="input-group input-group-sm mini"><span class="span-warning  input-group-addon">처리중</span><input type="text" class="form-control text-right" size="4" value="335" ></div></div>');
		target.append('<div class="form-group"><div class="input-group input-group-sm mini"><span class="span-inverse  input-group-addon">유/무상</span><input type="text" class="form-control text-right" size="6" value="10 / 321" ></div></div>');
		var todaySt ='';
			todaySt +='<div class="form-group pull-right">';
		    todaySt +='<div class="input-group input-group-sm mini ">';
		    todaySt +='<span class="input-group-addon span-danger">오늘</span>';
			todaySt +='<div class="progress progress-striped   active m-b-0 width-xs ">';
			todaySt +='<div class="progress-bar progress-bar-success" style="width: 78%">78%</div>';
			todaySt +='</div>';
			todaySt +='</div>';
			todaySt +='</div>';
		target.append(todaySt); 
		var totalSt ='';
		totalSt +='<div class="form-group pull-right">';
		totalSt +='<div class="input-group input-group-sm mini  ">';
		totalSt +='<span class="input-group-addon span-danger">총</span>';
		totalSt +='<div class="progress progress-striped   active m-b-0 width-xs ">';
		totalSt +='<div class="progress-bar progress-bar-success" style="width: 98%">98%</div>';
		totalSt +='</div>';
		totalSt +='</div>';
		totalSt +='</div>'; 
		target.append(totalSt); 
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
				$callObsStsGrid.focusToRow();
				$callObsStsHistGrid.paragonGridSearch({
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
						id : 'callObsStsCompFileView',
						width : '500px',
						title : "증빙서류",
						body:form,
						onload : function(modal) {
							modal.show();
						}

					});
				});
				var sumCompNm = compNm+(brndNm ==""?" > ":" > "+brndNm+" > ")+strNm;
				$("#callObsStsSelectRcptSeq").val(rcptSeq);
				$("#callObsStsSelectCompCd").val(result.COMP_CD);
    			$("#callObsStsCompNmView").text(sumCompNm);
    			if(fileName != ""){
    				$("#callObsStsCompFileNmView").html(fileName+" ");
    				$("#callObsStsCompFileNmView").append(prevBtn);
    			}else{
    				$("#callObsStsCompFileNmView").html("");
    			}
    			$("#callObsStsObsNmView").text(result.RCPT_OBS_NM);
    			$("#callObsStsPrdNmView").text(result.RCPT_PRD_NM);
    			$("#callObsStsEngrmView").text(result.RCPT_ENGR_NM);
    			$("#callObsStsAreaNmView").text(result.AREA_NM);
    			$("#callObsStsContView").text(result.RCPT_CONT);
    			$("#callObsStsWriterNmView").text(result.IN_USER_NM);
    			$("#callObsStsCustInfoView").text(result.RCPT_CUST_INFO);
    			$("#callObsStsObsDtTimeView").text(result.RCPT_DT+" "+result.RCPT_TIME);
    		}
    	});
    }
    function fnObsStsModCheck(rcptSeq){
    	if($callObsStsHistGrid.hasClass("updateMod")){
    		if(confirm("수정모드 입니다. 계속 진행 하시겠습니까?")){
    			$callObsStsHistGrid.removeClass("updateMod");
    			$callObsStsHistGrid.focusRemove();
        		$("#callObsStsType").val("");
            	$("#callObsStsCostType").val("");
            	$("#callObsStsArea").val("");
            	$("#callObsStsEngr").val("");
            	$("#callObsStsDpstYn").val("");
            	$("#callObsStsCostDt").val("");        	
            	$("#callObsStsDpstNm").val("");
            	$("#callObsStsCost").val("");
            	$("#callObsStsDt").datepicker('setDate', Util.LocalDate());
            	$("#callObsStsTime").val(Util.LocalTime(24));
            	$("#callObsStsCont").val("");
        		
            	//웹 모드
    			$("#callObsStsSaveWebBtn").show();
    			$("#callObsStsModSaveWebBtn").hide();
    			$("#callObsStsModCancelWebBtn").hide();
    			
    			//모바일 모드
    			$("#callObsStsSaveMobileBtn").show();
    			$("#callObsStsModSaveMobileBtn").hide();
    			$("#callObsStsModCancelMobileBtn").hide();
    			$("#callObsStsSighFileNmView").html("");
    		}else{
    			return false;
    		}
    		fnGetObsRcptView(rcptSeq);
    	}
    }
    
    function fnObsSelectedClear(){
    	$('#callObsStsCompNmView').text("");
    	$('#callObsStsPrdNmView').text("");
    	$('#callObsStsObsNmView').text("");
    	$('#callObsStsWriterNmView').text("");
    	$('#callObsStsObsDtTimeView').text("");
    	$('#callObsStsWriterNmView').text("");
    	$('#callObsStsCustInfoView').text("");
    	$('#callObsStsCompFileNmView').val("");
    }
    function fnObsStsSelectedClear(){
    	$callObsStsHistGrid.focusRemove();
		$callObsStsHistGrid.removeClass("updateMod");
		$("#callObsStsType").val("");
    	$("#callObsStsCostType").val("");
    	$("#callObsStsArea").val("");
    	$("#callObsStsEngr").val("");
    	$("#callObsStsDpstYn").val("");
    	$("#callObsStsCostDt").val("");        	
    	$("#callObsStsDpstNm").val("");
    	$("#callObsStsCost").val("");
    	$("#callObsStsDt").datepicker('setDate', Util.LocalDate());
    	$("#callObsStsTime").val(Util.LocalTime(24));
    	$("#callObsStsCont").val("");
		
    	//웹 모드
		$("#callObsStsSaveWebBtn").show();
		$("#callObsStsModSaveWebBtn").hide();
		$("#callObsStsModCancelWebBtn").hide();
		
		//모바일 모드
		$("#callObsStsSaveMobileBtn").show();
		$("#callObsStsModSaveMobileBtn").hide();
		$("#callObsStsModCancelMobileBtn").hide();
		$("#callObsStsSighFileNmView").html("");
    }
    
    //장애 접수 저장
    function fncallObsStsSave(modFlag){
    	
        //접수정보 
    	
    	//장애코드
    	var rcptSeq = $("#callObsStsSelectRcptSeq").val();
    	//장애처리코드
    	var rcptStsSeq = $("#callObsStsSelectRcptStsSeq").val();
		
   	    if(rcptStsSeq =="" && modFlag =="UPDATE"){
   	    	alert("잘못된 처리현황입니다.");
   	    	return;
   	    }
		
		//처리구분
		var rcptStsType = $("#callObsStsType").val();
		//담당지역
		var areaSeq = $("#callObsStsArea").val();
		//담당자
		var rcptStsEngr = $("#callObsStsEngr").val();
		//유무상
		var rcptStsCostType = $("#callObsStsCostType").val();
		//입금여부
		var rcptStsDpstYn = $("#callObsStsDpstYn").val();
		//입금일
		var rcptStsCostDt = $("#callObsStsCostDt").val();
		//입금자
		var rcptStsDpstNm = $("#callObsStsDpstNm").val();
		//유상금액
		var rcptStsCost = $("#callObsStsCost").val();
		//처리일자
		var rcptStsDt = $("#callObsStsDt").val();
		//처리시간
		var rcptStsTime = $("#callObsStsTime").val();
		 
		//처리내용
		var rcptStsCont = $("#callObsStsCont").val();
		
		var signPath = $("#signSaveFileWebPath").val();
		var signNm = $("#signSaveFileWebName").val();
		
		
		if(rcptStsType =="" ){
			alert("처리구분을 선택해주세요.");
			$("#callObsStsType").focus();
			return;
		}else if(rcptStsDt =="" ){
			alert("처리일자를 입력해주세요.");
			$("#callObsStsDt").focus();
			return;
		}else if(rcptStsTime =="" ){
			alert("처리시간을 입력해주세요.");
			$("#rcptStsTime").focus();
			return;
		}else if(rcptStsCostType == "02" && rcptStsDpstYn == ""){
			alert("유상처리일경우 입금여부를 선택해주세요.");
			$("#callObsStsDpstYn").focus();
			return;
		}else if(rcptStsCostType == "02" && rcptStsCost == ""){
	    	alert("유상처리일경우 금액을 입력해주세요.");
	    	$("#callObsStsCost").focus();
	    	return;
		}else if(rcptStsCont =="" ){
			alert("처리내용을 입력해주세요.");
			$("#callObsStsCont").focus();
			return;
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
			areaSeq   	: areaSeq ,
			rcptStsEngr	: rcptStsEngr ,
			rcptStsSeq   : rcptStsSeq ,
			rcptStsType  : rcptStsType ,
			rcptStsDt    : rcptStsDt   ,
			rcptStsTime  : rcptStsTime ,
			rcptStsCont  : rcptStsCont ,
			
			rcptStsCost  	: rcptStsCost ,
			rcptStsCostType : rcptStsCostType ,
			rcptStsDpstYn   : rcptStsDpstYn ,
			rcptStsCostDt   : rcptStsCostDt ,
			rcptStsDpstNm   : rcptStsDpstNm ,
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
    			var focusRowId = $callObsStsGrid.focusRowId();
    			if(result.stsCd == 100){
    				fnObsStsGridSearch();
    				$callObsStsHistGrid.paragonGridSearch({
    					rcptSeq : rcptSeq
    				});
    				if(modFlag =="UPDATE"){

    		    		$("#callObsStsType").val("");
    		        	$("#callObsStsCostType").val("");
    		        	$("#callObsStsDpstYn").val("");
    		        	$("#callObsStsCostDt").val("");        	
    		        	$("#callObsStsDpstNm").val("");
    		        	$("#callObsStsCost").val("");
    		        	$("#callObsStsDt").datepicker('setDate', Util.LocalDate());
    		        	$("#callObsStsTime").val(Util.LocalTime(24));
    		        	$("#callObsStsCont").val("");
    		        	$("#callObsStsArea").val("");
    		        	$("#callObsStsEngr").val("");
    		    		
    		        	//웹 모드
    					$("#callObsStsSaveWebBtn").show();
    					$("#callObsStsModSaveWebBtn").hide();
    					$("#callObsStsModCancelWebBtn").hide();
    					
    					//모바일 모드
    					$("#callObsStsSaveMobileBtn").show();
    					$("#callObsStsModSaveMobileBtn").hide();
    					$("#callObsStsModCancelMobileBtn").hide();
    				}
    			}
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
				var targetEl = $("#callObsStsCompSearch");
				targetEl.combobox({inMode:true,searchMode:true});
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
    
    //장애처리 초기화
    function fnObsSelectedStsClear(){
    	$("#obsRcptStsType").val("");
    	$("#obsRcptStsFreeYn").val("");
    	$("#obsRcptStsDate").val(Util.LocalDate());
    	$("#obsRcptStsTime").val(Util.LocalTime(24));
    	$("#obsRcptStsCont").val("");
    }
    //접수정보 초기화
    function fnObsSelectedObsClear(){
    	$("#obsRcptCustNm").val("");
    	$("#obsRcptCont").val("");
    	$("#obsRcptArea").val("");
    	$("#obsRcptDate").val(Util.LocalDate());
    	$("#obsRcptTime").val(Util.LocalTime(24));
    	$("#obsRcptEngr").val("");
		//장애분류
		fnObsSelectedStndObsClear();
		//제품정보
		fnObsSelectedPrdClear();
    }
    //장애분류 초기화
    function fnObsSelectedStndObsClear(){
    	$("#obsRcptLv1").html('<option value="">대분류</option>');
    	$("#obsRcptLv2").html('<option value="">중분류</option>');
    	$("#obsRcptLv3").html('<option value="">소분류</option>');
    	$("#obsRcptLv4").html('<option value="">선택</option>');
    	$("#obsRcptLv4").data('combobox').refresh();
    	
    }
    //제품 초기화
    function fnObsSelectedPrdClear(){
    	$("#obsAutoPrdSearch").val("");
    	$("#obsAutoPrdType").val("");
		$("#obsAutoPrdMfr").val("");
		$("#obsAutoPrd").html('<option value="">제품</option>');
		$("#obsAutoPat").html('<option value="">파트</option>');
    }
    //장애이력 초기화
    function fnObsSelectedObsHistClear(){
    }
    //자산이력 초기화
    function fnObsSelectedAstHistClear(){
    }
    //Site 정보 초기화
    function fnObsSelectedStrClear(){
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
		var compCd = $("#callObsStsSelectCompCd").val();
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
			id : 'callObsStsCompFileAdd',
			width : '500px',
			btnName : "저장",
			title : "증빙서류 등록",
			body:form,
			onload : function(modal) {
				modal.show();
			},
			click:function(){
				var webPath = $("#compNewFileWebPath").val();
				var webName = $("#compNewFileWebName").val();
				var compCd = $("#callObsStsSelectCompCd").val();
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
		    						id : 'callObsStsCompFileView',
		    						width : '500px',
		    						title : "증빙서류",
		    						body:form,
		    						onload : function(modal) {
		    							modal.show();
		    						}

		    					});
		    				});
		    				$("#callObsStsCompFileNmView").html(webName+" ");
		        			$("#callObsStsCompFileNmView").append(prevBtn);
		        			alert(result.msgTxt);
		        			$("#callObsStsCompFileAdd").paragonClosePopup();
		        			
		    			}
		    		}
		    	});
			}

		});
	}
    function fnPopNewSignFile(){
    	if(Util.CheckOs() == "web"){
//    		alert("PC웹브라우저에서는 서명기능을 지원하지 않습니다.");
    		
    		var form = $("<div/>");
        	var file = $("<input type='file' />",{id:"compNewFile"});
//        	var filePathVal = $("<input type='hidden' id='compNewFileWebPath' />");
//        	var fileNameVal = $("<input type='hidden'  id='compNewFileWebName'/>");
        	var viewForm = $("<div />",{id:"signSaveFilePrevView","class":"min-height-200 p-5"});
        	form.append(file);
//        	form.append(filePathVal);
//        	form.append(fileNameVal);
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
        					$("#signSaveFilePrevView").html('<img src="'+imgList[i].webPath+'" data-img="'+imgList[i].webPath+'" alt="" class="superbox-img" />')
        					$("#signSaveFileWebPath").val(imgList[i].webPath);
        					$("#signSaveFileWebName").val(imgList[i].fileName);
        				}
        			}
        		}); 
        	});
        	// 파일 등록창 띄우기
        	PopApp.paragonOpenPopup({
        		id : 'callObsStsSignFileAdd',
        		width : '500px',
        		btnName : "완료",
        		title : "서명 등록",
        		body:form,
        		onload : function(modal) {
        			modal.show();
        		},
        		click:function(){
        			var webPath = $("#signSaveFileWebPath").val();
        			var webName = $("#signSaveFileWebName").val();
        			if(webPath != "") {
        				
        				var prevBtn = $('<i title="미리보기" class="fa fa-search cursor-pointer"></i>');
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
						$("#callObsStsSighFileNmView").html(webName+" ");
						$("#callObsStsSighFileNmView").append(prevBtn);
        			}
        			$("#callObsStsSignFileAdd").paragonClosePopup();
        		}
        		
        	});
    		
    	}else{
    		var callInfo = {};
    		callInfo.functionName = "onClick";
    		callInfo.callback = "fnAppFileUpload";
    		callInfo.fileUpladUrl = "/ctrl/call/obstacle/status/saveReptSign";
    		callInfo.args = "img";
    		callInfo.successMessage = "파일 전송 성공";
        	callInfo.failMessage = "파일 전송 실패";
        	var jsonString = JSON.stringify(callInfo);
        	console.log("jsonString : "+jsonString);
        	// encodeURI 사용 이유 : 한글 입력시 쓰레기 값이 포함되어 받게 되어서 encodeURI 이용하여 파라메터 전달
        	// [2017.11.03 신동철]
        	// android에서 서명 등록 버튼 클릭시 아무 반응이 없음.
        	// CheckOs() 추가
        	if (Util.CheckOs() == "ios"){
        		window.location="jscall://signViewCall&"+encodeURI(jsonString);// mmscall://id=aaa jscall://testMessage
        	}
        	else if (Util.CheckOs() == "android"){
        		window.ParagonApp.signViewCall(encodeURI(jsonString));
        	}
    	}
    	
    }
    
    
    
}();

$(document).ready(function() {
	App.setSlimScroll();
	ObsRcptStsApp.init();
});
