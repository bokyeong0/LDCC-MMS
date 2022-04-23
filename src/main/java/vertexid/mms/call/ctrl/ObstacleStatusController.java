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

import paragon.core.exception.ParagonException;
import paragon.core.file.FileManager;
import paragon.core.paramaters.FileParams;
import paragon.core.paramaters.Params;
import paragon.core.paramaters.ParamsFactory;
import paragon.core.paramaters.datatable.CommDataTable;
import paragon.core.paramaters.datatable.DataTable;
import paragon.core.paramaters.datatable.datarow.CommDataRow;
import paragon.core.paramaters.datatable.datarow.DataRow;
import vertexid.mms.call.svce.ObstacleStatusService;
import vertexid.paragon.comm.push.svce.MobilePushService;
import vertexid.paragon.comm.util.MobileUtil;

/**
 * [설명]
 *
 * @class HardwareObstacleController.java
 * @package vertexid.paragon.call.ctrl
 * @author 
 * @version 1.0
 */
@Controller
@RequestMapping("/ctrl/call/obstacle/status")
public class ObstacleStatusController {
	
	private static final Log LOG = LogFactory.getLog(ObstacleStatusController.class);
	
	
	@Autowired
	private FileManager fileMng;
	
	@Autowired
	private ObstacleStatusService obstacleStatusService;  
	
	@Autowired
	private MobilePushService mobilePushService;  
	
	/**
	 * 콜센터 처리 화면 이동
	 * @Author 김진호
	 * @Date 2017. 4. 24.
	*/
	@RequestMapping()
	public String obstacleStatusPageMove(){
		LOG.debug("ObstacleReceiptController obstacleStatusPageMove()");
		return "call/call_obstacle_status";
	}
	/**
	 * 콜센터 방문 처리 화면 이동
	 * @Author 김진호
	 * @Date 2017. 4. 24.
	 */
	@RequestMapping("/visit")
	public String obstacleVisitPageMove(){
		LOG.debug("ObstacleReceiptController obstacleStatusPageMove()");
		return "call/call_obstacle_visit";
	}
	/**
	 * 콜센터처리 장애 접수POPUP
	 * @Author 김진호
	 * @Date 2017. 4. 24.
	 */
	@RequestMapping("obstacleStatusRcptPopupMove")
	public String obstacleStatusRcptPopupMove(){
		LOG.debug("ObstacleReceiptController obstacleStatusRcptPopupMove()");
		return "call/call_obstacle_status_recp_pupup";
	}
	
	/**
	 * 콜센터처리 장애 접수POPUP
	 * @Author 김진호
	 * @Date 2017. 4. 24.
	 */
	@RequestMapping("obstacleStatusAstPopupMove")
	public String obstacleStatusAstPopupMove(){
		LOG.debug("ObstacleReceiptController obstacleStatusRcptPopupMove()");
		return "call/call_obstacle_status_ast_pupup";
	}
	
	/**
	 * 장애접수현황 장애접수 목록조회
	 * @Author 김진호
	 * @Date 2017. 4. 24.
	 */
	@RequestMapping("/listObsSts")
	public Params listHwObstacle(Params inParams){
		return obstacleStatusService.getObsStsList(inParams);
	}
	
	/**
	 * 장애접수 현황 서명등록
	 * @Author 김진호
	 * @Date 2017. 4. 24.
	 */
	@RequestMapping("/saveReptSign")
	public Params saveReptSign(FileParams fileParams) throws ParagonException {
		LOG.debug("saveReptSign : "+fileParams.getFiles("files").size()); 
		fileMng.setFolder("upload/sign");
		fileMng.setWebRoot(true);
		DataTable fileDt = fileMng.saveFile(fileParams.getFiles("files"));
		LOG.debug("outFileParams : " + fileDt); 
		
		DataTable outFileDt = new CommDataTable();
		Params outParams =  ParamsFactory.createOutParams(fileParams);
		for (DataRow dr :fileDt) {
			dr.getString("");
			DataRow outDr = new CommDataRow();
			outDr.setParam("webPath", dr.getString("webPath"));
			LOG.debug("web File Path ===========> "+dr.getString("webPath"));
			outDr.setParam("fileName", dr.getString("fileName"));
			outFileDt.add(outDr);
		}
		outParams.setDataTable("dt_saveFileInfo",outFileDt);
		outParams.setMsgCd("MSG_COM_SUC_012");
		LOG.debug("outParams::::::::::::::::::::::::::::::::::::::::::::"+outParams);
		LOG.debug("outFileParams : " + outFileDt);
		return outParams;
	}
	
	/**
	 * 장애접수 현황 회사 증빙서류 등록
	 * @Author 김진호
	 * @Date 2017. 4. 24.
	 */
	@RequestMapping("/saveCompFile")
	public Params saveCompFile(FileParams fileParams) throws ParagonException {
		LOG.debug("saveCompFile : "+fileParams.getFiles("files").size()); 
		fileMng.setFolder("upload\\comp");
		fileMng.setWebRoot(true);
		DataTable outFileDt = fileMng.saveFile(fileParams.getFiles("files"));
		LOG.debug("outFileParams : " + outFileDt);
		Params outParams =  ParamsFactory.createOutParams(fileParams);
		outParams.setDataTable("dt_saveFileInfo",outFileDt);
		outParams.setMsgCd("MSG_COM_SUC_012");
		
		LOG.debug("outFileParams : " + outFileDt);
		
		return outParams;
	}
	
	/**
	 * 장애접수 현황 장애 처리 등록
	 * @Author 김진호
	 * @Date 2017. 4. 24.
	 */
	@RequestMapping("/saveObsSts")
	public Params saveRcptSts(Params inParams){
		Params outParmas = obstacleStatusService.saveObsSts(inParams);
		String pushType =  inParams.getString("pushType");
		String stsCd = outParmas.getStsCd();
		LOG.debug("saveRcptSts PUSH: "+stsCd+"\n장애접수 처리저장 데이터 : "+inParams);
		/*
		if(stsCd.equals("100")){
			if(pushType != null &&!pushType.equals("USER")){
				Params notiParams = mobilePushService.getUserDeviceList(inParams);
				
				MobileUtil.sendPush(notiParams);
			}else if (pushType != null &&!pushType.equals("AREA")){
				Params notiParams = mobilePushService.getAreaDeviceList(inParams);
				MobileUtil.sendPush(notiParams);
			}
		}
		*/
		return outParmas;
	}
	
	
}
