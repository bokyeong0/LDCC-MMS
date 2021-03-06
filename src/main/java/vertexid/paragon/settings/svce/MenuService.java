package vertexid.paragon.settings.svce;


import org.springframework.stereotype.Service;


import paragon.core.mvc.stereotype.ParagonService;
import paragon.core.paramaters.LinkedParams;
import paragon.core.paramaters.Params;
import paragon.core.paramaters.ParamsFactory;
import paragon.core.paramaters.datatable.datarow.DataRow;

@Service
public class MenuService extends ParagonService {
	


	public Params getLeftMenu(Params inParams) {
		return getSqlManager().selectParams("dt_menu","MenuService.getLeftMenu",inParams);
	}
	public Params getMenuTree() {
		return getSqlManager().selectParams("dt_menu","MenuService.getMenuTree");
	}
	/**
	 * 메뉴 목록 조회
	 * 
	 * @Author Kim Jin Ho
	 * @Date 2016. 12. 7.
	*/
	public Params getMenuList(Params inParams) {
		Params outParma =  getSqlManager().selectGridParams("MenuService.getMenuList", inParams);
		LinkedParams lkp = new LinkedParams(outParma,"MENU_PARENT_SEQ","MENU_SEQ","MENU_ORDER");
		return lkp;
	}
	/**
	 * 메뉴관리 등록(신규)
	 * 
	 * @Author Kim Jin Ho
	 * @Date 2016. 12. 13.
	*/
	public Params newMenu(Params inParams) {
		Params outParam = ParamsFactory.createOutParams(inParams);
		int cnt = getSqlManager().insert("MenuService.insertMenu",inParams);
		outParam.setMsgCd("MSG_COM_SUC_007", new Object[]{cnt});
		return outParam;
	}
	/**
	 * 메뉴관리 저장(수정/삭제)
	 * 
	 * @Author Kim Jin Ho
	 * @Date 2016. 12. 13.
	*/
	public Params saveMenu(Params inParams) {
		Params outParam = ParamsFactory.createOutParams(inParams);
		int cnt = 0;
		for(DataRow dr: inParams.getDataTable("dt_menu")){
			String modFlag = dr.getString("modFlag");
			dr.setParam("s_userId", inParams.getParam("s_userId"));
			if(modFlag.equals("UPDATE")){
				cnt +=  getSqlManager().update("MenuService.updateMenu",dr);
			}else if(modFlag.equals("DELETE")){
				cnt +=  getSqlManager().delete("MenuService.deleteMenu",dr);
			}
		}
		outParam.setMsgCd("MSG_COM_SUC_007", new Object[]{cnt});
		return outParam;
	}
}
