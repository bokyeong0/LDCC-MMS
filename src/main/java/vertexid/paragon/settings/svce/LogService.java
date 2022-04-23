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
 * "Shin Dong Cheol"     2017. 11. 10. 		First Draft.
 */
package vertexid.paragon.settings.svce;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Service;

import paragon.core.mvc.stereotype.ParagonService;
import paragon.core.paramaters.Params;

/**
 * [설명]
 * 접속 내역 및 로그인 내역 조회, 저장 Service
 * @class LogService.java
 * @package vertexid.paragon.settings.svce
 * @author "Shin Dong Cheol"
 * @version 1.0
 */

@Service
public class LogService extends ParagonService {

	private static final Log LOG = LogFactory.getLog(LogService.class);
	
	/**
	 * 
	 * [설명] 
	 * 로그인 내역 조회 Service
	 * @Author "Shin Dong Cheol"
	 * @Date 2017. 11. 13.
	 */
	public Params getLoginList(Params inParams) {
		LOG.debug("Call LogService getLoginList function!!");
		LOG.debug("inParams : "+inParams.toString());
		return getSqlManager().selectGridParams("LogService.getLoginList", inParams);
	}
	
	/**
	 * 
	 * [설명] 
	 * 로그인 내역 저장 Service
	 * @Author "Shin Dong Cheol"
	 * @Date 2017. 11. 13.
	 */
	public void saveLoginInfo(Params inParams) {
		LOG.debug("Call Save LoginInfo Function!");
		getSqlManager().insert("LogService.saveLoginInfo", inParams);
	}
	
	/**
	 * 
	 * [설명] 
	 * 로그인 내역 Table data 삭제(Scheduler에서 호출 : 90일 지난 로그 삭제)
	 * @Author "Shin Dong Cheol"
	 * @Date 2017. 11. 22.
	 */
	public void deleteLoginInfo() {
		LOG.debug("Call Delete LoginInfo Function");
		getSqlManager().delete("LogService.loginInfoDelete");
	}
	/**
	 * 
	 * [설명] 
	 * 접속 메뉴 내역 조회 Service
	 * @Author "Shin Dong Cheol"
	 * @Date 2017. 11. 13.
	 */
	public Params getProList(Params inParams) {
		LOG.debug("Call LogService getProList function!!");
		LOG.debug("inParams : "+inParams.toString());
		String proNm = (String)inParams.getParam("proNm");
		String userId = (String)inParams.getParam("userId");
		LOG.debug("proNm : "+proNm);
		LOG.debug("userId : "+userId);
		return getSqlManager().selectGridParams("LogService.getProList", inParams);
	}
	
	/**
	 * 
	 * [설명] 
	 * 접속 메뉴 내역 저장 Service
	 * @Author "Shin Dong Cheol"
	 * @Date 2017. 11. 13.
	 */
	public void saveProInfo(Params inParams) {
		LOG.debug("Call Save ProInfo Function!");
		getSqlManager().insert("LogService.saveProInfo", inParams);
	}

	/**
	 * 
	 * [설명] 
	 * 접속 메뉴 내역 Table Data 삭제(Scheduler에서 호출 : 90일 지난 로그 삭제)
	 * @Author "Shin Dong Cheol"
	 * @Date 2017. 11. 22.
	 */
	public void deleteProInfo() {
		LOG.debug("Call Delete ProInfo Function");
		getSqlManager().delete("LogService.proInfoDelete");
	}

}
