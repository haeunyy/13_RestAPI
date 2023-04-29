package com.greedy.comprehensive.product.controller;


import javax.websocket.server.PathParam;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.greedy.comprehensive.common.paging.Pagenation;
import com.greedy.comprehensive.common.paging.PagingButtonInfo;
import com.greedy.comprehensive.common.paging.ResponseDtoWithPaging;
import com.greedy.comprehensive.product.common.ResponseDto;
import com.greedy.comprehensive.product.dto.ProductDTO;
import com.greedy.comprehensive.product.service.ProductService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/v1")
public class ProductController {
	
	private final ProductService productService;
	
	public ProductController(ProductService productService) {
		this.productService = productService;
	}

	/* 1. 상품 목록 조회 - 페이징, 주문 불가 상품 제외 (고객) */
	/* 응답받을 값을 통일하게 보내기 위해서 ResponseDto를 생성하여 관리한다. */ 
	@GetMapping("/products")																						
	public ResponseEntity<ResponseDto> selectProductList(@RequestParam(name = "page", defaultValue = "1") int page){
		
		log.info("[ProductController] : selectProductList start ========================");
		log.info("[ProductController] page : {}", page);
		
		Page<ProductDTO> productDtoList = productService.selectProductList(page);
		
		PagingButtonInfo pageInfo = Pagenation.getPagingButtonInfo(productDtoList);
		
		log.info("[ProductController] pageInfo : {}", pageInfo);
		
		ResponseDtoWithPaging responseDtoWithPaging  = new ResponseDtoWithPaging();
		responseDtoWithPaging.setPageInfo(pageInfo);
		responseDtoWithPaging.setData(productDtoList.getContent());

		log.info("[ProductController] : selectProductList end ========================");

		return ResponseEntity.ok().body(new ResponseDto(HttpStatus.OK, "조회성공", responseDtoWithPaging));
	}																				// (HttpStatus status(value), String message, Object data)
	
	
	/* 2. 상품 목록 조회 - 페이징, 주문 불가 상품 포함 (관리자) */
	@GetMapping("/products-management")																						
	public ResponseEntity<ResponseDto> selectProductListForAdmin(@RequestParam(name = "page", defaultValue = "1") int page){
		
		log.info("[ProductController] : selectProductListForAdmin start ========================");
		log.info("[ProductController] page : {}", page);
		
		Page<ProductDTO> productDtoList = productService.selectProductListForAdmin(page);
		
		PagingButtonInfo pageInfo = Pagenation.getPagingButtonInfo(productDtoList);
		
		log.info("[ProductController] pageInfo : {}", pageInfo);
		
		ResponseDtoWithPaging responseDtoWithPaging  = new ResponseDtoWithPaging();
		responseDtoWithPaging.setPageInfo(pageInfo);
		responseDtoWithPaging.setData(productDtoList.getContent());

		log.info("[ProductController] : selectProductListForAdmin end ========================");

		return ResponseEntity.ok().body(new ResponseDto(HttpStatus.OK, "조회성공", responseDtoWithPaging));
	}								
	
	
	/* 3. 상품 목록 조회 - 카테고리 기준, 페이징, 주문 불가 상품 제외 (고객) */
	@GetMapping("/products/categories/{categoryCode}")
	public ResponseEntity<ResponseDto> selectProductListByCategory(
						@RequestParam(name = "page", defaultValue = "1") int page, @PathVariable Long categoryCode){
		
		
		log.info("[ProductController] : selectProductListByCategory start ========================");
		log.info("[ProductController] page : {}", page);
		
		Page<ProductDTO> productDtoList = productService.findByCategoryAndProductOrderable(page, categoryCode);
		
		PagingButtonInfo pageInfo = Pagenation.getPagingButtonInfo(productDtoList);
		
		log.info("[ProductController] pageInfo : {}", pageInfo);
		
		ResponseDtoWithPaging responseDtoWithPaging  = new ResponseDtoWithPaging();
		responseDtoWithPaging.setPageInfo(pageInfo);
		responseDtoWithPaging.setData(productDtoList.getContent());
		
		log.info("[ProductController] responseDtoWithPaging : {}", responseDtoWithPaging);


		log.info("[ProductController] : selectProductListByCategory end ========================");

		return ResponseEntity.ok().body(new ResponseDto(HttpStatus.OK, "조회성공", responseDtoWithPaging));
	}		
	
	/* 4. 상품 목록 조회 - 상품명 검색 기준, 페이징, 주문 불가 상품 제외 (고객) */
	@GetMapping("/products/search")
	public ResponseEntity<ResponseDto> selectProductListByProductName(
										@RequestParam(name = "page", defaultValue = "1") int page, @RequestParam(name = "search") String productName){
		
		log.info("[ProductController] : selectProductListByProductName start ========================");
		log.info("[ProductController] page : {}", page);
		log.info("[ProductController] productName : {}", productName);
		
		Page<ProductDTO> productDtoList = productService.selectProductListByProductName(page, productName);
		
		PagingButtonInfo pageInfo = Pagenation.getPagingButtonInfo(productDtoList);
		
		log.info("[ProductController] pageInfo : {}", pageInfo);
		
		ResponseDtoWithPaging responseDtoWithPaging  = new ResponseDtoWithPaging();
		responseDtoWithPaging.setPageInfo(pageInfo);
		responseDtoWithPaging.setData(productDtoList.getContent());

		log.info("[ProductController] : selectProductListByProductName end ========================");

		return ResponseEntity.ok().body(new ResponseDto(HttpStatus.OK, "조회성공", responseDtoWithPaging));
	}		
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
