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
var StatusStoreMapApp = function () {
	"use strict";
	
	/************************************************
	 *전역 객체 선언부 (return 상위부분에 선언해야함)
	 ************************************************/
	
	// [El]메뉴 트리 그리드
	var $statusStorMapGrid = $("#statusStorMapGrid");
	
	var statusStorMap; 
	var infowindow;
    var targetInfo;
    
	//맵 마커
	var strTargetMarker = {};
	var storInfoWindow ={};
	
    //이전 선택 회사코드
	var userInfo = Util.getUserInfo();
	
    return {
        init: function () {
        	fnInitMap();
        	fnRcptMapEvent();
        	fnMakeGrid();
        	$('#statusStorMapCompSearch').combobox();
        	MMSUtil.fnMakeCompCombo($('#statusStorMapCompSearch'));
        	
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
    	$('#searchStoreBtn').click(function(){
			var compCd 	= $("#statusStorMapCompSearch").val();
			var brndCd 	= $("#statusStorMapBrndSearch").val();
			var strNm 	= $("#statusStorMapStrNmSearch").val();
			
			if(!compCd){
				alert("고객사를 선택해 주세요");
				return;
			}
    		fnGetStoreList(compCd, brndCd, strNm);
    	});
    	
    	$('#statusStorMapCompSearch').change(function(){
    		var compCd 	= $("#statusStorMapCompSearch").val();
    		if(compCd == ""){
    			$('#statusStorMapBrndSearch').html("<option value=''>브랜드</option>")
    		}else{
    			MMSUtil.fnMakeBrndCombo($('#statusStorMapBrndSearch'), compCd);
    		}
    		fnListAutoStrNm(compCd);
    	});
    	
    	$('#statusStorMapBrndSearch').change(function(){
    		var compCd = $('#statusStorMapCompSearch').val();
    		var brndCd = $('#statusStorMapBrndSearch').val();
    		fnListAutoStrNm(compCd, brndCd);
    	});
    }
    
    function fnListAutoStrNm(compCd, brndCd){
    	$('#statusStorMapStrNmSearch').strNmAutoComplate({
			compCd:compCd,
			brndCd:brndCd,
		});
    }
    
    function fnGetStoreList(compCd, brndCd, strNm){
    	fnDeleteMarker();
    	$.ajax({
    		url : '/ctrl/standard/store/listStndStr',
    		type : "POST",
    		data:{
    			compCd :compCd,
    			brndCd :brndCd,
    			strNm :strNm,
    		},
    		cache: false,
    		success : function(result) {
    			var result = result.dt_grid;
    			$statusStorMapGrid.jqGrid("clearGridData");
    			$statusStorMapGrid.jqGrid('setGridParam',  { datatype: 'local', data: result}).trigger('reloadGrid');
    			
    			var imageSrc = "/img/map/map_store_def.png";
    			var imageSize = new daum.maps.Size(24, 35);
    			var markerImage = new daum.maps.MarkerImage(imageSrc, imageSize); 
    			for (var i = 0; i < result.length; i++) {
    				
    				
    				var lat = result[i].STR_LAT;
    				var lng = result[i].STR_LNG;
    				var strNm = result[i].STR_NM;
    				var strCd = result[i].STR_CD;
    				
    				var areaNm = result[i].AREA_NM;
    				var compNm = result[i].COMP_NM;
    				var brndNm = result[i].BRND_NM;
    				var strTypeNm = result[i].STR_TYPE_NM;
    				var strStNm = result[i].STR_ST_NM;
    				var phoneNum = result[i].PHONE_NUM;
    				var locIco = result[i].LOC_ICO;
    				
    				var info = '<div style="width:230px;">';	
						info += '<div class="">';	
//						info += '<div class="str-map-div">';	
    				info += '<div class="str-map-div store-loc">';
    					
					if(!isNaN(lng) && !isNaN(lat) && lat != null && lng != null && lat != "" && lng != ""){
	    				lat = parseFloat(result[i].STR_LAT);
	    				lng = parseFloat(result[i].STR_LNG);
						if(!locIco){
							locIco = "/img/map/map_store_def.png";
						}
	    				
	    				info+='<p class="loc-title">'+strNm+'</p>';
	    				info+='<p>' +compNm + " " +brndNm+'</p>';
	    				info+='<p>권역 : ' +areaNm		+'</p>';
	    				info+='<p>유형 : ' +strTypeNm 	+'</p>';
	    				info+='<p>상태 : ' +strStNm 		+'</p>';
	    				info+='<p>TEL : ' +phoneNum 	+'</p>';
	    				info+='</div>';
					
					var marker;
						// 마커를 생성합니다
						marker = new daum.maps.Marker({
							map: statusStorMap, // 마커를 표시할 지도
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
    		var position = marker.getPosition();
    		var thisInfo = strTargetMarker[strCd].info;
        	statusStorMap.setCenter(position);
    		infowindow.setContent(thisInfo);
    		infowindow.open(statusStorMap, marker);
    		targetInfo = infowindow;
    }
    
    function fnInfoClose(){
    	if(targetInfo){
			targetInfo.close();
		}
    }
    
    function fnInitMap(){
    	var map = document.getElementById('statusStorMap'); //지도를 담을 영역의 DOM 레퍼런스
    	var options = { //지도를 생성할 때 필요한 기본 옵션
    		center: new daum.maps.LatLng(37.4835973011, 126.8765241158), //지도의 중심좌표.
    		level: 4, //지도의 레벨(확대, 축소 정도)
    	};

    	statusStorMap = new daum.maps.Map(map, options);
    }
    
    function fnMakeGrid(){
	    $statusStorMapGrid.paragonGrid({
	    	datatype:'local',
			height: 600,
			colNames:["점포코드","지역","고객사명","브랜드","점포명","점포유형"],
			colModel : [ 
	            {name : 'STR_CD', hidden:true},
//	            {
//	            	width:"28px",
//	            	fixed: true,
//					editable : true,
//					align : "center",
//					edittype : "checkbox",
//					formatter : "checkbox",
//					formatoptions : {
//						disabled : false
//					},
//					editoptions : {
//						value : "Y:N"
//					},
//					align:"center",
//					name: "CHK_BOX"
//				},
	            {name : 'AREA_NM', align:"center"}, 
	            {name : 'COMP_NM', align:"center"}, 
	            {name : 'BRND_NM', align:"center"}, 
	            {name : 'STR_NM', align:"center"}, 
	            {name : 'STR_TYPE_NM', align:"center", width:100}, 
			],
			pager : "#statusStorMapGridNavi",
			rowNum: 100,
			caption : "점포 현황",
			hidegrid : false,
			rownumbers : true,
			onClickRowEvent : function(id) {
				console.log(id);
				var currRowData = $statusStorMapGrid.getRowData(id);
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
	StatusStoreMapApp.init();
});
