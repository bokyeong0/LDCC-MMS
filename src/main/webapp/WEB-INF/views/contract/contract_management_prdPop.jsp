<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
	<div class="modal-header" >
		<button type="button" class="close" data-close-btn="ture">×</button>
		<h4 class="modal-title">품목별 자산</h4>
	</div>
	<div class="modal-body">
		<div class="search-form clearfix">
			<div class="search-controls non-icon col-md-12 p-l-0">
				<div class="form-group col-md-3">
					<div class="input-group input-group-sm">
						<span class="span-info  input-group-addon">제품범주</span>
						<select class="form-control" id="contarctMngPrdPopPrdTypeLv1">
							<option value="">선택</option>
						</select>						
					</div>
				</div>		
				<div class="form-group col-md-3">
					<div class="input-group input-group-sm">
						<span class="span-info  input-group-addon">제품군</span>
						<select class="form-control" id="contarctMngPrdPopPrdTypeLv2">
							<option value="">선택</option>
						</select>						
					</div>
				</div>		
				<div class="form-group col-md-3">
					<div class="input-group input-group-sm" >
						<span class="span-info  input-group-addon">계약여부</span>
						<select class="form-control" id="contarctMngPrdPopMaYn">
							<option value="">전체</option>
							<option value="Y">Y</option>
							<option value="N">N</option>
						</select>	
					</div>
				</div>
				<div class="form-group col-md-3">
					<div class="input-group input-group-sm" >
						<span class="span-info  input-group-addon">유상여부</span>
						<select class="form-control" id="contarctMngPrdPopCostYn">
							<option value="">전체</option>
							<option value="Y">Y</option>
						</select>	
					</div>
				</div>
			</div>
			<div class="search-controls non-icon col-md-12 p-l-0">
				<div class="form-group col-md-3">
					<div class="input-group input-group-sm">
						<span class="span-info  input-group-addon">브랜드</span>
						<select class="form-control" id="contarctMngPrdPopBrndCd">
							<option value="">선택</option>
						</select>						
					</div>
				</div>	
				<div class="form-group col-md-3">
					<div class="input-group input-group-sm">
						<span class="span-info  input-group-addon">점포명</span>
						<input type="text" class="form-control input-sm" id="contarctMngPrdPopStrNm" />
					</div>
				</div>
				<div class="form-group col-md-3">
					<div class="input-group input-group-sm">
						<span class="span-info  input-group-addon">담당부서</span>
						<select class="form-control" id="contarctMngPrdPopAreaCd">
							<option value="">선택</option>
						</select>	
					</div>
				</div>
			</div>
			
			<div class="search-button-group">
				<button type="button" id="contarctMngPrdPopSearchBtn" class="btn btn-sm btn-primary">
					<i class="fa fa-search"> 검색</i>
				</button>
				<button type="button" id="contarctMngAstSaveBtn" class="btn btn-sm btn-danger" data-authRule="AUTH_SAVE">
					<i class="fa fa-download"> 변경사항적용</i>
				</button>
				<button type="button" id="contarctMngPrdPopCfmBtn" class="btn btn-sm btn-info" data-authRule="AUTH_SAVE">
					<i id="contarctMngPrdPopCfm" class="fa fa-check"> 집계완료</i>
				</button>
			</div>
		</div>
		
		<div class="grid-wrapper">
			<table id="contarctMngPrdPopGrid"></table>
			<div id="contarctMngPrdPopGridNavi"></div>
		</div>
	</div>
	
	<div class="modal-footer" id="modal-footer">
		<a href="javascript:;" id="contarctMngPrdPopCloseBtn" class="btn btn-sm btn-white" data-close-btn="ture">닫기</a>
	</div>
	<script src="/js/views/contract/contract_management_prdPop.js"></script>
</html>