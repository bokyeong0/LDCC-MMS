<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
<head>
<script src="/js/common/chart.js"></script>
</head>
<body>
<div class="menu-cate" >
<ol class="breadcrumb pull-right"></ol>
<h1 class="page-header"></h1>
</div>
	<div id="dashboard02Content" class="content-form white clearfix" >
		<div class="content-heading">
				<div class="panel-heading-btn">
					<a href="javascript:;" id="dashboard02StartBtnFull" class="btn btn-xs btn-icon btn-circle btn-success" ><i class="fa fa-refresh"></i></a>
					<a href="javascript:;" id="dashboard02StopBtnFull" class="btn btn-xs btn-icon btn-circle btn-danger" ><i class="fa fa-refresh"></i></a>
					<a href="javascript:;" id="dashBoard02MinBtn" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
				</div>
				<h4 class="content-title">장애 처리현황</h4>
			</div>
		<div class="col-md-12 customer-hide">
			
			<div class="search-form clearfix def-width" >
	          <div class="form-inline" >
				<div class="search-controls non-icon" >
					<div class="form-group m-r-10">
						<div class="input-group input-group-sm" >
							<span class="span-info  input-group-addon">접수일자</span>
						    <div class="input-group input-daterange" id="dashboard02DateForm">
	                             <input type="text" class="form-control" id="dashboard02StartSearch" name="start" placeholder="시작일" />
	                             <span class="input-group-addon">~</span>
	                             <input type="text" class="form-control" id="dashboard02EndSearch" name="end" placeholder="종료일" />
	                         </div>
						</div>
					</div>
					<div class="form-group m-r-10">
						<button id="dashboard02SearchBtn" type="button"  class="btn btn-sm btn-primary m-r-5">
							<i class="fa fa-search"></i> 검색
						</button>
					</div>
				</div>
			</div>
			<div class="search-button-group">
				<button id="dashBoard02PrevBtn" type="button" class="btn btn-sm btn-info m-r-5">
				<i class="glyphicon glyphicon-chevron-left"></i> 이전
				</button>
				<button id="dashBoard02NextBtn" type="button" class="btn btn-sm btn-info m-r-5">
				 다음 <i class="glyphicon glyphicon-chevron-right"></i>
				</button>
				<button id="dashBoard02FullBtn" type="button" class="btn btn-sm btn-default m-r-5">
				<i class="fa fa-expand"></i> 최대화
				</button>
				<button id="dashboard02StartBtn" type="button" class="btn btn-sm btn-primary m-r-5">
				<i class="fa fa-refresh"></i> 자동조회
				</button>
				<button id="dashboard02StopBtn" type="button" class="btn btn-sm btn-danger m-r-5">
				<i class="fa fa-refresh"></i> 자동조회 중지
				</button>
			</div>
		</div>
		</div>
		<div class="col-md-12" >
			<div class="view-form white p-0">
				<form class="form-horizontal  form-bordered p-5 ">
					<div class="form-group">
						<div class="control-label col-md-3 p-0">
							<div id="board2pie-chart1" class="view-form">
								<div class="form-horizontal  form-bordered min">
								    <div class="form-group ">
								    	<div class="text-center"  >
								    		<strong id="board2p1" class="chart-title m-0" ></strong>
								        </div>
								    </div>
								    <div class="form-group">
								        <div class=" text-center char-form" >
											<canvas class="chart-canvas2" style="height:170px; width:318px; "></canvas>
								        </div>
								    </div>
								    <div class="form-group ">
								        <div class="text-center chart-bottom" id="board2c1" >
								        </div>
								    </div>
								</div>
							</div>
						</div>
						<div class="control-label  col-md-3 p-0">
							<div  id="board2pie-chart2" class="view-form">
								<div class="form-horizontal  form-bordered min">
									 <div class="form-group ">
								    	<div class="text-center"  >
								    		<strong id="board2p1" class="chart-title m-0" ></strong>
								        </div>
								    </div>
								    <div class="form-group">
								        <div class=" text-center char-form" >
											<canvas class="chart-canvas2" style="height:170px; width:318px; "></canvas>
								        </div>
								    </div>
								    <div class="form-group ">
								        <div class="text-center chart-bottom" id="board2c2" >
								        </div>
								    </div>
								</div>
							</div>
						</div>
						<div class="control-label  col-md-3 p-0">
							<div  id="board2pie-chart3" class="view-form">
								<div class="form-horizontal  form-bordered min">
								    <div class="form-group ">
								    	<div class="text-center"  >
								    		<strong id="board2p1" class="chart-title m-0" ></strong>
								        </div>
								    </div>
								    <div class="form-group">
								        <div class=" text-center char-form" >
											<canvas class="chart-canvas2" style="height:170px; width:318px; "></canvas>
								        </div>
								    </div>
								    <div class="form-group ">
								        <div class="text-center chart-bottom" id="board2c3" >
								        </div>
								    </div>
								</div>
							</div>
						</div>
						<div class="control-label  col-md-3 p-0">
							<div  id="board2pie-chart4" class="view-form">
								<div class="form-horizontal  form-bordered min">
									<div class="form-group ">
								    	<div class="text-center"  >
								    		<strong id="board2p1" class="chart-title m-0" ></strong>
								        </div>
								    </div>
								    <div class="form-group">
								        <div class=" text-center char-form" >
											<canvas class="chart-canvas2" style="height:170px; width:318px; "></canvas>
								        </div>
								    </div>
								    <div class="form-group ">
								        <div class="text-center chart-bottom" id="board2c4" >
								        </div>
								    </div>
								</div>
							</div>
						</div>
						<div class="control-label col-md-12 p-0">
							<div class="view-form">
								<div class="form-horizontal  form-bordered min">
								    <div class="form-group">
								        <div class=" text-center " >
											  <canvas id="board2line-chart"  ></canvas>
								        </div>
								    </div>
								</div>
							</div>
						</div>
<!-- 						<div class="control-label col-md-12 p-0"> -->
<!-- 							<div class="view-form"> -->
<!-- 								<div class="form-horizontal  form-bordered min"> -->
<!-- 								    <div class="form-group"> -->
<!-- 								        <div class=" text-center char-form" > -->
<%-- 											  <canvas id="line-chart2" style="height:170px; width:318px; "></canvas> --%>
<!-- 								        </div> -->
<!-- 								    </div> -->
<!-- 								</div> -->
<!-- 							</div> -->
<!-- 						</div> -->
					</div>
				</form>
			</div>
		</div>
	</div>
	<script src="/js/views/dashboard/board02.js"></script>
</body>
</html>