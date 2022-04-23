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
	    <div class="view-form" style="overflow:scroll;height:500px;"><!-- div.attr 삭제금지 -->
	    <form>
			<div id="preventiveCheckNoticeContent" class="form-group">
				
            </div>
		</form>
	    </div>
	</div>
	
</div>

<div id="preventiveCheckNoticeFooter" class="modal-footer">
	
	<a href="javascript:;" class="btn btn-sm btn-white" data-close-btn="ture" >닫기</a>
</div>
			
	<script src="/js/views/check/preventiveCheckNoticeView.js"></script>
</html>

