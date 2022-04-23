<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>


<!DOCTYPE html >
<html>
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<title>T-Motion SoftPhone</title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<style type="text/css">
		<!--
		body {
			margin: 0px;
			padding: 0px;
		}
		
		.inReadonly { background-color: #F0F0F0; }
		
		input { font-size: 12px; border: 0px; font-weight: bolder; line-height: 19px; height: 17px; margin: 0px; padding: 0px; background-color: transparent; vertical-align: bottom; }
		
		.td01 { font-size:12px; font-weight:bolder; color:#6c6c6c; font-family:Verdana, Dotum, sans-serif ; padding: 0px; line-height: 17px; text-align: bottom; vertical-align: bottom;}

		.dot {text-align: right; vertical-align: bottom; }
		
		form { padding: 0px; margin: 0px; }
		
		.row_login_none { display: none; }
		.row_login_view { }

		.row_call_none { display: none; }
		.row_call_view { }
		
		#softphone_body {
			position: 		absolute;
			width:			486px;
			height:			180px;
			left:			50%;
			top:			50%;
			margin-left:	-243px;
			margin-top:		-90px;
		}
		
		#softphone_notready_reason {
			position: 		absolute;
			width:			320px !important;
			width:			325px;
			height:			75px;
			left:			50%;
			top:			50%;
			margin-left:	-85px;
			margin-top:		5px;
		}
		#softphone_notready_reason div {
			display:		inline;
			float:			left;
			margin-right:	4px;
		}
		#softphone_notready_reason div:last-child {
			display:		inline;
			float:			left;
			margin-right:	0px;
		}
		#softphone_addon {
			position: 			absolute;
			width:				320px !important;
			width:				325px;
			height:				75px;
			left:				50%;
			top:				50%;
			margin-left:		-85px;
			margin-top:			5px;
		}
		#softphone_addon div {
			display:		inline;
			float:			left;
			margin-right:	4px;
		}
		#softphone_addon div:last-child {
			display:		inline;
			float:			left;
			margin-right:	0px;
		}
		-->
		</style>
		<script>
		String.prototype.trim = function() {
			return this.replace(/(^\s*)|(\s*$)/g, "");
		}
		</script>
		<script>
		
			function DisplayObject(tag){
				var _object_ = tag;
				alert("1");
				document.write(_object_);	
			}
			
			function InstallCab(id){
				var strValue = "";
				var CLASSID = "";
				var CODEBASE = "";
				switch(id)	{
					 case "alwayson" : 
						CLASSID = "CLSID:1DE9BB01-B121-401D-8877-BCD5ED5B7EE5";
						//CODEBASE = "http://www.crezio.com/test/leeyunho/AlwaysOn/AlwaysOn.CAB#version=1,0,0,0";
						CODEBASE = "./AlwaysOn.CAB#version=1,0,0,0";
						strValue = "<OBJECT id=\"alwayson\" width=\"1\" height=\"1\" CLASSID=\"" + CLASSID + "\" CODEBASE=\"" + CODEBASE + "\"></OBJECT>";
					 break;
				}
				document.write(strValue);
			}
			
			var m=0;
			function Set_AlwaysOn(){
				if(isInstalledActiveX() == true){
					if(m==1){
						alwayson.setOff();
						m=0;
						document.all.always.innerHTML ="<img src=\"/js/plugins/softphone/images/blit_deactivate.png\" width=\"12\" height=\"12\" border=\"0\" onclick='Set_AlwaysOn()' style=\"cursor:hand\" title='�׻��� Off'>";
					}else if(m==0){
						alwayson.setOn();
						m=1;
						document.all.always.innerHTML ="<img src=\"/js/plugins/softphone/images/blit_activate.png\" width=\"12\" height=\"12\" border=\"0\" onclick='Set_AlwaysOn()' style=\"cursor:hand\" title='�׻��� On'>";
					}
				}else{
					var answer  =  confirm("항상위 기능을 사용하기 위해서 ActiveX가 설치되어야 합니다. \n설치하시겠습니까?");
					if(answer == true)
						this.location.href = this.location.href+"&activex=install";
				}
			}
			
			function isInstalledActiveX() {
			        var isInstall = false;
			        try {
					    var obj = new ActiveXObject("TPWIN.TpwinCtrl.1");
			
			            if(obj)
			                isInstall = true;
			            else
			                isInstall = false;
			        } catch(e) {
			            isInstall = false;
			        }               
			       
					return isInstall;
			}   
			
			function isAlwaysActiveX()
			{
				var activex_install = "<?=$_GET['activex'];?>";
				if(isInstalledActiveX() == true || activex_install == "install")
				{
					InstallCab('alwayson');
				}
			}
		</script>
		<script>
		// t-motion server ip
		var m_serverIp = '27.125.1.226';
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
				
				document.getElementById( 'softphone_notready_reason' ).style.display = 'none';
				
				switch( evtName )
				{
					case "Connect" :
						arState = new Array( '4', '1', '3', '3', '3', '4', '3', '3', '4', '3', '3', '3', '4', '3', '3', '3', '4', '4', '4', '4', '4', '4' );
						break;
					case "Login" :
						//this.window.focus();
						//Set_AlwaysOn();
						//hCTIStatus = window.setInterval('parent.OnCTIStatus()', 5000 );
						document.getElementById( 'row_login_01' ).className = 'row_login_none';
						document.getElementById( 'row_login_02' ).className = 'row_login_none';

						document.getElementById( 'row_call_01' ).className = 'row_call_view';
						document.getElementById( 'row_call_02' ).className = 'row_call_view';
						
						arState = new Array( '4', '1', '1', '1', '3', '4', '1', '3', '4', '3', '3', '3', '4', '3', '3', '3', '4', '4', '4', '4', '4', '4' );
						break;
					case "Ready" :
						arState = new Array( '4', '1', '2', '1', '3', '4', '1', '3', '4', '3', '3', '3', '4', '3', '3', '3', '4', '4', '4', '4', '4', '4' );
						break;
					case "NotReady" :
						document.getElementById( 'softphone_notready_reason' ).style.display = '';
						
						arState = new Array( '4', '1', '1', '2', '3', '4', '1', '3', '4', '3', '3', '1', '4', '1', '1', '1', '4', '4', '4', '4', '4', '4' );
						break;
					case "Lunch Time" :
						document.getElementById('AGENT_STATUS').value = arStateText[41];
						arState = new Array( '4', '1', '1', '2', '3', '4', '1', '3', '4', '3', '3', '2', '4', '3', '3', '3', '4', '4', '4', '4', '4', '4' );
						break;
					case "Education" :
						document.getElementById('AGENT_STATUS').value = arStateText[42];
						arState = new Array( '4', '1', '1', '2', '3', '4', '1', '3', '4', '3', '3', '3', '4', '3', '3', '3', '4', '4', '4', '4', '4', '4' );
						break;
					case "Meeting" :
						document.getElementById('AGENT_STATUS').value = arStateText[43];
						arState = new Array( '4', '1', '1', '2', '3', '4', '1', '3', '4', '3', '3', '2', '4', '3', '3', '3', '4', '4', '4', '4', '4', '4');
						break;
					case "Power Working" :
						document.getElementById('AGENT_STATUS').value = arStateText[44];
						arState = new Array( '4', '1', '1', '2', '3', '4', '1', '3', '4', '3', '3', '3', '4', '2', '3', '3', '4', '4', '4', '4', '4', '4' );
						break;
					case "Break Time" :
						document.getElementById('AGENT_STATUS').value = arStateText[45];
						arState = new Array( '4', '1', '1', '2', '3', '4', '1', '3', '4', '3', '3', '3', '4', '3', '2', '3', '4', '4', '4', '4', '4', '4' );
						break;
					case "Other Working" :
						document.getElementById('AGENT_STATUS').value = arStateText[46];
						arState = new Array( '4', '1', '1', '2', '3', '4', '1', '3', '4', '3', '3', '3', '4', '3', '3', '2', '4', '4', '4', '4', '4', '4' );
						break;
					case "Missing Call" :
						document.getElementById('AGENT_STATUS').value = arStateText[47];
						arState = new Array( '4', '1', '1', '2', '3', '4', '1', '3', '4', '3', '3', '3', '4', '3', '3', '3', '4', '4', '4', '4', '4', '4' );
						break;
					case "Call Back" :
						document.getElementById('AGENT_STATUS').value = arStateText[48];
						arState = new Array( '4', '1', '1', '2', '3', '4', '1', '3', '4', '3', '3', '3', '4', '3', '3', '3', '4', '4', '4', '4', '4', '4');
						break;
					case "Happy Call" :
						document.getElementById('AGENT_STATUS').value = arStateText[49];
						arState = new Array( '4', '1', '1', '2', '3', '4', '1', '3', '4', '3', '3', '3', '4', '3', '3', '3', '4', '4', '4', '4', '4', '4');
						break;
					case "TRANSINIT CALL. RING" : 
						arState = new Array( '4', '1', '3', '4', '1', '4', '3', '3', '4', '3', '3', '3', '4', '3', '3', '3', '4', '4', '4', '4', '4', '4' );
						thisdoc.INBOUNDCUSTOMERNUMBER.value = custNo;
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
						thisdoc.INBOUNDCUSTOMERNUMBER.value = custNo;
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
						thisdoc.INBOUNDCUSTOMERNUMBER.value = custNo;
						break;
					case "Answer" :
						arState = new Array( '4', '1', '3', '3', '4', '1', '3', '1', '4', '1', '1', '3', '4', '3', '3', '3', '4', '4', '4', '4', '4', '4' );
						//window.open( "http://mgra.eduwill.net/customer/Customer_CTI_Request_Result_new.asp?callerid="+thisdoc.INBOUNDCUSTOMERNUMBER.value, "", "fullscreen=no,top=0,width=850,height=500,left=0,resizable=no,titlebar=no,status=yes" );
						break;
					case "Call Connected" :
						arState = new Array( '4', '1', '3', '3', '4', '1', '3', '1', '4', '1', '1', '3', '4', '3', '3', '3', '4', '4', '4', '4', '4', '4' );
						break;
					case "AfterCallWork" :
						arState = new Array( '4', '1', '1', '1', '3', '4', '1', '3', '4', '3', '3', '3', '4', '3', '3', '3', '4', '4', '4', '4', '4', '4' );
						thisdoc.INBOUNDCUSTOMERNUMBER.value = "";
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
						document.getElementById( 'row_login_01' ).className = 'row_login_view';
						document.getElementById( 'row_login_02' ).className = 'row_login_view';

						document.getElementById( 'row_call_01' ).className = 'row_call_none';
						document.getElementById( 'row_call_02' ).className = 'row_call_none';
						
						arState = new Array( '1', '4', '3', '3', '3', '4', '3', '3', '4', '3', '3', '3', '4', '3', '3', '3', '4', '4', '4' );
						break;
					default :
						arState = new Array( '4', '1', '3', '3', '4', '4', '3', '3', '4', '3', '3', '3', '4', '3', '3', '3', '4', '4', '4', '4', '4', '4' );
			
						//SOFTPHONE_DEBUG( "", "["+EXT+"] " + "fnClientProc Error : " + e.description );
						//alert( 'error = ' + e.description );
						break;
				}
				OnButtonProc(arBtn, arState);
			} catch (e) {
//				SOFTPHONE_DEBUG( "Status", "["+EXT+"] " + "fnClientProc Exception : " + e.message + " ( " +evtName + " )" );
				alert( 'Exception = ' + e.message );		
			}
		}

		function fnProcButton( szButton )
		{
			alert(szButton);
// 			try
// 			{
				
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
					case "softphone_transfer" :
						sSoftphoneType = 'T';
						document.getElementById( 'TEMP_CALLNO' ).value = "";
						document.getElementById( 'TEMP_CALLNO' ).focus();
						document.getElementById( 'softphone_addon' ).style.display = "";
						document.getElementById( 'TRANS_EXT' ).value = "";

						fnClientProc("Transfer", '', thisdoc.USERID.value, thisdoc.EXT.value);				
						break;
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
// 			}
// 			catch (e)
// 			{
// 				SOFTPHONE_DEBUG( '', "["+thisdoc.EXT.value+"] " + szButton + " exception!!(" + e.description + ")" );
// 			}
			
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
// 				try
// 				{			
					var arButton;
					var objStatus = document.getElementsByName( "radioStatus" );
			
					if ( nMsgLine == 50 )
					{
						nMsgLine = 0;
						document.getElementById( 'SOFTPHONESTATUS' ).value = "";
					}
					
					document.getElementById( 'SOFTPHONESTATUS' ).value = "[" + pCHECKRESULT + "][" + pCHECKSTATE + "]" + pCHECKMSG + "\n" + document.getElementById( 'SOFTPHONESTATUS' ).value; 
					nMsgLine++;
					
					switch( pCHECKMSG )
					{
						case "CONNECT SERVER" :
							nowState = "Connect";
			
							arButton = new Array('LOGON');
							OnButtonProc( arButton );
						break;
						case "Success Login" :
							nowState = "Login";
			
							if ( typeof Set_AlwaysOn == 'function' )
							{
								this.window.focus();
								Set_AlwaysOn();
							}
			
							arButton = new Array('LOGOUT', 'Ready', 'NotReady', 'Answer', 'Dial', 'always');
							OnButtonProc( arButton );
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
							OnButtonProc( arButton );
						break;
						case "Success Not Ready" :
							nowState = arState[REASONCODE];
			
							arButton = new Array('LOGOUT', 'Ready', 'NotReady', 'Answer', 'Dial', 'always');
							OnButtonProc( arButton );
						break;
						case "Success Answer" :
							nowState = "Answer";
			
							if ( fCIDOpt )
							{
								document.getElementById( "INBOUNDCUSTOMERNUMBER" ).value = CHECKCALLID;
							}
							
							arButton = new Array('LOGOUT', 'Hold', 'HangUp', 'TransInit', 'ConfInit', 'always');
							OnButtonProc( arButton );
						break;
						case "INBOUND CALL. RING" :
							nowState = "INBOUND CALL. RING";
							
							if ( !fCIDOpt )
							{
								if ( UTU )
								{
									var tempCALLID = CHECKCALLID.split('|');
									document.getElementById( "INBOUNDCUSTOMERNUMBER" ).value = tempCALLID[1];
								} else {
									document.getElementById( "INBOUNDCUSTOMERNUMBER" ).value = CHECKCALLID;
								}
							}
							arButton = new Array('LOGOUT', 'Answer', 'always');
							OnButtonProc( arButton );
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
							OnButtonProc( arButton );
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
							OnButtonProc( arButton );
						break;
						case "Success Hold" :
							nowState = "Hold";
			
							arButton = new Array('LOGOUT',  'UnHold', 'always');
							OnButtonProc( arButton );
						break;
						case "Success UnHold" :
							nowState = "UnHold";
			
							arButton = new Array('LOGOUT', 'Hold', 'HangUp', 'TransInit', 'ConfInit', 'always');
							OnButtonProc( arButton );
						break;
						case "Success Init Transfer" :
							nowState = "Transfer Init";
			
							arButton = new Array('TransComp', 'TransCancel', 'always');
							OnButtonProc( arButton );
						break;
						case "Success Transfer Complete" :
							nowState = "AfterCallWork";
							if ( objStatus['1'].checked )
							{
								CT_READY( thisdoc.EXT.value, thisdoc.USERID.value );
								return;
							}
							
							arButton = new Array('LOGOUT', 'Ready', 'NotReady', 'Answer', 'Dial', 'always');
							OnButtonProc( arButton );
						break;
						case "Success Cancel Transfer" :
							nowState = "Transfer Cancel";
			
							arButton = new Array('LOGOUT', 'Hold', 'HangUp', 'TransInit', 'ConfInit', 'always');
							OnButtonProc( arButton );
						break;
						case "Success Init Conference" :
							nowState = "Conference Init";
			
							if ( pCHECKSTATE == "40360" )
							{
								arButton = new Array( 'LOGOUT', 'ConfComp', 'ConfCancel', 'always');
							} else {
								arButton = new Array('LOGOUT', 'HangUp', 'ConfCancel', 'always');
							}
							OnButtonProc( arButton );
						break;
						case "Success Conference Complete" :
							nowState = "Conference Complete";
			
							arButton = new Array('LOGOUT', 'Hold', 'HangUp', 'always');
							OnButtonProc( arButton );
						break;
						case "Success Cancel Conference" :
							nowState = "Conference Cancel";
			
							arButton = new Array('LOGOUT', 'Hold', 'HangUp', 'TransInit', 'ConfInit', 'always');
							OnButtonProc( arButton );
						break;
			
						case "Success LogOut" :
						case "DISCONNECT SERVER" :
							nowState = "DISCONNET SERVER";
			
							arButton = new Array('LOGON');
							OnButtonProc( arButton );
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
// 				}
// 				catch (e)
// 				{
// 					SOFTPHONE_DEBUG( "", "["+EXT+"] " + "fncCallResult Exception : " + e.description );
// 					alert( "Error : " + e.description );
// 				}

			} else {
// 				try
// 				{
					
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
			//						thisdoc.INBOUNDCUSTOMERNUMBER.value = custNo;
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
								alert( "[" + pCHECKSTATE + "] " + pCHECKMSG );
								break;
						}
						
						fnClientProc( nowState, CHECKCALLID, agentId, agentExt );
						document.getElementById('AGENT_STATUS').value = textState;

						if ( hAutoReadyDelay != "" && pCHECKMSG != "Success Call Disconnected" && pCHECKMSG != "Success Transfer Complete" )
						{
							window.clearTimeout( hAutoReadyDelay );
							hAutoReadyDelay = '';
						}
					} else {
						if (pCHECKMSG != 'DISCONNECT SERVER' )
						{
							alert( "INIT Error : " + pCHECKMSG );
						}
					}
