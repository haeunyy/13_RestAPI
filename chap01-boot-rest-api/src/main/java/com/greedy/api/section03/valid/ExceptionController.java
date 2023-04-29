package com.greedy.api.section03.valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

/* @ControllerAdvice : 컨트롤러를 보조해주는 기능을 제공한다는 것을 명시하는 어노테이션으로 
 * 해당 클래스내에 전역 예외처리를 등록할 수 있다. */
@ControllerAdvice
public class ExceptionController {

	@ExceptionHandler(UserNotFoundException.class)
	public  ResponseEntity<ErrorResponse> handleUserException(UserNotFoundException e){
		
		String code = "ERROR_CODE_00000";
		String description = "회원 정보 조회 실패";
		String detail = e.getMessage();
			
		return new ResponseEntity<>(
				new ErrorResponse(code, description,detail), HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ErrorResponse> methodValidException(MethodArgumentNotValidException e){
		String code= "";
		String description = "";
		String detail = "";
		
		if(e.getBindingResult().hasErrors()) {
			detail = e.getBindingResult().getFieldError().getDefaultMessage();
			
			String bindResultcode = e.getBindingResult().getFieldError().getCode();
			
			switch(bindResultcode) {
			case "NotNull" : 
				code = "ERROR_CODE_0001";
				description = "필수값이 누락되었습니다. ";
				break;
			case "NotBlank" : 
				code = "ERROR_CODE_0002";
				description = "필수값이 공백으로 처리되었습니다. ";	
				break;
			case "Size" : 
				code = "ERROR_CODE_0003";
				description = "알맞은 크기의 값이 입력되지 않았습니다. ";
				break;
			case "Past" : 
				code = "ERROR_CODE_0004";
				description = "알맞은 기간의 값이 입력되지 않았습니다. ";			
				break;
			}

		}
		return new ResponseEntity<>(new ErrorResponse(code, description, detail), HttpStatus.BAD_REQUEST);
	}
}
