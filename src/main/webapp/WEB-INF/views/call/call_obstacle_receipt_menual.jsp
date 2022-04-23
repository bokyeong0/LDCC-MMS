<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
<body>
<div class="window-header">
<!-- <div  class="drag-not close" > -->
	<button type="button" class="close drag-not p-l-5" data-close-btn="ture"  ><i class="fa fa-times " ></i></button>
	<button type="button" class="close drag-not p-l-5" data-full-btn="ture"  ><i class="fa fa-square-o" ></i></button>
	<button type="button" class="close drag-not p-l-5" data-min-btn="ture"  ><i class="fa fa-minus text-b" ></i></button>
<!-- </div> -->
<!-- 	<button type="button" class="close" data-close-btn="ture"  >×</button> -->
	<h4 class="window-title"></h4>
</div>
<div class="window-body  p-b-0">
	<div class="view-form m-b-10">
		<div class="form-horizontal  form-bordered min">
		    <div class="form-group ">
		        <label class="col-md-p10 control-label">작성자</label>
		        <div class="col-md-p40 text-left " ><p class="form-control-static" id="popObsManualInUserNm" ></p></div>
		        <label class="col-md-p10 control-label">작성일</label>
		        <div class="col-md-p40 text-left " ><p class="form-control-static" id="popObsManualInUserDt" ></p></div>
		    </div>
		    <div class="form-group">
		        <label class="col-md-p10 control-label">회사명</label>
		        <div class="col-md-p90 text-left" >
					<p class="form-control-static" id="popObsManualCompNm" ></p>
		        </div>
		    </div>
		    <div class="form-group">
		        <label class="col-md-p10 control-label">장애분류</label>
		        <div class="col-md-p90 text-left" >
					<p class="form-control-static" id="popObsManualTypeTotTxt" ></p>
		        </div>
		    </div>
		    <div class="form-group ">
		        <label class="col-md-p10 control-label">매뉴얼</label>
		        <div class="col-md-p90 text-left " >
			        	<textarea id="popObsMenual"  class="form-control rezise-off" rows="10" ></textarea>
		        </div>
		    </div>
		</div>
	</div>
	<div class="search-form clearfix" >
           <form class="form-inline" >
			<!-- 중복되는 부분 -->
			<div class="search-controls" >
				<div class="input-group">
					<select id="obsRcptManualCompSearch" class="form-control input-sm">
					</select>
				</div>
				<select id="obsRcptManualLv1Search" class="form-control input-sm">
					<option value=""  >대분류</option>
				</select>
				<select id="obsRcptManualLv2Search" class="form-control input-sm">
					<option value=""  >중분류</option>
				</select>
				<select id="obsRcptManualLv3Search" class="form-control input-sm">
					<option value=""  >소분류</option>
                </select>
<!-- 				<div class="input-group" > -->
<!-- 					<select id="obsRcptManualLv4Search" class="form-control" > -->
<!-- 						<option value="" >선택</option> -->
<!-- 					</select> -->
<!-- 				</div> -->
				<div class="form-group m-r-10">
					<input type="text" class="form-control input-sm" id="obsRcptManualSearchCont" placeholder="장애내용, 매뉴얼">
				</div>
			</div>
			<!-- 중복되는 부분 -->
			<div class="search-button-group">
				<button id="obsRcptManualSearchBtn" type="button"  class="btn btn-sm btn-primary m-r-5">
				<i class="fa fa-search"></i> 검색
				</button>
<!-- 				<button type="button" id="programSa1veRowBtn"  class="btn btn-sm btn-success"> -->
<!-- 				<i class="fa fa-download"></i> <i data-domain-id="SAVE_BTN" >저장</i> -->
<!-- 				</button> -->
			</div>
			</form>
	</div>
	<div class="form-horizontal min">
		<div class="form-group m-b-0 ">
			<div class="col-md-12">
				<div class="grid-wrapper" >
					<table id="obsRcptManualGrid"  ></table>
				</div>
			</div>
		</div>
	</div>
	
</div>
<div class="window-footer">
	<a href="javascript:;" id="AB" class="btn btn-sm btn-white" data-close-btn="ture" >닫기</a>
</div>
	<script src="/js/views/call/call_obstacle_receipt_manual.js"></script>
</html>