﻿// t-motion server ip
var m_serverIp = '10.10.23.100';
var m_swf_path = '';
// softphone start login 
// true : server connection -> logon, false ( default ) : server connection
var fLogin = true;
// t-motion skin use
// true ( defualt ) : t-motion softphone, false : user define
var fTmotionSoftphone = false;
// CID catch
// true : Answer event, false ( default ) : offering event
var fCIDOpt = false;
// Auto Ready Delay
// 0 : no delay,  1 ~ : delay ( sec )
var nAutoReadyDelay = 10;
var hAutoReadyDelay = '';

var hCTIStatus = '';
var objPopup = '';

// User transfer using
var UTU = false;

function TM_SCREEN_CALLBACK(Result)
{
	alert( Result );
}

function fnTMotionClientProc(evtName, custNo, agentId, agentExt )
{
	switch( evtName )
	{
		case "INBOUND CALL. RING" :
		break;
		case "Answer" :
			//window.open( "http://www.mobigo.co.kr/softphone.php?pnum="+custNo, "", "left=0,top=0,width=1152,height=864,resizeble=yes,titlebar=no,status=yes" );
		break;
	}
}

function fnClientProc(evtName, custNo, agentId, agentExt )
{
	console.log(evtName);
	console.log(custNo);
	console.log(agentId);
	console.log(agentExt);
	var custNoIdx = custNo.indexOf('`');
	if( custNoIdx >= 0 ){
		custNo = custNo.substring(4,custNo.indexOf('`',4));
//		var phoneLength = custNo.length;TODO:김진호 하이픈 으로 된 전화번호 변환 
//		if(phoneLength)
		console.log("IVR : " + custNo);
	}
	if(evtName == "INBOUND CALL. RING" || evtName == "Local CALL. RING" ){ // *******[전화 오는중]******* 
		$("#obsStrSearchNm").val(custNo);	// 수신번호 
		$("#callAnswer").prop("disabled",false);	// 받기버튼 (활성)
//		$("#callTransfer").prop("disabled",false);	// 전환버튼 (활성)
//		$("#callGroup").prop("disabled",false);		// 회의버튼 (활성)
		$("#callMake").prop("disabled",true);		// 걸기버튼 (비활성)
		$("#callReady").removeClass("btn-primary"); // 준비버튼 (비활성)
	}else if(evtName == "Login"){					// *******[로그인성공]******* 
		$("#callStsBtnGroup > .call-btn").prop("disabled",false); //상태버튼구릅 활성화
		$("#callMake").prop("disabled",false);		// 걸기버튼버튼 (활성화)		
		//$("#callReady").addClass("btn-primary");	// 대기버튼 (활성화)
		$("#callReady").prop("disabled",false);		// 대기버튼 	(활성)
		$("#callLogonBtn").hide();					// 로그인버튼 (숨기기)
		$("#callDrop").hide();						// 끊기숨기기버튼 (보이기)
		$("#callMake").show();						// 걸기버튼 (보이기)
		
//		alert("전화기와 연결되었습니다.\n전화를 받으시려면 대기버튼을 눌러주세요.");
		if(custNo != ""){
			CT_READY(custNo,custNo);
	        alert("전화기와 연결되었습니다. 내선번호:"+custNo);
	        $("#callReady").addClass("btn-primary");	// 대기버튼 (활성화)
		}else{
	        alert("전화기와 연결되었습니다. 대기버튼을 눌러주세요.");
		}
		

		
	}else if(evtName == "Success LogOut"){ 			// *******[로그아웃]******* 
		$("#callLogonBtn").show();					// 로그인버튼 (보이기)
		$("#callStsBtnGroup .sts-btn").removeClass("btn-primary");
		$("#callDrop").hide();						// 끊기 버튼 (숨기기)
		$("#callMake").show();						// 걸기 버튼 (보이기)
		$("#callHole").show();						// 보류 버튼 (보이기)
		
	}else if(evtName == "DISCONNECT SERVER"){ 		// *******[전화끊음]******* //연결 끊어짐
		$("#callLogonBtn").show();					// 로그인버튼 (보이기)
		$("#callLogonBtn").prop("disabled",false);				// 로그인버튼 (보이기)
		$("#callMake").prop("disabled",true);				// 로그인버튼 (보이기)
		$("#callStsBtnGroup .sts-btn").removeClass("btn-primary");
		$("#callDrop").hide();						// 끊기버튼 (숨기기)
		$("#callMake").show();						// 걸기버튼 (보이기)
		
		$("#callHole").show();						// 보류버튼 (보이기)
		$("#callHole").prop("disabled",true);		// 보류버튼 (비활성)
		
	}else if(evtName == "AfterCallWork"){ 			// *******[전화끊음]*******
		CT_READY(agentExt,agentExt);
		$("#callAnswer").prop("disabled",true);     // 받기버튼 (비활성)
		$("#callTransfer").prop("disabled",true);     // 전환버튼 (비활성)
//		$("#callGroup").prop("disabled",true);      // 회의버튼 (비활성)
		$("#callMake").prop("disabled",false);      // 걸기버튼 (활성)
                                                    
		$("#callDrop").hide();                      // 끊기버튼 (숨기기)
		$("#callDrop").prop("disabled",true);       // 끊기버튼 (비활성)
		
		$("#callMake").show();                      // 걸기버튼 (보이기)
		$("#callMake").prop("disabled",false);      // 걸기버튼 (활성)
		
		$("#callHold").prop("disabled",true);       // 보류버튼 (비활성)		
		$("#callHole").show();                      // 보류버튼 (보이기)
		$("#callUnHold").hide();					// 보류취소버튼 (숨기기)
		
		
	}else if(evtName == "Ready"){					// *******[준비]******* : 통화 종료후 [대기 활성] [보류비활성][보류취소 숨기기]
		$("#callReady").addClass("btn-primary");	// 대기버튼 	(활성)
		$("#callReady").prop("disabled",false);		// 대기버튼 	(활성)
		$("#callHold").show();						// 보류버튼 	(보이기) : 보이지만 비활성화함, 통화 연결시 보류버튼 활성화
		$("#callHold").prop("disabled",true);		// 보류버튼 	(비활성)
		$("#callUnHold").hide();					// 보류취소버튼 (숨기기)
		$("#callUnHold").prop("disabled",true);		// 보류취소버튼 (비활성)
		
	}else if(evtName == "Call Connected"){			// *******[통화중]******* : 통화 연결시 [끊기활성] [걸기 비활성] [대기상태 비활성]
		$("#callDrop").show();						// 끊기버튼 (보이기)
		$("#callDrop").prop("disabled",false);		// 끊기버튼 (활성화)
		
		$("#callMake").hide();						// 걸기버튼 (숨기기)
		$("#callMake").prop("disabled",true);		// 걸기버튼 (보이기)
		$("#callReady").removeClass("btn-primary");	// 대기버튼 (비활성)
		$("#callReady").prop("disabled",true);		// 대기버튼 (비활성)
		$("#callHold").prop("disabled",false);		// 버튼 (보이기)
		$("#callTransfer").prop("disabled",false);	// 전환버튼 (활성)
		
	}else if(evtName == "Hold"){ 					// *******[보류]******* :통화중 활성
		$("#callHold").hide();						// 보류버튼		(숨기기)
		$("#callHold").prop("disabled",true);		// 보류버튼		(비활성)
		$("#callUnHold").show();					// 보류취소버튼	(보이기)
		$("#callUnHold").prop("disabled",false);	// 보류취소버튼	(활성)
		
	}else if(evtName == "UnHold"){ 					// ****[보류 취소]****** : 보류중 활성화
		$("#callHold").show();						// 보류버튼		(보이기)
		$("#callHold").prop("disabled",false);		// 보류버튼		(활성)
		$("#callUnHold").hide();					// 보류취소버튼	(숨기기)
		$("#callUnHold").prop("disabled",true);		// 보류취소버튼	(비활성)
//	}else if(evtName == "softphone_transfer"){ //전환시도
//		fnClientProc("Transfer", '', thisdoc.USERID.value, thisdoc.EXT.value);
//		//완료
//		CT_TRANSFERCANCEL();
//		//완료
//		CT_TRANSFERCOMPLET(thisdoc.TRANS_EXT.value, thisdoc.EXT.value);
//	}else if(evtName == "softphone_init"){ //전환 돌려주기
//		CT_TRANSFERINIT(thisdoc.TRANS_EXT.value,thisdoc.EXT.value);
//		fnClientProc("Transfer Init", '', thisdoc.USERID.value, thisdoc.EXT.value);
//		
	}
	return;
	try
	{
		
		var arBtn = new Array( 22 );
		arBtn['0']	= 'softphone_login';
		arBtn['1']	= 'softphone_logout';
		arBtn['2']	= 'softphone_ready';
		arBtn['3']	= 'softphone_notready';
		arBtn['4']	= 'softphone_answer';
		arBtn['5']	= 'softphone_drop_call';
		arBtn['6']	= 'softphone_make_call';
		arBtn['7']	= 'softphone_hold';
		arBtn['8']	= 'softphone_unhold';
		arBtn['9']	= 'softphone_transfer';
		arBtn['10']	= 'softphone_conference';
		arBtn['11'] = 'softphone_lunchtime';
		arBtn['12'] = 'softphone_meeting';
		arBtn['13'] = 'softphone_power_working';
		arBtn['14'] = 'softphone_breaktime';
		arBtn['15'] = 'softphone_other_working';
		arBtn['16'] = 'softphone_missing_call';
		arBtn['17'] = 'softphone_callback';
		arBtn['18'] = 'softphone_happy_call';
		arBtn['19'] = 'softphone_init';
		arBtn['20'] = 'softphone_ok';
		arBtn['21'] = 'softphone_cancel';
		
		
		var arState = new Array( '1', '4', '3', '3', '3', '4', '3', '3', '4', '3', '3', '3', '4', '3', '3', '3', '4', '4', '4', '4', '4', '4' );
		//alert( evtName );
		
//		document.getElementById( 'softphone_notready_reason' ).style.display = 'none';
		
		switch( evtName )
		{
			case "Connect" :
				arState = new Array( '4', '1', '3', '3', '3', '4', '3', '3', '4', '3', '3', '3', '4', '3', '3', '3', '4', '4', '4', '4', '4', '4' );
				break;
			case "Login" :
				//this.window.focus();
				//Set_AlwaysOn();
				//hCTIStatus = window.setInterval('parent.OnCTIStatus()', 5000 );
//				document.getElementById( 'row_login_01' ).className = 'row_login_none';
//				document.getElementById( 'row_login_02' ).className = 'row_login_none';
//
//				document.getElementById( 'row_call_01' ).className = 'row_call_view';
//				document.getElementById( 'row_call_02' ).className = 'row_call_view';
				
				arState = new Array( '4', '1', '1', '1', '3', '4', '1', '3', '4', '3', '3', '3', '4', '3', '3', '3', '4', '4', '4', '4', '4', '4' );
				break;
			case "Ready" :
				arState = new Array( '4', '1', '2', '1', '3', '4', '1', '3', '4', '3', '3', '3', '4', '3', '3', '3', '4', '4', '4', '4', '4', '4' );
				break;
			case "NotReady" :
//				document.getElementById( 'softphone_notready_reason' ).style.display = '';
				
				arState = new Array( '4', '1', '1', '2', '3', '4', '1', '3', '4', '3', '3', '1', '4', '1', '1', '1', '4', '4', '4', '4', '4', '4' );
				break;
			case "Lunch Time" :
//				document.getElementById('AGENT_STATUS').value = arStateText[41];
				arState = new Array( '4', '1', '1', '2', '3', '4', '1', '3', '4', '3', '3', '2', '4', '3', '3', '3', '4', '4', '4', '4', '4', '4' );
				break;
			case "Education" :
//				document.getElementById('AGENT_STATUS').value = arStateText[42];
				arState = new Array( '4', '1', '1', '2', '3', '4', '1', '3', '4', '3', '3', '3', '4', '3', '3', '3', '4', '4', '4', '4', '4', '4' );
				break;
			case "Meeting" :
//				document.getElementById('AGENT_STATUS').value = arStateText[43];
				arState = new Array( '4', '1', '1', '2', '3', '4', '1', '3', '4', '3', '3', '2', '4', '3', '3', '3', '4', '4', '4', '4', '4', '4');
				break;
			case "Power Working" :
//				document.getElementById('AGENT_STATUS').value = arStateText[44];
				arState = new Array( '4', '1', '1', '2', '3', '4', '1', '3', '4', '3', '3', '3', '4', '2', '3', '3', '4', '4', '4', '4', '4', '4' );
				break;
			case "Break Time" :
//				document.getElementById('AGENT_STATUS').value = arStateText[45];
				arState = new Array( '4', '1', '1', '2', '3', '4', '1', '3', '4', '3', '3', '3', '4', '3', '2', '3', '4', '4', '4', '4', '4', '4' );
				break;
			case "Other Working" :
//				document.getElementById('AGENT_STATUS').value = arStateText[46];
				arState = new Array( '4', '1', '1', '2', '3', '4', '1', '3', '4', '3', '3', '3', '4', '3', '3', '2', '4', '4', '4', '4', '4', '4' );
				break;
			case "Missing Call" :
//				document.getElementById('AGENT_STATUS').value = arStateText[47];
				arState = new Array( '4', '1', '1', '2', '3', '4', '1', '3', '4', '3', '3', '3', '4', '3', '3', '3', '4', '4', '4', '4', '4', '4' );
				break;
			case "Call Back" :
//				document.getElementById('AGENT_STATUS').value = arStateText[48];
				arState = new Array( '4', '1', '1', '2', '3', '4', '1', '3', '4', '3', '3', '3', '4', '3', '3', '3', '4', '4', '4', '4', '4', '4');
				break;
			case "Happy Call" :
//				document.getElementById('AGENT_STATUS').value = arStateText[49];
				arState = new Array( '4', '1', '1', '2', '3', '4', '1', '3', '4', '3', '3', '3', '4', '3', '3', '3', '4', '4', '4', '4', '4', '4');
				break;
			case "TRANSINIT CALL. RING" : 
				arState = new Array( '4', '1', '3', '4', '1', '4', '3', '3', '4', '3', '3', '3', '4', '3', '3', '3', '4', '4', '4', '4', '4', '4' );
//				thisdoc.obsStrSearchNm.value = custNo;
				break;
			case "INBOUND CALL. RING" :
				arState = new Array( '4', '1', '3', '3', '1', '4', '3', '3', '4', '3', '3', '3', '4', '3', '3', '3', '4', '4', '4', '4', '4', '4' );
		
				if ( UTU )
				{
					var tempCustInfo = custNo.split('|');
					var sabun = tempCustInfo[2];
					custNo = tempCustInfo[1];
				} else {
				}
				//alert( ' cust No : ' + custNo );
				thisdoc.obsStrSearchNm.value = custNo;
				try
				{
					//window.open( './CustomerPopup.html?txtCallPhone='+custNo+'&txtSabun='+sabun+'&userId='+USERID+'&ExtNo='+EXT, '', 'width=900,height=600,scrollbars=yes,titlebar=no,status=no' );
				}
				catch (e)
				{
					SOFTPHONE_DEBUG( "Popup", "["+EXT+"] " + "fnClientProc Exception : " + e.message );
				}
				//objPopup.document.customerPopup.txtCallPhone.value = custNo;
				///objPopup.document.customerPopup.action = 'http://www.as3651.com/CustManage2/CidProcess/CidDataReceiptPopup.asp?k=form';
				//objPopup.document.customerPopup.submit();
				break;
			case "Local CALL. RING" :
				arState = new Array( '4', '1', '3', '3', '1', '4', '3', '3', '4', '3', '3', '3', '4', '3', '3', '3', '4', '4', '4', '4', '4', '4' );
				thisdoc.obsStrSearchNm.value = custNo;
				break;
			case "Answer" :
				arState = new Array( '4', '1', '3', '3', '4', '1', '3', '1', '4', '1', '1', '3', '4', '3', '3', '3', '4', '4', '4', '4', '4', '4' );
				//window.open( "http://mgra.eduwill.net/customer/Customer_CTI_Request_Result_new.asp?callerid="+thisdoc.obsStrSearchNm.value, "", "fullscreen=no,top=0,width=850,height=500,left=0,resizable=no,titlebar=no,status=yes" );
				break;
			case "Call Connected" :
				arState = new Array( '4', '1', '3', '3', '4', '1', '3', '1', '4', '1', '1', '3', '4', '3', '3', '3', '4', '4', '4', '4', '4', '4' );
				break;
			case "AfterCallWork" :
				arState = new Array( '4', '1', '1', '1', '3', '4', '1', '3', '4', '3', '3', '3', '4', '3', '3', '3', '4', '4', '4', '4', '4', '4' );
				thisdoc.obsStrSearchNm.value = "";
				//$('#softphone_cid').empty();
				break;
			case "Hold" :
				arState = new Array( '4', '1', '3', '3', '4', '3', '3', '4', '1', '3', '3', '3', '4', '3', '3', '3', '4', '4', '4', '4', '4', '4' );
				break;
			case "UnHold" :
				arState = new Array( '4', '1', '3', '3', '4', '1', '3', '1', '4', '1', '1', '3', '4', '3', '3', '3', '4', '4', '4', '4', '4', '4' );
				break;
			case "Transfer":
				arState = new Array( '4', '1', '3', '3', '4', '1', '3', '1', '4', '1', '1', '3', '4', '3', '3', '3', '4', '4', '4', '1', '3', '1' );
				break;
			case "Conference" :
				arState = new Array( '4', '1', '3', '3', '4', '1', '3', '1', '4', '1', '1', '3', '4', '3', '3', '3', '4', '4', '4', '1', '3', '1' );
				break;
			case "Transfer Init" :
				arState = new Array( '4', '1', '3', '3', '4', '3', '3', '1', '4', '1', '3', '3', '4', '3', '3', '3', '4', '4', '4', '3', '1', '1' );
				break;
			case "Conference Ready" :
				arState = new Array( '4', '1', '3', '3', '4', '3', '3', '3', '4', '3', '2', '3', '4', '3', '3', '3', '4', '4', '4', '3', '3', '1' );
				break;
			case "Conference Init" :
				arState = new Array( '4', '1', '3', '3', '4', '3', '3', '1', '4', '3', '2', '3', '4', '3', '3', '3', '4', '4', '4', '3', '1', '1' );
				break;
			case "Transfer Cancel" :
			case "Conference Cancel" :
				arState = new Array( '4', '1', '3', '3', '4', '1', '3', '1', '4', '1', '1', '3', '4', '3', '3', '3', '4', '4', '4', '4', '4', '4' );
				break;
			case "Transfer Complete" :
				arState = new Array( '4', '1', '1', '1', '4', '3', '3', '1', '4', '1', '3', '3', '4', '3', '3', '3', '4', '4', '4', '4', '4', '4' );
				break;
			case "Conference Complete" :
				arState = new Array( '4', '1', '3', '3', '4', '1', '3', '3', '4', '3', '3', '3', '4', '3', '3', '3', '4', '4', '4', '4', '4', '4' );
				break;
			case "Success LogOut" :
			case "DISCONNECT SERVER" :
//				document.getElementById( 'row_login_01' ).className = 'row_login_view';
//				document.getElementById( 'row_login_02' ).className = 'row_login_view';
//
//				document.getElementById( 'row_call_01' ).className = 'row_call_none';
//				document.getElementById( 'row_call_02' ).className = 'row_call_none';
				
				arState = new Array( '1', '4', '3', '3', '3', '4', '3', '3', '4', '3', '3', '3', '4', '3', '3', '3', '4', '4', '4' );
				break;
			default :
				arState = new Array( '4', '1', '3', '3', '4', '4', '3', '3', '4', '3', '3', '3', '4', '3', '3', '3', '4', '4', '4', '4', '4', '4' );
	
				//SOFTPHONE_DEBUG( "", "["+EXT+"] " + "fnClientProc Error : " + e.description );
				//alert( 'error = ' + e.description );
				break;
		}
		ObstacleReceiptApp.OnButtonProc(arBtn, arState);
	} catch (e) {
//		SOFTPHONE_DEBUG( "Status", "["+EXT+"] " + "fnClientProc Exception : " + e.message + " ( " +evtName + " )" );
		alert( 'Exception = ' + e.message );		
	}
}

