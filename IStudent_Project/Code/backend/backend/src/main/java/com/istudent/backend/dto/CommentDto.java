package com.istudent.backend.dto;

import lombok.Data;

@Data
public class CommentDto {
    private Long userId;
    private String title;
    private String body;
    private Long postId;
}
