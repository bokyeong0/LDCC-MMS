package vertexid.paragon.comm.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import paragon.core.exception.ParagonException;
import paragon.core.paramaters.CommParams;
import paragon.core.paramaters.Params;
import vertexid.paragon.comm.ctrl.CommonController;

public class CommUtil {
	private static final Log LOG = LogFactory.getLog(CommUtil.class);
	
	public static String SysDate() {
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return simpleDateFormat.format(new Date());
	}
	public static String getBaseDe(String currDate) throws ParseException{
    	Date today = new SimpleDateFormat("yyyyMMdd").parse(currDate);
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(today);
        int dayOfWeek = calendar.get(Calendar.DAY_OF_WEEK);

        int diffCnt = 0;
        if (dayOfWeek >= 2) {
           diffCnt = 2 - dayOfWeek;
        } else {
           diffCnt = 2 - dayOfWeek - 7;
        }

        calendar.add(Calendar.DATE, diffCnt);
        Date baseDate = calendar.getTime();
        String date = new SimpleDateFormat("yyyy-MM-dd").format(baseDate);
        return date;
    }
	public static String getDataBaseDe(String currDate) throws ParseException{
		Date today = new SimpleDateFormat("yyyyMMdd").parse(currDate);
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(today);
		int dayOfWeek = calendar.get(Calendar.DAY_OF_WEEK);
		
		int diffCnt = 0;
		if (dayOfWeek >= 2) {
			diffCnt = 2 - dayOfWeek;
		} else {
			diffCnt = 2 - dayOfWeek - 7;
		}
		
		calendar.add(Calendar.DATE, diffCnt);
		Date baseDate = calendar.getTime();
		String date = new SimpleDateFormat("yyyyMMdd").format(baseDate);
		return date;
	}
    
    public static String getMonday() throws ParseException {
    	return getBaseDe(new SimpleDateFormat("yyyyMMdd").format(new Date()));
    }
    
    /**
     * 
     * [설명] 
     * 사용자(Client : Proxy, nginx Check) IP 가져오기
     * 로그인 내역, 메뉴 접속 내역에 필요한 내용
     * @Author "Shin Dong Cheol"
     * @Date 2017. 11. 22.
     */
    public static String getUserIP() {
    	
    	HttpServletRequest req = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
    	
    	String ip = req.getHeader("X-FORWARDED-FOR");
    	
    	if (ip == null) {
			ip = req.getHeader("Proxy-Client-IP");
		}
		if (ip == null) {
			ip = req.getHeader("WL-Proxy-Client-IP");
		}
		if (ip == null) {
			ip = req.getHeader("HTTP_CLIENT_IP");
		}
		if (ip == null) {
			ip = req.getHeader("HTTP_X_FORWARDED_FOR");
		}
		if (ip == null) {
			ip = req.getRemoteAddr();
		}
		
    	return ip;
    }
    
    
	public static boolean validatePassword(Params inParams, String password) throws Exception {
		//LOG.debug("======= validatePassword =========");
		//LOG.debug("password : " + password);

		if(password.length() < 8) {
        	throw new ParagonException("MSG_COM_ERR_032"); //비밀번호는 8자리 이상이어야 합니다.
        }

        if(!Pattern.compile("^.*(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&+=]).*$").matcher(password).matches()) {
        	throw new ParagonException("MSG_COM_ERR_034"); //비밀번호에는 영문, 숫자, 특수문자 외의 문자를 사용할 수 없습니다.
        }
        
    	byte[] ba = password.getBytes(); 
        for(int i=0; i < ba.length - 3; i++) {
        	if(ba[i+1] == ba[i] && ba[i+2] == ba[i] && ba[i+3] == ba[i]) {
        		throw new ParagonException("MSG_COM_ERR_036"); //비밀번호에는 4자리 이상 반복되는 문자나 숫자를 사용할 수 없습니다.
        	}
        	if(ba[i+1] == ba[i]+1 && ba[i+2] == ba[i]+2 && ba[i+3] == ba[i]+3) {
        		throw new ParagonException("MSG_COM_ERR_037"); //비밀번호에는 4자리 이상 연속된 문자나 숫자를 사용할 수 없습니다.
        	}
        	if("qwertyuiop asdfghjkl zxcvbnm".contains(new String(ba, i, 4))) {
        		throw new ParagonException("MSG_COM_ERR_081"); //비밀번호에는  4자리 이상 키보드의 연속적인 배열을 사용할 수 없습니다.
        	}
        }

        String userId = inParams.getString("userId");
		//LOG.debug("userId : " + userId);
		if(password.contains(userId)) {
        	throw new ParagonException("MSG_COM_ERR_080"); //개인정보를 포함한 비밀번호는 사용할 수 없습니다.
		}

		String userEmail = inParams.getString("userEmail");
		//LOG.debug("userEmail : " + userEmail);
		if(userEmail != null && userEmail.contains("@")) {
			String account = userEmail.split("@")[0];
			String company = userEmail.split("@")[1];
			if(company.toLowerCase().equals("mail") && userEmail.split("@").length >= 3) company = userEmail.split("@")[2];

			if(password.contains(account) || password.contains(company)) {
	        	throw new ParagonException("MSG_COM_ERR_080");
			}
		}		

		String userPhone = inParams.getString("userPhone");
		//LOG.debug("userPhone : " + userPhone);
		if(userPhone != null) {
			userPhone = userPhone.replace("-", "");
			if(userPhone.length() > 8) {
				String phone1 = userPhone.substring(userPhone.length()-8, userPhone.length()-4);
				String phone2 = userPhone.substring(userPhone.length()-4, userPhone.length());

				if(password.contains(phone1) || password.contains(phone2)) {
		        	throw new ParagonException("MSG_COM_ERR_080");
				}
			}
		}
		
		return true;
	}

	public static String createTempPassword(Params inParams) {
//		LOG.debug("======= createTempPassword =========");
		Params params = new CommParams();
		params.setParam("userId", inParams.getString("USER_ID"));
		params.setParam("userPhone", inParams.getString("USER_PHONE"));
		params.setParam("userEmail", inParams.getString("USER_EMAIL"));

//		LOG.debug("======= userId =========" + inParams.getString("USER_ID"));
//		LOG.debug("======= userPhone =========" + inParams.getString("USER_PHONE"));
//		LOG.debug("======= userEmail =========" + inParams.getString("USER_EMAIL"));

		//String sample = "!@#$%^&+=0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
		String sample = "!@#$%^&+=0123456789abcdefghijklmnopqrstuvwxyz";
		char chars[] = new char[8];
		String password;
		boolean validate = false;
		
		do {
			for(int i=0; i<8; i++) {
				chars[i] = sample.charAt((int)(Math.random() * sample.length()));
			}
			password = new String(chars);
			try {
				validate = validatePassword(params, password);
			}catch(Exception e) {
				validate = false;
			}
		}while(!validate);
		
		LOG.debug("======= createTempPassword End =========");
		//password = "1";
		return password;
	}
	

}
