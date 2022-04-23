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
package vertexid.mms.contract.svce;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Service;

import paragon.core.exception.ParagonException;
import paragon.core.mvc.stereotype.ParagonService;
import paragon.core.paramaters.CommParams;
import paragon.core.paramaters.Params;
import paragon.core.paramaters.ParamsFactory;
import paragon.core.paramaters.datatable.DataTable;
import paragon.core.paramaters.datatable.datarow.DataRow;

/**
 * [설명]
 *
 * @class AspCompanyService.java
 * @package vertexid.paragon.settings.svce
 * @author "Han Seong Jin"
 * @version 1.0
 */

@Service
public class ContractManagementService extends ParagonService {
	
	private static final Log LOG = LogFactory.getLog(ContractManagementService.class);
	
	/**
	 * [설명] 
	 * 
	 * @Author "Han Seong Jin"
	 * @Date 2017. 12. 11.
	*/
	public Params getContractMngList(Params inParams) {
		LOG.debug("ContractManagementService getContractMngList()");
		return getSqlManager().selectGridParams("ContractManagementService.getContractMngList",inParams);
	}
	
	/**
	 * [설명] 
	 * 
	 * @Author "Han Seong Jin"
	 * @Date 2018. 1. 8.
	*/
	public Params getAssetList(Params inParams) {
		LOG.debug("ContractManagementService getAssetList()");
		return getSqlManager().selectGridParams("ContractManagementService.getAssetList",inParams);
	}
	
	/**
	 * [설명] 
	 * 
	 * @Author "Han Seong Jin"
	 * @Date 2018. 1. 8.
	*/
	public Params getConIdList(Params inParams) {
		LOG.debug("ContractManagementService getConIdList()");
		return getSqlManager().selectGridParams("ContractManagementService.getConIdList",inParams);
	}
	
	/**
	 * [설명] 
	 * 
	 * @Author "Han Seong Jin"
	 * @Date 2018. 1. 8.
	*/
	public Params getChangeConIdList(Params inParams) {
		LOG.debug("ContractManagementService getChangeConIdList()");
		return getSqlManager().selectGridParams("ContractManagementService.getChangeConIdList",inParams);
	}
	
	/**
	 * [설명] 
	 * 
	 * @Author "Han Seong Jin"
	 * @Date 2018. 1. 2.
	*/
	public Params getStoreList(Params inParams) {
		LOG.debug("ContractManagementService getStoreList()");
		
		return getSqlManager().selectGridParams("ContractManagementService.getStoreList",inParams);
	}
	
	/**
	 * [설명] 
	 * 
	 * @Author "Han Seong Jin"
	 * @Date 2017. 12. 21.
	*/
	public Params getContractDetailList(Params inParams) {
		LOG.debug("ContractManagementService getContractDetailList()");
		return getSqlManager().selectGridParams("ContractManagementService.getContractDetailList",inParams);
	}
	
	
	/**
	 * [설명] 
	 * 
	 * @Author "Han Seong Jin"
	 * @Date 2017. 12. 18.
	*/
	public Params getContractAstList(Params inParams) {
		LOG.debug("ContractManagementService getContractMngList()" + inParams);
		return getSqlManager().selectGridParams("ContractManagementService.getContractAstList",inParams);
	}
	
	public Params getStoreAstList(Params inParams) {
		LOG.debug("ContractManagementService getStoreAstList()");
		return getSqlManager().selectGridParams("ContractManagementService.getStoreAstList",inParams);
	}
	
	/**
	 * [설명] 
	 * 
	 * @Author "Han Seong Jin"
	 * @Date 2017. 12. 28.
	*/
	public Params saveContract(Params inParams) {
		LOG.debug("ContractManagementService saveContractProduct()");
		Params outParams = ParamsFactory.convertParmas(inParams);
		String modFlag = inParams.getString("modFlag");
		Params assetParams = new CommParams();
		
		if(modFlag.equals("PRODUCT")){
			assetParams = getSqlManager().selectGridParams("ContractManagementService.getContractAstList",inParams);
		}else{
			assetParams = getSqlManager().selectGridParams("ContractManagementService.getStoreList",inParams);
		}
		DataTable assetDt = assetParams.getDataTable("dt_grid");
		int posItemCnt = assetDt.getCount();
		inParams.setDataTable("dt_posItem", assetDt);
		outParams.setParam("posItemCnt", posItemCnt);
		LOG.debug("assetDt                 "+  assetDt);
		
		//TempData 삭제 후 Insert
		getSqlManager().delete("ContractManagementService.deleteMapTemp", inParams);
		if(posItemCnt != 0){
			getSqlManager().insert("ContractManagementService.insertMapTemp",inParams);
		}
		getSqlManager().update("ContractManagementService.updatePosItemCnt", outParams);
		
		
		return outParams;
	}
	
//	public Params saveContract(Params inParams) {
//		LOG.debug("ContractManagementService saveContractProduct()");
//		Params outParams = ParamsFactory.convertParmas(inParams);
//		int posItemCnt = inParams.getInteger("gridCount");
//		outParams.setParam("posItemCnt", posItemCnt);
//		
//		
//		if(posItemCnt != 0){
//			
//			//TempData 삭제 후 Insert
//			getSqlManager().delete("ContractManagementService.deleteMapTemp", inParams);
//			getSqlManager().insert("ContractManagementService.insertMapTemp",inParams);
//		}
//		
//		getSqlManager().update("ContractManagementService.updatePosItemCnt", outParams);
//		
//		return outParams;
//	}
	
