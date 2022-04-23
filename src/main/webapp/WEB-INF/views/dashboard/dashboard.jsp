<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<html>
<head>
<script src="/js/common/chart.js"></script>
<script src="/js/common/chart-js.demo.js"></script>
</head>
<body>
<ol class="breadcrumb pull-right">
	<li><a href="javascript:;">Home</a></li>
	<li class="active">Dashboard</li>
</ol>
<h1 class="page-header">Dashboard <small>VertexID</small></h1>
<div class="row">
	<!-- begin col-3 -->
	<div class="col-md-4">
		<div class="widget widget-stats bg-green">
			<div class="stats-icon"><i class="fa fa-desktop"></i></div>
			<div class="stats-info" id='div1'>
			</div>
		</div>
	</div>
	<div class="col-md-4">
		<div class="widget widget-stats bg-blue">
			<div class="stats-icon"><i class="fa fa-chain-broken"></i></div>
			<div class="stats-info" id='div2'>
			</div>
		</div>
	</div>
	<div class="col-md-4">
		<div class="widget widget-stats bg-red">
			<div class="stats-icon"><i class="fa fa-clock-o"></i></div>
			<div class="stats-info" id='div3'>
			</div>
		</div>
	</div>
</div>
<div class="row">
	<!-- begin col-8 -->
	<div class="col-md-8">
		<div class="panel panel-inverse" data-sortable-id="index-1">
			<div class="panel-heading">
				<div class="panel-heading-btn">
					<a id="aaa" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
					<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-success" data-click="panel-reload"><i class="fa fa-repeat"></i></a>
					<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
				</div>
				<h4 class="panel-title">연간 건별 처리 현황</h4>
			</div>
			<div class="panel-body">
				<div id="chart1" class="height-sm"></div>
			</div>
		</div>
	</div>
	<div class="col-md-4">
		<div class="panel panel-inverse" data-sortable-id="index-2">
			<div class="panel-heading">
				<div class="panel-heading-btn">
					<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
					<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-success" data-click="panel-reload"><i class="fa fa-repeat"></i></a>
					<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
				</div>
				<h4 class="panel-title" id="pidTitle">고객사별 장애율</h4>
			</div>
			<div class="panel-body">
				<div id="chart2" class="height-sm"></div>
			</div>
		</div>
	</div>
	<div class="col-md-12 dash-notice">
			<div class="panel panel-inverse" data-sortable-id="index-1">
			<div class="panel-heading">
				<div class="panel-heading-btn">
					<button type="button" class="btn btn-white add-btn" id="linkNoticeMore">더보기+</button>
				</div>
				<h4 class="panel-title">공지사항</h4>
			</div>
			<div class="panel-body">
				<table id="noticeList"></table>
			</div>
		</div>
	</div>
</div>	
<script src="/js/views/dashboard/dashboard.js"></script>
</body>	
	
</html>

