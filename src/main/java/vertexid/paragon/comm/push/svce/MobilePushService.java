package vertexid.paragon.comm.push.svce;

import org.springframework.stereotype.Service;

import paragon.core.exception.ParagonException;
import paragon.core.mvc.stereotype.ParagonService;
import paragon.core.paramaters.Params;
import paragon.core.paramaters.datatable.DataTable;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;



@Service
public class MobilePushService extends ParagonService {
//	private static final Log LOG = LogFactory.getLog(MobilePushService.class);

	public Params getUserDeviceList(Params inParams) {
		System.out.println("inPArams :    "  + inParams.getString("userIdArr"));
		if(inParams.getParam("userIdArr") == null){
			new ParagonException("MSG_COM_ERR_078");
		}else{
			DataTable userDt = getSqlManager().selectDataTable("MobilePushService.getUserDeviceList", inParams);
			inParams.setDataTable("userDeviceArr",userDt);
			if(userDt.size() ==  0){
				new ParagonException("MSG_COM_ERR_079");
			}
		}
		return inParams;
	}

	/**
	 * 해당 권역 PUSH ID 모두 조회
	 * 
	 * @Author Kim Jin Ho
	 * @Date 2017. 7. 12.
	*/
	public Params getAreaDeviceList(Params inParams) {
		DataTable userDt = getSqlManager().selectDataTable("MobilePushService.getAreaDeviceList", inParams);
		inParams.setDataTable("userDeviceArr",userDt);
		return inParams;
	}

	/**
	 * [설명] 
	 * 
	 * @Author Kim Jin Ho
	 * @Date 2017. 7. 13.
	*/
	public DataTable getSearchUserList(Params inParams) {
		return  getSqlManager().selectDataTable("MobilePushService.getSearchUserList",inParams);
	}

	
}
