package vertexid.paragon.settings.ctrl;


import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import paragon.core.paramaters.Params;
import paragon.core.paramaters.ParamsFactory;
import paragon.core.paramaters.datatable.DataTable;
import vertexid.paragon.comm.util.SHA256;
import vertexid.paragon.settings.svce.UserService;

@Controller
@RequestMapping("/ctrl/settings/user") 
public class UserController {
	
	private static final Log LOG = LogFactory.getLog(UserController.class);
	
	@Autowired
	private UserService userService;  
	
	@RequestMapping("/ldcc")
	public String listLdccUserPgMove() {
		LOG.debug("listUserPgMove"); 
		return "settings/user/ldccUser_info";
	}
	
	@RequestMapping("/listLdccUser") 
	public Params getLdccListUser(Params inParams) {
		Params outParams = userService.getLdccListUser(inParams);
		return outParams;
	}

	@RequestMapping("/viewLdccUserPop")
	public String viewLdccUserPop() {
		LOG.debug("viewLdccUserPop");
		return "settings/user/ldccUser_infoViewPop";
	}	
	@RequestMapping("/listLdccUserName")
	public Params getListUserName(Params inParams){
		return userService.getUserNameList(inParams);
	}

	@RequestMapping("/saveLdccUserPop")
	public String templateSaveUserModalInner() {
		LOG.debug("templateModalInner");
		return "settings/user/ldccUser_infoSavePop";
	}

	@RequestMapping("/modifyLdccUserPop")
	public String templateModifyUserModalInner() {
		LOG.debug("templateModifyUserModalInner");
		return "settings/user/ldccUser_infoModifyPop";
	}

	@RequestMapping("/checkUserNo")
	public Params getCheckUserNo(Params inParams)  {
		LOG.debug("UserController checkUserInfo : ");
		return userService.getCheckUserNo(inParams);
	}

	@RequestMapping("/checkUserId")
	public Params getCheckUserId(Params inParams) {
		LOG.debug("UserController getCheckUserId");
		return userService.getCheckUserId(inParams);
	}
	
	@RequestMapping("/saveLdccUser")
	public Params saveUser(Params inParams) throws Exception {
		LOG.debug("UserController saveUser");
//		String pwd = SHA256.encSHA256(inParams.getParam("userPwd")+"");
//		inParams.setParam("userPwd", pwd);
		return userService.saveLdccUser(inParams);
	}

	@RequestMapping("/updateLdccUser")
	public Params updateLdccUser(Params inParams) throws Exception {
		LOG.debug("UserController updateLdccUser");
//		if(inParams.getParam("userPwd") != null){
//			String pwd = SHA256.encSHA256(inParams.getString("userPwd"));
//			inParams.setParam("userPwd", pwd);
//		}
		return userService.updateLdccUser(inParams);
	}

	@RequestMapping("/updateCustomerUser")
	public Params updateUser(Params inParams) throws Exception {
		LOG.debug("UserController updateUser");
		return userService.updateCustomerUser(inParams);
	}
	@RequestMapping("/deleteUser")
	public Params deleteUser(Params inParams) {
		LOG.debug("UserController deleteUser");
		return userService.deleteUser(inParams);
	}

	@RequestMapping("/userInfo")
	public Params getUserInfo(Params inParams, HttpSession session) {
		Params outParam = userService.getUserInfo(inParams);
		return outParam;
	}

	@RequestMapping("/userInfoView")
	public Params getUserInfoView(Params inParams, HttpSession session) {
		LOG.debug("userInfoView  "+inParams);
		return userService.getUserInfoView(inParams);
	}

	@RequestMapping("/myPage")
	public String myPage() {
		return "main/my_page";
	}
	@RequestMapping("/myInfo")
	public Params myInfo(Params inParams) {
		return userService.getUserMyInfoView(inParams);
	}
	@RequestMapping("/saveMyInfo")
	public Params saveMyInfo(Params inParams){
		return userService.saveMyInfo(inParams);
	}
	@RequestMapping("/savePassword")
	public Params savePassword(Params inParams) throws Exception {
		
		return userService.savePassword(inParams);
	}
	@RequestMapping("/saveMobile")
	public Params saveMobile(Params inParams) throws Exception {
		return userService.saveMobile(inParams);
	}
	@RequestMapping("/updateMobile")
	public Params updateMobile(Params inParams) throws Exception {
		return userService.updateMobile(inParams);
	}
	@RequestMapping("/listMyMobile")
	public Params listMyMobile(Params inParams) throws Exception {
		return userService.getMyMobileList(inParams);
	}
	@RequestMapping("/makeMobileKey")
	public Params makeMobileKey(Params inParams) throws Exception {
		Params outParams =  ParamsFactory.createOutParams(inParams);
		outParams = userService.makeMobileKey(inParams);
		return outParams;
	}
	
