package com.greedy.comprehensive.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.greedy.comprehensive.exception.dto.ApiExceptionDTO;

@RestControllerAdvice
public class ApiExceptionAdvice {
	
	@ExceptionHandler(RuntimeException.class)
	public ResponseEntity<ApiExceptionDTO> exceptionHandler(RuntimeException e){
		
		return ResponseEntity
				.status(HttpStatus.INTERNAL_SERVER_ERROR) // HttpStatus.INTERNAL_SERVER_ERROR 서버내부에서 오류가 발생하였습니다. 
				.body(new ApiExceptionDTO(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage()));
	}
}
