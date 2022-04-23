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
package vertexid.mms.contract.ctrl;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import paragon.core.paramaters.Params;
import vertexid.mms.contract.svce.ContractManagementService;

/**
 * [설명]
 *
 * @class AspCompanyController.java
 * @package vertexid.paragon.settings.ctrl
 * @author "Han Seong Jin"
 * @version 1.0
 */

/**
 * [설명]
 *
 * @class ContractManagementController.java
 * @package vertexid.mms.contract.ctrl
 * @author "Han Seong Jin"
 * @version 1.0
 */
@Controller
@RequestMapping("/ctrl/contract/mng")
public class ContractManagementController {
	
	private static final Log LOG = LogFactory.getLog(ContractManagementController.class);
	
	@Autowired
	private ContractManagementService contractManagementService;  
	
	/**
	 * [설명] 
	 * 
	 * @Author "Han Seong Jin"
	 * @Date 2017. 12. 11.
	*/
	@RequestMapping
	public String ContractMngPageMove(){
		LOG.debug("ContractManagementController ContractMngPageMove()");
		
		return "contract/contract_management";
	}
	
	@RequestMapping("/asset")
	public String ContractMngAssetPageMove(){
		LOG.debug("ContractManagementController ContractMngAssetPageMove()");
		
		return "contract/contract_management_asset";
	}
	
	/**
	 * [설명] 
	 * 
	 * @Author "Han Seong Jin"
	 * @Date 2017. 12. 19.
	*/
	@RequestMapping("/viewAstPop")
	public String ContractMngViewAstPopPageMove(){
		LOG.debug("ContractManagementController ContractMngPageMove()");
		
		return "contract/contract_management_viewAstPop";
	}
	
	/**
	 * [설명] 
	 * 
	 * @Author "Han Seong Jin"
	 * @Date 2017. 12. 22.
	*/
	@RequestMapping("/prdPop")
	public String ContractMngPrdPopPageMove(){
		LOG.debug("ContractManagementController ContractMngPrdPopPageMove()");
		
		return "contract/contract_management_prdPop";
	}
	
	/**
	 * [설명] 
	 * 
	 * @Author "Han Seong Jin"
	 * @Date 2018. 1. 2.
	*/
	@RequestMapping("/storePop")
	public String ContractMngStorePopPageMove(){
		LOG.debug("ContractManagementController ContractMngPrdPopPageMove()");
		
		return "contract/contract_management_storePop";
	}
	
	/**
	 * [설명] 
	 * 
	 * @Author "Han Seong Jin"
	 * @Date 2017. 12. 11.
	*/
	@RequestMapping("/listContractMng")
	public Params listContractMng(Params inParams){
		LOG.debug("ContractManagementController listContractMng()");
		
		return contractManagementService.getContractMngList(inParams);
	}
	
	/**
	 * [설명] 
	 * 
	 * @Author "Han Seong Jin"
	 * @Date 2018. 1. 8.
	*/
	@RequestMapping("/listAsset")
	public Params listAsset(Params inParams){
		LOG.debug("ContractManagementController listAsset()");
		
		return contractManagementService.getAssetList(inParams);
	}
	
	@RequestMapping("/listConId")
	public Params listConId(Params inParams){
		LOG.debug("ContractManagementController listConId()");
		
		return contractManagementService.getConIdList(inParams);
	}
	@RequestMapping("/listChangeConId")
	public Params listChangeConId(Params inParams){
		LOG.debug("ContractManagementController listChangeConId()");
		
		return contractManagementService.getChangeConIdList(inParams);
	}
	
	/**
	 * [설명] 
	 * 
	 * @Author "Han Seong Jin"
	 * @Date 2017. 12. 28.
	*/
	@RequestMapping("/saveContract")
	public Params saveContract(Params inParams){
		LOG.debug("ContractManagementController saveContract()");
		
		return contractManagementService.saveContract(inParams);
	}
	
	/**
	 * [설명] 
	 * 
	 * @Author "Han Seong Jin"
	 * @Date 2018. 1. 8.
	*/
	@RequestMapping("/saveChangeContract")
	public Params saveChangeContract(Params inParams){
		LOG.debug("ContractManagementController saveChangeContract()");
		
		return contractManagementService.saveChangeContract(inParams);
	}
	
	/**
	 * [설명] 
	 * 
	 * @Author "Han Seong Jin"
	 * @Date 2017. 12. 28.
	*/
	@RequestMapping("/saveAssetMaYn")
	public Params saveAssetMaYn(Params inParams){
		LOG.debug("ContractManagementController saveAssetMaYn()");
		
		return contractManagementService.saveAssetMaYn(inParams);
	}
	
	/**
	 * [설명] 
	 * 
	 * @Author "Han Seong Jin"
	 * @Date 2017. 12. 28.
	*/
	@RequestMapping("/saveContractConfirm")
	public Params saveContractConfirm(Params inParams){
		LOG.debug("ContractManagementController saveContractConfirm()");
		
		return contractManagementService.saveContractConfirm(inParams);
	}
	
	/**
	 * [설명] 
	 * 
	 * @Author "Han Seong Jin"
	 * @Date 2017. 12. 18.
	*/
	@RequestMapping("/viewPop")
	public String ContractMngViewPopPageMove(){
		LOG.debug("ContractManagementController ContractMngPageMove()");
		
		return "contract/contract_management_viewPop";
	}
	
	/**
	 * [설명] 
	 * 
	 * @Author "Han Seong Jin"
	 * @Date 2017. 12. 21.
	*/
	@RequestMapping("/listContractDetail")
	public Params listContractDetail(Params inParams){
		LOG.debug("ContractManagementController listContractDetail()");
		
		return contractManagementService.getContractDetailList(inParams);
	}
	/**
	 * [설명] 
	 * 
	 * @Author "Han Seong Jin"
	 * @Date 2017. 12. 18.
	*/
	@RequestMapping("/listContractAsset")
	public Params listContractAsset(Params inParams){
		LOG.debug("ContractManagementController listContractMng()");
		
		return contractManagementService.getContractAstList(inParams);
	}
	
	@RequestMapping("/listStoreAsset")
	public Params listStoreAsset(Params inParams){
		LOG.debug("ContractManagementController listStoreAsset()");
		
		return contractManagementService.getStoreAstList(inParams);
	}
	
	/**
	 * [설명] 
	 * 
	 * @Author "Han Seong Jin"
	 * @Date 2017. 12. 18.
	 */
	@RequestMapping("/listStore")
	public Params listStore(Params inParams){
		LOG.debug("ContractManagementController listStore()");
		
		return contractManagementService.getStoreList(inParams);
	}
}
