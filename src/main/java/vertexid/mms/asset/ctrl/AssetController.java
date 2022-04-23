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
 * "Kim Jin Ho"         	2017. 4. 18. 			First Draft.
 */
package vertexid.mms.asset.ctrl;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.ByteArrayOutputStream;
import java.io.DataInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URL;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import paragon.core.paramaters.Params;
import paragon.core.paramaters.datatable.DataTable;
import paragon.core.utility.config.Config;
import vertexid.mms.asset.svce.AssetService;
import vertexid.paragon.comm.util.FileDownLoader;
import vertexid.paragon.comm.util.excelForm.ExcelBasicUtils;

/**
 * [설명]
 *
 * @class AssetController.java
 * @package vertexid.mms.asset.ctrl
 * @author "Kim Jin Ho"
 * @version 1.0
 */
@Controller
@RequestMapping("/ctrl/asset/asset")
public class AssetController {

	private static final Log LOG = LogFactory.getLog(AssetController.class);
	
	@Autowired
	private AssetService assetService;  
	
	
	@RequestMapping
	public String assetPageMove(){
		LOG.debug("StandardAreaController standardAreaPageMove()");
		return "asset/asset_manager";
	}
	
	/**
	 * [설명]
	 * 자산정보 리스트
	 * @Author 최판석
	 * @Date 2017. 4. 18.
	*/
	@RequestMapping("/listAssetManager")
	public Params listAssetManager(Params inParams){
		return assetService.getAseetManagerList(inParams);
	}
	
	@RequestMapping("/listAssetSearch")
	public Params listAssetSearch(Params inParams){
		return assetService.getAssetSearchList(inParams);
	}
		

	@RequestMapping("/listStrCodeComboJson") 
	public DataTable listStrCodeComboJson(Params inParams) {
		return  assetService.getStrCodeComboList(inParams);
	}
	
	@RequestMapping("/listAreaCode") 
	public DataTable listAreaCode(Params inParams) {
		return  assetService.getAreaCodeList(inParams);
	}
	
//	@RequestMapping("/listAssetPrdCode") 
//	public DataTable listAssetPrdCode(Params inParams) {
//		return  assetService.getPrdCodeList(inParams);
//	}
//	
//	@RequestMapping("/listAssetPartCode") 
//	public DataTable listAssetPartCode(Params inParams) {
//		return  assetService.getPartCodeList(inParams);
//	}
	
	@RequestMapping("/listAssetStoreCode") 
	public DataTable listAssetStoreCode(Params inParams) {
		return  assetService.getStoreCodeList(inParams);
	}
	
	@RequestMapping("/addAssetManagerPopup")
	public String addAssetManagerPopup() {
		LOG.debug("addAssetManagerPopup");
		return "asset/asset_managerModify";
	}
	
	@RequestMapping("/viewAssetManagerPopup")
	public String viewAssetManagerPopup() {
		LOG.debug("viewAssetManagerPopup");
		return "asset/asset_managerView";
	}
	
	/**
	 * 
	 * [설명] 자산등록
	 * 
	 * @Author "최 판 석"
	 * @Date 2017. 11. 14.
	 */
	@RequestMapping("/saveAssetManager")
	public Params saveAssetManager(Params inParams){
		LOG.debug("AssetController saveAssetManager()");
		return assetService.saveAssetManager(inParams);
	}
	
	@RequestMapping("/saveAssetSerial")
	public Params saveAssetSerial(Params inParams){
		LOG.debug("AssetController saveAssetSerial()");
		return assetService.saveAssetSerial(inParams);
	}
	
	@RequestMapping("/updateAssetManager")
	public Params updateAssetManager(Params inParams){
		LOG.debug("AssetController updateAssetManager()");
		return assetService.updateAssetManager(inParams);
	}
	
	@RequestMapping("/getAssetManagerInfo")
	public Params getAssetManagerInfo(Params inParams){
		LOG.debug("AssetController getAssetManagerInfo()");
		
		return assetService.getAssetManagerInfo(inParams);
	}
	
	@RequestMapping("/deleteAssetManager")
	public Params deleteAssetManager(Params inParams){
		LOG.debug("AssetController deleteAssetManager()");
		return assetService.deleteAssetManager(inParams);
	}
	
	@RequestMapping("/getAseetManagerHistoryList")
	public Params listAssetManagerHistory(Params inParams){
		return assetService.getAseetManagerHistoryList(inParams);
	}
	
	@RequestMapping("/saveAssetManagerHistory")
	public Params saveAssetManagerHistory(Params inParams){
		LOG.debug("AssetController saveAssetManagerHistory()");
		return assetService.saveAssetManagerHistory(inParams);
	}
	
