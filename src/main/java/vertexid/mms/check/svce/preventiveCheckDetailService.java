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
 * "Kim Seon Ho"         	2017. 11. 16. 			First Draft.
 */
package vertexid.mms.check.svce;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import paragon.core.file.FileManager;
import paragon.core.mvc.stereotype.ParagonService;
import paragon.core.paramaters.Params;
import paragon.core.paramaters.ParamsFactory;
import paragon.core.paramaters.datatable.DataTable;

/**
 * [설명]
 *
 * @class PreventiveCheckDetailService.java
 * @package vertexid.mms.check.svce
 * @author "Kim Seon Ho"
 * @version 1.0
 */
@Service
public class preventiveCheckDetailService extends ParagonService {
	
	private static final Log LOG = LogFactory.getLog(preventiveCheckDetailService.class);
	
	@Autowired
	private FileManager fileMng;
	
	public Params getPreventiveCheckDetailList(Params inParams) {
		LOG.debug("PreventiveCheckDetailService getPreventiveCheckDetailList : "+inParams);
		return getSqlManager().selectGridParams("PreventiveCheckDetailService.getPreventiveCheckDetailList", inParams);
	}
	
	/**
	 * 
	 * [설명] 예방정검 유의사항 내용 조회
	 * 
	 * @Author "Kim Seon Ho"
	 * @Date 2017. 12. 11.
	 */
	public Params getPrventiveCheckNoticeContent(Params inParams){
		LOG.debug("getPrventiveCheckNoticeContent inParams : "+ inParams);
		Params outParams = ParamsFactory.createParams(inParams);
		
		inParams.setDataTable("dt_list",getSqlManager().selectDataTable("PreventiveCheckDetailService.getPreventiveCheckNotivePrd", inParams));
		
		outParams = getSqlManager().selectGridParams("PreventiveCheckDetailService.getPrventiveCheckNoticeContent", inParams);
		
		LOG.debug("getPrventiveCheckNoticeContent outParams : "+ outParams);
		return outParams;
	}
	
	/**
	 * 
	 * [설명] 예방정검상세(방문) 정기정검 완료
	 * 
	 * @Author "Kim Seon Ho"
	 * @Date 2017. 12. 22.
	 */
		public Params completePreventiveCheckDetail(Params inParams) {
		LOG.debug("PreventiveCheckDetailService completePreventiveCheckDetail() " + inParams);
		Params outParams = ParamsFactory.createOutParams(inParams);
	          
		//1. grid M 저장
		getSqlManager().insert("PreventiveCheckDetailService.insertPreventiveCheckComplete", inParams);
		
		//2. grid L 저장 --> 엑셀파일을 읽나? 여러 품목에 대해서 완료를 해야함
		getSqlManager().update("PreventiveCheckDetailService.insertPreventiveCheckCompleteLog", inParams);
		
		//AJAX COMPLETE 이후 파일업로드 시작
		
		outParams.setParam("checkSeq", inParams.getIntParam("CHECK_SEQ"));
		
		return outParams;
	}

	/**
	 * 
	 * [설명] 예방정검상세(방문) 정기정검 완료
	 * 
	 * @Author "Kim Seon Ho"
	 * @Date 2017. 12. 22.
	 */
		public Params completePreventiveCheckDetailFile(Params inParams) {
		Params outParams = ParamsFactory.createParams(inParams);
			LOG.debug("completePreventiveCheckDetailFile() DBINPUT DATA = " + inParams);
			
			getSqlManager().update("PreventiveCheckDetailService.updatePreventiveCheckCompleteFile", inParams);
			
		return outParams;
	}
	
	public DataTable getPrventiveCheckObsFlag(Params inParams) {
		LOG.debug("PreventiveCheckDetailService getPrventiveCheckObsFlag : "+inParams);
		return getSqlManager().selectDataTable("PreventiveCheckDetailService.getPrventiveCheckObsFlag", inParams);
	}
	
}
