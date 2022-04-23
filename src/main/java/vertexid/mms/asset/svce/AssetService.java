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
 * "Kim Jin Ho"         	2017. 4. 18. 			First Draft.
 */
package vertexid.mms.asset.svce;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import paragon.core.mvc.stereotype.ParagonService;
import paragon.core.paramaters.CommParams;
import paragon.core.paramaters.Params;
import paragon.core.paramaters.ParamsFactory;
import paragon.core.paramaters.datatable.CommDataTable;
import paragon.core.paramaters.datatable.DataTable;
import paragon.core.paramaters.datatable.datarow.CommDataRow;
import paragon.core.paramaters.datatable.datarow.DataRow;
import vertexid.paragon.comm.ctrl.CommonController;
import vertexid.paragon.comm.util.excelForm.ExcelAssetUpload;

/**
 * [설명]
 *
 * @class AssetService.java
 * @package vertexid.mms.asset.svce
 * @author "Kim Jin Ho"
 * @version 1.0
 */

@Service
public class AssetService extends ParagonService {

	private static final Log LOG = LogFactory.getLog(AssetService.class);

	@Autowired
	CommonController cc;
	
	public Params getAseetManagerList(Params inParams) {
		LOG.debug("getAseetManagerList : "+inParams);
		inParams.setParam("pragonAutoCounting", false);
		return getSqlManager().selectGridParams("AssetService.getAssetManagerList",inParams);
	}
	
	public Params getAssetSearchList(Params inParams) {
		LOG.debug("getAssetSearchList : "+inParams);
		inParams.setParam("pragonAutoCounting", false);
		return getSqlManager().selectGridParams("AssetService.getAssetSearchList",inParams);
	}
	
	
	public DataTable getStrCodeComboList(Params inParams) {
		LOG.debug("getStrCodeComboList : "+inParams);
		return getSqlManager().selectDataTable("AssetService.getCodeGroupComboList",inParams);
	}
	
	public DataTable getAreaCodeList(Params inParams) {
		LOG.debug("getAreaCodeList : "+inParams);
		return getSqlManager().selectDataTable("AssetService.getAreaCodeList",inParams);
	}
	
	public DataTable getStoreCodeList(Params inParams) {
		LOG.debug("getStoreCodeList : "+inParams);
		return getSqlManager().selectDataTable("AssetService.getStoreCodeList",inParams);
	}
	
	/**
	 * 
	 * [설명] 자산등록
	 * 
	 * @Author "최 판 석"
	 * @Date 2017. 11. 14.
	 */
	public Params saveAssetManager(Params inParams) {
		LOG.debug("AssetService saveAssetManager()" + inParams);
		Params outParams = ParamsFactory.createOutParams(inParams);
		
		int cnt = getSqlManager().insert("AssetService.insertAssetManager", inParams); //자산등록
		if ( cnt < 1) {
			outParams.setMsgCd("MSG_COM_ERR_015");
			outParams.setStsCd(200);
		} else {
			outParams.setMsgCd("MSG_COM_SUC_003");
			outParams.setStsCd(100);

		}
		return outParams; 
	}
	
	public Params saveAssetSerial(Params inParams) {
		LOG.debug("AssetService saveAssetSerial()" + inParams);
		Params outParams = ParamsFactory.createOutParams(inParams);
		outParams = getSqlManager().selectOneParams("AssetService.getSerialCheck", inParams);
		int cnt = 0;
		String modFlag = inParams.getString("modFlag");
		if(outParams.getInteger("cnt") == 1){
			outParams.setMsgCd("MSG_COM_VAL_056");
			outParams.setStsCd(300);
			LOG.debug(outParams);
			LOG.debug(outParams.getStsCd());
			return outParams;
		}else if(modFlag.equals("UPDATE")){
			cnt = getSqlManager().update("AssetService.updateAssetSerial", inParams);
		}else if(modFlag.equals("INSERT")){
			cnt = getSqlManager().insert("AssetService.insertAssetSerial", inParams); 
		}
		
		if (cnt < 1 && outParams.getStsCd() != "") {
			outParams.setMsgCd("MSG_COM_ERR_015");
			outParams.setStsCd(200);
		} else {
			outParams.setMsgCd("MSG_COM_SUC_003");
			outParams.setStsCd(100);
		}
		return outParams; 
	}

