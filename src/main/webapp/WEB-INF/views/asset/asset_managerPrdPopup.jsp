<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
<body>
<div class="modal-header">
	<button type="button" class="close" data-close-btn="ture">×</button>
	<h4 class="modal-title">자산목록 품목별수량</h4>
</div>
<div class="modal-body">
	<div class="grid-wrapper" >
		<table id="assetManagerPrdPopGrid"></table>
		<div id="assetManagerPrdPopGridNavi"></div>
	</div>
</div>
<div class="modal-footer">
	<a href="javascript:;" id="AB" class="btn btn-sm btn-white" data-close-btn="ture" >닫기</a>
</div>

<script src="/js/views/asset/asset_managerPrdPopup.js"></script>

</html>
