/**
 * Copyright (c) 2018 VertexID RND, Inc.
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
 * "Kim Jin Ho"         	2018. 1. 16. 			First Draft.
 */
package vertexid.paragon.comm.util.excelForm;

import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;
import org.springframework.core.io.Resource;

import paragon.core.paramaters.Params;
import paragon.core.utility.config.Config;

/**
 * [설명]
 *
 * @class ExcelPreventiveCheck.java
 * @package vertexid.paragon.comm.util.excelForm
 * @author "Kim Jin Ho"
 * @version 1.0
 */
public class ExcelPreventiveCheck {

	private static final Log LOG = LogFactory.getLog(ExcelPreventiveCheck.class);
	
	/**
	 * 
	 * 
	 * 서비스 리포트 엑셀 양식 입력
	 * 
	 * @Author "Shin Dong Cheol"
	 * @Date 2017. 12. 13.
	 * 
	 * @param inParams : Query 실행 후 넘어온 데이터 파라메터.
	 * 
	 * @return boolean : true, false
	 */
	@SuppressWarnings({ "deprecation", "resource" })
	public static void download(HttpServletResponse response,  HttpServletRequest request, Params inParams) throws Exception {
		ApplicationContext appContext = new FileSystemXmlApplicationContext();

		LOG.debug("inParams : "+inParams.toString());

		int sheetNo = 0;
		try {
			Resource resource = appContext.getResource(Config.getString("excelTempLoc.preventiveCheck")); // excelTempLoc.preventiveCheck
			String filePath = resource.getFile().getAbsolutePath();
			FileInputStream fis = new FileInputStream(filePath);
			Workbook wb = new HSSFWorkbook(fis);
			fis.close();

//			String brandString = inParams.getString("BRND_NM")+" "+inParams.getString("STR_NM");
//			//지점명 
//			ExcelBasicUtils.setCellValue(wb, sheetNo, 2, 0, Cell.CELL_TYPE_STRING, brandString);

	        
			String date = new SimpleDateFormat("yyyyMMddhhmmssSSS").format(new Date());
			ByteArrayOutputStream outByteStream = new ByteArrayOutputStream();
	        wb.write(outByteStream);
			response.reset();
			response.setContentType("application/vnd.ms-excel; charset=utf-8");
			response.setHeader("Accept-Ranges", "bytes");
			response.setHeader("Content-Transfer-Encoding", "binary");
	        String fileName = URLEncoder.encode("예방점검_" + date + ".xls", "UTF-8").replaceAll("\\+", "%20");
	        response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\";");
	        
	        byte [] outArray = outByteStream.toByteArray();
	        response.setContentLength(outArray.length);
	        response.setStatus(200);
	        response.setHeader("Expires:", "0"); // eliminates browser caching
	        OutputStream outStream = response.getOutputStream();
	        outStream.write(outArray);
	        outStream.flush();
		} catch (Exception e) {
	        response.sendError(400, e.toString());
			e.printStackTrace();
		}
	}
}
