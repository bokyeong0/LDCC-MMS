package vertexid.paragon.template.svce;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Service;

import paragon.core.mvc.stereotype.ParagonService;
import paragon.core.paramaters.Params;

@Service
public class TreeService extends ParagonService{
	
	private static final Log LOG = LogFactory.getLog(TreeService.class);

	public Params getTreeList(){
		LOG.debug("TreeService 'getTreeList' method ...");
		
		Params p = getSqlManager().selectParams("dt_tree", "Tree.getTreeList");
		LOG.debug("p : "+p.toString());
		
		return p;
	}
	public Params createMenuAjax(Params p) {
		LOG.debug("TreeService 'createMenuAjax' method ...");
		
		getSqlManager().insert("Tree.insertMenu",p);
		LOG.debug("p::::::"+p);
		
		return p;
	}
	
}
