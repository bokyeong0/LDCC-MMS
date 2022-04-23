<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
<body>
	<div class="modal-header">
		<button type="button" id="headerCloseBtn" class="close" data-close-btn="ture">×</button>
		<h4 class="modal-title">대표회사 수정</h4>
	</div>
	<div class="modal-body">
		<div class="panel panel-inverse m-b-0">
			<div class="panel-body p-0">
				<div class="view-form m-b-0">
					<div class="form-horizontal  form-bordered min">
					    <div class="form-group">
					        <label class="col-md-p15 control-label">처리구분</label>
					        <div class="col-md-p35 text-left" >
								<select id="obsRcptStsType" class="form-control input-sm">
			                    </select>
					        </div>
					        <label class="col-md-p15 control-label">유무상</label>
					        <div class="col-md-p35 text-left " >
					        	<select class="form-control input-sm" id="callObsRcptStsCostType">
								</select>
					        </div>
					    </div>
					    <div class="form-group">
					        <label class="col-md-p15 control-label">처리일시</label>
					        <div class="col-md-p85 text-left form-inline" >
								<div class="input-group date" id="obsRcptStsDateForm" data-date-format="yyyy-mm-dd">
                                          <input type="text"  id="obsRcptStsDate" name="obsRcptStsDate" size="10" class="form-control" placeholder="일자" />
                                          <span class="input-group-addon p-5"><i class="fa fa-calendar"></i></span>
                                      </div>
					        	<div class="input-group bootstrap-timepicker">
									<input id="obsRcptStsTime" size="10" type="text" class="form-control input-sm"  placeholder="시간"/>
									<span class="input-group-addon p-5"><i class="fa fa-clock-o"></i></span>
								</div>
					        </div>
					    </div>
					    <div class="form-group ">
					        <label class="col-md-p15 control-label">입금여부</label>
					        <div class="col-md-p35 text-left " >
					        	<select class="form-control input-sm" id="obsRcptStsDpstYn">
									<option value="N" >미입금</option>
									<option value="Y" >입금</option>
								</select>
					        </div>
					        <label class="col-md-p15 control-label">입금일</label>
					        <div class="col-md-p35 text-left " >
<!-- 							        		<input type="text" class="form-control input-sm " id="obsRcptCostDt" placeholder=""> -->
				        		<div class="input-group date" id="obsRcptCostDtForm" data-date-format="yyyy-mm-dd">
                                          <input type="text"  id="obsRcptStsCostDt" name="obsRcptStsCostDt" size="14" class="form-control p-5" placeholder="일자" />
                                          <span class="input-group-addon p-5"><i class="fa fa-calendar"></i></span>
                                      </div>
					        </div>
					        
					    </div>
					    <div class="form-group ">
					    	<label class="col-md-p15 control-label">입금자명</label>
					        <div class="col-md-p35 text-left " >
				        		<input type="text" class="form-control input-sm " id="obsRcptStsDpstNm" placeholder="">
					        </div>
					        <label class="col-md-p15 control-label">금액</label>
					        <div class="col-md-p35 text-left " >
				        		<input type="text" class="form-control input-sm text-right " id="obsRcptStsCost" maxlength="15" placeholder=""> 
					        </div>
					    </div>
					    <div class="form-group ">
					        <label class="col-md-p15 control-label">처리내용</label>
					        <div class="col-md-p85 text-left " >
						        	<textarea id="obsRcptStsCont" class="form-control rezise-off" placeholder="내용" rows="3" ></textarea>
					        </div>
					    </div>
					    <div class="form-group ">
					    	<label class="col-md-p15 control-label">서명확인</label>
					        <div class="col-md-p85 text-left " >
				        		<button type="submit" class="btn btn-sm btn-info">
									<i class="fa fa-plus"></i> 등록
								</button>
<!-- 											서명완료 <i title="미리보기" class="fa fa-search cursor-pointer"></i> <i title="다운로드" class="fa fa-download cursor-pointer"></i> -->
					        </div>
					    </div>
					</div>
				</div>
			    <div class="form-group m-0 m-t-5">
