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
	<button type="button" class="close" data-close-btn="ture">×</button>
	<h4 class="modal-title">정보수정</h4>
</div>
<div class="modal-body">
	<div class="panel panel-inverse" data-sortable-id="form-stuff-1">
	    <div class="panel-body view-form">
	        <form class="form-horizontal form-bordered min" id="partnerModifyPop" >
	        		<!-- 아이디 --> 
					<div class="form-group">
						<label class="col-md-2 control-label">아이디</label>
						<div class="col-md-4">
							<input type="text" id="partnerModifyPopUserId" class="form-control input-sm" placeholder="사용자 아이디를 입력해 주세요"/>
						</div>
		                <!-- 권한 -->
		                <label class="col-md-2 control-label">권한</label>
		                <div class="col-md-4">
		                    <select id="partnerModifyPopUserAuth" class="form-control input-sm" >
		                    </select>
		                </div>
					</div>
					<div class="form-group">
					<!-- 이름 -->
						<label class="col-md-2 control-label">이름</label>
						<div class="col-md-4">
							<input type="text" id="partnerModifyPopUserNm" class="form-control input-sm" placeholder="사용자 이름을 입력해 주세요"/>
						</div>
					<!-- 직책 -->
						<label class="col-md-2 control-label">직책</label>
						<div class="col-md-4">
							<input type="text" id="partnerModifyPopUserPosition" class="form-control input-sm" placeholder="직책을 입력해 주세요"/>					
						</div>
					</div>
					<div class="form-group">
					<!-- 파트너사 -->
						<label class="col-md-2 control-label">파트너사</label>
						<div class="col-md-4">
							<select id="partnerModifyPopUserAspCompCd" class="form-control input-sm"  >
							</select>							
						</div>
					<!-- 담당부서 -->
						<label class="col-md-2 control-label">담당부서</label>
						<div class="col-md-4">
							<select id="partnerModifyPopUserAreaCd" class="form-control input-sm"  >
							</select>							
						</div>
					</div>					
					<div class="form-group">
					<!-- 휴대폰 -->
						<label class="col-md-2 control-label">휴대폰</label>
						<div class="col-md-4">
							<input type="text" id="partnerModifyPopUserPhone" class="form-control input-sm" placeholder="-제외한 핸드폰번호를 입력해 주세요." disabled />
						</div>
					<!-- 사무실전화번호 -->
						<label class="col-md-2 control-label">사무실전화번호</label>
						<div class="col-md-4">
							<input type="text"id="partnerModifyPopCallExt"  class="form-control input-sm" placeholder="-제외한 사무실전화번호를 입력해 주세요."/>
						</div>
					</div>
					<div class="form-group">
					<!-- 이메일 -->
						<label class="col-md-2 control-label">이메일</label>
						<div class="col-md-4">
							<input type="text" id="partnerModifyPopUserEmail" class="form-control input-sm" placeholder="이메일을 입력해주세요" />
						</div>
					<label class="col-md-2 control-label">계정상태</label>
	                <div class="col-md-4">
	                    <select id="partnerModifyPopUseYn" class="form-control input-sm" >
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
	<a href="javascript:;" id="partnerModifyPopUserPwdInitBtn" class="btn btn-sm btn-warning" >비밀번호초기화</a>
	<a href="javascript:;" id="partnerModifyPopUpdateBtn" class="btn btn-sm btn-success" data-authRule="AUTH_SAVE" >저장</a>
	<a href="javascript:;" id="partnerModifyPopDeleteBtn" class="btn btn-sm btn-danger" data-authRule="AUTH_DEL" >삭제</a>
	<a href="javascript:;" id="partnerModifyPopCloseBtn" class="btn btn-sm btn-white" data-close-btn="ture" >닫기</a>
</div>

<script src="/js/views/settings/user/partnerUser_modifyPop.js"></script>
</body>
</html>