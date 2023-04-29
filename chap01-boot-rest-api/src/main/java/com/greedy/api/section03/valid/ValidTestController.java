package com.greedy.api.section03.valid;

import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/valid")
public class ValidTestController {

	
	/*  조회기능 exception 발생 시 처리 방법*/
	@GetMapping("/users/{userNo}")
	public ResponseEntity<?> findUserByNo() throws UserNotFoundException{
		
		boolean check = true;
		if(check) {
			throw new UserNotFoundException("회원 정보를 찾을 수 없습니다. ");
		}
		
		return ResponseEntity.ok().build();
	}
	
	@PostMapping("/users")
	public ResponseEntity<?> registUser(@Validated @RequestBody UserDTO user){
		
		/* user  객체 생성하고자 할 떼 유효성 검사 모듈 사용하여 예외처리 */
		
		return ResponseEntity
				.created(URI.create("/valid/users/4"))
				.build();
		}
	

	
}
