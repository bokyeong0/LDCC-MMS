(function($){
	
	function leftmenu(el,option,reloadable){
		var that = this;
		var defaults = {
				url: "/ctrl/settings/system/menu/leftMenu",
				key:"MENU_SEQ",
				val:"MENU_NM",
				p_key:"MENU_PARENT_SEQ",
				ico:"MENU_ICO",
				pro_cd:"PRO_CD",
				default_ico:"fa-folder-open-o",
				call_url:"CALL_URL",
				data: {},
				autoClose : true,
				allOpen : false,
				tagId : "defaultMenu",
				click : function(data){}
		};
		var target = $(el);
		if(option == undefined){
			option.tagId = defaults.tagId;
		}
		that.userOptions = option;
		that.element = el;
		that.el = $(el);
		that.options = $.extend(defaults, option );
		var op = that.options;
		
		$.ajax({
			url : op.url,
			data : op.data,
			type : "POST",
			dataType : "json",
			success : function(data) {
				
				var $ul = $("<ul class='nav' id='"+op.tagId+"'  />");
				for (var i = 0; i < data.dt_menu.length; i++) {
					
					var depth = ((data.dt_menu[i][op.p_key]) === ""||(data.dt_menu[i][op.p_key]) == 0)? 1 : 2;
//					var call_url = data.dt_menu[i][op.call_url];
					var ico = data.dt_menu[i][op.ico];
					var $newa = $("<a id='menu-id-"+data.dt_menu[i][op.key]+"' data-menu-id='"+data.dt_menu[i][op.key]+"'  data-menu-pid='"+data.dt_menu[i][op.p_key]+"'  href='javascript:;' />");
					var $newli = $("<li class='has-sub' />");
					if ($.trim(ico) == "" || ico == null  ){
						ico = op.default_ico;
					}
//					console.log(data.dt_menu[i][op.val] +" : "+ico);
					
					$newa.data(op.key+"",data.dt_menu[i][op.key]);
					$newa.data(op.val+"",data.dt_menu[i][op.val]);
					$newa.data(op.p_key+"",data.dt_menu[i][op.p_key]);
					$newa.data(op.call_url+"",data.dt_menu[i][op.call_url]);
					$newa.data(op.pro_cd+"",data.dt_menu[i][op.pro_cd]);
					$newa.data(op.ico+"", ico);
					
    				if(depth == 1){
    					var $span = $("<span/>");
    					$span.text(data.dt_menu[i][op.val]);
    					$newa.html($span);
    					$newli.append($newa);
    					$newli.addClass("mc"+data.dt_menu[i][op.key]);
    					
						$newa.prepend('<i class="fa '+ico+'"></i>');
						if(reloadable){
							$newa.off().click(function(){
								if($(this).data(op.call_url) != "" && $(this).data(op.call_url) !== null){
									op.click({
										node : $(this),
										key : $(this).data(op.key),
										val : $(this).data(op.val),
										url : $(this).data(op.call_url),
										ico : $(this).data(op.ico),
										pro_cd : $(this).data(op.pro_cd),
										p_key : $(this).data(op.p_key)
									});
								}
								var target = $(this).next('.sub-menu');
								var otherMenu = '.sidebar .nav > li.has-sub > .sub-menu';
								if ($('.page-sidebar-minified').length === 0) {
									if(op.autoClose){
										$(otherMenu).not(target).slideUp(250, function() {
											$(this).closest('li').removeClass('active');
										});
									}
									$(target).slideToggle(250, function() {
										var targetLi = $(this).closest('li');
										if ($(targetLi).hasClass('active')) {
											$(targetLi).removeClass('active');
										} else {
											$(targetLi).addClass('active');
										}
									});
								}
							});
						}else{
							if(reloadable){
								$newa.off().click(function(){
									if($(this).data(op.call_url) != "" && $(this).data(op.call_url) !== null){
										op.click({
											node : $(this),
											key : $(this).data(op.key),
											val : $(this).data(op.val),
											url : $(this).data(op.call_url),
											ico : $(this).data(op.ico),
											pro_cd : $(this).data(op.pro_cd),
											p_key : $(this).data(op.p_key)
										});
									}
									var target = $(this).next('.sub-menu');
									var otherMenu = '.sidebar .nav > li.has-sub > .sub-menu';
									if ($('.page-sidebar-minified').length === 0) {
										if(op.autoClose){
											$(otherMenu).not(target).slideUp(250, function() {
												$(this).closest('li').removeClass('active');
											});
										}
										$(target).slideToggle(250, function() {
											var targetLi = $(this).closest('li');
											if ($(targetLi).hasClass('active')) {
												$(targetLi).removeClass('active');
											} else {
												$(targetLi).addClass('active');
											}
										});
									}
								});
							}else{
								$newa.click(function(){
									if($(this).data(op.call_url) != "" && $(this).data(op.call_url) !== null){
										op.click({
											node : $(this),
											key : $(this).data(op.key),
											val : $(this).data(op.val),
											url : $(this).data(op.call_url),
											ico : $(this).data(op.ico),
											pro_cd : $(this).data(op.pro_cd),
											p_key : $(this).data(op.p_key)
										});
									}
									var target = $(this).next('.sub-menu');
									var otherMenu = '.sidebar .nav > li.has-sub > .sub-menu';
									if ($('.page-sidebar-minified').length === 0) {
										if(op.autoClose){
											$(otherMenu).not(target).slideUp(250, function() {
												$(this).closest('li').removeClass('active');
											});
										}
										$(target).slideToggle(250, function() {
											var targetLi = $(this).closest('li');
											if ($(targetLi).hasClass('active')) {
												$(targetLi).removeClass('active');
											} else {
												$(targetLi).addClass('active');
											}
										});
									}
								});
								
							}
							
						}
    					$ul.append($newli);
    				}else{
    					$newa.text(data.dt_menu[i][op.val]);
    					$newli.append($newa);
    					$newli.addClass("mc"+data.dt_menu[i][op.key]);
    					$newa.click(function(){
    						if($(this).data(op.call_url) !== null && $(this).data(op.call_url) != ""){
    							op.click({
    								node : $(this),
    								key : $(this).data(op.key),
    								val : $(this).data(op.val),
    								url : $(this).data(op.call_url),
    								ico : $(this).data(op.ico),
    								pro_cd : $(this).data(op.pro_cd),
    								p_key : $(this).data(op.p_key)
    							});
    						}
    						$(this).parent().toggleClass("expand");
	    					if ($('.page-sidebar-minified').length === 0) {
	    			            var target = $(this).next('.sub-menu');
	    			            $(target).slideToggle(250);
	    			        }
    					});
    					var $targetCodeEl =  $ul.find(".mc"+data.dt_menu[i][op.p_key]);
    					
    					if($targetCodeEl.is( "li" ) && $targetCodeEl.children("ul").length == 0){
    						var $newul = $("<ul/>");
    						$newul.addClass("sub-menu");	
    						$newul.append($newli);	
    						$targetCodeEl.append($newul);
    						$targetCodeEl.children("a").prepend('<b class="caret pull-right"></b>');
    					}else{
    						$targetCodeEl.children("ul").append($newli);
    					}
    				}
				}
				$ul.append('<li><a href="javascript:;" class="sidebar-minify-btn" data-click="sidebar-minify"><i class="fa fa-angle-double-left"></i></a></li>');
//				alert($ul.html());
				target.append($ul);
//				if(op.allOpen){
//					$("#"+op.tagId+".nav > .has-sub ").addClass("active");
//				}
				
			  $('[data-click=sidebar-minify]').click(function(e) {
			        e.preventDefault();
			        var sidebarClass = 'page-sidebar-minified';
			        var targetContainer = '#page-container';
			        if ($(targetContainer).hasClass(sidebarClass)) {
			            $(targetContainer).removeClass(sidebarClass);
			            if ($(targetContainer).hasClass('page-sidebar-fixed')) {
			                generateSlimScroll($('#sidebar [data-scrollbar="true"]'));
			            }
			        } else {
			            $(targetContainer).addClass(sidebarClass);
			            if ($(targetContainer).hasClass('page-sidebar-fixed')) {
			                $('#sidebar [data-scrollbar="true"]').slimScroll({destroy: true});
			                $('#sidebar [data-scrollbar="true"]').removeAttr('style');
			            }
			            $('#sidebar [data-scrollbar=true]').trigger('mouseover');
			            $("#"+op.tagId+".nav > .has-sub ").removeClass('active');
			        }
			        $(window).trigger('resize');
			    });
			}
		});
		
	}
	$.fn.setLeftMenu = function(option){
		return this.each(function () {
			var instance = new leftmenu(this, option,false);
			$(this).data("menuTree", instance);
		});
	};
	$.fn.resetLeftMenu = function(){
		var thisMenu =$(this).data("menuTree");
		var option = thisMenu.options;
		$(this).find("#"+option.tagId).remove();
		return this.each(function () {
			var instance = new leftmenu(this, option,true);
			$(this).data("menuTree", instance);
		});
	};
	
}(jQuery));
