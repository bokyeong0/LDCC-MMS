
 (function ( $ ) {
	var paragonTabs = function () {
		return {
	        getId: function () {
	        	return $(".main-tab.active").val();
		    }
	    };
	};
 	var tabs = [];
 	$.fn.paragonTabs = function(options) {
 		var settings = $.extend({
            // These are the defaults.K
 			proCd: "",
 			menuSeq: ""
        }, options );
 		this.addClass("panel panel-inverse panel-with-tabs main-tab");
 		
 		var tabHead = $('<div class="panel-heading p-0"/>')	
 		var tabWrap = $('<div class="tab-overflow"/>')
 		tabHead.append(tabWrap)
 		
 		if(this.find('.nav-tabs.main-tab').length==0){
 			tabWrap.append($('<ul/>', {class: 'nav nav-tabs main-tab nav-tabs-inverse'}).sortable({
 				connectWith: this
 			}));
 			this.append(tabHead);
 		}else{
 			this.find('.nav-tabs.main-tab').sortable({
 				connectWith: this
 			});
 		}
 		if(this.find('.nav-tabs.main-tab > .prev-button').length==0){
 			$('.nav-tabs.main-tab').prepend($('<li class="prev-button"><a href="javascript:;" data-click="prev-tab" class="text-success"><i class="fa fa-arrow-left"></i></a></li>'));
 		}
 		if(this.find('.nav-tabs.main-tab > .next-button').length==0){
 			$('.nav-tabs.main-tab').append($('<li class="next-button"><a href="javascript:;" data-click="next-tab" class="text-success"><i class="fa fa-arrow-right"></i></a></li>'));
 		}
 		
 		if(this.find('.tab-content.main-tab').length==0){
 			this.append($('<div/>', {class: 'tab-content main-tab'}));
 		}

 		return this;
 	};

 	$.fn.getTabData = function(){
 		return $(this).data("tab-data");
 	};
 	$.fn.addTab = function(options){
 		var settings = $.extend({
            // These are the defaults.
 			proCd: "",
 			data:{},
            title: "텝타이틀",
            closable: true,
        }, options );
 		var that = this;
 		settings.key = settings.id;
 		if(!settings.id){
 			settings.menuSeq = "menu-id-"+trataId(settings.id);
 			settings.id = "main-tab-id-"+trataId(settings.title);
 		}else{
 			settings.menuSeq = "menu-id-"+trataId(settings.id);
 			settings.id = "main-tab-id-"+trataId(settings.id)
 		}

 		if(tabs.indexOf(settings.id)>=0){
 			var aba = this.find('.nav-tabs.main-tab').find('li.main-tab').find('a[href="#'+settings.id+'"]');
 			aba.tab('show');
 			$(settings.id).tab('show');
 			$(settings.id).data("tab-data",settings.data);
 			return "visible"
 		}else{

 			
 			App.prcsStart();
 			
			var userInfo = Util.getUserInfo();
			if(settings.ajaxUrl){
				$.ajax({
		            mimeType: 'text/html; charset=utf-8', 
		            url: settings.ajaxUrl,
		            type: 'GET',
		            beforeSend : function(xhr){
		    			xhr.setRequestHeader("AjaxType", "paragon");
		    			xhr.setRequestHeader("proCd", settings.proCd);
		        	},
		            success: function(data) {
		            	tabs.push(settings.id);

		     			btn_close = $('<i class="fa fa-times btn btn-xs btn-icon btn-circle btn-default" style="margin-top: -20px; margin-left: 5px; margin-right: -11px;" ></i>').click(function(){
		     				closer = $(this);     
		     				a = closer.parent();
		     				href = a.attr('href');
		     				a.parent().remove(); 
		     				var ativo = $(href).hasClass('active');
		     				$(href).remove();
		     				var idx = href.substring(1)
		     				var tabIdx = tabs.indexOf(idx);
		     				tabs.splice(tabIdx,1);
		     				if(ativo){
		     					var tabLen =$('.nav-tabs.main-tab li.main-tab').length;
		     					var showIdx = tabIdx;
		     					if(tabLen == 1){
		     						showIdx = 0;
		     					}else if(tabLen == showIdx){
		     						showIdx = tabLen-1;
		     					}
		     					$('.nav-tabs.main-tab li.main-tab:eq('+showIdx+') a').tab('show');	
		     				}

		     			});

		     			that.find('.main-tab.active').removeClass('active')
		     			var ancora = $('<a/>',{
		     				href: '#'+settings.id,
//		     				'data-proCd': settings.proCd,
		     				'data-toggle': 'tab'
		     			});
		     			ancora.data("proCd",settings.proCd);
		     			if(settings.closable){
		     				ancora.mousedown(function(e) {
		     					e.stopPropagation();
		     					if(e.which == 2){
		     						a = $(this);
		     						href = a.attr('href');
		     						a.parent().remove(); 
		     						var ativo = $(href).hasClass('active');
		     						$(href).remove();
		     						var idx = href.substring(1)
		     						tabs.splice(tabs.indexOf(idx),1);
		     						if(ativo){
		     							$('.nav-tabs.main-tab li.main-tab:eq(0) a').tab('show');	
		     						}
		     						return false;
		     					}
		     				})
		     			}

		     			ancora.prepend(settings.title)
		     			if(settings.icon){
		     				ancora.prepend(' ').prepend($('<i/>').addClass('fa '+settings.icon+' fa-lg'));
		     			}
		     			
		     			if(settings.closable){
		     				ancora.append(btn_close);
		     			}

		    			if(settings.loadScripts){

		    				if(typeof(settings.loadScripts) == 'string'){
		    					var script = $('<script/>',{
		    						type:"text/javascript",
		    						src: settings.loadScripts
		    					});
		    					$('head').append(script)
		    					btn_close.on('click',function(){
		    						script.remove();
		    					})
		    				}else if(typeof(settings.loadScripts) == 'object'){
		    					var scripts = [];
		    					for(var i = 0 ; i < settings.loadScripts.length; i++){
		    						var script = $('<script/>',{
		    							type:"text/javascript",
		    							src: settings.loadScripts[i]
		    						});
		    						scripts.push(script);
		    						$('head').append(script);

		    					}
		    					btn_close.on('click',function(){
		    						for(var i = 0 ; i < scripts.length; i++){
		    							scripts[i].remove();	
		    						}
		    					})
		    				}
		    			}

		    			if(settings.loadStyles){
		    				if(typeof(settings.loadStyles) == 'string'){
		    					var style = $('<link/>',{
		    						href: settings.loadStyles,
		    						rel: 'stylesheet',
		    						type: 'text/css'
		    					});
		    					$('head').append(style);
		    					btn_close.on('click', function(){
		    						style.remove();
		    					})

		    				}else if(typeof(settings.loadStyles) == 'object'){
		    					var styles = [];
		    					for(var i = 0 ; i < settings.loadStyles.length; i++){
		    						var style = $('<link/>',{
		    							href: settings.loadStyles[i],
		    							rel: 'stylesheet',
		    							type: 'text/css'
		    						});
		    						styles.push(style);
		    						$('head').append(style);
		    					}
		    					btn_close.on('click',function(){
		    						for(var i = 0 ; i < styles.length; i++){
		    							styles[i].remove();	
		    						}

		    					})
		    				}
		    			}
		            	
		            	that.find('.nav-tabs.main-tab').append($('<li/>', {class:'main-tab active'}).append(ancora));

		            	that.find('.tab-content.main-tab').append($('<div/>', {
		    				class:'main-tab tab-pane active',
		    				id: settings.id
		    			}));

		    			var pagina = that.find('.tab-content.main-tab').find('#'+settings.id);
		    			pagina.data("tab-data",settings.data);
		    			if(settings.text){
		    				pagina.text(settings.text)
		    			}

		    			if(settings.html){
		    				pagina.html(settings.html)
		    			}
		    			Pace.restart();
//		            	try {
//		            		if($.parseJSON(data)){
//		            			var result = $.parseJSON(data);
//		            			if(result == -1){
//		            				alert(result.msgTxt);
//		            			}
//		            			return;
//		            		}
//						}catch(e){
//							
//						}
		            	pagina.html(data);
		            	pagina.find(".page-header").html(settings.title+'<small class="program-code">['+settings.proCd+']</small>');
		            	pagina.find("[data-authRule]").hide();
//		            	$("program-code").text(settings.text);
		            	var thisMenuNode = $("#"+settings.menuSeq);
		            	fnTabAuthCheck(pagina);
		            	if(thisMenuNode.text()){
		            		var htmls = '<li class="active">'+thisMenuNode.text()+'</li>';
//		            		var htmls = '<li class="active">'+thisMenuNode.text()+'<i class="fa fa-star" ></i></li>';
		            		var currNode = thisMenuNode;
		            		for (var i = 0; i < 10; i++) {
		            			var parentNode = $("#menu-id-"+currNode.data("menu-pid"));
		            			htmls = '<li><a href="javascript:;">'+parentNode.text()+'</a></li>'+htmls;
		            			if(parentNode.data("menu-pid") =="" || parentNode.data("menu-pid") === null ){
		            				break;
		            			}
		            			currNode =parentNode;
		            		}
		            		htmls = '<li><a href="javascript:;">Home</a></li>'+htmls;
		            	}
		            	pagina.find(".breadcrumb").html(htmls);
		            	var userType = userInfo.s_userType;
		            	if(userType == "3"){
		            		pagina.find(".customer-hide").hide();
		            	}
		            	pagina.find(".breadcrumb i.fa").click(function(){
		            		if($(this).hasClass("active")){
		            			$(this).removeClass("active");
		            		}else{
		            			$(this).addClass("active");
		            		}
		            	});
		            },
		            dataType: "html"
		        });
			}



		}
		return this;

	}

	$.fn.closeById = function(id){
		a = this.find('.nav-tabs.main-tab').find('a[href="#'+id+'"]');
		href = a.attr('href');
		a.parent().remove(); 
		var ativo = $(href).hasClass('active');
		$(href).remove();
		var idx = href.substring(1)
		tabs.splice(tabs.indexOf(idx),1);
		if(ativo){
			$('.nav-tabs.main-tab li.main-tab:eq(0) a').tab('show');	
		}
	}

	$.fn.closeThis = function(){
		a = this.find('.nav-tabs.main-tab').find('.active').find('a');
		href = a.attr('href');
		a.parent().remove(); 
		var ativo = $(href).hasClass('active');
		$(href).remove();
		var idx = href.substring(1)
		tabs.splice(tabs.indexOf(idx),1);
		if(ativo){
			$('.nav-tabs.main-tab li.main-tab:eq(0) a').tab('show');	
		}
	}

	function trataId(s){
		return s;
	}
	function fnTabAuthCheck(checkPage){
		var doaminArr = checkPage.find("[data-domain-id]");
		var dt_domainid = [];
		for(var i = 0 ; i < doaminArr.length ; i++){
			dt_domainid.push({"colname":doaminArr.eq(i).data("domain-id")});
		}
		var jsonData = JSON.stringify({"dt_domainid":dt_domainid});
		
		$.ajax({
    		url : "/ctrl/settings/system/auth/listCheckAuth",
    		data : jsonData,
    		contentType: 'application/json; charset=utf-8',
    		success : function(result) {
    			var authList = result.dt_grid;
    			for(var i in authList){
    				if(authList[i].AUTH_YN =='Y'){
    					checkPage.find("[data-authRule*='"+authList[i].AUTH_CD+"']").show();
    				}else{
    					checkPage.find("[data-authRule*='"+authList[i].AUTH_CD+"']").remove();
    				}
				}
    			var searchForm = checkPage.find(".search-form.multi");
    			for(var i = 0 ; i < searchForm.length ; i++){
    				var $el = searchForm.eq(i);
    				var tgBtn = $("<i class='fa fa-caret-down toggle-btn' />");
    				$el.append(tgBtn);
    		    	tgBtn.click(function(){
    		    		var tarGet = $(this).parents(".search-form.multi");
    		    		if(tarGet.hasClass("on")){
    		    			tarGet.removeClass("on");
    		    			$(this).addClass("fa-caret-down");
    		    			$(this).removeClass("fa-caret-up");
    		    		}else{
    		    			tarGet.addClass("on");
    		    			$(this).removeClass("fa-caret-down");
    		    			$(this).addClass("fa-caret-up");
    		    		}
    		    	});
    			}
    			checkPage.find("[data-authRule]:hidden").remove();
    			App.prcsEnd();
    			var domainList = result.dt_domainname;
    			for(var i in domainList){
					var element = checkPage.find("[data-domain-id='"+domainList[i].lang_key+"']");
					var txt = domainList[i].lang_text
					if(txt != ""){
						if(element.is("input[type=text]")){
							element.attr("placeholder",txt);
						}else{
							element.text(txt);
						}
					}
    			}
    			
    		}
    	});
	}

	

}( jQuery ));
