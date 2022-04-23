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
 * "Kim Jin Ho"         	2017. 12. 4. 			First Draft.
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
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;
import org.springframework.core.io.Resource;

import paragon.core.paramaters.Params;
import paragon.core.paramaters.datatable.CommDataTable;
import paragon.core.paramaters.datatable.DataTable;
import paragon.core.paramaters.datatable.datarow.DataRow;
import paragon.core.utility.config.Config;

/**
 * 
 * 예방 점검 및 서비스 리포트의 엑셀 템플릿 양식을 이용하여
 * 해당 엑셀 양식의 내용을 입력.
 *
 * @class ExcelBasicInfoReader.java
 * @package vertexid.paragon.comm.util.excelForm
 * @author "Shin Dong Cheol"
 * @version 1.0
 */
public class ExcelServiceReport {

	private static final Log LOG = LogFactory.getLog(ExcelServiceReport.class);
	
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

		LOG.debug("inParams : "+inParams);
		int SERVICE_REPORT = 0;
		int sheetNo = 0;
		try {
			Resource resource = appContext.getResource(Config.getString("excelTempLoc.serviceReport")); // excelTempLoc.preventiveCheck
			String filePath = resource.getFile().getAbsolutePath();
			FileInputStream fis = new FileInputStream(filePath);
			Workbook wb = new HSSFWorkbook(fis);
			Sheet sheet = wb.getSheetAt(SERVICE_REPORT);
			fis.close();

			ExcelBasicUtils excelBasicUtils = new ExcelBasicUtils();
			String brandString = inParams.getString("BRND_NM")+" "+inParams.getString("STR_NM");
			//지점명 
			excelBasicUtils.setCellValue(wb, sheetNo, 2, 0, Cell.CELL_TYPE_STRING, brandString, 1);
			
		    //String prdName = inParams.getString("RCPT_PRD_NM");
			//String[] prdNameSplit = prdName.split(">");		
			String prdTypeName =  inParams.getString("PRD_TYPE_LV1_NM") +" > "+ inParams.getString("PRD_TYPE_LV2_NM");
			
			//장비종류
			excelBasicUtils.setCellValue(wb, sheetNo, 3, 1, Cell.CELL_TYPE_STRING, prdTypeName);

			//시리얼번호
			excelBasicUtils.setCellValue(wb, sheetNo, 3, 5, Cell.CELL_TYPE_STRING, inParams.getString("AST_SERIAL"));
			
			String prdSysName =  inParams.getString("PRD_TYPE_LV3_NM") +" > "+ inParams.getString("PRD_NM");
			//SYSTEM 명
			excelBasicUtils.setCellValue(wb, sheetNo, 4, 1 , Cell.CELL_TYPE_STRING, prdSysName);

			//모델명
			excelBasicUtils.setCellValue(wb, sheetNo, 4, 4 , Cell.CELL_TYPE_STRING, inParams.getString("PRD_NM"));

			String obsName = inParams.getString("RCPT_OBS_LV1_NM") +" > "+ inParams.getString("RCPT_OBS_LV2_NM") +" > "+  inParams.getString("RCPT_OBS_LV3_NM")  ;

			//장애유형
			excelBasicUtils.setCellValue(wb, sheetNo, 5, 4, Cell.CELL_TYPE_STRING, obsName);
			String obsName2 = inParams.getString("RCPT_OBS_LV4_NM"); 
			//장애원인
			excelBasicUtils.setCellValue(wb, sheetNo, 6, 4, Cell.CELL_TYPE_STRING, obsName2);
			
			//접수일시
			excelBasicUtils.setCellValue(wb, sheetNo, 6, 0, Cell.CELL_TYPE_STRING, inParams.getString("RCPT_DT_EXCEL"));

			//방문일시
			excelBasicUtils.setCellValue(wb, sheetNo, 6, 1, Cell.CELL_TYPE_STRING, inParams.getString("RCPT_VISIT_DT"));

			//완료일시
			excelBasicUtils.setCellValue(wb, sheetNo, 6, 2, Cell.CELL_TYPE_STRING, inParams.getString("RCPT_CMPL_DT"));
			
			//처리상태
			excelBasicUtils.setCellValue(wb, sheetNo, 7, 1, Cell.CELL_TYPE_STRING, inParams.getString("RCPT_STS_NM"));
			
			//파트너사
			excelBasicUtils.setCellValue(wb, sheetNo, 7, 4, Cell.CELL_TYPE_STRING, inParams.getString("ASP_PARTER_NM"));

			//담당자
			excelBasicUtils.setCellValue(wb, sheetNo, 7, 6, Cell.CELL_TYPE_STRING, inParams.getString("RCPT_ENGR_NM"));

			//신고자
			excelBasicUtils.setCellValue(wb, sheetNo, 8, 1, Cell.CELL_TYPE_STRING, inParams.getString("RCPT_CUST_NM"));
			/*
			//전화번호
			excelBasicUtils.setCellValue(wb, sheetNo, 8, 3, Cell.CELL_TYPE_STRING, custNameSplit[2]);

			//EMAIL
			excelBasicUtils.setCellValue(wb, sheetNo, 8, 6, Cell.CELL_TYPE_STRING, inParams.getString("RCPT_CUST_EMAIL"));
			*/
			LOG.debug("---접수내용---");
			//접수내용
			excelBasicUtils.setCellValue(wb, sheetNo, 10, 1, Cell.CELL_TYPE_STRING, inParams.getString("RCPT_CONT"));
			
			//처리내용
			excelBasicUtils.setCellValue(wb, sheetNo, 15, 1, Cell.CELL_TYPE_STRING, inParams.getString("RCPT_STS_CONT"));
	        
			//서비스구분
			excelBasicUtils.setCellValue(wb, sheetNo, 22, 1, Cell.CELL_TYPE_STRING, inParams.getString("RCPT_STS_COST_TYPE_NM"));
			//청구금액
			excelBasicUtils.setCellValue(wb, sheetNo, 22, 4, Cell.CELL_TYPE_STRING, inParams.getString("RCPT_STS_COST"));
			if(inParams.getString("SIGN_PATH") != null && !inParams.getString("SIGN_PATH").equals("")){
			//서명
			Row row = sheet.getRow(24);
			row.setHeight(excelBasicUtils.servieReportSignCellHeight);
			excelBasicUtils.drawImageCell(sheet, wb, 6, 24, false, inParams.getString("SIGN_PATH"));
			//서명
			excelBasicUtils.drawImageCell(sheet, wb, 1, 24, false, inParams.getString("SIGN_PATH"));
			}
			String date = new SimpleDateFormat("yyyyMMddhhmmssSSS").format(new Date());
			ByteArrayOutputStream outByteStream = new ByteArrayOutputStream();
	        wb.write(outByteStream);
			response.reset();
			response.setContentType("application/vnd.ms-excel; charset=utf-8");
			response.setHeader("Accept-Ranges", "bytes");
			response.setHeader("Content-Transfer-Encoding", "binary");
	        String fileName = URLEncoder.encode("서비스리포트_" + date + ".xls", "UTF-8").replaceAll("\\+", "%20");
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
	
	
	/**
	 * 
	 * 예방점검조회 서비스 리포트 엑셀 양식 입력
	 * 
	 * @Author "Kim Seon Ho"
	 * @Date 2018. 01. 22.
	 * 
	 * @param inParams : Query 실행 후 넘어온 데이터 파라메터.
	 * 
	 * @return boolean : true, false
	 * 
	 * 엑셀시트 숨김겨진 시트 0, 본 컨텐츠 1
	 * 확장자 : xlsx
	 * 
	 */
	@SuppressWarnings({ "deprecation", "resource" })
	public void preventiveCheckListServiceReportExcelDownload(HttpServletResponse response,  HttpServletRequest request, Params inParams) throws Exception {
		ApplicationContext appContext = new FileSystemXmlApplicationContext();

		LOG.debug("inParams : " + inParams);
		int SERVICE_REPORT = 1;
		int sheetNo = 1;
		try {
			Resource resource = appContext.getResource(Config.getString("excelTempLoc.preventiveCheck")); // excelTempLoc.preventiveCheck
			String filePath = resource.getFile().getAbsolutePath();
			FileInputStream fis = new FileInputStream(filePath);
			XSSFWorkbook wb = new XSSFWorkbook(fis);
			XSSFSheet sheet = wb.getSheetAt(SERVICE_REPORT);
			fis.close();
			
			ExcelBasicUtils excelBasicUtils = new ExcelBasicUtils();
			DataTable dt = new CommDataTable();
			dt = inParams.getDataTable("dt_grid");

			//브랜드명 
			String brndNm = (String)dt.get(0).getVal("BRND_NM");
			excelBasicUtils.setCellValue(wb, sheetNo, 1, 3, Cell.CELL_TYPE_STRING, brndNm, 3);
			
			//점포명
			String strNm = (String)dt.get(0).getVal("STR_NM");
			excelBasicUtils.setCellValue(wb, sheetNo, 1, 10, Cell.CELL_TYPE_STRING, strNm, 6);

			//점검일자
			excelBasicUtils.setCellValue(wb, sheetNo, 1, 20, Cell.CELL_TYPE_STRING, (String)dt.get(0).getVal("CHECK_DT"), 3);
			
			//파트너사(유지보수사)
			String aspCompNm = dt.get(0).getString("ASP_COMP_NM");
			excelBasicUtils.setCellValue(wb, sheetNo, 1, 27 , Cell.CELL_TYPE_STRING, aspCompNm, 3);
			
			if(dt.get(0).getVal("MNG_SIGN_PATH") != null && !dt.get(0).getVal("MNG_SIGN_PATH").equals("")){
			//서명
			Row row = sheet.getRow(4);
			row.setHeight(excelBasicUtils.preventSignCellHeight);
//			row = sheet.getRow(5);
//			row.setHeight((short) 5000);
			excelBasicUtils.drawXImageCell(sheet, wb, 4, 20, true, (String)dt.get(0).getVal("MNG_SIGN_PATH"));
			LOG.debug("dd");
			}
			
			if(dt.get(0).getVal("ENGR_SIGN_PATH") != null && !dt.get(0).getVal("ENGR_SIGN_PATH").equals("")){
			//서명
			excelBasicUtils.drawXImageCell(sheet, wb, 4, 27, true, (String)dt.get(0).getVal("ENGR_SIGN_PATH"));
			LOG.debug("dd");
			}
			int rowStartCount  = 8;
			for(DataRow dr : dt){
				LOG.debug(rowStartCount);
				//고객사
				excelBasicUtils.setCellValue(wb, sheetNo, rowStartCount, 0, Cell.CELL_TYPE_STRING, (String)dr.getVal("COMP_NM"), 2);

				//브랜드
				excelBasicUtils.setCellValue(wb, sheetNo, rowStartCount, 2, Cell.CELL_TYPE_STRING, (String)dr.getVal("BRND_NM"), 2);

				//점포명
				excelBasicUtils.setCellValue(wb, sheetNo, rowStartCount, 4, Cell.CELL_TYPE_STRING, (String)dr.getVal("STR_NM"), 2);

				//제품범주
				excelBasicUtils.setCellValue(wb, sheetNo, rowStartCount, 6, Cell.CELL_TYPE_STRING, (String)dr.getVal("PRD_TYPE_LV1"), 2);
				
				//제품군
				excelBasicUtils.setCellValue(wb, sheetNo, rowStartCount, 8, Cell.CELL_TYPE_STRING, (String)dr.getVal("PRD_TYPE_LV2"), 2);

				//제조사
				excelBasicUtils.setCellValue(wb, sheetNo, rowStartCount, 10, Cell.CELL_TYPE_STRING, (String)dr.getVal("PRD_TYPE_LV3"), 2);

				//모델명
				excelBasicUtils.setCellValue(wb, sheetNo, rowStartCount, 12, Cell.CELL_TYPE_STRING, (String)dr.getVal("PRD_NM"), 2);
				
				//SPEC
				excelBasicUtils.setCellValue(wb, sheetNo, rowStartCount, 14, Cell.CELL_TYPE_STRING, (String)dr.getVal("PRD_SPEC"), 2);
				
				//시리얼
				excelBasicUtils.setCellValue(wb, sheetNo, rowStartCount, 16, Cell.CELL_TYPE_STRING, (String)dr.getVal("AST_SERIAL"), 3);
				
				//정상유무
				excelBasicUtils.setCellValue(wb, sheetNo, rowStartCount, 19, Cell.CELL_TYPE_STRING, (String)dr.getVal("OBS_YN"), 2);
				
				//POS번호
				excelBasicUtils.setCellValue(wb, sheetNo, rowStartCount, 21, Cell.CELL_TYPE_STRING, (String)dr.getVal("AST_TYPE2"), 2);
				
				//위치
				excelBasicUtils.setCellValue(wb, sheetNo, rowStartCount, 23, Cell.CELL_TYPE_STRING, (String)dr.getVal("AST_TYPE1"), 3);
				
				//메모
				excelBasicUtils.setCellValue(wb, sheetNo, rowStartCount, 26, Cell.CELL_TYPE_STRING, (String)dr.getVal("OBS_MEMO"), 5);
				
				rowStartCount = rowStartCount + 1;
			}
			
			String date = new SimpleDateFormat("yyyyMMddhhmmssSSS").format(new Date());
			ByteArrayOutputStream outByteStream = new ByteArrayOutputStream();
	        wb.write(outByteStream);
			response.reset();
//			application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
//			response.setContentType("application/vnd.ms-excel; charset=utf-8");

			response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
			response.setHeader("Accept-Ranges", "bytes");
			response.setHeader("Content-Transfer-Encoding", "binary");
	        String fileName = URLEncoder.encode("예방점검서비스리포트_" + date + ".xlsx", "UTF-8").replaceAll("\\+", "%20");
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
