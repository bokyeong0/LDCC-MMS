<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
<body>
<div class="menu-cate" >
<ol class="breadcrumb pull-right"></ol>
<h1 class="page-header"></h1>
</div>
	<div class="search-form clearfix" >
           <form class="form-inline" >
			
			<div class="search-controls non-icon" >
				<div class="form-group m-r-10">
					<div class="input-group input-group-sm">
						<span class="span-info  input-group-addon">사용자아이디</span>
						<input type="text" class="form-control input-sm" id="userInfoUserId" >
					</div>
				</div>
				<div class="form-group m-r-10">
					<div class="input-group input-group-sm">
						<span class="span-info  input-group-addon">사용자명</span>
						<input type="text" class="form-control input-sm" id="userInfoUserName" >
					</div>
				</div>
				<div class="form-group m-r-10">
					<div class="input-group input-group-sm">
						<span class="span-info  input-group-addon">내선번호</span>
						<input type="text" class="form-control input-sm" id="userInfoCallExt" >
					</div>
				</div>
				<div class="form-group m-r-10">
					<div class="input-group input-group-sm">
						<span class="span-info  input-group-addon">재직상태</span>
						<select id="userInfoPositionCode" class="form-control">
							<option value="">전체</option>
							<option value="Y">재직</option>
							<option value="N">퇴사</option>
                    	</select>
                    </div>
				</div>
				<div class="form-group m-r-10">
					<div class="input-group input-group-sm">
						<span class="span-info  input-group-addon">권역</span>
						<select id="userInfoAreaSeq" class="form-control">
							<option value="">선택</option>
                    	</select>
                    </div>
				</div>
			</div>
			<!-- 중복되는 부분 -->
			<div class="search-button-group">
				<button id="userInfoSearchBtn" type="button"  class="btn btn-sm btn-primary m-r-5" >
					<i class="fa fa-search"></i> 검색
				</button>
				<button type="button" id="userInfoUpdateBtn" class="btn btn-sm btn-warning m-r-5" data-authRule="AUTH_MOD">
					<i class="fa fa-edit"></i> 수정
				</button>
				<button type="button" id="userInfoAddRowBtn" class="btn btn-sm btn-info" data-authRule="AUTH_NEW">
					<i class="fa fa-plus"></i> 사용자등록
				</button>
			</div>
			</form>
	</div>
	    
<div class="grid-wrapper" >
	<table id="userInfoGrid"  ></table>
	<div id="userInfoGridNavi"></div>
</div>
<script src="/js/views/settings/user/user_info.js"></script>
</body>
</html>