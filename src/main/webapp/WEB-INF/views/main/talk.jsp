<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE>
<html>
<head>
<script src="/js/views/main/talk.js"></script>

<style type="text/css">

/*20150130 코멘트 디자인*/
div#commentPg.commentPage{position:absolute;top:0;left:0;right:0;z-index:9999;}
div#commentPg.commentPage>.section{width:800px;margin:70px auto;}
div#commentPg.commentPage>.section>h1{margin: 0; background-color:#67BEB6;font-size:27px;font-weight:bold;color:#fff;line-height:67px;text-indent:20px;position:relative;}
div#commentPg.commentPage>.section>h1 a{color:#fff;display:inline-block;right:-1px;top:20px;position:absolute;text-decoration:none;text-indent:-9999px;background:url('../img/close_proj.png') no-repeat;background-size:24px 24px;width:50px;height:50px; border-bottom: none;}
div#commentPg.commentPage>.section>.table_wrap.schedule_table{}
#comment_tbodylist td{background-color: #ececec;}
.arrow_box_left {
	position: relative;
	background: #fff;
	border: 1px solid #c2e1f5;
	border-radius:4px;
	line-height: 15px;
	word-break: break-all;
	white-space: pre-line;
	border: none;
	max-width:370px;
    padding: 10px 10px 10px 10px;
    color: #666;
    text-align: left;
    font-weight: bold;
    font-size: 11px;
    word-break: break-all;
    display:inline-block;
    text-overflow: ellipsis;
    margin-left:5px;
	margin-right:5px;
	line-height: 15px;

}

.arrow_box_left:after, .arrow_box:before {
	right: 100%;
	top: 12px;
	border: solid transparent;
	content: " ";
	height: 0;
	width: 0;
	position: absolute;
	pointer-events: none;
	
}

.arrow_box_left:after {
	border-color: rgba(136, 183, 213, 0);
	border-right-color: #fff;
	border-width: 6px;
	margin-top: -6px;
}
.arrow_box_left:before {
	border-color: rgba(194, 225, 245, 0);
	border-right-color: #fff;
	border-width: 11px;
	margin-top: -11px;
}

/*  RIGHT  */
.arrow_box_right {
	position: relative;
	background: #59ABA3;
	border: none;
	border-radius:4px;
	line-height: 15px;
	word-break: break-all;
	white-space: pre-line;
	
	max-width:370px;
    padding: 10px 10px 10px 10px;
    margin: 10px 0 0 0;
    color: #fff;
    text-align: left;
    font-weight: bold;
    font-size: 11px;
	margin-left:5px;
	margin-right:5px;
	display:inline-block;
    text-overflow: ellipsis;
    line-height: 15px;
} 
.arrow_box_right:after, .arrow_box:before {
	left: 100%;
	top: 12px;
	border: solid transparent;
	content: " ";
	height: 0;
	width: 0;
	position: absolute;
	pointer-events: none;
}

.arrow_box_right:after {
	border-color: rgba(136, 183, 213, 0);
	border-left-color: #59ABA3;
	border-width: 6px;
	margin-top: -6px;
}
.arrow_box_right:before {
	border-color: rgba(194, 225, 245, 0);
	border-left-color: #59ABA3;
	border-width: 6px;
	margin-top: -6px;
}

.left-name{
    margin:10px 0 3px  5px;
}
.same-name{
    margin-top: 2px;
}

.arrow_box_right.same-name:after{
	border-left-color: #ECECEC;
}
.arrow_box_left.same-name:after{
	border-right-color: #ECECEC;
}
#comment_tbodylist > tr td {
	padding: 0px 10px 0px 10px;vertical-align: bottom;
}
#comment_tbodylist tr:last-child td {
	padding-bottom: 10px;
}


/* .arrow_box_left{ */
/* 	background-color: #fff; */
/* 	color: #000; */
/* 	border: none; */
/* } */
/* .arrow_box_left:after { */
/* 	border-right-color: #fff; */
/* } */


/* .arrow_box_right{ */
/* 	background-color: #88b7d5; */
/* 	color: #000; */
/* 	border: none; */
/* } */
/* .arrow_box_right:after { */
/* 	border-left-color: #88b7d5; */
/* 	margin-bottom:  */
/* } */

.vertalk{
	background:url('/img/vertalk_ico.png') repeat scroll 0px center ;
	background-size:50px 50px;
	border: none;
	width: 50px;
	height: 50px; 
}
</style>
</head>
					<div id="vertextalk" class="section" style="width:500px; border:2px solid #e4e4e4;">						
 						<h1><span class="vertalk" style="padding: 5px 25px;"></span>VertexTalk<a id="closeCommentLayer" href="#">닫기</a></h1>
						<div class="table_wrap" style="margin-bottom:0;border-top: none;" >
						
							<div id="comment_wrap" style="  background-color: #ECECEC;width:100%;height:550px;float:center;overflow-y:scroll;overflow-x:hidden;">
							<input type="hidden" id="lastScSeq" value="0">
							<input type="hidden" id="firstScSeq" value="0">
								<table style="width:100%; padding-bottom: 10px;">
									<thead id="comment_oldList">
										<tr id="loding_last_low"><td  style="border:none;text-align:center;background-color : #fff;font-size:14px;" ><a id="moreOldList" href="#">이전글보기</a></td></tr>
									</thead>
									<tbody id="comment_tbodylist"></tbody>
								</table>
							</div>
							<div class="line" style="background-color: #fff;" >
								<table style='width: 100%;border-top:1px solid #e4e4e4;'>
									<colgroup>
										<col style='width: 10%;'/>
										<col style='width: 80%;'/>
										<col style='width: 10%;'/>
									</colgroup>
									<tr>
										<td>내용</td>
										<td style="padding: 10px;"><textarea id="sales_comment" style="width: 99%;height:50px;"></textarea></td>
										<td style="padding: 10px;">
											<button type="button" class="bigbtn green" style="background-color: #DF347B; width:60px;height: 60px; " value="수정" id="btn_update_comment">
												<span>
													전송
												</span>
											</button>
										</td>
									</tr>
								</table>
								
							</div>
<!-- 							<div class="ta_center"> -->
<!-- 								<button type="button" class="bigbtn" value="목록"  id="btn_close_comment"> -->
<!-- 									<span> -->
<!-- 										닫기 -->
<!-- 									</span> -->
<!-- 								</button> -->
<!-- 							</div> -->
						</div>
<%-- 						<input type="hidden" id="viewProjNum" value="<%=request.getParameter("ssProjNum")%>" > --%>
					</div>
</html>