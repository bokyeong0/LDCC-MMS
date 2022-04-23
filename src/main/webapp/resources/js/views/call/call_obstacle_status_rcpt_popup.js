/** Copyright (c) 2017 VertexID RND, Inc.
 * 
 * Application Name : 콜센터 장애 접수 현황 POP [ObstacleReceiptApp]
 * Program Code     : PC0101
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * 김진호			2017. 3. 16. 		First Draft.        javascript
 */


var ObsStsRcptPopupApp = function () {
	"use strict";
	
	// [El]장애수정 POP
	var $callObsStsRcptModPopup = $("#callObsStsRcptModPopup");
	
	// [El]자산정보 그리드
	var $callObsStsPopupAstGrid =  $("#callObsStsPopupAstGrid"); 
	
	// 팝업 파라메터
	var popUpData = $callObsStsRcptModPopup.PopAppGetData();
	
	// 장애번호
	var parasRcptSeq = popUpData.rcptSeq;
	// 모드FLAG
	var parasModFlag = popUpData.modFlag;
	// 점포코드
	var paramsStrCd = popUpData.strCd;
	// 자산코드
	var paramsAstSeq = popUpData.astSeq;
  
	var parAspCompCd = popUpData.aspCompCd;
	// 사용자 정보
	var userInfo = Util.getUserInfo();

    return {
        init: function () {
 
           	//수정화면
        	fnGetObsRcptPopMode(parasRcptSeq);
        	
        	//이벤트 생성
        	fnObsStsPopupEvent();      
        	
        	//그리드 생성
        	var params = {strCd: paramsStrCd, aspCompNm : parAspCompCd}
        		fnObsStsPopupMakeGrid(params);
        	
           
	    }
    };
    
    //[Fn] 이벤트 
    function fnObsStsPopupEvent(){
    	MMSUtil.fnMakeObsRcptCombo($("#callObsStsLv1Search"), $("#obsRctStsPaterSearch").val(), "", "", "제품군");
    	//접수일시
    	$("#callObsStsPopupRcptDtForm").datepicker({todayHighlight: true,autoclose: true});
    	//접수시간
    	$("#callObsStsPopupRcptTime").timepicker({showMeridian:false ,defaultTime:false});
    	//방문일시
    	$("#callObsStsPopupRcptVisitDtForm").datepicker({todayHighlight: true,autoclose: true});	
    	//방문시간
       	$("#callObsStsPopupRcptVisitTime").timepicker({showMeridian:false ,defaultTime:false}); 	
    	
    	//장애분류 18.02.07
    	//$("#callObsStsPopupRcptLv4").combobox({nonReset:true}); 18.02.07

		//장애분류 이벤트
		MMSUtil.fnObsRcptComboRelay({
			compCdId 	 : "#callObsStsPopupSelectCompCd",
			obsRcptLv1Id : "#callObsStsPopupRcptLv1",
			obsRcptLv2Id : "#callObsStsPopupRcptLv2",
			obsRcptLv3Id : "#callObsStsPopupRcptLv3",
			//obsRcptLv4Id : "#callObsStsPopupRcptLv4", 18.02.07
		});
		
    	//=>제품범주 선택
        $("#callStandardObsStsPopupRcptLv1").change(function(){
        	if(!$(this).val()) $("#callObsStsPopupRcptLv1").html('<option value="">제품군</option>');
        	else MMSUtil.fnMakeObsRcptCombo($("#callObsStsPopupRcptLv1"), "",$(this).val(), "", "제품군");
			$("#callObsStsPopupRcptLv2").html('<option value="">장애구분</option>');
	    	$("#callObsStsPopupRcptLv3").html('<option value="">장애유형</option>');
	    	//$("#callObsStsPopupRcptLv4").html('<option value="">장애원인</option>'); 18.02.07
	    	//$("#callObsStsPopupRcptLv4").data('combobox').refresh();  18.02.07
        });
		
		$("#standardCompanyModifyPopupUpdateBtn").click(function(){
			fnObsRcptPopRcptSave();
		});
		$("#standardCompanyModifyPopupDelBtn").click(function(){
			if(confirm("삭제하시겠습니까?")){
				fnObsRcptPopRcptDelete();
			}
		});
		$("#callObsStsPopupStrSearchReset").click(function(){
			//Site정보 초기화
//			fnObsPopupSelectedStrClear();
			//장애분류 초기화
			fnObsPopupSelectedStndObsClear();
			$("#callObsStsPopupCompNmSearch").focus();
		});
		
		//점포 자동완성
		$("#callObsStsPopupCompNmSearch").strAutoComplate({
			onSelect: function(result){
				//점포 정보

				var areaSeq = result.AREA_SEQ;
				var compCd = result.COMP_CD;
				var strCd = result.STR_CD;
				var aspCompCd = result.ASP_COMP_CD;
				$("#callObsStsPopupArea").val(areaSeq);
				//=> 점포정보 세팅
				 $("#callObsStsPopupSelectStrCd").val(strCd);
				 $("#callObsStsPopupSelectCompCd").val(compCd);
				//엔지니어 콤보박스 생성
				//MMSUtil.fnMakeEngrCombo($("#callObsStsPopupEngr"),{areaSeq:areaSeq});
				$("#callObsStsPopupEngr").val(areaSeq);
				//장애분류 콤보박스 생성
				MMSUtil.fnMakeObsRcptCombo($("#callObsStsPopupRcptLv1"), compCd, "", "", "제품군");
				$("#callObsStsPopupRcptLv2").html('<option value="">장애구분</option>');
		    	$("#callObsStsPopupRcptLv3").html('<option value="">장애유형</option>');
		    	/* 처리현황에 장애원인 등록으로 삭제
		    	$("#callObsStsPopupRcptLv4").html('<option value="">장애원인</option>');
		    	$("#callObsStsPopupRcptLv4").data('combobox').refresh();
		        */
				//점포 자산정보조회
				$callObsStsPopupAstGrid.paragonGridSearch({
					strCd : strCd, s_compCd : compCd,
					obsAssetSel : null, obsAssetSearch : null
				});
			}
		});
		
		
		$('#callObsStsPopupAutoPrdNm').prop("readOnly", true);
		$('#callObsStsPopupAutoPrdNmResetBtn').click(function(){
			fnObsPopupSelectedPrdClear();
			$('#callObsStsPopupAutoPrdSearch').focus();
		});
		
		//엔지니어 부서 변경
		$("#callObsStsPopupArea").change(function(){
//			$("#obsStrSearchNm").focus();
			var selectVal = $(this).val();
				MMSUtil.fnMakeEngrCombo($("#callObsStsPopupEngr"),{areaCd:selectVal, aspCompCd:$("#callObsStsPopupSelectAspCompCd").val()});

		});
	

	 	//엔지니어 선택
    	$("#callObsStsPopupEngr").change(function(){   
    		EngrInfo($("#callObsStsPopupEngr").val());
    	});	
   
        //자산내역 검색
		$("#callObsPopAssetSearchBtn").click(function(){
			fnPopAssetGridSearch();
		});	
		$('#callObsPopAssetSearch').keyup(function(e) {
		    if (e.keyCode == 13){
		    	fnPopAssetGridSearch();
		    }   
		});		
		
    }
 
    function fnPopAssetGridSearch(){
    	var strCd = $("#callObsStsPopupSelectStrCd").val();
    	var compCd	   = $("#callObsStsPopupSelectCompCd").val();
		var obsAssetSel =  $("#callObsPopAssetSel").val();
		var obsAssetSearch =  $("#callObsPopAssetSearch").val();
		
		  if(!$("#callObsStsPopupCompNmSearch").val()){
			  alert("점포 검색 후 이용해주세요.");
			  $("#callObsStsPopupCompNmSearch").focus();
			  return false;
		  }
				
    	var searchData = {
    	    strCd  : strCd, 
    	    compCd : compCd, 
    		obsAssetSel	:  obsAssetSel,
    		obsAssetSearch : obsAssetSearch
    	}     
    	$callObsStsPopupAstGrid.search(searchData);	
    }
        
   
    function fnObsStsPopupMakeGrid(jsonData){
    	$callObsStsPopupAstGrid.paragonGrid({
    		url: '/ctrl/asset/asset/listAssetSearch',
    		page : 1,
    		sortable : false,
    		hidegrid: false,
    		postData: jsonData,
    		height: 100,
    		rowHeight : "S",
//    		firstData : false,
    		rowClickColor:"yellow",
    		shrinkToFit: false,
			gridResize:{minWidth: "3056",maxWidth:"3056"},   		
			colNames :["선택","관리코드","고객사명","점포명","점포형태","파트너사","제품범주","제품군","제조사","모델명","SPEC","시리얼","계약번호","계약시작일","계약완료일","설치일","포스번호","위치정보","AST_SEQ","AST_ST","PRD_CD","PRD_TYPE_LV1", "PRD_TYPE_LV2","PRD_TYPE_LV3"],
    		
    		colModel : [ 
    	        {width:"100px",editable: false,align:"center",name:'EVENT',formatter:inMakeActionBution,frozen:true},					
				{name : 'MNG_CD', align:"center"},	 	//관리코드 점포코드  > 관리코드					
				{name : 'COMP_NM', align:"center"},		//고객사명
				{name : 'STR_NM', align:"center"},		//점포명
				{name : 'STR_TYPE_NM', align:"center"},	//점포형태
				{name : 'ASP_COMP_NM', align:"center"},		    //파트너사명					
				{name : 'PRD_TYPE_LV1_NM', align:"center"},		//제품범주
				{name : 'PRD_TYPE_LV2_NM', align:"center"},		//제품군
				{name : 'PRD_TYPE_LV3_NM', align:"center"},		//제조사
				{name : 'PRD_NM', align:"center"},				//모델명
				{name : 'PRD_SPEC', align:"center"},	        //스펙
				{name : 'AST_SERIAL', align:"center"},			//시리얼
				{name : 'CONTRACT_ID', align:"center"},			    //계약번호				
				{name : 'MTN_STR_DATE', align:"center"},		//계약시작일
				{name : 'MTN_END_DATE', align:"center"},			//계약완료일
				{name : 'AST_MFR_DT', align:"center"},			//설치일  도입일 > 설치일
				{name : 'AST_TYPE2', align:"center"},			//포스번호
				{name : 'AST_TYPE1', align:"center"},			//위치정보
    			{name : 'AST_SEQ', hidden : true},   	//자산번호
				{name : 'AST_ST', hidden : true},    	//자산상태    		
				{name : 'PRD_CD', hidden : true},    	//제품코드
				{name : 'PRD_TYPE_LV1', hidden : true},  //제품범주
				{name : 'PRD_TYPE_LV2', hidden : true},   //제품군					
				{name : 'PRD_TYPE_LV3', hidden : true},   //장애유형    			
    		],
    		loadonce : true,
    		rownumbers : true,
    		gridComplete: function(){
    			if(paramsAstSeq){ 
    				var grid = $callObsStsPopupAstGrid;
    				var ids = grid.jqGrid('getDataIDs');
    				for (var i = 0; i < ids.length; i++) {
    					var rowData = grid.getRowData(ids[i]);
    					var thisAstSeq = rowData.AST_SEQ;
    					//console.log("this : "+thisAstSeq);
    					if(paramsAstSeq == thisAstSeq){
    						grid.focusToRow(ids[i]);
    						break;
    					}
    				}
    			}
            }
    	});
    	$callObsStsPopupAstGrid.jqGrid("setFrozenColumns");
    	$callObsStsPopupAstGrid.trigger("reloadGrid");		

		/* 동적 수정 처리 */
		$(document)
		.on("click",".select-btn",function(e){
			e.stopPropagation();
        	var rowData = $callObsStsPopupAstGrid.getRowData($(this).val());
        	$callObsStsPopupAstGrid.focusToRow();
			var prdNm = rowData.PRD_NM;
        	$('#callObsStsPopupSelectAstSeq').val(rowData.AST_SEQ);
    		$('#callObsStsPopupAutoPrdCd').val(rowData.PRD_CD);
    		$('#callObsStsPopupAutoPrdNm').val(rowData.PRD_CD +' ['+rowData.PRD_NM+'  '+rowData.PRD_SPEC+'] '); //여기에 추가

			var proCateInfo = rowData.PRD_TYPE_LV1_NM +">"+ rowData.PRD_TYPE_LV2_NM + ">" + rowData.PRD_TYPE_LV3_NM + ">";
			var modelNm = proCateInfo +  prdNm;
    		$('#callObsStsPopupAutoPrdSearch').val(modelNm);
			$("#callStandardObsStsPopupRcptLv1 option:contains("+rowData.PRD_TYPE_LV1_NM+")").prop("selected", true); //장애유형> 제품범주선택
			MMSUtil.fnMakeObsRcptComboEtc($("#callObsStsPopupRcptLv1"), "", rowData.PRD_TYPE_LV1, "", "제품군", rowData.PRD_TYPE_LV2);	
			MMSUtil.fnMakeObsRcptComboEtc($("#callObsStsPopupRcptLv2"), "", rowData.PRD_TYPE_LV2, "", "장애구분", "");	
	    	$("#callObsStsPopupRcptLv3").html('<option value="">장애유형</option>');
	    //	$("#callObsStsPopupRcptLv4").html('<option value="">장애원인</option>'); 18.02.07
	    //	$("#callObsStsPopupRcptLv4").data('combobox').refresh();	18.02.07		
		})
		.on("click",".nonselect-btn",function(e){
    		e.stopPropagation();
    		$callObsStsPopupAstGrid.focusRemove();
    		$('#callObsStsPopupSelectAstSeq').val("");
    		fnObsPopupSelectedPrdClear();		
		});    	
    	function inMakeActionBution(cellvalue, options, rowObject) {
            var reLoadButton = '<button type="button" class="btn btn-info btn-xs m-r-5 select-btn" value="'+(options.rowId)+'" >선택</button>'
             				 + ' <button type="button" class="btn btn-danger btn-xs m-r-5 nonselect-btn" value="'+(options.rowId)+'" >취소</button>';
            return reLoadButton;
    	}
    }
    //장애처리 초기화
    function fnObsPopupSelectedStndObsClear(){
    	$("#callObsStsPopupRcptLv1").html('<option value="">제품군</option>');
    	$("#callObsStsPopupRcptLv2").html('<option value="">장애구분</option>');
    	$("#callObsStsPopupRcptLv3").html('<option value="">장애유형</option>');
    	//$("#callObsStsPopupRcptLv4").html('<option value="">장애원인</option>'); 18.02.07
    	//$("#callObsStsPopupRcptLv4").data('combobox').refresh(); 18.02.07
    	
    }
    //품목 초기화
    function fnObsPopupSelectedPrdClear(){
    	$("#callObsStsPopupAutoPrdSearch").val("");
    	$("#callObsStsPopupAutoPrdCd").val("");
		$("#callObsStsPopupAutoPrdNm").val("");
    }
    //Site 정보 초기화
    function fnObsPopupSelectedStrClear(){
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
    
    
    
    function fnGetObsRcptPopMode(rcptSeq){
    	$.ajax({
    		url : "/ctrl/call/obstacle/receipt/viewObsRcpt",
    		data :{rcptSeq:rcptSeq},
    		type : "POST",
    		dataType : "json",
    		async: false,
    		cache: false,
    		success : function(result) {
    			console.log(result)
    			var compCd = result.COMP_CD;
				var compNm = result.COMP_NM;
				var brndNm = result.BRND_NM;
				var strNm = result.STR_NM;
				var strCd = result.STR_CD;
				var areaSeq = result.AREA_SEQ;
				var custType = result.RCPT_CUST_TYPE;
				var custNm = result.RCPT_CUST_NM;
				var custPhone = result.RCPT_CUST_PHONE;
				var aspCompCd = result.ASP_COMP_CD;
				var aspAreaCd = result.RCPT_STS_AREA_CD;
				var rcptEngr = result.RCPT_ENGR;
				var sumNm = compNm+" "+brndNm+" ["+strNm+"]";
				$("#callObsStsPopupCompNmSearch").val(sumNm);
	
				$("#callObsStsPopupArea").val(aspAreaCd);
				$("#callObsStsPopupSelectCompCd").val(compCd);
				$("#callObsStsPopupSelectStrCd").val(strCd);
				$("#callObsStsPopupSelectAspCompCd").val(aspCompCd);
				var obsParam = {
						compCd : compCd,
						firstObsLv : '',
						rcptStdLv1 : result.PRD_TYPE_LV1,
						rcptObsLv1 : result.RCPT_OBS_LV1,
						rcptObsLv2 : result.RCPT_OBS_LV2,
						rcptObsLv3 : result.RCPT_OBS_LV3,
					//	rcptObsLv4 : result.RCPT_OBS_LV4  18.02.07
				}
				
				
		    	//제품검색 [장애유형 추가]
				$("#callObsStsPopupAutoPrdSearch").prdAutoComplate({
					prdCdId	: "#callObsStsPopupAutoPrdCd",
					prdNmId	: "#callObsStsPopupAutoPrdNm",
					prdTLv1 : "#callStandardObsStsPopupRcptLv1",
					prdTLv2 : "#callObsStsPopupRcptLv1",
					obsLv3  : "#callObsStsPopupRcptLv2",
				});		
				//=> 장애유형 제품범주 불러오기
				MMSUtil.fnMakeObjstacleLv1Combo($("#callStandardObsStsPopupRcptLv1"), result.PRD_TYPE_LV1,"제품범주");
								
				
                //=> 장애유형 정보 불러오기
			     MMSUtil.fnMakeObsRcptComboSet(obsParam);
				
			    //권역 콤보박스 생성 [파트너사 지역 정보]
			    (userInfo.s_areaCd)? $("#callObsStsPopupArea").attr('disabled','true'):"";
			    MMSUtil.fnMakeAreaCombo($("#callObsStsPopupArea"), aspAreaCd, aspCompCd, false, true);
			   	//파트너사 담당엔지니어	    
				MMSUtil.fnMakeEngrCombo($("#callObsStsPopupEngr"),{areaCd:aspAreaCd, aspCompCd:aspCompCd},rcptEngr);
				
    			//=> 신고자 정보 
    	    	//공통코드 콤보박스 생성(CUST_TYPE)
    	    	MMSUtil.fnMakeCommCombo($("#callObsRcptCustType"),"OS0003",custType);
    			$("#callObsStsPopupRcptCustNm").val(result.RCPT_CUST_NM);
    			$("#obsRcptCustPhone").val(result.RCPT_CUST_PHONE);
    			$("#obsRcptCustEmail").val(result.RCPT_CUST_EMAIL);
				
				if(rcptEngr) EngrInfo(rcptEngr);
		    	else EngrInfo(userInfo.s_userId);					    	
		    	
     			$("#callObsStsPopupRcptCont").val(result.RCPT_CONT);
    			$("#callObsStsPopupRcptCustNm").val(result.RCPT_CUST_NM);
    			$("#callObsStsPopupRcptDt").val(result.RCPT_DT);
    			$("#callObsStsPopupRcptTime").val(result.RCPT_TIME);
    			$("#callObsStsPopupRcptVisitDt").val(result.RCPT_VISIT_YMD);
    			$("#callObsStsPopupRcptVisitTime").val(result.RCPT_VISIT_TIME);  			
    			
    			$('#callObsStsPopupSelectAstSeq').val(result.AST_SEQ);
    			$('#callObsStsPopupAutoPrdSearch').val(result.RCPT_PRD_NM);
    			$('#callObsStsPopupAutoPrdCd').val(result.PRD_CD);
    			$('#callObsStsPopupAutoPrdNm').val(result.PRD_CD+' ['+result.PRD_NM+' '+result.PRD_SPEC+']');


    			
    			$callObsStsRcptModPopup.show();
    			
                

    		}
    	});
  
	}
   
    function fnObsRcptPopRcptSave(){
    	
        //접수정보 
    	var strCd = $("#callObsStsPopupSelectStrCd").val();
    	var astSeq = $("#callObsStsPopupSelectAstSeq").val();
    	var rcptCustType =  $("#callObsRcptCustType").val();
    	var rcptCustNm = $("#callObsStsPopupRcptCustNm").val();
    	var rcptCont = $("#callObsStsPopupRcptCont").val();
    	var rcptDt = $("#callObsStsPopupRcptDt").val();
    	var rcptTime = $("#callObsStsPopupRcptTime").val();
    	var rcptVisitDate = $("#callObsStsPopupRcptVisitDt").val();
    	var rcptVisitTime = $("#callObsStsPopupRcptVisitTime").val();
    	var rcptAreaCd = $("#callObsStsPopupArea").val(); //담당지역
    	var rcptEngr = $("#callObsStsPopupEngr").val(); //엔지니어아이디
    	var rcptEngrSeq = $("#callObsStsPopupEngrID").val(); //엔지니어번호    	
    	var rcptEngrNm = $("#callObsStsPopupEngrNm").val(); //엔지니어이름  
    	var autoPrd  = $("#callObsStsPopupAutoPrdSearch").val()//모델명
    	
        //장애분류 
    	var rcptObsLv1 = $("#callObsStsPopupRcptLv1").val();
    	var rcptObsLv2 = $("#callObsStsPopupRcptLv2").val();
    	var rcptObsLv3 = $("#callObsStsPopupRcptLv3").val();
    	//var rcptObsLv4 = $("#callObsStsPopupRcptLv4").val(); 18.02.07
        	
		var prdCd = $("#callObsStsPopupAutoPrdCd").val();
//		var patCd = $("#callObsStsPopupAutoPat").val();
		
    		
		if(strCd ==""){
			alert("Site을 선택해주세요.");
			$("#callObsStsPopupSelectStrCd").focus();
			return;
		}else if(autoPrd ==""){
			alert("모델명을 선택해주세요");
			$("#callObsStsPopupAutoPrdSearch").focus();
			return;			
		}else if(rcptObsLv1 ==""){
			alert("제품군을 선택해주세요");
			$("#callObsStsPopupRcptLv1").focus();
			return;
		}else if(rcptObsLv2 ==""){
			alert("장애구분을 선택해주세요");
			$("#callObsStsPopupRcptLv2").focus();
			return;
		}else if(rcptObsLv3 ==""){
			alert("장애유형을 선택해주세요");
			$("#callObsStsPopupRcptLv3").focus();
			return;
//		}else if(rcptObsLv4 ==""){
//			alert("장애 내용 선택해주세요");
//			$("#callObsStsPopupRcptLv4").focus();
//			return;
		}else if(rcptDt ==""){
			alert("접수일자를 입력해주세요.");
			$("#callObsStsPopupRcptDt").focus();
			return;
		}else if(rcptTime ==""){
			alert("접수시간을 입력해주세요.");
			$("#callObsStsPopupRcptTime").focus();
			return;
		}else if(rcptCont ==""){
			alert("접수내용을 입력해주세요.");
			$("#callObsStsPopupRcptCont").focus();
			return;
		}

		if(!confirm("장애접수내용을 저장하시겠습니까?")){
			return;
		}
		var saveObsData = {
			strCd        : strCd       ,
			rcptSeq      : parasRcptSeq  ,
			astSeq       : astSeq       ,
			rcptCustType : rcptCustType  ,			
			rcptCustNm   : rcptCustNm  ,
			rcptCont     : rcptCont    ,
			rcptDt       : rcptDt      ,
			rcptTime     : rcptTime    ,
			rcptVisitDate : rcptVisitDate ,
			rcptVisitTime : rcptVisitTime ,
			rcptAreaCd   : rcptAreaCd ,
			rcptEngr     : rcptEngr    ,
			rcptEngrSeq  : rcptEngrSeq ,
			rcptEngrNm   : rcptEngrNm  ,
			rcptObsLv1   : rcptObsLv1  ,
			rcptObsLv2   : rcptObsLv2  ,
			rcptObsLv3   : rcptObsLv3  ,
		//	rcptObsLv4   : rcptObsLv4  , 18.02.07
			prdCd        : prdCd       ,
//			patCd        : patCd       ,
			
		};
//    	return;
    	$.ajax({
    		url : "/ctrl/call/obstacle/receipt/updateRcpt",
    		data :saveObsData,
    		type : "POST",
    		dataType : "json",
    		cache: false,
    		success : function(result) {
    			console.log(result);
    			if(result.stsCd == 100){
    				alert(result.msgTxt);
    				$callObsStsRcptModPopup.paragonClosePopup();
    				ObsRcptStsApp.RcptView(parasRcptSeq);
    			}
    		}
    	});
    }
    
    function fnObsRcptPopRcptDelete(){
    	var delObsData = {
    			rcptSeq      : parasRcptSeq       ,
    		};
    	
    	$.ajax({
    		url : "/ctrl/call/obstacle/receipt/deleteRcpt",
    		data :delObsData,
    		type : "POST",
    		dataType : "json",
    		cache: false,
    		success : function(result) {
    			if(result.stsCd == 100){
    				alert(result.msgTxt);
    				$callObsStsRcptModPopup.paragonClosePopup();
    				ObsRcptStsApp.RcptReload(parasRcptSeq);
    			}
    		}
    	});
    }

    function EngrInfo(selEngrID){
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
				return false;
			}
		});
    }   
    
    
}();

$(document).ready(function() {
	ObsStsRcptPopupApp.init();
});