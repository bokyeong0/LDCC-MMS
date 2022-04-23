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
 * 한성진				2017. 3. 14. 		First Draft.
 */
package vertexid.mms.standard.svce;


import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Service;

import paragon.core.exception.ParagonException;
import paragon.core.mvc.stereotype.ParagonService;
import paragon.core.paramaters.Params;
import paragon.core.paramaters.ParamsFactory;
import paragon.core.paramaters.datatable.DataTable;
import paragon.core.paramaters.datatable.datarow.DataRow;

/**
 * [설명]
 *
 * @class StandardProductService.java
 * @package vertexid.mms.standard.svce
 * @author 한성진
 * @version 1.0
 */
@Service
public class StandardProductService extends ParagonService {
	
	private static final Log LOG = LogFactory.getLog(StandardProductService.class);
	
	
	/**
	 * [설명] 
	 * 
	 * @Author 한성진
	 * @Date 2017. 3. 16.
	*/
	public Params getStndPrdList(Params inParams) {
		LOG.debug("StandardProductService getStndPrdList()");
		return getSqlManager().selectGridParams("StandardProductService.getStndPrdList",inParams);
	}
	
	public Params getProductList(Params inParams) {
		LOG.debug("StandardProductService getStndPrdList()");
		return getSqlManager().selectGridParams("StandardProductService.getProductList",inParams);
	}
	
	public Params saveProduct(Params inParams) {
		LOG.debug("StandardProductService saveProduct()"+ inParams);
		Params outParams = ParamsFactory.createOutParams(inParams);
		
		String prdTypeLv1 = inParams.getString("prdTypeLv1");
		String prdTypeLv2 = inParams.getString("prdTypeLv2");
		String prdTypeLv3 = inParams.getString("prdTypeLv3");
		
		//장비 등록
		int cnt = 0;
		for(DataRow dr: inParams.getDataTable("dt_product")){
			String modFlag = dr.getString("modFlag");
			
			dr.setParam("prdTypeLv1", prdTypeLv1);
			dr.setParam("prdTypeLv2", prdTypeLv2);
			dr.setParam("prdTypeLv3", prdTypeLv3);
			
			if(modFlag.equals("INSERT")){
				dr.setParam("prdTypeLv3Nm", inParams.getString("prdTypeLv3Nm"));
				cnt +=  getSqlManager().insert("StandardProductService.insertProduct",dr);
			}else if(modFlag.equals("UPDATE")){
				cnt +=  getSqlManager().update("StandardProductService.updateProduct",dr);
			}else if(modFlag.equals("DELETE")){
				cnt +=  getSqlManager().delete("StandardProductService.deleteProduct",dr);
			}
		}
		outParams.setMsgCd("MSG_COM_SUC_007", new Object[]{cnt});
		
		return outParams;
	}
	
	public Params checkProductCd(Params inParams) {
		LOG.debug("StandardProductService checkProductCd()");
		
		return getSqlManager().selectOneParams("StandardProductService.checkProductCd",inParams); 
	}
	
	public Params getProductInfo(Params inParams) {
		LOG.debug("StandardProductService getProductInfo()");
		
		return getSqlManager().selectOneParams("StandardProductService.getProductInfo",inParams);
	}
	public Params updateProduct(Params inParams) {
		LOG.debug("StandardProductService updateProduct()");
		
		Params outParams = ParamsFactory.createOutParams(inParams);
		//장비 업데이트
		int cnt = getSqlManager().update("StandardProductService.updateProduct",inParams);
		
		if ( cnt == 0) {
			new ParagonException("MSG_COM_ERR_015");
		} 
		
		return outParams;
	}
	
	public Params deleteProduct(Params inParams) {
		LOG.debug("StandardProductService deleteProduct()");
		
		
//		getSqlManager().delete("StandardProductService.deletePart",inParams);
		
//		return inParams;
		
		
		Params outParams = ParamsFactory.createOutParams(inParams);
		//장비 삭제
		int cnt = getSqlManager().update("StandardProductService.deleteProduct",inParams);
		
		if ( cnt < 1) {
			outParams.setMsgCd("MSG_COM_ERR_072");
			outParams.setStsCd(200);
		} else {
			outParams.setMsgCd("MSG_COM_SUC_006");
			outParams.setStsCd(100);
		}
		
		return outParams; 
		
	}
	
