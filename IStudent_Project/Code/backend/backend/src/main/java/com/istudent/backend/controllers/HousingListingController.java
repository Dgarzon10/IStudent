package com.istudent.backend.controllers;

import com.istudent.backend.dto.HousingListingDto;
import com.istudent.backend.dto.HousingListingResponseDto;
import com.istudent.backend.service.HousingListingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/housing")
@RequiredArgsConstructor
@Tag(name = "Housing", description = "Operation over Housing")
public class HousingListingController {

    private final HousingListingService housingListingService;

    @PostMapping
    @Operation(summary = "Created a Housing Option")
    public ResponseEntity<HousingListingResponseDto> createListing(@RequestBody HousingListingDto dto) {
        return ResponseEntity.ok(housingListingService.createListing(dto));
    }

    @GetMapping
    @Operation(summary = "Get all Housing")
    public ResponseEntity<List<HousingListingResponseDto>> getAllListings() {
        return ResponseEntity.ok(housingListingService.getAllListings());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get an specific Housing")
    public ResponseEntity<HousingListingResponseDto> getListingById(@PathVariable Long id) {
        return ResponseEntity.ok(housingListingService.getListingById(id));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deleted Housing")
    public ResponseEntity<Void> deleteListing(@PathVariable Long id) {
        housingListingService.deleteListing(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/filter")
    @Operation(summary = "Filter the HOusing options by Location, minPrice and MaxPrice")
    public ResponseEntity<List<HousingListingResponseDto>> filterListings(
            @RequestParam(required = false) String location,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice) {
        return ResponseEntity.ok(housingListingService.filterListings(location, minPrice, maxPrice));
    }

}
