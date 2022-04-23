package vertexid.paragon.settings.ctrl;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import paragon.core.paramaters.Params;
import vertexid.paragon.settings.svce.SystemService;

@Controller
@RequestMapping("/ctrl/settings/system/info") 
public class SystemInfoController {
	
	private static final Log LOG = LogFactory.getLog(SystemInfoController.class);
	
	@Autowired
	private SystemService systemService;  
	
	
	@RequestMapping
	public String systemInfoPgMove() {
		
//		File root = new File("/");
//		long diskSize = root.getTotalSpace();
//		long diskUseabeSize = root.getUsableSpace();
//		long maxMemory = Runtime.getRuntime().maxMemory();
//		long totalMemory = Runtime.getRuntime().totalMemory();
//		long freeMemory = Runtime.getRuntime().freeMemory();
//		System.out.println("HDD :" + CommUtil.sizeFormat(diskSize)+" / " + CommUtil.sizeFormat(diskUseabeSize));
//		System.out.println("Max Memory :" + CommUtil.sizeFormat(maxMemory));
//		System.out.println("Total Memory :" + CommUtil.sizeFormat(totalMemory));
//		System.out.println("FreeMemory :" + CommUtil.sizeFormat(freeMemory));
//		System.out.println("java version :" + System.getProperty("java.version"));
		
//		OperatingSystemMXBean osbean = (OperatingSystemMXBean) ManagementFactory.getOperatingSystemMXBean();

//	    System.out.println("OS Name: " + osbean.getName());
//	    System.out.println("OS Arch: " + osbean.getArch());
	    //사용가능함 프로세서
//	    System.out.println("Available Processors: "+ osbean.getAvailableProcessors());
		
		
//		System.out.println("server os :" + System.getProperty("os.name"));
//		System.out.println("server os arch :" + System.getProperty("os.arch"));
//		System.out.println("file encoding :" + System.getProperty("file.encoding"));
		
//		seperator(); showOSBean();
//	    seperator(); showThreadBean();
//	    seperator(); showClassLoading();
//	    seperator(); showMemory();
//	    seperator(); showCPU();
//	    seperator();
		
//		Properties pro = System.getProperties(); // 시스템 정보를 몽땅 갖고 온다.
//		Enumeration e = pro.propertyNames();
//	       
//		while (e.hasMoreElements()) {
//			String obj = (String) e.nextElement();
//			System.out.println(obj + ":" + System.getProperty(obj));
//		}
		
		return "settings/system/system_info";
	}
	
	
	
	@RequestMapping("/detailSystem") 
	public Params detailSystem(Params params) { 
		LOG.debug("detailSystem : "+params.toString());   
		return systemService.getUserList(params);
	}
	
	


	  /*
	 * cpu 사용량
	 */
//	  private void showCPU() {
//	    OperatingSystemMXBean osbean = (OperatingSystemMXBean) ManagementFactory.getOperatingSystemMXBean();
//	    RuntimeMXBean runbean = (RuntimeMXBean) ManagementFactory.getRuntimeMXBean();
//
//	    long bfprocesstime = osbean.getAvailableProcessors();
//	    long bfuptime = runbean.getUptime();
//	    long ncpus = osbean.getAvailableProcessors();
//
//	    for (int i = 0; i < 1000000; ++i) {
//	      ncpus = osbean.getAvailableProcessors();
//	    }
//
//	    long afprocesstime = osbean.getAvailableProcessors();
//	    long afuptime = runbean.getUptime();
//
//	    float cal = (afprocesstime - bfprocesstime)
//	      / ((afuptime - bfuptime) * 10000f);
//
//	    float usage = Math.min(99f, cal);
//
//	    System.out.println("Calculation: " + cal);
//	    System.out.println("CPU Usage: " + usage);
//
//	  }
//
//	  private void showRuntime() {
//	    RuntimeMXBean runbean = (RuntimeMXBean) ManagementFactory
//	      .getRuntimeMXBean();
//
//	  }
//
//	  /*
//	 * 메모리 사용량
//	 */
//	  private void showMemory() {
//	    MemoryMXBean membean = (MemoryMXBean) ManagementFactory.getMemoryMXBean();
//
//	    MemoryUsage heap = membean.getHeapMemoryUsage();
//	    System.out.println("Heap Memory: " + heap.toString());
//
//	    MemoryUsage nonheap = membean.getNonHeapMemoryUsage();
//	    System.out.println("NonHeap Memory: " + nonheap.toString());
//
//	  }
//
//	  private void showClassLoading() {
//	    ClassLoadingMXBean classbean = (ClassLoadingMXBean) ManagementFactory.getClassLoadingMXBean();
//
//	    System.out.println("TotalLoadedClassCount: "+ classbean.getTotalLoadedClassCount());
//	    System.out.println("LoadedClassCount: "+ classbean.getLoadedClassCount());
//	    System.out.println("UnloadedClassCount: "+ classbean.getUnloadedClassCount());
//
//	  }
//
//	  private void showThreadBean() {
//	    ThreadMXBean tbean = (ThreadMXBean) ManagementFactory.getThreadMXBean();
//
//	    long[] ids = tbean.getAllThreadIds();
//
//	    System.out.println("Thread Count: " + tbean.getThreadCount());
//
//	    for (long id : ids) {
//	      System.out.println("Thread CPU Time(" + id + ")"+ tbean.getThreadCpuTime(id));
//	      System.out.println("Thread User Time(" + id + ")"+ tbean.getThreadCpuTime(id));
//	    }
//
//	  }
//
//	  /**
//	 * OS 정보
//	 */
//	  private void showOSBean() {
//
//	    OperatingSystemMXBean osbean = (OperatingSystemMXBean) ManagementFactory.getOperatingSystemMXBean();
//
//	    System.out.println("OS Name: " + osbean.getName());
//	    System.out.println("OS Arch: " + osbean.getArch());
//	    System.out.println("Available Processors: "+ osbean.getAvailableProcessors());
////	    System.out.println("TotalPhysicalMemorySize: "+ toMB(osbean.getTotalPhysicalMemorySize()));
////	    System.out.println("FreePhysicalMemorySize: " + toMB(osbean.getFreePhysicalMemorySize()));
////	    System.out.println("TotalSwapSpaceSize: "+ toMB(osbean.getTotalSwapSpaceSize()));
////	    System.out.println("FreeSwapSpaceSize: "+ toMB(osbean.getFreeSwapSpaceSize()));
////	    System.out.println("CommittedVirtualMemorySize: "+ toMB(osbean.getCommittedVirtualMemorySize()));
////	    System.out.println("SystemLoadAverage: "+ osbean.getSystemLoadAverage());
//
//	  }
//
//	  
//	  /* added cafe mocha 2009-06 */
//	  private void seperator() {
//	    System.out.println("-----------------------------------------------");
//	  }
//	  /* added cafe mocha 2009-06 */
//	  private String toMB(long size)
//	  {
//	    return (int)(size/(1024*1024))+"(MB)";
//	  }

	
}
