package vertexid.paragon.settings.ctrl;


import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import paragon.core.paramaters.Params;
import vertexid.paragon.settings.svce.BoardService;

@Controller
@RequestMapping("/ctrl/settings/system/board") 
public class BoardController {
	
	private static final Log LOG = LogFactory.getLog(BoardController.class);
	
	@Autowired
	private BoardService boardService;  
	
	
	@RequestMapping("/") 
	public String listCommmonCodePgMove() {
		return "settings/system_code";
	}
	
	
	
	@RequestMapping("/listUser") 
	public Params listUser(Params p) {
		LOG.debug("listUser : "+p.toString());   
		return boardService.getUserList(p);
	}
	
}
