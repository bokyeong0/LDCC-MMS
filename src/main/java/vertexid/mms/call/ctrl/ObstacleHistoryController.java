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
 * MINE 김규표			2017. 3. 14. 			First Draft.
 */
package vertexid.mms.call.ctrl;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import paragon.core.paramaters.Params;
import vertexid.mms.call.svce.ObstacleHistoryService;

/**
 * [설명]
 *
 * @class ObstacleHistoryController.java
 * @package vertexid.paragon.call.ctrl
 * @author 
 * @version 1.0
 */
@Controller
@RequestMapping("/ctrl/call/obstacle/hist")
public class ObstacleHistoryController {
	
	private static final Log LOG = LogFactory.getLog(ObstacleHistoryController.class);
	
	@Autowired
	private ObstacleHistoryService obstacleHistoryService;  
	
	/**
	 * 콜센터 처리 화면 이동
	 * @Author 김진호
	 * @Date 2017. 4. 24.
	*/
	@RequestMapping()
	public String obstacleHistoryPageMove(){
		return "call/call_obstacle_hist";
	}
	/**
	 * 콜센터처리 장애 접수POPUP
	 * @Author 김진호
	 * @Date 2017. 4. 24.
	 */
	@RequestMapping("obstacleHistoryRcptPopupMove")
	public String obstacleHistoryRcptPopupMove(){
		return "call/call_obstacle_hist_recp_popup";
	}
	
	/**
	 * 장애접수현황 장애접수 목록조회
	 * @Author 김진호
	 * @Date 2017. 4. 24.
	 */
	@RequestMapping("/listObsSts")
	public Params listHwObstacle(Params inParams){
		return obstacleHistoryService.getObsStsList(inParams);
	}
	
}
