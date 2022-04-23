<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
<body>
	<div class="modal-header">
		<button type="button" id="headerCloseBtn" class="close" data-close-btn="ture">×</button>
		<h4 class="modal-title">고객사 상세보기</h4>
	</div>
	<div class="modal-body">
		<div class="panel-body view-form">
			<form class="form-horizontal form-bordered min" id="standardCompanyViewPop" name="standardCompanyViewPop">
				<div id="standardCompanyViewPopWizard">
					<ol>
						<li>고객사</li>
						<li>브랜드</li>
						<li>본사정보</li>
					</ol>
					<!-- begin wizard step-1 -->
					<div id="standardCompanyViewPopWizardCompany">
						<div class="form-horizontal form-bordered min view-form"> 
<!-- 							<div class="form-group"> -->
<!-- 								<label class="col-md-2 control-label">그룹분류</label> -->
<!-- 								<div class="col-md-10"> -->
<!-- 									<p class="form-control-static" id="standardCompanyViewPopCompCate"></p> -->
<!-- 								</div> -->
<!-- 							</div> -->
							<div class="form-group">
								<label class="col-md-2 control-label">고객유형</label>
								<div class="col-md-10">
									<p class="form-control-static" id="standardCompanyViewPopCompType"></p>
								</div>
							</div>
							<div class="form-group">
								<label class="col-md-2 control-label">고객사명</label>
								<div class="col-md-10">
									<p class="form-control-static" id="standardCompanyViewPopCompNm"></p>
								</div>
							</div>
							<div class="form-group">
								<label class="col-md-2 control-label">관리코드</label>
								<div class="col-md-10">
									<p class="form-control-static" id="standardCompanyViewPopMngCd"></p>
								</div>
							</div>
							<div class="form-group">
								<label class="col-md-2 control-label">메모</label>
								<div class="col-md-10">
									<p class="form-control-static" id="standardCompanyViewPopMemo"></p>
								</div>
							</div>
						</div>
					</div>

					<!--Step 2 -->
					<div id="standardCompanyViewPopWizardBrand">
						<div class="form-horizontal form-bordered min view-form"> 
							<div class="form-group">
								<label class="col-md-3 control-label">브랜드</label>
								<div class="col-md-9" id="tagsDiv">
									<ul id="standardCompanyViewPopBrnd" class="info">
									</ul>
								</div>
							</div>
						</div>
					</div>

					<!--Step 3 -->
					<div id="standardCompanyViewPopWizardStore">
						<div class="form-horizontal form-bordered min view-form">
<!-- 							<div class="form-group"> -->
<!-- 								<label class="col-md-2 control-label">고객코드</label> -->
<!-- 								<div class="col-md-4"> -->
<!-- 									<p class="form-control-static" id="standardCompanyViewPopMngCd"></p> -->
<!-- 								</div> -->
<!-- 							</div> -->
<!-- 							<div class="form-group"> -->
<!-- 								<label class="col-md-2 control-label">고객유형</label> -->
<!-- 								<div class="col-md-4"> -->
<!-- 									<p class="form-control-static" id="standardCompanyViewPopStrType"></p> -->
<!-- 								</div> -->
<!-- 								<label class="col-md-2 control-label">고객상태</label> -->
<!-- 								<div class="col-md-4"> -->
<!-- 									<p class="form-control-static" id="standardCompanyViewPopStrSt"></p> -->
<!-- 								</div> -->
<!-- 							</div> -->
							<div class="form-group">
								<label class="col-md-2 control-label">대표자명</label>
								<div class="col-md-10">
									<p class="form-control-static" id="standardCompanyViewPopCeoNm"></p>
								</div>
							</div>
							<div class="form-group">
								<label class="col-md-2 control-label">우편번호</label>
								<div class="col-md-10">
									<p class="form-control-static" id="standardCompanyViewPopZipCd"></p>
								</div>
<!-- 								<label class="col-md-2 control-label">권역</label> -->
<!-- 								<div class="col-md-4"> -->
<!-- 									<p class="form-control-static" id="standardCompanyViewPopAreaNm"></p> -->
<!-- 								</div> -->
							</div>
							<div class="form-group">
								<label class="col-md-2 control-label">주소</label>
								<div class="col-md-10">
									<p class="form-control-static" id="standardCompanyViewPopAddr1"></p>
									<p class="form-control-static" id="standardCompanyViewPopAddr2"></p>
								</div>
							</div>
							<div class="form-group">
								<label class="col-md-2 control-label">위도</label>
								<div class="col-md-4">
									<p class="form-control-static" id="standardCompanyViewPopStrX"></p>
								</div>
								<label class="col-md-2 control-label">경도</label>
								<div class="col-md-4">
									<p class="form-control-static" id="standardCompanyViewPopStrY"></p>
								</div>
							</div>
							<div class="form-group">
								<label class="col-md-2 control-label">대표전화</label>
								<div class="col-md-10">
									<p class="form-control-static" id="standardCompanyViewPopPhoneNum"></p>
								</div>
							</div>
							<div class="form-group">
								<label class="col-md-2 control-label">팩스번호</label>
								<div class="col-md-10">
									<p class="form-control-static" id="standardCompanyViewPopFaxNum"></p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
	
	<div class="modal-footer" id="modal-footer">
		<a href="javascript:;" id="standardCompanyViewPopCloseBtn" class="btn btn-sm btn-white" data-close-btn="ture">닫기</a>
	</div>

<script src="/js/views/standard/standard_companyViewPop.js"></script>
</body>
</html>
