<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
	<head>
<!--     <script src="/js/views/template/ui-modal-notification.demo.js"></script> -->
	</head>
<body>
<div class="modal-header">
	<button type="button" class="close" data-close-btn="ture"  >×</button>
	<h4 class="modal-title">paragon Grid</h4>
</div>
<div class="modal-body">
	<div class="search-form clearfix" >
           <form class="form-inline" >
			<div class="search-title-group m-r-10">
				<span class="label label-theme search-title">
					<i class="fa fa-search"></i><i data-domain-id="SEARCH_TXT_LAB" >검색조건</i>
				</span>
			</div>
			<!-- 중복되는 부분 -->
			<div class="search-controls" >
				<div data-lang="LC0001"  class="form-group m-r-10">
					<input type="text" lang="" class="form-control input-sm" id="programCode" size="10" placeholder="프로그램코드">
				</div>
				<div class="form-group m-r-10">
					<input type="text" class="form-control input-sm" id="programName" placeholder="프로그램명">
				</div>
			</div>
			<!-- 중복되는 부분 -->
			<div class="search-button-group">
				<button id="programSearchBtn" type="button"  class="btn btn-sm btn-primary m-r-5">
				<i class="fa fa-search"></i> 검색
				</button>
				<button type="button" id="programAddRowBtn" class="btn btn-sm btn-info">
				<i class="fa fa-plus"></i> <i data-domain-id="ADDROW_BTN" >행추가</i>
				</button>
				<button type="button" id="programDelRowBtn" class="btn btn-sm btn-danger">
				<i class="fa fa-minus"></i> <i data-domain-id="DELROW_BTN" >행삭제</i>
				</button>
<!-- 				<button type="button" id="programModGridBtn" data-btn-mod="nomal" class="btn btn-sm btn-success"> -->
<!-- 				<i class="fa fa-edit "></i> 수정 -->
<!-- 				</button> -->
				<button type="button" id="programSaveRowBtn"  class="btn btn-sm btn-success">
				<i class="fa fa-download"></i> <i data-domain-id="SAVE_BTN" >저장</i>
				</button>
			</div>
			</form>
	</div>
	    <form class="form-horizontal">
	            <div class="form-group">
	                <label class="col-md-2 control-label">Default Input</label>
	                <div class="col-md-4">
	                	<div class="col-md-4 p-r-1 p-l-1 ">
		                    <input type="text" class="form-control" size="5"  placeholder="Default input" />
		                </div>
                		<label class="col-md-1 p-r-1  p-l-1 control-label text-center">X</label>
	                	<div class="col-md-3  p-r-1  p-l-1">
		                    <input type="text" class="form-control" size="5" placeholder="Default input" />
		                </div>
                		<label class="col-md-1  p-r-1  p-l-1 control-label text-center">X</label>
	                	<div class="col-md-3  p-r-1  p-l-1">
		                    <input type="text" class="form-control" size="5" placeholder="Default input" />
		                </div>
	                </div>
	                <label class="col-md-2 control-label">Default Input</label>
	                <div class="col-md-4">
	                	<div class="col-md-4 p-r-1 p-l-1 ">
		                    <input type="text" class="form-control" size="5"  placeholder="Default input" />
		                </div>
                		<label class="col-md-1 p-r-1  p-l-1 control-label text-center">X</label>
	                	<div class="col-md-3  p-r-1  p-l-1">
		                    <input type="text" class="form-control" size="5" placeholder="Default input" />
		                </div>
                		<label class="col-md-1  p-r-1  p-l-1 control-label text-center">X</label>
	                	<div class="col-md-3  p-r-1  p-l-1">
		                    <input type="text" class="form-control" size="5" placeholder="Default input" />
		                </div>
	                </div>
	            </div>
	            <div class="hr-line-dashed"></div>
	            <div class="form-group">
	                <label class="col-md-2 control-label">Disabled Input</label>
	                <div class="col-md-10">
	                    <input type="text" class="form-control" placeholder="Disabled input" disabled />
	                </div>
	            </div>
	            <div class="hr-line-dashed"></div>
	        </form>
	<div class="grid-wrapper" >
		<table id="commonModalGrid"  ></table>
		<div id="commonModalGridNavi"></div>
	</div>
</div>
<div class="modal-footer">
	<a href="javascript:;" id="AB" class="btn btn-sm btn-white" data-close-btn="ture" >닫기</a>
</div>

<script src="/js/views/template/common_modal_grid.js"></script>
			
</html>