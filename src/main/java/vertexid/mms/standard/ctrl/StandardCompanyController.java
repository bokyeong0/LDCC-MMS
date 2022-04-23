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
import vertexid.mms.standard.svce.StandardCompanyService;

/**
 * [설명]
 *
 * @class StandardCompanyController.java
 * @package vertexid.mms.standard.ctrl
 * @author 한성진
 * @version 1.0
 */
@Controller
@RequestMapping("/ctrl/standard/company")
public class StandardCompanyController {
	
	private static final Log LOG = LogFactory.getLog(StandardCompanyController.class);
	
	@Autowired
	private StandardCompanyService standardCompanyService;  
	
	/**
	 * [설명] 
	 * 
	 * @Author 한성진
	 * @Date 2017. 3. 16.
	*/
	@RequestMapping
	public String standardCompanyPageMove(){
		LOG.debug("StandardCompanyController standardCompanyPageMove()");
		
		return "standard/standard_company";
	}
	
	
	/**
	 * 회사 목록 조회 
	 * 
	 * @Author 한성진
	 * @Date 2017. 3. 16.
	*/
	@RequestMapping("/listCompany")
	public Params listCompany(final Params inParams){
		LOG.debug("StandardCompanyController listCompany()");
		
		return standardCompanyService.getCompanyList(inParams);
	}
	
	
	/**
	 * 회사 저장 팝업 이동
	 * 
	 * @Author "Han Seong Jin"
	 * @Date 2017. 5. 8.
	*/
	@RequestMapping("/saveCompanyPopup")
	public String templateCompanySaveModalInner(){
		LOG.debug("StandardCompanyController templateCompanySaveModalInner()");
		
		return "standard/standard_companySavePop";
	}
	
	/**
	 * 회사 저장
	 * 
	 * @Author Han Seong Jin
	 * @Date 2017. 5. 8.
	*/
	@RequestMapping("/saveCompany")
	public Params saveStndCompany(Params inParams){
		LOG.debug("StandardCompanyController saveStndCompany()");
		
		return standardCompanyService.saveCompany(inParams);
	}
	
	
	@RequestMapping("/modifyCompanyPopup")
	public String templateCompanyModifyModalInner(){
		LOG.debug("StandardCompanyController templateCompanyModifyModalInner()");
		
		return "standard/standard_companyModifyPop";
	}
	
	@RequestMapping("/companyInfo")
	public Params getCompanyInfo(Params inParams){
		LOG.debug("StandardCompanyController getCompanyInfo()");
		
		return standardCompanyService.getCompanyInfo(inParams);
	}
	
	@RequestMapping("/viewCompanyPop")
	public String templateCompanyViewModalInner(){
		LOG.debug("StandardCompanyController templateCompanySaveModalInner()");
		
		return "standard/standard_companyViewPop";
	}
	
	@RequestMapping("/updateCompany")
	public Params updateCompany(Params inParams){
		LOG.debug("StandardCompanyController updateCompany()");

		return standardCompanyService.updateCompany(inParams);
	}
	
	@RequestMapping("/deleteCompany")
	public Params deleteCompany(Params inParams){
		LOG.debug("StandardCompanyController deleteCompany()");
		
		return standardCompanyService.deleteCompany(inParams);
	}
	
//	@RequestMapping("/listCompName")
//	public Params listCompName(Params inParams){
//		LOG.debug("StandardCompanyController listCompany()");
//		
//		return standardCompanyService.getCompNameList(inParams);
//	}
	
	@RequestMapping("/listMaCompName")
	public Params listMaCompName(Params inParams){
		LOG.debug("StandardCompanyController listMaCompName()");
		
		return standardCompanyService.getMaCompNameList(inParams);
	}
	
	@RequestMapping("/listBrandName")
	public Params listBrandName(Params inParams){
		LOG.debug("StandardCompanyController listBrandName()");
		
		return standardCompanyService.getBrandNameList(inParams);
	}

	@RequestMapping("/listMaBrandName")
	public Params listMaBrandName(Params inParams){
		LOG.debug("StandardCompanyController listMaBrandName()");
		
		return standardCompanyService.getMaBrandNameList(inParams);
	}
	
	@RequestMapping("/listStrName")
	public Params listStrName(Params inParams){
		LOG.debug("StandardCompanyController listStrName()");
		
		return standardCompanyService.getStrNameList(inParams);
	}
	/**
	 * 
	 * [설명] 브랜드명으로 브랜드코드 조회
	 * 
	 * @Author "Kim Seon Ho"
	 * @Date 2017. 11. 8.
	 */
	@RequestMapping("/getBrndCd")
	public Params getBrndCd(Params inParams){
		LOG.debug("StandardCompanyController getBrndCd()");
		
		return standardCompanyService.getBrndCd(inParams);
	}	
	@RequestMapping("/getCompCate")
	public Params getCompCate(Params inParams){
		LOG.debug("StandardCompanyController getCompCate()");
		
		return standardCompanyService.getCompCate(inParams);
	}
	
	@RequestMapping("/checkManagerCodeCompany")
	public Params checkManagerCodeCompany(Params inParams){
		LOG.debug("StandardCompanyController checkManagerCodeCompany()");
		
		return standardCompanyService.checkManagerCodeCompany(inParams);
	}
	
	@RequestMapping("/listAutoComp")
	public Params listAutoComp(Params inParams){
		LOG.debug("StandardStoreController listAutoStr");
		return standardCompanyService.getAutoCompList(inParams);
	}

	@RequestMapping("/listAstComp")
	public Params listAstComp(Params inParams){
		return standardCompanyService.getAstCompList(inParams);
	}	
	
	
	@RequestMapping("/updateCompFile")
	public Params updateCompFile(Params inParams){
		LOG.debug("StandardCompanyController updateCompFile : " + inParams);
		
		return standardCompanyService.updateCompFile(inParams); 
	}
}
