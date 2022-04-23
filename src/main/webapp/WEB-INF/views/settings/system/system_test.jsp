<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
<head>
<style type="text/css">
/* [data-authRule]{ */
/* 	display :none; */
/* } */
</style>
</head>
<body>
<div class="" >
<ol class="breadcrumb pull-right"></ol>
<h1 class="page-header"></h1>
</div>
<div class="search-form clearfix" >
           <div class="form-inline" >
			<div class="search-title-group m-r-10">
				<span class="label label-theme search-title">
					<i class="fa fa-search"></i>검색조건
				</span>
			</div>
			<div class="search-controls" >
				<div class="form-group m-r-10">
					<input type="text" class="form-control input-sm" id="systemSchedulerName" placeholder="스케줄러명">
				</div>
			</div>
			<div class="search-button-group">
				<button id="systemSchedulerSearchBtn" type="button"  class="btn btn-sm btn-primary m-r-5">
				<i class="fa fa-search"></i> 검색
				</button>
				<button type="button" id="systemSchedulerAddRowBtn" class="btn btn-sm btn-info">
				<i class="fa fa-plus"></i> 행추가
				</button>
				<button type="button" id="systemSchedulerDelRowBtn" class="btn btn-sm btn-danger">
				<i class="fa fa-minus"></i> 행삭제
				</button>
				<button type="button" id="systemSchedulerSaveRowBtn"  class="btn btn-sm btn-success">
				<i class="fa fa-download"></i> 저장
				</button>
			</div>
			</div>
	</div>

	<div class="row">
		<div class="col-md-4">
				<div class="grid-wrapper">
					<table id="systemProductGrid"></table>
				</div>
<!-- 			<div class="panel panel-inverse" data-sortable-id="flot-chart-1"> -->
<!-- 				<div class="panel-heading"> -->
<!-- 					<h4 class="panel-title">제품군</h4> -->
<!-- 				</div> -->
<!-- 			</div> -->
		</div>
		<div class="col-md-4">
				<div class="grid-wrapper">
				<table id="systemManufacturerGrid"></table>
				</div>
<!-- 			<div class="panel panel-inverse" data-sortable-id="flot-chart-1"> -->
<!-- 				<div class="panel-heading"> -->
<!-- 					<h4 class="panel-title">제조사</h4> -->
<!-- 				</div> -->
<!-- 				<div class="grid-wrapper-test"> -->
<!-- 				</div> -->
<!-- 			</div> -->
		</div>
		<div class="col-md-4">
				<div class="grid-wrapper">
					<table id="systemEquipmentGrid"></table>
					</div>
<!-- 			<div class="panel panel-inverse" data-sortable-id="flot-chart-2"> -->
<!-- 				<div class="panel-heading"> -->
<!-- 					<div class="panel-heading-btn"></div> -->
<!-- 					<h4 class="panel-title">모델명</h4> -->
<!-- 				</div> -->
<!-- 			</div> -->
		</div>
	</div>


	<script src="/js/views/settings/system/system_test.js"></script>
</body>
</html>