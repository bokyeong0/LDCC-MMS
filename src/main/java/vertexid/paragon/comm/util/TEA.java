package vertexid.paragon.comm.util;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class TEA {
	private static final Log LOG = LogFactory.getLog(TEA.class);

	// 절대 변하지않을 상수는 STATIC 으로 선언하여야 TEA 가 아무리 생성되더라고 메모리 공유하여 단 한번만 생성됨
	private final static int delta = 0x9E3779B9;
	private final static int[] shift = {0, 8, 16, 24};

	// key값에 따라 달라지는 값.. TEA 인스턴스들 마다 다른값이 존재할 녀석들은 절대 STATIC이 될 수 없음
	private int[] S = new int[4];

	/**
	 * Initialize the cipher for encryption or decryption.
	 * @param key a 16 byte (128-bit) key
	 */
	public TEA(byte[] key) {
		if (key == null)
			throw new RuntimeException("Invalid key: Key was null");
		if (key.length < 16)
			throw new RuntimeException("Invalid key: Length was less than 16 bytes");
		for (int off=0, i=0; i<4; i++) {
			S[i] = (key[off++] & 0xff) |
			((key[off++] & 0xff) <<  8) |
			((key[off++] & 0xff) << 16) |
			((key[off++] & 0xff) << 24);
		}

	}
	
	public TEA(String key){
		this(key.getBytes());
	}

	public byte[] encrypt(byte[] clear){

		int[] v = strToLongs(clear);		
		int n = v.length;

		// ---- <TEA coding> ---- 
		int z = v[n-1];
		int y = v[0];

		int mx, e;
		int q = 6 + 52/n;
		int sum = 0;

		while (q-- > 0) {  // 6 + 52/n operations gives between 6 & 32 mixes on each word
			sum += delta;
			e = sum>>>2 & 3;
			for (int p = 0; p < n; p++) {
				y = v[(p+1)%n];
				mx = (z>>>5 ^ y<<2) + (y>>>3 ^ z<<4) ^ (sum^y) + (S[p&3 ^ e] ^ z);
				z = v[p] += mx;
			}
		}
		// ---- </TEA> ----
		return longsToStr(v);
	}

	public byte[] decrypt(byte[] crypt){
		int[] v = strToLongs(crypt);
		int n = v.length;

		// ---- <TEA decoding> ---- 
		int z = v[n-1];
		int y = v[0];

		int mx, e;
		int q = 6 + 52/n;
		int sum = q*delta;

		while (sum != 0) {
			e = sum>>>2 & 3;
			for (int p = n-1; p >= 0; p--) {
				z = v[p>0 ? p-1 : n-1];
				mx = (z>>>5 ^ y<<2) + (y>>>3 ^ z<<4) ^ (sum^y) + (S[p&3 ^ e] ^ z);
				y = v[p] -= mx;
			}
			sum -= delta;
		}

		
		byte[] plainBytes = longsToStr(v);
		
		int len;		
		for(len=0; len<plainBytes.length; len++){
			if(plainBytes[len] == 0)
				break;
		}
		
		byte[] plainTrim = new byte[len];
		System.arraycopy(plainBytes, 0, plainTrim, 0, len);
				
		return plainTrim;
	}
	
	public String encrypt(String plaintext){
		byte[] plainTextBytes = encrypt(plaintext.getBytes());
		return new String(Base64.encode(plainTextBytes));
	}
	
	public String decrypt(String ciphertext){
		String plainText = null;		
		byte[] plainTextBytes = decrypt(Base64.decode(ciphertext));
		try{
			plainText = new String(plainTextBytes, "UTF-8");
		} catch(Exception e){
			e.getMessage();
		}
		
		return plainText;		
	}

	private int[] strToLongs(byte[] s) { 
		int[] l = new int[(s.length + 3)/4];

// s가 4의 배수가 아니면 array index out of range 에러남!!!
//		for (int i=0; i<l.length; i++) {
//			l[i] = (s[i*4+0]&0xff)<<0 | 
//			(s[i*4+1]&0xff)<<8 |  
//			(s[i*4+2]&0xff)<<16 | 
//			(s[i*4+3]&0xff)<<24;
//		}
		
		// 비교연산과 비트연산보다 + 연산이 수백수천배의 비용을 많이 가짐
		for (int i=0; i<s.length; i++) {
			l[i>>2] |= (s[i]&0xff)<<shift[i&3];
		}
		return l;  
	}

	private byte[] longsToStr(int[] l){
		byte[] a = new byte[l.length*4];

//		for (int i=0; i<l.length; i++) {
//			a[i*4+0] = (byte)((l[i]>>0)&0xff);
//			a[i*4+1] = (byte)((l[i]>>8)&0xff);
//			a[i*4+2] = (byte)((l[i]>>16)&0xff);
//			a[i*4+3] = (byte)((l[i]>>24)&0xff);
//		}

		for (int i=0; i<a.length; i++) {
			a[i] = (byte)((l[i>>2]>>shift[i&3])&0xff);
		}

		return a;
	}
}
