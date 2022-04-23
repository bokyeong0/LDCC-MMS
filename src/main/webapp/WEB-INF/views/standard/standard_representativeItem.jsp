<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
<body>
	<div class="menu-cate" >
		<ol class="breadcrumb pull-right"></ol>
		<h1 class="page-header"></h1>
	</div>
	<!-- 파트너사 : 콤보박스, 1열 : 제품범주, 2열 : 제품군 -->
	<!-- 3열 : 고객사, 4열 : 브랜드, 5열 : 점포명, 유지보수시작일 -->
	<div class="content-form clearfix" >
		<div class="col-md-12" >
			<div class="view-form white p-0">
				<div class="form-horizontal form-bordered p-5 ">
					<div class="form-group">				
						<div class="control-label  col-md-p40 p-5">
						
							<div class="search-form clearfix m-b-5 p-r-5  text-right" >
	
							<!-- 중복되는 부분 -->
								<div class="search-controls non-icon" >
									<div class="form-group m-r-0">
									 	<button id="standardRepreItemGridAddBtn" type="button" class="btn btn-sm btn-info" >
										<i class="fa fa-plus"></i><i>추가</i>
										</button>
									 	<button id="standardRepreItemGridDelBtn" type="button" class="btn btn-sm btn-danger" >
										<i class="fa fa-minus"></i><i>삭제</i>
										</button>
									 	<button id="standardRepreItemGridSaveBtn" type="button" class="btn btn-sm btn-primary" 
									 			data-authRule="AUTH_NEW AUTH_MOD AUTH_DEL">
										<i class="fa fa-download"></i><i>저장</i>
										</button>
									</div>
								</div>
	
							</div>
							
							<div class="grid-wrapper col-md-12 partner-grid" >
								<table id="standardRepreItemGrid"></table>
							</div>
						
<!-- 시작 : 파트너사당 대표제품군을 1개만 보여주기위해 컨셉 변경 : 삭제하지말 것 : 김선호 -->
<!-- 							<div class="search-form standard-pro clearfix m-b-5 p-r-5  text-right" >
								<div class="search-controls non-icon" >
									<div class="form-group m-r-0">
										파트너사
										<label>파트너사:</label> 
										<select id="standardRepreItemAspCompCd" class="input-sm">
											<option>선택</option>
										</select>
									</div>
								</div>
							</div>
							<div class="grid-wrapper col-md-p50 partner-grid" >
								<table id="standardRepreItemLv1Grid"></table>
							</div>
								제품군
							<div class="grid-wrapper  col-md-p50 partner-grid-second">
						        <div class="grid-wrapper" >
									<table id="standardRepreItemLv2Grid"  ></table>
								</div>
							</div> -->
<!-- 끝 : 파트너사당 대표제품군을 1개만 보여주기위해 컨셉 변경 : 삭제하지말 것 : 김선호 -->
						</div>
					
					<div class="control-label  col-md-p40 p-5">
						<div class="search-form standard-pro clearfix m-b-5 p-r-5  text-right" >
							<div class="search-controls non-icon" >
								<div class="form-group m-r-0 partner-height">
									
								</div>
							</div>
						</div>
						<div class="grid-wrapper col-md-p50 partner-grid" >
							<table id="standardRepreItemComp"></table>
						</div>
							<!-- 제품군 -->
						<div class="grid-wrapper  col-md-p50 partner-grid-second">
					        <div class="grid-wrapper" >
								<table id="standardRepreItemBrnd"  ></table>
							</div>
						</div>
					</div>
					
					<div class="control-label  col-md-p20 p-5">
						<div class="search-form clearfix m-b-5 p-r-5  text-right" >

						<!-- 중복되는 부분 -->
							<div class="search-controls non-icon" >
								<div class="form-group m-r-0">
								 	<button id="standardRepreItemDtSaveBtn" type="button" class="btn btn-sm btn-primary" 
								 			data-authRule="AUTH_NEW AUTH_MOD AUTH_DEL">
									<i class="fa fa-download"></i><i>저장</i>
									</button>
								</div>
							</div>

						</div>
				        <div class="grid-wrapper" >
							<table id="standardRepreItemStrAndDt"  ></table>
						</div>
					</div>
				</div>
			</div>
					
			</div>
		</div>
	</div>
	<script src="/js/views/standard/standard_representativeItem.js"></script>
</body>
</html>