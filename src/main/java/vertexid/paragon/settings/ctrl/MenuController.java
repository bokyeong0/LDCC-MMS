package vertexid.paragon.settings.ctrl;




import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import paragon.core.paramaters.Params;
import vertexid.paragon.settings.svce.MenuService;

@Controller
@RequestMapping("/ctrl/settings/system/menu")
public class MenuController {
	
	private static final Log LOG = LogFactory.getLog(MenuController.class);
	
	
	@Autowired
	private MenuService menuService;
	

	@RequestMapping
	public String pgMove() {
		return "/settings/system/system_menu";
	}
	
	@RequestMapping("/newPopup")
	public String savePopupPgMove() {
		return "/settings/system/system_menu_new";
	}
	
	
	//레프트 메뉴 조회
	@RequestMapping("/leftMenu")
	public Params getLeftMenu(Params params ) {
		return menuService.getLeftMenu(params);
	}
	//Tree 메뉴 조회
	@RequestMapping("/treeMenu") 
	public Params treeMenu() {
		Params outP = menuService.getMenuTree();
		return outP;
	}
	//메뉴목록 조회
	@RequestMapping("/listMenu") 
	public Params listMenu(Params inParams) {
		return menuService.getMenuList(inParams); 
	}
	//메뉴신규 등록
	@RequestMapping("/newMenu") 
	public Params newMenu(Params inParams) {
		return menuService.newMenu(inParams); 
	}
	//메뉴 수정/삭제
	@RequestMapping("/saveMenu") 
	public Params saveMenu(Params inParams) {
		LOG.debug("saveMenu");
		return menuService.saveMenu(inParams); 
	}
}
