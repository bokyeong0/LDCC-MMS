package vertexid.paragon.template.ctrl;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


import paragon.core.paramaters.Params;
import vertexid.paragon.template.svce.TreeService;

@Controller
@RequestMapping("/ctrl/template/tree")
public class TreeController {
	
	private static final Log LOG = LogFactory.getLog(TreeController.class);
	
	@Autowired
	private TreeService ts;

	@RequestMapping
	public String templateTree() {
		LOG.debug("templateTree");
		return "template/tree";
	}
	
	@RequestMapping(value="/ajaxTree")
	public Params getAjaxTree(Params p){
		LOG.debug("TreeController getAjaxTree() start ...");
		
		Params outP = ts.getTreeList();
		LOG.debug("outP::"+outP);
		return outP;
	}
	
	@RequestMapping(value="/createMenuAjax")
	public Params createMenuAjax(Params p){
		LOG.debug("TreeController createMenuAjax() start ...");
		
		ts.createMenuAjax(p);
		return p;
	}
	
}
