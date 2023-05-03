package com.greedy.comprehensive.jwt;

import java.security.Key;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.greedy.comprehensive.member.dto.MemberDto;
import com.greedy.comprehensive.member.dto.TokenDto;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;


@Component
@Slf4j
public class TokenProvider {
	
	private static final String AUTHORITIES_KEY = "auth";
	private static final long ACCESS_TOKEN_EXPIRE_TIME = 1000 * 60 * 30;	// 30분 (밀리세컨기준)
	private static final String BEARER_TYPE = "bearer";
	private final Key key;
	
	public TokenProvider(@Value("${jwt.secret}") String secretKey) {
		byte[] keyBytes = Decoders.BASE64.decode(secretKey);
		this.key = Keys.hmacShaKeyFor(keyBytes);
	}

	public TokenDto generateTokenDto(MemberDto member) {
		
		log.info("[TokenProvider] generateTokenDto Start =====================================");
		
		//Claims라고 불리우는 JWT body(payload)에 정보 담기
		Claims claims = Jwts.claims().setSubject(member.getMemberId());
		// 권한도 claims에 담기
		List<String> roles = Collections.singletonList(member.getMemberRole());
		claims.put(AUTHORITIES_KEY, roles);
		// 토큰 만료 시간 설정
		long now = new Date().getTime();
		Date accessTokenExpiresIn = new Date(now + ACCESS_TOKEN_EXPIRE_TIME);
		// AccessToken 생성
		String accessToken = Jwts.builder()
				.setClaims(claims)
				.setExpiration(accessTokenExpiresIn)
				.signWith(key, SignatureAlgorithm.HS512)
				.compact();
		
		return new TokenDto(BEARER_TYPE, member.getMemberName(), accessToken, accessTokenExpiresIn.getTime());
	}

}








