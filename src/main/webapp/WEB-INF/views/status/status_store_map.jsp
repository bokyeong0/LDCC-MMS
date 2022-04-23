<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
<body>
<div class="menu-cate" >
<ol class="breadcrumb pull-right"></ol>
<h1 class="page-header"></h1>
</div>
	<div class="search-form clearfix" >
				<!-- 중복되는 부분 -->
		<div class="search-controls non-icon col-md-12" >
			<div class="form-group col-md-p20" id="statusStorMapCompSearchGroup">
				<div class="input-group input-group-sm">
					<span class="span-info  input-group-addon">고객사</span>
					<input type="text" class="form-control input-sm" id="statusStorMapCompSearch" value="" autocomplete="off" >
				</div>
			</div>	
			<div class="form-group col-md-p20">
				<div class="input-group input-group-sm">
					<span class="span-info  input-group-addon">브랜드</span>
					<select class="form-control" id="statusStorMapBrndSearch">
						<option value="">선택</option>
					</select>
				</div>
			</div>
			<div class="form-group col-md-p20">
				<div class="input-group input-group-sm">
					<span class="span-info  input-group-addon">점포명</span>
					<input type="text" class="form-control input-sm" id="statusStorMapStrNmSearch" value="" autocomplete="off" placeholder="" >
				</div>
			</div>
		</div>
		<!-- 중복되는 부분 -->
		<div class="search-button-group">
			<button id="searchStoreBtn" type="button" class="btn btn-sm btn-primary">
				<i class="fa fa-search"></i> 검색
			</button>
		</div>
	</div>
	<div class="content-form white clearfix" >
		<div class="col-md-8" >
		   	<div id="statusStorMap" style="height:710px;"></div>
	    </div>
	    <div class="col-md-4" >
	    	<table id="statusStorMapGrid"  ></table>
			<div id="statusStorMapGridNavi"></div>
	    </div>
   </div>
	   
<script src="/js/views/status/status_store_map.js"></script>    
</body>
</html>