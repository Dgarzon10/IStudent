package com.istudent.backend.dto;

import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class HousingListingResponseDto {
    private Long id;
    private Double price;
    private String location;
    private String body;
    private Double latitude;
    private Double longitude;
    private LocalDate availableFrom;
    private LocalDateTime publishedAt;
    private Integer bedrooms;
    private Integer bathrooms;
    private Double area;
    private String propertyType;
    private String status;
    private List<String> services;
    private List<String> imageUrls;
    private UserResponseDto user;
}
