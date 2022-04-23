<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
<body>
	<div class="modal-header">
		<button type="button" class="close" data-close-btn="ture">×</button>
		<h4 class="modal-title">점포 등록</h4>
	</div>
	<div class="modal-body">
		<div class="panel panel-inverse" >
			<ul id="stndStrSaveTab" class="nav nav-pills p-b-5 m-b-0 boder-line">
				<li class="active"><a id="stndStrSaveBasicBtn" href="#nav-str-tab-1" data-toggle="tab" aria-expanded="false">점포 기본정보</a></li>
				<li class=""><a id="stndStrSaveDetailBtn"  href="#nav-str-tab-2" data-toggle="tab" aria-expanded="false">점포 상세정보</a></li>
			</ul>
			<div class="tab-content p-0 m-0 ">
				<div class="tab-pane fade active in " id="nav-str-tab-1">
					<div class="panel-body view-form">
						<form class="form-horizontal form-bordered min" id="standardStoreSavePop">
							<div class="form-group">
								<label class="col-md-2 control-label">점포 분류</label>
								<div class="col-md-3">
									<select class="form-control input-sm" id="standardStoreSavePopCompCate">
										<option value="">그룹분류</option>
									</select>
								</div>
								<div class="col-md-4">
									<select class="form-control input-sm" id="standardStoreSavePopCompNm">
										<option value="">고객사명</option>
									</select>
								</div>
								<div class="col-md-3">
									<select class="form-control input-sm" id="standardStoreSavePopBrndNm">
										<option value="">브랜드명</option>
									</select>
								</div>
							</div>
							<div class="form-group">
								<label class="col-md-2 control-label">점포유형</label>
								<div class="col-md-4">
									<select class="form-control input-sm" id="standardStoreSavePopStrType">
									</select>
								</div>
								<label class="col-md-2 control-label">점포형태</label>
								<div class="col-md-4">
									<select class="form-control input-sm" id="standardStoreSavePopStrSt">
									</select>
								</div>
							</div>
							<div class="form-group">
								<label class="col-md-2 control-label">사업자번호</label>
								<div class="col-md-4">
									<input type="text" id="standardStoreSavePopCorpNum" class="form-control input-sm" />
								</div>
								
								<label class="col-md-2 control-label">점포코드</label>
								<div class="col-md-4">
										<input type="text" id="standardStoreSavePopMngCd" class="form-control input-sm" />
								</div>
							</div>
							<div class="form-group">
								<label class="col-md-2 control-label">점포 이름</label>
								<div class="col-md-10">
									<input type="text" id="standardStoreSavePopStrNm" class="form-control input-sm" />
								</div>
							</div>
							<div class="form-group">
								<label class="col-md-2 control-label">대표자명</label>
								<div class="col-md-10">
									<input type="text" id="standardStoreSavePopCeoNm" class="form-control input-sm" />
								</div>
							</div>
							<div class="form-group">
								<label class="col-md-2 control-label">우편번호</label>
								<div class="col-md-4">
									<div class="input-group">
										<input type="text" class="form-control input-sm postcodify_postcode5" id="standardStoreSavePopZipCd" readonly>
										<div class="input-group-btn">
											<button id="standardStoreSavePopZipCdBtn" type="button" class="btn btn-primary btn-sm">
												<i class="fa fa-search"></i>
											</button>
										</div>
									</div>
								</div>
								<label class="col-md-2 control-label">지역</label>
								<div class="col-md-4">
									<div class="input-group">
										<input type="hidden" id="standardStoreSavePopAreaSeq">
										<input type="text" class="form-control input-sm" id="standardStoreSavePopAreaNm" readonly>
										<div class="input-group-btn">
											<button id="standardStoreSavePopAreaBtn" type="button" class="btn btn-primary btn-sm">
												<i class="fa fa-search"></i>
											</button>
										</div>
									</div>
								</div>
							</div>
							<div class="form-group">
								<label class="col-md-2 control-label">주소</label>
								<div class="col-md-10">
									<input type="text" id="standardStoreSavePopAddr1" class="form-control input-sm m-b-3 postcodify_address" readonly /> 
									<input type="text" id="standardStoreSavePopAddr2" class="form-control input-sm m-b-3 postcodify_details" /> 
									<input type="text" id="standardStoreSavePopAddrExt" class="form-control input-sm postcodify_extra_info" readonly />
								</div>
							</div>
							<div class="form-group">
								<label class="col-md-2 control-label">위치좌표</label>
								<div class="col-md-3 p-l-5">
									<label class="col-md-3 p-r-5 p-l-1 control-label">위도</label>
									<div class="col-md-9 p-r-1 p-l-1">
										<input type="text" id="standardStoreSavePopStrX" class="form-control input-sm" size="20"/>
									</div> 
								</div>
								<div class="col-md-3">
									<label class="col-md-3 p-r-5 p-l-1 control-label">경도</label>
									<div class="col-md-9 p-r-1 p-l-1">
										<input type="text" id="standardStoreSavePopStrY" class="form-control input-sm" size="20"/>
									</div> 
								</div>
								<div class="col-md-4">
									<button id="standardStoreSavePopGetStrXYBtn" type="button" class="btn btn-link">
										주소로 위도 경도 가져오기
									</button>
								</div>
							</div>
							<div class="form-group">
								<label class="col-md-2 control-label">대표전화</label>
								<div class="col-md-10">
									<input type="text" id="standardStoreSavePopPhoneNum" class="form-control input-sm" />
								</div>
							</div>
							<div class="form-group">
								<label class="col-md-2 control-label">팩스번호</label>
								<div class="col-md-10">
									<input type="text" id="standardStoreSavePopFaxNum" class="form-control input-sm" />
								</div>
							</div>
							<div class="form-group">
								<label class="col-md-2 control-label">비고</label>
								<div class="col-md-10">
									<textarea rows="5" class="form-control input-sm"
										id="standardStoreSavePopBigo" style="resize: none;"></textarea>
								</div>
							</div>
						</form>
					</div>
				</div>
				<div class="tab-pane fade " id="nav-str-tab-2">
					<div class="panel-body view-form">
						<form class="form-horizontal form-bordered min" id="standardStoreSavePop">
						    <div class="form-group">
						        <label class="col-md-2 control-label">오픈일자</label>
						        <div class="col-md-10" >
						        	<input type="text" id="standardStoreSavePopOpenDt" class="form-control input-sm" />
						        </div>
						    </div>
						    <div class="form-group">
						        <label class="col-md-2 control-label">리뉴얼</label>
						        <div class="col-md-10" >
						        	<input type="text" id="standardStoreSavePopRenewalDt" class="form-control input-sm" />
						        </div>
						    </div>
						    <div class="form-group">
						        <label class="col-md-2 control-label">리로케이션</label>
						        <div class="col-md-10" >
						        	<input type="text" id="standardStoreSavePopRelocationDt" class="form-control input-sm" />
						        </div>
						    </div>
						    <div class="form-group">
						        <label class="col-md-2 control-label">추가운영점포</label>
						        <div class="col-md-10" >
						        	<input type="text" id="standardStoreSavePopAddMngStr" class="form-control input-sm" />
						        </div>
						    </div>
						    <div class="form-group">
						        <label class="col-md-2 control-label">담당 SV</label>
						        <div class="col-md-10" >
						        	<input type="text" id="standardStoreSavePopChargeSv" class="form-control input-sm" />
						        </div>
						    </div>
						    <div class="form-group">
						        <label class="col-md-2 control-label">VPN IP</label>
						        <div class="col-md-10" >
									<input type="text" id="standardStoreSavePopVpnModel" class="form-control input-sm" />
						        </div>
						    </div>
						    <div class="form-group">
						        <label class="col-md-2 control-label">통신사</label>
						        <div class="col-md-10" >
					        		<select class="form-control input-sm" id="standardStoreSavePopTeleCommunity">
									</select>
						        </div>
						    </div>
						    <div class="form-group">
						        <label class="col-md-2 control-label">AP 여부</label>
						        <div class="col-md-10" >
									<select class="form-control input-sm" id="standardStoreSavePopApYn">
									</select>
						        </div>
						    </div>
						    <div class="form-group ">
						        <label class="col-md-2 control-label">기타 유의사항</label>
						        <div class="col-md-10 text-left " >
							        	<textarea class="form-control rezise-off" placeholder="내용" rows="3"  id="standardStoreSavePopEtcMemo"></textarea>
						        </div>
						    </div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="modal-footer" id="modal-footer">
		<a href="javascript:;" id="standardStoreSavePopSaveBtn" class="btn btn-sm btn-success" data-authRule="AUTH_SAVE">저장</a> 
		<a href="javascript:;" id="standardStoreSavePopCloseBtn" class="btn btn-sm btn-white" data-close-btn="ture">닫기</a>
	</div>

	<script src="/js/views/standard/standard_storeSavePop.js"></script>
</body>
</html>
