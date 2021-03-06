package vertexid.paragon.settings.svce;


import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Service;

import paragon.core.mvc.stereotype.ParagonService;
import paragon.core.paramaters.Params;
import paragon.core.paramaters.ParamsFactory;
import paragon.core.paramaters.datatable.datarow.DataRow;

/**
 * [기능명을 입력하세요]
 *
 * @class AllowedURIService.java
 * @package vertexid.paragon.settings.svce
 * @author "Kim Jin Ho"
 * @version 1.0
 */
@Service
public class AllowedURIService extends ParagonService {

	
	private static final Log LOG = LogFactory.getLog(AllowedURIService.class);
	
	/**
	 * @Method Name : getAllowedURIList
	  * @작성일 : 2016. 11. 18.
	  * @작성자 : "Kim Jin Ho"
	  * @변경이력 : 
	  * @Method 설명 :
	  * @param inParams
	  * @return 
	 */
	public Params getAllowedURIList(Params inParams) {
		return getSqlManager().selectGridParams("AllowedURIService.getAllowedURIList", inParams);
	}

	/**
	 * 
	 * asdfasdfasdfasdf
	 * 
	 * @Author "Kim Jin Ho"
	 * @Date 2016. 11. 18.
	 */
	public Params saveAllowedURI(Params inParams) {
		Params outParams = ParamsFactory.createParams(inParams);
		int cnt = 0;
		for(DataRow dr: inParams.getDataTable("dt_alloweduri")){
			LOG.debug(dr);
			String modFlag = dr.getString("modFlag");
			dr.setParam("s_userId", inParams.getParam("s_userId"));
			if(modFlag.equals("INSERT")){
				cnt +=  getSqlManager().insert("AllowedURIService.insertAllowedURI",dr);
			}else if(modFlag.equals("UPDATE")){
				cnt +=  getSqlManager().update("AllowedURIService.updateAllowedURI",dr);
			}else if(modFlag.equals("DELETE")){
				cnt +=  getSqlManager().delete("AllowedURIService.deleteAllowedURI",dr);
			}
		}
		outParams.setParam("saveCnt", cnt);
		return outParams;
	} 
}
