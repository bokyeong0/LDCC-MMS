<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
<body>
	<div class="menu-cate">
		<ol class="breadcrumb pull-right"></ol>
		<h1 class="page-header"></h1>
	</div>
	<div class="search-form clearfix">
			<div class="search-controls non-icon col-md-12" >
				<!-- 고객사 -->
				<div class="form-group col-md-p20" id="assetCompNmGroup">
					<div class="input-group input-group-sm" >
						<span class="span-info  input-group-addon">고객사명</span>
						<input type="text" class="form-control input-sm" id="preventiveCheckCompNm" >
					</div>
				</div>
				<!-- 브랜드 -->				
				<div class="form-group col-md-p20">
					<div class="input-group input-group-sm">
						<span class="span-info  input-group-addon">브랜드명</span>
						<input type="text" class="form-control input-sm" id="preventiveCheckBrndNm" >
					</div>
				</div>
				<!-- 점포명 -->				
				<div class="form-group col-md-p20">
					<div class="input-group input-group-sm">
						<span class="span-info  input-group-addon">점포명</span>
						<input type="text" class="form-control input-sm" id="preventiveCheckStrNm" >
					</div>
				</div>
			</div>
			
			<!-- 중복되는 부분 -->
			<div class="search-button-group">
				<button id="preventiveCheckPop" type="button" class="btn btn-sm btn-inverse">
					<i class="fa fa-shield"></i> 유의사항
				</button>	
				<button id="preventiveCheckSearchBtn" type="button" class="btn btn-sm btn-primary">
					<i class="fa fa-search"></i> 검색
				</button>				
 				<button id="preventiveCheckDetailModifyBtn" type="button" class="btn btn-sm btn-warning" data-authRule="AUTH_MOD">
					<i class="fa fa-edit"></i> 자산수정
				</button> 
		 		<button id="preventiveCheckDetailCancelBtn" type="button" class="btn btn-sm btn-error">
					<i class="fa fa-undo"></i> 취소
				</button>		
			</div>
		
	</div>
	<div class="grid-wrapper">
		<table id="preventiveCheckGrid"></table>
		<div id="preventiveCheckGridNavi"></div>
	</div>
	<div id="check-signature-engr-pad" class="m-signature-pad">
		<div class="col-md-12"><label class="form-group" style="font-size:1.5em;z-index:9999;">엔지니어 서명</label></div>
		<div class="m-signature-pad--body">
			<canvas></canvas>
		</div>
		<div class="m-signature-pad--footer text-right p-t-10">
			<button type="button" id="signClearBtn" class="btn btn-success btn-sm  pull-left" data-action="clear"><i class="fa fa-eraser">지우기</i></button>
			<button type="button" id="signCloseEngrBtn" class="btn btn-success btn-sm  pull-left m-l-15" data-action="close"><i class="fa fa-times">닫기</i></button>
			<button type="button" id="signSaveEngrBtn" class="btn btn-success  btn-sm " data-action="save"><i class="fa fa-check">저장</i></button>
		</div>
	</div>
	<div id="check-signature-mng-pad" class="m-signature-pad">
		<div class="col-md-12"><label class="form-group" style="font-size:1.5em;z-index:9999;">점포담당자 서명</label></div>
		<div class="m-signature-pad--body">
			<canvas></canvas>
		</div>
		<div class="m-signature-pad--footer text-right p-t-10">
			<button type="button" id="signClearBtn-mng" class="btn btn-success btn-sm  pull-left" data-action="clear"><i class="fa fa-eraser">지우기</i></button>
			<button type="button" id="signCloseMngBtn" class="btn btn-success btn-sm  pull-left m-l-15" data-action="close"><i class="fa fa-times">닫기</i></button>
			<button type="button" id="signSaveMngBtn" class="btn btn-success  btn-sm " data-action="save"><i class="fa fa-check">저장</i></button>
		</div>
	</div>
	
	<div class="search-form clearfix">
			<div class="search-controls non-icon col-md-12" >
				<!-- 예방점검 일시 -->
				<div class="form-group col-md-p20">
					<div class="input-group input-group-sm">
						<span class="span-info  input-group-addon">예방점검일시</span>
						<input type="text" class="form-control input-sm" id="preventiveCheckDateDt" >
						<span class="input-group-addon p-5">
                           <i class="fa fa-calendar" ></i>
                       </span>						
					</div>
				</div>	
				<div class="form-group col-md-p40 p-l-0">
					<form>
						<div class="input-group input-group-sm">
							<span class="span-info  input-group-addon">파일업로드</span>
							<input type="file" name="inputFile" class="form-control input-sm" id="preventiveCheckAddFile" ><!-- name명 고정 -->
							<div class="input-group-btn">
								<button type="button" id="preventiveCheckAddFileBtn" class="btn btn-default btn-sm btn-danger" ><span>업로드</span></button> 
							</div>
						</div>
					</form>
				</div>
				<div class="form-group col-md-p10 p-l-0">
						<div id='preventiveCheckViewEngrAfterSignNew'></div>
						<button type="button" id="openEngrSignDialog" class="btn btn-sm btn-info">
							<i class="fa fa-upload">엔지니어 서명 등록</i>
						</button>
				</div>
				<div class="form-group col-md-p10 p-l-0">
						<div id='preventiveCheckViewMngAfterSignNew'></div>
						<button type="button" id="openMngSignDialog" class="btn btn-sm btn-info">
							<i class="fa fa-upload">점포담당자 서명 등록</i>
						</button>
				</div>
				<div class="form-group pull-right" >		
					<button id="preventiveCheckDetailSaveBtn" type="button" class="btn btn-sm btn-primary" data-authRule="AUTH_NEW">
						<i class="fa fa-plus"></i> 정검 완료
					</button>
				</div>	
				<div id="preventiveCheckDetailSignFileNmView" class="input-group"></div>
			</div>
				
	</div>	

	<script src="/js/common/signature_pad.min.js"></script>
	<script src="/js/views/check/preventiveCheckDetail.js"></script>

</body>
</html>