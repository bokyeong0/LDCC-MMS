
function check_comment_submit(obj) {
	if(obj.c_comment.value.length < 5) {
		alert("코멘트는 5자 이상 적어주세요");
		obj.c_comment.focus();
		return false;
	}else if(obj.c_writer.value.length == 0){
		alert("이름을 적어 주세요");
		obj.c_writer.focus();
		return false;
	}

	obj.action = ID('iFormCommon').base.value + "/comment";

	return true;
}

function check_comment_submit_wiki(obj) {
	if(obj.c_comment.value.length < 5) {
		alert("코멘트는 5자 이상 적어주세요");
		obj.c_comment.focus();
		return false;
	}else if(obj.c_writer.value.length == 0){
		alert("이름을 적어 주세요");
		obj.c_writer.focus();
		return false;
	}

	obj.action = ID('iFormCommon').base.value + "/comment?_pn_=" + ID('iFormCommon').page.value;

	return true;
}

function actionContentSubmit(form){
	
	//웹에디터 사용중일때
	var e = getFormElement(form, 'use_html');
	if(e && e.checked){
		e = getFormElement(form, 'pre_content');
		e.value = TextEditor.document.body.innerHTML;
	}

	if(!getFormValue(form, 'user_id')){
		if(!getFormValue(form, 'writer')){
			alert('이름을 입력하세요.');
			getFormElement(form, 'writer').focus();
			return false;			
		}

		if(!getFormValue(form, 'passwd')){
			alert('비밀번호를 입력하세요.');
			getFormElement(form, 'passwd').focus();
			return false;
		}
	}
	
	e = getFormElement(form, 'subject');
	if(e != null && !e.value){
		alert('제목을 입력하세요.');
		e.focus();
		return false;
	}	
	
	e = getFormElement(form, 'use_crypto');
	
	/* content 암호화 */
	if(e && e.checked){
		var commForm = ID('iFormCommon');
		var key = GenerateKey();
		
		var c = getFormElement(form, 'pre_content');
		c.value = EncryptTEA(key, c.value);
		
		modulus = getFormValue(commForm, 'm');
		exponent = getFormValue(commForm, 'e');
		eKey = EncryptRSA(modulus, exponent, key);
		
		e = getFormElement(form, 'key');
		e.value = eKey;			
	}
	
	form.submit();
}

function check_submit(obj){

	//웹에디터 사용중일때
	if(obj.use_html && obj.use_html.checked){
		obj.pre_content.value = TextEditor.document.body.innerHTML;
		//obj.use_html.value = 1;
	}

	if(!obj.user_id.value){
		if(!obj.writer.value){
			alert('이름을 입력하세요.');
			obj.writer.focus();
			return false;
		}

		if(!obj.passwd.value){
			alert('비밀번호를 입력하세요.');
			obj.passwd.focus();
			return false;
		}
	}

	if(obj.subject && !obj.subject.value){
		alert('제목을 입력하세요.');
		obj.subject.focus();
		return false;
	}

	return true;
}

//글쓰기에서 미리보기를 클릭한 경우 처리...
function page_preview(obj){
	obj.action = ID('iFormCommon').base.value + "/process/preview";
	obj.submit();
}

function clearImage(obj){
	obj.style.backgroundImage="";
	obj.onkeydown=obj.onmousedown=null;
}

function move(url){
	location.href = url;
}

function check_password_submit(){
	if(document.check_form._pw_.value == ''){
		alert('비밀번호를 입력하세요');
		document.check_form._pw_.focus();
		return false;
	}

	return true;
}

function check_delete_board(no){
	pass_check_layer.style.top = document.body.scrollTop + window.event.clientY - 60;
	pass_check_layer.style.left = document.body.scrollLeft + window.event.clientX - 320;

	if(parseInt(pass_check_layer.style.top) < 50) pass_check_layer.style.top = 50 + "px";
	if(parseInt(pass_check_layer.style.left) < 50) pass_check_layer.style.left = 50 + "px";

	pass_check_layer.style.visibility='visible';
	
	document.check_form.action = ID('iFormCommon').base.value + "/delete_board";
	document.check_form._pm_.value = "list";
	if(no) document.check_form._no_.value = no;
	document.check_form._pw_.focus();
}

