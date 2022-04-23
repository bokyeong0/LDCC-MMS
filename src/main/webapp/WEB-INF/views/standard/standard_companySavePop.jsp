<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
<body>
	<div class="modal-header">
		<button type="button" id="headerCloseBtn" class="close" data-close-btn="ture">×</button>
		<h4 class="modal-title">고객사 등록</h4>
	</div>
	<div class="modal-body p-b-0">
		<div class="panel panel-inverse m-b-0">
			<div class="panel-body p-0">
				<form class="form-horizontal" id="standardCompanySavePop" name="standardCompanySavePop">
					<div id="standardCompanySavePopWizard">
						<ol>
							<li>고객사 등록</li>
							<li>브랜드 등록</li>
							<li>본사정보 등록</li>
						</ol>
						<!-- begin wizard step-1 -->
						<div id="standardCompanySavePopWizardCompany">
							<div class="form-horizontal form-bordered min view-form">
								<div class="form-group">
									<label class="col-md-2 control-label">그룹분류</label>
									<div class="col-md-10">
										<select class="form-control input-sm" id="standardCompanySavePopCompCate">
										</select>
									</div>
								</div>
								<div class="form-group">
									<label class="col-md-2 control-label">고객유형</label>
									<div class="col-md-10">
										<select class="form-control input-sm" id="standardCompanySavePopCompType">
										</select>
									</div>
								</div>
								<div class="form-group">
									<label class="col-md-2 control-label">고객사명</label>
									<div class="col-md-10">
										<input type="text" id="standardCompanySavePopCompNm" class="form-control input-sm" />
									</div>
								</div>
								<div class="form-group">
									<label class="col-md-2 control-label">관리코드</label>
									<div class="col-md-10">
										<input type="text" id="standardCompanySavePopMngCd" class="form-control input-sm" />
									</div>
								</div>
								<div class="form-group">
									<label class="col-md-2 control-label">메모</label>
									<div class="col-md-10">
										<textarea rows="5" class="form-control input-sm" id="standardCompanySavePopMemo" style="resize: none;"></textarea>
									</div>
								</div>
							</div>
						</div>

						<!--Step 2 -->
						<div id="standardCompanySavePopWizardBrand">
							<div class="form-horizontal form-bordered min view-form">
								<div class="form-group">
									<label class="control-label col-md-3">브랜드 등록</label>
									<div class="col-md-9">
										<ul id="standardCompanySavePopBrndNm" class="info">
										</ul>
									</div>
								</div>
							</div>
						</div>

						<!--Step 3 -->
						<div id="standardCompanySavePopWizardStore">
							<div class="form-horizontal form-bordered min view-form">
<!-- 								<div class="form-group"> -->
<!-- 									<label class="col-md-2 control-label">고객코드</label> -->
<!-- 									<div class="col-md-4"> -->
<!-- 									<input type="text" id="standardCompanySavePopStrMngCd" class="form-control input-sm" /> -->
<!-- 									</div> -->
<!-- 								</div> -->
<!-- 								<div class="form-group"> -->
<!-- 									<label class="col-md-2 control-label">고객유형</label> -->
<!-- 									<div class="col-md-4"> -->
<!-- 										<select class="form-control input-sm" id="standardCompanySavePopStrType"> -->
<!-- 										</select> -->
<!-- 									</div> -->
<!-- 									<label class="col-md-2 control-label">고객상태</label> -->
<!-- 									<div class="col-md-4"> -->
<!-- 										<select class="form-control input-sm" id="standardCompanySavePopStrSt"> -->
<!-- 										</select> -->
<!-- 									</div> -->
<!-- 								</div> -->
<!-- 								<div class="form-group"> -->
<!-- 									<label class="col-md-2 control-label">사업자 번호</label> -->
<!-- 									<div class="col-md-10"> -->
<!-- 										<input type="text" id="standardCompanySavePopStrCorpNum" class="form-control input-sm" /> -->
<!-- 									</div> -->
<!-- 								</div> -->
<!-- 								<div class="form-group"> -->
<!-- 									<label class="col-md-2 control-label">Site 이름</label> -->
<!-- 									<div class="col-md-10"> -->
<!-- 										<input type="text" id="standardCompanySavePopStrNm" class="form-control input-sm" readOnly/> -->
<!-- 									</div> -->
<!-- 								</div> -->
								<div class="form-group">
									<label class="col-md-2 control-label">대표자명</label>
									<div class="col-md-10">
										<input type="text" id="standardCompanySavePopStrCeoNm" class="form-control input-sm" />
									</div>
								</div>
	
								<div class="form-group">
									<label class="col-md-2 control-label">우편번호</label>
									<div class="col-md-3">
										<div class="input-group">
											<input type="text" class="form-control input-sm postcodify_postcode5" id="standardCompanySavePopStrZipCd" readonly>
											<div class="input-group-btn">
												<button id="standardCompanySavePopStrZipCdBtn" type="button" class="btn btn-primary  btn-sm">
													<i class="fa fa-search"></i>
												</button>
											</div>
										</div>
									</div>
<!-- 									<div class="col-md-7"> -->
<!-- 										<select class="form-control input-sm" id="standardCompanySavePopStrAreaNm"> -->
<!-- 											<option value="">지역선택</option> -->
<!-- 										</select> -->
<!-- 									</div> -->
								</div>
								<div class="form-group">
									<label class="col-md-2 control-label">주소</label>
									<div class="col-md-10">
										<input type="text" id="standardCompanySavePopStrAddr1" class="form-control input-sm m-b-3 postcodify_address" readonly />
										<input type="text" id="standardCompanySavePopStrAddr2" class="form-control input-sm m-b-3 postcodify_details" />
										<input type="text" id="standardCompanySavePopStrAddrExt" class="form-control input-sm postcodify_extra_info" readonly />
									</div>
								</div>
								<div class="form-group">
									<label class="col-md-2 control-label">위치좌표</label>
									<div class="col-md-3 p-l-5">
										<label class="col-md-3 p-r-5 p-l-1 control-label">위도</label>
										<div class="col-md-9 p-r-1 p-l-1">
											<input type="text" id="standardCompanySavePopStrX" class="form-control input-sm"/>
										</div> 
									</div>
									<div class="col-md-3">
										<label class="col-md-3 p-r-5 p-l-1 control-label">경도</label>
										<div class="col-md-9 p-r-1 p-l-1">
											<input type="text" id="standardCompanySavePopStrY" class="form-control input-sm"/>
										</div> 
									</div>
									<div class="col-md-4">
										<button id="standardCompanySavePopGetStrXYBtn" type="button" class="btn btn-link">
											주소로 위도 경도 가져오기
										</button>
									</div>
								</div>
								<div class="form-group">
									<label class="col-md-2 control-label">대표전화</label>
									<div class="col-md-10">
										<input type="text" id="standardCompanySavePopStrPhoneNum" class="form-control input-sm" />
									</div>
								</div>
								<div class="form-group">
									<label class="col-md-2 control-label">팩스번호</label>
									<div class="col-md-10">
										<input type="text" id="standardCompanySavePopStrFaxNum" class="form-control input-sm" />
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
		<a href="javascript:;" id="standardCompanySavePopSaveBtn" class="btn btn-sm btn-success" data-authRule="AUTH_SAVE">저장</a> 
		<a href="javascript:;" id="standardCompanySavePopCloseBtn" class="btn btn-sm btn-white" data-close-btn="ture">닫기</a>
	</div>

<script src="/js/views/standard/standard_companySavePop.js"></script>
</body>
</html>
