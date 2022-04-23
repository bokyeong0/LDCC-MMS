/**
 * Copyright (c) 2017 VertexID RND, Inc.
 * All right reserved.
 *
 * This software is the confidential and proprietary information of VertexID, Inc.
 * You shall not disclose such Confidential Information and
 * shall use it only in accordance with the terms of the license agreement
 * you entered into with VertexID.
 *
 * Revision History
 * Author              		Date       		Description
 * ------------------   --------------    ------------------
 * "Kim Jin Ho"         	2017. 11. 14. 			First Draft.
 */
package vertexid.paragon.comm.util;

import java.util.concurrent.ConcurrentHashMap;

import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;


/**
 * [설명]
 *
 * @class SessionManager.java
 * @package vertexid.paragon.comm.util
 * @author "Kim Jin Ho"
 * @version 1.0
 */
public class SessionManager {
	private static final Log LOG = LogFactory.getLog(SessionManager.class);
	
	private static SessionManager sessionManager = null;
	
	private static ConcurrentHashMap<String, HttpSession> loginUsers; 
	
	private synchronized static SessionManager getInstance() {
		if(sessionManager == null) {
			sessionManager = new SessionManager();
			loginUsers = new ConcurrentHashMap<String, HttpSession>();
		}
		
		return sessionManager;
	}
	
	private ConcurrentHashMap<String, HttpSession> getLoginUsers() {
		return loginUsers;
	}
	
	public static void addUser(HttpSession session) {
		SessionManager sm = getInstance();
		String userId = (String)session.getAttribute("s_userId");
		if(userId != null) {
			LOG.debug("--LOGINUSER-- addUser userId : " + userId);
			if(sm.getLoginUsers().containsKey(userId)) {
				LOG.debug("--LOGINUSER-- blockExistSession userId : " + userId);
				HttpSession se = sm.getLoginUsers().get(userId);
				if(se != null) {
					getInstance().getLoginUsers().remove(userId);
					se.setAttribute("s_blocked", true);
					// 
					//session.invalidate();
					session.setAttribute("s_multiLogin", true);
					session.setAttribute("s_blockedIp", se.getAttribute("s_connectIp"));
				}
			}
			sm.getLoginUsers().put(userId, session);
		}
	}
	
	public static void removeSession(HttpSession session) {
		SessionManager sm = getInstance();
		for (String key : sm.getLoginUsers().keySet()) {
			HttpSession se = sm.getLoginUsers().get(key);
			if(se == session) {
				// 새로운 세션으로 덮어썼다면 없을수도..
				boolean ret = sm.getLoginUsers().remove(key, session);
				LOG.debug("--LOGINUSER-- removeSession userId : " + key + ", remove : " + ret);
				break;
			}
		}
	}
	
	
}
