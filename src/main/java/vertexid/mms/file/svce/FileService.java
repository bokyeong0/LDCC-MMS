package vertexid.mms.file.svce;


import java.io.File;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import vertexid.mms.file.ctrl.FileController;
import paragon.core.authority.rule.AuthorityRule;
import paragon.core.exception.ParagonException;
import paragon.core.file.FileManager;
import paragon.core.mvc.stereotype.ParagonService;
import paragon.core.paramaters.CommParams;
import paragon.core.paramaters.FileParams;
import paragon.core.paramaters.Params;
import paragon.core.paramaters.ParamsFactory;
import paragon.core.paramaters.datatable.DataTable;
import paragon.core.paramaters.datatable.datarow.DataRow;
import paragon.core.web.listener.adapter.ParagonContextLoaderAdapter;

@Service
public class FileService extends ParagonService {
	
	private static final Log LOG = LogFactory.getLog(FileService.class);
	@Autowired
	private FileManager fileManager;
	
	/**
	 * 파일저장
	 * @Author 김진호
	 * @Date 2017. 8. 9.
	*/
	public Params saveFile(Params inParams) {
//		boolean webPath = inParams.getBoolean("webPath");
//		String savePath = inParams.getString("savePath");
		FileParams fp = ParamsFactory.convertFileParmas(inParams);
		
//		fileManager.setWebRoot(true);
//		if(webPath){
//		fileManager.setFolder("files"+File.separator+"webfile");
//		}else{
//			fileManager.setFolder(savePath); 
//		}
		

		
		DataTable outFileDt = fileManager.saveFile(fp.getFiles("files"));
		inParams.setDataTable("dt_files",outFileDt);
		//파일 업로드 실패
		if(outFileDt.size() == 0 ){
			throw new ParagonException("MSG_COM_ERR_010");
		}
		int cnt = 1;
		int fileMSeq = inParams.getInteger("fileMSeq");
		
		if(fileMSeq == 0){
			cnt = getSqlManager().insert("FileService.saveFileMaster",inParams);
			fileMSeq = inParams.getInteger("fileMSeq");
		}
		
		LOG.debug("fileMSeq : " + fileMSeq);
		int childCnt = 0; 
		LOG.debug("cnt : " + cnt);
		if(cnt > 0 && fileMSeq != 0){
			for(DataRow dr : inParams.getDataTable("dt_files")){
				dr.setParam("fileMSeq", fileMSeq);
				dr.setParam("s_userId", inParams.get("s_userId")); 
				childCnt += getSqlManager().insert("FileService.saveFileDetail",dr);
			}
		}else{
			// 마스터 DB 업로드 실패
			throw new ParagonException("MSG_COM_ERR_015");
		}
		if(childCnt > 0 ){
			Params outParams =   getSqlManager().selectParams("dt_files","FileService.getFileDetailList",inParams);
			outParams.setParam("fileMSeq", fileMSeq);
			return outParams;
		}else{
			//디테일 DB  업로드 실패
			throw new ParagonException("MSG_COM_ERR_015");
		}
	}
	public Params deleteFile(Params inParams) {
		Params outParams = ParamsFactory.createOutParams(inParams);
		outParams.setMsgCd("MSG_COM_SUC_006");
		int cnt = 0;
		
		cnt = getSqlManager().update("FileService.deleteFile", inParams);
		
		if(cnt < 1){
			throw new ParagonException("MSG_COM_ERR_080");
		}
		return outParams;
	}
	
	
	
	public Params getFileDetailList(Params inParams) {
		return getSqlManager().selectParams("dt_files","FileService.getFileDetailList", inParams); 
	}
	public Params getFileDetailDetail(Params inParams) {
		return getSqlManager().selectOneParams("FileService.getFileDetail", inParams); 
	}



	/**
	 * [기능 설명] 
	 * 
	 * @Author 고경아
	 * @Date 2017. 9. 20.
	*/
	public Params getFileInfo(Params inParams) {
		return getSqlManager().selectOneParams("FileService.getFileInfo", inParams); 
	}
	/**
	 * [비품분류 품목 사진 미리보기] 
	 * 
	 * @Author 고경아
	 * @Date 2017. 9. 22.
	*/
	public Params oneFileDetail(Params inParams) {
		return getSqlManager().selectOneParams("FileService.getOneFileDetail", inParams); 
	}

}
