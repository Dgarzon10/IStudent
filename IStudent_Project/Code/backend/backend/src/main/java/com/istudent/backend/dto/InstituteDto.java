package com.istudent.backend.dto;

import lombok.Data;

@Data
public class InstituteDto {
    private String name;
    private String description;
    private String website;
    private String logoUrl;
    private String contactEmail;
    private String phoneNumber;
}
