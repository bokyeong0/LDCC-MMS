<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
<head>
</head>
<body>
<div class="menu-cate" >
<ol class="breadcrumb pull-right"></ol>
<h1 class="page-header"></h1>
</div>
	<!-- 상세 검색 검색폼 생성시class="search-form multi clearfix" 명으로 생성 -->
	<div class="search-form clearfix" >
		<!-- 중복되는 부분 -->
		<div class="search-controls non-icon col-md-12" >
			<div class="form-group col-md-p20">
				<div class="input-group input-group-sm" >
					<span class="span-info  input-group-addon">연도검색</span>
                       <input type="text" class="form-control input-sm" id="statusCompanyYearSearch" name="start" placeholder="선택" />
				</div>
			</div>
			<div class="form-group col-md-p20">
				<div class="input-group input-group-sm">
					<span class="span-info  input-group-addon">점포상태</span>
					<select class="form-control input-sm" id="statusCompanyStrSt">
					</select>
				</div>
			</div>
			<div class="form-group col-md-p20">
				<div class="input-group input-group-sm">
					<span class="span-info  input-group-addon">점포유형</span>
					<select class="form-control" id="statusCompanyStrType">
					</select>
				</div>
			</div>
			<div class="form-group col-md-p20">
				<div class="input-group input-group-sm" >
					<span class="span-info  input-group-addon">지역</span>
					<div class="input-group input-select-box">
						<div class="input-select input-selectOne">
							<select class="form-control input-select-one" id="statusCompanyAreaLv1Cd"></select>
						</div>
						<div class="input-select input-selectTwo">
							<select class="form-control input-select-two" id="statusCompanyAreaLv2Cd">
								<option value="">선택</option>
							</select>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<div class="search-controls non-icon col-md-12 m-t-0" >				
			<div class="form-group col-md-p20">
				<div class="input-group input-group-sm">
					<span class="span-info  input-group-addon">파트너사</span>
					<select class="form-control" id="statusCompanyAspCompCd">
					</select>
				</div>
			</div>
			<div class="form-group col-md-p20">
				<div class="input-group input-group-sm">
					<span class="span-info  input-group-addon">고객사</span>
					<select class="form-control" id="statusCompanyCompCd">
						<option value="">선택</option>
					</select>
				</div>
			</div>
			<div class="form-group col-md-p20">
				<div class="input-group input-group-sm">
					<span class="span-info  input-group-addon">브랜드</span>
					<select class="form-control" id="statusCompanyBrndCd">
						<option value="">선택</option>
					</select>
				</div>
			</div>
			<div class="form-group col-md-p20">
				<div class="input-group input-group-sm">
					<span class="span-info  input-group-addon">점포명</span>
					<input type="text" class="form-control input-sm" id="statusCompanyStrNm" value="" autocomplete="off" >
				</div>
			</div>
		</div>
		<!-- 중복되는 부분 -->
		<div class="search-button-group">
			<button id="statusCompanySearchBtn" type="button" class="btn btn-sm btn-primary m-r-5">
			<i class="fa fa-search"></i> 검색
			</button>
		</div>
	</div>
	    
	<div class="grid-wrapper" >
		<table id="statusCompanyGrid"  ></table>
		<div id="statusCompanyGridNavi"></div>
	</div>
	<script src="/js/views/status/status_company.js"></script>
</body>
</html>