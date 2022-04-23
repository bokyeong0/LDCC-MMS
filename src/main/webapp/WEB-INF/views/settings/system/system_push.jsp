<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >

<html>
<body>

<div class="" >
<ol class="breadcrumb pull-right"></ol>
<h1 class="page-header"></h1>
</div>
	

	<div class="search-form clearfix" >
		<div class="form-inline" >
			<div class="search-controls non-icon" >
				<div class="form-group m-r-10">
					<div class="input-group input-group-sm">
						<input type="text" class="form-control input-sm" size="30" id="pushUserSearchWords" placeholder="사원명, 사번, 아이디,직무"  autocomplete="off" >
						<div class="input-group-btn">
							<button id="systemPushUserSearchBtn" type="button"  class="btn btn-sm btn-primary m-r-5">
							<i class="fa fa-search"></i>
							</button>
						</div>
					</div>
					<button type="button" id="systemPushSendBtn"  class="btn btn-sm btn-success">
					<i class="fa fa-upload"></i>선택 사용자 전송
					</button>
					<div class="input-group input-group-sm">
						<select class="form-control input-sm" id="systemPushArea">
							<option value="" >선택</option>
						</select>
					</div>
					<button type="button" id="systemPushAreaSendBtn"  class="btn btn-sm btn-success">
					<i class="fa fa-upload"></i>선택 권역 전송
					</button>
				</div>
			</div>
		</div>
	</div>
	
	
	
	<div class="content-form  clearfix" >
		 <div class="col-md-6 minus-5  p-l-0">
<!-- 			 <div class="multi-select-box col-md-10"> -->
			 	<select id="pushUserLeft"  multiple class="form-control" style="height: 190px" >
	             </select>
<!-- 			 </div> -->
<!-- 			 <div  class="auth-btn col-md-1  p-l-0 "> -->
<!-- 			 </div> -->
		 </div>
		 <div class="auth-btn col-md-1">
					<button type="button" id="pushAddUserSelected" title="선택 추가" class="btn btn-success m-t-10" >
						<i class="fa fa-angle-right"></i>
					</button>
					<button type="button" id="pushRemoveUserSelected" title="선택 제거" class="btn btn-success m-t-10">
						<i class="fa fa-angle-left"></i>
					</button>
					<button type="button" id="pushAddUserAll" title="모두 추가"  class="btn btn-success m-t-10" >
						<i class="fa fa-angle-double-right"></i>
					</button>
					<button type="button" id="pushRemoveUserAll" title="모두 제거" class="btn btn-success m-t-10" >
						<i class="fa fa-angle-double-left"></i>
					</button>
		 </div>
		 <div class="col-md-6 minus-5  p-r-0">
		 	<select id="pushUserRight" multiple class="form-control" style="min-height: 190px">
             </select>
		 </div>
	</div>
	<div class="search-form clearfix" >
			<div class="search-controls non-icon" >
				<div class="form-group ">
						<textarea id="pushSendMsg" class="form-control rezise-off" placeholder="내용" rows="8"></textarea>
				</div>
			</div>
	</div>
<script src="/js/views/settings/system/system_push.js"></script>
</body>
</html>