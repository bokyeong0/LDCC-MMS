<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
<body>
	<div class="menu-cate">
		<ol class="breadcrumb pull-right"></ol>
		<h1 class="page-header"></h1>
	</div>
	<div class="search-form clearfix">
			<div class="search-controls non-icon col-md-12" >
				<div class="form-group col-md-p20" id="assetCompNmGroup">
					<div class="input-group input-group-sm" >
						<span class="span-info  input-group-addon">고객사명</span>
						<input type="text" class="form-control input-sm" id="assetManagerCompNm" >
					</div>
				</div>
				<div class="form-group col-md-p20" id="assetCompNmGroup">
					<div class="input-group input-group-sm" >
						<span class="span-info  input-group-addon">브랜드명</span>
						<input type="text" class="form-control input-sm" id="assetManagerBrndNm" >
					</div>
				</div>
				<div class="form-group col-md-p20">
					<div class="input-group input-group-sm">
						<span class="span-info  input-group-addon">점포명</span>
						<input type="text" class="form-control input-sm" id="assetManagerStrNm" >
					</div>
				</div>
				<div class="form-group col-md-p20">
					<div class="input-group input-group-sm">
						<span class="span-info  input-group-addon">점포코드</span>
						<input type="text" class="form-control input-sm" id="assetManagerMngCd" />
					</div>
				</div>		
				<div class="form-group col-md-p20">
					<div class="input-group input-group-sm">
						<span class="span-info  input-group-addon">자산상태</span>
						<select class="form-control" id="assetManagerAstSt">
						</select>
					</div>
				</div>	
			</div>
			
			<div class="search-controls non-icon col-md-12 m-t-0" >	
				<div class="form-group col-md-p20">
					<div class="input-group input-group-sm">
						<span class="span-info  input-group-addon">제품범주</span>
						<select class="form-control" id="assetManagerPrdTypeLv1">
							<option value="">선택</option>
						</select>						
					</div>
				</div>		
				<div class="form-group col-md-p20">
					<div class="input-group input-group-sm">
						<span class="span-info  input-group-addon">제품군</span>
						<select class="form-control" id="assetManagerPrdTypeLv2">
							<option value="">선택</option>
						</select>							
					</div>
				</div>
				<div class="form-group col-md-p20">
					<div class="input-group input-group-sm">
						<span class="span-info  input-group-addon">제조사</span>
						<select class="form-control" id="assetManagerPrdTypeLv3">
							<option value="">선택</option>
						</select>
					</div>
				</div>		
				<div class="form-group col-md-p20">
					<div class="input-group input-group-sm">
						<span class="span-info  input-group-addon">모델명</span>
						<select class="form-control" id="assetManagerPrdNm">
							<option value="">선택</option>
						</select>						
					</div>
				</div>															
				<div class="form-group col-md-p20">
					<div class="input-group input-group-sm">
						<span class="span-info  input-group-addon">시리얼</span>
						<input type="text" class="form-control input-sm" id="assetManagerSerialNo" >
					</div>
				</div>
			</div>
			
			
			<div class="search-controls non-icon col-md-12 m-t-0" >				
				<div class="form-group col-md-p20">
					<div class="input-group input-group-sm">
						<span class="span-info  input-group-addon">파트너사</span>
						<select class="form-control input-sm" id="assetManagerAspCompCd" >
						</select>
					</div>
				</div>	
				<div class="form-group col-md-p20">
					<div class="input-group input-group-sm">
						<span class="span-info  input-group-addon">파트너사부서</span>
						<select class="form-control input-sm" id="assetManagerAreaCd" >
						</select>
					</div>
				</div>					
				<div class="form-group col-md-p20">
					<div class="input-group input-group-sm">
						<span class="span-info  input-group-addon">포스번호</span>
						<input type="text" class="form-control input-sm" id ="assetManagerAstType2" />					
					</div>
				</div>
				<div class="form-group col-md-p20">
					<div class="input-group input-group-sm">
						<span class="span-info  input-group-addon">계약연동유무</span>
						<select class="form-control input-sm" id ="assetManagerConYearYn" >
			    			<option value="">선택</option>
							<option value="Y">연동</option>
							<option value="N">미연동</option>
						</select>
					</div>
				</div>
				<div class="form-group col-md-p20 p-0" data-authRule="AUTH_NEW">
					<form id="assetManagerUploadExcelForm" name="UploadExcelForm" enctype="multipart/form-data" method="post" >						
					<div class="input-group input-group-sm">
						<span class="span-info  input-group-addon">엑셀업로드</span>
						<input type="hidden" id="excelColumnCount" name="excelColumnCount" value="25" />
						<input type="file" name="excelFile" class="form-control input-sm" id="assetManagerExcelFile" ><!-- name명 고정 -->
						<div class="input-group-btn">
							<button type="button" id="assetManagerAddExcelImportBtn" class="btn btn-default btn-sm btn-danger" ><span>업로드</span></button> 
						</div>
						
					</div>
					</form>
				</div>
			</div>
			
			<!-- 중복되는 부분 -->
			<div class="search-button-group">
				<button id="assetManagerDownloadExcelTemp" type="button" class="btn btn-sm btn-error" data-authRule="AUTH_NEW">
					<i class="fa fa-download"></i> EXCEL 업로드 양식 다운로드
				</button>
				<button id="assetManagerDownloadExcel" type="button" class="btn btn-sm btn-success">
					<i class="fa fa-download"></i> EXCEL
				</button>
				<button id="assetManagerSearchBtn" type="button" class="btn btn-sm btn-primary">
					<i class="fa fa-search"></i> 검색
				</button>
	            <button id="assetManagerModifyBtn" type="button" class="btn btn-sm btn-warning" data-authRule="AUTH_MOD">
					<i class="fa fa-edit"></i> 수정
	            </button>
				<button type="button" id="assetManagerNewBtn" class="btn btn-sm btn-info" data-authRule="AUTH_NEW">
					<i class="fa fa-plus"></i> 등록
				</button>
			</div>
		
	</div>
	<div class="grid-wrapper">
		<table id="assetManagerGrid"></table>
		<div id="assetManagerGridNavi"></div>
	</div>
	<script src="/js/views/asset/asset_manager.js"></script>
</body>
</html>