	/**
	 * [설명] 
	 * 
	 * @Author "Han Seong Jin"
	 * @Date 2018. 1. 8.
	*/
	public Params saveChangeContract(Params inParams) {
		LOG.debug("ContractManagementService saveChangeContract() " + inParams);
		Params outParams = ParamsFactory.convertParmas(inParams);
		
		int cnt = 0;
		
		cnt = getSqlManager().update("ContractManagementService.saveChangeContract", inParams);
		
		if(cnt < 1){
			new ParagonException("MSG_COM_ERR_072");
		}
		
		outParams.setParam("cnt", cnt);
		
		return outParams;
	}
	
	/**
	 * [설명] 
	 * 
	 * @Author "Han Seong Jin"
	 * @Date 2017. 12. 28.
	*/
	public Params saveAssetMaYn(Params inParams) {
		LOG.debug("ContractManagementService saveAssetMaYn()");
		Params outParams = ParamsFactory.convertParmas(inParams);
		
		int cnt=0;
		for(DataRow dr: inParams.getDataTable("dt_asset")){
			String modFlag = dr.getString("modFlag");
			
			if(modFlag.equals("UPDATE")){
				cnt +=  getSqlManager().update("ContractManagementService.updateAssetMaYn",dr);
			}
		}
		
		if(cnt < 1){
			new ParagonException("MSG_COM_ERR_072");
		}
		outParams.setParam("cnt", cnt);
		
		return outParams;
	}
	
	/**
	 * [설명] 
	 * 
	 * @Author "Han Seong Jin"
	 * @Date 2017. 12. 28.
	*/
	public Params saveContractConfirm(Params inParams) {
		LOG.debug("ContractManagementService saveContractConfirm()");
		Params outParams = ParamsFactory.convertParmas(inParams);
		String posCfmYn = inParams.getString("posCfmYn");
		Params webserviceParams = ParamsFactory.convertParmas(inParams);
		webserviceParams.setParam("wsNm", "posInfo");
		webserviceParams.setParam("opNm", "confirmContract");
		String pk = ""+System.currentTimeMillis();
		int cnt=0;
		int idx=0;
		for(DataRow dr: inParams.getDataTable("dt_contract")){
			dr.setParam("posCfmYn", posCfmYn);
			webserviceParams.setParam("wsDt", pk+String.format("%05d", idx++));
			if(posCfmYn.equals("Y")){
				String jsonString = "{\"con_year\":\""+dr.getParam("conYear")
				+"\", \"div_id\":\""+dr.getParam("compCd")
				+"\", \"con_id\":\""+dr.getParam("conId")
				+"\", \"mtn_item_id\":\""+dr.getParam("mtnItemId")
				+"\", \"det_item_id\":\""+dr.getParam("detItemId")
				+"\", \"pos_cfm_yn\":\""+posCfmYn
				+"\", \"pos_item_cnt\":\""+dr.getParam("posItemCnt")+"\"}";
				webserviceParams.setParam("jsonData", jsonString);
				getSqlManager().insert("ContractManagementService.insertWebServiceBatch", webserviceParams);
			}
			cnt += getSqlManager().update("ContractManagementService.updateContractConfirm",dr);
			
			getSqlManager().delete("ContractManagementService.deleteMapInfo", dr);
			getSqlManager().insert("ContractManagementService.insertMapInfo", dr);
//			getSqlManager().insert("ContractManagementService.insertMapInfoLog", dr);
		}
		
		if(cnt < 1){
			new ParagonException("MSG_COM_ERR_072");
		}
		
		outParams.setParam("cnt", cnt);
		
		return outParams;
	}
}
