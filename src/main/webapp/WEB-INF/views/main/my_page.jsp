<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
<body>
	<div class="modal-header">
		<button type="button" class="close" data-close-btn="ture">×</button>
		<h4 class="modal-title">고객 상세보기</h4>
	</div>
	<div class="modal-body">
		<ul id="testTab" class="bwizard-steps clearfix clickable"  >
			<li data-tab-id="" class="gray active info-tab"><a href="#mainBasicUserInfo" data-toggle="tab" class="info-tab-a"><i class="fa fa-user m-r-5"></i> <span class="hidden-xs">기본정보</span></a></li>
			<li data-tab-id="" class="info-tab"><a href="#mainPassword" data-toggle="tab" class="info-tab-a"><i class="fa fa-lock m-r-5"></i> <span class="hidden-xs">비밀번호 변경</span></a></li>
			<li data-tab-id="" class="info-tab"><a href="#mainLoginInfo" data-toggle="tab" class="info-tab-a"><i class="fa fa-check-circle-o m-r-5"></i> <span class="hidden-xs">로그인내역</span></a></li> 
		</ul>
		<!-- <ul id="testTab" class="nav nav-tabs nav-tabs-inverse nav-justified nav-justified-mobile inner-tab gray-tab"  >
			<li data-tab-id="" class="gray active info-tab"><a href="#mainBasicUserInfo" data-toggle="tab"><i class="fa fa-picture-o m-r-5"></i> <span class="hidden-xs">기본정보</span></a></li>
			<li data-tab-id="" class="info-tab"><a href="#mainPassword" data-toggle="tab"><i class="fa fa-shopping-cart m-r-5"></i> <span class="hidden-xs">비밀번호 변경</span></a></li>
			<li data-tab-id="" class="info-tab"><a href="#mainMobileCheck" data-toggle="tab"><i class="fa fa-envelope m-r-5"></i> <span class="hidden-xs">로그인내역</span></a></li> 
		</ul> -->
		<div class="tab-content p-0">
			<div class="tab-pane fade active in" id="mainBasicUserInfo"> 
				<div class="panel panel-inverse" >
					<div class="panel-body p-0">
						<form id="mainBasicUserInfoForm" >
							<div class="view-form">
								<div class="form-horizontal form-bordered min" >
									<div class="form-group">
										<label class="col-md-2 control-label">아이디</label>
										<div class="col-md-4">
											<p class="form-control-static" id="mainMyInfoViewPopUserId"></p>
										</div>
										<label class="col-md-2 control-label">이메일</label>
										<div class="col-md-4">
											<p class="form-control-static view-mod" id="mainMyInfoViewPopUserEmail" ></p>
						                    <input   type="text"class="form-control input-sm save-mod" id="mainMyInfoSavePopUserEmail" >
						                </div>
									</div>
									<div class="form-group">
										<label class="col-md-2 control-label">이름</label>
										<div class="col-md-4">
											<p class="form-control-static" id="mainMyInfoViewPopUserNm"></p>
										</div>
										<label class="col-md-2 control-label">직책</label>
										<div class="col-md-4">
											<p class="form-control-static" id="mainMyInfoViewPopUserPosition"></p>
										</div>
									</div>
									<!-- <div class="form-group">
										<label class="col-md-2 control-label">권역</label>
										<div class="col-md-4">
											<p class="form-control-static view-mod" id="mainMyInfoViewPopAreaNm"></p>
						            		<select class="form-control input-sm save-mod" id="mainMyInfoSavePopAreaNm">
						            		</select>
						            	</div>
										<label class="col-md-2 control-label">입사일자</label>
										<div class="col-md-4">
											<p class="form-control-static" id="mainMyInfoViewPopUserJoinDate"></p>
										</div>
									</div> -->
									<div class="form-group">
										<label class="col-md-2 control-label">휴대폰</label>
										<div class="col-md-4">
											<p class="form-control-static view-mod" id="mainMyInfoViewPopUserPhone"></p>
											<input type="text" class="form-control input-sm save-mod" id="mainMyInfoSavePopUserPhone" placeholder="-제외한 핸드폰번호를 입력해 주세요."/>
										</div>
										<label class="col-md-2 control-label">사내전화번호</label>
										<div class="col-md-4" >
											<p class="form-control-static view-mod" id="mainMyInfoViewPopUserExt" ></p>
											<input type="text" class="form-control input-sm save-mod" id="mainMyInfoSavePopUserExt" placeholder="" />
										</div>
									</div>
								</div>
							</div>
						</form>
						<div class="col-md-12 m-t-10  p-0" id="mainBasicBtnGroup" >
							<div class="pull-right" >
								<button type="button" id="mainBasicMyInfoModBtn" class="btn btn-sm btn-warning view-mod">
									<i class="fa fa-plus"></i><i> 수정</i>
								</button>
								<button type="button" id="mainBasicMyInfoSaveBtn" class="btn btn-sm btn-info save-mod">
									<i class="fa fa-plus"></i><i> 저장</i>
								</button>
								<button type="button" id="mainBasicChangeCancelBtn" class="btn btn-sm btn-danger save-mod" >
									<i class="fa fa-minus"></i><i> 취소</i>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="tab-pane fade " id="mainPassword"> 
				<div class="panel panel-inverse" >
					<div class="panel-body p-0">
						<form id="mainBasicUserPwdForm" >
							<div class="view-form">
								<div class="form-horizontal form-bordered min" >
									<div class="form-group">
										<label class="col-md-2 control-label">현재 비밀번호</label>
										<div class="col-md-10">
											<input type="password" name="password-visible" id="mainMyInfoSavePopCurrPwd" class="form-control input-sm m-b-5" placeholder="" />
										</div>
									</div>
									<div class="form-group">
										<label class="col-md-2 control-label">새 비밀번호</label>
										<div class="col-md-10">
											<input type="password" name="password-visible" id="mainMyInfoSavePopNewPwd" class="form-control input-sm m-b-5" placeholder="" />
										</div>
									</div>
									<div class="form-group">
										<label class="col-md-2 control-label">새 비밀번호 확인</label>
										<div class="col-md-10">
											<input type="password" name="password-visible" id="mainMyInfoSavePopNewPwdCheck" class="form-control input-sm m-b-5" placeholder="" />
										</div>
									</div>
								</div>
							</div>
						</form>
						<div class="col-md-12 m-t-10  p-0" id="mainPasswordBtnGroup" >
							<div class="pull-right" >
								<button type="button" id="mainBasicMyPwdSaveBtn" class="btn btn-sm btn-info">
									<i class="fa fa-download"></i><i> 저장</i>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="tab-pane fade" id="mainLoginInfo">
				<div class="tab-grid-wrapper">
					<!--<div class="search-form clearfix " >
			            <div class="form-inline" >
							중복되는 부분
							<div class="search-controls pull-right" >
								<button type="button" class="btn btn-sm btn-info" id="mainMobileAddBtn" >
								<i class="fa fa-plus"></i><i> 추가</i>
								</button>
								<button type="button" class="btn btn-sm btn-danger" id="mainMobileDelBtn" >
								<i class="fa fa-minus"></i><i> 삭제</i>
								</button>
								<button type="button" class="btn btn-sm btn-success" id="mainMobileSaveBtn" >
								<i class="fa fa-download"></i><i> 저장</i>
								</button>
							</div>
						</div> 
					</div>-->
					<div class="grid-wrapper" >
						<table id="mainMyPageLoginInfoGrid"  ></table>
						<div id="mainMyPageLoginInfoGridNavi"></div>
					</div>
				</div>
			</div>
		</div>
		
	</div>

	<div class="modal-footer" >
		<a href="javascript:;" class="btn btn-sm btn-white" data-close-btn="ture">닫기</a>
	</div>

<!-- 	<script src="/js/paragon/paragon-temp.js"></script> -->
	<script src="/js/views/main/my_page.js"></script>
</body>
</html>
