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
		//$("#callObsStsSighFileNmView").html(webName+" ");
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
	// 서명 등록 시(Javscript 용) 필요.
	// SignaturePad js가 로드 된 이 후 해당 Api를 불러야 오류가 나지 않음.
	var canvas = $('#signature-pad canvas')[0];
	var sign = new SignaturePad(canvas, {
		backgroundColor: 'rgb(255, 255, 255)'
	});
	var userInfo = Util.getUserInfo();
	var getEngr = null;
	var todayDate = new Date(Util.LocalDate());
    return {

    	RcptView: function (rcptSeq) {
    		fnGetObsRcptView(rcptSeq);
    		$callObsStsGrid.paragonGridReload();
    	},
    	RcptReload: function (rcptSeq) {
    		fnObsStsSelectedClear();
			fnObsSelectedClear();
    		$callObsStsGrid.paragonGridReload();
    	},   	
        init: function () {
        	//이벤트 생성
        	fnObsStatusEvent();
        	//그리드 생성
        	fnObsStsMakeGrid();
        	//Canvas 초기화
        	fnCanvasInit();
    		$("#signature-pad").hide();
	    }
    };
    
    
    //[Fn] 이벤트 
    function fnObsStatusEvent(){
 //   	$("#callObsStsBrndNmSearch").combobox({inMode:true,searchMode:true}); //브랜드검색 자동완성
 //   	$("#callObsStsStrNmSearch").combobox({inMode:true,searchMode:true}); //점포검색 자동완성
    	$("#callObsStsLv4Search").combobox({inMode:true}); //장애원인 검색 자동완성
    //	$("#callObsStsLv4").combobox({inMode:true}); //장애원인 자동완성
    	$("#callObsStsModSaveWebBtn").hide();
		$("#callObsStsModCancelWebBtn").hide();
		
		$("#callObsStsModSaveMobileBtn").hide();
		$("#callObsStsModCancelMobileBtn").hide();
		
		$("#callObsStsDpstYn, #callObsStsCostDt, #callObsStsDpstNm, #callObsStsCost").prop("disabled",true);
		
		$("#callObsStsCostType").change(function(){
			var selectVal = $(this).val();
			if(selectVal == "01"){
				$("#callObsStsDpstYn, #callObsStsCostDt, #callObsStsDpstNm, #callObsStsCost").val("");
				$("#callObsStsDpstYn, #callObsStsCostDt, #callObsStsDpstNm, #callObsStsCost").prop("disabled",true);
			}else{
				$("#callObsStsDpstYn, #callObsStsCostDt, #callObsStsDpstNm, #callObsStsCost").prop("disabled",false);
			}
		});

		fnGetFieldput();	
		fnGetUserNameList();

		//고객사선택
		$("#callObsStsCompSearch").change(function(){
			$("#callObsStsBrndNmSearch").html("<option value=''>브랜드명</option>");
			$("#callObsStsStrNmSearch").val("");	
		//	$("#callObsStsBrndNmSearch").data('combobox').refresh();
			fnGetBrndNameList($(this).val());
		});
		
		//브랜드선택
		$("#callObsStsBrndNmSearch").change(function(){
			$("#callObsStsStrNmSearch").val("");	
    		var compCd = $("#callObsStsCompSearch").val();
    		var brndCd = $("#callObsStsBrndNmSearch").val();
    	//	fnListAutoStrNm(compCd, brndCd);
    		MMSUtil.fnMakeStrCombo($("#callObsStsStrNmSearch"), compCd, brndCd, '선택');
		});

		
    	//검색 콤보박스 생성 [파트너사 지정]
	   	(userInfo.s_userType == 2)? $("#obsRctStsPaterSearch").attr('disabled','true'):"";		
    	MMSUtil.fnMakePartnerCombo($("#obsRctStsPaterSearch"),userInfo.s_companyCd);
    	//검색 콤보박스 생성 [파트너사 지역 정보]
    	if(userInfo.s_authSeq != "200" && userInfo.s_areaCd){
    		$("#callObsStsPartSearch").prop('disabled','disabled');
    	}
    	MMSUtil.fnMakeAreaCombo($("#callObsStsPartSearch"), userInfo.s_areaCd, userInfo.s_companyCd, false, true);
    	
    	$("#callObsStsEngrSearch").combobox({inMode:true});  //담당엔지니어 자동완성
    	MMSUtil.fnMakeEngrCombo($("#callObsStsEngrSearch"),{areaCd:userInfo.s_areaCd, aspCompCd:userInfo.s_companyCd},"");  //담당엔지니어
    
    	$("#callObsRcptWriterNmSearch").combobox({inMode:true});  //접수자 자동완성
    	MMSUtil.fnMakeEngrCombo($("#callObsRcptWriterNmSearch"),{areaCd:userInfo.s_areaCd, aspCompCd:userInfo.s_companyCd},"");  //접수자		
    
    	//부서 변경 
		$("#obsRctStsPaterSearch").change(function(){  	
			var selectVal = $(this).val();
			MMSUtil.fnMakeAreaCombo($("#callObsStsPartSearch"),'', selectVal, false,  true);
			MMSUtil.fnMakeEngrCombo($("#callObsStsEngrSearch"),{areaCd:'', aspCompCd:selectVal});
			MMSUtil.fnMakeEngrCombo($("#callObsRcptWriterNmSearch"),{areaCd:'', aspCompCd:selectVal});
		}); 	
    	
    	
    	//엔지니어 변경
		$("#callObsStsPartSearch").change(function(){
			var selectVal = $(this).val();	
	    	MMSUtil.fnMakeEngrCombo($("#callObsStsEngrSearch"),{areaCd:selectVal, aspCompCd:$("#obsRctStsPaterSearch").val() });
			MMSUtil.fnMakeEngrCombo($("#callObsRcptWriterNmSearch"),{areaCd:selectVal, aspCompCd:$("#obsRctStsPaterSearch").val()});
		});
		
		
		MMSUtil.fnMakeObjstacleLv1Combo($("#callStandardObsStsLv1Search"),"","제품범주");
		
    	//공통코드 콤보박스 생성(처리구분)
    	MMSUtil.fnMakeCommCombo($("#callObsStsType"),"OS0001","","선택");
		//검색시 (처리구분)
		MMSUtil.fnObsRcptAllotComboBox($("#callObsStsType2Search"),"OS0001","","other3");
		//검색시 (처리상태)		
		MMSUtil.fnObsRcptAllotComboBox($("#callObsStsTypeSearch"),"OS0001","",""); 
		
    	//공통코드 콤보박스 생성(유상구분)
    	MMSUtil.fnMakeCommCombo($("#callObsStsCostTypeSearch"),"OS0002","","선택");
    	MMSUtil.fnMakeCommCombo($("#callObsStsCostType"),"OS0002","","");
    	
    	//MMSUtil.fnMakeCommCombo($("#callObsStsType1"),"AT0003","","선택"); 임시중지
    	
    	$("#callObsStsRcptDateStartSearch, #callObsStsRcptDateEndSearch").datepicker({todayHighlight: true, autoclose: true,clearBtn:true});
    	todayDate.setDate (todayDate.getDate() -30);
    	$("#callObsStsRcptDateStartSearch").datepicker("setDate", todayDate);
    	$("#callObsStsRcptDateEndSearch").datepicker("setDate", Util.LocalDate());
    	//장애분류 이벤트
		MMSUtil.fnObsRcptComboRelay({
			compCdId 	 : "#obsRctStsPaterSearch",
			obsRcptLv1Id : "#callObsStsLv1Search",
			obsRcptLv2Id : "#callObsStsLv2Search",
			obsRcptLv3Id : "#callObsStsLv3Search",
			obsRcptLv4Id : "#callObsStsLv4Search",
		});
		

    	//=>제품범주 선택
        $("#callStandardObsStsLv1Search").change(function(){
        	if(!$(this).val()) $("#callObsStsLv1Search").html('<option value="">제품군</option>');
        	else MMSUtil.fnMakeObsRcptCombo($("#callObsStsLv1Search"), "",$(this).val(), "", "제품군");
			$("#callObsStsLv2Search").html('<option value="">장애구분</option>');
	    	$("#callObsStsLv3Search").html('<option value="">장애유형</option>');
	    	$("#callObsStsLv4Search").html('<option value="">장애원인</option>');
	    	$("#callObsStsLv4Search").data('combobox').refresh();
        });
		
		
		//검색버튼
		$("#callObsStsSearchWebBtn ,#callObsStsSearchMobileBtn ").click(function(){
			if(fnObsStsModCheck()){
				fnObsSelectedClear();
			    fnObsStsSelectedClear();
			    $callObsStsGrid.resetSelectionGrid();
	    		fnObsStsGridSearch();
			}
		});
		//접수번호 Site명 엔터 검색
		$("#callObsStsRcptNoSearch , #callObsStsStrNmSearch, #callObsStsEngrSearch_input, #callObsRcptWriterNmSearch_input").enterEvent({
    		callBack:function(value){
    			fnObsStsGridSearch();
    		}
    	});
    	// ----  처리내역 정보 ----
    	//처리일자
    //	$("#obsRcptStatusCompDateForm").datepicker({autoclose: true,clearBtn:true});
    	$("#callObsStsDt").datepicker('setDate', Util.LocalDate());
    //	$("#callObsStsDt").datepicker('option', 'disabled', true);
   // 	$("#callObsStsDt").datepicker('disable');
    	//처리시간
    	$("#callObsStsTime").timepicker({ showMeridian:false,clearBtn:true});
    	//입금일
    	$("#callObsStsCostDtForm").datepicker({todayHighlight: true,autoclose: true,clearBtn:true});
    	//입금액
    	$("#callObsStsCost").onlyMoney();
    	
    	//처리상태 변경 값 처리 
		$("#callObsStsType").change(function(){
			var selectVal = $(this).val();	
			var array_info = ['01', '07'];
			var cmplDate = $("#tmpCmplDate").val();
			var cmplTime = $("#tmpCmplTime").val();
			if($.inArray(selectVal, array_info) > -1){ 
			    if(selectVal =="07" && cmplDate){
			    	$("#callObsStsDt").val(cmplDate);
			    	$("#callObsStsTime").val(cmplTime);
				    $("#callObsStsDt, #callObsStsTime").attr("disabled", true); 
			    }else{
					$("#callObsStsDt").val("");
					$("#callObsStsTime").val("");
				    $("#callObsStsDt, #callObsStsTime").attr("disabled", true);
			    }
			    //=> 장애원인 추가 
			    //$("#obsStsLv4CompBox").hide();
			    $("#callObsStsLv4").attr("disabled",true);
			}else{
			    if(cmplDate){
			    	$("#callObsStsDt").val(cmplDate);
			    	$("#callObsStsTime").val(cmplTime);
				    $("#callObsStsDt, #callObsStsTime").attr("disabled", true); 
			    }else{
			    	$("#callObsStsDt").val(Util.LocalDate());
			    	$("#callObsStsTime").val(Util.LocalTime(24));
			    	$("#callObsStsDt, #callObsStsTime").attr("disabled", false);    
			    }
			    $("#callObsStsLv4").attr("disabled",false);
		   }
		});
    	//엔지니어 변경
		$("#callObsStsArea").change(function(){
//			$("#obsStrSearchNm").focus();
			var selectVal = $(this).val();
				MMSUtil.fnMakeEngrCombo($("#callObsStsEngr"),{areaCd:selectVal});
		});
    	//엔지니어 선택
    	$("#callObsStsEngr").change(function(){   
    		getEngr 	= EngrInfo($(this).val());
    		console.log("-- 엔지니어선택 --");
            $("#callObsStsArea").val(getEngr.AREA_CD);
            $("#callObsStsEngr").val(getEngr.USER_ID);
            $("#callObsStsEngrNm").val(getEngr.USER_NM);
            $("#callObsStsEngrSeq").val(getEngr.USER_SEQ);   

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
    		fnObsStsSelectedClear();
    		
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
		//Browser Window Resize Event
		$(window).on("resize", function(){
			resizeCanvas();
		});
		
		$("#signClearBtn").click(function () {
			sign.clear();
		});
		
		$("#signCloseBtn").click(function () {
			$('#signature-pad').hide();
		});
		
		$("#signSaveBtn").click(function () {
			if (sign.isEmpty()){
				alert("사인이 되지 않았습니다.");
				return;
			}
			
			fnSaveSign();
		});

    	//엑셀다운로드 버튼
    	$("#assetManagerDownloadExcel").click(function(){
    		$callObsStsGrid.downloadExcel();
    	});
		
    	//고객사 콤보박스 생성
//		fnMakeSerchCompCombo();
    	$("#callObsStsCompSearch").combobox({inMode:true});
		MMSUtil.fnMakeCompCombo($("#callObsStsCompSearch"), userInfo.s_compCd, '전체');
		//=> 사용자 정보 
		getEngr  = EngrInfo(userInfo.s_userId);		
		$("#callObsStsStrNmSearch").combobox({inMode:true});
		MMSUtil.fnMakeStrCombo($("#callObsStsStrNmSearch"), '', '', '선택');
		
    	//검색시 (처리상태)
    	$("#callObsStsType2Search").change(function(){
    	 	MMSUtil.fnObsRcptAllotComboBox($("#callObsStsTypeSearch"),"OS0001",$(this).val(),"");  	 
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
	    		$("#signature-pad").hide();
				
				var imgList = result.dt_saveFileInfo;
				$("#resultFileInfo").val($("#resultFileInfo").val()+"\nfileSize : "+imgList.length+"\n");
				for (var i = 0; i < imgList.length; i++) {
			//		$("#signSaveFilePrevView").html('<img src="'+imgList[i].webPath+'" data-img="'+imgList[i].webPath+'" alt="" class="superbox-img" />')
					$("#signSaveFileWebPath").val(imgList[i].webPath);
					$("#signSaveFileWebName").val(imgList[i].fileName);
					$("#resultFileInfo").val($("#resultFileInfo").val()+imgList[i].webPath+"\n");
					$("#resultFileInfo").val($("#resultFileInfo").val()+imgList[i].fileName+"\n");
				}
				$("#callObsStsSighFileNmView").html('');
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
			//	$("#callObsStsSighFileNmView").html(webName+" ");
				$("#callObsStsSighFileNmView").append(prevBtn);
				
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
    	var ia = new Uint8Array(byteString.length);
    	for (var i = 0; i < byteString.length; i++) {
    		ia[i] = byteString.charCodeAt(i);
    	}
    	
    	return new Blob([ia], {type:mimeTypeString});
    }
    
    //[Fn]Canvas 초기화
    function fnCanvasInit(){
		
    }
    
    //[Fn]Canvas Resize
	function resizeCanvas(){

		var ratio =  Math.max(window.devicePixelRatio || 1, 1);
		canvas.width = canvas.offsetWidth * ratio;
		canvas.height = canvas.offsetHeight * ratio;
		canvas.getContext("2d").scale(ratio, ratio);
		
		sign.clear();
	}

	//=> 기본정보 필드 채우기 [2017-12-05][유승우]
	function fnGetFieldput(isVal,inField,attr){
	    switch(attr){
	      case "select":  
	      break;
	      default :
		        inField  =  isVal; 	  
	      break;
	      
	    }
	}
	
	//권역 목록 조회
    function fnGetUserNameList(){
    	/* 추후 확인
    	$.ajax({
    		url : "/ctrl/settings/user/listUserName",
    		type : "POST",
    		success : function(result) {
    			var result = result.dt_grid;
    			Util.MakeSelectOptions($('#callObsRcptWriterNmSearch'), result, "", "선택");
    		}
    	});
        */
    }

    function EngrInfo(selEngrID){
        var rtn = null;
        var ret = false;        
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
					  ret = true;
					  rtn = result[0];
				  }
				}
				/*
		        if(!ret){
				  alert("파트너사정보 메뉴입니다.");
		        }
		        */
			}
		});
		return rtn;
    }
    
    // 장애 접수 검색
    function fnObsStsGridSearch(rowid) {
    	var stsRcptNoSearch 	= $("#callObsStsRcptNoSearch").val();  //접수번호
    	var stsDateTypeSearch   = $("#date-search-type").val();   //기간검색유형
    	var stsStartDateSearch 	= $("#callObsStsRcptDateStartSearch").val();   //시작일
    	var stsEndDateSearch 	= $("#callObsStsRcptDateEndSearch").val();   //종료일
    //	var stsTypeSearch 		= $("#callObsStsTypeSearch").val();  //처리상태
    	var stsType2Search 		= $("#callObsStsType2Search").val();  //처리구분
    	var stsTypeSearch 		= $("#callObsStsTypeSearch").val();  //처리상태      	
    	var stsCostTypeSearch 	= $("#callObsStsCostTypeSearch").val(); //유무상
    	var strObsRctPaterSearch  = $("#obsRctStsPaterSearch").val(); //파트너사
    	
    	var stsCompSearch 		= $("#callObsStsCompSearch").val();  //고객사명
    	var strObsBrndNmSearch  = $("#callObsStsBrndNmSearch").val();  //브랜드명
    	var stsStndLv1Search    = $("#callStandardObsStsLv1Search").val(); //제품범주
    	var stsRcptLv1Search 	= $("#callObsStsLv1Search").val();  	//품목군
    	var stsRcptLv2Search 	= $("#callObsStsLv2Search").val();   //장애구분
    	var stsRcptLv3Search 	= $("#callObsStsLv3Search").val();    //장애유형
    	var stsRcptLv4Search 	= $("#callObsStsLv4Search").val();    //장애원인
    	
        var strObsPartSearch    = $("#callObsStsPartSearch").val();    //담당부서 
    	var stsAreaSearch 		= $("#callObsStsAreaSearch").val();  //?
    	var stsEngrSearch 		= $("#callObsStsEngrSearch").val();  //담당엔지니어
    	//var stsStrNmSearch 		= $("#callObsStsStrNmSearch").val();  //점포명
    	var stsStrCdSearch 		= $("#callObsStsStrNmSearch").val();  //점포명    	
    	var stsWriterSearch 	= $("#callObsRcptWriterNmSearch").val();  //접수자
    	var strObsCostTypeSearch =  $("#callObsStsCostTypeSearch").val(); //유무상구분
    	
    	var searchData ={
    			stsRcptNoSearch 	: stsRcptNoSearch 	,
    			stsDateTypeSearch 	: stsDateTypeSearch , 	    			
    			stsStartDateSearch 	: stsStartDateSearch, 	
    			stsEndDateSearch 	: stsEndDateSearch 	,
    			stsType2Search 		: stsType2Search 	,	
    			stsTypeSearch 		: stsTypeSearch 	,
    			stsCostTypeSearch 	: stsCostTypeSearch ,	
    			stsCompSearch 		: stsCompSearch 	,	
    			strBrndNmSearch     : strObsBrndNmSearch,
    			strObsRctPaterSearch : strObsRctPaterSearch,
    			stsStndLv1Search    : stsStndLv1Search  ,
    			stsRcptLv1Search 	: stsRcptLv1Search 	,
    			stsRcptLv2Search 	: stsRcptLv2Search 	,
    			stsRcptLv3Search 	: stsRcptLv3Search 	,
    			stsRcptLv4Search 	: stsRcptLv4Search 	,
    			stsAreaSearch 		: stsAreaSearch 	,
    			strObsPartSearch    : strObsPartSearch  ,
    			stsEngrSearch 		: stsEngrSearch 	,	
    			stsStrCdSearch      : stsStrCdSearch    ,
    			stsWriterSearch 	: stsWriterSearch 	,	
    	}
    	$callObsStsGrid.search(searchData);
    	$callObsStsHistGrid.paragonGridClear();
    	if(rowid){
    		$callObsStsGrid.focusToRow(rowid);
    	}
    }
   
    function fnObsStsMakeGrid(){
    	$callObsStsGrid.paragonGrid({
			url : '/ctrl/call/obstacle/receipt/listObsRept',
			rowEditable : false,
			reportExcelBtn: true,
			sortable : true,
			height: "270px",
			postData : {
						stsDateTypeSearch:$("#date-search-type").val(),   //기간검색유형 추가
						stsStartDateSearch:$("#callObsStsRcptDateStartSearch").val(),
						stsEndDateSearch:$("#callObsStsRcptDateEndSearch").val(),
						},
			shrinkToFit: false,
			rowNum: 10,
			rowList: [10, 20, 50,100],
			colNames :["접수번호","접수일시","고객사명","브랜드명","점포명","지역","신고자","장애유형","현장방문일시","경과 시간","처리상태","접수자","완료시간","파트너사","담당부서","담당엔지니어","유무상","금액","RCPT_SEQ","STR_CD","ASP_COMP_CD","AST_SEQ",],
			colModel : [ 
				{width:"90px",align:"center",name : 'RCPT_NO'},  //접수번호
				{width:"120px",align:"center",name : 'ACCEPT_DT'},   //접수일시
				{width:"110px",align:"center",name : 'COMP_NM'},   //회사명		
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
	            {align:"center",name : 'RCPT_SEQ',hidden:true}, 
	            {align:"center",name : 'STR_CD',hidden:true}, 
	            {align:"center",name : 'ASP_COMP_CD',hidden:true},          
	            {align:"center",name : 'AST_SEQ',hidden:true}, 				
			],
			rownumbers : true,
			pager: "#callObsStsGridNavi",
			caption:"장애접수내역",
            onSelectRowEvent : function(currRowData, prevRowData) {
            	var rcptSeq = currRowData.RCPT_SEQ;
            	if(fnObsStsModCheck(rcptSeq)){
            		fnGetObsRcptView(rcptSeq);
            	}
			},
			ondblClickRow: function(id, iRow, iCol, e){
            	var rcptSeq = $callObsStsGrid.getRowData( id ).RCPT_SEQ;
            	var astSeq = $callObsStsGrid.getRowData( id ).AST_SEQ;
            	var strCd = $callObsStsGrid.getRowData( id ).STR_CD;
            	var aspCompCd = $callObsStsGrid.getRowData( id ).ASP_COMP_CD;       
				PopApp.paragonOpenPopup({
					ajaxUrl : '/ctrl/call/obstacle/status/obstacleStatusRcptPopupMove',
					id : 'callObsStsRcptModPopup',
					width : '1000px',
					data:{
						rcptSeq:rcptSeq,
						astSeq:astSeq,
						strCd:strCd,
						aspCompCd : aspCompCd,
						modFlag:"UPDATE"
					},
					title : "장애접수 수정",
				});
			}
        });
    	fnSetTopToolbar($("#t_callObsStsGrid"));
		
		
        /********************************************************************
         *처리현황 그리드 생성
         * Since   : 2016-10-24
         * 작성자  : Kim Jin Ho
         * 수정자  : 유승우 
         ********************************************************************/
		$callObsStsHistGrid.paragonGrid({
			url: '/ctrl/call/obstacle/status/listObsSts',
			page : 1,
			sortable : false,
			hidegrid: false,
			height: "220px",
		//	rowHight : "S",
			firstData : false,
			shrinkToFit: false,
			
			colNames :[ "선택","완료일","완료시간","처리내용","처리구분","담당부서","담당엔지니어","유무상", "작성자", "작성일","서명","RCPT_STS_SEQ","RCPT_STS_COST_TYPE","RCPT_STS_TYPE","SIGN_PATH","SIGN_NM","RCPT_STS_ENGR_SEQ","RCPT_STS_ENGR","RCPT_STS_AREA_SEQ","RCPT_STS_DPST_YN","RCPT_STS_COST_DT","RCPT_STS_DPST_NM","RCPT_STS_COST","AST_SEQ","AST_ST", "RCPT_STS_AREA_CD", "LAST_PROC_YN"],
			colModel : [ 
				{width:"100px",editable: false,align:"center",name:'EVENT',formatter:inMakeActionBution,frozen:true},					
				{width:"80px",name : 'RCPT_STS_DT', align:"center"},			
				{width:"60px",name : 'RCPT_STS_TIME', align:"center"},				
				{width:"300px",name : 'RCPT_STS_CONT', align:"left"},			
				{width:"80px",name : 'RCPT_STS_TYPE_NM', align:"center"},		
				{width:"120px",name : 'AREA_NM', align:"center"},			
				{width:"80px",name : 'RCPT_STS_ENGR_NM', align:"center"},			
				{width:"80px",name : 'RCPT_STS_COST_TYPE_NM', align:"center"},	
				{width:"80px",name : 'IN_USER_NM', align:"center"},		
				{width:"80px",name : 'IN_DT', align:"center"},					
				{width:"100px",name : 'SIGH_CKECK', align:"center"},	
				{width:"100px",name : 'RCPT_STS_SEQ', hidden : true}, 
				{width:"100px",name : 'RCPT_STS_TYPE', hidden:true},		
				{width:"100px",name : 'RCPT_STS_COST_TYPE', hidden : true},		
				{width:"100px",name : 'SIGN_PATH', hidden : true},		
				{width:"100px",name : 'SIGN_NM', hidden : true },
				{width:"80px",name : 'RCPT_STS_ENGR_SEQ', hidden:true},						
				{width:"80px",name : 'RCPT_STS_ENGR', hidden:true },			
				{width:"80px",name : 'RCPT_STS_AREA_SEQ', hidden:true},	
				{width:"80px",name : 'RCPT_STS_DPST_YN', hidden:true},	
				{width:"80px",name : 'RCPT_STS_COST_DT', hidden:true },	
				{width:"80px",name : 'RCPT_STS_DPST_NM', hidden:true},	
				{width:"80px",name : 'RCPT_STS_COST', hidden:true},	
				{width:"80px",name : 'AST_SEQ', hidden:true },	
				{width:"80px",name : 'AST_ST', hidden:true },	
				{width:"80px",name : 'RCPT_STS_AREA_CD', hidden:true},
				{width:"80px",name : 'LAST_PROC_YN', hidden:true },		
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
		$("#callObsStsHistGrid").jqGrid("setFrozenColumns");
		$("#callObsStsHistGrid").trigger("reloadGrid");		
		/*
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
		*/	
		/* 동적 수정 처리 */
		$(document)
		.on("click",".select-mod-btn",function(e){
        	e.stopPropagation();
			var rowData = $callObsStsHistGrid.getRowData($(this).val());
        	$callObsStsHistGrid.focusToRow();
        	$callObsStsHistGrid.addClass("updateMod");
        	console.log("---장애내역수정---");
        	$("#callObsStsType").val(rowData.RCPT_STS_TYPE).trigger("change");
        	$("#callObsStsSelectRcptStsSeq").val(rowData.RCPT_STS_SEQ);
        	$("#callObsStsType").val(rowData.RCPT_STS_TYPE);       	
        	$("#callObsStsCostType").val(rowData.RCPT_STS_COST_TYPE);
        	$("#callObsStsLastYn").val(rowData.LAST_PROC_YN);
        	//getEngr(rowData.RCPT_STS_ENGR);
        	//=> 엔지니어 정보 불러오기
        	MMSUtil.fnMakeEngrCombo($("#callObsStsEngr"),{areaCd:rowData.RCPT_STS_AREA_CD}, rowData.RCPT_STS_ENGR);
                 
        	
        	//=>  엔지니어 정보 여부 체크 
        	  if(rowData.RCPT_STS_ENGR_SEQ!=""&&rowData.RCPT_STS_ENGR!=""&&rowData.RCPT_STS_ENGR_NM!=""){
        	 $("#callObsStsArea").val(rowData.RCPT_STS_AREA_CD);
        	 $("#callObsStsEngr").val(rowData.RCPT_STS_ENGR);
        	 $("#callObsStsEngrNm").val(rowData.RCPT_STS_ENGR_NM);        	 
             $("#callObsStsEngrSeq").val(rowData.RCPT_STS_ENGR_SEQ);               	 
        	}else{
             console.log("값없음:"+getEngr.USER_NM);		
             $("#callObsStsArea").val(getEngr.AREA_CD);
             $("#callObsStsEngr").val(getEngr.USER_ID);
             $("#callObsStsEngrNm").val(getEngr.USER_NM);
             $("#callObsStsEngrSeq").val(getEngr.USER_SEQ);            
        	}

        	
        	$("#callObsStsDpstYn").val(rowData.RCPT_STS_DPST_YN);
        	$("#callObsStsCostDt").val(rowData.RCPT_STS_COST_DT);        	
        	$("#callObsStsDpstNm").val(rowData.RCPT_STS_DPST_NM);
        	//=> 유상일 경우 disable 해제 
        	if(rowData.RCPT_STS_COST_TYPE == '02')	 $("#callObsStsCost").prop("disabled",false);      	  	
        	else  $("#callObsStsCost").prop("disabled",true);
        		
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
		
			
		})
		.on("click",".select-cancel-btn",function(e){
			e.stopPropagation();
			fnObsStsSelectedClear();		
		});
		function inMakeActionBution(cellvalue, options, rowObject) {
            var reLoadButton = '<button type="button" class="btn btn-warning btn-xs m-r-5 select-mod-btn" value="'+(options.rowId)+'" >수정</button>';
            reLoadButton += ' <button type="button" class="btn btn-danger btn-xs m-r-5 select-cancel-btn" value="'+(options.rowId)+'" >취소</button>';
            return reLoadButton;
		}
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
    //선택 점포 장애이력 조회
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
    //선택 점포 자산이력 조회
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
    			$("#callObsStsAspPartView").text(result.ASP_PART_NM);
    			$("#callObsStsContView").text(result.RCPT_CONT);
    			$("#callObsStsWriterNmView").text(result.IN_USER_NM);
    			$("#callObsStsCustInfoView").text(result.RCPT_CUST_INFO);
    			$("#callObsStsObsDtTimeView").text(result.RCPT_DT+" "+result.RCPT_TIME);
                console.log("----장애내역클릭 -----");
                console.log(result);
 			    $("#tmpCmplDate").val(result.CMPL_DATE);
			    $("#tmpCmplTime").val(result.CMPL_TIME);  
    			//=> 부서 정보 추가
			    if(userInfo.s_authSeq != "200" && userInfo.s_areaCd){
			    	$("#callObsStsArea").prop('disabled','disabled');
		    	}
    			MMSUtil.fnMakeAreaCombo($("#callObsStsArea"), result.RCPT_STS_AREA_CD, result.ASP_COMP_CD, false,  true);
    			//=> 엔지니어 정보 추가 
    			//$("#callObsStsArea").val(result.RCPT_STS_AREA_CD);
    			MMSUtil.fnMakeEngrCombo($("#callObsStsEngr"),{areaCd:result.RCPT_STS_AREA_CD}, result.RCPT_ENGR);
 			    //완료일시
    			if(result.CMPL_DATE||result.CMPL_TIME){
    			   $("#callObsStsDt").val(result.CMPL_DATE);
    			   $("#callObsStsTime").val(result.CMPL_TIME);  			   
    			}
                //=> 장애원인
	  			if(result.RCPT_OBS_LV3){
				  MMSUtil.fnMakeObsRcptComboEtc($("#callObsStsLv4"), "", result.RCPT_OBS_LV3, "", "장애원인", result.RCPT_OBS_LV4);
			    }
	  			//$("#callObsStsLv4").html("<option value=''>장애원인</option>");
	  		//	$("#callObsStsLv4").data('combobox').refresh();
    			//=> 처리내역변경 
    			$("#callObsStsType").val(result.RCPT_STS_TYPE).trigger("change");
    			
    			//=> 유무상 관련
    			$("#callObsStsCostType").val(result.RCPT_STS_COST_TYPE).trigger("change");
    			$("#callObsStsCost").val(result.RCPT_STS_COST);
    			
    			$("#callObsStsEngrNm").val(result.RCPT_ENGR_NM);    			
    			$("#callObsStsEngrSeq").val(result.RCPT_ENGR_SEQ); 
    			
    			
    			$("#callObsStsLastYn").val("Y"); //=> 최근처리 업데이트
    		}
    	});
    }
    function fnObsStsModCheck(rcptSeq){
    	if($callObsStsHistGrid.hasClass("updateMod")){
    		if(confirm("수정모드 입니다. 계속 진행 하시겠습니까?")){
    			$callObsStsGrid.reload();
    			fnObsStsSelectedClear();
    			fnObsSelectedClear();
    		}else{
    			return false;
    		}
    	}
    	return true;
    }
    
    function fnObsSelectedClear(){
    	$('#callObsStsSelectRcptSeq').val("");
    	$('#callObsStsCompNmView').text("");
    	$('#callObsStsPrdNmView').text("");
    	$('#callObsStsObsNmView').text("");
    	$('#callObsStsWriterNmView').text("");
    	$('#callObsStsObsDtTimeView').text("");
    	$('#callObsStsWriterNmView').text("");
    	$('#callObsStsCustInfoView').text("");
    	$('#callObsStsContView').text("");
    	$('#callObsStsCompFileNmView').val("");
    	$('#callObsStsCompFileNmView').text("");
    	$('#callObsStsAspPartView').text("");
    	$('#callObsStsEngrmView').text("");
    }
    function fnObsStsSelectedClear(){
    	$callObsStsHistGrid.focusRemove();
		$callObsStsHistGrid.removeClass("updateMod");
		$("#callObsStsType").val("");
    	$("#callObsStsCostType").val("");
    	$("#callObsStsArea").val("");
    	$("#callObsStsEngr").val("");
    	$("#callObsStsEngrNm").val("");   	
    	$("#callObsStsEngrSeq").val("");   	    	
    	$("#callObsStsDpstYn").val("");
    	$("#callObsStsCostDt").val("");        	
    	$("#callObsStsDpstNm").val("");
    	$("#callObsStsCost").val("");
    	$("#callObsStsDt").datepicker('setDate', Util.LocalDate());
    	$("#callObsStsTime").val(Util.LocalTime(24));
    	$("#callObsStsCont").val("");
    	$("#callObsStsLastYn").val(""); 
		
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
    
    //장애 업데이트 저장
    function fncallObsStsSave(modFlag){
    	
        //접수정보 
    	
    	//장애코드
    	var rcptSeq = $("#callObsStsSelectRcptSeq").val();
    	//장애처리코드
    	var rcptStsSeq = $("#callObsStsSelectRcptStsSeq").val();
		
   	    if(rcptStsSeq =="" && modFlag =="UPDATE"){
   	    	alert("잘못된 처리현황입니다.");
   	    	return false;
   	    }
 
		if(!rcptSeq){
		  	alert("장애접수내역을 선택하여 주세요.");
			return false;
		}
		//처리상태
		var rcptStsType = $("#callObsStsType").val();
		//담당부서
		var areaCd = $("#callObsStsArea").val();
		//담당자
		var rcptStsEngrSeq = $("#callObsStsEngrSeq").val();
		var rcptStsEngr = $("#callObsStsEngr").val();
		var rcptStsEngrNm = $("#callObsStsEngrNm").val();
	        areaCd = (areaCd)? areaCd:getEngr.AREA_CD;		
	        rcptStsEngrSeq = (rcptStsEngrSeq)? rcptStsEngrSeq:getEngr.USER_SEQ;
	        rcptStsEngr = (rcptStsEngr)? rcptStsEngr:userInfo.s_userId;	  
	        rcptStsEngrNm = (rcptStsEngrNm)? rcptStsEngrNm:userInfo.s_userNm;	 
			var rowData = $callObsStsGrid.getRow();
			console.log("--- 접수 정보 ---");	        
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
		
		var rcptLastYn = $("#callObsStsLastYn").val();
		/*
		if(!rcptStsEngr||!rcptStsEngrSeq||!rcptStsEngrNm){
			alert("담당엔지니어 배정후 처리 가능합니다.");		
			return;
		}
		*/
		//console.log($("#callObsStsDt").attr("disabled"));
	    if(rcptStsType =="" ){
			alert("처리상태를 선택해주세요.");
			$("#callObsStsType").focus();
			return;
		}else if(rcptStsCostType == "02" && rcptStsDpstYn == ""){
			alert("유상처리일경우 입금여부를 선택해주세요.");
			$("#callObsStsDpstYn").focus();
			return;
		}else if(rcptStsCostType == "02" && rcptStsCost == ""){
	    	alert("유상처리일경우 금액을 입력해주세요.");
	    	$("#callObsStsCost").focus();
	    	return;
		}
	     console.log($("#callObsStsDt").attr("disabled"));
		//별도 처리완료시간관련 접수현황 처리
		if($("#callObsStsDt").attr("disabled") !="disabled"){
			if(rcptStsDt =="" ){
				alert("완료일자를 입력해주세요.");
				$("#callObsStsDt").focus();
				return;	
			}else if(rcptStsTime =="" ){
				alert("완료시간을 입력해주세요.");
				$("#rcptStsTime").focus();
				return;
			}else if(rcptStsCont =="" ){
				alert("처리내용을 입력해주세요.");
				$("#callObsStsCont").focus();
				return;
			}
			
		}    
    
		//별도 장애원인 접수 현황 처리
		var array_info = ['100', '110', '120', '140'];
		var obsStsLv4 = $("#callObsStsLv4").val();
		if($.inArray($("#callObsStsType").val(), array_info) > -1){ 
			if(!obsStsLv4){
				alert("장애원인을 입력해주세요.");
				$("#callObsStsLv4").focus();	
				return;
			}
		}

		if(modFlag =="INSERT"){
			if(!confirm("장애처리 내용을 저장하시겠습니까?")){
				$("#callObsStsLastYn").val("Y");
				return;
			}
		}else{
			if(!confirm("장애처리 수정내용을 저장하시겠습니까?")){
				return;
			}
		}
		var pushType ="";
		var PUSH_MSG ="";
		var userIdArr ="";
		var typeText = $("#callObsStsType option:selected").text();
		var engrText = $("#callObsStsEngr option:selected").text();
		var areaText = $("#callObsStsArea option:selected").text();
		var userNm = userInfo.s_userNm;

		var strNm = rowData.STR_NM;
		var strPhone = rowData.PHONE_NUM;
		var rcptObsNm = rowData.RCPT_OBS_NM;

		if(rcptStsEngr !=""){
			PUSH_MSG ="담당 : "+engrText+"\n";
			PUSH_MSG +="접수자 : "+userNm+"\n";
			PUSH_MSG +="점포 : "+strNm+"/"+strPhone+"\n";
			PUSH_MSG +="장애 : "+rcptObsNm;
			userIdArr = rcptStsEngr;
		}else if(areaCd !=""){
			PUSH_MSG ="담당 : "+engrText+"\n";
			PUSH_MSG +="접수자 : "+userNm+"\n";
			PUSH_MSG +="점포 : "+strNm+"/"+strPhone+"\n";
			PUSH_MSG +="장애 : "+rcptObsNm;
		}
		var saveObsData = {
			
			modFlag  	: modFlag ,
			rcptSeq  	: rcptSeq ,
			areaCd   	: areaCd ,
			rcptStsEngrSeq	: rcptStsEngrSeq ,			
			rcptStsEngr		: rcptStsEngr ,
			rcptStsEngrNm   : rcptStsEngrNm,
			rcptStsSeq   : rcptStsSeq ,
			rcptStsType  : rcptStsType ,
			rcptStsDt    : rcptStsDt   ,
			rcptStsTime  : rcptStsTime ,
			rcptStsCont  : rcptStsCont ,
			obsStsLv4    : obsStsLv4,
			rcptStsCost  	: rcptStsCost ,
			rcptStsCostType : rcptStsCostType ,
			rcptStsDpstYn   : rcptStsDpstYn ,
			rcptStsCostDt   : rcptStsCostDt ,
			rcptStsDpstNm   : rcptStsDpstNm ,
			signPath   	: signPath, 
			signNm   	: signNm,
			rcptLastYn      : rcptLastYn,
			
			PUSH_MSG   	: PUSH_MSG, 
			pushType   	: pushType, 
			userIdArr	: userIdArr	
		};
		App.prcsStart();
    	$.ajax({
    		url : "/ctrl/call/obstacle/status/saveObsSts",
    		data :saveObsData,
    		type : "POST",
    		dataType : "json",
    		cache: false,
    		success : function(result) {
    			App.prcsEnd();
    			var focusRowId = $callObsStsGrid.focusRowId();
    			if(result.stsCd == 100){
    				fnObsStsGridSearch();
    				$callObsStsHistGrid.paragonGridSearch({
    					rcptSeq : rcptSeq
    				});
    		//    if($("#callObsStsType").val() == "07"){ // 메일 발송
              if(modFlag =="INSERT" && $("#callObsStsType").val() == "07"){ // 메일 발송
  				//=> 메일 발송 처리 
            		var rcptMailData = { 
            				rcptSeq : rcptSeq
            		}
  				var ret = fnSendMailing(rcptMailData);
  				console.log(ret);
              }
    				//	if(modFlag =="UPDATE"){

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
    		        	//$("#callObsStsLv4").val("");
    		        	//웹 모드
    					$("#callObsStsSaveWebBtn").show();
    					$("#callObsStsModSaveWebBtn").hide();
    					$("#callObsStsModCancelWebBtn").hide();
    					
    					//모바일 모드
    					$("#callObsStsSaveMobileBtn").show();
    					$("#callObsStsModSaveMobileBtn").hide();
    					$("#callObsStsModCancelMobileBtn").hide();
    			//	}
    			}
    			alert(result.msgTxt);
    		}
    	});
    }
    
    //고객사 콤보박스 생성
    function fnMakeSerchCompCombo() {
//    	var asp_cd = $("#obsRctStsPaterSearch").val();
//    	var part_cd = $("#callObsStsPartSearch").val();
//		$.ajax({
//			url : "/ctrl/standard/company/listMaCompName",
//			type : "POST",
//			dataType : "json",
//			data :{asp_cd : asp_cd , 
//				   part_cd : part_cd
//				  },
//			cache : false,
//			success : function(result) {
//				var json = result.suggestions;
//				var targetEl = $("#callObsStsCompSearch");
//				targetEl.combobox({inMode:true});
//				targetEl.html("");
//				var option = $("<option value='' />");
//				option.text("고객사명")
//				targetEl.append(option);
//				for (var i = 0; i < json.length; i++) {
//					var thisValue = json[i].COMP_CD;
//					var thisName = json[i].name;
//					var option = $("<option>", {
//						value : thisValue
//					});
//					option.text(thisName)
//					targetEl.append(option);
//				}
//				targetEl.data('combobox').refresh();
//			}
//		});
	}

    //브랜드 목록 조회
    function fnGetBrndNameList(compCd){
    	MMSUtil.fnMakeBrndCombo($("#callObsStsBrndNmSearch"), compCd, '', '브랜드명');
//    	$("#callObsStsBrndNmSearch").html('<option value="">브랜드명</option>');
//    	$.ajax({
//    		url : "/ctrl/standard/company/listBrandName",
//    		data : {"compCd":compCd},
//    		type : "POST",
//    		cache: false,
//    		success : function(result) {
//    			var result = result.dt_grid;
//    			Util.MakeSelectOptions($('#callObsStsBrndNmSearch'), result);
//    		}
//    	});
    }
 /*
    function fnListAutoStrNm(compCd, brndCd){
    	$('#callObsStsStrNmSearch').strNmAutoComplate({
			compCd:compCd,
			brndCd:brndCd,
		});
    }   
  */
    
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

    	$('#signature-pad').show();
		resizeCanvas();

    }

    // 메일발송 
    function fnSendMailing(rcptMailData){
        var ret = null;
		$.ajax({
			url:'/ctrl/call/obstacle/receipt/sendMailer',
			data: rcptMailData,
			success: function(result){     	
			//	console.log(result);
			}
		
		});       
     	return ret;
     }    
    
    
}();

$(document).ready(function() {
	App.setSlimScroll();
	ObsRcptStsApp.init();
});
