/**
 * Copyright (c) 2017 VertexID RND, Inc.
 * All right reserved.
 *
 * This software is the confidential and proprietary information of VertexID, Inc.
 * You shall not disclose such Confidential Information and
 * shall use it only in accordance with the terms of the license agreement
 * you entered into with VertexID.
 *
 * Revision History
 * Author              		Date       		Description
 * ------------------   --------------    ------------------
 * MINE 이현주			2017. 3. 14. 			First Draft.
 */
package vertexid.mms.standard.ctrl;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import paragon.core.paramaters.Params;
import vertexid.mms.standard.svce.StandardObstacleService;

/**
 * [설명]
 *
 * @class StandardObstacleController.java
 * @package vertexid.mms.standard.ctrl
 * @author 이현주
 * @version 1.0
 */
@Controller
@RequestMapping("/ctrl/standard/obstacle")
public class StandardObstacleController {
	
	private static final Log LOG = LogFactory.getLog(StandardObstacleController.class);
	
	@Autowired
	private StandardObstacleService sandardObstacleService;  
	
	/**
	 * [설명] 
	 * 
	 * @Author 이현주
	 * @Date 2017. 3. 16.
	*/
	@RequestMapping
	public String standardObsPageMove(){
		LOG.debug("StandardObstacleController standardObsPageMove()");
		
		return "standard/standard_obstacle";
	}
	/**
	 * [설명] 
	 * 
	 * @Author 이현주
	 * @Date 2017. 3. 16.
	*/
	@RequestMapping("/listStndObs")
	public Params listStndObs(Params inParams){
		
		return sandardObstacleService.getStndObsList(inParams);
	}
	
	
	@RequestMapping("/saveObstacle") 
	public Params saveObstacle(Params inParams) {
		LOG.debug("listProgramName : "+inParams.toString());
		return  sandardObstacleService.saveObstacle(inParams);
	}
	@RequestMapping("/addObstacle") 
	public Params addObstacle(Params inParams) {
		LOG.debug("addObstacle : "+inParams.toString());
		return  sandardObstacleService.addObstacle(inParams);
	}
	
	@RequestMapping("/listObsCombo")
	public Params listObsCombo(Params inParams){
		
		return sandardObstacleService.getObsComboList(inParams);
	}
	@RequestMapping("/listObsMenual")
	public Params listObsMenual(Params inParams){
		return sandardObstacleService.getObsMenualList(inParams);
	}
	@RequestMapping("/viewObsMenual")
	public Params viewObsMenual(Params inParams){
		return sandardObstacleService.getObsMenualView(inParams);
	}
}
