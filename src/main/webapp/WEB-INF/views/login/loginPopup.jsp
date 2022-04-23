<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page session="false" %>
<%@ include file="../inc/common.jsp"%>
<!DOCTYPE html>
<html lang="en">
<div class="modal-header">
	<button type="button" class="close" data-close-btn="ture"  >×</button>
	<h4 class="modal-title"></h4>
</div>
<div class="modal-body">
	<div class="panel panel-inverse" data-sortable-id="form-stuff-1">
	    <div class="panel-body">
	        <form class="form-horizontal">
	        	<div class="form-group">
	                <div class="col-md-12"> 
	                    <input type="text" id="loginUserId" class="form-control" placeholder="아이디"/>
	                </div>
	            </div>
	            <div class="form-group">
	                <div class="col-md-12"> 
	                    <input type="password" id="loginUserPwd" class="form-control" placeholder="비밀번호"/>
	                </div>
	            </div>
	        </form>
	    </div>
	</div>
</div>
<div class="modal-footer" id="modal-footer">
	<a href="javascript:;" id="popupLoginBtn" class="btn btn-sm btn-danger">로그인</a>
	<a href="javascript:;" class="btn btn-sm btn-white" data-close-btn="ture" >닫기</a>
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
