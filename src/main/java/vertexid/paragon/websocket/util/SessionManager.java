/**
 * 
 */
package vertexid.paragon.websocket.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.socket.WebSocketSession;

import vertexid.paragon.websocket.svce.MessengerService;


public class SessionManager {

	private static Map<WebSocketSession , UserVo> loginUsers; 
	
	
	public static SessionManager getInstance() {
		loginUsers = new HashMap<WebSocketSession, UserVo>();
		MessengerService.userMake();
		MessengerService.roomMake();
		return new SessionManager();
	}

	public Map<WebSocketSession , UserVo> getLoginUsers() {
		return loginUsers;
	}
	public void add(WebSocketSession client,UserVo uv) {
		loginUsers.put(client, uv);
	}
	public void remove(WebSocketSession client) {
		loginUsers.remove(client);
	}

	public static int listSize() {
		return loginUsers.size();
	}

	public List<WebSocketSession> getClientList() {
		return new ArrayList<WebSocketSession>(loginUsers.keySet());
	}

	public UserVo getUsers(String id) {
		return loginUsers.get(id);
	}
	public UserVo getUserVo(WebSocketSession client) {
		return loginUsers.get(client);
	}
	
}
