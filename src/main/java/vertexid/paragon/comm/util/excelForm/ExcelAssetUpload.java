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

import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import vertexid.paragon.comm.util.ExcelReadOption;

/**
 * [설명]
 *
 * @class ExcelAssetUpload.java
 * @package vertexid.paragon.comm.util.excelForm
 * @author "Kim Jin Ho"
 * @version 1.0
 */
public class ExcelAssetUpload {
	
	private static final Log LOG = LogFactory.getLog(ExcelAssetUpload.class);
	
	//엑셀업로드/////////////////////////////////////////////////////////////////////////////////////////////////
	private ExcelReadOption excelReadOption = new ExcelReadOption();
	private Workbook wb = null;
	private Sheet sheet = null;
	
	public List<String> columnKorNameArray = new ArrayList<String>();
	public List<String> valiCheckList = new ArrayList<String>();

	private List<String> columnCodeArray = new ArrayList<String>();
	private Map<String, Integer> option = new HashMap<String, Integer>();
	private List<String> valiColList = new ArrayList<String>();

	private int sheetNum = 0;   //시트 번호
	private int numOfCells = 0;
	private int numOfRows = 0; //로우의 개수
	public int rowIndex = 0; //작업중인 행 번호
	public int colIndex = 0; //작업중인 열 번호
    
    public ExcelAssetUpload(HttpSession session, MultipartHttpServletRequest request) {
    	
        MultipartFile excelFile = request.getFile("excelFile");
		LOG.debug("===== 엑셀 업로드 시작 =====");
		
        option.put("setLoadingSheetNum", 0); //시트 번호
        option.put("getColumnForCount", 1); //시작 컬럼
        option.put("setLoadingColStCount", 0); //제목행 위치
        option.put("setLoadingContStCount", 2); //데이터행 위치
        
        //필수값체크
        valiColList.add("ASP_COMP_CD");
        valiColList.add("STR_CD");
        valiColList.add("PRD_CD");
        valiColList.add("AST_ST");
        valiColList.add("AST_MFR_DT");
        valiColList.add("FREE_START_DT");
        valiColList.add("FREE_END_DT");
        valiColList.add("COST_START_DT");
        
        for(String col : valiColList) {
        	valiCheckList.add(col);
        }
        
        //0. Path
        excelReadOption.setFilePath(session.getServletContext().getRealPath(excelFile.getOriginalFilename()));
        //1. column 값
        excelReadOption.setStartRow(option.get("setLoadingColStCount"));
            
        //엑셀 데이터 생성 (자바)
    	wb = getWorkbook(excelFile);
    	
//    	sheetNum = wb.getNumberOfSheets(); //시트의 개수를 가져오기 위한 변수 (전체시트)
    	sheetNum = option.get("setLoadingSheetNum"); //한시트일때
    	sheet = wb.getSheetAt(sheetNum);         	
    	LOG.debug("Sheet Name = "+ wb.getSheetName(sheetNum));
    	
        //컬럼 영문명이 있는 행
        rowIndex = 0;
        Row row = sheet.getRow(rowIndex);
        
        numOfCells = row.getPhysicalNumberOfCells();

        for(colIndex = 0; colIndex < numOfCells; colIndex++) {
    		Cell cell = row.getCell(colIndex);
        	String cellName = cell.getStringCellValue();	//해당 컬럼의 명을 입력.
        	columnCodeArray.add(cellName);
        	valiCheckList.remove(cellName);
        }
        
        //컬럼 한글명이 있는 행
        rowIndex = 1;
        row = sheet.getRow(rowIndex);
        for(colIndex = 0; colIndex < numOfCells; colIndex++) {
        	String cellName = "";
    		Cell cell = row.getCell(colIndex);
        	if(cell != null) cellName = cell.getStringCellValue();	//해당 컬럼의 명을 입력.
        	columnKorNameArray.add(cellName);
        }
    	
    	//유효한 데이터가 있는 행의 개수를 가져온다.
        numOfRows = sheet.getPhysicalNumberOfRows();
        for(rowIndex = option.get("setLoadingContStCount"); rowIndex < numOfRows ; rowIndex++) {
        	row = sheet.getRow(rowIndex);
	        if(row != null) {
	        	boolean isEmptyRow = true;
	            LOG.debug("rowIndex = " + rowIndex);
		        for(colIndex = 0; colIndex < numOfCells; colIndex++) {
			   		Cell cell = row.getCell(colIndex);
			   		if(cell != null) {
			   			if(cell.getStringCellValue().trim().length() != 0) {
			   				isEmptyRow = false;
			   				break;
			   			}
			   		}
		        }
		        if(isEmptyRow) {
		            numOfRows = rowIndex;
		            break;
		        }
	        }
        }
        LOG.debug("유효 데이터 행 = " + numOfRows);

        LOG.debug("===== 엑셀 업로드 초기화 완료 =====");
	}
	
