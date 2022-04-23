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
	        <div class="form-horizontal form-bordered min">
                <input id="authGroupSeq" type="hidden"  >
                <input id="authGroupModFlag" type="hidden"  >
	            
	            <div class="form-group">
	                <label class="col-md-2 control-label">상위메뉴</label>
	                <div class="col-md-10">
	                    <select id="popMenuParentSeq" class="form-control"> 
	                        <option value="" >최상위</option>
	                    </select>
	                </div>
	            </div>
	            
	            <div class="form-group">
	                <label class="col-md-2 control-label">메뉴명</label>
	                <div class="col-md-10">
	                    <input  id="popMenuNm"  type="text" class="form-control" >
	                </div>
	            </div>
	            
	            <div class="form-group">
	                <label class="col-md-2 control-label">프로그램코드</label>
	                <div class="col-md-10">
	                    <input id="popMenuProCd"  type="text" class="form-control" >
	                </div>
	            </div>
	            
	            <div class="form-group">
	                <label class="col-md-2 control-label">순번</label>
	                <div class="col-md-10">
	                    <input id="popMenuOrder"  type="text" class="form-control" >
	                </div>
	            </div>
	            
	            <div class="form-group">
	                <label class="col-md-2 control-label" id="popMenuIconLabel" ><i class="" ></i> 아이콘</label>
	                <div class="col-md-10">
	                    <input id="popMenuIcon" type="text" class="form-control" >
	                </div>
	            </div>
	            
	            <div class="form-group">
	                <label class="col-md-2 control-label">사용여부</label>
	                <div class="col-md-10">
	                    <label class="radio-inline">
	                        <input type="radio" name="popMenuUseYn" value="Y" checked />
	                        Y
	                    </label>
	                    <label class="radio-inline">
	                        <input type="radio" name="popMenuUseYn" value="N" />
	                        N
	                    </label>
	                </div>
	            </div>
	        </div>
	    </div>
	</div>
</div>
<div class="modal-footer">
	<a href="javascript:;" class="btn btn-sm btn-white" data-close-btn="ture" >닫기</a>
	<a href="javascript:;" id="menuPopupSaveBtn" class="btn btn-sm btn-success" >저장</a>
</div>
			
<script type="text/javascript">

</script>
</html>