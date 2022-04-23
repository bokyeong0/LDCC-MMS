<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en">
<!--<![endif]-->
<head>
</head>
<body>
<ol class="breadcrumb pull-right">
	<li><a href="javascript:;">Home</a></li>
	<li><a href="javascript:;">UI Elements</a></li>
	<li class="active">Chart<i class="fa fa-star" style="color: #ffa829;text-shadow: 1px 2px 0 rgb(220, 191, 149); margin-left: 10px" ></i></li>
</ol>
			<h1 class="page-header">Flot Chart <small>header small text goes here...</small></h1>
			
		    <!-- begin row -->
		    <div class="row">
		        <!-- begin col-6 -->
		        <div class="col-md-3">
		        	<div class="panel panel-inverse" data-sortable-id="flot-chart-1">
                        <div class="panel-heading">
                            <h4 class="panel-title">Flot Donut Chart</h4>
                        </div>
                        <div class="panel-body">
                            <div id="pie-chart" class="height-sm"></div>
                        </div>
                        <div class="panel-body">
                            <div id="pie-chart2" class="height-sm"></div>
                        </div>
                    </div>
		        </div>
		        <div class="col-md-3">
		        	<div class="panel panel-inverse" data-sortable-id="flot-chart-1">
                        <div class="panel-heading">
                            <h4 class="panel-title">Flot Donut Chart</h4>
                        </div>
                        <div class="panel-body">
                            <div id="pie-chart3" class="height-sm"></div>
                        </div>
                        <div class="panel-body">
                            <div id="pie-chart4" class="height-sm"></div>
                        </div>
                    </div>
		        </div>
		        <!-- end col-6 -->
		        <!-- begin col-6 -->
		        <div class="col-md-6">
                    <div class="panel panel-inverse" data-sortable-id="flot-chart-2">
                        <div class="panel-heading">
                            <div class="panel-heading-btn">
                            </div>
                            <h4 class="panel-title">Flot Interactive Chart year</h4>
                        </div>
                        <div class="panel-body">
                            <div id="interactive-chart" class="height-sm"></div>
                        </div>
                    </div>
		        </div>
		        <!-- end col-6 -->
		    </div>
		    <!-- end row -->
		    
			<!-- start row -->
		    <div class="row">
		    	<div class="col-md-6">
                    <div class="panel panel-inverse" data-sortable-id="flot-chart-3">
                        <div class="panel-heading">
                            <div class="panel-heading-btn">
                            </div>
                            <h4 class="panel-title">Flot Interactive Chart month</h4>
                        </div>
                        <div class="panel-body">
                            <div id="line-Chart" class="height-sm"></div>
                        </div>
                    </div>
		        </div>
		        <div class="col-md-6">
                    <div class="panel panel-inverse" data-sortable-id="flot-chart-4">
                        <div class="panel-heading">
                            <div class="panel-heading-btn">
                            </div>
                            <h4 class="panel-title">Flot Bar Chart</h4>
                        </div>
                        <div class="panel-body">
                            <div id="bar-chart" class="height-sm"></div>
                        </div>
                    </div>
		        </div>
		    </div>
		    
		<!-- begin scroll to top btn -->
		<a href="javascript:;" class="btn btn-icon btn-circle btn-success btn-scroll-to-top fade" data-click="scroll-top"><i class="fa fa-angle-up"></i></a>
		<!-- end scroll to top btn -->
	
	<!-- ================== BEGIN PAGE LEVEL JS ================== -->
<!-- 	<script src="/js/plugins/flot/jquery.flot.js"></script> -->
<!-- 	<script src="/js/plugins/flot/jquery.flot.time.js"></script> -->
<!-- 	<script src="/js/plugins/flot/jquery.flot.resize.js"></script> -->
<!-- 	<script src="/js/plugins/flot/jquery.flot.pie.js"></script> -->
<!-- 	<script src="/js/plugins/flot/jquery.flot.stack.js"></script> -->
<!-- 	<script src="/js/plugins/flot/jquery.flot.crosshair.js"></script> -->
	<script src="/js/plugins/flot/jquery.flot.categories.js"></script>
<!-- 	<script src="/js/chart-flot.demo.js"></script> -->
	<script src="/js/views/template/chart.js"></script>
	
	<!-- ================== END PAGE LEVEL JS ================== -->
</body>
</html>
