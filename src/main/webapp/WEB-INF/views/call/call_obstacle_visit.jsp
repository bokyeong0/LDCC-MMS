<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
<body>
<style type="text/css">
#callObsVisitStsView {display:none;}
#callObsVisitView {display:none;}
#callObsVisitSaveWebBtn {display:none;}
#callObsVisitModSaveWebBtn {display:none;}
#callObsVisitModCancelWebBtn {display:none;}
</style>
<div class="menu-cate web-mod" >
<ol class="breadcrumb pull-right"></ol>
<h1 class="page-header"></h1>
</div>
	<div class="content-form white clearfix" >
		<div class="col-md-12" >
			
			<div class="search-form clearfix def-width" >
	          <div class="form-inline" >
				<div class="search-controls non-icon" >
					<div class="form-group m-r-10 m-b-0">
						<div class="input-group input-group-sm">
							<span class="span-info  input-group-addon">접수번호</span>
							<input type="text" class="form-control input-sm" id="callObsVisitRcptNoSearch" placeholder="">
							<div class="input-group-btn mobile-mod">
								<button id="callObsVisitSearchMobileBtn" type="button"  class="btn btn-sm btn-primary m-r-5 ">
								<i class="fa fa-search"></i> 검색
								</button>
							</div>
						</div>
					</div>
					<div class="form-group m-r-10 web-mod">
				<button id="callObsVisitSearchWebBtn" type="button"  class="btn btn-sm btn-primary web-mod">
							<i class="fa fa-search"></i> 검색
				</button>
				<button id="callObsVisitSaveWebBtn" type="button" class="btn btn-success  btn-sm web-mod">
			  		<i class="fa fa-download " ></i> 장애처리저장
				</button>
				<button id="callObsVisitModSaveWebBtn" type="button" class="btn btn-warning  btn-sm web-mod">
			  		<i class="fa fa-edit" ></i> 장애처리수정
				</button>
				<button id="callObsVisitModCancelWebBtn" type="button" class="btn btn-danger btn-sm web-mod">
			  		<i class="fa fa-download " ></i> 처리수정취소
				</button>						
					</div>
				</div>
			</div>
			<div class="search-button-group web-mod">

			</div>
		</div>
		</div>
		<div class="col-md-12" >
			<div class="grid-wrapper p-b-5" id="callObsVisitGridWrap" >
				<table id="callObsVisitGrid" ></table>
				<div id="callObsVisitGridNavi" ></div>
			</div>
			<div class="view-form white p-0" id="callObsVisitView" >
				<h6 class="mobil-mod" ><i class="fa fa-caret-right"></i> 장애 접수 내용</h6>
				<form class="form-horizontal  form-bordered p-5 ">
					<div class="form-group">
						<div class="control-label p-0">
							<div class="view-form m-b-5">
								<div class="form-horizontal  form-bordered min">
								    <div class="form-group">
								        <label class="col-md-p15 control-label">점포</label>
								        <div class="col-md-p85" >
							        		<p id="callObsVisitCompNmView" class="form-control-static "></p>
								        </div>
								    </div>
								    <div class="form-group">
								        <label class="col-md-p15 control-label">모델명</label>
								        <div class="col-md-p85 text-left" >
								        	<p id="callObsVisitPrdNmView"  class="form-control-static "></p>
								        </div>
								    </div>
								    <div class="form-group">
								        <label class="col-md-p15 control-label">장애유형</label>
								        <div class="col-md-p85 text-left" >
								        	<p id="callObsVisitObsNmView"  class="form-control-static "></p>
								        </div>
								    </div>
								    <div class="form-group">
								        <label class="col-md-p15 control-label">신고자</label>
								        <div class="col-md-p35 text-left" >
											<p id="callObsVisitCustNmView"  class="form-control-static "></p>
								        </div>
								        <label class="col-md-p15 control-label">접수일시</label>
								        <div class="col-md-p35 text-left" >
											<p id="callObsVisitObsDtTimeView"  class="form-control-static "></p>
								        </div>
								    </div>
								    <div class="form-group ">
								        <label class="col-md-p15 control-label">담당지역</label>
								        <div class="col-md-p35 text-left " >
								        	<p id="callObsVisitAreaNmView"  class="form-control-static "></p>
								        </div>
								        <label class="col-md-p15 control-label">담당엔지니어</label>
								        <div class="col-md-p35 text-left " >
								        	<p id="callObsVisitEngrmView"  class="form-control-static "></p>
								        </div>
								    </div>
								    <div class="form-group ">
								        <label class="col-md-p15 control-label">접수내용</label>
								        <div class="col-md-p85 text-left " >
									       	<pre id="callObsVisitContView" class="height-75 overflow-y-scroll"></pre>
								        </div>
								    </div>
								     <div class="form-group">
