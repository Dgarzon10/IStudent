package com.istudent.backend.dto;

import lombok.Data;

@Data
public class UserRegistrationDto {
    private String email;
    private String hashedPassword;
    private String role;
    private Long institute_Id;
}
