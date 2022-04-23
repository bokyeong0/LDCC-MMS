package vertexid.paragon.comm.util;


/**
 * @Class명: StringCheck
 * @작성일: 2014. 9. 18
 * @작성자: 김진호
 * @설명: 문자 체크
 */
public class StringCheck {
	
	public static String nullToBlank(String tmp){
		return tmp == null || tmp.trim().length() == 0 ? "" : tmp;
	}

}
