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
						<div class="control-label col-md-p25 p-5">
							<div class="search-form standard-pro clearfix m-b-5 p-r-5  text-right" >
								<!-- 중복되는 부분 -->
									<div class="search-controls non-icon" >
										<div class="form-group m-r-0">
											<button id="standardPreventiveLv1BanBtn" type="button" class="btn btn-sm btn-default">
											<i class="fa fa-ban"></i><i> 수정불가</i>
											</button>
										</div>
									</div>
							</div>
					        <div class="grid-wrapper" >
								<table id="standardPreventiveLv1Grid"  ></table>
							</div>
						</div>
						<div class="control-label col-md-p25 p-5">
							<div class="search-form clearfix m-b-5 p-r-5  text-right" >
								<!-- 중복되는 부분 -->
									<div class="search-controls non-icon" >
										<div class="form-group m-r-0">
											<button id="standardPreventiveLv2BanBtn" type="button" class="btn btn-sm btn-default">
											<i class="fa fa-ban"></i><i> 수정불가</i>
											</button>
										</div>
									</div>
							</div>
					        <div class="grid-wrapper" >
								<table id="standardPreventiveLv2Grid"  ></table>
							</div>
						</div>
						<div class="control-label  col-md-p50 p-5">
							<div class="search-form clearfix m-b-5 p-r-5  text-right" >
								<!-- 중복되는 부분 -->
									<div class="search-controls non-icon" >
										<div class="form-group m-r-0">
										 	<button id="standardPreventiveLv3SaveRowBtn" type="button" class="btn btn-sm btn-primary" data-authRule="AUTH_NEW AUTH_MOD AUTH_DEL">
											<i class="fa fa-download"></i> <i>저장</i>
											</button>
										</div>
									</div>
							</div>
					        <div class="grid-wrapper" >
								<table id="standardPreventiveLv3Grid"  ></table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<script src="/js/views/standard/standard_preventive.js"></script>
</body>
</html>