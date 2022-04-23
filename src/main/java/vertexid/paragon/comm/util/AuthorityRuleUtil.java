package vertexid.paragon.comm.util;

import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;

import paragon.core.authority.rule.AuthorityRule;
import paragon.core.paramaters.CommParams;
import paragon.core.paramaters.Params;
import paragon.core.utility.common.RequestUtil;
import vertexid.paragon.settings.svce.AuthService;

public class AuthorityRuleUtil implements AuthorityRule {

	
	@Autowired
	private AuthService authService; 


	/**
	 * 로그인 여부 조회<br>
	 * <br>
	 * @param request
	 * @return 로그인 되어 있으면 true 리턴, 아니면 false
	 */
	public boolean isLogin(HttpServletRequest request) {

		boolean isLogin = false;
		HttpSession session = request.getSession(false);
		if(session == null) {
			return false;
		}
		if(session.getAttribute("s_logined") !=null && Boolean.valueOf(session.getAttribute("s_logined").toString())) {
			isLogin = true;
		}
		return isLogin;
	}

	/**
	 * 로그인여부 조회 overloading
	 */
	public boolean isLogin(ServletRequest request) {
		return isLogin(castHttpServletRequest(request));
	}

	/**
	 * 로그인 한 사용자의 ID를 리턴.<br>
	 * <br>
	 *
	 * @return 로그인한 사용자ID
	 */
	public String getUserId(HttpServletRequest request) {

		String userId = null;
		Object userIdObj = null;

		HttpSession session = request.getSession(false);
		if(session == null) {
			return "";
		}
		userIdObj = session.getAttribute("s_userId");
		if(userIdObj == null) {
			return "";
		}

		userId = (String)userIdObj;
		return userId;
	}
	/**
	 * 로그인 한 사용자의 ID를 리턴.<br>
	 * <br>
	 *
	 * @return 로그인한 사용자no
	 */
	public String getUserNo(HttpServletRequest request) {
		
		String userId = null;
		Object userIdObj = null;
		
		HttpSession session = request.getSession(false);
		if(session == null) {
			return "";
		}
		userIdObj = session.getAttribute("s_userNo");
		if(userIdObj == null) {
			return "";
		}
		
		userId = (String)userIdObj;
		return userId;
	}

	public CommParams getUserInfo(String userId) {
		CommParams inParams = new CommParams();
		inParams.setParam("userId", userId);

		return authService.getUserData(inParams);
	}

	/**
	 * 로그인 한 사용자의 ID를 리턴. overloading
	 */
	public String getUserId(ServletRequest request) {
		return getUserId(castHttpServletRequest(request));
	}
	/**
	 * 로그인 한 사용자의 NO를 리턴. overloading
	 */
	public String getUserNo(ServletRequest request) {
		return getUserNo(castHttpServletRequest(request));
	}

	/**
	 * request를 형변환하여 리턴
	 *
	 * @param request
	 * @return HttpServletRequest 객체
	 */
	private HttpServletRequest castHttpServletRequest(ServletRequest request) {
		return (HttpServletRequest)request;
	}

	/**
	 * 로그인 성공시 수행하는 작업들
	 * 		- 사용자 ID 저장 쿠키 생성
	 * 		- 각종 사용자정보 세션에 바인딩
	 *
	 * @param request
	 * @param response
	 * @param inParams
	 * @param isSaveUserId
	 */
	public void processAfterLoginSuccess(HttpServletRequest request, HttpServletResponse response, Params inParams,
			String isSaveUserId) {

		if("Y".equals(isSaveUserId)) {
			RequestUtil.addCookie(response, "savedUserId", inParams.getString("userId"));
		} else {
			RequestUtil.addCookie(response, "savedUserId", "");
		} 

		authService.processAfterLoginSuccess(request, inParams);
	}


}