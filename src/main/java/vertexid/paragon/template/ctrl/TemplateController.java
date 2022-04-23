package vertexid.paragon.template.ctrl;


import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import javapns.Push;
import javapns.communication.exceptions.CommunicationException;
import javapns.communication.exceptions.KeystoreException;
import javapns.notification.PushNotificationBigPayload;
import javapns.notification.PushNotificationPayload;
import javapns.notification.PushedNotification;
import javapns.notification.transmission.NotificationProgressListener;
import javapns.notification.transmission.NotificationThread;
import javapns.notification.transmission.NotificationThreads;
import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.export.JRXlsExporter;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;
import net.sf.jasperreports.export.SimpleXlsReportConfiguration;
import paragon.core.exception.ParagonException;
import paragon.core.file.FileManager;
import paragon.core.paramaters.FileParams;
import paragon.core.paramaters.Params;
import paragon.core.paramaters.ParamsFactory;
import paragon.core.paramaters.datatable.CommDataTable;
import paragon.core.paramaters.datatable.DataTable;
import paragon.core.paramaters.datatable.datarow.CommDataRow;
import paragon.core.paramaters.datatable.datarow.DataRow;
import paragon.core.utility.config.Config;
import vertexid.paragon.comm.util.FileDownLoader;
import vertexid.paragon.template.svce.TemplateService;

@Controller
@RequestMapping("/ctrl/template/common")
public class TemplateController {
	
	private static final Log LOG = LogFactory.getLog(TemplateController.class);
	
	static final NotificationProgressListener DEBUGGING_PROGRESS_LISTENER = new NotificationProgressListener() {
		
		@Override
		public void eventThreadStarted(NotificationThread notificationThread) {
			// TODO Auto-generated method stub
			LOG.debug("   [EVENT]: thread #" + notificationThread.getThreadNumber() + " started with " + notificationThread.getDevices().size() + " devices beginning at message id #" + notificationThread.getFirstMessageIdentifier());
		}
		
		@Override
		public void eventThreadFinished(final NotificationThread thread) {
			LOG.debug("   [EVENT]: thread #" + thread.getThreadNumber() + " finished: pushed messages #" + thread.getFirstMessageIdentifier() + " to " + thread.getLastMessageIdentifier() + " toward " + thread.getDevices().size() + " devices");
		}
		
		public void eventConnectionRestarted(final NotificationThread thread) {
			LOG.debug("   [EVENT]: connection restarted in thread #" + thread.getThreadNumber() + " because it reached " + thread.getMaxNotificationsPerConnection() + " notifications per connection");
		}
		
		public void eventAllThreadsStarted(final NotificationThreads notificationThreads) {
			LOG.debug("   [EVENT]: all threads started: " + notificationThreads.getThreads().size());
		}
		
		public void eventAllThreadsFinished(final NotificationThreads notificationThreads) {
			LOG.debug("   [EVENT]: all threads finished: " + notificationThreads.getThreads().size());
		}
		
		public void eventCriticalException(final NotificationThread notificationThread, final Exception exception) {
			LOG.debug("   [EVENT]: critical exception occurred: " + exception);
		}
	};
	
	@Autowired
	private TemplateService templateService;
	
	@Autowired
	private FileManager fileMng;
	
	@RequestMapping("/buttons")
	public String templateButtons() {
		LOG.debug("templateButtons");
		return "template/common_buttons";
	}
	@RequestMapping("/icons")
	public String templateIcons() {
		LOG.debug("templateButtons");
		return "template/common_icons";
	}
	@RequestMapping("/jqgrid")
	public String templateJqgrid() {
		LOG.debug("templateJqgrid");
		return "template/common_jqgrid";
	}
	@RequestMapping("/modal")
	public String templateModal() {
		LOG.debug("templateModal");
		return "template/common_modal";
	}
	@RequestMapping("/modalInner")
	public String templateModalInner() {
		LOG.debug("templateModalInner");
		return "template/common_modal_inner";
	}
	@RequestMapping("/modalGrid")
	public String templateModalGrid() {
		LOG.debug("templateModalGrid");
		return "template/common_modal_grid";
	}
	@RequestMapping("/form")
	public String templateForm() {
		LOG.debug("templateModalInner");
		return "template/common_form";
	}
	@RequestMapping("/total")
	public String templateJqgridFull() {
		LOG.debug("templateJqgrid");
		return "template/common_total";
	}
	
