<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en">
<!--<![endif]-->
<head>
	<jsp:include page="../inc/head.jsp"/>
	<script src="/js/paragon/paragon-app.js"></script>
	<script src="/js/paragon/paragon-util.js"></script>
	<script src="/js/paragon/mms-util.js"></script>
	<script src="/js/paragon/paragon-app.js"></script>
	<script src="/js/paragon/paragon-tabs.js"></script>
	<script src="/js/paragon/paragon-leftmenu.js"></script>
	<script src="/js/paragon/paragon-grid.js"></script>
	<script src="/js/paragon/paragon-grid.1.0.2.js"></script>
	<script src="/js/paragon/paragon-popup.js"></script>
	<script src="/js/paragon/paragon-tree.js"></script>
	<script src="/js/paragon/paragon-chart.js"></script>
	<script src="/js/paragon/paragon-temp.js"></script>
	<script src="/js/paragon/mobile-util.js"></script>
</head>
<body id="mainMasterBody" >
	<!-- begin #page-loader -->
<!-- 	<div id="page-loader" class="fade in"><span class="spinner"></span></div> -->
	<!-- end #page-loader -->
	
	<!-- begin #page-container -->
	<div id="page-container" class="fade page-sidebar-fixed page-header-fixed">
		<!-- begin #header -->
		<div id="header" class="header navbar navbar-default navbar-fixed-top">
			<!-- begin container-fluid -->
			<div class="container-fluid">
				<!-- begin mobile sidebar expand / collapse button -->
				<div class="navbar-header">
					<a class="navbar-brand" ><img src="../img/logo_lotte2.png">
					</a>
					<button type="button" class="navbar-toggle" data-click="sidebar-toggled">
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
					<ul class="nav navbar-nav pull-right mobile-mod">
						<%-- <li class="dropdown navbar-language">
							<a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
								<span class="flag-icon flag-icon-${sessionScope.s_country}" title="${sessionScope.s_country}"></span>
								<span class="name">${sessionScope.s_language_nm}</span> <b class="caret"></b>
							</a>
							<ul class="dropdown-menu animated fadeInRight p-b-0">
								<li class="arrow"></li>
								<li><a class="change-language" data-main-language='ko' data-main-country='KR' href="javascript:;"><span class="flag-icon flag-icon-kr" title="kr"></span> 한국</a></li>
								<li><a class="change-language" data-main-language='en'  data-main-country='US' href="javascript:;"><span class="flag-icon flag-icon-us" title="us"></span> English</a></li>
							</ul>
						</li> --%>
						<li class="dropdown navbar-user">
							<a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
								<img src="/img/user-13.jpg" alt="" /> 
								<span class="hidden-xs" id="mainUserNm">${sessionScope.s_userNm}</span> <b class="caret"></b>
							</a>
							<ul class="dropdown-menu animated fadeInLeft">
								<li class="arrow"></li>
								<li><a id="mainMyPageMobile" >개인정보수정</a></li>
								<li class="divider"></li>
								<li><a href="/ctrl/sign/logout">로그아웃</a></li>
								<li><a href="/">새로고침</a></li>
								<li class="mobile-mod" ><a id="settingMobilde"  href="javascript:;">모바일설정</a></li>
							</ul>
						</li>
					</ul>
				</div>
				<!-- end mobile sidebar expand / collapse button -->
				
				<!-- begin header navigation right -->
				<ul class="nav navbar-nav navbar-right web-mod">
<!-- 					<li class="web-mod" > -->
<!-- 						<form class="navbar-form full-width"> -->
<!-- 							<div class="form-group"> -->
<!-- 								<input type="text" class="form-control" placeholder="검색어 입력" /> -->
<!-- 								<button type="submit" class="btn btn-search"><i class="fa fa-search"></i></button> -->
<!-- 							</div> -->
<!-- 						</form> -->
<!-- 					</li> -->
					<%-- <li class="dropdown navbar-language">
						<a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
							<span class="flag-icon flag-icon-${sessionScope.s_country}" title="${sessionScope.s_country}"></span>
							<span class="name">${sessionScope.s_language_nm}</span> <b class="caret"></b>
						</a>
						<ul class="dropdown-menu animated fadeInRight p-b-0">
							<li class="arrow"></li>
							<li><a class="change-language" data-main-language='ko' data-main-country='KR' href="javascript:;"><span class="flag-icon flag-icon-kr" title="kr"></span> 한국</a></li>
							<li><a class="change-language" data-main-language='en'  data-main-country='US' href="javascript:;"><span class="flag-icon flag-icon-us" title="us"></span> English</a></li>
						</ul>
					</li> --%>
					<li class="dropdown navbar-user">
						<a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
							<img src="/img/user-13.jpg" alt="" /> 
							<span class="hidden-xs" id="mainUserNm">${sessionScope.s_userNm}</span> <b class="caret"></b>
						</a>
						<ul class="dropdown-menu animated fadeInLeft">
