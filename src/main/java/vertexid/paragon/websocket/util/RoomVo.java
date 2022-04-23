package vertexid.paragon.websocket.util;

import java.util.Arrays;

public class RoomVo {
	private String roomNm;
	private String roomId;
	private String lastChat;
	private String[] users;
	
	
	public String getRoomNm() {
		return roomNm;
	}
	public void setRoomNm(String roomNm) {
		this.roomNm = roomNm;
	}
	public String getRoomId() {
		return roomId;
	}
	public void setRoomId(String roomId) {
		this.roomId = roomId;
	}
	public String getLastChat() {
		return lastChat;
	}
	public void setLastChat(String lastChat) {
		this.lastChat = lastChat;
	}
	public String[] getUsers() {
		return users;
	}
	public void setUsers(String[] users) {
		this.users = users;
	}
	@Override
	public String toString() {
		return "RoomVo [roomNm=" + roomNm + ", roomId=" + roomId + ", lastChat=" + lastChat + ", users="
				+ Arrays.toString(users) + "]";
	}
	
	
}
