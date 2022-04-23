package vertexid.paragon.settings.svce;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Service;

import paragon.core.exception.ParagonException;
import paragon.core.mvc.stereotype.ParagonService;
import paragon.core.paramaters.CommParams;
import paragon.core.paramaters.Params;
import paragon.core.paramaters.ParamsFactory;
import paragon.core.paramaters.datatable.DataTable;
import paragon.core.paramaters.datatable.datarow.DataRow;
import paragon.core.utility.config.Config;
import vertexid.paragon.comm.util.CommUtil;
import vertexid.paragon.comm.util.SHA256;
import vertexid.paragon.comm.util.SendMailUtils;

@Service
public class UserService extends ParagonService {
	
	private static final Log LOG = LogFactory.getLog(UserService.class);
	
	public Params getLdccListUser(Params inParams) {
		return getSqlManager().selectGridParams("UserService.getListLdccUser", inParams);
	}
	public Params getUserNameList(Params inParams) {
		return getSqlManager().selectGridParams("UserService.getUserNameList",inParams);
	}
	public Params getUserInfo(Params inParams) {
		return getSqlManager().selectParams("data", "UserService.getUserInfo", inParams);
	}
	/**
	 * 
	 * [설명] 사번 중복체크
	 * 
	 * @Author "-"
	 * @Date 2017. 11. 10.
	 */
	public Params getCheckUserNo(Params inParams){
		
		LOG.debug("UserService getCheckUserNo()");
		LOG.debug("UserService getCheckUserNo()" + inParams);
		int nReturn = 0;
		
		Params outParams = getSqlManager().selectOneParams("UserService.getCheckUserNo", inParams); 
		Params outUserIdParams = getSqlManager().selectOneParams("UserService.getCheckUserId", inParams);
		
		if(outParams.getParam("USER_NO") != null && outUserIdParams.getParam("USER_ID") != null){
			nReturn = 3;
		} else {
			if(outParams.getParam("USER_NO") != null){
				nReturn = 1;
			}
			
			if(outUserIdParams.getParam("USER_ID") != null){
				nReturn = 2;
			}
		}
			
		inParams.setParam("result", nReturn);
		
		return inParams;
	}
	/**
	 * 
	 * [설명] 아이디중복체크
	 * 
	 * @Author "-"
	 * @Date 2017. 11. 10.
	 */
	public Params getCheckUserId(Params inParams){
		LOG.debug("UserService getCheckUserId()");

		Params outParams = getSqlManager().selectOneParams("UserService.getCheckUserId", inParams); 
	
		if(outParams.getParam("USER_ID") != null){
			inParams.setParam("result", 1);
		}
		
		return inParams;
	}
	public Params saveLdccUser(Params inParams) {

		Params outParams = ParamsFactory.createOutParams(inParams);
		int cnt = getSqlManager().insert("UserService.insertLdccUser",inParams);

		if ( cnt < 1) {
			outParams.setMsgCd("MSG_COM_ERR_015");
			outParams.setStsCd(200);
		} else {
			outParams.setMsgCd("MSG_COM_SUC_003");
			outParams.setStsCd(100);
		}
		
		return outParams; 
	}
	public Params updateLdccUser(Params inParams){
		Params outParams = ParamsFactory.createOutParams(inParams);
		
		String modFlag = inParams.getStrParam("modFlag");
		String authFlag = inParams.getStrParam("authFlag");
		int cnt = 0;
		if(modFlag.equals("INSERT")){
			cnt = getSqlManager().insert("UserService.insertLdccUser",inParams);
		}else if(modFlag.equals("UPDATE")){
			cnt = getSqlManager().update("UserService.updateUser",inParams);
		}
		
		if(authFlag != null){
			if(authFlag.equals("INSERT")){
				getSqlManager().update("UserService.insertLdccUserAuth",inParams);
			}else if(authFlag.equals("UPDATE")){
				getSqlManager().update("UserService.updateLdccUserAuth",inParams);
			}else if(authFlag.equals("DELETE")){
				getSqlManager().delete("UserService.deleteLdccUserAuth",inParams);
			}
		}

		
		if ( cnt < 1) {
			outParams.setMsgCd("MSG_COM_ERR_015");
			outParams.setStsCd(200);
		} else {
			outParams.setMsgCd("MSG_COM_SUC_003");
			outParams.setStsCd(100);
		}
		
		return outParams;
	}
	/**
	 * 
	 * [설명] 사용자정보 삭제 
	 * 
	 * @Author "Kim Seon Ho"
	 * @Date 2017. 11. 10.
	 */
	public Params deleteUser(Params inParams){
		Params outParams = ParamsFactory.createOutParams(inParams);
		int cnt = getSqlManager().update("UserService.deleteUser",inParams);
		
		if ( cnt < 1) {
			outParams.setMsgCd("MSG_COM_ERR_072");
			outParams.setStsCd(200);
		} else {
			outParams.setMsgCd("MSG_COM_SUC_006");
			outParams.setStsCd(100);
		}
		
		return outParams; 
	}
	public Params getModifyUserDetail(Params inParams){
		return getSqlManager().selectParams("UserService.getModifyUserDetail", inParams);
	}
	/**
	 * 
	 * [설명] 고객사 사용자 관리, 사용자 GRID 리스트 조회
	 * 
	 * @Author "Kim Seon Ho"
	 * @Date 2017. 11. 8.
	 */
	public Params getListCustomer(Params inParams) {
		return getSqlManager().selectGridParams("UserService.getListCustomer", inParams);
	}
	/**
	 * 
	 * [설명] 고객사 사용자 관리, 사용자 등록 저장
	 * 
	 * @Author "Kim Seon Ho"
	 * @Date 2017. 11. 8.
	 */
	public Params saveCustomer(Params inParams) {
		Params outParams = ParamsFactory.createOutParams(inParams);
		
		int cnt = getSqlManager().insert("UserService.insertCustomer",inParams);
		
		if ( cnt < 1) {
			outParams.setMsgCd("MSG_COM_ERR_015");
			outParams.setStsCd(200);
		} else {
			outParams.setMsgCd("MSG_COM_SUC_003");
			outParams.setStsCd(100);
		}
		
		return outParams; 
	}
	/**
	 * 
	 * [설명] 파트너 수정 팝업 수정
	 * 
	 * @Author "Kim Seon Ho"
	 * @Date 2017. 11. 13.
	 */
	public Params updateCustomerUser(Params inParams){
		Params outParams = ParamsFactory.createOutParams(inParams);

		String modFlag = inParams.getStrParam("modFlag");
		String authFlag = inParams.getStrParam("authFlag");
		int cnt = 0;
		if(modFlag.equals("INSERT")){
			cnt = getSqlManager().insert("UserService.insertCustomerUser",inParams);
		}else if(modFlag.equals("UPDATE")){
			cnt = getSqlManager().update("UserService.updateUser",inParams);
		}
		
//		if(authFlag != null){
//			if(authFlag.equals("INSERT")){
//				getSqlManager().update("UserService.insertLdccUserAuth",inParams);
//			}else if(authFlag.equals("UPDATE")){
//				getSqlManager().update("UserService.updateLdccUserAuth",inParams);
//			}else if(authFlag.equals("DELETE")){
//				getSqlManager().delete("UserService.deleteLdccUserAuth",inParams);
//			}
//		}
		
		if ( cnt < 1) {
			outParams.setMsgCd("MSG_COM_ERR_015");
			outParams.setStsCd(200);
		} else {
			outParams.setMsgCd("MSG_COM_SUC_003");
			outParams.setStsCd(100);
		}
		
		return outParams;
	}	
	/**
	 * 
	 * [설명] 파트서 사용자 관리, 사용자 등록 저장
	 * 
	 * @Author "Kim Seon Ho"
	 * @Date 2017. 11. 8.
	 */
	public Params savePartner(Params inParams) {
		Params outParams = ParamsFactory.createOutParams(inParams);
		
		int cnt = getSqlManager().insert("UserService.insertPartner",inParams);
		
		if ( cnt < 1) {
			outParams.setMsgCd("MSG_COM_ERR_015");
			outParams.setStsCd(200);
		} else {
			outParams.setMsgCd("MSG_COM_SUC_003");
			outParams.setStsCd(100);
		}
		
		return outParams; 
	}	
	/**
	 * 
	 * [설명] 파트너사 사용자 관리, 사용자 GRID 리스트 조회
	 * 
	 * @Author "Kim Seon Ho"
	 * @Date 2017. 11. 8.
	 */
	public Params getListPartner(Params inParams) {
		return getSqlManager().selectGridParams("UserService.getListPartner", inParams);
	}
		