	@RequestMapping("/mobileAuthCheck")
	public Params mobileAuthCheck(Params inParams) throws Exception {
		Params outParams =  ParamsFactory.createOutParams(inParams);
		outParams = userService.mobileAuthCheck(inParams);
		return outParams;
	}
	@RequestMapping("/mobileLoc")
	public Params mobileLoc(Params inParams) throws Exception {
		Params outParams =  ParamsFactory.createOutParams(inParams);
		outParams = userService.saveMobileLocation(inParams);
		LOG.debug("위치정보 : " + inParams);
		return outParams;
	}

	@RequestMapping("/customer")
	public String listCustomerPgMove() {
		LOG.debug(" UserController customer : 고객사 사용자 관리 "); 
		return "settings/user/customerUser_info";
	}

	@RequestMapping("/listCustomer") 
	public Params getListCustomer(Params inParams) {
		LOG.debug("UserController customer 고객사 사용자 관리, GRID LIST 조회 :" + inParams);
		Params outParams = userService.getListCustomer(inParams);
		return outParams;
	}

	@RequestMapping("/saveCustomerPop")
	public String templateSaveCustomerModalInner() {
		LOG.debug("templateSaveCustomerModalInner");
		return "settings/user/customerUser_savePop";
	}

	@RequestMapping("/saveCustomer")
	public Params saveCustomer(Params inParams) throws Exception {
		LOG.debug("UserController saveCustomer()");
//		String pwd = SHA256.encSHA256(inParams.getString("userPwd"));
//		inParams.setParam("userPwd", pwd);
		return userService.saveCustomer(inParams);
	}

	@RequestMapping("/modifyCustomerPop")
	public String templateModifyCustomeModalInner() {
		LOG.debug("templateModifyUserModalInner");
		return "settings/user/customerUser_modifyPop";
	}

	@RequestMapping("/viewCustomerPop")
	public String viewCustomerPop() {
		LOG.debug("viewCustomerPop");
		return "settings/user/customerUser_viewPop";
	}

	@RequestMapping("/updateUserTempPwd")
	public Params updateUserTempPwd(Params inParams) throws Exception {
		LOG.debug("updateUserTempPwd");
		Params outParams = userService.updateUserTempPwd(inParams);
		return outParams;
	}
	
	@RequestMapping("/partner")
	public String listPartnerPgMove() {
		LOG.debug(" UserController listPartnerPgMove : 파트너 사용자 관리 "); 
		return "settings/user/partnerUser_info";
	}

	@RequestMapping("/listPartner") 
	public Params getListPartner(Params inParams) throws Exception {
		LOG.debug("UserController getListPartner 파트너사 사용자 관리, GRID LIST 조회 :" + inParams);
		Params outParams = userService.getListPartner(inParams);
		return outParams;
	}

	@RequestMapping("/savePartnerPop")
	public String templateSavePartnerModalInner() {
		LOG.debug("UserController getListPartner");
		return "settings/user/partnerUser_savePop";
	}

	@RequestMapping("/savePartner")
	public Params savePartnerPop(Params inParams) {
		LOG.debug("UserController savePartnerPop 파트너사 사용자 관리, 사용자 정보 등록 :" + inParams);
		return userService.savePartner(inParams);
	}

	@RequestMapping("/viewPartnerPop")
	public String viewPartnerPop() {
		LOG.debug("viewPartnerPop");
		return "settings/user/partnerUser_viewPop";
	}	

	@RequestMapping("/listPartnerAspCompCd")
	public Params listPartnerAspCompCd(Params inParams){
		LOG.debug("listPartnerAspCompCd   " + inParams);
		return userService.getStndPartnerAspCompCdList(inParams);
	}
	@RequestMapping("/listUserAreaNm")
	public Params listUserAreaNm(Params inParams){
		return userService.getStndUserAreaNmList(inParams);
	}

	@RequestMapping("/modifyPartnerPop")
	public String modifyPartnerPop(Params inParams) {
		LOG.debug("UserController modifyPartnerPop 파트너사 사용자 관리, 사용자정보 수정 팝업 :" + inParams);
		return "settings/user/partnerUser_modifyPop";
	}

	@RequestMapping("/updatePartnerUser")
	public Params updatePartnerUser(Params inParams) throws Exception {
		LOG.debug("UserController updatePartnerUser" + inParams);
		return userService.updatePartnerUser(inParams);
	}

	@RequestMapping("/createTempPwd")
	public Params createTempPwd() throws Exception {
		LOG.debug("createTempPwd");
		return userService.createTempPwd();
	}	
	
	@RequestMapping("/ldccUserAuthCombo")
	public DataTable ldccUserAuthCombo(Params inParams) throws Exception {
		LOG.debug("ldccUserAuthCombo");
		return userService.ldccUserAuthCombo(inParams);
	}	

	@RequestMapping("/partnerUserAuthCombo")
	public DataTable partnerUserAuthCombo(Params inParams) throws Exception {
		LOG.debug("partnerUserAuthCombo");
		return userService.partnerUserAuthCombo(inParams);
	}	
	

}
