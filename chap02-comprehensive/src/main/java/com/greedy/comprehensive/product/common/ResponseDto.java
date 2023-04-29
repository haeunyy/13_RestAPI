package com.greedy.comprehensive.product.common;

import org.springframework.http.HttpStatus;

import lombok.Data;

@Data
public class ResponseDto {

	private int status;
	private String message;
	private Object data;
	
	public ResponseDto(HttpStatus status, String message, Object data) {
//		this.status = status;
		this.status = status.value(); // ok면 200를 뽑아서 사용하겠다. 
		this.message = message;
		this.data = data;
	}
	
}
