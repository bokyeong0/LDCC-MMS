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
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.HashMap;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.poi.hssf.usermodel.HSSFClientAnchor;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.ClientAnchor;
import org.apache.poi.ss.usermodel.ClientAnchor.AnchorType;
import org.apache.poi.ss.usermodel.Comment;
import org.apache.poi.ss.usermodel.CreationHelper;
import org.apache.poi.ss.usermodel.Drawing;
import org.apache.poi.ss.usermodel.RichTextString;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFClientAnchor;
import org.apache.poi.xssf.usermodel.XSSFCreationHelper;
import org.apache.poi.xssf.usermodel.XSSFDrawing;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

/**
 * 
 * 예방 점검 및 서비스 리포트에 공통으로 자주 쓰이는 함수
 * 
 * @class ExcelBasicUtils.java
 * @package vertexid.paragon.comm.util.excelForm
 * @author "Shin Dong Cheol"
 * @version 1.0
 */
public class ExcelBasicUtils {

	private static final Log LOG = LogFactory.getLog(ExcelBasicUtils.class);

	public  final int CHECK_NULL_CELL = 100;

	private  final String EXCEL_ENCODING = "EUC-KR";
	
	private  String OS = System.getProperty("os.name").toLowerCase();
	
	public final short preventSignCellHeight = 2400;
	
	public final short servieReportSignCellHeight = 2400;

	/**
	 * 
	 * 
	 * 엑셀 양식 중 Title이 위치한 Row Index 값
	 * 
	 * @Author "Shin Dong Cheol"
	 * @Date 2017. 12. 8.
	 * 
	 * @param wb : Workbook, 엑셀 파일
	 * @param sheetIndex : 시트 번호(0, 1, 2, ...)
	 * @param title : 엑셀 템플릿 양식의 제목
	 * @param titleBeginColIndex : 엑셀 템플릿 양식의 제목 시작 위치
	 */
	public  int getRowPos(Workbook wb, int sheetIndex, String title, int titleBeginColIndex) {
		LOG.debug("getRowPos ----------->");
		
		int nullCount = 0;
		
		int pos = -1;
		
		for(int rowIndex = 0; nullCount < CHECK_NULL_CELL ; rowIndex++) {
			String tempStrFirstCell = getCellString(wb, sheetIndex, rowIndex, titleBeginColIndex);
			LOG.debug("tempStrFirstCell ---> "+tempStrFirstCell);
			String tempStrSecondCell = getCellString(wb, sheetIndex, rowIndex, titleBeginColIndex+1);
			LOG.debug("tempStrSecondCell ---> "+tempStrSecondCell);
			
			if (tempStrFirstCell == null && tempStrSecondCell == null) {
				nullCount ++;
			}
			else {
				if (tempStrFirstCell != null && tempStrFirstCell.length() > 0 & tempStrFirstCell.indexOf(title) >= 0) {
					pos = rowIndex;
					break;
				}
				if (tempStrSecondCell != null && tempStrSecondCell.length() > 0 & tempStrSecondCell.indexOf(title) >= 0) {
					pos = rowIndex;
					break;
				}
			}
		}
		LOG.debug("getRowPos <-----------");
		return pos;
	}
	
	/**
	 * 
	 * 
	 * 셀의 입력 된 값 가져오기
	 * @Author "Shin Dong Cheol"
	 * @Date 2017. 12. 8.
	 * 
	 * @param wb			: 엑셀 파일
	 * @param sheetIndex	: 시트 번호(0, 1, 2, ...)
	 * @param rowIndex		: Row 번호
	 * @param colIndex		: Column 번호
	 */
	public  String getCellString(Workbook wb, int sheetIndex, int rowIndex, int colIndex) {
		LOG.debug("getCellString ----------->");
		String retStr = null;
		Sheet sheet = wb.getSheetAt(sheetIndex);
		Row row = sheet.getRow(rowIndex);
		
		if (row != null) {
			Cell cell = row.getCell(colIndex);
			if (cell != null) {
				int cellType = cell.getCellType();
				switch(cellType) {
				case Cell.CELL_TYPE_BOOLEAN:
				case Cell.CELL_TYPE_FORMULA:
				case Cell.CELL_TYPE_STRING:
					cell.setCellType(Cell.CELL_TYPE_STRING);
					retStr = cell.getStringCellValue();
					
					break;
				case Cell.CELL_TYPE_NUMERIC:
					
					break;
					
				case Cell.CELL_TYPE_BLANK:
					break;
				default :
					break;
				}
			}
		}
		
		LOG.debug("getCellString <-----------");
		return retStr;
	}

