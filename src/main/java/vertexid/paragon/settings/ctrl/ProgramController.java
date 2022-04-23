package vertexid.paragon.settings.ctrl;


import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import paragon.core.paramaters.Params;
import paragon.core.paramaters.datatable.DataTable;
import vertexid.paragon.settings.svce.ProgramService;

@Controller
@RequestMapping("/ctrl/settings/system/program") 
public class ProgramController {
	
	private static final Log LOG = LogFactory.getLog(ProgramController.class);
	
	@Autowired
	private ProgramService programService;   
	
	
	@RequestMapping
	public String listProgramPgMove() {
		return "settings/system/system_program";
	}
	
	
	@RequestMapping("/listProgram") 
	public Params listProgram(Params inParams) {
		LOG.debug("listProgram : "+inParams.toString());
		Params outParams = programService.getProgramGridList(inParams);
		return outParams;
	}
	
	@RequestMapping("/listProgramName") 
	public DataTable programNm(Params p) {
		LOG.debug("listProgramName : "+p.toString());
		return  programService.getProgramNameList(p);
	}
	
	@RequestMapping("/saveProgram") 
	public Params saveProgram(Params p) {
		LOG.debug("listProgramName : "+p.toString());
		LOG.debug("listProgramName : "+p);
		return  programService.saveProgram(p);
	}
}
