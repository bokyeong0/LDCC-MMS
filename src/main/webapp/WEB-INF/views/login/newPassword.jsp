<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page session="false" %>
<%@ include file="../inc/common.jsp"%>
<!DOCTYPE html>
<html lang="en">
<body>
	<div class="modal-header">
		<h4 class="modal-title"></h4>
	</div>
	<div class="modal-body">
		<div class="panel panel-inverse" data-sortable-id="form-stuff-1">
		    <div class="panel-body">
		        <form class="form-horizontal" id="loginNewPasswordForm">
		            <div class="form-group">
		                <div class="col-md-12"> 
		                    <input type="password" name="password-visible" id="loginNewPassword" class="form-control" placeholder="새로운 비밀번호"/>
		                </div>
		            </div>
		            <div class="form-group">
		                <div class="col-md-12"> 
		                    <input type="password" name="password-visible" id="loginConfirmPassword" class="form-control" placeholder="비밀번호 확인"/>
		                </div>
		            </div>
		        </form>
		    </div>
		</div>
	</div>
	<div class="modal-footer" id="modal-footer">
		<a href="javascript:;" id="loginSaveNewPasswordBtn" class="btn btn-sm btn-danger">변경</a>
	</div>
	
		
	<!-- end page container -->
	<script src="/js/encryption/cipher/base64.js"></script>
	<script src="/js/encryption/cipher/jsbn.js"></script>
	<script src="/js/encryption/cipher/rsa.js"></script>
	<script src="/js/encryption/cipher/tea-block.js"></script>
	<script src="/js/encryption/cipher/utf8.js"></script>
	<script src="/js/views/login/newPassword.js"></script>
</body>
</html>
