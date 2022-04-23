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
 * "Kim Jin Ho"         	2017. 2. 1. 			First Draft.
 */
package vertexid.paragon.websocket.ctrl;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.web.socket.BinaryMessage;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import vertexid.paragon.websocket.svce.MessengerService;
import vertexid.paragon.websocket.util.DataBox;
import vertexid.paragon.websocket.util.DataCaster;
import vertexid.paragon.websocket.util.Message;
import vertexid.paragon.websocket.util.Protocol;
import vertexid.paragon.websocket.util.SessionManager;
import vertexid.paragon.websocket.util.UserVo;

/**
 * [설명]
 *
 * @class WebsocketController.java
 * @package vertexid.paragon.comm.ctrl
 * @author "Kim Jin Ho"
 * @version 1.0
 */
public class WebsocketController  extends TextWebSocketHandler {
	 
		private static SessionManager sm; 
		
		public WebsocketController() {
	        sm = SessionManager.getInstance(); 
	    }
		public static SessionManager SocketManager(){
			return sm;
		}
		public static void setUser(UserVo vo){
//			sm.add(client, uv);
		}
		
	    // 클라이언트 접속
	    @Override
	    public void afterConnectionEstablished(WebSocketSession myClient) throws Exception {
	        super.afterConnectionEstablished(myClient);
	        System.out.println("Session Connected");
	    }
	  