	/**
	 * 
	 * 
	 * Row Copy 가능 여부 체크
	 * @Author "Shin Dong Cheol"
	 * @Date 2017. 12. 8.
	 * 
	 * @param wb			: 엑셀 파일               
	 * @param sheetNo       : 시트 번호(0, 1, 2, ...) 
	 * @param rowIndex      : Row 번호              
	 * @param colIndex      : Column 번호           
	 */
	public  boolean isCopyRow(Workbook wb, int sheetNo, int rowIndex, int colIndex) {
		LOG.debug("isCopyRow ----------->");
		boolean bRet = true;
		String noStr = getCellString(wb, sheetNo, rowIndex, colIndex);
		LOG.debug("isCopyRow [noStr] -----------> "+noStr);
		if(noStr != null){
			bRet = false;
		}
		LOG.debug("isCopyRow <-----------");
		return bRet;
	}

	/**
	 * 
	 * 
	 * Row Copy And Paste
	 * 
	 * @Author "Shin Dong Cheol"
	 * @Date 2017. 12. 8.
	 * 
	 * @param workbook			: 엑셀 파일
	 * @param workSheet			: 작업 시트
	 * @param sourceRowNum		: 복사 할 Row Index
	 * @param destinationRowNum	: 붙여넣기 할 Row Index
	 */
	public  void copyRow(Workbook workbook, Sheet workSheet, int sourceRowNum, int destinationRowNum) {
		LOG.debug("copyRow ----------->");
		Row newRow = workSheet.getRow(destinationRowNum);
		Row sourceRow = workSheet.getRow(sourceRowNum);
		LOG.debug("newRow is Null ? "+(newRow == null));
		LOG.debug("sourceRow is Null ? "+(sourceRow == null));
		LOG.debug("copy Row init!! ----------->");
		if (newRow != null) {
			workSheet.shiftRows(destinationRowNum, workSheet.getLastRowNum(), 1);
			LOG.debug("new Row is not null ----------->");		
		}
		else {
			newRow = workSheet.createRow(destinationRowNum);
			LOG.debug("new Row is null ----------->");		
		}
		
		for (int i = 0; i < sourceRow.getLastCellNum(); i++) {
			LOG.debug("for Index -----------> "+i);		

			Cell oldCell = sourceRow.getCell(i);
			Cell newCell = newRow.createCell(i);
			
			if (oldCell == null) {
				newCell = null;
				
				continue;
			}

			newRow.setHeight(sourceRow.getHeight());
			CellStyle newCellStyle = workbook.createCellStyle();
			newCellStyle.cloneStyleFrom(oldCell.getCellStyle());
			newCell.setCellStyle(newCellStyle);
			
			if (oldCell.getCellComment() != null) {
				newCell.setCellComment(oldCell.getCellComment());
			}
			
			if (oldCell.getHyperlink() != null) {
				newCell.setHyperlink(oldCell.getHyperlink());
			}
			
			
			switch (oldCell.getCellType()) {
			case Cell.CELL_TYPE_BLANK:
				break;
				
			case Cell.CELL_TYPE_BOOLEAN:
				newCell.setCellValue(oldCell.getBooleanCellValue());
				break;
				
			case Cell.CELL_TYPE_ERROR:
				newCell.setCellErrorValue(oldCell.getErrorCellValue());
				break;
				
			case Cell.CELL_TYPE_FORMULA:
				newCell.setCellFormula(oldCell.getCellFormula());
				break;
				
			case Cell.CELL_TYPE_NUMERIC:
				newCell.setCellValue(oldCell.getNumericCellValue());
				break;
				
			case Cell.CELL_TYPE_STRING:
				newCell.setCellValue(oldCell.getStringCellValue());
				
			default:
				break;
			}
		}
		
//		for (int i = 0; i < workSheet.getNumMergedRegions(); i++) {
//			LOG.debug("getNumMergedRegions Index -----------> "+ i);		
//			CellRangeAddress cellRangeAddress = workSheet.getMergedRegion(i);
//			LOG.debug("cellRangeAddress.getFirstRow() ------ "+cellRangeAddress.getFirstRow());
//			LOG.debug("cellRangeAddress.getFirstColumn() ------ "+cellRangeAddress.getFirstColumn());
//			LOG.debug("cellRangeAddress.getLastColumn() ------ "+cellRangeAddress.getLastColumn());
//			
//			if (cellRangeAddress.getFirstRow() == sourceRow.getRowNum()) {
//				CellRangeAddress newCellRangeAddress = new CellRangeAddress(newRow.getRowNum(), 
//						(newRow.getRowNum() + (cellRangeAddress.getLastRow() - cellRangeAddress.getFirstRow())), 
//						cellRangeAddress.getFirstColumn(), 
//						cellRangeAddress.getLastColumn());
//				
//				workSheet.addMergedRegion(newCellRangeAddress);
//			}
//		}
		LOG.debug("copyRow <-----------");
	}
	
