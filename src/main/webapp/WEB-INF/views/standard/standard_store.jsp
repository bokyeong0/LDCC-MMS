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
		<div class="search-controls non-icon col-md-12 m-t-0" >
			<div class="form-group col-md-p20">
				<div class="input-group input-group-sm">
					<span class="span-info  input-group-addon">점포유형</span>
					<select class="form-control" id="standardStoreType">
						<option value="">선택</option>
					</select>
				</div>
			</div>
			<div class="form-group col-md-p20">
				<div class="input-group input-group-sm">
					<span class="span-info  input-group-addon">점포형태</span>
					<select class="form-control" id="standardStoreSt">
						<option value="">선택</option>
					</select>
				</div>
			</div>
			<div class="form-group col-md-p20">
				<div class="input-group input-group-sm" >
					<span class="span-info  input-group-addon">오픈일자</span>
				    <div class="input-group input-daterange" id="dashboard02DateForm">
	                       <input type="text" class="form-control" id="standardStoreStartDate" name="start" placeholder="시작일" />
	                       <span class="input-group-addon">~</span>
	                       <input type="text" class="form-control" id="standardStoreEndDate" name="end" placeholder="종료일" />
	                   </div>
				</div>
			</div>
			<div class="form-group col-md-p20">
				<div class="input-group input-group-sm" >
					<span class="span-info  input-group-addon">지역</span>
					<div class="input-group input-select-box">
						<div class="input-select input-selectOne">
							<select class="form-control input-select-one" id="standardStoreAreaLv1Nm"></select>
						</div>
						<div class="input-select input-selectTwo">
							<select class="form-control input-select-two" id="standardStoreAreaLv2Nm">
								<option value="">선택</option>
							</select>
						</div>
					</div>
				</div>
			</div>
			<div class="form-group col-md-p20">
				<div class="input-group input-group-sm">
					<span class="span-info  input-group-addon">점포코드</span>
					<input type="text" class="form-control input-sm" id="standardStoreMngCd" >
				</div>
			</div>
		</div>
		<div class="search-controls non-icon col-md-12 m-t-0" >			
			<div class="form-group col-md-p20">
				<div class="input-group input-group-sm">
					<span class="span-info  input-group-addon">고객사명</span>
					<select class="form-control" id="standardStoreCompCd">
						<option value="">선택</option>
					</select>
				</div>
			</div>
			<div class="form-group col-md-p20">
				<div class="input-group input-group-sm">
					<span class="span-info  input-group-addon">브랜드명</span>
					<select class="form-control" id="standardStoreBrndCd">
						<option value="">선택</option>
					</select>
				</div>
			</div>
			<div class="form-group col-md-p20">
				<div class="input-group input-group-sm">
					<span class="span-info  input-group-addon">점포명</span>
					<input type="text" class="form-control input-sm" id="standardStoreNm" >
				</div>
			</div>
		</div>
	
		<!-- 중복되는 부분 -->
		<div class="search-button-group">
			<button id="saveLoc" type="button"  class="btn btn-sm btn-inverse">
				<i class="fa fa-crosshairs"></i> 좌표 배치
			</button>
			<button id="standardStoreSearchBtn" type="button"  class="btn btn-sm btn-primary">
				<i class="fa fa-search"></i> 검색
			</button>
			<button type="button" id="standardStoreModifyBtn" class="btn btn-sm btn-warning" data-authRule="AUTH_MOD">
				<i class="fa fa-edit"></i> 점포 수정
			</button>
			<button type="button" id="standardStoreInsertBtn" class="btn btn-sm btn-info" data-authRule="AUTH_NEW">
				<i class="fa fa-plus"></i> 점포 등록
			</button>
		</div>
	</div>
	<div class="grid-wrapper" >
		<table id="standardStoreGrid"></table>
		<div id="standardStoreGridNavi"></div>
	</div>
	<script src="/js/views/standard/standard_store.js"></script>
</body>
</html>