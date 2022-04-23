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
 * MINE 한성진			2017. 3. 14. 			First Draft.
 */
package vertexid.mms.standard.ctrl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import paragon.core.paramaters.Params;
import paragon.core.paramaters.ParamsFactory;
import paragon.core.paramaters.datatable.DataTable;
import vertexid.mms.standard.svce.StandardProductService;
import vertexid.paragon.comm.util.CommExcel;

/**
 * [설명]
 *
 * @class StandardProductController.java
 * @package vertexid.mms.standard.ctrl
 * @author 한성진
 * @version 1.0
 */
@Controller
@RequestMapping("/ctrl/standard/product")
public class StandardProductController {
	
	private static final Log LOG = LogFactory.getLog(StandardProductController.class);
	
	@Autowired
	private StandardProductService standardProductService;  
	
	/**
	 * [설명] 
	 * 
	 * @Author 한성진
	 * @Date 2017. 3. 16.
	*/
	@RequestMapping
	public String standardPrdPageMove(){
		LOG.debug("StandardProductController stamdardPrdPageMove()");
		
		return "standard/standard_product";
	}
	
	/**
	 * [설명] 
	 * 
	 * @Author 한성진
	 * @Date 2017. 3. 16.
	*/
	@RequestMapping("/listStndPrd")
	public Params listStndPrd(Params inParams){
		LOG.debug("StandardProductController listStndPrd()");
		
		return standardProductService.getStndPrdList(inParams);
	}
	
	@RequestMapping("/listProduct")
	public Params listProduct(Params inParams){
		LOG.debug("StandardProductController listProduct()");
		
		return standardProductService.getProductList(inParams);
	}
	
	
	@RequestMapping("/saveProductPop")
	public String standardSavePrdPageMove(){
		LOG.debug("StandardProductController standardSavePrdPageMove()");
		
		return "standard/standard_productSavePop";
	}
	
	@RequestMapping("/checkProductCd")
	public Params checkProductCd(Params inParams){
		LOG.debug("StandardProductController checkPrdCd()");
		
		return standardProductService.checkProductCd(inParams);
	}
	
	@RequestMapping("/saveProduct")
	public Params saveProduct(Params inParams){
		LOG.debug("StandardCompanyController saveProduct()");
		
		return standardProductService.saveProduct(inParams);
	}
	
	@RequestMapping("/modifyProductPop")
	public String standardModifyPrdPageMove(){
		LOG.debug("StandardProductController standardModifyPrdPageMove()");
		
		return "standard/standard_productModifyPop";
	}
	
	@RequestMapping("/viewProductPop")
	public String standardViewPrdPageMove(){
		LOG.debug("StandardProductController standardModifyPrdPageMove()");
		
		return "standard/standard_productViewPop";
	}
	
	@RequestMapping("/getProductInfo")
	public Params getProductInfo(Params inParams){
		LOG.debug("StandardCompanyController getProductInfo()");
		
		return standardProductService.getProductInfo(inParams);
	}
	
	@RequestMapping("/updateProduct")
	public Params updateProduct(Params inParams){
		LOG.debug("StandardCompanyController updateProduct()");
		
		return standardProductService.updateProduct(inParams);
	}
	@RequestMapping("/deleteProduct")
	public Params deleteProduct(Params inParams){
		LOG.debug("StandardCompanyController deleteProduct()");
		
		return standardProductService.deleteProduct(inParams);
	}
	
	@RequestMapping("/listStndPat")
	public Params listStndPat(Params inParams){
		
		return standardProductService.getStndPatList(inParams);
	}
	
	@RequestMapping("/savePart") 
	public Params savePart(Params inParams){
		return standardProductService.savePart(inParams);
	}
	@RequestMapping("/listAutoPrdInBrnd") 
	public Params getAutoPrdInBrndList(Params inParams){
		return standardProductService.getAutoPrdInBrndList(inParams);
	}
	@RequestMapping("/listAutoPrd") 
	public Params listAutoPrd(Params inParams){
		return standardProductService.getAutoPrdList(inParams);
	}
	
//	@RequestMapping("/listPrdPatComboJson") 
//	public Params listPrdPatComboJson(Params inParams){
//		Params out = standardProductService.getPrdComboJsonList(inParams);
//		return out;
//	}
	/**
	 * 제품(장비) 콤보박스조회
	 * 
	 * @Author Kim Jin Ho
	 * @Date 2017. 5. 10.
	*/
	@RequestMapping("/listPrdComoJson") 
	public DataTable listPrdComoJson(Params inParams){
		return standardProductService.getPrdComboList(inParams);
	}
	
	/**
	 * 파트 콤보박스 조회
	 * @Author Kim Jin Ho
	 * @Date 2017. 5. 10.
	*/
	@RequestMapping("/listPatComoJson") 
	public DataTable listPatComoJson(Params inParams){
		return standardProductService.getPatComboList(inParams);
	}
	
	@RequestMapping("/listAllPrdNmComboJson") 
	public Params getAllPrdNmComboList(Params inParams){
		return standardProductService.getAllPrdNmComboList(inParams);
	}
	
	
	@RequestMapping("/pageTotalExcelDown") 
	public void pageTotalExcelDown(HttpServletRequest request, HttpServletResponse response, Params inParams){
		LOG.debug("EXCEL DOWNLOAD START");
		Params outParams = ParamsFactory.createOutParams(inParams);
		outParams = standardProductService.pageTotalExcelDown(inParams);
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd HHmm");
		Date date = new Date();
		String dateStr = sdf.format(date);
		
		String sheetNm = "Excel_품목관리_"+dateStr;
		List<String> columnIds = new ArrayList<String>();
		columnIds.add("PRD_CD");		
		columnIds.add("PRD_TYPE_LV1_NM");
		columnIds.add("PRD_TYPE_LV2_NM");
		columnIds.add("PRD_TYPE_LV3_NM");
		columnIds.add("PRD_NM");
		columnIds.add("PRD_SPEC");
		
		List<String> columnNms = new ArrayList<String>();
		columnNms.add("PRD_CD");		
		columnNms.add("제품범주");
		columnNms.add("제품군");
		columnNms.add("제조사");
		columnNms.add("모델명");
		columnNms.add("SPEC");
		
		outParams.setParam("sheetNm", sheetNm);
		outParams.setParam("excelColunmNms", columnNms);
		outParams.setParam("excelColunmIds", columnIds);
		outParams.setParam("encoding", "UTF-8");
	
		CommExcel ce = new CommExcel();
		try{
			ce.download(response, request, outParams);
		}catch(Exception e){
			LOG.debug("EXCEL DOWNLOAD ERROR");
			outParams.setParam("SERVER_ERROR", "서버오류입니다. 관리자에게 문의하세요");
		}
		LOG.debug("EXCEL DOWNLOAD END");
	}
	
}
