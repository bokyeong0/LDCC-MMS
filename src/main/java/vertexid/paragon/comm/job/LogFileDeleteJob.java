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

import java.io.BufferedReader;
import java.io.InputStreamReader;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.scheduling.quartz.QuartzJobBean;

/**
 * [설명]
 * Was 서버 로그 파일 삭제 Scheduler
 * @class LogFileDeleteJob.java
 * @package vertexid.paragon.comm.job
 * @author "Shin Dong Cheol"
 * @version 1.0
 */
public class LogFileDeleteJob extends QuartzJobBean {
	
	private static final Log LOG = LogFactory.getLog(LogFileDeleteJob.class);
	private static final int deleteDay = 90;
//	private static final String wasLogPath = "/home/mms/tomcat/logs/";
	private static final String wasLogPath = "/home/centos/was-tomcat/logs/";
	
	@Override
	protected void executeInternal(JobExecutionContext ctx) throws JobExecutionException {
		LOG.debug("File Delete Scheduler Start!");
		runFileDeleteScheduler();
		LOG.debug("File Delete Scheduler End!");
	}
	
	/**
	 * 
	 * [설명]
	 *  
	 * Was 서버 로그 파일 삭제 Command Line Process Execution
	 * 
	 * @Author "Shin Dong Cheol"
	 * @Date 2017. 11. 17.
	 */
	public void runFileDeleteScheduler() {
		LOG.debug("File Delete Run Scheduler!!!");
		Process process = null;			//Process
		BufferedReader in = null;		//Process Runtime Read Buffer
		
		try {
			String[] logDeleteCommand = {"find", wasLogPath, "-type f", "-name '*.log'", "-mtime + "+deleteDay+"", "-exec /bin/rm", "-f {} \\;"};
			String[] txtDeleteCommand = {"find", wasLogPath, "-type f", "-name '*.txt'", "-mtime + "+deleteDay+"", "-exec /bin/rm", "-f {} \\;"};
			
			process = Runtime.getRuntime().exec(logDeleteCommand);
			
			in = new BufferedReader(new InputStreamReader(process.getInputStream()));
			String s = null;
			while((s = in.readLine()) != null) {
				LOG.debug("command Result String : "+s);
			}
			
			process = Runtime.getRuntime().exec(txtDeleteCommand);
			s = null;
			while((s = in.readLine()) != null) {
				LOG.debug("command Result String : "+s);
			}
			
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
	}
}
