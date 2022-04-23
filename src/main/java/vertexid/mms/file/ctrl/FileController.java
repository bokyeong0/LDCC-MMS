package vertexid.mms.file.ctrl;



import java.io.File;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import vertexid.mms.file.svce.FileService;
import paragon.core.paramaters.FileParams;
import paragon.core.paramaters.Params;
import paragon.core.utility.encoder.Encoder;
import vertexid.paragon.comm.util.FileDownLoader;

@Controller
@RequestMapping("/ctrl/file")
public class FileController {
	private static final Log LOG = LogFactory.getLog(FileController.class);
	
	@Autowired
	private FileService fileService;
	
	
	
	@RequestMapping("/save")
	public Params templatefileSave2(FileParams fileParams) {
		
		Params outParams = fileService.saveFile(fileParams);
//		LOG.debug("outParams : " + outFileDt);
//		LOG.debug("outFileParams : " + outFileDt);
//		outParams.setDataTable("dt_saveFileInfo",outFileDt);
		LOG.debug("outParams ::: " + outParams.getString("fileMSeq"));
		return outParams;
	}
	@ResponseBody
	@RequestMapping("/download")
	public void  salesFileExcelDownloadFile(HttpServletResponse response, HttpServletRequest request,Params inParams) {
		Params outParams = fileService.getFileInfo(inParams);
		LOG.debug("outParams : " + outParams);
		String root = request.getSession().getServletContext().getRealPath("/");
		String filePath = outParams.getString("FILE_PATH");
		String fileName = outParams.getString("FILE_NAME");
		FileDownLoader.download(response, request, root+filePath, fileName);
	}
	@RequestMapping("/download2")
	@ResponseBody
	public FileSystemResource  salesFileDownload(HttpServletResponse response,  HttpServletRequest request, Params inParams) {
		
		LOG.debug("inParams : "  + inParams);
		Params outParams = fileService.getFileInfo(inParams);
		String downPath = outParams.getString("FILE_PATH");
		String ogriFilename = outParams.getString("FILE_NAME");
		File file = new File(downPath);
		    
	    String userAgent = request.getHeader("User-Agent");
	    if (userAgent.indexOf("Chrome") > -1 || userAgent.indexOf("Safari") > -1) { //크롬Safari
	      ogriFilename =  Encoder.utfToiso(ogriFilename);
	    } else { // 나머지
	      try {
			ogriFilename =  URLEncoder.encode(ogriFilename, "UTF-8").replaceAll("\\+", "%20");
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	    }
	    
	    response.setHeader("Content-Disposition", "attachment; filename=" + ogriFilename);
	    return new FileSystemResource(file);
	}
	@RequestMapping("/deleteFile")
	public Params deleteFile(Params inParams) {
		return fileService.deleteFile(inParams);
	}
	@RequestMapping("/listFileDetail")
	public Params listFileDetail(Params inParams) {
		return fileService.getFileDetailList(inParams);
	}
	@RequestMapping("/fileInfo")
	public Params fileInfo(Params inParams) {
		return fileService.getFileInfo(inParams);
	}
	@RequestMapping("/oneFileDetail")
	public Params oneFileDetail(Params inParams) {
		return fileService.oneFileDetail(inParams);
	}
}
