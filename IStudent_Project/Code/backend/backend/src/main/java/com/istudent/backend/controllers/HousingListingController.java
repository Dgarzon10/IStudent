package com.istudent.backend.controllers;

import com.istudent.backend.dto.HousingListingDto;
import com.istudent.backend.dto.HousingListingResponseDto;
import com.istudent.backend.service.HousingListingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/housing")
@RequiredArgsConstructor
public class HousingListingController {

    private final HousingListingService housingListingService;

    @PostMapping
    public ResponseEntity<HousingListingResponseDto> createListing(@RequestBody HousingListingDto dto) {
        return ResponseEntity.ok(housingListingService.createListing(dto));
    }

    @GetMapping
    public ResponseEntity<List<HousingListingResponseDto>> getAllListings() {
        return ResponseEntity.ok(housingListingService.getAllListings());
    }

    @GetMapping("/{id}")
    public ResponseEntity<HousingListingResponseDto> getListingById(@PathVariable Long id) {
        return ResponseEntity.ok(housingListingService.getListingById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteListing(@PathVariable Long id) {
        housingListingService.deleteListing(id);
        return ResponseEntity.noContent().build();
    }
}
