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
 * "Kim Jin Ho"         	2017. 11. 30. 			First Draft.
 */
package vertexid.paragon.template.ctrl;

import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

import org.apache.poi.hssf.usermodel.HSSFClientAnchor;
import org.apache.poi.hssf.usermodel.HSSFPatriarch;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.ClientAnchor.AnchorType;
import org.apache.poi.ss.usermodel.Drawing;
import org.apache.poi.ss.usermodel.Picture;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;

/**
 * [설명]
 *
 * @class ExcelImageInsertExample.java
 * @package vertexid.paragon.template.ctrl
 * @author "Kim Jin Ho"
 * @version 1.0
 */
public class ExcelImageInsertExample {
	
	public static void main(String[] args) throws IOException {
		
		//C:\Users\VertexID\Documents\롯데POS유지보수시스템문서\02_보안심사\체크리스트_김무현_171115.xlsx
		POIFSFileSystem fs = new POIFSFileSystem(new FileInputStream("C:\\Users\\VertexID\\Documents\\롯데POS유지보수시스템문서\\11_이슈관리\\이슈관리_171107.xls"));	//원본 엑셀 파일
		HSSFWorkbook wb = new HSSFWorkbook(fs);
		Workbook workbook = WorkbookFactory.create(fs);
		HSSFSheet sheet = wb.getSheetAt(0);
		Sheet sheet1 = workbook.getSheetAt(0);
		
		drawSheet5(sheet, wb);
		
		//Write File out
		FileOutputStream fileOut = new FileOutputStream("C:\\Users\\VertexID\\Documents\\롯데POS유지보수시스템문서\\11_이슈관리\\이슈관리_171107_image.xls");
		wb.write(fileOut);
		fileOut.close();
		
	}
	
	private static void drawSheet5(HSSFSheet sheet, HSSFWorkbook wb) throws IOException	{
        // Create the drawing patriarch.  This is the top level container for
        // all shapes. This will clear out any existing shapes for that sheet.
		
//		HSSFPatriarch patriarch = sheet.createDrawingPatriarch();
		final Drawing drawing = sheet.createDrawingPatriarch();
		HSSFClientAnchor anchor;
		anchor = new HSSFClientAnchor(0, 0, 0, 255, (short)3, 10, (short)10, 20);  // 이미지 크기 조절
//		anchor = new HSSFCli
		anchor.setAnchorType(AnchorType.MOVE_AND_RESIZE);
		//C:\\Users\\VertexID\\Downloads\\testImage.jpg
//		patriarch.createPicture(anchor, loadPicture("C:\\Users\\VertexID\\Downloads\\testImage.jpg", wb));
		final Picture pict = drawing.createPicture(anchor, loadPicture("C:\\Users\\VertexID\\Downloads\\testImage.jpg", wb));
		pict.resize();
	}
	
	private static int loadPicture(String path, HSSFWorkbook wb) throws IOException {
		int pictureIndex;
		FileInputStream fis = null;
		ByteArrayOutputStream bos = null;
		
		try {
			fis = new FileInputStream(path);
			bos = new ByteArrayOutputStream();
			int c;
			while ((c=fis.read()) != -1) {
				bos.write(c);
			}
			
			pictureIndex = wb.addPicture(bos.toByteArray(), HSSFWorkbook.PICTURE_TYPE_JPEG);
		} finally {
			if(fis != null) fis.close();
			if(bos != null) bos.close();
		}
		
		return pictureIndex;
	}
}
