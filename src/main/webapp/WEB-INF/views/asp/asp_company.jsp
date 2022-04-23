<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
<body>
<div class="" >
<ol class="breadcrumb pull-right"></ol>
<h1 class="page-header"></h1>
</div>
	<div class="search-form clearfix" >
		<div class="search-controls non-icon col-md-12" >
			<div class="form-group col-md-p20">
				<div class="input-group input-group-sm">
					<span class="span-info  input-group-addon">파트너사코드</span>
					<input type="text" class="form-control input-sm" id="aspCompanyCd" autocomplete="off" >
				</div>
			</div>
			<div class="form-group col-md-p20">
				<div class="input-group input-group-sm">
					<span class="span-info  input-group-addon">파트너사명</span>
					<select class="form-control input-sm" id="aspCompanyNm">
						<option value="">선택</option>
					</select>
				</div>
			</div>
		</div>
		<!-- 중복되는 부분 -->
		<div class="search-button-group">
			<button type="button" id="aspCompanySearchBtn"  class="btn btn-sm btn-primary">
				<i class="fa fa-search"></i> 검색
			</button>
			<button type="button" id="aspCompanyModifyBtn" class="btn btn-sm btn-warning" data-authRule="AUTH_NEW AUTH_MOD">
				<i class="fa fa-edit"></i> 파트너사 수정
			</button>
			<button type="button" id="aspCompanyInsertBtn" class="btn btn-sm btn-success" data-authRule="AUTH_NEW">
				<i class="fa fa-plus"></i> 파트너사 등록
			</button>
		</div>
	</div>
	    
<div class="grid-wrapper" >
	<table id="aspCompanyGrid"  ></table>
	<div id="aspCompanyGridNavi"></div>
</div>
<script src="/js/views/asp/asp_company.js"></script>
</body>
</html>