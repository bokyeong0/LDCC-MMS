<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
<head>
<script src="/js/common/chart.js"></script>
<script src="/js/paragon/paragon-chart.js"></script>
</head>
<body>
<div class="menu-cate" >
<ol class="breadcrumb pull-right"></ol>
<h1 class="page-header"></h1>
</div>
	<div id="dashboard01Content" class="content-form white clearfix" >
		<div class="content-heading">
				<div class="panel-heading-btn">
					<a href="javascript:;" id="dashboard01StartBtnFull" class="btn btn-xs btn-icon btn-circle btn-success" ><i class="fa fa-refresh"></i></a>
					<a href="javascript:;" id="dashboard01StopBtnFull" class="btn btn-xs btn-icon btn-circle btn-danger" ><i class="fa fa-refresh"></i></a>
					<a href="javascript:;" id="minDashboard01" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
				</div>
				<h4 class="content-title">장애 처리현황</h4>
			</div>
			<div class="col-md-12" >
				<div class="search-form clearfix " >
					<div class="search-controls non-icon col-md-12" >
						<div class="form-group col-md-p20">
							<div class="input-group input-group-sm">
								<span class="span-info  input-group-addon">고 객 사</span>
								<select id="board01CompCd" class="form-control"></select>
							</div>
						</div>
						<div class="form-group col-md-p20">
							<div class="input-group input-group-sm">
								<span class="span-info  input-group-addon">브 랜 드</span>
								<select id="board01BrndCd" class="form-control input-sm">
									<option value="">선택</option>
								</select>
							</div>
						</div>
					</div>
					
					<div class="search-button-group">
						<button id="dashboard01SearchWebBtn" type="button" class="btn btn-sm btn-primary m-r-5">
						<i class="fa fa-search"></i> 검색
						</button>
						<button id="fullDashBoard01Btn" type="button" class="btn btn-sm btn-default m-r-5">
						<i class="fa fa-expand"></i> 최대화
						</button>
						<button id="dashboard01StartBtn" type="button" class="btn btn-sm btn-info m-r-5">
						<i class="fa fa-refresh"></i> 자동조회
						</button>
						<button id="dashboard01StopBtn" type="button" class="btn btn-sm btn-danger m-r-5">
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
							<div class="view-form" id="board1pie-chart1">
								<div class="form-horizontal  form-bordered min">
								    <div class="form-group ">
								        <div class="text-center"  >
								        	<div class="form-group m-r-10">
												<div class="input-group input-group-sm">
													<span class="span-inverse  input-group-addon bg-red">오늘</span>
													<input type="text" class="form-control input-sm text-center chart-title" id="p1" readOnly>
												</div>
											</div>
								        </div>
								    </div>
								    <div class="form-group">
								        <div class="text-center char-form"   >
											<canvas id="pie-chart1" class="chart-canvas" style="height:210px; width:318px; "></canvas>
								        </div>
								    </div>
								    <div class="form-group ">
								        <div class="text-center chart-bottom cursor-pointer"  id="c1" >
								        </div>
								    </div>
								</div>
							</div>
						</div>
						<div class="control-label  col-md-3 p-0">
							<div class="view-form" id="board1pie-chart2">
								<div class="form-horizontal  form-bordered min">
									 <div class="form-group ">
								        <div class="text-center"  >
								        	<div class="form-group m-r-10">
												<div class="input-group input-group-sm">
													<span class="span-inverse  input-group-addon">주간</span>
													<input type="text" class="form-control input-sm text-center chart-title" id="p2" readOnly>
												</div>
											</div>
								        </div>
								    </div>
								    <div class="form-group">
								        <div class=" text-center char-form" >
											<canvas id="pie-chart2" class="chart-canvas"  style="height:210px; width:318px; "></canvas>
								        </div>
								    </div>
								    <div class="form-group ">
								        <div class=" text-center chart-bottom cursor-pointer" id="c2">
								        </div>
								    </div>
								</div>
							</div>
						</div>
						<div class="control-label  col-md-3 p-0">
							<div class="view-form" id="board1pie-chart3">
								<div class="form-horizontal  form-bordered min">
								    <div class="form-group">
								    	<div class="text-center"  >
								        	<div class="form-group m-r-10">
												<div class="input-group input-group-sm">
													<span class="span-inverse  input-group-addon">월간</span>
													<input type="text" class="form-control input-sm text-center chart-title" id="p3" readOnly>
												</div>
											</div>
								        </div>
								    </div>
								    <div class="form-group">
								        <div class=" text-center char-form" >
											<canvas id="pie-chart3" class="chart-canvas" style="height:210px; width:318px; "></canvas>
								        </div>
								    </div>
								    <div class="form-group ">
								        <div class=" text-center chart-bottom cursor-pointer" id="c3">
								        </div>
								    </div>
								</div>
							</div>
						</div>
						<div class="control-label  col-md-3 p-0">
							<div class="view-form" id="board1pie-chart4">
								<div class="form-horizontal  form-bordered min">
									<div class="form-group">
										<div class="text-center"  >
								        	<div class="form-group m-r-10">
												<div class="input-group input-group-sm">
													<span class="span-inverse  input-group-addon">연간</span>
													<input type="text" class="form-control input-sm text-center chart-title" id="p4" readOnly>
												</div>
											</div>
								        </div>
							        </div>
								    <div class="form-group">
								        <div class=" text-center char-form" >
											<canvas id="pie-chart4" class="chart-canvas" style="height:210px; width:318px; "></canvas>
								        </div>
								    </div>
								    <div class="form-group ">
								        <div class="text-center chart-bottom cursor-pointer" id="c4">
								        </div>
								    </div>
								</div>
							</div>
						</div>
						<div class="control-label col-md-12 p-0">
							<div class="view-form">
								<div class="form-horizontal  form-bordered min">
								    <div class="form-group">
								        <div class=" text-center" >
											  <canvas id="board1line-chart" style="height:400px; " ></canvas>
								        </div>
								    </div>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
	<script src="/js/views/dashboard/board01.js"></script>
</body>
</html>