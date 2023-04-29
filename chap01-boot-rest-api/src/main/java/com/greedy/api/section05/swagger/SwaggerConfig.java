package com.greedy.api.section05.swagger;

import java.util.HashSet;
import java.util.Set;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

/*Swagger : API문서를 자동으로 만들어주는 라이브러리
 * 단순 문서 뿐 아니라 문서 내에서 paorameter를 넣어 실행 테스트도 가능함.
 * 복잡하지 않은 시스템이라면 해당  API 호출자에게 별도의 설명 및 문서제공 없이도 Swagger URL만으로 설명이 가능함. 
 * 
 * http://localhost:8001/swagger-ui/index.html*/
@Configuration
@EnableWebMvc
public class SwaggerConfig {
	
	private ApiInfo swaggerInfo() {
		
		return new ApiInfoBuilder()
				.title("GREEDY API")
				.description("spring boot swagger 연동 테스트")
				.build();
	}
	
	@Bean
	public Docket swaggerApi() {
		return new Docket (DocumentationType.SWAGGER_2)
				.consumes(getComsumeContentTypes())
				.produces(getProduceContentTypes())
				.apiInfo(swaggerInfo())
				.select()
				.apis(RequestHandlerSelectors.basePackage("com.greedy.api.section05"))		// 지정 된 패키지만 api 로 변환
//				.apis(RequestHandlerSelectors.any())		// 모든 경로를 api 화
				.paths(PathSelectors.any())					// 모든 URL 패턴에 대해 수행 
				.build();
	}
	
	// json형태의 문자를 보내는것과 키밸류 형식으로 데이터가 넘어오는 것을 허용하겠다.. 
	private Set<String> getComsumeContentTypes(){
		Set<String> consumes = new HashSet<>();
		consumes.add("application/json; charset=UTF-8");
		consumes.add("application/x-www-from-urlencoded");
		return consumes;
	}
	
	// json형태의 문자로 넘어오는 것을 허용하겠다.. 
	private Set<String> getProduceContentTypes(){
		Set<String> produces = new HashSet<>();
		produces.add("application/json; charset=UTF-8");
		return produces;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

}
