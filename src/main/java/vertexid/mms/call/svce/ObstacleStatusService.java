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

@Service
public class ObstacleStatusService extends ParagonService {
	
	private static final Log LOG = LogFactory.getLog(ObstacleStatusService.class);
	
	
	public Params getEngrList(Params inParams) {
		return getSqlManager().selectGridParams("ObstacleReceiptService.getEngrList",inParams);
	}
	public Params getEngrCombo(Params inParams) {
		return getSqlManager().selectGridParams("ObstacleReceiptService.getEngrCombo",inParams);
	}

	public Params getObsHstList(Params inParams) {
		return getSqlManager().selectGridParams("ObstacleReceiptService.getObsHstList",inParams);
	}
	public Params getObsReptList(Params inParams) {
		return getSqlManager().selectGridParams("ObstacleReceiptService.getObsReptList",inParams);
	}
	public Params saveRcpt(Params inParams) {
		LOG.debug("inParams : " + inParams);
		Params outParams = ParamsFactory.createOutParams(inParams);
		String rcptStsType = inParams.getString("rcptStsType");
		//장애 등록
		int rcptCnt = getSqlManager().insert("ObstacleReceiptService.insertRcpt",inParams);
		LOG.debug("inParams : " + inParams.getString("rcptSeq"));
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

	public Params getObsStsList(Params inParams) {
		return getSqlManager().selectGridParams("ObstacleStatusService.getObsStsList",inParams);
	}
	public Params saveObsSts(Params inParams) {
		LOG.debug("inParams : " + inParams);
		Params outParams = ParamsFactory.createOutParams(inParams);
		String modFlag = inParams.getString("modFlag");
		String rcptStsSeq = inParams.getString("rcptStsSeq");
		String rcptStsType = inParams.getString("rcptStsType");
		String rcptLastYn = inParams.getString("rcptLastYn");
        //장애정보 및 기존장애내역 조회
		Params rcptParams = getSqlManager().selectOneParams("ObstacleReceiptService.view_RCPT_M",inParams);
		Params prevParams = getSqlManager().selectOneParams("ObstacleStatusService.getPrevStsInfo",inParams);
		
		String currRcptEngr = inParams.getString("rcptStsEngr");
		
		String currRcptEngrNm = prevParams.getString("CURR_RCPT_ENGR_NM");
		String prevRcptEngr = prevParams.getString("RCPT_ENGR");
		String prevRcptEngrNm = prevParams.getString("RCPT_ENGR_NM");
		String prevRcptStsNm = prevParams.getString("RCPT_STS_NM");
		String prevRcptStsType  = prevParams.getString("RCPT_STS_TYPE");
		
		String rcptHitUser = "";
		if(!currRcptEngr.equals(prevRcptEngr)){
			rcptHitUser = " ("+ prevRcptEngrNm +" > "+currRcptEngrNm+")";
		}else{
			rcptHitUser = " ("+currRcptEngrNm+")";
		}
		inParams.setParam("rcptHitUser", rcptHitUser);
		inParams.setParam("prevRcptStsNm", prevRcptStsNm);
		
		
		int rcptCnt =  0;
		//수정
		if(rcptStsSeq!=null && !rcptStsSeq.equals("") && modFlag.equals("UPDATE")){
     		LOG.debug("--- 장애처리 수정 ---");
			//장애처리 수정
			rcptCnt = getSqlManager().update("ObstacleStatusService.updateObsSts",inParams);
			//장애접수 담당자 수정 히스토리만 수정 변경
			//rcptCnt = getSqlManager().update("ObstacleStatusService.updateRcptEngr",inParams);
		    if(rcptLastYn!=null &&  rcptLastYn.equals("Y")){
				//장애처리 최종상태 변경
				rcptCnt = getSqlManager().update("ObstacleStatusService.updateObsRept",inParams);
		    }
		}else{
		   String mtCmplDt    =	rcptParams.getString("RCPT_CMPL_DT");
		   String mtCmplType  =	rcptParams.getString("RCPT_CMPL_TYPE");	
		   inParams.setParam("mtCmplDt", mtCmplDt);
		   inParams.setParam("mtCmplType", mtCmplType);
			//-- 신규등록시 상황별 처리 --
	         switch(rcptStsType){
	         	case "01" : //접수 (장애처리 업데이트 X)
	         		LOG.debug("--- 접수진행 ---");
	         		inParams.setParam("forceLastYn", "N"); //최종[N]
	    			//장애처리 등록
	    			rcptCnt = getSqlManager().insert("ObstacleStatusService.insertObsSts",inParams);	        	 
	         	break;
	         	case "07" : //배정 (장애처리 처리상태/엔지니어 변경) 불가

                    //기존 완료된 처리 에 대해서는 최종처리 불가
	         		if(prevRcptStsType !=null &&  Integer.parseInt(prevRcptStsType) >= 100){
		         		  inParams.setParam("forceLastYn", "N"); //최종[N]	
	         			LOG.debug("--- 배정진행 [기존완료건]---" + inParams);         			
	         		//장애처리 등록
		    			rcptCnt = getSqlManager().insert("ObstacleStatusService.insertObsSts",inParams);
		        	//장애처리 최종상태 변경
		    			rcptCnt = getSqlManager().update("ObstacleStatusService.updateObsRept",inParams);
	         		}else{
	         			LOG.debug("--- 배정진행 [미완료건]---");   
	    			//장애처리 기존상태 변경
	    			rcptCnt = getSqlManager().update("ObstacleStatusService.updateObsStsProc",inParams);
	    			//장애처리 등록
	    			rcptCnt = getSqlManager().insert("ObstacleStatusService.insertObsSts",inParams);
	    			//장애처리 최종상태 변경
	    			rcptCnt = getSqlManager().update("ObstacleStatusService.updateObsRept",inParams);	
	         		}
	         	break;	 
	         	default : //완료처리 - (최종) 은 장애처리 정보 처리상태 변경 및 완료일시 저장 (없을경우) #우선 일시만미입력
	         		LOG.debug("--- 완료진행 ---");
	         		//장애처리 기존상태 변경
	    			rcptCnt = getSqlManager().update("ObstacleStatusService.updateObsStsProc",inParams);
	    			//장애처리 등록
	    			rcptCnt = getSqlManager().insert("ObstacleStatusService.insertObsSts",inParams);
	    			//장애처리 최종상태 변경
	    			rcptCnt = getSqlManager().update("ObstacleStatusService.updateObsRept",inParams);	         		
	            break;
	         }
			/*
			//장애처리 기존상태 변경
			rcptCnt = getSqlManager().update("ObstacleStatusService.updateObsStsProc",inParams);
			//장애처리 등록
			rcptCnt = getSqlManager().insert("ObstacleStatusService.insertObsSts",inParams);
			//장애처리 최종상태 변경
			rcptCnt = getSqlManager().update("ObstacleStatusService.updateObsRept",inParams);
		    */
		}

		if(rcptCnt > 0 ){
			outParams.setMsgCd("MSG_COM_SUC_003");
		}else{
			outParams.setMsgCd("MSG_COM_ERR_015");
		}
		return outParams;
	}

}
