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
 * 이현주				2017. 3. 14. 		First Draft.
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
 * @class StandardObstacleService.java
 * @package vertexid.mms.standard.svce
 * @author 이현주
 * @version 1.0
 */
@Service
public class StandardObstacleService extends ParagonService {
	
	private static final Log LOG = LogFactory.getLog(StandardObstacleService.class);
	
	
	/**
	 * [설명] 
	 * 
	 * @Author 이현주
	 * @Date 2017. 3. 16.
	*/
	public Params getStndObsList(Params inParams) {
		LOG.debug("getStndObsList : "+inParams);
		return getSqlManager().selectGridParams("StandardObstacleService.getStndObsList",inParams);
	}


	/**
	 * [설명] 
	 * 
	 * @Author "Lee Hyun Ju"
	 * @Date 2017. 3. 21.
	*/
	public Params saveObstacle(Params inParams) {
		LOG.debug("StandardObstacleService saveObstacle()");
		Params outParams = ParamsFactory.createParams(inParams);
		int cnt = 0;
		for (DataRow dr : inParams.getDataTable("dt_obstacle")) {
			String modFlag = dr.getString("modFlag");
			dr.setParam("s_aspCompCd", inParams.getParam("s_companyCd"));
			dr.setParam("s_userId", inParams.getParam("s_userId"));
			dr.setParam("obsLv", inParams.getParam("obsLv"));
			if (modFlag.equals("INSERT")) {
				cnt += getSqlManager().insert("StandardObstacleService.insertObstacle", dr);
			} else if (modFlag.equals("UPDATE")) {
				cnt += getSqlManager().update("StandardObstacleService.updateObstacle", dr);
			} else if (modFlag.equals("DELETE")) {
				cnt += getSqlManager().delete("StandardObstacleService.deleteObstacle", dr);
			}
		}
		outParams.setMsgCd("MSG_COM_SUC_007", new Object[] { cnt });
		outParams.setStsCd(100);
		return outParams;
	}


	public Params getObsComboList(Params inParams) {
		LOG.debug("inP::::::::::::::::::::::::::::::::::::::   "  + inParams);
		return getSqlManager().selectGridParams("StandardObstacleService.getObsComboList",inParams);
	}


	/**
	 * [설명] 
	 * 
	 * @Author Kim Jin Ho
	 * @Date 2017. 5. 23.
	*/
	public Params addObstacle(Params inParams) {
		LOG.debug("StandardObstacleService addObstacle()");
		Params outParams = ParamsFactory.createParams(inParams);
		int cnt = getSqlManager().insert("StandardObstacleService.addObstacle", inParams);
		outParams.setMsgCd("MSG_COM_SUC_007", new Object[] { cnt });
		outParams.setStsCd(100);
		outParams.setParam("obsSeq", inParams.getString("obsSeq"));
		return outParams;
	}


	/**
	 * [설명] 
	 * 
	 * @Author Kim Jin Ho
	 * @Date 2017. 5. 23.
	*/
	public Params getObsMenualList(Params inParams) {
		return getSqlManager().selectGridParams("StandardObstacleService.getObsMenualList",inParams);
	}
	public Params getObsMenualView(Params inParams) {
		return getSqlManager().selectOneParams("StandardObstacleService.getObsMenualView",inParams);
	}
}
