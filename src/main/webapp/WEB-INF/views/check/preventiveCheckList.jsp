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
			<div class="search-controls non-icon col-md-12" >
				<!-- 점검일자 -->
				<div class="form-group col-md-p20">
					<div class="input-group input-group-sm" >
						<span class="span-info  input-group-addon">점검일자</span>
					    <div class="input-group input-daterange">
		                       <input type="text" class="form-control input-sm" id="preventiveCheckListStartDt" name="start" placeholder="시작일" />
		                       <span class="input-group-addon">~</span>
		                       <input type="text" class="form-control input-sm" id="preventiveCheckListEndDt" name="end" placeholder="종료일" />
	                   </div>
					</div>
				</div>		
				<!-- 고객사 -->
				<div class="form-group col-md-p20" id="assetCompNmGroup">
					<div class="input-group input-group-sm" >
						<span class="span-info  input-group-addon">고객사명</span>
						<input type="text" class="form-control input-sm" id="preventiveCheckListCompNm" >
					</div>
				</div>
				<!-- 브랜드 -->				
				<div class="form-group col-md-p20">
					<div class="input-group input-group-sm">
						<span class="span-info  input-group-addon">브랜드명</span>
						<input type="text" class="form-control input-sm" id="preventiveCheckListBrndNm" >
					</div>
				</div>
				<!-- 점포명 -->				
				<div class="form-group col-md-p20">
					<div class="input-group input-group-sm">
						<span class="span-info  input-group-addon">점포명</span>
						<input type="text" class="form-control input-sm" id="preventiveCheckListStrNm" >
					</div>
				</div>
				<!-- 포스번호 -->				
				<div class="form-group col-md-p20">
					<div class="input-group input-group-sm">
						<span class="span-info  input-group-addon">파트너사명</span>
						<input type="text" class="form-control input-sm" id="preventiveCheckListAspCompNm" >						
					</div>
				</div>	
			</div>
			
			<!-- 중복되는 부분 -->
			<div class="search-button-group">
				<button id="preventiveCheckListDownloadExcel" type="button" class="btn btn-sm btn-success" data-authRule="AUTH_DOWN">
					<i class="fa fa-download"></i> EXCEL
				</button>
				<button id="preventiveCheckListServiceReportDownloadExcel" type="button" class="btn btn-sm btn-success" data-authRule="AUTH_DOWN">
					<i class="fa fa-download"></i> 서비스리포트 [EXCEL] 
				</button>
				<button id="preventiveCheckListSearchBtn" type="button" class="btn btn-sm btn-primary">
					<i class="fa fa-search"></i> 검색
				</button>				
<!--  				<button id="preventiveCheckListNoticeNewBtn" type="button" class="btn btn-sm btn-info">
					<i class="fa fa-plus"></i> 유의사항 등록
				</button>	 --> 
			</div>
		
	</div>
	<div class="grid-wrapper">
		<table id="preventiveCheckListGrid"></table>
		<div id="preventiveCheckListGridNavi"></div>
	</div>

	<script src="/js/views/check/preventiveCheckList.js"></script>

</body>
</html>