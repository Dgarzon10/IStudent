package com.istudent.backend.dto;

import lombok.Data;

@Data
public class CommentDto {
    private Long id;
    private Long userId;
    private String body;
    private String status;
    private Long postId;
}
