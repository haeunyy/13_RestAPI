package com.greedy.api.section03.valid;

import java.util.Date;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;
import javax.validation.constraints.Size;

import org.springframework.format.annotation.DateTimeFormat;


/* 데이터 검증 (validation)
 * 클라이언트의 데이타는 조작이 쉽고, 모든 데이터가 정상적인 방식으로 들어오지 않을 가능성 도 있기 때문에 
 * Client side 뿐만 아니라 Server side에서도 데이터 유효성 검사를 할 필요가 있다. 
 * => spring boot stater validation 활용 
 * 
 * 사용방법
 * 1. 의존성 추가
 * 2. controller의 핸들러 메소드의 유효성 검사 적용할 request 객체 앞에 @Validated 어노테이션 작성
 * 3. request를 핸들링 할 객체 정의시 @Validation 어노테이션을 통해 필요한 유효성 검사 적용
 * */
public class UserDTO {

	private int no;
	
	@NotNull(message="아이디는 반드시 입력되어야 합니다. ")	// null은 허용하지 않으나 "", " "등은 허용
	@NotBlank(message="아이디는 공백일 수 없습니다. ")			// null, "", " " 모두 허용하지 않음
	private String id;
	private String pwd;
	
	@Size(min=2, message="이름은 두글자 이상 입력해야합니다. ")
	private String name;
	
	@DateTimeFormat(pattern="yyyy-MM-dd")
	@Past	/* @Past : 현재보다 과거여야 한다. , @Future : 현재보다 미래 */
	private Date enrollDate;
	
	public UserDTO () {}

	public UserDTO(int no, String id, String pwd, String name, Date enrollDate) {
		super();
		this.no = no;
		this.id = id;
		this.pwd = pwd;
		this.name = name;
		this.enrollDate = enrollDate;
	}

	public int getNo() {
		return no;
	}

	public void setNo(int no) {
		this.no = no;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getPwd() {
		return pwd;
	}

	public void setPwd(String pwd) {
		this.pwd = pwd;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getEnrollDate() {
		return enrollDate;
	}

	public void setEnrollDate(Date enrollDate) {
		this.enrollDate = enrollDate;
	}

	@Override
	public String toString() {
		return "UserDTO [no=" + no + ", id=" + id + ", pwd=" + pwd + ", name=" + name + ", enrollDate=" + enrollDate
				+ "]";
	}
	
	
}
