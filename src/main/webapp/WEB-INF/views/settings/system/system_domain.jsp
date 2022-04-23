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
<!-- 			<div class="search-title-group m-r-10"> -->
<!-- 				<span class="label label-theme search-title"> -->
<!-- 					<i class="fa fa-search"></i><i data-domain-id="SEARCH_TXT_LAB" >검색조건</i> -->
<!-- 				</span> -->
<!-- 			</div> -->
			<!-- 중복되는 부분 -->
			<div class="search-controls non-icon col-md-12" >
				<div class="form-group col-md-p20">
					<div class="input-group input-group-sm">
						<span class="span-info  input-group-addon">언어</span>
						<select id="systemDomainLangCd" class="form-control">
							<option value=""  data-domain-id="LANG"  >선택</option>
	                    </select>
                    </div>
				</div>
				<div class="form-group col-md-p20">
					<div class="input-group input-group-sm">	
						<span class="span-info  input-group-addon">유형</span>
						<select id="systemDomainType" class="form-control">
							<option value=""  data-domain-id="TYPE"  >선택</option>
	                    </select>
                    </div>
				</div>
				<div class="form-group col-md-p20">
					<div class="input-group input-group-sm">	
						<span class="span-info  input-group-addon">도메인ID</span>
						<input type="text" lang="" class="form-control input-sm" id="systemDomainId" >
					</div>
				</div>
				<div class="form-group col-md-p20">
					<div class="input-group input-group-sm">	
						<span class="span-info  input-group-addon">도메인명</span>
						<input type="text" class="form-control input-sm" id="systemDomainNm" >
					</div>
				</div>
			</div>
			<!-- 중복되는 부분 -->
			<div class="search-button-group">
				<button type="button" id="domainSearchBtn" class="btn btn-sm btn-primary">
				<i class="fa fa-search"></i> <i data-domain-id="SEARCH_BTN" >검색</i>
				</button>
				<button type="button" id="domainAddRowBtn" class="btn btn-sm btn-info">
				<i class="fa fa-plus"></i> <i data-domain-id="ADDROW_BTN" >행추가</i>
				</button>
				<button type="button" id="domainDelRowBtn" class="btn btn-sm btn-danger">
				<i class="fa fa-minus"></i> <i data-domain-id="DELROW_BTN" >행삭제</i>
				</button>
<!-- 				<button type="button" id="programModGridBtn" data-btn-mod="nomal" class="btn btn-sm btn-success"> -->
<!-- 				<i class="fa fa-edit "></i> 수정 -->
<!-- 				</button> -->
				<button type="button" id="domainSaveRowBtn"  class="btn btn-sm btn-success">
				<i class="fa fa-download"></i> <i data-domain-id="SAVE_BTN" >저장</i>
				</button>
			</div>
	</div>
	    
<div class="grid-wrapper" data-test="asdfasdf" >
	<table id="systemDomainGrid"  ></table>
	<div id="systemDomainGridNavi"></div>
</div>
<script src="/js/views/settings/system/system_domain.js"></script>
</body>
</html>