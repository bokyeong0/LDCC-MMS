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
		<!-- 중복되는 부분 -->
		<div class="search-controls non-icon col-md-12" >
			<div class="form-group col-md-p20">
				<div class="input-group input-group-sm" >
					<span class="span-info  input-group-addon">연도검색</span>
					<input type="text" class="form-control input-sm" id="statusEngrYearSearch" name="start" placeholder="선택" />
				</div>
			</div>
			<div class="form-group col-md-p20">
				<div class="input-group input-group-sm">
					<span class="span-info  input-group-addon">고객사</span>
					<select class="form-control" id="statusEngrCompCd">
					</select>
				</div>
			</div>
			<div class="form-group col-md-p20">
				<div class="input-group input-group-sm">
					<span class="span-info  input-group-addon">브랜드</span>
					<select class="form-control" id="statusEngrBrndCd">
						<option value="">선택</option>
					</select>
				</div>
			</div>
		</div>
		<div class="search-controls non-icon col-md-12 m-t-0">
			<div class="form-group col-md-p20">
				<div class="input-group input-group-sm">
					<span class="span-info  input-group-addon">파트너사</span>
					<select class="form-control" id="statusEngrAspCompCd">
					</select>
				</div>
			</div>
			<div class="form-group col-md-p20">
				<div class="input-group input-group-sm">
					<span class="span-info  input-group-addon">부서</span>
					<select class="form-control" id="statusEngrAreaCd">
						<option value="">담당부서</option>
					</select>
				</div>
			</div>
			<div class="form-group col-md-p20">
				<div class="input-group input-group-sm">
					<span class="span-info  input-group-addon">이름</span>
					<input type="text" class="form-control input-sm" id="statusEngrUserNm" value="" autocomplete="off" >
				</div>
			</div>
		</div>
		<!-- 중복되는 부분 -->
		<div class="search-button-group">
			<button id="statusEngrSearchBtn" type="button" class="btn btn-sm btn-primary">
			<i class="fa fa-search"></i> 검색
			</button>
		</div>
	</div>
	    
	

	<div class="grid-wrapper" >
		<div class="grid-wrapper" >
			<table id="statusEngrGrid"  ></table>
			<div id="statusEngrGridNavi"></div>
		</div>
	</div>

<script src="/js/views/status/status_engr.js"></script>
</body>
</html>