	public Params updateAssetManager(Params inParams) {
		LOG.debug("AssetService updateAssetManager() : " + inParams);
		Params outParams = ParamsFactory.createOutParams(inParams);
		int cnt = getSqlManager().update("AssetService.updateAssetManager", inParams);

		if ( cnt < 1) {
			outParams.setMsgCd("MSG_COM_ERR_015");
			outParams.setStsCd(200);
		} else {
			outParams.setMsgCd("MSG_COM_SUC_003");
			outParams.setStsCd(100);
		}
		
		return outParams; 
	}
	
	public Params getAssetManagerInfo(Params inParams) {
		LOG.debug("AssetService getAssetManagerInfo()" + inParams);
		return getSqlManager().selectParams("AssetService.getAssetManagerInfo", inParams);
	}
	
	
	public Params getAseetManagerHistoryList(Params inParams) {
		LOG.debug("AssetService getAseetManagerHistoryList : "+inParams);
		return getSqlManager().selectGridParams("AssetService.getAseetManagerHistoryList",inParams);
	}
	
	
	public Params deleteAssetManager(Params inParams) {
		LOG.debug("AssetService deleteAssetManager()");
		Params outParams = ParamsFactory.createOutParams(inParams);
		int cnt = getSqlManager().insert("AssetService.deleteAssetManager", inParams);
		
		if ( cnt < 1) {
			outParams.setMsgCd("MSG_COM_ERR_072");
			outParams.setStsCd(200);
		} else {
			outParams.setMsgCd("MSG_COM_SUC_006");
			outParams.setStsCd(100);
		}
		return outParams; 
	}
	
	public Params saveAssetManagerHistory(Params inParams) {
		LOG.debug("AssetService saveAssetManagerHistory()"+inParams);
		Params outParams = ParamsFactory.createOutParams(inParams);
		int cnt = 0;
		
		for(DataRow dr: inParams.getDataTable("dt_data")){
			String modFlag = dr.getString("modFlag");
			
			dr.setParam("s_userId", inParams.getParam("s_userId"));
			dr.setParam("aspCompCd", inParams.getParam("aspCompCd"));
			dr.setParam("strCd", inParams.getParam("strCd"));
			dr.setParam("prdCd", inParams.getParam("prdCd"));
			dr.setParam("serialNo", inParams.getParam("serialNo"));
			dr.setParam("astSeq", inParams.getParam("astSeq"));
			
			if (modFlag.equals("INSERT")) {
				cnt += getSqlManager().insert("AssetService.insertAssetManagerModifyHistory", dr);
			} else if (modFlag.equals("UPDATE")) {
				cnt += getSqlManager().update("AssetService.updateAssetManagerHistory", dr);
			} else if (modFlag.equals("DELETE")) {
				cnt += getSqlManager().update("AssetService.deleteAssetManagerHistory", dr);
			}
		}
		
		outParams.setMsgCd("MSG_COM_SUC_007", new Object[]{cnt});
		return outParams;
	}


	public Params getAstHstList(Params inParams) {
		return getSqlManager().selectGridParams("AssetService.getAstHstList",inParams);
	}
	
	/**
	 * [설명] 제품분류 검색
	 * 
	 * @Author "Kim Seon Ho"
	 * @Date 2017. 11. 14
	*/
	public Params getPrdTypeListLv1(Params inParams) {
		LOG.debug("AssetService getPrdTypeListLv1()");
		return getSqlManager().selectGridParams("AssetService.getPrdTypeListLv1",inParams);
	}
	
