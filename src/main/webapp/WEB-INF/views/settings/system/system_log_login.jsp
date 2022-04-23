<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<body>
	<div>
		<ol class="breadcrumb pull-right"></ol>
		<h1 class="page-header"></h1>
	</div>
	
	<div class="search-form clearfix">
			<div class="search-controls non-icon col-md-12">
				<div class="form-group col-md-p25">
					<div class="input-group input-group-sm">
						<span class="span-info input-group-addon">조회일시</span>
						<div class="input-group input-daterange" id="systemLoginInfoDateForm">
							<input type="text" name="start" id="systemLoginInfoStartSearch" class="form-control" placeholder="시작일">
							<span class="input-group-addon">~</span>
							<input type="text" name="end" id="systemLoginInfoEndSearch" class="form-control" placeholder="종료일">
						</div>
					</div>
				</div>
				<div class="form-group col-md-p20">
					<div class="input-group input-group-sm">
						<span class="span-info input-group-addon">사용자이름</span>
						<input type="text" name="searchUserName" id="systemLoginInfoUserNameSearch" class="form-control input-sm">
					</div>
				</div>
				<div class="form-group col-md-p20">
					<div class="input-group input-group-sm">
						<span class="span-info input-group-addon">상태</span>
						<select id="systemLoginInfoLoginFlag" class="form-control">
							<option value="">전체</option>
							<option value="Y">성공</option>
							<option value="N">실패</option>
						</select>
					</div>
				</div>
				
			</div>
			<div class="search-button-group">
				<button id="systemLoginInfoSearchBtn" type="button" class="btn btn-sm btn-primary">
					<i class="fa fa-search"> 검색</i>
				</button>
			</div>
	</div>
	<div class="grid-wrapper">
		<table id="systemLoginInfoGrid"></table>
		<div id="systemLoginInfoGridNavi"></div>
	</div>
	<script src="/js/views/settings/system/system_log_login.js"></script>
</body>
</html>