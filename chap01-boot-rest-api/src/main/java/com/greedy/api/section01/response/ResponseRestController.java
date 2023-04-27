package com.greedy.api.section01.response;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/* @Controller + @ResponseBody 
 * 뷰의 이름을 리턴하는게 아니라 
 * 응답 데이터를 반환한다. 
 * 클래스 레벨에 작성하며 해당 클래스 내의 모든 핸들러 메소드에 @ResponseBody 어노테이션을 묵시적으로 적용한다는 의미 */
@RestController
@RequestMapping("/response")
public class ResponseRestController {

	@GetMapping("/hello")
	public String helloworld() {
		
		return "hello world 희희 ^^ ";	// 응답 데이터를 반환한다. 
		/* http://localhost:8001/response/hello 요청을 하면 
		 * 뷰에 "hello world"를 확인할 수 있다.  */ 
	}
	
	/* 2. 기본 자료형 응답 */
	@GetMapping("/random")
	public int getRandomNumber() {
		
		return (int) (Math.random() * 10)+1;
	}
	
	
	/* 3. Object 응답 */
	/*
	 	private int httpStatusCode;
		private String message;
	 */
	@GetMapping("/message")
	public Message getMessage() {
		return new Message(200, "메세지를 응답합니다.");
	}
	
	/* 4. List 응답 */
	@GetMapping("/list")
	public List<String> getList(){
		return List.of(new String[] {"사과가 아니고","바나나","복숭아"});
	}
	
	/* 5. map 응답 */
	@GetMapping("/map")
	public Map<Integer, String> getMap(){
		List<Message> messageList = new ArrayList<>();
		messageList.add(new Message(200,"정상 응답인데 "));
		messageList.add(new Message(404,"페이지를 찾을 수 없습니다. "));
		messageList.add(new Message(500,"개발자의 잘못!"));
		
		return messageList.stream().collect(
				Collectors.toMap(Message::getHttpStatusCode/*key*/, Message::getMessage/*value*/));
	}
	
	
	/*6. ImageFile 응답 */
	// import org.springframework.http.MediaType;
	/* produces 설정은 response header 의 context-type설정이다. 
	 * 설정을 따로 하지않으면 text/html로 응답하기 때문에 이미지가 텍스트 형태로 전송된다. */
	@GetMapping(value="/image", produces=MediaType.IMAGE_PNG_VALUE)
	public byte[] getImage() throws IOException {
		return getClass()
				.getResourceAsStream("/com/greedy/api/section01/response/sample.PNG").readAllBytes();
	}
	
	/* 7. ResponseEntity를 이용한 응답 */
	@GetMapping("/entity")
	public ResponseEntity<Message> getEntity(){
		
		return ResponseEntity.ok(new Message(123, "hello world"));
	}
	
	
	
	
	
	
	
}