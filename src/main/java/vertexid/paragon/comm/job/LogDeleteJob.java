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
 * "Shin Dong Cheol"     2017. 11. 15. 		First Draft.
 */
package vertexid.paragon.comm.job;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.quartz.QuartzJobBean;
import org.springframework.web.context.support.SpringBeanAutowiringSupport;

import vertexid.paragon.settings.svce.LogService;

/**
 * [설명]
 * 
 * @class LogDeleteJob.java
 * @package vertexid.paragon.comm.job
 * @author "Shin Dong Cheol"
 * @version 1.0
 */
public class LogDeleteJob extends QuartzJobBean  {

	private static final Log LOG = LogFactory.getLog(LogDeleteJob.class);
	
	@Autowired
	private LogService logService;
	
	@Override
	protected void executeInternal(JobExecutionContext ctx) throws JobExecutionException {
		LOG.debug("scheduler Start!");
		runDeleteSchedule();
		LOG.debug("scheduler End!");
	}
	
	public void runDeleteSchedule(){
		LOG.debug("Call run Delete schedule Function!");
		SpringBeanAutowiringSupport.processInjectionBasedOnCurrentContext(this);
		logService.deleteLoginInfo();
		logService.deleteProInfo();
	}
}
