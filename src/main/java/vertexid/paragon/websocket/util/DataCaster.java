package vertexid.paragon.websocket.util;

import org.springframework.web.socket.TextMessage;

import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;

public class DataCaster  {
	 
	public static DataBox parseDataBox( TextMessage message){
		String data = message.getPayload();
		System.out.println("data : "+ data);
		JSONObject jsonObj = JSONObject.fromObject(data);
		System.out.println("jsonObj : " + jsonObj);
		DataBox mb = new DataBox(); 
		mb.setProtocol(jsonObj.getInt("protocol"));
		mb.setState(jsonObj.getInt("state"));
		mb.setState_message(jsonObj.get("state_message").toString());
		mb.setMessage(jsonObj.get("message").toString());
		mb.setId(jsonObj.get("Id").toString());
		mb.setPw(jsonObj.get("Pw").toString());
		System.out.println(mb.toString());
		return mb;
	}
	
	public static String MSGSerialize(DataBox mb){
		JSONObject jsonObj = JSONObject.fromObject(JSONSerializer.toJSON(mb));
		return jsonObj.toString();
	}
	//{protocol:"100",state:"1",state_message:"ok",message:"asdf",Id:"anaws",Pw:"111"}
}
