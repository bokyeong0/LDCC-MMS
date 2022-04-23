(function($) {
	$.fn.prdAutoComplate = function(options) {
		var $that = $(this);
		return this.each( function() {
			var p = $.extend(true,{
				serviceUrl:'/ctrl/standard/product/listAutoPrd',
				minChars:2,
				paramName: 'keyWord',
				zIndex: 9999,
				noCache: true, 
				type: "POST",
				dataType: "json",
				onSelect: function(result){
					var prdCd = result.PRD_CD;		//품번
					var prdNm = result.PRD_NM;		//품명
					var prdSpec = result.PRD_SPEC;	//규격
					var prdTLv1 = result.PRD_TYPE_LV1; //제품범주 
					var prdTLv2 = result.PRD_TYPE_LV2; //제품군 					
					$(options.prdCdId).val(prdCd);	
					$(options.prdNmId).val(prdCd+" ["+prdNm+' '+prdSpec+"]"); // 품명 [규격]
				//	if($(options.prdTLv2 +" option").size() > 1){ //장애유형 정보가 있는경우 처리
						$(options.prdTLv1).val(prdTLv1) //장애유형> 제품범주선택
						MMSUtil.fnMakeObsRcptComboEtc($(options.prdTLv2), "", prdTLv1, "", "제품군", prdTLv2);
						MMSUtil.fnMakeObsRcptComboEtc($(options.obsLv3), "", prdTLv2, "", "장애구분", "");
	
				//	}
				}
			},  options );
			
			$(this).autocomp(p);
		});
	};
	/**
	 * Site자동 완성
	 */
	$.fn.strAutoComplate = function(options) {
		return this.each( function() {
			var p = $.extend(true,{
				serviceUrl:'/ctrl/standard/store/listAutoStr',
				minChars:2,
				paramName: 'keyWord',
				params:{},
				zIndex: 9999,
				deferRequestBy: 100,
				noCache: true, 
				type: "POST",
				dataType: "json",
			},  options );
			$(this).autocomp(p);
		});
	};
	/**
	 * Comp자동 완성
	 */
	$.fn.compAutoComplate = function(options) {
		return this.each( function() {
			var p = $.extend(true,{
				serviceUrl:'/ctrl/standard/company/listAutoComp',
				minChars:2,
				paramName: 'keyWord',
				params:{callYn:options.callYn},
				zIndex: 9999,
				noCache: true, 
				type: "POST",
				dataType: "json",
			},  options );
			$(this).autocomp(p);
		});
	};
	/**
	 * 고객사 사용자관리->사용자팝업 내 고객사 자동 완성
	 */
	$.fn.customerAutoComplate = function(options) {
		return this.each( function() {
			var p = $.extend(true,{
				serviceUrl:'/ctrl/settings/user/listAutoCustomer',
				minChars:2,
				paramName: 'keyWord',
				zIndex: 9999,
				noCache: true, 
				type: "POST",
				dataType: "json",
			},  options );
			$(this).autocomp(p);
		});
	};	
	/**
	 * Site자동 완성
	 */
	$.fn.strInAssetAutoComplete = function(options) {
		return this.each( function() {
			var p = $.extend(true,{
				serviceUrl:'/ctrl/standard/store/listAutoStrInAsset',
				minChars:2,
				paramName: 'keyWord',
				zIndex: 9999,
				deferRequestBy: 100,
				noCache: true, 
				type: "POST",
				dataType: "json",
			},  options );
			
			$(this).autocomp(p);
		});
	};
	/**
	 * 점포명 자동 완성
	 */
	$.fn.strNmAutoComplate = function(options) {
		return this.each( function() {
			var p = $.extend(true,{
				serviceUrl:'/ctrl/standard/store/listAutoStrNm',
				minChars:2,
				paramName: 'keyWord',
				params:{compCd:options.compCd, brndCd:options.brndCd},
				zIndex: 9999,
				deferRequestBy: 100,
				noCache: true, 
				type: "POST",
				dataType: "json",
			},  options );
			$(this).autocomp(p);
		});
	};
	
	/**
	 * 품목 자동 완성
	 */
	$.fn.prdInAssetAutoComplate = function(options) {
		var that = $(this);
		var brndNm =  options.brndNm;
		return this.each( function() {
			var p = $.extend(true,{
				serviceUrl:'/ctrl/standard/product/listAutoPrdInBrnd',
				minChars:2,
				paramName: 'keyWord',
				params:{
					brndNm	:	brndNm
				},				
				zIndex: 9999,
				noCache: true, 
				type: "POST",
				dataType: "json",
			},  options );
			$(this).autocomp(p);
		});
	};	
	
	
	
}(jQuery));