	/**
	 * 
	 * 
	 * 셀 병합
	 * 
	 * @Author "Shin Dong Cheol"
	 * @Date 2017. 12. 8.
	 * 
	 * @param sheet				: 작업 시트
	 * @param beginRowIndex		: 셀 병합 시작 Row Index
	 * @param endRowIndex		: 셀 병합 끝 Row Index
	 * @param beginColIndex		: 셀 병합 시작 Column Index
	 * @param endColIndex		: 셀 병합 끝 Column Index
	 */
	public  void addMergedRegion(Sheet sheet, int beginRowIndex, int endRowIndex, int beginColIndex, int endColIndex) {
		sheet.addMergedRegion(new CellRangeAddress(beginRowIndex, endRowIndex, beginColIndex, endColIndex));
	}
	
	/**
	 * 
	 * 
	 * 셀에 값 입력
	 * 
	 * @Author "Shin Dong Cheol"
	 * @Date 2017. 12. 13.
	 * 
	 * @param wb			: 엑셀 파일
	 * @param sheetIndex	: 시트 Index
	 * @param rowIndex		: row Index
	 * @param colIndex		: column Index
	 * @param cellType		: Cell Type (ex. Cell.CELL_TYPE_BLANK, Cell.CELL_TYPE_BOOLEAN, Cell.CELL_TYPE_FORMULA...)
	 * @param text			: 입력 될 내용
	 * @param addColIndex	: 입력 될 column 에서 띄워져야 할 column 수(셀 병합을 위해 추가 하였으나 아직 사용 안함).
	 */
	public  void setCellValue(Workbook wb, int sheetIndex, int rowIndex, int colIndex, int cellType, String text, int addColIndex) {
		LOG.debug("setCellValue ----------->");
		LOG.debug("text -----------> "+text);
		
		Sheet sheet = wb.getSheetAt(sheetIndex);
//		Row oldRow = sheet.getRow(rowIndex-1);
//		Row newRow = sheet.getRow(rowIndex);
//		newRow.setHeight(oldRow.getHeight());
//		Cell oldCell = oldRow.getCell(colIndex);
//		CellStyle newCellStyle = wb.createCellStyle();
//		newCellStyle.cloneStyleFrom(oldCell.getCellStyle());
//		newCellStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
//		newCellStyle.setAlignment(CellStyle.ALIGN_CENTER);
//		newCellStyle.setBorderLeft(CellStyle.BORDER_THIN);
//		if (newRow.getFirstCellNum() == colIndex) {
//			newCellStyle.setBorderLeft(CellStyle.BORDER_MEDIUM);
//		}
//		newCellStyle.setBorderRight(CellStyle.BORDER_THIN);
//		newCellStyle.setBorderTop(CellStyle.BORDER_THIN);
//		
//		if(sheet.getLastRowNum() == rowIndex) {
//			newCellStyle.setBorderBottom(CellStyle.BORDER_MEDIUM);
//		}
		Cell cell = getCell(sheet, rowIndex, colIndex);
		
		LOG.debug("cell is NULL? -----------> "+(cell == null));
		cell.setCellType(cellType);
		cell.setCellValue(text);
//		cell.setCellStyle(newCellStyle);
//		for(int i = 0; i < addColIndex; i++) {
//			int newColIndex = i + colIndex + 1;
//			Cell mergeCell = getCell(sheet, rowIndex, newColIndex);
//			if (newRow.getLastCellNum() == newColIndex) {
//				newCellStyle.setBorderRight(CellStyle.BORDER_MEDIUM);
//			}
//			mergeCell.setCellStyle(newCellStyle);
//		}
		LOG.debug("setCellValue <-----------");
	}
	
