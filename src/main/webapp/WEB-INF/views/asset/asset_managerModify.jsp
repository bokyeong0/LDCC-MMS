<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
<body>
<div class="modal-header">
	<button type="button" class="close" data-close-btn="ture"  >×</button>
	<h4 class="modal-title"></h4>
</div>
<div class="modal-body" style="max-height: 80vh; overflow-y: auto;">
	<div class="panel panel-inverse" data-sortable-id="form-stuff-1">
	    <div class="panel-body view-form">
	        <form class="form-horizontal form-bordered min">
	        
				<div class="form-group">
	                <label class="col-md-2 control-label">점포검색</label>
	                <div class="col-md-10">
						<input id="assetManagerModifyStrSearchNm" type="text" class="form-control input-sm"  value="" placeholder="검색어를 입력해 주세요. (고객사, 브랜드, 점포명)" autocomplete="off" />
	                </div>
	            </div>
	            
				<div class="form-group">
					<input type="hidden"  id="assetManagerModifyStrCd"  >
	                <label class="col-md-2 control-label">점포명</label>
	                <div class="col-md-10 text-left " >
	                    <input id="assetManagerModifyStrNm"  type="text" class="form-control input-sm" />
	                </div>
	            </div>
				<div class="form-group">
	                <label class="col-md-2 control-label">고객사</label>
	                <div class="col-md-4 text-left">
	                	<input id="assetManagerModifyCompNm"  type="text" class="form-control input-sm" />
	                </div>
	                <label class="col-md-2 control-label">브랜드</label>
	                <div class="col-md-4 text-left">
	                	<input id="assetManagerModifyBrndNm"  type="text" class="form-control input-sm" />
        		        <input id="assetManagerModifyBrndNmHiddenNm"  type="hidden"/>
	                </div>
	            </div>

				<div class="form-group">
	                <label class="col-md-2 control-label">파트너사</label>
	                <div class="col-md-4 text-left">
						<select class="form-control input-sm" id="assetManagerModifyAspCompCd">
							<option value="">선택</option>
						</select>
	                </div>
	                <label class="col-md-2 control-label">파트너사부서</label>
	                <div class="col-md-4 text-left">
						<select class="form-control input-sm" id="assetManagerModifyAreaCd">
							<option value="">선택</option>
						</select>
	                </div>
				</div>
				<div class="form-group">
			        <label class="col-md-2 control-label">제품검색</label>
			        <div class="col-md-10" >
		        		<div class="form-group form-control-static p-0">
							<input id="assetAutoPrdSearch" type="text" class="form-control input-sm "   placeholder="분류명, 품명을 입력하세요(2자 이상)" autocomplete="off" />
						</div>
			        </div>
			    </div>
			    <div class="form-group ">
			        <label class="col-md-2 control-label">제품선택</label>
			        <div class="col-md-10" >
			        	<div class="input-group">
							<input type="hidden" class="form-control" id="assetAutoPrdCd" value="" />
							<input type="text" class="form-control" id="assetAutoPrdNm" value="" />
							<div class="input-group-btn">
								<button id="assetAutoPrdNmResetBtn" type="button" class="btn  btn-sm">
							  		<i class="fa fa-times " ></i>
								</button>
							</div>
						</div>
			        </div>
			    </div>
			    
	            <div class="form-group">
	                <label class="col-md-2 control-label">시리얼</label>
	                 <div class="col-md-4 text-left " >
	                    <input id="assetManagerModifySerialNo" class="form-control input-sm" />
	                </div>
	                <label class="col-md-2 control-label">포스 번호</label>
	                <div class="col-md-4 text-left " >
	                    <input id="assetManagerModifyAstType2" class="form-control input-sm" />
	               </div>
		        </div>
		        <div class="form-group">
		            <label class="col-md-2 control-label">관리코드</label>
			        <div class="col-md-4" >
						<input id="assetManagerModifyMngCd" type="text" class="form-control input-sm" placeholder="관리코드를 입력해주세요" autocomplete="off" />
			        </div>
	                <label class="col-md-2 control-label">위치</label>
	                <div class="col-md-4 text-left " >
	                    <input id="assetManagerModifyAstType1" class="form-control input-sm" />
	                </div>
	            </div>
	            

	            <div class="form-group">
	                <label class="col-md-2 control-label" id="popMenuIconLabel">비고</label>
	                <div class="col-md-10 text-left " >
	                    <input id="assetManagerModifyContent"  type="text" class="form-control input-sm" />
	                </div>
	            </div>  
	            	            
	            <div class="form-group">
	                <label class="col-md-2 control-label">자산상태</label>
	                 <div class="col-md-4 text-left " >
	                    <select id="assetManagerModifyState" class="form-control input-sm" >
	                    </select>
	                </div>	            
	                <label class="col-md-2 control-label">설치일</label>
	                <div class="col-md-4 text-left " >
	                    <input id="assetManagerModifyMfrDt"  type="text" class="form-control input-sm" />
	                </div>
	            </div>  
	                   
	            <div class="form-group">
	                <label class="col-md-2 control-label">계약대상유무</label>
	                 <div class="col-md-4 text-left " >
	                    <select id="assetManageModifySlaYn" class="form-control input-sm" >
	                    	<option value="Y">Y</option>
	                    	<option value="N">N</option>
	                    </select>
	                </div>
	                <label class="col-md-2 control-label">도입일</label>
	                <div class="col-md-4 text-left " >
	                    <input id="assetManagerModifyIntroDt"  type="text" class="form-control input-sm" />
	                </div>
	            </div>
	            
	            <div class="form-group">
	                <label class="col-md-2 control-label">무상유지보수시작일</label>
	                 <div class="col-md-4 text-left " >
	                    <input id="assetManagerModifyFreeStartDt" class="form-control input-sm" disabled />
	                </div>
	                <label class="col-md-2 control-label">무상유지보수종료일</label>
	                <div class="col-md-4 text-left " >
	                    <input id="assetManagerModifyFreeEndDt"  type="text" class="form-control input-sm" disabled />
	                </div>
	            </div>
	            
	            <div class="form-group">
	                <label class="col-md-2 control-label">유상유지보수시작일</label>
	                 <div class="col-md-4 text-left " >
	                    <input id="assetManagerModifyCostStartDt" class="form-control input-sm" />
	                </div>
	                <label class="col-md-2 control-label">유상유지보수종료일(폐기일)</label>
	                <div class="col-md-4 text-left " >
	                    <input id="assetManagerModifyCostEndDt"  type="text" class="form-control input-sm" />
	                </div>
	            </div>
	        </form>
        </div>
	</div>
</div>

<div class="modal-footer">
	<a href="javascript:;" id="assetManagerSaveBtn" class="btn btn-sm btn-success" data-authRule="AUTH_SAVE">저장</a>
	<!-- <a href="javascript:;" id="assetManagerDelBtn" class="btn btn-sm btn-danger" data-authRule="AUTH_DEL">삭제</a> -->
	<a href="javascript:;" class="btn btn-sm btn-white" data-close-btn="ture" >닫기</a>
</div>
			
<script src="/js/views/asset/asset_managerModify.js"></script>
</html>