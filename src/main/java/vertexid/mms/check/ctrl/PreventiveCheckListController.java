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
 * "Kim Seon Ho"         	2017. 12. 12. 			First Draft.
 */
package vertexid.mms.check.ctrl;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import paragon.core.paramaters.Params;
import paragon.core.paramaters.ParamsFactory;
import vertexid.mms.check.svce.PreventiveCheckListService;
import vertexid.paragon.comm.util.excelForm.ExcelServiceReport;

/**
 * [설명]
 *
 * @class PreventiveCheckListController.java
 * @package vertexid.mms.check.ctrl
 * @author "Kim Seon Ho"
 * @version 1.0
 */
@Controller
@RequestMapping("/ctrl/preventiveCheck/preventiveCheckList")
public class PreventiveCheckListController {
	
	private static final Log LOG = LogFactory.getLog(PreventiveCheckListController.class);
	
	@Autowired
	private PreventiveCheckListService preventiveCheckListService; 
	
	@RequestMapping	
	public String preventiveCheckListPageMove() {
		LOG.debug("preventiveCheckListPgMove ==========");
		return "check/preventiveCheckList";
	}	
	
	@RequestMapping("/getPreventiveCheckList")
	public Params getPreventiveCheckList(Params inParams){
		return preventiveCheckListService.getPreventiveCheckList(inParams);
	}
	
	@RequestMapping("/noticeNew")
	public String noticeNew(Params inParams) throws Exception {
		LOG.debug("preventiveCheckNoticeNew noticeNew");
		return "check/preventiveCheckNoticeNew";
	}
	
	@RequestMapping("/noticeNewSave")
	public Params preventiveCheckNoticeNewSave(Params inParams) throws Exception {
		LOG.debug("preventiveCheckNoticeNewSave");
		return preventiveCheckListService.getPrventiveCheckNoticeNewSave(inParams);
	}	
	
	@RequestMapping("/viewPreventiveCheckStrInfoPopup")
	public String viewPreventiveCheckStrInfoPopup(Params inParams) throws Exception {
		return "check/preventiveCheckListStrInfo";
	}

	@RequestMapping("/getPreventiveCheckStrInfo")
	public Params getPreventiveCheckStrInfo(HttpSession session, Params inParams) throws Exception {
		LOG.debug("getPreventiveCheckStrInfo");
		return preventiveCheckListService.getPreventiveCheckStrInfo(session, inParams);
	}
	
	@RequestMapping("/getPreventiveCheckStrInfoList")
	public Params getPreventiveCheckStrInfoList(HttpSession session, Params inParams) throws Exception {
		LOG.debug("getPreventiveCheckStrInfoList");
		return preventiveCheckListService.getPreventiveCheckStrInfoList(session, inParams);
	}
	
	@RequestMapping("/serviceReportExcel")
	public Params serviceReportExcel (HttpServletResponse response, Params inParams, HttpServletRequest request) {
		LOG.debug("serviceReportExcel ----------->");
		
		Params outParams = ParamsFactory.createOutParams(inParams);
		
		outParams = preventiveCheckListService.viewReport(inParams);
	//	LOG.debug("serviceReportExcel:"+outParams);
		try {
			ExcelServiceReport esr = new ExcelServiceReport();
			esr.preventiveCheckListServiceReportExcelDownload(response, request, outParams);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		LOG.debug("serviceReportExcel <-----------");
		return outParams;
	}
	
}

