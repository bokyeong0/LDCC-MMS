<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
<body>
	<div class="modal-header">
		<button type="button" class="close" data-close-btn="ture">×</button>
		<h4 class="modal-title">점포 상세보기</h4>
	</div>
	<div class="modal-body">
		<div class="panel panel-inverse" >
		
			<ul id="stndStrViewTab" class="nav nav-pills p-b-5 m-b-0 boder-line">
				<li class="active"><a id="stndStrViewBasicBtn" href="#nav-str-tab-1" data-toggle="tab" aria-expanded="false">점포 기본정보</a></li>
				<li class=""><a id="stndStrViewDetailBtn"  href="#nav-str-tab-2" data-toggle="tab" aria-expanded="false">점포 상세정보</a></li>
			</ul>
			
			<div class="tab-content p-0 m-0 ">
				<div class="tab-pane fade active in " id="nav-str-tab-1">
				
					<div class="panel-body view-form">
						<div class="form-horizontal form-bordered min" id="standardStoreViewPop">
							<div class="form-group">
<!-- 								<label class="col-md-2 control-label">그룹 분류</label> -->
<!-- 								<div class="col-md-4"> -->
<!-- 									<p class="form-control-static" id="standardStoreViewPopCompCate"></p> -->
<!-- 								</div> -->
								<label class="col-md-2 control-label">고객사명</label>
								<div class="col-md-10">
									<p class="form-control-static" id="standardStoreViewPopCompNm"></p>
								</div>
							</div>
							<div class="form-group">
								<label class="col-md-2 control-label">점포 유형</label>
								<div class="col-md-4">
									<p class="form-control-static" id="standardStoreViewPopStrType"></p>
								</div>
								<label class="col-md-2 control-label">점포 상태</label>
								<div class="col-md-4">
									<p class="form-control-static" id="standardStoreViewPopStrSt"></p>
								</div>
							</div>
							<div class="form-group">
								<label class="col-md-2 control-label">사업자 번호</label>
								<div class="col-md-4">
									<p class="form-control-static" id="standardStoreViewPopCorpNum"></p>
								</div>
								<label class="col-md-2 control-label">점포코드</label>
								<div class="col-md-4">
									<p class="form-control-static" id="standardStoreViewPopMngCd"></p>
								</div>
							</div>
							<div class="form-group">
								<label class="col-md-2 control-label">브랜드명</label>
								<div class="col-md-4">
									<p class="form-control-static" id="standardStoreViewPopBrndNm"></p>
								</div>
								<label class="col-md-2 control-label">점포명</label>
								<div class="col-md-4">
									<p class="form-control-static" id="standardStoreViewPopStrNm"></p>
								</div>
							</div>
							<div class="form-group">
								<label class="col-md-2 control-label">대표자명</label>
								<div class="col-md-10">
									<p class="form-control-static" id="standardStoreViewPopCeoNm"></p>
								</div>
							</div>
							<div class="form-group">
								<label class="col-md-2 control-label">우편번호</label>
								<div class="col-md-4">
									<p class="form-control-static" id="standardStoreViewPopZipCd"></p>
								</div>
								<label class="col-md-2 control-label">지역</label>
								<div class="col-md-4">
									<p class="form-control-static" id="standardStoreViewPopAreaNm"></p>
								</div>
							</div>
							<div class="form-group">
								<label class="col-md-2 control-label">주소</label>
								<div class="col-md-10">
									<p class="form-control-static" id="standardStoreViewPopAddr1"></p>
									<p class="form-control-static" id="standardStoreViewPopAddr2"></p>
		<!-- 							<p class="form-control-static" id="standardStoreViewPopAddrExt"></p> -->
								</div>
							</div>
							<div class="form-group">
								<label class="col-md-2 control-label">위도</label>
								<div class="col-md-4">
									<p class="form-control-static" id="standardStoreViewPopStrX"></p>
								</div>
								<label class="col-md-2 control-label">경도</label>
								<div class="col-md-4">
									<p class="form-control-static" id="standardStoreViewPopStrY"></p>
								</div>
							</div>
							<div class="form-group">
								<label class="col-md-2 control-label">대표전화</label>
								<div class="col-md-10">
									<p class="form-control-static" id="standardStoreViewPopPhoneNum"></p>
								</div>
							</div>
							<div class="form-group">
								<label class="col-md-2 control-label">팩스번호</label>
								<div class="col-md-10">
									<p class="form-control-static" id="standardStoreViewPopFaxNum"></p>
								</div>
							</div>
							<div class="form-group">
								<label class="col-md-2 control-label">비고</label>
								<div class="col-md-10">
									<pre class="form-control-static" id="standardStoreViewPopBigo"></pre>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				<div class="tab-pane fade " id="nav-str-tab-2">
					<div class="panel-body view-form">
						<form class="form-horizontal form-bordered min" id="standardStoreViewPopup">
						    <div class="form-group">
						        <label class="col-md-2 control-label">최초오픈</label>
						        <div class="col-md-10" >
						        	<p class="form-control-static" id="standardStoreViewPopupOpenDt"></p>
						        </div>
						    </div>
						    <div class="form-group">
						        <label class="col-md-2 control-label">리뉴얼</label>
						        <div class="col-md-10" >
						        	<p class="form-control-static" id="standardStoreViewPopupRenewalDt"></p>
						        </div>
						    </div>
						    <div class="form-group">
						        <label class="col-md-2 control-label">리로케이션</label>
						        <div class="col-md-10" >
						        	<p class="form-control-static" id="standardStoreViewPopupRelocationDt"></p>
						        </div>
						    </div>
						    <div class="form-group">
						        <label class="col-md-2 control-label">추가운영점포</label>
						        <div class="col-md-10" >
						        	<p class="form-control-static" id="standardStoreViewPopupAddMngStr" ></p>
						        </div>
						    </div>
						    <div class="form-group">
						        <label class="col-md-2 control-label">담당 SV</label>
						        <div class="col-md-10" >
						        	<p class="form-control-static" id="standardStoreViewPopupChargeSv" ></p>
						        </div>
						    </div>