	/**
	 * [설명] 제품분류 검색
	 * 
	 * @Author "Kim Seon Ho"
	 * @Date 2017. 11. 14
	*/
	@RequestMapping("/listPrdTypeLv1")
	public Params listPrdTypeLv1(Params inParams){
		LOG.debug("AssetController listPrdTypeLv1()");
		return assetService.getPrdTypeListLv1(inParams);
	}
	/**
	 * [설명] 제품군 검색
	 * 
	 * @Author "Kim Seon Ho"
	 * @Date 2017. 11. 14
	 */
	@RequestMapping("/listPrdTypeLv2")
	public Params listPrdTypeLv2(Params inParams){
		LOG.debug("AssetController listPrdTypeLv2()");
		return assetService.getPrdTypeListLv2(inParams);
	}
	/**
	 * [설명] 제조사 검색
	 * 
	 * @Author "Kim Seon Ho"
	 * @Date 2017. 11. 14
	 */
	@RequestMapping("/listPrdTypeLv3")
	public Params listPrdTypeLv3(Params inParams){
		LOG.debug("AssetController listPrdTypeLv3()");
		return assetService.getPrdTypeListLv3(inParams);
	}
	/**
	 * [설명] 모델명 검색
	 * 
	 * @Author "Kim Seon Ho"
	 * @Date 2017. 11. 14
	 */
	@RequestMapping("/listPrdTypeNm")
	public Params listPrdTypeNm(Params inParams){
		LOG.debug("AssetController listPrdTypeNm()");
		return assetService.listPrdTypeNm(inParams);
	}
	
	/**
	 * 자산 엑셀 업로드 Data 확인
	 * 1. 엑셀파일 유효성 검사(필수값 null 체크)
	 * 2. 해당점포의 자산 중 해당파트너사 자산이 있을때 ERROR RETURN
	 * 3. 중복 시리얼 CHECK
	 */
	@RequestMapping("/uploadExcelAstData")
	public Params uploadExcelAstDataCheck(HttpSession session, MultipartHttpServletRequest request, Params inParams) throws Exception{
		LOG.debug("AssetController uploadExcelAstDataCheck()");
		return assetService.uploadExcelAstDataCheck(session, request, inParams);
	}
	
    @RequestMapping("/assetManagerModelCountPop")
    public String assetManagerModelCountPop(){
        return "asset/asset_managerModelPopup";
    }

    @RequestMapping("/listAssetManagerModelCountPop")
    public Params listAssetManagerModelCountPop(Params inParams){
        return assetService.listAssetManagerModelCountPop(inParams);
    }    

    @RequestMapping("/assetManagerPrdCountPop")
    public String assetManagerPrdCountPop(){
        return "asset/asset_managerPrdPopup";
    }

    @RequestMapping("/listAssetManagerPrdCountPop")
    public Params listAssetManagerPrdCountPop(Params inParams){
        return assetService.listAssetManagerPrdCountPop(inParams);
    }  
    
    @RequestMapping("/listAssetViewAssetHstSt")
    public DataTable listAssetViewAssetHstSt(Params inParams){
        return assetService.listAssetViewAssetHstSt(inParams);
    }    
    
    @RequestMapping("/listAssetViewAssetOpsSt")
    public Params listAssetViewAssetOpsSt(Params inParams){
        return assetService.listAssetViewAssetOpsSt(inParams);
    }  
    
    
    @RequestMapping("/listAssetViewpPreventiveCheck")
    public Params listAssetViewpPreventiveCheck(Params inParams){
        return assetService.listAssetViewpPreventiveCheck(inParams);
    }  
    
	@RequestMapping("/excelUploadTempDownload")
	public void excelUploadTempDownload(HttpSession session, HttpServletResponse response, HttpServletRequest request) throws Exception {
		ApplicationContext appContext = new FileSystemXmlApplicationContext();
		Resource resource = appContext.getResource(Config.getString("excelTempLoc.assetUploadTempDown")); // excelTempLoc.preventiveCheck
		  String fileName = "ExcelUploadAssetTemplete.xlsx";
		  String filePath = resource.getFile().getAbsolutePath();
		  LOG.debug(filePath);
		  File file = new File(filePath);

		  String userAgent = request.getHeader("User-Agent");
		  boolean ie = userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("rv:11") > -1;
		   
		  if (ie) {
		   fileName = URLEncoder.encode(file.getName(), "utf-8");
		  } else {
		   fileName = new String(file.getName().getBytes("utf-8"),"iso-8859-1");
		  }
		  
		  response.setContentType("application/octet-stream");
		  response.setHeader("Content-Disposition","attachment;filename=\"" +fileName+"\";");
		  
		  FileInputStream fis=new FileInputStream(file);
		  BufferedInputStream bis=new BufferedInputStream(fis);
		  ServletOutputStream so=response.getOutputStream();
		  BufferedOutputStream bos=new BufferedOutputStream(so);
		  
		  try{
			  byte[] data=new byte[2048];
			  int input=0;
			  while((input=bis.read(data))!=-1){
				   bos.write(data,0,input);
				   bos.flush();
			  }
		  }catch(Exception e){
			  
		  }finally{
			  if(bos!=null) bos.close();
			  if(bis!=null) bis.close();
			  if(so!=null) so.close();
			  if(fis!=null) fis.close();
		  }
		
	}

}
