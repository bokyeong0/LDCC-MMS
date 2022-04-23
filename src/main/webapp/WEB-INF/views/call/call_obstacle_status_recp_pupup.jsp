<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
<head>
<style type="text/css">
.obs_input_style { border: 1px solid #ccd0d4;
    -webkit-box-shadow: none;
    box-shadow: none;
    font-size: 12px;
    border-radius: 3px;
    -webkit-border-radius: 3px;}
</style>
</head>
<body>
	<div class="modal-header">
		<button type="button" id="headerCloseBtn" class="close" data-close-btn="ture">×</button>
		<h4 class="modal-title">장애접수 수정</h4>
	</div>
	<div class="modal-body">
		<div class="panel panel-inverse m-b-0">
			<div class="panel-body p-0">
				<div class="view-form m-b-0">
					<div class="form-horizontal  form-bordered min">
					    <div class="form-group">
					        <label class="col-md-p10 control-label">점포 검색</label>
					        <div class="col-md-p90" >
				        		<div class="input-group">
								<input type="text" class="form-control input-sm" id="callObsStsPopupCompNmSearch" value="" placeholder="전화번호,Site명,브랜드,관리코드" autocomplete="off" >
								<div class="input-group-btn">
									<button id="callObsStsPopupStrSearchReset" type="button" class="btn  btn-sm">
								  		<i class="fa fa-times " ></i>
									</button>
								</div>
							</div>
					        </div>
					    </div>
					    <div class="form-group form-inline">
					        <label class="col-md-p10 control-label">장애분류</label>
					        <div class="col-md-p90 text-left" >
					        	<input type="hidden" id="callObsStsPopupSelectStrCd">
					        	<input type="hidden" id="callObsStsPopupSelectCompCd">
					        	<input type="hidden" id="callObsStsPopupSelectAstSeq">
					        	<input type="hidden" id="callObsStsPopupSelectAspCompCd">
					        	<select id="callStandardObsStsPopupRcptLv1" class="form-control input-sm">
									<option value=""  >제품범주</option>
			                    </select>
				        		<select id="callObsStsPopupRcptLv1" class="form-control input-sm">
									<option value=""  >제품군</option>
			                    </select>
								<select id="callObsStsPopupRcptLv2" class="form-control input-sm">
									<option value=""  >장애구분</option>
			                    </select>
								<select id="callObsStsPopupRcptLv3" class="form-control input-sm">
									<option value=""  >장애내역</option>
			                    </select>
								<!-- <div class="input-group" >
									<select id="callObsStsPopupRcptLv4" class="form-control input-sm" >
										<option value="" >선택</option>
									</select> 18.02.07
								</div> -->
								<!-- <button title="장애구분추가" type="button" id="addObstacleBtn" class="btn btn-sm btn-info"><i class="fa fa-plus"></i></button> -->
					        </div>
					    </div>
					    <div class="form-group">
					        <label class="col-md-p10 control-label">모델명</label>
					        <div class="col-md-p90" >
				        		<div class="form-group form-control-static p-0">
									<input type="text" class="form-control input-sm " id="callObsStsPopupAutoPrdSearch"  placeholder="분류명, 품명을 입력하세요(2자 이상)" autocomplete="off" >
								</div>
					        </div>
					    </div>
					    <div class="form-group ">
					        <label class="col-md-p10 control-label">모델명선택</label>
					        <div class="col-md-p90 text-left" >
					        	<div class="input-group">
									<input type="hidden" class="form-control" id="callObsStsPopupAutoPrdCd" value="">
									<input type="text" class="form-control" id="callObsStsPopupAutoPrdNm" value="">
									<div class="input-group-btn">
										<button id="callObsStsPopupAutoPrdNmResetBtn" type="button" class="btn  btn-sm">
									  		<i class="fa fa-times " ></i>
										</button>
									</div>
								</div>
					        </div>
					    </div>
					    <div class="form-group">
					        <label class="col-md-p10 control-label">접수일시</label>
					        <div class="col-md-p40 text-left form-inline" >
								<div class="input-group date" id="callObsStsPopupRcptDtForm" data-date-format="yyyy-mm-dd">
                                          <input type="text"  id="callObsStsPopupRcptDt" name="obsRcptStsDate" size="10" class="form-control" placeholder="일자" />
                                          <span class="input-group-addon p-5" style="min-width:auto;"><i class="fa fa-calendar"></i></span>
                                </div>
					        	<div class="input-group bootstrap-timepicker">
									<input id="callObsStsPopupRcptTime" size="10" type="text" class="form-control input-sm"  placeholder="시간"/>
									<span class="input-group-addon p-5" style="min-width:auto;"><i class="fa fa-clock-o"></i></span>
								</div>
					        </div>
					       	 <label class="col-md-p10 control-label">방문일시</label>
					        <div class="col-md-p40 text-left form-inline" >
								<div class="input-group date" id="callObsStsPopupRcptVisitDtForm" data-date-format="yyyy-mm-dd">
                                	<input type="text"  id="callObsStsPopupRcptVisitDt" name="obsRcptStsDate" size="10" class="form-control" placeholder="일자" />
                                    <span class="input-group-addon p-5" style="min-width:auto;"><i class="fa fa-calendar"></i></span>
                                </div>
					        	<div class="input-group bootstrap-timepicker">
									<input id="callObsStsPopupRcptVisitTime" size="10" type="text" class="form-control input-sm"  placeholder="시간"/>
									<span class="input-group-addon p-5" style="min-width:auto;"><i class="fa fa-clock-o"></i></span>
								</div>				          
					        </div> 				        				      
					    </div>
						<div class="form-group ">
						     <label class="col-md-p10 control-label">신고자</label>
						     <div class="col-md-p90 text-left form-inline" >
								<select id="callObsRcptCustType" class="form-control input-sm">
						        </select>
								<input type="text" class="form-control input-sm " id="callObsStsPopupRcptCustNm" placeholder="전화번호" size="15">
								<!-- <input type="text" class="form-control input-sm " id="obsRcptCustPhone" placeholder="전화번호" size="15">
								<input type="text" class="form-control input-sm " id="obsRcptCustEmail" placeholder="이메일" size="37"> -->
						     </div>
						</div>							    
					  
					    <div class="form-group ">
					        <label class="col-md-p10 control-label">접수내용</label>
					        <div class="col-md-p90 text-left " >
						        	<textarea id="callObsStsPopupRcptCont"  class="form-control rezise-off" placeholder="내용" rows="3" ></textarea>
					        </div>
					    </div>
					    <div class="form-group ">
					    	<input type="hidden" class="form-control" id="callObsStsPopupEngrNm">
							<input type="hidden" class="form-control" id="callObsStsPopupEngrID">
					        <label class="col-md-p10 control-label">담당부서</label>
					        <div class="col-md-p40 text-left" >
					        	<select class="form-control input-sm" id="callObsStsPopupArea">
									<option value="" >선택</option>
								</select>
					        </div>
					        <label class="col-md-p10 control-label">담당자</label>
					        <div class="col-md-p40 text-left" >
					        	<select class="form-control input-sm" id="callObsStsPopupEngr">
									<option value="" >선택</option>
								</select>
					        </div>
					    </div>
					</div>
				</div>
				<p class="text-left m-t-15 m-b-10"><strong>자산내역</strong></p>
				<div class="view-form m-b-5">
					<div class="form-group">
					<p class="text-right">
							<select id="callObsPopAssetSel" class="input-sm">
							  <option value="AST_TYPE2">포스번호</option>
							  <option value="PRD_TYPE_LV2_NM">제품군</option>
							  <option value="PRD_TYPE_LV3_NM">제조사</option>
							  <option value="PRD_NM">모델명</option>
							  <option value="AST_TYPE1">위치정보</option>
							  <option value="AST_SERIAL">시리얼</option>
				            </select>
							<input type="text" class="obs_input_style input-sm" id="callObsPopAssetSearch" placeholder="">
							<button class="btn btn-sm btn-primary" id="callObsPopAssetSearchBtn" type="button">
							<i class="fa fa-search"></i> 검색
							</button>
					</p>
				    <div class="form-group m-0 m-t-15">
							<div class="grid-wrapper" >
								<table id="callObsStsPopupAstGrid"></table>
							</div>
					</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="modal-footer" id="modal-footer">
		<a href="javascript:;" id="standardCompanyModifyPopupUpdateBtn" class="btn btn-sm btn-success" data-authRule="AUTH_MOD">저장</a> 
		<a href="javascript:;" id="standardCompanyModifyPopupDelBtn" class="btn btn-sm btn-danger"  data-authRule="AUTH_DEL">삭제</a>
		<a href="javascript:;" id="standardCompanyModifyPopupCloseBtn" class="btn btn-sm btn-white" data-close-btn="ture">닫기</a>
	</div>

<script src="/js/views/call/call_obstacle_status_rcpt_popup.js"></script>
</body>
</html>
