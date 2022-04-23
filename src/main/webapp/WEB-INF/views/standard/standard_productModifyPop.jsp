<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
<body>
	<div class="modal-header">
		<button type="button" id="headerCloseBtn" class="close" data-close-btn="ture">×</button>
		<h6 class="modal-title">품목 수정</h6>
	</div>
	<div class="modal-body">
		<div class="panel panel-inverse">
			<div class="panel-body">
				<form class="form-horizontal" id="standardProductModifyPop" name="standardProductModifyPop">
					<div class="form-horizontal form-bordered min view-form">
						<div class="form-group">
							<label class="col-md-2 control-label">품목군</label>
							<div class="col-md-10 parsley-target">
								<div class="input-group" id="group1">
									<select class="form-control input-sm" id="standardProductModifyPopPrdTypeLv1">
									</select>
									<div class="input-group-btn">
										<button id="standardProductModifyPopPrdTypeLv1Btn" type="button" class="btn btn-primary btn-sm m-b-5">
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
									<select class="form-control input-sm" id="standardProductModifyPopPrdTypeLv2">
									</select>
									<div class="input-group-btn">
										<button id="standardProductModifyPopPrdTypeLv2Btn" type="button" class="btn btn-primary btn-sm m-b-5">
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
									<select class="form-control input-sm" id="standardProductModifyPopPrdTypeLv3">
									</select>
									<div class="input-group-btn">
										<button id="standardProductModifyPopPrdTypeLv3Btn" type="button" class="btn btn-primary btn-sm m-b-5">
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
									<select class="form-control input-sm" id="standardProductModifyPopPrdTypeLv4">
									</select>
									<div class="input-group-btn">
										<button id="standardProductModifyPopPrdTypeLv4Btn" type="button" class="btn btn-primary btn-sm m-b-5">
											<i class="fa fa-plus"></i>
										</button>
									</div>
								</div>
							</div>
						</div>
						<div class="form-group">
							<label class="col-md-2 control-label">품번</label>
							<div class="col-md-10">
								<input type="text" id="standardProductModifyPopPrdCd" class="form-control input-sm" />
							</div>
						</div>
						<div class="form-group">
							<label class="col-md-2 control-label">품명</label>
							<div class="col-md-10">
								<input type="text" id="standardProductModifyPopPrdNm" class="form-control input-sm" />
							</div>
						</div>
						<div class="form-group">
							<label class="col-md-2 control-label">규격</label>
							<div class="col-md-10">
								<input type="text" id="standardProductModifyPopPrdSpec" class="form-control input-sm" />
							</div>
						</div>
						<div class="form-group">
							<label class="col-md-2 control-label">단가</label>
							<div class="col-md-10">
								<input type="text" id="standardProductModifyPopPrdPrc" class="form-control input-sm" />
							</div>
						</div>
						<div class="form-group">
							<label class="col-md-2 control-label">장비 순번</label>
								<div class="col-md-10">
									<input type="text" id="standardProductModifyPopPrdOrder" class="form-control input-sm" />
							</div>
						</div>
						<div class="form-group">
							<label class="col-md-2 control-label">메모</label>
							<div class="col-md-10">
								<textarea rows="5" class="form-control input-sm" id="standardProductModifyPopMemo" style="resize: none;"></textarea>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
	
	<div class="modal-footer" id="modal-footer">
		<a href="javascript:;" id="standardProductModifyPopUpdateBtn" class="btn btn-sm btn-success" data-authRule="AUTH_SAVE">저장</a> 
		<a href="javascript:;" id="standardProductModifyPopDelBtn" class="btn btn-sm btn-danger" data-authRule="AUTH_DEL">삭제</a>
		<a href="javascript:;" id="standardProductModifyPopCloseBtn" class="btn btn-sm btn-white" data-close-btn="ture">닫기</a>
	</div>

<script src="/js/views/standard/standard_productModifyPop.js"></script>
</body>
</html>
