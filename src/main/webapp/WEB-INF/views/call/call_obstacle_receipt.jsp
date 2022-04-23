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
<div class="menu-cate" >
<ol class="breadcrumb pull-right"></ol>
<h1 class="page-header"></h1>
</div>
	<div id="callBtnGroup" class="search-form clearfix ">
			<input type="hidden" id="USERID"  value="${sessionScope.s_callExt}" >
			<input type="hidden" id="EXT" value="${sessionScope.s_callExt}" >
			<!-- 중복되는 부분 -->
			<div id="shoftPhoneGroup"  class="search-controls non-icon col-md-12 m-t-0"  >
				<div class="search-button-group">
					<button id="obsRcptSaveBtn" type="button" class="btn btn-sm btn-success" data-authRule="AUTH_SAVE">
						<i class="fa fa-download"></i> 저장
					</button>
				</div>
			</div>
			<div class="search-button-group">

			</div>
	</div>
    <div id="StoreGroup" class="search-form clearfix m-b-5 min-btn-size ldcc-obstacle" style="min-height: 25px;">
		<div class="col-md-5  p-0 m-0">
			<div class="input-group">
				<span class="input-group-addon span-primary ">검색</span>
				   <input type="text" class="form-control input-sm"  id="obsStrSearchNm" value="" placeholder="검색어를 입력해 주세요. (점포코드, 점포명, 점포전화번호)" autocomplete="off" >
				<div class="input-group-btn">
					<button id="obsStrSearchReset" type="button" class="btn  btn-sm" style="min-width:35px;"  data-close-btn="ture">
					<i class="fa fa-times " ></i>
				   </button>
				</div>
			</div>
	    </div>
	       
			<!-- 점포정보 -->
		   <div class="table-responsive" style="display:block;margin-top: 40px;">
		   	<div class="form-horizontal  form-bordered min">
			 <input type="hidden" id="obsSelectAstSeq" >
			 <input type="hidden" id="obsSelectAstSt"  >
			 <input type="hidden" id="obsSelectStrCd"  >
			 <input type="hidden" id="obsSelectBrndCd" >
			 <input type="hidden" id="obsSelectCompCd" >		   	
		     <table class="table table-bordered">
		       <thread>
		         <tr>
		           <th>점포코드</th>
		           <th>점포명</th>
		           <th>점포형태</th>
		           <th>점포주소</th>
		           <th>점포전화번호</th>
		           <th>추가운영점포</th>
		           <th>VPN IP</th>
		           <th>통신사</th>
		           <th>AP여부</th>
		           <th>지역</th>
		           <th>서비스리포트첨부</th>
		           <th>특이사항</th>
		         </tr>
		       </thread>
		       <tbody>
		       	<tr>
		       		<td class="col-md-1 p-3">
					<p class="form-control-static" id="obsSelectStrMngCd">	
		       		</td>
		       		<td class="col-md-1 p-3">
					<p class="form-control-static" id="obsSelectStrNm" style="display:inline;"></p>			
		       		</td>
		       		<td class="col-md-1 p-3"><p class="form-control-static" id="obsSelectStrSt"></p></td>
		       		<td class="col-md-1 p-3"><p class="form-control-static" id="obsSelectStrAddr1"></p></td>
		       		<td class="col-md-1 p-3"><p class="form-control-static" id="obsSelectStrPhone" ></p></td>
		       		<td class="col-md-1 p-3"><p class="form-control-static" id="obsSelectStrAddMngStr" ></p></td>
		       		<td class="col-md-1 p-3"><p class="form-control-static" id="obsSelectStrVpnModel" ></p></td>	
		       		<td class="col-md-1 p-3"><p class="form-control-static" id="obsSelectStrTelecomCd" ></p></td>
		       		<td class="col-md-1 p-3"><p class="form-control-static" id="obsSelectStrApYN" ></p></td>
		       		<td class="col-md-1 p-3"><p class="form-control-static" id="obsSelectStrArea"></p></td>		       			       		
		       		<td class="col-md-1 p-3"><div id="callObsRcptCompFileNmView" class="input-group form-control-static" ></div></td>
		       		<td class="col-md-1 p-3"><textarea class="form-control p-3 rezise-off" readonly placeholder="내용" style="width:150px;height:70px;"  id="obsSelectStrEtcMemo"></textarea></td>	
		       	</tr>
		       </tbody>
		     </table>
		    </div>
		   </div>
		   <!-- 점포정보 -->	    
	</div>		
	<div class="content-form white clearfix" >

		<div class="col-md-12" >
			<div class="view-form white p-0">
				<form class="form-horizontal  form-bordered p-5 ">
					<div class="form-group">
						<div class="control-label  col-md-8 p-5 m-b-10">
						    <p class="text-left"><strong>접수내역</strong></p>
							<div class="view-form m-b-5">
								<div class="form-horizontal  form-bordered min">
								    <div class="form-group">
								        <label class="col-md-p15 control-label">모델명</label>
								        <div class="col-md-p85" >
							        		<div class="form-group form-control-static p-0">
												<input type="text" class="form-control input-sm " id="obsAutoPrdSearch"  placeholder="분류명, 품명을 입력하세요(2자 이상)" autocomplete="off" >
											</div>
								        </div>
								    </div>
								    <div class="form-group ">
								        <label class="col-md-p15 control-label">모델명선택</label>
								        <div class="col-md-p50 text-left form-inline" >
								        	<div class="input-group width-full">
												<input type="hidden" class="form-control" id="obsAutoPrdCd" value="">
												<input type="text" class="form-control" id="obsAutoPrdNm" value="">
												<div class="input-group-btn">
													<button id="obsAutoPrdNmResetBtn" type="button" class="btn  btn-sm">
												  		<i class="fa fa-times " ></i>
													</button>
												</div>	
											</div>				
								        </div>
								        <label class="col-md-p15 control-label">제품범주</label>
								        <div class="col-md-p20 text-left" >
								        	<div class="input-group">
								        		<select id="standardObstacleLv1" class="form-control input-sm">
													<option value="#"  >제품범주</option>
								            	</select>
								            </div>
								        </div>
								    </div>
								   
								    <div class="form-group form-inline">
								        <label class="col-md-p15 control-label">장애유형</label>
								        <div class="col-md-p85 text-left" >
							        		<select id="obsRcptLv1" class="form-control input-sm type-input">
												<option value=""  >제품군</option>
						                    </select>
											<select id="obsRcptLv2" class="form-control input-sm type-input">
												<option value=""  >장애구분</option>
						                    </select>
											<select id="obsRcptLv3" class="form-control input-sm type-input">
												<option value=""  >장애유형</option>
						                    </select>
								        </div>
								    </div>
								    <div class="form-group ">
								        <label class="col-md-p15 control-label">접수일시</label>
								        <div class="col-md-p35 text-left form-inline" >
											<div class="input-group date" id="obsRcptDateForm" data-date-format="yyyy-mm-dd">
	                                            <input type="text"  id="obsRcptDate" name="obsRcptStsDate" size="10" class="form-control" placeholder="일자" />
	                                            <span class="input-group-addon p-5" style="min-width:auto;"><i class="fa fa-calendar"></i></span>
	                                        </div>
								        	<div class="input-group bootstrap-timepicker">
												<input id="obsRcptTime" size="8" type="text" class="form-control input-sm"  placeholder="시간"/>
												<span class="input-group-addon p-5" style="min-width:auto;"><i class="fa fa-clock-o"></i></span>
											</div>
								        </div>
								        <label class="col-md-p10 control-label">시리얼</label>
								        <div class="col-md-p40 text-left" >
								        	<div class="input-group width-full">
								        		<input type="hidden" id="obsSelectSerialNo">
												<input type="text" class="form-control" id="obsRcptAstSerial" value="" disabled>
												<!--  div class="input-group-btn">
													<button id="obsRcptAstAddBtn" type="button" class="btn  btn-sm">
												  		<i class="fa fa-plus " ></i>
													</button>
												</div -->
											</div>
								        </div>
								    </div>
								    <div class="form-group ">
								        <label class="col-md-p15 control-label">신고자</label>
								        <div class="col-md-p85 text-left form-inline" >
											<select id="obsRcptCustType" class="form-control input-sm">
						                    </select>
											<input type="text" class="form-control input-sm " id="obsRcptCustNm" placeholder="전화번호" size="15">
											<!-- <input type="text" class="form-control input-sm " id="obsRcptCustPhone" placeholder="전화번호" size="15">
											<input type="text" class="form-control input-sm " id="obsRcptCustEmail" placeholder="이메일" size="37"> -->
								        </div>
								    </div>
								    <div class="form-group ">
								        <label class="col-md-p15 control-label">접수내용</label>
								        <div class="col-md-p85 text-left " >
									        	<textarea id="obsRcptCont"  class="form-control rezise-off" placeholder="내용" rows="3" ></textarea>
								        </div>
								    </div>
								    
								</div>
							</div>
							<p class="text-left"><strong>처리내역</strong></p>
							<div class="view-form m-b-5">
								<div class="form-horizontal  form-bordered min">
									<div class="form-group ">
								        <label class="col-md-p10 p-l-5 p-r-5 control-label">파트너사</label>
								        <div class="col-md-p20 text-left" >
							        	    <select class="form-control input-sm" id="obsRctStsPater" disabled>
												<option value="" >파트너사</option>
											</select>							          
								        </div> 								                        
								        <div class="col-md-p20 text-left " >
								        	<select class="form-control input-sm" id="obsRcptStsArea">
												<option value="" >담당권역</option>
											</select>
								        </div>
								        <label class="col-md-p15  p-l-5 p-r-5 control-label">담당엔지니어</label>
								        <div class="col-md-p15 text-left " >
								           <input type="hidden" class="form-control" id="obsRcptStsEngrEmail">
								           <input type="hidden" class="form-control" id="obsRcptStsEngrNm">
								           <input type="hidden" class="form-control" id="obsRcptStsEngrID">
								         	<select class="form-control p-0 input-sm" id="obsRcptStsEngr">
												<option value="" >선택</option>
											</select>
								        </div>
								       <label class="col-md-p10 control-label">유무상</label>
								        <div class="col-md-p10 text-left " >
								        	<select class="p-3 input-sm" id="obsRcptStsCostType">
											</select>
								        </div>
								    </div>    

								    <div class="form-group">
								    	<label class="col-md-p10 p-l-5 p-r-5 control-label">방문일시</label>
								        <div class="col-md-p40 text-left form-inline" >
											<div class="input-group date" id="obsRcptStsDateForm" data-date-format="yyyy-mm-dd">
	                                            <input type="text"  id="obsRcptStsDate" name="obsRcptStsDate" size="10" class="form-control" placeholder="일자" />
	                                            <span class="input-group-addon p-5" style="min-width:auto;"><i class="fa fa-calendar"></i></span>
	                                        </div>
								        	<div class="input-group bootstrap-timepicker">
												<input id="obsRcptStsTime" size="8" type="text" class="form-control input-sm"  placeholder="시간"/>
												<span class="input-group-addon p-5" style="min-width:auto;"><i class="fa fa-clock-o"></i></span>
											</div>
								        </div>
								        <label class="col-md-p15 p-l-5 p-r-5 control-label">완료일시</label>
								        <div class="col-md-p35 text-left form-inline" >
											<div class="input-group date" id="obsRcptCompDateForm" data-date-format="yyyy-mm-dd">
	                                            <input type="text"  id="obsRcptCompDate" name="obsRcptCompDate" size="8" class="form-control" placeholder="일자" />
	                                            <span class="input-group-addon p-5" style="min-width:auto;"><i class="fa fa-calendar"></i></span>
	                                        </div>
								        	<div class="input-group bootstrap-timepicker">
												<input id="obsRcptCompTime" size="8" type="text" class="form-control input-sm"  placeholder="시간"/>
												<span class="input-group-addon p-5" style="min-width:auto;"><i class="fa fa-clock-o"></i></span>
											</div>
								        </div>

								    </div>
								    <div class="form-group">
								    	<label class="col-md-p10 p-l-5 p-r-5 control-label">처리상태</label>
								        <div class="col-md-p20 text-left" >
											<select id="obsRcptStsType2" class="form-control input-sm">
						                    </select>
						                </div>
									    <div class="col-md-p20 text-left" >					                    
						                    <select id="obsRcptStsType" class="form-control input-sm">
						                    </select>
								        </div>
								       <label class="col-md-p15 p-l-5 p-r-5 control-label">장애원인</label> 
										<div class="col-md-p35 text-left" >					                    
						               		<div class="input-group pull-left p-r-5">
						               		<select id="obsRcptLv4" class="form-control" >
													<option value="" >장애원인</option>
											</select>
								       		</div>											
								        </div>							       
								    </div>								    
								    <div class="form-group ">
									    <label class="col-md-p10 p-l-5 p-r-5 control-label">금액</label>
								        <div class="col-md-p15 text-left " >
							        		<input type="text" class="form-control input-sm text-right " id="obsRcptStsCost" maxlength="15" placeholder="" disabled> 
								        </div>
								        <div class="col-md-p75 p-20 text-left" >	
								        </div>
								    </div>
								    <div class="form-group ">
								    </div>
								    <div class="form-group ">
								        <label class="col-md-p10 p-l-5 p-r-5 control-label">처리내용</label>
								        <div class="col-md-p90 text-left " >
									        	<textarea id="obsRcptStsCont" class="form-control rezise-off" placeholder="내용" rows="3" ></textarea>
								        </div>
								    </div>
								</div>
							</div>
						   <p class="text-left">
							<button  type="button" class="obsRcptSaveBtn btn btn-sm btn-success pull-right" data-authRule="AUTH_SAVE">
								<i class="fa fa-download"></i> 저장
							</button>
							</p>
						</div>
						<div class="col-md-4" style="margin: 38px 0px;" >
							<div class="view-form">
								<ul id="obsInnerTab" class="nav nav-pills p-b-5 m-b-0 boder-line">
									<li class="active nav-career"><a id="obsInnerTabReceiptBtn" href="#nav-pills-tab-1" data-toggle="tab" aria-expanded="false">장애이력</a></li>
									<li class="nav-career"><a id="obsInnerTabAssetBtn"  href="#nav-pills-tab-2" data-toggle="tab" aria-expanded="false">자산이력</a></li>
									<!-- li class=""><a id="obsInnerTabCustBtn"  href="#nav-pills-tab-3" data-toggle="tab" aria-expanded="false">신고자이력</a></li -->
									<li class="nav-career"><a id="obsInnerTabCustBtn"  href="#nav-pills-tab-4" data-toggle="tab" aria-expanded="false">예방점검이력</a></li>
								</ul>
								<div class="tab-content p-0 m-0 ">
									<div class="tab-pane fade active in " id="nav-pills-tab-1">
										<div class="m-t-5"  data-height="500px" data-scrollbar="true">
											<ul id="obsRcptHstList" class="media-list media-list-with-divider">
											</ul>
										</div>
									</div>
									<div class="tab-pane fade " id="nav-pills-tab-2">
									    <div class="m-t-5"  data-height="500px" data-scrollbar="true">
											<ul id="obsAstHstList"  class="media-list media-list-with-divider">
											</ul>
										</div>
									</div>
									<div class="tab-pane fade " id="nav-pills-tab-4">
									    <div class="m-t-5"  data-height="500px" data-scrollbar="true">
											<ul id="obsPreventHstList"  class="media-list media-list-with-divider">
											</ul>
										</div>
									</div>
								</div>
							</div>

						</div>
					</div>
					<p class="text-left m-t-15 m-b-10"><strong>자산내역</strong></p>
				    <div class="view-form m-b-5">
						<div class="form-group">
						<p class="text-right">
							<select id="callObsAssetSel" class="input-sm">
							  <option value="AST_TYPE2">포스번호</option>
							  <option value="PRD_TYPE_LV2_NM">제품군</option>
							  <option value="PRD_TYPE_LV3_NM">제조사</option>
							  <option value="PRD_NM">모델명</option>
							  <option value="AST_TYPE1">위치정보</option>
							  <option value="AST_SERIAL">시리얼</option>
				            </select>
							<input type="text" class="obs_input_style input-sm" id="callObsAssetSearch" placeholder="">
							<button class="btn btn-sm btn-primary" id="callObsAssetSearchBtn" type="button">
							<i class="fa fa-search"></i> 검색
							</button>
						</p>
							<div class="control-label p-5 text-left">
								<div class="grid-wrapper" >
									<table id="callObsAssetGrid"></table>
									<div id="callObsAssetGridNavi"></div>
								</div>
							</div>
						</div>
				  </div>
				</form>
			</div>
		</div>
	</div>
	<script src="/js/views/call/call_obstacle_receipt.js"></script>
</body>
</html>