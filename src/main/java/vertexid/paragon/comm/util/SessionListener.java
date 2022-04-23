package vertexid.paragon.comm.util;

import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import paragon.core.utility.config.Config;

public final class SessionListener implements HttpSessionListener {
	private static final Log LOG = LogFactory.getLog(SessionListener.class);
	
	public static int count;
	
	public final int sessionTime = Config.getInteger("session.timeoutSec", 1800);
	
	public static void addUser(int cnt){
		count+=cnt;
	}
//	경기도 안양시 만안구 태평로 189
	
	public static int getUserCnt(){
		if(count < 0){
			count =0;
		}
		return count;
	}
	public void sessionCreated(HttpSessionEvent hEvent) {
		HttpSession session = hEvent.getSession();
		session.setMaxInactiveInterval(sessionTime);
		session.setAttribute("Sessionlistener", new SessionUserListener());  
	}
	
	public void sessionDestroyed(HttpSessionEvent hEvent) {
		HttpSession session = hEvent.getSession();
		if(session != null){
			SessionManager.removeSession(session);
		}
	}
}
