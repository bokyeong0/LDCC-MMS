<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page session="false" %>
<%@ include file="../inc/common.jsp"%>
<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en">
<!--<![endif]-->
<head>
	<jsp:include page="../inc/head.jsp"/>
	<script src="/js/paragon/paragon-app.js"></script>
	<script src="/js/paragon/paragon-popup.js"></script>
</head>
<body class="pace-top">
<!-- 	<input type="hidden" name="encPw" value=""> -->
	<!-- begin #page-loader -->
	<div id="page-loader" class="fade in"><span class="spinner"></span></div>
	<!-- end #page-loader -->
	
	<div class="login-cover">
<!-- 	    <div class="login-cover-image"><img src="/img/login-bg/bg02.jpg" data-id="login-cover-image" alt="" /></div> -->
	    <div class="login-cover-image"><img src="/img/main/callcenter/01.jpg" data-id="login-cover-image" alt="" /></div>
	    <div class="login-cover-bg"></div>
	</div>
	<!-- begin #page-container -->
	<div id="page-container" class="fade">
	    <!-- begin login -->
        <div class="login login-v2" data-pageload-addclass="animated fadeIn">
            <!-- begin brand -->
            <div class="login-header">
                <div class="brand">
                    <span class="logo"></span>VERTEXID
                    <small class="m-l-10" >Maintenance Management System</small>
                </div>
                <div class="icon">
                    <i class="fa fa-sign-in"></i>
                </div>
            </div>
            <!-- end brand -->
            <div class="login-content">
                    <div class="form-group m-b-20">
                        <input id="loginUserId" type="text" class="form-control input-lg" placeholder="아이디" autocomplete="off"/>
                    </div>
                    <div class="form-group m-b-20">
                        <input id="loginUserPwd" type="password" class="form-control input-lg" placeholder="비밀번호" autocomplete="off"/>
                    </div>
                    <div class="form-group m-b-20" style="display:none" data-birth-yn="N" >
                        <input id="loginUserBirthDate" type="text" class="form-control input-lg" placeholder="생년월일" />
                    </div>
                    <div class="checkbox m-b-20">
                        <label>
                            <input type="checkbox" id="keepId" /> 아이디 기억하기
                        </label>
                    </div>
                    <div class="login-buttons">
                        <button id="loginBtn" type="button" class="btn btn-success btn-block btn-lg">로그인</button>
                    </div>
                    <div class="m-t-20">
                        <a href="#" id="findId" class="findId">아이디</a>/<a href="#" id="findPwd" class="findPwd" >비밀번호 찾기</a>
                    </div>
                    <div>
                    	<a class="mobile-mod"  href="itms-services://?action=download-manifest&url=https://dl.dropboxusercontent.com/s/b4rf9vfpwulgdh1/mms.plist" target="blank">ios 앱 다운로드</a>
                    </div>
<!--                 </form> -->
            </div>
        </div>
        <!-- end login -->
	</div>
	
	<!-- end page container -->
	<script src="/js/encryption/cipher/base64.js"></script>
	<script src="/js/encryption/cipher/jsbn.js"></script>
	<script src="/js/encryption/cipher/rsa.js"></script>
	<script src="/js/encryption/cipher/tea-block.js"></script>
	<script src="/js/encryption/cipher/utf8.js"></script>
	<script src="/js/views/login/login.js"></script>
</body>
</html>
