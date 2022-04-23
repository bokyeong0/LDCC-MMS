<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
<body>
<div class="modal-header">
	<button type="button" class="close" data-close-btn="ture"  >×</button>
	<h4 class="modal-title"></h4>
</div>
<div class="modal-body">

	<div class="panel panel-inverse" data-sortable-id="form-stuff-1">
	    <div class="view-form">
	    
	        <form class="form-horizontal form-bordered min">
	            <div class="form-group">
	                <label class="col-md-2 control-label">파트너사</label>
	                 <div class="col-md-2 text-center" >
	                    <p class="form-control-static" id="prventiveCheckStrInfoViewAspCompNm"></p>
	                </div>
	                <label class="col-md-2 control-label">고객사</label>
	                <div class="col-md-2 text-center" >
	                    <p class="form-control-static" id="prventiveCheckStrInfoViewCompNm"></p>
	                </div>	            
	                <label class="col-md-2 control-label">브랜드</label>
	                <div class="col-md-2 text-center">
	                    <p class="form-control-static" id="prventiveCheckStrInfoViewBrndNm"></p>
	                </div>
	            </div>
	            
	            <div class="form-group">
	                <label class="col-md-2 control-label">점포명</label>
	                 <div class="col-md-2 text-center" >
	                    <p class="form-control-static" id="prventiveCheckStrInfoViewStrNm"></p>
	                </div>
	                <label class="col-md-2 control-label">지역</label>
	                <div class="col-md-2 text-center" >
	                    <p class="form-control-static" id="prventiveCheckStrInfoViewAreaNm"></p>
	                </div>	            
	            </div>
	        </form>

	    </div>
	</div>
 	<div class="search-form clearfix tab-inner" >
		<div class="form-inline">
			<div class="search-controls non-icon pull-right" >
 				<div class="form-group">
				<button type="button" id="prventiveCheckStrInfoViewAttachDownBtn" class="btn btn-sm btn-info">
					<i class="fa fa-file-image-o"></i> 첨부파일보기
				</button>
				<button type="button" id="prventiveCheckStrInfoViewMngSignDownBtn" class="btn btn-sm btn-danger">
					<i class="fa fa-file-image-o"></i> 관리자서명파일보기
				</button>
				<button type="button" id="prventiveCheckStrInfoViewEngrSignDownBtn" class="btn btn-sm btn-success">
					<i class="fa fa-file-image-o"></i> 엔지니어서명파일보기
				</button>
				</div>
			</div>
		</div>
	</div>
	<div class="grid-wrapper" >
		<table id="preventiveCheckListStrInfoGrid" ></table>
		<div id="preventiveCheckListStrInfoGridNavi"></div>
	</div>
</div>


<div class="modal-footer">
	<a href="javascript:;" class="btn btn-sm btn-white" data-close-btn="ture" >닫기</a>
<!-- 	<a href="javascript:;" id="assetManagerViewSaveBtn" class="btn btn-sm btn-success" >저장</a> -->
</div>
			
<script src="/js/views/check/preventiveCheckListStrInfo.js"></script>
</html>