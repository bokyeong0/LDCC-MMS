<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE >
<html>
<body>
			<!-- begin breadcrumb -->
			<ol class="breadcrumb pull-right">
				<li><a href="javascript:;">Home</a></li>
				<li><a href="javascript:;">UI Elements</a></li>
				<li class="active">Buttons</li>
			</ol>
			<!-- end breadcrumb -->
			<!-- begin page-header -->
			<h1 class="page-header">Buttons <small>header small text goes here...</small></h1>
			<!-- end page-header -->
			
			<!-- begin row -->
			<div class="row">
			    <!-- begin col-8 -->
			    <div class="col-md-8">
			        <div class="panel panel-inverse" data-sortable-id="ui-buttons-1"->
                        <div class="panel-heading">
                            <div class="panel-heading-btn">
                                <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
                                <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-success" data-click="panel-reload"><i class="fa fa-repeat"></i></a>
                                <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
                                <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-danger" data-click="panel-remove"><i class="fa fa-times"></i></a>
                            </div>
                            <h4 class="panel-title">Buttons</h4>
                        </div>
                        <div class="panel-body">
							<button type="button" class="btn btn-default m-r-5 m-b-5">Default</button>
							<button type="button" class="btn btn-primary m-r-5 m-b-5">Primary</button>
							<button type="button" class="btn btn-info m-r-5 m-b-5">Info</button>
							<button type="button" class="btn btn-success m-r-5 m-b-5">Success</button>
							<button type="button" class="btn btn-danger m-r-5 m-b-5">Danger</button>
							<button type="button" class="btn btn-warning m-r-5 m-b-5">Warning</button>
							<button type="button" class="btn btn-inverse m-r-5 m-b-5">Inverse</button>
							<button type="button" class="btn btn-white m-r-5 m-b-5">White</button>
							<button type="button" class="btn btn-link m-b-5">Link</button>
						</div>
                    </div>
				</div>
			    <!-- end col-8 -->
			    <!-- begin col-4 -->
			    <div class="col-md-4">
			        <div class="panel panel-inverse" data-sortable-id="ui-buttons-2">
                        <div class="panel-heading">
                            <div class="panel-heading-btn">
                                <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
                                <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-success" data-click="panel-reload"><i class="fa fa-repeat"></i></a>
                                <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
                                <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-danger" data-click="panel-remove"><i class="fa fa-times"></i></a>
                            </div>
                            <h4 class="panel-title">Button Dropdowns</h4>
                        </div>
                        <div class="panel-body">
							<div class="btn-group m-r-5 m-b-5">
								<a href="javascript:;" data-toggle="dropdown" class="btn btn-default dropdown-toggle">Action <span class="caret"></span></a>
								<ul class="dropdown-menu">
									<li><a href="javascript:;">Action 1</a></li>
									<li><a href="javascript:;">Action 2</a></li>
									<li><a href="javascript:;">Action 3</a></li>
									<li class="divider"></li>
									<li><a href="javascript:;">Action 4</a></li>
								</ul>
							</div>
							<div class="btn-group m-r-5 m-b-5">
								<a href="javascript:;" class="btn btn-success">Default</a>
								<a href="javascript:;" data-toggle="dropdown" class="btn btn-success dropdown-toggle">
									<span class="caret"></span>
								</a>
								<ul class="dropdown-menu pull-right">
									<li><a href="javascript:;">Action 1</a></li>
									<li><a href="javascript:;">Action 2</a></li>
									<li><a href="javascript:;">Action 3</a></li>
									<li class="divider"></li>
									<li><a href="javascript:;">Action 4</a></li>
								</ul>
							</div>
							<div class="btn-group dropup m-b-5">
								<a href="javascript:;" class="btn btn-warning">Dropup</a>
								<a href="javascript:;" data-toggle="dropdown" class="btn btn-warning dropdown-toggle">
									<span class="caret"></span>
								</a>
								<ul class="dropdown-menu pull-right">
									<li><a href="javascript:;">Action 1</a></li>
									<li><a href="javascript:;">Action 2</a></li>
									<li><a href="javascript:;">Action 3</a></li>
									<li class="divider"></li>
									<li><a href="javascript:;">Action 4</a></li>
								</ul>
							</div>
                        </div>
                    </div>
			    </div>
			    <!-- end col-4 -->
			</div>
			<!-- end row -->
			<!-- begin row -->
			<div class="row">
			    <!-- begin col-4 -->
			    <div class="col-md-4">
			        <div class="panel panel-inverse" data-sortable-id="ui-buttons-3">
                        <div class="panel-heading">
                            <div class="panel-heading-btn">
                                <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
                                <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-success" data-click="panel-reload"><i class="fa fa-repeat"></i></a>
                                <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
                                <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-danger" data-click="panel-remove"><i class="fa fa-times"></i></a>
                            </div>
                            <h4 class="panel-title">Button Sizes</h4>
                        </div>
                        <div class="panel-body">
                            <p>
								<a href="javascript:;" class="btn btn-primary btn-lg m-r-5">Large Button</a>
								<a href="javascript:;" class="btn btn-white btn-lg">Large Button</a>
							</p>
							<p>
								<a href="javascript:;" class="btn btn-primary m-r-5">Default Button</a>
								<a href="javascript:;" class="btn btn-white ">Default Button</a>
							</p>
							<p>
								<a href="javascript:;" class="btn btn-primary btn-sm m-r-5">Small Button</a>
								<a href="javascript:;" class="btn btn-white btn-sm">Small Button</a>
							</p>
							<p>
								<a href="javascript:;" class="btn btn-primary btn-xs m-r-5">Extra Small</a>
								<a href="javascript:;" class="btn btn-white btn-xs">Extra Small</a>
							</p>
                        </div>
                    </div>
			    </div>
			    <!-- end col-4 -->
			    <!-- begin col-4 -->
			    <div class="col-md-4">
			        <div class="panel panel-inverse" data-sortable-id="ui-buttons-4">
                        <div class="panel-heading">
                            <div class="panel-heading-btn">
                                <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
                                <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-success" data-click="panel-reload"><i class="fa fa-repeat"></i></a>
                                <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
                                <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-danger" data-click="panel-remove"><i class="fa fa-times"></i></a>
                            </div>
                            <h4 class="panel-title">Button State</h4>
                        </div>
                        <div class="panel-body">
							<p>
								<a href="javascript:;" class="btn btn-danger disabled m-r-5">Disabled Button</a>
								<a href="javascript:;" class="btn btn-white disabled">Disabled Button</a>
							</p>
							<p>
								<a href="javascript:;" class="btn btn-danger active m-r-5">Active Button</a>
								<a href="javascript:;" class="btn btn-white active">Active Button</a>
							</p>
							<p>
								<a href="javascript:;" class="btn btn-danger btn-block">Block Button</a>
								<a href="javascript:;" class="btn btn-white btn-block">Block Button</a>
							</p>
                        </div>
                    </div>
			    </div>
			    <!-- end col-4 -->
			    <!-- begin col-4 -->
			    <div class="col-md-4">
			        <div class="panel panel-inverse" data-sortable-id="ui-buttons-5">
                        <div class="panel-heading">
                            <div class="panel-heading-btn">
                                <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
                                <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-success" data-click="panel-reload"><i class="fa fa-repeat"></i></a>
                                <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
                                <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-danger" data-click="panel-remove"><i class="fa fa-times"></i></a>
                            </div>
                            <h4 class="panel-title">Button with Icon</h4>
                        </div>
                        <div class="panel-body">
							<p>
								<a href="javascript:;" class="btn btn-lg btn-inverse">
									<i class="fa fa-twitter fa-2x pull-left"></i>
									Twitter Bootstrap<br />
									<small>Version 3.0</small>
								</a>
							</p>
							<p>
								<a href="javascript:;" class="btn btn-success m-r-5"><i class="fa fa-comment"></i> Comment</a>
								<a href="javascript:;" class="btn btn-success m-r-5"><i class="fa fa-cogs"></i> Setting</a>
								<a href="javascript:;" class="btn btn-success"><i class="fa fa-cog"></i></a>
							</p>
							<p>
								<a href="javascript:;" class="btn btn-default btn-block"><i class="fa fa-list pull-right"></i> Button block with icon</a>
							</p>
						</div>
					</div>
			    </div>
			    <!-- end col-4 -->
			</div>
			<!-- end row -->
			<!-- begin row -->
			<div class="row">
			    <!-- begin col-4 -->
			    <div class="col-md-4">
			        <div class="panel panel-inverse" data-sortable-id="ui-buttons-6">
                        <div class="panel-heading">
                            <div class="panel-heading-btn">
                                <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
                                <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-success" data-click="panel-reload"><i class="fa fa-repeat"></i></a>
                                <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
                                <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-danger" data-click="panel-remove"><i class="fa fa-times"></i></a>
                            </div>
                            <h4 class="panel-title">Button Group Vertical & Justified</h4>
                        </div>
                        <div class="panel-body">
                            <div class="btn-group">
								<button class="btn btn-white">Left</button>
								<button class="btn btn-white active">Middle</button>
								<button class="btn btn-white">Right</button>
							</div>
							<p></p>
							<div class="btn-group">
								<a class="btn btn-white" href="javascript:;"><i class="fa fa-align-left"></i></a>
								<a class="btn btn-white active" href="javascript:;"><i class="fa fa-align-center"></i></a>
								<a class="btn btn-white" href="javascript:;"><i class="fa fa-align-right"></i></a>
								<a class="btn btn-white" href="javascript:;"><i class="fa fa-align-justify"></i></a>
							</div>
							<p></p>
							<div class="btn-group">
								<button type="button" class="btn btn-white">1</button>
								<button type="button" class="btn btn-white">2</button>
								<button type="button" class="btn btn-white active">3</button>
								<button type="button" class="btn btn-white">4</button>
							</div>
							<div class="btn-group">
								<button type="button" class="btn btn-white">5</button>
								<button type="button" class="btn btn-white">6</button>
								<button type="button" class="btn btn-white">7</button>
							</div>
							<div class="btn-group">
								<button type="button" class="btn btn-white">8</button>
							</div>
							<p></p>
							<div class="btn-group">
								<a class="btn btn-inverse" href="javascript:;"><i class="fa fa-backward"></i></a>
								<a class="btn btn-inverse" href="javascript:;"><i class="fa fa-fast-backward"></i></a>
								<a class="btn btn-inverse" href="javascript:;"><i class="fa fa-pause"></i></a>
								<a class="btn btn-inverse active" href="javascript:;"><i class="fa fa-play"></i></a>
								<a class="btn btn-inverse" href="javascript:;"><i class="fa fa-forward"></i></a>
								<a class="btn btn-inverse" href="javascript:;"><i class="fa fa-fast-forward"></i></a>
							</div>
						</div>
					</div>
			    </div>
			    <!-- end col-4 -->
			    <!-- begin col-4 -->
			    <div class="col-md-4">
			        <div class="panel panel-inverse" data-sortable-id="ui-buttons-7">
                        <div class="panel-heading">
                            <div class="panel-heading-btn">
                                <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
                                <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-success" data-click="panel-reload"><i class="fa fa-repeat"></i></a>
                                <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
                                <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-danger" data-click="panel-remove"><i class="fa fa-times"></i></a>
                            </div>
                            <h4 class="panel-title">Button Toolbars</h4>
                        </div>
                        <div class="panel-body">
							<div class="btn-group-vertical m-r-5">
								<button type="button" class="btn btn-inverse"><i class="fa fa-cog"></i> Button</button>
								<button type="button" class="btn btn-inverse active"><i class="fa fa-cog"></i> Button</button>
								<button type="button" class="btn btn-inverse"><i class="fa fa-cog"></i> Button</button>
							</div>
							<div class="btn-group-vertical m-r-5">
								<button type="button" class="btn btn-white"><i class="fa fa-file"></i> Button</button>
								<button type="button" class="btn btn-white active"><i class="fa fa-file"></i> Button</button>
								<button type="button" class="btn btn-white"><i class="fa fa-file"></i> Button</button>
							</div>
							<div class="btn-group-vertical">
								<button type="button" class="btn btn-success"><i class="fa fa-edit"></i> Button</button>
								<button type="button" class="btn btn-success active"><i class="fa fa-edit"></i> Button</button>
								<button type="button" class="btn btn-success"><i class="fa fa-edit"></i> Button</button>
							</div>
							<p></p>
							<br />
							<div class="btn-group btn-group-justified">
								<a class="btn btn-default">Left</a>
								<a class="btn btn-default active">Middle</a>
								<a class="btn btn-default">Right</a>
							</div>
                        </div>
                    </div>
			    </div>
			    <!-- end col-4 -->
			    <!-- begin col-4 -->
			    <div class="col-md-4">
			        <div class="panel panel-inverse" data-sortable-id="ui-buttons-8">
                        <div class="panel-heading">
                            <div class="panel-heading-btn">
                                <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
                                <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-success" data-click="panel-reload"><i class="fa fa-repeat"></i></a>
                                <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
                                <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-danger" data-click="panel-remove"><i class="fa fa-times"></i></a>
                            </div>
                            <h4 class="panel-title">Button Icon & Sizes</h4>
                        </div>
                        <div class="panel-body">
                            <p>
                                <a class="btn btn-default btn-icon btn-circle btn-lg"><i class="fa fa-expand"></i></a>
                                <a class="btn btn-success btn-icon btn-circle btn-lg"><i class="fa fa-repeat"></i></a>
                                <a class="btn btn-warning btn-icon btn-circle btn-lg"><i class="fa fa-minus"></i></a>
                                <a class="btn btn-danger btn-icon btn-circle btn-lg"><i class="fa fa-times"></i></a>
                                <a class="btn btn-primary btn-icon btn-circle btn-lg"><i class="fa fa-facebook"></i></a>
                                <a class="btn btn-info btn-icon btn-circle btn-lg"><i class="fa fa-twitter"></i></a>
                                <a class="btn btn-inverse btn-icon btn-circle btn-lg"><i class="fa fa-stack-overflow"></i></a>
                            </p>
                            <p>
                                <a class="btn btn-default btn-icon btn-circle"><i class="fa fa-expand"></i></a>
                                <a class="btn btn-success btn-icon btn-circle"><i class="fa fa-repeat"></i></a>
                                <a class="btn btn-warning btn-icon btn-circle"><i class="fa fa-minus"></i></a>
                                <a class="btn btn-danger btn-icon btn-circle"><i class="fa fa-times"></i></a>
                                <a class="btn btn-primary btn-icon btn-circle"><i class="fa fa-facebook"></i></a>
                                <a class="btn btn-info btn-icon btn-circle"><i class="fa fa-twitter"></i></a>
                                <a class="btn btn-inverse btn-icon btn-circle"><i class="fa fa-stack-overflow"></i></a>
                            </p>
                            <p>
                                <a class="btn btn-default btn-icon btn-circle btn-sm"><i class="fa fa-expand"></i></a>
                                <a class="btn btn-success btn-icon btn-circle btn-sm"><i class="fa fa-repeat"></i></a>
                                <a class="btn btn-warning btn-icon btn-circle btn-sm"><i class="fa fa-minus"></i></a>
                                <a class="btn btn-danger btn-icon btn-circle btn-sm"><i class="fa fa-times"></i></a>
                                <a class="btn btn-primary btn-icon btn-circle btn-sm"><i class="fa fa-facebook"></i></a>
                                <a class="btn btn-info btn-icon btn-circle btn-sm"><i class="fa fa-twitter"></i></a>
                                <a class="btn btn-inverse btn-icon btn-circle btn-sm"><i class="fa fa-stack-overflow"></i></a>
                            </p>
                            <p>
                                <a class="btn btn-default btn-icon btn-circle btn-xs"><i class="fa fa-expand"></i></a>
                                <a class="btn btn-success btn-icon btn-circle btn-xs"><i class="fa fa-repeat"></i></a>
                                <a class="btn btn-warning btn-icon btn-circle btn-xs"><i class="fa fa-minus"></i></a>
                                <a class="btn btn-danger btn-icon btn-circle btn-xs"><i class="fa fa-times"></i></a>
                                <a class="btn btn-primary btn-icon btn-circle btn-xs"><i class="fa fa-facebook"></i></a>
                                <a class="btn btn-info btn-icon btn-circle btn-xs"><i class="fa fa-twitter"></i></a>
                                <a class="btn btn-inverse btn-icon btn-circle btn-xs"><i class="fa fa-stack-overflow"></i></a>
                            </p>
                        </div>
                    </div>
			    </div>
			    <!-- end col-4 -->
			</div>
			<!-- end row -->
</body>
</html>