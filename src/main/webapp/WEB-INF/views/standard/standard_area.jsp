<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
<body>
	<div class="menu-cate">
		<ol class="breadcrumb pull-right"></ol>
		<h1 class="page-header"></h1>
	</div>

	<div class="search-form clearfix">
		<div class="search-controls non-icon col-md-12" style="margin-bottom:-10px;">
			<div class="form-group col-md-p20">
				<div class="input-group input-group-sm">
					<span class="span-info  input-group-addon">파트너사</span>
					<select class="form-control input-sm" id="standardAreaAspCompCd">
						<option value="">선택</option>
					</select>
				</div>
			</div>
		</div>
		<!-- 중복되는 부분 -->
<!-- 		<div class="search-button-group"> -->
<!-- 			<button id="standardAreaAspCompSearchBtn" type="button" class="btn btn-sm btn-primary"> -->
<!-- 				<i class="fa fa-search"></i> 검색 -->
<!-- 			</button> -->
<!-- 		</div> -->
	</div>
	<div class="grid-wrapper">
		<table id="standardAreaAspCompGrid"></table>
		<div id="standardAreaAspCompGridNavi"></div>
	</div>
	
	<div class="search-form clearfix">
		<div class="search-controls non-icon col-md-12">
			<div class="form-group col-md-p20">
				<div class="input-group input-group-sm">
					<span class="span-info  input-group-addon">부서명</span>
					<input type="text" class="form-control input-sm" id="standardAreaName" >
				</div>
			</div>
		</div>
		<!-- 중복되는 부분 -->
		<div class="search-button-group">
			<button id="standardAreaAspAreaSearchBtn" type="button" class="btn btn-sm btn-primary">
				<i class="fa fa-search"></i> 검색
			</button>
			<button type="button" id="standardAreaAddRowBtn" class="btn btn-sm btn-info" data-authRule="AUTH_NEW">
				<i class="fa fa-plus"></i> 추가
			</button>
			<button type="button" id="standardAreaDelRowBtn" class="btn btn-sm btn-danger" data-authRule="AUTH_DEL">
				<i class="fa fa-minus"></i> 삭제
			</button>
			<button type="button" id="standardAreaSaveRowBtn" class="btn btn-sm btn-success" data-authRule="AUTH_NEW AUTH_MOD AUTH_DEL">
				<i class="fa fa-download"></i> 저장
			</button>
		</div>
	</div>
	<div class="grid-wrapper">
		<table id="standardAreaGrid"></table>
		<div id="standardAreaGridNavi"></div>
	</div>
	<script src="/js/views/standard/standard_area.js"></script>
</body>
</html>