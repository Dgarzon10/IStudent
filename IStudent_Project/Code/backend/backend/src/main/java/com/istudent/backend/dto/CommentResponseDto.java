package com.istudent.backend.dto;

import lombok.Data;

@Data
public class CommentResponseDto {
    private Long id;
    private UserResponseDto user;
    private String body;
    private String status;
    private Long postId;
}
