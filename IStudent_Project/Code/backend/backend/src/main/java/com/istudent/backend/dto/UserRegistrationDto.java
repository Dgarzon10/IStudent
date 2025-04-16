package com.istudent.backend.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserRegistrationDto {
    private String email;
    private String hashedPassword;
    private String role;
    private Long instituteId;
    private LocalDateTime createdAt;
}
