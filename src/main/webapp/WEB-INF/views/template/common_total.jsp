<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
	<head>
<!--     <script src="/common/paragon-grid.js"></script> -->
<!--     <script src="/js/jquery.jqGrid.min.js"></script> -->
<!--     <script src="/js/jqgrid-ui.js"></script> -->
<style type="text/css">
/* .tab-grid .tab-content{ */
/* 	padding: 0; */
/* } */
/* .tab-grid .tab-grid-wrapper{ */
/* 	padding: 5px; */
/* } */
</style>
	</head>
<body>
<div class="menu-cate" >
<ol class="breadcrumb pull-right"></ol>
<h1 class="page-header"></h1>
</div>
	<!-- 상세 검색 검색폼 생성시class="search-form multi clearfix" 명으로 생성 -->
	<div class="search-form multi clearfix" >
           <form class="form-inline" >
<!-- 			<div class="search-title-group m-r-10"> -->
<!-- 				<span class="label label-theme search-title"> -->
<!-- 					<i class="fa fa-search"></i><i data-domain-id="SEARCH_TXT_LAB" >검색조건</i> -->
<!-- 				</span> -->
<!-- 			</div> -->
			<!-- 중복되는 부분 -->
			<div class="search-controls non-icon" >
				<div class="form-group">
					<span class="label label-theme lb-sm">
						<i class="fa fa-lock"></i> 권한그룹명
					</span>
				</div>
				<div class="form-group m-r-10">
				 
					<input type="text" class="form-control input-sm" id="exampleInputAC" size="10" value="${sessionScope.s_userId}" readonly="readonly" >
					<div class="input-group">
						<input type="text" class="form-control input-sm" id="exampleInputA" value="${sessionScope.s_userPositionNm}" placeholder="POP CallBack1">
						<div class="input-group-btn">
							<button id="dcPopup1" type="button" class="btn btn-primary  btn-sm">
						  		<i class="fa fa-search"></i>
							</button>
						</div>
					</div>
				</div>
				<div class="form-group m-r-10">
					<div class="input-group">
						<input type="text" class="form-control input-sm" id="exampleInputB" placeholder="POP CallBack1">
						<div class="input-group-btn">
							<button id="dcPopup2" type="button" class="btn btn-primary  btn-sm">
						  		<i class="fa fa-search"></i>
							</button>
						</div>
					</div>
				</div>
			</div>
			<div class="search-controls non-icon" >
				<div class="form-group m-r-10">
					<input type="text" class="form-control input-sm" id="exampleInputC" size="10" value="${sessionScope.s_userPositionNm}" placeholder="상세1">
					<button id="dcPopup" type="button" class="btn btn-sm btn-primary m-r-5">
		            	<i class="fa fa-search"></i>
		            </button>
				</div>
				<div class="form-group m-r-10">
					<input type="text" class="form-control input-sm" id="exampleInputD" placeholder="셍사2">
				</div>
			</div>
			<div class="search-controls non-icon" >
				<div class="form-group m-r-10">
					<input type="text" class="form-control input-sm" id="exampleInputEmail2" size="10" value="${sessionScope.s_userPositionNm}" placeholder="상세3">
					<button id="dcPopup" type="button" class="btn btn-sm btn-primary m-r-5">
		            	<i class="fa fa-search"></i>
		            </button>
				</div>
				<div class="form-group m-r-10">
					<input type="text" class="form-control input-sm" id="exampleInputPassword2" placeholder="상세4">
				</div>
			</div>
			<!-- 중복되는 부분 -->
			<div class="search-button-group">
				<button id="fdfDown" type="button" class="btn btn-sm btn-primary m-r-5">
				<i class="fa fa-file-pdf-o"></i>PDF
				</button>
				<button id=saveBtn1 type="button" class="btn btn-sm btn-primary m-r-5">
				<i class="fa fa-search"></i>저장(체크박스)
				</button>
				<button id="saveBtn2" type="button" class="btn btn-sm btn-primary m-r-5">
				<i class="fa fa-search"></i>저장(Tab ID)
				</button>
				<button id="searchBtn" type="button" class="btn btn-sm btn-primary m-r-5">
				<i class="fa fa-search"></i>검색
				</button>
				<button type="submit" class="btn btn-sm btn-info">
				<i class="fa fa-plus"></i><i data-domain-id="ADDROW_BTN" >행추가</i>
				</button>
				<button id="checkDelBtn" type="button" class="btn btn-sm btn-danger">
				<i class="fa fa-minus"></i><i data-domain-id="DELROW_BTN" >행삭제2</i>
				</button>
			</div>
			</form>
	</div>
	    
	<div class="grid-wrapper" >
		<table id="tempJQGridFull"  ></table>
		<div id="tempJQGridFullNavi"></div>
	</div>
	<div class="tab-grid" > 
		<div class="search-form clearfix" >
	           <form class="form-inline" >
				<div class="search-title-group m-r-10">
					<span class="label label-theme search-title">
						<i class="fa fa-search"></i><i data-domain-id="SEARCH_TXT_LAB" >검색조건</i>
	<!-- 					<small>Search</small> -->
					</span>
				</div>
				<!-- 중복되는 부분 -->
				<div class="search-controls" >
					<div class="form-group m-r-10">
						<div class="input-group">
							<input type="text" class="form-control input-sm" id="aaaaa" size="10" value="${sessionScope.s_userPositionNm}" placeholder="코드">
							<div class="input-group-btn">
								<button id="dcPopup3" type="button" class="btn btn-primary  btn-sm">
							  		<i class="fa fa-search"></i>
								</button>
							</div>
						</div>
					</div>
					<div class="form-group m-r-10">
						<input type="text" class="form-control input-sm" id="bbbb" placeholder="코드명">
					</div>
				</div>
				</form>
		</div>
		<ul id="testTab" class="nav nav-tabs nav-tabs-inverse nav-justified nav-justified-mobile inner-tab" data-sortable-id="index-2" >
			<li data-tab-id="a1" class="active"><a href="#grid1" data-toggle="tab"><i class="fa fa-picture-o m-r-5"></i> <span class="hidden-xs">Cell 에디터</span></a></li>
			<li data-tab-id="a2" class=""><a href="#grid2" data-toggle="tab"><i class="fa fa-shopping-cart m-r-5"></i> <span class="hidden-xs">그리드3</span></a></li>
			<li data-tab-id="" class=""><a href="#grid3" data-toggle="tab"><i class="fa fa-envelope m-r-5"></i> <span class="hidden-xs">그리드4</span></a></li>
		</ul>
		<div class="tab-content" data-sortable-id="index-3">
			<div class="tab-pane fade active in" id="grid1"> 
				<div class="tab-grid-wrapper">
					<div class="search-form clearfix tab-inner" >
			           <form class="form-inline" >
							<div class="search-title-group m-r-10">
								<span class="label label-theme search-title">
									<i class="fa fa-search"></i><i data-domain-id="SEARCH_TXT_LAB" >검색조건</i>
								</span>
							</div>
							<!-- 중복되는 부분 -->
							<div class="search-controls" >
								<div class="form-group m-r-10">
									<div class="input-group">
										<input type="text" class="form-control input-sm" id="aaaa" size="10" value="${sessionScope.s_userPositionNm}" placeholder="코드">
										<div class="input-group-btn">
											<button id="dcPopup" type="button" class="btn btn-primary  btn-sm">
										  		<i class="fa fa-search"></i>
											</button>
										</div>
									</div>
								</div>
								<div class="form-group m-r-10">
									<input type="text" class="form-control input-sm" id="bbbb" placeholder="코드명">
								</div>
							</div>
						</form>
					</div>
					<div class="grid-wrapper" >
						<table id="tempJQGridFull1"  ></table>
						<div id="tempJQGridFullNavi1"></div>
					</div>
				</div>
			</div>
			<div class="tab-pane fade" id="grid2">
				<div class="tab-grid-wrapper">
					<div class="grid-wrapper" >
						<table id="tempJQGridFull2"  ></table>
						<div id="tempJQGridFullNavi2"></div>
					</div>
				</div>
			</div>
			<div class="tab-pane fade" id="grid3">
				<div class="tab-grid-wrapper">
					<div class="grid-wrapper" >
						<table id="tempJQGridFull3"  ></table>
						<div id="tempJQGridFullNavi3"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<script>
			
			
			
		
		var TestApp = function () {
			"use strict";
			
			/************************************************
			 *전역 객체 선언부 (return 상위부분에 선언해야함)
			 ************************************************/
			
			// [El]메뉴 트리 그리드
			var $systemMenuGrid = $("#systemMenuGrid");
			var $tempGrid = $("#tempJQGridFull");
			
			var $callBackInput;
			
		    return {
		        init: function () {
		        	$("#exampleInputAC").change(function() {
			    		  alert( "Handler for .change() called." );
			    	});
		        	fnEvent();
		        	fnMakeGrid();
			    },
			    callBackInput: function () {
			    	return $callBackInput;
			    }
		    };
		    function openComPop(){
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
		    function fnEvent(){
		    	
		    	//체크박스 행삭제
				$("#checkDelBtn").click(function(){
					$tempGrid.paragonGridCheckedDelete();
				});
		    	//체크박스 행삭제
				$("#fdfDown").click(function(){
					$tempGrid.paragonGridCheckedDelete();
				});
		   
		    	//콜백 팝업 1
				$("#checkAll").change(function(){
					var data = "00000000001";
					if($(this).is(":checked")){
						$(".check-group").attr("data-id",$systemMenuGrid);
					}else{
						$(".check-group").data("id",data);
					}
				});
				$("#checkAll2").click(function(){
					var iddata = $(".check-group").eq(0).data("id");
					console.log(iddata);
					alert(iddata.html());
				});
		    	//콜백 팝업 1
				$("#dcPopup1").click(function(){
					PopApp.paragonOpenPopup({
						ajaxUrl : '/ctrl/template/common/modalGrid',
						id : 'modalGrid',
						width : '1000px',
						btnName : "수정",
						title : "Modal Grid",
						onload : function(modal) {
							App.setCallBackEl($("#exampleInputA"));
							modal.show();
						}

					});
				});
		    	//콜백 팝업 2
				$("#dcPopup2").click(function(){
// 					PopApp.paragonOpenPopup({
// 						ajaxUrl : '/ctrl/template/common/modalGrid',
// 						id : 'modalGrid',
// 						width : '1000px',
// 						btnName : "수정",
// 						title : "Modal Grid",
// 						onload : function(modal) {
// 							App.setCallBackEl($("#exampleInputB"));
// 							modal.show();
// 						}

// 					});
					
					$("#exampleInputAC").val($("#exampleInputB").val());
				});
				
		    	
				
				//저장 체크박스 체크된 데이터 가져오기
				$("#saveBtn1").click(function(){
					
					
					
					
					
					var parseCamelData = { 
							numInt		 : "NUM_INT" 	,
							numFloat	 : "NUM_FLOAT" 	,
			    			calcSum	  	 : "CALC_SUM"
					}
					
					var jsonData = $tempGrid.getSelectedJsonData("dt_test",parseCamelData);
					
//		 			var objData = $tempGrid.getSelectedObjData("dt_test",parseCamelData);
					
					console.log("=================================");
					console.log(jsonData);
					console.log("=================================");
					alert("console 확인");

				});
				
				// 텝아이디 가져오기
				$("#saveBtn2").click(function(){
					var tabId = $("#testTab > li.active").data("tab-id");
					alert(tabId);
					var rowData = {
							modFlag:"MOD_FLAG" ,
			    			numInt:"NUM_INT" ,
							numFloat:"NUM_FLOAT" ,
							money:"MONEY" ,
							calcInt1:"CALC_INT1" ,
							calcInt2:"CALC_INT2" ,
							useYn:"USE_YN" 
					}
					var dataJson = $tempGrid.getJsonData("dt_menuauth",rowData); 
				});

		    }
		   
			
			
		    function fnMakeGrid(){
		    	$("#tempJQGridFull").paragonGrid({
					url : '/ctrl/template/common/tempdata',
					page : 1,
					sortable : true,
					countable : false,
					cellEditable : true,
					multiselect: true,
// 					multiboxonly: true,
					multielonly:true,
					reportPdfBtn: true,
					reportExcelBtn: true,
					height: 150,
					onClickPdfBtn : function(options){
			    	   console.log("excel");
			    	   var gridData = options.data;
			    	   var columnIds = options.columnIds;
			    	   if(gridData.length == 0){
			    		   alert("조회된 데이터가 없습니다.");
			    		   return;
			    	   }
			    	   
			    	   var columnNms = [];
			    	   var idx = 0;
			    	   
			    	   if(options.rowEditable|| options.cellEditable){
			    		   idx = 3;
			    	   }
			    	   for (var i = idx; i < options.paragonColNames.length; i++) {
			    		   columnNms.push(options.paragonColNames[i]);
			    	   }
			    	   var sheetNm = options.caption;
			    	   var sendData={
			    			   "sheetNm":sheetNm,
			    			   "columnNms":columnNms,
			    			   "columnIds":columnIds,
			    			   "dt_grid":gridData
			    	   };
			    	   var jsonData = JSON.stringify(sendData);
			    	   App.prcsStart();
			    		$.ajax({
			 				url: "/ctrl/comm/view/excel",
			 				data:jsonData,
			 	    		contentType: 'application/json; charset=utf-8',
			 				success: function(data) {
			 					PopApp.paragonOpenPopup({
			 						ajaxUrl: '',
			 			 			id: '저장',
			 			 			body: data.body,
			 			 			width: '900px',
			 			 			btnName:"저장",
			 						title :"preve",
			 						visible:true,
			 						click:function(){
			 							alert("!!!!!");
			 						},
			 						onload : function(modal) {
			 							modal.show();
			 						}
				 				});
			 					App.prcsEnd();
			 				}
			    		});
					},
					colModel : [ 
			            {
							editable : true,
							name : 'NUM_INT',
							editoptions : {
								dataInit : function(el) {
									$(el).onlyNumber();
								}
							}
						}, 
						{
							editable : true,
							name : 'NUM_FLOAT',
							editoptions : {
								dataInit : function(el) {
									$(el).onlyFloat();
								}
							}
						}, 
						{
							editable : true,
							name : 'MONEY',
							align : "right",
							formatter : function(value, options, rowObject) {
								return value.comma();
							},
							editoptions : {
								dataInit : function(el) {
									$(el).onlyMoney();
								}
							}
						}, 
						{editable : true,name : 'CALC_INT1'}, 
						{editable : true,name : 'CALC_INT2'}, 
						{
							editable : true,
							name : 'CALC_SUM'
								,
								searchBtnClick : function(value, rowid, colid) {

									//콜백 그리드 
									App.setTargetGrid($("#tempJQGridFull"));
									
									
									//setElId(callBack아이디, 데이터key)
									var callBack ={
											"PRO_CD" :"exampleInputA",
											"PRO_NM" :"exampleInputB"
									};
									console.log(callBack);
									App.setElIds(callBack);
									
									
									openComPop();
//	 								alert("검색 버튼 : " + value);
								}
						}, 
						{
							name : 'DATE_POP',
							editable : true,
							editoptions : {
								dataInit : function(el) {
									$(el).datepicker();
								}
							}
						}, 
						{
							editable : true,
							name : 'CUST_BTN'
							,
							searchBtnClick : function(value, rowid, colid) {

								//콜백 그리드 
								App.setTargetGrid($("#tempJQGridFull"));
								
								
								//setElId(callBack아이디, 데이터key)
								var callBack ={
										"PRO_CD" :rowid+"_CALC_SUM",
										"PRO_NM" :rowid+"_CUST_BTN"
								};
								console.log(callBack);
								App.setElIds(callBack);
								
								openComPop();
							}
						}, 
						{editable : true, name : 'USE_YN'}, 
						{name : 'IN_USER_ID'},
						{name : 'IN_DT',sortable : false} 
					],
					pager : "#tempJQGridFullNavi",
					loadonce : true,
					caption : "종합데이터 목록",
					hidegrid : false,
					rownumbers : true,
					emptyrecords : '없음',
	                groupHeaders:[
						{
							rowspan : true,	
							header:[
								{start: 'CALC_INT1', length: 3 , domain:"COMP_TYPE_NM"},
								{start: 'CUST_BTN', length: 2 , domain:"COMP_TYPE_NM"},
	          				]
						}
	               ]

				});
				//[In]  검색버튼 이벤트 UI 생성
				function inSearchBtnClick(value, rowid) {
					console.log(value);
					console.log(rowid);
					alert("검색 버튼 : " + value);
				}
				
				
				// 텝 그리드 생성
				$("#tempJQGridFull1").paragonGrid({
					url : '/ctrl/template/common/tempdata',
					page : 1,
					sortable : true,
					cellEditable : true,
					height: 350,
					colModel : [ 
			            {
							editable : true,
							name : 'NUM_INT',
						}, 
						{
							editable : true,
							name : 'NUM_FLOAT'
						}, 
						{editable : true,name : 'CALC_INT1'}, 
						{editable : true,name : 'CALC_INT2'}, 
						{
							editable : true,
							name : 'CALC_SUM'
						}, 
						{
							name : 'DATE_POP',
							editable : true,
							editoptions : {
								dataInit : function(el) {
									$(el).datepicker();
								}
							}
						}, 
						{
							editable : true,
							name : 'CUST_BTN',
							disabled:true,
							searchBtnClick : function(value, rowid) {
								alert("검색 버튼 : " + value);
							}
						}, 
						{editable : true, name : 'USE_YN'}, 
						{name : 'IN_USER_ID'},
						{name : 'IN_DT',sortable : false} 
					],
					pager : "#tempJQGridFullNavi",
					loadonce : true,
					caption : "Cell 에디터 목록",
					hidegrid : false,
					rownumbers : true,
				});
				$("#tempJQGridFull2").paragonGrid({
					url : '/ctrl/template/common/tempdata',
					page : 1,
					sortable : true,
					height: 350,
					colModel : [ 
			            {
							editable : true,
							name : 'NUM_INT',
						}, 
						{
							editable : true,
							name : 'NUM_FLOAT'
						}, 
						{editable : true,name : 'CALC_INT1'}, 
						{editable : true,name : 'CALC_INT2'}, 
						{
							editable : true,
							name : 'CALC_SUM'
						}, 
						{
							name : 'DATE_POP',
							editable : true,
							editoptions : {
								dataInit : function(el) {
									$(el).datepicker();
								}
							}
						}, 
						{
							editable : true,
							name : 'CUST_BTN',
							searchBtnClick : function(value, rowid) {
								alert("검색 버튼 : " + value);
							}
						}, 
						{editable : true, name : 'USE_YN'}, 
						{name : 'IN_USER_ID'},
						{name : 'IN_DT',sortable : false} 
					],
					pager : "#tempJQGridFullNavi",
					loadonce : true,
					caption : "종합데이터 목록2",
					hidegrid : false,
					rownumbers : true,
					emptyrecords : '없음' // the message will be displayed at the bottom 
				});
				$("#tempJQGridFull3").paragonGrid({
					url : '/ctrl/template/common/tempdata',
					page : 1,
					sortable : true,
					height: 350,
					colModel : [ 
			            {
							editable : true,
							name : 'NUM_INT',
						}, 
						{
							editable : true,
							name : 'NUM_FLOAT'
						}, 
						{editable : true,name : 'CALC_INT1'}, 
						{editable : true,name : 'CALC_INT2'}, 
						{
							editable : true,
							name : 'CALC_SUM'
						}, 
						{
							name : 'DATE_POP',
							editable : true,
							editoptions : {
								dataInit : function(el) {
									$(el).datepicker({
										onSelect: function(dateText, inst) { 
// 								          var $input = inst.input; // the datepicker input
// 								          var $row = $input.parents("tr"); 
// 								          $systemMenuGrid.jqGrid('saveRow',$row.attr("id"), false); 
										}
								   });
								}
							}
						}, 
						{
							editable : true,
							name : 'CUST_BTN',
							searchBtnClick : function(value, rowid) {
								alert("검색 버튼 : " + value);
							}
						}, 
						{editable : true, name : 'USE_YN'}, 
						{name : 'IN_USER_ID'},
						{name : 'IN_DT',sortable : false} 
					],
					pager : "#tempJQGridFullNavi",
					loadonce : true,
					caption : "종합데이터 목록3",
				});
		    }
		    
		}();

		$(document).ready(function() {
			TestApp.init();
		});

	</script>

</body>
</html>