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
						<span class="span-info  input-group-addon">URI</span>
						<input type="text" class="form-control input-sm" id="systemAllowedUriCode" >
					</div>
				</div>
				<div class="form-group col-md-p20">
					<div class="input-group input-group-sm">
						<span class="span-info  input-group-addon">명칭</span>
						<input type="text" class="form-control input-sm" id="systemAllowedUriName" >
					</div>
				</div>

				
			</div>
			<div class="search-button-group">
				<button id="systemAllowedUriSearchBtn" type="button"  class="btn btn-sm btn-primary">
				<i class="fa fa-search"></i> 검색
				</button>
				<button type="button" id="systemAllowedUriAddRowBtn" class="btn btn-sm btn-info">
				<i class="fa fa-plus"></i> 행추가
				</button>
				<button type="button" id="systemAllowedUriDelRowBtn" class="btn btn-sm btn-danger">
				<i class="fa fa-minus"></i> 행삭제
				</button>
				<button type="button" id="systemAllowedUriSaveRowBtn"  class="btn btn-sm btn-success">
				<i class="fa fa-download"></i> 저장
				</button>
			</div>
	</div>
	    
<div class="grid-wrapper" >
	<table id="systemAllowedURIGrid"  ></table>
<!-- 	<div id="systemAllowedURIGridNavi"></div> -->
</div>
<script src="/js/views/settings/system/system_alloweduri.js"></script>
</body>
</html>