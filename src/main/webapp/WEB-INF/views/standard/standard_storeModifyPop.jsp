<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
<body>
	<div class="modal-header">
		<button type="button" id="headerCloseBtn" class="close" data-close-btn="ture">×</button>
		<h4 class="modal-title">Site 수정</h4>
	</div>
	<div class="modal-body">
		<div class="panel panel-inverse">
			<ul id="stndStrModifyTab" class="nav nav-pills p-b-5 m-b-0 boder-line">
				<li class="active"><a id="stndStrModifyBasicBtn" href="#nav-str-tab-1" data-toggle="tab" aria-expanded="false">점포 기본정보</a></li>
				<li class=""><a id="stndStrModifyDetailBtn"  href="#nav-str-tab-2" data-toggle="tab" aria-expanded="false">점포 상세정보</a></li>
			</ul>
			<div class="tab-content p-0 m-0 ">
				<div class="tab-pane fade active in " id="nav-str-tab-1">
					<div class="panel-body view-form">
						<form class="form-horizontal form-bordered min" id="standardStoreModifyPop" name="standardStoreModifyPop">
							<div class="form-group">
								<label class="col-md-2 control-label">점포 분류</label>
								<div class="col-md-5">
									<select class="form-control input-sm" id="standardStoreModifyPopCompNm">
									</select>
								</div>
								<div class="col-md-5">
									<select class="form-control input-sm" id="standardStoreModifyPopBrndNm">
									</select>
								</div>
							</div>
							<div class="form-group">
								<label class="col-md-2 control-label">점포유형</label>
								<div class="col-md-4">
									<select class="form-control input-sm" id="standardStoreModifyPopStrType">
									</select>
								</div>
								<label class="col-md-2 control-label">점포형태</label>
								<div class="col-md-4">
									<select class="form-control input-sm" id="standardStoreModifyPopStrSt">
									</select>
								</div>
							</div>
							<div class="form-group">
								<label class="col-md-2 control-label">사업자번호</label>
								<div class="col-md-4">
									<input type="text" id="standardStoreModifyPopCorpNum" class="form-control input-sm" />
								</div>
								
								<label class="col-md-2 control-label">점포코드</label>
								<div class="col-md-4">
										<input type="text" id="standardStoreModifyPopMngCd" class="form-control input-sm" />
								</div>
							</div>
							<div class="form-group">
								<label class="col-md-2 control-label">점포 이름</label>
								<div class="col-md-10">
									<input type="text" id="standardStoreModifyPopStrNm" class="form-control input-sm" />
								</div>
							</div>
							<div class="form-group">
								<label class="col-md-2 control-label">대표자명</label>
								<div class="col-md-10">
									<input type="text" id="standardStoreModifyPopCeoNm" class="form-control input-sm" />
								</div>
							</div>
							<div class="form-group">
								<label class="col-md-2 control-label">우편번호</label>
								<div class="col-md-4">
									<div class="input-group">
										<input type="text" class="form-control input-sm postcodify_postcode5" id="standardStoreModifyPopZipCd" readonly>
										<div class="input-group-btn">
											<button id="standardStoreModifyPopZipCdBtn" type="button" class="btn btn-primary btn-sm">
												<i class="fa fa-search"></i>
											</button>
										</div>
									</div>
								</div>
								<label class="col-md-2 control-label">지역</label>
								<div class="col-md-4">
									<div class="input-group">
										<input type="hidden" id="standardStoreModifyPopAreaSeq">
										<input type="text" class="form-control input-sm" id="standardStoreModifyPopAreaNm" readonly>
										<div class="input-group-btn">
											<button id="standardStoreModifyPopAreaBtn" type="button" class="btn btn-primary btn-sm">
												<i class="fa fa-search"></i>
											</button>
										</div>
									</div>
								</div>
							</div>
							<div class="form-group">
								<label class="col-md-2 control-label">주소</label>
								<div class="col-md-10">
									<input type="text" id="standardStoreModifyPopAddr1" class="form-control input-sm m-b-3 postcodify_address" readonly /> 
									<input type="text" id="standardStoreModifyPopAddr2" class="form-control input-sm m-b-3 postcodify_details" /> 
									<input type="text" id="standardStoreModifyPopAddrExt" class="form-control input-sm postcodify_extra_info" readonly />
								</div>
							</div>
							<div class="form-group">
								<label class="col-md-2 control-label">위치좌표</label>
								<div class="col-md-3 p-l-5">
									<label class="col-md-3 p-r-5 p-l-1 control-label">위도</label>
									<div class="col-md-9 p-r-1 p-l-1">
										<input type="text" id="standardStoreModifyPopStrX" class="form-control input-sm" size="20"/>
									</div> 
								</div>
								<div class="col-md-3">
									<label class="col-md-3 p-r-5 p-l-1 control-label">경도</label>
									<div class="col-md-9 p-r-1 p-l-1">
										<input type="text" id="standardStoreModifyPopStrY" class="form-control input-sm" size="20"/>
									</div> 
								</div>
								<div class="col-md-4">
									<button id="standardStoreModifyPopGetStrXYBtn" type="button" class="btn btn-link">
										주소로 위도 경도 가져오기
									</button>
								</div>
							</div>
							<div class="form-group">
								<label class="col-md-2 control-label">대표전화</label>
								<div class="col-md-10">
									<input type="text" id="standardStoreModifyPopPhoneNum" class="form-control input-sm" />
								</div>
							</div>
							<div class="form-group">
								<label class="col-md-2 control-label">팩스번호</label>
								<div class="col-md-10">
									<input type="text" id="standardStoreModifyPopFaxNum" class="form-control input-sm" />
								</div>
							</div>
							<div class="form-group">
								<label class="col-md-2 control-label">비고</label>
								<div class="col-md-10">
									<textarea rows="5" class="form-control input-sm" id="standardStoreModifyPopBigo" style="resize: none;"></textarea>
								</div>
							</div>
						</form>
					</div>
				</div>
			
			<div class="tab-pane fade " id="nav-str-tab-2">
					<div class="panel-body view-form">
						<form class="form-horizontal form-bordered min" id="standardStoreModifyPop">
						    <div class="form-group">
						        <label class="col-md-2 control-label">오픈일자</label>
						        <div class="col-md-10" >
						        	<input type="text" id="standardStoreModifyPopOpenDt" class="form-control input-sm" />
						        </div>
						    </div>
						    <div class="form-group">
						        <label class="col-md-2 control-label">리뉴얼</label>
						        <div class="col-md-10" >
