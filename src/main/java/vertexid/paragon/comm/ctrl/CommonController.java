package vertexid.paragon.comm.ctrl;

import java.awt.Color;
import java.awt.Font;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.export.HtmlExporter;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleHtmlExporterOutput;
import nl.captcha.Captcha;
import nl.captcha.backgrounds.GradiatedBackgroundProducer;
import nl.captcha.servlet.CaptchaServletUtil;
import nl.captcha.text.producer.NumbersAnswerProducer;
import nl.captcha.text.renderer.DefaultWordRenderer;
import paragon.core.paramaters.CommParams;
import paragon.core.paramaters.Params;
import paragon.core.paramaters.ParamsFactory;
import paragon.core.paramaters.datatable.CommDataTable;
import paragon.core.paramaters.datatable.DataTable;
import paragon.core.paramaters.datatable.datarow.CommDataRow;
import paragon.core.paramaters.datatable.datarow.DataRow;
import paragon.core.utility.config.Config;
import vertexid.paragon.comm.util.CommExcel;
import vertexid.paragon.comm.util.FileDownLoader;

@Controller
@RequestMapping("/ctrl/comm")
public class CommonController {
	private static final Log LOG = LogFactory.getLog(CommonController.class);
	
	private static final String s_javaScriptKey = Config.getString("kakaoApi.javaScriptKey","8ad51fedd8a239226665398645a0f60c");
	private static final String s_restApiKey    = Config.getString("kakaoApi.restApiKey", "KakaoAK dc98a6c60f90db49fd29ec10448bbbe2");
	
	@RequestMapping("/userinfo")
	public Params  getUserInfo(HttpSession session)throws Exception {
		Params outParams = new CommParams();
		
		String s_companyCd = (String) session.getAttribute("s_companyCd");
		String s_userNo = (String) session.getAttribute("s_userNo");
		String s_userType = (String) session.getAttribute("s_userType");
		String s_userId = (String) session.getAttribute("s_userId");
		String s_userNm = (String) session.getAttribute("s_userNm");
		String s_areaCd = (String) session.getAttribute("s_areaCd");
		String s_brndCd = (String) session.getAttribute("s_brndCd");
		String s_ip = (String) session.getAttribute("s_ip");
		String s_language = (String) session.getAttribute("s_language");
		String s_country = (String) session.getAttribute("s_country");
		String s_jSessionId = (String) session.getAttribute("s_jSessionId");
		String s_language_nm = (String) session.getAttribute("s_language_nm");
		String s_compCd = (String) session.getAttribute("s_compCd");
		String s_callExt = (String) session.getAttribute("s_callExt");
		String s_ctiServerIp = Config.getString("cti.ip");
		outParams.setParam("s_companyCd", s_companyCd );
		outParams.setParam("s_userNo", s_userNo );
		outParams.setParam("s_userType", s_userType );
		outParams.setParam("s_userId", s_userId );
		outParams.setParam("s_userNm", s_userNm );
		outParams.setParam("s_areaCd", s_areaCd );
		outParams.setParam("s_brndCd", s_brndCd );
		outParams.setParam("s_ip", s_ip );
		outParams.setParam("s_language", s_language ); 
		outParams.setParam("s_country", s_country );
		outParams.setParam("s_jSessionId", s_jSessionId );
		outParams.setParam("s_language_nm", s_language_nm );
		outParams.setParam("s_compCd", s_compCd );
		outParams.setParam("s_callExt", s_callExt );
		outParams.setParam("s_ctiServerIp", s_ctiServerIp );
		outParams.setParam("s_javaScriptKey",  s_javaScriptKey);	//A20190131 k2s ??????api-> ?????????api
		outParams.setParam("s_restApiKey",  s_restApiKey);	//A20190131 k2s ??????api-> ?????????api
		LOG.debug("session params: "+outParams);
		return outParams;
	}
	
