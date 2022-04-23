<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
	<body>
		<div class="modal-header" >
			<button type="button" class="close" data-close-btn="ture">×</button>
			<h4 class="modal-title">공지사항</h4>
		</div>
		<div class="modal-body">
			<div class="panel panel-inverse" data-sortable-id="form-stuff-1">
			    <div class="panel-body view-form">
			        <form class="form-horizontal form-bordered min">
			        
						<div class="form-group">
			                <label class="col-md-2 control-label">제목</label>
			                <div class="col-md-10">
			                    <p id="callNoticeViewTitle" class="form-control-static "></p>
			                </div>
			            </div>
						<div class="form-group">
			                <label class="col-md-2 control-label">작성자</label>
			                <div class="col-md-10">
			                    <p id="callNoticeViewWriter" class="form-control-static "></p>
			                </div>
			            </div>			            
						<div class="form-group">
			                <label class="col-md-2 control-label">등록일</label>
			                <div class="col-md-10">
			                    <p id="callNoticeViewRegDate" class="form-control-static "></p>
			                </div>
			            </div>			            
						<div class="form-group">
			                <label class="col-md-2 control-label">공지기간</label>
			                <div class="col-md-10 form-inline ">
			                 <p id="callNoticeViewDate" class="form-control-static "></p>
			                </div>
			            </div>	
			            <div class="form-group">
			                <label class="col-md-2 control-label">내용</label>
			               	<div class="col-md-10 height-xs" style="overflow-y:scroll;">
			                    <p id="callNoticeViewContent" class="form-control-static "></p>
			                </div>
			            </div>
		        </form>
	        </div>
		</div>
	</div>
	<div class="modal-footer" id="modal-footer">
			<button id="boardNoticeDelBtn" type="button" class="btn btn-sm btn-info pull-left" data-authrule="AUTH_DEL" style="display: inline-block;">
		<i class="fa fa-minus"></i> 삭제
		</button>
		<a class="btn btn-sm btn-white" id="boardNoticeDelPopupCloseBtn" href="javascript:;" data-close-btn="ture">닫기</a>
	</div>	
	
	<script src="/js/views/board/noticeView.js"></script>
</html>