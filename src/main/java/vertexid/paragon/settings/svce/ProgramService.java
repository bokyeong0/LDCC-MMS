package vertexid.paragon.settings.svce;


import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Service;


import paragon.core.mvc.stereotype.ParagonService;
import paragon.core.paramaters.Params;
import paragon.core.paramaters.ParamsFactory;
import paragon.core.paramaters.datatable.DataTable;
import paragon.core.paramaters.datatable.datarow.DataRow;

@Service
public class ProgramService extends ParagonService {
	
	private static final Log LOG = LogFactory.getLog(ParagonService.class);
	
	public Params getProgramGridList(Params inParams) {
		return getSqlManager().selectGridParams("ProgramService.getProgramList",inParams);
	}

	public DataTable getProgramNameList(Params inParams) {
		return getSqlManager().selectDataTable("ProgramService.getProgramNameList",inParams);
	}

	/**
	 * 프로그램 저장(등록/수정/삭제) 
	 * 
	 * @Author "Kim Jin Ho"
	 * @Date 2016. 12. 21.
	 */
	public Params saveProgram(Params inParams) {
		
		Params outParams = ParamsFactory.createParams(inParams);
		int cnt = 0; 
		for(DataRow dr: inParams.getDataTable("dt_program")){ 
			LOG.debug(dr);
			
			String modFlag = dr.getString("modFlag");
			dr.setParam("s_userId", inParams.getParam("s_userId"));
			if(modFlag.equals("INSERT")){
				cnt +=  getSqlManager().insert("ProgramService.insertProgram",dr);
			}else if(modFlag.equals("UPDATE")){
				cnt +=  getSqlManager().update("ProgramService.updateProgram",dr);
			}else if(modFlag.equals("DELETE")){
				cnt +=  getSqlManager().delete("ProgramService.deleteProgram",dr);
			}
		}
		outParams.setMsgCd("MSG_COM_SUC_007", new Object[]{cnt}); 
		return outParams;
	}
}