	/**
	 * [설명]
	 * 파트너사 리스트 [value/name]
	 * @Author 김선호
	 * @Date 2017. 4. 07.
	*/
	public Params getStndPartnerAspCompCdList(Params inParams) {
		LOG.debug("getStndPartnerAspCompCdList : ");
		return getSqlManager().selectGridParams("UserService.getStndPartnerAspCompCdList",inParams);
	}	
	/**
	 * 
	 * [설명] 파트너 수정 팝업 수정
	 * 
	 * @Author "Kim Seon Ho"
	 * @Date 2017. 11. 13.
	 */
	public Params updatePartnerUser(Params inParams){
		Params outParams = ParamsFactory.createOutParams(inParams);

		String modFlag = inParams.getStrParam("modFlag");
		String authFlag = inParams.getStrParam("authFlag");
		int cnt = 0;
		if(modFlag.equals("INSERT")){
			cnt = getSqlManager().insert("UserService.insertPartnerUser",inParams);
		}else if(modFlag.equals("UPDATE")){
			cnt = getSqlManager().update("UserService.updateUser",inParams);
		}
		
		if(authFlag != null){
			if(authFlag.equals("INSERT")){
				getSqlManager().update("UserService.insertPartnerUserAuth",inParams);
			}else if(authFlag.equals("UPDATE")){
				getSqlManager().update("UserService.updatePartnerUserAuth",inParams);
			}else if(authFlag.equals("DELETE")){
				getSqlManager().delete("UserService.deleteLdccUserAuth",inParams);
			}
		}

		
		if ( cnt < 1) {
			outParams.setMsgCd("MSG_COM_ERR_015");
			outParams.setStsCd(200);
		} else {
			outParams.setMsgCd("MSG_COM_SUC_003");
			outParams.setStsCd(100);
		}
		
		return outParams;
	}
	/**
	 * [설명]
	 * 파트너 부서 리스트 [value/name]
	 * @Author 김선호
	 * @Date 2017. 4. 07.
	*/
	public Params getStndUserAreaNmList(Params inParams) {
		LOG.debug("getStndUserAreaNmList : ");
		return getSqlManager().selectGridParams("UserService.getStndUserAreaNmList",inParams);
	}	
	/**
	 * 
	 * [설명] 사용자관리, 임시비밀번호 부여
	 * 
	 * @Author "Kim Seon Ho"
	 * @Date 2017. 11. 9.
	 */
	public Params updateUserTempPwd(Params inParams) throws Exception {
		Params outParams = ParamsFactory.createOutParams(inParams);
		Params params = getSqlManager().selectOneParams("UserService.getUserInfo",inParams);
		
		String tempPwd = CommUtil.createTempPassword(params);
		inParams.setParam("tempPwd", SHA256.encSHA256(tempPwd));
		
		int cnt = getSqlManager().update("UserService.updateUserTempPwd",inParams);
		outParams.setParam("userName", params.getString("USER_NM")); 
		outParams.setParam("userEmail", params.getString("USER_EMAIL")); 
		outParams.setParam("cnt", cnt);

		SendMailUtils.sendEmail(params.getString("USER_EMAIL"), "[롯데정보통신 POS 유지보수시스템] 임시비밀번호가 발부 되었습니다. (유효기간 7일)"
				,params.getString("USER_NM")+"님 [롯데정보통신 POS 유지보수시스템] 의 임시비밀번호가 발부되어 해당 비밀번호로만 로그인이 가능하십니다. (임시비밀번호 유효기간 7일)</br></br>임시비밀번호 : "
						+tempPwd+"</br></br>로그인 후 반드시 비밀번호를 변경하셔야지만 정상적인 서비스를 이용하실수 있습니다.</br></br><a href='"+Config.getString("sendMail.linkUrl")+"'>로그인 하러가기</a>");
		
		return outParams;
	}
	/**
	 * 
	 * [설명] 사용자 관리[공통], 사용자 등록 저장
	 * 
	 * @Author "-"
	 * @Date 2017. 11. 8.
	 */
	public Params getUserInfoView(Params inParams) {
		return getSqlManager().selectParams("data", "UserService.getUserInfoView", inParams);
	}
	
	
	public Params getUserMyInfoView(Params inParams) {
		LOG.debug("inParams : " + inParams);
		return getSqlManager().selectOneParams("UserService.getUserMyInfoView", inParams);
	}
	
	
	public Params saveMyInfo(Params inParams) {
		Params outParams = ParamsFactory.createOutParams(inParams);
		
		int cnt = getSqlManager().update("UserService.saveMyInfo",inParams);
		if ( cnt < 1) {
			outParams.setMsgCd("MSG_COM_ERR_015");
			outParams.setStsCd(200);
		} else {
			outParams.setMsgCd("MSG_COM_SUC_003");
			outParams.setStsCd(100);
		}
		return outParams;
	}
	public Params savePassword(Params inParams) {
		Params outParams = ParamsFactory.createOutParams(inParams);
		
		String userNewPwd ;
		
		try {
			String userPwd = inParams.getString("userPwd");
			userNewPwd = inParams.getString("userNewPwd");
			inParams.setParam("userPwd", SHA256.encSHA256(userPwd));
			inParams.setParam("userNewPwd", SHA256.encSHA256(userNewPwd));
		} catch (Exception e) {
			// 현재비번과 신규비번 동일Msg
			throw new ParagonException("MSG_COM_ERR_015");
		}
		
		Params params = getSqlManager().selectOneParams("UserService.getPwdCheck",inParams);
		if(params != null){
			inParams.setParam("userId", params.getString("USER_ID"));
			inParams.setParam("userPhone", params.getString("USER_PHONE"));
			inParams.setParam("userEmail", params.getString("USER_EMAIL"));
			
			try {
				CommUtil.validatePassword(inParams, userNewPwd);
			} catch (Exception e) {
				throw (ParagonException)e;
			}
			
			String currPwd = params.getString("USER_PWD");
			if(currPwd.equals(inParams.getString("userNewPwd"))){
				outParams.setStsCd(200);
				outParams.setMsgCd("MSG_COM_ERR_038");
			}else{
				int cnt = getSqlManager().update("UserService.savePassword",inParams);
				if ( cnt < 1) {
					outParams.setMsgCd("MSG_COM_ERR_015");
					outParams.setStsCd(200);
				} else {
					//변경처리 완료
					outParams.setMsgCd("MSG_COM_SUC_008");
					outParams.setStsCd(100);
				}
			}
		}else{
			// 현재비번 다름Msg
			outParams.setStsCd(200);
			outParams.setMsgCd("MSG_COM_ERR_074");
		}
		return outParams;
	}
	public Params saveMobile(Params inParams) {
		Params outParams = ParamsFactory.createOutParams(inParams);
		int cnt = 0;
		for(DataRow dr: inParams.getDataTable("dt_mobile")){
			String modFlag = dr.getString("modFlag");
			dr.setParam("s_userId", inParams.getParam("s_userId"));
			dr.setParam("s_userNo", inParams.getParam("s_userNo"));
//			String mobileLocSendYn = (String) dr.getParam("mobileLocSendYn");
//			
//			if(mobileLocSendYn.equals("Y")){
//				getSqlManager().update("UserService.updateMobileSendAllN",dr);
//			}
			
			
			if(modFlag.equals("INSERT")){
				cnt +=  getSqlManager().insert("UserService.insertMobile",dr);
			}else if(modFlag.equals("UPDATE")){
				cnt +=  getSqlManager().update("UserService.updateMobile",dr);
			}else if(modFlag.equals("DELETE")){
				cnt +=  getSqlManager().delete("UserService.deleteMobile",dr);
			}
		}
		outParams.setMsgCd("MSG_COM_SUC_007", new Object[]{cnt});
		return outParams;
	}
	/**
	 * 모바일키 생성
	 * 
	 * @Author Kim Jin Ho
	 * @Date 2017. 6. 9.
	*/
	public Params makeMobileKey(Params inParams) {
		return getSqlManager().selectOneParams("UserService.getNewMobileKey",inParams);
	}
	/**
	 * 개인정보관리 모바일인증목록
	 * 
	 * @Author Kim Jin Ho
	 * @Date 2017. 6. 9.
	*/
	public Params getMyMobileList(Params inParams) {
		return getSqlManager().selectGridParams("UserService.getMyMobileList", inParams);
	}
	/**
	 * 모바일 인증 시도
	 * 
	 * @Author Kim Jin Ho
	 * @Date 2017. 6. 9.
	*/
	public Params mobileAuthCheck(Params inParams) {
		Params outParams =  ParamsFactory.createOutParams(inParams);
		int mobileCheck = getSqlManager().selectOne("UserService.getMobileAuthCheck", inParams);
		outParams.setParam("locUri",Config.getString("location.uri"));
		outParams.setParam("locTime",Config.getString("location.interval"));
		outParams.setParam("locYn","Y");
		if(mobileCheck > 0 ){
			int upCnt = getSqlManager().update("UserService.updateMobileAuthCheck", inParams);
			
			if(upCnt > 0 ){
				//인증성공
				outParams.setMsgCd("MSG_COM_SUC_019");
			}else{
				//인증실패
				outParams.setStsCd(200);
				outParams.setMsgCd("MSG_COM_ERR_075");
			}
		}else{
			//아이디또는 잘못된 인증코드
			outParams.setStsCd(200);
			outParams.setMsgCd("MSG_COM_ERR_076");
		}
		return outParams;
	}
	/**
	 * 모바일 위치정보 등록 
	 * 
	 * @Author Kim Jin Ho
	 * @Date 2017. 6. 13.
	*/
	public Params saveMobileLocation(Params inParams) {
		Params outParams =  ParamsFactory.createOutParams(inParams);
		outParams.setParam("locUri",Config.getString("location.uri"));
		outParams.setParam("locTime",Config.getString("location.interval"));
		outParams.setParam("locYn","Y");
		int cnt = getSqlManager().update("UserService.updateMobileLocationLast", inParams);
//		if(cnt > 0 ){
			int insertCnt = getSqlManager().insert("UserService.insertMobileLocation", inParams);
			if(insertCnt > 0 ){
				LOG.debug("모바일 위치정보 등록 : "+inParams.getParam("userId")+ " 좌표(lat/lng) : "+inParams.getParam("lat")+" / "+inParams.getParam("lng"));
			}else{
				LOG.debug("모바일 위치정보 등록 실패: "+inParams.getParam("userId")+ " 좌표(lat/lng) : "+inParams.getParam("lat")+" / "+inParams.getParam("lng"));
			}
			outParams.setMsgCd("MSG_COM_SUC_019");
//		}
		return outParams;
	}
	/**
	 * [설명] 
	 * 
	 * @Author Kim Jin Ho
	 * @Date 2017. 6. 21.
	*/
	public Params updateMobile(Params inParams) {
		Params outParams = ParamsFactory.createOutParams(inParams);
		int cnt = 0;
			
		cnt = getSqlManager().update("UserService.updateMobileSendAllN",inParams);
		if(cnt > 0){
			cnt =  getSqlManager().update("UserService.updateMobileSend",inParams);
		}
			
			
		outParams.setMsgCd("MSG_COM_SUC_007", new Object[]{cnt});
		return outParams;
	}
	
