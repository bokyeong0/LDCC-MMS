package vertexid.paragon.settings.ctrl;



import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import paragon.core.paramaters.Params;
import vertexid.paragon.settings.svce.ComponentService;

@Controller
@RequestMapping("/ctrl/settings/system/component") 
public class ComponentController {
	
	private static final Log LOG = LogFactory.getLog(ProgramController.class);
	
	@Autowired
	private ComponentService componentService;   
	
	
	@RequestMapping 
	public String listComponentPgMove() {
		return "settings/system/system_component";
	}
	@RequestMapping("/listComponent") 
	public Params listComponent(Params inParams) {
		LOG.debug("listComponent : "+inParams.toString());
		return componentService.getComponentGridList(inParams);
	}
	
	
	@RequestMapping("/saveComponent") 
	public Params saveComponent(Params inParams) { 
		return componentService.saveComponent(inParams);
	}
}