<!-- 								        <label class="col-md-p15 control-label">증빙서류</label> -->
								        <div class="col-md-12   text-right form-inline" >
								        	<button type="button" id="callObsVisitStsAddBtn" class="btn btn-sm btn-info ">
												<i class="fa fa-upload"></i> 신규등록
											</button>
								        	<button type="button" id="callObsVisitViewCloseBtn" class="btn btn-sm btn-danger ">
												<i class="fa fa fa-times"></i> 닫기
											</button>
								        </div>
								    </div>
								</div>
							</div>
							<div class="grid-wrapper" >
								<table id="callObsVisitHistGrid"></table>
								<div id="callObsVisitHistGridNavi"></div>
							</div>
						</div>
					</div>
				</form>
			</div>
			<div class="view-form white p-0" id="callObsVisitStsView" >
				<input type="hidden" id="callObsVisitSelectCompCd" >
	        	<input type="hidden" id="callObsVisitSelectRcptSeq" >
	        	<input type="hidden" id="callObsVisitSelectRcptStsSeq" >
	        	<input type="hidden" id="callObsVisitLastYn" >
				<h6 class="mobil-mod" ><i class="fa fa-caret-right"></i> <i style="font-style: normal;"  id="saveFormTitle" >장애처리 등록</i></h6>
				<form class="form-horizontal  form-bordered p-5 ">
					<div class="form-group">
						<div class="control-label p-0">
							<div class="view-form" >
								<div class="form-horizontal  form-bordered min">
								    <div class="form-group">
								    	<input type="hidden" class="form-control" id="callObsStsPopupEngrNm">
										<input type="hidden" class="form-control" id="callObsStsPopupEngrID">
								        <label class="col-md-p15 control-label">처리상태</label>
								        <div class="col-md-p35 text-left" >
											<select id="callObsVisitType" class="form-control input-sm">
						                    </select>
								        </div>
								        <label class="col-md-p15 control-label">담당엔지니어</label>
								        <div class="col-md-p35 text-left " id="callObsVisitEngrForm" >
								        	<select class="form-control input-sm" id="callObsVisitEngr">
											</select>
								        </div>
								    </div>
								    <div class="form-group ">
								    	<label class="col-md-p15 control-label">유무상</label>
								        <div class="col-md-p35 text-left " >
										    <select class="form-control input-sm" id="callObsVisitCostType">
											</select>
								        </div>
								    	<label class="col-md-p15 control-label">장애원인</label>
								        <div class="col-md-p35 text-left " >
										    <select id="callObsVisitLv4" class="form-control input-category">
												<option value="">장애원인</option>
				                    		</select>
								        </div>								        
								    </div>
								    <!-- div class="form-group ">
								        <label class="col-md-p15 control-label">입금여부</label>
								        <div class="col-md-p35 text-left " >
								        	<select class="form-control input-sm" id="callObsVisitDpstYn">
												<option value="" >선택</option>
												<option value="N" >미입금</option>
												<option value="Y" >입금</option>
											</select>
								        </div>
								        <label class="col-md-p15 control-label">입금일</label>
								        <div class="col-md-p35 text-left " >
