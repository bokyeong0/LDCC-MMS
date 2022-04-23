<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
    <button id="connect">Send</button>
    <button id="connect1">Send1</button>
    <button id="connect2">Send2</button>
<!--     <button id="connect3">Parse</button> -->
<input type="text" id="data">
<textarea id="messages" style="width: 100%; height: 200px;" ></textarea>
<script src="https://code.jquery.com/jquery-2.1.3.min.js"></script>
<script type="text/javascript">


var arr = [
		{
			id : "1",
			name : "2",
			email : "3",
			tel : "4"
		},
		{
			id : "11",
			name : "22",
			email : "33",
			tel : "44"
		},
		{
			id : "111",
			name : "222",
			email : "333",
			tel : "444"
		},
		{
			id : "1111",
			name : "2222",
			email : "3333",
			tel : "4444"
		}
];
var data = { id : "1",pw : "2", arrays : arr };
$("#connect").click(function(){
	$.ajax({
	  url: "/params",
	  method: "POST",
	  data: data,
	  dataType: "json",
	  success : function(data){
		  alert(data);
	  }
	  
	});
	
});
$("#connect1").click(function(){
	$.ajax({
	  url: "/params1",
	  method: "POST",
	  data: data,
	  dataType: "json",
	  success : function(data){
		  alert(data);
	  }
	  
	});
	
});
$("#connect2").click(function(){
	$.ajax({
	  url: "/params2",
	  method: "POST",
	  data: data,
	  dataType: "json",
	  success : function(data){
		  alert(data);
	  }
	  
	});
	
});
$("#connect3").click(function(){
	$.ajax({
	  url: "/parses",
	  method: "POST",
	  data: {cnt : "20000"},
	  dataType: "json",
	  success : function(data){
		  alert(data);
	  }
	  
	});
	
});
</script>
</body>
</html>