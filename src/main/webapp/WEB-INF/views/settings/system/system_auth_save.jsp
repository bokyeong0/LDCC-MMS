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
	    <div class="panel-body">
	        <form class="form-horizontal">
                <input id="authGroupSeq" type="hidden"  >
                <input id="authGroupModFlag" type="hidden"  >
	            <div class="form-group">
	                <label class="col-md-3 control-label">권한그룹명</label>
	                <div class="col-md-9">
	                    <input id="authGroupNm" type="text" class="form-control" >
	                </div>
	            </div>
	            <div class="hr-line-dashed"></div>
	            <div class="form-group">
	                <label class="col-md-3 control-label">설명</label>
	                <div class="col-md-9">
	                    <textarea id="authGroupDesc" class="form-control" rows="5"></textarea> 
	                </div>
	            </div>
	        </form>
	    </div>
	</div>
</div>
<div class="modal-footer">
	<a href="javascript:;" class="btn btn-sm btn-white" data-close-btn="ture" >닫기</a>
	<a href="javascript:;" id="authGroupDelBtn" class="btn btn-sm btn-danger">삭제</a>
	<a href="javascript:;" id="authGroupSaveBtn" class="btn btn-sm btn-success" >저장</a>
</div>
			
<script type="text/javascript">

</script>
</html>