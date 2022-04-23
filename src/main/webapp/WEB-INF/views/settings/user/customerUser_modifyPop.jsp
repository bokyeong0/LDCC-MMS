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
	<h4 class="modal-title">정보수정</h4>
</div>
<div class="modal-body">
	<div class="panel panel-inverse" data-sortable-id="form-stuff-1">
	    <div class="panel-body view-form">
	        <form class="form-horizontal form-bordered min" id="customerModifyPop" >
	        	<!-- 고객사 -->
   	        	<div class="form-group">
	                <label class="col-md-2 control-label">고객사</label>
	                <div class="col-md-4"> 
	                	<select class="form-control input-sm" id="customerModifyPopCompCd" >
	                	</select>
	                </div>
	            <!-- 브랜드 -->
	                <label class="col-md-2 control-label">브랜드명</label>
	                <div class="col-md-4"> 
						<select class="form-control input-sm" id="customerModifyPopBrndCd">
						</select>	                	
	                </div>
	            </div>
	            <!-- 아이디 -->
	            <div class="form-group check-field">
					<label class="col-md-2 control-label">아이디</label>
	                <div class="col-md-4"> 
	                    <input type="text" id="customerModifyPopUserId" class="form-control input-sm" placeholder="사용자 아이디를 입력해 주세요"/>
	                </div>

	            </div>

				<div class="form-group">
				<!-- 이름 -->
					<label class="col-md-2 control-label">이름</label>
	                <div class="col-md-4">
	                    <input type="text" id="customerModifyPopUserNm" class="form-control input-sm" placeholder="사용자 이름을 입력해 주세요"/>
	                </div>
	            <!-- 직책 -->
					<label class="col-md-2 control-label">직책</label>
					<div class="col-md-4">
						<input type="text" class="form-control input-sm" id="customerModifyPopUserPosition" placeholder="직책을 입력하세요"/>
					</div>

				</div>
				<div class="form-group">
				<!-- 휴대폰 -->
					<label class="col-md-2 control-label">휴대폰</label>
					<div class="col-md-4">
						<input type="text" class="form-control input-sm" id="customerModifyPopUserPhone" placeholder="-제외한 휴대폰번호를 입력해 주세요." disabled />
					</div>
				<!-- 사무실전화번호 -->
					<label class="col-md-2 control-label">사무실전화번호</label>
					<div class="col-md-4">
						<input type="text" class="form-control input-sm" id="customerModifyPopCallExt" placeholder="-제외한 사무실전화번호를 입력해 주세요." />
					</div>
				</div>
	            <div class="form-group">
					<label class="col-md-2 control-label">이메일</label>
	                <div class="col-md-4">
	                    <input type="text" id="customerModifyPopUserEmail" class="form-control input-sm" placeholder="이메일을 입력해주세요" />
	                </div>
					<label class="col-md-2 control-label">계정상태</label>
	                <div class="col-md-4">
	                    <select id="customerModifyPopUseYn" class="form-control input-sm" >
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
	<a href="javascript:;" id="customerModifyPopUserPwdInitBtn" class="btn btn-sm btn-warning">비밀번호초기화</a>
	<a href="javascript:;" id="customerModifyPopUpdateBtn" class="btn btn-sm btn-success" data-authRule="AUTH_SAVE" >저장</a>
	<a href="javascript:;" id="customerModifyPopDeleteBtn" class="btn btn-sm btn-danger" data-authRule="AUTH_DEL" >삭제</a>
	<a href="javascript:;" id="customerModifyPopCloseBtn" class="btn btn-sm btn-white" data-close-btn="ture" >닫기</a>
</div>

<script src="/js/views/settings/user/customerUser_modifyPop.js"></script>
</body>
</html>