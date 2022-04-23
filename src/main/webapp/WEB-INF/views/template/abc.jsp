<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
	<head>
		<link href="/js/plugins/password-indicator/css/password-indicator.css" rel="stylesheet" />
		<link href="/js/plugins/parsley/src/parsley.css" rel="stylesheet" />
	</head>
<body>
<div class="modal-header">
	<button type="button" class="close" data-close-btn="ture"  >×</button>
	<h4 class="modal-title">회원가입</h4>
</div>
<div class="modal-body">
	<div class="panel panel-inverse" data-sortable-id="form-stuff-1">
	    <div class="panel-body">
	        <form class="form-horizontal" id="userInfoSave" name="userInfoSaveUser" data-parsley-validate="true">
	        	<div class="form-group">
	                <label class="col-md-3 control-label">회사명</label>
	                <div class="col-md-9"> 
	                	<select class="form-control" id="userInfoSaveCompanyCode">
	                	</select>
	                </div>
	            </div>
	            <div class="form-group">
	                <label class="col-md-3 control-label">사번</label>
	                <div class="col-md-9"> 
	                    <input type="text" id="userInfoSaveUserNo" class="form-control"  data-parsley-required="true"
	                    		data-parsley-type="digits"  data-parsley-minlength="9" data-parsley-maxlength="9"/>
	                </div>
	            </div>
	            <div class="form-group">
	                <label class="col-md-3 control-label">아이디</label>
	                <div class="col-md-9">
	                    <input type="text" id="userInfoSaveUserId" class="form-control" placeholder="띄어쓰기 없이 영/숫자 4~16자" data-parsley-required="true" 
	                    data-parsley-pattern="/^[a-zA-Z0-9]+$/"  data-parsley-range="[4, 16]"/>
	                </div>
	            </div>
				<div class="form-group">
					<label class="col-md-3 control-label">비밀번호</label>
					<div class="col-md-9">
						<input type="password" name="password" id="userInfoSaveUserPwd" class="form-control m-b-5" placeholder="8~16자의 특수문자/영문/숫자 조합" 
						data-parsley-required="true" required data-parsley-pattern="/^.*(?=.{8,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/"  data-parsley-range="[8, 16]"/>
						<div id="passwordStrengthDiv" class="is0 m-t-5"></div>
					</div>
				</div>
				<div class="form-group">
					<label class="col-md-3 control-label">비밀번호 확인</label>
					<div class="col-md-9">
						<input type="password" name="password-visible" id="userInfoSaveUserPwdVisible" class="form-control m-b-5" placeholder="위의 비밀번호를 다시 입력해주세요" 
						data-parsley-required="true" required data-parsley-pattern="/^.*(?=.{8,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/"  data-parsley-range="[8, 16]"/>
						<div id="passwordStrengthDiv2" class="is0 m-t-5"></div>
					</div>
				</div>
				<div class="form-group">
	                <label class="col-md-3 control-label">이름</label>
	                <div class="col-md-9">
	                    <input type="text" id="userInfoSaveUserNm" class="form-control" placeholder="이름" data-parsley-required="true" />
	                </div>
	            </div>
				<div class="form-group">
					<label class="col-md-3 control-label">직책</label>
					<div class="col-md-9">
						<select class="form-control" id="userInfoSaveUserPosition">
							<option value="PE" selected>수석연구원</option>
							<option value="SE">책임연구원</option>
							<option value="RE">선임연구원</option>
							<option value="AE">주임연구원</option>
							<option value="EE">연구원</option>
						</select>
					</div>
				</div>
				<div class="form-group">
					<label class="col-md-3 control-label">생년월일</label>
					<div class="col-md-9">
						<input type="text" class="form-control" id="userInfoSaveUserBirthDate" 
						data-parsley-required="true" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-md-3 control-label">연락처</label>
					<div class="col-md-9">
						<input type="text" class="form-control" id="userInfoSaveUserPhone" 
						data-parsley-required="true" />
					</div>
				</div>
				
	            <div class="form-group">
	                <label class="col-md-3 control-label">이메일</label>
	                <div class="col-md-9">
	                    <input type="text" id="userInfoSaveUserEmail" class="form-control" placeholder="이메일" 
	                    data-parsley-required="true" data-parsley-type="email" />
	                </div>
	            </div>
	        </form>
	    </div>
	</div>
</div>
<div class="modal-footer" id="modal-footer">
	<a href="javascript:;" id="userInfoSaveInsertBtn" class="btn btn-sm btn-danger">저장</a>
	<a href="javascript:;" id="userInfoSaveCloseBtn" class="btn btn-sm btn-white" data-close-btn="ture" >닫기</a>
</div>

<script src="/js/common/masked-input.js"></script>
<script src="/js/common/password-indicator.js"></script>
<script src="/js/common/form-plugins.demo.js"></script>
<script src="/js/views/settings/user/user_info_save.js"></script>
<script src="/js/plugins/parsley/dist/parsley.js"></script>
</body>
</html>
<!-- data-parsley-trigger="focusout" -->