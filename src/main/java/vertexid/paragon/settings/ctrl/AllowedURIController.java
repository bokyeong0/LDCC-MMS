package vertexid.paragon.settings.ctrl;


import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import paragon.core.paramaters.Params;
import vertexid.paragon.settings.svce.AllowedURIService;

@Controller
@RequestMapping("/ctrl/settings/system/alloweduri") 
public class AllowedURIController {
	
	private static final Log LOG = LogFactory.getLog(AllowedURIController.class);
	
	@Autowired
	private AllowedURIService allowUrlService;  
	
	
	/** @Method Name : pgMove
	  * @작성일 : 2016. 11. 1.
	  * @작성자 : "Kim Jin Ho"
	  * @변경이력 : 
	  * @Method 설명 :
	  */
	@RequestMapping 
	public String pgMove() {
		return "/settings/system/system_alloweduri";
	}
	
	@RequestMapping("/listAllowedURI")  
	public Params listAllowedRUI(Params inParams) { 
		return allowUrlService.getAllowedURIList(inParams);
	} 
	
	@RequestMapping("/saveAllowedURI") 
	public Params saveAllowedURI(Params params){
		LOG.debug("saveAllowedURI");
		Params out = allowUrlService.saveAllowedURI(params);
		return out;
	}
}
