<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
	<head>
    <script src="/js/views/template/modal.js"></script>
	</head>
<body>
<div class="content-header" >
<ol class="breadcrumb pull-right">
	<li><a href="javascript:;">Home</a></li>
	<li><a href="javascript:;">UI Template</a></li>
	<li class="active">Modal<i class="fa fa-star active"></i></li>
</ol>
<h1 class="page-header">jqGrid</h1>
</div>
<div class="row">
	<div class="col-md-12">
		<div class="panel panel-inverse" data-sortable-id="ui-modal-notification-2">
	        <div class="panel-heading">
	            <div class="panel-heading-btn">
	                <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
	                <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-success" data-click="panel-reload"><i class="fa fa-repeat"></i></a>
	                <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
	                <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-danger" data-click="panel-remove"><i class="fa fa-times"></i></a>
	            </div>
	            <h4 class="panel-title">각종 레이어 팝업창</h4>
	       	</div>
			<div class="panel-body">
				<table class="table">
					<thead>
						<tr>
							<th>설명</th>
							<th>Demo</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>기본 Confrim창 - fade down</td>
							<td><a href="#modal-dialog" class="btn btn-sm btn-success" data-toggle="modal">Demo</a></td>
						</tr>
						<tr>
							<td>기본 Confrim창 - fade in</td>
							<td><a href="#modal-without-animation" class="btn btn-sm btn-default" data-toggle="modal">Demo</a></td>
						</tr>
						<tr>
							<td>Full width -- fade down</td>
							<td><a href="#modal-message" class="btn btn-sm btn-primary"
								data-toggle="modal">Demo</a></td>
						</tr>
						<tr>
							<td>기본창+ 경고 문구</td>
							<td><a href="#modal-alert" class="btn btn-sm btn-danger"
								data-toggle="modal">Demo</a></td>
						</tr>
						<tr>
							<td>Custom PopUp 창 + html</td>
							<td><a  class="btn btn-sm btn-danger" id="showTest" >Demo</a></td>
						</tr>
						<tr>
							<td>Custom ajax PopUp 창 + jsp Logding</td>
							<td><a  class="btn btn-sm btn-danger" id="showAjaxTest" >Demo</a></td>
						</tr>
						<tr>
							<td>Custom ajax PopUp 창 + Paragon Grid</td>
							<td><a  class="btn btn-sm btn-danger" id="showModalGrid" >Demo</a></td>
						</tr>
					</tbody>
				</table>
						<!-- #modal-dialog -->
				<div class="modal fade" id="modal-dialog">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
								<h4 class="modal-title">알림</h4>
							</div>
							<div class="modal-body">
								저장하지 않은 내용이 있습니다.<br>
								계속 진행하시겠습니까?
							</div>
							<div class="modal-footer">
								<a href="javascript:;" class="btn btn-sm btn-white" data-dismiss="modal">취소</a>
								<a href="javascript:;" class="btn btn-sm btn-success">예</a>
							</div>
						</div>
					</div>
				</div>
				<!-- #modal-without-animation -->
				<div class="modal" id="modal-without-animation">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
								<h4 class="modal-title">알림</h4>
							</div>
							<div class="modal-body">
								정상적으로 삭제 되었습니다.
							</div>
							<div class="modal-footer">
								<a href="javascript:;" class="btn btn-sm btn-white" data-dismiss="modal">확인</a>
							</div>
						</div>
					</div>
				</div>
				<!-- #modal-message -->
				<div class="modal modal-message fade" id="modal-message">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
								<h4 class="modal-title">알림 공지!!</h4>
							</div>
							<div class="modal-body">
								<p>비밀번호를 4개월간 변경하지 않았습니다.</p>
								<p>지금 변경하시겠습니까?</p>
							</div>
							<div class="modal-footer">
								<a href="javascript:;" class="btn btn-sm btn-white" data-dismiss="modal">닫기</a>
								<a href="javascript:;" class="btn btn-sm btn-primary">수정화면으로 이동</a>
							</div>
						</div>
					</div>
				</div>
				<!-- #modal-alert -->
				<div class="modal fade" id="modal-alert"  >
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
								<h4 class="modal-title">오류</h4>
							</div>
							<div class="modal-body">
								<div class="alert alert-danger m-b-0">
									<h4><i class="fa fa-info-circle"></i> 심각한 오류가 발생했습니다.</h4>
									<p>[2016-10-18 18:40:02,038][DEBUG][StatementInterceptor.java:54] 
		SELECT /* [ProgramService.query][getProgramList][프로그램 목록조회 조회][Kim Jin Ho][2016-09-13] */
		       PRO_CD
		     , PRO_NM
		     , PRO_DESC
		     , CALL_URL
		     , USE_YN $("data[dismiss=modal]").text();
		     , IN_USER_ID
		     , IN_DT
		  FROM TB_PARAGON_PRO
[2016-10-18 18:40:02,048][DEBUG][StatementInterceptor.java:54] </p>
								</div>
							</div>
							<div class="modal-footer">
								<a href="javascript:;" class="btn btn-sm btn-white" data-dismiss="modal">닫기</a>
							</div>
						</div>
					</div>
				</div>
				<div class="modal fade in" id="modal-alert2"  >
					<div class="modal-dialog" style=" width:900px;" >
						<div class="modal-content">
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<script>

// (function ( $ ) {
 	

// }( jQuery ));

$(document).ready(function() {
	$("#showTest").paragonOpenPopup({
			ajaxUrl: '',
 			id: '저장',
 			body: '<div>zzzzzzzzzzzzzzz</div>',
 			width: '900px',
 			btnName:"저장",
			title :"테스트창",
			click:function(){
				alert("!!!!!");
			}
	});
	$("#showAjaxTest").paragonOpenPopup({
			ajaxUrl: '/ctrl/template/common/modalInner',
 			id: 'jspAjax',
 			width: '900px',
 			btnName:"저장",
			title :"Ajax jsp 파일 로딩",
			click:function(){
				alert("!!!!!");
				alert("!!!!!");
			}
	});
	
	$("#showModalGrid").click(function(){
		fnModalGrid();
	});
	
	 
	function fnModalGrid() {
			PopApp.paragonOpenPopup({
				ajaxUrl : '/ctrl/template/common/modalGrid',
				id : 'modalGrid',
				width : '1000px',
				btnName : "수정",
				title : "Modal Grid",
				onload : function(modal) {
					modal.show();
				}

			});
		}
	});
</script>
</body>
</html>