<!-- 							        		<input type="text" class="form-control input-sm " id="obsRcptCostDt" placeholder="">
							        		<div class="input-group date" id="callObsVisitCostDtForm" data-date-format="yyyy-mm-dd">
	                                            <input type="text"  id="callObsVisitCostDt" name="callObstsCostDt" size="14" class="form-control p-5" placeholder="일자" />
	                                            <span class="input-group-addon p-5"><i class="fa fa-calendar"></i></span>
	                                        </div>
								        </div>
								        
								    </div -->
								    <div class="form-group ">
								    	<!-- label class="col-md-p15 control-label">입금자명</label>
								        <div class="col-md-p35 text-left " >
							        		<input type="text" class="form-control input-sm " id="callObsVisitDpstNm" placeholder="">
								        </div -->
								        <label class="col-md-p15 control-label">금액</label>
								        <div class="col-md-p35 text-left " >
							        		<input type="text" class="form-control input-sm text-right " id="callObsVisitCost" maxlength="15" placeholder=""> 
								        </div>
								        
								        <label class="col-md-p15 control-label">방문일시</label>
								        <div class="col-md-p35 text-left form-inline" >
											<div class="input-group date" id="callObsVisitDtForm" data-date-format="yyyy-mm-dd">
			                                	<input type="text"  id="callObsVisitVisitDt" name="obsRcptStsDate" size="10" class="form-control" placeholder="일자" />
			                                    <span class="input-group-addon p-5" style="min-width:auto;"><i class="fa fa-calendar"></i></span>
			                                </div>
								        	<div class="input-group bootstrap-timepicker">
												<input id="callObsVisitVisitTime" size="10" type="text" class="form-control input-sm"  placeholder="시간"/>
												<span class="input-group-addon p-5" style="min-width:auto;"><i class="fa fa-clock-o"></i></span>
											</div>				          
								        </div> 	
								        
								    </div>
								    <div class="form-group">
								        <label class="col-md-p15 control-label">완료일시</label>
								        <div class="col-md-p85 text-left form-inline" >
											<div class="input-group date" id="callObsVisitCompDtForm" data-date-format="yyyy-mm-dd">
	                                            <input type="text"  id="callObsVisitDt" name="callObsVisitDt" size="10" class="form-control" placeholder="일자" />
	                                            <span class="input-group-addon p-5" style="min-width:auto;"><i class="fa fa-calendar"></i></span>
	                                        </div>
								        	<div class="input-group bootstrap-timepicker">
												<input id="callObsVisitTime" size="10" type="text" class="form-control input-sm"  placeholder="시간"/>
												<span class="input-group-addon p-5" style="min-width:auto;"><i class="fa fa-clock-o"></i></span>
											</div>
								        </div>
								    </div>
								    <div class="form-group ">
								        <label class="col-md-p15 control-label">완료내용</label>
								        <div class="col-md-p85 text-left " >
									        <textarea id="callObsVisitCont" class="form-control rezise-off" placeholder="내용" rows="3" ></textarea>
								        </div>
								    </div>
									<div class="form-group ">
								    	<label class="col-md-p15 control-label">담당자</br>서명</label>
								        <div class="col-md-p85 text-left form-inline" >
								        	<input id="signSaveFileWebPath" type="hidden" >
								        	<input id="signSaveFileWebName" type="hidden" >
								        
								        	
								        	
							        		<button id="callObsVisitSignFileAddBtn" type="button" class="btn btn-sm btn-info">
												<i class="fa fa-upload"></i> 서명등록
											</button>
											<div id="callObsVisitSighFileNmView" class="input-group" ></div>
								        </div>
								    </div>
								</div>
							</div>
							<div class=" p-0 m-t-5 m-t-5 mobile-mod"  >
								<div class="search-form clearfix m-b-5 p-5" >
										<div class="search-controls non-icon" >
											<div class="form-group p-0 m-0  text-right">
<!-- 												<div class="col-md-12 text-right" > -->
									        		<button id="callObsVisitSaveMobileBtn" type="button" class="btn btn-success  btn-sm ">
												  		<i class="fa fa-download " ></i> 신규저장
													</button>
													<button id="callObsVisitSaveCancelMobileBtn" type="button" class="btn btn-danger btn-sm">
												  		<i class="fa fa fa-times " ></i> 신규취소
													</button>
													<button id="callObsVisitModSaveMobileBtn" type="button" class="btn btn-warning  btn-sm">
												  		<i class="fa fa-edit" ></i> 수정
													</button>
													<button id="callObsVisitModCancelMobileBtn" type="button" class="btn btn-danger btn-sm">
												  		<i class="fa fa fa-times " ></i> 취소
													</button>
<!-- 										        </div> -->
											</div>
										</div>
								</div>
							</div>
						</div>
						
					</div>
				</form>
			</div>
		</div>
	</div>
	<div id="visit-signature-pad" class="m-signature-pad">
		<div class="m-signature-pad--body">
			<canvas></canvas>
		</div>
		<div class="m-signature-pad--footer text-right p-t-10">
			<button type="button" id="visit-signClearBtn" class="btn btn-success btn-sm  pull-left" data-action="clear"><i class="fa fa-eraser">지우기</i></button>
			<button type="button" id="visit-signCloseBtn" class="btn btn-success btn-sm  pull-left m-l-15" data-action="close"><i class="fa fa-times">닫기</i></button>
			<button type="button" id="visit-signSaveBtn" class="btn btn-success  btn-sm " data-action="save"><i class="fa fa-check">저장</i></button>
		</div>
	</div>
	<script src="/js/common/signature_pad.min.js"></script>
	<script src="/js/views/call/call_obstacle_visit.js"></script>
</body>
</html>