package com.greedy.api.section04.hateoas;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import java.util.stream.Collectors;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.hateoas.server.reactive.ReactiveRepresentationModelAssembler;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;


@Component
public class EntityToModelConverter implements RepresentationModelAssembler<UserDTO, EntityModel<UserDTO>> {

	@Override
	public EntityModel<UserDTO> toModel(UserDTO user) {
		return EntityModel.of(user,
		linkTo(methodOn(HateoasTestController.class).findUserByNo(user.getNo())).withSelfRel(),
		linkTo(methodOn(HateoasTestController.class).findAllUsers()).withRel("users"));
	}
	
	

}
