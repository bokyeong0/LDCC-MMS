<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
	<body>
		<div class="modal-header" >
			<button type="button" class="close" data-close-btn="ture">×</button>
			<h4 class="modal-title">공지사항</h4>
		</div>
		<div class="modal-body">
			<div class="panel panel-inverse" data-sortable-id="form-stuff-1">
			    <div class="panel-body view-form">
			        <form class="form-horizontal form-bordered min">
			        
						<div class="form-group">
			                <label class="col-md-2 control-label">제목</label>
			                <div class="col-md-10">
								<input id="PopNoticeTitle" type="text" class="form-control input-sm"  value=""  />
			                </div>
			            </div>
			            <div class="form-group">
			              	<label class="col-md-2 control-label">작성자</label>
			                <div class="col-md-10">
								<input id="PopNoticeWriter" type="text" class="form-control input-sm width-200"  value=""  />
			                </div>			                
			            </div>			            
						<div class="form-group">
			                <label class="col-md-2 control-label">공지기간</label>
			                <div class="col-md-10 form-inline ">
			                	<div class="col-md-9 p-r-10">
			                		<div class="col-md-p35 input-group date" data-date-format="yyyy-mm-dd">
					                	<input type="text" id="PopNoticeStartDt" class="form-control" name="start">
					                	<span class="input-group-addon notic-date p-5" style="min-width:auto;">
					                		<i class="fa fa-calendar"></i>
					                	</span>
				                	</div>
				                	<div class="col-md-p35 input-group date" data-date-format="yyyy-mm-dd" >
										<input type="text" id="PopNoticeEndDt" class="form-control" name="end">
					                	<span class="input-group-addon notic-date p-5" style="min-width:auto;">
					                		<i class="fa fa-calendar" ></i>
					                	</span>
				                	</div>
			                	</div>
			                	<div class="col-md-3 pull-right">
			                		<button type="button" id="boardNoticePopSaveBtn"  class="btn btn-sm btn-success" data-authRule="AUTH_SAVE AUTH_MOD">
										<i class="fa fa-save"></i> 저장
									</button>					                
									<button type="button" class="btn btn-sm btn-white" data-close-btn="ture">
										<i class="fa fa-times"></i> 닫기
									</button>
			                	</div>
			                </div>
			                

			            </div>	
			            <div class="form-group">
			                <div class="col-md-12">
								<textarea id="PopNoticeContent" class="col-xs-12" placeholder="내용입력을 입력하세요" style="min-height:150px;"></textarea>
			                </div>
			            </div>
						<div class="form-group">
							<div class="col-md-12">
				                <label class="col-md-2 control-label">대상 파트너사</label>
				                <div class="col-md-10 form-inline ">
				                	<div class="col-md-9"></div>
					                <div class="col-md-3 pull-right notic-partner">
										<button type="button" id="boardNoticePopPartnerAddBtn"  class="btn btn-sm btn-info">
											<i class="fa fa-plus"></i> 추가
										</button>					                
										<button type="button" id="boardNoticePopPartnerDelBtn" class="btn btn-sm btn-danger">
											<i class="fa fa-minus"></i> 삭제
										</button>
					                </div>
				                </div>
				                
							</div>
			            </div>
				<div class="grid-wrapper" >
					<table id="boardNoticePopSelectGrid"></table>
				</div>
		        </form>
	        </div>
		</div>
	</div>
	
	<script src="/js/views/board/noticeModify.js"></script>
</html>