	public  void setCellValue(Workbook wb, int sheetIndex, int rowIndex, int colIndex, int cellType, String text) {
		setCellValue(wb, sheetIndex, rowIndex, colIndex, cellType, text, 1);
	}
	
	/**
	 * 
	 * 
	 * 셀에 값 입력
	 * 
	 * @Author "Shin Dong Cheol"
	 * @Date 2017. 12. 13.
	 * 
	 * @param wb			: 엑셀 파일
	 * @param sheetIndex	: 시트 Index
	 * @param rowIndex		: row Index
	 * @param colIndex		: column Index
	 * @param cellType		: Cell Type (ex. Cell.CELL_TYPE_BLANK, Cell.CELL_TYPE_BOOLEAN, Cell.CELL_TYPE_FORMULA...)
	 * @param text			: 입력 될 내용
	 * @param addColIndex	: 입력 될 column 에서 띄워져야 할 column 수(셀 병합을 위해 추가 하였으나 아직 사용 안함).
	 */
	public  void setCellValue(XSSFWorkbook wb, int sheetIndex, int rowIndex, int colIndex, int cellType, String text, int addColIndex) {
		LOG.debug("setCellValue ----------->");
		LOG.debug("text -----------> "+text);
		
		XSSFSheet sheet = wb.getSheetAt(sheetIndex);
		XSSFCell cell = getCell(sheet, rowIndex, colIndex);
		
		LOG.debug("cell is NULL? -----------> "+(cell == null));
		cell.setCellType(cellType);
		cell.setCellValue(text);
		LOG.debug("setCellValue <-----------");
	}
	
	public  void setCellValue(XSSFWorkbook wb, int sheetIndex, int rowIndex, int colIndex, int cellType, String text) {
		setCellValue(wb, sheetIndex, rowIndex, colIndex, cellType, text, 1);
	}
	
	/**
	 * 
	 * 
	 * 컬럼에 설명 추가
	 * 
	 * @Author "Shin Dong Cheol"
	 * @Date 2017. 12. 8.
	 * 
	 * @param wb				: 엑셀 파일
	 * @param sheetIndex		: 시트 Index
	 * @param rowIndex			: row Index
	 * @param colIndex			: column Index
	 * @param commentContent	: 설명 내용
	 */
	public  void setCellComment(Workbook wb, int sheetIndex, int rowIndex, int colIndex, String commentContent) {
		LOG.debug("setCellComment ----------->");
		Sheet sheet = wb.getSheetAt(sheetIndex);
		Cell cell = getCell(sheet, rowIndex, colIndex);
		
		Comment comment = cell.getCellComment();
		CreationHelper factory = wb.getCreationHelper();
		if (comment == null) {
			Drawing drawing = sheet.createDrawingPatriarch();
			ClientAnchor anchor = factory.createClientAnchor();
			anchor.setCol1(cell.getColumnIndex());
			anchor.setCol2(cell.getColumnIndex() + 2);
			anchor.setRow1(cell.getRowIndex());
			anchor.setRow2(cell.getRowIndex() + 2);
			comment = drawing.createCellComment(anchor);
		}
		
		RichTextString richTextString = factory.createRichTextString(commentContent);
		LOG.debug("richTextString ------> "+richTextString);
		comment.setString(richTextString);
		cell.setCellComment(comment);
		LOG.debug("setCellComment <-----------");
	}
	
