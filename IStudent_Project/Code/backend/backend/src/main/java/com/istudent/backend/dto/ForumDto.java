package com.istudent.backend.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ForumDto {
    private String name;
    private String description;
    private String type;
    private Long instituteId;
    private LocalDateTime createdAt;
}
