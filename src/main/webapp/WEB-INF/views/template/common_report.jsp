<%@ page contentType="application/pdf; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page trimDirectiveWhitespaces="true" %>
<%@ page import="net.sf.jasperreports.engine.*" %>
<%@ page import="net.sf.jasperreports.engine.data.*" %>
<%@ page import="java.io.*" %>
<%@ page import="paragon.core.paramaters.datatable.*" %>
<%@ page import="java.util.*" %>

<%

try{
	DataTable dt =  (DataTable)request.getAttribute("templateReport");
	JRDataSource jds =  new JRBeanCollectionDataSource(dt);
	
	String jrsmlFile  = session.getServletContext().getRealPath("/resources/report/reportTest.jrxml");
	
	InputStream input = new FileInputStream(new File(jrsmlFile));
	JasperReport jr =  JasperCompileManager.compileReport(input);
	JasperPrint jp =  JasperFillManager.fillReport(jr, null,jds);
// 	JasperExportManager.exportReportToHtmlFile(jrsmlFile);
	JasperExportManager.exportReportToPdfStream(jp, response.getOutputStream());
	response.getOutputStream().flush();
	response.getOutputStream().close();
	
	
	
}catch (Exception e){
	e.printStackTrace();
}


%>
