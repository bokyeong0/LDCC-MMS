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
 * Kim Jin Ho         	2017. 6. 1. 			First Draft.
 */
package vertexid.mms.status.ctrl;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import paragon.core.paramaters.Params;
import vertexid.mms.status.svce.StatusService;


/**
 * [설명]
 *
 * @class StatusController.java
 * @package vertexid.mms.status.ctrl
 * @author Kim Jin Ho
 * @version 1.0
 */
@Controller
@RequestMapping("/ctrl/status")
public class StatusController {
	
	private static final Log LOG = LogFactory.getLog(StatusController.class);
	
	@Autowired StatusService statusService;
	
	/**
	 * [장애대응현황 페이지 이동] 
	 * 
	 * @Author "Han Seong Jin"
	 * @Date 2017. 12. 5.
	*/
	@RequestMapping("/rcptMap")
	public String statusRcptMapPageMove() {
		LOG.debug("StatusController statusRcptMapPageMove()");
		return "status/status_rcpt_map";
	}
	/**
	 * [점포현황 페이지 이동] 
	 * 
	 * @Author "Han Seong Jin"
	 * @Date 2017. 12. 5.
	*/
	@RequestMapping("/storeMap")
	public String statusStoreMap() {
		LOG.debug("templateButtons");
		return "status/status_store_map";
	}
	/**
	 * [장애처리 현황(엔지니어별) 페이지 이동] 
	 * 
	 * @Author "Han Seong Jin"
	 * @Date 2017. 12. 5.
	*/
	@RequestMapping("/engr")
	public String statusEngrPageMove() {
		LOG.debug("StatusController statusEngrPageMove()");
		return "status/status_engr";
	}
	/**
	 * [장애처리 현황(거래처별) 페이지 이동] 
	 * 
	 * @Author "Han Seong Jin"
	 * @Date 2017. 12. 5.
	*/
	@RequestMapping("/company")
	public String statusCompanyPageMove() { 
		LOG.debug("StatusController statusCompanyPageMove()");
		return "status/status_company";
	}
	/**
	 * [장애처리 현황(벤더별) 페이지 이동] 
	 * 
	 * @Author "Han Seong Jin"
	 * @Date 2017. 12. 5.
	*/
	@RequestMapping("/product")
	public String statusProductPageMove() {
		LOG.debug("StatusController statusProductPageMove()");
		return "status/status_product";
	}
	/**
	 * [엔지니어별 월별 장애처리현황 조회] 
	 * 
	 * @Author "Han Seong Jin"
	 * @Date 2017. 12. 5.
	*/
	@RequestMapping("/listRcptUser")
	public Params rcptUserList(Params inParams) {
		LOG.debug("rcptUserList()");
		
		return statusService.getRcptUserList(inParams);
	}
	
	/**
	 * [점포별 월별 장애처리현황 조회]
	 * 
	 * @Author "Han Seong Jin"
	 * @Date 2017. 12. 5.
	*/
	@RequestMapping("/listRcptStore")
	public Params rcptStoreList(Params inParams) {
		LOG.debug("rcptStoreList()");
		
		return statusService.getRcptStoreList(inParams);
	}
	
	/**
	 * [벤더별 월별 장애처리현황 조회] 
	 * 
	 * @Author "Han Seong Jin"
	 * @Date 2017. 12. 5.
	*/
	@RequestMapping("/listRcptPrd") 
	public Params rcptPrdList(Params inParams) {
		LOG.debug("rcptPrdList()");
		
		return statusService.getRcptPrdList(inParams);
	}
	/**
	 * [설명]
	 * 연간 건별 처리 현황 LINE-CHART(꺾은선 차트)
	 * @Author -
	 * @Date -
	 * 수정 : 김선호 - 주석추가
	 */
	@RequestMapping("/getLineChart")
	public Params getLineChart(Params inParams){
		LOG.debug("StatusController getLineChart() start ...");
		
		return statusService.getLineChart(inParams);
	} 

	@RequestMapping("/getPieChart")
	public Params getPieChart(Params inParams){
		LOG.debug("StatusController getPieChart() start ...");
		
		return statusService.getPieChart(inParams);
	}
	
	@RequestMapping("/getBrndPieChart")
	public Params getBrndPieChart(Params inParams){
		LOG.debug("StatusController getBrndPieChart() start ...");
		
		return statusService.getBrndPieChart(inParams);
	}
	/**
	 * [설명]
	 * 연간 장애처리율
	 * @Author -
	 * @Date -
	 * 수정 : 김선호 - 주석추가
	 */
	@RequestMapping("/getMonthObsProcRate")
	public Params getYearObsProcRate(Params inParams){
		LOG.debug("StatusController getMonthObsProcRate() start ..." + inParams);
		
		return statusService.getMonthObsProcRate(inParams);
	} 
	/**
	 * [설명]
	 * 주간 장애처리율
	 * @Author -
	 * @Date -
	 * 수정 : 김선호 - 주석추가
	 */
	@RequestMapping("/getWeekObsProcRate")
	public Params getWeekObsProcRate(Params inParams){
		LOG.debug("StatusController getWeekObsProcRate() start ...");
		
		return statusService.getWeekObsProcRate(inParams);
	} 
	/**
	 * [설명]
	 * 오늘 장애현황
	 * @Author -
	 * @Date -
	 * 수정 : 김선호 - 주석추가
	 */
	@RequestMapping("/getTodayObsStatus")
	public Params getTodayObsStatus(Params inParams){
		LOG.debug("StatusController getTodayObsStatus() start ...");
		
		return statusService.getTodayObsStatus(inParams);
	} 
}
