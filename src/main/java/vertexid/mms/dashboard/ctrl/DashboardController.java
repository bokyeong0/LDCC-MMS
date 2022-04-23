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
 * MINE 최판석			2017. 3. 14. 			First Draft.
 */
package vertexid.mms.dashboard.ctrl;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import paragon.core.paramaters.Params;
import vertexid.mms.dashboard.svce.DashboardService;

/**
 * 데시보드
 *
 * @class DashboardController.java
 * @package vertexid.mms.dashboard.ctrl
 * @author Kim Jin Ho
 * @version 1.0
 */
@Controller
@RequestMapping("/ctrl/dashboard")
public class DashboardController {
	
	private static final Log LOG = LogFactory.getLog(DashboardController.class);
	
	@Autowired DashboardService dashboardService;
	
	/**
	 * 처리현황
	 * 
	 * @Author Kim Jin Ho
	 * @Date 2017. 6. 27.
	*/
	@RequestMapping("/board01")
	public String dashboard01PageMove(){
		return "dashboard/board01";
	}
	/**
	 * 고객사별 현황
	 * 
	 * @Author Kim Jin Ho
	 * @Date 2017. 6. 27.
	 */
	@RequestMapping("/board02")
	public String dashboard02PageMove(){
		return "dashboard/board02";
	}
	/**
	 * 대응현황
	 * 
	 * @Author Kim Jin Ho
	 * @Date 2017. 6. 27.
	 */
	@RequestMapping("/board03")
	public String dashboard03PageMove(){
		return "dashboard/board03";
	}
	
	@RequestMapping("/viewDashboard")
	public Params viewDashBoard(Params inParams){
		LOG.debug("DashboardController viewPieChart() start ...");
		return dashboardService.getDashboardView1(inParams);
	}
	
	@RequestMapping("/lineChart") 
	public Params viewLineChart(Params inParams){
		LOG.debug("DashboardController viewLineChart() start ...");
		
		return dashboardService.getLineChartView(inParams);
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
//	@RequestMapping("/viewPieChart1")
//	public Params viewPieChart1(Params inParams){
//		LOG.debug("DashboardController viewPieChart() start ...");
//		return dashboardService.getPieChartView1(inParams);
//	}
//	@RequestMapping("/viewPieChart2")
//	public Params viewPieChart2(Params inParams){
//		LOG.debug("DashboardController viewPieChart() start ...");
//		return dashboardService.getPieChartView2(inParams);
//	}
//	@RequestMapping("/viewPieChart3")
//	public Params viewPieChart3(Params inParams){
//		LOG.debug("DashboardController viewPieChart() start ...");
//		return dashboardService.getPieChartView3(inParams);
//	}
//	@RequestMapping("/viewPieChart4")
//	public Params viewPieChart4(Params inParams){
//		LOG.debug("DashboardController viewPieChart() start ...");
//		return dashboardService.getPieChartView4(inParams);
//	}
	
	
//	@RequestMapping("/viewPieChart02")
//	public Params viewPieChart02(Params inParams){
//		LOG.debug("DashboardController viewDashboard2() start ..."+ inParams);
//		return dashboardService.getPieChartView02(inParams); 
//	}
//	
//	@RequestMapping("/viewLineChart02")
//	public Params viewDashboard3(Params inParams){
//		LOG.debug("DashboardController viewLineChart02() start ..."+ inParams);
//		return dashboardService.getLineChartView02(inParams); 
//	}
//	
//	@RequestMapping("/viewDashboard03")
//	public Params viewDashboard4(Params inParams){
//		LOG.debug("DashboardController viewDashboard3() start ..."+ inParams);
//		return dashboardService.getDashboardView03(inParams); 
//	}
	
}
