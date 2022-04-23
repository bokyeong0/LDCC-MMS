/**
 * @함수명: onLoad
 * @작성일: 2015. 01. 07.
 * @작성자: 김기정
 * @설명: 로딩 및 Event
 * @param 
 */

var timer;
var strHtml2 ="";
var tempDay = "";
var inDayFlag = true;
var prevId = "";
var prevDate = "";
var prevTime = "";
var inTimeFlag = true;
var ws;
$(document).ready(function(){
	fnSet_commentBtnRow();
//	fnGet_commnetList(true,"F");
	$( "#vertextalk" ).draggable();
/*	$("#comment_wrap").scroll(function(){
		var elem = $("#comment_wrap");
		if(elem[0].scrollHeight - elem.scrollTop() == elem.outerHeight()){
			alert("End of Scroll Point");
		}
	});*/
	
	$("#comment_wrap").scroll(function(){
		var elem = $("#comment_wrap");
		if(elem.scrollTop() == 0){
			$("#loding_last_low").slideDown();
		}else{
			$("#loding_last_low").slideUp();
		}
	});
	
//	startLoop();
	
	
	connect();
	 
//    $.when(connect()).done(function(){
//    	
//    });
    
 
    $('#connect').click(function () {
        connect();
        $(this).attr('disabled', true);
        $('#disconnect').removeAttr('disabled');
    });
 
    $('#disconnect').click(function () {
        disconnect();
        $(this).attr('disabled', true);
        $('#connect').removeAttr('disabled');
    });
 
    $('#message').keydown(event, function () {
        if (event.keyCode === 13) {
            ws.send('{protocol:"400",state:"1",state_message:"ok",message:"'+$(this).val()+'" ,Id:"'+$('#userId').val()+'",Pw:"'+$('#userPw').val()+'"}');
        }
    });
    $('#loginBtn').click(event, function () {
            ws.send('{protocol:"100",state:"1",state_message:"ok",message:"asdf",Id:"'+$('#userId').val()+'",Pw:"'+$('#userPw').val()+'"}');
    });
	
	
});

function connect() {
    ws = new WebSocket('ws://192.168.100.19:8080/echo');
    ws.onopen = function () {
        console.log('websocket opened');
        ws.send('{protocol:"100",state:"1",state_message:"ok",message:"asdf",Id:"anaws",Pw:"111"}');
    };
    ws.onmessage = function (call) {
        console.log(call);
        var result = JSON.parse(call.data);
        console.log(result);
        var message = result.message;
        var state = result.state;
        console.log(message);
        console.log(state);
        if(state == 1){
//        	document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
//            $('#messages').val($('#messages').val() + message + '\n');
            
		  fnMakeTable_comment(result);
		  $("#sales_comment").val('');
		  var elem = $("#comment_wrap");
		  elem.animate({scrollTop:elem[0].scrollHeight},"slow");
            
        }else{
        	alert(result.message);
        }
    };
    ws.onclose = function (event) {
        console.log(event);
        console.log('websocket closed');
    };
}

function disconnect() {
    if (ws) {
        ws.close();
        ws = null;
    }
}



function startLoop(){
	timer = setInterval(function(){
		fnGet_commnetList(false,"N");
	},5000);
}
function stopLoop(){
	clearInterval(timer);
	timer = null;
}

function fnSet_commentBtnRow(){
	//코멘트 등록
	$("#btn_update_comment").click(function(){
//		fnSet_insertComment();
		ws.send('{protocol:"400",state:"1",state_message:"ok",message:"'+$("#sales_comment").val()+'" ,Id:"anaws",Pw:"111"}');
	});
	//코멘트 레이어 닫기
	$("#closeCommentLayer").click(function(){
		$("#commentPg").html('');
		$("#commentPg").hide();
//		clearInterval(timer);
//		stopLoop();
//		fnGetData(1);
	});
	$("#btn_close_comment").click(function(){
		$("#commentPg").html('');
		$("#commentPg").hide();
//		clearInterval(timer);
//		stopLoop();
	});
	$("#moreOldList").click(function(){
		fnGet_commnetList(false,"A");
	});
	
}


