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
           <form class="form-inline" >
			<div class="search-title-group m-r-10">
				<span class="label label-theme search-title">
					<i class="fa fa-search"></i>검색조건
				</span>
			</div>
			<!-- 중복되는 부분 -->
			<div class="search-controls" >
				<div data-lang="LC0001"  class="form-group m-r-10">
					<input type="text" lang="" class="form-control input-sm" id="langProgramCode" size="10" placeholder="프로그램코드">
				</div>
				<div data-lang="LC0001"  class="form-group m-r-10">
					<input type="text" lang="" class="form-control input-sm" id="langCompId" size="12" placeholder="컴포넌트아이디">
				</div>
				<div class="form-group m-r-10">
					<input type="text" class="form-control input-sm" id="langCompNm" placeholder="컴포넌트명">
				</div>
			</div>
			<!-- 중복되는 부분 -->
			<div class="search-button-group">
				<button id="programSearchBtn" type="button"  class="btn btn-sm btn-primary m-r-5">
				<i class="fa fa-search"></i> 검색
				</button>
				<button type="button" id="componentAddRowBtn" class="btn btn-sm btn-info">
				<i class="fa fa-plus"></i> 행추가
				</button>
				<button type="button" id="componentDelRowBtn" class="btn btn-sm btn-danger">
				<i class="fa fa-minus"></i> 행삭제
				</button>
<!-- 				<button type="button" id="programModGridBtn" data-btn-mod="nomal" class="btn btn-sm btn-success"> -->
<!-- 				<i class="fa fa-edit "></i> 수정 -->
<!-- 				</button> -->
				<button type="button" id="componentSaveRowBtn"  class="btn btn-sm btn-success">
				<i class="fa fa-download"></i> 저장
				</button>
			</div>
			</form>
	</div>
	    
<div class="grid-wrapper" data-test="asdfasdf" >
	<table id="systemComponentGrid"  ></table>
	<div id="systemComponentGridNavi"></div>
</div>
<script src="/js/views/settings/system/system_component.js"></script>
</body>
</html>