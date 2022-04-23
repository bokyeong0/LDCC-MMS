package vertexid.paragon.comm.job;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.scheduling.quartz.QuartzJobBean;


public class ParagonReloadJob extends QuartzJobBean { 
 
	private static final Log LOG = LogFactory.getLog(ParagonReloadJob.class);

	@Override
	protected void executeInternal(JobExecutionContext ctx) throws JobExecutionException {
		LOG.debug("ParagonReloadJob :!!!!!!!!!!!");
	}

}
