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
				<div class="input-group input-group-sm" >
					<span class="span-info  input-group-addon">연도검색</span>
					<input type="text" class="form-control input-sm" id="statusProductYearSearch" name="start" placeholder="선택" />
				</div>
			</div>
			<div class="form-group col-md-p20">
				<div class="input-group input-group-sm">
					<span class="span-info  input-group-addon">제품범주</span>
					<select class="form-control" id="statusProductTypeLv1">
						<option value="">선택</option>
					</select>
				</div>
			</div>
			<div class="form-group col-md-p20">
				<div class="input-group input-group-sm">
					<span class="span-info  input-group-addon">제품군</span>
					<select class="form-control" id="statusProductTypeLv2">
						<option value="">선택</option>
					</select>
				</div>
			</div>
			<div class="form-group col-md-p20">
				<div class="input-group input-group-sm">
					<span class="span-info  input-group-addon">제조사</span>
					<select class="form-control" id="statusProductTypeLv3">
						<option value="">선택</option>
					</select>
				</div>
			</div>
			<div class="form-group col-md-p20">
				<div class="input-group input-group-sm">
					<span class="span-info  input-group-addon">모델명</span>
					<input type="text" class="form-control input-sm" id="statusProductPrdNm" value="" autocomplete="off" >
				</div>
			</div>
		</div>
		<div class="search-controls non-icon col-md-12 m-t-0" >				
			<div class="form-group col-md-p20">
				<div class="input-group input-group-sm">
					<span class="span-info  input-group-addon">파트너사</span>
					<select class="form-control" id="statusProductAspCompCd">
					</select>
				</div>
			</div>
			<div class="form-group col-md-p20">
				<div class="input-group input-group-sm">
					<span class="span-info  input-group-addon">고객사</span>
					<select class="form-control" id="statusProductCompCd">
						<option value="">선택</option>
					</select>
				</div>
			</div>
			<div class="form-group col-md-p20">
				<div class="input-group input-group-sm">
					<span class="span-info  input-group-addon">브랜드</span>
					<select class="form-control" id="statusProductBrndCd">
						<option value="">선택</option>
					</select>
				</div>
			</div>
		</div>
		<div class="search-button-group">
			<button id="statusProductSearchBtn" type="button" class="btn btn-sm btn-primary">
			<i class="fa fa-search"></i> 검색
			</button>
		</div>
	</div>
	    
	<div class="grid-wrapper" >
		<table id="statusProductGrid"  ></table>
		<div id="statusProductGridNavi"></div>
	</div>
	<script src="/js/views/status/status_product.js"></script>
</body>
</html>