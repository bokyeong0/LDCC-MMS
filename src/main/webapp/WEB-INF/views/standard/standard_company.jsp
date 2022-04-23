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
<!-- 				<div class="form-group col-md-p20"> -->
<!-- 					<div class="input-group input-group-sm"> -->
<!-- 						<span class="span-info  input-group-addon">그룹분류</span> -->
<!-- 						<select class="form-control" id="standardCompanyCompCate"> -->
<!-- 							<option value="">선택</option> -->
<!-- 						</select> -->
<!-- 					</div> -->
<!-- 				</div> -->
				<div class="form-group col-md-p20">
					<div class="input-group input-group-sm">
						<span class="span-info input-group-addon">고객사명</span>
						<input type="text" class="form-control input-sm" id="standardCompanyNm" >
					</div>
				</div>
			</div>
			
			<!-- 중복되는 부분 -->
			<div class="search-button-group">
				<button id="standardCompanySearchBtn" type="button"  class="btn btn-sm btn-primary">
					<i class="fa fa-search"></i> 검색
				</button>
				<button type="button" id="standardCompanyModifyBtn" class="btn btn-sm btn-warning" data-authRule="AUTH_MOD">
						<i class="fa fa-edit"></i> 고객사 수정
				</button>
				<button type="button" id="standardCompanyInsertBtn" class="btn btn-sm btn-success" data-authRule="AUTH_NEW">
						<i class="fa fa-plus"></i> 고객사 등록
				</button>
			</div>
</div>
<div class="grid-wrapper" >
	<table id="standardCompanyGrid"></table>
	<div id="standardCompanyGridNavi"></div>
</div>
<script src="/js/views/standard/standard_company.js"></script>
</body>
</html>