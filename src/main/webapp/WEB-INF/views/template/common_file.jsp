<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
<body>
<div class="" >
<ol class="breadcrumb pull-right"></ol>
<h1 class="page-header"></h1>
</div>
	<div class="search-form clearfix" >
           <form class="form-inline" >
			<div class="search-title-group m-r-10">
				<span class="label label-theme search-title">
					<i class="fa fa-search"></i>파일 업로드
<!-- 					<small>Search</small> -->
				</span>
			</div>
			<!-- 중복되는 부분 -->
			<div class="search-controls" >
				<div class="form-group m-r-10">
					<input type="file"  class="form-control input-sm" multiple id="tempFileUpload" size="10" placeholder="파일선택">
					<button id="tempFileSaveBtn" type="button" class="btn btn-sm btn-primary m-r-5">
						<i class="fa fa-search"></i>저장
					</button>
					<button id="tempAppBtn" type="button" class="btn btn-sm btn-primary m-r-5">
						<i class="fa fa-search"></i>App호출
					</button>
					<button id="tempAppiCloudBtn" type="button" class="btn btn-sm btn-primary m-r-5">
						<i class="fa fa-search"></i>iCloud호출
					</button>
					<button id="tempAppCameraBtn" type="button" class="btn btn-sm btn-primary m-r-5">
						<i class="fa fa-search"></i>Camera 호출
					</button>
					<button id="tempRecParamsBtn" type="button" class="btn btn-sm btn-primary m-r-5">
						<i class="fa fa-search"></i>receive Parameter 호출
					</button>
					<button id="tempAppWebSettingBtn" type="button" class="btn btn-sm btn-primary m-r-5">
						<i class="fa fa-search"></i>Web 설정 화면호출
					</button>
					<button id="tempAppSignCallBtn" type="button" class="btn btn-sm btn-primary m-r-5">
						<i class="fa fa-search"></i>사인 화면호출
					</button>
					<button id="tempApnsBtn" type="button" class="btn btn-sm btn-primary m-r-5">
						<i class="fa fa-search"></i>APNS Test
					</button>
					<button id="tempMobileInfoBtn" type="button" class="btn btn-sm btn-primary m-r-5">
						<i class="fa fa-search"></i>setInfo()
					</button>
					<button id="tempLocationUseYBtn" type="button" class="btn btn-sm btn-primary m-r-5">
						<i class="fa fa-search"></i>location Use Y
					</button>
					<button id="tempLocationUseNBtn" type="button" class="btn btn-sm btn-primary m-r-5">
						<i class="fa fa-search"></i>location Use N
					</button>
					<button id="tempGpsStartBtn" type="button" class="btn btn-sm btn-primary m-r-5">
						<i class="fa fa-search"></i>Gps Start
					</button>
					<button id="tempGpsStopBtn" type="button" class="btn btn-sm btn-primary m-r-5">
						<i class="fa fa-search"></i>Gps Stop
					</button>
					<button id="tempSelectNativeInfoBtn" type="button" class="btn btn-sm btn-primary m-r-5">
						<i class="fa fa-search"></i>getInfo()
					</button>
					<button id="tempSetAutoFlagYBtn" type="button" class="btn btn-sm btn-primary m-r-5">
						<i class="fa fa-search"></i>Auto Flag Set Y
					</button>
					<button id="tempSetAutoFlagNBtn" type="button" class="btn btn-sm btn-primary m-r-5">
						<i class="fa fa-search"></i>Auto Flag Set N
					</button>
					<button id="tempGetAutoFlagBtn" type="button" class="btn btn-sm btn-primary m-r-5">
						<i class="fa fa-search"></i>Get Auto Flag
					</button>
				</div>
			</div>
			<!-- 중복되는 부분 -->
			<div class="search-button-group">
				<button id="searchBtn" type="submit" class="btn btn-sm btn-primary m-r-5">
				<i class="fa fa-search"></i>검색
				</button>
				<button type="submit" class="btn btn-sm btn-info">
				<i class="fa fa-plus"></i>행추가
				</button>
			</div>
			</form>
	</div>
	<div id="textDiv" data-offset="54">
		
	</div>
	<div id="imgDiv" class="superbox" data-offset="54">
	    <div class="superbox-list"><img src="/img/gallery/gallery-1.jpg" data-img="/img/gallery/gallery-1.jpg" alt="" class="superbox-img" /></div>
	    <div class="superbox-list"><img src="/img/gallery/gallery-2.jpg" data-img="/img/gallery/gallery-2.jpg" alt="" class="superbox-img" /></div>
	    <div class="superbox-list"><img src="/img/gallery/gallery-3.jpg" data-img="/img/gallery/gallery-3.jpg" alt="" class="superbox-img" /></div>
	    <div class="superbox-list"><img src="/img/gallery/gallery-4.jpg" data-img="/img/gallery/gallery-4.jpg" alt="" class="superbox-img" /></div>
	    <div class="superbox-list"><img src="/img/gallery/gallery-5.jpg" data-img="/img/gallery/gallery-5.jpg" alt="" class="superbox-img" /></div>
	    <div class="superbox-list"><img src="/img/gallery/gallery-6.jpg" data-img="/img/gallery/gallery-6.jpg" alt="" class="superbox-img" /></div>
	    <div class="superbox-list"><img src="/img/gallery/gallery-7.jpg" data-img="/img/gallery/gallery-7.jpg" alt="" class="superbox-img" /></div>
	</div>
