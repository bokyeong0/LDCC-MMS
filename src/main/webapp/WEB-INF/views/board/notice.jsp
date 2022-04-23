<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
	<body>
		<div class="menu-cate" >
			<ol class="breadcrumb pull-right"></ol>
			<h1 class="page-header">공지사항</h1>
		</div>
		<div class="search-form clearfix" >
			<div class="search-controls non-icon col-md-12" >
				<div class="form-group col-md-p20" >
					<div class="input-group input-group-sm" >
						<span class="span-info  input-group-addon">공지기간</span>
					    <div class="input-group input-daterange" id="boardNoticeDateGrp">
	                       <input type="text" class="form-control width-100" id="boardNoticeStartDt" name="start" />
	                       <span class="input-group-addon">~</span>
	                       <input type="text" class="form-control width-100" id="boardNoticeEndDt" name="end" />
	                   </div>
					</div>
				</div>
			</div>
		
			<!-- 중복되는 부분 -->
			<div class="search-button-group">
				 <button id="boardNoticeSearchBtn" type="button"  class="btn btn-sm btn-primary">
					<i class="fa fa-search"></i> 검색
				</button>
				<button id="boardNoticeModBtn" type="button" class="btn btn-sm btn-info" data-authRule="AUTH_MOD">
					<i class="fa fa-edit"></i> 수정
				</button>				
				<button id="boardNoticeInsertBtn" type="button" class="btn btn-sm btn-info" data-authRule="AUTH_NEW">
					<i class="fa fa-plus"></i> 등록
				</button>
			</div>
		</div>
		<div class="grid-wrapper" >
			<table id="boardNoticeGrid"></table>
			<div id="boardNoticeGridNavi"></div>
		</div>
		<script src="/js/views/board/notice.js"></script>
	</body>
</html>