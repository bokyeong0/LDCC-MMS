package vertexid.paragon.comm.push.ctrl;

import java.util.Enumeration;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import paragon.core.paramaters.Params;
import paragon.core.paramaters.datatable.DataTable;
import vertexid.paragon.comm.push.svce.MobilePushService;
import vertexid.paragon.comm.util.MobileUtil;

@Controller
@RequestMapping("/ctrl/push")
public class MobilePushController {
	
	private static final Log LOG = LogFactory.getLog(MobilePushController.class);
	
	
	@Autowired
	private MobilePushService mobilePushService;  

	@RequestMapping
	public String push(Params inParams ) throws Exception {
		
		return "settings/system/system_push";
	}
	@RequestMapping("/searchUser")
	public DataTable searchUser(Params inParams ) throws Exception {
		
		return mobilePushService.getSearchUserList(inParams);
	}
	@RequestMapping("/user")
	public Params userPush(Params inParams ) throws Exception {
		
		Params notiParams = mobilePushService.getUserDeviceList(inParams);
		return MobileUtil.sendPush(notiParams);
	}
	@RequestMapping("/area")
	public Params areaPush(Params inParams ) throws Exception {
		Params notiParams = mobilePushService.getAreaDeviceList(inParams);
		return MobileUtil.sendPush(notiParams);
	}
}
