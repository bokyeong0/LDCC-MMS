package vertexid.paragon.comm.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;


public class BaseExceptionFilter implements Filter {

	private static final Log LOG = LogFactory.getLog(BaseExceptionFilter.class);

	@Override
	public void destroy() {
		if(LOG.isDebugEnabled()) {
			LOG.debug("filter destroy");
		}
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {
		if(LOG.isDebugEnabled()) {
			LOG.debug("filter init");
		}
	}

	public String getStackTraceDetail(Throwable t) {
		StringBuilder sb = new StringBuilder();
		synchronized(t) {
			sb.append(t.toString());
			sb.append("\n");
			StackTraceElement[] trace = t.getStackTrace();
			for(int i = 0; i < trace.length; i++) {
				sb.append("\tat ");
				sb.append(trace[i]);
				sb.append("\n");
			}

			Throwable ourCause = t.getCause();
			if(ourCause != null) {
				sb.append(getStackTraceAsCause(ourCause, trace));
			}
		}
		return sb.toString();
	}

	private String getStackTraceAsCause(Throwable t, StackTraceElement[] causedTrace) {
		StringBuilder sb = new StringBuilder();

		StackTraceElement[] trace = t.getStackTrace();
		int m = trace.length - 1;
		int n = causedTrace.length - 1;
		while(m >= 0 && n >= 0 && trace[m].equals(causedTrace[n])) {
			m--;
			n--;
		}
		int framesInCommon = trace.length - 1 - m;

		sb.append("Caused by: ");
		sb.append(t);
		sb.append("\n");
		for(int i = 0; i <= m; i++) {
			sb.append("\tat ");
			sb.append(trace[i]);
			sb.append("\n");
		}

		if(framesInCommon != 0) {
			sb.append("\t... ");
			sb.append(framesInCommon);
			sb.append(" more");
			sb.append("\n");
		}

		Throwable ourCause = t.getCause();
		if(ourCause != null) {
			sb.append(getStackTraceAsCause(ourCause, trace));
		}

		return sb.toString();
	}

	public String getExceptionMessageDetail(Throwable t) {
		StringBuilder sb = new StringBuilder();
		synchronized(t) {
			sb.append(t.toString());
			sb.append("\n");
			StackTraceElement[] trace = t.getStackTrace();
			for(int i = 0; i < 1; i++) {
				sb.append("\tat ");
				sb.append(trace[i]);
				sb.append("\n");
			}

			Throwable ourCause = t.getCause();
			if(ourCause != null) {
				sb.append(getExceptionMessageAsCause(ourCause, trace));
			}
		}
		return sb.toString();
	}

	private String getExceptionMessageAsCause(Throwable t, StackTraceElement[] causedTrace) {
		StringBuilder sb = new StringBuilder();

		StackTraceElement[] trace = t.getStackTrace();
		int m = trace.length - 1;
		int n = causedTrace.length - 1;
		while(m >= 0 && n >= 0 && trace[m].equals(causedTrace[n])) {
			m--;
			n--;
		}

		sb.append("Caused by: ");
		sb.append(t);
		sb.append("\n");
		for(int i = 0; i <= 0; i++) {
			sb.append("\tat ");
			sb.append(trace[i]);
			sb.append("\n");
		}

		Throwable ourCause = t.getCause();
		if(ourCause != null) {
			sb.append(getExceptionMessageAsCause(ourCause, trace));
		}

		return sb.toString();
	}

	@Override
	public void doFilter(ServletRequest arg0, ServletResponse arg1, FilterChain arg2) throws IOException, ServletException {
	}
}