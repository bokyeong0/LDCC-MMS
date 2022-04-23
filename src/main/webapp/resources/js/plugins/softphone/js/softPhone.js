$(document).ready(function() {

	// 상담 화면 상단 통계 호출
//	todayStat();

	// 로그인한 계정이 관리자인지 체크

});

// 5분 주기로 상단 통계와 공지사항 업데이트
setInterval(function() {

	var bbsId = $("#bbsId", parent.contentsPage.document).val();

	if(parent.contentsPage.bbsListLoad) {

		contentsPage.bbsListLoad(bbsId);
		todayStat();
	}


}, 300000);

var menuMap = {};
function menu(menuId) {
	var url = "";

	url = contextPath + menuMap[menuId];

	if (menuId == "AP_LOGOUT") {
		location.href = url;
	} else {
		document.getElementById("contentsPage").src = url;
	}
}

// 상담화면 상단 통계 
function todayStat() {

	var agentId = $("#USERID").val();
	var agentGroup = $("#USERGROUP").val();

	var dataStr = {"agentId":agentId, "agentGroup":agentGroup};

	$.ajax({
		url:contextPath+"/blueone/todayCnt.do",
		data:dataStr,
		type:"POST",
		dataType:"json",
		success:function(jRes){

			if(jRes.success == "Y" && jRes.result == "1") {

				var statData = jRes.resData.statData;

				var totalCnt = statData['totalCnt'];
				var groupCnt = statData['groupCnt'];
				var agentCnt = statData['agentCnt'];

				if(totalCnt == null) {
					totalCnt = 0;
				}
				if(groupCnt == null) {
					groupCnt = 0;
				}
				if(agentCnt == null) {
					agentCnt = 0;
				}

				$("#totalCnt").text(totalCnt + " 건");
				$("#groupCnt").text(groupCnt + " 건");
				$("#agentCnt").text(agentCnt + " 건");
			}
		}
	})

}

// 상담 등록 여부 Flag
function counselFlag(state) {

	var flag = $("#counselFlag", parent.contentsPage.document).val();

	var flag2 = $("#alertFlag", parent.contentsPage.document).val();

	if(state == "softphone_ready") {

		if(flag == "0") {
			fnProcButton("softphone_ready");
		} else {
			dhtmlx.alert("상담내용이 등록되지 않았습니다.");
		}

	} else if(state == "softphone_make_call") {

		if(flag2 == "0" && flag == "0") {
			fnProcButton("softphone_make_call");
		} else {
			dhtmlx.alert("상담내용이 등록되지 않았습니다.");
		}

	}
}

// 전화 알림 팝업
function alarmPopup(custNum, custInfoDial) {

	var custDial = "";

	if(custInfoDial == "11") {
		custDial = "경주 골프";
	} else if(custInfoDial == "12") {
		custDial = "경주 콘도";
	} else if(custInfoDial == "18") {
		custDial = "경주 기타";
	}

	dhtmlx.alert({
		title:"알림",
		text:"전화가 왔습니다.<br><br><b>" + custDial + "</b><br><br><b>" + custNum + "</b>",
		ok:"전화받기",
		callback: function () {

			var flag = $("#alertFlag", parent.contentsPage.document).val();

			if (flag == "1") {
				// 받기 버튼을 누르면 소프트폰 전화받기 연동
				fnProcButton("softphone_answer");
			}

		}
	});

}

// 전화 받기 전에 끊어졌을 시 팝업 창을 닫고 검색된 고객 정보 초기화
function alertClose() {

	var flag = $("#alertFlag", parent.contentsPage.document).val();

	$(".dhtmlx_popup_button").eq(0).click();

	if(flag != "2") {
		parent.contentsPage.canselCounsel();
	}



}

function logoClick() {

	window.open("http://www.ktr.or.kr/");
}



