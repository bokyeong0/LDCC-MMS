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
import paragon.core.paramaters.CommParams;
import paragon.core.paramaters.Params;
import paragon.core.paramaters.ParamsFactory;
import paragon.core.paramaters.datatable.DataTable;
import paragon.core.paramaters.datatable.datarow.DataRow;

/**
 * [설명]
 *
 * @class StandardCompanyService.java
 * @package vertexid.mms.standard.svce
 * @author 한성진
 * @version 1.0
 */
@Service
public class StandardCompanyService extends ParagonService {
	
	private static final Log LOG = LogFactory.getLog(StandardCompanyService.class);
	
	
	/**
	 * [설명] 
	 * 
	 * @Author 한성진
	 * @Date 2017. 3. 16.
	*/
	public Params getCompanyList(Params inParams) {
		LOG.debug("getStndCompanyList : ");
		return getSqlManager().selectGridParams("StandardCompanyService.getCompanyList",inParams);
	}
	
	public Params saveCompany(Params inParams) {
		LOG.debug("CompanyService saveCompany()");
		
		Params outParams = ParamsFactory.createOutParams(inParams);
		int cnt = 0;
		
		//회사 등록
		int checkCnt = getSqlManager().selectInteger("StandardCompanyService.getCompNameCheck",inParams);
		if(checkCnt == 1){
			throw new ParagonException("MSG_COM_VAL_029", "회사명");
		}
		cnt = getSqlManager().insert("StandardCompanyService.insertCompany",inParams);
		
		if ( cnt == 0) {
			new ParagonException("MSG_COM_ERR_015");
		} 
		
		if(inParams.getDataTable("dt_brand").isEmpty() == false){
			for(DataRow dr : inParams.getDataTable("dt_brand")){
				String compCd = inParams.getString("compCd");
				String brndNm = dr.getString("name");
				
				dr.setParam("compCd", compCd);
				dr.setParam("brndNm", brndNm);
				
				//브랜드 등록
				cnt = getSqlManager().insert("StandardCompanyService.insertBrand", dr);
				if ( cnt == 0) {
					new ParagonException("MSG_COM_ERR_015");
				}
			}
		}
		
		inParams.setParam("brndCd", "0000");
		//Site 등록
		cnt = getSqlManager().insert("StandardCompanyService.insertStore",inParams);
		
		if ( cnt == 0) {
			new ParagonException("MSG_COM_ERR_015");
		} 

		outParams.setMsgCd("MSG_COM_SUC_003");
		outParams.setStsCd(100);
		
		return outParams;
	}
	
	public Params getCompanyInfo(Params inParams){
		LOG.debug("CompanyService getCompanyInfo()");
		Params outParams = new CommParams();
		outParams = getSqlManager().selectParams("dt_store","StandardCompanyService.getStoreInfo", inParams);

		DataTable dt = getSqlManager().selectDataTable("StandardCompanyService.getBrandInfo", inParams);
		outParams.setDataTable("dt_brand", dt);

		outParams.setParam("dt_company", getSqlManager().selectDataTable("StandardCompanyService.getCompanyInfo", inParams));
		return outParams;
	}
	
	public Params updateCompany(Params inParams) {
		LOG.debug("StandardCompanyService updateCompany()");
		
		Params outParams = ParamsFactory.createOutParams(inParams);
		String compCd = inParams.getString("compCd");
		int cnt = 0;
		
		//회사 업데이트
		cnt = getSqlManager().update("StandardCompanyService.updateCompany",inParams);

		if ( cnt == 0) {
			new ParagonException("MSG_COM_ERR_015");
		} 
			
		//dt_brand : 수정된 브랜드 Data
		if(inParams.getDataTable("dt_brand").isEmpty() == false){
			for(DataRow dr : inParams.getDataTable("dt_brand")){
				String brndCd = dr.getString("key");
				String flag = dr.getString("modFlag");
				String brndNm = dr.getString("label");
				
				dr.setParam("compCd", compCd);
				dr.setParam("brndNm", brndNm);
				dr.setParam("brndCd", brndCd);
				
				if(flag.equals("UPDATE")){
					//브랜드 수정
					cnt = getSqlManager().update("StandardCompanyService.updateBrand", dr);
					
				}else if(flag.equals("INSERT")){
					//브랜드 등록
					cnt += getSqlManager().insert("StandardCompanyService.insertBrand", dr);
				}
			}
		}
		
		//Site 등록
		cnt = getSqlManager().update("StandardCompanyService.updateStore",inParams);
	
		if ( cnt == 0) {
			new ParagonException("MSG_COM_ERR_015");
		} 
		
		outParams.setMsgCd("MSG_COM_SUC_003");
		outParams.setStsCd(100);
		return outParams;
	}
	