	/**
	 * 
	 *  
	 * 셀 병합 제거
	 * 
	 * @Author "Shin Dong Cheol"
	 * @Date 2017. 12. 8.
	 * 
	 * @param sheet					: 현재 시트
	 * @param titleRowPosition		: 타이틀 위치
	 */
	public  void umMergedRow(Sheet sheet, int titleRowPosition) {
		for (int i = sheet.getNumMergedRegions() - 1; i >= 0; i--) {
			CellRangeAddress region = sheet.getMergedRegion(i);
			Row firstRow = sheet.getRow(region.getFirstRow());
			if (firstRow.getRowNum() == titleRowPosition) {
				sheet.removeMergedRegion(i);
			}
		}
	}
	
	/**
	 * 
	 * 
	 * Max 컬럼 Width 설정
	 * 
	 * @Author "Shin Dong Cheol"
	 * @Date 2017. 12. 8.
	 * 
	 * @param dataStr		: data String
	 * @param colWidthMap	: column width Hash Map
	 * @param mapIndex		: map Index
	 */
	public  void setMaxColWidth (String dataStr, HashMap<Integer, Integer> colWidthMap, int mapIndex) {
		LOG.debug("setMaxColWidth ----------->");
		byte[] dataStrByte = null;
		try {
			dataStrByte = dataStr.getBytes(EXCEL_ENCODING);
			Integer curColWidth = dataStrByte.length * 255;
			Integer maxColWidth = colWidthMap.get(mapIndex);
			LOG.debug("curColWidth -----> "+curColWidth);
			LOG.debug("maxColWidth -----> "+maxColWidth);
			
			if (maxColWidth == null) {
				maxColWidth = curColWidth;
				colWidthMap.put(mapIndex, curColWidth);
			}
			
			if (curColWidth > maxColWidth) {
				colWidthMap.put(mapIndex, curColWidth);
			}
		} catch (Exception e) {
			
		}
		LOG.debug("setMaxColWidth <-----------");
	}
	
	/**
	 * 
	 * 
	 * 셀 가져오기
	 * 
	 * @Author "Shin Dong Cheol"
	 * @Date 2017. 12. 8.
	 * 
	 * @param sheet		: 현재 시트
	 * @param row		: row Index
	 * @param col		: column Index
	 */
	public  Cell getCell(Sheet sheet, int row, int col) {
		LOG.debug("getCell ----------->");
		Row sheetRow = sheet.getRow(row);
		LOG.debug("getCell [sheetRow is Null? ]<----------- "+(sheetRow == null));
		if (sheetRow == null) {
			sheetRow = sheet.createRow(row);
		}
		Cell cell = sheetRow.getCell(col);
		LOG.debug("getCell [cell is Null? ]<----------- "+(cell == null));
		if (cell == null) {
			cell = sheetRow.createCell(col);
		}
		LOG.debug("getCell <-----------");
		return cell;
	}