	//컬럼과 데이터 조회 두 로직에서 사용됨
	public Map<String, String> readLogic(Row row) throws NullPointerException{
		Map<String, String> returnExMap = new HashMap<String, String>();
    	 
    	//COLUMN 명 입력
    	for(colIndex = 0; colIndex < numOfCells; colIndex++) {
    		Cell cell = row.getCell(colIndex);
    		String cellName = columnCodeArray.get(colIndex);
    		
    		returnExMap.put(cellName, ExcelCellRefGetValue(cell, cellName));
        }
		return returnExMap;
	}
	
    public List<Map<String, String>> read() throws NullPointerException {
        //FileType.getWorkbook() <-- 파일의 확장자에 따라서 적절하게 가져온다.
        List<Map<String, String>> result = new ArrayList<Map<String, String>>(); 

//        numOfRows = 1900;
        for(rowIndex = option.get("setLoadingContStCount"); rowIndex < numOfRows ; rowIndex++) {
//            for(int rowIndexCount = getExDataMap("setLoadingContStCount"); rowIndexCount < numOfRows ; rowIndexCount++) {
            Row row = sheet.getRow(rowIndex);
            if(row != null) {
            	LOG.debug("rowIndex = "+rowIndex);
                result.add(readLogic(row));   
            }else{
            	LOG.debug("====> ERROR rowIndex = "+rowIndex);
            }
        	LOG.debug("비교"+rowIndex);
        }
        LOG.debug(result);
        return result;       
	}      

	/** [엑셀 업로드 메서드]
	 * [설명] 엑셀파일을 읽어서 Workbook 객체에 리턴한다.
	 * [설명] XLS와 XLSX 확장자를 비교한다.
	 * 
	 * @Author "Kim Seon Ho"
	 * @Date 2017. 11. 24.
	 */
    public Workbook getWorkbook(MultipartFile excelFile) {
        
        /*
         * FileInputStream은 파일의 경로에 있는 파일을
         * 읽어서 Byte로 가져온다.
         * 
         * 파일이 존재하지 않는다면은
         * RuntimeException이 발생된다.
         */
    	String filePath = excelFile.getName();
        InputStream fis = null;
        Workbook wb = null;
        try {
			fis = excelFile.getInputStream();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	LOG.debug("EXCEL 로딩  : " + filePath + " ( " + excelFile.getSize() + " bytes )");
        
        /*
         * 파일의 확장자를 체크해서 .XLS 라면 HSSFWorkbook에
         * .XLSX라면 XSSFWorkbook에 각각 초기화 한다.
         */
        if(filePath.toUpperCase().endsWith(".XLS")) {
            try {
                wb = new HSSFWorkbook(fis);
            } catch (IOException e) {
            	LOG.debug(".XLS 로딩오류");
                throw new RuntimeException(e.getMessage(), e);
            }
        }
        else {
            try {
                wb = new XSSFWorkbook(fis);
            } catch (IOException e) {
            	LOG.debug(".XLSX 로딩오류");
                throw new RuntimeException(e.getMessage(), e);
            }
        }
    	LOG.debug("EXCEL 로딩완료");
        
        return wb;
        
    }
    
	/** [엑셀업로드 메서드]
     * [설명] Cell에 해당하는 Column Name을 가젼온다(A,B,C..)
     * [설명] 만약 Cell이 Null이라면 int cellIndex의 값으로
     * [설명] Column Name을 가져온다.
     * 
	 * @Author "Kim Seon Ho"
	 * @Date 2017. 11. 24.
	 */
    public String ExcelCellRefGetValue(Cell cell, String cellName) throws NullPointerException{
        String value = "";
        
        //각 쎌의 값을 가져와 Type에 따라 + '' 하여 String으로 변환, 소수점 -> 정수표현
        if(cell != null) {
        	switch(cell.getCellType()) {
        	case Cell.CELL_TYPE_NUMERIC :
        		value = (long)cell.getNumericCellValue() + "";
        		break;
        	case Cell.CELL_TYPE_BOOLEAN :
        		value = cell.getBooleanCellValue() + "";
        		break;
        	case Cell.CELL_TYPE_ERROR :
        		value = cell.getErrorCellValue() + "";
        		break;
        	case Cell.CELL_TYPE_BLANK :
        		break;
        	case Cell.CELL_TYPE_FORMULA : //수식을 그대로 가져올때
        	case Cell.CELL_TYPE_STRING :
        	default:
        		value = cell.getStringCellValue();
        		break;
        	}
        	value = value.trim();
        }
        
        if(valiColList.contains(cellName) && value.length() == 0) {
        	throw new NullPointerException();
        }
        if(cellName.equals("AST_ST") && value.length() != 3) {
        	throw new NullPointerException();
        }
        if((cellName.equals("FREE_START_DT") || cellName.equals("FREE_END_DT") || cellName.equals("COST_START_DT")) && value.length() != 10) {
        	throw new NullPointerException();
        }
        
        return value;
    }
}
