/** Copyright (c) 2017 VertexID RND, Inc.
 * 
 * Application Name : 권역관리[StandardAreaApp]
 * Program Code     : PC0101
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * MINE 최판석		2017. 3. 20. 		First Draft.        javascript
 */
var StatusRcptMapApp = function () {
	"use strict";
	
	/************************************************
	 *전역 객체 선언부 (return 상위부분에 선언해야함)
	 ************************************************/
	
	// [El]메뉴 트리 그리드
	var $statusRcptMapGrid = $("#statusRcptMapGrid");
	
	var statusRcptMap; 
	var infowindow;
    var targetInfo;
    
	//맵 마커
	var strTargetMarker = {};
	var rcptInfoWindow ={};
	
    //이전 선택 회사코드
	var userInfo = Util.getUserInfo();
	
    return {
        init: function () {
        	fnInitMap();
        	fnRcptMapEvent();
        	fnMakeGrid();
        	$('#statusRcptMapCompSearch').combobox();
        	MMSUtil.fnMakeCompCombo($('#statusRcptMapCompSearch'));
        	fnListAutoStrNm();
	    }
    };
    
    function fnDeleteMarker(){
    	fnInfoClose();
    	for(var i in strTargetMarker){
    		strTargetMarker[i].marker.setVisible();
    	}
    }
    function fnRcptMapEvent(){
    	$('#searchRcptStoreBtn').click(function(){
			var compCd 	= $("#statusRcptMapCompSearch").val();
			var brndCd 	= $("#statusRcptMapBrndSearch").val();
			var strNm 	= $("#statusRcptMapStrNmSearch").val();
			
			if(!compCd){
				alert("고객사를 선택해 주세요");
				return;
			}
    		fnGetStoreList(compCd, brndCd, strNm);
    	});
    	
    	$('#statusRcptMapCompSearch').change(function(){
    		var compCd 	= $("#statusRcptMapCompSearch").val();
    		if(compCd == ""){
    			$('#statusRcptMapBrndSearch').html("<option value=''>브랜드</option>")
    		}else{
    			MMSUtil.fnMakeBrndCombo($('#statusRcptMapBrndSearch'), compCd);
    		}
    		fnListAutoStrNm(compCd);
    	});
        
        $('#statusRcptMapBrndSearch').change(function(){
        	var compCd = $('#statusRcptMapCompSearch').val();
        	var brndCd = $('#statusRcptMapBrndSearch').val();
        	fnListAutoStrNm(compCd, brndCd);
        	
        });
        
    	//최대화
//    	$("#fullDashBoard").click(function(){
//    		$("#obsMapContent").addClass("expend-content");
//    		var height = $("#obsMapContent").height();
//            
//            $("#statusRcptMap").css("height",height-48);
//            if(height-157 > 600){
//                $statusRcptMapGrid.setGridHeight(height-157);
//            }
//		 		google.maps.event.trigger(statusRcptMap, "resize");		  
            
            
            
//            var container = document.getElementById('statusRcptMapGrid'),
//            options = {
//                 center: new daum.maps.LatLng(33.450701, 126.570667),
//                 level: 3
//            };
//            var tMap = new daum.maps.Map(container, options);
//            
//            container.style.width = '900px';
//            container.style.height = height;
//            
//            tMap.relayout();
//    	});
		//최소화
//    	$("#minDashBoard").click(function(){
//    		$("#obsMapContent").removeClass("expend-content");
//    		var height = $("#obsMapContent").height();
//               $("#statusRcptMap").css("height",710);
//               $statusRcptMapGrid.setGridHeight(600);
//			google.maps.event.trigger(statusRcptMap, "resize");		  
//    	});
    }
    
    function fnListAutoStrNm(compCd, brndCd){
    	$('#statusRcptMapStrNmSearch').strNmAutoComplate({
			compCd:compCd,
			brndCd:brndCd,
		});
    }
    
    function fnGetStoreList(compCd, brndCd, strNm){
    	fnDeleteMarker();
    	$.ajax({
    		url : '/ctrl/standard/store/listRcptStndStr',
    		type : "POST",
    		data:{
    			compCd :compCd,
    			brndCd :brndCd,
    			strNm  :strNm,
    		},
    		cache: false,
    		success : function(result) {
    			var result = result.dt_grid;
    			$statusRcptMapGrid.jqGrid("clearGridData");
    			$statusRcptMapGrid.jqGrid('setGridParam',  { datatype: 'local', data: result}).trigger('reloadGrid');
    			
    			var strArr = [];
    			var imageSrc = '/img/map/map_store_01.gif';
    			var imageSize = new daum.maps.Size(24, 35);
    			var markerImage = new daum.maps.MarkerImage(imageSrc, imageSize); 
    			for (var i = 0; i < result.length; i++) {
    				
    				var strNm = result[i].STR_NM;
    				var strCd = result[i].STR_CD;
    				
    				var areaNm = result[i].AREA_NM;
    				var compNm = result[i].COMP_NM;
    				var brndNm = result[i].BRND_NM;
    				var strTypeNm = result[i].STR_TYPE_NM;
    				var strStNm = result[i].STR_ST_NM;
    				var phoneNum = result[i].PHONE_NUM;
    				var rcptCnt = result[i].RCPT_CNT;
    				var locIco = result[i].LOC_ICO;
    				
    				var rcptCnt = result[i].RCPT_CNT;
    				var rcptStsNm = result[i].RCPT_STS_NM;
    				var rcptStsIco = result[i].RCPT_STS_ICO;
    				
    				var lat = result[i].STR_LAT;
    				var lng = result[i].STR_LNG;
    				
    				var info = '<div class="infoDiv">';	
    					info += '<div class="infoDiv2">';	
    					info += '<div class="str-map-div">';		    				
    				if(lat != null && lng != null){
	    				info+='<h3><strong><i class="fa fa-caret-right"></i> '+strNm+'</strong></h3>';
    				}else{
	    				info+='<h3><strong><i class="fa fa-caret-right"></i> '+strNm+'</strong>(위치정보없음)</h3>';
    				}
					info+='<table class="table table-bordered table-map ">';
					info+='<colgroup>';
					info+='<col width="15%" ><col width="35%" >';
					info+='<col width=" 15%" ><col width="35%" >';
					info+='</colgroup>';
					info+='<tr>';
					info+='<th>대표회사</th><td>'+compNm +'</td>';
					info+='<th>브랜드</th><td>'+brndNm+'</td>';
					info+='</tr>';
					info+='<tr>';
					info+='<th>권역</th><td>'+areaNm+'</td>';
					info+='<th>유형</th><td>'+strTypeNm+'</td>';
					info+='</tr>';
					info+='<tr>';
					info+='<th>상태</th><td>'+strStNm+'</td>';
					info+='<th>대표전화</th><td>'+phoneNum+'</td>';
					info+='</tr>';
					info+='</table>';
					info+='</div>';
					
					var marker;
					if(lat != null && lng != null){
						
						lat = parseFloat(result[i].STR_LAT);
						lng = parseFloat(result[i].STR_LNG);
						// 마커를 생성합니다
						marker = new daum.maps.Marker({
							map: statusRcptMap, // 마커를 표시할 지도
							position: new daum.maps.LatLng(lat, lng), // 마커를 표시할 위치
							title : strNm, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
							image : markerImage, // 마커 이미지 
						});
						
						infowindow = new daum.maps.InfoWindow({
					       content: info, // 인포윈도우에 표시할 내용
					       position: new daum.maps.LatLng(lat, lng),
					       zIndex : 4,
					       removable: true
					    });
						
						marker["strCd"] = strCd;
						marker["info"] = infowindow;
						
						daum.maps.event.addListener(marker, 'click', function(){
							fnMarkerClickEvent(this);
						});
						
						strTargetMarker[strCd] = {
												 marker : marker,
												 info : info,
												 position: new daum.maps.LatLng(lat, lng),
												 };
					}
				}
    		}
    	});
    }
    
    function fnMarkerClickEvent(marker){
    		fnInfoClose();
    		var strCd = marker.strCd;
    		fnGetObsStrRcptList(marker, strCd)
    		targetInfo = infowindow;
    }
    
    function fnInfoClose(){
    	if(targetInfo){
			targetInfo.close();
		}
    }
    
    function fnGetObsStrRcptList(marker, strCd){
    	var position = marker.getPosition();
    	if(!rcptInfoWindow[strCd]){
	    	$.ajax({
	    		url : "/ctrl/call/obstacle/receipt/listObsStrRcpt",
	    		type : "POST",
	    		data:{strCd:strCd},
	    		cache: false,
	    		success : function(result) {
	    			var thisInfo = strTargetMarker[strCd].info;
	    			if(!thisInfo){
	    				thisInfo	
	    			}
	    			thisInfo+='<div>';
	    			for (var i = 0; i < result.length; i++) {
						var rcptDr = result[i];
						
						var rcptNo 		= rcptDr.RCPT_NO;
						var rcptCmplType= rcptDr.RCPT_CMPL_TYPE;
						var rcptStsNm 	= rcptDr.RCPT_STS_NM;
						var rcptEngrNm	= rcptDr.RCPT_ENGR_NM;
						var rcptObsNm 	= rcptDr.RCPT_OBS_NM;
						
						var rcptCmplDt	= rcptDr.RCPT_CMPL_DT;
						var rcptOverDt	= rcptDr.RCPT_OVER_DT;
						var rcptCont 	= rcptDr.RCPT_CONT;
						var rcptDt 		= rcptDr.RCPT_DT;
						var rcptTime 	= rcptDr.RCPT_TIME;
						
		    			thisInfo+='<h5>'+(i+1)+'.접수정보 ['+rcptNo+']</h5>';
						thisInfo+='<table class="table table-bordered table-map ">';
						thisInfo+='<colgroup>';
						thisInfo+='<col width="15%" ><col width="35%" >';
						thisInfo+='<col width="15%" ><col width="35%" >';
						thisInfo+='</colgroup>';
						thisInfo+='<tr>';
						thisInfo+='<th>상태</th><td>'+rcptStsNm+'</td>';
						thisInfo+='<th>담당자</th><td>'+rcptEngrNm+'</td>';
						thisInfo+='</tr>';
						thisInfo+='<tr>';
						thisInfo+='<th>장애분류</th><td colspan="3">'+rcptObsNm+'</td>';
						thisInfo+='</tr>';
						thisInfo+='<tr>';
						thisInfo+='<th>접수일시</th><td>'+rcptDt+' '+rcptTime+'</td>';
						if(rcptCmplType =="06"){
							thisInfo+='<th>완료시간</th><td>'+rcptCmplDt+'</td>';
						}else{
							thisInfo+='<th>경과시간</th><td>'+rcptOverDt+'</td>';
						}
						thisInfo+='</tr>';
						thisInfo+='<tr>';
						thisInfo+='<th>내용</th><td colspan="3">'+rcptCont+'</td>';
						thisInfo+='</tr>';
						thisInfo+='</table>';
					}
					thisInfo+='</div>';
					thisInfo+='</div>';
					thisInfo+='</div>';
	    			rcptInfoWindow[strCd]={"info":thisInfo};
	    			statusRcptMap.setCenter(position);
	    			infowindow.setContent(thisInfo);
					infowindow.open(statusRcptMap, marker);
	    		}
	    	});
    	}else{
    		var thisInfo = rcptInfoWindow[strCd].info;
    		thisInfo+='</div>';
    		thisInfo+='</div>';
    		thisInfo+='</div>';
    		statusRcptMap.setCenter(position);
			infowindow.setContent(thisInfo);
			infowindow.open(statusRcptMap, marker);
    	}
//		thisInfo+='</div>';
    }
    
    function fnInitMap(){
    	var map = document.getElementById('statusRcptMap'); //지도를 담을 영역의 DOM 레퍼런스
    	var options = { //지도를 생성할 때 필요한 기본 옵션
    		center: new daum.maps.LatLng(36.2835973011, 127.5765241158), //지도의 중심좌표.
    		level: 12, //지도의 레벨(확대, 축소 정도)
    	};

    	statusRcptMap = new daum.maps.Map(map, options);
    }
    
	function deleteMarkers() {
		strTargetMarker = {};
		strMakerLevel1 ={};
		strMakerLevel2 ={};
		strMakerLevel3 ={};
		
		rcptInfoWindow ={};
		strCdArr =[];
		strVisibleArr =[];
	 }
    
    function fnMakeGrid(){
	    $statusRcptMapGrid.paragonGrid({
			rowEditable : false,
			firstData:false,
			datatype:'local',
			height: 600,
			shrinkToFit: false,
			rowClickFocus:true,
			rowNum: 10,
			rowList: [10, 20, 50,100],
			colNames :["STR_CD","STR_LAT","STR_LNG","지역","장애발생수","고객사명","브랜드","점포명"],
			colModel : [ 
	            {name : 'STR_CD',hidden:true},  
	            {name : 'STR_LAT',hidden:true},  
	            {name : 'STR_LNG',hidden:true},  
				{width:"90px",align:"center",name : 'AREA_NM'}, 
				{width:"70px",align:"center",name : 'RCPT_CNT'}, 
				{width:"110px",align:"center",name : 'COMP_NM'}, 
				{width:"100px",align:"center",name : 'BRND_NM'}, 
				{width:"160px",align:"center",name : 'STR_NM'} , 
			],
			rownumbers : true,
			pager : "#statusRcptMapGridNavi",
			caption : "장애대응 현황",
			onClickRowEvent : function(id) {
				var currRowData = $statusRcptMapGrid.getRowData(id);
				var strCd = currRowData.STR_CD;
				if(!strTargetMarker[strCd]){
					alert("위치정보가 없는 Site입니다.");
					return;
				}
				var marker = strTargetMarker[strCd].marker;
				fnMarkerClickEvent(marker);
			},
        });
    }
}();

$(document).ready(function() {
	StatusRcptMapApp.init();
});