function fnProcButton( szButton )
{
	try
	{
		
		var obj = document.getElementById( "not_ready_sub" );
		switch( szButton )
		{
			case "softphone_login" :
				if ( document.getElementById('EXT').value.trim() == "" )
				{
					alert( '내선번호를 입력해주십시오.' );
					return;
				}
				if ( document.getElementById('USERID').value.trim() == "" )
				{
					alert( '상담원 아이디를 입력해주십시오.' );
					return;
				}
				CHECK_BUTTON( "Log On" );
				break;
			case "softphone_logout" :
				CHECK_BUTTON( "LogOut" );
				break;
			case "softphone_ready" :
				CT_READY(thisdoc.EXT.value,thisdoc.USERID.value);
				break;
			case "softphone_notready" :
				fnClientProc("NotReady", '', thisdoc.USERID.value, thisdoc.EXT.value);
				break;
			case "softphone_answer" :
				CT_ANSWER();
				break;
			case "softphone_drop_call" :
				CT_DROPCALL( thisdoc.EXT.value );
				break;
			case "softphone_make_call" :
				if ( document.getElementById('EXT').value.trim() == "" )
				{
					alert( '내선번호를 입력해주십시오.' );
					return;
				}
				
				thisdoc.OUTDIAL.value = thisdoc.TEMP_CALLNO.value;
				
				if ( thisdoc.OUTDIAL.value.trim() == "" )
				{
					alert( '발신번호를 입력해주십시오.' );
					thisdoc.OUTDIAL.focus();
					return;
				}
				sSoftphoneType = '';
				CT_MAKECALL( thisdoc.OUTDIAL.value, thisdoc.EXT.value );
				break;
			case "softphone_hold" :
				CT_HOLDCALL( thisdoc.EXT.value );
				break;
			case "softphone_unhold" :
				CT_UNHOLDCALL( thisdoc.EXT.value );
				break;
			case "softphone_lunchtime":
				AgentStatus( 41 );
				fnClientProc("Lunch Time", '', thisdoc.USERID.value, thisdoc.EXT.value);			
				break;
			case "softphone_education" :
				AgentStatus( 42 );
				fnClientProc("Education", '', thisdoc.USERID.value, thisdoc.EXT.value);			
				break;
			case "softphone_meeting" :
				AgentStatus( 43 );
				fnClientProc("Meeting", '', thisdoc.USERID.value, thisdoc.EXT.value);			
				break;
			case "softphone_power_working" :
				AgentStatus( 44 );
				fnClientProc("Power Working", '', thisdoc.USERID.value, thisdoc.EXT.value);			
				break;
			case "softphone_breaktime" :
				AgentStatus( 45 );
				fnClientProc("Break Time", '', thisdoc.USERID.value, thisdoc.EXT.value);			
				break;
			case "softphone_other_working" :
				AgentStatus( 46 );
				fnClientProc("Other Working", '', thisdoc.USERID.value, thisdoc.EXT.value);			
				break;
			case "softphone_missing_call" :
				AgentStatus( 47 );
				fnClientProc("Missing Call", '', thisdoc.USERID.value, thisdoc.EXT.value);			
				break;
			case "softphone_callback" :
				AgentStatus( 48 );
				fnClientProc("Call Back", '', thisdoc.USERID.value, thisdoc.EXT.value);			
				break;
			case "softphone_happy_call" :
				AgentStatus( 49 );
				fnClientProc("Happy Call", '', thisdoc.USERID.value, thisdoc.EXT.value);			
				break;
				//전환
			case "softphone_transfer" :
				sSoftphoneType = 'T';
				document.getElementById( 'TEMP_CALLNO' ).value = "";
				document.getElementById( 'TEMP_CALLNO' ).focus();
				document.getElementById( 'softphone_addon' ).style.display = "";
				document.getElementById( 'TRANS_EXT' ).value = "";

				fnClientProc("Transfer", '', thisdoc.USERID.value, thisdoc.EXT.value);				
				break;
				//회의
			case "softphone_conference" :
				sSoftphoneType = 'C';
				document.getElementById( 'TEMP_CALLNO' ).value = "";
				document.getElementById( 'TEMP_CALLNO' ).focus();
				document.getElementById( 'softphone_addon' ).style.display = "";
				document.getElementById( 'TRANS_EXT' ).value = "";
				
				fnClientProc("Conference", '', thisdoc.USERID.value, thisdoc.EXT.value);				
				break;
			case "softphone_init" :
				thisdoc.TRANS_EXT.value = thisdoc.TEMP_CALLNO.value; 
				if ( thisdoc.TRANS_EXT.value.trim() == "" )
				{
					alert( '내선번호를 입력해주십시오.' );
					return;
				}
				if ( sSoftphoneType == 'T' )
				{
					CT_TRANSFERINIT(thisdoc.TRANS_EXT.value,thisdoc.EXT.value);
					fnClientProc("Transfer Init", '', thisdoc.USERID.value, thisdoc.EXT.value);				
				} else {
					CT_CONFERENCEINIT(thisdoc.TRANS_EXT.value,thisdoc.EXT.value)
					fnClientProc("Conference Init", '', thisdoc.USERID.value, thisdoc.EXT.value);				
				}
				break;
			case "softphone_ok" :
				document.getElementById('softphone_addon').style.display = 'none';
				if ( sSoftphoneType == 'T' )
				{
					CT_TRANSFERCOMPLET(thisdoc.TRANS_EXT.value, thisdoc.EXT.value);
					fnClientProc("Transfer Complete", '', thisdoc.USERID.value, thisdoc.EXT.value);				
				} else {
					CT_CONFERENCECOMPLET(thisdoc.TRANS_EXT.value,thisdoc.EXT.value)
					fnClientProc("Conference Complete", '', thisdoc.USERID.value, thisdoc.EXT.value);				
				}
				sSoftphoneType = '';
				break;
			case "softphone_cancel" :
				document.getElementById("softphone_addon").style.display = "none";
				if ( sSoftphoneType == 'T' )
				{
					CT_TRANSFERCANCEL();
					fnClientProc("Transfer Cancel", '', thisdoc.USERID.value, thisdoc.EXT.value);				
				} else {
					CT_CONFERENCECANCEL(thisdoc.TRANS_EXT.value)
					fnClientProc("Conference Cancel", '', thisdoc.USERID.value, thisdoc.EXT.value);				
				}
				sSoftphoneType = '';
				break;
			case "softphone_payment" :
				CT_MAKECALL( '' );
				break;
			default :
				SOFTPHONE_DEBUG( '', "["+thisdoc.EXT.value+"] " + szButton + " exception!!(" + e.description + ")" );
				break;
		}

		SOFTPHONE_DEBUG( thisdoc.EXT.value, szButton );
	}
	catch (e)
	{
		SOFTPHONE_DEBUG( '', "["+thisdoc.EXT.value+"] " + szButton + " exception!!(" + e.description + ")" );
	}
	
}

