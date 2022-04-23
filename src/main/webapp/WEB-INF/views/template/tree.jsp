<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
<head>
	<link href="/js/plugins/jstree/dist/themes/default/style.min.css" rel="stylesheet" />
</head>
<body>
<div class="" >
	<ol class="breadcrumb pull-right"></ol>
	<h1 class="page-header"></h1>
</div>
	<!-- begin row -->
	<div class="row">
		<!-- begin col-4 -->
		<div class="col-md-4">
			<div class="panel panel-inverse" data-sortable-id="tree-view-1">
				<div class="panel-heading">
					<h4 class="panel-title">Default Tree</h4>
				</div>
				<div class="panel-body">
					<div id="defaultTree"></div>
				</div>
			</div>
		</div>
		<!-- end col-4 -->
		<!-- begin col-8 -->
		<div class="col-md-8">
			<div class="panel panel-inverse" data-sortable-id="tree-view-2">
				<div class="panel-heading">
					<h4 class="panel-title">checkbox</h4>
				</div>
				<div class="panel-body">
					<div id="checkBoxTree"></div>
				</div>
			</div>
		</div>
		<!-- end col-6 -->
	</div>
	<!-- end row -->


	<!-- ================== BEGIN PAGE LEVEL JS ================== -->
	<script src="/js/views/template/tree.js"></script>
	<!-- ================== END PAGE LEVEL JS ================== -->
</body>
</html>




<!-- <div class="panel-heading-btn"> -->
<!-- 						<a href="#none" class="btn btn-xs btn-icon btn-circle btn-primary" onclick="javascript:nodeOpen();"><i class="fa fa-facebook"></i></a> -->
<!-- 						<a href="#none" class="btn btn-xs btn-icon btn-circle btn-primary" onclick="javascript:createMenuPopup();"><i class="fa fa-facebook"></i></a> -->
<!-- 						<a id="treeReload" href="#none"class="btn btn-xs btn-icon btn-circle btn-success" data-click="panel-reload" onclick="javascript:allOpen();"><i class="fa fa-repeat"></i></a> -->
<!-- 						<a href="#none" class="btn btn-xs btn-icon btn-circle btn-default" onclick="javascript:allOpen();"><i class="fa fa-expand"></i></a> -->
<!-- 						<a href="#none" class="btn btn-xs btn-icon btn-circle btn-warning" onclick="javascript:allClose();"><i class="fa fa-minus"></i></a> -->
<!-- 						<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-danger"data-click="panel-remove"><i class="fa fa-times"></i></a> -->
<!-- 					</div> -->