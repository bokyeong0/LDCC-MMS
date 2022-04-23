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
 * "Kim Seon Ho"         	2017. 12. 13. 			First Draft.
 */
package vertexid.mms.standard.ctrl;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import paragon.core.paramaters.Params;
import paragon.core.paramaters.datatable.DataTable;
import vertexid.mms.standard.svce.StandardRepresentativeItemService;

/**
 * [설명]
 *
 * @class StandardRepresentativeItemController.java
 * @package vertexid.mms.standard.ctrl
 * @author "Kim Seon Ho"
 * @version 1.0
 */
@Controller
@RequestMapping("/ctrl/standard/representativeItem")
public class StandardRepresentativeItemController {

	private static final Log LOG = LogFactory.getLog(StandardRepresentativeItemController.class);
	
	@Autowired
	private StandardRepresentativeItemService standardRepresentativeItemService;
	
	@RequestMapping
	public String repreItemPageMove(){
		LOG.debug("StandardRepresentativeItemController repreItemPageMove()");
		return "standard/standard_representativeItem";
	}

	@RequestMapping("/listStndPrdTypeLv1")
	public DataTable listStndPrdTypeLv1(Params inParams){
		LOG.debug("StandardRepresentativeItemController listStndPrdTypeLv1()");
		return standardRepresentativeItemService.listStndPrdTypeLv1(inParams);
	}	

	@RequestMapping("/listStndPrdTypeLv2")
	public DataTable listStndPrdTypeLv2(Params inParams){
		LOG.debug("StandardRepresentativeItemController listStndPrdTypeLv2()");
		return standardRepresentativeItemService.listStndPrdTypeLv2(inParams);
	}	
	
	@RequestMapping("/listStndPrdNm")
	public Params listStndPrdNm(Params inParams){
		LOG.debug("StandardRepresentativeItemController listStndPrdNm()");
		return standardRepresentativeItemService.listStndPrdNm(inParams);
	}	
	
	@RequestMapping("/getAspCompanyList")
	public DataTable getAspCompanyList(Params inParams){
		LOG.debug("StandardRepresentativeItemController getAspCompanyList()");
		return standardRepresentativeItemService.getAspCompanyList(inParams);
	}
	
	@RequestMapping("/getCompanyList")
	public DataTable getCompanyList(Params inParams){
		LOG.debug("StandardRepresentativeItemController getCompanyList()");
		return standardRepresentativeItemService.getCompanyList(inParams);
	}

	@RequestMapping("/getBrandInfo")
	public DataTable getBrandInfo(Params inParams){
		LOG.debug("StandardRepresentativeItemController getBrandInfo()");
		return standardRepresentativeItemService.getBrandInfo(inParams);
	}
	
	@RequestMapping("/getStoreInfo")
	public DataTable getStoreInfo(Params inParams){
		LOG.debug("StandardRepresentativeItemController getStoreInfo()");
		return standardRepresentativeItemService.getStoreInfo(inParams);
	}
	
	@RequestMapping("/insertStoreAndMaStartDt")
	public Params insertStoreAndMaStartDt(Params inParams){
		LOG.debug("StandardRepresentativeItemController insertStoreAndMaStartDt()");
		return standardRepresentativeItemService.insertStoreAndMaStartDt(inParams);
	}
	
	@RequestMapping("/listPartnerPrdLvGrid")
	public Params listPartnerPrdLvGrid(Params inParams){
		LOG.debug("StandardRepresentativeItemController listPartnerPrdLvGrid()");
		return standardRepresentativeItemService.listPartnerPrdLvGrid(inParams);
	}
	
	@RequestMapping("/updatePartnerPrdLvGrid")
	public Params updatePartnerPrdLvGrid(Params inParams){
		LOG.debug("StandardRepresentativeItemController updatePartnerPrdLvGrid()");
		return standardRepresentativeItemService.updatePartnerPrdLvGrid(inParams);
	}
	
}
