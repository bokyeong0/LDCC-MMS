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
package vertexid.mms.check.ctrl;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import paragon.core.file.FileManager;
import paragon.core.paramaters.FileParams;
import paragon.core.paramaters.Params;
import paragon.core.paramaters.ParamsFactory;
import paragon.core.paramaters.datatable.DataTable;
import paragon.core.paramaters.datatable.datarow.DataRow;
import vertexid.mms.check.svce.preventiveCheckDetailService;
import vertexid.paragon.comm.util.FileDownLoader;

/**
 * [설명]
 *
 * @class PreventiveCheckController.java
 * @package vertexid.mms.check.ctrl
 * @author "Kim Seon Ho"
 * @version 1.0
 */
@Controller
@RequestMapping("/ctrl/preventiveCheck/preventiveCheckDetail")
public class preventiveCheckDetailController {

	private static final Log LOG = LogFactory.getLog(preventiveCheckDetailController.class);
	
	@Autowired
	private preventiveCheckDetailService preventiveCheckDetailService;  
	
	@RequestMapping	
	public String preventiveCheckPageMove(){
		LOG.debug("PreventiveCheckController preventiveCheckPageMove()");
		return "check/preventiveCheckDetail";
	}
	
	/**
	 * [설명]
	 * 자산정보 리스트
	 * @Author 최판석
	 * @Date 2017. 4. 18.
	*/
	@RequestMapping("/getPreventiveCheckDetailList")
	public Params getPreventiveCheckDetailList(Params inParams){
		return preventiveCheckDetailService.getPreventiveCheckDetailList(inParams);
	}
	
	@RequestMapping("/download")
	public Params excelDownload(HttpServletResponse response, Params inParams, HttpServletRequest request) {
		LOG.debug("excelDownload ----------->");
		Params outParams = ParamsFactory.createOutParams(inParams);
		
		outParams = preventiveCheckDetailService.getPreventiveCheckDetailList(inParams);
		
		LOG.debug("excelDownload <-----------");
		return outParams;
	}
	
	@RequestMapping("/file")
	public Params preventiveCheckExcelFileDownload(HttpServletResponse response, Params inParams, HttpServletRequest request) throws Exception {
		LOG.debug("preventiveCheckExcelFileDownload ----------->");
		LOG.debug("inParams : "  + inParams);
		
		FileDownLoader.download(response,request, inParams.getString("fileName"),inParams.getString("downFileName"));
		LOG.debug("preventiveCheckExcelFileDownload <-----------");
		return inParams;
	}
	
	@RequestMapping("/notice")
	public String preventiveCheckNotice(Params inParams) throws Exception {
		return "check/preventiveCheckNoticeView";
	}
	
	@RequestMapping("/noticeContent")
	public Params preventiveCheckNoticeContent(Params inParams) throws Exception {
		LOG.debug("preventiveCheckNoticeContent");
		return preventiveCheckDetailService.getPrventiveCheckNoticeContent(inParams);
	}
	
	@RequestMapping("/completePreventiveCheckDetail")
	public Params completePreventiveCheckDetail(Params inParams){
		LOG.debug("preventiveCheckNoticeNewSave completePreventiveCheckDetail()");
		return preventiveCheckDetailService.completePreventiveCheckDetail(inParams);
	}

	@Autowired
	private FileManager fileMng;
	
	@RequestMapping("/completePreventiveCheckDetailFile")
	public Params completePreventiveCheckDetailFile(FileParams fileParams, HttpSession session, MultipartHttpServletRequest request, Params inParams){
		LOG.debug("preventiveCheckNoticeNewSave completePreventiveCheckDetailFile()"+ fileParams);
		
		int count = 2;
		String fileId = "";
		DataTable fileDt = null;;
		
		for (int i = 0; i <= count; i++){
			switch (i) {
			case 0 : fileId = "attach"; break;
			case 1 : fileId = "mngSign"; break;
			case 2 : fileId = "engrSign"; break;
			}
			if(fileParams.getString(fileId) !=  null){
				fileMng.setFolder("upload/");
				fileMng.setWebRoot(true);
				fileDt = fileMng.saveFile(fileParams.getFiles(fileId));
				
				for (DataRow dr :fileDt) {
					inParams.setParam(fileId+"Path", dr.getString("webPath"));
					LOG.debug("web File Path ===========> "+dr.getString("webPath"));
					inParams.setParam(fileId+"Nm", dr.getString("saveName"));
				}
			}
		}
		
		return preventiveCheckDetailService.completePreventiveCheckDetailFile(inParams);
	}
	
	@RequestMapping("/getPrventiveCheckObsFlag")
	public DataTable getPrventiveCheckObsFlag(Params inParams){
		return preventiveCheckDetailService.getPrventiveCheckObsFlag(inParams);
	}
	
}

