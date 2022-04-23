/**
 * Copyright (c) 2017 VertexID RND, Inc.
 * All right reserved.
 *
 * This software is the confidential and proprietary information of VertexID, Inc.
 * You shall not disclose such Confidential Information and
 * shall use it only in accordance with the terms of the license agreement
 * you entered into with VertexID.
 *
 * Revision History
 * Author              		Date       		Description
 * ------------------   --------------    ------------------
 * "Kim Seon Ho"         	2017. 12. 8. 			First Draft.
 */
package vertexid.mms.board.ctrl;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import paragon.core.paramaters.Params;
import paragon.core.paramaters.datatable.DataTable;
import vertexid.mms.board.svce.NoticeService;

/**
 * [설명]
 *
 * @class NoticeController.java
 * @package vertexid.mms.board.ctrl
 * @author "Kim Seon Ho"
 * @version 1.0
 */
@Controller
@RequestMapping("/ctrl/board/notice")
public class NoticeController {

	private static final Log LOG = LogFactory.getLog(NoticeController.class);
	
	@Autowired
	private NoticeService noticeService;  
	
	@RequestMapping
	public String noticePageMove(){
		LOG.debug("NoticeController noticePageMove()");
		return "board/notice";
	}
	
	@RequestMapping("/listBoardNotice")   /*공지사항 리스트*/
	public Params listBoardNotice(Params inParams) {
		return  noticeService.getBoardNoticeList(inParams);
	}
	
	@RequestMapping("/noticeNewPopup") 
	public String noticeNewPopup(Params inParams) {
		return  "board/noticeNew";
	}
	
	@RequestMapping("/noticeViewPopup") 
	public String noticeViewPopup(Params inParams) {
		return  "board/noticeView";
	}
	
	@RequestMapping("/noticeModPopup") 
	public String noticeModPopup(Params inParams) {
		return  "board/noticeModify";
	}		
	
	@RequestMapping("/noticeNewPartnerComboList") 
	public DataTable noticeNewPartnerComboList(Params inParams) {
		return  noticeService.noticeNewPartnerComboList(inParams);
	}
	
	@RequestMapping("/saveBoardNotice") 
	public Params saveBoardNotice(Params inParams) {
		return  noticeService.saveBoardNotice(inParams);
	}
	
	@RequestMapping("/viewBoardNotice") 
	public Params viewBoardNotice(Params inParams) {
		return  noticeService.viewBoardNotice(inParams);
	}	
	
	@RequestMapping("/viewNoticeParterList") 
	public Params viewNoticeParterList(Params inParams) {
		return  noticeService.viewNoticeParterList(inParams);
	}	

}
