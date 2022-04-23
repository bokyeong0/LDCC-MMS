<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
<head>
<style type="text/css">
.ui-jqgrid .ui-jqgrid-btable td {
height:auto;
overflow:hidden;
white-space:nowrap !important;
}
</style>
</head>
<body>
<div class="menu-cate" >
<ol class="breadcrumb pull-right"></ol>
<h1 class="page-header"></h1>
</div>
	<div class="content-form clearfix" >
		<div class="col-md-12" >
			
			<div class="search-form clearfix" >
				<div class="search-controls non-icon col-md-12 m-b-0" >
					<div class="form-group col-md-p20">
						<div class="input-group input-group-sm">
							<span class="span-info  input-group-addon">고객사명</span>
							<input type="text" class="form-control input-sm" id="callObsStsCompSearch"  autocomplete="off" >
						</div>
					</div>
					<div class="form-group col-md-p20">
						<div class="input-group input-group-sm">
							<span class="span-info  input-group-addon">브랜드명</span>
							<select id="callObsStsBrndNmSearch" class="form-control input-category">
									<option value="">선택</option>
			                </select>
						</div>
					</div>
					<div class="form-group col-md-p20">
						<div class="input-group input-group-sm">
							<span class="span-info  input-group-addon">점포명</span>
							<input type="text" class="form-control input-sm" id="callObsStsStrNmSearch" placeholder="점포명" >
						</div>
					</div>															
					<div class="form-group col-md-p20">
						<div class="input-group input-group-sm">
							<span class="span-info  input-group-addon">처리상태</span>
							<select id="callObsStsType2Search" class="form-control">
								<option value="" >선택</option>
		                    </select>
						</div>
					</div>
					<div class="form-group col-md-p20">
						<div class="input-group input-group-sm input-category">
							<select id="callObsStsTypeSearch" class="form-control">
								<option value="" >선택</option>
		                    </select>
						</div>
					</div>						
				</div>
				<div class="search-controls non-icon col-md-12  m-t-0 m-b-0" >	
					<div class="form-group col-md-p20">
						<div class="input-group input-group-sm">
							<span class="span-info  input-group-addon">접수번호</span>
							<input type="text" class="form-control input-sm" id="callObsStsRcptNoSearch" placeholder="">
						</div>
					</div>
					<div class="form-group col-md-p20">
						<div class="input-group input-group-sm">
							<span class="span-info  input-group-addon">파트너사</span>
							<select class="form-control" id="obsRctStsPaterSearch">
								<option value="" >파트너사</option>
							</select>	
						</div>
					</div>							
			    	<div class="form-group col-md-p20">
						<div class="input-group input-group-sm">
							<span class="span-info  input-group-addon">담당부서</span>
							<select id="callObsStsPartSearch" class="form-control"></select>
						</div>
					</div>		
					<div class="form-group col-md-p20">
						<div class="input-group input-group-sm">
							<span class="span-info  input-group-addon">담당엔지니어</span>
							<select id="callObsStsEngrSearch" class="form-control"></select>
						</div>
					</div>									
					<div class="form-group col-md-p20">
						<div class="input-group input-group-sm">
							<span class="span-info  input-group-addon">접 수 자</span>
							<select id="callObsRcptWriterNmSearch" class="form-control"></select>
						</div>
					</div>
				</div>		
			
				<div class="search-controls non-icon col-md-12  m-t-0 m-b-0" >
						<div class="form-group col-md-p20">
							<div class="input-group input-group-sm">
								<span class="span-info  input-group-addon">장애분류</span>						
			                    	<select id="callStandardObsStsLv1Search" class="form-control">
										<option value="">제품범주</option>
				                    </select>	
		                   </div>	
	                   </div>
	                    <div class="form-group col-md-p20">
							<div class="input-group input-group-sm input-category">
			                    	<select id="callObsStsLv1Search" class="form-control">
										<option value="">제품군</option>
				                    </select>
							</div>
						</div>	
						<div class="form-group col-md-p20">
							<div class="input-group input-group-sm input-category">
								<select id="callObsStsLv2Search" class="form-control input-category">
										<option value="">장애구분</option>
				                </select>
							</div>
						</div>	
						<div class="form-group col-md-p20">
							<div class="input-group input-group-sm input-category">
								<select id="callObsStsLv3Search" class="form-control input-category">
									<option value="">장애유형</option>
			                    </select>
							</div>
						</div>	
						<div class="form-group col-md-p20">
							<div class="input-group input-group-sm input-category">
								<select id="callObsStsLv4Search" class="form-control input-category">
									<option value="">장애원인</option>
			                    </select>
							</div>
						</div>	
				</div>
				<div class="search-controls non-icon col-md-12  m-t-0 m-b-0" >
					<div class="form-group col-md-p20">
						<div class="input-group input-group-sm">
						<span class="span-info  input-group-addon">기간검색</span>
					       <select id="date-search-type" class="form-control">
					         <option value="typeRcpt">접수일자</option>
					         <option value="typeVisit">방문일자</option>
					         <option value="typeCmpl">완료일자</option>
					       </select>
		                 </div>	
						   <!-- <div class="input-group input-daterange" style="width: auto !important;" id="callObsStsRcptDateForm">
		                       <input type="text" class="obs_input_style" style="width: 59px; padding: 0px !important;" id="callObsStsRcptDateStartSearch" name="start" placeholder="시작일" />
		                       <span class="input-group-addon">~</span>
		                       <input type="text" class="obs_input_style" style="width: 59px; padding: 0px !important;" id="callObsStsRcptDateEndSearch" name="end" placeholder="종료일" />
		                   </div> -->

	                </div>
	               	<div class="form-group col-md-p20">
	               		<div class="input-group input-daterange" id="callObsStsRcptDateForm">
			               	 <input type="text" class="form-control" id="callObsStsRcptDateStartSearch" name="start" placeholder="시작일" />
			                   <span class="input-group-addon">~</span>
			                 <input type="text" class="form-control" id="callObsStsRcptDateEndSearch" name="end" placeholder="종료일" />
	               		</div> 	
	                </div>	
	                <div class="form-group col-md-p20">
						<div class="input-group input-group-sm">
							<span class="span-info  input-group-addon">유무상</span>
							<select id="callObsStsCostTypeSearch" class="form-control"></select>
						</div>
					</div>							
				</div>
			<div class="search-button-group">
				<button class="btn btn-sm btn-success" id="assetManagerDownloadExcel" type="button">
					<i class="fa fa-download"></i> EXCEL
				</button>	
				<button id="callObsStsSearchMobileBtn" type="button"  class="btn btn-sm btn-primary mobile-mod">
					<i class="fa fa-search"></i> 검색
				</button>
				<button id="callObsStsSearchWebBtn" type="button"  class="btn btn-sm btn-primary web-mod">
					<i class="fa fa-search"></i> 검색
				</button>
				<button id="callObsStsSaveWebBtn" type="button" class="btn btn-success  btn-sm web-mod">
			  		<i class="fa fa-download " ></i> 장애처리저장
				</button>
				<button id="callObsStsModSaveWebBtn" type="button" class="btn btn-warning  btn-sm web-mod">
			  		<i class="fa fa-edit" ></i> 장애처리수정
				</button>
				<button id="callObsStsModCancelWebBtn" type="button" class="btn btn-danger btn-sm web-mod">
			  		<i class="fa fa-download " ></i> 처리수정취소
				</button>
			</div>
		</div>
		</div>
		<div class="col-md-7" >
			<div class="grid-wrapper p-b-5" id="callObsStsGridWrap" >
				<table id="callObsStsGrid" ></table>
				<div id="callObsStsGridNavi" ></div>
			</div>
			<!--  처리현황 -->
			<div class="grid-wrapper" >
				<table id="callObsStsHistGrid"  ></table>
				<div id="callObsStsHistGridNavi"></div>
			</div>
		</div>
		<!-- 점포 상세정보 -->		
		<div class="col-md-5 p-r-0" >
			<div class="view-form white p-0">
				<form class="form-horizontal  form-bordered p-5">
					<div class="form-group">
						<input type="hidden" id="callObsStsSelectCompCd" >
						<input type="hidden" id="callObsStsSelectRcptSeq" >
						<input type="hidden" id="callObsStsSelectRcptStsSeq" >					
						<div class="control-label p-0">
							<div class="view-form m-b-5">
								<div class="form-horizontal  form-bordered min">
								    <div class="form-group">
								        <label class="col-md-p20 control-label">점포</label>
								        <div class="col-md-p80" >
							        		<p id="callObsStsCompNmView" class="form-control-static "></p>
								        </div>
								    </div>
								    <div class="form-group">
								        <label class="col-md-p20 control-label">모델명</label>
								        <div class="col-md-p80 text-left" >
								        	<p id="callObsStsPrdNmView"  class="form-control-static "></p>
								        </div>
								    </div>
								    <div class="form-group">
								        <label class="col-md-p20 control-label">장애유형</label>
								        <div class="col-md-p80 text-left" >
								        	<p id="callObsStsObsNmView"  class="form-control-static "></p>
								        </div>
								    </div>
								    <div class="form-group">
								        <label class="col-md-p20 control-label">접수자</label>
								        <div class="col-md-p30 text-left" >
											<p id="callObsStsWriterNmView"  class="form-control-static "></p>
								        </div>
								        <label class="col-md-p20 control-label">접수일시</label>
								        <div class="col-md-p30 text-left" >
											<p id="callObsStsObsDtTimeView"  class="form-control-static "></p>
								        </div>
								    </div>
								    <div class="form-group">
								        <label class="col-md-p20 control-label">신고자</label>
								        <div class="col-md-p80 text-left" >
											<p id="callObsStsCustInfoView"  class="form-control-static"></p>
								        </div>
								    </div>
								    <div class="form-group ">
								        <label class="col-md-p20 control-label">담당부서</label>
								        <div class="col-md-p30 text-left " > 
								        	<p id="callObsStsAspPartView"  class="form-control-static "></p>
								        </div> 
								        <label class="col-md-p25 control-label">담당엔지니어</label>
								        <div class="col-md-p25 text-left " >
								        	<p id="callObsStsEngrmView"  class="form-control-static "></p>
								        </div>
								    </div> 
								    <div class="form-group ">
								        <label class="col-md-p20 control-label">접수내용</label>
								        <div class="col-md-p80 text-left " >
									       	<pre id="callObsStsContView" class="height-75 overflow-y-scroll"></pre>
								        </div>
								    </div>
								     <!-- div class="form-group">
								        <label class="col-md-p30 control-label">서비스 리포트첨부</label>
								        <div class="col-md-p70   text-left form-inline" >
								        	<input type="hidden" id="callObsStsSelectCompCd" >
								        	<input type="hidden" id="callObsStsSelectRcptSeq" >
								        	<input type="hidden" id="callObsStsSelectRcptStsSeq" >
								        	<button type="button" id="callObsStsCompFileAddBtn" class="btn btn-sm btn-info">
												<i class="fa fa-upload"></i> 서류등록
											</button>
								        	<div id="callObsStsCompFileNmView" class="input-group" ></div>
								        </div>
								    </div -->
								</div>
							</div>
							<div class="view-form">
								<div class="form-horizontal  form-bordered min">
								<!-- <input type="hidden" id="callObsStsArea"> -->
								<input type="hidden" id="tmpCmplDate">
								<input type="hidden" id="tmpCmplTime">
								<input type="hidden" id="callObsStsEngrNm">
								<input type="hidden" id="callObsStsEngrSeq">
								<input type="hidden" id="callObsStsLastYn">						
								    <div class="form-group">
								        <label class="col-md-p20 control-label">처리상태</label>
								        <div class="col-md-p30 text-left" >
											<select id="callObsStsType" class="form-control input-sm">
						                    </select>
								        </div>
								    	<label class="col-md-p20 control-label">유무상</label>
								        <div class="col-md-p30 text-left " >
										    <select class="form-control input-sm" id="callObsStsCostType">
											</select>
								        </div>
								    </div>
								    <div class="form-group">
								    	<label class="col-md-p20 control-label">담당부서</label>
								    	<div class="col-md-p30 text-left" >
								        	<select class="form-control input-sm" id="callObsStsArea">
												<option value="" >선택</option>
											</select>
								        </div>
								        <label class="col-md-p20 control-label p-t-5">담당<br/>엔지니어</label>
								        <div class="col-md-p30 text-left " id="callObsStsEngrForm" >
								        	<select class="form-control input-sm" id="callObsStsEngr">
											</select>
								        </div>								      
								    </div>
								    <!-- <div class="form-group ">
								    	<label class="col-md-p15 control-label">담당지역</label>
								        <div class="col-md-p35 text-left " >
								        	<select class="form-control input-sm" id="callObsStsArea">
												<option value="" >선택</option>
											</select>
								        </div>
								        <label class="col-md-p15 control-label">담당자</label>
								        <div class="col-md-p35 text-left " id="callObsStsEngrForm" >
								        	<select class="form-control input-sm" id="callObsStsEngr">
											</select>
								        </div>
								    </div>
								    <div class="form-group">
								        <label class="col-md-p15 control-label">처리일시</label>
								        <div class="col-md-p85 text-left form-inline" >
											<div class="input-group date" id="callObsStsDtForm" data-date-format="yyyy-mm-dd">
	                                            <input type="text"  id="callObsStsDt" name="callObsStsDt" size="10" class="form-control" placeholder="일자" />
	                                            <span class="input-group-addon p-5"><i class="fa fa-calendar"></i></span>
	                                        </div>
								        	<div class="input-group bootstrap-timepicker">
												<input id="callObsStsTime" size="10" type="text" class="form-control input-sm"  placeholder="시간"/>
												<span class="input-group-addon p-5"><i class="fa fa-clock-o"></i></span>
											</div>
											<div class="input-group" >
												<select id="callObsStsType1" class="form-control input-sm">
							                    </select>
									        </div>
								    </div> -->
								    <!-- <div class="form-group ">
								        <label class="col-md-p20 control-label">방문일시</label>
								         <div class="col-md-p80 text-left form-inline" >
											<div class="input-group date" id="callObsRcptStsDateForm" data-date-format="yyyy-mm-dd">
	                                            <input type="text"  id="obsRcptStsDate" name="obsRcptStsDate" size="10" class="form-control" placeholder="일자" />
	                                            <span class="input-group-addon p-5" style="min-width:auto;"><i class="fa fa-calendar"></i></span>
	                                        </div>
								        	<div class="input-group bootstrap-timepicker">
												<input id="obsRcptStsTime" size="8" type="text" class="form-control input-sm"  placeholder="시간"/>
												<span class="input-group-addon p-5" style="min-width:auto;"><i class="fa fa-clock-o"></i></span>
											</div>
								        </div>
								    </div> -->								    
								    <div class="form-group ">
								        <label class="col-md-p20 control-label">완료일시</label>
								         <div class="col-md-p80 text-left form-inline" >
											<div class="input-group date" id="obsRcptStatusCompDateForm" data-date-format="yyyy-mm-dd">
	                                            <input type="text"  id="callObsStsDt" name="callObsStsDt" size="10" class="form-control" placeholder="일자" />
	                                            <span class="input-group-addon p-5" style="min-width:auto;"><i class="fa fa-calendar"></i></span>
	                                        </div>
								        	<div class="input-group bootstrap-timepicker">
												<input id="callObsStsTime" size="8" type="text" class="form-control input-sm"  placeholder="시간"/>
												<span class="input-group-addon p-5" style="min-width:auto;"><i class="fa fa-clock-o"></i></span>
											</div>
								        </div>
								    </div>	
								    <div class="form-group ">
								    	<label class="col-md-p20 control-label">장애원인</label>
								    	 <div class="col-md-p80 text-left" >
								    	    <div id="obsStsLv4CompBox">
									    	 <select id="callObsStsLv4" class="form-control input-category">
												<option value="">장애원인</option>
				                    		</select>
				                    		</div>
								    	 </div>
								    </div>
								    <div class="form-group ">
								        <label class="col-md-p20 control-label">처리내용</label>
								        <div class="col-md-p80 text-left " >
									        <textarea id="callObsStsCont" class="form-control rezise-off" placeholder="내용" rows="3" ></textarea>
								        </div>
								    </div>
								    <div class="form-group ">
								        <!-- label class="col-md-p20 control-label">입금여부</label>
								        <div class="col-md-p30 text-left " >
								        	<select class="form-control input-sm" id="callObsStsDpstYn">
												<option value="" >선택</option>
												<option value="N" >미입금</option>
												<option value="Y" >입금</option>
											</select>
								        </div>
								        <label class="col-md-p20 control-label">입금일</label>
								        <div class="col-md-p30 text-left " >
						        		<input type="text" class="form-control input-sm " id="obsRcptCostDt" placeholder=""> 
							        		<div class="input-group date" id="callObsStsCostDtForm" data-date-format="yyyy-mm-dd">
	                                            <input type="text"  id="callObsStsCostDt" name="callObstsCostDt" size="14" class="form-control p-5" placeholder="일자" />
	                                            <span class="input-group-addon p-5"><i class="fa fa-calendar"></i></span>
	                                        </div>
								        </div -->
								    </div>
								    <div class="form-group ">
								   <!--  	<label class="col-md-p20 control-label">입금자명</label>
								        <div class="col-md-p30 text-left " >
							        		<input type="text" class="form-control input-sm " id="callObsStsDpstNm" placeholder="">
								        </div> -->
								        <label class="col-md-p20 control-label">금액</label>
								        <div class="col-md-p30 text-left" >
							        	<input type="text" class="form-control input-sm text-right " id="callObsStsCost" maxlength="15" placeholder=""> 
								        </div>
								        <label class="col-md-p20 control-label p-t-5">담당자</br>서명</label>
								        <div class="col-md-p30 text-left form-inline" >
								        	<input id="signSaveFileWebPath" type="hidden" >
								        	<input id="signSaveFileWebName" type="hidden" >
							        		<button id="callObsStsSignFileAddBtn" type="button" class="btn btn-sm btn-info">
												<i class="fa fa-upload"></i> 서명등록
											</button>
											<div id="callObsStsSighFileNmView" class="input-group" ></div>
								        </div>
								    </div>
								</div>
							</div>
							<div class=" p-0 m-t-5 m-t-5 mobile-mod">
								<div class="search-form clearfix m-b-5 p-5" >
										<div class="search-controls non-icon" >
											<div class="form-group p-0 m-0  text-right">