	@RequestMapping("/download/excel")
	public void  downloadExcel(HttpServletResponse response,  HttpServletRequest request, Params inParams)throws Exception {
		LOG.debug("downloadExcel :::::::::::::::::::::::::::::::::::::::::::::::::");
		CommExcel ce = new CommExcel();
		ce.download(response, request, inParams);
		LOG.debug("/download/excel complete!!");
	}
	
	@RequestMapping("/view/excel")
	public Params  viewExcel(HttpSession session,HttpServletResponse response,  HttpServletRequest request, Params inParams)throws Exception {
		
		
		DataTable dt =  new CommDataTable();
		
		for (int i = 0; i < 20; i++) {
			DataRow dr = new CommDataRow();
			dr.setParam("numInt", "111"+i);
			dr.setParam("etcInt", "222");
			dr.setParam("money", "???????????????. "+i);
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
		
		final ByteArrayOutputStream out = new ByteArrayOutputStream();
		HtmlExporter htmlExporter = new HtmlExporter();

//		htmlExporter.setExporterInput(new SimpleExporterInput(jp));
		htmlExporter.setExporterOutput(new SimpleHtmlExporterOutput(out));
//		htmlExporter.setExporterOutput(new SimpleOutputStreamExporterOutput(fileNames));
		
//		htmlExporter.exportReport();
		htmlExporter.setExporterInput(new SimpleExporterInput(jp));
		htmlExporter.exportReport();
		Params outParams = ParamsFactory.createOutParams(inParams);
		outParams.setParam("body", out.toString());
	    return outParams;
		
		
//		return inParams;
	}
	@RequestMapping("/download/excel/file")
	public Params  salesFileExcelDownloadFile(HttpServletResponse response,  HttpServletRequest request,  Params inParams)throws Exception {
		LOG.debug("inParams : "  + inParams);
		
		FileDownLoader.download(response,request, inParams.getString("fileName"),inParams.getString("downFileName"));
		return inParams;
	}
	
	@RequestMapping("/captcha")
	public Params  getCaptchaImage(HttpServletResponse response,  HttpServletRequest request,  Params inParams) throws Exception {
		LOG.debug("inParams : "  + inParams);
		List<Font> fontList = new ArrayList<Font>();
        fontList.add(new Font("", Font.BOLD, 40));//
        fontList.add(new Font("Courier", Font.ITALIC, 40));
        fontList.add(new Font("", Font.PLAIN, 40));
        fontList.add(new Font("", Font.CENTER_BASELINE, 40));

        List<Color> colorList = new ArrayList<Color>();
        colorList.add(Color.black);
		Captcha captcha = new Captcha.Builder(250, 50)
				//.addText() //Default??? 5?????? ????????? ???????????? ????????? ??????
				//.addBackground() //????????? ?????? - Default
				.addText(new NumbersAnswerProducer(6), new DefaultWordRenderer(colorList, fontList)) //?????? ?????????(??????, ??????)
				.addBackground(new GradiatedBackgroundProducer()) //Gradiated ??????????????? ?????? ??????
				.addNoise()// ?????? ????????? ????????? ????????? ????????? ????????????.
				//.gimp(new DropShadowGimpyRenderer()) //????????? ?????? ?????? // NullPointException ???????????? ????????? ????????? ??????
				//.addBorder() //?????? ????????? ??? ??????
				.build(); //?????? ?????? ??????
		
		response.setHeader("Cache-Control", "no-store");
		response.setHeader("Pragma", "no-cache"); // ???????????? ????????? ????????? ?????? ????????? ??????
		
		response.setDateHeader("Expires", 0);
		response.setContentType("image/jpeg"); // ???????????? image ????????? ??????
		
		CaptchaServletUtil.writeImage(response, captcha.getImage());
		String captcha_str = captcha.getAnswer();
		
		request.getSession().setAttribute("s_captcha", captcha_str);
		LOG.debug("captcha : "  + captcha_str);
		return inParams;
	}

	@RequestMapping("/writeLog")
	public Params writeLog(Params inParams) throws Exception {
		LOG.debug("writelog : "  + inParams.getParam("log"));
		return inParams;
	}
}
