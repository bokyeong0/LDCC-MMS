package vertexid.paragon.comm.filter;



import java.io.IOException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import javax.servlet.FilterChain;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.exception.ExceptionUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import paragon.core.common.ParagonConstants;
import paragon.core.exception.ParagonException;
import paragon.core.exception.SystemException;
import paragon.core.utility.common.RequestUtil;
import paragon.core.utility.config.Config;
import paragon.core.utility.i18n.NoticeMessageUtil;
import paragon.core.utility.json.JsonUtil;
import paragon.core.utility.variable.StringUtil;


public class HttpExceptionFilter extends BaseExceptionFilter {

	private static final Log LOG = LogFactory.getLog(HttpExceptionFilter.class);

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {

		HttpServletRequest httpReq = (HttpServletRequest)request;
		HttpServletResponse httpRes = (HttpServletResponse)response;
		httpRes.setCharacterEncoding("UTF-8");
		String ajaxType = StringUtils.defaultString(httpReq.getHeader("AjaxType")).toLowerCase();

		try {
			chain.doFilter(request, response);
			if("raw".equals(ajaxType)) {

				String msgStsCd = (String)httpReq.getAttribute(ParagonConstants.STS_CD);
				String msgStsMsg = (String)httpReq.getAttribute(ParagonConstants.STS_MGS);

				String msgCode = (String)httpReq.getAttribute(ParagonConstants.MSG_CD);
				String msgText = (String)httpReq.getAttribute(ParagonConstants.MSG_TXT);

				//앨럿 메시지
				if(msgStsCd != null && msgStsCd.length() > 0) {
					RequestUtil.addCookie(httpRes, ParagonConstants.STS_CD, msgStsCd); 
					RequestUtil.addCookie(httpRes, ParagonConstants.STS_MGS, StringUtil.encodeUrlUtf8(msgStsMsg)); 
				}
				//상태 메시지
				if(msgCode != null && msgCode.length() > 0) {
					RequestUtil.addCookie(httpRes, ParagonConstants.MSG_CD, msgCode);
					RequestUtil.addCookie(httpRes, ParagonConstants.MSG_TXT, StringUtil.encodeUrlUtf8(msgText));
				}

				//에러코드(성공/실패 여부)
				String errCd = httpReq.getAttribute(ParagonConstants.ERR_CD).toString(); 
				RequestUtil.addCookie(httpRes, ParagonConstants.ERR_CD, errCd);
			}

		} catch(Exception e) {

//			e.printStackTrace();
			String errorMessage = null;
			String code = null;

			Map<String,Object> exceptionMap = new HashMap<String,Object>(); 

			String uri = httpReq.getRequestURI();
			Map<String, String> params = RequestUtil.getParameterMap(httpReq);

			StringBuilder sb = new StringBuilder();
			sb.append("===========================================================");
			sb.append("\nURI : ");
			sb.append(uri);
			sb.append("\nparams : ");
			sb.append(params);
			sb.append("\n===========================================================");
			String requestInfo = sb.toString();

			if(e.getCause() instanceof ParagonException) {
				ParagonException paragonException = (ParagonException)e.getCause(); 
				//테이블에 저장해야함 
				if(ExceptionUtils.getRootCause(e) instanceof SQLException) {
					//rootCause가 SystemException이 아닌 SQLException으로 나옴

					String errMsg = getExceptionMessageDetail(e);

					HashMap<String, String> logMap = new HashMap<String, String>();
					logMap.put("svrId", request.getLocalAddr());
					logMap.put("clntAddr", (String)request.getAttribute(ParagonConstants.CLIENT_IP));
					logMap.put("excptCnts", requestInfo);
					logMap.put("stackTrc", errMsg);
					logMap.put("callUri", uri);
//					LoggingException2DB.loggingError2DB(logMap);
				}
				errorMessage = paragonException.getErrMsg((Locale)request.getAttribute(ParagonConstants.PARAGON_LOCALE));
				
				if (!"MSG_COM_ERR_029".equals(paragonException.getErrCd())) {
					exceptionMap.put(ParagonConstants.ERR_CD, ParagonConstants.ERR_CD_USEREXCEP);
				} else { 
					exceptionMap.put(ParagonConstants.ERR_CD, ParagonConstants.ERR_CD_NOAUTH);
				}
				
				exceptionMap.put(ParagonConstants.ERR_MSG, errorMessage);
				exceptionMap.put(ParagonConstants.ERR_CD, paragonException.getErrCd());
//				if(paragonException.getArgs() != null) {
//					variableMap.put(ParagonConstants.BIND_MESAGE, NoticeMessageUtil.getBindMessage(ue.getArgs()));
//				}
				
				code = paragonException.getErrCd();

				// display message 
				String displayCode = paragonException.getDisplayCd();

				if(displayCode != null) {
					String displayMsg = paragonException.getDisplayMsg((Locale)request.getAttribute(ParagonConstants.PARAGON_LOCALE));
					exceptionMap.put(ParagonConstants.DISPLAY_CD, ParagonConstants.ERR_CD_USEREXCEP);
					exceptionMap.put(ParagonConstants.DISPLAY_MSG, displayMsg);  
					exceptionMap.put(ParagonConstants.DISPLAY_CD, paragonException.getDisplayCd());
					if(paragonException.getDisplayArgs() != null) {
						exceptionMap.put(ParagonConstants.DISPLAY_MSG, NoticeMessageUtil.getBindMessage(paragonException.getDisplayArgs()));
					}
					code = paragonException.getDisplayCd();
				}

				if("raw".equals(ajaxType)) {
					RequestUtil.addCookie(httpRes, ParagonConstants.ERR_CD, ParagonConstants.ERR_CD_USEREXCEP);
					RequestUtil.addCookie(httpRes, ParagonConstants.ERR_CD, paragonException.getErrCd());
					RequestUtil.addCookie(httpRes, ParagonConstants.ERR_MSG,StringUtil.encodeUrlUtf8(errorMessage));
				}


			} else {
				errorMessage =NoticeMessageUtil.getMessage("MSG_COM_ERR_001",(Locale)request.getAttribute(ParagonConstants.PARAGON_LOCALE));

				if(e.getMessage().contains("DuplicateKeyException")) {
					errorMessage = "중복데이터가 존재합니다.";
					if(e.getMessage().contains("for key 'AST_SERIAL'")) {
						errorMessage = "이미 등록된 자산중에 동일한 시리얼이 존재합니다.";
					}
			    } 
				/* System Error 메세지. */
				exceptionMap.put(ParagonConstants.ERR_CD, ParagonConstants.ERR_CD_SYSEXCEP);
				exceptionMap.put(ParagonConstants.ERR_MSG, errorMessage);
				String errMsg = getExceptionMessageDetail(e);
				/**
				 * SystemException 일 경우에 exceptionNo 받아서 logging 에 남겨줌
				 */
				String excptNo = null;
				if(e.getCause() instanceof SystemException) {
					excptNo = ((SystemException)e.getCause()).getExceptionNo();
					if(LOG.isErrorEnabled()) {
						LOG.error("exceptionNo[" + excptNo + "] accepted.");
					}
				}

				//공통 ajax 스크립트에서 넘어온 경우
				if("raw".equals(ajaxType)) {
					RequestUtil.addCookie(httpRes, ParagonConstants.ERR_CD, ParagonConstants.ERR_CD_SYSEXCEP);
					RequestUtil.addCookie(httpRes, ParagonConstants.ERR_CD, Config.getString("customVariable.msgComErr001"));
					RequestUtil.addCookie(httpRes, ParagonConstants.ERR_MSG,
							StringUtil.encodeUrlUtf8(errorMessage));
				}
				code = Integer.toString(ParagonConstants.ERR_CD_SYSEXCEP);
				
				//DB insert 에러가 없도록 varchar2의 한계에 맞추어 substring 처리
				errMsg = StringUtil.substringByByteUTF8(errMsg, 4000);
				//DB insert 에러가 없도록 varchar2의 한계에 맞추어 substring 처리
				requestInfo = StringUtil.substringByByteUTF8(requestInfo, 4000);

				HashMap<String, String> logMap = new HashMap<String, String>();
				logMap.put("svrId", request.getLocalAddr());
				logMap.put("clntAddr", (String)request.getAttribute(ParagonConstants.CLIENT_IP));
				logMap.put("excptCnts", requestInfo);
				logMap.put("stackTrc", errMsg);
				logMap.put("callUri", uri);
				//ENI 모듈 추가로 인해 추적성을 위해 Exception 번호를 DB에 남겨서 ENI SMS에서 발송된 exception number 를 바탕으로
				//오류 테이블에서 찾을수 있도록 한다.
				logMap.put("excptNo", excptNo);
//				LoggingException2DB.loggingError2DB(logMap);
//				variableMap.put(ParagonConstants.BIND_MESSAGE, excptNo);
				if(LOG.isErrorEnabled()) {
					LOG.error(code + ", " + errorMessage+"\n"+ errMsg);
				}
			}


			//Pragon ajax 스크립트에서 넘어온 경우
			if(!StringUtils.isEmpty(ajaxType)) {
				
				HttpServletResponse hRes = (HttpServletResponse)response;
				
				// 
				try {
					hRes.setContentType("application/json");
					hRes.setCharacterEncoding("UTF-8");
					hRes.setStatus(ParagonConstants.ERR_CD_USEREXCEP);
					String jsonText = JsonUtil.marshallingJson(exceptionMap);
					response.getWriter().write(jsonText.toString());
				} catch(IOException e1) {
					LOG.error("Exception", e1);
				}
				

				//ParamsAndView 인경우
			} else {

				request.setAttribute("ExceptionInfo", exceptionMap);
				HttpSession session = ((HttpServletRequest)request).getSession();
				ServletContext context = session.getServletContext();
				context.getRequestDispatcher("/vt/exceptionInfo").forward(request, response);
				return;
			}
			// 다른 필터로 exception 을 던진다.
//			throw new ServletException(e);
		}
	}


}