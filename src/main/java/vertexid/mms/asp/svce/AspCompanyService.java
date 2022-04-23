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
 * "Han Seong Jin"         	2017. 2. 27. 			First Draft.
 */
package vertexid.mms.asp.svce;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Service;

import paragon.core.mvc.stereotype.ParagonService;
import paragon.core.paramaters.Params;
import paragon.core.paramaters.ParamsFactory;
import paragon.core.paramaters.datatable.DataTable;

/**
 * [설명]
 *
 * @class AspCompanyService.java
 * @package vertexid.paragon.settings.svce
 * @author "Han Seong Jin"
 * @version 1.0
 */

@Service
public class AspCompanyService extends ParagonService {
	
	private static final Log LOG = LogFactory.getLog(AspCompanyService.class);
	
	/**
	 * 
	 * AspCompany List 조회 
	 * 
	 * @Author Han Seong Jin
	 * @Date 2017. 02. 27.
	 */
	public Params getAspCompanyList(Params inParams) {
		LOG.debug("AspCompanyService getAspCompanyList()");
		return getSqlManager().selectGridParams("AspCompanyService.getAspCompanyList",inParams);
	}
	
	public Params getAspCompNameList(Params inParams) {
		LOG.debug("AspCompanyService getAspCompNameList()");
		return getSqlManager().selectGridParams("AspCompanyService.getAspCompNameList",inParams);
	}
	
	public Params getMaAspCompNameList(Params inParams) {
		LOG.debug("AspCompanyService getMaAspCompNameList()");
		return getSqlManager().selectGridParams("AspCompanyService.getMaAspCompNameList",inParams);
	}
	
	public Params getCheckAspCompCd(Params inParams){
		LOG.debug("AspCompanyService getCheckAspCompCd()");
		Params outParams = ParamsFactory.createOutParams(inParams);
		
		outParams = getSqlManager().selectGridParams("AspCompanyService.getCheckAspCompCd", inParams);
		
		String postAspCompCd = (String)inParams.getDataTable("dt_grid").get(0).getParam("ASP_COMP_CD");
		String searchAspCompCd = (String)outParams.getDataTable("dt_grid").get(0).getParam("ASP_COMP_CD");
		int cnt = Math.toIntExact((Long)outParams.getDataTable("dt_grid").get(0).getParam("CNT"));
		
		if(postAspCompCd == searchAspCompCd || postAspCompCd.equals(searchAspCompCd)){
			cnt = 0;
		}
		
		outParams.setParam("result", cnt);
		return outParams;
	}
	
	public Params saveAspCompany(Params inParams) {
		LOG.debug("AspCompanyService saveAspCompany()");
		
		Params outParams = ParamsFactory.createOutParams(inParams);
		
		String modFlag = inParams.getString("modFlag");
		int cnt = 0;
		if(modFlag.equals("INSERT")){
			cnt = getSqlManager().insert("AspCompanyService.insertAspCompany", inParams);
		}else{
			cnt = getSqlManager().update("AspCompanyService.updateAspCompany", inParams);
		}
		

		if ( cnt < 1) {
			outParams.setMsgCd("MSG_COM_ERR_015");
			outParams.setStsCd(200);
		} else {
			outParams.setMsgCd("MSG_COM_SUC_003");
			outParams.setStsCd(100);
		}
		
		return outParams; 
	}
	
	
	public Params deleteAspCompany(Params inParams) {
		LOG.debug("AspCompanyService deleteAspCompany()");
		Params outParams = ParamsFactory.createOutParams(inParams);
		int cnt = getSqlManager().update("AspCompanyService.deleteAspCompany", inParams);
		
		if ( cnt < 1) {
			outParams.setMsgCd("MSG_COM_ERR_072");
			outParams.setStsCd(200);
		} else {
			outParams.setMsgCd("MSG_COM_SUC_006");
			outParams.setStsCd(100);
		}
		
		return outParams; 
	}
	
	public Params getAspCompInfo(Params inParams) {
		LOG.debug("AspCompanyService getAspCompInfo()");
		return getSqlManager().selectOneParams("AspCompanyService.getAspCompInfo", inParams);
	}
	public DataTable getAspCompanyComboList() {
		LOG.debug("AspCompanyService getAspCompanyComboList()");
		return getSqlManager().selectDataTable("AspCompanyService.getAspCompanyComboList");
	}
}
