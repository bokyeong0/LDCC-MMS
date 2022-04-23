<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
<!--     <button id="connect">connect</button> -->
<!-- <button id="disconnect" >disconnect</button> -->

<input type="text" id="userId" style="width: 200px;" value='anaws' placeholder="아이디"  >
<input type="text" id="userPw" style="width: 200px;" value='111' placeholder="비번" >
<button id="loginBtn" >login</button>

<input type="text" id="message" style="width: 100%;" value=''  >
<!-- <input type="text" id="message2" style="width: 100%;" value='{protocol:"100",state:"1",state_message:"ok",message:"asdf",Id:"anaws",Pw:"111"}'  > -->
<textarea id="messages" style="width: 100%; height: 200px;" ></textarea>
<script src="https://code.jquery.com/jquery-2.1.3.min.js"></script>
<script type="text/javascript">
    var ws;
 
    connect();
    
    function connect() {
        ws = new WebSocket('ws://10.10.21.32:8080/echo');
        ws.onopen = function () {
            console.log('websocket opened');
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
            	document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
	            $('#messages').val($('#messages').val() + message + '\n');
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
 
    $(function () {
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
//                 ws.send($(this).val());
                ws.send('{protocol:"400",state:"1",state_message:"ok",message:"'+$(this).val()+'" ,Id:"'+$('#userId').val()+'",Pw:"'+$('#userPw').val()+'"}');
            }
        });
        $('#loginBtn').click(event, function () {
                ws.send('{protocol:"100",state:"1",state_message:"ok",message:"asdf",Id:"'+$('#userId').val()+'",Pw:"'+$('#userPw').val()+'"}');
        });
    });
</script>
</body>
</html>