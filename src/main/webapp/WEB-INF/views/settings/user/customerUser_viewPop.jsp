<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
<body>
	<div class="modal-header">
		<button type="button" class="close" data-close-btn="ture">×</button>
		<h4 class="modal-title">고객 상세보기</h4>
	</div>
	<div class="modal-body">
		<div class="panel panel-inverse" >
			<div class="panel-body view-form">
				<div class="form-horizontal form-bordered min" >
				
					<!-- 고객사 -->
					<div class="form-group">
						<label class="col-md-2 control-label">고객사</label>
						<div class="col-md-4">
							<p class="form-control-static" id="customerInfoViewPopCompNm"></p>
						</div>
					<!-- 브랜드명 -->
						<label class="col-md-2 control-label">브랜드명</label>
						<div class="col-md-4">
							<p class="form-control-static" id="customerInfoViewPopBrandNm"></p>
						</div>
					</div>
					<!-- 아이디 -->
					<div class="form-group">
						<label class="col-md-2 control-label">아이디</label>
						<div class="col-md-4">
							<p class="form-control-static" id="customerInfoViewPopUserId"></p>
						</div>
					</div>
					<!-- 이름 -->
					<div class="form-group">
						<label class="col-md-2 control-label">이름</label>
						<div class="col-md-4">
							<p class="form-control-static" id="customerInfoViewPopUserNm"></p>
						</div>
					<!-- 직책 -->
						<label class="col-md-2 control-label">직책</label>
						<div class="col-md-4">
							<p class="form-control-static" id="customerInfoViewPopUserPosition"></p>
						</div>
					</div>
					<!-- 휴대폰 -->
					<div class="form-group">
						<label class="col-md-2 control-label">휴대폰</label>
						<div class="col-md-4">
							<p class="form-control-static" id="customerInfoViewPopUserPhone"></p>
						</div>
					<!-- 사무실전화번호 -->
						<label class="col-md-2 control-label">사무실전화번호</label>
						<div class="col-md-4">
							<p class="form-control-static" id="customerInfoViewPopCallExt"></p>
						</div>
					</div>
					<!-- 이메일 -->
					<div class="form-group">
						<label class="col-md-2 control-label">이메일</label>
						<div class="col-md-4">
							<p class="form-control-static" id="customerInfoViewPopUserEmail"></p>
						</div>
						<label class="col-md-2 control-label">계정상태</label>
		                <div class="col-md-4">
		                    <p class="form-control-static" id="customerInfoViewPopUseYn"></p>
		                </div>	 						
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="modal-footer" id="modal-footer">
		<a href="javascript:;" id="customerInfoViewPopCloseBtn" class="btn btn-sm btn-white" data-close-btn="ture" >닫기</a>
	</div>

	<script src="/js/views/settings/user/customerUser_viewPop.js"></script>
</body>
</html>