	/**
	 * 
	 * [설명] 사용자관리, 임시비밀번호 부여
	 * 
	 * @Author Kim Mu Hyun
	 * @Date 2017. 12. 18.
	 */
	public Params createTempPwd() throws Exception {
		Params outParams = new CommParams();
		Params params = getSqlManager().selectParams("UserService.getInstUser", outParams);
		
		DataTable dt = params.getDataTable();
		for (int i = 0; i < dt.size(); i++) {
			DataRow dr = dt.getRow(i);
			Params inParams = new CommParams(dr);
			String tempPwd = CommUtil.createTempPassword(inParams);
			inParams.setParam("tempPwd", SHA256.encSHA256(tempPwd));
			inParams.setParam("userSeq", dr.getString("USER_SEQ"));
			
			int cnt = getSqlManager().update("UserService.updateUserTempPwd",inParams);
			LOG.debug("--- createTempPwd : "+cnt+" / "+inParams);

			SendMailUtils.sendEmail(dr.getString("USER_EMAIL"), "[롯데정보통신 POS 유지보수시스템] 임시비밀번호가 발부 되었습니다. (유효기간 7일)"
					,dr.getString("USER_NM")+"님 [롯데정보통신 POS 유지보수시스템] 의 임시비밀번호가 발부되어 해당 비밀번호로만 로그인이 가능하십니다. (임시비밀번호 유효기간 7일)</br></br>임시비밀번호 : "
							+tempPwd+"</br></br>로그인 후 반드시 비밀번호를 변경하셔야지만 정상적인 서비스를 이용하실수 있습니다.</br></br><a href='"+Config.getString("sendMail.linkUrl")+"'>로그인 하러가기</a>");
		}
		outParams.setParam("cnt", dt.size());
		
		return outParams;
	}

	/**
	 * 
	 * [설명] LDCC사용자 권한콤보박스
	 * 
	 * @Author Kim SeonHo
	 * @Date 2018. 01. 08.
	 */
	public DataTable ldccUserAuthCombo(Params inParams) throws Exception {
		LOG.debug("아하"+inParams);
		return getSqlManager().selectDataTable("UserService.ldccUserAuthCombo", inParams);
	}
	
	/**
	 * 
	 * [설명] 파트너사용자 권한콤보박스
	 * 
	 * @Author Kim SeonHo
	 * @Date 2018. 01. 08.
	 */
	public DataTable partnerUserAuthCombo(Params inParams) throws Exception {
		return getSqlManager().selectDataTable("UserService.partnerUserAuthCombo", inParams);
	}
	
	/**
	 * [마지막 로그인 한지 30일 지난 유저 휴면 처리] 
	 * 
	 * @Author "Han Seong Jin"
	 * @Date 2018. 1. 26.
	*/
	public void updateUserBlock(){
		getSqlManager().update("UserService.updateUserBlock");
	}
	
}