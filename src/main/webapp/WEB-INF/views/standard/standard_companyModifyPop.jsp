<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
<body>
	<div class="modal-header">
		<button type="button" id="headerCloseBtn" class="close" data-close-btn="ture">×</button>
		<h4 class="modal-title">고객사 수정</h4>
	</div>
	<div class="modal-body">
		<div class="panel panel-inverse">
			<div class="panel-body">
				<form class="form-horizontal" id="standardCompanyModifyPop" name="standardCompanyModifyPop">
					<div id="standardCompanyModifyPopWizard">
						<ol>
							<li>고객사 수정</li>
							<li>브랜드 수정</li>
							<li>본사정보 수정</li>
						</ol>
						<!-- begin wizard step-1 -->
						<div id="standardCompanyModifyPopWizardCompany" class="form-horizontal form-bordered min view-form">
<!-- 							<div class="form-group"> -->
<!-- 								<label class="col-md-2 control-label">기업분류</label> -->
<!-- 								<div class="col-md-10"> -->
<!-- 									<select class="form-control input-sm" id="standardCompanyModifyPopCompCate"> -->
<!-- 									</select> -->
<!-- 								</div> -->
<!-- 							</div> -->
							<div class="form-group">
								<label class="col-md-2 control-label">고객유형</label>
								<div class="col-md-10">
									<select class="form-control input-sm" id="standardCompanyModifyPopCompType">
									</select>
								</div>
							</div>
							<div class="form-group">
								<label class="col-md-2 control-label">회사명</label>
								<div class="col-md-10">
									<input type="text" id="standardCompanyModifyPopCompNm" class="form-control input-sm" />
								</div>
							</div>
							<div class="form-group">
								<label class="col-md-2 control-label">관리코드</label>
								<div class="col-md-10">
									<input type="text" id="standardCompanyModifyPopMngCd" class="form-control input-sm" />
								</div>
							</div>
							<div class="form-group">
								<label class="col-md-2 control-label">메모</label>
								<div class="col-md-10">
									<textarea rows="5" class="form-control input-sm" id="standardCompanyModifyPopMemo" style="resize: none;"></textarea>
								</div>
							</div>
						</div>

						<!--Step 2 -->
						<div id="standardCompanyModifyPopWizardBrand">
							<div class="form-horizontal form-bordered min view-form">
								<div class="form-group">
									<label class="col-md-3 control-label">브랜드 등록</label>
									<div class="col-md-9" id="tagsDiv">
										<ul id="standardCompanyModifyPopBrnd" class="info">
										</ul>
									</div>
								</div>
							</div>
						</div>

						<!--Step 3 -->
						<div id="standardCompanyModifyPopWizardStore">
							<div class="form-horizontal form-bordered min view-form">
<!-- 								<div class="form-group"> -->
<!-- 									<label class="col-md-2 control-label">고객코드</label> -->
									
