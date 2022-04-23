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
	<div class="search-controls non-icon col-md-12" >
		<div class="form-group col-md-p20">
			<div class="input-group input-group-sm">
				<span class="span-info  input-group-addon">계약유형</span>
				<select class="form-control input-sm" id="contractMngDetItemType">
					<option value="">선택</option>
				</select>
			</div>
		</div>
		<div class="form-group col-md-p20">
			<div class="input-group input-group-sm">
				<span class="span-info  input-group-addon">계약번호</span>
				<input type="text" class="form-control input-sm" id="contractMngConId" >
			</div>
		</div>
		<div class="form-group col-md-p20">
			<div class="input-group input-group-sm">
				<span class="span-info  input-group-addon">계약명</span>
				<input type="text" class="form-control input-sm" id="contractMngConNm" >
			</div>
		</div>
	</div>
	
	<div class="search-controls non-icon col-md-12 m-t-0" >			
		<div class="form-group col-md-p20">
			<div class="input-group input-group-sm">
				<span class="span-info  input-group-addon">파트너사</span>
				<select class="form-control" id="contractMngAspCompCd">
				</select>
			</div>
		</div>
		<div class="form-group col-md-p20">
			<div class="input-group input-group-sm">
				<span class="span-info  input-group-addon">고객사</span>
				<select class="form-control" id="contractMngCompCd">
					<option value="">선택</option>
				</select>
			</div>
		</div>
	</div>

	<!-- 중복되는 부분 -->
	<div class="search-button-group">
		<button id="contractMngSearchBtn" type="button"  class="btn btn-sm btn-primary">
			<i class="fa fa-search"></i> 검색
		</button>
	</div>
</div>
<div class="grid-wrapper" >
	<table id="contractMngGrid"></table>
	<div id="contractMngGridNavi"></div>
</div>
<script src="/js/views/contract/contract_management.js"></script>
</body>
</html>