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
 * MINE 한성진			2017. 3. 14. 			First Draft.
 */
package vertexid.mms.standard.ctrl;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import paragon.core.paramaters.Params;
import vertexid.mms.standard.svce.StandardPreventiveService;

/**
 * [설명]
 *
 * @class StandardPreventiveController.java
 * @package vertexid.mms.standard.ctrl
 * @author 한성진
 * @version 1.0
 */
@Controller
@RequestMapping("/ctrl/standard/preventive")
public class StandardPreventiveController {
	
	private static final Log LOG = LogFactory.getLog(StandardPreventiveController.class);
	
	@Autowired
	private StandardPreventiveService standardPreventiveService;  
	
	/**
	 * [설명] 
	 * 
	 * @Author 한성진
	 * @Date 2017. 3. 16.
	*/
	@RequestMapping
	public String standardPreventivePageMove(){
		LOG.debug("StandardPreventiveController standardPreventivePageMove()");
		
		return "standard/standard_preventive";
	}
	
	/**
	 * [설명] 
	 * 
	 * @Author 한성진
	 * @Date 2017. 3. 16.
	 */
	@RequestMapping("/listPreventive")
	public Params listStndPrdTypeLv3(Params inParams){
		LOG.debug("StandardPreventiveController listPreventive()");
		
		return standardPreventiveService.getPreventiveList(inParams);
	}
	
	@RequestMapping("/savePreventive")
	public Params savePreventive(Params inParams){
		LOG.debug("StandardPreventiveController savePreventive()");
		
		return standardPreventiveService.savePreventive(inParams);
	}
}