function check_delete_page(){
	pass_check_layer.style.top = document.body.scrollTop + window.event.clientY - 60;
	pass_check_layer.style.left = document.body.scrollLeft + window.event.clientX - 320;

	if(parseInt(pass_check_layer.style.top) < 50) pass_check_layer.style.top = 50 + "px";
	if(parseInt(pass_check_layer.style.left) < 50) pass_check_layer.style.left = 50 + "px";

	pass_check_layer.style.visibility='visible';
	
	document.check_form.action = ID('iFormCommon').base.value + "/delete_board?_pn_=" + ID('iFormCommon').page.value;;
	document.check_form._pw_.focus();
}

function confirm_delete_board(no){

	if(confirm("정말 삭제하시겠습니까?") == true)
	{
		document.param_form.action = ID('iFormCommon').base.value + "/delete_board";
		if(no) document.param_form._no_.value = no;
		document.param_form.submit();
	}
}

function confirm_delete_page(){

	if(confirm("정말 삭제하시겠습니까?") == true)
	{
		document.param_form.action = ID('iFormCommon').base.value + "/delete_board?_pn_=" + ID('iFormCommon').page.value;
		//document.param_form.submit();	//KWiki.java에서 문제가 있는데 고칠 수가 없어 일단 다음과 같이 수정.
		location.href = document.param_form.action;
	}
}

function hide_box(id){
	
	if (!document.getElementById || !document.getElementById(id)) 
		return;
		
	var box = document.getElementById(id);
	box.style.visibility = 'hidden';
}

function show_clicked_box(id, offsetX, offsetY) {
	if (!document.getElementById || !document.getElementById(id)) 
		return false;
		
	var box = document.getElementById(id);
	
	if(document.all){ // IE
		x = (document.documentElement && document.documentElement.scrollLeft) ? 
				document.documentElement.scrollLeft : document.body.scrollLeft;
		y = (document.documentElement && document.documentElement.scrollTop) ? 
				document.documentElement.scrollTop : document.body.scrollTop;
        x += window.event.clientX;
        y += window.event.clientY;		
	} else {	// Good Browser
		x = event.pageX;
		y = event.pageY;
	}
	
	x = (x + offsetX) > 0 ? (x + offsetX) : 0;
	y = (y + offsetY) > 0 ? (y + offsetY) : 0;
		
	box.style.left = x + 'px';
	box.style.top = y + 'px';	
	box.style.visibility = 'visible';	
	
	return true;
}

comment = {
	name : "comment",
	offsetX : -200,
	offsetY : -40
}

comment.checkDelete = function(commentNo){
	var offsetX = -200, offsetY = -40;
	
	if(show_clicked_box('iCheckPasswordLayer', comment.offsetX, comment.offsetY) == false)
		return;
	
	var formCheckPassword = document.getElementById('iFormCheckPassword');
	var formCommon = document.getElementById('iFormCommon');
		
	formCheckPassword.action = formCommon.base.value + "/delete_comment";

//	formCheckPassword._pm_.value = "view";
	formCheckPassword._cn_.value = commentNo;
	formCheckPassword._pw_.focus();
}

comment.confirmDelete = function(commentNo){
	if(confirm("정말 삭제하시겠습니까?") == true)
	{
		var formCheckPassword = document.getElementById('iFormCheckPassword');
		var formCommon = document.getElementById('iFormCommon');
		
		formCheckPassword.action = formCommon.base.value + "/delete_comment";
		formCheckPassword._cn_.value = commentNo;
		formCheckPassword.submit();
	}
}

