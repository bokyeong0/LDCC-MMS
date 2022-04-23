package vertexid.paragon.settings.ctrl;



import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import paragon.core.paramaters.Params;
import paragon.core.paramaters.datatable.DataTable;
import vertexid.paragon.settings.svce.CodeService;

@Controller
@RequestMapping("/ctrl/settings/system/code") 
public class CodeController {
	
	private static final Log LOG = LogFactory.getLog(CodeController.class);
	
	@Autowired
	private CodeService codeService;  

	/**
	 * 코드관리 화면이동
	 * 
	 * @Author "Kim Jin Ho"
	 * @Date 2016. 11. 7.
	 */
	@RequestMapping
	public String listCommmonCodePgMove() {
		return "settings/system/system_code";
	}
	
	
	/**
	 * 그룹코드 목록 조회
	 * 
	 * @Author "Kim Jin Ho"
	 * @Date 2016. 11. 7.
	*/
	@RequestMapping("/listCodeGroup") 
	public Params listCodeGroup(Params inParams) { 
		return codeService.getGodeGroupGridList(inParams);
	}
	/**
	 * 그룹코드 저장
	 * 
	 * @Author "Kim Jin Ho"
	 * @Date 2016. 11. 7.
	*/
	@RequestMapping("/saveCodeGroup") 
	public Params saveCodeGroup(Params inParams) {
		return codeService.saveCodeGroup(inParams);
	}
	/**
	 * 그룹코드명 조회(검색조건 자동완성)
	 * 
	 * @Author "Kim Jin Ho"
	 * @Date 2016. 11. 7.
	*/
	@RequestMapping("/listCodeGroupNames") 
	public DataTable listCodeGroupNames(Params inParams) {
		return  codeService.getCodeGroupNameList(inParams);
	}
	/**
	 * 공통코드 목록조회 
	 * 
	 * @Author "Kim Jin Ho"
	 * @Date 2016. 11. 7.
	*/
	@RequestMapping("/listCode") 
	public Params listCode(Params inParams) {
		LOG.debug("listCode:::::::::::::"+inParams);
		return codeService.getGodeGridList(inParams);
	}
	/**
	 * 공통코드 저장
	 * 
	 * @Author "Kim Jin Ho"
	 * @Date 2016. 11. 7.
	*/
	@RequestMapping("/saveCode") 
	public Params saveCode(Params inParams){
		LOG.debug(inParams);
		return codeService.saveCode(inParams);
	}
	
	/**
	 * 코드명조회(검색조건 자동완성)
	 * 
	 * @Author "Kim Jin Ho"
	 * @Date 2016. 11. 7.
	*/
	@RequestMapping("/listCodeNames") 
	public DataTable listCodeNames(Params inParams) {
		return  codeService.getCodeNameList(inParams);
	}
	
	/**
	 * 그룹코드 SelectBox 조회
	 * 
	 * @Author "Kim Jin Ho"
	 * @Date 2016. 11. 7.
	*/
	@RequestMapping("/listCodeGroupComboJson") 
	public DataTable listCodeGroupComboJson(Params inParams) {
		return  codeService.getCodeGroupComboList(inParams);
	}
	
	@RequestMapping("/listComCateComboJson") 
	public DataTable listComCateComboJson(Params inParams) {
		return  codeService.getComCateComboList(inParams);
	}
	
	@RequestMapping("/listBrndCateComboJson") 
	public DataTable listBrndCateComboJson(Params inParams) {
		return  codeService.getBrndCateComboList(inParams);
	}
	
	@RequestMapping("/commCodePop")
	public String commmonCodePopupMove() {
		return "common/common_codePop";
	}
	
	@RequestMapping("/saveCodePop") 
	public Params saveCodePop(Params inParams){
		LOG.debug(inParams);
		return codeService.saveCodePop(inParams);
	}
	/** 장애접수> 처리상태 추가 [2017-11-22] **/
	@RequestMapping("/listCodeGroupOtherJson") 
	public DataTable listCodeGroupOtherJson(Params inParams) {
		return  codeService.getCodeOtherComboList(inParams);
	}
	
	@RequestMapping("/commAreaPop")
	public String commmonAreaPopupMove() {
		return "common/common_areaPop";
	}
	
	@RequestMapping("/listAreaTreeJson") 
	public Params listAreaTreeJson(Params inParams) {
		return  codeService.getAreaTreeList(inParams);
	}
	
	@RequestMapping("/listAreaComboJson") 
	public Params listAreaComboJson(Params inParams) {
		return  codeService.getAreaComboList(inParams);
	}
	
}
