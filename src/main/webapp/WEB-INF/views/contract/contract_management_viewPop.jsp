<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
	<div class="modal-header" >
		<button type="button" class="close" data-close-btn="ture">×</button>
		<h4 class="modal-title">공지사항</h4>
	</div>
	<div class="modal-body">
<!-- 		<div class="panel panel-inverse" > -->
<!-- 			<ul id="stndStrSaveTab" class="nav nav-pills p-b-5 m-b-0 boder-line"> -->
<!-- 				<li class="active"><a id="stndStrSaveBasicBtn" href="#nav-str-tab-1" data-toggle="tab" aria-expanded="false">계약항목</a></li> -->
<!-- 				<li class=""><a id="stndStrSaveDetailBtn"  href="#nav-str-tab-2" data-toggle="tab" aria-expanded="false">자산</a></li> -->
<!-- 			</ul> -->
<!-- 			<div class="tab-content p-0 m-0 "> -->
<!-- 				<div class="tab-pane fade active in " id="nav-str-tab-1"> -->
		<div class="search-form clearfix" id="searchForm">
			<div id="prdDiv" class="search-controls non-icon col-md-12 p-l-0">
				<div class="form-group col-md-4 p-l-0 p-r-10">
					<div class="input-group input-group-sm">
						<span class="span-info  input-group-addon">제품범주</span>
						<select class="form-control" id="contarctMngViewPopPrdTypeLv1">
							<option value="">선택</option>
						</select>						
					</div>
				</div>		
				<div class="form-group col-md-4 p-l-0 p-r-10">
					<div class="input-group input-group-sm">
						<span class="span-info  input-group-addon">제품군</span>
						<select class="form-control" id="contarctMngViewPopPrdTypeLv2">
							<option value="">선택</option>
						</select>						
					</div>
				</div>		
			</div>
			<div class="search-button-group">
				<button type="button" id="contarctMngViewPopCfmBtn" class="btn btn-sm btn-info" data-authRule="AUTH_NEW AUTH_MOD AUTH_DEL">
					<i id="contarctMngViewPopCfm" class="fa fa-check"> 확정</i> 
				</button>
			</div>
		</div>
					
		<div class="grid-wrapper">
			<table id="contarctMngViewPopGrid"></table>
			<div id="contarctMngViewPopGridNavi"></div>
		</div>
<!-- 				</div> -->
<!-- 				<div class="tab-pane fade " id="nav-str-tab-2"> -->
<!-- 					<div class="search-form clearfix"> -->
<!-- 						<div class="search-controls non-icon col-md-12 p-l-0"> -->
<!-- 							<div class="form-group col-md-3"> -->
<!-- 								<div class="input-group input-group-sm"> -->
<!-- 									<span class="span-info  input-group-addon">포스번호</span> -->
<!-- 									<input type="text" class="form-control input-sm" id="contarctMngViewPopPosNo" > -->
<!-- 								</div> -->
<!-- 							</div> -->
							
<!-- 							<div class="form-group col-md-3"> -->
<!-- 								<div class="input-group input-group-sm" > -->
<!-- 									<span class="span-info  input-group-addon">계약여부</span> -->
<!-- 									<input type="text" class="form-control input-sm" id="contarctMngViewPopContractYn" > -->
<!-- 								</div> -->
<!-- 							</div> -->
							
<!-- 							<div class="form-group col-md-3"> -->
<!-- 								<div class="input-group input-group-sm"> -->
<!-- 									<span class="span-info  input-group-addon">점포명</span> -->
<!-- 									<select class="form-control" id="contarctMngViewPopStrNm"> -->
<!-- 									</select> -->
<!-- 								</div> -->
<!-- 							</div> -->
<!-- 							<div class="form-group col-md-3"> -->
<!-- 								<div class="input-group input-group-sm"> -->
<!-- 									<span class="span-info  input-group-addon">담당부서</span> -->
<!-- 									<input type="text" class="form-control input-sm" id="contarctMngViewPopAreaCd" > -->
<!-- 								</div> -->
<!-- 							</div> -->
<!-- 						</div> -->
			
<!-- 						<div class="search-controls non-icon col-md-12 m-t-0  p-l-0" >	 -->
<!-- 							<div class="form-group col-md-3"> -->
<!-- 								<div class="input-group input-group-sm"> -->
<!-- 									<span class="span-info  input-group-addon">제품군</span> -->
<!-- 									<select class="form-control" id="contarctMngViewPopPrdTypeLv2"> -->
<!-- 										<option value="">선택</option> -->
<!-- 									</select>						 -->
<!-- 								</div> -->
<!-- 							</div>		 -->
<!-- 							<div class="form-group col-md-3"> -->
<!-- 								<div class="input-group input-group-sm"> -->
<!-- 									<span class="span-info  input-group-addon">제조사</span> -->
<!-- 									<select class="form-control" id="contarctMngViewPopPrdTypeLv3"> -->
<!-- 										<option value="">선택</option> -->
<!-- 									</select>							 -->
<!-- 								</div> -->
<!-- 							</div> -->
<!-- 							<div class="form-group col-md-3"> -->
<!-- 								<div class="input-group input-group-sm"> -->
<!-- 									<span class="span-info  input-group-addon">모델명</span> -->
<!-- 									<select class="form-control" id="contarctMngViewPopPrdNm"> -->
<!-- 										<option value="">선택</option> -->
<!-- 									</select> -->
<!-- 								</div> -->
<!-- 							</div>		 -->
<!-- 						</div> -->
			
<!-- 						<div class="search-button-group"> -->
<!-- 							<button id="contarctMngViewPopDownloadExcel" type="button" class="btn btn-sm btn-success"> -->
<!-- 								<i class="fa fa-download"></i> EXCEL -->
<!-- 							</button> -->
<!-- 							<button id="contarctMngViewPopSearchBtn" type="button" class="btn btn-sm btn-primary"> -->
<!-- 								<i class="fa fa-search"></i> 검색 -->
<!-- 							</button> -->
<!-- 						</div> -->
<!-- 					</div> -->
<!-- 					<div class="grid-wrapper"> -->
<!-- 						<table id="contarctMngViewPopAstGrid"></table> -->
<!-- 						<div id="contarctMngViewPopGridAstNavi"></div> -->
<!-- 					</div> -->
<!-- 				</div> -->
<!-- 			</div> -->
<!-- 		</div> -->
	</div>
	
	<div class="modal-footer" id="modal-footer">
		<a href="javascript:;" id="contarctMngViewPopCloseBtn" class="btn btn-sm btn-white" data-close-btn="ture">닫기</a>
	</div>
	<script src="/js/views/contract/contract_management_viewPop.js"></script>
</html>