function check_delete_comment(comment_no){
	var offsetX = -200, offsetY = -40;
	
	if(show_clicked_box('iCheckPasswordLayer', offsetX, offsetY) == false)
		return;
	
	var formCheckPassword = document.getElementById('iFormCheckPassword');
	var formCommon = document.getElementById('iFormCommon');
		
	formCheckPassword.action = formCommon.base.value + "/delete_comment";

	formCheckPassword._pm_.value = "view";
	formCheckPassword._cn_.value = comment_no;
	formCheckPassword._pw_.focus();
}



function check_modify_board(no){
	pass_check_layer.style.top = document.body.scrollTop + window.event.clientY - 60;
	pass_check_layer.style.left = document.body.scrollLeft + window.event.clientX - 320;
	
	if(parseInt(pass_check_layer.style.top) < 50) pass_check_layer.style.top = 50 + "px";
	if(parseInt(pass_check_layer.style.left) < 50) pass_check_layer.style.left = 50 + "px";
		
	pass_check_layer.style.visibility='visible';
	
	document.check_form.action = ID('iFormCommon').base.value + "/modify";
	document.check_form._no_.value = no;
	document.check_form._pw_.focus();
}

function check_modify_page(){
	pass_check_layer.style.top = document.body.scrollTop + window.event.clientY - 60;
	pass_check_layer.style.left = document.body.scrollLeft + window.event.clientX - 320;
	
	if(parseInt(pass_check_layer.style.top) < 50) pass_check_layer.style.top = 50 + "px";
	if(parseInt(pass_check_layer.style.left) < 50) pass_check_layer.style.left = 50 + "px";
		
	pass_check_layer.style.visibility='visible';
	
	document.check_form.action = ID('iFormCommon').base.value + "/edit?_pn_=" + ID('iFormCommon').page.value;
	document.check_form._pw_.focus();
}

function rebuild_page(){
	location.href = ID('iFormCommon').base.value + "/rebuild?_pn_=" + ID('iFormCommon').page.value;
}

/* 수정 관련 */
function modify_board(no){
	document.param_form.action = ID('iFormCommon').base.value + "/modify";

	//document.check_form._pm_.value = "view";
	if(no) document.param_form._no_.value = no;
	document.param_form.submit();
}

function modify_page(){
	location.href = ID('iFormCommon').base.value + "/edit?_pn_=" + ID('iFormCommon').page.value;
}

function modify_content(no){
	E('iFormParam').action = ID('iFormCommon').base.value + "/modify";
	if(no) E('iFormParam')._no_.value = no;
	E('iFormParam').submit();
}


/* 코멘트 삭제 확인 */
function confirm_delete_comment(comment_no){
	if(confirm("정말 삭제하시겠습니까?") == true)
	{
		document.check_form.action = ID('iFormCommon').base.value + "/delete_comment";
		document.check_form._cn_.value = comment_no;
		document.check_form.submit();
	}
}

function confirm_delete_comment_wiki(comment_no){
	if(confirm("정말 삭제하시겠습니까?") == true)
	{
		document.check_form.action = ID('iFormCommon').base.value + "/delete_comment?_pn_=" + ID('iFormCommon').page.value;
		document.check_form._cn_.value = comment_no;
		document.check_form.submit();
	}
}

function file_download(file_no){
	location.href = ID('iFormCommon').base.value + "/download?_fn_=" + file_no + "&_no_=" + document.param_form._no_.value;
}

function wiki_file_download(file_no){
	location.href = ID('iFormCommon').base.value + "/download?_fn_=" + file_no + "&_pn_=" + ID('iFormCommon').page.value;
}

function login_board(){
	document.param_form.action = ID('iFormCommon').base.value + "/login";
	document.param_form.submit();
}

function logoff_board(){
	document.param_form.action = ID('iFormCommon').base.value + "/logoff";
	document.param_form.submit();
}

function manager_board(){
	location.href = "";
}

function write_board(){
	document.param_form.action = ID('iFormCommon').base.value + "/write";			
	document.param_form.submit();
}


function reply_board(no){
	document.param_form.action = ID('iFormCommon').base.value + "/reply";
	if(no) document.param_form._no_.value = no;

	document.param_form.submit();
}

