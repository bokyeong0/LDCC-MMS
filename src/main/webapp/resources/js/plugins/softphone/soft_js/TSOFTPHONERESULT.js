//try
//{

	///////////////////////////////////////////Configration////////////////////////////////////

	var TARGET_SERVER_IP = "192.168.1.210";		// IP 
	var TARGET_SERVER_PORT = 15000;			// Port	

	// Reconnect ( 2010.10 cypark ) Start
	var RECONNECT_OPTION = "TRUE";
	var RECONNECT_TIME = 2;
	var IS_RECONNECT = "TRUE";
	var IS_RECONNECT_LOGIN = "FALSE";
	var IS_RECONNECT_READY = "";
	var IS_RECONNECT_NOTREADY = "";
	// ReConnect ( cypark 2010.12.09 ) End

	// READY CHECK ( 2010.10 cypark ) Start
	var READYSIG = "TRUE";
	var READYSIG_INTERVAL = 60;
	var READY_INTERVAL_ID = "";
	var fCIDOpt = false;
	// READY CHECK ( 2010.10 cypark ) End
	var CALL_HANDLE = new Array(3);

	//////////////////////////////////////////////////////////////////////////////////////
    /*  TMotion CALL HANDLE check  */
	function CALL_HANDLE_CHECK( hHandle, nType )
	{ 
	 console.log("CALL_HANDLE_CHECK : " + RESULT);
		var fCheck = false;
		var nArray = '';
		for( var key in CALL_HANDLE )
		{
			if ( CALL_HANDLE[key] == hHandle )
			{
				fCheck = true;
				nArray = key;
			}
		}
		
		// nType = 1 : CONNECTION
		if ( nType == 1 )
		{
			if ( !fCheck )
			{
				CALL_HANDLE.push( hHandle );
			}
		} else {  // nType = 2 : DISCONNECTION
			if ( !fCheck )
			{
				CALL_HANDLE.splice(nArray, 1, hHandle);
			}
		}
		
		return CALL_HANDLE.length;
	}
	//////////////////////////////////////////////////////////////////////////////////////
    /*  TMotion COMMAND callback  */
	function TM_COMMAND_CALLBACK(RESULT)
	{
	  console.log("CALL_HANDLE_CHECK : " + RESULT);
		try
		{
			
			var COMNAME =RESULT.substring(67,70);
			var COMRESULT = RESULT.substring(71,74);
	
			if(COMRESULT == "-01"){
				if(COMNAME =="201"){
					CHECKSTATE = "201";
					CHECKMSG = "Fail Login";
					CHECKRESULT = "N";
					CHECKTARGET ="";
					CHECKCALLID ="";
					CHECKBUFFER = "";
	
					ISLOG = "FALSE";
				}else if(COMNAME =="202"){
					CHECKSTATE = "202";
					CHECKMSG = "Fail LogOut";
					CHECKRESULT = "N";
					CHECKTARGET ="";
					CHECKCALLID ="";
					CHECKBUFFER = "";
					
				}else if(COMNAME =="203"){
					CHECKSTATE = "203";
					CHECKMSG = "Fail Ready";
					CHECKRESULT = "N";
					CHECKTARGET ="";
					CHECKCALLID ="";
					CHECKBUFFER = "";
					
					ISREADY = "FALSE";
					ISNOTREADY = "FALSE";
					
				}else if(COMNAME =="204"){
					CHECKSTATE = "204";
					CHECKMSG = "Fail Not Ready";
					CHECKRESULT = "N";
					CHECKTARGET ="";
					CHECKCALLID ="";
					CHECKBUFFER = "";
					
				}else if(COMNAME =="301"){
					CHECKSTATE = "301";
					CHECKMSG = "Fail Make Call";
					CHECKRESULT = "N";
					CHECKTARGET ="";
					CHECKCALLID ="";
					CHECKBUFFER = "";
					
				}else if(COMNAME =="302"){
					// ReConnect ( cypark 2010.12.09 ) Start
					IS_RECONNECT_READY = "TRUE";
					IS_RECONNECT_NOTREADY = "";
					ISREADY = "FALSE";
					ISNOTREADY = "FALSE";
					// ReConnect ( cypark 2010.12.09 ) End
	
					CHECKSTATE = "302";
					CHECKMSG = "Fail Drop Call";
					CHECKRESULT = "N";
					CHECKTARGET ="";
					CHECKCALLID ="";
					CHECKBUFFER = "";
					
				}else if(COMNAME =="303"){
					CHECKSTATE = "303";
					CHECKMSG = "Fail Answer Call";
					CHECKRESULT = "N";
					CHECKTARGET ="";
					CHECKCALLID ="";
					CHECKBUFFER = "";
					
				}else if(COMNAME =="304"){
					CHECKSTATE = "304";
					CHECKMSG = "Fail Hold Call";
					CHECKRESULT = "N";
					CHECKTARGET ="";
					CHECKCALLID ="";
					CHECKBUFFER = "";
					
				}else if(COMNAME =="305"){
					CHECKSTATE = "305";
					CHECKMSG = "Fail Un Hold Call";
					CHECKRESULT = "N";
					CHECKTARGET ="";
					CHECKCALLID ="";
					CHECKBUFFER = "";
					
				}else if(COMNAME =="306"){
					CHECKSTATE = "306";
					CHECKMSG = "Fail Blind Transfer";
					CHECKRESULT = "N";
					CHECKTARGET ="";
					CHECKCALLID ="";
					CHECKBUFFER = "";
					
				}else if(COMNAME =="307"){
					CHECKSTATE = "307";
					CHECKMSG = "Fail Pickup Call";
					CHECKRESULT = "N";
					CHECKTARGET ="";
					CHECKCALLID ="";
					CHECKBUFFER = "";
					
				}else if(COMNAME =="308"){
					CHECKSTATE = "308";
					CHECKMSG = "Fail Transfer Init";
					CHECKRESULT = "N";
					CHECKTARGET ="";
					CHECKCALLID ="";
					CHECKBUFFER = "";
					
				}else if(COMNAME =="309"){
					CHECKSTATE = "309";
					CHECKMSG = "Fail Transfer Complete";
					CHECKRESULT = "N";
					CHECKTARGET ="";
					CHECKCALLID ="";
					CHECKBUFFER = "";
					
				}else if(COMNAME =="310"){
					CHECKSTATE = "310";
					CHECKMSG = "Fail Transfer Cancel";
					CHECKRESULT = "N";
					CHECKTARGET ="";
					CHECKCALLID ="";
					CHECKBUFFER = "";
					
				}else if(COMNAME =="311"){
					CHECKSTATE = "311";
					CHECKMSG = "Fail Conference Init";
					CHECKRESULT = "N";
					CHECKTARGET ="";
					CHECKCALLID ="";
					CHECKBUFFER = "";
					
				}else if(COMNAME =="312"){
					CHECKSTATE = "312";
					CHECKMSG = "Fail Conference Complete";
					CHECKRESULT = "N";
					CHECKTARGET ="";
					CHECKCALLID ="";
					CHECKBUFFER = "";
					
				}else if(COMNAME =="313"){
					CHECKSTATE = "313";
					CHECKMSG = "Fail Conference Cancel";
					CHECKRESULT = "N";
					CHECKTARGET ="";
					CHECKCALLID ="";
					CHECKBUFFER = "";
					
				}else if(COMNAME =="314"){
					CHECKSTATE = "314";
					CHECKMSG = "Fail Transfer request";
					CHECKRESULT = "N";
					CHECKTARGET ="";
					CHECKCALLID ="";
					CHECKBUFFER = "";
				} else {
					CHECKSTATE = COMNAME;
					CHECKMSG = "Error";
					CHECKRESULT = "N";
					CHECKTARGET ="";
					CHECKCALLID ="";
					CHECKBUFFER = "";
	
				}
				
				fncCallResult(CHECKSTATE, CHECKRESULT, CHECKMSG, CHECKTARGET, CHECKCALLID, CHECKBUFFER, CHECKNEWCALLID, CHECKIVRCODE);
			} else if (COMRESULT == "001") {
				if(COMNAME == "201"){
					CHECKSTATE = "413";	
					CHECKMSG = "Success Login";
					CHECKRESULT = "Y";
		
					CHECKTARGET ="";
					CHECKCALLID ="";
					CHECKBUFFER = "";
		
					typeTransConf = "NONE";
		
					// READY CHECK & Reconnect ( 2010.10 cypark ) Start
					ISLOG = "TRUE";
		
					IS_RECONNECT_LOGIN = "TRUE";
					ISREADY = "FALSE";
					ISNOTREADY = "FALSE";
		
					if ( READYSIG ==  "TRUE" && READY_INTERVAL_ID ){
						window.clearInterval( READY_INTERVAL_ID );
						READY_INTERVAL_ID = "";
					}
					// READY CHECK & Reconnect ( 2010.10 cypark ) End
					if ( intvalLogOn != "" ) {
						if ( ISDISCONNECT != "FALSE" && CHECK_LOG() != "FALSE" )
						{
							window.clearInterval( intvalLogOn );
							intvalLogOn = "";
							ISLOG = "TRUE";
						}
					}
					if ( intvalReconnect != "" )
					{
						window.clearInterval( intvalReconnect );
						intvalReconnect = "";
					}
			
					// screen login
					SCRSENDER();
					fncCallResult(CHECKSTATE, CHECKRESULT, CHECKMSG, CHECKTARGET, CHECKCALLID, CHECKBUFFER, CHECKNEWCALLID, CHECKIVRCODE);
				} else {

					CHECKSTATE = COMNAME;
					CHECKMSG = "";
					CHECKRESULT = "Y";
		
					if ( COMNAME == "302" )
					{
						typeTransConf = "";
					}
				}
			} else {
				CHECKSTATE = "-999";	
				CHECKMSG = "NONE";
				CHECKRESULT = "N";
				CHECKTARGET ="";
				CHECKCALLID ="";
				CHECKBUFFER = "";
				
			}
			SOFTPHONE_DEBUG( "CMD_Packet", "["+EXT+"] " + "TM_COMMAND_CALLBACK Packet : " + RESULT );			
		} catch (e) {
			SOFTPHONE_DEBUG( "", "["+EXT+"] " + "TM_COMMAND_CALLBACK  : " + e.description );			
		}
	}

    /*  TMotion  Event callback  */
	function TM_EVENT_CALLBACK(aRESULT) 
	{
		
	     var RESULT;

      if (aRESULT.length < 10)

      {

         return;

      }

      

      if (aRESULT.substring(0,1) == " ")

      {

         RESULT = aRESULT.substring(1,aRESULT.length -2);

      }else

      {

         RESULT = aRESULT;

      }
	 console.log("TM_EVENT_CALLBACK : " + RESULT);
		try
		{
			if("401" == RESULT.substring(52,55)){
				CHECKSTATE = RESULT.substring(52,55);
				CHECKMSG = "Success Server Connect";
				CHECKRESULT = "Y";
				
				CHECKTARGET ="";
				CHECKCALLID ="";
				CHECKBUFFER = "";
	
				typeTransConf = "NONE";
	
				if ( READYSIG ==  "TRUE" && READY_INTERVAL_ID != "" ){
					window.clearInterval( READY_INTERVAL_ID );
					READY_INTERVAL_ID = "";
				}
				
			}else if("402" == RESULT.substring(52,55)){
				CHECKSTATE = RESULT.substring(52,55);
				CHECKMSG = "Success Server Disconnect";
				CHECKRESULT = "Y";
				
				CHECKTARGET ="";
				CHECKCALLID ="";
				CHECKBUFFER = "";
				
				typeTransConf = "NONE";
	
				ISLOG = "";
	
				if ( READYSIG ==  "TRUE" && READY_INTERVAL_ID != "" ){
					window.clearInterval( READY_INTERVAL_ID );
					READY_INTERVAL_ID = "";
				}
				
			}else if( RESULT.substring(52,55) == "403" && ( RESULT.substring(76,78) == "99" || RESULT.substring(76,78) == "00" ) ){
				if ( CHECKSTATE == '40300' || CHECKSTATE == '40399' )
				{
					// 별이상은 없을 걸로 보임.
					// offering 시 고객 정보 찾기를 한다고면, cid 중복 찾기가 될 수 있음. 주의 요망.
					//return;
				}
	
				CHECKSTATE = RESULT.substring(52,55)+RESULT.substring(76,78);	
				CHECKMSG = "INBOUND CALL. RING";
				CHECKRESULT = "Y";
				
				var checkk= new Array();
				checkk = RESULT.split("/");
	
				if ( !fCIDOpt )
				{
					CHECKCALLID = checkk[8];
				}		
				CallID = checkk[7]; //RESULT.substring(24, 34);
				CallHandleID = checkk[7];
				CallRouteCode = checkk[4];
	
				CHECKNEWCALLID = CallID;
				CHECKIVRCODE = CallRouteCode;
	
				typeTransConf = "NONE";
				
				ISREADY = "FALSE";	
				ISNOTREADY = "FALSE";
				if ( READYSIG ==  "TRUE" && READY_INTERVAL_ID != "" ){
					window.clearInterval( READY_INTERVAL_ID );
					READY_INTERVAL_ID = "";
				}
			
			}else if( RESULT.substring(52,55) == "403" && RESULT.substring(76,78) == "88" ){
				CHECKSTATE = RESULT.substring(52,55)+RESULT.substring(76,78);
				CHECKMSG = "Happy CALL. Happy CALL";
				CHECKRESULT = "Y";
				
				var checkk= new Array();
				checkk = RESULT.split("/");
				CHECKCALLID= checkk[8];
							
				typeTransConf = "NONE";
	
				ISREADY = "FALSE";
				ISNOTREADY = "FALSE";
				if ( READYSIG ==  "TRUE" && READY_INTERVAL_ID != "" ){
					window.clearInterval( READY_INTERVAL_ID );
					READY_INTERVAL_ID = "";
				}
	
			}else if( RESULT.substring(52,55) == "403" && RESULT.substring(76,78) == "77" && (  RESULT.substring(56,59) == "000" || RESULT.substring(56,59) == "002" ) ){
				CHECKSTATE = RESULT.substring(52,55)+RESULT.substring(76,78);
				CHECKMSG = "TRANSINIT CALL. TRANSINIT CALL";
				CHECKRESULT = "Y";
				
				var checkk= new Array();
				checkk = RESULT.split("/");
				CHECKCALLID= checkk[8];
	
				typeTransConf = "NONE";
	
				ISREADY = "FALSE";
				ISNOTREADY = "FALSE";
				if ( READYSIG ==  "TRUE" && READY_INTERVAL_ID != "" ){
					window.clearInterval( READY_INTERVAL_ID );
					READY_INTERVAL_ID = "";
				}
				
			}else if( RESULT.substring(52,55) == "403" && RESULT.substring(76,78) == "66" && (  RESULT.substring(56,59) == "000" || RESULT.substring(56,59) == "002" ) ){
				CHECKSTATE = RESULT.substring(52,55)+RESULT.substring(76,78);
				CHECKMSG = "Local CALL. Local CALL";
				CHECKRESULT = "Y";
				
				var checkk= new Array();
				checkk = RESULT.split("/");
				CHECKCALLID= checkk[8];
	
				typeTransConf = "NONE";
	
				if ( READYSIG ==  "TRUE" && READY_INTERVAL_ID != "" ){
					window.clearInterval( READY_INTERVAL_ID );
					READY_INTERVAL_ID = "";
				}
				
			}else if("404" == RESULT.substring(52,55)){
				CHECKSTATE = RESULT.substring(52,55);
				CHECKMSG = "Success Answer";
				CHECKRESULT = "Y";
	
				if ( fCIDOpt )
				{
					var checkk= new Array();
					checkk = RESULT.split("/");
					CHECKCALLID= checkk[5];
				}
	
				typeTransConf = "NONE";
	
				ISREADY = "FALSE";
				ISNOTREADY = "FALSE";
				if ( READYSIG ==  "TRUE" && READY_INTERVAL_ID != "" ){
					window.clearInterval( READY_INTERVAL_ID );
					READY_INTERVAL_ID = "";
				}
	
			}else if("405" == RESULT.substring(52,55)){
				CHECKSTATE = RESULT.substring(52,55);
				CHECKMSG = "Success Hold";
				CHECKRESULT = "Y";
	
				typeTransConf = "NONE";
	
				// READY CHECK ( 2010.10 cypark ) Start
				ISREADY ="FALSE";
				ISNOTREADY = "FALSE";
				// READY CHECK ( 2010.10 cypark ) End
				if ( READYSIG ==  "TRUE" && READY_INTERVAL_ID != "" ){
					window.clearInterval( READY_INTERVAL_ID );
					READY_INTERVAL_ID = "";
				}
			
			}else if("406" == RESULT.substring(52,55)){
				CHECKSTATE = RESULT.substring(52,55);
				CHECKMSG = "Success UnHold";
				CHECKRESULT = "Y";
	
				typeTransConf = "NONE";
	
				if ( READYSIG ==  "TRUE" && READY_INTERVAL_ID != "" ){
					window.clearInterval( READY_INTERVAL_ID );
					READY_INTERVAL_ID = "";
				}
	
			}else if("407" == RESULT.substring(52,55)){
				CHECKSTATE = RESULT.substring(52,55);
				CHECKMSG = "Success Hangup";
				CHECKRESULT = "Y";
	
				// READY CHECK ( 2010.10 cypark ) Start
				IS_RECONNECT_READY = "TRUE";
				IS_RECONNECT_NOTREADY = "";
				ISREADY = "FALSE";
				ISNOTREADY = "FALSE";
	
				typeTransConf = "NONE"; 
	
				// READY CHECK ( 2010.10 cypark ) End
				if ( READYSIG ==  "TRUE" && READY_INTERVAL_ID != "" ){
					window.clearInterval( READY_INTERVAL_ID );
					READY_INTERVAL_ID = "";
				}
	
			}else if("408" == RESULT.substring(52,55)){
				CHECKSTATE = RESULT.substring(52,55)+RESULT.substring(56,59);
				CHECKMSG = "Success Transfer Complete";
				CHECKRESULT = "Y";
				
				var checkk= new Array();
			    var userdata = new Array();
			    checkk = RESULT.split("/");
			    userdata = checkk[8].split("|");
			    CHECKCALLID= userdata[0]; 
			    CHECKBUFFER= userdata[1]; 
	
				typeTransConf = "NONE"; 
	
				if ( READYSIG ==  "TRUE" && READY_INTERVAL_ID != "" ){
					window.clearInterval( READY_INTERVAL_ID );
					READY_INTERVAL_ID = "";
				}
			}else if("409" == RESULT.substring(52,55)){
				CHECKSTATE = RESULT.substring(52,55)+RESULT.substring(56,59);
				CHECKMSG = "Success Conference Complete";
				CHECKRESULT = "Y";
				CHECKBUFFER = RESULT.substring(110,125);
	
				typeTransConf = "CONFCOMP"; 
	
				//CanfCount = 0;
				if ( READYSIG ==  "TRUE" && READY_INTERVAL_ID != "" ){
					window.clearInterval( READY_INTERVAL_ID );
					READY_INTERVAL_ID = "";
				}
	
			}else if("410" == RESULT.substring(52,55)){
				CHECKSTATE = RESULT.substring(52,55);	
				CHECKMSG = "IDE";
				CHECKRESULT = "Y";
	
				typeTransConf = "NONE"; 
	
				ISREADY = "FALSE";
				ISNOTREADY = "FALSE";
				if ( READYSIG ==  "TRUE" && READY_INTERVAL_ID != "" ){
					window.clearInterval( READY_INTERVAL_ID );
					READY_INTERVAL_ID = "";
				}
				// cypark 2011.01.12 Start
			}else if("411" == RESULT.substring(52,55) && typeTransConf == "TRANSINIT" ) {
				CHECKSTATE = "40350";	
				CHECKMSG = "Success Init Transfer";
				CHECKRESULT = "Y";
				CHECKTARGET ="";
				CHECKCALLID ="";
				CHECKBUFFER = "";
	
				typeTransConf = "TRANSINIT"; 
	
				// READY CHECK ( 2011.01.12 cypark ) Start
				ISREADY = "FALSE";
				ISNOTREADY = "FALSE";
				// READY CHECK ( 2011.01.12 cypark ) End
				if ( READYSIG ==  "TRUE" && READY_INTERVAL_ID != "" ){
					window.clearInterval( READY_INTERVAL_ID );
					READY_INTERVAL_ID = "";
				}
	
				var checkk= new Array();
				checkk = RESULT.split("/");
				var tmpCHECKCALLID = checkk[5];
				
				//CALL_HANDLE_CHECK( tmpCHECKCALLID, 1 );
			}else if("411" == RESULT.substring(52,55) && RESULT.substring(76,78) == "77" && typeTransConf == "CONFREADY" ) {
				CHECKSTATE = "40362";
				CHECKMSG = "Success Ready Conference";
				CHECKRESULT = "Y";
				CHECKTARGET ="";
				CHECKCALLID ="";
				CHECKBUFFER = "";
	
				typeTransConf = "CONFREADY"; 
	
				// READY CHECK ( 2011.01.12 cypark ) Start
				ISREADY = "FALSE";
				ISNOTREADY = "FALSE";
				// READY CHECK ( 2011.01.12 cypark ) End
				if ( READYSIG ==  "TRUE" && READY_INTERVAL_ID != "" ){
					window.clearInterval( READY_INTERVAL_ID );
					READY_INTERVAL_ID = "";
				}
				
				var checkk= new Array();
				checkk = RESULT.split("/");
				var tmpCHECKCALLID = checkk[5];
				
				//CALL_HANDLE_CHECK( tmpCHECKCALLID, 1 );
				
			}else if("411" == RESULT.substring(52,55) && typeTransConf == "CONFREADY" ) {
				CHECKSTATE = "40361";
				CHECKMSG = "Success Ready Conference";
				CHECKRESULT = "Y";
				CHECKTARGET ="";
				CHECKCALLID ="";
				CHECKBUFFER = "";
	
				typeTransConf = "CONFINIT"; 
	
				// READY CHECK ( 2011.01.12 cypark ) Start
				ISREADY = "FALSE";
				ISNOTREADY = "FALSE";
				// READY CHECK ( 2011.01.12 cypark ) End
				if ( READYSIG ==  "TRUE" && READY_INTERVAL_ID != "" ){
					window.clearInterval( READY_INTERVAL_ID );
					READY_INTERVAL_ID = "";
				}
	
				var checkk= new Array();
				checkk = RESULT.split("/");
				var tmpCHECKCALLID = checkk[5];
				
				//CALL_HANDLE_CHECK( tmpCHECKCALLID, 1 );
			}else if("411" == RESULT.substring(52,55) && typeTransConf == "CONFINIT" ) {
				CHECKSTATE = "40360";
				CHECKMSG = "Success Init Conference";
				CHECKRESULT = "Y";
				CHECKTARGET ="";
				CHECKCALLID ="";
				CHECKBUFFER = "";
	
				typeTransConf = "CONFINIT"; 
	
				// READY CHECK ( 2011.01.12 cypark ) Start
				ISREADY = "FALSE";
				ISNOTREADY = "FALSE";
				// READY CHECK ( 2011.01.12 cypark ) End
				if ( READYSIG ==  "TRUE" && READY_INTERVAL_ID != "" ){
					window.clearInterval( READY_INTERVAL_ID );
					READY_INTERVAL_ID = "";
				}
	
				var checkk= new Array();
				checkk = RESULT.split("/");
				var tmpCHECKCALLID = checkk[5];
				
				//CALL_HANDLE_CHECK( tmpCHECKCALLID, 1 );
				
			}else if("411" == RESULT.substring(52,55) && typeTransConf == "TRANSCANCEL" ) {
				CHECKSTATE = "418";	
				CHECKMSG = "Success Cancel Transfer";
				CHECKRESULT = "Y";
				CHECKTARGET ="";
				CHECKCALLID ="";
				CHECKBUFFER = "";
	
				typeTransConf = "NONE"; 
	
				// READY CHECK ( 2011.01.12 cypark ) Start
				ISREADY = "FALSE";
				ISNOTREADY = "FALSE";
				// READY CHECK ( 2011.01.12 cypark ) End
				if ( READYSIG ==  "TRUE" && READY_INTERVAL_ID != "" ){
					window.clearInterval( READY_INTERVAL_ID );
					READY_INTERVAL_ID = "";
				}
	
				var checkk= new Array();
				checkk = RESULT.split("/");
				var tmpCHECKCALLID = checkk[5];
				
				//CALL_HANDLE_CHECK( tmpCHECKCALLID, 1 );
			
			}else if("411" == RESULT.substring(52,55) && typeTransConf == "CONFCANCEL" ) {
				//if ( CanfCount == 1 ){
					CHECKSTATE = "419";	
					CHECKMSG = "Success Cancel Conference";
					CHECKRESULT = "Y";
					CHECKTARGET ="";
					CHECKCALLID ="";
					CHECKBUFFER = "";
	
					typeTransConf = "NONE"; 
	
					//CanfCount = 0;
					if ( READYSIG ==  "TRUE" && READY_INTERVAL_ID != "" ){
						window.clearInterval( READY_INTERVAL_ID );
						READY_INTERVAL_ID = "";
					}
				//} else {
				//	CanfCount++;
				//	return;
				//}
	
				// READY CHECK ( 2011.01.12 cypark ) Start
				ISREADY = "FALSE";
				ISNOTREADY = "FALSE";
				// READY CHECK ( 2011.01.12 cypark ) End
	
				var checkk= new Array();
				checkk = RESULT.split("/");
				var tmpCHECKCALLID = checkk[5];
				
				//CALL_HANDLE_CHECK( tmpCHECKCALLID, 1 );
				
			}else if("411" == RESULT.substring(52,55) && typeTransConf == "CONFCOMP" ) {
				//if ( CanfCount >= 2 ){
				// READY CHECK ( 2011.01.12 cypark ) Start
				ISREADY = "FALSE";
				ISNOTREADY = "FALSE";
				// READY CHECK ( 2011.01.12 cypark ) End
	
				typeTransConf = "NONE"; 
	
				//CanfCount = 0;
				if ( READYSIG ==  "TRUE" && READY_INTERVAL_ID != "" ){
					window.clearInterval( READY_INTERVAL_ID );
					READY_INTERVAL_ID = "";
				}
				//} else { 
				//	CanfCount++;
				//	return;
				//}
	
			// cypark 2011.01.12 End
	
				var checkk= new Array();
				checkk = RESULT.split("/");
				var tmpCHECKCALLID = checkk[5];
				
				//CALL_HANDLE_CHECK( tmpCHECKCALLID, 1 );
			}else if("411" == RESULT.substring(52,55) ) { // && typeTransConf == "NONE" ){
				CHECKSTATE = RESULT.substring(52,55);
				CHECKMSG = "Success Call Connected";	
				CHECKRESULT = "Y";
	
				var checkk= new Array();
				checkk = RESULT.split("/");
				CHECKCALLID = checkk[5];
	
				typeTransConf = "NONE";
	
				// READY CHECK ( 2010.10 cypark ) Start
				ISREADY = "FALSE";
				ISNOTREADY = "FALSE";
				// READY CHECK ( 2010.10 cypark ) End
				if ( READYSIG ==  "TRUE" && READY_INTERVAL_ID != "" ){
					window.clearInterval( READY_INTERVAL_ID );
					READY_INTERVAL_ID = "";
				}
	
				var checkk= new Array();
				checkk = RESULT.split("/");
				var tmpCHECKCALLID = checkk[5];
				
				//CALL_HANDLE_CHECK( tmpCHECKCALLID, 1 );
			}else if("412" == RESULT.substring(52,55) && typeTransConf == "CONFCOMP" ){
				// 2011.11.24 cypark
				CHECKMSG = "Success Call Connected";	
				CHECKRESULT = "Y";
				
				//if ( CanfCount >= 2 ){
				// READY CHECK ( 2010.10 cypark ) Start
				IS_RECONNECT_READY = "TRUE";
				IS_RECONNECT_NOTREADY = "";
				ISREADY = "FALSE";
				ISNOTREADY = "FALSE";
				// READY CHECK ( 2010.10 cypark ) End
				// Transfer ( 2010.10 cypark )
				typeTransConf = "NONE"; 
	
				//CanfCount = 0;
	
				if ( READYSIG ==  "TRUE" && READY_INTERVAL_ID != "" ){
					window.clearInterval( READY_INTERVAL_ID );
					READY_INTERVAL_ID = "";
				}
	
				//} else {
				//	CanfCount++;
				//	return;
				//}
		
				var checkk= new Array();
				checkk = RESULT.split("/");
				var tmpCHECKCALLID = checkk[5];
				
				//CALL_HANDLE_CHECK( tmpCHECKCALLID, 2 );
			}else if("412" == RESULT.substring(52,55)){
				CHECKSTATE = RESULT.substring(52,55);
				CHECKMSG = "Success Call Disconnected";
				CHECKRESULT = "Y";
				
				CHECKTARGET ="";
				CHECKCALLID ="";
				CHECKBUFFER = "";
	
				typeTransConf = "NONE";
	
				// READY CHECK ( 2010.10 cypark ) Start
				IS_RECONNECT_READY = "TRUE";
				IS_RECONNECT_NOTREADY = "";
				ISREADY = "FALSE";
				ISNOTREADY = "FALSE";
				// READY CHECK ( 2010.10 cypark ) End
				// Transfer ( 2010.10 cypark )
	
				if ( READYSIG ==  "TRUE" && READY_INTERVAL_ID != "" ){
					window.clearInterval( READY_INTERVAL_ID );
					READY_INTERVAL_ID = "";
				}
				
				//if ( CALL_HANDLE_CHECK( tmpCHECKCALLID, 2 ) )
				//{
				//	CHECKSTATE = "411";
				//	CHECKMSG = "Success Call Connected";				
				//}
				
			}else if("413" == RESULT.substring(52,55)){
				CHECKSTATE = RESULT.substring(52,55);	
				CHECKMSG = "Success Login";
				CHECKRESULT = "Y";
	
				CHECKTARGET ="";
				CHECKCALLID ="";
				CHECKBUFFER = "";
	
				typeTransConf = "NONE";
	
				// READY CHECK & Reconnect ( 2010.10 cypark ) Start
				ISLOG = "TRUE";
	
				IS_RECONNECT_LOGIN = "TRUE";
				ISREADY = "FALSE";
				ISNOTREADY = "FALSE";
	
				if ( READYSIG ==  "TRUE" && READY_INTERVAL_ID != "" ){
					window.clearInterval( READY_INTERVAL_ID );
					READY_INTERVAL_ID = "";
				}
				// READY CHECK & Reconnect ( 2010.10 cypark ) End
				if ( intvalLogOn ) {
					if ( ISDISCONNECT != "FALSE" && CHECK_LOG() != "FALSE" )
					{
						window.clearInterval( intvalLogOn );
						intvalLogOn = "";
						ISLOG = "TRUE";
					}
				}
				if ( intvalReconnect != "" )
				{
					window.clearInterval( intvalReconnect );
					intvalReconnect = "";
				}
		
				// screen login
				SCRSENDER();
	
			}else if("414" == RESULT.substring(52,55)){
				CHECKSTATE = RESULT.substring(52,55);
				CHECKMSG = "Success LogOut";
				CHECKRESULT = "Y";
	
				CHECKTARGET ="";
				CHECKCALLID ="";
				CHECKBUFFER = "";
	
				typeTransConf = "NONE";
				
				// READY CHECK & Reconnect ( 2010.10 cypark ) Start
				IS_RECONNECT_LOGIN = "FALSE";
				IS_RECONNECT_READY = "";
				IS_RECONNECT_NOTREADY = "";
				ISREADY = "FALSE";
				ISNOTREADY = "FALSE";
	
				// READY CHECK & Reconnect ( 2010.10 cypark ) End
				typeTransConf = "NONE"; 
	
				if ( READYSIG ==  "TRUE" && READY_INTERVAL_ID != "" ){
					window.clearInterval( READY_INTERVAL_ID );
					READY_INTERVAL_ID = "";
				}
	
			}else if("415" == RESULT.substring(52,55)){
				CHECKSTATE = RESULT.substring(52,55);	
				CHECKMSG = "Success Ready";
				CHECKRESULT = "Y";
				
				CHECKTARGET ="";
				CHECKCALLID ="";
				CHECKBUFFER = "";
	
				// READY CHECK & Reconnect ( 2010.10 cypark ) Start
				IS_RECONNECT_READY = "TRUE";
				IS_RECONNECT_NOTREADY = "";
				ISREADY = "TRUE";
				ISNOTREADY = "FALSE";
			
				// READY CHECK & Reconnect ( 2010.10 cypark ) End
				typeTransConf = "NONE"; 
	
				if ( READYSIG == "TRUE" && READY_INTERVAL_ID == "" ){
					READY_INTERVAL_ID = window.setInterval( "CT_READY_INTERVAL()", parseInt( READYSIG_INTERVAL ) * 1000 );
				}
	
			}else if("416" == RESULT.substring(52,55)){
				CHECKSTATE = RESULT.substring(52,55);	
				CHECKMSG = "Success Not Ready";
				CHECKRESULT = "Y";
				
				CHECKTARGET ="";
				CHECKCALLID ="";
				CHECKBUFFER = "";
	
				typeTransConf = "NONE";
	
				// READY CHECK & Reconnect ( 2010.10 cypark ) Start
				IS_RECONNECT_READY = "FALSE";
				IS_RECONNECT_NOTREADY = "TRUE";
				ISREADY = "FALSE";
				ISNOTREADY = "TRUE";
				// READY CHECK & Reconnect ( 2010.10 cypark ) End
	
				if ( READYSIG ==  "TRUE" && READY_INTERVAL_ID != "" ){
					window.clearInterval( READY_INTERVAL_ID );
					READY_INTERVAL_ID = "";
				}	
			}else if("431" == RESULT.substring(52,55)){
					////버림.
			} else {
				CHECKSTATE = RESULT.substring(52,55);	
				CHECKMSG = "NONE";
				CHECKRESULT = "Y";
				
				CHECKTARGET ="";
				CHECKCALLID ="";
				CHECKBUFFER = "";			
	
				typeTransConf = "NONE";
			}
			fncCallResult(CHECKSTATE, CHECKRESULT, CHECKMSG, CHECKTARGET, CHECKCALLID, CHECKBUFFER, CHECKNEWCALLID, CHECKIVRCODE);

			SOFTPHONE_DEBUG( "EVENT_Packet", "["+EXT+"] " + "TM_EVENT_CALLBACK Packet : " + RESULT );			
		} catch (e) {
			SOFTPHONE_DEBUG( "", "["+EXT+"] " + "TM_EVENT_CALLBACK  : " + e.description );			
		}
	}
//} catch(e) {
//	SOFTPHONE_DEBUG( "RESULT", "["+EXT+"] " + "TM_EVENT_CALLBACK  : " + e.description );			
//	alert( "javascript error : " + e.description );
//}
