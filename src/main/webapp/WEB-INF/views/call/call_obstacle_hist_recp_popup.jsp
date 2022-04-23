<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
<body>
	<div class="modal-header">
		<button type="button" id="headerCloseBtn" class="close" data-close-btn="ture">×</button>
		<h4 class="modal-title"></h4>
	</div>
	<div class="modal-body">
		<div class="panel panel-inverse m-b-0">
			<div class="panel-body p-0">
				<div class="view-form m-b-5">
								<div class="form-horizontal  form-bordered min">
								    <div class="form-group">
								        <label class="col-md-p15 control-label">점포</label>
								        <div class="col-md-p85" >
							        		<p id="callObsStsHistCompNmView" class="form-control-static "></p>
								        </div>
								    </div>
								    <div class="form-group">
								        <label class="col-md-p15 control-label">모델명</label>
								        <div class="col-md-p85 text-left" >
								        	<p id="callObsStsHistPrdNmView"  class="form-control-static "></p>
								        </div>
								    </div>
								    <div class="form-group">
								        <label class="col-md-p15 control-label">시리얼</label>
								        <div class="col-md-p85 text-left" >
								        	<p id="callObsStsHistSerialView"  class="form-control-static "></p>
								        </div>
								    </div>
								    <div class="form-group">
								        <label class="col-md-p15 control-label">장애유형</label>
								        <div class="col-md-p85 text-left" >
								        	<p id="callObsStsHistObsNmView"  class="form-control-static "></p>
								        </div>
								    </div>
								    <div class="form-group">
								        <label class="col-md-p15 control-label">접수자</label>
								        <div class="col-md-p35 text-left" >
											<p id="callObsStsHistWriterNmView"  class="form-control-static "></p>
								        </div>
								        <label class="col-md-p15 control-label">접수일시</label>
								        <div class="col-md-p35 text-left" >
											<p id="callObsStsHistObsDtTimeView"  class="form-control-static "></p>
								        </div>
								    </div>
								    <div class="form-group">
								        <label class="col-md-p15 control-label">신고자</label>
								        <div class="col-md-p85 text-left" >
											<p id="callObsStsHistCustInfoView"  class="form-control-static"></p>
								        </div>
								    </div>
 								    <div class="form-group ">
								        <label class="col-md-p15 control-label">담당지역</label>
								        <div class="col-md-p35 text-left " >
								        	<p id="callObsStsHistAreaNmView"  class="form-control-static "></p>
								        </div>
								        <label class="col-md-p15 control-label">담당엔지니어</label>
 								        <div class="col-md-p35 text-left " >
								        	<p id="callObsStsHistEngrmView"  class="form-control-static "></p>
								        </div>
								    </div>
								    <div class="form-group ">
								        <label class="col-md-p15 control-label">접수내용</label>
								        <div class="col-md-p85 text-left " >
									       	<pre id="callObsStsHistContView" class="height-75 overflow-y-scroll"></pre>
								        </div>
								    </div>
								</div>
							</div>
			    <div class="form-group m-0 m-t-5">
					<div class="grid-wrapper" >
						<table id="callObsStsHistPopupAstGrid"  ></table>
					</div>
				</div>
			</div>
		</div>
	</div>
	<script type="text/javascript">

	</script>
	<div class="modal-footer" id="modal-footer">
		<a href="javascript:;" id="standardCompanyModifyPopupCloseBtn" class="btn btn-sm btn-white" data-close-btn="ture">닫기</a>
	</div>

<script src="/js/views/call/call_obstacle_hist_rcpt_popup.js"></script>
</body>
</html>