<script>
        $(document).ready(function () {
       	    $('.superbox').SuperBox();
       		var files = new Array();
        	
        	$("#tempAppBtn").click(function(){
 				if (checkOs() == "ios"){
 	 				window.location="jscall://testMessage"// mmscall://id=aaa jscall://testMessage
 				}
 				else if(checkOs() == "android"){
 					window.ParagonApp.testMessage("1","호출됨"); // android
 				}
        	});
        	
        	// JAVASCRIPT call iOS, Android Native function
        	$("#tempAppiCloudBtn").click(function () {
        		//javascript json 파라메터를 native(android, ios) 전
        		var callInfo = {};
        		callInfo.functionName = "onClick";
        		callInfo.callbackFunction = "fnAppFileUpload";
        		callInfo.args = "DOC";
        		callInfo.successMessage = "파일 전송 성공";
            	callInfo.failMessage = "파일 전송 실패";
            	var jsonString = JSON.stringify(callInfo);
            	console.log("jsonString : "+jsonString);
            	// encodeURI 사용 이유 : 한글 입력시 쓰레기 값이 포함되어 받게 되어서 encodeURI 이용하여 파라메터 전달
            	var url = "jscall://uploadFile&"+encodeURI(jsonString);
            	console.log("url : "+url);
            	if (checkOs() == "ios"){
                	window.location=url;
 				}
 				else if(checkOs() == "android"){
 					window.ParagonApp.uploadFile(encodeURI(jsonString)); // android
 				}
        	});
			
        	// JAVASCRIPT call iOS, Android Native Camera
        	$("#tempAppCameraBtn").click(function () {
        		//javascript json 파라메터를 native(android, ios) 전
        		var callInfo = {};
        		callInfo.functionName = "onClick";
        		callInfo.callbackFunction = "fnAppFileUpload";
        		callInfo.args = "img";
        		callInfo.successMessage = "파일 전송 성공";
            	callInfo.failMessage = "파일 전송 실패";
            	var jsonString = JSON.stringify(callInfo);
            	console.log("jsonString : "+jsonString);
            	// encodeURI 사용 이유 : 한글 입력시 쓰레기 값이 포함되어 받게 되어서 encodeURI 이용하여 파라메터 전달
            	var url = "jscall://uploadFile&"+encodeURI(jsonString);
            	//URI.encoding(url);
            	console.log("url : "+url);
            	if (checkOs() == "ios"){
                	window.location=url;
 				}
 				else if(checkOs() == "android"){
 					window.ParagonApp.uploadFiles(encodeURI(jsonString)); // android
 				}
        	});

        	// JAVASCRIPT callback receive parameter iOS, Android Native
        	$("#tempRecParamsBtn").click(function () {
        		if (checkOs() == "ios"){
            		window.location="jscall://recvParam"// mmscall://id=aaa jscall://testMessage
 				}
 				else if(checkOs() == "android"){
 					window.ParagonApp.recvParam(); // android
 				}
        	});
        	
        	// Web 설정 iOS, Android Native 호출 
        	$("#tempAppWebSettingBtn").click(function () {
        		if (checkOs() == "ios"){
            		window.location="jscall://webSettings"// mmscall://id=aaa jscall://testMessage
 				}
 				else if(checkOs() == "android"){
 					window.ParagonApp.webSettings(); // android
 				}
        	});
        	
        	// 사인 화면 iOS, Android Native 호출
        	$("#tempAppSignCallBtn").click(function () {
        		//javascript json 파라메터를 native(android, ios) 전
        		var callInfo = {};
        		callInfo.functionName = "onClick";
        		callInfo.callbackFunction = "fnAppFileUpload";
        		callInfo.fileUpladUrl = "/ctrl/call/obstacle/status/saveReptSign";
        		callInfo.args = "img";
        		callInfo.successMessage = "파일 전송 성공";
            	callInfo.failMessage = "파일 전송 실패";
            	var jsonString = JSON.stringify(callInfo);
            	console.log("jsonString : "+jsonString);
            	// encodeURI 사용 이유 : 한글 입력시 쓰레기 값이 포함되어 받게 되어서 encodeURI 이용하여 파라메터 전달
        		if (checkOs() == "ios"){
            		window.location="jscall://signViewCall&"+encodeURI(jsonString)// mmscall://id=aaa jscall://testMessage
 				}
 				else if(checkOs() == "android"){
 					window.ParagonApp.signViewCall(encodeURI(jsonString)); // android
 				}
        	});
        	
        	// ios push(APNS) 전송 호출
        	$("#tempApnsBtn").click(function () {
				var formData = new FormData();
	        	$.ajax({
	        		url : "/ctrl/template/common/apnsTest",
	        		data : formData,
	        		type : "POST",
	        		dataType : "json",
	        		cache: false,
	                contentType: false,
	                processData: false,
	        		success : function(data) {
	        			alert("apns 전송 성공");
	        		}
	        	}); 	

        	});
        	
        	$("#tempFileSaveBtn").click(function(){
        		fnFileSave();
        	});
        	$("#tempFileUpload").change(function(){
                
                var input = $(this);
        		
        		
	        	var infiles = input[0].files;
	        	
	        	for (var i = 0; i < infiles.length; i++) {
	        		var addfile = infiles[i];
	        		var fileNm = addfile.name;
	        		var fsize = addfile.size;
	        		files.push(addfile);
	        		console.log(fileNm);
	        		console.log(fsize.fileSizeFormat());
        		}
	        	
        	});

        	$("#tempMobileInfoBtn").click(function () {
        		
        		
        		MobileUtil.setInfo({
    				callback : "MobileUtil.ReturnData",
    				locTime : "30000",
    				locYn : "N"
        		});
/*         		MobileUtil.getMobileInfo({
        			callbackFunction : "fnMobileInfo",
    			});
 */    			
        		//return;
    			
//         		var callInfo = {};
//         		callInfo.functionName = "onClick";
//         		callInfo.callbackFunction = "fnMobileInfo";
//             	var jsonString = JSON.stringify(callInfo);
//             	console.log("jsonString : "+jsonString);
//         		if (checkOs() == "ios"){
//             		window.location="jscall://getMobileInfo&"+encodeURI(jsonString)// mmscall://id=aaa jscall://testMessage
//  				}
//  				else if(checkOs() == "android"){
//  					window.ParagonApp.getMobileInfo(encodeURI(jsonString)); // android
//  				}
    		});
    		
    		$("#tempLocationUseYBtn").click(function () {
    			
    			MobileUtil.useLocation({
    				
    			});
/*     			MobileUtil.locationUseYes({
        			callbackFunction : "fnReturnData",
        			locTime : "10000",
        			locYn : "Y"
    			});
 */    			
//         		var callInfo = {};
//         		callInfo.functionName = "onClick";
//         		callInfo.callbackFunction = "fnLocationUseYn";
//         		callInfo.locTime = "60000";
//         		callInfo.locUri = "/ctrl/settings/user/mobileLoc";
//         		callInfo.locYn = "Y";
//             	var jsonString = JSON.stringify(callInfo);
//             	console.log("jsonString : "+jsonString);
//         		if (checkOs() == "ios"){
//             		window.location="jscall://locationUseY&"+encodeURI(jsonString)// mmscall://id=aaa jscall://testMessage
//  				}
//  				else if(checkOs() == "android"){
//  					console.log("android tempLocationUseYBtn");
//  					window.ParagonApp.locationUseY(encodeURI(jsonString)); // android
//  				}
    		});

    		$("#tempLocationUseNBtn").click(function () {
    			
    			MobileUtil.notUseLocation({
    				
    			});
/*     			MobileUtil.locationUseNo({
        			callbackFunction : "fnReturnData",
        			locTime : "60000",
        			locYn : "N"
    			});
 */    			
//         		var callInfo = {};
//         		callInfo.functionName = "onClick";
//         		callInfo.callbackFunction = "fnLocationUseYn";
//         		callInfo.locTime = "60000";
//         		callInfo.locUri = "/ctrl/settings/user/mobileLoc";
//         		callInfo.locYn = "N";
//             	var jsonString = JSON.stringify(callInfo);
//             	console.log("jsonString : "+jsonString);
//         		if (checkOs() == "ios"){
//             		window.location="jscall://locationUseN&"+encodeURI(jsonString)// mmscall://id=aaa jscall://testMessage
//  				}
//  				else if(checkOs() == "android"){
//  					window.ParagonApp.locationUseN(encodeURI(jsonString)); // android
//  				}
    		});

    		$("#tempGpsStartBtn").click(function () {
    			
    			MobileUtil.startGps({
    				
    			});
/*     			MobileUtil.gpsStart({
        			callbackFunction : "fnReturnData",
    			});
 */    			
//         		var callInfo = {};
//         		callInfo.functionName = "onClick";
//         		callInfo.callbackFunction = "fnGpsStartAndStop";
//         		callInfo.locTime = "60000";
//         		callInfo.locUri = "/ctrl/settings/user/mobileLoc";
//         		callInfo.locStartYN = "Y";
//             	var jsonString = JSON.stringify(callInfo);
//             	console.log("jsonString : "+jsonString);
//         		if (checkOs() == "ios"){
//             		window.location="jscall://gpsStart&"+encodeURI(jsonString)// mmscall://id=aaa jscall://testMessage
//  				}
//  				else if(checkOs() == "android"){
//  					window.ParagonApp.gpsStart(encodeURI(jsonString)); // android
//  				}
    		});

    		$("#tempGpsStopBtn").click(function () {
    			
    			MobileUtil.stopGps({
    				
    			});
/*     			MobileUtil.gpsStop({
        			callbackFunction : "fnReturnData",
    			});
 */    			
//         		var callInfo = {};
//         		callInfo.functionName = "onClick";
//         		callInfo.callbackFunction = "fnGpsStartAndStop";
//         		callInfo.locTime = "60000";
//         		callInfo.locUri = "/ctrl/settings/user/mobileLoc";
//         		callInfo.locStartYN = "N";
//             	var jsonString = JSON.stringify(callInfo);
//             	console.log("jsonString : "+jsonString);
//         		if (checkOs() == "ios"){
//             		window.location="jscall://gpsStop&"+encodeURI(jsonString)// mmscall://id=aaa jscall://testMessage
//  				}
//  				else if(checkOs() == "android"){
//  					window.ParagonApp.gpsStop(encodeURI(jsonString)); // android
//  				}
    		});
    		
    		$("#tempSelectNativeInfoBtn").click(function () {
/*     			MobileUtil.getInfo("pushId");
 */    			MobileUtil.getInfo({
    				callback : "MobileUtil.ReturnData",
    				//key :'locTime'
    				key :'locYn'
    			});
    			
//    			MobileUtil.getSettingInfo({
//    			});
    			
//         		var callInfo = {};
//         		callInfo.functionName = "onClick";
//         		callInfo.callbackFunction = "fnShowSettingInfo";
//             	var jsonString = JSON.stringify(callInfo);
//         		if (checkOs() == "ios"){
//             		window.location="jscall://settingInfo&"+encodeURI(jsonString)// mmscall://id=aaa jscall://testMessage
//  				}
//  				else if(checkOs() == "android"){
//  					window.ParagonApp.settingInfo(encodeURI(jsonString)); // android
//  				}
    		});
    		
			$("#tempSetAutoFlagYBtn").click(function () {
        		MobileUtil.setInfo({
    				autoFlag : "Y"
        		});
			});

			$("#tempSetAutoFlagNBtn").click(function () {
        		MobileUtil.setInfo({
    				autoFlag : "N"
        		});
			});

			$("#tempGetAutoFlagBtn").click(function () {
				MobileUtil.getInfo({
    				callback : "MobileUtil.ReturnData",
    				//key :'locTime'
    				key :'autoFlag'
    			});
			});
    		function fnFileSave(){
				var input = $("#tempFileUpload");       		
        		
	        	var infiles = input[0].files;
				var formData = new FormData();
				
	        	console.log("======================================");
	        	console.log(files.length);
	        	if(infiles.length > 0) {
	        		for (var i = 0; i < infiles.length; i++) {
		        		var addfile = infiles[i];
		        		var fileNm = addfile.name;
		        		var fsize = addfile.size;
		        		formData.append('files',addfile);
		        		formData.append('files2',addfile);
		        		console.log(fileNm);
		        		console.log(fsize.fileSizeFormat());
	        		}
	        	}else{
	        		alert("파일 없음");
	        		return;
	        	}
      			formData.append('test111', "11111111111111");
	        	$.ajax({
	        		url : "/ctrl/template/common/fileSave2",
	        		data : formData,
	        		type : "POST",
	        		dataType : "json",
	        		cache: false,
	                contentType: false,
	                processData: false,
	        		success : function(data) {
	        			console.log(data);
	        			var imgList = data.dt_saveFileInfo;
// 	        			dr.setVal("fileName", fileName);
// 	        			dr.setVal("saveName", sFileName);
// 	        			dr.setVal("fileSize", fileSize);
// 	        			dr.setVal("filePath", filePath);
// 	        			dr.setVal("webPath", webPath);
	        			for (var i = 0; i < imgList.length; i++) {
	        				$("#imgDiv").append('<div class="superbox-list"><img src="'+imgList[i].webPath+'" data-img="'+imgList[i].webPath+'" alt="" class="superbox-img" /></div>')
						}
	        			$("#imgDiv").SuperBox();
	        			alert("저장 되었습니다.");
	        		}
	        	}); 	
			}

        });

        function fnAppFileSave(){
        	/* fnFileSave(); */
        	$("#tempFileSaveBtn").click();
        }
        
        function fnAppFileUploadSuccess(message)
        {
        	$("#textDiv").append("<p>"+message+"</p><br/>");
        	/* alert(message); */
        }

        function fnMobileInfo(message) {
        	MobileUtil.WriteLog(message);
        	$("#textDiv").append("<span style='width:100%;'> message : <br/>"+message+"</span><br/>");
        	var jsonString = decodeURI(message);
        	var data = JSON.parse(jsonString);
        	$("#textDiv").append("<span style='width:100%;'> data : "+data+"</span><br/>");       	
        	$("#textDiv").append("<span style='width:100%;'> data.mobileAuthKey : "+data.mobileAuthKey+"</span><br/>");       	
        	$("#textDiv").append("<span style='width:100%;'> data.pushId : "+data.pushId+"</span><br/>");       	
        	$("#textDiv").append("<span style='width:100%;'> data.locUri : "+data.locUri+"</span><br/>");       	
        	$("#textDiv").append("<span style='width:100%;'> data.locTime : "+data.locTime+"</span><br/>");       	
        	$("#textDiv").append("<span style='width:100%;'> data.locFlag : "+data.locFlag+"</span><br/>");       	
        	$("#textDiv").append("<span style='width:100%;'> data.mobileModel : "+data.mobileModel+"</span><br/>");       	
        	$("#textDiv").append("<span style='width:100%;'> data.appVer : "+data.appVer+"</span><br/>");       	
        	$("#textDiv").append("<span style='width:100%;'> data.mobileVer : "+data.mobileVer+"</span><br/>");       	
        }
        
        function fnLocationUseYn(message){
        	$("#textDiv").append("<span style='width:100%;'> message : <br/>"+message+"</span><br/>");
        	var jsonString = decodeURI(message);
        	var data = JSON.parse(jsonString);
        	$("#textDiv").append("<span style='width:100%;'> data : "+data+"</span><br/>");       	
        	$("#textDiv").append("<span style='width:100%;'> data.mobileAuthKey : "+data.mobileAuthKey+"</span><br/>");       	
        	$("#textDiv").append("<span style='width:100%;'> data.pushId : "+data.pushId+"</span><br/>");       	
        	$("#textDiv").append("<span style='width:100%;'> data.locUri : "+data.locUri+"</span><br/>");       	
        	$("#textDiv").append("<span style='width:100%;'> data.locTime : "+data.locTime+"</span><br/>");       	
        	$("#textDiv").append("<span style='width:100%;'> data.locFlag : "+data.locFlag+"</span><br/>");       	
        	$("#textDiv").append("<span style='width:100%;'> data.mobileModel : "+data.mobileModel+"</span><br/>");       	
        	$("#textDiv").append("<span style='width:100%;'> data.appVer : "+data.appVer+"</span><br/>");       	
        	$("#textDiv").append("<span style='width:100%;'> data.mobileVer : "+data.mobileVer+"</span><br/>");       	
        	$("#textDiv").append("<span style='width:100%;'> data.mobileVer : "+data.mobileVer+"</span><br/>");       	
        	$("#textDiv").append("<span style='width:100%;'> data.locYn : "+data.locYn+"</span><br/>");      
        	$("#textDiv").append("<span style='width:100%;'> data.startMsg : "+data.startMsg+"</span><br/>");
        }
		
        function fnGpsStartAndStop(message){
        	$("#textDiv").append("<span style='width:100%;'> message : <br/>"+message+"</span><br/>");
        	var jsonString = decodeURI(message);
        	var data = JSON.parse(jsonString);
        	$("#textDiv").append("<span style='width:100%;'> data : "+data+"</span><br/>");       	
        	$("#textDiv").append("<span style='width:100%;'> data.mobileAuthKey : "+data.mobileAuthKey+"</span><br/>");       	
        	$("#textDiv").append("<span style='width:100%;'> data.pushId : "+data.pushId+"</span><br/>");       	
        	$("#textDiv").append("<span style='width:100%;'> data.locUri : "+data.locUri+"</span><br/>");       	
        	$("#textDiv").append("<span style='width:100%;'> data.locTime : "+data.locTime+"</span><br/>");       	
        	$("#textDiv").append("<span style='width:100%;'> data.locFlag : "+data.locFlag+"</span><br/>");       	
        	$("#textDiv").append("<span style='width:100%;'> data.mobileModel : "+data.mobileModel+"</span><br/>");       	
        	$("#textDiv").append("<span style='width:100%;'> data.appVer : "+data.appVer+"</span><br/>");       	
        	$("#textDiv").append("<span style='width:100%;'> data.mobileVer : "+data.mobileVer+"</span><br/>");       	
        	$("#textDiv").append("<span style='width:100%;'> data.startMsg : "+data.startMsg+"</span><br/>");       	
        }
       
        function fnReceivedGpsInfo(message){
        	var jsonString = decodeURI(message);
        	var data = JSON.parse(jsonString);
        	$("#textDiv").append("<span style='width:100%;'> data.lat : "+data.lat+"</span><br/>");       	
        	$("#textDiv").append("<span style='width:100%;'> data.lng : "+data.lng+"</span><br/>");       	
        }
        
        function fnShowSettingInfo(message){
        	var jsonString = decodeURI(message);
        	var data = JSON.parse(jsonString);
        	$("#textDiv").append("<span style='width:100%;'> message : <br/>"+jsonString+"</span><br/>");
//        	$("#textDiv").append("<span style='width:100%;'> data.lat : "+data.lat+"</span><br/>");       	
//        	$("#textDiv").append("<span style='width:100%;'> data.lng : "+data.lng+"</span><br/>");       	
        }
        
        function fnAppFileUpload(message, obj)
        {
        	$("#textDiv").append("<p>"+message+"</p><br/>");
        	$("#textDiv").append("<span style='width:100%;'> obj"+obj+"</span><br/>");
        	var data = JSON.parse(obj);
        	$("#textDiv").append("<span style='width:100%;'> data"+data+"</span><br/>");
			var imgList = data.dt_saveFileInfo;
// 			dr.setVal("fileName", fileName);
// 			dr.setVal("saveName", sFileName);
// 			dr.setVal("fileSize", fileSize);
// 			dr.setVal("filePath", filePath);
// 			dr.setVal("webPath", webPath);
			for (var i = 0; i < imgList.length; i++) {
				$("#imgDiv").append('<div class="superbox-list"><img src="'+imgList[i].webPath+'" data-img="'+imgList[i].webPath+'" alt="" class="superbox-img" /></div>')
			}
			$("#imgDiv").SuperBox();

        	/* alert(message); */
        }
        
        function checkOs(){
        	var mobile = (/iphone|ipad|ipod|android/i.test(navigator.userAgent.toLowerCase()));
        	 
        	if (mobile) {
        		// 유저에이전트를 불러와서 OS를 구분합니다.
        		var userAgent = navigator.userAgent.toLowerCase();
        		if (userAgent.search("android") > -1){
        			return "android";
        		}else if ((userAgent.search("iphone") > -1) || (userAgent.search("ipod") > -1)|| (userAgent.search("ipad") > -1)){
        			return "ios";
        		}else{
        			return "etc";
        		}
        	} else {
        		return "web";
        	}
        }
        
        function fnAppReceiveScriptParams(params)
        {
        	alert(params);
        }
        
        
//         function fnReturnData(message) {
//         	var jsonString = decodeURI(message);
//         	var data = JSON.parse(jsonString);
//         	MobileUtil.WriteLog(data);
//         }
//         callInfo.functionName = "onClick";
// 		callInfo.callbackFunction = "fnGpsStartAndStop";
// 		callInfo.locTime = "60000";
// 		callInfo.locUri = "/ctrl/settings/user/mobileLoc";
// 		callInfo.locStartYN = "Y";

// 	$("#tempMobileInfoBtn").click(function () {
//         		var callInfo = {};
//         		callInfo.functionName = "onClick";
//         		callInfo.callbackFunction = "fnMobileInfo";
//             	var jsonString = JSON.stringify(callInfo);
//             	console.log("jsonString : "+jsonString);
//         		if (checkOs() == "ios"){
//             		window.location="jscall://getMobileInfo&"+encodeURI(jsonString)// mmscall://id=aaa jscall://testMessage
//  				}
//  				else if(checkOs() == "android"){
//  					window.ParagonApp.getMobileInfo(encodeURI(jsonString)); // android
//  				}
//     		});
	
		
     
    </script>
</body>
</html>