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
public class StandardProductTypeService extends ParagonService {
	
	private static final Log LOG = LogFactory.getLog(StandardProductTypeService.class);
	
	
	/**
	 * [설명] 
	 * 
	 * @Author 한성진
	 * @Date 2017. 3. 16.
	*/
	public Params getStndPrdTypeListLv1(Params inParams) {
		LOG.debug("StandardProductService getStndPrdTypeListLv1()");
		return getSqlManager().selectGridParams("StandardProductTypeService.getStndPrdTypeListLv1",inParams);
	}
	
	
	public Params getStndPrdTypeListLv2(Params inParams) {
		LOG.debug("StandardProductService getStndPrdTypeListLv2()" + inParams);
		return getSqlManager().selectGridParams("StandardProductTypeService.getStndPrdTypeListLv2",inParams);
	}
	
	
	public Params getStndPrdTypeListLv3(Params inParams) {
		LOG.debug("StandardProductService getStndPrdTypeListLv3()");
		return getSqlManager().selectGridParams("StandardProductTypeService.getStndPrdTypeListLv3",inParams);
	}
	
	public Params getStndPrdTypeListLv4(Params inParams) {
		LOG.debug("StandardProductService getStndPrdTypeListLv4()");
		return getSqlManager().selectGridParams("StandardProductTypeService.getStndPrdTypeListLv4",inParams);
	}
	
	public Params saveProductType(Params inParams) {
		LOG.debug("StandardProductTypeService saveProductType()  ");
		
		Params outParams = ParamsFactory.createOutParams(inParams);
		String prdTypePrtCd = inParams.getString("prdTypePrtCd");
		String prdTypeLv = inParams.getString("prdTypeLv");
		//장비 등록
		int cnt = 0;
		for(DataRow dr: inParams.getDataTable("dt_product")){
			String modFlag = dr.getString("modFlag");
			
//			dr.setParam("s_userId", s_userId);
			dr.setParam("prdTypeLv", prdTypeLv);
			dr.setParam("prdTypePrtCd", prdTypePrtCd);
			
			if(modFlag.equals("INSERT")){
				cnt +=  getSqlManager().insert("StandardProductTypeService.insertProductType",dr);
			}else if(modFlag.equals("UPDATE")){
				cnt +=  getSqlManager().update("StandardProductTypeService.updateProductType",dr);
			}else if(modFlag.equals("DELETE")){
				cnt +=  getSqlManager().delete("StandardProductTypeService.deleteProductType",dr);
			}
		}
		outParams.setMsgCd("MSG_COM_SUC_007", new Object[]{cnt});
	
		return outParams; 
	}

	/**
	 * [설명] 
	 * 
	 * @Author "Han Seong Jin"
	 * @Date 2017. 12. 11.
	*/
	public Params getPrdComboList(Params inParams) {
		LOG.debug("StandardProductService getPrdComboList()");
		return getSqlManager().selectGridParams("StandardProductTypeService.getPrdComboList",inParams);
	}
	
	/**
	 * [설명] 
	 * 
	 * @Author "Han Seong Jin"
	 * @Date 2017. 12. 11.
	*/
	public Params getMfrComboList(Params inParams) {
		LOG.debug("StandardProductService getPrdComboList()");
		return getSqlManager().selectGridParams("StandardProductTypeService.getMfrComboList",inParams);
	}
}
