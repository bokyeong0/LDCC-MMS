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
package vertexid.mms.standard.svce;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Service;

import paragon.core.mvc.stereotype.ParagonService;
import paragon.core.paramaters.Params;
import paragon.core.paramaters.ParamsFactory;
import paragon.core.paramaters.datatable.DataTable;
import paragon.core.paramaters.datatable.datarow.DataRow;

/**
 * [설명]
 *
 * @class StandardRepresentativeItemService.java
 * @package vertexid.mms.standard.svce
 * @author "Kim Seon Ho"
 * @version 1.0
 */
@Service
public class StandardRepresentativeItemService extends ParagonService{

	private static final Log LOG = LogFactory.getLog(ParagonService.class);
	
	/**
	 * 
	 * [설명] 파트너사 대표품목 관리, 파트너사 내 제품범주 리스트 조회
	 * 
	 * @Author "Kim Seon Ho"
	 * @Date 2017. 12. 12.
	 */
	public DataTable listStndPrdTypeLv1(Params inParams) {
		LOG.debug("listStndPrdTypeLv1 : "+inParams);
		return getSqlManager().selectDataTable("StandardRepresentativeItemService.listStndPrdTypeLv1", inParams);
	}
	
	/**
	 * 
	 * [설명] 파트너사 대표품목 관리, 파트너사 내 제품범주 내 제품군 리스트 조회
	 * 
	 * @Author "Kim Seon Ho"
	 * @Date 2017. 12. 12.
	 */
	public DataTable listStndPrdTypeLv2(Params inParams) {
		LOG.debug("listStndPrdTypeLv2 : "+inParams);
		return getSqlManager().selectDataTable("StandardRepresentativeItemService.listStndPrdTypeLv2", inParams);
	}
	
	/**
	 * 
	 * [설명] 파트너사 대표품목 관리, 파트너사 내 제품범주 내 제품군 리스트 조회
	 * 
	 * @Author "Kim Seon Ho"
	 * @Date 2017. 12. 12.
	 */
	public Params listStndPrdNm(Params inParams) {
		LOG.debug("listStndPrdNm : "+inParams);
		return getSqlManager().selectGridParams("StandardRepresentativeItemService.listStndPrdNm", inParams);
	}

	/**
	 * 
	 * [설명] 파트너사 대표품목 관리, 파트너사 내 파트너사 리스트 조회
	 * 
	 * @Author "Kim Seon Ho"
	 * @Date 2017. 12. 12.
	 */
	public DataTable getAspCompanyList(Params inParams) {
		LOG.debug("getAspCompanyList : "+inParams);
		return getSqlManager().selectDataTable("StandardRepresentativeItemService.getAspCompanyList", inParams);
	}
	
	/**
	 * 
	 * [설명] 파트너사 대표품목 관리, 파트너사 내 고객사 리스트 조회
	 * 
	 * @Author "Kim Seon Ho"
	 * @Date 2017. 12. 12.
	 */
	public DataTable getCompanyList(Params inParams) {
		LOG.debug("getCompanyList : "+inParams);
		return getSqlManager().selectDataTable("StandardRepresentativeItemService.getCompanyList", inParams);
	}

	/**
	 * 
	 * [설명] 파트너사 대표품목 관리, 파트너사 내 고객사 내 브랜드 리스트 조회
	 * 
	 * @Author "Kim Seon Ho"
	 * @Date 2017. 12. 12.
	 */
	public DataTable getBrandInfo(Params inParams) {
		LOG.debug("getBrandInfo : "+inParams);
		return getSqlManager().selectDataTable("StandardRepresentativeItemService.getBrandInfo", inParams);
	}

	/**
	 * 
	 * [설명] 파트너사 대표품목 관리, 파트너사 내 점포 조회
	 * 
	 * @Author "Kim Seon Ho"
	 * @Date 2017. 12. 12.
	 */
	public DataTable getStoreInfo(Params inParams) {
		LOG.debug("getStoreInfo : "+inParams);
		return getSqlManager().selectDataTable("StandardRepresentativeItemService.getStoreInfo", inParams);
	}
	