<!-- 												<div class="col-md-12 text-right" > -->
									        		<button id="callObsStsSaveMobileBtn" type="button" class="btn btn-success  btn-sm ">
												  		<i class="fa fa-download " ></i> 장애처리저장
													</button>
													<button id="callObsStsModSaveMobileBtn" type="button" class="btn btn-warning  btn-sm">
												  		<i class="fa fa-edit" ></i> 장애처리수정
													</button>
													<button id="callObsStsModCancelMobileBtn" type="button" class="btn btn-danger btn-sm">
												  		<i class="fa fa-download " ></i> 처리수정취소
													</button>
<!-- 										        </div> -->
											</div>
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
	<div id="signature-pad" class="m-signature-pad">
		<div class="m-signature-pad--body">
			<canvas></canvas>
		</div>
		<div class="m-signature-pad--footer text-right p-t-10">
			<button type="button" id="signClearBtn" class="btn btn-success btn-sm  pull-left" data-action="clear"><i class="fa fa-eraser">지우기</i></button>
			<button type="button" id="signCloseBtn" class="btn btn-success btn-sm  pull-left m-l-15" data-action="close"><i class="fa fa-times">닫기</i></button>
			<button type="button" id="signSaveBtn" class="btn btn-success  btn-sm " data-action="save"><i class="fa fa-check">저장</i></button>
		</div>
	</div>
	<script src="/js/common/signature_pad.min.js"></script>
	<script src="/js/views/call/call_obstacle_status.js"></script>
</body>
</html>