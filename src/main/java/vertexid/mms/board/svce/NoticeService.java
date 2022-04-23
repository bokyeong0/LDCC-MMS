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
 * "Kim Seon Ho"         	2017. 12. 8. 			First Draft.
 */
package vertexid.mms.board.svce;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Service;

import paragon.core.mvc.stereotype.ParagonService;
import paragon.core.paramaters.Params;
import paragon.core.paramaters.ParamsFactory;
import paragon.core.paramaters.datatable.DataTable;
import paragon.core.paramaters.datatable.datarow.DataRow;

/**
 * [설명]
 *
 * @class NoticeService.java
 * @package vertexid.mms.board.svce
 * @author "Kim Seon Ho"
 * @version 1.0
 */
@Service
public class NoticeService extends ParagonService {

	private static final Log LOG = LogFactory.getLog(NoticeService.class);
	
	/**
	 * 
	 * [설명] 공지사항 게시판 메인 화면 리스트
	 * 
	 * @Author "Kim Seon Ho"
	 * @Date 2017. 12. 8.
	 */
	public Params getBoardNoticeList(Params inParams) {
		LOG.debug("noticeNewPartnerComboList : "+inParams);
		return getSqlManager().selectGridParams("NoticeService.getBoardNoticeList",inParams);
	}
	
	/**
	 * 
	 * [설명] 공지사항 등록, 대상 파트너사 ROW 내 콤보박스
	 * 
	 * @Author "Kim Seon Ho"
	 * @Date 2017. 12. 12.
	 */
	public DataTable noticeNewPartnerComboList(Params inParams) {
		LOG.debug("NoticeService noticeNewPartnerComboList : "+inParams);
		return getSqlManager().selectDataTable("NoticeService.noticeNewPartnerComboList",inParams);
	}
	
	/**
	 * 
	 * [설명] 공지사항 등록, 저장
	 * 
	 * @Author "Kim Seon Ho"
	 * @Date 2017. 12. 12.
	 */
	public Params saveBoardNotice(Params inParams) {
		LOG.debug("NoticeService saveBoardNotice : "+inParams);
		Params outParams = ParamsFactory.createParams(inParams);
		String modFlag = inParams.getString("modFlag");
		String notiSeq = inParams.getString("notiSeq");		
		LOG.debug(inParams);
		int retCnt =  0;
		int cnt = 0;
		if(notiSeq!=null && !notiSeq.equals("") && modFlag.equals("UPDATE")){	//수정
			retCnt += getSqlManager().update("NoticeService.updateBoardNotice",inParams);	
			getSqlManager().delete("NoticeService.deleteBoardNoticeParter", inParams);
    		for(DataRow dr: inParams.getDataTable("dt_data")){
    			dr.setParam("notiSeq", notiSeq);
    			cnt +=  getSqlManager().insert("NoticeService.updateBoardNoticePartner",dr);
    		}    				
		}else if(notiSeq!=null && !notiSeq.equals("") && modFlag.equals("DELETE")){ //삭제
			retCnt += getSqlManager().update("NoticeService.deleteBoardNotice",inParams);			
		}else{ //등록
			retCnt += getSqlManager().insert("NoticeService.saveBoardNotice",inParams);	
    		for(DataRow dr: inParams.getDataTable("dt_data")){
    			dr.setParam("NOTICE_SEQ",  inParams.getString("NOTICE_SEQ"));
    			cnt +=  getSqlManager().insert("NoticeService.saveBoardNoticePartner",dr);
    		}    	
		}

		
		if(retCnt > 0 ){
			outParams.setMsgCd("MSG_COM_SUC_007", new Object[]{retCnt}); 
		}else{
			outParams.setMsgCd("MSG_COM_ERR_015");
		}
		
		
		return outParams;
	}
	
	public Params viewBoardNotice(Params inParams) {
		LOG.debug("NoticeService viewBoardNotice : "+inParams);		
		return getSqlManager().selectOneParams("NoticeService.viewBoardNotice",inParams);		
	}

	
	public Params viewNoticeParterList(Params inParams) {
		LOG.debug("NoticeService viewNoticeParterList : "+inParams);		
		return getSqlManager().selectGridParams("NoticeService.viewNoticeParterList",inParams);		
	}	
}