	public Params deleteCompany(Params inParams) {
		LOG.debug("StandardCompanyService deleteCompany()");
		Params outParams = ParamsFactory.createOutParams(inParams);
		
		int cntComp = getSqlManager().update("StandardCompanyService.deleteCompany", inParams);
		getSqlManager().update("StandardCompanyService.deleteBrand", inParams);
		int cntStr = getSqlManager().update("StandardCompanyService.deleteStore", inParams);
		
		if ( cntComp < 1 || cntStr < 1){
			new ParagonException("MSG_COM_ERR_072");
		}
		
		outParams.setMsgCd("MSG_COM_SUC_006");
		outParams.setStsCd(100);
		
		return outParams; 
		
	}
//	public Params getCompNameList(Params inParams) {
//		LOG.debug("getStndCompanyList : ");
//		return getSqlManager().selectParams("StandardCompanyService.getCompNameList", inParams);
//	}
	public Params getMaCompNameList(Params inParams) {
		LOG.debug("getStndCompanyList : ");
		return getSqlManager().selectParams("StandardCompanyService.getMaCompNameList", inParams);
	}
	public Params getBrandNameList(Params inParams) {
		LOG.debug("getStndCompanyList : ");
		return getSqlManager().selectParams("StandardCompanyService.getBrandNameList", inParams);
	}
	public Params getMaBrandNameList(Params inParams) {
		LOG.debug("getStndCompanyList : ");
		return getSqlManager().selectParams("StandardCompanyService.getMaBrandNameList", inParams);
	}
	public Params getStrNameList(Params inParams) {
		LOG.debug("getStndCompanyList : ");
		return getSqlManager().selectParams("StandardCompanyService.getStrNameList", inParams);
	}
	public Params getBrndCd(Params inParams) {
		LOG.debug("getBrndCd : ");
		return getSqlManager().selectParams("StandardCompanyService.getBrndCd", inParams);
	}	
	public Params getCompCate(Params inParams) {
		LOG.debug("getStndCompanyList : ");
		return getSqlManager().selectParams("StandardCompanyService.getCompCate", inParams);
	}
	
	public Params checkManagerCodeCompany(Params inParams) {
		LOG.debug("StandardCompanyService checkManagerCodeCompany()");
		
		int cnt = getSqlManager().selectInteger("StandardCompanyService.checkManagerCodeCompany", inParams);
		inParams.setParam("result", cnt);
		return inParams;
	}

	/**
	 * [설명] 
	 * 
	 * @Author Kim Jin Ho
	 * @Date 2017. 5. 26.
	*/
	public Params getAutoCompList(Params inParams) {
		return getSqlManager().selectParams("suggestions","StandardCompanyService.getAutoCompList",inParams);
	}

	public Params getAstCompList(Params inParams) {
		return getSqlManager().selectParams("suggestions","StandardCompanyService.getAstCompList",inParams);
	}
	
	public Params updateCompFile(Params inParams) {
		LOG.debug("StandardCompanyService updateCompFile()");
		Params outParams = ParamsFactory.createOutParams(inParams);
		int cnt = 0;
		
		//회사 업데이트
		cnt = getSqlManager().update("StandardCompanyService.updateCompFile",inParams);

		if ( cnt == 0) {
			new ParagonException("MSG_COM_ERR_015");
		} 
			
		outParams.setMsgCd("MSG_COM_SUC_003");
		outParams.setStsCd(100);
		return outParams;
	}
}
