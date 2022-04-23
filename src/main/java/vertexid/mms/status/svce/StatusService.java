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
 * "Kim Jin Ho"         	2017. 6. 14. 			First Draft.
 */
package vertexid.mms.status.svce;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Service;

import paragon.core.mvc.stereotype.ParagonService;
import paragon.core.paramaters.CommParams;
import paragon.core.paramaters.Params;

/**
 * [설명]
 *
 * @class StatusService.java
 * @package vertexid.mms.status.svce
 * @author "Kim Jin Ho"
 * @version 1.0
 */
@Service
public class StatusService extends ParagonService {
	
	private static final Log LOG = LogFactory.getLog(StatusService.class);
	
	
	/**
	 * [설명]
	 * 권역관리 리스트
	 * @Author 최판석
	 * @Date 2017. 3. 20.
	*/
	public Params getRcptUserList(Params inParams) {
		LOG.debug("getRcptUserList()");
		Params outParams = getSqlManager().selectGridParams("StatusService.getRcptUserList",inParams);
//		inParams.setParam("pragonAutoCounting", "false");
		Params sumParams = getSqlManager().selectOneParams("StatusService.getRcptUserSum",inParams);
		outParams.setParam("userdata", sumParams);
//		outParams.setParam("totalRcptCount", "231");
		return outParams;
			
	}
	
	/**
	 * [설명] 
	 * 
	 * @Author "Han Seong Jin"
	 * @Date 2017. 12. 11.
	*/
	public Params getRcptStoreList(Params inParams) {
		LOG.debug("getRcptStoreList()");
		Params outParams = getSqlManager().selectGridParams("StatusService.getRcptStoreList",inParams);
		inParams.setParam("pragonAutoCounting", "false");
		Params sumParams = getSqlManager().selectOneParams("StatusService.getRcptStoreSum",inParams);
		int time = sumParams.getInteger("MON_07");
		int mok;
		int nmg;
		mok = time/60;
		nmg = time%60;
		String test = mok+"시간  "+nmg+" 분"; 
		sumParams.setParam("MON_07", test);
		outParams.setParam("userdata", sumParams);
		outParams.setParam("totalRcptCount", "231");
		return outParams;
		
	}
	
	/**
	 * [설명]
	 * 권역관리 리스트
	 * @Author 최판석
	 * @Date 2017. 3. 20.
	 */
	public Params getRcptPrdList(Params inParams) {
		LOG.debug("getRcptPrdList()");
		Params outParams = getSqlManager().selectGridParams("StatusService.getRcptPrdList",inParams);
		inParams.setParam("pragonAutoCounting", "false");
		Params sumParams = getSqlManager().selectOneParams("StatusService.getRcptPrdSum",inParams); 
		outParams.setParam("userdata", sumParams);
		outParams.setParam("totalRcptCount", "231");
		return outParams;
		
	}
	
	/**
	 * [설명]
	 * 연간 건별 처리 현황 LINE-CHART(꺾은선 차트)
	 * @Author 한성진
	 * @Date 2017. 3. 20.
	 * 수정 : 김선호 - 주석추가
	 */
	public Params getLineChart(Params inParams){ 
		LOG.debug("StatusService 'getLineChart' method ..." + inParams);
		return getSqlManager().selectParams("dt_chart", "StatusService.getLineChart", inParams);
	}
	
	/**
	 * [설명]
	 * 고객사별 장애율 PIE-CHART
	 * @Author 한성진
	 * @Date 2017. 3. 20.
	 * 수정 : 김선호 - 주석추가
	 */
	public Params getPieChart(Params inParams){
		LOG.debug("StatusService 'getPieChart' method ...");
		return getSqlManager().selectParams("dt_chart", "StatusService.getPieChart", inParams);
	}
	
	public Params getBrndPieChart(Params inParams){
		LOG.debug("StatusService 'getBrndPieChart' method ..." + inParams);
		return getSqlManager().selectParams("dt_chart", "StatusService.getBrndPieChart", inParams);
	}
	
	/**
	 * [설명]
	 * 연간 장애처리율
	 * @Author 한성진
	 * @Date 2017. 3. 20.
	 * 수정 : 김선호 - 주석추가
	 */
	public Params getMonthObsProcRate(Params inParams){ 
		LOG.debug("StatusService 'getYearObsProcRate' method ...");
		Params outParams = new CommParams();
		outParams = getSqlManager().selectOneParams("StatusService.getMonthObsProcRate", inParams); //연간 장애처리율
		return outParams;
	}
	
	/**
	 * [설명]
	 * 주간 장애처리율
	 * @Author 한성진
	 * @Date 2017. 3. 20.
	 * 수정 : 김선호 - 주석추가
	 */
	public Params getWeekObsProcRate(Params inParams){ 
		LOG.debug("StatusService 'getWeekObsProcRate' method ...");
		Params outParams = new CommParams();
		outParams = getSqlManager().selectOneParams("StatusService.getWeekObsProcRate", inParams);
		return outParams;
	}
	
	
	/**
	 * [설명]
	 * 오늘 장애현황
	 * @Author 한성진
	 * @Date 2017. 3. 20.
	 * 수정 : 김선호 - 주석추가
	 */
	public Params getTodayObsStatus(Params inParams){ 
		LOG.debug("StatusService 'getTodayObsStatus' method ...");
		Params outParams = new CommParams();
		outParams = getSqlManager().selectOneParams("StatusService.getTodayObsStatus", inParams); 
		return outParams;
	}
}
