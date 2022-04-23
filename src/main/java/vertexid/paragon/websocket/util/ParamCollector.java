/**
 * 
 */
package vertexid.paragon.websocket.util;

import java.util.HashMap;
import java.util.Map;

public class ParamCollector {

	Map<String, String> map = new HashMap<String, String>();

    public String get(String key){
        return map.get(key);
    }

    public void put(String key, String value){
        map.put(key, value);
    }

    public String toString() {
        return map.toString();
    }

}
