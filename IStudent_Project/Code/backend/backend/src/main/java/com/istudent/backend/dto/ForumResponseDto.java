package com.istudent.backend.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ForumResponseDto {
    private Long id;
    private String name;
    private String description;
    private String type;
    private String topic;
    private Long instituteId;
    private String instituteName;
    private LocalDateTime createdAt;
}