function fnMakeTable_comment(result){
	var strHtml = '';
	var p_align = '';
	var firstDate = "fdate";
//	var session_id = result['session_id'];
//	var len = result['data'].length;
	
	
//	for (var i=0; i< len; i++){
		
//		if(session_id == result['data'][i]['sc_in_id']){
			p_align = "right";
//		}else{
//			p_align = "left";
//		}
		
	    var msg = result.message 
	    var send_id = result.id;
	    var send_name = result.name;
	    var send_date = result.date; 
	     
	    
	    
//    	if(i == 0 &&  listType =="N"){
	    	firstDate = send_id+dateFormats(send_date,"fe");
//	    }
//	    var nextLen  =  i  < len-1 ? i+1 : i;
//	    var nextId = result['data'][nextLen]['sc_in_id'];
//	    var nextDate = result['data'][nextLen]['sc_in_date'];
	    
	    
	    
	    var thisDay = dateFormats(send_date,"ymd");
	    var thisTime = dateFormats(send_date,"m:s");
	    console.log(thisDay);
	    console.log(thisTime);
//	    if(send_id == nextId && send_date == nextDate && i != len-1){
//	    	thisTime = "";
//	    }
	    
	    
	    
	    if(prevId == send_id ){
    		inNameFlag = true;
    	}else{
    		inNameFlag = false;
    	}
	    prevId = send_id;
	    prevDate = send_date;
	    
	    if(tempDay == thisDay){
	    	inDayFlag = true;
	    }else{
	    	tempDay = thisDay;
	    	inDayFlag = false;
	    }
	    
	    
	    if(prevTime == dateFormats(send_date,"m:s")){
	    	inTimeFlag = true;
	    }else{
	    	inTimeFlag = false;
	    }
	    prevTime = dateFormats(send_date,"m:s");
	    
	    var barId = dateFormats(send_date,"ymdd");
//	    if(!inDayFlag || (listType == "A"&& i == 0)){
//	    	$('.bar'+barId).remove();
//	    	strHtml += '<tr class="bar'+barId+'" >';
//	    	strHtml += '<td style="position : relative; border-bottom:solid 2px #dbdbdb;">';
//	    	strHtml += '<div style="position: absolute;bottom: -7px;background-color: #ECECEC;width: 100px;margin: auto;padding: 0px;right: 200px;" >'+thisDay+'</div>';
//	    	strHtml += '</td>';
//	    	strHtml += '</tr>';
//	    }
	    strHtml += '<tr>';
	    strHtml += '<td style="border-bottom-style:none; text-align:'+p_align+'">';
//		if(session_id == send_id){
			strHtml += '<span class="'+send_id+dateFormats(send_date,"fe")+'">'+thisTime+'</span><div class="arrow_box_right '+(!inNameFlag || (inNameFlag && !inTimeFlag)? "":"same-name")+'">'+msg+'</div>';
//		}else{
//			if(inNameFlag && inTimeFlag ){
//				if(listType=="N")$("."+firstDate).text("");
//				strHtml += '<div class="left-name same-name"></div>';
//				strHtml += '<div class="arrow_box_left '+(!inNameFlag || (inNameFlag && !inTimeFlag)? "":"same-name")+'">'+msg+'</div><span class="'+send_id+dateFormats(send_date,"fe")+'">'+thisTime+'</span>' ; //+' by '+e_name;
//			}else{
//				$("span").removeClass(prevId+dateFormats(prevDate,"fe"));
//				strHtml += '<div class="left-name">'+send_name+'</div>';
//				strHtml += '<div class="arrow_box_left ">'+msg+'</div><span class="'+send_id+dateFormats(send_date,"fe")+'">'+thisTime+'</span>' ; //+' by '+e_name;
//			}
//		}	    
	    strHtml += '</td>';
	    strHtml += '</tr>';
//	}
	
	
	
	var elem = $("#comment_wrap");
	var scrollHeight = elem[0].scrollHeight;
	var scrollTop = elem.scrollTop();
	var outerHeight = elem.outerHeight();
	
	
	if(inNameFlag){
		$("."+firstDate).text("");
	}else{
		$("span").removeClass(prevId+dateFormats(prevDate,"fe"));
	}
	$("#comment_tbodylist").append(strHtml);

		
	if(scrollHeight == (scrollTop+outerHeight) || first){
		elem.animate({scrollTop:elem[0].scrollHeight},"slow");
	}

}
function dateFormats(date , type){

	
	var year= date.substring(0,4);
	var mon = date.substring(5,7);
	var day = date.substring(8,10);
	var hour = date.substring(11,13);
	var min = date.substring(14,16);
	
	var ymdKr = year+'년 ' + mon + '월 ' + day+"일";
	var ms = hour+':'+min;
	var msKr = hour+'시 ' + min+"분";
	var fulldate = ymdKr + " " + msKr;
	if(type == "y"){
		return year;
	}else if(type == "m"){
		return mon;
	}else if(type == "d"){
		return day;
	}else if(type == "h"){
		return hour;
	}else if(type == "mi"){
		return min;
	}else if(type == "ymd"){
		return ymdKr;
	}else if(type == "ms"){
		return msKr;
	}else if(type == "m:s"){
		return ms;
	}else if(type == "f"){
		return fulldate;
	}else if(type == "fe"){
		return year+mon+day+hour+min;
	}else if(type == "ymdd"){
		return year+mon+day;
	}else{
		return "";
	}
	
}

