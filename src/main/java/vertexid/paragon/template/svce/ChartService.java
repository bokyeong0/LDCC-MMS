package vertexid.paragon.template.svce;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Service;

import paragon.core.mvc.stereotype.ParagonService;
import paragon.core.paramaters.Params;

@Service
public class ChartService extends ParagonService {
	
	private static final Log LOG = LogFactory.getLog(ChartService.class);
	
	public Params getPieChart(){
		LOG.debug("ChartService 'getDonutChart' method ...");
		
		Params p = getSqlManager().selectParams("dt_chart", "chart.getPieChart");
		LOG.debug("p : "+p);
		
		return p;
	}
	public Params getBarChart(){
		LOG.debug("ChartService 'getBarChart' method ...");
		
		Params p = getSqlManager().selectParams("dt_chart", "chart.getBarChart");
//		LOG.debug("p : "+p.toString());
		
		return p;
	}
	public Params getInteractiveChart(){
		LOG.debug("ChartService 'getInteractiveChart' method ...");
		
		Params p = getSqlManager().selectParams("dt_chart", "chart.getInteractiveChart");
//		LOG.debug("p : "+p.toString());
		
		return p;
	}
	public Params getInteractiveChart2(){
		LOG.debug("ChartService 'getInteractiveChart2' method ...");
		
		Params p = getSqlManager().selectParams("dt_chart", "chart.getInteractiveChart2");
//		LOG.debug("p : "+p.toString());
		
		return p;
	}
	public Params getMorrisChart(){
		LOG.debug("ChartService 'getMorrisChart' method ...");
		
		Params p = getSqlManager().selectParams("dt_chart", "chart.getMorrisChart");
//		LOG.debug("p : "+p.toString());
		
		return p;
	}
	public Params getPollChartAjax(){
		LOG.debug("ChartService 'getPollChartAjax' method ...");
		
		Params p = getSqlManager().selectParams("dt_chart", "chart.getPollChartAjax");
//		LOG.debug("p : "+p.toString());
		
		return p;
	}
	public Params getStackedBarChartAjax(){
		LOG.debug("ChartService 'getStackedBarChartAjax' method ...");
		
		Params p = getSqlManager().selectParams("dt_chart", "chart.getStackedBarChart");
//		LOG.debug("p : "+p.toString());
		
		return p;
	}
}
