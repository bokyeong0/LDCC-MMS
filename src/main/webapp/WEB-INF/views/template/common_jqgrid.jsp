<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
	<head>
<!--     <script src="/common/paragon-grid.js"></script> -->
<!--     <script src="/js/jquery.jqGrid.min.js"></script> -->
<!--     <script src="/js/jqgrid-ui.js"></script> -->
	</head>
<body>
<div class="" >
<ol class="breadcrumb pull-right">
	<li><a href="javascript:;">Home</a></li>
	<li><a href="javascript:;">UI Template</a></li>
	<li class="active">jqGrid<i class="fa fa-star active"></i></li>
</ol>
<h1 class="page-header">jqGrid</h1>
</div>
	<div class="search-form clearfix" >
           <form class="form-inline" >
			<div class="search-title-group m-r-10">
				<span class="label label-theme search-title">
					<i class="fa fa-search"></i>검색조건
<!-- 					<small>Search</small> -->
				</span>
			</div>
			<!-- 중복되는 부분 -->
			<div class="search-controls" >
				<div class="form-group m-r-10">
					<input type="text" class="form-control input-sm" id="exampleInputEmail2" size="10" placeholder="프로그램코드">
				</div>
				<div class="form-group m-r-10">
					<input type="text" class="form-control input-sm" id="exampleInputPassword2" placeholder="프로그램명">
				</div>
			</div>
			<!-- 중복되는 부분 -->
			<div class="search-button-group">
				<button id="searchBtn" type="submit" class="btn btn-sm btn-primary m-r-5">
				<i class="fa fa-search"></i>검색
				</button>
				<button type="submit" class="btn btn-sm btn-info">
				<i class="fa fa-plus"></i>행추가
				</button>
			</div>
			</form>
	</div>
	    
<div class="grid-wrapper" >
	<table id="tempJQGrid3"  ></table>
	<div id="tempJQGridNavi3"></div>
	<table id="tempJQGrid1"  ></table>
	<div id="tempJQGridNavi1"></div>
	<table id="tempJQGrid2"  ></table>
	<div id="tempJQGridNavi2"></div>
