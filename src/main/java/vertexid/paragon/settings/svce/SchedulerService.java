package vertexid.paragon.settings.svce;


import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Service;

import paragon.core.mvc.stereotype.ParagonService;
import paragon.core.paramaters.Params;
import paragon.core.paramaters.ParamsFactory;
import paragon.core.paramaters.datatable.datarow.DataRow;
import paragon.core.utility.scheduler.JobScheduler;
import paragon.core.utility.scheduler.ScheduleJob;

@Service
public class SchedulerService extends ParagonService {
	
	private static final Log LOG = LogFactory.getLog(SchedulerService.class);
	
	
	public Params getSchedulerList(Params inParams) {
		return getSqlManager().selectGridParams("SchedulerService.getSchedulerList", inParams);
	}
	
	public Params saveScheduler(Params inParams) {
		Params outParams = ParamsFactory.createParams(inParams); 
		int cnt = 0;
		for(DataRow dr: inParams.getDataTable("dt_scheduler")){
			LOG.debug(dr);
			String modFlag = dr.getString("modFlag");
			if(modFlag.equals("INSERT")){
				cnt +=  getSqlManager().insert("SchedulerService.insertScheduler",dr);
			}else if(modFlag.equals("UPDATE")){
				cnt +=  getSqlManager().update("SchedulerService.updateScheduler",dr);
			}else if(modFlag.equals("DELETE")){
				ScheduleJob job =  new ScheduleJob();
				job.setJobId(dr.getString("scheSeq")); 
				job.setJobName(dr.getString("scheNm")); 
				JobScheduler.deleteJob(job);
				cnt +=  getSqlManager().delete("SchedulerService.deleteScheduler",dr);
			}
		}
		outParams.setMsgCd("MSG_COM_SUC_007", new Object[]{cnt});
		return outParams;
	}

	public Params getSchedulerInfo(Params inParams) {
		return getSqlManager().selectOneParams("SchedulerService.getSchedulerInfo", inParams);
	}

	public int updateSchedulerUseYn(Params inParams) {
		return getSqlManager().update("SchedulerService.updateSchedulerUseYn", inParams);
	}

}