	/**
	 * 
	 * [설명] 파트너사 대표품목 관리, 점포 유지보수시작일 계약 추가
	 * 
	 * @Author "Kim Seon Ho"
	 * @Date 2017. 12. 12.
	 */
	public Params insertStoreAndMaStartDt(Params inParams) {
		LOG.debug("insertStoreAndMaStartDt : "+inParams);
		Params outParams = ParamsFactory.createParams(inParams);

		int cnt = 0;
		for(DataRow dr: inParams.getDataTable("dt_data")){
			//Params 내 변수들로 오는 변수들, dt_data 으로 grid를 긁어 가져오는 변수를 한꺼번에 처리하기위해 각 row마다 개별변수들을 넣어줌.
			dr.setVal("aspCompCd", inParams.getStrParam("aspCompCd"));
			dr.setVal("prdTypeCd", inParams.getStrParam("prdTypeCd"));
			
			if(dr.getVal("modFlag").equals("UPDATE")){
				cnt +=  getSqlManager().insert("StandardRepresentativeItemService.insertStoreAndMaStartDt",dr);
			}

		}

		if ( cnt < 1) {
			outParams.setMsgCd("MSG_COM_ERR_015");
			outParams.setStsCd(200);
		} else {
			outParams.setMsgCd("MSG_COM_SUC_003");
			outParams.setStsCd(100);
		}
		
		return outParams;
	}
	
	/**
	 * 
	 * [설명] 파트너사 대표품목 관리, 파트너사 및 제품범주,제품군 관리 그리드
	 * 
	 * @Author "Kim Seon Ho"
	 * @Date 2017. 12. 14.
	 */	
	public Params listPartnerPrdLvGrid(Params inParams) {
	LOG.debug("listPartnerPrdLvGrid : "+inParams);
	return getSqlManager().selectGridParams("StandardRepresentativeItemService.listPartnerPrdLvGrid", inParams);
	}
	
	/**
	 * 
	 * [설명] 파트너사 대표품목 관리, 파트너사 및 제품범주,제품군 추가
	 * 
	 * @Author "Kim Seon Ho"
	 * @Date 2017. 12. 12.
	 */
	public Params updatePartnerPrdLvGrid(Params inParams) {
		LOG.debug("updatePartnerPrdLvGrid : "+inParams);
		Params outParams = ParamsFactory.createParams(inParams);

		int cnt = 0;
		for(DataRow dr: inParams.getDataTable("dt_data")){
			//Params 내 변수들로 오는 변수들, dt_data 으로 grid를 긁어 가져오는 변수를 한꺼번에 처리하기위해 각 row마다 개별변수들을 넣어줌.
			
//			dr.setVal("representSeq", inParams.getStrParam("representSeq"));
//			dr.setVal("aspCompCd", inParams.getStrParam("aspCompCd"));
//			dr.setVal("prdTypeLv2Cd", inParams.getStrParam("prdTypeLv2Cd"));
			
			if(dr.getVal("modFlag").equals("INSERT")){
				cnt +=  getSqlManager().insert("StandardRepresentativeItemService.insertPartnerPrdLvGrid",dr);
			}else if(dr.getVal("modFlag").equals("DELETE")){
				cnt +=  getSqlManager().update("StandardRepresentativeItemService.deletePartnerPrdLvGrid",dr);
			}else if(dr.getVal("modFlag").equals("UPDATE")){
				cnt +=  getSqlManager().update("StandardRepresentativeItemService.updatePartnerPrdLvGrid",dr);
			}

		}

		if ( cnt < 1) {
			outParams.setMsgCd("MSG_COM_ERR_015");
			outParams.setStsCd(200);
		} else {
			outParams.setMsgCd("MSG_COM_SUC_003");
			outParams.setStsCd(100);
		}
		
		return outParams;
	}
	
}