function list_board(){
	document.param_form.action = ID('iFormCommon').base.value + "/list";
	//document.param_form.mode.value = "list";
	document.param_form._sw_.value = "";
	document.param_form._ss_.value = 0;
	document.param_form.submit();
}

function list_board_category(category){
	//document.param_form.mode.value = "list";
	document.param_form.action = ID('iFormCommon').base.value + "/list";
	document.param_form._cg_.value = category;
	document.param_form.submit();
}

function move_page_board(num){
	document.param_form._bp_.value = num;
	document.param_form.submit();
}

function search_board(){
	if(document.search.keyword.value == ''){
		alert('키워드를 입력하세요');
		document.search.keyword.focus();
		return false;
	}

	if(document.search.scope.value == 0){
		alert('찾고자 하는 영역을 하나 이상 선택하세요');
		return false;
	}
	
	//document.param_form.mode.value = "list";
	document.param_form.action = ID('iFormCommon').base.value + "/list";
	document.param_form._bp_.value = "1";
	document.param_form._sw_.value = document.search.keyword.value;
	document.param_form._ss_.value = document.search.scope.value;
	document.param_form.submit();
	return false;
}

function scope_change(name) {
	if(name == 'name'){
		k = ((document.search.scope.value >> 3) & 1);

		if(k == 0){
			document.search.scope.value |= (1 << 3);
		}else{
			document.search.scope.value &= ~(1 << 3);
		}
	}else if(name == 'subject'){
		k = ((document.search.scope.value >> 2) & 1);

		if(k == 0){
			document.search.scope.value |= (1 << 2);
		}else{
			document.search.scope.value &= ~(1 << 2);
		}
	}else if(name == 'content'){
		k = ((document.search.scope.value >> 1) & 1);

		if(k == 0){
			document.search.scope.value |= (1 << 1);
		}else{
			document.search.scope.value &= ~(1 << 1);
		}
	}
}


var file_num = 1;
function file_add(){
	file_num++;
	file_input.innerHTML += "<input type=file name=file" + file_num + " size=50 maxlength=255 class=ggambo_input3 style='width:95%;word-break:break-all;'>";
}

function image_preview(preview_image){
	var obj = event.srcElement;
	var ext = obj.value.toLowerCase();

	if(ext.match(/(.jpg|.jpeg|.gif|.png|.bmp|.wmf)/)) {
		preview_image.src = obj.value;
		preview_image.width = 60;
		preview_image.height = 60;
	}else {
		alert("추가 업로드 필드에는 이미지파일만 등록하여야 합니다.\n\n업로드 하시더라도 실제로 사용하실 수 없습니다.");
		obj.value = '';	
		preview_image.src = '';
		preview_image.width = 0;
		preview_image.height = 0;
	}
}



function bluring(){
	if(event.srcElement.tagName=="A"||event.srcElement.tagName=="IMG") document.body.focus();
}

document.onfocusin=bluring;

function clrImg(obj){
	obj.style.backgroundImage="";
	obj.onkeydown=obj.onmousedown=null;
}

function findObj(n, d) { //v4.0
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=findObj(n,d.layers[i].document);
  if(!x && document.getElementById) x=document.getElementById(n); return x;
}