<!-- 							<li class="arrow"></li> -->
<!-- 							<li><a id="vertalk" href="javascript:;">버톡</a></li> -->
							<li><a id="mainMyPage" >개인정보수정</a></li>
<!-- 							<li><a href="javascript:;">개일일정</a></li> -->
							<li class="divider"></li>
							<li>
								<a href="javascript:;">폰트 :
								<input type="radio" id="RadomainFontSizeS" style="vertical-align: sub;" value="S" name="RadomainFontSize" ><label for="RadomainFontSizeS">소 </label> 
								<input type="radio" id="RadomainFontSizeM" style="vertical-align: sub;" value="M" name="RadomainFontSize" checked="checked" ><label for="RadomainFontSizeM">중 </label>
								<input type="radio" id="RadomainFontSizeL" style="vertical-align: sub;" value="L" name="RadomainFontSize" ><label for="RadomainFontSizeL">대</label>
								</a>
							</li>
							<li><a id="fontSizeN" href="javascript:;">폰트초기화</a></li>
							<li><a href="/ctrl/sign/logout">로그아웃</a></li>
							<li><a href="/">새로고침</a></li>
<!-- 							<li class="mobile-mod" ><a id="settingMobilde"  href="javascript:;">모바일설정</a></li> -->
						</ul>
					</li>
				</ul>
				<!-- end header navigation right -->
			</div>
			<!-- end container-fluid -->
		</div>
		<!-- end #header -->
		
		<!-- begin #sidebar -->
		<div class="sidebar">
			<!-- begin sidebar scrollbar -->
			<div data-scrollbar="true" id="leftMenu"  data-height="100%">
				<!-- begin sidebar user -->
				<ul class="nav">
<!-- 					<li class="nav-header" style="    background-color: #1a2229;" > -->
<!-- 						<div style="width: 50%;float: left ;text-align: center; "  ><a><i class="fa fa-align-left"></i> 기본메뉴</a></div> -->
<!-- 						<div style="width: 50%;float: left ;text-align: center; color: #348fe2; "  ><a><i class="fa fa-star"></i> 즐겨찾기</a></div> -->
<!-- 					</li> -->
					<li class="nav-profile">
						<div class="image">
							<a href="javascript:;"><img src="/img/user-13.jpg" alt="" /></a>
						</div>
						<div class="info m-t-10">
							${sessionScope.s_userNm}
						</div>
					</li>
				</ul>
				<!-- end sidebar user -->
			</div>
			<!-- end sidebar scrollbar -->
		</div>
		<div class="sidebar-bg"></div>
		<!-- end #sidebar -->
		
		<!-- begin #content -->
		<div id="content" class="content">
			<div id="tabs"></div>
		</div>
		<!-- end #content -->
		<!-- begin scroll to top btn -->
		<a href="javascript:;" class="btn btn-icon btn-circle btn-success btn-scroll-to-top fade" data-click="scroll-top"><i class="fa fa-angle-up"></i></a>
		<!-- end scroll to top btn -->
	</div>
	<!-- end page container -->
	<!-- begin #page-loader -->
	<div id="ajax-loader" class="hide">
		<div  class="fade in"><span class="spinner"></span></div>
	</div>
	<div class="commentPage" id="commentPg" style="display: none;"></div>
	<!-- end #page-loader -->
	<!-- ================== BEGIN PAGE LEVEL JS ================== -->
<!-- 	<script src="/js/plugins/gritter/js/jquery.gritter.js"></script> -->
	<script src="/js/plugins/flot/jquery.flot.js"></script>
	<script src="/js/plugins/flot/jquery.flot.time.js"></script>
	<script src="/js/plugins/flot/jquery.flot.resize.js"></script>
	<script src="/js/plugins/flot/jquery.flot.pie.js"></script>
	<script src="/js/plugins/sparkline/jquery.sparkline.js"></script>
	<script src="/js/plugins/jquery-jvectormap/jquery-jvectormap-1.2.2.min.js"></script>
<!-- 	<script src="/js/plugins/jquery-jvectormap/jquery-jvectormap-world-mill-en.js"></script> -->
	<script src="/js/plugins/jquery-jvectormap/jquery-jvectormap-kr-mill.js"></script>
	<script src="/js/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js"></script>
	<script src="/js/plugins/bootstrap-daterangepicker/moment.js"></script>
	<script src="/js/plugins/bootstrap-daterangepicker/daterangepicker.js"></script>
	<!-- ================== END PAGE LEVEL JS ================== -->
	
	<script src="/js/views/main/main.js"></script>
	<div id="softZone"></div>
</body>
</html>
