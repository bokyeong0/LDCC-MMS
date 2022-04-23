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
import vertexid.mms.standard.svce.StandardStoreService;

/**
 * [설명]
 *
 * @class StandardStoreController.java
 * @package vertexid.mms.standard.ctrl
 * @author 한성진
 * @version 1.0
 */
@Controller
@RequestMapping("/ctrl/standard/store")
public class StandardStoreController {
	
	private static final Log LOG = LogFactory.getLog(StandardStoreController.class);
	
	@Autowired
	private StandardStoreService standardStoreService;  
	
	/**
	 * [설명] 
	 * 
	 * @Author 한성진
	 * @Date 2017. 3. 16.
	*/
	@RequestMapping
	public String standardStrPageMove(){
		LOG.debug("StandardStoreController standardStrPageMove()");
		
		return "standard/standard_store";
	}
	
	
	/**
	 * [설명] 
	 * 
	 * @Author 한성진
	 * @Date 2017. 3. 16.
	*/
	@RequestMapping("/listStndStr")
	public Params listStndStr(Params inParams){
		
		return standardStoreService.getStndStrList(inParams);
	}
	@RequestMapping("/listRcptStndStr")
	public Params listRcptStndStr(Params inParams){
		
		return standardStoreService.getStndRcptStrList(inParams);
	}
	@RequestMapping("/listRcptStndStrMap")
	public Params listRcptStndStrMap(Params inParams){
		LOG.debug("listRcptStndStrMap:::::::::::");
		
		return standardStoreService.getStndRcptStrMapList(inParams);
	}
	@RequestMapping("/listStndStrLoc")
	public Params listStndStrLoc(Params inParams){
		
		return standardStoreService.getStndStrLocList(inParams);
	}
	
	@RequestMapping("/saveStorePopup")
	public String templateStoreSaveModalInner(){
		LOG.debug("StandardStoreController templateStoreSaveModalInner()");
		
		return "standard/standard_storeSavePop";
	}

	@RequestMapping("/modifyStorePopup")
	public String templateStoreModifyModalInner(){
		LOG.debug("StandardCompanyController templateStoreSaveModalInner()");
		
		return "standard/standard_storeModifyPop";
	}
	
	@RequestMapping("/storeInfo")
	public Params storeInfo(Params inParams){
		
		return standardStoreService.getStoreInfo(inParams);
	}
	
	@RequestMapping("/updateStore")
	public Params updateStore(Params inParams){
		LOG.debug("StandardStoreController updateStore()");
		
		return standardStoreService.updateStore(inParams);
	}
	@RequestMapping("/deleteStore")
	public Params deleteStore(Params inParams){
		LOG.debug("StandardStoreController deleteStore()");
		
		return standardStoreService.deleteStore(inParams);
	}
	
	@RequestMapping("/listAreaName")
	public Params listAreaName(Params inParams){
		LOG.debug("StandardStoreController listAreaName()");
		
		return standardStoreService.getAreaNameList(inParams);
	}
	
	@RequestMapping("/viewStorePop")
	public String templateStoreViewModalInner(){
		LOG.debug("StandardStoreController templateStoreViewModalInner()");
		
		return "standard/standard_storeViewPop";
	}
	@RequestMapping("/listAutoStr")
	public Params listAutoStr(Params inParams){
		LOG.debug("StandardStoreController listAutoStr");
		return standardStoreService.getAutoStrList(inParams);
	}
	@RequestMapping("/listCallStr")
	public Params listCallStr(Params inParams){
		LOG.debug("StandardStoreController listCallStr");
		return standardStoreService.getCallStrList(inParams);
	}
	@RequestMapping("/listAutoStrInAsset")
	public Params listAutoStrInAsset(Params inParams){
		LOG.debug("StandardStoreController listAutoStrInAsset");
		return standardStoreService.getlistAutoStrInAssetList(inParams);
	}
	
	@RequestMapping("/listAutoStrNm")
	public Params listAutoStrNm(Params inParams){
		LOG.debug("StandardStoreController listAutoStrNm");
		return standardStoreService.getAutoStrNmList(inParams);
	}
	
	@RequestMapping("/updateStoreLoc")
	public Params updateStoreLoc(Params inParams){
		LOG.debug("StandardStoreController updateStore()");
		return standardStoreService.updateStoreLoc(inParams);
	}
	
	@RequestMapping("/commAreaPop")
	public String templateAreaPopModalInner(){
		LOG.debug("StandardStoreController templateAreaPopModalInner()");
		
		return "standard/standard_storeSavePop";
	}
}