	/**
	 * 
	 * 셀 가져오기
	 * 
	 * @Author "Kim Seon Ho"
	 * @Date 2018. 01. 23.
	 * 
	 * @param sheet		: 현재 시트
	 * @param row		: row Index
	 * @param col		: column Index
	 */
	public  XSSFCell getCell(XSSFSheet sheet, int row, int col) {
		LOG.debug("getCell ----------->");
		XSSFRow sheetRow = sheet.getRow(row);
		LOG.debug("getCell [sheetRow is Null? ]<----------- "+(sheetRow == null));
		if (sheetRow == null) {
			sheetRow = sheet.createRow(row);
		}
		XSSFCell cell = sheetRow.getCell(col);
		LOG.debug("getCell [cell is Null? ]<----------- "+(cell == null));
		if (cell == null) {
			cell = sheetRow.createCell(col);
		}
		LOG.debug("getCell <-----------");
		return cell;
	}
	
	/**
	 * 
	 * 
	 * 셀에 이미지 추가
	 * 
	 * @Author "Shin Dong Cheol"
	 * @Date 2017. 12. 8.
	 * 
	 * @param sheet					: 현재 시트
	 * @param wb					: 엑셀 파일
	 * @param startColIndex			: 시작 column Index
	 * @param startRowIndex			: 시작 row Index
	 * @param isPreventiveCheck		: 예방 점검 여부
	 * @param filePath				: 파일 full path
	 * 
	 * @throws IOException			 IO 관련 Exception 발생 가능.
	 * @throws FileNotFoundException If the file does not exist, is a directory rather than a regular file, 
	 * 								  or for some other reason cannot be opened for reading. 
	 * @throws SecurityException	 If a security manager exists and its checkRead method denies read access to the file. 
	 */
	public  void drawImageCell(Sheet sheet, Workbook wb, int startColIndex, int startRowIndex, boolean isPreventiveCheck, String filePath) throws IOException {
		LOG.debug("drawImageCell ----------->");
		
		final Drawing drawing = sheet.createDrawingPatriarch();
		ClientAnchor anchor = new HSSFClientAnchor();
		anchor.setDx1(20);
		anchor.setDx2(0);
		anchor.setDy1(10);
		anchor.setDy2(245);
		anchor.setCol1(startColIndex);
		anchor.setCol2(startColIndex + 2);
		anchor.setRow1(startRowIndex);
		anchor.setRow2(startRowIndex);
		
		anchor.setAnchorType(AnchorType.MOVE_AND_RESIZE);
		
//		if (OS.indexOf("win") >= 0) {
//			filePath.replaceAll("/", "\\");
//		}
		
		drawing.createPicture(anchor, loadPicture(filePath, wb));
		LOG.debug("drawImageCell <-----------");
	}
	
	/**
	 * 
	 * 
	 * 셀에 이미지 추가
	 * 
	 * @Author "Kim Seon Ho"
	 * 
	 * @param sheet					: 현재 시트
	 * @param wb					: 엑셀 파일
	 * @param startColIndex			: 시작 column Index
	 * @param startRowIndex			: 시작 row Index
	 * @param isPreventiveCheck		: 예방 점검 여부
	 * @param filePath				: 파일 full path
	 * 
	 * @throws IOException			 IO 관련 Exception 발생 가능.
	 * @throws FileNotFoundException If the file does not exist, is a directory rather than a regular file, 
	 * 								  or for some other reason cannot be opened for reading. 
	 * @throws SecurityException	 If a security manager exists and its checkRead method denies read access to the file. 
	 */
	public  void drawXImageCell(XSSFSheet sheet, XSSFWorkbook wb, int startRowIndex, int startColIndex,  boolean isPreventiveCheck, String filePath) throws IOException {
		LOG.debug("drawImageCell ----------->");
		
		final XSSFDrawing drawing = sheet.createDrawingPatriarch();
		XSSFCreationHelper helper = wb.getCreationHelper();
		XSSFClientAnchor anchor = helper.createClientAnchor();
		
		anchor.setDx1(10);
		anchor.setDx2(0);
		anchor.setDy1(10);
		anchor.setDy2(245);
		anchor.setCol1(startColIndex);
		anchor.setCol2(startColIndex+4); //4칸
		anchor.setRow1(startRowIndex);
		anchor.setRow2(startRowIndex+2); //2칸
		
		anchor.setAnchorType(AnchorType.MOVE_AND_RESIZE);
		
		drawing.createPicture(anchor, loadXPicture(filePath, wb));
		LOG.debug("drawImageCell <-----------");
	}
	
