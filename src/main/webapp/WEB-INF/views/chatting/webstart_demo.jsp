<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>WebStart demo</title>
</head>
<body>
<script src="http://www.java.com/js/deployJava.js"></script>
    <script>
        // using JavaScript to get location of JNLP file relative to HTML page
        var dir = location.href.substring(0, location.href.lastIndexOf('/')+1);
        var url = dir + "resources/webstart_demo.jnlp";
        deployJava.createWebStartLaunchButton(url, '1.6.0');
    </script>

<center><br/><br/>
<a href="webstart_demo.jnlp">웹스타트로 프로그램 시작하기</a>
</center>
</body>
</html>