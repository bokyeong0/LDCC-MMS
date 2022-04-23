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


import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import paragon.core.mvc.stereotype.ParagonService;
import paragon.core.mvc.stereotype.SqlManager;
import paragon.core.mvc.stereotype.SqlManagerFactory;
import paragon.core.paramaters.CommParams;
import paragon.core.paramaters.Params;
import paragon.core.paramaters.ParamsFactory;
import paragon.core.paramaters.datatable.DataTable;
import paragon.core.paramaters.datatable.datarow.DataRow;
import paragon.core.utility.config.Config;



/**
 * [설명]
 *
 * @class StandardStoreService.java
 * @package vertexid.mms.standard.svce
 * @author 한성진
 * @version 1.0
 */
@Service
public class StandardStoreService extends ParagonService {
	
	private static final Log LOG = LogFactory.getLog(StandardStoreService.class);
	
	
	/**
	 * [설명] 
	 * 
	 * @Author 한성진
	 * @Date 2017. 3. 16.
	*/
	public Params getStndStrList(Params inParams) {
		LOG.debug("getStndStrList : "+inParams);
		return getSqlManager().selectGridParams("StandardStoreService.getListStore",inParams);
		
	}
	
	public Params getStoreInfo(Params inParams) {
		LOG.debug("StandardStoreService getStoreInfo()");
		return getSqlManager().selectParams("dt_store","StandardStoreService.getStoreInfo",inParams);
	}
	
