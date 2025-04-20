package com.istudent.backend.dto;

import lombok.Data;


@Data
public class ForumDto {
    private String name;
    private String description;
    private String type;
    private String topic;
    private Long instituteId;
}