	/**
	 * [설명] 제품군 검색
	 * 
	 * @Author "Kim Seon Ho"
	 * @Date 2017. 11. 14
	*/
	public Params getPrdTypeListLv2(Params inParams) {
		LOG.debug("AssetService getPrdTypeListLv2()" + inParams);
		return getSqlManager().selectGridParams("AssetService.getPrdTypeListLv2",inParams);
	}
	/**
	 * [설명] 제품군 검색
	 * 
	 * @Author "Kim Seon Ho"
	 * @Date 2017. 11. 14
	*/
	public Params getPrdTypeListLv3(Params inParams) {
		LOG.debug("AssetService getPrdTypeListLv3()" + inParams);
		return getSqlManager().selectGridParams("AssetService.getPrdTypeListLv3",inParams);
	}	
	/**
	 * [설명] 제품군 검색
	 * 
	 * @Author "Kim Seon Ho"
	 * @Date 2017. 11. 14
	*/
	public Params listPrdTypeNm(Params inParams) {
		LOG.debug("AssetService listPrdTypeNm()" + inParams);
		return getSqlManager().selectGridParams("AssetService.listPrdTypeNm",inParams);
	}
	
	/**
	 * 
	 * [설명] 자산 파일업로드 Data Check
	 * 1. 엑셀파일 유효성 검사(필수값 null 체크)
	 * 2. 해당점포의 자산 중 해당파트너사 자산이 있을때 ERROR RETURN
	 * 3. 중복 시리얼 CHECK
	 * 
	 * @Author "Kim Seon Ho"
	 * @Date 2017. 11. 27.
	 */
	public Params uploadExcelAstDataCheck(HttpSession session, MultipartHttpServletRequest request, Params inParams){
		LOG.debug("AssetService uploadExcelAstDataCheck() :: " + inParams);
		List<Map<String, String>> article = new ArrayList<Map<String, String>>(); //엑셀파일 데이터를 담는 변수
		Params outParams = ParamsFactory.createOutParams(inParams);
		ExcelAssetUpload ce = null; //엑셀 업로드 로직 클래스파일
		
		Map<String, Integer> serialMap = new HashMap<String, Integer>();
		
		//DATA READ
		try{
			//엑셀업로드 파일 Data Stream 및 필수값 유효성 검사, 저장
			ce = new ExcelAssetUpload(session, request); //엑셀 업로드 로직 클래스파일
			article = ce.read();
//			LOG.debug(article);
		}catch(NullPointerException e){ //필수입력값이 NULL 일때 alert
			outParams.setParam("NULL_CHECK", "Y");
			outParams.setParam("ROW_INDEX", ce.rowIndex + 1);
			outParams.setParam("CELL_NAME", ce.rowIndex >= 2 ? ce.columnKorNameArray.get(ce.colIndex) : (ce.colIndex + "열") );
			return outParams;
		}
		

		//엑셀파일내 유효성 검사
		LOG.debug("엑셀 데이터 양식체크");
		if(ce.valiCheckList.size() > 0) {
			outParams.setParam("NOT_FOUND_COL_NAME", "Y");
			outParams.setParam("LIST", ce.valiCheckList);
			return outParams;
		}
		
		LOG.debug("엑셀 데이터 중복시리얼 비교");
		List<String> aspCompList = new ArrayList<String>();
		List<String> araeList = new ArrayList<String>();
		List<String> strList = new ArrayList<String>();
		List<String> prdList = new ArrayList<String>();
		//엑셀데이터 중복시리얼 체크
		List<Integer> list = new ArrayList<Integer>();
		for(int i = 0; i < article.size(); i++){
			//유효시리얼
			String check = article.get(i).get("AST_SERIAL");
			if(check != null && check.length() != 0) {//4가 나오지 않음
				if(serialMap.keySet().contains(check)){
//					list.add(serialMap.get(check));
					list.add(i+3);
				}else{
					serialMap.put(check, i+3);
				}
			}
			check = article.get(i).get("ASP_COMP_CD");
			if(check != null && check.length() != 0 && !aspCompList.contains(check)) {
				aspCompList.add(check);
			}
			check = article.get(i).get("AREA_CD");
			if(check != null && check.length() != 0 && !araeList.contains(check)) {
				araeList.add(check);
			}
			check = article.get(i).get("STR_CD");
			if(check != null && check.length() != 0 && !strList.contains(check)) {
				strList.add(check);
			}
			check = article.get(i).get("PRD_CD");
			if(check != null && check.length() != 0 && !prdList.contains(check)) {
				prdList.add(check);
			}
		}
		if(list.size() > 0){
			outParams.setParam("DUP_SERIAL_ARRAY", list);
			outParams.setParam("DUPLICATION_EXCEL_SERIAL", "Y");
			return outParams;
		}
		
		//엑셀데이터와 DB데이터 비교
		LOG.debug("파트너사, 부서, 점포, 품목코드 유효성");
		//유효성 체크
		Params params = new CommParams();
		List<Map<String, String>> mapList = new ArrayList<Map<String, String>>();
		for(String code : aspCompList){
			Map<String, String> map = new HashMap<String, String>();
			map.put("CODE", code);
			mapList.add(map);
		}
		LOG.debug(mapList);
		params.setParam("aspCompList", mapList);
		mapList = new ArrayList<Map<String, String>>();
		for(String code : araeList){
			Map<String, String> map = new HashMap<String, String>();
			map.put("CODE", code);
			mapList.add(map);
		}
		if(mapList.size() == 0) {
			Map<String, String> map = new HashMap<String, String>();
			map.put("CODE", null);
			mapList.add(map);
		}
		LOG.debug(mapList);
		params.setParam("araeList", mapList);
		mapList = new ArrayList<Map<String, String>>();
		for(String code : strList){
			Map<String, String> map = new HashMap<String, String>();
			map.put("CODE", code);
			mapList.add(map);
		}
		LOG.debug(mapList);
		params.setParam("strList", mapList);
		mapList = new ArrayList<Map<String, String>>();
		for(String code : prdList){
			Map<String, String> map = new HashMap<String, String>();
			map.put("CODE", code);
			mapList.add(map);
		}
		LOG.debug(mapList);
		params.setParam("prdList", mapList);
		DataTable dbDt = getSqlManager().selectDataTable("AssetService.validationCode", params);
		if(dbDt != null){
			DataRow dr = dbDt.get(0);
			if(aspCompList.size() != dr.getInteger("ASP_COMP_CNT")){
				Collections.sort(list);
				outParams.setParam("NOT_FOUND_ASP_COMP_CNT", "Y");
				return outParams;
			}
			if(araeList.size() != dr.getInteger("AREA_CNT")){
				Collections.sort(list);
				outParams.setParam("NOT_FOUND_AREA_CNT", "Y");
				return outParams;
			}
			if(strList.size() != dr.getInteger("STR_CNT")){
				Collections.sort(list);
				outParams.setParam("NOT_FOUND_STR_CNT", "Y");
				return outParams;
			}
			if(prdList.size() != dr.getInteger("PRD_CNT")){
				Collections.sort(list);
				outParams.setParam("NOT_FOUND_PRD_CNT", "Y");
				return outParams;
			}
		}
		
		LOG.debug("엑셀 DB 점포 중복자산 비교");
		//중복자산 체크
		dbDt = getSqlManager().selectDataTable("AssetService.uploadExcelDataCompare",inParams);
		for(DataRow dr : dbDt){
			String strCd = dr.getString("STR_CD");
			
			for(int i = 0; i < article.size(); i++){
				String exStrCd = article.get(i).get("STR_CD");
				
				if(strCd == null || exStrCd == null){
				}else if(strCd.equals(exStrCd)){
					outParams.setParam("DUPLICATION_DATA_CHECK", "Y");
					outParams.setParam("STR_CD", article.get(i).get("STR_CD"));
					return outParams;
				}
			}
		}
		
		LOG.debug("엑셀 DB 중복시리얼 비교");
		//중복 시리얼 체크
		List<Map<String, String>> serialList = new ArrayList<Map<String, String>>();
		for(String serial : serialMap.keySet()){
			Map<String, String> map = new HashMap<String, String>();
			map.put("AST_SERIAL", serial);
			serialList.add(map);
		}
		LOG.debug(serialList);
		
		if(serialList.size() > 0) {
			inParams.setParam("dt_list", serialList);
			
			dbDt = getSqlManager().selectDataTable("AssetService.duplicationSerialCheck", inParams);
			if(dbDt != null){
				for(DataRow dr : dbDt){
					list.add(serialMap.get(dr.getString("AST_SERIAL")));
				}
				if(list.size() > 0){
					Collections.sort(list);
					outParams.setParam("DUPLICATION_SERIAL_DATA_CHECK", "Y");
					outParams.setParam("LIST", list);
					return outParams;
				}
			}
		}
		
		//유효성검사 완료한 LIST
		long inc = System.currentTimeMillis();
		for(Map<String, String> map : article){
			String serial = map.get("AST_SERIAL");
			if(serial == null || serial.length() == 0){
				serial = "TEMP" + map.get("ASP_COMP_CD") + map.get("STR_CD") + inc++;
				map.put("AST_SERIAL", serial);
			}
		}
		
		inParams.setParam("dt_list", article);
		getSqlManager().insert("AssetService.insertAssetUploadExcelData", inParams); //자산 DB 입력
		
	return outParams;
	}
	
