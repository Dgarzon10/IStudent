package com.istudent.backend.controllers;

import com.istudent.backend.dto.InstituteDto;
import com.istudent.backend.dto.InstituteResponseDto;
import com.istudent.backend.service.InstituteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/institutes")
@RequiredArgsConstructor
@Tag(name = "Institute", description = "Operation over Institute")
@CrossOrigin
public class InstituteController {

    private final InstituteService instituteService;

    @PostMapping
    @Operation(summary = "Created a Institute")
    public ResponseEntity<InstituteResponseDto> createInstitute(@RequestBody InstituteDto dto) {
        InstituteResponseDto created = instituteService.createInstitute(dto);
        return ResponseEntity.ok(created);
    }

    @GetMapping
    @Operation(summary = "Get all Institutes")
    public ResponseEntity<List<InstituteResponseDto>> getAllInstitutes() {
        return ResponseEntity.ok(instituteService.getAllInstitutes());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get an specific Institute")
    public ResponseEntity<InstituteResponseDto> getInstituteById(@PathVariable Long id) {
        return ResponseEntity.ok(instituteService.getInstituteById(id));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deleted an Institute")
    public ResponseEntity<Void> deleteInstitute(@PathVariable Long id) {
        instituteService.deleteInstitute(id);
        return ResponseEntity.noContent().build();
    }
}
