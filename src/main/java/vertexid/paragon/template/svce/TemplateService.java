package vertexid.paragon.template.svce;


import org.springframework.stereotype.Service;


import paragon.core.mvc.stereotype.ParagonService;
import paragon.core.paramaters.Params;
import paragon.core.paramaters.datatable.DataTable;

@Service
public class TemplateService extends ParagonService {
	

	public Params getProgramNaviList(Params p) {
		return getSqlManager().selectGridParams("ProgramService.getProgramList",p);
	}

	public Params getProgramName(Params p) {
		return getSqlManager().selectOneParams("ProgramService.getProgramName",p);
	}
	public DataTable getProgramNameList(Params p) {
		return getSqlManager().selectDataTable("ProgramService.getProgramNameList",p);
	}
	

	public Params getTemplateData(Params inParams) {
		return getSqlManager().selectGridParams("TemplateService.getTemplateData",inParams);
	}


}