<!-- 									<div class="col-md-4"> -->
<!-- 										<input type="text" id="standardCompanyModifyPopStrMngCd" class="form-control input-sm" /> -->
<!-- 									</div> -->
<!-- 								</div> -->
<!-- 								<div class="form-group"> -->
<!-- 									<label class="col-md-2 control-label">고객유형</label> -->
<!-- 									<div class="col-md-4"> -->
<!-- 										<select class="form-control input-sm" id="standardCompanyModifyPopStrType"> -->
<!-- 											<option value="">없음</option> -->
<!-- 										</select> -->
<!-- 									</div> -->
<!-- 									<label class="col-md-2 control-label">고객상태</label> -->
<!-- 										<div class="col-md-4"> -->
<!-- 										<select class="form-control input-sm" id="standardCompanyModifyPopStrSt"> -->
<!-- 										</select> -->
<!-- 									</div> -->
<!-- 								</div> -->
<!-- 								<div class="form-group"> -->
<!-- 									<label class="col-md-2 control-label">사업자 번호</label> -->
<!-- 									<div class="col-md-10"> -->
<!-- 										<input type="text" id="standardCompanyModifyPopStrCorpNum" class="form-control input-sm" /> -->
<!-- 									</div> -->
<!-- 								</div> -->
<!-- 								<div class="form-group"> -->
<!-- 									<label class="col-md-2 control-label">고객사명</label> -->
<!-- 									<div class="col-md-10"> -->
<!-- 										<input type="text" id="standardCompanyModifyPopStrNm" class="form-control input-sm" readonly/> -->
<!-- 									</div> -->
<!-- 								</div> -->
								<div class="form-group">
									<label class="col-md-2 control-label">대표자명</label>
									<div class="col-md-10">
										<input type="text" id="standardCompanyModifyPopStrCeoNm" class="form-control input-sm"/>
									</div>
								</div>
								<div class="form-group">
									<label class="col-md-2 control-label">우편번호</label>
									<div class="col-md-3">
										<div class="input-group">
											<input type="text" class="form-control input-sm postcodify_postcode5" id="standardCompanyModifyPopStrZipCd" readonly>
											<div class="input-group-btn">
												<button id="standardCompanyModifyPopStrZipCdBtn" type="button" class="btn btn-primary  btn-sm">
													<i class="fa fa-search"></i>
												</button>
											</div>
										</div>
									</div>
<!-- 									<div class="col-md-7"> -->
<!-- 										<select class="form-control input-sm" id="standardCompanyModifyPopStrAreaNm"> -->
<!-- 											<option value="">지역선택</option> -->
<!-- 										</select> -->
<!-- 									</div> -->
								</div>
								<div class="form-group">
									<label class="col-md-2 control-label">주소</label>
									<div class="col-md-10">
										<input type="text" id="standardCompanyModifyPopStrAddr1" class="form-control input-sm m-b-3 postcodify_address" readonly />
										<input type="text" id="standardCompanyModifyPopStrAddr2" class="form-control input-sm m-b-3 postcodify_details" />
										<input type="text" id="standardCompanyModifyPopStrAddrExt" class="form-control input-sm postcodify_extra_info" readonly />
									</div>
								</div>
								<div class="form-group">
									<label class="col-md-2 control-label">위치좌표</label>
									<div class="col-md-3 p-l-5">
										<label class="col-md-3 p-r-5 p-l-1 control-label">위도</label>
										<div class="col-md-9 p-r-1 p-l-1">
											<input type="text" id="standardCompanyModifyPopStrX" class="form-control input-sm"/>
										</div> 
									</div>
									<div class="col-md-3">
										<label class="col-md-3 p-r-5 p-l-1 control-label">경도</label>
										<div class="col-md-9 p-r-1 p-l-1">
											<input type="text" id="standardCompanyModifyPopStrY" class="form-control input-sm"/>
										</div> 
									</div>
									<div class="col-md-4">
										<button id="standardCompanyModifyPopGetStrXYBtn" type="button" class="btn btn-link">
											주소로 위도 경도 가져오기
										</button>
									</div>
								</div>
								<div class="form-group">
									<label class="col-md-2 control-label">대표전화</label>
									<div class="col-md-10">
										<input type="text" id="standardCompanyModifyPopStrPhoneNum" class="form-control input-sm" />
									</div>
								</div>
								<div class="form-group">
									<label class="col-md-2 control-label">팩스번호</label>
									<div class="col-md-10">
										<input type="text" id="standardCompanyModifyPopStrFaxNum" class="form-control input-sm" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
	
	<div class="modal-footer" id="modal-footer">
		<a href="javascript:;" id="standardCompanyModifyPopUpdateBtn" class="btn btn-sm btn-success" data-authRule="AUTH_SAVE">저장</a> 
		<a href="javascript:;" id="standardCompanyModifyPopDelBtn" class="btn btn-sm btn-danger" data-authRule="AUTH_DEL">삭제</a>
		<a href="javascript:;" id="standardCompanyModifyPopCloseBtn" class="btn btn-sm btn-white" data-close-btn="ture">닫기</a>
	</div>

<script src="/js/views/standard/standard_companyModifyPop.js"></script>
</body>
</html>