// 				}
// 				catch (e)
// 				{
// 					SOFTPHONE_DEBUG( "", "["+EXT+"] " + "fncCallResult Exception : " + e.description );
// 					alert( "Error : " + e.description );
// 				}
			}

		}

		</script>
<!-- 		<script src="/js/plugins/softphone/soft_js/TSOFTPHONEINI.js" type="text/javascript"></script> -->
		<script>
// 		try
// 		{
			function REAL_SET_SERVER_IP( ip ){
			   TARGET_SERVER_IP = ip;
// 			   alert(TARGET_SERVER_IP);
			   return TARGET_SERVER_IP; 
			}
			
			function SET_SERVER_IP(){	
				return TARGET_SERVER_IP; 
			}

			function SET_SERVER_PORT()  {
				return TARGET_SERVER_PORT;
			}
			
			function SET_RECONNECT_OPTION(){
				return RECONNECT_OPTION;
			}
			
			function SET_RECONNECT_TIME(){
				return RECONNECT_TIME;
			}

			function SET_SRC_SERVER_IP(){
				return SRC_SERVER_IP;
			}
			
			function SET_POLICY_PATH(){
				return POLICY_PATH;
			}
			
			function FURENCE_DEBUG(MessageTXT)
			{
				try
				{
					
					CHECKSTATE = "";
					CHECKRESULT = "";
					CHECKMSG = "";
					CHECKTARGET ="";
					//CHECKCALLID ="";
					CHECKBUFFER = "";
				
					if(MessageTXT == "closeHandler"){
						ISDISCONNECT = "FALSE";
						CHECKSTATE = "402";
						CHECKMSG = "DISCONNECT SERVER";
						CHECKRESULT = "N";	
				
						// Reconnect ( 2010.10 cypark ) Start
						if ( RECONNECT_OPTION == "TRUE" && IS_RECONNECT == "FALSE" ){
							// Reconnect ( 2011.03.24 cypark ) : Dup check 
							IS_RECONNECT = "TRUE";
							ISLOG = "FALSE";
							
							if ( READY_INTERVAL_ID != "" ) 
							{
								window.clearInterval( READY_INTERVAL_ID );
								READY_INTERVAL_ID = '';
							}
							
							CT_LOGOUT(thisdoc.EXT.value,thisdoc.USERID.value);
							window.setTimeout( 'CT_RECONNECT()', parseInt( RECONNECT_TIME ) * 1000 );
						} else {
							fncCallResult(CHECKSTATE, CHECKRESULT, CHECKMSG, CHECKTARGET, CHECKCALLID, CHECKBUFFER, CHECKNEWCALLID, CHECKIVRCODE);
						}
						// Reconnect ( 2010.10 cypark ) End
						
					}else if(MessageTXT =="securityErrorHandler"){
						ISDISCONNECT = "FALSE";
						CHECKSTATE = "402";
						CHECKMSG = "DISCONNECT SERVER";
						CHECKRESULT = "N";		
				
						// Reconnect ( 2010.10 cypark ) Start
						if ( RECONNECT_OPTION == "TRUE" && IS_RECONNECT == "FALSE" ){
							// Reconnect ( 2011.03.24 cypark ) : Dup check 
							IS_RECONNECT = "TRUE";
							ISLOG = "FALSE";
							
							if ( READY_INTERVAL_ID != "" ) 
							{
								window.clearInterval( READY_INTERVAL_ID );
								READY_INTERVAL_ID = '';
							}
						
							CT_LOGOUT(thisdoc.EXT.value,thisdoc.USERID.value);
							window.setTimeout( 'CT_RECONNECT()', parseInt( RECONNECT_TIME ) * 1000 );
						} else {
							fncCallResult(CHECKSTATE, CHECKRESULT, CHECKMSG, CHECKTARGET, CHECKCALLID, CHECKBUFFER, CHECKNEWCALLID, CHECKIVRCODE);
						}
						// Reconnect ( 2010.10 cypark ) End
				
					}else if(MessageTXT=="ioErrorHandler"){
						ISDISCONNECT = "FALSE";
						CHECKSTATE = "402";
						CHECKMSG = "DISCONNECT SERVER";
						CHECKRESULT = "N";		
						
						// Reconnect ( 2010.10 cypark ) Start
						if ( RECONNECT_OPTION == "TRUE" && IS_RECONNECT == "FALSE" ){
							// Reconnect ( 2011.03.24 cypark ) : Dup check 
							IS_RECONNECT = "TRUE";
							ISLOG = "FALSE";
							
							if ( READY_INTERVAL_ID != "" )
							{
								window.clearInterval( READY_INTERVAL_ID );
								READY_INTERVAL_ID = '';
							}
							
							CT_LOGOUT(thisdoc.EXT.value,thisdoc.USERID.value);
							window.setTimeout( 'CT_RECONNECT()', parseInt( RECONNECT_TIME ) * 1000 );
						} else {
							fncCallResult(CHECKSTATE, CHECKRESULT, CHECKMSG, CHECKTARGET, CHECKCALLID, CHECKBUFFER, CHECKNEWCALLID, CHECKIVRCODE);
						}
						// Reconnect ( 2010.10 cypark ) End
						
					}else if(MessageTXT=="connectHandler"){
						ISDISCONNECT = "TRUE";
						CHECKSTATE = "401";
						CHECKMSG = "CONNECT SERVER";
						CHECKRESULT = "Y";	
						
						fncCallResult(CHECKSTATE, CHECKRESULT, CHECKMSG, CHECKTARGET, CHECKCALLID, CHECKBUFFER, CHECKNEWCALLID, CHECKIVRCODE);
					}
				} catch ( e ) {
					SOFTPHONE_DEBUG( "", "["+EXT+"] " + "FURENCE_DEBUG Exception : " + e.description );					
				}
			}
			
			function TESTSA(STR){
				alert(STR);
				GETSWF("TSoftphone").MSGSEND(STR);
			}
			
			/////////////////////////Global/////////////////////
			var IP = "";
			var USERID = "";
			var EXT = "";
			var PRIMARY_KEY = "";
			var PRIMARY_KEY2 = 0;
			var TIME="";
			
			//ServerConnectCheck
			var ISDISCONNECT = "FALSE";
			//LoginCheck
			var ISLOG = "FALSE";
			//ReadyCheck
			var ISREADY = "FALSE";
			//NotReadyCheck
			var ISNOTREADY = "FALSE";
			//BusyCheck
			var ISANSWER = "FALSE";
			//Hold
			var ISHOLD = "FALSE";
			var IP = "               ";
			// Transfer
			var typeTransConf = "NONE";
			// cypark 2011.01.12
			var ConfCount = 0;

			var CheckEXT="";
			var CHECKSTATE="";
			var CHECKMSG="";
			var CHECKRESULT="";
			var CHECKTARGET=""; //TargetNumber
			var CHECKCALLID=""; //CallID
			var CHECKBUFFER=""; //BufferData
			var CHECKNEWCALLID="";
			var CHECKIVRCODE="";
			
			// cypark 2011.03.10
			var CallID = "";
			var CallHandleID = "";
			var CallRouteCode = "";
			
			/////////////////////////////////////////////////////////////////////////
			//Lgoin Check
			function CHECK_LOG(){
				if(ISLOG == "FALSE"){
					return ISLOG;
				}else if(ISLOG == "TRUE"){
					return ISLOG;
				}else{
					ISLOG = "ERROR";
					return ISLOG;
				}
			}

			//Ready Check
			function CHECK_READY(){
				if(ISREADY == "FALSE"){
					return ISREADY;
				}else if(ISREADY == "TRUE"){
					return ISREADY;
				}else{
					ISREADY = "ERROR";
					return ISREADY;
				}
			}

			//NotReady Check
			function CHECK_NOTREADY(){
				if(ISNOTREADY == "FALSE"){
					return ISNOTREADY;
				}else if(ISNOTREADY == "TRUE"){
					return ISNOTREADY;
				}else{
					ISNOTREADY = "ERROR";
					return ISNOTREADY;
				}
			}

			//Busy Check
			function CHECK_ANSWER(){
				if(ISANSWER == "FALSE"){
					return ISANSWER;
				}else if(ISANSWER == "TRUE"){
					return ISANSWER;
				}else{
					ISREADY = "ERROR";
					return ISREADY;
				}
			}

			//HOLD Check
			function CHECK_HOLD(){
				if(ISHOLD == "FALSE"){
					return ISHOLD;
				}else if(ISHOLD == "TRUE"){
					return ISHOLD;
				}else{
					ISHOLD = "ERROR";
					return ISHOLD;
				}
			}
			///////////////////////////////////////////////////////////////////////////
			
			function GETPRIMARYKEY(PRI){
				PRIMARY_KEY = "";
				for(var i=PRI; i<10; i++){
					PRIMARY_KEY += "0";
				}

				return PRIMARY_KEY;
			}
			/////////////////////////////////////////////////////
			
			function GETSWF(MOVIENAME){			//browser check	
				if (window.document[MOVIENAME]) 
				{
					return window.document[MOVIENAME];
				}
				if (navigator.appName.indexOf("Microsoft Internet")==-1)
				{
					if (document.embeds && document.embeds[MOVIENAME])
						return document.embeds[MOVIENAME];
					else 
						return window[MOVIENAME];
				}
				else // if (navigator.appName.indexOf("Microsoft Internet")!=-1)
				{
					return document.getElementById(MOVIENAME);
				}		

			}
			
			function CMDCONNECTION(){
				GETSWF("TSoftphone").CMDCONN();
			}
			
			function EVTCONNECTION(){
				GETSWF("TSoftphone").EVTCONN();
			}

			function SCRCONNECTION(){
				GETSWF("TSoftphone").SCRCONN();
			}
			
			function CMDSENDER(STR){
				GETSWF("TSoftphone").MSGSEND(STR);
			}
			
			function EVTSENDER(STR){
				GETSWF("TSoftphone").EVTSEND(STR);
			}

			function SCRSENDER(){
				var STR = GETSCRINFO();
				GETSWF("TSoftphone").LOGONSEND(STR);
			}

			function CMDDISCONNECTION(){
				GETSWF("TSoftphone").CMDDIS();
			}

			function EVTDISCONNECTION(){
				GETSWF("TSoftphone").EVEDIS();
			}

			function SCRDISCONNECTION(){
				GETSWF("TSoftphone").SCRDIS();
			}
			//////////////////////////////////////////////////////////////////////////////////////////////////
			
			//NowDatetime
			function GETTIME(){
				TIME = "";
				var now = new Date();
				var nowYear = now.getFullYear();

				var nowMonth = now.getMonth()+1;
				if(now.getMonth()+1<10){
					nowMonth = now.getMonth()+1;
					nowMonth = "0"+nowMonth;
				}else{
					nowMonth = nowMonth;
				}		

				var nowDate;
				if(now.getDate() < 10){
					nowDate = now.getDate();
					nowDate = "0"+nowDate;			
				}else{
					nowDate = now.getDate();
				}

				var nowHours;
				if(now.getHours() < 10){
					nowHours = now.getHours();
					nowHours = "0"+nowHours;	
				}else{
					nowHours = now.getHours();
				}

				var nowMinutes;
				if(now.getMinutes() < 10){
					nowMinutes = now.getMinutes();
					nowMinutes = "0"+nowMinutes;			
				}else{
					nowMinutes = now.getMinutes();
				}

				var nowSeconds;
				if(now.getSeconds() < 10){
					nowSeconds = now.getSeconds();
					nowSeconds = "0"+nowSeconds;			
				}else{
					nowSeconds = now.getSeconds();
				}

				TIME = "/CTSEE/"+nowYear +""+ nowMonth +""+ nowDate +""+ nowHours +"" + nowMinutes +""+ nowSeconds;
				return TIME; 	
			}
			////////////////////////////////////////////////////////////////////////////////////////
			
			function GETINFO(COMMANDCODE,EXT,ID,PW,LTYPE){
				USERID = ID;
				IP =  "";
				EXT =  EXT;

				for(var a=USERID.length; a<12; a++ ){
					USERID += " ";
				}

				for(var b=EXT.length; b<5; b++){
					EXT += " ";
				}

				for(var c=IP.length; c<15; c++){
					IP += " ";
				}

				var TEMP="";
				for(var d=0; d<300; d++){
					TEMP += " ";
				}

				TEMP+="/";	
				var ResultCode="";

				for(var e=0; e<3; e++){
					ResultCode+=" ";
				}

				var ReasonCode="";
				for(var f=0;f<2; f++){
					ReasonCode+=" ";
				}

				PRIMARY_KEY2 +=1;
				var len = String(PRIMARY_KEY2);
				var PRIMARY_KEY1 ="";
				PRIMARY_KEY1 = GETPRIMARYKEY(len.length);
				var USERINFO = PRIMARY_KEY1+""+PRIMARY_KEY2+""+USERID+""+EXT+""+IP+""+"/"+COMMANDCODE+""+"/"+ResultCode+""+"/"+ReasonCode+""+"/"+TEMP;

				return USERINFO;
			}
			
			function GETOUTINFO(COMMANDCODE,EXT,ID,PW,LTYPE,OUTDIAL){
				USERID = ID;
				IP =  "";
				EXT =  EXT;

				for(var a=USERID.length; a<12; a++ ){
					USERID += " ";
				}

				for(var b=EXT.length; b<5; b++){
					EXT += " ";
				}

				for(var c=IP.length; c<15; c++){
					IP += " ";
				}

				var TEMP="`"+OUTDIAL+"`";
				for(var d=0; TEMP.length<300; d++){
					TEMP += " ";
				}

				TEMP+="/";	
				var ResultCode="";

				for(var e=0; e<3; e++){
					ResultCode+=" ";
				}

				var ReasonCode="";
				for(var f=0;f<2; f++)
				{
					ReasonCode+=" ";
				}

				PRIMARY_KEY2 +=1;
				var len = String(PRIMARY_KEY2);
				var PRIMARY_KEY1 ="";
				PRIMARY_KEY1 = GETPRIMARYKEY(len.length);
				var USERINFO = PRIMARY_KEY1+""+PRIMARY_KEY2+""+USERID+""+EXT+""+IP+""+"/"+COMMANDCODE+""+"/"+ResultCode+""+"/"+ReasonCode+""+"/"+TEMP;
				//SOFTPHONE.packet2.value = USERINFO;

				return USERINFO;
			}
			
			function GETNOTREADYINFO(COMMANDCODE,EXT,ID, REASONCODE){
				USERID = ID;
				IP =  "";
				EXT =  EXT;

				for(var a=USERID.length; a<12; a++ ){
					USERID += " ";
				}

				for(var b=EXT.length; b<5; b++){
					EXT += " ";
				}

				for(var c=IP.length; c<15; c++){
					IP += " ";
				}

				var TEMP="";
				for(var d=0; d<300; d++){
					TEMP += " ";
				}

				if(REASONCODE==""){
					REASONCODE="41";
				}

				TEMP+="/";
				var ResultCode="001";

				for(var e=ResultCode.length; e<3; e++){
					ResultCode+=" ";
				}

				var len = String(PRIMARY_KEY2);
				var PRIMARY_KEY1 ="";
				PRIMARY_KEY1 = GETPRIMARYKEY(len.length);
				var USERINFO = PRIMARY_KEY1+""+PRIMARY_KEY2+""+USERID+""+EXT+""+IP+""+"/"+COMMANDCODE+""+"/"+""+ResultCode+""+"/"+""+REASONCODE+"/"+TEMP;
				
				return USERINFO;
			}

			function AgentStatus(REASONCODE){
				this.REASONCODE = REASONCODE;
				CT_NOTREADY(EXT,USERID,REASONCODE);
			}

			function GETTRANSINFO(COMMANDCODE,TRANSFER_EXT,USERDATA){
				USERID = USERID;
				IP =  "";
				EXT =  EXT;
				
				for(var a=USERID.length; a<12; a++ ){
					USERID += " ";
				}

				for(var b=EXT.length; b<5; b++){
					EXT += " ";
				}

				for(var c=IP.length; c<15; c++){
					IP += " ";
				}

				var TEMP="`"+TRANSFER_EXT+""+"`"+USERDATA+"`";
				for(var d=0; TEMP.length<300; d++){
					TEMP += " ";
				}

				TEMP+="/";
				var ResultCode="";

				for(var e=0; e<3; e++){
					ResultCode+=" ";
				}

				var ReasonCode="";
				for(var f=0;f<2; f++){
					ReasonCode+=" ";
				}

				PRIMARY_KEY2 = PRIMARY_KEY2 + 1;
				var len = String(PRIMARY_KEY2);
				var PRIMARY_KEY1 ="";
				PRIMARY_KEY1 = GETPRIMARYKEY(len.length);
				var USERINFO = PRIMARY_KEY1+""+PRIMARY_KEY2+""+USERID+""+EXT+""+IP+""+"/"+COMMANDCODE+""+"/"+ResultCode+""+"/"+ReasonCode+""+"/"+TEMP;
				//SOFTPHONE.packet.value = USERINFO;

				return USERINFO;
			}
			
			/////////////////////EVENT////////////////////////////////
			function GETEVENTINFO(){
				// Reconnect ( 2011.03.24 cypark ) : Dup check 
				//USERID = " ";
				EXT = CheckEXT;
				IP =  "";

				for(var a=USERID.length; a<12; a++ ){
					USERID += " ";
				}

				for(var b=EXT.length; b<5; b++){
					EXT += " ";
				}

				for(var c=IP.length; c<15; c++){
					IP += " ";
				}

				var TEMP="";
				for(var d=0; d<295; d++){
					TEMP += " ";
				}

				TEMP+="/";
				TIME = GETTIME();
				PRIMARY_KEY2 +=1;
				var ResultCode="";

				for(var e=0; e<3; e++){
					ResultCode+=" ";
				}

				var ReasonCode="";
				for(var f=0;f<2; f++){
					ReasonCode+=" ";
				}

				var len = String(PRIMARY_KEY2);
				var PRIMARY_KEY1 ="";
				PRIMARY_KEY1 = GETPRIMARYKEY(len.length);
				var EVENTINFO = TIME+""+"000"+""+PRIMARY_KEY1+""+PRIMARY_KEY2+""+USERID+""+EXT+""+IP+""+"/"+""+"900"+""+"/"+ResultCode+""+"/"+ReasonCode+""+"/"+""+EXT+""+TEMP;

				return EVENTINFO;
			}
			
			/////////////////////SCREEN////////////////////////////////
			function GETSCRINFO(){
				EXT = CheckEXT;

				for(var b=EXT.length; b<5; b++){
					EXT += " ";
				}

				var USERDATA = "^" + USERID + "^" + CheckEXT + "^";

				var SCRINFO = "/RECSEE/" + EXT + "/LI/" + USERDATA + "/";
				return SCRINFO;
			}

			///////////////Function Start///////////////////////////////
			function CT_CONNECTSERVER(){
				CMDCONNECTION();
				EVTCONNECTION();
				SCRCONNECTION();
			
				TIME = GETTIME();
				var EVENTINFO = GETEVENTINFO();
				var INFO = GETINFO("101",EXT,USERID,"","");
				CMDSENDER(TIME+""+"000"+""+INFO);
			}

			//////////////////DISCONNECTSERVER////////////////////////
			function CT_DISCONNECTSERVER(){
				CMDDISCONNECTION();
				EVTDISCONNECTION();
				SCRDISCONNECTION();
				
				try
				{
					CMDDISCONNECTION();
					EVTDISCONNECTION();
					SCRDISCONNECTION();			
				} catch( e )
				{
				}
			}
			
			// Reconnect ( 2010.10 cypark ) Start
			//////////////////RECONNECT////////////////////////
			var intvalReconnect = "";
			function CT_RECONNECT(){
				// Reconnect ( 2011.03.24 cypark ) : Dup check 
				//IS_RECONNECT = "TRUE";
				var nProc = 0;

				if ( ISDISCONNECT == "FALSE" ) 
				{
					CT_CONNECTSERVER();
					nProc++;
				} 
				if (  ISDISCONNECT == "TRUE" )
				{
					if ( IS_RECONNECT_LOGIN == "TRUE" && CHECK_LOG() == "FALSE" ){
						CT_LOGIN( EXT, USERID,  '', '' );
						nProc++;
					}

					if ( IS_RECONNECT_LOGIN == "TRUE" && IS_RECONNECT_READY == "TRUE" && CHECK_LOG() == "TRUE" && CHECK_READY() != "TRUE" ){
						CT_READY( EXT, USERID );
						nProc++;
					}
			
					if ( IS_RECONNECT_LOGIN == "TRUE" && IS_RECONNECT_NOTREADY == "TRUE" && CHECK_LOG() == "TRUE" && CHECK_NOTREADY() != "TRUE" ){
						AgentStatus( REASONCODE );
						nProc++;
					}
				}

				if ( nProc )
				{
					if ( intvalReconnect == "" )
					{
						intvalReconnect = window.setInterval( 'CT_RECONNECT()', parseInt( RECONNECT_TIME ) * 1000 );
					}
				} else {
					window.clearInterval( intvalReconnect );
					intvalReconnect = "";
				}
			}
			// Reconnect ( 2010.10 cypark ) End
			
			//////////////////LOGIN////////////////////////
			function CT_LOGIN(EXT,ID,PW,LTYPE){

				USERID = ID;

				// Reconnect ( 2010.10 cypark ) Start
				IS_RECONNECT = "FALSE";
				// Reconnect ( 2010.10 cypark ) End
			
				TIME = GETTIME();
				CheckEXT = EXT;
				var EVENTINFO = GETEVENTINFO();
				var INFO = GETINFO("201",EXT,ID,PW,LTYPE);
				CMDSENDER(TIME+""+"000"+""+INFO);
				EVTSENDER(EVENTINFO);
				//SOFTPHONE.packet.value = INFO;
			}

			//////////////////LOGOUT////////////////////////
			function CT_LOGOUT(EXT,ID){
				// Reconnect ( 2010.10 cypark ) Start
				IS_RECONNECT = "TRUE";
				// Reconnect ( 2010.10 cypark ) End
			
				TIME = GETTIME();
				// Reconnect ( 2010.10 cypark )
				CheckEXT = EXT;
			
				var INFO = GETINFO("202",EXT,ID,"","");
				CMDSENDER(TIME+""+"000"+""+INFO);
			}

			//////////////////READY////////////////////////
			function CT_READY(EXT,ID){
				TIME = GETTIME();
				//COMMANDCODE,EXT,ID,PW,LTYPE
				var INFO = GETINFO("203",EXT,ID,"",""); 
				CMDSENDER(TIME+""+"000"+""+INFO);
			}
			// READY CHECK ( 2010.10 cypark ) Start

			//////////////////READY INTERVAL//////////////////
			function CT_READY_INTERVAL(){
				if (IS_RECONNECT == "FALSE" && ISDISCONNECT == "TRUE" && ISLOG == "TRUE" && ISREADY == "TRUE" ){
					CT_READY( EXT, USERID );
				}
			}
			// READY CHECK ( 2010.10 cypark ) End

			//////////////////NOTREADY////////////////////////
			function CT_NOTREADY(EXT,ID,REASONCODE){
				TIME = GETTIME();
				var INFO = GETNOTREADYINFO("204" ,EXT,ID, REASONCODE);
				CMDSENDER(TIME+""+"000"+""+INFO);
			}

			//////////////MAKECALL///////////////////
			function CT_MAKECALL(OutDial){
				if ( OutDial == "" )
				{
					return false;
				}
				TIME = GETTIME();
				var INFO = GETOUTINFO("301",EXT,USERID,"","",OutDial);
				CMDSENDER(TIME+""+"000"+""+INFO);
			}

			//////////////DroupCall/////////////////////////////////
			function CT_DROPCALL(EXT){
				TIME = GETTIME();
				var INFO = GETINFO("302",EXT,USERID,"","");
				CMDSENDER(TIME+""+"000"+""+INFO);

				// cypark 2011.8.23
				typeTransConf = "";
			}

			//////////////////////ANSWER////////////////////////
			function  CT_ANSWER(){
				TIME = GETTIME();
				var INFO = GETINFO("303",EXT,USERID,"","");
				CMDSENDER(TIME+""+"000"+""+INFO);
			}
			
			//////////////HOLD//////////////////////////////
			function CT_HOLDCALL(EXT){
				TIME = GETTIME();
				var INFO = GETINFO("304",EXT,USERID,"","");
				CMDSENDER(TIME+""+"000"+""+INFO);
			}

			///////////////////UNHOLD//////////////////////
			function CT_UNHOLDCALL(EXT){
				TIME = GETTIME();
				var INFO = GETINFO("305",EXT,USERID,"","");
				CMDSENDER(TIME+""+"000"+""+INFO);
			}

			//////////////////BlindTransfer////////////////
			function CT_BLINDTRANSFER(TREXT,USERDATA){
				TIME = GETTIME();
				var INFO = GETTRANSINFO("306",TREXT,USERDATA);
				CMDSENDER(TIME+""+"000"+""+INFO);
			}

			///////////////////Pickup//////////////////////
			function CT_PICKUPCALL(GROUP){
			}

			///////////////////TRANSINIT///////////////////
			function CT_TRANSFERINIT(TREXT,USERDATA){
				if ( TREXT == "" || USERDATA == "" )
				{
					return false;
				}
				// Transfer ( 2010.10 cypark )
				typeTransConf = "TRANSINIT";

				TIME = GETTIME();
				var INFO = GETTRANSINFO("308",TREXT,USERDATA);
				CMDSENDER(TIME+""+"000"+""+INFO);
			}

			/////////////TRANSCOMP////////////////////////////
			function CT_TRANSFERCOMPLET(TREXT,USERDATA){
				if ( TREXT == "" )
				{
					return false;
				}
				// Transfer ( 2010.10 cypark )
				typeTransConf = "TRANSCOMP";

				TIME = GETTIME();
				var INFO = GETTRANSINFO("309",TREXT,USERDATA);
				CMDSENDER(TIME+""+"000"+""+INFO);
			}

			//////////////TRANSCANCEL///////////////////
			function CT_TRANSFERCANCEL(){
				// Transfer ( 2010.10 cypark )
				typeTransConf = "TRANSCANCEL";

				TIME = GETTIME();
				var INFO = GETTRANSINFO("310","","");
				CMDSENDER(TIME+""+"000"+""+INFO);
			}
			//////////////CONFINIT///////////////////

			function CT_CONFERENCEINIT(TREXT,USERDATA){
				if ( TREXT == "" || USERDATA == "" )
				{
					return false;
				}
				// Transfer ( 2011.08 cypark )
				typeTransConf = "CONFREADY";

				TIME = GETTIME();
				var INFO = GETTRANSINFO("311",TREXT,USERDATA);
				CMDSENDER(TIME+""+"000"+""+INFO);
			}

			//////////////CONFCOMP///////////////////
			function CT_CONFERENCECOMPLET(TREXT,USERDATA){
				if ( TREXT == "" )
				{
					return false;
				}
				// Transfer ( 2010.10 cypark )
				typeTransConf = "CONFCOMP";

				TIME = GETTIME();
				var INFO = GETTRANSINFO("312",TREXT,USERDATA);
				CMDSENDER(TIME+""+"000"+""+INFO);
			}

			///////////////ConferenceCancel///////////
			function CT_CONFERENCECANCEL(CONFEXT){
				if ( CONFEXT == "" )
				{
					return false;
				}
				// Transfer ( 2010.10 cypark )
				typeTransConf = "CONFCANCEL";
				
				CONFEXT = "Cancel";
				
				TIME = GETTIME();
				var INFO = GETTRANSINFO("313",CONFEXT,'');
				CMDSENDER(TIME+""+"000"+""+INFO);
			}
			
			///////////////AgentStatus//////////////////
			////////////////////Function End//////////////
			
			//button name check
			var intvalLogOn = '';
			function CHECK_BUTTON(BUTTON_NAME){
				console.log(BUTTON_NAME);
				switch(BUTTON_NAME){
					case "SERVERCONNECT":
						CT_CONNECTSERVER();

						ISDISCONNECT = "TRUE";
						if ( fTmotionSoftphone )
						{
							thisdoc.LOGON.disabled = false;
						}
						break;

					case "Log On":
						if(ISDISCONNECT == "FALSE" && CHECK_LOG() == "FALSE" ){
							CHECK_BUTTON("SERVERCONNECT");
							if ( intvalLogOn == "" )
							{
								intvalLogOn = window.setInterval( "CHECK_BUTTON('Log On')", 1000 );
							}
							return false;
						} else if ( intvalLogOn ) {
							if ( ISDISCONNECT != "FALSE" && CHECK_LOG() != "FALSE" )
							{
								window.clearInterval( intvalLogOn );
								intvalLogOn = "";
								ISLOG = "TRUE";
								return;
							}
						}

						// cypark 2011.01.12
						CT_LOGIN( thisdoc.EXT.value, thisdoc.USERID.value, '', '' ); 
						break;

					case "LogOut":
						//ONCOMMAND_LOGOUT("202");
						//CT_LOGOUT(thisdoc.EXT.value,thisdoc.USERID.value);
						ISLOG = "FALSE";
						ISDISCONNECT = "FALSE";
						if ( intvalLogOn ) {
							window.clearInterval( intvalLogOn );
							intvalLogOn = "";
						}
						if ( intvalReconnect != "" )
						{
							window.clearInterval( intvalReconnect );
							intvalReconnect = "";
						}
						fnClientProc('DISCONNECT SERVER', '', thisdoc.USERID.value, thisdoc.EXT.value );
						CT_DISCONNECTSERVER();
						break;

					case "Ready":
						var ISOK = CHECK_LOG();
						if( ISOK == "FALSE"){
							break;
						} 
						CT_READY( thisdoc.EXT.value, thisdoc.USERID.value );
						break;

					case "NotReady":
						var ISOK = CHECK_LOG();
						if( ISOK == "FALSE"){
							break;
						} 
						ONCOMMAND_NOTREADY("204");
						break;

					case "Answer":
						var ISOK = CHECK_READY();
						if( ISOK == "FALSE"){
							break;
						} 
						ONCOMMAND_ANSWER("303");
						break;

					case "Dial" :
						if ( thisdoc.OUTDIAL.value == "" )
						{
							return;
						}
						CT_MAKECALL(thisdoc.OUTDIAL.value);
						break;
					case "HangUp":
						var ISOK = CHECK_ANSWER();
						if( ISOK == "FALSE"){
							break;
						} 
						ONCOMMAND_HANGUP("302");
						break;

					case "Hold":
						var ISOK = CHECK_ANSWER();
						if( ISOK == "FALSE"){
							break;
						} 
						ONCOMMAND_HOLD("304");
						break;

					case "UnHold":
						var ISOK = CHECK_ANSWER();
						if( ISOK == "FALSE"){
							break;
						} 
						ONCOMMAND_UNHOLD("305");
						break;

					case "Trans Init":
						if ( thisdoc.OUTDIAL.value == "" )
						{
							return;
						}
						var ISOK = 	CHECK_HOLD();
						CT_TRANSFERINIT(thisdoc.OUTDIAL.value,thisdoc.EXT.value)
						//ONCOMMAND_TRANSINIT("308");
						break;

					case "Trans Comp":
						var ISOK = 	CHECK_HOLD();
						if( ISOK == "FALSE"){
							break;
						} 
						ONCOMMAND_TRANSCOMP("309");
						break;

					case "Transfer Cancel":
						var ISOK = 	CHECK_HOLD();
						if( ISOK == "FALSE"){
							break;
						} 
						break;

					case "Conf Init":
						if ( thisdoc.OUTDIAL.value == "" )
						{
							return;
						}
						var ISOK = 	CHECK_HOLD();
						CT_CONFERENCEINIT(thisdoc.OUTDIAL.value,thisdoc.EXT.value);
						//ONCOMMAND_CONFINIT("311");
						break;

					case "Conf Comp":
						var ISOK = 	CHECK_HOLD();
						if( ISOK == "FALSE"){
							break;
						}
						ONCOMMAND_CONFCOMP("312");
						break;

					case "AlwaysOn" :
						if ( typeof Set_AlwaysOn == 'function' )
						{
							Set_AlwaysOn();
						}
						break;
					default:
						break;
				}
			}	

			//REAL_SET_SERVER_IP(m_serverIp);
			
			//m_swf_path = "/t-motion/Consultation/component/softphone/";

			AC_FL_RunContent(
					"src","/js/plugins/softphone/soft_js/TSoftphone_scr",
					"width", "1",
					"height", "1",
					"align", "middle",
					"id", "TSoftphone",
					"quality", "high",
					"bgcolor", "#869ca7",
					"name", "TSoftphone",
					"allowScriptAccess","always",
					"type", "application/x-shockwave-flash",
					"movie", "/js/plugins/softphone/soft_js/TSoftphone_scr",
					"wmode" , "transparent",
					"pluginspage", "http://www.adobe.com/go/getflashplayer"
			);

			eval("window.TSoftphone = document.getElementById('TSoftphone');");
			console.log(111111111111111);
