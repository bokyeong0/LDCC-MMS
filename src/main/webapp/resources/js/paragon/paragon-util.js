var UserInfo;
Date.prototype.getPassTime = function() {
		
	var year = this.getFullYear();
	
	if((( year % 4 == 0 &&  year % 100 != 0 ) || year % 400 ==0)){
		return (24 * 60 * 60 * 1000);
	}
	return 0;
};
(function($) {
    $.ajaxSetup({
    	 global: false
    	,timeout: 30000
    	,beforeSend : function(xhr){
            xhr.setRequestHeader("AjaxType", "paragon"); 
            xhr.setRequestHeader("proCd", "PC0001"); 
        }
    });
	
	$.fn.enterEvent = function(data) {
		$(this).keydown(function() {
			if (event.keyCode == 13) {
				data.callBack($(this).val());
			}
		});
		
	}
	$.fn.changeEvent = function(key) {
		$(this).keydown(function(e){
			e.stopPropagation();
			if (event.keyCode == 13) {
				$(this).next().focus();
			}
		});
		
	}

	
	
	String.prototype.comma = function() {
		if(this){
			var temp = (this == "") ? "" : (parseInt(this) + "");
			var zeroDel = temp.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
			return zeroDel;
		}else{
			return 0;
		}
	};
	Number.prototype.comma = function() {
		if(this){
			var temp = (this == "") ? "0" : (this + "");
			var zeroDel = temp.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
			return zeroDel;
		}else{
			return 0;
		}
	};

	/**
	 * @함수명: uncomma
	 * @작성일: 2014. 9. 29.
	 * @작성자: 김진호
	 * @설명: 콤마제거
	 * @param :
	 *            seq
	 */
	String.prototype.uncomma = function() {
		var temp = this.replace(/\,/g, "");
		return temp;
	};
	String.prototype.strCamel = function() {
		return this.toLowerCase().replace(/(\_[a-z])/g, function(arg){
	        return arg.toUpperCase().replace('_','');
	    });
	};

	
	/**
	 * @함수명: textMoney
	 * @작성일: 2014. 9. 29.
	 * @작성자: 김진호
	 * @설명: 금액을 한글로 변경
	 * @param String
	 */
	Number.prototype.textMoney = function() {
		if (this == 0){
			return '영';
		}
		var phonemic = [ '', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구' ];
		var unit = [ '', '', '십', '백', '천', '만', '십만', '백만', '천만', '억', '십억',
				'백억', '천억', '조', '십조', '백조' ];
		var ret = '';
		var part = new Array();
		for (var x = 0; x < String(this).length; x++)
			part[x] = String(this).substring(x, x + 1);
		for (var i = 0, cnt = String(this).length; cnt > 0; --cnt, ++i) {
			p = phonemic[part[i]];
			p += (p) ? (cnt > 4 && phonemic[part[i + 1]]) ? unit[cnt].substring(0, 1) : unit[cnt] : '';
			ret += p;
		}
		return ret;
	};
	/**
	 * @함수명: getLocalDate
	 * @작성일: 2014. 9. 29.
	 * @작성자: 김진호
	 * @설명: 오늘날짜 localDate
	 * @param mon(-1 : 1달전 , 4 : 4달후)
	 */
	function getLocalDate(mon) {
		if(mon == "" || mon === null || mon === undefined){
			mon = 0;
		}
		var now = new Date();
		now.setMonth(now.getMonth() + mon);
		var year = now.getFullYear();
		var mon = (now.getMonth() + 1) > 9 ? '' + (now.getMonth() + 1) : '0'
				+ (now.getMonth() + 1);
		var day = now.getDate() > 9 ? '' + now.getDate() : '0' + now.getDate();

		return year + '-' + mon + '-' + day;
	}
	//모든 공백제거
	String.prototype.atrim = function() {
		var temp = this.replace(/\ /g, "");
		return temp;
	};
	
	
	Date.prototype.checkLeapDate = function() {
		
		var year = this.getFullYear();
		
		if(this.getDate() > 29 && this.getMonth() == 2 &&(( year % 4 == 0 &&  year % 100 != 0 ) || year % 400 ==0)){
			this.setDate(this.getDate() -1);
		}
		
		var year = this.getFullYear();
		var mon = (this.getMonth() + 1) > 9 ? '' + (this.getMonth() + 1) : '0'
				+ (this.getMonth() + 1);
		var day = this.getDate() > 9 ? '' + this.getDate() : '0' + this.getDate();

//		if(day > 29 &&mon == 2 &&(( year % 4 == 0 &&  year % 100 != 0 ) || year % 400 ==0)){
//			day = day-1;
//		}
//		
		return  year + '-' + mon + '-' + day;
	};
	
	Date.prototype.getPassDay = function() {
		
		var year = this.getFullYear();
		
		if((( year % 4 == 0 &&  year % 100 != 0 ) || year % 400 ==0)){
			return 1;
		}
		return 0;
		
	};
	//금액
	$.fn.onlyMoney = function() {
		$(this).keydown(function() {
				if ((event.keyCode >= 48 && event.keyCode <= 57)
						|| event.keyCode == 9 || event.keyCode == 8
						|| (event.keyCode >= 96 && event.keyCode <= 105)
						|| (event.keyCode >= 37 && event.keyCode <= 40)
						|| (event.keyCode == 189 || event.keyCode == 109)) {
					event.returnValue = true;
				} else if (event.keyCode == 13) {
					event.keyCode = 9;
				} else {
					event.preventDefault ? event.preventDefault()
							: event.returnValue = false;
				}
			}).keyup(function() {
			var num = $(this).val().uncomma();
			$(this).val(num.toString().comma());
		});
	};
	$.fn.onlyNumber = function() {
		$(this).keydown(function() {
			if ((event.keyCode >= 48 && event.keyCode <= 57)
					|| event.keyCode == 9 || event.keyCode == 8
					|| event.keyCode == 46
					|| (event.keyCode >= 96 && event.keyCode <= 105)
					|| (event.keyCode >= 37 && event.keyCode <= 40)) {
				event.returnValue = true;
			} else {
				event.preventDefault ? event.preventDefault()  : event.returnValue = false;
			}
		});
	};
	$.fn.onlyFloat = function() {
		$(this).keydown(function() {
			// alert(event.keyCode);
			if ((event.keyCode >= 48 && event.keyCode <= 57)
					|| event.keyCode == 9
					|| event.keyCode == 8
					|| (event.keyCode >= 96 && event.keyCode <= 105)
					|| (event.keyCode >= 37 && event.keyCode <= 40)
					|| (event.keyCode == 189 || event.keyCode == 109)
					|| (event.keyCode == 110 || event.keyCode == 190)) {
				if (($(this).val().length == 0 && (event.keyCode == 110 || event.keyCode == 190))
						|| ($(this).val().indexOf(".") > 0 && (event.keyCode == 110 || event.keyCode == 190))) {
					// alert("소수점이 이미 입력되었거나 처음 임력됨");
					event.preventDefault ? event.preventDefault(): event.returnValue = false;
				} else {
					event.returnValue = true;
				}
			} else if (event.keyCode == 13) {
				event.keyCode = 9;
			} else {
				event.preventDefault ? event.preventDefault() : event.returnValue = false;
			}
		});
	};

	Number.prototype.fileSizeFormat = function() {

		var size = 0;
		var unit = "Byte";
		if (this < 999) {
			size = this;
		} else if (this < 999999) {
			size = this/1024; 
			if ((size % 1) != 0) {
				size = size.toFixed(1);
			}
			unit = " KB";
		} else if (this < 999999999) {
			size = this/(1024*1024); 
			if ((size % 1) != 0) {
				if (size < 100) {
					size = size.toFixed(1);
				} else {
					size = size.toFixed(0);
				}
				;
			}
			unit = " MB";
		} else if (this < 999999999999) {
			size = this/(1024*1024*1024);  
			if ((size % 1) != 0) {
				size = size.toFixed(2);
			}
			unit = " GB";
		} else if (this < 999999999999999) {
			size = this/(1024*1024*1024*1024);	
			if ((size % 1) != 0) {
				size = size.toFixed(2);
			}
			unit = " TB";
		}
		return size + unit;
	};
	String.prototype.fileSizeFormat = function() {
		
		var size = 0;
		var unit = "Byte";
		if (this < 999) {
			size = this;
		} else if (this < 999999) {
			size = this/1024; 
			if ((size % 1) != 0) {
				size = size.toFixed(1);
			}
			unit = " KB";
		} else if (this < 999999999) {
			size = this/(1024*1024); 
			if ((size % 1) != 0) {
				if (size < 100) {
					size = size.toFixed(1);
				} else {
					size = size.toFixed(0);
				}
				;
			}
			unit = " MB";
		} else if (this < 999999999999) {
			size = this/(1024*1024*1024);  
			if ((size % 1) != 0) {
				size = size.toFixed(2);
			}
			unit = " GB";
		} else if (this < 999999999999999) {
			size = this/(1024*1024*1024*1024);	
			if ((size % 1) != 0) {
				size = size.toFixed(2);
			}
			unit = " TB";
		}
		return size + unit;
	};

}(jQuery));



var Util = function () {
	"use strict";
	return {
		LocalDate: function (mon) {
			if(mon == "" || mon === null || mon === undefined){
				mon = 0;
			}
			var now = new Date();
			now.setMonth(now.getMonth() + mon);
			var year = now.getFullYear();
			var mon = (now.getMonth() + 1) > 9 ? '' + (now.getMonth() + 1) : '0'
					+ (now.getMonth() + 1);
			var day = now.getDate() > 9 ? '' + now.getDate() : '0' + now.getDate();

			return year + '-' + mon + '-' + day;
		},
		LocalTime: function (flag) {
			var now = new Date();
			var hours = now.getHours();
			var minutes = now.getMinutes();
			if(flag == 24){
				hours = hours > 9 ? '' + hours : '0' + hours;
				minutes = minutes > 9 ? '' + minutes : '0' + minutes;
				return hours + ':' + minutes;
			}
			var mid='AM';
			if(hours > 12){ 
				hours = hours-12;
				mid='PM';
		    }
		    hours = hours > 9 ? '' + hours : '0' + hours;
			minutes = minutes > 9 ? '' + minutes : '0' + minutes;
			return hours + ':' + minutes + ' ' + mid;
		},
		MakeSelectOptions: function (El,json,select,first) {
			if(first){
				El.html("");
				var option = $("<option value='' />");
				option.text(first)
				El.append(option);
			}
			for (var i = 0; i < json.length; i++) {
	    		var thisValue = json[i].value;
	    		var thisName = json[i].name;
	    		var option = $("<option>", {value: thisValue,selected:select == thisValue});
	    		option.text(thisName)
	    		El.append(option);
	    	}
		},
		/*[배정처리 유승우][2017-11-20]*/
		MakeSelectAllotOptions: function (El,json,select,first) {
			El.html("");
			if(first == "other3"){
				var option = $("<option value='' />");
				option.text("선택");
				El.append(option);	
				  for (var i = 0; i < json.length; i++) {
		    		var thisValue = json[i].other2;
		    		var thisName = json[i].other3;	
		    		var option = $("<option>", {value: thisValue,selected:select == thisValue});
		    		option.text(thisName)
		    		El.append(option);   	    		
		    	  }
		    }else{
				var option = $("<option value='' />");
				option.text("선택");
				El.append(option);		    	
			  for (var i = 0; i < json.length; i++) {
	    		var thisValue = json[i].value;
	    		var thisName = json[i].name;	
	    		var option = $("<option>", {value: thisValue,selected:select == thisValue});
	    		option.text(thisName)
	    		El.append(option);   	    		
	    	  }
		    }
		},
		MakeSelectNewOptions: function (El,json,select) {
			El.html("");
			for (var i = 0; i < json.length; i++) {
				var thisValue = json[i].value;
				var thisName = json[i].name;
				var option = $("<option>", {value: thisValue,selected:select == thisValue});
				option.text(thisName)
				El.append(option);   	
			}
		},
		MakeBootstrapSelectBox: function (El,json,first,select) {
			El.html("");
			if(first){
				var option = $("<option value='' />");
				option.text(first)
				El.append(option);
			}
			for (var i = 0; i < json.length; i++) {
				
				var thisValue = json[i].value;
				var thisName = json[i].name;
				var option = $("<option>", {value: thisValue,selected:select == thisValue});
				option.text(thisName)
				El.append(option);
			}
			El.combobox();
			El.data('combobox').refresh();
		},
		MakeGridOptions: function (json,firstOption) {
			var txt = "" ;
			if(firstOption || firstOption== ""){
				 txt = ":"+firstOption+";" ;
			}
			for (var i = 0; i < json.length; i++) {
				if(i > 0){
					txt +=";";
				}				
				txt +=json[i].value+":"+json[i].name;
				
			}
			return txt;
		},
		UserInfoInit: function () {
			$.ajax({
				url : "/ctrl/comm/userinfo",
				type : "POST",
				dataType : "json",
				async:false,
				cache: false,
				success : function(result) {
					UserInfo =  result;
				}
			});
		},
		getUserInfo: function () {
			return UserInfo;
		},
		CheckOs: function () {
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
    };
}();
