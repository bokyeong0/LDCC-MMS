package vertexid.paragon.settings.svce;


import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Service;

import paragon.core.mvc.stereotype.ParagonService;
import paragon.core.paramaters.Params;
import paragon.core.paramaters.ParamsFactory;
import paragon.core.paramaters.datatable.datarow.DataRow;

@Service
public class AllowUrlService extends ParagonService {

	private static final Log LOG = LogFactory.getLog(AllowUrlService.class);
	
	public Params saveUsere(Params inParams) {
		Params outParam = ParamsFactory.createParams(inParams);
		int cnt = 0;
		for(DataRow dr: inParams.getDataTable("dt_user")){
			LOG.debug(dr);
			String modFlag = dr.getString("modFlag");
			dr.setParam("s_userId", inParams.getParam("s_userId"));
			if(modFlag.equals("INSERT")){
				cnt +=  getSqlManager().insert("UserService.insertUser",dr);
			}else if(modFlag.equals("UPDATE")){
				cnt +=  getSqlManager().update("UserService.updateUser",dr);
			}else if(modFlag.equals("DELETE")){
				cnt +=  getSqlManager().delete("UserService.deleteUser",dr);
			}
		}
		outParam.setParam("saveCnt", cnt);
		return outParam;
	}
	public Params getUserList(Params p) {
		return getSqlManager().selectGridParams("UserService.getUserList", p);
	}
}
