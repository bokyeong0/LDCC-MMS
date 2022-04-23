/**
 * 
 systemLoginInfoGrid
 */
/** Copyright (c) 2016 VertexID RND, Inc.
 * 
 * Application Name : 로그인 내역[LogLoginApp]
 * Program Code     : PC0017
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Shin Dong Cheol  2017. 11. 13.  		First Draft.
 */

var LogLoginApp = function () {
	"use strict";
	
	var $systemLoginInfoGrid = $("#systemLoginInfoGrid");
	
	return {
		init: function () {
			// 로그인 내역 이벤트
			fnListLoginInfoEvents();

			// 로그인 내역 Grid 생성
			fnListLoginInfo();
		}
	};
	
	//[Fn] 로그인 내역 이벤트
	function fnListLoginInfoEvents() {
		
		$('#systemLoginInfoUserNameSearch').enterEvent({
			callBack:function(value){
				var data = {
						userNm : $('#systemLoginInfoUserNameSearch').val(),
						loginYn : $('#systemLoginInfoLoginFlag').val(),
						startDate : $('#systemLoginInfoStartSearch').val(),
						endDate : $('#systemLoginInfoEndSearch').val()
				};
				
				$systemLoginInfoGrid.paragonGridSearch(data);
				$('#systemLoginInfoUserNameSearch').autocomplete( 'close' );
			}
		});
		
		$('#systemLoginInfoSearchBtn').click(function () {
			fnListLoginInfoSearch();
		});
		
		$('#systemLoginInfoDateForm').datepicker({todayHighlight: true, autoclose: true, clearBtn: true});
		$('#systemLoginInfoStartSearch').val(Util.LocalDate());
		$('#systemLoginInfoEndSearch').val(Util.LocalDate());
	}
	
	function fnListLoginInfoSearch() {
		var data = {
				userNm : $('#systemLoginInfoUserNameSearch').val(),
				loginYn : $('#systemLoginInfoLoginFlag').val(),
				startDate : $('#systemLoginInfoStartSearch').val(),
				endDate : $('#systemLoginInfoEndSearch').val()
		};
		
		$systemLoginInfoGrid.paragonGridSearch(data);

	}
	
	//[Fn] 로그인 내역 Grid 생성
	function fnListLoginInfo(){
		console.log("call fnListLoginInfo");
		
		var data = {
				userNm : $('#systemLoginInfoUserNameSearch').val(),
				loginYn : $('#systemLoginInfoLoginFlag').val(),
				startDate : $('#systemLoginInfoStartSearch').val(),
				endDate : $('#systemLoginInfoEndSearch').val()
		};

		$systemLoginInfoGrid.paragonGrid({
			url: '/ctrl/setting/log/getLoginList',
			componentId:"PC0017",
			rowEditable:false,
			postData: data,
			colNames:[
			     '사용자 이름',
			     '사용일시',
			     '접속 IP',
			     '상태'
			],
			colModel:[
			     {editable:false, name:'USER_NM', hidden:false, align:'center'},
			     {editable:false, name:'LL_DT', hidden:false, align:'center'},
			     {editable:false, name:'CONNECT_IP', hidden:false, align:'center'},
			     {editable:false, name:'FLAG_NM', hidden:false, width:50, align:'center'}
			],
			pager: "#systemLoginInfoGridNavi",
			caption: "로그인 내역"
		});
	}
}();

$(document).ready(function (){
	LogLoginApp.init();
});