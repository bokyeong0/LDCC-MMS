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
		<!-- <form> -->
			<input type="hidden" id="authGroupSeq"> 
			<input type="hidden" id="authGroupModFlag">
			<div class="search-controls non-icon pull-right" >
				<div class="form-group">
	                <button type="button" id="systemMenuAddBtn" data-authRule="AUTH_NEW"  class="btn btn-sm btn-info">
					<i class="fa fa-plus"></i> 메뉴등록
					</button>
					<button type="button" id="systemMenuDelRowBtn" data-authRule="AUTH_DEL" class="btn btn-sm btn-danger">
					<i class="fa fa-minus"></i> 메뉴삭제
					</button>
					<button type="button" id="systemMenuSaveRowBtn" data-authRule="AUTH_NEW AUTH_MOD AUTH_DEL"  class="btn btn-sm btn-success">
					<i class="fa fa-download"></i> 저장
					</button>
				</div>
			</div>
		<!-- </form> -->
	</div>
	    
	<div class="grid-wrapper" >
		<table id="systemMenuGrid"  ></table>
	<!-- 	<div id="systemMenuGridNavi"></div> -->
	</div>
<script src="/js/views/settings/system/system_menu.js"></script>
</body>
</html>