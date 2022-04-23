var MobileUtil = function () {
	"use strict";
	
	
	return {
//		ChangeOption : function(type, options) {
//
//	 		var settings = $.extend({
//	 			functionName: "onClick",
//	 			callbackFunction : "fnReturnData",
//	 			type : ''
//	        }, options );
//	 		
// 	 		this.WriteLog(settings);
//	 		
//        	var jsonString = JSON.stringify(settings);
//        	
////         	this.WriteLog("jsonString : "+ jsonString);
//        	
//        	var osType = Util.CheckOs();
//        	this.WriteLog("CheckOs : " + osType );
//        	
//        	if ( type == "MobileInfo") {
//        		if (osType == "ios"){
//            		window.location="jscall://getMobileInfo&"+encodeURI(jsonString)// mmscall://id=aaa jscall://testMessage
//        		}else if(osType == "android"){
//        			window.ParagonApp.getMobileInfo(encodeURI(jsonString)); // android
//        		}	
//        	}
//		},
		setInfo : function(options) {
			var settings = $.extend({
				callback : "MobileUtil.ReturnData"
			}, options );
			
			this.WriteLog(settings);
			var jsonString = JSON.stringify(settings);
			
			if (Util.CheckOs() == "ios"){
				window.location="jscall://setInfo&"+encodeURI(jsonString)// mmscall://id=aaa jscall://testMessage
			}else if(Util.CheckOs() == "android"){
				window.ParagonApp.setInfo(encodeURI(jsonString)); // android
			}
		},
		getInfo : function(options) {
			var settings = $.extend({
				callback : "MobileUtil.ReturnData"
			}, options );
			
			this.WriteLog(settings);
			var jsonString = JSON.stringify(settings);
			
			if (Util.CheckOs() == "ios"){
				window.location="jscall://getInfo&"+encodeURI(jsonString)// mmscall://id=aaa jscall://testMessage
			}else if(Util.CheckOs() == "android"){
				window.ParagonApp.getInfo(encodeURI(jsonString)); // android
			}
		},
//		getMobileInfo : function(options) {
//			var settings = $.extend({
//				functionName: "getMobileInfo",
//				callbackFunction : "MobileUtil.ReturnData",
//			}, options );
//			
//			this.WriteLog(settings);
//			var jsonString = JSON.stringify(settings);
//			
//			if (Util.CheckOs() == "ios"){
//				window.location="jscall://getMobileInfo&"+encodeURI(jsonString)// mmscall://id=aaa jscall://testMessage
//			}else if(Util.CheckOs() == "android"){
//				window.ParagonApp.getMobileInfo(encodeURI(jsonString)); // android
//			}	
//		},
//		locationUseYes : function(options) {
//			var settings = $.extend({
//				functionName : "locationUseYes",
//        		callbackFunction : "MobileUtil.ReturnData",
//        		locTime : "20000",
//        		locUri : "/ctrl/settings/user/mobileLoc",
//        		locYn : "Y"
//			}, options );
//			
//			this.WriteLog(settings);
//			var jsonString = JSON.stringify(settings);
//			
//			if (Util.CheckOs() == "ios"){
//				window.location="jscall://locationUseY&"+encodeURI(jsonString)// mmscall://id=aaa jscall://testMessage
//			}else if(Util.CheckOs() == "android"){
//				window.ParagonApp.locationUseY(encodeURI(jsonString)); // android
//			}	
//		},
		useLocation : function(options) {
			
			if (Util.CheckOs() == "ios"){
				window.location="jscall://useLocation"// mmscall://id=aaa jscall://testMessage
			}else if(Util.CheckOs() == "android"){
				window.ParagonApp.useLocation(); // android
			}	
		},
		notUseLocation : function(options) {

			if (Util.CheckOs() == "ios"){
				window.location="jscall://notUseLocation"// mmscall://id=aaa jscall://testMessage
			}else if(Util.CheckOs() == "android"){
				window.ParagonApp.notUseLocation(); // android
			}	
		},
//		locationUseNo : function(options) {
//			var settings = $.extend({
//				functionName : "locationUseNo",
//				callbackFunction : "MobileUtil.ReturnData",
//				locTime : "20000",
//				locUri : "/ctrl/settings/user/mobileLoc",
//				locYn : "Y"
//			}, options );
//			
//			this.WriteLog(settings);
//			var jsonString = JSON.stringify(settings);
//			
//			if (Util.CheckOs() == "ios"){
//				window.location="jscall://locationUseN&"+encodeURI(jsonString)// mmscall://id=aaa jscall://testMessage
//			}else if(Util.CheckOs() == "android"){
//				window.ParagonApp.locationUseN(encodeURI(jsonString)); // android
//			}	
//		},
		startGps : function(options) {
			var settings = $.extend({
				callback : "MobileUtil.ReturnData"
//				locTime : "20000",
//				locUri : "/ctrl/settings/user/mobileLoc",
//				locStartYN : "Y"
			}, options );
			
    		this.WriteLog(settings);
			var jsonString = JSON.stringify(settings);
		
			if (Util.CheckOs() == "ios"){
				window.location="jscall://startGps&"+encodeURI(jsonString)// mmscall://id=aaa jscall://testMessage
			}else if(Util.CheckOs() == "android"){
				window.ParagonApp.startGps(encodeURI(jsonString)); // android
			}
		},
		stopGps : function(options) {
			var settings = $.extend({
				callback : "MobileUtil.ReturnData"
//				locTime : "60000",
//				locUri : "/ctrl/settings/user/mobileLoc",
//				locStartYN : "N"
			}, options );
			
			this.WriteLog(settings);
			var jsonString = JSON.stringify(settings);
			
			if (Util.CheckOs() == "ios"){
				window.location="jscall://stopGps&"+encodeURI(jsonString)// mmscall://id=aaa jscall://testMessage
			}else if(Util.CheckOs() == "android"){
				window.ParagonApp.stopGps(encodeURI(jsonString)); // android
			}
		},
//		getSettingInfo : function(options) {
//			var settings = $.extend({
//				functionName : "gpsStop",
//				callbackFunction : "MobileUtil.ReturnData"
//			}, options );
//			
//			this.WriteLog(settings);
//			var jsonString = JSON.stringify(settings);
//			
//			if (Util.CheckOs() == "ios"){
//				window.location="jscall://settingInfo&"+encodeURI(jsonString)// mmscall://id=aaa jscall://testMessage
//			}else if(Util.CheckOs() == "android"){
//				window.ParagonApp.settingInfo(encodeURI(jsonString)); // android
//			}
//		},
		WriteLog : function(data) {
				var sendData={
	   			   "log":data
		   	   };

	   			var jsonData = JSON.stringify(sendData);
	   
           	$.ajax({
           		type : "POST",
    				url: "/ctrl/comm/writeLog",
    				data:jsonData,
    	    		contentType: 'application/json; charset=utf-8'
       		});
	 		
		},
		ReturnData : function(message) {
        	var jsonString = decodeURI(message);
        	var data = JSON.parse(jsonString);
        	MobileUtil.WriteLog(data);
        	
        }
        
    };
    
}();
