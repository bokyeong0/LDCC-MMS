<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
    <head>
    </head>
    <body>
        <div class="modal-header">
            <button type="button" class="close" data-close-btn="ture">X</button>
            <h4 class="modal-title">paragon Grid</h4>
        </div>
        <div class="modal-body">
<!--         	<div class="col-md-12"> -->
<!-- 				<div class="input-group input-group-sm"> -->
<!-- 					<span class="span-info  input-group-addon">검색</span> -->
<!-- 					<input type="text" class="form-control input-sm" id="areaTreeSearchInput" placeholder="지역 검색"> -->
<!-- 				</div> -->
	        	<div class="scroll_box overflow-y-scroll m-t-10" style="height: 500px;">
    	    	    <div id="areaTree"></div>
				</div>
<!--             </div> -->
        </div>
        <div class="modal-footer">
      	    <a href="javascript:;" id="commAreaPopSelectBtn" class="btn btn-sm btn-success">선택</a>
      	    <a href="javascript:;" class="btn btn-sm btn-white" data-close-btn="ture" >닫기</a>
        </div>
    <script src="/js/views/common/common_areaPop.js"></script>
</body>
</html>
