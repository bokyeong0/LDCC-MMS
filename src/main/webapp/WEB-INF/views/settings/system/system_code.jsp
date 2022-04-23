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
           <!-- <form class="form-inline" > -->
<!-- 			<div class="search-title-group m-r-10"> -->
<!-- 				<span class="label label-theme search-title"> -->
<!-- 					<i class="fa fa-search"></i>검색조건 -->
<!-- 				</span> -->
<!-- 			</div> -->
			<!-- 중복되는 부분 -->
			<div class="search-controls non-icon col-md-12" >
				<div class="form-group col-md-p20">
					<div class="input-group input-group-sm">
						<span class="span-info  input-group-addon">그룹타입</span>
						<select id="codeGroupType" class="form-control">
							<option value="" data-domain-id="ALL_SLT"  >전체</option>
	                    </select>
                    </div>
				</div>
				<div class="form-group col-md-p20">
					<div class="input-group input-group-sm">
						<span class="span-info  input-group-addon">그룹코드</span>
						<input type="text" class="form-control input-sm" id="codeGroupCd" >
					</div>
				</div>
				<div class="form-group col-md-p20">
					<div class="input-group input-group-sm">
						<span class="span-info  input-group-addon">그룹코드명</span>
						<input type="text" class="form-control input-sm" id="codeGroupName" >
					</div>
				</div>
			</div>
			<!-- 중복되는 부분 -->
			<div class="search-button-group"  data-authRule="AUTH_NEW AUTH_MOD AUTH_DEL">
				<button type="button" id="codeGroupSearchBtn" class="btn btn-sm btn-primary">
				<i class="fa fa-search"></i> 검색
				</button>
				<button type="button" id="codeGroupAddRowBtn" data-authRule="AUTH_NEW" class="btn btn-sm btn-info">
				<i class="fa fa-plus"></i> 행추가
				</button>
				<button type="button" id="codeGroupDelRowBtn" data-authRule="AUTH_DEL" class="btn btn-sm btn-danger">
				<i class="fa fa-minus"></i> 행삭제
				</button>
				<button type="button" id="codeGroupSaveRowBtn" data-authRule="AUTH_NEW AUTH_MOD AUTH_DEL" class="btn btn-sm btn-success">
				<i class="fa fa-download"></i> 저장
				</button>
			</div>
			<!-- </form> -->
	</div>
	    
	    
<div class="grid-wrapper" >
	<table id="systemCodeGroupGrid"  ></table>
		<div id="systemCodeGroupGridNavi"  ></div>
	</div>
	<div class="search-form clearfix" >
           <!-- <form> -->
<!-- 			<div class="search-title-group m-r-10"> -->
<!-- 				<span class="label label-theme search-title"> -->
<!-- 					<i class="fa fa-search"></i>검색조건 -->
<!-- 				</span> -->
<!-- 			</div> -->
			<!-- 중복되는 부분 -->
			<div class="search-controls non-icon col-md-12" >
				<div class="form-group col-md-p20">
					<div class="input-group input-group-sm">
						<span class="span-info  input-group-addon">공통코드</span>
						<input type="text" class="form-control input-sm" id="commoncodeCd" >
					</div>
				</div>
				<div class="form-group col-md-p20">
					<div class="input-group input-group-sm">
						<span class="span-info  input-group-addon">공통코드명</span>
						<input type="text" class="form-control input-sm" id="commonCodeName" >
					</div>
				</div>
			</div>
			<!-- 중복되는 부분 -->
			<div class="search-button-group">
				<button type="button"  id="commonCodeSearchBtn" class="btn btn-sm btn-primary">
				<i class="fa fa-search"></i> 검색
				</button>
				<button type="button" id="commonCodeAddRowBtn" data-authRule="AUTH_NEW" class="btn btn-sm btn-info">
				<i class="fa fa-plus"></i> 행추가
				</button>
				<button type="button" id="commonCodeDelRowBtn" data-authRule="AUTH_DEL" class="btn btn-sm btn-danger">
				<i class="fa fa-minus"></i> 행삭제
				</button>
				<button type="button" id="commonCodeSaveRowBtn" data-authRule="AUTH_NEW AUTH_MOD AUTH_DEL" class="btn btn-sm btn-success">
				<i class="fa fa-download"></i> 저장
				</button>
			</div>
			<!-- </form> -->
	</div>
	<div class="grid-wrapper" >
		<table id="systemCodeGrid"  ></table>
		<div id="systemCodeGridNavi"  ></div>
	</div>
<script src="/js/views/settings/system/system_code.js"></script>
</body>
</html>