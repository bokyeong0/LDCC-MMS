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
var ObsRcptManulPopApp = function () {
	"use strict";
	
//	var menulCompCd;
//	var obsRcptLv4;
	var popUpData;
	// [El]자산정보 그리드
	var $obsRcptManualGrid = $("#obsRcptManualGrid");
	
    return {
    	resetMenual: function () {
    		popUpData = $('#callObstacleMenualPop').PopAppGetData();
    		console.log(popUpData);
    		if(popUpData){
    			if(popUpData.obsSeqLv4){
    				fnMenulView(popUpData);
    			}
    			$obsRcptManualGrid.paragonGridSearch(popUpData);
    			var prevCompCd = $("#obsRcptManualCompSearch").val();
    			$("#obsRcptManualCompSearch").data('combobox').setVal(popUpData.compCd);
    		}
    	},
        init: function () {
        	popUpData = $('#callObstacleMenualPop').PopAppGetData();
        	//이벤트 생성
        	fnObsReceiptMenualEvent();
        	//그리드 생성
        	if(popUpData.obsSeqLv4){
				fnMenulView(popUpData);
    		}
        	fnObsMenualMakeGrid(popUpData);
	    }
    };
    
    
    //[Fn] 이벤트 
    function fnObsReceiptMenualEvent(){
    	// 회사코드 selectBox
    	
//    	$("#obsRcptManualCompSearch").combobox();
//     	$("#obsRcptManualLv4Search").combobox();
    	

//    	fnListCompanyCombo($("#obsRcptManualCompSearch"));
//    	target, compCate,compType, select, first
    	console.log(popUpData.compCd);
    	 MMSUtil.fnMakeCompBootCombo($("#obsRcptManualCompSearch"),"","",popUpData.compCd,"회사명");
    	
    	$("#obsRcptManualSearchBtn").click(function(){
        	fnListObsManualSearch();
    	});
    	
    	$("#obsRcptManualSearchCont").enterEvent({
    		callBack:function(value){
    			fnListObsManualSearch()
			}
    	})
    	
    	$("#obsRcptManualCompSearch").change(function(){
    		if($(this).val() == ""){
    			$("#obsRcptManualLv1Search").html('<option value="">대분류</option>');
    	    	$("#obsRcptManualLv2Search").html('<option value="">중분류</option>');
    	    	$("#obsRcptManualLv3Search").html('<option value="">소분류</option>');
    		}else{
        		MMSUtil.fnMakeObsRcptCombo($("#obsRcptManualLv1Search"), $(this).val(), "", "", "대분류");
    		}
    	});
    	MMSUtil.fnObsRcptComboBox({
			compCdId 	 : "#obsRcptManualCompSearch",
			obsRcptLv1Id : "#obsRcptManualLv1Search",
			obsRcptLv2Id : "#obsRcptManualLv2Search",
			obsRcptLv3Id : "#obsRcptManualLv3Search",
// 			obsRcptLv4Id : "#obsRcptManualLv4Search",
		});
    }
    
    function fnObsMenualMakeGrid(postData){
        
        /********************************************************************
         * 장애 매뉴얼 그리드 생성
         * Since   : 2016-10-24
         * 작성자  : Kim Jin Ho
         * 수정내역: 
         ********************************************************************/
    	$obsRcptManualGrid.paragonGrid({
			url : '/ctrl/standard/obstacle/listObsMenual',
			page : 1,
			sortable : true,
			height: 208,
			rowHight : "S",
			postData : postData,
			colNames :["OBS_SEQ_LV4","OBS_PRT_SEQ","COMP_CD","OBS_MANUAL","대표회사명","대분류","중분류","소분류","장애내용","작성자","작성일"],
			colModel : [ 
				{align:"center",name : 'OBS_SEQ_LV4', hidden:true}, 
				{align:"center",name : 'OBS_PRT_SEQ', hidden:true}, 
				{align:"center",name : 'COMP_CD', hidden:true}, 
				{align:"center",name : 'OBS_MANUAL', hidden:true}, 
				{align:"center",name : 'COMP_NM'}, 
				{align:"center",name : 'OBS_NM_LV1'}, 
				{align:"center",name : 'OBS_NM_LV2'}, 
				{align:"center",name : 'OBS_NM_LV3'}, 
				{align:"center",name : 'OBS_NM_LV4'}, 
				{align:"center",name : 'IN_USER_ID'}, 
				{align:"center",name : 'IN_DT',sortable : false} ,
			],
			loadonce : true,
			rownumbers : true,
			onSelectRowEvent : function(currRowData, prevRowData) {
				var obsNmLv1 = currRowData.OBS_NM_LV1;
				var obsNmLv2 = currRowData.OBS_NM_LV2;
				var obsNmLv3 = currRowData.OBS_NM_LV3;
				var obsNmLv4 = currRowData.OBS_NM_LV4;
				var obsManual = currRowData.OBS_MANUAL;
				var obsCompNm = currRowData.COMP_NM;
				var inUserId = currRowData.IN_USER_ID;
				var inDt = currRowData.IN_DT;
				$("#popObsManualInUserNm").text(inUserId);
				$("#popObsManualInUserDt").text(inDt);
				$("#popObsManualTypeTotTxt").text(obsNmLv1 +" > "+obsNmLv2 +" > "+obsNmLv3 +" > "+obsNmLv4 );
				$("#popObsManualCompNm").text(obsCompNm);
				$("#popObsMenual").val(obsManual);
			},
		});
    }
    function fnListObsManualSearch() {
    	var compCd = $("#obsRcptManualCompSearch").val();
    	var obsRcptLv1 = $("#obsRcptManualLv1Search").val();
    	var obsRcptLv2 = $("#obsRcptManualLv2Search").val();
    	var obsRcptLv3 = $("#obsRcptManualLv3Search").val();
    	var obsManual = $("#obsRcptManualSearchCont").val();
    	var searchData = {
    			compCd :compCd ,
    			obsSeqLv1 :obsRcptLv1 ,
    			obsSeqLv2 :obsRcptLv2 ,
    			obsSeqLv3 :obsRcptLv3 ,
    			obsManual :obsManual ,
    	};
    	$obsRcptManualGrid.paragonGridSearch(searchData);
    }
    function fnListCompanyCombo(targetEl) {
		var params = {
			compCate : "",
			compType : ""
		};
		$.ajax({
			url : "/ctrl/standard/company/listCompany",
			data : params,
			type : "POST",
			dataType : "json",
			cache : false,
			success : function(result) {
				var json = result.dt_grid;
				targetEl.html("");
				var option = $("<option value='' />");
				option.text("회사명")
				targetEl.append(option);
				for (var i = 0; i < json.length; i++) {
					var thisValue = json[i].COMP_CD;
					var thisName = json[i].COMP_NM;
					var option = $("<option>", {value : thisValue});
					option.text(thisName)
					targetEl.append(option);
				}
				targetEl.combobox();
			}
		});
	}
    
    function fnMenulView(params) {
    	$.ajax({
    		url : "/ctrl/standard/obstacle/viewObsMenual",
    		data : params,
    		type : "POST",
    		dataType : "json",
    		cache : false,
    		success : function(result) {
    			var obsNmLv1 = result.OBS_NM_LV1;
				var obsNmLv2 = result.OBS_NM_LV2;
				var obsNmLv3 = result.OBS_NM_LV3;
				var obsNmLv4 = result.OBS_NM_LV4;
				var obsManual = result.OBS_MANUAL;
				var obsCompNm = result.COMP_NM;
				var inUserId = result.IN_USER_ID;
				var inDt = result.IN_DT;
				$("#popObsManualInUserNm").text(inUserId);
				$("#popObsManualInUserDt").text(inDt);
				$("#popObsManualTypeTotTxt").text(obsNmLv1 +" > "+obsNmLv2 +" > "+obsNmLv3 +" > "+obsNmLv4 );
				$("#popObsManualCompNm").text(obsCompNm);
				$("#popObsMenual").val(obsManual);
    		}
    	});
    }
    
}();

$(document).ready(function() {
	ObsRcptManulPopApp.init();
});
