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
 * "Kim Jin Ho"         	2017. 12. 12. 			First Draft.
 */
package vertexid.paragon.comm.util;

import paragon.core.utility.config.Config;

/**
 * [설명]
 *
 * @class CipherUtil.java
 * @package vertexid.paragon.comm.util
 * @author "Kim Jin Ho"
 * @version 1.0
 */
public class CipherUtil {
	//private static final Log LOG = LogFactory.getLog(CipherUtil.class);
	
	private static CipherUtil instance = null;	
	private static TEA tea = null;
	
	private static synchronized CipherUtil getInstance() {
		if(instance == null) {
			instance = new CipherUtil();
			try {
				tea = new TEA(SHA256.encSHA256(Config.getString("cipher.key")));
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		return instance;
	}
	
	private TEA getTEA() {
		return tea;
	}
	
	public static String encrypt(String plainText) {
		return getInstance().getTEA().encrypt(plainText);
	}
	
	public static String decrypt(String cipherText) {
		return getInstance().getTEA().decrypt(cipherText);
	}
}
