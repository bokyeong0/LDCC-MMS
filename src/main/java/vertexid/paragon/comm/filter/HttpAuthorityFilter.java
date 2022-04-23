package vertexid.paragon.comm.filter;



import java.io.IOException;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.context.support.SpringBeanAutowiringSupport;

import paragon.core.authority.rule.AuthorityRule;
import paragon.core.common.ParagonConstants;
import paragon.core.exception.ParagonException;
import paragon.core.mvc.stereotype.SqlManager;
import paragon.core.mvc.stereotype.SqlManagerFactory;
import paragon.core.paramaters.CommParams;
import paragon.core.paramaters.Params;
import paragon.core.paramaters.ParamsFactory;
import paragon.core.utility.common.AllowedURIUtil;
import paragon.core.utility.common.RequestUtil;
import paragon.core.utility.config.Config;
import paragon.core.utility.i18n.NoticeMessageUtil;
import paragon.core.utility.variable.StringUtil;
import paragon.core.web.listener.adapter.ParagonContextLoaderAdapter;
import vertexid.paragon.comm.util.CommUtil;
import vertexid.paragon.comm.util.RSA;
import vertexid.paragon.comm.util.RSAKey;
import vertexid.paragon.comm.util.SHA256;
import vertexid.paragon.comm.util.TEA;
import vertexid.paragon.settings.svce.LogService;


public class HttpAuthorityFilter implements Filter {

	private static final Log LOG = LogFactory.getLog(HttpAuthorityFilter.class);
	private static final int ZERO = 0;
	public FilterConfig config;

	@Autowired
	private LogService logService;
	
	@Override
	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
		
		HttpServletRequest httpReq = (HttpServletRequest)req;
		HttpSession session = httpReq.getSession();
		String reqUrl = (String)req.getAttribute(ParagonConstants.REQ_URI);
		
		if(session != null && session.getAttribute("s_blocked") != null && (boolean) session.getAttribute("s_blocked")) {
			session.invalidate();
			String ajaxType = StringUtils.defaultString(httpReq.getHeader("AjaxType")).toLowerCase().trim();
			int errCd = ParagonConstants.ERR_CD_NOAUTH;
			notAvailableProcess(req, res, errCd, "MSG_LGN_ERR_240", ajaxType);
			//throw new ParagonException("MSG_LGN_ERR_240");
			return;
		}
		
