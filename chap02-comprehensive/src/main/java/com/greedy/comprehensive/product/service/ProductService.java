package com.greedy.comprehensive.product.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.greedy.comprehensive.product.dto.ProductDTO;
import com.greedy.comprehensive.product.entity.Category;
import com.greedy.comprehensive.product.entity.Product;
import com.greedy.comprehensive.product.repository.CategoryRespository;
import com.greedy.comprehensive.product.repository.ProductRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class ProductService {
	
	private final ProductRepository productRepository;
	private final CategoryRespository categoryRepository;
	private final ModelMapper modelMapper;
	
	public ProductService(ProductRepository productRepository, ModelMapper modelMapper, CategoryRespository categoryRepository) {
		this.productRepository = productRepository;
		this.modelMapper = modelMapper;
		this.categoryRepository = categoryRepository;
	}
	
	@Value("${image.image-url}")
	private String IMAGE_URL;
	
	/* 1. 상품 목록 조회 - 페이징, 주문 불가 상품 제외 (고객) */
	public Page<ProductDTO> selectProductList(int page){
		
		log.info("[ProductService] selectProductList start =====================");
		
		Pageable pageable = PageRequest.of(page -1, 10, Sort.by("productCode").descending());
		// PageRequest org.springframework.data.domain.PageRequest.of(int page, int size, Sort sort)
		
		Page<Product> productList = productRepository.findByProductOrderable(pageable, "Y");
		/* 라이브러리 ModelMapper 사용 */
		Page<ProductDTO> productDtoList = productList.map(product-> modelMapper.map(product, ProductDTO.class));
		// 모델매퍼를 통해 디티오 형태로 값을 얻을 수 있게 된다. 
		productDtoList.forEach(product -> product.setProductImgUrl(IMAGE_URL + product.getProductImgUrl()));
		
		log.info("[ProductService] productDtoList.getContent : {}", productDtoList.getContent());
		log.info("[ProductService] selectProductList end =====================");

		
		
		return productDtoList;
	}
	
	
	/* 2. 상품 목록 조회 - 페이징, 주문 불가 상품 포함 (관리자) */
	/* 1. 상품 목록 조회 - 페이징, 주문 불가 상품 제외 (고객) */
	public Page<ProductDTO> selectProductListForAdmin(int page){
		
		log.info("[ProductService] selectProductListForAdmin start =====================");
		
		Pageable pageable = PageRequest.of(page -1, 10, Sort.by("productCode").descending());
		// PageRequest org.springframework.data.domain.PageRequest.of(int page, int size, Sort sort)
		
		Page<Product> productList = productRepository.findByProductOrderable(pageable, "Y");
		/* 라이브러리 ModelMapper 사용 */
		Page<ProductDTO> productDtoList = productList.map(product-> modelMapper.map(product, ProductDTO.class));
		// 모델매퍼를 통해 디티오 형태로 값을 얻을 수 있게 된다. 
		productDtoList.forEach(product -> product.setProductImgUrl(IMAGE_URL + product.getProductImgUrl()));
		
		log.info("[ProductService] selectProductListForAdmin end =====================");

		return productDtoList;
	}
	
	
	/* 3. 상품 목록 조회 - 카테고리 기준, 페이징, 주문 불가 상품 제외 (고객) */
	public Page<ProductDTO> selectProductListByCategory(int page, Long categoryCode) {
		
		log.info("[ProductService] selectProductListByCategory start =====================");

		Pageable pageable = PageRequest.of(page -1, 10, Sort.by("productCode").descending());
		
		// 카체고리 코드가 아니라 카테고리 엔티티를 전달해야한다 왜냐면 프로덕트 안에 카테고리 엔티티로 받아야하기 때문
		/* 전달할 카테고리 엔티티를 먼저 조회한다. */
		Category findCategory = categoryRepository.findById(categoryCode)/* 카테고리 엔티티 인터페이스를 정의하여 사용한다.  이미 구현되어있는 메소드이기때문에 레포만 있으면 된다. -> 인터페이스 상속으로 형태만 셍ㅇ성*/
				.orElseThrow(()-> new IllegalArgumentException("해당 카테고리가 없습니다. category = "+categoryCode));
		// Type mismatch: cannot convert from Optional<Category> to Category
		
		Page<Product> productList = productRepository.findByCategoryAndProductOrderable(pageable, findCategory, "y");
		Page<ProductDTO> productDtoList = productList.map(product-> modelMapper.map(product, ProductDTO.class));

		productDtoList.forEach(product -> product.setProductImgUrl(IMAGE_URL + product.getProductImgUrl()));
		log.info("[ProductService] selectProductListByCategory end =====================");


		return productDtoList;
	}
	
	
	/* 4. 상품 목록 조회 - 상품명 검색 기준, 페이징, 주문 불가 상품 제외 (고객) 
	 * 검색 조건은 pathVariable이 아닌 parameter 로 전달받아서 URL 설정. */
	public Page<ProductDTO> selectProductListByProductName(int page, String productName){
		
		log.info("[ProductService] selectProductListByCategory start =====================");

		Pageable pageable = PageRequest.of(page -1, 10, Sort.by("productCode").descending());
		
		// 카체고리 코드가 아니라 카테고리 엔티티를 전달해야한다 왜냐면 프로덕트 안에 카테고리 엔티티로 받아야하기 때문
		/* 전달할 카테고리 엔티티를 먼저 조회한다. */
		Category findCategory = categoryRepository.findById(categoryCode)/* 카테고리 엔티티 인터페이스를 정의하여 사용한다.  이미 구현되어있는 메소드이기때문에 레포만 있으면 된다. -> 인터페이스 상속으로 형태만 셍ㅇ성*/
				.orElseThrow(()-> new IllegalArgumentException("해당 카테고리가 없습니다. category = "+categoryCode));
		// Type mismatch: cannot convert from Optional<Category> to Category
		
		Page<Product> productList = productRepository.findByProductNameContainsAndProductOrderable(pageable, findCategory, "y");
		Page<ProductDTO> productDtoList = productList.map(product-> modelMapper.map(product, ProductDTO.class));

		productDtoList.forEach(product -> product.setProductImgUrl(IMAGE_URL + product.getProductImgUrl()));
		log.info("[ProductService] selectProductListByCategory end =====================");


		return productDtoList;
	}

	
	public ProductDTO selectProForAdmin(Long proCode) {
		
		ProductDTO product = productRepository.
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

}
