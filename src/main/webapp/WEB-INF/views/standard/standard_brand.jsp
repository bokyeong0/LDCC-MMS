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
		<div class="search-title-group m-r-10">
			<span class="label label-theme search-title">
				<i class="fa fa-search"></i> <i data-domain-id="SEARCH_LAB" ></i>
			</span>
		</div>
		<!-- 중복되는 부분 -->
		<div class="search-controls" >
			<div class="form-group m-r-10">
				<input type="text" class="form-control input-sm" id="standardBrandName" data-domain-id="NON_DOMAIN" placeholder="">
			</div>
		</div>
		<!-- 중복되는 부분 -->
		<div class="search-button-group">
			<button id="standardBrandSearchBtn" type="button"  class="btn btn-sm btn-primary m-r-5">
			<i class="fa fa-search"></i> <i data-domain-id="SEARCH_BTN" ></i>
			</button>
			<button type="button" id="standardBrandAddRowBtn" class="btn btn-sm btn-info">
			<i class="fa fa-plus"></i> <i data-domain-id="ADD_ROW_BTN" ></i>
			</button>
			<button type="button" id="standardBrandDelRowBtn" class="btn btn-sm btn-danger">
			<i class="fa fa-minus"></i> <i data-domain-id="DEL_ROW_BTN" ></i>
			</button>
			<button type="button" id="standardBrandSaveRowBtn"  class="btn btn-sm btn-success">
			<i class="fa fa-download"></i> 저장
			</button>
		</div>
		</form>
</div>
<div class="grid-wrapper" >
	<table id="standardBrandGrid"></table>
	<div id="standardBrandGridNavi"></div>
</div>
<script src="/js/views/standard/standard_brand.js"></script>
</body>
</html>