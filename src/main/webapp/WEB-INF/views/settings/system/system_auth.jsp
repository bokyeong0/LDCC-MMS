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
			
			<div class="search-controls non-icon col-md-12" >
				<div class="form-group col-md-p20">
					<div class="input-group input-group-sm">
						<span class="span-info  input-group-addon">권한</span>
						<select id="systemAuthGroupCombo" class="form-control">
                    	</select>
                   	</div>
            	</div>
			</div>
			<input type="hidden" id="authGroupSeq"> 
			<input type="hidden" id="authGroupModFlag">
			<div class="search-button-group">
<!-- 				<button id="systemAuthSearchBtn" type="button"  class="btn btn-sm btn-primary m-r-5"> -->
<!-- 				<i class="fa fa-search"></i> 검색 -->
<!-- 				</button> -->
				<button type="button" id="systemAuthGroupModBtn" data-authRule="AUTH_MOD"  class="btn btn-sm btn-primary">
				<i class="fa fa-edit"></i> 그룹수정
				</button>
                <button type="button" id="systemAuthGroupAddBtn" data-authRule="AUTH_NEW"  class=" btn btn-sm btn-info">
				<i class="fa fa-plus"></i> 그룹등록
				</button>
				<button type="button" id="systemAuthSaveRowBtn" data-authRule="AUTH_NEW"  class="btn btn-sm btn-success">
				<i class="fa fa-download"></i> 저장
				</button>
<!-- 				<input accesskey=""  >  -->
			</div>
	</div>
	
	
	

	<div class="search-form clearfix" >
		<!-- <div class="form-inline" > -->
			<div class="search-controls non-icon col-md-12" >
				<div class="form-group col-md-p20 input-nobtn">
					<div class="input-group input-group-sm">
<!-- 						<span class="span-info  input-group-addon">기업 분류</span> -->
						<input type="text" class="form-control input-sm" size="30" id="authUserSearchWords" placeholder="사원명, 아이디, 사용자유형"  autocomplete="off" >
						<div class="input-group-btn">
							<button id="systemAuthUserSearchBtn" type="button"  class="btn btn-sm btn-primary">
							<i class="fa fa-search"></i>
							</button>
						</div>
					</div>
				</div>
			</div>
		<!-- </div> -->
	</div>
	
	
	
	<div class="content-form  clearfix" >
		 <div class="col-md-6 minus-5  p-l-0">
<!-- 			 <div class="multi-select-box col-md-10"> -->
			 	<select id="authUserLeft"  multiple class="form-control" style="height: 190px" >
	             </select>
<!-- 			 </div> -->
<!-- 			 <div  class="auth-btn col-md-1  p-l-0 "> -->
<!-- 			 </div> -->
		 </div>
		 <div class="auth-btn col-md-1">
					<button type="button" id="authAddUserSelected" title="선택 추가" class="btn btn-success m-t-10" >
						<i class="fa fa-angle-right"></i>
					</button>
					<button type="button" id="authRemoveUserSelected" title="선택 제거" class="btn btn-success m-t-10">
						<i class="fa fa-angle-left"></i>
					</button>
					<button type="button" id="authAddUserAll" title="모두 추가"  class="btn btn-success m-t-10" >
						<i class="fa fa-angle-double-right"></i>
					</button>
					<button type="button" id="authRemoveUserAll" title="모두 제거" class="btn btn-success m-t-10" >
						<i class="fa fa-angle-double-left"></i>
					</button>
		 </div>
		 <div class="col-md-6 minus-5  p-r-0">
		 	<select id="authUserRight" multiple class="form-control" style="min-height: 190px">
             </select>
		 </div>
	</div>
	    
	<div class="grid-wrapper" >
		<table id="systemAuthGrid"  ></table>
	<!-- 	<div id="systemAuthGridNavi"></div> -->
	</div>
<script src="/js/views/settings/system/system_auth.js"></script>
</body>
</html>