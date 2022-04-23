package vertexid.paragon.settings.ctrl;



import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import paragon.core.paramaters.Params;
import vertexid.paragon.settings.svce.LanguageService;

@Controller
@RequestMapping("/ctrl/settings/system/language") 
public class LanguageController {
	
	private static final Log LOG = LogFactory.getLog(ProgramController.class);
	
	@Autowired
	private LanguageService languageService;   
	
	
	@RequestMapping 
	public String listLanguagePgMove() {
		return "settings/system/system_language";
	}
	@RequestMapping("/listLanguage") 
	public Params listLanguage(Params inParams) {
		LOG.debug("listLanguage : "+inParams.toString());
		return languageService.getLanguageGridList(inParams);
	}
	@RequestMapping("/listLangColumns") 
	public Params listAuthColumn(Params inParams) { 
		return languageService.getLangColumns(inParams);
	}
	
	
	@RequestMapping("/saveLanguage") 
	public Params saveLanguage(Params inParams) { 
		return languageService.saveLanguage(inParams);
	} 
}
