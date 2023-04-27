package com.greedy.api.section04.hateoas;

import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.Link;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.greedy.api.section02.responseentity.ResponseMessage;
import com.greedy.api.section03.valid.UserDTO;


@RestController
@RequestMapping("/hateoas")
public class HateoasTestController {
	
	/* Hateoas란 REST API를 사용하는 클라이언트가 전적으로 서버와 동적인 
	 * 상호작용이 가능하도록 하는 것이다. 
	 * 클라이언트의 요청에 대한 서버의 응답을 하고 , 
	 * 다른 자원에 접근할 수 있는 링크도 같이 응답으로 제공하는 것을 권장한다. 
	 * 리스트를 보여주면서 항목을 누르면 상세페이지로 연결하는 기능이 필요하다고 할 때
	 * 유저의 리스트로 반환하면서 각 항목에 링크 기능도 함께 전달하는것을 말함 */
	
	/* mven repo에서 받아온다. */
	private List<UserDTO> users;

	public HateoasTestController() {
		users = new ArrayList<>();
		users.add(new UserDTO(1, "user01","pass01","홍길동",new Date()));
		users.add(new UserDTO(2, "user02","pass02","홍길",new Date()));
		users.add(new UserDTO(3, "user03","pass03","홍",new Date()));
	}
	
	@GetMapping("/users")
	public ResponseEntity<ResponseMessage> findAllUsers(){
		
		// import org.springframework.http.HttpHeaders;
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
		
		/* 1. EntityModel
		 * Link : 다른 자원에 접근할 수 있는 링크 하이퍼 미디어를 제공 
		 * RepresentationModel 클래스는 Link 객체를 담을 수 있고 이를 상속한 EntityModel 클래스는 해당 링크를 가진 
		 * 자원 객체(content)를 담을 수 있다. 
		 * 모델의 add메소드로 담긴 Link 객체들이 반환 값에 links 배열로 담긴다. 
		 * 각 링크에는 링ㅌ크 객체 생성 시 매개변수로 정의한 위치(href)와 관계(rel)가 담겨 있으며
		 * 클라이언트 측에서는 이 정보를 이용하여 다른 자원들에 접근하거나 서비스를 이용할 수 있다.
		 * */
		/*
		 List<EntityModel<UserDTO>> userWithRel = 
				
				users.stream().map(user-> { // map 가공 변형시켜서 반환해준다.
					// 각 User 객체의 엔티티 모델 생성 
					EntityModel<UserDTO> entityModel = EntityModel.of(user);
					// 각 엔티티 모델마다 링크 추가 
					entityModel.add(Link.of("/hateoas/users", "list"));
					entityModel.add(Link.of("/hateoas/users/"+user.getNo(), "detail"));
					return entityModel;
				}).collect(Collectors.toList());
				*/
		
		/* 2. WebMvcLinkBuilder
		 * 링크를 일일히 지정하면 변경에 유연하게 대처하지 못하는 점을 보완할 수 있다. 
		 * linkTo :  해당 자원에 대한 링크 객체를 생성
		 * methodOn : 해당 클래스의 메소드를 참조하는데 사용
		 * => 특정 컨트롤러 클래스의 Mapping 메소드 기반으로 자동 링크 생성
		 */
		List<EntityModel<UserDTO>> userWithRel = 
				users.stream().map(user-> EntityModel.of(user, 
						// HateoasTestController의 findUserByNo 메소드에 대한 자기 자신 (self)링크 생성
						linkTo(methodOn(HateoasTestController.class).findUserByNo(user.getNo())).withSelfRel(),
						// HateoasTestController의 findAllUsers 메소드에 대한 list 링크 생성
						linkTo(methodOn(HateoasTestController.class).findAllUsers()).withRel("users")
						)).collect(Collectors.toList());

		
		Map<String , Object> responseMap = new HashMap<>();
		responseMap.put("users",userWithRel);
		
		ResponseMessage responseMessage = new ResponseMessage(200, "조회 성공", responseMap);
		
		// ResponseEntity<>(body[데이터값], header[웹서버가 웹브라우저에 응답하는 메시지], status)
		return new ResponseEntity<>(responseMessage, headers, HttpStatus.OK);
	}
	
	
	@GetMapping("/users/{userNo}")
	public ResponseEntity<ResponseMessage> findUserByNo(@PathVariable int userNo){
		
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
		
		UserDTO foundUser = users.stream().filter(user-> user.getNo() == userNo ).toList().get(0);
		
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
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

}
