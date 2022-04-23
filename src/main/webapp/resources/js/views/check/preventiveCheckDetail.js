/** Copyright (c) 2017 VertexID RND, Inc.
 * 
 * Application Name : 예방점검[preventiveCheck]
 * Program Code     : PC0700
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * MINE 김선호		2017. 11. 23. 		First Draft.        javascript
 */
var PreventiveCheckDetailApp = function () {
	"use strict";
	
	/************************************************
	 *전역 객체 선언부 (return 상위부분에 선언해야함)
	 ************************************************/
	
	// [El]권역정보 그리드
	var $preventiveCheckGrid = $("#preventiveCheckGrid");
	// 서명 등록 시(Javscript 용) 필요.
	// SignaturePad js가 로드 된 이 후 해당 Api를 불러야 오류가 나지 않음.
	var canvas = $('#check-signature-engr-pad canvas')[0];
	var sign = new SignaturePad(canvas, {
		backgroundColor: 'rgb(255, 255, 255)'
	});
	var canvas2 = $('#check-signature-mng-pad canvas')[0];
	var sign2 = new SignaturePad(canvas2, {
		backgroundColor: 'rgb(255, 255, 255)'
	});
	var touchId = '';
	var dupTouchId = '';
	var backTouchId = '';
	var dupTouchCheck = '';
	var modCount = 0;
	var modVal = '';
	var modVal2 = '';

	var obsFlagSelect;
	var searchData; //검색조건 배열
	
	var compCd = '';
	
	//서명
	$.fn.outerHTML = function() {
	    var el = $(this);
	    if( !el[0] ) return "";
	 
	    if (el[0].outerHTML) {
	        return el[0].outerHTML;
	    } else {
	        var content = el.wrap('<p/>').parent().html();
	        el.unwrap();
	        return content;
	    }
	}
	
	var engrSignTag = $('#preventiveCheckViewEngrAfterSignNew + button').outerHTML();
	var mngSignTag = $('#preventiveCheckViewMngAfterSignNew + button').outerHTML();
	
	return {
        init: function () {
        	
        	//장애여부SELECTBOX
        	fnObsFlagSelectBox();
        	
        	//예방점검 Event
        	fnPreventiveCheckEvents();
        	
        	//예방점검 Grid생성
        	fnListPreventiveCheck();

        	//서명 Canvas 초기화
        	fnCanvasInit();
        	
        	fnGetCompNameList(); //고객사
        	
	    }
    };
    
    //[Fn] 이벤트 
    function fnPreventiveCheckEvents(){
    	
    	//검색 버튼
    	$("#preventiveCheckSearchBtn").click(function(){
    		fnPreventiveCheckSearch();
			modCount = 0;
    	});
    	
    	//달력 폼
		toDateSetEvent();
	
		// 엔지니어 서명 등록 버튼 이벤트
		$(document).on('click', '#openEngrSignDialog', function(){
			var signDivVal = $('#preventiveCheckViewEngrAfterSignNew').text().legnth;
			if(signDivVal != undefined &&  signDivVal != 0){
				if(confirm('기존 사인을 수정하시겠습니까?')){
					$('#check-signature-engr-pad').show();
					resizeCanvas();
				}
			}else{
				$('#check-signature-engr-pad').show();
				resizeCanvas();
			}
			$("body").scrollTop(0);
		});
		// 점포담당자 서명 등록 버튼 이벤트
		$(document).on('click', '#openMngSignDialog', function(){
			var signDivVal = $('#preventiveCheckViewMngAfterSignNew').text().legnth;
			console.log(signDivVal);
			if(signDivVal != undefined &&  signDivVal != 0){
				if(confirm('기존 사인을 수정하시겠습니까?')){
					$('#check-signature-mng-pad').show();
					resizeCanvas2();
				}
			}else{
				$('#check-signature-mng-pad').show();
				resizeCanvas2();
			}
			$("body").scrollTop(0);
		});
		
		//Browser Window Resize Event <-- Sign Canvas에 필요한 이벤트
		$(window).on("resize", function(){
			resizeCanvas();
		});
		
		//엔지니어 서명 초기화
		$("#signClearBtn").click(function () {
			sign.clear();
		});
		
		//담당자 서명 초기화
		$("#signClearBtn-mng").click(function () {
			sign2.clear();
		});
		
		//엔지니어 서명 숨김
		$("#signCloseEngrBtn").click(function () {
			$('#check-signature-engr-pad').hide();
		});
		
		//담당자 서명 숨김
		$("#signCloseMngBtn").click(function () {
			$('#check-signature-mng-pad').hide();
		});
		
		//서명등록(엔지니어 서명완료)
		$("#signSaveEngrBtn").click(function () {
			if (sign.isEmpty()){
				alert("사인이 되지 않았습니다.");
				return false;
			}
			$('#preventiveCheckViewEngrAfterSignNew').empty();$('#openEngrSignDialog').remove();
			$('#preventiveCheckViewEngrAfterSignNew').append(
					'<input type="hidden" id="preventiveCheckViewEngrSignFlag" value="1" />'
				+	'<button type="button" id="removeEngrSignDialog" class="btn btn-sm btn-error"><i class="fa fa-eraser">엔지니어 서명 등록취소</i></button>'
				);
    		$("#check-signature-engr-pad").hide();
    		$("body").scrollTop($(document).height());
		});
		
		//서명등록(점포담당자 서명완료)
		$("#signSaveMngBtn").click(function () {
			if (sign2.isEmpty()){
				alert("사인이 되지 않았습니다.");
				return false;
			}
			$('#preventiveCheckViewMngAfterSignNew').empty();$('#openMngSignDialog').remove();
			$('#preventiveCheckViewMngAfterSignNew').append(
					'<input type="hidden" id="preventiveCheckViewMngSignFlag" value="1" />'
				+	'<button type="button" id="removeMngSignDialog" class="btn btn-sm btn-error"><i class="fa fa-eraser">점포담당자 서명 등록취소</i></button>'
				);
    		$("#check-signature-mng-pad").hide();
    		$("body").scrollTop($(document).height());
    		
		});
		
		//서명취소(엔지니어 서명 취소)
		$(document).on('click', '#removeEngrSignDialog', function(){
			alert('엔지니어 서명이 취소되었습니다.');
			$('#preventiveCheckViewEngrAfterSignNew').empty();
			$('#preventiveCheckViewEngrAfterSignNew').append(engrSignTag);
		});
		
		//서명취소(담당자 서명 취소)
		$(document).on('click', '#removeMngSignDialog', function(){
			alert('점포담당자 서명이 취소되었습니다.');
			$('#preventiveCheckViewMngAfterSignNew').empty();
			$('#preventiveCheckViewMngAfterSignNew').append(mngSignTag);
		});
		
		//점검완료
		$('#preventiveCheckDetailSaveBtn').click(function(){
			if(confirm('정검은 완료하시겠습니까?')){
				fnSaveGrid();
			}
		});
		
		//점검 취소(그리드 및 파일 및 서명 초기화)
		$('#preventiveCheckDetailCancelBtn').click(function(){
			$preventiveCheckGrid.paragonGridReload();
			fnCheckValInit();
		});
		
		//자산변경버튼 클릭
		$('#preventiveCheckDetailModifyBtn').bind('click', function(){
			fnAssetModify();
		});
		
       	//브랜드 조회
    	$("#preventiveCheckBrndNm").combobox();
    	//고객사 선택시 브랜드 조회
    	$("#preventiveCheckCompNm").change(function(){
        	compCd = $(this).val();
    		MMSUtil.fnMakeBrndCombo($("#preventiveCheckBrndNm"), $(this).val(), '', '선택');
    	});
    	
       	//점포 조회
    	$("#preventiveCheckStrNm").combobox();
    	//고객사 및 브랜드 선택시 점포 조회
    	$("#preventiveCheckBrndNm").change(function(){
    		MMSUtil.fnMakeStrCombo($("#preventiveCheckStrNm"), compCd, $(this).val(), '선택');
    	});
    	
    	//유의사항 팝업
    	$('#preventiveCheckPop').click(function(){
    		
        	var	gridData = $preventiveCheckGrid.getRowData();
    		if(gridData.length == 0){
    			alert('점포를 검색해주세요');
    			return false;
    		}
    		gridData = gridData[0].ASP_COMP_CD;
    		
    		fnPreventiveCheckView(gridData);
    	});
		
    }
    
    function fnSaveGrid(){
    	//그리드체크 확인
//		var rowid= $preventiveCheckGrid.jqGrid('getGridParam','selrow');
        var ids = $preventiveCheckGrid.jqGrid('getDataIDs'); //JQGrid INDEX값
        $.each(ids, function (index, value) {  //row의 index와 JQGrid INDEX 비교
        	var idx = value;
        	$preventiveCheckGrid.jqGrid('saveRow', idx, false, 'clientArray');
        	$preventiveCheckGrid.jqGrid('setCell', idx, 'MOD_CHECK', '<i class="fa fa-repeat" />');
        	$preventiveCheckGrid.jqGrid('setCell', idx, 'MOD_FLAG', 'UPDATE');
        });
        
		//첨부파일 업로드 확인
//		if(!fnSaveFileUpload()){
//			return false;
//		}
		
		// 선택행 데이터
		var date = new Date();
		var today = date.getFullYear() + "_" + date.getMonth() + "_" + date.getDate();

		var strNm = $preventiveCheckGrid.getRowData(1).STR_NM;
		var strCd = $preventiveCheckGrid.getRowData(1).STR_CD
		//첨부파일 및 서명 파일명 및 경로
		var fileNm = '예방점검완료_'+strNm+'_첨부파일';
		var engrSignFileNm = '예방점검완료_'+strNm+'_점검자_서명파일';
		var managerSignFileNm = '예방점검완료_'+strNm+'_관리자_서명파일';
		
		//서명파일 형식 저장
		var dataURL = sign.toDataURL('image/png');		var blob = dataURItoBlob(dataURL);
		var dataURL = sign2.toDataURL('image/png');		var blob2 = dataURItoBlob(dataURL);
		
		if($('#preventiveCheckViewEngrSignFlag').val() == undefined){
			alert('엔지니어 서명이 없습니다.');
			return false;
		}
		if($('#preventiveCheckViewMngSignFlag').val() == undefined){
			alert('점포담당자 서명이 없습니다.');
			return false;
		}
		
		//Param Data
		var formData = new FormData();
		
		if($('#preventiveCheckAddFile')[0].files[0] != undefined){
			formData.append('attach',$('#preventiveCheckAddFile')[0].files[0]);
		}
		formData.append('mngSign', blob, engrSignFileNm+ ".png");
		formData.append('engrSign', blob2, managerSignFileNm+ ".png");
		formData.append('strCd', strCd);
		
		var rowData = {
						astSeq		: "AST_SEQ",
						strCd		: "STR_CD",
						prdCd		: "PRD_CD",
						obsYn		: "OBS_YN",
						obsMemo		: "OBS_MEMO"
		};
		
		var jsonData = $preventiveCheckGrid.getGridData(rowData);
		
		var data = {
				dt_data : jsonData,
				strCd	: strCd
		}
		console.log(data);
		$.ajax({
			 url: "/ctrl/preventiveCheck/preventiveCheckDetail/completePreventiveCheckDetail",
			 data: JSON.stringify(data),
			 dataType: 'JSON',
//			 processData: false,
//			 contentType: false,
             contentType: 'application/json; charset=utf-8',
			 type: 'POST',
			 success: function (result) {
			 	 formData.append('checkSeq', result.checkSeq);
			 	 
				 $.ajax({
					 url : "/ctrl/preventiveCheck/preventiveCheckDetail/completePreventiveCheckDetailFile",
					 data: formData,
					 processData: false,
					 contentType: false,
					 success : function(result){
						$preventiveCheckGrid.paragonGridReload();
						$('#preventiveCheckViewEngrAfterSignNew').empty();
						$('#preventiveCheckViewEngrAfterSignNew').append(engrSignTag);
						$('#preventiveCheckViewMngAfterSignNew').empty();
						$('#preventiveCheckViewMngAfterSignNew').append(mngSignTag);
//							//브라우저마다 다를수있음
//							$('#preventiveCheckAddFile').val("");
						var $el = $('#preventiveCheckAddFile');
						$el.wrap('<form>').closest('form').get(0).reset();
						$el.unwrap();
						console.log('서명완료');
						fnCheckValInit();
						$preventiveCheckGrid.paragonGridReload();
					 }
				 })
			 }
		});
    }
    
    //첨부파일 확장자 확인
	function checkFileType(filePath) {
		   var fileFormat = filePath.split(".");
		   if (fileFormat.indexOf("txt") > -1) {
		       return true;
		   }else if(fileFormat.indexOf("png") > -1){
		       return true;
		   }else if(fileFormat.indexOf("gif") > -1){
		       return true;
		   }else if(fileFormat.indexOf("jpg") > -1){
		       return true;
		   }else{
		       return false;
		   }
	}
    
    //첨부파일 업로드
    function fnSaveFileUpload(){
		 var file = $("#preventiveCheckAddFile").val();
		 if (file == "" || file == null) {
		     alert("파일을 선택해주세요.");
		     return false;
		 } else if (!checkFileType(file)) {
		     alert("파일만 업로드 가능합니다.");
		     return false;
		 }
		 return true;
    }
    
    //예방점검 유의사항 조회
    function fnPreventiveCheckView(aspCompCd){
		var strCd	= $('#preventiveCheckStrNm').val()
        PopApp.paragonOpenPopup({
            ajaxUrl : '/ctrl/preventiveCheck/preventiveCheckDetail/notice',
            id : 'prventiveCheckNoticePop',
            data : {	
        			"strCd" 	: strCd,
        			"aspCompCd"	: aspCompCd
            		},
            width : '1000px',
            title : "예방점검 유의사항",
            onload : function(modal) {
                modal.show();
            }
        });
    };
    
    /********************************************************************
     * 자산관리 그리드 생성
     * Since   : 2017-11-15
     * 작성자  : 김 선호
     * 수정내역: 
     ********************************************************************/
    //[Fn] jqgrid 예방점검 목록 
    function fnListPreventiveCheck(){
    	$preventiveCheckGrid.paragonGrid({
        	url: '/ctrl/preventiveCheck/preventiveCheckDetail/getPreventiveCheckDetailList',
        	rowEditable:true,
			rownumbers: true,
			rowNum : 1000,
			rowList : [1000],
			height: '200px',
			caption:"예방점검",
			shrinkToFit	: false,
			sortable:true,
			datatype : "local",
			colNames : ["자산번호","파트너사코드","고객사코드","브랜드코드","점포코드", "품목코드", "자산상태", "자산상태명",
			            "고객사","브랜드", "점포명", "제품범주", "제품군", "제조사","모델명","SPEC","POS번호","위치","시리얼","정상유무","메모"],
			colModel : [ 
	            {name : 'AST_SEQ', hidden : true}, 						//자산번호
	            {name : 'ASP_COMP_CD', align:"center", hidden:true},	//파트너사코드  
	            {name : 'COMP_CD', align:"center", hidden : true},		//고객사코드
	            {name : 'BRND_CD', align:"center", hidden : true},		//브랜드코드
	            {name : 'STR_CD', align:"center", hidden : true},		//점포코드
	            {name : 'PRD_CD', align:"center", hidden : true},		//품목코드
	            {name : 'AST_ST', align:"center", hidden : true},		//자산상태
	            {name : 'AST_ST_NM', align:"center", hidden : true},		//자산상태명
	            {name : 'COMP_NM', align:"center", width:"100px"},						//고객사	            
	            {name : 'BRND_NM', align:"center", width:"100px"},						//브랜드
	            {name : 'STR_NM', align:"center", width:"100px"},        				//점포명
	            {name : 'PRD_TYPE_LV1_NM', align:"center", width:"100px"},				//제품범주  
	            {name : 'PRD_TYPE_LV2_NM', align:"center", width:"100px"},				//제품군
	            {name : 'PRD_TYPE_LV3_NM', align:"center", width:"100px"},				//제조사  
	            {name : 'PRD_NM', align:"center", width:"200px"},						//모델명
	            {name : 'PRD_SPEC', align:"center", width:"200px"},					//제품규격
	            {name : 'AST_TYPE2', align:"center", width:"100px"},		//포스번호
	            {name : 'AST_TYPE1', align:"center", width:"100px"},		//위치정보
	            {name : 'AST_SERIAL', align:"center", width:"100px"},					//시리얼
	            {name : 'OBS_YN', align:"center", width: "100px", editable: true, 
	            	edittype:'select',
	            	formatter:'select',
			    	editoptions: {
			    		value : obsFlagSelect
			    	}
	            },         					//정상유무
	            {name : 'OBS_MEMO', align:"center", editable: true},					//메모
			],
            pager: "#preventiveCheckGridNavi",
            domainId : "예방점검",
            loadComplete: function () {
                var $this = $(this), rows = this.rows, l = rows.length, i, row;
                for (i = l-1; i >= 0; i--) {
                    row = rows[i];
                    if ($.inArray('jqgrow', row.className.split(' ')) >= 0) {
                        $this.jqGrid('editRow', row.id, true);
                    }
                }
            },
    		ondblClickRow	: function(id, iRow, iCol, e){
    			e.preventDefault();
    		}
        });
	}
    
    //[Fn] dataURL -> Blob으로 변환
    function dataURItoBlob(dataURI) {
    	var byteString;
    	if(dataURI.split(',')[0].indexOf('base64') >= 0){
    		byteString = atob(dataURI.split(',')[1]);
    	}
    	else{
    		byteString = unescape(dataURI.split(',')[1]);
    	}
    	
    	var mimeTypeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    	console.log("mimetype : "+mimeTypeString);
    	var ia = new Uint8Array(byteString.length);
    	for (var i = 0; i < byteString.length; i++) {
    		ia[i] = byteString.charCodeAt(i);
    	}
    	
    	return new Blob([ia], {type:mimeTypeString});
    }

    //[Fn]Canvas 초기화 <-- 수정 필요 없음.
    function fnCanvasInit(){
		
    }
    
    //[Fn]Canvas Resize <-- 수정 필요 없음.
	function resizeCanvas(){

		var ratio =  Math.max(window.devicePixelRatio || 1, 1);
		canvas.width = canvas.offsetWidth * ratio;
//		console.log("canvas.width : "+canvas.width);
		canvas.height = canvas.offsetHeight * ratio;
//		console.log("canvas.height : "+canvas.height);
		canvas.getContext("2d").scale(ratio, ratio);
		
		sign.clear();
	}
	
    //[Fn]Canvas Resize <-- 수정 필요 없음.
	function resizeCanvas2(){

		var ratio =  Math.max(window.devicePixelRatio || 1, 1);
		canvas2.width = canvas2.offsetWidth * ratio;
//		console.log("canvas.width : "+canvas.width);
		canvas2.height = canvas2.offsetHeight * ratio;
//		console.log("canvas.height : "+canvas.height);
		canvas2.getContext("2d").scale(ratio, ratio);
		
		sign2.clear();
	}

	//datepicker Set up today.
    function toDateSetEvent() {
        $("#preventiveCheckDateDt").datepicker({
        	todayHighlight: true, 
        	autoclose: true
        });
        $("#preventiveCheckDateDt").datepicker("setDate" , new Date());
    }
    
    //검색(엔터, 버튼)
    function fnPreventiveCheckSearch(){
    	var searchStrNm = $("#preventiveCheckStrNm").val().trim();
    	if(!searchStrNm){
    		alert('점포를 입력해주세요');
    		return false;
    	}
    	
		var searchData = {
				compCd		: $("#preventiveCheckCompNm").val(),
				brndCd		: $("#preventiveCheckBrndNm").val(),
				strCd		: $("#preventiveCheckStrNm").val(),
		};
		$preventiveCheckGrid.paragonGridSearch(searchData);
    }
    
    $preventiveCheckGrid.jqGrid("setFrozenColumns");

    function fnObsFlagSelectBox(cellValue){
    	$.ajax({
    		url : "/ctrl/preventiveCheck/preventiveCheckDetail/getPrventiveCheckObsFlag",
    		type : "POST",
    		dataType : "json",
    		cache: false,
    		async:false,
    		success : function(result) {
    			obsFlagSelect = Util.MakeGridOptions(result);
			}
    	});
    }
    
    //터치로직 변수 초기화
    function fnCheckValInit(){
    	touchId = '';
    	dupTouchId = '';
    	backTouchId = '';
    	dupTouchCheck = '';
    	modCount = 0;
    	modVal = '';
    	modVal2 = '';
    }
    
    //자산변동 버튼
    function fnAssetModify(){
		var rowid= $preventiveCheckGrid.jqGrid('getGridParam','selrow');
		
		if(rowid == "" || rowid == undefined){
			alert("자산이 선택되지 않았습니다. 자산 목록의 내용(행)을 선택 후 다시 클릭해주세요");
			return false;
		}
		
		// 선택행 데이터
		var rowData = $preventiveCheckGrid.getRowData( rowid );

		// 선택행 데이터 AST_SEQ
		var sendData = {
				"astSeq"	:	rowData.AST_SEQ,
				"astSt"		:	rowData.AST_ST,
				"astStNm"	:	rowData.AST_ST_NM,
				"aspCompCd" : 	rowData.ASP_COMP_CD
		}
		
		PopApp.paragonOpenPopup({
    		ajaxUrl: '/ctrl/asset/asset/addAssetManagerPopup',
    		data:{"sendData": sendData},
    		id: 'AssetManagerPopup',
    		width: '700px',	 
    		height: '500px',
    		btnName:"수정",
    		title :"자산 수정",
    		onload:function(modal){
    			modal.show();
	    		modal.css({
	    			"overflow-y": "scroll"
	    		});
    		}
		});
	};
	
	function fnTouchGrid($this){
		dupTouchId = $this.getGridParam( "selrow" );   
		
		var lastRowData = $this.getRowData(dupTouchId);
		var lastModCheck = lastRowData.MOD_CHECK;
		
		//처음 -> 수정
		if(modCount == 0){
			$this.jqGrid('editRow', dupTouchId, true, 'clientArray');
			modCount = 1;
			backTouchId = dupTouchId;
			modVal = $this.getRow('','OBS_YN','')+', '+$this.getRow('','OBS_MEMO',''); 
			return false;
		}
		//수정 -> 저장(변경 있음과 변경없음)
		if(modCount == 1){
			modVal2 = $this.getRow('','OBS_YN','')+', '+$this.getRow('','OBS_MEMO',''); 
			
			if(modVal != modVal2){ //저장(데이터변경시)
				$this.jqGrid('saveRow', dupTouchId, false, 'clientArray');
				$this.jqGrid('setCell', dupTouchId, 'MOD_CHECK', '<i class="fa fa-repeat" />');
				$this.jqGrid('setCell', dupTouchId, 'MOD_FLAG', 'UPDATE');
				touchId = dupTouchId;
				modCount = 2;
				return false;
			}else{ //수정 -> 행초기화(변경없음)
				if(touchId == '' || touchId == dupTouchId){ //변경없이저장, 초기화
					$this.jqGrid('restoreRow', dupTouchId, false);
					fnCheckValInit();
					return false;
				}else{ //수정모드에서 다른 쎌 더블클릭(기존수정->초기화, 다른행 수정모드)
					$this.jqGrid('restoreRow', backTouchId, false);
					$this.jqGrid('editRow', dupTouchId, false, 'clientArray');
					modCount = 1;
					return false;
				}

			}
		}
		console.log(dupTouchId);
		
		if(modCount == 2){
				if(touchId == dupTouchId){ //저장모드(recycle)인 행 더블클릭
					$('tr[id='+dupTouchId+'] > td[aria-describedby=preventiveCheckGrid_MOD_CHECK]').empty();
					$('tr[id='+dupTouchId+'] > td[aria-describedby=preventiveCheckGrid_MOD_FLAG]').empty();
					$this.jqGrid('editRow', dupTouchId, false, 'clientArray');
					modCount = 1;
					return false;
				}else{ //저장모드아닌 행 더블클릭
					$this.jqGrid('saveRow', backTouchId, false, 'clientArray');
					fnCheckValInit();
					modCount = 0;
					fnTouchGrid($preventiveCheckGrid);
					return false;
				}	
		}
	}
	
    //고객사 목록 조회
    function fnGetCompNameList(){
    	$('#preventiveCheckCompNm').combobox();
    	MMSUtil.fnMakeCompCombo($('#preventiveCheckCompNm'), '', '선택');
    }

}();

$(document).ready(function() {
	PreventiveCheckDetailApp.init();
});


