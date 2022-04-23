<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
<body>
<div class="" >
<ol class="breadcrumb pull-right"></ol>
<h1 class="page-header"></h1>
</div>
	<!-- <div class="view-form" >
           <form class="form-inline" >
			<div class="search-title-group m-r-10">
				<span class="label label-theme search-title">
					<i class="fa fa-search"></i>검색조건
				</span>
			</div>
			중복되는 부분
			<div class="search-controls" >
				<div class="form-group m-r-10">
					<input type="text" class="form-control input-sm" id="programCode" size="10" placeholder="">
				</div>
				<div class="form-group m-r-10">
					<input type="text" class="form-control input-sm" id="programName" placeholder="">
				</div>
			</div>
		</form>
	</div> -->
	<div class="view-form">
		<form class="form-horizontal  form-bordered">
		    <div class="form-group">
		        <label class="col-md-2 control-label">시스템명</label>
		        <div class="col-md-10" >
		        	<p class="form-control-static">버텍스 프레임 워크</p>
		        </div>
<!-- 		        <label class="col-md-2 control-label">Version</label> -->
<!-- 		        <div class="col-md-4" >1.0.0.0.1</div> -->
		    </div>
		    <div class="form-group">
		        <label class="col-md-2 control-label">Server IP</label>
		        <div class="col-md-4" >
		        	<p class="form-control-static">192.168.0.1</p>
		        </div>
		        <label class="col-md-2 control-label">DataBase</label>
		        <div class="col-md-4" >
		        	<p class="form-control-static">Maria DB</p>
		        </div>
		    </div>
		    <div class="form-group">
		        <label class="col-md-2 control-label">WAS</label>
		        <div class="col-md-4" >
		        	<p class="form-control-static">Tomcat 8</p>
		        </div>
		        <label class="col-md-2 control-label">CPU</label>
		        <div class="col-md-4" >
		        	<p class="form-control-static">2Core 3GHz</p>
		        </div>
		    </div>
		    <div class="form-group">
		        <label class="col-md-2 control-label">MEMORY</label>
		        <div class="col-md-4" >
		        	<p class="form-control-static">32G</p>
		        </div>
		        <label class="col-md-2 control-label">HDD</label>
		        <div class="col-md-4" >
		        	<p class="form-control-static">12TB</p>
		        </div>
		    </div>
		    <div class="form-group">
		        <label class="col-md-2 control-label">최대 활성화 Tab</label>
		        <div class="col-md-10">
		        	<div class="col-xs-4">
						<input type="text" id="customValue_rangeSlider" name="default_rangeSlider" value="" />
					</div>
<!-- 		        	<div class="col-xs-4"> -->
						<button type="button" id="programSaveRowBtn"  class="btn btn-sm btn-success">
							<i class="fa fa-download"></i> 저장
						</button>
<!-- 					</div> -->
		        </div>
		    </div>
		    <div class="form-group">
		        <label class="col-md-2 control-label">내용</label>
		        <div class="col-md-10">
		            <textarea class="form-control" placeholder="Textarea" rows="5"></textarea>
		        </div>
		    </div>
		</form>
	</div>
	<div class="search-form clearfix">
		<form class="form-horizontal">
		    <div class="form-group">
		        <label class="col-md-2 control-label">시스템명</label>
		        <div class="col-md-10">
		            <p class="form-control-static">email@example.com</p>
		        </div>
		    </div>
		    <div class="hr-line-dashed"></div>
		    <div class="form-group">
		        <label class="col-md-2 control-label">시스템명</label>
		        <div class="col-md-10">
		            <input type="text" class="form-control" placeholder="Default input" />
		        </div>
		    </div>
		    <div class="hr-line-dashed"></div>
		    <div class="form-group">
		        <label class="col-md-2 control-label">시스템명</label>
		        <div class="col-md-10">
		            <input type="text" class="form-control" placeholder="Default input" />
		        </div>
		    </div>
		    <div class="hr-line-dashed"></div>
		    <div class="form-group">
		        <label class="col-md-2 control-label">시스템명</label>
		        <div class="col-md-10">
		            <input type="text" class="form-control" placeholder="Default input" />
		        </div>
		    </div>
		    <div class="hr-line-dashed"></div>
		    <div class="form-group">
		        <label class="col-md-2 control-label">시스템명</label>
		        <div class="col-md-10">
		            <input type="text" class="form-control" placeholder="Default input" />
		        </div>
		    </div>
		    <div class="hr-line-dashed"></div>
		    <div class="form-group">
		        <label class="col-md-2 control-label">내용</label>
		        <div class="col-md-10">
		            <textarea class="form-control" placeholder="Textarea" rows="5"></textarea>
		        </div>
		    </div>
		</form>
	</div>
	<div class="search-form clearfix" >
           <form class="form-inline" >
			<div class="search-title-group m-r-10">
				<span class="label label-theme search-title">
					<i class="fa fa-search"></i>검색조건
				</span>
			</div>
			<!-- 중복되는 부분 -->
			<div class="search-controls" >
				<div class="form-group m-r-10">
					<input type="text" class="form-control input-sm" id="programCode" size="10" placeholder="프로그램코드">
				</div>
				<div class="form-group m-r-10">
					<input type="text" class="form-control input-sm" id="programName" placeholder="프로그램명">
				</div>
			</div>
			<!-- 중복되는 부분 -->
			<div class="search-button-group">
				<button id="programSearchBtn" type="button"  class="btn btn-sm btn-primary m-r-5">
				<i class="fa fa-search"></i> 검색
				</button>
				<button type="button" id="programAddRowBtn" class="btn btn-sm btn-info">
				<i class="fa fa-plus"></i> 행추가
				</button>
				<button type="button" id="programDelRowBtn" class="btn btn-sm btn-danger">
				<i class="fa fa-minus"></i> 행삭제
				</button>
				<button type="button" id="programSaveRowBtn"  class="btn btn-sm btn-success">
				<i class="fa fa-download"></i> 저장
				</button>
			</div>
			</form>
	</div>
	    
<div class="grid-wrapper" >
	<table id="systemProgramGrid"  ></table>
	<div id="systemProgramGridNavi"></div>
</div>
<script src="/js/views/settings/template/common_form.js"></script>
</body>
</html>