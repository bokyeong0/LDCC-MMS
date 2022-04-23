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
 * "Shin Dong Cheol"     2017. 11. 10. 		First Draft.
 */
package vertexid.paragon.settings.ctrl;

import java.util.Properties;

import javax.mail.Session;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import paragon.core.paramaters.CommParams;
import paragon.core.paramaters.Params;
import vertexid.paragon.comm.util.CommUtil;
import vertexid.paragon.comm.util.SendMailUtils;
import vertexid.paragon.settings.svce.LogService;

/**
 * [설명]
 * 환경설정 -> 시스템 관리 Controller
 * @class LogController.java
 * @package vertexid.paragon.settings.ctrl
 * @author "Shin Dong Cheol"
 * @version 1.0
 */

@Controller
@RequestMapping("/ctrl/setting/log")
public class LogController {

	private static final Log LOG = LogFactory.getLog(LogController.class);
	
	@Autowired
	private LogService logService;
	
	/**
	 * 
	 * [설명] 
	 * 환경설정 -> 시스템 관리 -> 로그인 내역
	 * 화면 호출
	 * @Author "Shin Dong Cheol"
	 * @Date 2017. 11. 10.
	 */
	@RequestMapping("/login")
	public String login() {
		LOG.debug("Call LogController login function!!");
		return "/settings/system/system_log_login";
	}
	
	/**
	 * 
	 * [설명] 
	 * 로그인내역 조회
	 * @Author "Shin Dong Cheol"
	 * @Date 2017. 11. 10.
	 */
	@RequestMapping("/getLoginList")
	public Params getLoginList (Params inParams){
		LOG.debug("Call LogController getLoginList function!!");
		LOG.debug("inParams : "+inParams.toString());
		return logService.getLoginList(inParams);
	}
	
	
	/**
	 * 
	 * [설명] 
	 * 환경설정 -> 시스템관리 -> 메뉴사용내역
	 * 화면
	 * @Author "Shin Dong Cheol"
	 * @Date 2017. 11. 10.
	 */
	@RequestMapping("/pro")
	public String pro() {
		LOG.debug("Call LogController pro function!!");
		return "/settings/system/system_log_pro";
	}
	
	/**
	 * 
	 * [설명] 
	 * 메뉴사용내역 조회
	 * @Author "Shin Dong Cheol"
	 * @Date 2017. 11. 10.
	 */
	@RequestMapping("/getProList")
	public Params getProList(Params inParams){
		LOG.debug("Call LogController getProList function!!");
		LOG.debug("inParams : "+inParams.toString());
		return logService.getProList(inParams);
	}
	
	@RequestMapping("/sendMail")
	public void sendMail(){
		LOG.debug("Call LogController sendMail function!!");
		String emailID = "dcshin@gritis.co.kr";
		String fromEmailID = "no_reply@gritis.co.kr";
		HttpServletRequest req = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
		HttpSession httpSession = req.getSession();
		
		String userId = (String) httpSession.getAttribute("s_userId");
		String proCd = (String) httpSession.getAttribute("pro_cd");
		LOG.debug("userId ---- > "+userId);
		LOG.debug("proCd ---- > "+proCd);
		CommParams inParams = new CommParams();
		CommParams reqParams = new CommParams();
		String connectIp = CommUtil.getUserIP();
		LOG.debug("connectIp ---- > "+connectIp);
		String lpContent = null; 
		inParams.setParam("userId", userId);
		inParams.setParam("connectIp", connectIp);
		inParams.setParam("proCd", proCd);
		reqParams.setParam("userId", userId);
		reqParams.setParam("connectIp", connectIp);
		reqParams.setParam("toEmail", emailID);
		reqParams.setParam("fromEmail", fromEmailID);
		lpContent = "메일 전송"+(reqParams.size() > 0 ? reqParams.toString() : "");
		inParams.setParam("lpContent", lpContent);
		logService.saveProInfo(inParams);
		
		SendMailUtils.sendEmail(emailID, fromEmailID, "Send Java Email", "<a href='http://www.ldcc.co.kr'>!!!!!!</a>");
		
	}
	
	public static void main(String[] arg) throws Exception {
		Workbook wb = new XSSFWorkbook();
		
		Sheet sheet =  wb.createSheet("SampleSheet");
		
		
	}
}
