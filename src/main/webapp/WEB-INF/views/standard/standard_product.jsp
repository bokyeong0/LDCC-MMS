<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
<body>
	<div class="menu-cate">
		<ol class="breadcrumb pull-right"></ol>
		<h1 class="page-header"></h1>
	</div>
	<div class="search-form clearfix def-width">
		<form class="form-inline">
			<div class="search-controls non-icon">
				<div class="form-group m-r-10">
					<div class="input-group input-group-sm">
						<span class="span-info  input-group-addon">품번</span>
						<input type="text" class="form-control input-sm" id="standardProductCd" >
					</div>
				</div>
				<div class="form-group m-r-10">
					<div class="input-group input-group-sm">
						<span class="span-info  input-group-addon">품명</span>
						<input type="text" class="form-control input-sm" id="standardProductNm">
					</div>
				</div>
				<div class="form-group m-r-10">
					<div class="input-group input-group-sm">
						<span class="span-info  input-group-addon">규격</span>
						<input type="text" class="form-control input-sm" id="standardProductSpec" >
					</div>
				</div>
			</div>
			
			<div class="search-controls non-icon">
				<div class="form-group m-r-10">
					<div class="input-group input-group-sm">
						<span class="span-info  input-group-addon">품목군</span>
						<select class="form-control input-sm search-width" id="standardProductPrdTypeLv1">
						</select>
					</div>
				</div>
				<div class="form-group m-r-10">
					<div class="input-group input-group-sm">
						<span class="span-info  input-group-addon">대분류</span>
						<select class="form-control input-sm search-width" id="standardProductPrdTypeLv2" style="width:162px;">
						</select>
					</div>
				</div>
				<div class="form-group m-r-10">
					<div class="input-group input-group-sm">
						<span class="span-info  input-group-addon">중분류</span>
						<select class="form-control input-sm search-width" id="standardProductPrdTypeLv3">
						</select>
					</div>
				</div>
				<div class="form-group m-r-10">
					<div class="input-group input-group-sm">
						<span class="span-info  input-group-addon">소분류</span>
						<select class="form-control input-sm search-width" id="standardProductPrdTypeLv4">
						</select>
					</div>
				</div>
			</div>
			<!-- 중복되는 부분 -->
			<div class="search-button-group">
				<button id="standardProductSearchBtn" type="button" class="btn btn-sm btn-primary m-r-5">
					<i class="fa fa-search"></i> 검색
				</button>
				<button type="button" id="standardProductModifyBtn" class="btn btn-sm btn-warning m-r-5" data-authRule="AUTH_MOD">
					<i class="fa fa-edit"></i> <i data-domain-id="PRD_MOD_BTN"></i>
				</button>
				<button type="button" id="standardProductInsertBtn" class="btn btn-sm btn-success " data-authRule="AUTH_NEW">
					<i class="fa fa-plus"></i> <i data-domain-id="PRD_NEW_BTN"></i>
				</button>
			</div>
		</form>
	</div>
	<div class="grid-wrapper">
		<table id="standardProductGrid"></table>
		<div id="standardProductGridNavi"></div>
	</div>

	<script src="/js/views/standard/standard_product.js"></script>
</body>
</html>