	@RequestMapping("/tempdata")
	public Params templateData(Params inParams) {
		LOG.debug("inParams : " + inParams);
		Params outParams =  templateService.getTemplateData(inParams);
		return outParams;
	}
	@RequestMapping("/tempreport")
	public String templateReport(ModelMap map,Params inParams) {
//		Params outParams =  templateService.getTemplateData(inParams);
//		map.put("templateReport", outParams.getDataTable());
		DataTable dt =  new CommDataTable();
		
		for (int i = 0; i < 20; i++) {
			DataRow dr = new CommDataRow();
			dr.setParam("numInt", "111"+i);
			dr.setParam("etcInt", "222");
			dr.setParam("money", "안녕하세요. "+i);
			dr.setParam("calcInt1", "444"+i);
			dr.setParam("calcInt2", "555"+i);
			dt.add(dr);
		}

		map.put("templateReport", dt);
		return "template/common_report";
	}
	
	@RequestMapping("/report/pdf")
	public void  salesFilePdfDownload(HttpSession session,Params inParams ,HttpServletResponse response, HttpServletRequest request)throws Exception {
//		System.out.println("file download : " + fi_seq);
//		return fm.downloadFile(fi_seq , response);
		
//		jsonArray = JSONArray.fromObject(excelVoList);
//		System.out.println(jsonArray.toString());
//		System.out.println(jsonObjectTitle.toString());
//		jsonObject.put("rowCount", colName.length);
//		jsonObject.put("title", jsonObjectTitle);
//		jsonObject.put("data", jsonArray);
//		
//		ExcelExport excelEp = new ExcelExport();
//		try{
//			excelEp.excelExportFile(jsonObject, fileName, filePath);
//		}catch(Exception e){
//			e.printStackTrace();
//		}
		DataTable dt =  new CommDataTable();
		
		for (int i = 0; i < 20; i++) {
			DataRow dr = new CommDataRow();
			dr.setParam("numInt", "111"+i);
			dr.setParam("etcInt", "222");
			dr.setParam("money", "안녕하세요. "+i);
			dr.setParam("calcInt1", "444"+i);
			dr.setParam("calcInt2", "555"+i);
			dt.add(dr);
		}
		JRDataSource jds =  new JRBeanCollectionDataSource(dt);
		
		String jrsmlFile  = session.getServletContext().getRealPath("/resources/report/reportTest.jrxml");
		
		InputStream input = new FileInputStream(new File(jrsmlFile));
		JasperReport jr =  JasperCompileManager.compileReport(input);
		JasperPrint jp =  JasperFillManager.fillReport(jr, null,jds);
		String fileNames = "C:\\asdf.pdf";
		JasperExportManager.exportReportToPdfFile(jp, "C:\\asdf.pdf");
		FileDownLoader.download(response, request, fileNames);
	}
	@RequestMapping("/report/excel")
	public void  salesFileExcelDownload(HttpSession session,Params inParams ,HttpServletResponse response, HttpServletRequest request)throws Exception {

		
		DataTable dt =  new CommDataTable();
		
		for (int i = 0; i < 20; i++) {
			DataRow dr = new CommDataRow();
			dr.setParam("numInt", "111"+i);
			dr.setParam("etcInt", "222");
			dr.setParam("money", "안녕하세요. "+i);
			dr.setParam("calcInt1", "444"+i);
			dr.setParam("calcInt2", "555"+i);
			dt.add(dr);
		}
//		inParams.setDataTable("Board",dt);
		JRDataSource jds =  new JRBeanCollectionDataSource(dt);
		
		String jrsmlFile  = session.getServletContext().getRealPath("/resources/report/reportExcel.jrxml");
		InputStream input = new FileInputStream(new File(jrsmlFile));
		JasperReport jr =  JasperCompileManager.compileReport(input);
		JasperPrint jp =  JasperFillManager.fillReport(jr, null,jds);
		String fileNames = "C:\\asdf.xls";
		
		
		JRXlsExporter xlsExporter = new JRXlsExporter();

		xlsExporter.setExporterInput(new SimpleExporterInput(jp));
        xlsExporter.setExporterOutput(new SimpleOutputStreamExporterOutput(fileNames));
        SimpleXlsReportConfiguration xlsReportConfiguration = new SimpleXlsReportConfiguration();
        xlsReportConfiguration.setOnePagePerSheet(false);
        xlsReportConfiguration.setRemoveEmptySpaceBetweenRows(true);
        xlsReportConfiguration.setDetectCellType(false);
        xlsReportConfiguration.setWhitePageBackground(false);
        xlsExporter.setConfiguration(xlsReportConfiguration);

        xlsExporter.exportReport();
		
		FileDownLoader.download(response, request, fileNames);
	}
	@RequestMapping("/file")
	public String templatefile() {
		LOG.debug("templateModalInner");
		return "template/common_file";
	}
	@RequestMapping("/fileSave")
	public Params templatefileSave(Params params) {
		FileParams fp = ParamsFactory.convertFileParmas(params);
		LOG.debug("templatefileSave22 : "+params); 
		LOG.debug("templatefileSave22 : "+fp.getFile("files2",0).getOriginalFilename()); 
		LOG.debug("templatefileSave22 : "+fp.getFiles("files").size()); 
		Params outParams =  ParamsFactory.createOutParams(params);
		return outParams;
	}
	@RequestMapping("/fileSave2")
	public Params templatefileSave2(FileParams fileParams) throws ParagonException {
		LOG.debug("templatefileSave33 : "+fileParams); 
//		LOG.debug("templatefileSave33 : "+fileParams.getFile("files2",0).getOriginalFilename()); 
		LOG.debug("templatefileSave33 : "+fileParams.getFiles("files").size()); 
		fileMng.setFolder("upload");
		fileMng.setWebRoot(true);
//		fileMng.setAutoDelete(true);
//		fileMng.setAutoDelete(true, 1000L);
		DataTable outFileDt = fileMng.saveFile(fileParams.getFiles("files"));
		LOG.debug("outFileParams : " + outFileDt);
		Params outParams =  ParamsFactory.createOutParams(fileParams);
		outParams.setDataTable("dt_saveFileInfo",outFileDt);
		
		outParams.setMsgCd("MSG_COM_SUC_012");
		// MSG_COM_SUC_012
		
//		String temp ="E";
		String temp = fileParams.getString("temp_error");
//		String temp ="p";
		if("E".equals(temp)){
//			throw new ParagonException("MSG_COM_ERR_005");
//			outParams.setMsgCd("MSG_COM_ERR_005");
			throw new ParagonException("MSG_COM_ERR_005");	
		}
		
		LOG.debug("outFileParams : " + outFileDt);
//		DataTable dt = outFileParams.getSaveFilesInfo("files");
		
		return outParams;
	}
	