</div>
<script>
        $(document).ready(function () {



           /*  $("#table_list_12").jqGrid({
            	url: 'http://www.trirand.net/examples/grid/loading_data/million_linqdatasource/default.aspx?jqGridID=JQGrid1',
                mtype: "GET",
                datatype: "json",
                page: 1,
                
                data: mydata,
                datatype: "local",
                height: 450,
				regional : 'kr',
                autowidth: true,
                shrinkToFit: true,
                rowNum: 20,
                rowList: [10, 20, 30,50,100],
                colNames:['프로그램코드','프로그램명', '설명', 'URL','js Path','사용여부','등록일자'],
                colModel:[
                    {name:'id',index:'id', editable: true, width:60, sorttype:"int",search:true},
                    {name:'invdate',index:'invdate', editable: true, width:90, sorttype:"date", formatter:"date"},
                    {name:'name',index:'name', editable: true, width:100},
                    {name:'amount',index:'amount', editable: true, width:80, align:"right",sorttype:"float", formatter:"number"},
                    {name:'tax',index:'tax', editable: true, width:80, align:"right",sorttype:"float"},
                    {name:'total',index:'total', editable: true, width:80,align:"right",sorttype:"float"},
                    {name:'note',index:'note', editable: true, width:100, sortable:false}
                ],
                pager: "#pager_list_1",
                viewrecords: true,
                caption: "프로그램 목록",
                addtext: 'Add',
                edittext: 'Edit',
                rownumbers: true, 
                hidegrid: false
            }); */
            /* $("#table_list_1").jqGrid({
            	url: '/settings/system/program/listProgram?autoPage=false',
                mtype: "GET",
                datatype: "json",
                page: 1,
                height: 450,
				regional : 'kr',
				autowidth: true,
				shrinkToFit: true,
                rowNum: 20,
                rowList: [10, 20, 30,50,100],
                colNames:['프로그램코드','프로그램명', '설명', 'URL','js Path','사용여부','등록일자'],
                colModel:[
                    {name:'PRO_CD'},
                    {name:'PRO_NM'},
                    {name:'PRO_DESC'},
                    {name:'CALL_URL'},
                    {name:'IN_USER_ID'},
                    {name:'USE_YN', align:"right"},
                    {name:'IN_DT',index:'IN_DT',sortable:false}
                ],
                pager: "#pager_list_1",
                viewrecords: true,
				emptyrecords: 'Scroll to bottom to retrieve new page', // the message will be displayed at the bottom 
                caption: "프로그램 목록",
                addtext: 'Add',
                edittext: 'Edit',
                scroll: 1,
                hidegrid: false,
                rownumbers: true
            }); */
            $("#tempJQGrid1").jqGrid({
            	url: '/ctrl/settings/system/program/listProgram',
                mtype: "GET",
                datatype: "json",
                page: 1,
                height: 200,
                autowidth: true,
                countable:false,
             	multiselect: true, // 체크 박스
                rowList: [10, 20, 30,50,100],
                colNames:['프로그램코드','프로그램명', '설명', 'URL','js Path','사용여부','등록일자'],
                colModel:[
                    {name:'PRO_CD', key: true},
                    {name:'PRO_NM'},
                    {name:'PRO_DESC'},
                    {name:'CALL_URL'},
                    {name:'IN_USER_ID'},
                    {name:'USE_YN', align:"right"},
                    {name:'IN_DT',sortable:false}
                ],
                viewrecords: true,
                pager: "#tempJQGridNavi1",
                loadonce: true,
                caption: "프로그램 목록",
                width: 750,
                rowNum: 10,
                hidegrid: false,
                rownumbers: true,
//                 scroll: 1, // set the scroll property to 1 to enable paging with scrollbar - virtual loading of records
                emptyrecords: 'Scroll to bottom to retrieve new page' // the message will be displayed at the bottom 
            });
            $("#tempJQGrid2").jqGrid({
            	url: '/ctrl/settings/system/program/listProgram',
                mtype: "GET",
                datatype: "json",
                page: 1,
                height: 200,
                pageable: true,
                countable:true,
                sortable:true,
                autowidth: true,
                colNames:['프로그램코드','프로그램명', '설명', 'URL','js Path','사용여부','등록일자'],
                colModel:[
                    {name:'PRO_CD', key: true},
                    {name:'PRO_NM'},
                    {name:'PRO_DESC'},
                    {name:'CALL_URL'},
                    {name:'IN_USER_ID'},
                    {name:'USE_YN', align:"right"},
                    {name:'IN_DT',sortable:false}
                ],
//                 viewrecords: true,
                pager: "#tempJQGridNavi2",
//                 loadonce: true,
                caption: "프로그램 목록2",
                width: 750,
                rowNum: 10,
                hidegrid: false,	// 창접기 버튼
                rownumbers: true,
                scroll: 1, // set the scroll property to 1 to enable paging with scrollbar - virtual loading of records
                emptyrecords: '조회된 데이타가 없습니다.' // the message will be displayed at the bottom 
            });
            $("#tempJQGrid3").paragonGrid({
            	url: '/ctrl/settings/system/program/listProgram',
				colNames:['프로그램코드','프로그램명', '설명', 'URL','js Path','사용여부','등록일자'],
                colModel:[
                    {name:'PRO_CD', key: true},
                    {name:'PRO_NM'},
                    {name:'PRO_DESC'},
                    {name:'CALL_URL'},
                    {name:'IN_USER_ID'},
                    {name:'USE_YN', align:"right"},
                    {name:'IN_DT',sortable:false}
                ],
                pager: "#tempJQGridNavi3",
                caption: "서버에서 PAGE 처리",
            });
// 			$("#searchBtn").click(function(){
// 				$("#tempJQGrid3").jqGrid('setGridParam', { colNames:['프로그램코드','프로그램명', '설명', 'URL','js Path','사용여부','등록일자']});
// 				$("#tempJQGrid3").trigger("reloadGrid");
// 			});
            // Add selection
//             $("#table_list_1").setSelection(4, true);


            // Setup buttons
//             $("#table_list_1").jqGrid('navGrid', '#pager_list_1',
//                     {edit: true, add: true, del: true, search: true},
//                     {height: 200, reloadAfterSubmit: true}
//             );
            // 문제 있음 !!!!!!!!!!!!!!!!
//             $("#table_list_1").jqGrid('navGrid', '#pager_list_1',
//                     {edit: true, add: true, del: true, search: true},
//                     {height: 200, reloadAfterSubmit: true,refresh: true}
//             );

            // Add responsive to jqGrid
            $(window).bind('resize', function () {
                var width = $(".grid-wrapper:visible").eq(0).width();
                $('#tempJQGrid1').setGridWidth(width);
                $('#tempJQGrid2').setGridWidth(width);
            });


//             setTimeout(function(){
//                 $('.wrapper-content').removeClass('animated fadeInRight');
//             },700);

        });

    </script>
</body>
</html>