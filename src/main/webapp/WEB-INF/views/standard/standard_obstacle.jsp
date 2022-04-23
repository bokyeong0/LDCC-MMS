<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
<body>
<div class="menu-cate" >
<ol class="breadcrumb pull-right"></ol>
<h1 class="page-header"></h1>
</div>
	<div class="content-form clearfix" >
		<div class="col-md-12" >
			<div class="view-form white p-0">
				<div class="form-horizontal  form-bordered p-5 ">
					<div class="form-group">
						<div class="control-label  col-md-p15 p-5">
							<div class="search-form clearfix m-b-5 p-r-5  text-right" >
					           <div class="form-inline" >
								<!-- 중복되는 부분 -->
									<div class="search-controls non-icon" >
										<div class="form-group m-r-0">
											
										   <label>제품범주:</label> 
										   <select id="standardObstacleLv1ComboBox" class="input-sm"></select>
										</div>
									</div>
								</div>
							</div>
					        <div class="grid-wrapper" >
								<table id="standardObstacleLv1Grid"  ></table>
							</div>
						</div>
						<div class="control-label  col-md-p25 p-5">
							<div class="search-form clearfix m-b-5 p-r-5  text-right" >
					           <div class="form-inline" >
								<!-- 중복되는 부분 -->
									<div class="search-controls non-icon" >
										<div class="form-group m-r-0">
											<button id="standardObstacleLv2AddRowBtn" type="button" class="btn btn-sm btn-info">
											<i class="fa fa-plus"></i><i>추가</i>
											</button>
											<button id="standardObstacleLv2DelRowBtn" type="button" class="btn btn-sm btn-danger">
											<i class="fa fa-minus"></i><i>삭제</i>
											</button>
										 	<button id="standardObstacleLv2SaveRowBtn" type="button" class="btn btn-sm btn-primary" data-authRule="AUTH_NEW AUTH_MOD AUTH_DEL">
											<i class="fa fa-download"></i><i>저장</i>
											</button>
										</div>
									</div>
								</div>
							</div>
					        <div class="grid-wrapper" >
								<table id="standardObstacleLv2Grid"  ></table>
							</div>
						</div>
						<div class="control-label  col-md-p30 p-5">
							<div class="search-form clearfix m-b-5 p-r-5  text-right" >
					           <div class="form-inline" >
								<!-- 중복되는 부분 -->
									<div class="search-controls non-icon" >
										<div class="form-group m-r-0">
											<button id="standardObstacleLv3AddRowBtn" type="button" class="btn btn-sm btn-info">
											<i class="fa fa-plus"></i><i>추가</i>
											</button>
											<button id="standardObstacleLv3DelRowBtn" type="button" class="btn btn-sm btn-danger">
											<i class="fa fa-minus"></i><i>삭제</i>
											</button>
										 	<button id="standardObstacleLv3SaveRowBtn" type="button" class="btn btn-sm btn-primary" data-authRule="AUTH_NEW AUTH_MOD AUTH_DEL">
											<i class="fa fa-download"></i> <i>저장</i>
											</button>
										</div>
									</div>
								</div>
							</div>
					        <div class="grid-wrapper" >
								<table id="standardObstacleLv3Grid"  ></table>
							</div>
						</div>
						<div class="control-label  col-md-p30 p-5">
							<div class="search-form clearfix m-b-5 p-r-5  text-right" >
					           <div class="form-inline" >
								<!-- 중복되는 부분 -->
									<div class="search-controls non-icon" >
										<div class="form-group m-r-0">
											<button id="standardObstacleLv4AddRowBtn" type="button" class="btn btn-sm btn-info">
											<i class="fa fa-plus"></i><i>추가</i>
											</button>
											<button id="standardObstacleLv4DelRowBtn" type="button" class="btn btn-sm btn-danger">
											<i class="fa fa-minus"></i><i>삭제</i>
											</button>
										 	<button id="standardObstacleLv4SaveRowBtn" type="button" class="btn btn-sm btn-primary" data-authRule="AUTH_NEW AUTH_MOD AUTH_DEL">
											<i class="fa fa-download"></i><i>저장</i>
											</button>
										</div>
									</div>
								</div>
							</div>
					        <div class="grid-wrapper" >
								<table id="standardObstacleLv4Grid"  ></table>
							</div>
						</div>
					</div>
					<div class="form-group">
						<div class="control-label p-5 text-left">
							<div class="grid-wrapper" >
								<table id="standardObstacleLv5Grid"  ></table>
<!-- 								<div id="callObsAssetGridNavi2"></div> -->
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<script src="/js/views/standard/standard_obstacle.js"></script>
</body>
</html>