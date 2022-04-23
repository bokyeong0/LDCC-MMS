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
var getEngr = null;
var ObstacleReceiptApp = function () {
	"use strict";

	// 사용자 정보
	var userInfo = Util.getUserInfo();
	//내선번호
	var myExt = userInfo.s_callExt;
	//서버IP
	var ctiServerIp = userInfo.s_ctiServerIp;
	var $callObsAssetGrid = $("#callObsAssetGrid");
	var fLogin = true;
	var currCallNo = "";
    return {
        init: function () {
        	//이벤트 생성
        	fnObsReceiptEvent();
        	//그리드 생성
        	fnObsMakeGrid();
        		
	    },
	    OnButtonProc:function(arButton){
	    //	console.log(arButton);
	    },
    };
 
    
    
    //[Fn] 이벤트 
    function fnObsReceiptEvent(){
    	//장애분류  Lv4 콤보박스 생성(값이 없어도 리셋안되도록 nonReset:true)
    	$("#obsRcptLv4").combobox({nonReset:true});
    	$("#obsAutoPrdNm").prop("readOnly", true);
    	
    	//공통코드 콤보박스 생성(제품군) 점포검색시로 변경 
        // 엔지니어 기준 지역코드 정보
		 getEngr = EngrInfo(userInfo.s_userId);
	       
		
    	//권역 콤보박스 생성 [파트너사 지정]
    	MMSUtil.fnMakePartnerCombo($("#obsRctStsPater"),userInfo.s_companyCd);
    	//권역 콤보박스 생성 [파트너사 부서 정보]
    	(userInfo.s_areaCd)? $("#obsRcptStsArea").attr('disabled','true'):"";
    	MMSUtil.fnMakeAreaCombo($("#obsRcptStsArea"),userInfo.s_areaCd, userInfo.s_companyCd, false, true);
    	//공통코드 콤보박스 생성(배정상태)
    	MMSUtil.fnObsRcptAllotComboBox($("#obsRcptStsType2"),"OS0001","","other3");
      	//공통코드 콤보박스 생성(배정상태2) 	
	 	MMSUtil.fnObsRcptAllotComboBox($("#obsRcptStsType"),"OS0001","","");  
    	//공통코드 콤보박스 생성(유상구분)
    	MMSUtil.fnMakeCommCombo($("#obsRcptStsCostType"),"OS0002","");
    	//공통코드 콤보박스 생성(CUST_TYPE) //신고자
    	MMSUtil.fnMakeCommCombo($("#obsRcptCustType"),"OS0003","04");

    	//=>제품범주 선택
        $("#standardObstacleLv1").change(function(){
        	if(!$(this).val()) $("#obsRcptLv1").html('<option value="">제품군</option>');
        	else MMSUtil.fnMakeObsRcptCombo($("#obsRcptLv1"), "",$(this).val(), "", "제품군");
			$("#obsRcptLv2").html('<option value="">장애구분</option>');
	    	$("#obsRcptLv3").html('<option value="">장애유형</option>');
	    	$("#obsRcptLv4").html('<option value="">장애원인</option>');
	    	$("#obsRcptLv4").data('combobox').refresh();
        });
    	
    	//배정상태2
    	$("#obsRcptStsType2").change(function(){
    	 	MMSUtil.fnObsRcptAllotComboBox($("#obsRcptStsType"),"OS0001",$(this).val(),"");  	     
    	});

    	//엔지니어 선택
    	$("#obsRcptStsEngr").change(function(){   
    		EngrInfo($("#obsRcptStsEngr").val());
    	});

    	//파트너사 담당엔지니어
    	MMSUtil.fnMakeEngrCombo($("#obsRcptStsEngr"),{areaCd:userInfo.s_areaCd,  aspCompCd:userInfo.s_companyCd}, userInfo.s_userId);
		//접수DATE
    	$("#obsRcptDateForm").datepicker({todayHighlight: true,autoclose: true});
      	//방문DATE
    	$("#obsRcptStsDateForm").datepicker({todayHighlight: true,autoclose: true});
      	//완료DATE
    	$("#obsRcptCompDateForm").datepicker({todayHighlight: true,autoclose: true});	
   // 	$("#obsRcptCompDate").datepicker('setDate', "");
    	$("#obsRcptTime").timepicker({showMeridian:false ,defaultTime:false});
    	$("#obsRcptStsTime").timepicker({showMeridian:false ,defaultTime:false});
    	$("#obsRcptCompTime").timepicker({showMeridian:false ,defaultTime:false});	
    	//입금일
    	//$("#obsRcptCostDtForm").datepicker({todayHighlight: true,autoclose: true});
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
				fnObsSelectedAllClear();
			}
		});
		// Site 초기화
		$("#obsStrSearchReset").click(function(){
			if(confirm("모두초기화 하시겠습니까?")){
				fnObsSelectedAllClear();
			}
			$("#obsStrSearchNm").focus();
		});
		$("#callBtn5").click(function(){
			$("#obsRcptStsDate").val(Util.LocalDate());
		});
		// 장애내용 추가
		$("#addObstacleBtn").click(function(){
			fnAddObsRcptLv4();
		});
		$("#obsRcptSaveBtn, .obsRcptSaveBtn").click(function(){
			fnObsRcptSave();
		});
		
		$("#obsAutoPrdNmResetBtn").click(function(){
			fnObsSelectedPrdClear();
		});
		
		//엔지니어 유무상 관련
		$("#obsRcptStsCostType").change(function(){
			var selectVal = $(this).val();
			if(selectVal == "01"){
				$("#obsRcptStsCostDt, #obsRcptStsCost, #obsRcptStsDpstNm, #obsRcptStsDpstYn").val("");
				$("#obsRcptStsCostDt, #obsRcptStsCost, #obsRcptStsDpstNm, #obsRcptStsDpstYn").prop("disabled",true);
			}else{
				$("#obsRcptStsCostDt, #obsRcptStsCost, #obsRcptStsDpstNm, #obsRcptStsDpstYn").prop("disabled",false);

			}
		});
		//엔지니어 권역 변경
		$("#obsRcptStsArea").change(function(){
		//	$("#obsStrSearchNm").focus();
			var selectVal = $(this).val();
			if(selectVal != ""){
			    $("#obsRcptStsEngrNm").val("");
			    $("#obsRcptStsEngrID").val("");			
			}
			MMSUtil.fnMakeEngrCombo($("#obsRcptStsEngr"),{areaCd:selectVal, aspCompCd:userInfo.s_companyCd});
/*
			if(selectVal != ""){
				MMSUtil.fnMakeEngrCombo($("#obsRcptStsEngr"),{areaCd:selectVal, aspCompCd:userInfo.s_companyCd});
			}else{
			    //엔지니어 초기화
			    $("#obsRcptStsEngr option").not("[value='']").remove(); 
			    $("#obsRcptStsEngrNm").val("");
			    $("#obsRcptStsEngrID").val("");
			    
			}
*/	
			//=> 기초 처리상태 
			
		});

 
		// 점포 자동완성
		$("#obsStrSearchNm").strAutoComplate({
			callYn 		: 'Y',			//콜센터 관리만 조회(자산등록시에도 사용함)
			onSelect: function(result){
				//점포정보
				fnObsSelectedStrView(result);
				//엔지니어 부서정보 조회
				var areaSeq = result.AREA_SEQ;
				var compCd = result.COMP_CD;
				var strCd = result.STR_CD;

				
			 	MMSUtil.fnMakeObjstacleLv1Combo($("#standardObstacleLv1"),"PT00001","제품범주");
				//=> 모델명에 따른 검색시 OBS_SEQ  불러오기
				MMSUtil.fnMakeObsRcptCombo($("#obsRcptLv1"), compCd, "PT00001", "", "제품군");

				//점포 자산정보조회
		    	App.prcsStart();

				$callObsAssetGrid.paragonGridSearch({
					strCd : strCd, s_compCd : compCd,
					obsAssetSel : null, obsAssetSearch : null
				});

				//Site 장애 이력조회
				fnObsHitList(strCd);
				
				//Site 자산 이력조회
				fnAstHitList(strCd);
				
				//Site 예방점검 이력조회
				fnPreventHitList(strCd);
				
				//접수시간, 처리시간
				fnSetDateTime();
				App.prcsEnd();
			}
		});
		
		// 품목검색 자동완성 [장애유형 추가]
		$("#obsAutoPrdSearch").prdAutoComplate({
			prdCdId :"#obsAutoPrdCd",
			prdNmId :"#obsAutoPrdNm",
			prdTLv1 :"#standardObstacleLv1",
			prdTLv2 :"#obsRcptLv1",
			obsLv3  :"#obsRcptLv2",
		});
		//장애분류 이벤트
		MMSUtil.fnObsRcptComboRelay({
			compCdId 	 : "#obsSelectCompCd",
			obsRcptLv1Id : "#obsRcptLv1",
			obsRcptLv2Id : "#obsRcptLv2",
			obsRcptLv3Id : "#obsRcptLv3",
			obsRcptLv4Id : "#obsRcptLv4",
		});
		
		$('#obsRcptAstAddBtn').click(function(){
			var serialNo = $('#obsRcptAstSerial').val();
			var flag = "";
			if(serialNo === ''){
				alert("시리얼을 입력해주세요");
				return;
			}
			if($('#obsSelectAstSeq').val() !== ''){
				if(confirm("시리얼을 수정 하시겠습니까?")){
					var flag = "UPDATE"
					fnUpdateSerial(flag);
				}
			}else{
				if(confirm("시리얼을 등록 하시겠습니까?")){
					var flag = "INSERT"
					fnUpdateSerial(flag);
				}
			}
		});
		
		//행추가버튼
		$("#obsRcptStrInsertBtn").click(function(){
			fnInsertStore();
		});

        //자산내역 검색
		$("#callObsAssetSearchBtn").click(function(){
			fnAssetGridSearch();
		});
		$('#callObsAssetSearch').keyup(function(e) {
		    if (e.keyCode == 13){
		    	fnAssetGridSearch();
		    }   
		});

		
    }
    

    
    
    function fnAssetGridSearch(){
    	var strCd = $("#obsSelectStrCd").val();
    	var compCd	   = $("#obsSelectCompCd").val();
		var obsAssetSel =  $("#callObsAssetSel").val();
		var obsAssetSearch =  $("#callObsAssetSearch").val();
		
		  if(!$("#obsStrSearchNm").val()){
			  alert("점포 검색 후 이용해주세요.");
			  $("#obsStrSearchNm").focus();
			  return false;
		  }
		
    	var searchData = {
    	    strCd  : strCd, 
    	    compCd : compCd, 
    		obsAssetSel	:  obsAssetSel,
    		obsAssetSearch : obsAssetSearch
    	}     
    	$("#callObsAssetGrid").search(searchData);	
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
					    $("#obsRcptStsEngrNm").val(result[0].USER_NM);					
					    $("#obsRcptStsEngrID").val(result[0].USER_SEQ);
					    $("#obsRcptStsEngrEmail").val(result[0].USER_EMAIL);	
					    ret = true;
					    rtn = result[0];
					}
				}
					 
				 if(!ret){
					 // alert("파트너사정보 메뉴입니다.");
					  $("#obsRcptStsEngrNm").val("");					
					  $("#obsRcptStsEngrID").val("");			
					  $("#obsRcptStsEngrEmail").val("");
				      result = {USER_NM:'',USER_SEQ:'',USER_EMAIL:'',AREA_CD:''};
					  rtn = result;
				 }
	

			}
		});
		return rtn;
    }
    
    //[Fn] 회사 등록 팝업 
    function fnInsertStore(){
    	PopApp.paragonOpenPopup({
    		ajaxUrl: '/ctrl/standard/store/saveStorePopup',
    		id: 'modalStandardStoreSavePopup',
    		width: '750px',
    		btnName:"저장",
    		title:"Site 등록",
    		onload:function(modal){
    			modal.show();
    		}
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
			url: '/ctrl/asset/asset/listAssetSearch',
			page : 1,
			sortable : false,
			hidegrid: false,
			height: 137,
		//	rowHight : "S",
			shrinkToFit: false,
		//	gridResize:{minWidth: "3056",maxWidth:"3056"},
			firstData : false,
			rowNum: 10,
			rowList: [10, 20, 50,100],			
			colNames :["선택","관리코드","고객사명","점포명","점포형태","파트너사","제품범주","제품군","제조사","모델명","SPEC","시리얼","계약번호","계약시작일","계약완료일","설치일","포스번호","위치정보","AST_SEQ","AST_ST","PRD_CD","PRD_TYPE_LV1", "PRD_TYPE_LV2","PRD_TYPE_LV3"],
			colModel : [ 
				{editable: false,align:"center",name:'EVENT',formatter:inMakeActionBution, sortable:false ,frozen:true},
				{name : 'MNG_CD', align:"center"},		        //관리코드 점포코드 > 관리코드	
				{name : 'COMP_NM', align:"center"},		        //고객사명
				{name : 'STR_NM', align:"center"},		        //점포명	
				{name : 'STR_TYPE_NM', align:"center"},		    //점포형태		
				{name : 'ASP_COMP_NM', align:"center"},		    //파트너사명					
				{name : 'PRD_TYPE_LV1_NM', align:"center"},		//제품범주
				{name : 'PRD_TYPE_LV2_NM', align:"center"},		//제품군
				{name : 'PRD_TYPE_LV3_NM', align:"center"},		//제조사
				{name : 'PRD_NM', align:"center"},				//모델명
				{name : 'PRD_SPEC', align:"center"},	        //스펙
				{name : 'AST_SERIAL', align:"center"},			//시리얼
				{name : 'CONTRACT_ID', align:"center"},			//계약번호
				{name : 'MTN_STR_DATE', align:"center"},		//계약시작일
				{name : 'MTN_END_DATE', align:"center"},			//계약완료일
				{name : 'AST_MFR_DT', align:"center"},			//설치일  도입일 > 설치일
				{name : 'AST_TYPE2', align:"center"},			//포스번호
				{name : 'AST_TYPE1', align:"center"},			//위치정보
				{name : 'AST_SEQ', hidden : true},   //자산번호
				{name : 'AST_ST', hidden : true},    //자산상태
				{name : 'PRD_CD', hidden : true},    //제품코드
				{name : 'PRD_TYPE_LV1', hidden : true},  //제품범주
				{name : 'PRD_TYPE_LV2', hidden : true},   //제품군					
				{name : 'PRD_TYPE_LV3', hidden : true},   //장애유형	
			],
//			loadonce : true,
//			caption : "자산 정보",
			rownumbers : true,
			pager: "#callObsAssetGridNavi",			
		});
		$("#callObsAssetGrid").jqGrid("setFrozenColumns");
		$("#callObsAssetGrid").trigger("reloadGrid");	
	
		/* 동적 수정 처리 */
		$(document)
		.on("click",".select-btn",function(e){
			e.stopPropagation();
        	var rowData = $callObsAssetGrid.getRowData($(this).val());
        	$callObsAssetGrid.focusToRow();
        	$('#obsSelectAstSeq').val(rowData.AST_SEQ);
        	$('#obsSelectAstSt').val(rowData.AST_ST);
        	//TODO PRD_TYPE_SEQ 수정
			$('#obsAutoPrdCd').val(rowData.PRD_CD);

			var prdNm = rowData.PRD_NM;
			var prdSpec = rowData.PRD_SPEC;
			var prdSerial = rowData.AST_SERIAL;
			$('#obsSelectSerialNo').val(prdSerial);
			$('#obsRcptAstSerial').val(prdSerial);
			$('#obsAutoPrdNm').val(rowData.PRD_CD +' ['+rowData.PRD_NM+'  '+rowData.PRD_SPEC+'] ');
			var proCateInfo = rowData.PRD_TYPE_LV1_NM +">"+ rowData.PRD_TYPE_LV2_NM + ">" + rowData.PRD_TYPE_LV3_NM + ">";
			var modelNm = proCateInfo +  prdNm;
			$("#obsAutoPrdSearch").val(modelNm);
			$("#standardObstacleLv1 option:contains("+rowData.PRD_TYPE_LV1_NM+")").prop("selected", true); //장애유형> 제품범주선택
			MMSUtil.fnMakeObsRcptComboEtc($("#obsRcptLv1"), "", rowData.PRD_TYPE_LV1, "", "제품군", rowData.PRD_TYPE_LV2);	
			MMSUtil.fnMakeObsRcptComboEtc($("#obsRcptLv2"), "", rowData.PRD_TYPE_LV2, "", "장애구분", rowData.PRD_TYPE_LV3);				
		})
		.on("click",".nonselect-btn",function(e){
			e.stopPropagation();
			$callObsAssetGrid.focusRemove();
			$('#obsSelectAstSeq').val("");
			$('#obsRcptAstSerial').val("");
			fnObsSelectedPrdClear();			
		});
		//[FN] 선택버튼생성
		function inMakeActionBution(cellvalue, options, rowObject) {
            var reLoadButton = '<button type="button" class="btn btn-info btn-xs m-r-5 select-btn" value="'+(options.rowId)+'" >선택</button>'
             				 + ' <button type="button" class="btn btn-danger btn-xs m-r-5 nonselect-btn" value="'+(options.rowId)+'" >취소</button>';
            return reLoadButton;
		}
	
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
    						body:"<div>장애내용 상세보기 개발예정</div>",
    						onload : function(modal) {
    							modal.show();
    						}

    					});
    				});
    				listTitle.append("["+obsDr.RCPT_DT+" "+obsDr.RCPT_TIME+"] ");
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
    				listTitle.append("["+astDr.AST_HST_DT+"][<strong>"+astDr.AST_HST_ST_NM+"</strong>] SN : "+astDr.AST_SERIAL+"<br>"+astDr.PRD_TYPE_LV1_NM+">"+astDr.PRD_TYPE_LV2_NM+">"+astDr.PRD_TYPE_LV3_NM+">"+astDr.PRD_NM+" ");
    				listLi.append(listBody.append(listTitle).append(astDr.AST_HST_CONT));
    				$("#obsAstHstList").append(listLi);
    			} 
    		}
    	});
    }
    //선택 Site 신고자 이력 조회
    function fnCustHitList(strCd){
    	$.ajax({
    		url : "/ctrl/call/obstacle/receipt/listCustHst",
    		data :{strCd:strCd},
    		type : "POST",
    		dataType : "json",
    		cache: false,
    		success : function(result) {
    			var dtGrid = result.dt_grid;
    			$("#obsCustHstList").html("");
    			for (var i = 0; i < dtGrid.length; i++) {
    				var custDr = dtGrid[i];
    				var listLi = $('<li class="media media-sm" />');
    				var listBody = $('<div class="media-body" />');
    				var listTitle = $('<h5 class="media-heading" />');
    				listTitle.append(custDr.RCPT_CUST_INFO);
    				listLi.append(listBody.append(listTitle));
    				$("#obsCustHstList").append(listLi);
    			} 
    		}
    	});
    }
 
    //선택 점포 예방점검 이력 조회
    function fnPreventHitList(strCd){
      	$.ajax({
    		url : " /ctrl/call/obstacle/receipt/listPreventHst",
    		data :{strCd:strCd},
    		type : "POST",
    		dataType : "json",
    		cache: false,
    		success : function(result) {
    			var dtGrid = result.dt_grid;
    			$("#obsPreventHstList").html(""); 	
    			for (var i = 0; i < dtGrid.length; i++) {
    				var prvDr = dtGrid[i];
    				var listLi = $('<li class="media media-sm" />');
    				var listBody = $('<div class="media-body" />');
    				var listTitle = $('<h5 class="media-heading" />');  			   
    				listTitle.append(prvDr.ASP_CATE);
    				var listData  = "점검일자 : "+ prvDr.CHECK_DT ;
    					listData += "<br/> 점검자명:"+prvDr.ENGR_NM ;
    					listData += "<br/> 점검파일유무:"+prvDr.ATTACH_YN ;
    					listData += "<br/> 엔지니어서명유무:"+prvDr.ENGR_SIGN_YN ;    	
    					listData += "<br/> 담당자서명유무:"+prvDr.MNG_SIGN_YN ;      					
    				listLi.append(listBody.append(listTitle).append(listData));
    				$("#obsPreventHstList").append(listLi);
    			}
    		}
      	});
    }
    
    //장애 접수 저장
    function fnObsRcptSave(){

        //접수정보 
    	var strCd = $("#obsSelectStrCd").val();      //점포코드
    	var astSeq = $("#obsSelectAstSeq").val();    //자산코드
    	var astSt = $('#obsSelectAstSt').val();       //자산상태 
    	var rcptCustNm = $("#obsRcptCustNm").val();    //이름[신고자]
    	var rcptCustPhone = $("#obsRcptCustPhone").val();  //전화번호[신고자]
    	var rcptCustEmail = $("#obsRcptCustEmail").val();  //이메일[신고자]
    	var rcptCustType = $("#obsRcptCustType").val();  //유형[신고자]
    	var rcptCont = $("#obsRcptCont").val();   //접수내용
    	var rcptDt = $("#obsRcptDate").val();  //접수일
    	var rcptTime = $("#obsRcptTime").val();  //접수시간
    	
    	var rcptType2 = $("#obsRcptStsType2").val(); //처리상태
        
    	//장애분류 
    	var rcptObsLv1 = $("#obsRcptLv1").val();  //제품군
    	var rcptObsLv2 = $("#obsRcptLv2").val();  //장애구분
    	var rcptObsLv3 = $("#obsRcptLv3").val();  //장애유형
    	var rcptObsLv4 = $("#obsRcptLv4 option:selected").val();  //장애원인
    	
    	//제품
		var prdCd = $("#obsAutoPrdCd").val();
		if(strCd ==""){
			alert("점포틑 선택해주세요.");
			$("#obsStrSearchNm").focus();
			return;
		}else if(rcptObsLv1 ==""){
			alert("제품군을 선택해주세요");
			$("#rcptObsLv1").focus();
			return;
		}else if(rcptObsLv2 ==""){
			alert("장애구분을 선택해주세요");
			$("#rcptObsLv2").focus();
			return;
		}else if(rcptObsLv3 ==""){
			alert("장애유형을 선택해주세요");
			$("#rcptObsLv3").focus();
			return;
/*			
		}else if(rcptObsLv4 ==""){
			alert("장애원인을 선택해주세요");
			$("#rcptObsLv4").focus();
			return;				
*/
		}else if(rcptDt ==""){
			alert("접수일자를 입력해주세요.");
			$("#obsRcptDate").focus();
			return;
		}else if(rcptTime ==""){
			alert("접수시간을 입력해주세요.");
			$("#obsRcptTime").focus();
			return;
			/*
		}else if(rcptCustNm ==""){
			alert("신고자 전화번호를 입력해주세요.");
			$("#obsRcptCustNm").focus();
			return;
		*/
		}else if(rcptCont ==""){
			alert("접수내용을 입력해주세요.");
			$("#obsRcptCont").focus();
			return;
		}

		
		//처리
		var rcptStsType2 = $("#obsRcptStsType2").val(); //처리 구분		
		var rcptStsType = $("#obsRcptStsType").val(); //처리 상태
		var rcptStsDt = $("#obsRcptStsDate").val();   //방문일
		var rcptStsTime = $("#obsRcptStsTime").val();  //방문시간
		var rcptCompDt = $("#obsRcptCompDate").val();   //완료일
		var rcptCompTime = $("#obsRcptCompTime").val();  //완료시간		
		var rcptStsCont = $("#obsRcptStsCont").val();  //처리내용
		var areaCd      = $("#obsRcptStsArea").val();     //담당부서
		var rcptStsEngr = $("#obsRcptStsEngr").val();  //담당엔지니어아이디
		var rcptStsEngrNm = $("#obsRcptStsEngrNm").val();  //담당엔지니어이름	
		var rcptStsEngrId = $("#obsRcptStsEngrID").val();  //담당엔지니어번호		
		var rcptStsCost = $("#obsRcptStsCost").val();   //금액
		var rcptStsCostType = $("#obsRcptStsCostType").val();   //유무상
		var rcptStsDpstYn = $("#obsRcptStsDpstYn").val();  //입금여부 [미사용]
		var rcptStsCostDt = $("#obsRcptStsCostDt").val();  //입금일
		var rcptStsDpstNm = $("#obsRcptStsDpstNm").val();  //입금자명

		 //처리 
//    	if(rcptStsType !="" || rcptStsCont  !=""){
		    if(rcptStsType2 =="" ){
    			alert("처리구분을 선택해주세요.");
    			$("#obsRcptStsType2").focus();
    			return;		    
    		}else if(rcptStsType =="" ){
    			alert("처리상태를 선택해주세요.");
    			$("#obsRcptStsType").focus();
    			return;
 			//=> 처리완료 시 또는 배정시 엔지니어 체크로직 필요.
    			 
//    		}else if(rcptStsCont =="" ){
//    			alert("처리내용을 입력해주세요.");
//    			$("#obsRcptStsCont").focus();
//    			return;
//    		}else if(rcptStsDt =="" ){
//    			alert("방문일을 입력해주세요.");
 ///   			$("#obsRcptStsDate").focus();
//    			return;
//    		}else if(rcptStsTime =="" ){
//    			alert("방문시간을 입력해주세요.");
//   			$("#obsRcptStsTime").focus();
//    			return;
    		}else if(rcptStsCostType == "02" && rcptStsCost == ""){
		    	alert("금액을 입력해주세요.");
		    	$("#obsRcptCost").focus();
		    	return;
		    }
//    	}
    	var prevRcptStsType = "01";
    	//장애등록, 앤지니어 미배정, 장애처리 미선택
    	if(rcptStsEngr != "" && rcptStsType ==""){
    		rcptStsType ="100";
    	}

		//배정시 엔지니어 체크
		var array_info = ['07'];
		if($.inArray($("#obsRcptStsType").val(), array_info) > -1){ 
			if(!$("#obsRcptStsEngr").val()){
				alert("엔지니어를 선택해주세요.");
				$("#obsRcptStsEngr").focus();	
				return;
			}
		}
    	
    	
		if(!confirm("장애접수내용을 저장하시겠습니까?")){
			return;
		}
		
		var pushType ="";
		var PUSH_MSG ="";
		var userIdArr = "";
		var typeText = $("#obsRcptStsType option:selected").text();
		var engrText = $("#obsRcptStsEngr option:selected").text();
		var areaText = $("#obsRcptStsArea option:selected").text();
		var userNm = userInfo.s_userNm;
		var strNm = $('#obsSelectStrNm').text();
		var strPhone = $('#obsSelectStrPhone').text();
		var obsRcptLv1 = $('#obsRcptLv1 option:selected').text();
		var obsRcptLv2 = $('#obsRcptLv2 option:selected').text();
		var obsRcptLv3 = $('#obsRcptLv3 option:selected').text();
		
		if(rcptStsEngr !=""){
			pushType ="USER";
			PUSH_MSG ="담당 : "+engrText+"\n";
			PUSH_MSG +="접수자 : "+userNm+"\n";
			PUSH_MSG +="점포 : "+strNm+"/"+strPhone+"\n";
			PUSH_MSG +="장애 : "+obsRcptLv1+" > "+obsRcptLv2+" > "+obsRcptLv3;
			userIdArr = rcptStsEngr;
		}else if(areaCd !=""){
			pushType ="AREA";
			PUSH_MSG ="담당 : "+areaText+"\n";
			PUSH_MSG +="접수자 : "+userNm+"\n";
			PUSH_MSG +="점포 : "+strNm+"/"+strPhone+"\n";
			PUSH_MSG +="장애 : "+obsRcptLv1+" > "+obsRcptLv2+" > "+obsRcptLv3;
		}
		
		var saveObsData = {
			strCd        : strCd		,
			astSeq       : astSeq		,
			astSt        : astSt		,
			rcptCustNm   : rcptCustNm	,
			rcptCustEmail: rcptCustEmail,
			rcptCustPhone: rcptCustPhone,
			rcptCustType : rcptCustType	,
			rcptCont     : rcptCont		,
			rcptDt       : rcptDt		,
			rcptTime     : rcptTime		,
			rcptObsLv1   : rcptObsLv1	,
			rcptObsLv2   : rcptObsLv2	,
			rcptObsLv3   : rcptObsLv3	,
			rcptObsLv4   : rcptObsLv4	,
			prdCd        : prdCd		,
			
			prevRcptStsType  : prevRcptStsType ,	//접수코드
			rcptStsType  : rcptStsType ,
			rcptStsDt    : rcptStsDt   ,           //방문일
			rcptStsTime  : rcptStsTime ,			//방문시간
			rcptCompDt   : rcptCompDt   ,           //완료일
			rcptCompTime : rcptCompTime ,			//완료시간
			rcptStsCont  : rcptStsCont ,
			rcptStsEngr  : rcptStsEngr	,               //엔지니어아이디
			rcptStsEngrNm  : rcptStsEngrNm	,			//엔지니어이름
			rcptStsEngrId  : rcptStsEngrId	,			//엔지니어번호
			areaCd 	 : areaCd,
			
			rcptStsCost  	: rcptStsCost ,
			rcptStsCostType : rcptStsCostType ,
			rcptStsDpstYn   : rcptStsDpstYn ,
			rcptStsCostDt   : rcptStsCostDt ,
			rcptStsDpstNm   : rcptStsDpstNm ,
			
			PUSH_MSG   	: PUSH_MSG, 
			pushType   	: pushType, 
			userIdArr	: userIdArr	
		};
		App.prcsStart();
    	$.ajax({
    		url : "/ctrl/call/obstacle/receipt/saveRcpt",
    		data :saveObsData,
    		type : "POST",
    		dataType : "json",
    		cache: false,
    		success : function(result) {
    			App.prcsEnd();
    			if(result.stsCd == 100){
                  if($("#obsRcptStsType").val() =="07"){
                	 console.log("--- 메일 발송 ---");
            		var rcptMailData = { 
            				rcptSeq : result.rcptSeq
            		}
	    				//=> 메일 발송 처리 
    				var ret = fnSendMailing(rcptMailData);
    				console.log(ret);
                  }
/*
    				console.log(result);
    			    if(!ret){
    			    	if(confirm("메일 발송에 실패하였습니다. \n 다시보내시겠습니까?")){
    			    		fnSendMailing();
    			    	   return false;
    			    	}
    			    }
*/
    				alert(result.msgTxt);
    				if(confirm("접수되었습니다.\n모두초기화 하시겠습니까?")){
    					
    					fnObsSelectedAllClear();
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
			alert("장애제품군을 선택해주세요.");
			$("#obsRcptLv1").focus();
			return;
		}else if(obsRcptLv2 == ""){
			alert("장애구분을 선택해주세요.");
			$("#obsRcptLv2").focus();
			return;
		}else if(obsRcptLv3 == ""){
			alert("장애유형을 선택해주세요.");
			$("#obsRcptLv3").focus();
			return;
		}else if($.trim(obsRcptLv4) == ""){
			alert("장애 원인을 입력해주세요.");
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
    
    function fnObsSelectedAllClear(){
    	$callObsAssetGrid.paragonGridClear();
    	//점포정보 초기화
		fnObsSelectedStrClear();
		//장애접수 초기화
		fnObsSelectedObsClear();
		//장애처리 초기화
		fnObsSelectedStsClear();
		//시리얼초기화
		fnObsSelectedSerialClear();
		//장애이력 초기화
		$("#obsRcptHstList").html("");
		//자산이력 초기화
		$("#obsAstHstList").html("");
		//예방점검이력 초기화
		$('#obsPreventHstList').html("");
    }
    
    //시리얼 초기화
    function fnObsSelectedSerialClear(){
    	$("#obsSelectAstSeq").val("");
    	$("#obsRcptAstSerial").val("");
    }
    //장애처리 초기화
    function fnObsSelectedStsClear(){

    	//부서&엔지니어 로그인정보 ..
    	MMSUtil.fnMakeAreaCombo($("#obsRcptStsArea"),userInfo.s_areaCd, userInfo.s_companyCd, false, true);
		getEngr = EngrInfo(userInfo.s_userId);
    	MMSUtil.fnMakeEngrCombo($("#obsRcptStsEngr"),{areaCd:userInfo.s_areaCd,  aspCompCd:userInfo.s_companyCd}, userInfo.s_userId);

 // 	$("#obsRcptStsEngr").val(""); 
   // 	$("#obsRcptStsArea").val("");  
    	
    	$("#obsRcptStsType").val("");
    	$("#obsRcptStsFreeYn").val("");
    	$("#obsRcptStsDate").val("");
    	$("#obsRcptStsTime").val("");
    	$("#obsRcptCompDate").val("");  
    	$("#obsRcptCompTime").val("");  
    	$("#obsRcptStsCostType").val("");
    	$("#obsRcptStsType2").val("N").trigger("change"); 
    	$("#obsRcptStsCost").val("");
    	$("#obsRcptStsCont").val(""); 
    }
    //접수정보 초기화
    function fnObsSelectedObsClear(){
    	$("#obsRcptCustType").val("04");
    	$("#obsRcptCustNm").val("");
    	$("#obsRcptCustPhone").val("");
    	$("#obsRcptCustEmail").val("");
    	$("#obsRcptCont").val("");
    	$("#obsRcptDate").datepicker('setDate', Util.LocalDate());
    	$("#obsRcptTime").val(Util.LocalTime(24));
    	
		//장애분류
		fnObsSelectedStndObsClear();
		//제품정보
		fnObsSelectedPrdClear();
    }
    //장애분류 초기화
    function fnObsSelectedStndObsClear(){
    	$("#standardObstacleLv1").html('<option value="">제품범주</option>');  
    	$("#obsRcptLv1").html('<option value="">제품군</option>');
    	$("#obsRcptLv2").html('<option value="">장애구분</option>');
    	$("#obsRcptLv3").html('<option value="">장애유형</option>');
    	$("#obsRcptLv4").html('<option value="">장애원인</option>');
    	$("#obsRcptLv4").data('combobox').refresh();
    	
    }
    //품목 초기화
    function fnObsSelectedPrdClear(){
    	$("#obsAutoPrdSearch").val("");
    	$("#obsAutoPrdCd").val("");
		$("#obsAutoPrdNm").val("");
    }
    //점포 정보 초기화
    function fnObsSelectedStrClear(){
    	$("#obsStrSearchNm").val("");
    	//hidden변수
		$("#obsSelectStrCd").val("");
		$("#obsSelectCompCd").val("");
		$("#obsSelectBrndCd").val("");
		
		$("#obsSelectStrNm").text("");
		$("#obsSelectStrMngCd").text("");
		$("#obsSelectStrOpenDt").text("");
		$("#obsSelectStrRenualDt").text("");
		$("#obsSelectStrLocationDt").text("");
		$("#obsSelectStrAddr1").text("");
		$("#obsSelectStrPhone").text("");
		$("#obsSelectStrAddMngStr").text("");
		$("#obsSelectStrSv").text("");
		$("#obsSelectStrVpnModel").text("");
		$("#obsSelectStrTelecomCd").text("");
		$("#obsSelectStrSt").text("");
		$("#obsSelectStrApYN").text("");
		$("#obsSelectStrArea").text("");
		$("#obsSelectStrEtcMemo").html("");
		$("#callObsRcptCompFileNmView").html("");
    }
    //점포 정보 보기
    function fnObsSelectedStrView(result){
    	$("#obsSelectStrCd").val(result.STR_CD);
		$("#obsSelectCompCd").val(result.COMP_CD);
		$("#obsSelectBrndCd").val(result.BRND_CD);
		$("#obsSelectStrMngCd").text(result.MNG_CD);
		$("#obsSelectStrSt").text(result.STR_TYPE_NM+' '+result.STR_ST_NM+' '+result.STR_ST_DT);
		var phoneNum = result.PHONE_NUM;
	
		$("#obsSelectStrAddMngStr").text(result.OPER_STR_NM);
		$("#obsSelectStrSv").text(result.CHARGE_SV);
		$("#obsSelectStrNm").text(result.STR_NM);
		$("#obsSelectStrVpnModel").text(result.IP_ADDRESS);
		$("#obsSelectStrTelecomCd").text(result.TELECOMMUNITY_CD_NM);
		$("#obsSelectStrApYN").text(result.AP_YN_NM);
		$("#obsSelectStrArea").text(result.AREA_NM);
		$("#obsSelectStrEtcMemo").text(result.ETC_MEMO);
		var zipCd = result.ZIP_CD;
		if(zipCd != ""){
			zipCd ="("+zipCd+") "
		}
		$("#obsSelectStrAddr1").text(zipCd+result.ADDR1);
		
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
    
    function fnSetDateTime(){
    	$("#obsRcptDate").datepicker('setDate', Util.LocalDate());
    	$("#obsRcptTime").val(Util.LocalTime(24));
   // 	$("#obsRcptStsDate").datepicker('setDate', Util.LocalDate());
   // 	$("#obsRcptStsTime").val(Util.LocalTime(24));
    }
    
    function fnUpdateSerial(flag){
	    var strCd = $("#obsSelectStrCd").val();
		var prdCd = $("#obsAutoPrdCd").val();
		var astSeq = $("#obsSelectAstSeq").val();
		var serialNo = $('#obsRcptAstSerial').val();
		var jsonData = {
				"modFlag":flag,
				"strCd":strCd,
				"prdCd":prdCd,
				"astSeq":astSeq,
				"serialNo":serialNo
		}
	
		if(serialNo === ''){
			alert("시리얼을 입력해 주세요.");
			return;
		}
		if(strCd === ''){
			alert("SITE를 선택해 주세요");
			return;
		}
		if(prdCd === ''){
			alert("품번이 없습니다. 품목을 검색해 주세요.");
			return;
		}
		if(serialNo.length < 5 || serialNo.length > 30){
			alert("5자리 이상 30자리 이하로 입력해주세요.");
			return;
		}
		
		if(astSeq === serialNo){
			return;
		}
		
		$.ajax({
			url:'/ctrl/asset/asset/saveAssetSerial',
			data: jsonData,
			success: function(result){
				//console.log(result);
				var stsCd = result.stsCd;
				if ( stsCd == 100 ) {
					alert(result.msgTxt);
					$callObsAssetGrid.paragonGridReload();  
				}else if(stsCd === 300){
					alert(result.COMP_NM +' '+result.STR_NM +' '+result.msgTxt);
				}else {
					alert(result.msgTxt);
				}
			}
		
		});
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
	ObstacleReceiptApp.init();
});

