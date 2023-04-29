package com.greedy.comprehensive.product.dto;

import lombok.Data;

@Data	// 필드 수정이 있을것으로 예상되어 Data 사용 
public class ProductDTO {

	private Long productCode;
	private String productName;
	private String productPrice;
	private String productDescription;
	private String productOrderable;
	private CategoryDTO category;
	private String productImgUrl;
	private Long productStock;
	


}
