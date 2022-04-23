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
 * "Kim Jin Ho"         	2017. 11. 23. 			First Draft.
 */
package vertexid.paragon.comm.util;

import java.util.Date;
import java.util.Properties;

import javax.mail.Address;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.SendFailedException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import paragon.core.utility.config.Config;

/**
 * [설명]
 * 메일 전송 Utils
 * @class SendMailUtils.java
 * @package vertexid.paragon.comm.util
 * @author "Shin Dong Cheol"
 * @version 1.0
 */
public class SendMailUtils {

	private static final Log LOG = LogFactory.getLog(SendMailUtils.class);
	
	
	/**
	 * 
	 * [설명] 
	 * SMPT 메일 전송 API(1건)
	 * @Author "Shin Dong Cheol"
	 * @Date 2017. 11. 24.
	 * 
	 * @param receiver : 받는 사람
	 * @param sender : 보내는 사람
	 * @param subject : 제목
	 * @param body : 메일 내용
	 */	
	public static void sendEmail(final String receiver, final String sender, final String subject, final String body) {
		
		Thread t = new Thread(new Runnable() {			
			@Override
			public void run() {
				// TODO Auto-generated method stub
				Session session;
				Properties prop = System.getProperties();
//				String ldccMail = Config.getString("operation.ldccMail");
//				if(ldccMail != null && ldccMail.toLowerCase().equals("true")) {
					prop.put("mail.smtp.host", Config.getString("sendMail.ldccHost"));
					prop.put("mail.smtp.port", Config.getString("sendMail.ldccPort"));
					session = Session.getInstance(prop, null);
//				}
//				else {
//					prop.put("mail.smtp.host", Config.getString("sendMail.firichHost"));
//					prop.put("mail.smtp.port", Config.getString("sendMail.firichPort"));
//					prop.put("mail.smtp.auth", "true");
//					session = Session.getDefaultInstance(prop,
//							new javax.mail.Authenticator() {
//								protected PasswordAuthentication getPasswordAuthentication() {
//									return new PasswordAuthentication("fecservice@firich.co.kr","비밀번호");
//								}
//							});
//				}
				MimeMessage msg = new MimeMessage(session);
				//SET Message Header
				try {
					msg.addHeader("Content-type", "text/html; charset=UTF-8");
					msg.addHeader("format", "flowed");
					msg.addHeader("Content-Transfer-Encoding", "8bit");
					
					msg.setFrom(new InternetAddress(sender.trim()));
					
					msg.setSubject(subject, "UTF-8");
					msg.setContent(body, "text/html; charset=UTF-8");
					
					msg.setSentDate(new Date());
					
					msg.addRecipient(Message.RecipientType.TO, new InternetAddress(receiver));
//					msg.setRecipients(Message.RecipientType.TO, new InternetAddress(receiver));		//여러 email을 전송 할 때 필요!
					
					LOG.debug("Message is Ready!");
					
					Transport.send(msg);
					
					LOG.debug("Message Send OK");
				} catch (MessagingException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
					if (e instanceof SendFailedException) {
						SendFailedException sfex = (SendFailedException)e;
						Address[] invalidAddress = sfex.getInvalidAddresses();
						if (invalidAddress != null) {
							for (int i = 0; i < invalidAddress.length; i++){
								LOG.debug("Invalid Address "+i+" ["+invalidAddress[i]+"]");
							}
						}
					}
				}
			}
		});
		t.start();
	}
	
	public static void sendEmail(String toEmail, String subject, String body) {
		sendEmail(toEmail, Config.getString("sendMail.user"), subject, body);
	}

}