function swapImage() {
  var i,j=0,x,a=swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function img_filetype_view() {
	img_views = "view_" + event.srcElement.name.split("file")[1];

	if(event.srcElement.value.match(/(.jpg|.jpeg|.gif|.png|.bmp|.pdf)$/))
	{
		document.images[img_views].src = event.srcElement.value;
		document.images[img_views].style.display = "";
	}
	else
	{
		document.images[img_views].style.display = "none";
	}
}

function namosw_cell_rollover(cell, classname) {
	if (document.all || document.getElementById) {
		cell.classBackup = cell.className;
		cell.className   = classname;
	}
}

function namosw_cell_rollout(cell)
{
	if (document.all || document.getElementById) {
		cell.className   = cell.classBackup;
	}
}

function showImageBox(){
	window.open("/image_box.jsp","ImageBox","width=800,height=600,resizable=yes,scrollbars=yes,toolbars=no");
}

function showFileBox(){
	window.open("/file_box.jsp","FileBox","width=800,height=600,resizable=yes,scrollbars=yes,toolbars=no");
}

function showImageUpload(table, page){
	window.open("/upload/image_upload.jsp?_tn_=" + table + "&_pn_=" + page,"ImageUpload","width=600,height=540,resizable=yes,scrollbars=yes,toolbars=no");
}

function showFileUpload(table, page){
	window.open("/upload/file_upload.jsp?_tn_=" + table + "&_pn_=" + page,"FileUpload","width=600,height=540,resizable=yes,scrollbars=yes,toolbars=no");
}


function toggle_layer(id){
	layer = document.getElementById(id);
	if(layer){
		if(layer.style.display == "none" || layer.style.display == ""){
			layer.style.display = "block";
		}else{
			layer.style.display = "none";			
		}
	}
}

function view_board(no){
	document.param_form.action = ID('iFormCommon').base.value + "/view";
	document.param_form._no_.value = no;
	document.param_form.submit();
}


//본문 내용에서 태그를 제외(정규식 이용)하기 위한 함수
function isAlNum(ch){
	return ("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(ch)==-1)?false:true;
}

function removeTagsRemove(str,tag){
	var op,tp,cp,lt,gt,copy;op=0,lt="&lt;",gt="&gt;";
	str=str.replace(/</g,"&lt;");
	str=str.replace(/>/g,"&gt;");
	str=str.replace(/\//g,"&#8260;");
	copy=str;
	str=str.toLowerCase();
	while((op=str.indexOf(lt+tag,op))!=-1){
		tp=str.substring(op+lt.length+tag.length,op+lt.length+tag.length+1)
		if(isAlNum(tp)) {op=op+lt.length+tag.length+1;continue;}
		if((cp=str.indexOf(lt+"&#8260;"+tag+gt,op))==-1){
			tp=str.indexOf(gt,op);
			str=str.substring(0,op)+str.substring(tp+4,str.length);
			copy=copy.substring(0,op)+copy.substring(tp+4,copy.length);
		}else{
			if((tag=="script")||(tag=="style")||(tag=="object")){
				tp=str.indexOf(gt,op);
				str=str.substring(0,op)+str.substring(cp+tag.length+9+6,str.length);
				copy=copy.substring(0,op)+copy.substring(cp+tag.length+9+6,copy.length);
			}else{
				tp=str.indexOf(gt,op);
				str=str.substring(0,op)+
					str.substring(tp+4,cp)+
					str.substring(cp+tag.length+9+6,str.length);
				copy=copy.substring(0,op)+
					copy.substring(tp+4,cp)+
					copy.substring(cp+tag.length+9+6,copy.length);				
			}
		}
	}
	return copy;
}

function removeTags(str,myTags){
	var tags=['!--','!doctype','isindex','script','blockquote','style','input','plaintext','body','colgroup','fieldset','frameset','multicol','noframes','noscript','optgroup','textarea','basefont','acronym','address','caption','comment','listing','marquee','noembed','nolayer','bgsound','applet','button','center','iframe','ilayer','legend','nextid','object','option','select','server','spacer','strike','strong','keygen','blink','embed','label','layer','small','table','tbody','tfoot','thead','title','param','frame','abbr','area','cite','code','font','form','head','html','menu','nobr','ruby','samp','span','base','link','meta','bdo','big','del','dfn','dir','div','ins','kbd','map','pre','sub','sup','var','xmp','img','col','wbr','br','dd','dl','dt','em','h1','h2','h3','h4','h5','h6','li','ol','rb','rp','rt','td','th','tr','tt','ul','hr','a','b','i','p','q','s','u'];

	if(myTags){
		for(var i=0;i<myTags.length;i++){
			for(var j=0;j<tags.length;j++){
				if(myTags[i]==tags[j]){
					tags.splice(j,1);
					break;
				}
			}
		}
	}

	for(var i=0;i<tags.length;i++){
		str=removeTagsRemove(str,tags[i]);
	}
	return str.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&#8260;/g,"\/");
}

function check_submit_diary(obj){

	var max_subject_len = 120;
	
	//웹에디터 사용중일때
	if(obj.use_html.checked){
		obj.pre_content.value = TextEditor.document.body.innerHTML;
		//obj.use_html.value = 1;
	}

	if(!obj.user_id.value){
		if(!obj.writer.value){
			alert('이름을 입력하세요.');
			obj.writer.focus();
			return false;
		}

		if(!obj.passwd.value){
			alert('비밀번호를 입력하세요.');
			obj.passwd.focus();
			return false;
		}
	}

	if(obj.pre_content.value.length == 0){
		alert("글 내용을 입력하세요."); 
		return false;
	}
	
	memo = obj.pre_content.value;
	pattern =/\[image\:(.+?)\.(jpg|gif)\,align\=([a-z]){0,}\,width\=([0-9]+)\,height\=([0-9]+)\,vspace\=([0-9]+)\,hspace\=([0-9]+)\,border\=([0-9]+)\]/g;
	
	memo = memo.replace(pattern, "");
	
	memo = removeTags(memo, '');
	
	if(memo.length < max_subject_len){
		obj.subject.value = memo;
	}else{
		obj.subject.value = memo.substring(0, max_subject_len);
	}
	
	return true;
}

function checkDiaryForm(form){
	
	//웹에디터 사용중일때
	var e = getFormElement(form, 'use_html');
	if(e && e.checked){
		e = getFormElement(form, 'pre_content');
		e.value = TextEditor.document.body.innerHTML;
	}

	if(!getFormValue(form, 'user_id')){
		if(!getFormValue(form, 'writer')){
			alert('이름을 입력하세요.');
			getFormElement(form, 'writer').focus();
			return false;			
		}

		if(!getFormValue(form, 'passwd')){
			alert('비밀번호를 입력하세요.');
			getFormElement(form, 'passwd').focus();
			return false;
		}
	}

	e = getFormElement(form, 'pre_content');
	if(e != null && e.value.length == 0){
		alert('글 내용을 입력하세요.');
		e.focus();
		return false;
	}
	
	return true;
}

function actionDiarySubmit(form){
	var maxSubjectLen = 120;
	
	if(checkDiaryForm(form) == false)
		return false;

	pattern =/\[image\:(.+?)\.(jpg|gif)\,align\=([a-z]){0,}\,width\=([0-9]+)\,height\=([0-9]+)\,vspace\=([0-9]+)\,hspace\=([0-9]+)\,border\=([0-9]+)\]/g;

	memo = getFormValue(form, 'pre_content');	
	memo = memo.replace(pattern, "");	
	memo = removeTags(memo, '');
	
	var s = getFormElement(form, 'subject');
	if(memo.length < maxSubjectLen){
		s.value = memo;
	}else{
		s.value = memo.substring(0, maxSubjectLen);
	}
	
	e = getFormElement(form, 'use_crypto');
	
	/* content 암호화 */
	if(e && e.checked){
		var commForm = ID('iFormCommon');
		var key = GenerateKey();
		
		var c = getFormElement(form, 'pre_content');
		c.value = EncryptTEA(key, c.value);
		
		modulus = getFormValue(commForm, 'm');
		exponent = getFormValue(commForm, 'e');
		eKey = EncryptRSA(modulus, exponent, key);
		
		e = getFormElement(form, 'key');
		e.value = eKey;			
	}
	
	return true;
}


//글쓰기에서 미리보기를 클릭한 경우 처리...
function page_preview_diary(obj, mode){

	if(check_submit_diary(obj)){
		obj.pre_mode.value = mode;	// 이전 모드 값을 현재 모드로 변경해야 한다.
		obj.action = ID('iFormCommon').base.value + "/process/preview";
		obj.submit();
	}
}
