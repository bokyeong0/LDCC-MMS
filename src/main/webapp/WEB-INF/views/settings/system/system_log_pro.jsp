<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
<body>
	<div>
		<ol class="breadcrumb pull-right"></ol>
		<h1 class="page-header"></h1>
	</div>

	<div class="search-form clearfix">
		 <form onsubmit="return false;"> 
			<div class="search-controls non-icon col-md-12">
				<div class="form-group col-md-p25">
					<div class="input-group input-group-sm">
						<span class="span-info input-group-addon">조회일시</span>
						<div class="input-group input-daterange" id="systemProInfoDateForm">
							<input type="text" name="start" id="systemProInfoStartSearch" class="form-control" placeholder="시작일">
							<span class="input-group-addon">~</span>
							<input type="text" name="end" id="systemProInfoEndSearch" class="form-control" placeholder="종료일">
						</div>
					</div>
				</div>
				<div class="form-group col-md-p20">
					<div class="input-group input-group-sm">
						<span class="span-info input-group-addon">사용자 이름</span>
						<input type="text" name="searchUserName" id="systemProInfoUserNameSearch" class="form-control input-sm">
					</div>
				</div>
				<div class="form-group col-md-p20">
					<div class="input-group input-group-sm">
						<span class="span-info input-group-addon">메뉴 명</span>
						<input type="text" name="searchProName" id="systemProInfoProNameSearch" class="form-control input-sm">
					</div>
				</div>		
			</div>
			<div class="search-button-group">
				<button type="button" id="systemProInfoSearchBtn" class="btn btn-sm btn-primary">
					<i class="fa fa-search"> 검색</i>
				</button>
				<!-- <button type="button" id="systemProInfoSendMail" class="btn btn-sm btn-success">
					<i class="fa fa-envelope"> 메일전송</i>
				</button> -->
			</div>
		 </form>
	</div>
	<div class="grid-wrapper">
		<table id="systemProInfoGrid"></table>
		<div id="systemProInfoGridNavi"></div>
	</div>
	<script src="/js/views/settings/system/system_log_pro.js"></script>
</body>
</html>