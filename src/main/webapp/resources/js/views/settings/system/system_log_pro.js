/**
 * systemProInfoGrid
 * systemProInfoGridNavi
 */
/** Copyright (c) 2016 VertexID RND, Inc.
 * 
 * Application Name : 메뉴내역관리[LogProApp]
 * Program Code     : PC0016
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Shin Dong Cheol  2017. 11. 13.  		First Draft.
 */

var LogProApp = function (){
	"use strict";
	
	var $systemProInfoGrid = $('#systemProInfoGrid');
	
	return {
		init: function() {
			// 메뉴 사용 내역 버튼 이벤트
			fnListProInfoEvents();

			// 메뉴 사용 내역 Grid 생성
			fnListProInfo();
		}
	};
	
	// 메뉴 사용 내역 버튼 이벤트
	function fnListProInfoEvents(){
		
		$("#systemProInfoProNameSearch, #systemProInfoUserNameSearch").enterEvent({
			callBack:function(value){
				var data = {
						proNm : $('#systemProInfoProNameSearch').val(),
						userNm: $('#systemProInfoUserNameSearch').val(),
						startDate: $('#systemProInfoStartSearch').val(),
						endDate: $('#systemProInfoEndSearch').val()
				};
				$systemProInfoGrid.paragonGridSearch(data);
			}
		});
		
		$('#systemProInfoSearchBtn').click(function (){
			fnSearchListProInfo();
		});
		
		$('#systemProInfoDateForm').datepicker({todayHighlight: true, autoclose: true, clearBtn:true});
		$('#systemProInfoStartSearch').val(Util.LocalDate());
		$('#systemProInfoEndSearch').val(Util.LocalDate());
		
		$('#systemProInfoSendMail').click(function (){
			$.ajax({
				url:"/ctrl/setting/log/sendMail",
				type: "POST"
			});
		});
	}

	function fnSearchListProInfo(){
		var data = {
				proNm : $('#systemProInfoProNameSearch').val(),
				userNm: $('#systemProInfoUserNameSearch').val(),
				startDate: $('#systemProInfoStartSearch').val(),
				endDate: $('#systemProInfoEndSearch').val()
		};
		
		$systemProInfoGrid.paragonGridSearch(data);
	}
	
	// 메뉴 사용 내역 Grid 생성
	function fnListProInfo(){
		
		var data = {
				proNm : $('#systemProInfoProNameSearch').val(),
				userNm: $('#systemProInfoUserNameSearch').val(),
				startDate: $('#systemProInfoStartSearch').val(),
				endDate: $('#systemProInfoEndSearch').val()
		};

		$systemProInfoGrid.paragonGrid({
			url: '/ctrl/setting/log/getProList',
			componentId: "CP0004",
			rowEditable:false,
			postData: data,
			colNames: [
			          "사용자이름  "
			          , "사용일시    "
			          , "메뉴명"
			          , "접속 IP     "
			          , "내용"
			],
			colModel: [
			           {editable: false, name:"USER_NM", hidden: false, align: 'center'}
			           , {editable: false, name:"LP_DT", hidden: false, align: 'center'}
			           , {editable: false, name:"MENU_NM", hidden: false, align: 'center', sortable:false}
			           , {editable: false, name:"CONNECT_IP", hidden: false, align: 'center', sortable:false}
			           , {editable: false, name:"LP_CONTENT", hidden: false, sortable:false}
			],
			pager: "#systemProInfoGridNavi",
			caption: "메뉴사용내역"
		});
	}
}();

$(document).ready(function () {
	LogProApp.init();
});