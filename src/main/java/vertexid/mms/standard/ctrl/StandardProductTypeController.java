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

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import paragon.core.paramaters.Params;
import vertexid.mms.standard.svce.StandardProductTypeService;

/**
 * [설명]
 *
 * @class StandardProductController.java
 * @package vertexid.mms.standard.ctrl
 * @author 한성진
 * @version 1.0
 */
@Controller
@RequestMapping("/ctrl/standard/product/type")
public class StandardProductTypeController {
	
	private static final Log LOG = LogFactory.getLog(StandardProductTypeController.class);
	
	@Autowired
	private StandardProductTypeService standardProductTypeService;  
	
	/**
	 * [설명] 
	 * 
	 * @Author 한성진
	 * @Date 2017. 3. 16.
	*/
	@RequestMapping
	public String standardPrdPageMove(){
		LOG.debug("StandardProductController stamdardPrdPageMove()");
		
		return "standard/standard_product_type";
	}
	
	/**
	 * [설명] 
	 * 
	 * @Author 한성진
	 * @Date 2017. 3. 16.
	*/
	@RequestMapping("/listStndPrdTypeLv1")
	public Params listStndPrdTypeLv1(Params inParams){
		LOG.debug("StandardProductController listStndPrdTypeLv1()");
		
		return standardProductTypeService.getStndPrdTypeListLv1(inParams);
	}
	/**
	 * [설명] 
	 * 
	 * @Author 한성진
	 * @Date 2017. 3. 16.
	 */
	@RequestMapping("/listStndPrdTypeLv2")
	public Params listStndPrdTypeLv2(Params inParams){
		LOG.debug("StandardProductController listStndPrdTypeLv2()");
		
		return standardProductTypeService.getStndPrdTypeListLv2(inParams);
	}
	/**
	 * [설명] 
	 * 
	 * @Author 한성진
	 * @Date 2017. 3. 16.
	 */
	@RequestMapping("/listStndPrdTypeLv3")
	public Params listStndPrdTypeLv3(Params inParams){
		LOG.debug("StandardProductController listStndPrdTypeLv3()");
		
		return standardProductTypeService.getStndPrdTypeListLv3(inParams);
	}
	
	@RequestMapping("/listStndPrdTypeLv4")
	public Params listStndPrdTypeLv4(Params inParams){
		LOG.debug("StandardProductController listStndPrdTypeLv4()");
		
		return standardProductTypeService.getStndPrdTypeListLv4(inParams);
	}
	
	@RequestMapping("/saveProductType")
	public Params saveProduct(Params inParams){
		LOG.debug("StandardCompanyController saveStndCompany()");
		
		return standardProductTypeService.saveProductType(inParams);
	}
	
	/**
	 * [설명] 
	 * 
	 * @Author "Han Seong Jin"
	 * @Date 2017. 12. 8.
	*/
	@RequestMapping("/listPrdComboJson") 
	public Params listPrdComoJson(Params inParams){
		return standardProductTypeService.getPrdComboList(inParams);
	}
	
	/**
	 * [설명] 
	 * 
	 * @Author "Han Seong Jin"
	 * @Date 2017. 12. 8.
	 */
	@RequestMapping("/listMfrComboJson") 
	public Params listMfrComoJson(Params inParams){
		return standardProductTypeService.getMfrComboList(inParams);
	}
////	@RequestMapping("/listStndPrdTypeLv4")
////	public Params listStndPrdTypeLv4(Params inParams){
////		LOG.debug("StandardProductController listStndPrdTypeLv3()");
////		
////		return standardProductTypeService.getStndPrdTypeListLv4(inParams);
////	}
//	
//	
//	@RequestMapping("/saveProductPop")
//	public String standardSavePrdPageMove(){
//		LOG.debug("StandardProductController standardSavePrdPageMove()");
//		
//		return "standard/standard_productSavePop";
//	}
	
//	@RequestMapping("/checkProductCd")
//	public Params checkProductCd(Params inParams){
//		LOG.debug("StandardProductController checkPrdCd()");
//		
//		return standardProductTypeService.checkProductCd(inParams);
//	}
//	
	
//	@RequestMapping("/modifyProductPop")
//	public String standardModifyPrdPageMove(){
//		LOG.debug("StandardProductController standardModifyPrdPageMove()");
//		
//		return "standard/standard_productModifyPop";
//	}
//	
//	@RequestMapping("/viewProductPop")
//	public String standardViewPrdPageMove(){
//		LOG.debug("StandardProductController standardModifyPrdPageMove()");
//		
//		return "standard/standard_productViewPop";
//	}
	
//	@RequestMapping("/getProductInfo")
//	public Params getProductInfo(Params inParams){
//		LOG.debug("StandardCompanyController getProductInfo()");
//		
//		return standardProductTypeService.getProductInfo(inParams);
//	}
//	
//	@RequestMapping("/updateProduct")
//	public Params updateProduct(Params inParams){
//		LOG.debug("StandardCompanyController updateProduct()");
//		
//		return standardProductTypeService.updateProduct(inParams);
//	}
//	@RequestMapping("/deleteProduct")
//	public Params deleteProduct(Params inParams){
//		LOG.debug("StandardCompanyController deleteProduct()");
//		
//		return standardProductTypeService.deleteProduct(inParams);
//	}
//	
//	@RequestMapping("/listAutoPrd") 
//	public Params listAutoPrd(Params inParams){
//		return standardProductTypeService.getAutoPrdList(inParams);
//	}
//	
	
}
