<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >

<html>
<head>

<style type="text/css">
.parsley-errors-list{
display: none;
}
.parsley-errors-list.filled{
display: block;
}
</style>
</head>
<body>
<div class="modal-header">
	<button type="button" class="close" data-close-btn="ture"  >×</button>
	<h4 class="modal-title">LDCC 사용자 정보 수정</h4>
</div>
<div class="modal-body">
	<div class="panel panel-inverse" data-sortable-id="form-stuff-1">
	    <div class="panel-body view-form">
	        <form class="form-horizontal form-bordered min" id="ldccUserInfoModify" name="userInfoModifyUser">
				<!-- 아이디 -->
	            <div class="form-group check-field">
	                <label class="col-md-2 control-label">아이디</label>
	                <div class="col-md-10"> 
	                    <input type="text" id="ldccUserInfoModifyUserId" class="form-control input-sm"/>
	                </div>
	            </div>
				<!-- 이름 -->	            
				<div class="form-group">
	                <label class="col-md-2 control-label">이름</label>
	                <div class="col-md-4">
	                    <input type="text" id="ldccUserInfoModifyUserNm" class="form-control input-sm" />
	                </div>
	                <!-- 권한 -->
	                <label class="col-md-2 control-label">권한</label>
	                <div class="col-md-4">
	                    <select id="ldccUserInfoModifyUserAuth" class="form-control input-sm" >
	                    </select>
	                </div>
	            </div>
				<div class="form-group">
				<!-- 직책 -->				
					<label class="col-md-2 control-label">직책</label>
					<div class="col-md-4">
						<input type="text" id="ldccUserInfoModifyUserPosition" class="form-control input-sm" placeholder="직책을 입력해 주세요"/>							
					</div>
				<!-- 담당부서 -->	
					<label class="col-md-2 control-label">담당부서</label>
	            	<div class="col-md-4">
						<input type="text" id="ldccUserInfoModifyUserDept" class="form-control input-sm" placeholder="담당부서를 입력해 주세요"/>		            	
	            	</div>
				</div>
				<div class="form-group">
				<!-- 휴대폰 -->				
					<label class="col-md-2 control-label">휴대폰</label>
					<div class="col-md-4">
						<input type="text" class="form-control input-sm" id="ldccUserInfoModifyUserPhone" placeholder="-제외한 휴드폰번호를 입력해 주세요." disabled />
					</div>
				<!-- 사무실전화번호 -->						
	                <label class="col-md-2 control-label">사무실전화번호</label>
	                <div class="col-md-4">
	                    <input type="text" id="ldccUserInfoModifyCallExt" class="form-control input-sm" />
	                </div>					
				</div>
				<!-- 이메일 -->				
	            <div class="form-group">
	                <label class="col-md-2 control-label">이메일</label>
	                <div class="col-md-4">
	                    <input type="text" id="ldccUserInfoModifyUserEmail" class="form-control input-sm" />
	                </div>
	                <label class="col-md-2 control-label">계정상태</label>
	                <div class="col-md-4">
	                	<select id="ldccUserInfoModifyUseYn" class="form-control input-sm">
	                		<option value="Y">정상</option>
	                		<option value="N">휴면</option>
	                	</select>
	                </div>	                
	            </div>
				
	        </form>
	    </div>
	</div>
</div>
<div class="modal-footer" id="modal-footer">
	<a href="javascript:;" id="ldccUserInfoModifyPwdInitBtn" class="btn btn-sm btn-warning">비밀번호초기화</a>
	<a href="javascript:;" id="ldccUserInfoModifyUpdateBtn" class="btn btn-sm btn-success"  data-authRule="AUTH_SAVE">저장</a>
	<a href="javascript:;" id="ldccUserInfoModifyDeleteBtn" class="btn btn-sm btn-danger" data-authRule="AUTH_DEL">삭제</a>
	<a href="javascript:;" id="ldccUserInfoModifyCloseBtn" class="btn btn-sm btn-white" data-close-btn="ture">닫기</a>
</div>

<script src="/js/views/settings/user/ldccUser_infoModifyPop.js"></script>
</body>
</html>