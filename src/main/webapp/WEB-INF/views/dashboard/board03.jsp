<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
<head>
<script src="/js/common/chart.js"></script>
<style type="text/css">
.map-ract{

	background-color: #69a2ce !important;
    border-radius: 30px !important;
    overflow: hidden;
    padding: 0px !important;
    margin: 5px !important;
}
.map-title {
/*  background-color: #69a2ce !important; */
 border-bottom: 3px solid  #307fbb !important;

 
}
.map-content {
 padding: 0px !important ;
}
.map-foot  div.text-left{
     background-color: #b5b5b5 !important;
    
}
.map-title div.text-left{
background: rgb(197,222,234); 
background: -moz-linear-gradient(top, rgba(197,222,234,1) 0%, rgba(138,187,215,1) 31%, rgba(6,109,171,1) 100%); /* FF3.6-15 */
background: -webkit-linear-gradient(top, rgba(197,222,234,1) 0%,rgba(138,187,215,1) 31%,rgba(6,109,171,1) 100%); /* Chrome10-25,Safari5.1-6 */
background: linear-gradient(to bottom, rgba(197,222,234,1) 0%,rgba(138,187,215,1) 31%,rgba(6,109,171,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#c5deea', endColorstr='#066dab',GradientType=0 ); /* IE6-9 */
min-height: 34px;
}
.map-title > div.text-left > h4 {
    white-space: nowrap;
    font-size: 19px  !important;
    font-weight: bold !important;
    color: #fff !important;
    margin: 2px;
    text-indent: 20px;
}
.map-foot > div.text-left  {
	min-height: 44px;
}
.map-foot > div.text-left > h4 {
    font-size: 14px !important;
    font-weight: bold !important;
    margin: 2px;
    color: #fff !important;
/*     text-indent: 20px; */
}
</style>
</head>
<body>
<div class="menu-cate" >
<ol class="breadcrumb pull-right"></ol>
<h1 class="page-header"></h1>
</div>
		<div class="search-form clearfix " >
	          <div class="form-inline" >
				<div class="search-controls non-icon" >
				<div class="form-group"><div class="input-group input-group-sm mini"><span class="span-info  input-group-addon">총</span><input type="text" id="rcptTotCnt" class="form-control text-right" size="7"></div></div>        
				<div class="form-group"><div class="input-group input-group-sm mini"><span class="span-success  input-group-addon">완료</span><input type="text" id="rcptCmplYCnt" class="form-control text-right" size="7"></div></div>     
				<div class="form-group"><div class="input-group input-group-sm mini"><span class="span-warning  input-group-addon">처리중</span><input type="text" id="rcptCmplNCnt" class="form-control text-right" size="7"></div></div>      
				<div class="form-group"><div class="input-group input-group-sm mini"><span class="span-inverse  input-group-addon">유상건</span><input type="text" id="rcptCostCnt" class="form-control text-right" size="7"></div></div>
				</div>
			</div>
			<div class="search-button-group">
				<button id="dashBoard03PrevBtn" type="button" class="btn btn-sm btn-info m-r-5">
				<i class="glyphicon glyphicon-chevron-left"></i> 이전
				</button>
				<button id="dashBoard03NextBtn" type="button" class="btn btn-sm btn-info m-r-5">
				 다음 <i class="glyphicon glyphicon-chevron-right"></i>
				</button>
				<button id="fullDashBoardMap" type="button" class="btn btn-sm btn-default m-r-5">
				<i class="fa fa-expand"></i> 최대화
				</button>
				<button id="refreshRcptMapStartBtn" type="button" class="btn btn-sm btn-primary m-r-5">
				<i class="fa fa-refresh"></i> 자동조회
				</button>
				<button id="refreshRcptMapStopBtn" type="button" class="btn btn-sm btn-danger m-r-5">
				<i class="fa fa-refresh"></i> 자동조회 중지
				</button>
			</div>
		</div>
	<div id="obsMapContentMap" class="content-form white clearfix" >
			<div class="content-heading">
				<div class="panel-heading-btn">
					<a href="javascript:;" id="refreshRcptMapStartBtnFull" class="btn btn-xs btn-icon btn-circle btn-success" ><i class="fa fa-refresh"></i></a>
					<a href="javascript:;" id="refreshRcptMapStopBtnFull" class="btn btn-xs btn-icon btn-circle btn-danger" ><i class="fa fa-refresh"></i></a>
					<a href="javascript:;" id="minDashBoardMap" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
				</div>
				<h4 class="content-title">장애대응 현황</h4>
			</div>
			<div class="search-form expend-form clearfix p-5" >
		          <div class="form-inline" >
					<div class="search-controls non-icon" >
					<div class="form-group"><div class="input-group input-group-sm mini"><span class="span-info  input-group-addon">총</span><input type="text" class="form-control text-right" size="7" ></div></div>        
					<div class="form-group"><div class="input-group input-group-sm mini"><span class="span-success  input-group-addon">완료</span><input type="text" class="form-control text-right" size="7" ></div></div>     
					<div class="form-group"><div class="input-group input-group-sm mini"><span class="span-warning  input-group-addon">처리중</span><input type="text" class="form-control text-right" size="7"></div></div>      
					<div class="form-group"><div class="input-group input-group-sm mini"><span class="span-inverse  input-group-addon">유/무상</span><input type="text" class="form-control text-right" size="7"></div></div>
					</div>
				</div>
		</div>
			<div class="view-form white p-0">
				<form class="form-horizontal  form-bordered p-5 ">
					<div class="form-group">
						<div class="control-label col-md-3 p-0">
							<div class="view-form map-ract">
								<div class="form-horizontal  form-bordered min">
								    <div class="form-group  map-title">
								        <div class="text-left " ><h4 id="dashboardMapTop0" ></h4></div>
								    </div>
								    <div class="form-group">
								        <div class=" text-center map-content" >
											<div id="dashboardMap0" style="height:320px;"></div>
								        </div>
								    </div>
								    <div class="form-group  map-foot ">
								        <div class="text-left" ><h4 id="dashboardMapFoot0" ></h4></div>
								    </div>
								</div>
							</div>
						</div>
						<div class="control-label  col-md-3 p-0">
							<div class="view-form map-ract">
								<div class="form-horizontal  form-bordered min">
								    <div class="form-group  map-title">
								        <div class="text-left " ><h4 id="dashboardMapTop1" ></h4></div>
								    </div>
								    <div class="form-group">
								        <div class=" text-center map-content" >
											<div id="dashboardMap1" style="height:320px;"></div>
								        </div>
								    </div>
								    <div class="form-group  map-foot ">
								        <div class="text-left" ><h4 id="dashboardMapFoot1" ></h4></div>
								    </div>
								</div>
							</div>
						</div>
						<div class="control-label  col-md-3 p-0">
							<div class="view-form map-ract">
								<div class="form-horizontal  form-bordered min">
								    <div class="form-group  map-title">
								        <div class="text-left " ><h4 id="dashboardMapTop2" ></h4></div>
								    </div>
								    <div class="form-group">
								        <div class=" text-center map-content" >
											<div id="dashboardMap2" style="height:320px;"></div>
								        </div>
								    </div>
								    <div class="form-group  map-foot ">
								        <div class="text-left" ><h4 id="dashboardMapFoot2" ></h4></div>
								    </div>
								</div>
							</div>
						</div>
						<div class="control-label  col-md-3 p-0">
							<div class="view-form map-ract">
								<div class="form-horizontal  form-bordered min">
								    <div class="form-group  map-title">
								        <div class="text-left " ><h4 id="dashboardMapTop3" ></h4></div>
								    </div>
								    <div class="form-group">
								        <div class=" text-center map-content" >
											<div id="dashboardMap3" style="height:320px;"></div>
								        </div>
								    </div>
								    <div class="form-group  map-foot ">
								        <div class="text-left" ><h4 id="dashboardMapFoot3" ></h4></div>
								    </div>
								</div>
							</div>
						</div>
					</div>
					<div class="form-group">
						<div class="control-label col-md-3 p-0">
							<div class="view-form map-ract">
								<div class="form-horizontal  form-bordered min">
								    <div class="form-group  map-title">
								        <div class="text-left " ><h4 id="dashboardMapTop4" ></h4></div>
								    </div>
								    <div class="form-group">
								        <div class=" text-center map-content" >
											<div id="dashboardMap4" style="height:320px;"></div>
								        </div>
								    </div>
								    <div class="form-group  map-foot ">
								        <div class="text-left" ><h4 id="dashboardMapFoot4" ></h4></div>
								    </div>
								</div>
							</div>
						</div>
						<div class="control-label  col-md-3 p-0">
							<div class="view-form map-ract">
								<div class="form-horizontal  form-bordered min">
								    <div class="form-group  map-title">
								        <div class="text-left " ><h4 id="dashboardMapTop5" ></h4></div>
								    </div>
								    <div class="form-group">
								        <div class=" text-center map-content" >
											<div id="dashboardMap5" style="height:320px;"></div>
								        </div>
								    </div>
								    <div class="form-group  map-foot ">
								        <div class="text-left" ><h4 id="dashboardMapFoot5" ></h4></div>
								    </div>
								</div>
							</div>
						</div>
						<div class="control-label  col-md-3 p-0">
							<div class="view-form map-ract">
								<div class="form-horizontal  form-bordered min">
								    <div class="form-group  map-title">
								        <div class="text-left " ><h4 id="dashboardMapTop6" ></h4></div>
								    </div>
								    <div class="form-group">
								        <div class=" text-center map-content" >
											<div id="dashboardMap6" style="height:320px;"></div>
								        </div>
								    </div>
								    <div class="form-group  map-foot ">
								        <div class="text-left" ><h4 id="dashboardMapFoot6" ></h4></div>
								    </div>
								</div>
							</div>
						</div>
						<div class="control-label  col-md-3 p-0">
							<div class="view-form map-ract">
								<div class="form-horizontal  form-bordered min">
								    <div class="form-group  map-title">
								        <div class="text-left " ><h4 id="dashboardMapTop7" ></h4></div>
								    </div>
								    <div class="form-group">
								        <div class=" text-center map-content" >
											<div id="dashboardMap7" style="height:320px;"></div>
								        </div>
								    </div>
								    <div class="form-group  map-foot ">
								        <div class="text-left" ><h4 id="dashboardMapFoot7" ></h4></div>
								    </div>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
	</div>
	<script src="/js/views/dashboard/board03.js"></script>
</body>
</html>