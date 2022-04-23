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
public class CodeService extends ParagonService {
	
	private static final Log LOG = LogFactory.getLog(CodeService.class);
	
	public Params getGodeGroupGridList(Params inParams) {
		return getSqlManager().selectGridParams("CodeService.getCodeGroupList",inParams);
	}
	public Params getGodeGridList(Params inParams) {
		return getSqlManager().selectGridParams("CodeService.getCodeList",inParams);
	}

	public Params saveCodeGroup(Params inParams) {
		Params outParams = ParamsFactory.createOutParams(inParams);
		int cnt = 0;
		for(DataRow dr: inParams.getDataTable("dt_codegroup")){
			String modFlag = dr.getString("modFlag");
			dr.setParam("s_userId", inParams.getParam("s_userId"));
			if(modFlag.equals("INSERT")){
				cnt +=  getSqlManager().insert("CodeService.insertCodeGroup",dr);
			}else if(modFlag.equals("UPDATE")){
				cnt +=  getSqlManager().update("CodeService.updateCodeGroup",dr);
			}else if(modFlag.equals("DELETE")){
				cnt +=  getSqlManager().delete("CodeService.deleteCodeGroup",dr);
			}
		}
		outParams.setMsgCd("MSG_COM_SUC_007", new Object[]{cnt});
		return outParams;
	}
	
	public DataTable getCodeNameList(Params inParams) {
		return getSqlManager().selectDataTable("CodeService.getCodeNameList",inParams);
	}
	public DataTable getCodeGroupNameList(Params inParams) {
		return getSqlManager().selectDataTable("CodeService.getCodeGroupNameList",inParams);
	}
	
	public Params saveCode(Params inParams){
		Params outParams = ParamsFactory.createOutParams(inParams);
		int cnt = 0;
		if(inParams.getDataTable("dt_codePop") != null){
			for(int i=(inParams.getDataTable("dt_codePop").size()-1) ; i>=0 ; i--){
				DataRow dr = inParams.getDataTable("dt_codePop").getRow(i);
				String modFlag = dr.getString("modFlag");
				dr.setParam("s_userId", inParams.getParam("s_userId"));
				dr.setParam("codeGroupCd", inParams.getParam("codeGroupCd"));
				dr.setParam("useYn", inParams.getParam("useYn"));
				if(modFlag.equals("INSERT")){
					cnt +=  getSqlManager().insert("CodeService.insertCodePop",dr);
				}else if(modFlag.equals("UPDATE")){
					cnt +=  getSqlManager().update("CodeService.updateCodePop",dr);
				}else if(modFlag.equals("DELETE")){
					cnt +=  getSqlManager().delete("CodeService.deleteCode",dr);
				}
			}
		}else{
			for(DataRow dr: inParams.getDataTable("dt_code")){
				String modFlag = dr.getString("modFlag");
				dr.setParam("s_userId", inParams.getParam("s_userId"));
				if(modFlag.equals("INSERT")){
					cnt +=  getSqlManager().insert("CodeService.insertCode",dr);
				}else if(modFlag.equals("UPDATE")){
					cnt +=  getSqlManager().update("CodeService.updateCode",dr);
				}else if(modFlag.equals("DELETE")){
					cnt +=  getSqlManager().delete("CodeService.deleteCode",dr);
				}
			}
		}
		outParams.setMsgCd("MSG_COM_SUC_007", new Object[]{cnt});
		return outParams;
	}
	
	public DataTable getCodeGroupComboList(Params inParams) {
		return getSqlManager().selectDataTable("CodeService.getCodeGroupComboList",inParams);
	}
	
	public DataTable getComCateComboList(Params inParams) {
		LOG.debug("CodeService getComCateComboList(");
		return getSqlManager().selectDataTable("CodeService.getComCateComboList",inParams);
	}
	
	public DataTable getBrndCateComboList(Params inParams) {
		LOG.debug("CodeService getBrndCateComboList(");
		return getSqlManager().selectDataTable("CodeService.getBrndCateComboList",inParams);
	}	
	/**장애접수> 처리상태 추가 [2017-11-22]  **/
	public DataTable getCodeOtherComboList(Params inParams) {
		return getSqlManager().selectDataTable("CodeService.getCodeOtherComboList",inParams);
	}
	
	public Params getAreaTreeList(Params inParams) {
		return getSqlManager().selectParams("dt_tree", "CodeService.getAreaTreeList",inParams);
	}
	
	public Params getAreaComboList(Params inParams) {
		return getSqlManager().selectParams("CodeService.getAreaComboList",inParams);
	}
	
	public Params saveCodePop(Params inParams){
		Params outParams = ParamsFactory.createOutParams(inParams);
		int cnt = 0;
		for(DataRow dr: inParams.getDataTable("dt_code")){
			String modFlag = dr.getString("modFlag");
			dr.setParam("s_userId", inParams.getParam("s_userId"));
			if(modFlag.equals("INSERT")){
				cnt +=  getSqlManager().insert("CodeService.insertCode",dr);
			}else if(modFlag.equals("UPDATE")){
				cnt +=  getSqlManager().update("CodeService.updateCode",dr);
			}else if(modFlag.equals("DELETE")){
				cnt +=  getSqlManager().delete("CodeService.deleteCode",dr);
			}
		}
		outParams.setMsgCd("MSG_COM_SUC_007", new Object[]{cnt});
		return outParams;
	}
}
