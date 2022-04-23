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
 * 최판석		    	2017. 3. 14. 		First Draft.
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
 * @class StandardAreaService.java
 * @package vertexid.mms.standard.svce
 * @author 최판석
 * @version 1.0
 */
@Service
public class StandardAreaService extends ParagonService {
	
	private static final Log LOG = LogFactory.getLog(StandardAreaService.class);
	
	
	/**
	 * [설명]
	 * 권역관리 리스트
	 * @Author 최판석
	 * @Date 2017. 3. 20.
	*/
	public Params getStndAreaList(Params inParams) {
		LOG.debug("getStndAreaList : ");
		return getSqlManager().selectGridParams("StandardAreaService.getStndAreaList",inParams);
	}
	
	
	/**
	 * [설명]
	 * 권역관리 리스트 [value/name]
	 * @Author 최판석
	 * @Date 2017. 4. 07.
	*/
	public Params getStndAreaNameList(Params inParams) {
		LOG.debug("getStndAreaNameList : "+ inParams);
		return getSqlManager().selectGridParams("StandardAreaService.getStndAreaNameList",inParams);
	}

	/**
	 * 권역관리 저장 / 삭제 / 수정 
	 * @Author 최판석
	 * @Date 2017. 3. 20.
	*/
	public Params saveStndAreaList(Params inParams) {
		LOG.debug("StandardAreaService saveStndAreaList()" + inParams);
		Params outParams = ParamsFactory.createOutParams(inParams);
		int cnt = 0;
		for(DataRow dr: inParams.getDataTable("dt_area")){
			String modFlag = dr.getString("modFlag");
			String aspCompCd = inParams.getString("aspCompCd");
			LOG.debug("dr : " + dr);
			
			dr.setParam("aspCompCd", aspCompCd);
			if (modFlag.equals("INSERT")) {
				cnt += getSqlManager().insert("StandardAreaService.insertStndAreaList", dr);
			} else if (modFlag.equals("UPDATE")) {
				cnt += getSqlManager().update("StandardAreaService.updateStndAreaList", dr);
			} else if (modFlag.equals("DELETE")) {
				cnt += getSqlManager().delete("StandardAreaService.deleteStndAreaList", dr);
			}
		}
		
		outParams.setMsgCd("MSG_COM_SUC_007", new Object[]{cnt});
		return outParams;
	}
	
}
