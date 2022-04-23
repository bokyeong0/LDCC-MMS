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

//white-space: nowrap;
var Dashboard03App = function () {
	"use strict";
	
	
	// [El]자산정보 그리드
	var userInfo = Util.getUserInfo();
	var userNo = userInfo.s_userNo;
	
	var dashboardMap1; 
	var dashboardMap2; 
	var dashboardMap3; 
	var dashboardMap4; 
	var dashboardMap5; 
	var dashboardMap6; 
	var dashboardMap7; 
	var dashboardMap8; 
	var dashboardMapArray = [];
	var dashboardTopArray = [];
	var dashboardFootArray = [];
	var strMakerLocInterval = null;
	var page = 1;
	var pageSize = 8;
	var totalRowCnt = 0;
	
    return {

        init: function () {
        	fnDashBoard03();
        	fnDashboard03Event();
        	initMap(page);
	    }
    };
    //[Fn] 이벤트 
    function fnDashboard03Event(){
    	$('#dashBoard03PrevBtn').click(function(){
    		if(page === 1){
    			page = Math.ceil((totalRowCnt/pageSize));
    		}else{
    			page--;
    		}
    		deleteMarkers();
    		initMap(page);
    	});
    	$('#dashBoard03NextBtn').click(function(){
    		if((totalRowCnt/pageSize) > page){
    			page++;
    		}else{
    			page = 1;
    		}
    		deleteMarkers();
    		initMap(page);
    	});
    	
    	$("#refreshRcptMapStopBtn").hide();
    	$("#refreshRcptMapStopBtnFull").hide();
    	//최대화
    	$("#fullDashBoardMap").click(function(){
    		$("#obsMapContentMap").addClass("expend-content");
    		var height = $("#obsMapContentMap").height();
    	});
		//최소화
    	$("#minDashBoardMap").click(function(){
    		$("#obsMapContentMap").removeClass("expend-content");
    		var height = $("#obsMapContent").height();
    	});
		//자동 조회
    	$("#refreshRcptMapStartBtn, #refreshRcptMapStartBtnFull").click(function(){
    		if(!strMakerLocInterval){
    			alert("자동조회가 시작되었습니다.");
	    		strMakerLocInterval = setInterval(function () {
	    			if((totalRowCnt/pageSize) > page){
	    				page++;
	    			}else{
	    				page = 1;
	    			}
	    			deleteMarkers();
	    			initMap(page);
	    		}, 5000);
    		}
			$("#refreshRcptMapStartBtn").hide();
			$("#refreshRcptMapStopBtn").show();
			$("#refreshRcptMapStartBtnFull").hide();
			$("#refreshRcptMapStopBtnFull").show();
    	});
    	$("#refreshRcptMapStopBtn, #refreshRcptMapStopBtnFull").click(function(){
			clearInterval(strMakerLocInterval);
			strMakerLocInterval = null;
			alert("자동조회가 중지되었습니다.");
			$("#refreshRcptMapStartBtn").show();
			$("#refreshRcptMapStopBtn").hide();
			$("#refreshRcptMapStartBtnFull").show();
			$("#refreshRcptMapStopBtnFull").hide();
    	});
    }
    
    function fnDashBoard03(){
    	$.ajax({
    		url:'/ctrl/dashboard/viewDashboard03',
    		success: function(data){
    			var data = data.dt_grid[0];
    			var rcptTotCnt = data.RCPT_TOT_CNT;
    			var rcptCmplNCnt = data.RCPT_STS_CNT;
    			var rcptCmplYCnt = rcptTotCnt-rcptCmplNCnt;
    			var rcptCostCnt = data.RCPT_COST_CNT;
    			
    			$('#rcptTotCnt').val(rcptTotCnt.comma());
    			$('#rcptCmplYCnt').val(rcptCmplYCnt.comma());
    			$('#rcptCmplNCnt').val(rcptCmplNCnt.comma());
    			$('#rcptCostCnt').val(rcptCostCnt.comma());
    		}
    	});
    }
//    function fnDashBoard03(){
//    	$.ajax({
//    		url:'/ctrl/dashboard/viewDashboard03',
//    		success: function(data){
//    			var data = data.dt_grid[0];
//    			
//    			var rcptTotCnt = data.RCPT_TOT_CNT;
//    			var rcptCmplYCnt = data.RCPT_CMPL_CNT;
//    			var rcptCmplNCnt = rcptTotCnt-rcptCmplYCnt;
//    			var rcptCostCnt = data.RCPT_COST_CNT;
//    			
//    			$('#rcptTotCnt').val(rcptTotCnt.comma());
//    			$('#rcptCmplYCnt').val(rcptCmplYCnt.comma());
//    			$('#rcptCmplNCnt').val(rcptCmplNCnt.comma());
//    			$('#rcptCostCnt').val(rcptCostCnt.comma());
//    		}
//    	});
//    }
    
    function deleteMarkers(){
    	dashboardMapArray = [];
    	
    	document.getElementById("dashboardMapTop0").innerHTML = "";
    	document.getElementById("dashboardMapTop1").innerHTML = "";
    	document.getElementById("dashboardMapTop2").innerHTML = "";
    	document.getElementById("dashboardMapTop3").innerHTML = "";
    	document.getElementById("dashboardMapTop4").innerHTML = "";
    	document.getElementById("dashboardMapTop5").innerHTML = "";
    	document.getElementById("dashboardMapTop6").innerHTML = "";
    	document.getElementById("dashboardMapTop7").innerHTML = "";
    	
    	
    	document.getElementById("dashboardMapFoot0").innerHTML = "";
    	document.getElementById("dashboardMapFoot1").innerHTML = "";
    	document.getElementById("dashboardMapFoot2").innerHTML = "";
    	document.getElementById("dashboardMapFoot3").innerHTML = "";
    	document.getElementById("dashboardMapFoot4").innerHTML = "";
    	document.getElementById("dashboardMapFoot5").innerHTML = "";
    	document.getElementById("dashboardMapFoot6").innerHTML = "";
    	document.getElementById("dashboardMapFoot7").innerHTML = "";
    }
    function initMap(page) {
    	var dashboardMapEl1 = document.getElementById("dashboardMap0"); 
    	var dashboardMapEl2 = document.getElementById("dashboardMap1"); 
    	var dashboardMapEl3 = document.getElementById("dashboardMap2"); 
    	var dashboardMapEl4 = document.getElementById("dashboardMap3"); 
    	var dashboardMapEl5 = document.getElementById("dashboardMap4"); 
    	var dashboardMapEl6 = document.getElementById("dashboardMap5"); 
    	var dashboardMapEl7 = document.getElementById("dashboardMap6"); 
    	var dashboardMapEl8 = document.getElementById("dashboardMap7");
    	
    	dashboardMap1= new google.maps.Map(
    			dashboardMapEl1,
    			{
					center:new google.maps.LatLng(37.5328853983, 126.9946553015),
		    		zoom:11,
		    		mapTypeId:google.maps.MapTypeId.ROADMAP
    			}
    	);
    	dashboardMap2= new google.maps.Map(
    			dashboardMapEl2,
    			{
    				center:new google.maps.LatLng(37.5328853983, 126.9946553015),
    				zoom:11,
    				mapTypeId:google.maps.MapTypeId.ROADMAP
    			}
    	);
    	dashboardMap3= new google.maps.Map(
    			dashboardMapEl3,
    			{
    				center:new google.maps.LatLng(37.5328853983, 126.9946553015),
    				zoom:11,
    				mapTypeId:google.maps.MapTypeId.ROADMAP
    			}
    	);
		
    	dashboardMap4= new google.maps.Map(
    			dashboardMapEl4,
    			{
    				center:new google.maps.LatLng(37.5328853983, 126.9946553015),
    				zoom:11,
    				mapTypeId:google.maps.MapTypeId.ROADMAP
    			}
    	);
    	
    	dashboardMap5= new google.maps.Map(
    			dashboardMapEl5,
    			{
    				center:new google.maps.LatLng(37.5328853983, 126.9946553015),
    				zoom:11,
    				mapTypeId:google.maps.MapTypeId.ROADMAP
    			}
    	);
    	
    	dashboardMap6= new google.maps.Map(
    			dashboardMapEl6,
    			{
    				center:new google.maps.LatLng(37.5328853983, 126.9946553015),
    				zoom:11,
    				mapTypeId:google.maps.MapTypeId.ROADMAP
    			}
    	);
    	
    	dashboardMap7= new google.maps.Map(
    			dashboardMapEl7,
    			{
    				center:new google.maps.LatLng(37.5328853983, 126.9946553015),
    				zoom:11,
    				mapTypeId:google.maps.MapTypeId.ROADMAP
    			}
    	);
    	
    	dashboardMap8= new google.maps.Map(
    			dashboardMapEl8,
    			{
    				center:new google.maps.LatLng(37.5328853983, 126.9946553015),
    				zoom:11,
    				mapTypeId:google.maps.MapTypeId.ROADMAP
    			}
    	);
    	
    	dashboardMapArray.push(dashboardMap1);
    	dashboardMapArray.push(dashboardMap2);
    	dashboardMapArray.push(dashboardMap3);
    	dashboardMapArray.push(dashboardMap4);
    	dashboardMapArray.push(dashboardMap5);
    	dashboardMapArray.push(dashboardMap6);
    	dashboardMapArray.push(dashboardMap7);
    	dashboardMapArray.push(dashboardMap8);
    	
    	fnGetStorList(page);
    }
    
    
    function fnGetStorList(page){
    	var strArr = [];
    	$.ajax({
    		url : '/ctrl/standard/store/listRcptStndStrMap',
    		type : "POST",
    		data:{
    			pageable:true,
				countable:true,
				pageSize:pageSize,
				page:page
    		},
    		cache: false,
    		success : function(result) {
    			totalRowCnt = result.totalRowCnt;
    			var result = result.dt_grid;
    			var idx = result.length;
    			var mapIdx = 0;
    			
    			for (var i = 0; i < idx; i++) {
    				strArr.push(result[i].STR_CD);
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
    				var rcptCont = result[i].RCPT_CONT;
    				var userNm = result[i].USER_NM;
    				var sumStrNm = (compNm + (brndNm ? " " + brndNm:"")+ (strNm ? " " + strNm:""));
    				$("#dashboardMapTop"+i).text(sumStrNm);
    				$("#dashboardMapFoot"+i).text(rcptCont+ (userNm ? "(" + userNm+")":""));
    				var lat = result[i].STR_LAT;
    				var lng = result[i].STR_LNG;
    				
    				var userLat = parseFloat(result[i].USER_LAT);
    				var userLng = parseFloat(result[i].USER_LNG);
    				
    				var tagetMap = dashboardMapArray[i]
    				var bounds = new google.maps.LatLngBounds();
    				if(lat != "" && lng != ""){
	    				lat = parseFloat(result[i].STR_LAT);
	    				lng = parseFloat(result[i].STR_LNG);
	    				
						if(!locIco){
							locIco = "/img/map/map_store_def.png";
						}
						if(userLat  && userLng ){
							bounds.extend(new google.maps.LatLng(lat, lng)); // Iceland
							bounds.extend(new google.maps.LatLng(userLat, userLng)); // Turkey
	        		    	var carimg = '/img/map/rcpt_car_right.gif';
	        		    	
	        		    	if(lng <  userLng){
	        		    		carimg = '/img/map/rcpt_car_left.gif';
	        		    	}
	        		    	var car = new google.maps.Marker({
	        					position: {lat: userLat, lng: userLng},
	        	  			    map: tagetMap,
	        	  			    label: '',
	        		  			  icon: {
	        		  			    url: carimg,
	        		  			    anchor: new google.maps.Point(39, 32), 
	        	  			  	}
	        	  			});
	        		    	car.setAnimation(google.maps.Animation.BOUNCE);
	        		    	tagetMap.fitBounds(bounds);
	        		    		
	    				}else{
	    					tagetMap.setCenter(new google.maps.LatLng(lat, lng));
	    					tagetMap.setZoom(11);
	    				}
						var sign = new google.maps.Marker({
	    					position: {lat: lat, lng: lng},
	    	  			    map: tagetMap,
	    	  			    label: '',
	    		  			  icon: {
	    		  			    url: rcptStsIco,
	    		  			    anchor: new google.maps.Point(24, 63), //(left,top) 이미지 위치
	    	  			  	}
	    	  			 });
	    				var marker1 = new google.maps.Marker({
	    	  			    position: {lat: lat, lng: lng},
	    	  			  	map: tagetMap,
	    	  			  	title: strNm,
	    	  			  	strCd : strCd,
	    	  			    animation: google.maps.Animation.DROP,
	    				    icon: locIco
	    				});
    				}
				}
    		}
    	});
    }
    
}();

$(document).ready(function() {
	Dashboard03App.init();
});
