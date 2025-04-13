package com.istudent.backend.dto;

import lombok.Data;

@Data
public class PostDto {
    private Long userId;
    private String title;
    private String body;
    private String forumType;
}
