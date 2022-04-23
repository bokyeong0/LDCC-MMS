<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
<body>
	<div class="modal-header">
		<button type="button" class="close" data-close-btn="ture">×</button>
		<h4 class="modal-title">점포별 자산</h4>
	</div>
	<div class="modal-body">
		<div class="panel panel-inverse" >
			<ul id="stndStrSaveTab" class="nav nav-pills p-b-5 m-b-0 boder-line">
				<li class="active"><a id="stndStrSaveBasicBtn" href="#nav-str-tab-1" data-toggle="tab" aria-expanded="false">점포</a></li>
				<li class=""><a id="stndStrSaveDetailBtn"  href="#nav-str-tab-2" data-toggle="tab" aria-expanded="false">자산</a></li>
			</ul>
			<div class="tab-content p-0 m-0 ">
				<div class="tab-pane fade active in " id="nav-str-tab-1">
					<div class="search-form clearfix">
						<div class="search-controls non-icon col-md-12 p-l-0">
							<div class="form-group col-md-3">
								<div class="input-group input-group-sm">
									<span class="span-info  input-group-addon">브랜드</span>
									<select class="form-control" id="contarctMngStorePopBrndCd">
										<option value="">선택</option>
									</select>
								</div>
							</div>
							<div class="form-group col-md-3">
								<div class="input-group input-group-sm">
									<span class="span-info  input-group-addon">POS 대수</span>
									<select class="form-control" id="contarctMngStorePopPrdPosCnt">
										<option value="">전체</option>
									</select>
								</div>
							</div>
						</div>
						
						<div class="search-button-group">
							<button type="button" id="contarctMngStorePopCfmBtn" class="btn btn-sm btn-info" data-authRule="AUTH_SAVE">
								<i id="contarctMngStorePopCfm" class="fa fa-check"> 집계완료</i>
							</button>
						</div>
					</div>
					
					<div class="grid-wrapper">
						<table id="contarctMngStorePopGrid"></table>
						<div id="contarctMngStorePopGridNavi"></div>
					</div>
				</div>
				<div class="tab-pane fade " id="nav-str-tab-2">
					<div class="search-form clearfix">
						<div class="search-controls non-icon col-md-12 p-l-0">
							<div class="form-group col-md-3">
								<div class="input-group input-group-sm">
									<span class="span-info  input-group-addon">점포명</span>
									<input type="text" class="form-control input-sm" id="contarctMngStorePopStrNm" />
								</div>
							</div>
							<div class="form-group col-md-3">
								<div class="input-group input-group-sm">
									<span class="span-info  input-group-addon">담당부서</span>
									<select class="form-control" id="contarctMngStorePopAreaCd">
										<option value="">선택</option>
									</select>	
								</div>
							</div>
							<div class="form-group col-md-3">
								<div class="input-group input-group-sm" >
									<span class="span-info  input-group-addon">계약여부</span>
									<select class="form-control" id="contarctMngStorePopMaYn">
										<option value="">전체</option>
										<option value="Y">Y</option>
										<option value="N">N</option>
									</select>	
								</div>
							</div>
							<div class="form-group col-md-3">
								<div class="input-group input-group-sm" >
									<span class="span-info  input-group-addon">유상여부</span>
									<select class="form-control" id="contarctMngStorePopCostYn">
										<option value="">전체</option>
										<option value="Y">Y</option>
									</select>	
								</div>
							</div>
						</div>
						
						<div class="search-button-group">
							<button type="button" id="contarctMngStorePopSearchBtn" class="btn btn-sm btn-primary">
								<i class="fa fa-search"> 검색</i>
							</button>
							<button type="button" id="contarctMngStorePopAstSaveBtn" class="btn btn-sm btn-danger" data-authRule="AUTH_SAVE">
								<i class="fa fa-download"> 변경사항적용</i>
							</button>
						</div>
					</div>
					
					<div class="grid-wrapper">
						<table id="contarctMngStorePopAstGrid"></table>
						<div id="contarctMngStorePopAstGridNavi"></div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="modal-footer" id="modal-footer">
		<a href="javascript:;" id="contarctMngStorePopCloseBtn" class="btn btn-sm btn-white" data-close-btn="ture">닫기</a>
	</div>
	<script src="/js/views/contract/contract_management_storePop.js"></script>
</body>
</html>