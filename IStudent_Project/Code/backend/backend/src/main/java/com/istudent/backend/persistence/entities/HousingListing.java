package com.istudent.backend.persistence.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@Entity
@Table(name = "housing_listing")
public class HousingListing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false)
    private Double price;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String body;

    private Double latitude;
    private Double longitude;

    @Column(name = "available_from", nullable = false)
    private LocalDate availableFrom;

    @Column(name = "published_at", nullable = false)
    private LocalDateTime publishedAt;

    private Integer bedrooms;
    private Integer bathrooms;
    private Double area;

    @Column(nullable = false)
    private String propertyType; // Ej: "house", "apartment", "room"

    @Column(nullable = false)
    private String status; // Ej: "available", "reserved", "occupied"

    @ElementCollection
    private List<String> services = new ArrayList<>();

    @OneToMany(mappedBy = "housingListing", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<HousingImage> images = new ArrayList<>();
}
