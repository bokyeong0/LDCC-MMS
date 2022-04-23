package vertexid.paragon.websocket.util;

public class DataBox {
	private int protocol;
	private int state;	
	private String state_message;
	private String message;
	private String id;
	private String name;
	private String date;
	private String pw;
	private Object data;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public int getProtocol() {
		return protocol;
	}
	public void setProtocol(int protocol) {
		this.protocol = protocol;
	}
	public int getState() {
		return state;
	}
	public void setState(int state) {
		this.state = state;
	}
	public String getState_message() {
		return state_message;
	}
	public void setState_message(String state_message) {
		this.state_message = state_message;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public Object getData() {
		return data;
	}
	public void setData(Object data) {
		this.data = data;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getPw() {
		return pw;
	}
	public void setPw(String pw) {
		this.pw = pw;
	}
	@Override
	public String toString() {
		return "DataBox [protocol=" + protocol + ", state=" + state + ", state_message=" + state_message + ", message="
				+ message + ", id=" + id + ", pw=" + pw + ", data=" + data + "]";
	}
	
}