// 		} catch(e){
// 			SOFTPHONE_DEBUG( "SOFTPHONE", "["+EXT+"] " + "Exception : " + e.description );	
// 			alert( "javascript error : " + e.description );
// 		}

		</script>
<!-- 		<script src="/js/plugins/softphone/soft_js/TSOFTPHONE.js"  type="text/javascript"></script> -->
	</head>
	<body onunload="">
		<form name="SOFTPHONE" >
		<div style="display: none;">
			<input name="USERNAME" type="text" id="USERNAME" size="10" value="" />
			<input name="OUTDIAL" type="text" id="OUTDIAL" size="10" value="" />
			<input name="TRANS_EXT" type="text" id="TRANS_EXT" size="10" value="" />
		</div>
			<button type="button" id="testBtn" >테스트 버튼</button>
		<table id='softphone_body' style="background-image: url('/js/plugins/softphone/images/bg01.png'); background-repeat: no-repeat; border-collapse: collapse; padding: 0px; border: none;">
			<tr>
				<td style="width: 154px;">
					<table style="margin-left: 11px; width: 142px; height: 161px; background-image: url( '/js/plugins/softphone/images/bg02.png' ); background-repeat: no-repeat; border-collapse: collapse; padding: 0px; border: none;">
					<tr>
						<td height="17" class="dot" width="13"><img src="/js/plugins/softphone/images/dot01.png" /></td>
						<td height="17" class="td01" width="109">내선번호</td>
						<td height="17" width="20"><div id='always' style="display: inline-block; float: right; width: 20px;"><img src="/js/plugins/softphone/images/blit_deactivate.png" onclick="Set_AlwaysOn();" /></div></td>
					</tr>
					<tr>
						<td height="19"></td>
						<td height="19" class="td02" colspan="2"><input type="text" id="EXT" name="EXT" size="10" value="4501" /></td>
					</tr>
					
					<tr id='row_login_01' class='row_login_view'>
						<td height="11" class="dot" width="13"><img src="/js/plugins/softphone/images/dot02.png" /></td>
						<td height="11" class="td01" width="109">아이디</td>
						<td height="11" width="20"></td>
					</tr>
					<tr id='row_login_02' class='row_login_view'>
						<td height="19"></td>
						<td height="19" class="td02" colspan="2"><input type="text" id="USERID" name="USERID" size="10" value="4501" /></td>
					</tr>
					<tr id='row_call_01' class='row_call_none'>
						<td height="11" class="dot"><img src="/js/plugins/softphone/images/dot02.png" /></td>
						<td height="11" class="td01">수신번호</td>
						<td height="11" width="20"></td>
					</tr>
					<tr id='row_call_02' class='row_call_none'>
						<td height="19"></td>
						<td height="19" class="td02" colspan="2"><input type="text" id="INBOUNDCUSTOMERNUMBER" name="INBOUNDCUSTOMERNUMBER" size="13" readonly='readonly' value="" /></td>
					</tr>

					<tr>
						<td height="15" class="dot"><img src="/js/plugins/softphone/images/dot01.png" /></td>
						<td height="15" class="td01">상담원 상태</td>
						<td height="15" width="20"></td>
					</tr>
					<tr>
						<td height="19"></td>
						<td height="19" class="td02" colspan="2"><input type="text" id="AGENT_STATUS" name="AGENT_STATUS" size="13" readonly='readonly' value="" /></td>
					</tr>
					<tr>
						<td height="11" class="dot" width="13"><img src="/js/plugins/softphone/images/dot02.png" /></td>
						<td height="11" class="td01" width="109">발신번호</td>
						<td height="11" width="20"></td>
					</tr>
					<tr>
						<td height="19"></td>
						<td height="19" class="td02" colspan="2"><input type="text" id="TEMP_CALLNO" name="TEMP_CALLNO" size="10" style='width: 90%; height: 100%;' value="" /></td>
					</tr>
					</table>
				</td>
				<td>
					<table style="width: 312px; border-collapse: collapse; padding: 0px; border: none;">
					<tr>
						<td width="76">
							<div class="softphone_icon" id='softphone_ready'><img src="/js/plugins/softphone/images/softphone_ready_3.gif" valign="top" /></div>
						</td>
						<td width="4"></td>
						<td width="76">
							<div class="softphone_icon" id='softphone_notready'><img src="/js/plugins/softphone/images/softphone_notready_3.gif" valign="top" /></div>
						</td>
						<td width="4"></td>
						<td width="76">
							<div class="softphone_icon" id='softphone_answer'><img src="/js/plugins/softphone/images/softphone_answer_3.gif" valign="top" /></div>
							<div class="softphone_icon" id='softphone_drop_call' style="display: none;"><img src="/js/plugins/softphone/images/softphone_drop_call_3.gif" valign="top" /></div>
						</td>
						<td width="4"></td>
						<td width="76">
							<div class="softphone_icon" id='softphone_make_call'><img src="/js/plugins/softphone/images/softphone_make_call_3.gif" valign="top" /></div>
						</td>
					</tr>
					<tr>
						<td colspna="7" style="height: 5px;"></td>
					</tr>
					<tr>
						<td width="76">
							<div class="softphone_icon" id='softphone_transfer'><img src="/js/plugins/softphone/images/softphone_transfer_3.gif" valign="top" /></div>
						</td>
						<td width="4"></td>
						<td width="76">
							<div class="softphone_icon" id='softphone_conference'><img src="/js/plugins/softphone/images/softphone_conference_3.gif" valign="top" /></div>
						</td>
						<td width="4"></td>
						<td width="76">
							<div class="softphone_icon" id='softphone_hold'><img src="/js/plugins/softphone/images/softphone_hold_3.gif" valign="top" /></div>
							<div class="softphone_icon" id='softphone_unhold' style="display: none;"><img src="/js/plugins/softphone/images/softphone_unhold_3.gif" valign="top" /></div>		
						</td>
						<td width="4"></td>
						<td width="76">
							<div class="softphone_icon" id='softphone_login'><img src="/js/plugins/softphone/images/softphone_login_1.gif" valign="top" onclick="fnProcButton('softphone_login');" style='cursor: pointer;' /></div>
							<div class="softphone_icon" id='softphone_logout' style="display: none;"><img src="/js/plugins/softphone/images/softphone_logout_3.gif" valign="top" /></div>
						</td>
					</tr>
					</table>
				</td>
			</tr>
		</table>
		</form>
		<div id="softphone_notready_reason" style="display: none;">
			<div id="softphone_lunchtime"><img src="/js/plugins/softphone/images/softphone_lunchtime_3.gif" /></div>
			<div id="softphone_meeting"><img src="/js/plugins/softphone/images/softphone_lunchtime_3.gif" /></div>
			<div id="softphone_power_working"><img src="/js/plugins/softphone/images/softphone_power_working_3.gif" /></div>
			<div id="softphone_breaktime"><img src="/js/plugins/softphone/images/softphone_breaktime_3.gif" /></div>
			<div id="softphone_other_working"><img src="/js/plugins/softphone/images/softphone_other_working_3.gif" /></div>
			<div id="softphone_missing_call" style="display: none;"><img src="/js/plugins/softphone/images/softphone_missing_call_3.gif" /></div>
			<div id="softphone_callback" style="display: none;"><img src="/js/plugins/softphone/images/softphone_callback_3.gif" /></div>
			<div id="softphone_happy_call" style="display: none;"><img src="/js/plugins/softphone/images/softphone_happy_call_3.gif" /></div>
		</div>
		<div id='softphone_addon' style="display: none;">
			<div id="softphone_init"><img src="/js/plugins/softphone/images/softphone_init_1.gif" /></div>
			<div id="softphone_ok"><img src="/js/plugins/softphone/images/softphone_ok_1.gif" /></div>
			<div id="softphone_cancel"><img src="/js/plugins/softphone/images/softphone_cancel_1.gif" /></div>
		</div>
		
		<script>
		
			$("#testBtn").click(function(){
				REAL_SET_SERVER_IP('27.125.1.226');
			});
				REAL_SET_SERVER_IP('27.125.1.226');
			var fLogin = true;
			var sSoftphoneType = '';
			
			var arBtn = new Array( 22 );
			arBtn['0']	= document.getElementById( 'softphone_login' );
			arBtn['1']	= document.getElementById( 'softphone_logout' );
			arBtn['2']	= document.getElementById( 'softphone_ready' );
			arBtn['3']	= document.getElementById( 'softphone_notready' );
			arBtn['4']	= document.getElementById( 'softphone_answer' );
			arBtn['5']	= document.getElementById( 'softphone_drop_call' );
			arBtn['6']	= document.getElementById( 'softphone_make_call' );
			arBtn['7']	= document.getElementById( 'softphone_hold' );
			arBtn['8']	= document.getElementById( 'softphone_unhold' );
			arBtn['9']	= document.getElementById( 'softphone_transfer' );
			arBtn['10']	= document.getElementById( 'softphone_conference' );
			arBtn['11'] = document.getElementById( 'softphone_lunchtime' );
			arBtn['12'] = document.getElementById( 'softphone_meeting' );
			arBtn['13'] = document.getElementById( 'softphone_power_working' );
			arBtn['14'] = document.getElementById( 'softphone_breaktime' );
			arBtn['15'] = document.getElementById( 'softphone_other_working' );
			arBtn['16'] = document.getElementById( 'softphone_missing_call' );
			arBtn['17'] = document.getElementById( 'softphone_callback' );
			arBtn['18'] = document.getElementById( 'softphone_happy_call' );
			arBtn['19'] = document.getElementById( 'softphone_init' );
			arBtn['20'] = document.getElementById( 'softphone_ok' );
			arBtn['21'] = document.getElementById( 'softphone_cancel' );
			
			var arState = new Array();
			arState['41'] = 'Lunch Time';
			arState['42'] = 'Education';
			arState['43'] = 'Meeting';
			arState['44'] = 'Power Working';
			arState['45'] = 'Break Time';
			arState['46'] = 'Other Working';
			arState['47'] = 'Missing Call';
			arState['48'] = 'Call Back';
			arState['49'] = 'Happy Call';
			
			var arStateText = new Array();
			arStateText['41'] = '식사';
			arStateText['42'] = '교육';
			arStateText['43'] = '미팅';
			arStateText['44'] = '사무처리';
			arStateText['45'] = '휴식';
			arStateText['46'] = '기타';
			arStateText['47'] = '미스콜';
			arStateText['48'] = '콜백';
			arStateText['49'] = '해피콜';
			
			
			var thisdoc = document.all;
			var thisform = document.forms[0];
			var objState = document.getElementById( 'AGENTSTATUS' ); 
			var REASONCODE = "";
			
			var nMsgLine = 0;
			
			function notReady(){
				if (thisdoc.not_ready_sub.style.display == "none"){
					thisdoc.not_ready_sub.style.display = "";
				 }else{
					thisdoc.not_ready_sub.style.display = "none";
				 }
			}
			
			function GETPOPUP(){
				if (thisdoc.POP.style.display == "none"){ 
				  thisdoc.POP.style.display = "";
				  thisdoc.POP.style.left = 0;
				  thisdoc.POP.style.top = -375;
				 }else{
				  thisdoc.POP.style.display = "none";
				 }
			}
			
			var BLANKCALLID = '';
			
			function OnButtonProc(arButton, arState)
			{
// 				try
// 				{
					for( i = 0; i < arState.length; i++ )
					{
						switch( arState[i] )
						{
							case "1" : // display ( using img )
								eval( "document.getElementById( '"+ arButton[i] + "' ).innerHTML = '<a href=\"#\" onclick=\"fnProcButton(  \\\'"+ arButton[i] + "\\\')\"><img src=\"/js/plugins/softphone/images/" + arButton[i] + "_1.gif\" border=\"0\" style=\"cursor: pointer;\"></a>';" );
								eval( "document.getElementById( '"+ arButton[i] + "' ).style.display = '';" );
								break;
							case "2" : // dispay ( state img )
								eval( "document.getElementById( '"+ arButton[i] + "' ).innerHTML = '<img src=\"/js/plugins/softphone/images/" + arButton[i] + "_2.gif\">';" );
								eval( "document.getElementById( '"+ arButton[i] + "' ).style.display = '';" );
								break;
							case "3" : // display ( disable img )
								eval( "document.getElementById( '"+ arButton[i] + "' ).innerHTML = '<img src=\"/js/plugins/softphone/images/" + arButton[i] + "_3.gif\">';" );
								eval( "document.getElementById( '"+ arButton[i] + "' ).style.display = '';" );
								break;
							case "4" : // none display 
								eval( "document.getElementById( '"+ arButton[i] + "' ).innerHTML = '<img src=\"/js/plugins/softphone/images/" + arButton[i] + "_3.gif\">';" );
								eval( "document.getElementById( '"+ arButton[i] + "' ).style.display = 'none';" );
								break;
						}
					}		
// 				}
// 				catch ( e )
// 				{
// 					SOFTPHONE_DEBUG( '', "["+EXT+"] " + "OnButtonProc Error["+arButton[i]+"] : " + e.description );
// 					alert( 'error = ' + e.description );
// 				}
			}
			
			function OnReady()
			{
// 				try 
// 				{
					USERID = document.getElementById( "USERID" ).value;
					EXT = document.getElementById( "EXT" ).value;
				
					//window.resizeTo( "430", "140" );
					if ( USERID != "" && EXT != "" )
					{
						if ( fLogin )
						{
							CHECK_BUTTON("Log On");
						} else {
							CHECK_BUTTON("SERVERCONNECT");
						}
					}
// 				} catch ( e ) {
// 					SOFTPHONE_DEBUG( '', "["+EXT+"] " + "OnButtonProc Error : " + e.description );
// 					alert( 'error = ' + e.description );
// 				}
			}
			
			if (window.addEventListener) {
				window.addEventListener('load', OnReady, false);
			} else if (window.attachEvent) {
				window.attachEvent('onload', OnReady);
			}
		</script>
		
	</body>
	
</html>