function fncCallResult( pCHECKSTATE, pCHECKRESULT, pCHECKMSG, pCHECKTARGET, pCHECKCALLID, pCHECKBUFFER, pCHECKNEWCALLID, pCHECKIVRCODE)
{
	var nowState = "";
	var evtName ="";
	var agentId = USERID;
	var agentExt = EXT;


	if (pCHECKMSG == null || pCHECKMSG == "NONE" || pCHECKMSG == "")
	{
           return;
	}


	if ( fTmotionSoftphone )
	{
		try
		{			
			var arButton;
			var objStatus = document.getElementsByName( "radioStatus" );
	
			if ( nMsgLine == 50 )
			{
				nMsgLine = 0;
				document.getElementById( 'SOFTPHONESTATUS' ).value = "";
			}
			
			document.getElementById( 'SOFTPHONESTATUS' ).value = "[" + pCHECKRESULT + "][" + pCHECKSTATE + "]" + pCHECKMSG + "\n" + document.getElementById( 'SOFTPHONESTATUS' ).value; 
			nMsgLine++;
			
			console.log(pCHECKMSG);
			switch( pCHECKMSG )
			{
				case "CONNECT SERVER" :
					nowState = "Connect";
	
					arButton = new Array('LOGON');
					ObstacleReceiptApp.OnButtonProc( arButton );
				break;
				case "Success Login" :
					nowState = "Login";
	
					if ( typeof Set_AlwaysOn == 'function' )
					{
						this.window.focus();
						Set_AlwaysOn();
					}
	
					arButton = new Array('LOGOUT', 'Ready', 'NotReady', 'Answer', 'Dial', 'always');
					ObstacleReceiptApp.OnButtonProc( arButton );
				break;
				case "Success Ready" :
					nowState = "Ready";
	
					if ( objStatus['1'].checked )
					{
						if ( hAutoReadyDelay != "" )
						{
							window.clearTimeout( hAutoReadyDelay );
							hAutoReadyDelay = '';
						}
					}
	
					arButton = new Array('LOGOUT', 'NotReady', 'Answer', 'Dial', 'always');
					ObstacleReceiptApp.OnButtonProc( arButton );
				break;
				case "Success Not Ready" :
					nowState = arState[REASONCODE];
	
					arButton = new Array('LOGOUT', 'Ready', 'NotReady', 'Answer', 'Dial', 'always');
					ObstacleReceiptApp.OnButtonProc( arButton );
				break;
				case "Success Answer" :
					nowState = "Answer";
	
					if ( fCIDOpt )
					{
						document.getElementById( "obsStrSearchNm" ).value = CHECKCALLID;
					}
					
					arButton = new Array('LOGOUT', 'Hold', 'HangUp', 'TransInit', 'ConfInit', 'always');
					ObstacleReceiptApp.OnButtonProc( arButton );
				break;
				case "INBOUND CALL. RING" :
					nowState = "INBOUND CALL. RING";
					
					if ( !fCIDOpt )
					{
						if ( UTU )
						{
							var tempCALLID = CHECKCALLID.split('|');
							document.getElementById( "obsStrSearchNm" ).value = tempCALLID[1];
						} else {
							document.getElementById( "obsStrSearchNm" ).value = CHECKCALLID;
						}
					}
					arButton = new Array('LOGOUT', 'Answer', 'always');
					ObstacleReceiptApp.OnButtonProc( arButton );
				break;
				case "Success Call Connected" :
					if ( objState.value == "Transfer Init" || objState.value == "Transfer Cancel" )
						return;
	
					if ( objState.value == "Conference Ready" ){
					}
	
					if ( objState.value == "Conference Complete" || objState.value == "Conference Cancel" )
						return;			
				
					nowState = "Call Connected";
	
					arButton = new Array('LOGOUT', 'Hold', 'HangUp', 'TransInit', 'ConfInit', 'always');
					ObstacleReceiptApp.OnButtonProc( arButton );
				break;
				case "Success Call Disconnected" :
					nowState = "AfterCallWork";
	
					if ( objStatus['1'].checked )
					{
						if ( nAutoReadyDelay )
						{
							if ( hAutoReadyDelay == "" )
							{
								hAutoReadyDelay = window.setTimeout( "CT_READY( '" + thisdoc.EXT.value+"', '"+thisdoc.USERID.value+"' )", nAutoReadyDelay * 1000 );
							}
						} else {
							CT_READY( thisdoc.EXT.value, thisdoc.USERID.value );
							return;
						}
					}
					
					arButton = new Array('LOGOUT', 'Ready', 'NotReady', 'Answer', 'Dial', 'always');
					ObstacleReceiptApp.OnButtonProc( arButton );
				break;
				case "Success Hold" :
					nowState = "Hold";
	
					arButton = new Array('LOGOUT',  'UnHold', 'always');
					ObstacleReceiptApp.OnButtonProc( arButton );
				break;
				case "Success UnHold" :
					nowState = "UnHold";
	
					arButton = new Array('LOGOUT', 'Hold', 'HangUp', 'TransInit', 'ConfInit', 'always');
					ObstacleReceiptApp.OnButtonProc( arButton );
				break;
				case "Success Init Transfer" :
					nowState = "Transfer Init";
	
					arButton = new Array('TransComp', 'TransCancel', 'always');
					ObstacleReceiptApp.OnButtonProc( arButton );
				break;
				case "Success Transfer Complete" :
					nowState = "AfterCallWork";
					if ( objStatus['1'].checked )
					{
						CT_READY( thisdoc.EXT.value, thisdoc.USERID.value );
						return;
					}
					
					arButton = new Array('LOGOUT', 'Ready', 'NotReady', 'Answer', 'Dial', 'always');
					ObstacleReceiptApp.OnButtonProc( arButton );
				break;
				case "Success Cancel Transfer" :
					nowState = "Transfer Cancel";
	
					arButton = new Array('LOGOUT', 'Hold', 'HangUp', 'TransInit', 'ConfInit', 'always');
					ObstacleReceiptApp.OnButtonProc( arButton );
				break;
				case "Success Init Conference" :
					nowState = "Conference Init";
	
					if ( pCHECKSTATE == "40360" )
					{
						arButton = new Array( 'LOGOUT', 'ConfComp', 'ConfCancel', 'always');
					} else {
						arButton = new Array('LOGOUT', 'HangUp', 'ConfCancel', 'always');
					}
					ObstacleReceiptApp.OnButtonProc( arButton );
				break;
				case "Success Conference Complete" :
					nowState = "Conference Complete";
	
					arButton = new Array('LOGOUT', 'Hold', 'HangUp', 'always');
					ObstacleReceiptApp.OnButtonProc( arButton );
				break;
				case "Success Cancel Conference" :
					nowState = "Conference Cancel";
	
					arButton = new Array('LOGOUT', 'Hold', 'HangUp', 'TransInit', 'ConfInit', 'always');
					ObstacleReceiptApp.OnButtonProc( arButton );
				break;
	
				case "Success LogOut" :
				case "DISCONNECT SERVER" :
					nowState = "DISCONNET SERVER";
	
					arButton = new Array('LOGON');
					ObstacleReceiptApp.OnButtonProc( arButton );
				break;
			}
			thisdoc.AGENTSTATUS.value = nowState;
	
			fnTMotionClientProc( nowState, CHECKCALLID, agentId, agentExt );

			if ( objStatus['1'].checked )
			{
				if ( hAutoReadyDelay != "" && pCHECKMSG != "Success Call Disconnected" )
				{
					window.clearTimeout( hAutoReadyDelay );
					hAutoReadyDelay = '';
				}
			}
		}
		catch (e)
		{
			SOFTPHONE_DEBUG( "", "["+EXT+"] " + "fncCallResult Exception : " + e.description );
			console.log( "Error : " + e.description );
		}

	} else {
//		try
//		{
			
			if( pCHECKRESULT == "Y" )
			{
				var textState = "";
				switch( pCHECKMSG )
				{
					case "CONNECT SERVER" :
						nowState 	= "Connect";
						textState 	= "서버연결"; 
					break;
					case "Success Login" :
						nowState 	= "Login";
						textState	= "로그인";
					break;
					case "Success Ready" :
						if ( hAutoReadyDelay != "" )
						{
							window.clearTimeout( hAutoReadyDelay );
							hAutoReadyDelay = '';
						}
						nowState 	= "Ready";
						textState 	= "대기";
					break;
					case "Success Not Ready" :
						nowState 	= arState[REASONCODE];
						textState 	= arStateText[REASONCODE];
					break;
					case "Success Answer" :
						nowState 	= "Answer";
						textState	= "받기";
						
						custNo = CHECKCALLID;
					break;
					case "TRANSINIT CALL. TRANSINIT CALL" :
						nowState 	= "TRANSINIT CALL. RING";
						textState 	= "전환 전화 옴";
						
						CHECKCALLID = pCHECKCALLID;
						custNo = CHECKCALLID;
					break;
					case "INBOUND CALL. RING" :
						nowState 	= "INBOUND CALL. RING";
						textState 	= "전화 옴";
						
						CHECKCALLID = pCHECKCALLID;
						custNo = CHECKCALLID;
					break;
					case "Local CALL. Local CALL" :
						nowState 	= "Local CALL. RING";
						textState 	= "내선전화 옴";
						CHECKCALLID = pCHECKCALLID;
						custNo = CHECKCALLID;
					break;
					case "Success Call Connected" :
						if ( nowState == "Transfer Init" || nowState == "Transfer Cancel" )
							return;
						
						if ( nowState == "Conference Ready" ) {
						}
	
						if ( nowState == "Conference Init" || nowState == "Conference Complete" || nowState == "Conference Cancel" )
							return;			
					
						nowState 	= "Call Connected";
						textState	= "통화 중";
	
	//					if ( $('#softphone_cid').html( custNo ) != pCHECKCALLID )
	//					{
	//						thisdoc.obsStrSearchNm.value = custNo;
	//						$('#softphone_cid').html( custNo );
	//						document.getElementById('.clFrameContents iframe').get(0).contentWindow.OnSearchInBoundCall( custNo );
	//					}
	
					break;
					case "Success Call Disconnected" :
						nowState 	= "AfterCallWork";
						textState 	= "후처리";
						if ( nAutoReadyDelay > 0 )
						{
							if ( hAutoReadyDelay == "" )
							{
								hAutoReadyDelay = window.setTimeout( "CT_READY( '" + thisdoc.EXT.value+"', '"+thisdoc.USERID.value+"' )", nAutoReadyDelay * 1000 );
							}
						//} else {
						//	CT_READY( thisdoc.EXT.value, thisdoc.USERID.value );
						//	return;
						}
	
					break;
					case "Success Hold" :
						nowState 	= "Hold";
						textState 	= "보류";
					break;
					case "Success UnHold" :
						nowState 	= "UnHold";
						textState 	= "통화 중";
					break;
					case "Success Init Transfer" :
						nowState 	= "Transfer Init";
						textState 	= "호전환 초기화"; 
					break;
					case "Success Transfer Complete" :
						nowState	= "AfterCallWork";
						textState 	= "후처리";
						if ( nAutoReadyDelay > 0 )
						{
							if ( hAutoReadyDelay == "" )
							{
								hAutoReadyDelay = window.setTimeout( "CT_READY( '" + thisdoc.EXT.value+"', '"+thisdoc.USERID.value+"' )", nAutoReadyDelay * 1000 );
							}
						//} else {
						//	CT_READY( thisdoc.EXT.value, thisdoc.USERID.value );
						//	return;
						}
					break;
					case "Success Cancel Transfer" :
						nowState 	= "Transfer Cancel";
						textState 	= "호전화 취소";	
					break;
		
					case "Success Ready Conference" :
						nowState 	= "Conference Ready";
						textState	= "회의 연결 시도 중";
					break;
					case "Success Init Conference" :
						nowState 	= "Conference Init";
						textState	= "회의 연결 초기화";
					break;
					case "Success Conference Complete" :
						nowState	= "Conference Complete";
						textState	= "회의 연결 중";
					break;
					case "Success Cancel Conference" :
						nowState 	= "Conference Cancel";
						textState	= "회의 연결 취소";
					break;
		
					case "Success LogOut" :
					case "DISCONNECT SERVER" :
						nowState 	= "DISCONNECT SERVER";
						textState	= "로그아웃";
					break;
					default :
//						alert( "[" + pCHECKSTATE + "] " + pCHECKMSG );
						break;
				}
				
				fnClientProc( nowState, CHECKCALLID, agentId, agentExt );
//				document.getElementById('AGENT_STATUS').value = textState;

				if ( hAutoReadyDelay != "" && pCHECKMSG != "Success Call Disconnected" && pCHECKMSG != "Success Transfer Complete" )
				{
					window.clearTimeout( hAutoReadyDelay );
					hAutoReadyDelay = '';
				}
			} else {
				if (pCHECKMSG != 'DISCONNECT SERVER' )
				{
					$("#callLogonBtn").show();
//					alert( "INIT Error : " + pCHECKMSG );
				}
			}
//		}catch (e){
//			SOFTPHONE_DEBUG( "", "["+EXT+"] " + "fncCallResult Exception : " + e.description );
//			console.log( "Error : " + e.description );
//		}
	}

}
