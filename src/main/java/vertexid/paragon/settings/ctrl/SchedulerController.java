package vertexid.paragon.settings.ctrl;


import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import paragon.core.paramaters.Params;
import paragon.core.utility.scheduler.JobScheduler;
import paragon.core.utility.scheduler.ScheduleJob;
import vertexid.paragon.settings.svce.SchedulerService;

@Controller
@RequestMapping("/ctrl/settings/system/scheduler") 
public class SchedulerController {
	
	private static final Log LOG = LogFactory.getLog(SchedulerController.class);
	
	@Autowired
	private JobScheduler jobScheduler; 
	
	@Autowired
	private SchedulerService schedulerService;  
	
	
	@RequestMapping
	public String pgMove() {
		return "settings/system/system_scheduler";
	}
	
	
	
	@RequestMapping("/listScheduler")  
	public Params listScheduler(Params inParams) {
		LOG.debug("listScheduler : "+inParams.toString());   
		return schedulerService.getSchedulerList(inParams);
	}
	
	@RequestMapping("/start") 
	public Params startScheduler(Params inParams) {
		LOG.debug("Scheduler start : "+inParams.toString());   
		Params outParams = schedulerService.getSchedulerInfo(inParams);
		ScheduleJob job =  new ScheduleJob(outParams);
		jobScheduler.addJob(job);
		int cnt = schedulerService.updateSchedulerUseYn(inParams); 
		if(cnt > 0){
			outParams.setMsgCd("MSG_BAT_SUC_001",new Object[]{job.getJobName()});
		}else{
			outParams.setMsgCd("MSG_BAT_ERR_001");
		}
		return outParams;
	}
	@RequestMapping("/stop") 
	public Params stopScheduler(Params inParams) { 
		LOG.debug("stopScheduler stop: "+inParams.toString());
		Params outParams = schedulerService.getSchedulerInfo(inParams);
		ScheduleJob job =  new ScheduleJob(outParams); 
		jobScheduler.stopJob(job);
		int cnt = schedulerService.updateSchedulerUseYn(inParams); 
		if(cnt > 0){
			outParams.setMsgCd("MSG_BAT_SUC_002",new Object[]{job.getJobName()});
		}else{
			outParams.setMsgCd("MSG_BAT_ERR_001");
		}
		return outParams;
	}
	
	@RequestMapping("/saveScheduler") 
	public Params saveScheduler(Params inParams) {
		LOG.debug("saveScheduler : "+inParams.toString());
		return  schedulerService.saveScheduler(inParams);
	}
	
}
