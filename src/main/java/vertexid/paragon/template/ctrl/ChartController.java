package vertexid.paragon.template.ctrl;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


import paragon.core.paramaters.Params;
import vertexid.paragon.template.svce.ChartService;

@Controller
@RequestMapping("/ctrl/template/chart")
public class ChartController {
	
	private static final Log LOG = LogFactory.getLog(ChartController.class);
	
	@Autowired
	private ChartService chartService;
	
	@RequestMapping
	public String templateChart() {
		LOG.debug("templateChart");
		return "template/chart";
	}
	
	@RequestMapping("/pieChartAjax")
	public Params getPieChartAjax(Params p){
		LOG.debug("ChartController getPieChartAjax() start ...");
		
		Params outP = chartService.getPieChart();
//		LOG.debug("outP:::::::::"+outP);
		return outP;
	} 
	@RequestMapping("/barChartAjax")
	public Params getBarChartAjax(Params p){
		LOG.debug("BarController getBarChartAjax() start ...");
		
		Params outP = chartService.getBarChart();
//		LOG.debug("outP:::::::::"+outP);
		return outP;
	} 
	@RequestMapping("/interactiveChartAjax")
	public Params getInteractiveChartAjax(Params p){
		LOG.debug("ChartController getInteractiveChartAjax() start ...");
		LOG.debug("ChartController getInteractiveChartAjax() start ...");
		
		
		Params outP = chartService.getInteractiveChart();
		LOG.debug("outP:::::::::"+outP);
		return outP;
	} 
	@RequestMapping("/multiLineChartAjax")
	public Params getInteractiveChartAjax2(Params p){
		LOG.debug("ChartController getInteractiveChartAjax2() start ...");
		
		Params outP1 = chartService.getInteractiveChart2();
//		LOG.debug("outP:::::::::"+outP);
		return outP1;
	} 
	@RequestMapping("/morrisChartAjax")
	public Params getMorrisChartAjax(Params p){
		LOG.debug("ChartController getMorrisChartAjax() start ...");
		
		Params outP = chartService.getMorrisChart();
//		LOG.debug("outP:::::::::"+outP);
		return outP;
	}
	@RequestMapping("/pollChartAjax")
	public Params getPollChartAjax(Params p){
		LOG.debug("ChartController getPollChartAjax() start ...");
		
		Params outP = chartService.getPollChartAjax();
		LOG.debug("outP:::::::::"+outP);
		return outP;
	} 
	@RequestMapping("/stackedBarChartAjax")
	public Params getStackedBarChartAjax(Params p){
		LOG.debug("ChartController getStackedBarChartAjax() start ...");
		
		Params outP = chartService.getStackedBarChartAjax();
//		LOG.debug("outP:::::::::"+outP);
		return outP;
	} 
}
