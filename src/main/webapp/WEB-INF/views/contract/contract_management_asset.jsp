<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
<body>
	<div class="menu-cate" >
		<ol class="breadcrumb pull-right"></ol>
		<h1 class="page-header"></h1>
	</div>
	<div class="search-form clearfix">
		<div class="search-controls non-icon col-md-12 m-t-0" >
			<div class="form-group col-md-p20">
				<div class="input-group input-group-sm">
					<span class="span-info  input-group-addon">계약년도</span>
					<select class="form-control" id="contractMngAssetConYear">
						<option value="">선택</option>
					</select>
				</div>
			</div>
			<div class="form-group col-md-p20">
				<div class="input-group input-group-sm">
					<span class="span-info  input-group-addon">계약번호</span>
					<select class="form-control" id="contractMngAssetConId">
						<option value="">선택</option>
					</select>
				</div>
			</div>
			<div class="form-group col-md-p20">
				<div class="input-group input-group-sm">
					<span class="span-info  input-group-addon">파트너사</span>
					<select class="form-control" id="contractMngAssetAspCompCd">
					</select>						
				</div>
			</div>	
			<div class="form-group col-md-p20">
				<div class="input-group input-group-sm">
					<span class="span-info  input-group-addon">담당부서</span>
					<select class="form-control" id="contractMngAssetAspArea">
						<option value="">담당부서</option>
					</select>						
				</div>
			</div>
		</div>
		<div class="search-controls non-icon col-md-12 m-t-0" >
			<div class="form-group col-md-p20" id="assetCompNmGroup">
				<div class="input-group input-group-sm">
					<span class="span-info  input-group-addon">고객사</span>
					<select class="form-control" id="contractMngAssetCompCd">
						<option value="">선택</option>
					</select>						
				</div>
			</div>
			<div class="form-group col-md-p20">
				<div class="input-group input-group-sm">
					<span class="span-info  input-group-addon">브랜드</span>
					<select class="form-control" id="contractMngAssetBrndCd">
						<option value="">선택</option>
					</select>						
				</div>
			</div>
			<div class="form-group col-md-p20">
				<div class="input-group input-group-sm">
					<span class="span-info  input-group-addon">점포명</span>
					<input type="text" class="form-control input-sm" id="contractMngAssetStrNm" >
				</div>
			</div>
		</div>
		<!-- A20180711 k2s 제품범주, 제품군, 제조사, 모델명 조회 검색조건 추가 start--> 
		<div class="search-controls non-icon col-md-12 m-t-0" >	
			<div class="form-group col-md-p20">
				<div class="input-group input-group-sm">
					<span class="span-info  input-group-addon">제품범주</span>
					<select class="form-control" id="contractManagementAssetPrdTypeLv1">
						<option value="">선택</option>
					</select>						
				</div>
			</div>		
			<div class="form-group col-md-p20">
				<div class="input-group input-group-sm">
					<span class="span-info  input-group-addon">제품군</span>
					<select class="form-control" id="contractManagementAssetPrdTypeLv2">
						<option value="">선택</option>
					</select>							
				</div>
			</div>
			<div class="form-group col-md-p20">
				<div class="input-group input-group-sm">
					<span class="span-info  input-group-addon">제조사</span>
					<select class="form-control" id="contractManagementAssetPrdTypeLv3">
						<option value="">선택</option>
					</select>
				</div>
			</div>		
			<div class="form-group col-md-p20">
				<div class="input-group input-group-sm">
					<span class="span-info  input-group-addon">모델명</span>
					<select class="form-control" id="contractManagementAssetPrdNm">
						<option value="">선택</option>
					</select>						
				</div>
			</div>															
		</div>		
        <!-- A20180711 k2s 제품범주, 제품군, 제조사, 모델명 조회 검색조건 추가 end-->		
		<div class="search-controls non-icon col-md-12 m-t-0" >
			<div class="form-group col-md-p20 m-b-0">
				<div class="input-group input-group-sm">
					<span class="span-danger  input-group-addon">계약변경</span>
					<div class="input-group input-group-sm input-category">
						<select id="contractMngAssetChangeConYear" class="form-control input-category">
							<option value="">계약년도</option>
                    	</select>
					</div>							
				</div>
			</div>
			<div class="form-group col-md-p20 m-b-0">
				<div class="input-group input-group-sm input-category">
					<select id="contractMngAssetChangeConId" class="form-control input-category">
					<option value="">계약ID</option>
                   	</select>
				</div>					
			</div>
			<div class="form-group col-md-p20 m-b-0">
				<div class="input-group input-group-sm input-category">
					<select id="contractMngAssetChangeAspArea" class="form-control input-category">
					<option value="">이동할 부서</option>
                   	</select>
				</div>					
			</div>
			<div class="form-group col-md-p20 m-b-0">
				<button id="contractMngAssetConfirmBtn" type="button" class="btn btn-sm btn-danger pull-left" data-authRule="AUTH_SAVE">
					<i class="fa fa-link"></i> 변경사항 일괄적용
				</button>
			</div>
			<div class="form-group col-md-p20 m-b-0">
				<button id="contractMngAssetSearchBtn" type="button" class="btn btn-sm btn-primary pull-right">
					<i class="fa fa-search"></i> 검색
				</button>
			</div>
		</div>
<!-- 		<div class="search-controls non-icon col-md-12 m-t-0" > -->
<!-- 			<div class="form-group col-md-p20"> -->
<!-- 				<div class="input-group input-group-sm"> -->
<!-- 					<span class=""></span> -->
<!-- 				</div> -->
<!-- 			</div> -->
			
<!-- 		</div> -->
		
		<!-- 중복되는 부분 -->
<!-- 		<div class="search-button-group"> -->
<!-- 		</div> -->
	</div>
	<div class="grid-wrapper">
		<table id="contractMngAssetGrid"></table>
		<div id="contractMngAssetGridNavi"></div>
	</div>
	<script src="/js/views/contract/contract_management_asset.js"></script>
</body>
</html>