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
 * "Han Seong Jin"         	2017. 2. 27. 			First Draft.
 */
package vertexid.mms.asp.ctrl;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import paragon.core.paramaters.Params;
import paragon.core.paramaters.datatable.DataTable;
import vertexid.mms.asp.svce.AspCompanyService;

/**
 * [설명]
 *
 * @class AspCompanyController.java
 * @package vertexid.paragon.settings.ctrl
 * @author "Han Seong Jin"
 * @version 1.0
 */

@Controller
@RequestMapping("/ctrl/asp/company")
public class AspCompanyController {
	
	private static final Log LOG = LogFactory.getLog(AspCompanyController.class);
	
	@Autowired
	private AspCompanyService aspCompanyService;  
	
	@RequestMapping
	public String AspCompanyPageMove(){
		LOG.debug("AspCompanyController AspCompanyPageMove()");
		
		return "asp/asp_company";
	}
	@RequestMapping("/saveAspPop")
	public String AspSavePopupPageMove(){
		LOG.debug("AspCompanyController AspSavePopupPageMove()");
		
		return "asp/asp_companySavePop";
	}
	@RequestMapping("/viewAspPop")
	public String AspDetailPopupPageMove(){
		LOG.debug("AspCompanyController AspDetailPopupPageMove()");
		
		return "asp/asp_companyViewPop";
	}
	
	@RequestMapping("/listAspCompany")
	public Params listAspCompany(Params inParams){
		LOG.debug("AspCompanyController listAspCompany()");
		
		return aspCompanyService.getAspCompanyList(inParams);
	}
	
	@RequestMapping("/listAspCompName")
	public Params listAspCompName(Params inParams){
		LOG.debug("AspCompanyController listAspCompName()");
		
		return aspCompanyService.getAspCompNameList(inParams);
	}
	
	@RequestMapping("/listMaAspCompName")
	public Params listMaAspCompName(Params inParams){
		LOG.debug("AspCompanyController listMaAspCompName()");
		
		return aspCompanyService.getMaAspCompNameList(inParams);
	}
	
	@RequestMapping("/checkAspCompCd")
	public Params checkAspCompCd(Params inParams){
		LOG.debug("AspCompanyController saveAspCompany()");
		
		return aspCompanyService.getCheckAspCompCd(inParams);
	}
	
	@RequestMapping("/saveAspCompany")
	public Params saveAspCompany(Params inParams){
		LOG.debug("AspCompanyController saveAspCompany()");
		
		return aspCompanyService.saveAspCompany(inParams);
	}
	
	@RequestMapping("/getAspCompInfo")
	public Params getAspCompInfo(Params inParams){
		LOG.debug("AspCompanyController saveAspCompany()");
		
		return aspCompanyService.getAspCompInfo(inParams);
	}
	
	@RequestMapping("/deleteAspCompany")
	public Params deleteAspCompany(Params inParams){
		LOG.debug("AspCompanyController deleteAspCompany()");
		
		return aspCompanyService.deleteAspCompany(inParams);
	}
	
	@RequestMapping("/listAspCompanyComboJson")
	public DataTable listAspCompanyComboJson(){
		LOG.debug("AspCompanyController listAspCompanyComboJson()");
		
		return aspCompanyService.getAspCompanyComboList();
	}
}
