package vertexid.paragon.sign.svce;

import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Service;

import paragon.core.exception.ParagonException;
import paragon.core.mvc.stereotype.ParagonService;
import paragon.core.paramaters.CommParams;
import paragon.core.paramaters.Params;
import paragon.core.paramaters.ParamsFactory;
import vertexid.paragon.comm.util.CommUtil;
import vertexid.paragon.comm.util.SHA256;
import vertexid.paragon.comm.util.SessionManager;

@Service
public class LoginService extends ParagonService {
//public class MainService extends SqlSessionDaoSupport  {
	private static final Log LOG = LogFactory.getLog(LoginService.class);
	
	public Params getCheckId(Params inParams, HttpSession session){
		LOG.debug("LoginService getCheckId()");
		Params outParams;
		
		String captcha = (String)session.getAttribute("s_captcha");
		if(captcha == null || !captcha.toLowerCase().equals(inParams.getString("captcha").toLowerCase())) {
			outParams = new CommParams();
			outParams.setStsCd(103);
			outParams.setMsgCd("MSG_LGN_ERR_250");  // 보안문자가 일치하지 않습니다. 다시 입력해주세요.
		}else{
			outParams = getSqlManager().selectOneParams("LoginService.getCheckId", inParams);
			outParams.setStsCd(103);
			if(outParams.getParam("USER_ID") != null){
				// 계정 잠금 풀기 부터 ..
				int blockingSeconds = 5 * 60;
				if(outParams.getInteger("PWD_FAIL_CNT") >= 5 && outParams.getInteger("BLOCKING_TIME") >= blockingSeconds){
					getSqlManager().update("LoginService.updateFailReset",inParams);
					outParams.setParam("PWD_FAIL_CNT", 0);
				}
				
				if(outParams.getInteger("PWD_FAIL_CNT") >= 5){
					outParams.setMsgCd("MSG_LGN_ERR_270", new Object[]{Math.ceil((blockingSeconds - outParams.getInteger("BLOCKING_TIME")) / 60)}); // 비밀번호를 5번 잘못입력하여 계정이 잠겼습니다.&#10;{0}분 후 로그인이 가능합니다
				}
				else if(outParams.getString("PASSWORD_YN").equals("N")){
					getSqlManager().update("LoginService.updateLoginFail",inParams);
					outParams.setMsgCd("MSG_LGN_ERR_010"); // 아이디 또는 비밀번호가 바르지 않습니다.
				}
				else if(outParams.getString("PASSWORD_YN").equals("TY") && outParams.getInteger("TEMP_PASSWORD_DAYS") > 7){
					outParams.setMsgCd("MSG_LGN_ERR_280"); // 임시비밀번호 유효기간이 만료되었습니다. 관리팀으로 문의하시기 바랍니다.
				}
				else if(outParams.getString("AUTH_USER_YN").equals("N")){
					outParams.setMsgCd("MSG_LGN_ERR_310"); //아직 사용권한이 부여되지않은 계정입니다. 관리팀으로 문의하시기 바랍니다.
				}
				else if(outParams.getString("USE_YN").equals("N") || (!"0".equals(outParams.getString("USER_TYPE")) && outParams.getInteger("LAST_LOGIN_DAYS") > 30)){ // 운영자계정은 제외
					getSqlManager().update("LoginService.updateLoginUseN",inParams);
					outParams.setMsgCd("MSG_LGN_ERR_260"); // 장기 미사용으로 인해 휴면계정으로 전환되었습니다. 관리팀으로 문의하시기 바랍니다.
				}
				else{
					// 정상적인 로그인 성공시..
					getSqlManager().update("LoginService.updateLoginSuccess",inParams);
					if(outParams.getString("PASSWORD_YN").equals("TY")) {
						outParams.setMsgCd("MSG_LGN_ERR_290"); // 임시비밀번호로 로그인하셨습니다. 새로운 비밀번호로 변경해 주세요.
						outParams.setStsCd(104);
					}
					else if(outParams.getString("USER_TYPE").equals("0") && outParams.getInteger("PASSWORD_DAYS") > 90) { // 운영자계정은 제외
						outParams.setMsgCd("MSG_LGN_ERR_300"); // 비밀번호를 변경한지 90일이 지났습니다. 새로운 비밀번호로 변경해 주세요.
						outParams.setStsCd(104);
					}
					else {
						outParams.setStsCd(102);
					}
				}
			}else{
				outParams.setMsgCd("MSG_LGN_ERR_010"); // 아이디 또는 비밀번호가 바르지 않습니다.
			}
		}
		return outParams;
	}
	
	public Params savePassword(Params inParams, HttpSession session) {
		Params outParams = ParamsFactory.createOutParams(inParams);
		String userId = (String)session.getAttribute("s_userId");
		
		//LOG.debug("userId : "+userId);
		
		if(userId == null) {
			outParams = new CommParams();
			outParams.setStsCd(100);
			outParams.setMsgCd("MSG_LGN_ERR_120");  // 해당 사용자 정보를 조회할 수 없습니다.
		}
		
		String userNewPwd ;
		try {
			userNewPwd = inParams.getString("userNewPwd");
			inParams.setParam("userNewPwd", SHA256.encSHA256(userNewPwd));
		} catch (Exception e) {
			// 현재비번과 신규비번 동일Msg
			throw new ParagonException("MSG_COM_ERR_015");
		}
		
		Params params = getSqlManager().selectOneParams("UserService.getPwdCheck",inParams);
		if(params != null && params.get("USER_ID") != null){
			inParams.setParam("userId", params.getString("USER_ID"));
			inParams.setParam("userPhone", params.getString("USER_PHONE"));
			inParams.setParam("userEmail", params.getString("USER_EMAIL"));
			
			try {
				CommUtil.validatePassword(inParams, userNewPwd);
			} catch (Exception e) {
				throw (ParagonException)e;
			}
			
			String currPwd = params.getString("USER_PWD");
			String tempPwd = params.getString("TEMP_PWD");
//			LOG.debug("currPwd : " + currPwd);
//			LOG.debug("tempPwd : " + tempPwd);
//			LOG.debug("userNewPwd : " + inParams.getString("userNewPwd"));
			if((currPwd != null && currPwd.equals(inParams.getString("userNewPwd"))) || (tempPwd != null && tempPwd.equals(inParams.getString("userNewPwd")))){
				outParams.setStsCd(200);
				outParams.setMsgCd("MSG_COM_ERR_038"); // 새로운 비밀번호와 현재 비밀번호가 일치합니다
			}else{
				int cnt = getSqlManager().update("UserService.savePassword",inParams);
				if ( cnt < 1) {
					outParams.setStsCd(200);
					outParams.setMsgCd("MSG_COM_ERR_015"); // 저장 처리 중 오류가 발생하였습니다.
				} else {
					//변경처리 완료
					outParams.setStsCd(102);
					outParams.setMsgCd("MSG_COM_SUC_008"); // 변경이 완료되었습니다.
				}
			}
		}else{
			outParams.setStsCd(100);
			outParams.setMsgCd("MSG_LGN_ERR_120"); // 해당 사용자 정보를 조회할 수 없습니다.
		}
		return outParams;
	}
}
