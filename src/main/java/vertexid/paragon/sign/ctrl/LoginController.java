package vertexid.paragon.sign.ctrl;


import java.util.Enumeration;
import java.util.HashSet;
import java.util.Locale;
import java.util.Set;

import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import paragon.core.paramaters.CommParams;
import paragon.core.paramaters.Params;
import paragon.core.paramaters.ParamsFactory;
import paragon.core.utility.common.LocaleUtil;
import paragon.core.utility.config.Config;
import vertexid.paragon.comm.util.CipherUtil;
import vertexid.paragon.comm.util.CommUtil;
import vertexid.paragon.comm.util.RSA;
import vertexid.paragon.comm.util.RSAKey;
import vertexid.paragon.comm.util.SHA256;
import vertexid.paragon.comm.util.SessionManager;
import vertexid.paragon.comm.util.TEA;
import vertexid.paragon.settings.svce.LogService;
import vertexid.paragon.sign.svce.LoginService;

/**
 * @author "Han Seong Jin"
 *
 */
@Controller
@RequestMapping("/ctrl/sign")
public class LoginController {
	
	private static final Log LOG = LogFactory.getLog(LoginController.class);
	private static final String s_javaScriptKey = Config.getString("kakaoApi.javaScriptKey","305d54223f95457b6f0db256b78b2dc6"); // 롯데
//	private static final String s_javaScriptKey = Config.getString("kakaoApi.javaScriptKey","8ad51fedd8a239226665398645a0f60c"); // 내부
																							 
//	private ModelAndView mv; 
//	private JSONObject jsObj;
//	private JSONObject jsVo;
//	private JSONArray jsArr;
	
	@Autowired
	private LoginService loginService; 
	
	@Autowired
	private LogService logService;
	
	@Autowired(required = true)
	private HttpSession session;
	
	@RequestMapping("/logout")
	public String logout(HttpSession session) {
		LOG.debug("LoginController logout()");
		session.invalidate();
		return "redirect:/";
	}
	
	@RequestMapping("/login")
	public Params checkId(HttpSession session, Params inParams) throws Exception {
		LOG.debug("LoginController login()");
		
		String idCrypt = inParams.getString("userId");
        String pwdCrypt = inParams.getString("userPwd");
        String keyCrypt = inParams.getString("eKey");

        RSAKey rsaKey = (RSAKey) session.getAttribute("key");
        session.removeAttribute("key");
        
		RSA rsa = new RSA(rsaKey);
    	String teaKey = rsa.decrypt(keyCrypt);
    	
    	/* 암호화된 text를 TEA키를 이용하여 decrypt 한다. */	
    	TEA tea = new TEA(teaKey);
    	String id = tea.decrypt(idCrypt);
    	String pwd = tea.decrypt(pwdCrypt);

    	pwd = SHA256.encSHA256(pwd);
    	
    	inParams.setParam("userId", id);
    	inParams.setParam("userPwd", pwd);
    	
		Params outParams = loginService.getCheckId(inParams,session);
		inParams.setParam("loginYn", "N");
		inParams.setParam("connectIp", CommUtil.getUserIP());
		
		do{
			if(outParams.getInteger("stsCd") == 102 || outParams.getInteger("stsCd") == 104){
				// 운영서버 관리자(시스템운영자) 로그인 막음 
				String opMode = Config.getString("operation.mode").toUpperCase();
				if(opMode.equals("REL")) {
					String blockAdmin = Config.getString("operation.blockAdmin").toLowerCase();
					if(blockAdmin.equals("true") && outParams.getString("USER_TYPE").equals("0")) {					
						outParams.setStsCd(100);
						outParams.setMsgCd("MSG_LGN_ERR_010"); // 아이디 또는 비밀번호가 바르지 않습니다.
						break;
					}
				}

				inParams.setParam("loginYn", "Y");
				session.setAttribute("s_logined", false);
				session.setAttribute("s_multiLogin", false);
				session.setAttribute("s_companyCd", outParams.getString("ASP_COMP_CD"));
				session.setAttribute("s_userNo", outParams.getString("USER_NO"));
				session.setAttribute("s_userSeq", outParams.getString("USER_SEQ"));
				session.setAttribute("s_userId", outParams.getString("USER_ID"));
				session.setAttribute("s_userPwd", outParams.getString("USER_PWD"));
				session.setAttribute("s_userNm", outParams.getString("USER_NM"));
				session.setAttribute("s_userType", outParams.getString("USER_TYPE"));
				session.setAttribute("s_areaCd", outParams.getString("AREA_CD"));
				session.setAttribute("s_brndCd", outParams.getString("BRND_CD"));
				session.setAttribute("s_userPositionNm", outParams.getString("USER_POSITION_NM"));
				session.setAttribute("s_compCd", outParams.getString("COMP_CD")); 
				session.setAttribute("s_authSeq", outParams.getString("AUTH_GROUP_SEQ")); 
				session.setAttribute("s_callExt", outParams.getString("CALL_EXT"));
				session.setAttribute("s_connectIp", CommUtil.getUserIP());
				session.setAttribute("s_javaScriptKey", s_javaScriptKey);  //A20190131 k2s 다음api-> 카카오api
				
				
				//addedParams에 포함된 키값은 데이터 전송시 Params에 자동으로 포함된다
				Set<String> addedParams = new HashSet<String>();
				addedParams.add("s_userNo");
				addedParams.add("s_userId");
				addedParams.add("s_userSeq");
				addedParams.add("s_userType");
				addedParams.add("s_companyCd"); // ASP_COMP_CD
				addedParams.add("s_areaCd");
				addedParams.add("s_compCd"); // COMP_CD
				addedParams.add("s_brndCd");
				addedParams.add("s_authSeq");
				session.setAttribute("addedParams",addedParams); 
				
				if(inParams.getInteger("flag") == 1){
					outParams.setStsCd(100);
					outParams.setMsgCd("MSG_LGN_ERR_050");
				}
				
				if(outParams.getInteger("stsCd") == 102){
					outParams.setParam("encryptId", CipherUtil.encrypt(outParams.getString("USER_ID")));
					loginSuccess(session, outParams);
				}
			}
		}while(false);
		
		logService.saveLoginInfo(inParams);
		if(LOG.isDebugEnabled()){
			Enumeration<String> se = session.getAttributeNames();
			 
			while(se.hasMoreElements()){
				String getse = se.nextElement()+"";
				LOG.debug("session Attribute: "+getse+" : "+session.getAttribute(getse));
			}
		}
		return outParams;
	}
	
