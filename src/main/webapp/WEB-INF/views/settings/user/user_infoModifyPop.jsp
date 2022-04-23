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
	<h4 class="modal-title">회원가입</h4>
</div>
<div class="modal-body">
	<div class="panel panel-inverse" data-sortable-id="form-stuff-1">
	    <div class="panel-body view-form">
	        <form class="form-horizontal form-bordered min" id="userInfoModify" name="userInfoModifyUser">

	            <div class="form-group check-field">
	                <label class="col-md-2 control-label">사번</label>
	                <div class="col-md-10"> 
	                    <input type="text" id="userInfoModifyUserNo" class="form-control input-sm"/>
	                </div>
	            </div>
	            <div class="form-group check-field">
	                <label class="col-md-2 control-label">아이디</label>
	                <div class="col-md-10"> 
	                    <input type="text" id="userInfoModifyUserId" class="form-control input-sm"/>
	                </div>
	            </div>
				<div class="form-group check-field">
					<label class="col-md-2 control-label">비밀번호</label>
					<div class="col-md-10">
						<div class="checkbox">
							<label><input type="checkbox" id="passwordChange" value="" />비밀번호 변경</label>
						</div>
						<input type="password" name="password" id="userInfoModifyUserPwd" class="form-control input-sm m-b-5" placeholder="" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-md-2 control-label">비밀번호 확인</label>
					<div class="col-md-10">
						<input type="password" name="password-visible" id="userInfoModifyUserPwdVisible" class="form-control input-sm m-b-5" placeholder="" />
					</div>
				</div>
				<div class="form-group">
	                <label class="col-md-2 control-label">이름</label>
	                <div class="col-md-10">
	                    <input type="text" id="userInfoModifyUserNm" class="form-control input-sm" />
	                </div>
	            </div>
				<div class="form-group">
					<label class="col-md-2 control-label">직책</label>
					<div class="col-md-10">
						<select class="form-control input-sm" id="userInfoModifyUserPosition">
						</select>
					</div>
				</div>
				<div class="form-group">
	            	<label class="col-md-2 control-label">입사일자</label>
	            	<div class="col-md-4">
	            		<input type="text" class="form-control input-sm" id="userInfoModifyUserJoinDate" />
	            	</div>
	            	
	            	<label class="col-md-2 control-label">권역</label>
	            	<div class="col-md-4">
	            		<select class="form-control input-sm" id="userInfoModifyUserAreaNm">
	            		</select>
	            	</div>
	            </div>
	            <div class="form-group">
	            	<label class="col-md-2 control-label">근무여부</label>
	            	<div class="col-md-10">
	            		<label class="radio-inline">
	                        <input type="radio" name="userInfoModifyUseYn" value="Y" /> 재직
	                    </label>
	                    <label class="radio-inline">
	                        <input type="radio" name="userInfoModifyUseYn" value="N" /> 퇴사
	                    </label>
                    </div>
                </div>
				<div class="form-group">
					<label class="col-md-2 control-label">생년월일</label>
					<div class="col-md-10">
						<input type="text" class="form-control input-sm" id="userInfoModifyUserBirthDate" placeholder="-제외한 생년월일 8자리를 입력해 주세요." />
					</div>
				</div>
				<div class="form-group">
					<label class="col-md-2 control-label">연락처</label>
					<div class="col-md-10">
						<input type="text" class="form-control input-sm" id="userInfoModifyUserPhone" placeholder="-제외한 핸드폰번호를 입력해 주세요."/>
					</div>
				</div>
				
	            <div class="form-group">
	                <label class="col-md-2 control-label">이메일</label>
	                <div class="col-md-10">
	                    <input type="text" id="userInfoModifyUserEmail" class="form-control input-sm" />
	                </div>
	            </div>
				
	            <div class="form-group">
	                <label class="col-md-2 control-label">내선번호</label>
	                <div class="col-md-10">
	                    <input type="text" id="userInfoModifyCallExt" class="form-control input-sm" />
	                </div>
	            </div>
	        </form>
	    </div>
	</div>
</div>
<div class="modal-footer" id="modal-footer">
	<a href="javascript:;" id="userInfoModifyUpdateBtn" class="btn btn-sm btn-success"  data-authRule="AUTH_SAVE">저장</a>
	<a href="javascript:;" id="userInfoModifyDeleteBtn" class="btn btn-sm btn-danger" data-authRule="AUTH_DEL">삭제</a>
	<a href="javascript:;" id="userInfoModifyCloseBtn" class="btn btn-sm btn-white" data-close-btn="ture" >닫기</a>
</div>

<script src="/js/views/settings/user/user_infoModifyPop.js"></script>
</body>
</html>