var MMSUtil = function () {
	"use strict";
	return {
		fnMakeCompBootCombo: function (target, compCate,compType, select, first) {
			var params = {
					compCate : compCate,
					compType : compType
			};
			$.ajax({
				url : "/ctrl/standard/company/listCompany",
				data : params,
				type : "POST",
				dataType : "json",
				cache : false,
				success : function(result) {
					var json = result.dt_grid;
					target.html("");
					var option = $("<option value='' />");
					option.text(first)
					target.append(option);
					for (var i = 0; i < json.length; i++) {
						var thisValue = json[i].COMP_CD;
						var thisName = json[i].COMP_NM;
						var option = $("<option>", {value : thisValue,selected:select == thisValue});
						option.text(thisName)
						target.append(option);
					}
					target.combobox();
					if(popUpData){
						target.data('combobox').setVal(popUpData.compCd);
					}else{
						target.data('combobox').refresh();
					}
				}
			});
		},
		
		fnMakePrdCombo: function (target, prdTypePrtCd, prdTypeLv, select) {
			$.ajax({
				url : "/ctrl/standard/product/type/listPrdComboJson",
				data :{
					prdTypePrtCd : prdTypePrtCd,
					prdTypeLv : prdTypeLv,
				},
				type : "POST",
				dataType : "json",
				cache: false,
				success : function(result) {
					var json = result.dt_grid;
					
					Util.MakeSelectOptions(target, json, select, "선택");
				}
			});
		},
		
		fnMakeMfrCombo: function (target, prdTypePrtCd, prdTypeLv, select) {
			$.ajax({
				url : "/ctrl/standard/product/type/listMfrComboJson",
				data :{
					prdTypePrtCd : prdTypePrtCd,
					prdTypeLv : prdTypeLv,
				},
				type : "POST",
				dataType : "json",
				cache: false,
				success : function(result) {
					var json = result.dt_grid;
					
					Util.MakeSelectOptions(target, json, select, "선택");
				}
			});
		},
		
		fnMakeObjstacleLv1Combo: function (target,select,first) {
	    	$.ajax({
	    		url : "/ctrl/standard/product/type/listStndPrdTypeLv1",    		
	    		type : "POST",
	    		cache: false,
	    		success : function(result) {
	    			var json = result.dt_grid;
					target.html("");
					if(first){
						var option = $("<option value='' />");
						option.text(first)
						target.append(option);
					}					
					for (var i = 0; i < json.length; i++) {
						var thisValue = json[i].PRD_TYPE_CD;
						var thisName = json[i].PRD_TYPE_NM;
						var option = $("<option>", {value : thisValue,selected:select == thisValue});
						option.text(thisName)
						target.append(option);
					}
					
	    		}
	    	});
		},
		//파트너사 SelectBox
		fnMakePartnerCombo: function (target,aspCompCd, first) { //장애접수> 처리내역 > 파트너사
	    	$.ajax({
	    		url : "/ctrl/asp/company/listMaAspCompName",    		
				data :{aspCompCd:aspCompCd},
	    		type : "POST",
	    		cache: false,
	    		success : function(result) {
	    			var result = result.dt_grid;
	    			if(aspCompCd){
	    				first = '';    
	    			}else if(!first){
						first = "선택";
					}
	    			
	    			if(target.data('combobox')){
						Util.MakeBootstrapSelectBox(target,result,first,aspCompCd);
					}else{
						Util.MakeSelectOptions(target,result,aspCompCd,first);
					}
	    		}
	    	});
		},
		//파트너사 SelectBox
		fnMaMakePartnerCombo: function (target,aspCompCd, first) { //장애접수> 처리내역 > 파트너사
	    	$.ajax({
	    		url : "/ctrl/asp/company/listMaAspCompName",    		
				data :{aspCompCd:aspCompCd},
	    		type : "POST",
	    		cache: false,
	    		success : function(result) {
	    			var result = result.dt_grid;
	    			if(aspCompCd){
	    				first = '';
	    			}else if(!first){
						first = "선택";
					}
	    			
	    			if(target.data('combobox')){
						Util.MakeBootstrapSelectBox(target,result,first,aspCompCd);
					}else{
						Util.MakeSelectOptions(target,result,aspCompCd,first);
					}
	    		}
	    	});
		},
		
		//고객사 SelectBox
		fnMakeCompCombo: function (target, compCd, first) {
			$.ajax({
				url : "/ctrl/standard/company/listMaCompName",    		
				data :{compCd:compCd},
				type : "POST",
				cache: false,
				success : function(result) {
					var result = result.dt_grid;
					
					if(!first){
						first = "선택";
					}
					
					if(target.data('combobox')){
						Util.MakeBootstrapSelectBox(target,result,first,compCd);
					}else{
						Util.MakeSelectOptions(target,result,compCd,first);
					}
				}
			});
		},

		//고객사 SelectBox
		fnMakeMaCompCombo: function (target, compCd, first) {
			$.ajax({
				url : "/ctrl/standard/company/listMaCompName",    		
				data :{compCd:compCd},
				type : "POST",
				cache: false,
				success : function(result) {
					var result = result.dt_grid;
					
					if(!first){
						first = "선택";
					}
					
					if(target.data('combobox')){
						Util.MakeBootstrapSelectBox(target,result,first,compCd);
					}else{
						Util.MakeSelectOptions(target,result,compCd,first);
					}
				}
			});
		},
		
		//브랜드 SelectBox
		fnMakeBrndCombo: function (target, compCd, brndCd, first) {
			$.ajax({
				url : "/ctrl/standard/company/listBrandName",    		
				data :{
						compCd:compCd,
						brndCd:brndCd,
					  },
				type : "POST",
				cache: false,
				success : function(result) {
					var result = result.dt_grid;
					
					if(!first){
						first = "선택";
					}
					
					if(target.data('combobox')){
						Util.MakeBootstrapSelectBox(target,result,first,brndCd);
					}else{
						Util.MakeSelectOptions(target,result,brndCd,first);
					}
				}
			});
		},
		
		//브랜드 SelectBox
		fnMakeMaBrndCombo: function (target, compCd, brndCd, first) {
			$.ajax({
				url : "/ctrl/standard/company/listMaBrandName",    		
				data :{
						compCd:compCd,
						brndCd:brndCd,
					  },
				type : "POST",
				cache: false,
				success : function(result) {
					var result = result.dt_grid;
					
					if(!first){
						first = "선택";
					}
					
					if(target.data('combobox')){
						Util.MakeBootstrapSelectBox(target,result,first,brndCd);
					}else{
						Util.MakeSelectOptions(target,result,brndCd,first);
					}
				}
			});
		},
		//점포 SelectBox
		fnMakeStrCombo: function (target, compCd, brndCd, first) {
			$.ajax({
				url : "/ctrl/standard/company/listStrName",    		
				data :{
						compCd:compCd,
						brndCd:brndCd,
					  },
				type : "POST",
				cache: false,
				success : function(result) {
					var result = result.dt_grid;
					
					if(!first){
						first = "선택";
					}
					
					if(target.data('combobox')){
						Util.MakeBootstrapSelectBox(target,result,first);
					}else{
						Util.MakeSelectOptions(target,result,'',first);
					}
				}
			});
		},
		
		//파트너사 부서
		fnMakeAreaCombo: function (target, select, aspCompCd, first, checkUseY) { //장애접수> 처리내역 > 담당부서
			var sendData = {aspCompCd:aspCompCd};
			if(checkUseY !== undefined && checkUseY) sendData.useYn = 'Y';
	    	$.ajax({
	    		url : "/ctrl/standard/area/listStndAreaName",    		
				data : sendData,
	    		type : "POST",
	    		cache: false,
	    		success : function(result) {
	    			var result = result.dt_grid;
	    			
	    			if(!first){
	    				first = "담당부서";
	    			}
	    			
					if(target.data('combobox')){
						Util.MakeBootstrapSelectBox(target,result,first,select);
					}else{
	    				Util.MakeSelectOptions(target, result, select,first);
	    		    }
	    		}
	    	});
		},
		
		fnMakeAreaLv1Combo: function (target, select, first) {
			$.ajax({
				url : "/ctrl/settings/system/code/listAreaComboJson",
	    		data :{codeGroupCd:"SC0027",
	    			   codeOther1 : "#"		},
				type : "POST",
				cache: false,
				success : function(result) {
					var result = result.dt_grid;
					if(!first){
						first = "선택";
					}
					Util.MakeSelectOptions(target, result, select, first);
				}
			});
		},
		
		fnMakeAreaLv2Combo: function (target, codeOther1, select, first) {
			$.ajax({
				url : "/ctrl/settings/system/code/listAreaComboJson",
				data :{codeGroupCd:"SC0027",
	    			   codeOther1 : codeOther1},
				type : "POST",
				cache: false,
				success : function(result) {
					var result = result.dt_grid;
					if(!first){
						first = "선택";
					}
					Util.MakeSelectOptions(target, result, select, first);
				}
			});
		},
		fnMakeEngrCombo: function (target,data,select) { //=> 엔지니어 정보
			$.ajax({
				url : "/ctrl/call/obstacle/receipt/listEngrCombo",
				data : data,
				type : "POST",
				cache: false,
				success : function(result) {
					var result = result.dt_grid;
					if(target.data('combobox')){
						Util.MakeBootstrapSelectBox(target,result,"선택",select);
					}else{
						Util.MakeSelectOptions(target, result, select,"선택");
					}
				}
			});
		},
		fnMakeCommCombo: function (target,groupCd,select,first,except) {
			$.ajax({
				url : "/ctrl/settings/system/code/listCodeGroupComboJson",
				data :{codeGroupCd:groupCd},
				type : "POST",
				dataType : "json",
				cache: false,
				success : function(result) {
					if(except){
						for (var i = 0; i < except.length; i++) {
							result = $.grep(result, function(obj) {
							  return obj.value != except[i];
							});
						}
					}
					Util.MakeSelectOptions(target, result,select,first);
				}
			});
		}, /*[배정처리 유승우][2017-11-20]*/
		fnObsRcptAllotComboBox: function (target,groupCd,select,first,except) {
			$.ajax({
				url : "/ctrl/settings/system/code/listCodeGroupOtherJson",
				data :{codeGroupCd:groupCd, other2:select, other3:first },
				type : "POST",
				dataType : "json",
				cache: false,
				success : function(result) {
					if(except){
						for (var i = 0; i < except.length; i++) {
							result = $.grep(result, function(obj) {
							  return obj.value != except[i];
							});
						}
					}
					Util.MakeSelectAllotOptions(target, result,select,first);
				}
			});		
		},
		
		fnObsRcptComboBox: function (options) { //추후 미사용
			var p = $.extend(true,{
				obsRcptLv1Id : null,
				obsRcptLv2Id : null,
				obsRcptLv3Id : null,
				obsRcptLv4Id : null,
				compCd :null,
			},  options );
			
			if(options.obsRcptLv1Id){
				$(options.obsRcptLv1Id).change(function(){
					if(options.obsRcptLv2Id&&$(this).val()){
						var compCd = $(options.compCdId).val();
						MMSUtil.fnMakeObsRcptCombo($(options.obsRcptLv2Id), compCd, $(this).val(), "", "장애구분");
					}
					if(options.obsRcptLv3Id){
						$(options.obsRcptLv3Id).html("<option value=''>장애유형</option>");
					}
					if(options.obsRcptLv4Id){
						$(options.obsRcptLv4Id).html("<option value=''>선택</option>");
						$(options.obsRcptLv4Id).data('combobox').refresh();
					}
				});
			}
			
			if(options.obsRcptLv2Id){
				$(options.obsRcptLv2Id).change(function(){
					if(options.obsRcptLv3Id){
						var compCd = $(options.compCdId).val();
						MMSUtil.fnMakeObsRcptCombo($(options.obsRcptLv3Id), compCd, $(this).val(), "", "장애유형");
					}
					if(options.obsRcptLv4Id){
						$(options.obsRcptLv4Id).html("<option value=''>선택</option>");
						$(options.obsRcptLv4Id).data('combobox').refresh();
					}
				});
			}
			if(options.obsRcptLv3Id && options.obsRcptLv4Id){
				$(options.obsRcptLv3Id).change(function(){
					var compCd = $(options.compCdId).val();
					MMSUtil.fnMakeObsRcptCombo($(options.obsRcptLv4Id), compCd, $(this).val(), "", "선택",true);
				});
			}
		},
		
		fnObsRcptComboRelay: function (options) { //장애유형 관계처리
			var p = $.extend(true,{
				obsRcptLv1Id : null,
				obsRcptLv2Id : null,
				obsRcptLv3Id : null,
				obsRcptLv4Id : null,
				obsRcptPrdId : null,
				compCd :null,
			},  options );	  
			var compCd = $(options.compCdId).val();
		    $(options.obsRcptLv1Id).change(function(){
		      if($(this).val()){
		    	  MMSUtil.fnMakeObsRcptCombo($(options.obsRcptLv2Id), compCd, $(this).val(), "", "장애구분");
				  if(options.obsRcptPrdId != null) {
					  MMSUtil.fnMakePrdNmCombo($(options.obsRcptPrdId), $(this).val(), "모델명");
				  }
		      }
	    	  $(options.obsRcptLv2Id).html("<option value=''>장애구분</option>");	
		   	  $(options.obsRcptLv3Id).html("<option value=''>장애유형</option>");
			  $(options.obsRcptLv4Id).html("<option value=''>장애원인</option>");
			  $(options.obsRcptLv4Id).data('combobox').refresh();
		    });
		    $(options.obsRcptLv2Id).change(function(){
		      if($(this).val()){
			   	  MMSUtil.fnMakeObsRcptCombo($(options.obsRcptLv3Id), compCd, $(this).val(), "", "장애유형");
			  }
		   	  $(options.obsRcptLv3Id).html("<option value=''>장애유형</option>");
			  $(options.obsRcptLv4Id).html("<option value=''>장애원인</option>");
			  $(options.obsRcptLv4Id).data('combobox').refresh();			  
		    });		    
		    $(options.obsRcptLv3Id).change(function(){
			  if($(this).val()){
			  	  MMSUtil.fnMakeObsRcptCombo($(options.obsRcptLv4Id), compCd, $(this).val(), "", "장애원인", true);
			  }
			  $(options.obsRcptLv4Id).html("<option value=''>장애원인</option>");
			  $(options.obsRcptLv4Id).data('combobox').refresh();				    	
		    });	
		},
		//모델명 SelectBox
		fnMakePrdNmCombo: function (target, prdTypeLv2, first, bootstr) {
			$.ajax({
				url : "/ctrl/standard/representativeItem/listStndPrdNm",
				data :{prdTypeLv2:prdTypeLv2},
				type : "POST",
				dataType : "json",
				cache: false,
				success : function(result) {
					var dtGrid = result.dt_grid;
					console.info(dtGrid);
					if(bootstr){
						Util.MakeBootstrapSelectBox(target,dtGrid,first);
					}else{
						Util.MakeSelectOptions(target,dtGrid,'',first);
					}
				}
			});
		},
		//=> 상세정보 불러오기
		fnMakeObsRcptComboSet: function (param) {
			var compCd = param.compCd
			var rcptObsLv1 = param.rcptObsLv1
			var rcptObsLv2 = param.rcptObsLv2
			var rcptObsLv3 = param.rcptObsLv3
			var rcptObsLv4 = param.rcptObsLv4
			var rcptStdLv1 = param.rcptStdLv1
			var firstObsLv = param.firstObsLv
			MMSUtil.fnMakeObsRcptComboEtc($("#callObsStsPopupRcptLv1"), compCd, rcptStdLv1, firstObsLv, "제품군", rcptObsLv1);
			MMSUtil.fnMakeObsRcptCombo($("#callObsStsPopupRcptLv2"), compCd, rcptObsLv1, rcptObsLv2, "장애구분");
			MMSUtil.fnMakeObsRcptCombo($("#callObsStsPopupRcptLv3"), compCd, rcptObsLv2, rcptObsLv3, "장애유형");
			//MMSUtil.fnMakeObsRcptCombo($("#callObsStsPopupRcptLv4"), compCd, rcptObsLv3, rcptObsLv4, "장애원인",true); 18.02.07
		},		
		
		
		fnMakeObsRcptCombo: function (target, compCd, obsPrtSeq, obsSeq, first,bootstr) {
			$.ajax({
				url : "/ctrl/standard/obstacle/listObsCombo",
				data :{
					 compCd		: compCd
					,obsPrtSeq	: obsPrtSeq 
					,obsSeq     : obsSeq
				},
				type : "POST",
				dataType : "json",
				cache: false,
				success : function(result) {
					var dtGrid = result.dt_grid;
					if(bootstr){
						Util.MakeBootstrapSelectBox(target,dtGrid,first,obsSeq);
					}else{
						Util.MakeSelectOptions(target, dtGrid, obsSeq,first);
					}
				}
			});
		},
		
		fnMakeObsRcptComboEtc: function (target, compCd, obsPrtSeq, obsSeq, first, select) {
			//장애내역 수정 정보 불러오기 [유승우] [2017-12-11]
			$.ajax({
				url : "/ctrl/standard/obstacle/listObsCombo",
				data :{
					 compCd		: compCd
					,obsPrtSeq	: obsPrtSeq 
					,obsSeq     : obsSeq
				},
				type : "POST",
				dataType : "json",
				cache: false,
				success : function(result) {
					var dtGrid = result.dt_grid;
						Util.MakeSelectOptions(target, dtGrid, select,first);
					
				}
			});
		},		
		
		MakePartnerSet: function (options) {
			var p = $.extend(true,{
				aspCompCdId : null,
				compCdId : null,
				brndCdId : null,
			},  options );
			var userInfo = Util.getUserInfo();
			var aspCompSelect = $(p.aspCompCdId);
			var compSelect = $(p.compCdId);
			var brndSelect = $(p.brndCdId);
			if(userInfo.s_userType === "0" || userInfo.s_userType === "1"){
				MMSUtil.fnMakePartnerCombo(aspCompSelect);
			}else if(userInfo.s_userType === "2"){
				MMSUtil.fnMakePartnerCombo(aspCompSelect, userInfo.s_companyCd, false);
			}else{
				aspCompSelect.hide();
			}
			
			MMSUtil.fnMakeCompCombo(compSelect, userInfo.s_compCd);
			
			compSelect.change(function(){
				if(!userInfo.s_brndCd){
					console.log(brndSelect);
					console.log(compSelect.val());
					MMSUtil.fnMakeBrndCombo(brndSelect, compSelect.val());
				}
			})
		},
		MaMakePartnerSet: function (options) {
			var p = $.extend(true,{
				aspCompCdId : null,
				compCdId : null,
				brndCdId : null,
			},  options );
			var userInfo = Util.getUserInfo();
			var aspCompSelect = $(p.aspCompCdId);
			var compSelect = $(p.compCdId);
			var brndSelect = $(p.brndCdId);
			if(userInfo.s_userType === "0" || userInfo.s_userType === "1"){
				MMSUtil.fnMaMakePartnerCombo(aspCompSelect);
			}else if(userInfo.s_userType === "2"){
				MMSUtil.fnMaMakePartnerCombo(aspCompSelect, userInfo.s_companyCd, false);
			}else{
				aspCompSelect.hide();
			}
			
			MMSUtil.fnMakeCompCombo(compSelect, userInfo.s_compCd);
			
			compSelect.change(function(){
				if(!userInfo.s_brndCd){
					console.log(brndSelect);
					console.log(compSelect.val());
					MMSUtil.fnMakeBrndCombo(brndSelect, compSelect.val());
				}
			})
		},
		
		MakeProductComboSet: function (options) {
			var p = $.extend(true,{
				prdTypeLv1Id : null,
				prdTypeLv2Id : null,
				prdTypeLv3Id : null,
				prdTypeLv4Id : null,
			},  options );
			
			var prdTypeLv1Select = $(p.prdTypeLv1Id);
			var prdTypeLv2Select = $(p.prdTypeLv2Id);
			var prdTypeLv3Select = $(p.prdTypeLv3Id);
			var prdTypeLv4Select = $(p.prdTypeLv4Id);
			
			if(!p.prdTypeLv1Id){
				MMSUtil.fnMakeMfrCombo(prdTypeLv3Select, '', "3");
			}else{
				MMSUtil.fnMakePrdCombo(prdTypeLv1Select, "", "1");
			}
			
			prdTypeLv1Select.change(function(){
				MMSUtil.fnMakePrdCombo(prdTypeLv2Select, prdTypeLv1Select.val(), "2");
				prdTypeLv3Select.html("<option value=''>선택</option>");
				prdTypeLv4Select.html("<option value=''>선택</option>");
			});
			prdTypeLv2Select.change(function(){
				MMSUtil.fnMakeMfrCombo(prdTypeLv3Select, prdTypeLv2Select.val(), "3");
				prdTypeLv4Select.html("<option value=''>선택</option>");
			});
			prdTypeLv3Select.change(function(){
				MMSUtil.fnMakePrdCombo(prdTypeLv4Select, 1, "1");
			});
		},
    };
}();


