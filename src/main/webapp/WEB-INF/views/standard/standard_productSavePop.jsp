<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
<body>
	<div class="modal-header">
		<button type="button" id="headerCloseBtn" class="close" data-close-btn="ture">×</button>
		<h6 class="modal-title">장비등록</h6>
	</div>
	<div class="modal-body">
		<div class="panel panel-inverse">
			<div class="panel-body">
				<form class="form-horizontal" id="standardProductSavePop" name="standardProductSavePop">
					<div class="form-horizontal form-bordered min view-form">
						<div class="form-group">
							<label class="col-md-2 control-label">품목군</label>
							<div class="col-md-10 parsley-target">
								<div class="input-group" id="group1">
									<select class="form-control input-sm" id="standardProductSavePopPrdTypeLv1">
									</select>
									<div class="input-group-btn">
										<button id="standardProductSavePopPrdTypeLv1Btn" type="button" class="btn btn-primary btn-sm m-b-5">
											<i class="fa fa-plus"></i>
										</button>
									</div>
								</div>
							</div>
						</div>
						<div class="form-group">
							<label class="col-md-2 control-label">대분류</label>
							<div class="col-md-10 parsley-target">
								<div class="input-group" id="group2">
									<select class="form-control input-sm" id="standardProductSavePopPrdTypeLv2">
									</select>
									<div class="input-group-btn">
										<button id="standardProductSavePopPrdTypeLv2Btn" type="button" class="btn btn-primary btn-sm m-b-5">
											<i class="fa fa-plus"></i>
										</button>
									</div>
								</div>
							</div>
						</div>
						<div class="form-group">
							<label class="col-md-2 control-label">중분류</label>
							<div class="col-md-10 parsley-target">
								<div class="input-group" id="group2">
									<select class="form-control input-sm" id="standardProductSavePopPrdTypeLv3">
									</select>
									<div class="input-group-btn">
										<button id="standardProductSavePopPrdTypeLv3Btn" type="button" class="btn btn-primary btn-sm m-b-5">
											<i class="fa fa-plus"></i>
										</button>
									</div>
								</div>
							</div>
						</div>
						<div class="form-group">
							<label class="col-md-2 control-label">소분류</label>
							<div class="col-md-10 parsley-target">
								<div class="input-group" id="group2">
									<select class="form-control input-sm" id="standardProductSavePopPrdTypeLv4">
									</select>
									<div class="input-group-btn">
										<button id="standardProductSavePopPrdTypeLv4Btn" type="button" class="btn btn-primary btn-sm m-b-5">
											<i class="fa fa-plus"></i>
										</button>
									</div>
								</div>
							</div>
						</div>
						<div class="form-group">
							<label class="col-md-2 control-label">품번</label>
							<div class="col-md-10">
								<input type="text" id="standardProductSavePopPrdCd" class="form-control input-sm" />
							</div>
						</div>
						<div class="form-group">
							<label class="col-md-2 control-label">품명</label>
							<div class="col-md-10">
								<input type="text" id="standardProductSavePopPrdNm" class="form-control input-sm" />
							</div>
						</div>
						<div class="form-group">
							<label class="col-md-2 control-label">규격</label>
							<div class="col-md-10">
								<input type="text" id="standardProductSavePopPrdSpec" class="form-control input-sm" />
							</div>
						</div>
						<div class="form-group">
							<label class="col-md-2 control-label">단가</label>
							<div class="col-md-10">
								<input type="text" id="standardProductSavePopPrdPrc" class="form-control input-sm" />
							</div>
						</div>
						<div class="form-group">
							<label class="col-md-2 control-label">장비 순번</label>
								<div class="col-md-10">
									<input type="text" id="standardProductSavePopPrdOrder" class="form-control input-sm" />
							</div>
						</div>
						<div class="form-group">
							<label class="col-md-2 control-label">메모</label>
							<div class="col-md-10">
								<textarea rows="5" class="form-control input-sm" id="standardProductSavePopMemo" style="resize: none;"></textarea>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
	
	<div class="modal-footer" id="modal-footer">
		<a href="javascript:;" id="standardProductSavePopSaveBtn" class="btn btn-sm btn-success" data-authRule="AUTH_SAVE">저장</a> 
		<a href="javascript:;" id="standardProductSavePopCloseBtn" class="btn btn-sm btn-white" data-close-btn="ture">닫기</a>
	</div>

<script src="/js/views/standard/standard_productSavePop.js"></script>
</body>
</html>
