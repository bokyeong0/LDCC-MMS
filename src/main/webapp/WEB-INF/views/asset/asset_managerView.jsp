<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
<body>
<div class="modal-header">
	<button type="button" class="close" data-close-btn="ture"  >×</button>
	<h4 class="modal-title"></h4>
</div>
<div class="modal-body" style="max-height: 80vh; overflow-y: auto;">

	<div class="panel panel-inverse" data-sortable-id="form-stuff-1">
	    <div class="view-form">
	    
	        <form class="form-horizontal form-bordered min">
				<div class="form-group">
					<label class="col-md-2 control-label">고객사명</label>
	                <div class="col-md-2 text-center">
	                	<input type="hidden" id="assetManagerViewAspCompCd" val='' />
                    	<p class="form-control-static" id="assetManagerViewCompNm"></p>
	                </div>
	                <label class="col-md-2 control-label">브랜드</label>
	                <div class="col-md-2 text-center">
                    	<p class="form-control-static" id="assetManagerViewBrndNm"></p>
	                </div>
	                <label class="col-md-2 control-label">점포명</label>
			        <div class="col-md-2 text-center" >
			        	<input type="hidden" id="assetManagerViewStrCd" />
			        	<p class="form-control-static" id="assetManagerViewStrNm"></p>
			        </div>
	            </div>

                <div class="form-group">
	                <label class="col-md-2 control-label">제품군</label>
	                <div class="col-md-2 text-center">
	                	<p class="form-control-static" id="assetManagerViewPrdTypeLv2"></p>
	                </div>
	                <label class="col-md-2 control-label">제조사</label>
	                <div class="col-md-2 text-center">
	                	<p class="form-control-static" id="assetManagerViewPrdTypeLv3"></p>
	                </div>
					<label class="col-md-2 control-label">모델명</label>
	                <div class="col-md-2 text-center">
            			<input type="hidden" id="assetManagerViewPrdCd" />
	                	<p class="form-control-static" id="assetManagerViewPrdNm"></p>
	                </div>	                
	            </div>
	            
                <div class="form-group serialPre">
	             	<label class="col-md-2 control-label">SPEC</label>
	                <div class="col-md-2 text-center">
	                	<p class="form-control-static serialBro" id="assetManagerViewPrdSpec"></p>
	                </div>	                
	                <label class="col-md-2 control-label">시리얼</label>
	                <div class="col-md-2 text-center">
	                    <p class="form-control-static serial" id="assetManagerViewSerialNo"
	                    style="overflow:hidden;word-wrap:break-word;"></p>
	                </div>
	                <label class="col-md-2 control-label">계약대상유무</label>
	                 <div class="col-md-2 text-center serialBro" >
	                    <p class="form-control-static" id="assetManageViewSlaYn"></p>
	                </div>
	            </div>
	            
	            <div class="form-group">
	                <label class="col-md-2 control-label">위치</label>
	                <div class="col-md-2 text-center">
	                    <p class="form-control-static" id="assetManagerViewAstType1"></p>
	                </div>
	                <label class="col-md-2 control-label">포스번호</label>
	                <div class="col-md-2 text-center">
	                    <p class="form-control-static" id="assetManagerViewAstType2"></p>
	                </div>
	                <label class="col-md-2 control-label">도입일</label>
	                <div class="col-md-2 text-center" >
	                    <p class="form-control-static" id="assetManagerViewMfrDt" ></p>
	                </div>
	            </div>
	            
	            <div class="form-group">
	                <label class="col-md-2 control-label">무상유지보수시작일</label>
	                 <div class="col-md-2 text-center" >
	                    <p class="form-control-static" id="assetManagerViewFreeStartDt"></p>
	                </div>
	                <label class="col-md-2 control-label">무상유지보수종료일</label>
	                <div class="col-md-2 text-center" >
	                    <p class="form-control-static" id="assetManagerViewFreeEndDt"></p>
	                </div>	            
	                <label class="col-md-2 control-label">자산 상태</label>
	                <div class="col-md-2 text-center">
                         <p class="form-control-static" id="assetManagerViewState"></p>
	                </div>
	            </div>
	            
	            <div class="form-group">
	                <label class="col-md-2 control-label">유상유지보수시작일</label>
	                 <div class="col-md-2 text-center" >
	                    <p class="form-control-static" id="assetManagerViewCostStartDt"></p>
	                </div>
	                <label class="col-md-2 control-label">유상유지보수종료일</label>
	                <div class="col-md-2 text-center" >
	                    <p class="form-control-static" id="assetManagerViewCostEndDt"></p>
	                </div>	            
	                <label class="col-md-2 control-label">비고</label>
	                <div class="col-md-2 text-center">
	                	<div class="col-md-12">
		                	<pre id="assetManagerViewContent" class="overflow-y-scroll" style="min-height:30px;"></pre>
		                </div>
	                </div>
	            </div>
	        </form>
	    </div>
	</div>
	<div class="tab-grid view-form white">
		<ul id="assetInnerTab" class="nav nav-pills p-b-5 m-b-0 boder-line">
			<li data-tab-id="a1" class="active"><a href="#assetHistoryGrid1" data-toggle="tab"><i class="fa fa-picture-o m-r-5"></i> <span class="hidden-xs">자산내역</span></a></li>
			<li data-tab-id="a2" class=""><a href="#assetHistoryGrid2" data-toggle="tab"><i class="fa fa-shopping-cart m-r-5"></i> <span class="hidden-xs">장애내역</span></a></li>
			<li data-tab-id="a2" class=""><a href="#assetHistoryGrid3" data-toggle="tab"><i class="fa fa-shopping-cart m-r-5"></i> <span class="hidden-xs">예방점검내역</span></a></li>
		</ul>
		<div class="tab-content">
			<div class="tab-pane fade active in" id="assetHistoryGrid1"> 
				<div class="tab-grid-wrapper">
					<div class="search-form clearfix tab-inner" >
						<div class="form-inline">
							<div class="search-controls non-icon pull-right" >
								<div class="form-group">
								<button type="button" id="assetManagerViewAddRowBtn" class="btn btn-sm btn-info">
									<i class="fa fa-plus"></i> 추가
								</button>
								<button type="button" id="assetManagerViewDelRowBtn" class="btn btn-sm btn-danger">
									<i class="fa fa-minus"></i> 삭제
								</button>
								<button type="button" id="assetManagerViewSaveRowBtn"  class="btn btn-sm btn-success">
									<i class="fa fa-download"></i> 저장
								</button>
								</div>
							</div>
						</div>
					</div>
					<div class="grid-wrapper" >
						<table id="assetManagerHistoryGrid"></table>
						<div id="assetManagerHistoryGridNavi"></div>
					</div>
				</div>
			</div>
			<div class="tab-pane fade" id="assetHistoryGrid2">
				<div class="tab-grid-wrapper">
					<div class="grid-wrapper" >
						<table id="assetManagerRcptHistoryGrid"></table>
						<div id="assetManagerRcptHistoryGridNavi"></div>
					</div>
				</div>
			</div>
			<div class="tab-pane fade" id="assetHistoryGrid3">
				<div class="tab-grid-wrapper">
					<div class="grid-wrapper" >
						<table id="assetManagerPreventiveCheckHistoryGrid"></table>
						<div id="assetManagerPreventiveCheckGridNavi"></div>
					</div>
				</div>
			</div>
		</div>	
	</div>
</div>
<div class="modal-footer">
	<a href="javascript:;" class="btn btn-sm btn-white" data-close-btn="ture" >닫기</a>
<!-- 	<a href="javascript:;" id="assetManagerViewSaveBtn" class="btn btn-sm btn-success" >저장</a> -->
</div>
			
<script src="/js/views/asset/asset_managerView.js"></script>
</html>