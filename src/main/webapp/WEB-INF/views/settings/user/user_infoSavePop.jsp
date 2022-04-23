<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
<body>
	<div class="modal-header">
		<button type="button" class="close" data-close-btn="ture">×</button>
		<h4 class="modal-title">회원가입</h4>
	</div>
	<div class="modal-body">
		<div class="panel panel-inverse" data-sortable-id="form-stuff-1">
			<div class="panel-body view-form">
				<form class="form-horizontal form-bordered min" id="userSavePop"> 
<!-- 					<div class="form-group"> -->
<!-- 						<label class="col-md-2 control-label">회사명</label> -->
<!-- 						<div class="col-md-10"> -->
<!-- 							<select class="form-control input-sm" id="userInfoSaveAspCompCd"> -->
<!-- 							</select> -->
<!-- 						</div> -->
<!-- 					</div> -->
					<div class="form-group">
						<label class="col-md-2 control-label">사번</label>
						<div class="col-md-10">
							<input type="text" id="userInfoSaveUserNo" class="form-control input-sm" />
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-2 control-label">아이디</label>
						<div class="col-md-10">
							<input type="text" id="userInfoSaveUserId" class="form-control input-sm" />
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-2 control-label">비밀번호</label>
						<div class="col-md-10">
							<input type="password" name="password" id="userInfoSaveUserPwd" class="form-control m-b-5" placeholder="8~16자의 특수문자/영문/숫자 조합"  />
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-2 control-label">비밀번호 확인</label>
						<div class="col-md-10">
							<input type="password" name="password-visible" id="userInfoSaveUserPwdVisible" class="form-control m-b-5" />
							<div id="passwordStrengthDiv2"></div>
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-2 control-label">이름</label>
						<div class="col-md-10">
							<input type="text" id="userInfoSaveUserNm" class="form-control input-sm"/>
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-2 control-label">직책</label>
						<div class="col-md-10">
							<select class="form-control input-sm" id="userInfoSaveUserPosition">
							</select>
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-2 control-label">입사일자</label>
						<div class="col-md-4">
							<input type="text" class="form-control input-sm" id="userInfoSaveUserJoinDate" />
						</div>
						<label class="col-md-2 control-label">권역</label>
						<div class="col-md-4">
							<select class="form-control input-sm" id="userInfoSaveUserAreaNm">
							</select>
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-2 control-label">생년월일</label>
						<div class="col-md-10">
							<input type="text" class="form-control input-sm" id="userInfoSaveUserBirthDate"  placeholder="-제외한 생년월일 8자리를 입력해 주세요."/> 
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-2 control-label">연락처</label>
						<div class="col-md-10">
							<input type="text" class="form-control input-sm" id="userInfoSaveUserPhone" placeholder="-제외한 핸드폰번호를 입력해 주세요."/>
						</div>
					</div>

					<div class="form-group">
						<label class="col-md-2 control-label">이메일</label>
						<div class="col-md-10">
							<input type="text" id="userInfoSaveUserEmail" class="form-control input-sm" placeholder="이메일" />
						</div>
					</div>
					
					<div class="form-group">
						<label class="col-md-2 control-label">내선번호</label>
						<div class="col-md-10">
							<input type="text" id="userInfoSaveCallExt" class="form-control input-sm" placeholder="내선번호" />
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
	<div class="modal-footer" id="modal-footer">
		<a href="javascript:;" id="userInfoSaveInsertBtn" class="btn btn-sm btn-danger" data-authRule="AUTH_SAVE">저장</a> 
		<a href="javascript:;" id="userInfoSaveCloseBtn" class="btn btn-sm btn-white" data-close-btn="ture">닫기</a>
	</div>

	<script src="/js/views/settings/user/user_infoSavePop.js"></script>
</body>
</html>