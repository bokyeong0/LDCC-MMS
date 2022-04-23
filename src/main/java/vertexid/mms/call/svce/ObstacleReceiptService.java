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
 * 김규표				2017. 3. 14. 		First Draft.
 */
package vertexid.mms.call.svce;


import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Service;

import paragon.core.exception.ParagonException;
import paragon.core.mvc.stereotype.ParagonService;
import paragon.core.paramaters.Params;
import paragon.core.paramaters.ParamsFactory;
import paragon.core.paramaters.datatable.DataTable;
import paragon.core.utility.config.Config;
import vertexid.paragon.comm.util.SendMailUtils;

@Service
public class ObstacleReceiptService extends ParagonService {
	
	private static final Log LOG = LogFactory.getLog(ObstacleReceiptService.class);
	
	public Params getEngrList(Params inParams) {
		return getSqlManager().selectGridParams("ObstacleReceiptService.getEngrList",inParams);
	}
	public Params getEngrCombo(Params inParams) {
		return getSqlManager().selectGridParams("ObstacleReceiptService.getEngrCombo",inParams);
	}

	public Params getEngrDeInfo(Params inParams) {
		return getSqlManager().selectGridParams("ObstacleReceiptService.getEngrDeInfo",inParams);
	}

	public Params getObsHstList(Params inParams) {
		return getSqlManager().selectGridParams("ObstacleReceiptService.getObsHstList",inParams);
	}
	public Params getObsReptList(Params inParams) {
		return getSqlManager().selectGridParams("ObstacleReceiptService.getObsReptList",inParams);
	}
	public Params getCustHstList(Params inParams) {
		return getSqlManager().selectGridParams("ObstacleReceiptService.getCustHstList",inParams);
	}
	public Params saveRcpt(Params inParams) {
		LOG.debug("inParams : " + inParams);
		Params outParams = ParamsFactory.createOutParams(inParams);
		String rcptStsType = inParams.getString("rcptStsType");
		//장애 등록
		int rcptCnt = getSqlManager().insert("ObstacleReceiptService.insertRcpt",inParams);
		LOG.debug("inParams : " + inParams.getString("rcptSeq"));
		//장애 정보 확인
		Params insParams =  getSqlManager().selectOneParams("ObstacleReceiptService.view_RCPT_M",inParams);  
				outParams.setParam("rcptSeq", insParams.getString("RCPT_SEQ"));
				outParams.setParam("rcptNo", insParams.getString("RCPT_NO"));
				outParams.setParam("acceptDt", insParams.getString("ACCEPT_DT"));		
				
		if(rcptStsType!=null && !rcptStsType.equals("")){
			int stsCnt = getSqlManager().insert("ObstacleReceiptService.insertRcptSts",inParams);
			if(stsCnt == 0 ){
				new ParagonException("MSG_COM_ERR_072");
			}
		}
		if(rcptCnt > 0 ){
			outParams.setMsgCd("MSG_COM_SUC_003");
		}else{
			outParams.setMsgCd("MSG_COM_ERR_015");
		}
		return outParams;
	}


	public Params viewObsRcpt(Params inParams) {
		return getSqlManager().selectOneParams("ObstacleReceiptService.viewObsRcpt",inParams);
	}

	public Params viewReport(Params inParams) {
		return getSqlManager().selectOneParams("ObstacleReceiptService.viewReport",inParams);
	}	

	/**
	 * [설명] 
	 * 
	 * @Author Kim Jin Ho
	 * @Date 2017. 5. 29.
	*/
	public Params saveTest(Params inParams) {
		
		
		Params outParams = ParamsFactory.createOutParams(inParams);
		int rcptCnt = getSqlManager().insert("ObstacleReceiptService.saveTest",inParams);
		LOG.debug(rcptCnt); 
		return outParams;
	}


	public Params updateRcpt(Params inParams) {
		LOG.debug("inParams : " + inParams);
		Params outParams = ParamsFactory.createOutParams(inParams);
		//장애 등록
		int rcptCnt = getSqlManager().insert("ObstacleReceiptService.updateRcpt",inParams);
		int stsCnt = getSqlManager().insert("ObstacleReceiptService.updateRcptStsLp",inParams);
		if(stsCnt == 0 ){
			new ParagonException("MSG_COM_ERR_072");
		}
		if(rcptCnt > 0 ){
			outParams.setMsgCd("MSG_COM_SUC_003");
		}else{
			outParams.setMsgCd("MSG_COM_ERR_015");
		}
		return outParams;
	}
	public Params deleteRcpt(Params inParams) {
		LOG.debug("inParams : " + inParams);
		Params outParams = ParamsFactory.createOutParams(inParams);
		//장애 등록
		int rcptCnt = getSqlManager().update("ObstacleReceiptService.updateDelRcpt",inParams);
		
		
		if(rcptCnt > 0 ){
           //장애 내역 삭제 
			getSqlManager().update("ObstacleReceiptService.updateDelRcptLp",inParams);
			outParams.setMsgCd("MSG_COM_SUC_006");
		}else{
			outParams.setMsgCd("MSG_COM_ERR_072");
		}
		return outParams;
	}


