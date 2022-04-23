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
 * Kim Jin Ho         	2017. 7. 7. 			First Draft.
 */
package vertexid.paragon.comm.util;


import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;
import org.springframework.core.io.Resource;

import javapns.Push;
import javapns.communication.exceptions.CommunicationException;
import javapns.communication.exceptions.KeystoreException;
import javapns.notification.PushNotificationPayload;
import javapns.notification.PushedNotifications;
import paragon.core.paramaters.CommParams;
import paragon.core.paramaters.Params;
import paragon.core.paramaters.datatable.datarow.DataRow;
import paragon.core.utility.config.Config;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONObject;

//import de.bytefish.fcmjava.client.FcmClient;
//import de.bytefish.fcmjava.model.options.FcmMessageOptions;
//import de.bytefish.fcmjava.model.topics.Topic;
//import de.bytefish.fcmjava.requests.topic.TopicUnicastMessage;

/**
 * [설명]
 *
 * @class PushUtil.java
 * @package vertexid.paragon.comm.util
 * @author Kim Jin Ho
 * @version 1.0
 */
public class MobileUtil {
	
	private final static Log LOG = LogFactory.getLog(MobileUtil.class);
	private final static String API_URL_FCM = "https://fcm.googleapis.com/fcm/send";
	
	private static ApplicationContext appContext ;
	private static String androidKey ;
	private static String iosKey;
	private static String iosKeyPath ;
	
