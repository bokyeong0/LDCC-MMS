	<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
<body>
	<div class="">
		<ol class="breadcrumb pull-right"></ol>
		<h1 class="page-header"></h1>
	</div>
	<div class="search-form clearfix">
		
			<div class="search-controls non-icon col-md-12">
				<div class="form-group col-md-p20">
					<div class="input-group input-group-sm">
						<span class="span-info  input-group-addon">아이디</span>
						<input type="text" class="form-control input-sm" id="customerInfoUserId" >
					</div>
				</div>		
				<div class="form-group col-md-p20">
					<div class="input-group input-group-sm">
						<span class="span-info  input-group-addon">이름</span>
						<input type="text" class="form-control input-sm" id="customerInfoUserNm" >
					</div>
				</div>
				<div class="form-group col-md-p20">
					<div class="input-group input-group-sm">
						<span class="span-info  input-group-addon">고객사</span>
						<input type="text" class="form-control input-sm" id="customerInfoCompCd" >
					</div>
				</div>
				<div class="form-group col-md-p20">
					<div class="input-group input-group-sm">
						<span class="span-info  input-group-addon">브랜드명</span>
						<input type="text" class="form-control input-sm" id="customerInfoBrndCd" >
					</div>
				</div>
				<div class="form-group col-md-p20">
					<div class="input-group input-group-sm">
						<span class="span-info  input-group-addon">계정상태</span>
						<select id="customerInfoUseYn" class="form-control">
							<option value="" data-domain-id="ALL">전체</option>
							<option value="Y">정상</option>
							<option value="N">휴면</option>
                    	</select>
                    </div>
				</div>
				<div class="form-group col-md-p20">
					<div class="input-group input-group-sm">
						<span class="span-info  input-group-addon">사무실번호</span>
						<input type="text" class="form-control input-sm" id="customerInfoCallExt" >
					</div>
				</div>	
			</div>
				
			
			<!-- 중복되는 부분 -->
			<div class="search-button-group">
				<button id="customerCreateTempPwd" type="button"  class="btn btn-sm btn-inverse" data-authRule="AUTH_MOD">
					<i class="fa fa-unlock-alt"></i> 초기비번 발부
				</button>
				<button id="customerInfoSearchBtn" type="button" class="btn btn-sm btn-primary">
					<i class="fa fa-search" ></i> 검색
				</button>
				<button type="button" id="customerInfoUpdateBtn" class="btn btn-sm btn-warning" data-authRule="AUTH_MOD">
					<i class="fa fa-edit" ></i> 수정
				</button>
				<button type="button" id="customerInfoInsertBtn" class="btn btn-sm btn-success" data-authRule="AUTH_NEW">
					<i class="fa fa-plus" ></i> 등록
				</button>

			</div>

	</div>

	<div class="grid-wrapper">
		<table id="customerInfoGrid"></table>
		<div id="customerInfoGridNavi"></div>
	</div>

	<script src="/js/views/settings/user/customerUser_info.js"></script>
</body>
</html>