	/**
	 * Site별 장애 목록[지도용]
	 * 
	 * @Author Kim Jin Ho
	 * @Date 2017. 6. 21.
	*/
	public DataTable getObsStrRcptSList(Params inParams) {
		return getSqlManager().selectDataTable("ObstacleReceiptService.getObsStrRcptList",inParams);
	}
    
	public Params sendMailer(Params inParams) {
		/*
		SendMailUtils.sendEmail(dr.getString("USER_EMAIL"), "[롯데정보통신 POS 유지보수시스템] 임시비밀번호가 발부 되었습니다. (유효기간 7일)"
				,dr.getString("USER_NM")+"님 [롯데정보통신 POS 유지보수시스템] 의 임시비밀번호가 발부되어 해당 비밀번호로만 로그인이 가능하십니다. (임시비밀번호 유효기간 7일)</br></br>임시비밀번호 : "
						+tempPwd+"</br></br>로그인 후 반드시 비밀번호를 변경하셔야지만 정상적인 서비스를 이용하실수 있습니다.</br></br><a href='"+Config.getString("sendMail.linkUrl")+"'>로그인 하러가기</a>");

	    */
//		String receiverID = inParams.getString("receiverID");
		//신고자 정보 와 엔지니어 정보 
		Params dbParams =  getSqlManager().selectOneParams("ObstacleReceiptService.getMailUserinfo",inParams);
		
		
		String rcptNo        = dbParams.getString("RCPT_NO");	
		String receiverName  = dbParams.getString("ENGR_NM");	 
		String receiverEmail = dbParams.getString("ENGR_EMAIL");
		String acceptDt   	 = dbParams.getString("ACCEPT_DT");
		String rcptStrNm     = dbParams.getString("STORE_NM");
		String rcptCustNm    = dbParams.getString("RCPT_CUST_INFO");	
//		String rcptCustEmail   = inParams.getString("rcptCustEmail");				
//		String rcptCustPhone   = inParams.getString("rcptCustPhone");		
		String rcptType   	 = dbParams.getString("RCPT_STS_NM");		
		String rcptWriter    = dbParams.getString("IN_USER_NM");		
		String rcptCont   	 = dbParams.getString("RCPT_CONT");	
		String title ="[롯데정보통신 POS 유지보수시스템] 장애가 접수됨을 안내드립니다.";
		String contents  = "<html>";
			   contents += "<head>";
			   contents += "<title>"+title+"</title>";
			   contents += "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">";	
			   contents += "</head>";			   
			   contents += "<body>";			 
			   contents += "<table width=\"770\"  border=\"0\" cellpadding=\"0\" cellspacing=\"0\">";		
			   contents += "<tr>";	
			   contents += "	<td width=\"200\">접수번호 : </td>";	
			   contents += "	<td>"+rcptNo+"</td>";	
			   contents += "</tr>";	
			   contents += "<tr>";	
			   contents += "	<td width=\"200\">접수일시 : </td>";	
			   contents += "	<td>"+acceptDt+"</td>";	
			   contents += "</tr>";	
			   contents += "<tr>";	
			   contents += "	<td width=\"200\">점포명  : </td>";	
			   contents += "	<td>"+rcptStrNm+"</td>";	
			   contents += "</tr>";	
			   contents += "<tr>";	
			   contents += "	<td width=\"200\">신고자 : </td>";	
			   contents += "	<td>"+rcptCustNm+ "</td>";	
			   contents += "</tr>";			   
			   contents += "<tr>";	
			   contents += "	<td width=\"200\">처리상태 : </td>";	
			   contents += "	<td>"+rcptType+"</td>";	
			   contents += "</tr>";			
			   contents += "<tr>";	
			   contents += "	<td width=\"200\">접수자 : </td>";	
			   contents += "	<td>"+rcptWriter+"</td>";	
			   contents += "</tr>";		
			   contents += "<tr>";	
			   contents += "	<td width=\"200\">담당엔지니어 : </td>";	
			   contents += "	<td>"+receiverName+"</td>";	
			   contents += "</tr>";				   
			   contents += "<tr>";	
			   contents += "	<td width=\"200\">접수내용 : </td>";	
			   contents += "	<td>&nbsp;</td>";	
			   contents += "</tr>";		
			   contents += "<tr>";	
			   contents += "	<td width=\"200\">&nbsp;</td>";	
			   contents += "	<td>"+rcptCont+"</td>";	
			   contents += "</tr>";		
			   contents += "</table>";
			   contents += "</body>";
			   contents += "</html>";			   
			LOG.debug("접수양식 : \n " + contents);
		  SendMailUtils.sendEmail(receiverEmail, title, contents);
		return inParams;
	}  
}