	/**
	 * ios Push (APNS) Test Module
	 * Dong Cheol Shin 2017.05.23
	 * @param session
	 * @param params
	 * @return
	 */
	@RequestMapping("/apnsTest")
	public Params templateapnsTest(HttpSession session, Params params)	{
		String devKeystore = session.getServletContext().getRealPath("/authorization/push/keystore/paragon_dev.p12");	//개발용 APNs Key File
		String proKeystore = session.getServletContext().getRealPath("/authorization/push/keystore/paragon_pro.p12");	//배포용 APNs Key File
		LOG.debug("!@# : "  + proKeystore);
		String password = "";
//		String deviceToken = "af7163c268c86b0f621f9123b2676dc015f6879b8675588f9b91b9ef39015c7c";						//test용 아이폰 Device Token Key
//		String deviceToken = "b1377929cec70da26c84145fd9cc727dd2457a97adf4e49d5e8270b84e4643e6";//
//		String deviceToken2 = "af7163c268c86b0f621f9123b2676dc015f6879b8675588f9b91b9ef39015c7c";						//test용 아이폰 Device Token Key
		String deviceToken = "524a8d9eb0483efb5fc4d5b44c904be933690814cb9f87494aa80bf4882792d1";//
		String opMode = Config.getString("operation.mode").toUpperCase();
		LOG.debug("deviceToken : " + deviceToken.length());
//		LOG.debug("deviceToken2 : " + deviceToken2.length());
		/**
		 * APNs Payload 설정
		 * PushNotificationPayload(alertMessage, badge, sound)
		 * sound를 빈 값으로 전송시 디바이스에서 알림음이 나오지 않음(보통 default로 전송함)
		 * badge는 APNs Count 의미(채팅앱인 카카오톡 및 라인에서는 읽지 않은 채팅의 총 갯수를 나타냄)
		 * badge Count는 iOS Native에서 카운팅을 할 수 없음. 시스템에서 카운팅이 필요 하면 서버에서 카운팅하여 badge에 카운트 된 값을 포함하여 전송이 필요.
		 * alertMessage는 APNs가 왔을 때 iOS(아이폰, 아이패드)에서 보여지는 메시지
		 * APNs Payload size limit가 존재 함.
		 * Apple Document 기
		 * iOS 8 이전 버전은 256 Bytes.
		 * iOS 8 이후 버전은 HTTP/2 통신 시 2KB
		 * 규칙이 있는 APNs에서는 4KB
		 * VoIP는 5KB
		 * javapn에서의 payload size limit는
		 * PushNotificationPayload -> 256 Byte
		 * PushNotificationBigPayload -> 2KB
		 */
		/**
		 * 보통의 PayLoad를 보낼 때 사용.
		 */
//		PushNotificationPayload payLoad = new PushNotificationPayload("test", 1, "default");		// soundName : default
		
		PushNotificationPayload payLoad = new PushNotificationPayload("test", 1, "");				// soundName : ""
		/**
		 * APNs안의 payload에 추가적인 내용이 필요 할 시 addCustomDictionary 로 추가 할 수 있음.
		 * addCustomDictionary 해당 API 안에 key, object도 들어 갈 수 있음.
		 */
		payLoad.addCustomDictionary("dev_name", "iOS");
		payLoad.addCustomDictionary("dev_type", "iPhone");
		payLoad.addCustomDictionary("dev_version", "10.3.2");
		Params outParams =  ParamsFactory.createOutParams(params);
		outParams.setMsgCd("MSG_COM_SUC_009");
		payLoad.addCustomDictionary("outParams", outParams);

		/**
		 * 큰 사이즈의 PayLoad를 보낼 때 사용.
		 * JSON OBJECT객체를 생성하여
		 * 안에 apns, aps, alert 등의 key, value 값을 추가함.
		 * 
		 */
		JSONObject apns = new JSONObject();
		JSONObject aps = new JSONObject();
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("title", "PARAGON MMS");
		jsonObject.put("subtitle", "PARAGON MMS push!!");
		jsonObject.put("body", "PARAGON MMS VertexID");
		LOG.debug("jsonObject : "+jsonObject);
		LOG.debug("jsonObject : "+jsonObject.toString());
		aps.put("alert", jsonObject);
		aps.put("sound", "default");
		aps.put("badge", 1);
		aps.put("mutable-content", 1);
		aps.put("category", "MMS");
		LOG.debug("aps : "+aps);
		LOG.debug("aps : "+aps.toString());
		apns.put("aps", aps);
		LOG.debug("apns : "+apns);
		LOG.debug("apns : "+apns.toString());
		
//		PushNotificationPayload payLoad = PushNotificationPayload.fromJSON(apns.toString());				// soundName : ""
		PushNotificationBigPayload bigPayLoad = PushNotificationBigPayload.fromJSON(apns.toString());		// 큰 사이즈의 PayLoad 보낼 시 사용.
		/**
		 * APNs안의 payload에 추가적인 내용이 필요 할 시 addCustomDictionary 로 추가 할 수 있음.
		 * addCustomDictionary 해당 API 안에 key, object도 들어 갈 수 있음.
		 */
		bigPayLoad.addCustomDictionary("dev_name", "iOS");
		bigPayLoad.addCustomDictionary("dev_type", "iPhone");
		bigPayLoad.addCustomDictionary("dev_version", "10.3.2");
		bigPayLoad.addCustomDictionary("outParams", outParams);
		
		try {
			// 운영 서버 일 시 iOS 푸시(APNS)를 배포 푸시 서버로 전송
			if (("REL").equals(opMode))	{										
				
				// 해당 Method 안에 푸시 서버(배포, 개발) 주소가 나눠 져 있음.
				Push.payload(payLoad, proKeystore, password, true, deviceToken);				
				
			}else{											
				// 개발 및 내부 서버 일 시 iOS 푸시(APNS)를 개발 푸시 서버로 전송
//				final List<PushedNotification> notifications = Push.payload(payLoad, devKeystore, password, false, deviceToken);
				final List<PushedNotification> notifications = Push.payload(bigPayLoad, proKeystore, password, true, deviceToken);
//				notifications.addAll(Push.payload(payLoad, devKeystore, password, true, deviceToken));
				final List<PushedNotification> sucNotifications = PushedNotification.findSuccessfulNotifications(notifications);
				final List<PushedNotification> failNotifications = PushedNotification.findFailedNotifications(notifications);
				LOG.debug("sucNotifications ("+sucNotifications.size()+") :"+sucNotifications);
				LOG.debug("failNotifications ("+failNotifications.size()+") :"+failNotifications);
				
			}
		} catch (CommunicationException e) {
			e.printStackTrace();
		} catch (KeystoreException e) {
			e.printStackTrace();
		}
		return outParams;
	}
	
	
	
	@RequestMapping("/testProc")
	public Params testProc(HttpSession session, Params params)	{
		return params;
	}
	
}

