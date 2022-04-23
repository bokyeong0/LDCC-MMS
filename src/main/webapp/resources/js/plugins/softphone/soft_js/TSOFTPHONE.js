//try
//{
	function REAL_SET_SERVER_IP( ip ){
	   TARGET_SERVER_IP = ip;
//	   alert(TARGET_SERVER_IP);
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
//		try
//		{
			
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
//		} catch ( e ) {
//			SOFTPHONE_DEBUG( "", "["+EXT+"] " + "FURENCE_DEBUG Exception : " + e.description );					
//		}
	}
	
	function TESTSA(STR){
//		alert(STR);
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
//		console.log(GETSWF("TSoftphone"));
		GETSWF("TSoftphone").CMDCONN();
//		$("#TSoftphone").CMDCONN();
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
		console.log(EXT);
		console.log(USERID);
		console.log(REASONCODE);
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
try{
	
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

//	console.log("111111111111");
	eval("window.TSoftphone = document.getElementById('TSoftphone');");
} catch(e){
	SOFTPHONE_DEBUG( "SOFTPHONE", "["+EXT+"] " + "Exception : " + e.description );	
	alert( "javascript error : " + e.description );
}
//} catch(e){
//	SOFTPHONE_DEBUG( "SOFTPHONE", "["+EXT+"] " + "Exception : " + e.description );	
//	alert( "javascript error : " + e.description );
//}