	@RequestMapping("/getKey")
	public Params getKey(HttpSession session) throws Exception {
		LOG.debug("LoginController getKey()");
		
		RSAKey key = RSAKey.generate(1024);

		String publicKeyModulus = RSAKey.toHex(key.getModulus());
		String publicKeyExponent = RSAKey.toHex(key.getPublicExponent());
		
		Params outParams = new CommParams();
		
		outParams.setParam("publicKeyM", publicKeyModulus);
		outParams.setParam("publicKeyE", publicKeyExponent);
		session.setAttribute("key", key);
		
		return outParams;
	}
	
	
	@RequestMapping("/decryptId")
	public Params getKey(HttpSession session,Params inParams) throws Exception {
		LOG.debug("LoginController decryptId()");
		
		Params outParams = new CommParams();
		
		outParams.setParam("userId", CipherUtil.decrypt(inParams.getString("encryptId")));
		
		return outParams;
	}
	
	@RequestMapping("/loginPopup")
	public String templateModalInner(){
		LOG.debug("templateModalInner()");
		return "login/loginPopup";
	}
	
	@RequestMapping("/changeLanguage")
	public Params changeLanguage(HttpSession session,Params inParams) throws Exception {
		LOG.debug("LoginController changeLanguage : " + inParams);
		String language = inParams.getString("language");
		String country = inParams.getString("country");
		
		Locale locale = new Locale(language,country); 
		
		Params outParam = ParamsFactory.createOutParams(inParams);
		if(language != null){
			outParam.setStsCd(100);
			LocaleUtil.setUserLocale(session, locale);
			session.setAttribute("s_country", locale.getCountry().toLowerCase());
			session.setAttribute("s_language_nm", locale.getDisplayLanguage().toLowerCase());
		}else{
			outParam.setStsCd(101);
			outParam.setMsgCd("MSG_MAIN_VAL_006");
		}
		
		return outParam;
	}
	
	@RequestMapping("/newPassword")
	public String passwordModalInner(){
		LOG.debug("LoginController newPassword()");
		return "login/newPassword";
	}

	@RequestMapping("/savePassword")
	public Params savePassword(HttpSession session, Params inParams) throws Exception {
        String newPwdCrypt = inParams.getString("userNewPwd");
        String keyCrypt = inParams.getString("eKey");
        
        RSAKey rsaKey = (RSAKey) session.getAttribute("key");
        session.removeAttribute("key");
        
		RSA rsa = new RSA(rsaKey);
    	String teaKey = rsa.decrypt(keyCrypt);
    	
    	/* 암호화된 text를 TEA키를 이용하여 decrypt 한다. */	
    	TEA tea = new TEA(teaKey);
    	String newPwd = tea.decrypt(newPwdCrypt);
    	
    	inParams.setParam("userNewPwd", newPwd);
    	
		Params outParams = loginService.savePassword(inParams, session);
		if(outParams.getInteger("stsCd") == 102) {
			outParams.setStsCd(100);
			loginSuccess(session, outParams);
		}
		return outParams;
	}
	
    /**
     * 
     * [설명] 
     * 로그인 성공시 처리
     * 다중로그인 처리 및 팜엄 출력 메세지 결정
     * @Author "Shin Dong Cheol"
     * @Date 2017. 12. 14.
     */
	private void loginSuccess(HttpSession session, Params outParams) {
		session.setAttribute("s_logined", true);
		SessionManager.addUser(session);
		
		if((boolean)session.getAttribute("s_multiLogin") == true){
			session.setAttribute("s_multiLogin", false);
			outParams.setMsgCd("MSG_LGN_SUC_001", new Object[] {session.getAttribute("s_blockedIp")});
		}
	}

}