<!-- 					<div class="control-label p-5 text-left"> -->
						<div class="grid-wrapper" >
							<table id="callObsStsAssetGrid"  ></table>
						</div>
<!-- 					</div> -->
				</div>
			</div>
		</div>
	</div>
	<script type="text/javascript">
	var $callObsStsAssetGrid =  $("#callObsStsAssetGrid"); 
	$callObsStsAssetGrid.paragonGrid({
		url: '/ctrl/asset/asset/listAssetManager',
		page : 1,
		sortable : true,
		hidegrid: false,
		height: 137,
		rowHight : "S",
		firstData : false,
		colNames :["자산번호","제품코드","파트코드","제조사코드","제품군코드","제품군","제조사","모델명","파트명","시리얼","유형1","유형2","납품일","선택"],
		colModel : [ 
			{name : 'AST_SEQ', hidden : true}, 
			{name : 'PRD_CD', hidden : true}, 
			{name : 'PAT_CD', hidden : true}, 
			{name : 'MFR_SEQ', hidden : true}, 
			//TODO PRD_TYPE_SEQ 수정
			{name : 'PRD_TYPE_SEQ', hidden : true}, 
			{name : 'PRD_TYPE_SEQ_NM', align:"center"},		//제품군
			{name : 'MFR_SEQ_NM', align:"center"},			//제조사
			{name : 'PRD_NM', align:"center"},				//장비명
			{name : 'PAT_NM', align:"center"},				//파트명
			{name : 'AST_SERIAL', align:"center"},			//시리얼
			{name : 'AST_TYPE1', align:"center"},			//구분1
			{name : 'AST_TYPE2', align:"center"},			//구분2
			{name : 'AST_MFR_DT', align:"center"},			//납품일
			{editable: false,align:"center",name:'EVENT',formatter:inMakeActionBution}
		],
		loadonce : true,
//		caption : "자산 정보",
		rownumbers : true,
	});
	function inMakeActionBution(cellvalue, options, rowObject) {
        var reLoadButton = '<button type="button" class="btn btn-info btn-xs m-r-5 select-btn" value="'+(options.rowId)+'" >선택</button>'
         				 + ' <button type="button" class="btn btn-info btn-xs m-r-5 nonselect-btn" value="'+(options.rowId)+'" >취소</button>';
        return reLoadButton;
	}
	//선택 이벤트
	$callObsStsAssetGrid.find('.select-btn').off().live('click', function (e) {
    	e.stopPropagation();
    	var rowData = $callObsAssetGrid.getRowData($(this).val());
    	$callObsAssetGrid.focusToRow();

    	$('#obsSelectAstSeq').val(rowData.AST_SEQ);
		$('#obsAutoPrdType').val(rowData.PRD_TYPE_SEQ);
		$('#obsAutoPrdMfr').val(rowData.MFR_SEQ);
		console.log(rowData.PAT_CD);
		MMSUtil.fnMakePrdCombo($('#obsAutoPrd'), rowData.PRD_TYPE_SEQ, rowData.MFR_SEQ, rowData.PRD_CD, "제품");
		MMSUtil.fnMakePatCombo($('#obsAutoPat'), rowData.PRD_CD, rowData.PAT_CD, "파트");
    });
	$callObsStsAssetGrid.find('.nonselect-btn').off().live('click', function (e) {
		e.stopPropagation();
		$callObsAssetGrid.focusRemove();
		$('#obsSelectAstSeq').val("");
		fnObsSelectedPrdCrear();
	});
	</script>
	<div class="modal-footer" id="modal-footer">
		<a href="javascript:;" id="standardCompanyModifyPopupUpdateBtn" class="btn btn-sm btn-success" >저장</a> 
		<a href="javascript:;" id="standardCompanyModifyPopupDelBtn" class="btn btn-sm btn-danger" >삭제</a>
		<a href="javascript:;" id="standardCompanyModifyPopupCloseBtn" class="btn btn-sm btn-white" data-close-btn="ture">닫기</a>
	</div>

<!-- <script src="/js/views/standard/standard_companyModifyPopup.js"></script> -->
</body>
</html>
