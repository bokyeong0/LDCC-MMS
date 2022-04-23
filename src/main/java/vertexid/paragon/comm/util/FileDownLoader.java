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
 * "Kim Jin Ho"         	2017. 3. 24. 			First Draft.
 */
package vertexid.paragon.comm.util;

import java.io.BufferedOutputStream;
import java.io.DataInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import paragon.core.utility.config.Config;

/**
 * [설명]
 *
 * @class FileDownLoader.java
 * @package vertexid.paragon.comm.util
 * @author "Kim Jin Ho"
 * @version 1.0
 */
public class FileDownLoader {
		private static final Log LOG = LogFactory.getLog(FileDownLoader.class);
		
		private static String getBrowser(HttpServletRequest request) {
            String header =request.getHeader("User-Agent");
            
            if (header.contains("Trident")) { //IE11
                return "Trident";
            } else if(header.contains("MSIE")) { //IE8~10
                return "MSIE";                       
            } else if(header.contains("Firefox")) { //Firefox
                return "Firefox";                   
            } else if(header.contains("Chrome")) { //Chrome
                return "Chrome";
            } else if(header.contains("OPR")) { //Opera
                return "OPR";                   
            } else if(header.contains("Opera")) { //Opera
                return "Opera";
            }
            return "error";
      }
		
		public static Result download(HttpServletResponse response, HttpServletRequest request, String sourcePath, String fileName) {
			String localSourcePath = sourcePath;
//			String localFileName = decoding(fileName);
			String localFileName = fileName;

			localSourcePath = StringUtils.replace(localSourcePath, "..", ""); 
			Result result = new Result();

			File file = new File(localSourcePath);
			if (!(file.exists())) {
				result.setFail("File not found.");
			}

			if (StringUtils.isEmpty(localFileName)) {
				localFileName = localSourcePath.substring(localSourcePath.lastIndexOf(47) + 1);
				if (StringUtils.isEmpty(localFileName)) {
					localFileName = "noname";
				}
			}

			if (LOG.isDebugEnabled()) {
				LOG.debug("filename : " + localFileName);
			}

			String browser = getBrowser(request);
			
			try{
				if (browser.contains("Trident")) { //IE 11
					localFileName = URLEncoder.encode(localFileName,"UTF-8").replaceAll("\\+", "%20");
					response.setHeader("Content-Disposition", "attachment;filename=" + localFileName + ";");
				} else if (browser.contains("MSIE")) { //IE 8~10
					localFileName = URLEncoder.encode(localFileName,"UTF-8").replaceAll("\\+", "%20");
					response.setHeader("Content-Disposition", "attachment;filename=" + localFileName + ";");
				} else if (browser.contains("Firefox")) { //FireFox
					localFileName = new String(localFileName.getBytes("UTF-8"), "ISO-8859-1");
			       	response.setHeader("Content-Disposition", "attachment; filename=\"" + localFileName + "\"");
				} else if (browser.contains("OPR")) { //Opera 
					localFileName = new String(localFileName.getBytes("UTF-8"), "ISO-8859-1");
			       	response.setHeader("Content-Disposition", "attachment; filename=\"" + localFileName + "\"");
				} else if (browser.contains("Opera")) {	//Opera 구버전
					localFileName = new String(localFileName.getBytes("UTF-8"), "ISO-8859-1");
			       	response.setHeader("Content-Disposition", "attachment; filename=\"" + localFileName + "\"");
				} else if (browser.contains("Chrome")) { //Chrome
					localFileName = new String(localFileName.getBytes("UTF-8"), "ISO-8859-1");
			       	response.setHeader("Content-Disposition", "attachment; filename=\"" + localFileName + "\"");
				}
			}catch(UnsupportedEncodingException e){
				LOG.debug("Filedownload Browser Encodig Error -----");
				e.printStackTrace();
			}
			
			String contentType = "application/octet-stream;charset="+ Config.getString("charset.default", "UTF-8");
			response.setContentType(contentType);
			response.setHeader("Content-Transfer-Encoding", "binary");

			response.setHeader("Content-Length", String.valueOf(file.length()));

			int length = 0;
			byte[] byteBuffer = new byte[1024];
			FileInputStream fileInputStream = null;
			DataInputStream inputStream = null;
			BufferedOutputStream outStream = null;
			try {
				fileInputStream = new FileInputStream(file);
				inputStream = new DataInputStream(fileInputStream);
				outStream = new BufferedOutputStream(response.getOutputStream(),
						1024);
				while (inputStream != null
						&& (length = inputStream.read(byteBuffer)) != -1) {
					outStream.write(byteBuffer, 0, length);
				}
				outStream.flush();
			} catch (IOException e) {
//				if (LOG.isErrorEnabled()) {
//					LOG.error(e, e);
//				}
				result.setFail("An error occured to download.");
			} finally {
				try {
					if (fileInputStream != null) {
						fileInputStream.close();
					}
					if (inputStream != null) {
						inputStream.close();
					}
					if (outStream != null)
						outStream.close();
				} catch (IOException e) {
					if (LOG.isErrorEnabled()) {
						LOG.error(e, e);
					}
					result.setFail("An error occured to download.");
				}
			}

			return result;
		}

		public static Result download(HttpServletResponse response, HttpServletRequest request, String sourcePath) {
			String filename = sourcePath.substring(sourcePath.lastIndexOf(File.separatorChar) + 1);
			return download(response, request, sourcePath, filename);
		}

//		private static String decoding(String filename) {
//			String encodedFileName = null;
//			try {
//				encodedFileName = new String(filename.getBytes("euc-kr"),"ISO8859_1");
//			} catch (UnsupportedEncodingException e) {
//				if (LOG.isErrorEnabled()) {
//					LOG.error(e, e);
//				}
//			}
//			return encodedFileName;
//		}
}


//1. Internet Explorer 11
//Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko  
// 
//1-1. Internet Explorer 10
//Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0)
// 
//2. Safari
//Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/534.57.2 (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2
//
//3. Chrome
//Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.101 Safari/537.36 
// 
//4. Opera
//Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.101 Safari/537.36 OPR/17.0.1241.53 
//
//4-1. Opera 구버전
//Opera/9.80 (Windows NT 6.1; WOW64; U; ko) Presto/2.10.229 Version/11.62
// 
//5. Firefox
//Mozilla/5.0 (Windows NT 6.3; WOW64; rv:24.0) Gecko/20100101 Firefox/24.0

