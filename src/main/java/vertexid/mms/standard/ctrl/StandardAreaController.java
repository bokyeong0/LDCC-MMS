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
 * MINE 최판석			2017. 3. 14. 			First Draft.
 */
package vertexid.mms.standard.ctrl;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import paragon.core.paramaters.Params;
import vertexid.mms.standard.svce.StandardAreaService;

/**
 * [설명]
 *
 * @class StandardAreaController.java
 * @package vertexid.mms.standard.ctrl
 * @author 최판석
 * @version 1.0
 */
@Controller
@RequestMapping("/ctrl/standard/area")
public class StandardAreaController {
	
	private static final Log LOG = LogFactory.getLog(StandardAreaController.class);
	
	@Autowired
	private StandardAreaService standardAreaService;  
	
	
	@RequestMapping
	public String standardAreaPageMove(){
		LOG.debug("StandardAreaController standardAreaPageMove()");
		return "standard/standard_area";
	}
	
	
	/**
	 * [설명]
	 * 권역관리 리스트
	 * @Author 최판석
	 * @Date 2017. 3. 20.
	*/
	@RequestMapping("/listStndArea")
	public Params listStndArea(Params inParams){
		return standardAreaService.getStndAreaList(inParams);
	}
	
	@RequestMapping("/listStndAreaName")
	public Params listStndAreaName(Params inParams){
		return standardAreaService.getStndAreaNameList(inParams);
	}
	
	/**
	 * [설명]
	 * 권역관리 저장 / 삭제 / 수정 
	 * @Author 최판석
	 * @Date 2017. 3. 20.
	*/
	@RequestMapping("/saveStndArea")
	public Params saveStndArea(Params inParams){
		LOG.debug("StandardAreaController saveStndArea()");
		return standardAreaService.saveStndAreaList(inParams);
	}
	
	
	
}
