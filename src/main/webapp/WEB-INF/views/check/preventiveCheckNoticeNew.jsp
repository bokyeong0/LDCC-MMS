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

		<div class="panel-body view-form">
			<form class="form-horizontal form-bordered min">
			    <div class="form-group">
		    		<label class="col-md-2 control-label">예방정검 유의사항</label>
					<div id="preventiveCheckNoticeNewContent" class="col-md-10">
						<textarea rows="10" id="preventiveCheckNoticeContentNewInsert" class="form-control"></textarea>
		           </div>
			    </div>
		    </form>
	    </div>
	</div>
	
</div>
<div id="preventiveCheckNoticeNewHeader" class="modal-footer">
	<a href="javascript:;" id="preventiveCheckNoticeNewSaveBtn" class="btn btn-sm btn-success" >저장</a>
	<a href="javascript:;" class="btn btn-sm btn-white" data-close-btn="ture" >닫기</a>
</div>

			
	<script src="/js/views/check/preventiveCheckNoticeNew.js"></script>
</html>

