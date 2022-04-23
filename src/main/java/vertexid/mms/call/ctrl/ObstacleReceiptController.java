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

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import paragon.core.paramaters.Params;
import paragon.core.paramaters.ParamsFactory;
import paragon.core.paramaters.datatable.DataTable;
import vertexid.mms.asset.svce.AssetService;
import vertexid.mms.call.svce.ObstacleReceiptService;
import vertexid.mms.check.svce.PreventiveCheckListService;
import vertexid.paragon.comm.push.svce.MobilePushService;
import vertexid.paragon.comm.util.FileDownLoader;
import vertexid.paragon.comm.util.MobileUtil;
import vertexid.paragon.comm.util.excelForm.ExcelServiceReport;

/**
 * [설명]
 *
 * @class HardwareObstacleController.java
 * @package vertexid.paragon.call.ctrl
 * @author Kim Jin Ho
 * @version 1.0
 */
@Controller
@RequestMapping("/ctrl/call/obstacle/receipt")
public class ObstacleReceiptController {
	
	private static final Log LOG = LogFactory.getLog(ObstacleReceiptController.class);
	
	@Autowired
	private ObstacleReceiptService obstacleReceiptService;
	
	@Autowired
	private AssetService assetService; 
	
	@Autowired
	private PreventiveCheckListService preventservice; 	
	
	@Autowired
	private MobilePushService mobilePushService;  
	
	/**
	 * 콜센터 접수 화면 이동
	 * 
	 * @Author 김진호
	 * @Date 2017. 4. 24.
	*/
	@RequestMapping()
	public String obstacleReceiptPageMove(){
		LOG.debug("ObstacleReceiptController obstacleReceiptPageMove()");
		
		return "call/call_obstacle_receipt";
	}
	
	
	/**
	 * 콜센터 접수 장애 매뉴얼 POPUP
	 * @Author Kim Jin Ho
	 * @Date 2017. 5. 2.
	 */
	@RequestMapping("/softphone")
	public String obstacleSoftphone(){
		LOG.debug("ObstacleReceiptController obstacleMenualWindow()");
		
		return "call/call_obstacle_receipt_softphone";
	}
	/**
	 * 콜센터 접수 장애 매뉴얼 POPUP
	 * @Author Kim Jin Ho
	 * @Date 2017. 5. 2.
	*/
	@RequestMapping("/menual")
	public String obstacleMenualWindow(){
		LOG.debug("ObstacleReceiptController obstacleMenualWindow()");
		
		return "call/call_obstacle_receipt_menual";
	}
	
	/**
	 * 콜센터 접수 엔지니어 목록
	 * 
	 * @Author Kim Jin Ho
	 * @Date 2017. 3. 14.
	 */
	@RequestMapping("/listEngr")
	public Params listEngr(Params inParams){
		
		return obstacleReceiptService.getEngrList(inParams);
	}
	
	@RequestMapping("/EngrDeInfo")
	public Params EngrDeInfo(Params inParams){
		return obstacleReceiptService.getEngrDeInfo(inParams);
	}
	
	/**
	 * 콜센터 엔지니어 콤보박스
	 * 
	 * @Author Kim Jin Ho
	 * @Date 2017. 3. 14.
	 */
	@RequestMapping("/listEngrCombo")
	public Params listEngrCombo(Params inParams){
		return obstacleReceiptService.getEngrCombo(inParams);
	}
	
	@RequestMapping("/listObsHst")
	public Params listObsHst(Params inParams){
		return obstacleReceiptService.getObsHstList(inParams);
	}
	@RequestMapping("/listObsRept")
	public Params listObsRept(Params inParams){
		return obstacleReceiptService.getObsReptList(inParams);
	}
	@RequestMapping("/listObsStrRcpt")
	public DataTable listObsStrRept(Params inParams){
		return obstacleReceiptService.getObsStrRcptSList(inParams);
	}
	
	@RequestMapping("/listAstHst")
	public Params listAstHst(Params inParams){
		return assetService.getAstHstList(inParams);
	}
	@RequestMapping("/listCustHst")
	public Params listCustHst(Params inParams){
		return obstacleReceiptService.getCustHstList(inParams);
	}
	@RequestMapping("/listPreventHst")
	public Params listPreventHst(Params inParams){
		return preventservice.getPreventHstList(inParams);
	}	
	@RequestMapping("/saveRcpt")
	public Params saveRcpt(Params inParams){
		Params outParmas = obstacleReceiptService.saveRcpt(inParams);
		String stsCd = outParmas.getStsCd();
		LOG.debug("saveRcptSts PUSH : "+stsCd+"\n장애접수 처리저장 데이터 : "+inParams);
		if(stsCd.equals("100")){
			String pushType =  inParams.getString("pushType");
			
			if(pushType != null && pushType.equals("USER")){
				Params notiParams = mobilePushService.getUserDeviceList(inParams);
				MobileUtil.sendPush(notiParams);
			}else if (pushType != null && pushType.equals("AREA")){
				Params notiParams = mobilePushService.getAreaDeviceList(inParams);
				MobileUtil.sendPush(notiParams);
			}
		}
		return outParmas;
	}
	@RequestMapping("/updateRcpt")
	public Params updateRcpt(Params inParams){
		return obstacleReceiptService.updateRcpt(inParams);
	}
	@RequestMapping("/deleteRcpt")
	public Params deleteRcpt(Params inParams){
		return obstacleReceiptService.deleteRcpt(inParams);
	}
	@RequestMapping("/viewObsRcpt")
	public Params viewObsRcpt(Params inParams){
		return obstacleReceiptService.viewObsRcpt(inParams);
	}
	@RequestMapping("/saveTest")
	public Params saveTest(Params inParams){
		LOG.debug("inParams : " + inParams);
		return obstacleReceiptService.saveTest(inParams);
	}
	
	@RequestMapping("/serviceReportExcel")
	public Params serviceReportExcel (HttpServletResponse response, Params inParams, HttpServletRequest request) {
		LOG.debug("serviceReportExcel ----------->");
		
		Params outParams = ParamsFactory.createOutParams(inParams);
		
		outParams = obstacleReceiptService.viewReport(inParams);
	//	LOG.debug("serviceReportExcel:"+outParams);
		try {
			ExcelServiceReport.download(response, request, outParams);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		LOG.debug("serviceReportExcel <-----------");
		return outParams;
	}
	
	@RequestMapping("/file")
	public Params ServiceReportExcelFileDownload(HttpServletResponse response, Params inParams, HttpServletRequest request) throws Exception {
		LOG.debug("ServiceReportExcelFileDownload ----------->");
		LOG.debug("inParams : "  + inParams);
		
		FileDownLoader.download(response,request, inParams.getString("fileName"),inParams.getString("downFileName"));
		LOG.debug("ServiceReportExcelFileDownload <-----------");
		return inParams;
	}
	
	@RequestMapping("/sendMailer")
	public Params sendMailer(Params inParams){	
		return obstacleReceiptService.sendMailer(inParams);	
	}
}
