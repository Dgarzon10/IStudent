package com.istudent.backend.dto;

import lombok.Data;

@Data
public class PostDto {
    private Long userId;
    private Long forumId;
    private String title;
    private String body;
    private String status;
}
