package vertexid.paragon.main.ctrl;

import java.util.Enumeration;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import paragon.core.authority.rule.AuthorityRule;
import paragon.core.common.ParagonConstants;
import paragon.core.paramaters.CommParams;
import paragon.core.paramaters.Params;
import paragon.core.utility.common.LocaleUtil;
import paragon.core.utility.config.Config;
import vertexid.paragon.comm.util.MobileUtil;
import vertexid.paragon.websocket.util.ParamCollector;
import vertexid.paragon.websocket.util.SessionManager;

/**
 * @author "Han Seong Jin"
 *
 */
@Controller
public class MainController {
	
	private static final Log LOG = LogFactory.getLog(MainController.class);
	
	
	@Autowired(required = true)
	private HttpServletRequest request;
	
	@Autowired
	private AuthorityRule authRule;
	
	
	@RequestMapping("/err/404")
	public String err404() {
		LOG.debug("MainController err404() ... ");
		return "login/login";
	}
	
	@RequestMapping("/exception/nosisson")
	public String errNosession() {
		LOG.debug("MainController errNosession() ... ");
		return "login/login";
	}
	@RequestMapping("/exception/invalid")
	public String errInvalid() {
		LOG.debug("MainController errInvalid() ... ");
		return "login/login";
	}
	@RequestMapping("/error/page")
	public String errPage() {
		LOG.debug("MainController errPage() ... ");
		return "exception/error_page";
	}
	@RequestMapping("/call")
	public String callPage() {
		LOG.debug("MainController errPage() ... ");
		return "/call/call_obstacle_receipt";
	}
	
	@RequestMapping("/push")
	public void push(HttpSession session,Params notiParams ) throws Exception {
//		Params notiParams =  new CommParams();
		String[] deviceStrTokens = {"524a8d9eb0483efb5fc4d5b44c904be933690814cb9f87494aa80bf4882792d1","e8b03e374c6a0a842e48d61c112beeb1ef4683aa04cf2bd351b2b65a696ef891"};
		notiParams.setParam("PUSH_IDS", deviceStrTokens);
//		notiParams.setParam("PUSH_MSG", deviceStrTokens);
		MobileUtil.sendPush(notiParams);
	}
	@RequestMapping("/")
	public String home(HttpSession session) throws Exception {
		LOG.debug("MainController home() ... ");
		
		LOG.debug("MAIN CHECK::"+Config.getString("session.timeoutSec"));
		
		
		
		
		
		//TODO url체크 하여 asp_com_cd 및 이미지 조회
		session.setAttribute("s_aspCompCd", "VERTEXID");
		
		if(!authRule.isLogin(request)){
			
			session.setAttribute("s_ip", (String)request.getAttribute(ParagonConstants.CLIENT_IP));
			session.setAttribute("s_logined", false);
			session.setAttribute("s_language", LocaleUtil.getUserLocale(session).getLanguage());
			String sCountry = LocaleUtil.getUserLocale(session).getCountry();
			if(sCountry ==""){
				sCountry = Config.getString("locale.defaultCount");
			}
			session.setAttribute("s_country", sCountry);
			session.setAttribute("s_language_nm", LocaleUtil.getUserLocale(session).getDisplayLanguage());
			session.setAttribute("s_jSessionId", request.getRequestedSessionId());
			session.setAttribute("s_multiLogin", false);
			
			if(LOG.isDebugEnabled()){
				Enumeration<String> se = session.getAttributeNames();
				while(se.hasMoreElements()){
					String getse = se.nextElement()+"";
					LOG.debug("session Default Attribute : "+getse+" : "+session.getAttribute(getse));
				}
			}

			return "login/login";
		}else{
			return "main/main";
		}
			
	}
	@RequestMapping("/dashboard")
	public String dashboard() {
		LOG.debug("MainController dashboard() ... ");
		return "dashboard/dashboard";
	}
	
	
	@RequestMapping("/web")
	public String web() {
		return "webstart_demo";
	}
	@RequestMapping("/chat")
	public String chat() {
		return "home";
	}
	@RequestMapping("/asdf")
	public String homeasdf() {
		LOG.debug("접속자asdf : "+SessionManager.listSize());
		return "home2";
	}
	@RequestMapping("/params")
	public String pramsTest(ParamCollector p ) {
		System.out.println("접속자params : "+p.get("id"));
		return "home2";
	}
	@RequestMapping("/params1")
	public String pramsTest1( ParamCollector p ) {
		System.out.println("접속자params1 : "+p);
		return "home2";
	}
	@RequestMapping("/params2")
	public String pramsTest2(@RequestParam Map<String,String> map ) {
		System.out.println("접속자params2 : "+map.toString());
		return "home2";
	}
	@RequestMapping(value = "/talk", method = RequestMethod.POST)
	public String talk() {
		return "/main/talk";
	}
	
	@RequestMapping("/test")
	public String test() {
		LOG.debug("MainController err404() ... ");
		return "main/test2";
	}
}
