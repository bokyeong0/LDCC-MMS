<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
<body>
<div class="" >
<ol class="breadcrumb pull-right"></ol>
<h1 class="page-header"></h1>
</div>
	<div class="search-form clearfix" >
           <!-- <form > -->
<!-- 			<div class="search-title-group m-r-10"> -->
<!-- 				<span class="label label-theme search-title"> -->
<!-- 					<i class="fa fa-search"></i>검색조건 -->
<!-- 				</span> -->
<!-- 			</div> -->
			<!-- 중복되는 부분 -->
			<div class="search-controls non-icon col-md-12" >
				<div data-lang="LC0001"  class="form-group col-md-p20">
					<div class="input-group input-group-sm">
						<span class="span-info  input-group-addon">프로그램코드</span>
						<input type="text" lang="" class="form-control input-sm" id="programCode" >
					</div>
				</div>
				<div class="form-group col-md-p20">
					<div class="input-group input-group-sm">
						<span class="span-info  input-group-addon">프로그램명</span>
						<input type="text" class="form-control input-sm" id="programName" >
					</div>
				</div>
			</div>
			<!-- 중복되는 부분 -->
			<div class="search-button-group">
				<button id="programSearchBtn" type="button"  class="btn btn-sm btn-primary">
				<i class="fa fa-search"></i> 검색
				</button>
				<button type="button" id="programAddRowBtn" class="btn btn-sm btn-info">
				<i class="fa fa-plus"></i> 행추가
				</button>
				<button type="button" id="programDelRowBtn" class="btn btn-sm btn-danger">
				<i class="fa fa-minus"></i> 행삭제
				</button>
<!-- 				<button type="button" id="programModGridBtn" data-btn-mod="nomal" class="btn btn-sm btn-success"> -->
<!-- 				<i class="fa fa-edit "></i> 수정 -->
<!-- 				</button> -->
				<button type="button" id="programSaveRowBtn"  class="btn btn-sm btn-success">
				<i class="fa fa-download"></i> 저장
				</button>
			</div>
			<!-- </form> -->
	</div>
	    
<div class="grid-wrapper" >
	<table id="systemProgramGrid"  ></table>
	<div id="systemProgramGridNavi"></div>
</div>
<script src="/js/views/settings/system/system_program.js"></script>
</body>
</html>