	/**
	 * 
	 * 
	 * 이미지 로드 & 엑셀 이미지 추가
	 * 
	 * @Author "Shin Dong Cheol"
	 * @Date 2017. 12. 8.
	 * 
	 * @param filePath			: 파일 full path
	 * @param wb				: 엑셀 파일
	 * 
	 * @return 해당 그림 파일에 대한 Index(1개 기준)
	 * 
	 * @throws IOException			 IO 관련 Exception 발생 가능.
	 * @throws FileNotFoundException If the file does not exist, is a directory rather than a regular file, 
	 * 								  or for some other reason cannot be opened for reading. 
	 * @throws SecurityException	 If a security manager exists and its checkRead method denies read access to the file. 
	 */
	private  int loadPicture(String filePath, Workbook wb) throws IOException {
		LOG.debug("loadPicture ----------->");
		LOG.debug("loadPicture [filePath]-----------> "+filePath);
		int pictureIndex;

		FileInputStream fis = null;
		ByteArrayOutputStream bos = null;
		
		try {

			if(OS.indexOf("win") >= 0){
				 String dirPath =filePath.replace("upload", "uploadupload");
				 String separatorPath =  dirPath.replace("/", "//");
				 String FullPath = "C:"+separatorPath;
				 fis = new FileInputStream(FullPath);

			}else{
				fis = new FileInputStream(filePath);			
			}
			bos = new ByteArrayOutputStream();

			int c;
			while ((c=fis.read()) != -1) {
				bos.write(c);
			}
			
			pictureIndex = wb.addPicture(bos.toByteArray(), Workbook.PICTURE_TYPE_PNG);
		} finally {
			
			if (fis != null) fis.close();
			if (bos != null) bos.close();
		}
		
		LOG.debug("loadPicture <-----------");
		return pictureIndex;
	}
	
	/**
	 * 
	 * 
	 * 이미지 로드 & 엑셀 이미지 추가
	 * 
	 * @Author "Shin Dong Cheol"
	 * @Date 2017. 12. 8.
	 * 
	 * @param filePath			: 파일 full path
	 * @param wb				: 엑셀 파일
	 * 
	 * @return 해당 그림 파일에 대한 Index(1개 기준)
	 * 
	 * @throws IOException			 IO 관련 Exception 발생 가능.
	 * @throws FileNotFoundException If the file does not exist, is a directory rather than a regular file, 
	 * 								  or for some other reason cannot be opened for reading. 
	 * @throws SecurityException	 If a security manager exists and its checkRead method denies read access to the file. 
	 */
	private  int loadXPicture(String filePath, XSSFWorkbook wb) throws IOException {
		LOG.debug("loadPicture ----------->");
		LOG.debug("loadPicture [filePath]-----------> "+filePath);
		int pictureIndex;

		FileInputStream fis = null;
		ByteArrayOutputStream bos = null;
		
		try {

			if(OS.indexOf("win") >= 0){
				 String dirPath =filePath.replace("upload", "uploadupload");
				 String separatorPath =  dirPath.replace("/", "//");
				 String FullPath = "C:"+separatorPath;
				 fis = new FileInputStream(FullPath);

			}else{
				fis = new FileInputStream(filePath);			
			}
			bos = new ByteArrayOutputStream();

			int c;
			while ((c=fis.read()) != -1) {
				bos.write(c);
			}
			
			pictureIndex = wb.addPicture(bos.toByteArray(), XSSFWorkbook.PICTURE_TYPE_PNG);
		} finally {
			
			if (fis != null) fis.close();
			if (bos != null) bos.close();
		}
		
		LOG.debug("loadPicture <-----------");
		return pictureIndex;
	}
	
}
