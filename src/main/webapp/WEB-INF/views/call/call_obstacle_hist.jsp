<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
<head>
<style type="text/css">
#callObsStsHistLv4Search_input{
 min-width: 250px;
}
.ui-jqgrid .ui-jqgrid-btable td {
height:auto;
overflow:hidden;
white-space:nowrap !important;
}
</style>
</head>
<body>
<div class="menu-cate" >
<ol class="breadcrumb pull-right"></ol>
<h1 class="page-header"></h1>
</div>
			<div class="search-form clearfix">
				<div class="search-controls non-icon col-md-12 m-b-0" >
					<div class="form-group col-md-p20">
						<div class="input-group input-group-sm">
							<span class="span-info  input-group-addon">고객사명</span>
							<input type="text" class="form-control input-sm" id="callObsStsHistCompSearch" value="" autocomplete="off" >
						</div>
					</div>
					<div class="form-group col-md-p20">
						<div class="input-group input-group-sm">
							<span class="span-info  input-group-addon">브랜드</span>
							<select id="callObsStsHistBrndNmSearch" class="form-control input-category">
									<option value="">선택</option>
			                </select>
						</div>
					</div>
					<div class="form-group col-md-p20">
						<div class="input-group input-group-sm">
							<span class="span-info  input-group-addon">점포명</span>
							<input type="text" class="form-control input-sm" id="callObsStsHistStrNmSearch" placeholder="점포명" >
						</div>
					</div>															
					<div class="form-group col-md-p20">
						<div class="input-group input-group-sm">
							<span class="span-info  input-group-addon">처리상태</span>
							<select id="callObsStsHistType2Search" class="form-control">
								<option value="" >선택</option>
		                    </select>
						</div>
					</div>	
					<div class="form-group col-md-p20">
						<div class="input-group input-group-sm input-category">
							<select id="callObsStsHistTypeSearch" class="form-control">
								<option value="" >선택</option>
		                    </select>
						</div>
					</div>							
				</div>
				<div class="search-controls non-icon col-md-12  m-t-0 m-b-0" >	
					<div class="form-group col-md-p20">
						<div class="input-group input-group-sm">
							<span class="span-info  input-group-addon">접수번호</span>
							<input type="text" class="form-control input-sm" id="callObsStsHistRcptNoSearch" placeholder="">
						</div>
					</div>
					<div class="form-group col-md-p20">
						<div class="input-group input-group-sm">
							<span class="span-info  input-group-addon">파트너사</span>
							<select class="form-control" id="obsRctStsHistPaterSearch">
							<option value="" >파트너사</option>
							</select>	
						</div>
					</div>							
			    	<div class="form-group col-md-p20">
						<div class="input-group input-group-sm">
							<span class="span-info  input-group-addon">담당부서</span>
							<select id="callObsStsHistPartSearch" class="form-control"></select>
						</div>
					</div>		
					<div class="form-group col-md-p20">
						<div class="input-group input-group-sm">
							<span class="span-info  input-group-addon">담당엔지니어</span>
							<select id="callObsStsHistEngrSearch" class="form-control"></select>
						</div>
					</div>									
					<div class="form-group col-md-p20">
						<div class="input-group input-group-sm">
							<span class="span-info  input-group-addon">접 수 자</span>
							<select id="callObsRcptHistWriterNmSearch" class="form-control"></select>
						</div>
					</div>
				</div>
				<div class="search-controls non-icon col-md-12  m-t-0 m-b-0" >
						<div class="form-group col-md-p20">
							<div class="input-group input-group-sm">
								<span class="span-info  input-group-addon">장애분류</span>						
			                    	<select id="callStndStsHistLv1Search" class="form-control">
										<option value="">제품범주</option>
				                    </select>	
		                   </div>	
	                   </div>
	                    <div class="form-group col-md-p20">
							<div class="input-group input-group-sm input-category">
			                    	<select id="callObsStsHistLv1Search" class="form-control">
										<option value="">제품군</option>
				                    </select>
							</div>
						</div>	
						<div class="form-group col-md-p20">
							<div class="input-group input-group-sm input-category">
								<select id="callObsStsHistLv2Search" class="form-control input-category">
										<option value="">장애구분</option>
				                </select>
							</div>
						</div>	
						<div class="form-group col-md-p20">
							<div class="input-group input-group-sm input-category">
								<select id="callObsStsHistLv3Search" class="form-control input-category">
									<option value="">장애유형</option>
			                    </select>
							</div>
						</div>	
						<div class="form-group col-md-p20">
							<div class="input-group input-group-sm input-category">
								<select id="callObsStsHistLv4Search" class="form-control input-category">
									<option value="">장애원인</option>
			                    </select>
							</div>
						</div>	
				</div>						
				<div class="search-controls non-icon col-md-12  m-t-0 m-b-0" >
	                <div class="form-group col-md-p20">
						<div class="input-group input-group-sm">
							<span class="span-info  input-group-addon">모델명</span>
							<select id="callObsStsHistPrdSearch" class="form-control input-category">
								<option value="">모델명</option>
		                    </select>
						</div>
					</div>							
					<div class="form-group col-md-p20">
						<div class="input-group input-group-sm">
						<span class="span-info  input-group-addon">기간검색</span>
					       <select id="hist-date-search-type" class="form-control">
					         <option value="typeRcpt">접수일자</option>
					         <option value="typeVisit">방문일자</option>
					         <option value="typeCmpl">완료일자</option>
					       </select>
		                 </div>	
	                </div>
	               	<div class="form-group col-md-p20">
	               		<div class="input-group input-daterange" id="callObsStsHistRcptDateForm">
			               	 <input type="text" class="form-control" id="callObsStsHistRcptDateStartSearch" name="start" placeholder="시작일" />
			                   <span class="input-group-addon">~</span>
			                 <input type="text" class="form-control" id="callObsStsHistRcptDateEndSearch" name="end" placeholder="종료일" />
	               		</div> 	
	                </div>	
	                <div class="form-group col-md-p20">
						<div class="input-group input-group-sm">
							<span class="span-info  input-group-addon">유무상</span>
							<select id="callObsStsHistCostTypeSearch" class="form-control"></select>
						</div>
					</div>						
				</div>				
			<div class="search-button-group">
			    <button class="btn btn-sm btn-success" id="callSearchHistDownloadExcel" type="button" data-authRule="AUTH_DOWN">
					<i class="fa fa-download"></i> EXCEL
				</button>
				<button id="callObsStsHistDownloadExcel" type="button" class="btn btn-sm btn-success" data-authRule="AUTH_DOWN">
					<i class="fa fa-download"></i> 서비스리포트 [EXCEL] 
				</button>
				<button id="callObsStsHistSearchWebBtn" type="button"  class="btn btn-sm btn-primary">
					<i class="fa fa-search"></i> 검색
				</button>
			</div>
		</div>
	<div class="grid-wrapper p-b-5" id="callObsStsHistGridWrap" >
		<table id="callObsHistGrid" ></table>
		<div id="callObsHistGridNavi" ></div>
	</div>
	<script src="/js/views/call/call_obstacle_hist.js"></script>
</body>
</html>