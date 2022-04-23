<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
<body>
<div class="menu-cate" >
<ol class="breadcrumb pull-right"></ol>
<h1 class="page-header"></h1>
</div>
	<div class="search-form clearfix" >
           <div class="form-inline" >
			<!-- 중복되는 부분 -->
			<div class="search-controls non-icon" >
				<div class="form-group m-r-10">
				 
					<input type="text" class="form-control input-sm" id="exampleInputAC" size="10" value="${sessionScope.s_userId}" readonly="readonly" >
					<div class="input-group">
						<input type="text" class="form-control input-sm" id="exampleInputA" value="${sessionScope.s_userPositionNm}" placeholder="POP CallBack1">
						<div class="input-group-btn">
							<button id="dcPopup1" type="button" class="btn btn-primary  btn-sm">
						  		<i class="fa fa-search"></i>
							</button>
						</div>
					</div>
				</div>
				<div class="form-group m-r-10">
					<div class="input-group">
						<input type="text" class="form-control input-sm" id="exampleInputB" placeholder="POP CallBack1">
						<div class="input-group-btn">
							<button id="dcPopup2" type="button" class="btn btn-primary  btn-sm">
						  		<i class="fa fa-search"></i>
							</button>
						</div>
					</div>
				</div>
			</div>
			<!-- 중복되는 부분 -->
			<div class="search-button-group">
				<button id="fdfDown" type="button" class="btn btn-sm btn-primary m-r-5">
				<i class="fa fa-file-pdf-o"></i>PDF
				</button>
				<button id=saveBtn1 type="button" class="btn btn-sm btn-primary m-r-5">
				<i class="fa fa-search"></i>저장(체크박스)
				</button>
				<button id="saveBtn2" type="button" class="btn btn-sm btn-primary m-r-5">
				<i class="fa fa-search"></i>저장(Tab ID)
				</button>
				<button id="searchBtn" type="button" class="btn btn-sm btn-primary m-r-5">
				<i class="fa fa-search"></i>검색
				</button>
				<button type="submit" class="btn btn-sm btn-info">
				<i class="fa fa-plus"></i><i data-domain-id="ADDROW_BTN" >행추가</i>
				</button>
				<button id="checkDelBtn" type="button" class="btn btn-sm btn-danger">
				<i class="fa fa-minus"></i><i data-domain-id="DELROW_BTN" >행삭제</i>
				</button>
			</div>
		</div>
	</div>
	<div class="content-form white clearfix" >
		<div class="col-md-3" >
			<div class="search-form clearfix" >
	           <div class="form-inline" >
					<div class="search-controls non-icon" >
						<div class="form-group m-r-10">
							<div class="input-group">
								<input type="text" class="form-control input-sm" id="obsStrSearchNm" value="" placeholder="전화번호,Site명">
								<div class="input-group-btn">
									<button id="obsStrSearchBtn" type="button" class="btn btn-primary  btn-sm">
								  		<i class="fa fa-search"> 검색</i>
									</button>
								</div>
							</div>
						</div>
					</div>
					<!-- 중복되는 부분 -->
				</div>
			</div>
			    
			<div class="grid-wrapper" >
				<table id="callObsRcptStrGrid"  ></table>
			</div>
		</div>
		<div class="col-md-9" >
			<div class="search-form clearfix p-l-10" >
	           <form class="form-inline" >
				<!-- 중복되는 부분 -->
					<div class="search-controls non-icon " >
						<div class="form-group m-r-5">
							<input type="text" class="form-control input-sm" id="obsSelectStrCompNm" size="12"  readonly placeholder="회사명">
						</div>
						<div class="form-group m-r-5">
							<input type="text" class="form-control input-sm" id="obsSelectStrNm" size="12" readonly placeholder="Site명">
						</div>
						<div class="form-group m-r-5">
							<input type="text" class="form-control input-sm" id="obsSelectStrTypeNm" size="12" readonly placeholder="Site유형">
						</div>
						<div class="form-group m-r-5">
							<input type="text" class="form-control input-sm" id="obsSelectStrAreaNm" size="12" readonly placeholder="지역">
						</div>
						<div class="form-group m-r-5">
							<input type="text" class="form-control input-sm" id="obsSelectStrAddr" size="45" readonly placeholder="주소">
						</div>
					</div>
					<!-- 중복되는 부분 -->
					<div class="search-button-group">
						<button type="button" id="callBtn1"  class="btn btn-sm btn-warning">
						<i class="fa fa-upload"></i> <i >돌려주기</i>
						</button>
						<button type="button" id="callBtn2" class="btn btn-sm btn-warning">
						<i class="fa fa-repeat"></i> <i data-domain-id="DELROW_BTN" >당겨받기</i>
						</button>
						<button type="button" id="callBtn3" class="btn btn-sm btn-warning">
						<i class="fa fa-ban"></i> <i data-domain-id="DELROW_BTN" >부재</i>
						</button>
						<button type="button" id="callBtn4" class="btn btn-sm btn-danger">
						<i class="fa fa-phone"></i> <i data-domain-id="DELROW_BTN" >전화걸기</i>
						</button>
						<button type="button" id="callBtn5" class="btn btn-sm btn-danger">
						<i class="fa fa-phone"></i> <i data-domain-id="DELROW_BTN" >전화받기</i>
						</button>
					</div>
				</form>
			</div>
			<div class="view-form white p-0">
				<form class="form-horizontal  form-bordered p-5 ">
					<div class="form-group">
						<div class="control-label  col-md-8 p-5">
							<div class="view-form">
								<div class="form-horizontal  form-bordered min">
								    <div class="form-group">
								        <label class="col-md-2 control-label">제품검색</label>
								        <div class="col-md-10" >
							        		<div class="form-group form-control-static p-0">
												<input type="text" class="form-control input-sm " id="obsAutoPrdSearch"  placeholder="제품명, 파트명을 입력하세요(2자 이상)" autocomplete="off" >
											</div>
								        </div>
								    </div>
								    <div class="form-group form-inline">
								        <label class="col-md-2 control-label">제품선택</label>
								        <div class="col-md-10 text-left" >
												<select id="obsAutoPrdType" class="form-control">
													<option value=""   >제품군</option>
							                    </select>
												<select id="obsAutoPrdMfr" class="form-control">
													<option value=""   >제조사</option>
							                    </select>
												<select id="obsAutoPrd" class="form-control">
													<option value=""   >제품</option>
							                    </select>
												<select id="obsAutoPat" class="form-control">
													<option value=""   >파트</option>
							                    </select>
								        </div>
								    </div>
								    <div class="form-group form-inline">
								        <label class="col-md-2 control-label">장애구분</label>
								        <div class="col-md-7 text-left" >
											<div class="input-group" >
												<select class="form-control" id="obstacleGbn">
													<option value="" >선택</option>
													<option value="1" >접속장애</option>
													<option value="2" >화면 불량</option>
													<option value="3" >네트워크 장애</option>
													<option value="4" >옵션장애</option>
												</select>
											</div>
												<button type="button" class="btn btn-sm btn-info"><i class="fa fa-plus"></i></button>
												<button type="button" id="openObstacleMenual" class="btn btn-sm btn-info"><i class="fa fa-th-list"></i> 장애 매뉴얼</button>

								        </div>
								        <label class="col-md-1 control-label">고객</label>
								        <div class="col-md-2 text-left" >
											<div class="input-group" >
												<input type="text" class="form-control input-sm " id="systemDomainNm" placeholder="신고자">
											</div>
								        </div>
								    </div>
								    <div class="form-group ">
								        <label class="col-md-2 control-label">접수내용</label>
								        <div class="col-md-10 text-left " >
									        <div class="col-md-10 " >
									        	<textarea class="form-control rezise-off" placeholder="내용" rows="3" ></textarea>
										    </div>
									        <div class="col-md-2 " >
										        <a href="javascript:;" class="btn btn-lg btn-danger p-t-6 p-b-5 m-l-5">
													<i class="fa fa-download  pull-left" style="line-height: 50px;" ></i>
													서비스<br>
													접수
												</a>
									    	</div>
								        </div>
								    </div>
								</div>
							</div>
							<div class="control-label ">
								<div class="grid-wrapper" >
									<table id="callObsAssetGrid"  ></table>
								</div>
							</div>
						</div>
						<div class="col-md-4  p-5" >
							<div class="view-form">
								<ul id="obsInnerTab" class="nav nav-pills p-b-5 m-b-0 boder-line">
									<li class="active"><a  id="obsInnerTabEngrBtn"  href="#obsInnerTabEngr" data-toggle="tab" aria-expanded="false">엔지니어</a></li>
									<li class=""><a id="obsInnerTabReceiptBtn" href="#nav-pills-tab-1" data-toggle="tab" aria-expanded="false">접수 내역</a></li>
									<li class=""><a id="obsInnerTabAssetBtn"  href="#nav-pills-tab-2" data-toggle="tab" aria-expanded="false">자산 이력</a></li>
									<li class=""><a id="obsInnerTabHistoryBtn" href="#nav-pills-tab-3" data-toggle="tab" aria-expanded="true">처리 내역</a></li>
								</ul>
								<div class="tab-content p-0 m-0 ">
									<div class="tab-pane fade active in" id="obsInnerTabEngr">
										<div class="grid-wrapper" >
											<table id="callObsEngrGrid"  ></table>
										</div>
									</div>
									<div class="tab-pane fade " id="nav-pills-tab-1">
										<div class="m-t-5"  data-height="336px" data-scrollbar="true">
											<ul class="media-list media-list-with-divider">
												<li class="media media-sm"><div class="media-body"><h5 class="media-heading">[2017-06-21] 접수</h5>4444화면이 고장나서 고침</div></li>
												<li class="media media-sm"><div class="media-body"><h5 class="media-heading">[2017-06-21] 접수</h5>4444화면이 고장나서 고침</div></li>
												<li class="media media-sm"><div class="media-body"><h5 class="media-heading">[2017-06-21] 접수</h5>4444화면이 고장나서 고침</div></li>
												<li class="media media-sm"><div class="media-body"><h5 class="media-heading">[2017-06-21] 접수</h5>4444화면이 고장나서 고침</div></li>
												<li class="media media-sm"><div class="media-body"><h5 class="media-heading">[2017-06-21] 접수</h5>4444화면이 고장나서 고침</div></li>
												<li class="media media-sm"><div class="media-body"><h5 class="media-heading">[2017-06-21] 접수</h5>4444화면이 고장나서 고침</div></li>
												<li class="media media-sm"><div class="media-body"><h5 class="media-heading">[2017-06-21] 접수</h5>4444화면이 고장나서 고침</div></li>
												<li class="media media-sm"><div class="media-body"><h5 class="media-heading">[2017-06-21] 접수</h5>4444화면이 고장나서 고침</div></li>
											</ul>
										</div>
									</div>
									<div class="tab-pane fade " id="nav-pills-tab-2">
									    <div class="m-t-5"  data-height="336px" data-scrollbar="true">
											<ul class="media-list media-list-with-divider">
												<li class="media media-sm"><div class="media-body"><h5 class="media-heading">[2017-06-21] 자산</h5>4444화면이 고장나서 고침</div></li>
												<li class="media media-sm"><div class="media-body"><h5 class="media-heading">[2017-06-21] 자산</h5>4444화면이 고장나서 고침</div></li>
												<li class="media media-sm"><div class="media-body"><h5 class="media-heading">[2017-06-21] 자산</h5>4444화면이 고장나서 고침</div></li>
												<li class="media media-sm"><div class="media-body"><h5 class="media-heading">[2017-06-21] 자산</h5>4444화면이 고장나서 고침</div></li>
												<li class="media media-sm"><div class="media-body"><h5 class="media-heading">[2017-06-21] 자산</h5>4444화면이 고장나서 고침</div></li>
												<li class="media media-sm"><div class="media-body"><h5 class="media-heading">[2017-06-21] 자산</h5>4444화면이 고장나서 고침</div></li>
												<li class="media media-sm"><div class="media-body"><h5 class="media-heading">[2017-06-21] 자산</h5>4444화면이 고장나서 고침</div></li>
												<li class="media media-sm"><div class="media-body"><h5 class="media-heading">[2017-06-21] 자산</h5>4444화면이 고장나서 고침</div></li>
											</ul>
										</div>
									</div>
									<div class="tab-pane fade in" id="nav-pills-tab-3">
									    <div class="m-t-5"  data-height="336px" data-scrollbar="true">
											<ul class="media-list media-list-with-divider">
												<li class="media media-sm"><div class="media-body"><h5 class="media-heading">[2017-06-21] 처리</h5>4444화면이 고장나서 고침</div></li>
												<li class="media media-sm"><div class="media-body"><h5 class="media-heading">[2017-06-21] 처리</h5>4444화면이 고장나서 고침</div></li>
												<li class="media media-sm"><div class="media-body"><h5 class="media-heading">[2017-06-21] 처리</h5>4444화면이 고장나서 고침</div></li>
												<li class="media media-sm"><div class="media-body"><h5 class="media-heading">[2017-06-21] 처리</h5>4444화면이 고장나서 고침</div></li>
												<li class="media media-sm"><div class="media-body"><h5 class="media-heading">[2017-06-21] 처리</h5>4444화면이 고장나서 고침</div></li>
												<li class="media media-sm"><div class="media-body"><h5 class="media-heading">[2017-06-21] 처리</h5>4444화면이 고장나서 고침</div></li>
												<li class="media media-sm"><div class="media-body"><h5 class="media-heading">[2017-06-21] 처리</h5>4444화면이 고장나서 고침</div></li>
												<li class="media media-sm"><div class="media-body"><h5 class="media-heading">[2017-06-21] 처리</h5>4444화면이 고장나서 고침</div></li>
												<li class="media media-sm"><div class="media-body"><h5 class="media-heading">[2017-06-21] 처리</h5>4444화면이 고장나서 고침</div></li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="form-group">
						<div class="control-label p-5 text-left">
							<div class="search-form clearfix tab-inner" >
					           <div class="form-inline" >
									<div class="search-title-group m-r-10">
										<span class="label label-theme search-title">
											<i class="fa fa-search"></i><i >접수현황</i>
										</span>
									</div>
									<!-- 중복되는 부분 -->
									<div class="search-controls" >
										<div class="form-group m-r-10">
											<div class="input-group  p-0">
												<input type="text" class="form-control input-sm" id="aaaa" size="10" value="" placeholder="접수번호">
												<div class="input-group-btn">
													<button id="dcPopup" type="button" class="btn btn-primary  btn-sm">
												  		<i class="fa fa-search"></i>
													</button>
												</div>
											</div>
										</div>
										<div class="form-group m-r-10">
											<select id="systemDomainLangCd" class="form-control">
												<option value=""  data-domain-id="LANG"  >처리상태</option>
						                    </select>
										</div>
										<div class="form-group m-r-10">
											<select id="systemDomainType" class="form-control">
												<option value=""  data-domain-id="TYPE"  >장애유형</option>
						                    </select>
										</div>
										<div class="form-group m-r-10">
											<select id="systemDomainType" class="form-control">
												<option value=""  data-domain-id="TYPE"  >회사명</option>
						                    </select>
										</div>
										<div class="form-group m-r-10">
											<select id="systemDomainType" class="form-control">
												<option value=""  data-domain-id="TYPE"  >권역구</option>
						                    </select>
										</div>
										<div class="form-group m-r-10">
											<input type="text" class="form-control input-sm" id="systemDomainNm" placeholder="Site명">
										</div>
										<div class="form-group m-r-10">
											<button type="button" id="domainSaveRowBtn"  class="btn btn-sm btn-primary">
												<i class="fa fa-search"></i> <i >조회</i>
											</button>
										</div>
									</div>
								</div>
<!-- 								<div class="search-button-group"> -->
<!-- 									<button type="button" id="domainSaveRowBtn"  class="btn btn-sm btn-primary"> -->
<!-- 									<i class="fa fa-search"></i> <i >조회</i> -->
<!-- 									</button> -->
<!-- 								</div> -->
							</div>
							<div class="grid-wrapper" >
								<table id="callObsRcptListGrid"></table>
								<div id="callObsRcptListGridNavi"></div>
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