	public Params updateStore(Params inParams) {
		LOG.debug("StandardStoreService updateStore() : "+inParams);
		Params outParams = ParamsFactory.createOutParams(inParams);
		
		int cnt = 0;
		
		DataTable dbDt = getSqlManager().selectDataTable("StandardStoreService.duplicationStoreName", inParams);
		if(dbDt != null && dbDt.getCount() > 0) { 
			outParams.setMsgCd("MSG_COM_ERR_082");
			outParams.setStsCd(200);
			return outParams;
		}
		
		if(inParams.getStrParam("modFlag").equals("INSERT")){
			if(inParams.getString("brndCd") == ""){
				inParams.setParam("brndCd", inParams.getString("compCd")+"0000");
			}
			cnt = getSqlManager().insert("StandardStoreService.insertStore",inParams);
		}else if(inParams.getStrParam("modFlag").equals("UPDATE")){
			cnt = getSqlManager().update("StandardStoreService.updateStore",inParams);
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
	public Params updateStoreLoc(Params inParams) {
		SqlManager sqlManager = SqlManagerFactory.getSqlManager();
		String kakaoApiUrl = Config.getString("kakaoApi.url","https://dapi.kakao.com/v2/local/search/address.json");
		String kakaoApiKey = Config.getString("kakaoApi.restApiKey","KakaoAK 99eb65a56fa09dc65ed0dc90e81cdae8"); //롯데
//		String kakaoApiKey = Config.getString("kakaoApi.restApiKey","KakaoAK dc98a6c60f90db49fd29ec10448bbbe2"); //내부
		OutputStreamWriter out = null;
		BufferedReader in = null;
		URL url = null;
		URLConnection conn = null;
		List<Map<String, Map<String, Object>>> list = null;
		Map<String, Object> roadMap = null;
		try {
			String address = inParams.getString("address"); 
			String query = "query="+URLEncoder.encode(address, "UTF-8");
			String strLat = "";
			String strLng = "";
			
			Params params = new CommParams();
			
			url = new URL(kakaoApiUrl+"?size=1&"+query);
			conn = url.openConnection();
			conn.setRequestProperty("Authorization",kakaoApiKey);
			conn.setDoOutput(true);
			out = new OutputStreamWriter(conn.getOutputStream());
			out.flush();

			StringBuffer rsp = new StringBuffer();
			in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			String line;
			while ((line = in.readLine()) != null) {
				rsp.append(line);
			}
			ObjectMapper mapper = new ObjectMapper();
			Map<String, Object> jsonMap = mapper.readValue(rsp.toString(), new TypeReference<HashMap<String, Object>>(){});
			list = (List<Map<String, Map<String, Object>>>)jsonMap.get("documents");
			if(list.size() == 0){
				return inParams;
			}
			roadMap = list.get(0).get("road_address");
			if(roadMap == null){
				roadMap = list.get(0).get("address");
			}
			if(roadMap.get("y") != null || roadMap.get("x") != null){
				inParams.setParam("strLat", roadMap.get("y").toString().substring(0,15));
				inParams.setParam("strLng", roadMap.get("x").toString().substring(0,15));
				getSqlManager().update("StandardStoreService.updateStoreLoc",inParams);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (in != null)
					in.close();
				if (out != null)
					out.close();
			} catch (IOException e) {
				
			}
		}
		return inParams;
	}
	
	public Params deleteStore(Params inParams) {
		LOG.debug("StandardStoreService deleteStore()");
//		
//		int cnt=0;
//		try{
//			cnt += getSqlManager().delete("StandardStoreService.deleteStore",inParams);
//			inParams.setParam("result", cnt);
//		}catch(Exception e){
//			e.printStackTrace();
//		}
//		return inParams; 

		Params outParams = ParamsFactory.createOutParams(inParams);
		int cnt = getSqlManager().delete("StandardStoreService.deleteStore",inParams);
		
		if ( cnt < 1) {
			outParams.setMsgCd("MSG_COM_ERR_072");
			outParams.setStsCd(200);
		} else {
			outParams.setMsgCd("MSG_COM_SUC_006");
			outParams.setStsCd(100);
		}
		
		return outParams; 
	}
	
	public Params getAreaNameList(Params inParams) {
		LOG.debug("StandardStoreService getAreaNameList()");
		return getSqlManager().selectParams("StandardStoreService.getAreaNameList",inParams);
	}
	public Params getAutoStrList(Params inParams) {
		return getSqlManager().selectParams("suggestions","StandardStoreService.getAutoStrList",inParams);
	}
	/**
	 * [설명] 
	 * 
	 * @Author "Han Seong Jin"
	 * @Date 2018. 1. 15.
	*/
	public Params getAutoStrNmList(Params inParams) {
		return getSqlManager().selectParams("suggestions","StandardStoreService.getAutoStrNmList",inParams);
	}
	/**
	 * [설명] 자산 내 점포검색
	 * 
	 * @Author Kim Seon Ho
	 * @Date 2017. 11. 23.
	 */
	public Params getlistAutoStrInAssetList(Params inParams) {
		
		String[] keyWordArr = null;
		String keyWord = inParams.getStrParam("keyWord").trim().replaceAll("\\s+", " "); 
		//keyWord=롯데}
		if(keyWord.contains(" ")){
			keyWordArr = keyWord.split(" ");
			for( int i = 0; i < keyWordArr.length && i < 3; i ++) {
				inParams.setParam("keyWordArr"+i+"", keyWordArr[i]);
			}
		}else{
			inParams.setParam("keyWordArr0", keyWord);
		}
		
		return getSqlManager().selectParams("suggestions","StandardStoreService.getlistAutoStrInAssetList",inParams);
	}
	/**
	 * [설명] 
	 * 
	 * @Author Kim Jin Ho
	 * @Date 2017. 6. 13.
	*/
	public Params getStndStrLocList(Params inParams) {
		Params outParams = getSqlManager().selectGridParams("StandardStoreService.getListStoreLoc",inParams);
		LOG.debug("getStndStrLocList :  " + outParams);
		return outParams;
	}

	/**
	 * [설명] 
	 * 
	 * @Author Kim Jin Ho
	 * @Date 2017. 6. 16.
	*/
	public Params getStndRcptStrList(Params inParams) {
		return getSqlManager().selectGridParams("StandardStoreService.getListRcptStore",inParams);
	}

	/**
	 * [설명] 
	 * 
	 * @Author Kim Jin Ho
	 * @Date 2017. 6. 30.
	*/
	public Params getStndRcptStrMapList(Params inParams) {
		return getSqlManager().selectGridParams("StandardStoreService.getListRcptStoreMap",inParams);
	}

	/**
	 * [설명] 
	 * 
	 * @Author Kim Jin Ho
	 * @Date 2017. 7. 3.
	*/
	public Params getCallStrList(Params inParams) {
		return getSqlManager().selectOneParams("StandardStoreService.getCallStrList",inParams);
	}
}