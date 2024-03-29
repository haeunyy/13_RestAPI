package com.greedy.api.section02.responseentity;

import java.net.URI;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/entity")
public class ResponseEntityTestController {
	
	private List<UserDTO> users;

	public ResponseEntityTestController() {
		users = new ArrayList<>();
		users.add(new UserDTO(1, "user01","pass01","홍길동",new Date()));
		users.add(new UserDTO(2, "user02","pass02","홍길",new Date()));
		users.add(new UserDTO(3, "user03","pass03","홍",new Date()));
	}
	
	
	/* ResponseEntity 란 
	 * 결과 데이터와 HTTP 상태코드, 응답 헤더를 직접 제어할 수 있는 클래스이다. */
	
	@GetMapping("/users")
	public ResponseEntity<ResponseMessage> findAllUsers(){
		
		// import org.springframework.http.HttpHeaders;
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
		
		Map<String , Object> responseMap = new HashMap<>();
		responseMap.put("users",users);
		
		ResponseMessage responseMessage = new ResponseMessage(200, "조회 성공", responseMap);
		
		// ResponseEntity<>(body[데이터값], header[웹서버가 웹브라우저에 응답하는 메시지], status)
		return new ResponseEntity<>(responseMessage, headers, HttpStatus.OK);
	}
	
	
	
	@GetMapping("/users/{userNo}")
	public ResponseEntity<ResponseMessage> findUserByNo(@PathVariable int userNo){
		
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
		
		UserDTO foundUser = users.stream().filter(user-> user.getNo() == userNo).toList().get(0);
		
		Map<String, Object> responseMap = new HashMap<>();
		responseMap.put("user",foundUser);
		
		/* 빌더 패턴으로 작성 가능 */
		return ResponseEntity
				.ok()
				.headers(headers)
				.body(new ResponseMessage(200, "조회성공", responseMap));
		/* return new ResponseEntity<>(responseMessage, headers, HttpStatus.OK);
		 * 보다 명시적으로 확인하기 쉽다.
		 */
	}
	
	
	/* 바디에 응답할 값이 없을때  ResponseEntity<?> ? 사용 */
	/*@ModelAttribute*/
	@PostMapping("/users")
	public ResponseEntity<?> registUser(@RequestBody UserDTO newUser){
		
		int lastUserNo = users.get(users.size() -1).getNo();
		newUser.setNo(lastUserNo +1);
		newUser.setEnrollDate(new Date());
		
		users.add(newUser);
		
		/* 조회 시에는 200 번 코드를 응답하지만 삽입시에는 201번 코드를 응답한다. 
		 * 201 : 요청이 성공적으로 처리되었으며, */
		return ResponseEntity
				.created(URI.create("/entity/users/"+users.get(users.size() -1 ).getNo()))
				.build();
	}
	
	

	/* 메소드 방식이 다르기 때문에 경로가 같아도 구분이 되어 정상작동함 */
	@PutMapping("/users/{userNo}")
	public ResponseEntity<?> modifyUser(@PathVariable int userNo, @RequestBody UserDTO modifyInfo){
		
		UserDTO foundUser = users.stream().filter(user-> user.getNo() == userNo).toList().get(0);
		foundUser.setId(modifyInfo.getId());
		foundUser.setPwd(modifyInfo.getPwd());
		foundUser.setName(modifyInfo.getName());
		
		
		/* 수정 요청으로 자원이 변경된다면 201번 코드로 응답한다. 
		 * 만약 자원 수정 요청의 결과가 기존의 자원 내용과 동일하여 변경된 내용이 없을 때는 204로 응답할 수 도 있다. 
		 * 204 : 요청이 성공했으나 클라이언트가 현재 페이지에서 벗어나지 않아도 된다는 것을 나타내는 상태코드 */
		return ResponseEntity
				.created(URI.create("/entity/uesrs/"+userNo))
				.build();
	}
	
	
	@DeleteMapping("/users/{userNo}")
	public ResponseEntity<?> removeUser(@PathVariable int userNo){
		
		UserDTO foundUser = users.stream().filter(user->user.getNo() == userNo).toList().get(0);
		users.remove(foundUser);
		
		/* 삭제를 하여 더 이상 참조할 수 없을 경우 204번으로 응답하는 것이 규칙이다. */
		return ResponseEntity
				.noContent()
				.build();
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