	public Params getStndPatList(Params inParams) {
		LOG.debug("StandardProductService getStndPrdList()");
		return getSqlManager().selectGridParams("StandardProductService.getPartList",inParams);
	}
	
	public Params savePart(Params inParams){
		LOG.debug("StandardProductService savePart : " +inParams);		
		Params outParams = ParamsFactory.createOutParams(inParams);
		int cnt = 0;
		for(DataRow dr: inParams.getDataTable("dt_part")){
			String modFlag = dr.getString("modFlag");
//			LOG.debug("dr :::::::::" + dr);
			dr.setParam("s_userId", inParams.getParam("s_userId"));
			dr.setParam("aspCompCd", inParams.getParam("s_companyCd"));
//			dr.setParam("prdCd", inParams.getParam("prdCd"));
			if(modFlag.equals("INSERT")){
				cnt +=  getSqlManager().insert("StandardProductService.insertPart",dr);
			}else if(modFlag.equals("UPDATE")){
				cnt +=  getSqlManager().update("StandardProductService.updatePart",dr);
			}else if(modFlag.equals("DELETE")){
				cnt +=  getSqlManager().delete("StandardProductService.deletePart",dr);
			}
		}
		outParams.setMsgCd("MSG_COM_SUC_007", new Object[]{cnt});
		return outParams;
	}

	/**
	 * [설명] 
	 * 
	 * @Author Kim Jin Ho
	 * @Date 2017. 5. 2.
	*/
	public Params getAutoPrdList(Params inParams) {
		LOG.debug("StandardProductService getAutoPrdList : " +inParams);		
		return getSqlManager().selectParams("suggestions","StandardProductService.getAutoPrdList",inParams);
	}

	/**
	 * 제품(장비) 콤보박스조회
	 * 
	 * @Author Kim Jin Ho
	 * @Date 2017. 5. 10.
	*/
	public DataTable getPrdComboList(Params inParams) {
		LOG.debug("StandardProductService getPrdComboList : " +inParams);		
		return getSqlManager().selectDataTable("StandardProductService.getPrdComboList",inParams);
	}

	/**
	 * 파트 콤보박스 조회
	 * 
	 * @Author Kim Jin Ho
	 * @Date 2017. 5. 10.
	*/
	public DataTable getPatComboList(Params inParams) {
		LOG.debug("StandardProductService getPatComboList : " +inParams);		
		return getSqlManager().selectDataTable("StandardProductService.getPatComboList",inParams);
	}
	
	/**
	 * [설명] 모든 제품명 검색
	 * 
	 * @Author "Kim Seon Ho"
	 * @Date 2017. 11. 16.
	 * 
	*/
	public Params getAllPrdNmComboList(Params inParams) {
		LOG.debug("StandardProductService getAllPrdNmComboList : " +inParams);
		return getSqlManager().selectGridParams("StandardProductService.getAllPrdNmComboList",inParams);
	}
	
	/**
	 * [설명] 자산 내 세션_파트너사 의 품목 검색
	 * 
	 * @Author "Kim Seon Ho"
	 * @Date 2017. 11. 22.
	 * 
	*/
	public Params getAutoPrdInBrndList(Params inParams) {
		LOG.debug("getAutoPrdInBrndList getAutoPrdList : " +inParams);		
		return getSqlManager().selectParams("suggestions","StandardProductService.getAutoPrdInBrndList",inParams);
	}
	
	/**
	 * [설명] 품목 전체 데이터 엑셀 다운로드
	 * 
	 * @Author "Kim Seon Ho"
	 * @Date 2018. 01. 30.
	 * 
	*/
	public Params pageTotalExcelDown(Params inParams) {
		LOG.debug("getAutoPrdInBrndList pageTotalExcelDown : " + inParams);
		return getSqlManager().selectParams("StandardProductService.pageTotalExcelDown", inParams);
	}
	
	
}
