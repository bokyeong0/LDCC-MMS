/**
 * 
 */
package vertexid.paragon.websocket.svce;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import vertexid.paragon.websocket.util.RoomVo;
import vertexid.paragon.websocket.util.UserVo;


public class MessengerService {

	private  static Map<String , UserVo> users;
	private static Map<String , RoomVo> rooms;
	private static String myRooms="";
	
    
public static void roomMake(){
		
		rooms =  new HashMap<String, RoomVo>();
		
		String roomId[]= {"1","2","3","4","5","6","7","8","9","10","11","12","13","14","15" };
		String roomNm[]= {"그냥방","내방","방3","방4","방5","방6","방7","방8","방9","방10","방11","방12","방13","방14","방15" };
		String lastChat[]= {
				 "안녕하세요1"
				,"안녕하세요2"
				,"안녕하세요3"
				,"안녕하세요4"
				,"안녕하세요5"
				,"안녕하세요6"
				,"안녕하세요7"
				,"안녕하세요8"
				,"안녕하세요9"
				,"안녕하세요10"
				,"안녕하세요11"
				,"안녕하세요12"
				,"안녕하세요13"
				,"안녕하세요14"
				,"안녕하세요15"
				};
		String id[]= {"anaws","kdw","sjk","sjs","wb","shk" ,"aaa1","dsdfd2","sdfg5","sdfg7","asdf6","asdf9","xasdf3","254c","n5678n","3456b","3v456","2c345","1x23","1x234","vgfh","34b5fg" };
		
		for (int i = 0; i < roomId.length; i++) {
			RoomVo rv = new RoomVo();
			rv.setRoomNm(roomNm[i]);
			rv.setRoomId(roomId[i]);
			rv.setLastChat(lastChat[i]);
			 
			int userCnt = (int) (Math.random()*(8))+3; //3~10
//			System.out.println("방이름 : "+roomNm[i]+" 인원 :" + userCnt);
			int userIdx = (int) (Math.random()*(id.length)); 
			String users[] = new String[userCnt];
			for (int j = 0; j < userCnt ; j++) {
				int nextIdx = (userIdx+j+1)% id.length;
				users[j] = id[nextIdx];
				if(id[nextIdx].equals("anaws")){
					if(!myRooms.equals("")){
						myRooms+=",";
					}
					myRooms+=roomId[i];
				}
			}
			rv.setUsers(users);
			rooms.put(roomId[i], rv);
			// System.out.println("방이름 : "+roomNm[i]+" 인원 :" + userCnt+ " > "+rv.toString());
		}
//		System.out.println("anaws Rooms : " + myRooms);
	}
	
	public String[] selectMyRooms() {
		return myRooms.split(",");
	}

	public static Map<String, RoomVo> selectRooms() {
		return rooms;
	};
	
	
	
	
	public static void userMake(){
		 
		users =  new HashMap<String, UserVo>();
		
		String name[] = {"김진호","강동원","송준기","소지섭","원빈","송혜교" };
		String id[]= {"anaws","kdw","sjk","sjs","wb","shk" };
		String email[]= {"anaws@cj.net","kdw@cj.net","sjk@cj.net","sjs@cj.net","wb@cj.net","shk@cj.net" };
		String pw[]= {"111","222","333","444","555","666" };
		String position[]= {"개발팀장","사원","사원","대리","과장","차장" };
		String comment[]= {"잠시 다른 용무중입니다.","휴식중","안녕하세요","반갑습니다","휴가중입니다.","회의중" };
//		int state[]= {1,1,1,2,2,3 };
		
		for (int i = 0; i < name.length; i++) {
			UserVo uv = new UserVo();
			uv.setName(name[i]);
			uv.setId(id[i]);
			uv.setEmail(email[i]);
			uv.setPw(pw[i]);
			uv.setPosition(position[i]);
			uv.setComment(comment[i]);
//			uv.setState(state[i]);
			users.put(id[i], uv);
		}
	}
	
	public static Map<String , UserVo> selectUsers(){
		return users;
	}
	public static UserVo getUser(String id){
		return users.get(id);
	}

	public static List<RoomVo> getMyRoomList(String id) {
		String[] roomNames = myRooms.split(",");
		List<RoomVo> myRoomList = new ArrayList<RoomVo>();
		for (int i = 0; i < roomNames.length; i++) {
			myRoomList.add(rooms.get(roomNames[i]));
		} 
		return myRoomList;
	};
}

