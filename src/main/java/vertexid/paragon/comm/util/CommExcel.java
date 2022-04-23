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
 * "Kim Jin Ho"         	2017. 3. 24. 			First Draft.
 */
package vertexid.paragon.comm.util;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellReference;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import paragon.core.paramaters.Params;
import paragon.core.paramaters.datatable.DataTable;

/**
 * [설명]
 *
 * @class CommExcel.java
 * @package vertexid.paragon.comm.util
 * @author "Kim Jin Ho"
 * @version 1.0
 */
public class CommExcel {
	private static final Log LOG = LogFactory.getLog(CommExcel.class);
	private static final String SP = File.separator;	// 서버 구분자
	private static final String BASEFOLDER = "upload";		// 기본폴더명
	public static String savePath = "";
	
	
	@Autowired(required = true)
//	private  HttpServletRequest request;
	
	
	private static String UTF8convert(String str, String encoding) throws IOException {
		  ByteArrayOutputStream requestOutputStream = new ByteArrayOutputStream();
		  requestOutputStream.write(str.getBytes(encoding));
		  return requestOutputStream.toString("UTF-8");
	}
	
	//엑셀 다운로드
	@SuppressWarnings("deprecation")
	public void download(HttpServletResponse response,  HttpServletRequest request, Params inParams) throws Exception {
	   	
		DataTable dt = inParams.getDataTable();
		String sheetName = inParams.getString("sheetNm");
		List<String> columnNms = inParams.getStrListParam("excelColunmNms"); 
		List<String> columnIds = inParams.getStrListParam("excelColunmIds");
		String caption = inParams.getString("caption");
		
		String encodingStr = "iso-8859-1";
		if(inParams.getString("encoding") != null){
			encodingStr = inParams.getStrParam("encoding");
		}
		LOG.debug(encodingStr);
		XSSFWorkbook workbook = new XSSFWorkbook();
		// 2차는 sheet생성
		if(sheetName == null){
			sheetName = "sheet";
		}
		sheetName = UTF8convert(sheetName, encodingStr);
		XSSFSheet sheet = workbook.createSheet(sheetName);
		
		// 엑셀의 행
		XSSFRow row = null;
		// 엑셀의 셀
		XSSFCell cell = null;
		// 임의의 DB데이터 조회
		
		
		XSSFCellStyle cellStyle_head = workbook.createCellStyle();
		cellStyle_head.setFillBackgroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
		cellStyle_head.setBorderRight(HSSFCellStyle.BORDER_THIN);   
		cellStyle_head.setBorderLeft(HSSFCellStyle.BORDER_THIN);   
		cellStyle_head.setBorderTop(HSSFCellStyle.BORDER_THIN);   
		cellStyle_head.setBorderBottom(HSSFCellStyle.BORDER_THIN);
		cellStyle_head.setAlignment((short)2);
		
		XSSFCellStyle cellStyle_body = workbook.createCellStyle();
	    cellStyle_body.setBorderRight(HSSFCellStyle.BORDER_THIN);   
	    cellStyle_body.setBorderLeft(HSSFCellStyle.BORDER_THIN);   
	    cellStyle_body.setBorderTop(HSSFCellStyle.BORDER_THIN);   
	    cellStyle_body.setBorderBottom(HSSFCellStyle.BORDER_THIN); 
		
	    int rowNum = 0; //시작행 초기화
	    int rowWidthPadding = 256;
	    
	    //제목컬럼
		row = sheet.createRow((short) rowNum);
		for (int i = 0; i < columnIds.size(); i++) {
			String cellStr = UTF8convert(columnNms.get(i), encodingStr);
			cell = row.createCell(i);
			cell.setCellValue(cellStr);
			cell.setCellStyle(cellStyle_head);
			if(i == columnIds.size()){
				rowNum += 1;
			}
		}
		//내용
		for (int i = 1; i <= dt.size(); i++) {
			row = sheet.createRow((short) i+rowNum);
			for (int f = 0 ; f < columnIds.size(); f++) {
				cell = row.createCell(f);
				if("null".equals(String.valueOf(dt.get(i-1).getString(columnIds.get(f))))){ //null -> ""
				    cell.setCellValue("");
				}else{
				    cell.setCellValue(UTF8convert(dt.get(i-1).getString(columnIds.get(f)), encodingStr));
				}
				cell.setCellStyle(cellStyle_body);				
			}
		}
		//셀크기 자동조정
		for (int i=0;i<columnIds.size();i++) //autuSizeColumn after setColumnWidth setting!! 
		{ 
			sheet.autoSizeColumn(i);
			sheet.setColumnWidth(i, (sheet.getColumnWidth(i))+rowWidthPadding ); 
		}
		
		ByteArrayOutputStream outByteStream = new ByteArrayOutputStream();
		try {
	        workbook.write(outByteStream);
			response.reset();
			response.setContentType("application/vnd.ms-excel; charset=utf-8");
			response.setHeader("Accept-Ranges", "bytes");
			response.setHeader("Content-Transfer-Encoding", "binary");
	        String fileName = URLEncoder.encode(sheetName + ".xlsx", "UTF-8").replaceAll("\\+", "%20");
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
		workbook.close();
	}
	
	private String uploadServer(String folder , String root){
		String date = new SimpleDateFormat("yyyyMMddhhmmssSSS").format(new Date());
		String dirY = new SimpleDateFormat("yyyy").format(new Date()); 
		String dirM = new SimpleDateFormat("MM").format(new Date()); 
		String dirD = new SimpleDateFormat("dd").format(new Date()); 
		

		String sFileName = "grid_"+date +".xlsx";
		String filePath =  root +BASEFOLDER+SP+folder +SP+ dirY+SP+ dirM+SP+ dirD ;
		savePath = "/"+BASEFOLDER+"/"+folder+"/"+dirY+"/"+dirM+"/"+dirD;

		FileOutputStream fos = null;
		String fullPath = "";
		try {
			sFileName = checkFile(filePath,sFileName);
			fullPath = filePath + SP + sFileName;
			checkDir(filePath);

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (fos != null) {
				try {
					fos.close();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		return fullPath;
	}
	private void checkDir(String path) {
		File dir = new File(path);
		if (!dir.exists()) {
			dir.mkdirs();
		}
	}
	
	
	private String checkFile(String path, String fileNm){
		String tempFileName =  fileNm.substring(0,fileNm.lastIndexOf("."));
		String tempFileEx =  fileNm.substring(fileNm.lastIndexOf("."));
		String tempFullName =  tempFileName+tempFileEx;
		int cnt = 1;
		while (true) {
			File f = new File(path+SP+tempFullName);
			if (f.isFile()) {
				System.out.println(tempFullName+ "와 동일한 파일명이 있습니다.");
				tempFullName = tempFileName+"("+cnt+")"+tempFileEx;
				cnt++;
			}else {
				System.out.println(tempFullName + "는 등록된 파일이 없습니다.");
				break;
			}
	    }
	    return tempFullName;
	}
	
}
