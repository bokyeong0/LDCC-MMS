<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
<body>
	<div class="modal-header">
		<button type="button" id="headerCloseBtn" class="close" data-close-btn="ture">×</button>
		<h6 class="modal-title">장비 상세보기</h6>
	</div>
	<div class="modal-body">
		<div class="panel panel-inverse">
			<div class="panel-body view-form">
				<form class="form-horizontal form-bordered min" id="standardProductViewPop" name="standardProductViewPop">
					<div class="form-group">
						<label class="col-md-2 control-label">품목군</label>
						<div class="col-md-10">
							<p class="form-control-static" id="standardProductViewPopPrdTypeLv1"></p>
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-2 control-label">대분류</label>
						<div class="col-md-10">
							<p class="form-control-static" id="standardProductViewPopPrdTypeLv2"></p>
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-2 control-label">중분류</label>
						<div class="col-md-10">
							<p class="form-control-static" id="standardProductViewPopPrdTypeLv3"></p>
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-2 control-label">소분류</label>
							<div class="col-md-10">
							<p class="form-control-static" id="standardProductViewPopPrdTypeLv4"></p>
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-2 control-label">품번</label>
						<div class="col-md-10">
							<p class="form-control-static" id="standardProductViewPopPrdCd"></p>
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-2 control-label">품명</label>
						<div class="col-md-10">
							<p class="form-control-static" id="standardProductViewPopPrdNm"></p>
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-2 control-label">규격</label>
						<div class="col-md-10">
							<p class="form-control-static" id="standardProductViewPopPrdSpec"></p>
						</div>
					</div>
					
					<div class="form-group">
						<label class="col-md-2 control-label">단가</label>
						<div class="col-md-10">
							<p class="form-control-static" id="standardProductViewPopPrdPrc"></p>
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-2 control-label">장비순번</label>
						<div class="col-md-10">
							<p class="form-control-static" id="standardProductViewPopPrdOrder"></p>
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-2 control-label">메모</label>
						<div class="col-md-10 text-left " >
					        <textarea class="form-control rezise-off" readonly placeholder="내용" rows="3"  id="standardProductViewPopMemo"></textarea>
				        </div>
					</div>

				</form>
			</div>
		</div>
	</div>
	
	<div class="modal-footer" id="modal-footer">
		<a href="javascript:;" id="standardProductViewPopCloseBtn" class="btn btn-sm btn-white" data-close-btn="ture">닫기</a>
	</div>

<script src="/js/views/standard/standard_productViewPop.js"></script>
</body>
</html>
