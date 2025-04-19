package com.istudent.backend.persistence.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@Entity
@Table(name = "forum")
public class Forum {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "institute_id", nullable = true)
    private Institute institute;

    @Column(nullable = false)
    private String topic;

    @Column(nullable = false)
    private String type; // Ej: "institutional", "general", "events"


    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
}