	/**
	 * 
	 * [설명] 자산 모델별수량 리스트
	 * 
	 * @Author "Kim Seon Ho"
	 * @Date 2017. 11. 27.
	 */
	public Params listAssetManagerModelCountPop(Params inParams) {
		LOG.debug("AssetService listAssetManagerModelCountPop() :: " + inParams);
		Params outParams = ParamsFactory.createOutParams(inParams);
		
		outParams = getSqlManager().selectGridParams("AssetService.listAssetManagerModelCountPop", inParams);
		
		return outParams;
	}	

	/**
	 * 
	 * [설명] 자산 모델별수량 리스트
	 * 
	 * @Author "Kim Seon Ho"
	 * @Date 2018. 01. 25.
	 */
	public Params listAssetManagerPrdCountPop(Params inParams) {
		LOG.debug("AssetService listAssetManagerPrdCountPop() :: " + inParams);
		Params outParams = ParamsFactory.createOutParams(inParams);
		
		outParams = getSqlManager().selectGridParams("AssetService.listAssetManagerPrdCountPop", inParams);
		
		return outParams;
	}	
	
	/**
	 * 
	 * [설명] 자산정보 팝업, 자산이력그리드 자산상태 필터링 리스트
	 * 
	 * @Author "Kim Seon Ho"
	 * @Date 2017. 11. 27.
	 */
	public DataTable listAssetViewAssetHstSt(Params inParams) {
		LOG.debug("AssetService listAssetViewAssetHstSt() :: " + inParams);
		return getSqlManager().selectDataTable("AssetService.listAssetViewAssetHstSt", inParams);
	}	
	
	/**
	 * 
	 * [설명] 자산정보 팝업, 자산장애처리내역
	 * 
	 * @Author "Kim Seon Ho"
	 * @Date 2017. 11. 27.
	 */
	public Params listAssetViewAssetOpsSt(Params inParams) {
		LOG.debug("AssetService listAssetViewAssetOpsSt() :: " + inParams);
		Params outParams = ParamsFactory.createOutParams(inParams);
		
		outParams = getSqlManager().selectGridParams("AssetService.listAssetViewAssetOpsSt", inParams);
		
		return outParams;
	}	

	/**
	 * 
	 * [설명] 자산정보 팝업, 예방점검내역
	 * 
	 * @Author "Kim Seon Ho"
	 * @Date 2018. 01. 23
	 */
	public Params listAssetViewpPreventiveCheck(Params inParams) {
		LOG.debug("AssetService listAssetViewpPreventiveCheck() :: " + inParams);
		Params outParams = ParamsFactory.createOutParams(inParams);
		
		outParams = getSqlManager().selectGridParams("AssetService.listAssetViewpPreventiveCheck", inParams);
		
		return outParams;
	}
	
	
}
