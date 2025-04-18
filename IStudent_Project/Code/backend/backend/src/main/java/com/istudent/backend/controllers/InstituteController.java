package com.istudent.backend.controllers;

import com.istudent.backend.dto.InstituteDto;
import com.istudent.backend.dto.InstituteResponseDto;
import com.istudent.backend.service.InstituteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/institutes")
@RequiredArgsConstructor
public class InstituteController {

    private final InstituteService instituteService;

    @PostMapping
    public ResponseEntity<InstituteResponseDto> createInstitute(@RequestBody InstituteDto dto) {
        InstituteResponseDto created = instituteService.createInstitute(dto);
        return ResponseEntity.ok(created);
    }

    @GetMapping
    public ResponseEntity<List<InstituteResponseDto>> getAllInstitutes() {
        return ResponseEntity.ok(instituteService.getAllInstitutes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<InstituteResponseDto> getInstituteById(@PathVariable Long id) {
        return ResponseEntity.ok(instituteService.getInstituteById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInstitute(@PathVariable Long id) {
        instituteService.deleteInstitute(id);
        return ResponseEntity.noContent().build();
    }
}
