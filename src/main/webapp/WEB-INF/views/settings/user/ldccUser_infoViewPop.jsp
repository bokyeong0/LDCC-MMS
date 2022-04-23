<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
<body>
	<div class="modal-header">
		<button type="button" class="close" data-close-btn="ture">×</button>
		<h4 class="modal-title"></h4>
	</div>
	<div class="modal-body">
		<div class="panel panel-inverse" >
			<div class="panel-body view-form">
				<div class="form-horizontal form-bordered min" >
					<!-- 아이디 -->
					<div class="form-group">
						<label class="col-md-2 control-label">아이디</label>
						<div class="col-md-10">
							<p class="form-control-static" id="ldccUserInfoViewPopUserId"></p>
						</div>
					</div>
					<!-- 이름 -->
					<div class="form-group">
						<label class="col-md-2 control-label">이름</label>
						<div class="col-md-4">
							<p class="form-control-static" id="ldccUserInfoViewPopUserNm"></p>
						</div>
						<!-- 권한 -->
						<label class="col-md-2 control-label">권한</label>
						<div class="col-md-4">
							<p class="form-control-static" id="ldccUserInfoViewPopUserAuth"></p>
						</div>
					</div>
					
					<div class="form-group">
					<!-- 직책 -->
						<label class="col-md-2 control-label">직책</label>
						<div class="col-md-4">
							<p class="form-control-static" id="ldccUserInfoViewPopUserPosition"></p>
						</div>
					<!-- 담당부서 -->					
						<label class="col-md-2 control-label">담당부서</label>
						<div class="col-md-4">
							<p class="form-control-static" id="ldccUserInfoViewPopUserDept"></p>
						</div>						
					</div>
					<div class="form-group">
					<!-- 휴대폰 -->
						<label class="col-md-2 control-label">휴대폰</label>
						<div class="col-md-4">
							<p class="form-control-static" id="ldccUserInfoViewPopUserPhone"></p>
						</div>
					<!-- 사무실전화번호 -->	
						<label class="col-md-2 control-label">사무실전화번호</label>
						<div class="col-md-4">
							<p class="form-control-static" id="ldccUserInfoViewPopCallExt"></p>
						</div>					
					</div>
					
					<!-- 이메일 -->
					<div class="form-group">
						<label class="col-md-2 control-label">이메일</label>
						<div class="col-md-4">
							<p class="form-control-static" id="ldccUserInfoViewPopUserEmail"></p>
						</div>
						<label class="col-md-2 control-label">계정상태</label>
						<div class="col-md-4">
							<p class="form-control-static" id="ldccUserInfoViewPopUseYn"></p>
						</div>						
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="modal-footer" id="modal-footer">
		<a href="javascript:;" id="ldccUserInfoViewPopCloseBtn" class="btn btn-sm btn-white" data-close-btn="ture" >닫기</a>
	</div>

	<script src="/js/views/settings/user/ldccUser_infoViewPop.js"></script>
</body>
</html>