		if( reqUrl != null){ 
			//세션에서 사용자ID, 로그인여부 획득
			AuthorityRule authorityRule = (AuthorityRule)ParagonContextLoaderAdapter.getBean("authorityRule");
			//사용저언어
//			String sLanguage = LocaleUtil.getUserLanguage(session);
			//사번
			String userId = authorityRule.getUserId(req);

			//메뉴권한플레그
			String checkFlag = "N"; 
			//요청 URI
			String reqURI = (String)req.getAttribute(ParagonConstants.REQ_URI);
			//클라이언트 IP 
//			String ipAddr = (String)req.getAttribute(ParagonConstants.CLIENT_IP);

			//프로그램코드 
			String proCd = StringUtils.defaultString(httpReq.getHeader("proCd")).trim();
			//String userId = (String) (httpReq.getSession()).getAttribute("s_userId");
			String ajaxType = StringUtils.defaultString(httpReq.getHeader("AjaxType")).toLowerCase().trim();
			String connectIp = CommUtil.getUserIP();
			if(LOG.isDebugEnabled()) {
				LOG.debug("PRO_CD : " + proCd);
				LOG.debug("WebAjaxType : " + ajaxType);
				LOG.debug("Request URI : " + reqURI);
				LOG.debug("USER_ID : " + userId);
				LOG.debug("USER_ID : " + userId);
//				LOG.debug("userNo : " + userNo);
//				LOG.debug("ipAddr : " + ipAddr);
//				LOG.debug("sLanguage : " + sLanguage);
//				LOG.debug("loginable : " + authorityRule.isLogin(req));
			} 
			//무조건 통과 URI 목록
			Set<String> allowedURISet = AllowedURIUtil.getAllowedURISet();
			//로그인한 유저에 한해서 무조건 통과 URI 목록
			Set<String> userAllowedURISet = AllowedURIUtil.getUserAllowedURISet();

			SqlManager sqlManager = SqlManagerFactory.getSqlManager();
			
			//어플리케이션 동작모드	
//			String opMode = Config.getString("operation.mode").toUpperCase();
			//권한 모드
//			if(!opMode.equals("LOC")){
				//권한체크 불필요
				if(allowedURISet.contains(reqURI)) {
					LOG.debug("Ignore permissions.");
					//로그인한 유저에 한해서 권한체크가 불필요
				} else if(userAllowedURISet.contains(reqURI)) {
					LOG.debug("Ignore permissions after login.");
					
					//로그인 fasle
					if(!authorityRule.isLogin(req)) {
						LOG.debug("Not Login.");
						int errCd = ParagonConstants.ERR_CD_NOAUTH;
						notAvailableProcess(req, res, errCd, "MSG_COM_ERR_029", ajaxType);
						return;
					}
					LOG.debug("Pass URI");
					//권한체크가 필요
				}else {
					//로그인 fasle
					if(!authorityRule.isLogin(req)) {
						LOG.debug("Not Login.");
						int errCd = ParagonConstants.ERR_CD_NOAUTH;
						notAvailableProcess(req, res, errCd, "MSG_COM_ERR_029", ajaxType);
						return;
						
						//로그인 true
					} else {
						
						//잘못된 접근
						if(proCd == null || proCd ==""){
							int errCd = ParagonConstants.ERR_CD_INVALID;
							notAvailableProcess(req, res, errCd, "MSG_COM_ERR_054", ajaxType);
							return;
						}
						Map<String, String> map = new HashMap<String, String>();
						map.put("s_userId", userId);
						map.put("s_proCd", proCd);
						checkFlag = sqlManager.selectOne("AuthService.getAuthCheckMenu" ,map);
						
						//해당 메뉴에 대한 권한 false
						if(checkFlag == null || !checkFlag.equals("Y") ) { 
							
							if(LOG.isDebugEnabled()) {
								LOG.debug("해당 메뉴에 대한 권한이 없습니다. "+checkFlag);
							}
							int errCd = ParagonConstants.ERR_CD_USEREXCEP;
							notAvailableProcess(req, res, errCd, "MSG_COM_ERR_030", ajaxType);
							return;
						}
					}
					
				}
				//############################## 권한체크가 필요한 요청 - end #################################
				sqlManager = null;
//			}
			
			String[] uriArray = reqURI.split("/");
			boolean isSave = uriArray[uriArray.length - 1].contains("save");
			if(reqURI.equals("/ctrl/settings/system/auth/listCheckAuth") || isSave) {
				if (proCd != null && !proCd.equals("") && !proCd.equals("null") && !userId.equals("")) {
					/**
					 * Filter에서 @Autowired 사용하여 Service를 불러 올 경우
					 * SpringBeanAutowiringSupport.processInjectionBasedOnCurrentContext(this);
					 * 추가를 하면 Service를 사용 할 수 있음.
					 */
					SpringBeanAutowiringSupport.processInjectionBasedOnCurrentContext(this);
					CommParams inParams = new CommParams();
					CommParams reqParams = new CommParams();
					Enumeration<String> requestParamsName = httpReq.getParameterNames();
					while (requestParamsName.hasMoreElements()) {
						String string = requestParamsName.nextElement();
						if (!string.contains("Pwd")) {
							reqParams.setParam(string, httpReq.getParameter(string));
					    }
					}
					String lpContent = null; 
					inParams.setParam("userId", userId);
					inParams.setParam("connectIp", connectIp);
					inParams.setParam("proCd", proCd);
					
					if(isSave) {
						lpContent = "저장"+(reqParams.size() > 0 ? reqParams.toString() : "");
						inParams.setParam("lpContent", lpContent);
					} else {
						lpContent = "조회"+(reqParams.size() > 0 ? reqParams.toString() : "");
						inParams.setParam("lpContent", lpContent);
					}
					logService.saveProInfo(inParams);
				}
			}
		}
		chain.doFilter(req, res);
	}


	private void notAvailableProcess(ServletRequest req, ServletResponse res, int errCd, String msgCd, String ajaxType) throws ServletException, IOException {
		String msgTxt =  NoticeMessageUtil.getMessage(msgCd);
		if(ajaxType.length() > ZERO) {
			if("paragon".equals(ajaxType)) {
				processJSONMessage(res, errCd, msgCd, msgTxt);
			} else if("raw".equals(ajaxType)) {
				processCookieMessage(res, errCd, msgCd, msgTxt);
			}
		} else {
			processPageMessage(req, res, errCd, msgTxt);
		}
	}
	
	//일반 요청 : non-ajax
	private void processPageMessage(ServletRequest request, ServletResponse response, int errorCode, String svcErrMsgText)
			throws ServletException, IOException {

		//클라이언트로 리턴할 에러정보		
		Map<String, Object> exceptionInfo = new ConcurrentHashMap<String, Object>();
		String forwardURL = "/exception/nosisson";
		if(errorCode == ParagonConstants.ERR_CD_INVALID){
			forwardURL = "/exception/invalid";
		}
		
		if("".equals(svcErrMsgText)) {
			exceptionInfo.put(ParagonConstants.ERR_CD, errorCode);
		} else {
			exceptionInfo.put(ParagonConstants.ERR_CD, 0);
		}
		request.getRequestDispatcher(forwardURL).forward(request, response);
	}

	//AJAX 요청 : raw type ajax 
	private void processCookieMessage(ServletResponse res, int errCd, String msgCd, String msgTxt) {

		HttpServletResponse hRes = (HttpServletResponse)res;

		if(msgTxt.isEmpty()) {
			RequestUtil.addCookie(hRes, ParagonConstants.ERR_CD, errCd);
		} else {
			RequestUtil.addCookie(hRes, ParagonConstants.ERR_CD, 0);
		}
		RequestUtil.addCookie(hRes, ParagonConstants.MSG_CD, msgCd);
		RequestUtil.addCookie(hRes, ParagonConstants.MSG_TXT, StringUtil.encodeUrlUtf8(msgTxt));
	}

	//AJAX 요청 : paragon type ajax 
	private void processJSONMessage(ServletResponse res, int errCd, String msgCd, String msgTxt) {
 
		HttpServletResponse hRes = (HttpServletResponse)res;
			
// 		
		try {
			hRes.setContentType("application/json");
			hRes.setCharacterEncoding("UTF-8");
			hRes.setStatus(errCd);
			res.getWriter().write(msgTxt.toString());
			LOG.debug("msgCd : " + msgCd);
		} catch(IOException e) {
			LOG.error("Exception", e);
		}
	}


	@Override
	public void init(FilterConfig config) throws ServletException {
		if(LOG.isDebugEnabled()) {
			LOG.debug("HtmlAuthorityFilter init()");
		}

		this.config = config;
	}

	@Override
	public void destroy() {
		if(LOG.isDebugEnabled()) {
			LOG.debug("HtmlAuthorityFilter destroy()");
		}
	}

}