package vertexid.paragon.comm.util;

import java.security.MessageDigest;

public class SHA256 {

	public static String encSHA256(String pwd) throws Exception{
		
		StringBuffer hexString = new StringBuffer();
		MessageDigest digest = MessageDigest.getInstance("SHA-256");
		byte[] hash = digest.digest(pwd.getBytes("UTF-8"));
		
		try{
			for (int i = 0; i < hash.length; i++) {
				String hex = Integer.toHexString(0xff & hash[i]);
				if(hex.length() == 1) hexString.append('0');
				hexString.append(hex);
			}
			//출력
		} catch(Exception ex){
			throw new RuntimeException(ex);
		}
		return hexString.toString();
	}
}