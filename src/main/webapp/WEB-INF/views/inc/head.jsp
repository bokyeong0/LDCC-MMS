<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page deferredSyntaxAllowedAsLiteral="true"%>
<%@ include file="../inc/common.jsp"%>


<meta charset="utf-8" />
<title>MMS</title>
<meta name="description" content=""/>
<meta name="Author" content="vertexid" />
<meta name="viewport"  content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<link rel="shortcut icon" href="/img/favicon/01_16x16.ico">

<!-- ================== BEGIN BASE CSS STYLE ================== -->
<!-- <link href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet"> -->
<link href="/js/plugins/jquery-ui/themes/base/minified/jquery-ui.min.css" rel="stylesheet" />
<link href="/js/plugins/bootstrap/css/bootstrap.css" rel="stylesheet" />
<link href="/js/plugins/font-awesome-4.7.0/css/font-awesome.min.css" rel="stylesheet" />
<link href="/css/animate.css" rel="stylesheet" />
<link href="/css/style.css" rel="stylesheet" />
<link href="/css/style-responsive.css" rel="stylesheet" />
<link href="/css/theme/default.css" rel="stylesheet" id="theme" />
<link href="/css/ui.jqgrid.css" rel="stylesheet" />
<link href="/js/plugins/flag-icon/css/flag-icon.css" rel="stylesheet" />

<link href="/js/plugins/ionRangeSlider/css/ion.rangeSlider.css" rel="stylesheet" />
<link href="/js/plugins/ionRangeSlider/css/ion.rangeSlider.skinNice.css" rel="stylesheet" />
<link href="/js/plugins/bootstrap-datepicker/css/datepicker.css" rel="stylesheet" />
<link href="/js/plugins/bootstrap-datepicker/css/datepicker3.css" rel="stylesheet" />
<link href="/js/plugins/bootstrap-timepicker/css/bootstrap-timepicker.css" rel="stylesheet" />
<link href="/js/plugins/bootstrap-combobox/css/bootstrap-combobox.css" rel="stylesheet" />
<link href="/js/plugins/parsley/src/parsley.css" rel="stylesheet" />
<link href="/js/plugins/bootstrap-wizard/css/bwizard.css" rel="stylesheet" />
<link href="/js/plugins/bootstrap-tagsinput/bootstrap-tagsinput.css" rel="stylesheet" />
<link href="/js/plugins/bootstrap-daterangepicker/daterangepicker-bs3.css" rel="stylesheet" />
<link href="/js/plugins/jquery-tag-it/css/jquery.tagit.css" rel="stylesheet" />
<link href="/js/plugins/softphone/css/softphone.css" rel="stylesheet" />
<!-- <link href="/plugins/switchery/switchery.min.css" rel="stylesheet" /> -->
<!-- <link href="/plugins/powerange/powerange.min.css" rel="stylesheet" /> -->


<link href="/css/paragon-comm.css" rel="stylesheet" />
<link href="/css/paragon-jqgrid.css" rel="stylesheet" />
<link href="/css/autocomplete.css" rel="stylesheet" />
<link href="/css/paragon-theme-02.css" rel="stylesheet" />
<link href="/js/plugins/jstree/dist/themes/default/style.css" rel="stylesheet" />

<!-- <link href="/css/paragon-theme-01.css" rel="stylesheet" /> -->
<link href="/css/signature.css" rel="stylesheet" />
<!-- ================== END BASE CSS STYLE ================== -->



<!-- ================== BEGIN BASE JS ================== -->
<script src="/js/plugins/pace/pace.min.js"></script>
<!-- ================== END BASE JS ================== -->

<!-- ================== BEGIN BASE JS ================== -->
	<script src="/js/plugins/jquery/jquery-1.9.1.min.js"></script>
	<script src="/js/plugins/jquery/jquery-migrate-1.1.0.min.js"></script>
	<script src="/js/plugins/jquery-ui/ui/minified/jquery-ui.min.js"></script>
	<script src="/js/plugins/jquery/jquery.autocomplete.js"></script>
	<script src="/js/plugins/bootstrap/js/bootstrap.min.js"></script>
	<script src="/js/plugins/postcodify-master/api/search.js"></script>
	<!--[if lt IE 9]>
		<script src="/crossbrowserjs/html5shiv.js"></script>
		<script src="/crossbrowserjs/respond.min.js"></script>
		<script src="/crossbrowserjs/excanvas.min.js"></script>
	<![endif]-->
	<script src="/js/plugins/jquery-hashchange/jquery.hashchange.min.js"></script>
	<script src="/js/plugins/slimscroll/jquery.slimscroll.min.js"></script>
	<script src="/js/plugins/jquery-cookie/jquery.cookie.js"></script>
	
	<script src="/js/plugins/ionRangeSlider/js/ion-rangeSlider/ion.rangeSlider.min.js"></script>
	<script src="/js/plugins/switchery/switchery.min.js"></script>
	<script src="/js/plugins/powerange/powerange.min.js"></script>
	<script src="/js/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js"></script>
	<script src="/js/plugins/bootstrap-timepicker/js/bootstrap-timepicker.js"></script>
	<script src="/js/plugins/bootstrap-daterangepicker/daterangepicker.js"></script>
	<script src="/js/plugins/bootstrap-combobox/js/bootstrap-combobox.js"></script>
	<script src="/js/plugins/parsley/dist/parsley.js"></script>
	<script src="/js/plugins/bootstrap-wizard/js/bwizard.js"></script>
	<script src="/js/plugins/bootstrap-tagsinput/bootstrap-tagsinput.js"></script>
	<script src="/js/plugins/jquery-tag-it/js/tag-it.js"></script>
	<script src="/js/plugins/bootstrap-tagsinput/bootstrap-tagsinput-typeahead.js"></script>
	
	
	
	<script src="/js/plugins/superbox/js/superbox.js"></script>
	<script src="/js/plugins/jstree/dist/jstree.js"></script>
<!-- 	<script src="/js/plugins/jstree/src/jstree.js"></script> -->
	<!-- ================== END BASE JS ================== -->
	
<!-- 	<script src="/plugins/gritter/js/jquery.gritter.js"></script> -->
	<script src="/js/common/ui-modal-notification.demo.js"></script>
	
	<!-- ================== BASE JS ================== -->
    <script src="/js/common/grid.locale-kr.js"></script>
    <script src="/js/common/jqgrid-ui.js"></script>
    <script src="/js/common/jqgrid.js"></script>
	<!-- ================== END BASE JS ================== -->
<!-- <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBygrJ9FryhoNN8e0vlpdRRGXF_QuqgKEA&libraries=visualization,places"></script> -->
<!-- <script src="//dapi.kakao.com/v2/maps/sdk.js?appkey=305d54223f95457b6f0db256b78b2dc6" type="text/javascript"></script> -->
<script src="/js/plugins/softphone/soft_js/AC_RunActiveContent.js" type="text/javascript"></script>
<script src="/js/plugins/softphone/soft_js/TSOFTPHONEDEBUG.js" type="text/Javascript"></script>
<script src="/js/plugins/softphone/soft_js/TSOFTPHONERESULT.js" type="text/Javascript"></script>
<!-- A20190131 k2s 다음api-> 카카오api 위도경도 위치정보 연관 설정-->
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=${sessionScope.s_javaScriptKey}&libraries=services,clusterer,drawing"></script>
<!-- <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=8ad51fedd8a239226665398645a0f60c&libraries=services,clusterer,drawing"></script> -->