	    // 클라이언트 send
	    @Override
	    protected void handleTextMessage(WebSocketSession client, TextMessage message) throws Exception {
	    	System.out.println("client : " + client.toString());
	    	System.out.println("message :  "  + message);
//	        System.out.println("1: "+ session.getAttribute("s_userId"));
//	        System.out.println("2: "+ session.getAttribute("s_userNm"));
	    	DataBox db = DataCaster.parseDataBox(message); 
	    	int protocol = db.getProtocol();
	    	System.out.println("protocol : " + protocol);
	    	switch(protocol){
	    	case Protocol.LOGIN : {
	    		//100||김진호
	    		String id = db.getId();
	    		String pw = db.getPw();
	    		UserVo uv = checkUser( id,  pw);
	    		int state = uv.getState();
	    		System.out.println("state : " + state);
	    		db.setState(state);
	    		if(state == 1){
	    			sm.add(client, uv); 
	    			db.setData(MessengerService.getMyRoomList(id));
	    			db.setMessage(Message.LOGIN_SUCC);
	    		}else if(state == -1){
	    			db.setMessage(Message.LOGIN_ERR_ID);
	    		}else if(state == 0){
	    			db.setMessage(Message.LOGIN_ERR_PW);
	    		}
	    		String serialData = DataCaster.MSGSerialize(db);
	    		System.out.println("serialData : " + serialData);
	    		this.unicast(serialData,client);
	    	}break;
	    	case Protocol.SEND : { //100||김진호
	    		String msg = db.getMessage();
	    		this.unicast(msg,client);
	    		
	    	}break;
	    	case Protocol.NOTICE: { //400||${공지}
	    		String msg = db.getMessage();
	    		UserVo userv = sm.getUserVo(client);
	    		db.setName(userv.getName());
	    		String now = new SimpleDateFormat("yyyyMMddHHmm").format(new Date());
	    		db.setDate(now);
	    		String serialData = DataCaster.MSGSerialize(db);
	    		System.out.println("serialData : " + serialData);
	    		System.out.println("msg : " + msg);
	    		this.multicast(serialData);
	    		
	    	}break;
	    	}
	    	
	    }
	    /*
	    protected void handleTextMessageTest(WebSocketSession client, TextMessage message) throws Exception {
	        System.out.println("message :  "  + message);
//	        System.out.println("1: "+ session.getAttribute("s_userId"));
//	        System.out.println("2: "+ session.getAttribute("s_userNm"));
	        DataBox db = DataCaster.parseDataBox(message); 
			int protocol = db.getProtocol();
			System.out.println("protocol : " + protocol);
			switch(protocol){
			case Protocol.LOGIN : {
				//100||김진호
				String id = db.getId();
				String pw = db.getPw();
				UserVo uv = checkUser( id,  pw);
				int state = uv.getState();
				System.out.println("state : " + state);
				db.setState(state);
				if(state == 1){
					sm.add(client, uv); 
					db.setData(MessengerService.getMyRoomList(id));
					db.setMessage(Message.LOGIN_SUCC);
				}else if(state == -1){
					db.setMessage(Message.LOGIN_ERR_ID);
				}else if(state == 0){
					db.setMessage(Message.LOGIN_ERR_PW);
				}
				String serialData = DataCaster.MSGSerialize(db);
				System.out.println("serialData : " + serialData);
				this.unicast(serialData,client);
			}break;
			case Protocol.SEND : { //100||김진호
				String msg = db.getMessage();
				this.unicast(msg,client);
				
			}break;
			case Protocol.NOTICE: { //400||${공지}
				String msg = db.getMessage();
				UserVo userv = sm.getUserVo(client);
				db.setName(userv.getName());
				String now = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
				db.setDate(now);
				String serialData = DataCaster.MSGSerialize(db);
				System.out.println("serialData : " + serialData);
				System.out.println("msg : " + msg);
				this.multicast(serialData);
				
			}break;
			}
	        
	    }
	    */
	    /*
	    // 클라이언트 send
	    @Override
	    protected void handleTextMessage(WebSocketSession client, TextMessage message) throws Exception {
	    	String data = message.getPayload();
	    	System.out.println("클라이언트가 보낸 data : " + data);
	    	StringTokenizer st = new StringTokenizer(data, _SP_); 
	    	int protocol = Integer.parseInt(st.nextToken());
	    	switch(protocol){
	    	case Protocol.LOGIN : {
	    		//100||김진호
	    		String id = st.nextToken();
	    		String pw = st.nextToken();
	    		int state = checkUser( id,  pw);
	    		System.out.println("비밀번호 체크 : " + state);
	    		if(state == 1){
	    			System.out.println("로그인 성공!");
	    			List<RoomVo> myList = MessengerService.getMyRoomList(id);
	    			myRoomArr = JSONArray.fromObject(myList);
	    			System.out.println("jarr : "+ myRoomArr);
	    			this.unicast(Protocol.LOGIN + _SP_ + state + _SP_ +Message.LOGIN_SUCC+_SP_+myRoomArr.toString(),client);
	    		}else if(state == -1){
	    			System.out.println("아이디가 없습니다.");
	    			this.unicast(Protocol.LOGIN + _SP_ + state + _SP_ +Message.LOGIN_ERR_ID,client);
	    		}else if(state == 0){
	    			System.out.println("비밀번호가 틀렸습니다.");
	    			this.unicast(Protocol.LOGIN + _SP_ + state + _SP_ +Message.LOGIN_ERR_PW,client);
	    			
	    		}
	    	}break;
	    	case Protocol.SEND : { //100||김진호
	    		
	    		String msg = st.nextToken();
	    		System.out.println("msg : " + msg);
	    		this.unicast("접속성공",client);
	    		
	    	}break;
	    	case Protocol.NOTICE: { //100||김진호
	    		
	    		String msg = st.nextToken();
	    		System.out.println("msg : " + msg);
	    		this.multicast("접속성공");
	    		
	    	}break;
	    	}
	    	
	    }
	     */
	    @Override
	    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
	        super.afterConnectionClosed(session, status);
	        System.out.println("Closed");
	        sm.remove(session);
	    }
	    
	    @Override
	    protected void handleBinaryMessage(WebSocketSession session, BinaryMessage message) {
	    	super.handleBinaryMessage(session, message);
	    	
	    	ByteBuffer msg = message.getPayload();
	    	
	    	System.out.println("Binary message");

	        FileOutputStream fos = null;
	        File file = new File("D:/download/tmp.txt");
	        try {
	            fos = new FileOutputStream(file);
	        } catch (FileNotFoundException e) {         
	            e.printStackTrace();
	        }

	        byte readdata = (byte) -999;
	        while(readdata!=-1) {
	            readdata=msg.get();
	            try {
	                fos.write(readdata);
	            } catch (IOException e) {               
	                e.printStackTrace();
	            }
	        }
	    
	    }
	    private UserVo checkUser(String id, String pw) {
			int state = -1;
			UserVo uv =  MessengerService.getUser(id);
			if(uv != null){
				if(uv.getPw().equals(pw)){
					state = 1;
				}else{
					state = 0;
				}
			}else{
				uv = new UserVo();
			}
			uv.setState(state);
//			System.out.println("비밀번호 체크 : " + state);
			return uv;
		}
		
		private void multicast(String msg) throws Exception {
			 for (WebSocketSession targerClient : sm.getClientList()) {
				 targerClient.sendMessage(new TextMessage(msg));
	        }
		}

		private void unicast(String msg, WebSocketSession targerClient) throws Exception {
			targerClient.sendMessage(new TextMessage(msg));		
		}
	}