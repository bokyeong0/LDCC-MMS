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
package vertexid.mms.dashboard.svce;


import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Service;

import paragon.core.mvc.stereotype.ParagonService;
import paragon.core.paramaters.Params;

@Service
public class DashboardService extends ParagonService {
	
	private static final Log LOG = LogFactory.getLog(DashboardService.class);
	
	public Params getDashboardView1(Params inParams){
		LOG.debug("DashboardService 'getPieChartView' method ..." + inParams);
		
		return getSqlManager().selectParams("DashboardService.getDashboard", inParams);
	}
	
	public Params getLineChartView(Params inParams){
		LOG.debug("DashboardService 'getInteractiveChart' method ...");
		return getSqlManager().selectParams("lineChart", "DashboardService.getLineChart", inParams);
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
//	public Params getPieChartView1(Params inParams){
//		LOG.debug("DashboardService 'getPieChartView' method ...");
//		
//		return getSqlManager().selectParams("rcptToday", "DashboardService.getRcptTodayCnt", inParams);
//	}
//	public Params getPieChartView2(Params inParams){
//		LOG.debug("DashboardService 'getPieChartView' method ...");
//		
//		return getSqlManager().selectParams("rcptWeek", "DashboardService.getRcptWeekCnt", inParams);
//	}
//	public Params getPieChartView3(Params inParams){
//		LOG.debug("DashboardService 'getPieChartView' method ...");
//		
//		return getSqlManager().selectParams("rcptMonth", "DashboardService.getRcptMonthCnt", inParams);
//	}
//	public Params getPieChartView4(Params inParams){
//		LOG.debug("DashboardService 'getPieChartView' method ...");
//		
//		return getSqlManager().selectParams("rcptYear", "DashboardService.getRcptYearCnt", inParams);
//	}
	
//	public Params getPieChartView02(Params inParams){
//		LOG.debug("ChartService 'getPieChartView02' method ...");
////		LOG.debug(getSqlManager().selectParams("pieChart", "DashboardService.getPieData", inParams));
//		return getSqlManager().selectGridParams("DashboardService.getPieData", inParams);
//	}
//	public Params getLineChartView02(Params inParams){
//		LOG.debug("ChartService 'getLineChartView02' method ...");
//		Params outP = getSqlManager().selectGridParams("DashboardService.dddd", inParams);
//		outP.setParam("pageable", false);
//		outP.setParam("pragonAutoCounting", false);
//		outP.setParam("countable", false);
//		outP.setParam("labelData", outP.getParam("dt_grid"));
//		outP.setParam("lineChart", getSqlManager().selectParams("DashboardService.getLineChart02", outP).getParam("dt_grid"));
//		return outP;
//	}
//	public Params getDashboardView03(Params inParams){
//		LOG.debug("ChartService 'getDashboardView03' method ...");
//		return getSqlManager().selectParams("DashboardService.getDashboard03", inParams);
//	}
}
