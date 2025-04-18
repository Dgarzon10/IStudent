package com.istudent.backend.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class PostResponseDto {
    private Long id;
    private ForumDto forum;
    private String title;
    private String body;
    private String status;
    private LocalDateTime createdAt;
    private UserResponseDto user;
}