<!-- 						        	<p class="form-control-static" id="obsSelectStrRenualDt"></p> -->
						        	<input type="text" id="standardStoreModifyPopRenewalDt" class="form-control input-sm" />
						        </div>
						    </div>
						    <div class="form-group">
						        <label class="col-md-2 control-label">리로케이션</label>
						        <div class="col-md-10" >
						        	<input type="text" id="standardStoreModifyPopRelocationDt" class="form-control input-sm" />
						        </div>
						    </div>
						    <div class="form-group">
						        <label class="col-md-2 control-label">추가운영Site</label>
						        <div class="col-md-10" >
						        	<input type="text" id="standardStoreModifyPopAddMngStr" class="form-control input-sm" />
						        </div>
						    </div>
						    <div class="form-group">
						        <label class="col-md-2 control-label">담당 SV</label>
						        <div class="col-md-10" >
						        	<input type="text" id="standardStoreModifyPopChargeSv" class="form-control input-sm" />
						        </div>
						    </div>
						    <div class="form-group">
						        <label class="col-md-2 control-label">VPN IP</label>
						        <div class="col-md-10" >
									<input type="text" id="standardStoreModifyPopVpnModel" class="form-control input-sm" />
						        </div>
						    </div>
						    <div class="form-group">
						        <label class="col-md-2 control-label">통신사</label>
						        <div class="col-md-10" >
					        		<select class="form-control input-sm" id="standardStoreModifyPopTeleCommunity">
									</select>
						        </div>
						    </div>
						    <div class="form-group">
						        <label class="col-md-2 control-label">AP 여부</label>
						        <div class="col-md-10" >
						        	<select class="form-control input-sm" id="standardStoreModifyPopApYn">
									</select>
						        </div>
						    </div>
						    <div class="form-group ">
						        <label class="col-md-2 control-label">기타 유의사항</label>
						        <div class="col-md-10 text-left " >
							        	<textarea class="form-control rezise-off" placeholder="내용" rows="3"  id="standardStoreModifyPopEtcMemo"></textarea>
						        </div>
						    </div>
						</form>
					</div>
				</div>
			</div>
			
		</div>
	</div>

	<div class="modal-footer" id="modal-footer">
		<a href="javascript:;" id="standardStoreModifyPopUpdateBtn" class="btn btn-sm btn-success" data-authRule="AUTH_SAVE">저장</a>
		<a href="javascript:;" id="standardStoreModifyPopDelBtn" class="btn btn-sm btn-danger" data-authRule="AUTH_DEL">삭제</a>
		<a href="javascript:;" id="standardStoreModifyPopCloseBtn" class="btn btn-sm btn-white" data-close-btn="ture">닫기</a>
	</div>

	<script src="/js/views/standard/standard_storeModifyPop.js"></script>
</body>
</html>
