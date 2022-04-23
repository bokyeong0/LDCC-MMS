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
package vertexid.mms.check.svce;

import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Service;

import paragon.core.mvc.stereotype.ParagonService;
import paragon.core.paramaters.Params;
import paragon.core.paramaters.ParamsFactory;

/**
 * [설명]
 *
 * @class PreventiveCheckListService.java
 * @package vertexid.mms.check.svce
 * @author "Kim Seon Ho"
 * @version 1.0
 */
@Service
public class PreventiveCheckListService extends ParagonService {

	private static final Log LOG = LogFactory.getLog(PreventiveCheckListService.class);

	public Params getPreventiveCheckList(Params inParams) {
		LOG.debug("PreventiveCheckListService getPreventiveCheckList : "+inParams);
		return getSqlManager().selectGridParams("PreventiveCheckListService.getPreventiveCheckList",inParams);
	}
	
	
	/**
	 * 
	 * [설명] 예방정검 유의사항 내용 등록
	 * 
	 * @Author "Kim Seon Ho"
	 * @Date 2017. 12. 11.
	 */
	public Params getPrventiveCheckNoticeNewSave(Params inParams){
		Params outParams = ParamsFactory.createParams(inParams);
		int cnt = getSqlManager().update("PreventiveCheckListService.getPrventiveCheckNoticeNewSave", inParams);
		if ( cnt < 1) {
			outParams.setMsgCd("MSG_COM_ERR_015");
			outParams.setStsCd(200);
		} else {
			outParams.setMsgCd("MSG_COM_SUC_003");
			outParams.setStsCd(100);
		}		
		return outParams;
	}

	/**
	 * 
	 * [설명] 예방점검 점포별 상세조회
	 * 
	 * @Author "Kim Seon Ho"
	 * @Date 2018. 1. 3.
	 */
	public Params getPreventiveCheckStrInfo(HttpSession session, Params inParams) {
		LOG.debug("PreventiveCheckListService getPreventiveCheckStrInfo : "+inParams);
		
		return getSqlManager().selectParams("PreventiveCheckListService.getPreventiveCheckStrInfo", inParams);
	}
	
	/**
	 * 
	 * [설명] 예방점검 점포별 상세조회 리스트
	 * 
	 * @Author "Kim Seon Ho"
	 * @Date 2018. 1. 3.
	 */
	public Params getPreventiveCheckStrInfoList(HttpSession session, Params inParams) {
		LOG.debug("PreventiveCheckListService getPreventiveCheckStrInfoList : "+inParams);
		Params outParams = ParamsFactory.createParams(inParams);
		outParams = getSqlManager().selectGridParams("PreventiveCheckListService.getPreventiveCheckStrInfoList", inParams);
		
		return outParams;
	}
	/**
	 * 
	 * [설명] SR접수> 예방정검 이력조회 
	 * 
	 * @Author 유승우
	 * @Date 2018. 01. 17.
	 */
	
	public Params getPreventHstList(Params inParams) {
		return getSqlManager().selectGridParams("PreventiveCheckListService.getPreventHstList",inParams);
	}
	
	
	int cnt = 0;
	protected String getDataTablePathStr(HttpSession session, String path){
		String OS = System.getProperty("os.name").toLowerCase();
		if (OS.indexOf("win") >= 0) {
			if(path.indexOf("/") > 0){
				path = path.replaceAll("[/]+", "\\");
			}else{
				path = path.replace(session.getServletContext().getRealPath("\\"), "");
			}
			
		} else if (OS.indexOf("mac") >= 0) {
			if(path.indexOf("\\") > 0){
				path = path.replaceAll("[\\]+", "/");
			}else{
				path = path.replace(session.getServletContext().getRealPath("/"), "");
			}
		} else {
			if(path.indexOf("\\") > 0){
				path = path.replaceAll("[\\]+", "/");
			}else{
				path = path.replace(session.getServletContext().getRealPath("/"), "");
			}
		}
		return path;
	}
	
	public Params viewReport(Params inParams) {
		return getSqlManager().selectGridParams("PreventiveCheckListService.viewReport", inParams);
	}	
}
