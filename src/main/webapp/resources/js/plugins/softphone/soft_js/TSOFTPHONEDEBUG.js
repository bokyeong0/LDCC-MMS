var szDEBUG_URL = "./TSoftphone_debug.php";
var fDebug = true;
 
function SOFTPHONE_DEBUG_HEAD() {
	var xmlhttp = null; 

	if(window.XMLHttpRequest) { 
		xmlhttp = new XMLHttpRequest(); 
	} else if ( window.ActiveXObject )
	{
		try
		{
			xmlhttp = new ActiveXObject("Msxml2.XMLHTTP"); 		
		}
		catch ( e )
		{
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); 
		}
	} 
	
	
	return xmlhttp;
}


function SOFTPHONE_DEBUG( szExt, szParam ) {
	if ( fDebug == false )
	{
		return;
	}
	var hAjax = SOFTPHONE_DEBUG_HEAD();

	hAjax.onreadystatechange = function () {
		if(hAjax.readyState==4 && hAjax.status == 200 && hAjax.statusText=='OK') {
		}
	}

	hAjax.open('POST', szDEBUG_URL, true); 
	hAjax.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=utf-8");

	var ajaxCacheNowDate = new Date();
	var szSendParm = 'ext='+szExt+'&msg=' +szParam + '&runTime='+Date.parse(ajaxCacheNowDate.toString());
//	console.log(szSendParm);
//
//	hAjax.send(szSendParm); 
}