	private static void init()  {
		if(appContext == null){
			LOG.debug("iosKeyPath : "+Config.getString("authKeyPath.ios"));
			LOG.debug("androidKeyPath : "+Config.getString("authKeyPath.android"));
			iosKeyPath = Config.getString("authKeyPath.ios");
			androidKey = Config.getString("authKeyPath.android");
			appContext = new FileSystemXmlApplicationContext();
			Resource resource = appContext.getResource(iosKeyPath);
			
			try {
				iosKey = resource.getFile().getAbsolutePath();
				LOG.debug("push ioskey path : "+iosKey);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
	public static Params sendPush(Params notiParams){
		LOG.debug("sendPush");
		init();
		int successCnt = 0;
		int failCnt = 0;
		for(DataRow dr: notiParams.getDataTable("userDeviceArr")){ 
			String pushId =  dr.getString("PUSH_ID");
			String mobileType =  dr.getString("MOBILE_TYPE"); 
			String userId =  dr.getString("USER_ID");
			if(mobileType.equals("01") || mobileType.equals("03")){
				int cnt = sendAndMsg(notiParams , pushId);
				if(cnt > 0){
					LOG.debug("Send Push Android 성공: ["+userId+"] "+pushId);
					successCnt ++;
				}else{
					LOG.debug("Send Push Android 실패: ["+userId+"] "+pushId);
					failCnt ++;
				}
			}else if (mobileType.equals("02") || mobileType.equals("04")) {
				int cnt = sendIosMsg(notiParams, pushId);
				if(cnt > 0){
					LOG.debug("Send Push IOS 성공: ["+userId+"] "+pushId);
					successCnt ++;
				}else{
					LOG.debug("Send Push IOS 실패: ["+userId+"] "+pushId);
					failCnt ++;
				}
				
			}
		}
		
		Params outParams =  new CommParams();
		if(failCnt == 0){
			outParams.setMsgCd("MSG_COM_SUC_009");
		}else if(successCnt != 0 && failCnt != 0){
			outParams.setMsgCd("MSG_COM_SUC_020", new Object[]{successCnt,failCnt});
		}else{
			outParams.setMsgCd("MSG_COM_ERR_077");
		}
			
		LOG.debug("outParams : " + outParams);
		
		return outParams;
	}
	private static int sendAndMsg(Params notiParams, String andDeviceTokens){
		
		String authKey = androidKey; // You FCM AUTH key
        String FMCurl = API_URL_FCM;

        try {
		
        
	        URL url = new URL(FMCurl);
	        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
	
	        conn.setUseCaches(false);
	        conn.setDoInput(true);
	        conn.setDoOutput(true);
	        conn.setRequestMethod("POST");
	        conn.setRequestProperty("Authorization", "key=" + authKey);
	        conn.setRequestProperty("Content-Type", "application/json");
	
	        JSONObject json = new JSONObject();
	        JSONObject info = new JSONObject();
	        String pushMsg = notiParams.getString("PUSH_MSG");
	        info.put("body", pushMsg); // Notification body
	        info.put("sound", "default"); // Notification body
	
	        json.put("notification", info);
	        json.put("to", andDeviceTokens.trim()); // deviceID
	
	    	try(
	    			OutputStreamWriter wr = new OutputStreamWriter(conn.getOutputStream(), "UTF-8")){
	
	            wr.write(json.toString());
	            wr.flush();
	        }catch(Exception e){
	        }
	
	        if (conn.getResponseCode() != HttpURLConnection.HTTP_OK) {
	            throw new RuntimeException("Failed : HTTP error code : " + conn.getResponseCode());
	        }
	
	        BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));
	
	        String output;
	        System.out.println("Output from Server .... \n");
	        while ((output = br.readLine()) != null) {
	            System.out.println(output);
	            System.out.println(conn.getResponseCode());
	        }
	
	        conn.disconnect();
        } catch (Exception e1) {
			e1.printStackTrace();
		}
		return 1;
	}
	private static int sendIosMsg(Params notiParams, String iosDeviceTokens){
		

		
		String pushMsg = notiParams.getString("PUSH_MSG");
		

		PushNotificationPayload payload = PushNotificationPayload.complex();
		payload.addAlert(pushMsg);
		payload.addBadge(1);
		payload.addSound("default");

		int sendCnt = 0;

		try {
			PushedNotifications notice = Push.payload(payload, iosKey, "", true, iosDeviceTokens);
			sendCnt = notice.getSuccessfulNotifications().size();

		} catch (CommunicationException e) {
			e.printStackTrace();
		} catch (KeystoreException e) {
			e.printStackTrace();
		}
		return sendCnt;
		
	}
	


		    // userDeviceIdKey is the device id you will query from your database

    public static void pushFCMNotification(String andDeviceTokens) 
            throws Exception {
        String authKey = androidKey; // You FCM AUTH key
        String FMCurl = API_URL_FCM;

        URL url = new URL(FMCurl);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();

        conn.setUseCaches(false);
        conn.setDoInput(true);
        conn.setDoOutput(true);
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Authorization", "key=" + authKey);
        conn.setRequestProperty("Content-Type", "application/json");

        JSONObject json = new JSONObject();
        JSONObject info = new JSONObject();

        info.put("body", "푸123123123쉬 발송 테스트 입니다."); // Notification body
        info.put("sound", "default"); // Notification body
        json.put("notification", info);
        json.put("to", andDeviceTokens.trim()); // deviceID

    	try(
    			OutputStreamWriter wr = new OutputStreamWriter(conn.getOutputStream(), "UTF-8")){

            wr.write(json.toString());
            wr.flush();
        }catch(Exception e){
        }

        if (conn.getResponseCode() != HttpURLConnection.HTTP_OK) {
            throw new RuntimeException("Failed : HTTP error code : " + conn.getResponseCode());
        }

        BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

        String output;
        System.out.println("Output from Server .... \n");
        while ((output = br.readLine()) != null) {
            System.out.println(output);
            System.out.println(conn.getResponseCode());
        }

        conn.disconnect();
    }



	
	public static void main(String[] args) throws Exception{
		
		 try{
			 MobileUtil.pushFCMNotification("dOswNo1WZI0:APA91bE5u__MhRxnXPHfj5n9OToBi2GNYDFmj0Bha13UZAjnQFLzzWuX3hkm5Sf9e56QhYSbUoVYCc7SP9evsBiDXkxOkybDSfjACh-xepyNR9Kgx2WKVVf8QmINtBpm25bPFij5vR2E");
	        }catch(Exception e){
	            e.printStackTrace();
	        }
//		final String registrationIdForTest = EnvironmentVariableManager.getEnvironmentVariable("e3K0VuulACM:APA91bHUaZbNSVLlxlGrVzvZ1tn3Z6JXomp7Q0");
//		DownstreamHttpNotification downstreamHttpNotificationAndroid =
//				  DownstreamHttpNotificationAndroid.builder()
//				    .setTitle("Hello")
//				    .setBody("This is test notification.")
//				    .build();
//
//				DownstreamHttpMessages downstreamHttpMessages =
//				  new DownstreamHttpMessages("e3K0VuulACM:APA91bHUaZbNSVLlxlGrVzvZ1tn3Z6JXomp7Q0", null)
//				    .setContentAvailable(true)
//				    .setNotification(downstreamHttpNotificationAndroid)
//				    .setData(new DownstreamHttpDataTest("Jason", "100"))
//				    .setDryRun(false);
//
//				FcmSender fcmSender = new FcmSender("AIzaSyDVYW0g_MZkG8dUXmN3VCoNAeFKgIKV4j0");
//				try {
//					DownstreamHttpResponse downstreamHttpResponse = fcmSender.sendNotification(downstreamHttpMessages);
//				} catch (Exception e) { 
//					// TODO Auto-generated catch block
//					e.printStackTrace();
//				}
	}
} 
