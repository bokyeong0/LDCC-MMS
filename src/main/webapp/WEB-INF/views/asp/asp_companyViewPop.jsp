<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
<body>
	<div class="modal-header">
		<button type="button" class="close" data-close-btn="ture">×</button>
		<h4 class="modal-title">ASP서비스회사 등록</h4>
	</div>
	<div class="modal-body">
		<div class="panel panel-inverse" >
			<div class="panel-body view-form">
				<div class="form-horizontal form-bordered min" id="aspCompanyViewPop">
					<div class="form-group">
						<label class="col-md-3 control-label">서비스코드</label>
						<div class="col-md-9 text-left form-control-static" id="aspCompanyViewPopCd"></div>
					</div>
					<div class="form-group">
						<label class="col-md-3 control-label">회사명</label>
						<div class="col-md-9 text-left form-control-static" id="aspCompanyViewPopNm"></div>
					</div>
					<div class="form-group">
						<label class="col-md-3 control-label">사업자등록번호</label>
						<div class="col-md-9 text-left form-control-static" id="aspCompanyViewPopCorpNum"></div>
					</div>
					<div class="form-group">
						<label class="col-md-3 control-label">대표자명</label>
						<div class="col-md-9 text-left form-control-static" id="aspCompanyViewPopCeoNm"></div>
					</div>
					<div class="form-group">
						<label class="col-md-3 control-label">관리자</label>
						<div class="col-md-9 text-left form-control-static" id="aspCompanyViewPopUserNm"></div>
					</div>
					<div class="form-group">
						<label class="col-md-3 control-label">연락처</label>
						<div class="col-md-9 text-left form-control-static" id="aspCompanyViewPopPhone"></div>
					</div>
					<div class="form-group">
						<label class="col-md-3 control-label">메모</label>
						<div class="col-md-9 text-left form-control-static" id="aspCompanyViewPopMemo"></div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="modal-footer" id="modal-footer">
		<a href="javascript:;" id="aspCompanyViewPopCloseBtn" class="btn btn-sm btn-white" data-close-btn="ture">닫기</a>
	</div>

	<script src="/js/views/asp/asp_companyViewPop.js"></script>
</body>
</html>
