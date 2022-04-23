<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
<body>
	<div class="modal-header">
		<button type="button" class="close" data-close-btn="ture">×</button>
		<h4 class="modal-title">Site 상세보기</h4>
	</div>
	<div class="modal-body">
		<div class="panel panel-inverse" >
			<div class="panel-body view-form">
				<div class="form-horizontal form-bordered min" >
					<div class="form-group">
						<label class="col-md-2 control-label">회사명</label>
						<div class="col-md-10">
							<p class="form-control-static" id="userInfoViewPopCompNm"></p>
						</div>
					</div>
						
					<div class="form-group">
						<label class="col-md-2 control-label">사번</label>
						<div class="col-md-10">
							<p class="form-control-static" id="userInfoViewPopUserNo"></p>
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-2 control-label">아이디</label>
						<div class="col-md-10">
							<p class="form-control-static" id="userInfoViewPopUserId"></p>
						</div>
					</div>
						
					<div class="form-group">
						<label class="col-md-2 control-label">이름</label>
						<div class="col-md-10">
							<p class="form-control-static" id="userInfoViewPopUserNm"></p>
						</div>
					</div>
					
					<div class="form-group">
						<label class="col-md-2 control-label">직책</label>
						<div class="col-md-10">
							<p class="form-control-static" id="userInfoViewPopUserPosition"></p>
						</div>
					</div>
						
					<div class="form-group">
						<label class="col-md-2 control-label">입사일자</label>
						<div class="col-md-10">
							<p class="form-control-static" id="userInfoViewPopUserJoinDate"></p>
						</div>
					</div>
					
					<div class="form-group">
						<label class="col-md-2 control-label">권역</label>
						<div class="col-md-10">
							<p class="form-control-static" id="userInfoViewPopAreaNm"></p>
						</div>
					</div>
						
					<div class="form-group">
						<label class="col-md-2 control-label">근무여부</label>
						<div class="col-md-10">
							<p class="form-control-static" id="userInfoViewPopUseYn"></p>
						</div>
					</div>
					
					<div class="form-group">
						<label class="col-md-2 control-label">생년월일</label>
						<div class="col-md-10">
							<p class="form-control-static" id="userInfoViewPopUserBirthDay"></p>
						</div>
					</div>
					
					<div class="form-group">
						<label class="col-md-2 control-label">연락처</label>
						<div class="col-md-10">
							<p class="form-control-static" id="userInfoViewPopUserPhone"></p>
						</div>
					</div>
					
					<div class="form-group">
						<label class="col-md-2 control-label">이메일</label>
						<div class="col-md-10">
							<p class="form-control-static" id="userInfoViewPopUserEmail"></p>
						</div>
					</div>
					
					<div class="form-group">
						<label class="col-md-2 control-label">내선번호</label>
						<div class="col-md-10">
							<p class="form-control-static" id="userInfoViewPopCallExt"></p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="modal-footer" id="modal-footer">
		<a href="javascript:;" id="userInfoViewPopCloseBtn" class="btn btn-sm btn-white" data-close-btn="ture">닫기</a>
	</div>

	<script src="/js/views/settings/user/user_infoViewPop.js"></script>
</body>
</html>
