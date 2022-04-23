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
 * 한성진				2017. 3. 14. 		First Draft.
 */
package vertexid.mms.standard.svce;


import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Service;

import paragon.core.mvc.stereotype.ParagonService;
import paragon.core.paramaters.Params;
import paragon.core.paramaters.ParamsFactory;
import paragon.core.paramaters.datatable.datarow.DataRow;

/**
 * [설명]
 *
 * @class StandardProductService.java
 * @package vertexid.mms.standard.svce
 * @author 한성진
 * @version 1.0
 */
@Service
public class StandardPreventiveService extends ParagonService {
	
	private static final Log LOG = LogFactory.getLog(StandardPreventiveService.class);
	
	public Params getPreventiveList(Params inParams) {
		Params outParams = ParamsFactory.createOutParams(inParams);
		LOG.debug("StandardProductService getPreventiveList()");
		
		outParams = getSqlManager().selectGridParams("StandardPreventiveService.getPreventiveList",inParams);
		for(DataRow dr: outParams.getDataTable("dt_grid")){
			dr.setVal("CONTENT", dr.getString("CONTENT").replaceAll("<br />", "\n"));
		}
		return outParams;
	}
	
	public Params savePreventive(Params inParams) {
		LOG.debug("StandardPreventiveService savePreventive()  ");
		
		Params outParams = ParamsFactory.createOutParams(inParams);
		//장비 등록
		int cnt = 0;
		for(DataRow dr: inParams.getDataTable("dt_preventive")){
			String modFlag = dr.getString("modFlag");
			dr.setVal("content", dr.getString("content").replaceAll("\n", "<br />"));
			
			if(modFlag.equals("UPDATE") || modFlag.equals("INSERT")){
				cnt +=  getSqlManager().update("StandardPreventiveService.updatePreventive",dr);
			}
		}
		
		outParams.setMsgCd("MSG_COM_SUC_007", new Object[]{cnt});
	
		return outParams; 
	}

}
