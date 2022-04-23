package vertexid.paragon.settings.ctrl;



import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import paragon.core.paramaters.Params;
import paragon.core.paramaters.datatable.datarow.DataRow;
import paragon.core.utility.common.DomainUtil;
import vertexid.paragon.settings.svce.DomainService;

@Controller
@RequestMapping("/ctrl/settings/system/domain") 
public class DomainController {
	
	private static final Log LOG = LogFactory.getLog(DomainController.class);
	
	@Autowired
	private DomainService domainService;   
	
	
	@RequestMapping 
	public String listDomainPgMove() {
		return "settings/system/system_domain";
	}
	
	@RequestMapping("/listDomain") 
	public Params listDomain(Params inParams) {
		LOG.debug("listComponent : "+inParams.toString());
		return domainService.getDomainGridList(inParams);
	}
	
	
	@RequestMapping("/saveDomain") 
	public Params saveDomain(Params inParams) { 
		return domainService.saveDomain(inParams);
	}
	@RequestMapping("/listColnames") 
	public Params listColnames(Params inParams) {
		
		Map<String,String> map = DomainUtil.getDomainMap(inParams.getStrParam("s_language"));
		
		List<String> list = new ArrayList<String>();		
		for(DataRow dr : inParams.getDataTable("dt_colnames")){
//			System.out.println("dr : " + dr);
			String key = dr.getString("colname");
			
			String lagColunm = key;			
			if(map.containsKey(key)){
				lagColunm = map.get(key);
			}
			list.add(lagColunm);
		}
		inParams.setParam("colNames",list);
		
		//JQgrid ColumnNms Add
		List<String> columnIds = inParams.getStrListParam("columnIds");
		List<String> columnNms = new ArrayList<String>();		
		for(String key : columnIds){
//			String key = dr.getString("colname");
			
			String lagColunm = key;			
			if(map.containsKey(key)){
				lagColunm = map.get(key);
			}
			columnNms.add(lagColunm);
		}
		inParams.setParam("columnNms",columnNms);		
		
		List<String> headerIds = inParams.getStrListParam("headerIds");
		
		Map<String,String> hederNms = new HashMap<String,String>();
		for(String key : headerIds){
			String lagColunm = key;			
			if(map.containsKey(key)){
				lagColunm = map.get(key);
			}
			hederNms.put(key, lagColunm);
		}
		inParams.setParam("headerNms",hederNms);
		
		String caption = inParams.getString("domainId");
		if(caption !=null){
			String lagColunm = "";
			if(map.containsKey(caption)){
				lagColunm = map.get(caption);
			}
			inParams.setParam("caption",lagColunm);
		}
			
		return inParams;
		//DB에서 직접조회
//		return domainService.getColunmToDomain(inParams);
	}
}
