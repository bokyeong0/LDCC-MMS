package vertexid.paragon.comm.util;

import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionBindingEvent;
import javax.servlet.http.HttpSessionBindingListener;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import paragon.core.utility.config.Config;

/**
 * @author      : javasin
 * @date        : 2018. 7. 26.
 * @Explanation : 
 *
 */
public class SessionUserListener implements HttpSessionBindingListener {  

	private static final Log LOG = LogFactory.getLog(SessionUserListener.class);
	public final int sessionTime = Config.getInteger("session.timeoutSec", 1800);
	
	@Override
	public void valueBound(HttpSessionBindingEvent hEvent) {
		HttpSession session = hEvent.getSession();
		SessionListener.addUser(1);
//		session.setMaxInactiveInterval(1);
		LOG.debug("세션 생성[" +SessionListener.getUserCnt()+"] "+session.getId());
	}

	@Override
	public void valueUnbound(HttpSessionBindingEvent hEvent) {
		SessionListener.addUser(-1);
		HttpSession session = hEvent.getSession();
		LOG.debug("세션 종료[" +SessionListener.getUserCnt()+"] "+session.getId());
	}  
}  