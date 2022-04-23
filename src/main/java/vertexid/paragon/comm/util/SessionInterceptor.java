package vertexid.paragon.comm.util;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class SessionInterceptor extends HandlerInterceptorAdapter {

	private static final Log LOG = LogFactory.getLog(SessionInterceptor.class);
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception{
		LOG.debug("===============================preHandler===============================");

		HttpSession session = request.getSession();
		
		if(session == null){
			LOG.debug("SessionInterceptor session null");
//			response.sendRedirect("/");
			return false;
		}
		String proCd = StringUtils.defaultString(request.getHeader("proCd")).trim();
		String userId = (String) session.getAttribute("s_userId");
		String ajaxType = StringUtils.defaultString(request.getHeader("AjaxType")).toLowerCase().trim();
		String connectIp = CommUtil.getUserIP();
		LOG.debug("PRO_CD : " + proCd);
		LOG.debug("WebAjaxType : " + ajaxType);
		LOG.debug("USER_ID : " + userId);
		LOG.debug("USER_ID : " + userId);
		
//		SessionVo sessionVo = (SessionVo)session.getAttribute("sessionVo");
		
//		if(sessionVo.isLoggedIn() == false){
			LOG.debug("SessionInt9erceptor sessionVo null");
//			response.sendRedirect("/");
//			return false;
//		}
		
		return true;
	}
	
	@Override
    public void postHandle(HttpServletRequest request, 
            HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
		LOG.debug("===============================postHandle===============================");
    }
}
