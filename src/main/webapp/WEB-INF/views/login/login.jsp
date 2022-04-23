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
<body class="pace-top" id="mainMasterBody">
<!-- 	<input type="hidden" name="encPw" value=""> -->
	<!-- begin #page-loader -->
	<div id="page-loader" class="fade in"><span class="spinner"></span></div>
	<!-- end #page-loader -->
	
	<div class="login-cover">
<!-- 	    <div class="login-cover-image"><img src="/img/login-bg/bg02.jpg" data-id="login-cover-image" alt="" /></div> -->
	    <div class="login-cover-image"><!-- <img src="../img/logo_lotte.png" data-id="login-cover-image" alt="" /> --></div>
	    <div class="login-cover-bg"></div>
	</div>
	<!-- begin #page-container -->
	<div id="page-container" class="fade">
	    <!-- begin login -->
        <div class="login login-v2" data-pageload-addclass="animated fadeIn">
            <!-- begin brand -->
            <div class="login-header">
                <div class="brand">
               		<img src="../img/lotte.png">
                    <!-- <span class="logo"><img src="../img/logo_lotte.png"></span> -->
                </div>
<!--                 <div class="icon">
                    <i class="fa fa-sign-in"></i>
                </div> -->
            </div>
            <!-- end brand -->
            <div class="login-content">
            		<div class="col-xs-7 login-panel" ></div>
            		
					<div class="form-group m-b-30 text-center">
						<span class='login-content-span'>POS 유지보수 시스템</span>
                    </div>   
                    <div class="form-group m-b-15">
                        <input id="loginUserId" type="text" class="form-control input-lg" placeholder="아이디" autocomplete="off"/>
                    </div>
                    <div class="form-group m-b-15">
                        <input id="loginUserPwd" type="password" class="form-control input-lg" placeholder="비밀번호" autocomplete="off"/>
                    </div>
                    <div class="form-group m-b-15" style="width:100%">
                    	<img id="captchaImg" name="captchaImg" style="display:inline; width:72%;" alt="Captcha Image" height="45" />
                    	<button id="refreshBtn" type="button" class="btn btn-block btn-lg btn-login btn-captchaBtn">새로고침</button>
                    </div>
                    <div class="form-group m-b-15">
                        <input id="captcha" type="text" class="form-control input-lg" placeholder="보안문자를 입력하세요" autocomplete="off"/>
                    </div>
                    <div class="form-group m-b-15" style="display:none" data-birth-yn="N" >
                        <input id="loginUserBirthDate" type="text" class="form-control input-lg" placeholder="생년월일" />
                    </div>
                    <div class="checkbox m-b-15 " id="keepIdCheckBox">
                        <input type="checkbox" id="keepId" /> 
                        <label for='keepId'>아이디 기억하기</label>
                    </div>
                    <div class="login-buttons">
                        <button id="loginBtn" type="button" class="btn btn-block btn-lg btn-login">로그인</button>
                    </div>
<!--                     <div class="m-t-20"> -->
<!--                         <a href="#" id="findId" class="findId">아이디</a>/<a href="#" id="findPwd" class="findPwd" >비밀번호 찾기</a> -->
<!--                     </div> -->
                    <!-- <div>
                    	<a class="mobile-mod"  href="itms-services://?action=download-manifest&url=https://dl.dropboxusercontent.com/s/jjy480o4uxc6jlb/mms.plist" target="blank">ios 앱 다운로드</a>
                    </div> -->
<!--                 </form> -->
            </div>
        </div>
        <!-- end login -->
	</div>
	
	<div id="ajax-loader" class="hide">
		<div  class="fade in"><span class="spinner"></span></div>
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
