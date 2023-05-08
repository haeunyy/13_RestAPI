package com.greedy.comprehensive.review.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.greedy.comprehensive.product.entity.Product;
import com.greedy.comprehensive.review.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {


	// Pageable 객체를 전달해서 페이징 할때 jpql의 fetch구문을 사용하는 것이 불가능 하다. 
	// 따라서 쿼리 메소드를 작성하여 @EntityGraph를 사용한다. 
	/* 1. 상품별 리뷰 목록 조회 (페이징) */
	@EntityGraph(attributePaths = {"product", })
	Page<Review> findByProduct(Product product, Pageable pageable);

	// 별칭을 반드시 사용 
	@Query("SELECT r FORM Review r JOIN fetch r.product JOIN fetch r.reviewer WHERE r.product.productCode = :productCode AND r.reviewer.memberCode= :memberCode")
	Optional<Review> findByProductAndReviewer(Long productCode, Long memberCode);

	
}