<!-- 						    <div class="form-group"> -->
<!-- 						        <label class="col-md-2 control-label">허브 모델명</label> -->
<!-- 						        <div class="col-md-10" > -->
<!-- 						        	<p class="form-control-static" id="standardStoreViewPopupHerbModel" ></p> -->
<!-- 						        </div> -->
<!-- 						    </div> -->
						    <div class="form-group">
						        <label class="col-md-2 control-label">VPN IP</label>
						        <div class="col-md-10" >
						        	<p class="form-control-static" id="standardStoreViewPopupVpnModel" ></p>
						        </div>
						    </div>
						    <div class="form-group">
						        <label class="col-md-2 control-label">통신사</label>
						        <div class="col-md-10" >
						        	<p class="form-control-static" id="standardStoreViewPopupTeleCommunity" ></p>
<!-- 						        	<input type="text" id="standardStoreViewPopupTeleCommunity" class="form-control input-sm" /> -->
<!-- 					        		<select class="form-control input-sm" id="standardStoreViewPopupTeleCommunity"> -->
<!-- 									</select> -->
						        </div>
						    </div>
						    <div class="form-group">
						        <label class="col-md-2 control-label">AP 여부</label>
						        <div class="col-md-10" >
						        	<p class="form-control-static" id="standardStoreViewPopupApYn" ></p>
<!-- 						        	<input type="text" id="standardStoreViewPopupApYn" class="form-control input-sm" /> -->
						        </div>
						    </div>
						    <div class="form-group ">
						        <label class="col-md-2 control-label">기타 유의사항</label>
						        <div class="col-md-10 text-left " >
							        	<textarea class="form-control rezise-off" readonly placeholder="내용" rows="3"  id="standardStoreViewPopupEtcMemo"></textarea>
						        </div>
						    </div>
						</form>
					</div>
				</div>
				
			</div>
		</div>
	</div>

	<div class="modal-footer" id="modal-footer">
		<a href="javascript:;" id="standardStoreViewPopCloseBtn" class="btn btn-sm btn-white" data-close-btn="ture">닫기</a>
	</div>

	<script src="/js/views/standard/standard_storeViewPop.js"></script>
</body>
</html>
