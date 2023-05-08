package com.greedy.comprehensive.review.service;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.greedy.comprehensive.member.dto.MemberDto;
import com.greedy.comprehensive.product.dto.ProductDto;
import com.greedy.comprehensive.product.entity.Product;
import com.greedy.comprehensive.product.repository.ProductRepository;
import com.greedy.comprehensive.review.dto.ReviewDto;
import com.greedy.comprehensive.review.entity.Review;
import com.greedy.comprehensive.review.repository.ReviewRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class ReviewService {
	
	private ReviewRepository reviewRepository;
	private ProductRepository productRepository;
	private ModelMapper modelMapper;
	
	public ReviewService(ReviewRepository reviewRepository, ModelMapper modelMapper, ProductRepository productRepository) {
		this.reviewRepository = reviewRepository;
		this.modelMapper = modelMapper;
		this.productRepository = productRepository;
	}

	/* 1. 상품별 리뷰 목록 조회 (페이징) */
	public Page<ReviewDto> selectReviewListWithPaging(Long productCode, int page) {
		log.info("[ReviewService] selectReviewListWithPaging start =============================");

		Pageable pageable = PageRequest.of(page -1, 10, Sort.by("productCode").descending());
		Product product = productRepository.findById(productCode)
				.orElseThrow(()-> new IllegalArgumentException("해당 상품은 존제하지 않습니다. "));
		// 이거 왜 findbyProductCode인지 ㅜ ㅜ 

		Page<ReviewDto> reviewDtoList = reviewRepository.findByProduct(product, pageable)
				.map(review -> modelMapper.map(review, ReviewDto.class));
		// pageable과 fetch join 불가능하다. 
		// 따라서 쿼리 메소드로 작성해야한다. 
		
		log.info("[ReviewService] reviewDtoList : {}", reviewDtoList);
		log.info("[ReviewService] selectReviewListWithPaging end =============================");
		return reviewDtoList;
	}

	public ReviewDto selectMemberReview(Long productCode, Long memberCode) {
		
		Review review = reviewRepository.findByProductAndReviewer(productCode, memberCode).orElse(new Review());

		return modelMapper.map(review, ReviewDto.class);
		
	}

}
