/** Copyright (c) 2017 VertexID RND, Inc.
 * 
 * Application Name : Main 프레임및 초기 함수
 * Program Code     : 
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * 김진호			2017. 3. 16. 		First Draft.        
 */
var tabs;
$(function(){
	App.init(); 
	//초기 User정보 가져오기
	Util.UserInfoInit();
	//텝App 생성
	tabs = $('#tabs').paragonTabs();
	var userInfo = Util.getUserInfo();
	
	tabs.addTab({
		title: 'Dashboard',
		id: 'dashboard',
		closable: false,
		ajaxUrl: '/dashboard',
//		ajaxUrl: '/ctrl/asset/asset',
//		ajaxUrl: '/ctrl/status/rcptMap',
		proCd: 'PC0028',
		icon: 'fa fa-home fa-lg'
	});
	
	$("#leftMenu").setLeftMenu({
		allOpen:true,
		autoClose:false,
		click:  function(data){
			tabs.addTab({
				title: data.val,
				id: data.key,
				ajaxUrl: data.url,
				proCd: data.pro_cd,
				icon: data.ico
			});
		}
	});
	//버톡 열기
//	$("#vertalk").click(function(){
//		$("#commentPg").load("/talk");
//		$("#commentPg").show();
//	});
//	PopApp.paragonOpenPopup({
//		ajaxUrl : '/ctrl/settings/user/myPage',
//		id : 'mainMyPagePopup',
//		width : '800px',
//		title : "개인정보관리",
//		onload : function(modal) {
//			modal.show();
//		}
//	});
	//개인정보 설정 
	$("#mainMyPage, #mainMyPageMobile").click(function(){
    	PopApp.paragonOpenPopup({
			ajaxUrl : '/ctrl/settings/user/myPage',
			id : 'mainMyPagePopup',
			width : '800px',
			btnName : "수정",
			title : "개인정보관리",
			onload : function(modal) {
				modal.show();
			}
	
		});
	});
	//언어변경
	$(".change-language").click(function(){
		var thisLanguage = $(this).data("main-language");
		var thisCountry = $(this).data("main-country");
    	fnChangeLenguage(thisLanguage,thisCountry);
    });
	//로컬 폰트 정보
	var saveFont = localStorage.getItem('saveFont');
		
	if(saveFont){
		if(saveFont == "S"){
			$("#mainMasterBody").addClass("master-grid-S ");
			$("#RadomainFontSizeS").prop("checked",true)
			
		}else if(saveFont == "M"){
			$("#mainMasterBody").addClass("master-grid-M ");
			$("#RadomainFontSizeM").prop("checked",true)
			
		}else if(saveFont == "L"){
			$("#mainMasterBody").addClass("master-grid-L ");
			$("#RadomainFontSizeL").prop("checked",true)
			
		}
	}
	
	$("#fontSizeN").click(function(){
		$("#mainMasterBody").addClass("master-grid-M ");
		$("#mainMasterBody").removeClass("master-grid-S ");
		$("#mainMasterBody").removeClass("master-grid-M ");
		$("#mainMasterBody").removeClass("master-grid-L ");
		localStorage.setItem('saveFont', "");
	});
	//모바일 네이티브 엡 환경 설정창 열기
	$("#settingMobilde").click(function(){
		if (Util.CheckOs()== "ios"){
			window.location="jscall://webSettings"// mmscall://id=aaa jscall://testMessage
		}else if(Util.CheckOs() == "android"){
			window.ParagonApp.webSettings(); // android
		}
	});
	
	//라디오 폰트 변경
	$("input[name='RadomainFontSize']").change(function(){
		var thisval = $(this).val();
		if(thisval == "S"){
			$("#mainMasterBody").addClass("master-grid-S ");
			$("#mainMasterBody").removeClass("master-grid-M ");
			$("#mainMasterBody").removeClass("master-grid-L ");
			localStorage.setItem('saveFont', "S");
			
		}else if(thisval == "M"){
			$("#mainMasterBody").addClass("master-grid-M ");
			$("#mainMasterBody").removeClass("master-grid-S ");
			$("#mainMasterBody").removeClass("master-grid-L ");
			localStorage.setItem('saveFont', "M");
			
		}else{
			$("#mainMasterBody").addClass("master-grid-L ");
			$("#mainMasterBody").removeClass("master-grid-S ");
			$("#mainMasterBody").removeClass("master-grid-M ");
			localStorage.setItem('saveFont', "L");
			
		}
	});
	$("#fontSizeS").click(function(){
		$("#mainMasterBody").addClass("master-grid-S ");
		$("#mainMasterBody").removeClass("master-grid-M ");
		$("#mainMasterBody").removeClass("master-grid-L ");
	});
	$("#fontSizeM").click(function(){
		$("#mainMasterBody").addClass("master-grid-M ");
		$("#mainMasterBody").removeClass("master-grid-S ");
		$("#mainMasterBody").removeClass("master-grid-L ");
	});
	$("#fontSizeL").click(function(){
		$("#mainMasterBody").addClass("master-grid-L ");
		$("#mainMasterBody").removeClass("master-grid-S ");
		$("#mainMasterBody").removeClass("master-grid-M ");
	});
	
	function fnChangeLenguage(thisLanguage,thisCountry){
    	
    	$.ajax({
    		url : "/ctrl/sign/changeLanguage",
    		data :{
    			language:thisLanguage,
    			country:thisCountry
			},
    		type : "POST",
    		dataType : "json",
    		cache: false,
    		success : function(data) {
    			var sysCd = data.sysCd;
    			var stsCd = data.stsCd;
    			var msgTxt = data.msgTxt;
//    	    	100 // 응답 성공
//    	    	101 // 응답 성공 msg
    			switch (stsCd){
    			case 100 : location.href="/"; break;
    			case 101 : alert(msgTxt); break;
    			}
    		}
    	});
    }
	
	/*
	 * LEFT MENU 기본값
	$("#leftMenu").setLeftMenu({
		url: "/getLeftMenu",		//메뉴 조회 URL
		key:"MENU_SEQ",				//메뉴코드
		val:"MENU_NM",			//메뉴명
		p_key:"MENU_PARENT_SEQ",		//메뉴 상위코드
		ico:"MENU_ICO",				//상위 아이콘명 1 Detph만가능
		default_ico:"fa-folder-open-o",	// 기본 아이콘
		call_url:"CALL_URL",			// 호출 URl
		data: {},						// 메뉴 조회시 전송되는 파라메터
		autoClose : true,				// 1 Detph에서 다른 메뉴가 열리면 자동으로 닫음
		allOpen : false,				// 시작시 자동 펼침
		tagId : "defaultMenu",			// 메뉴 상위 아이디값(중복 생성시 다른값사용)
		click : function(data){			// 메뉴 클릭시 호출되는 이벤트
			
		}
	});*/
});


