package com.istudent.backend.controllers;

import com.istudent.backend.dto.ForumDto;
import com.istudent.backend.dto.ForumResponseDto;
import com.istudent.backend.service.ForumService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/forums")
@RequiredArgsConstructor
@Tag(name = "Forum", description = "Operations over Forums")
@CrossOrigin
public class ForumController {

    private final ForumService forumService;

    @PostMapping
    @Operation(summary = "Created a Forum")
    public ResponseEntity<ForumResponseDto> createForum(@RequestBody ForumDto forumDto) {
        ForumResponseDto createdForum = forumService.createForum(forumDto);
        return ResponseEntity.ok(createdForum);
    }

    @GetMapping
    @Operation(summary = "Get all Forums")
    public ResponseEntity<List<ForumResponseDto>> getAllForums() {
        List<ForumResponseDto> forums = forumService.getAllForums();
        return ResponseEntity.ok(forums);
    }

    @GetMapping("/institute/{instituteId}")
    @Operation(summary = "Get Forums of an Institution")
    public ResponseEntity<List<ForumResponseDto>> getForumsByInstitute(@PathVariable Long instituteId) {
        List<ForumResponseDto> forums = forumService.getForumsByInstitute(instituteId);
        return ResponseEntity.ok(forums);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a specific Forum")
    public ResponseEntity<ForumResponseDto> getForumById(@PathVariable Long id) {
        ForumResponseDto forum = forumService.getForumById(id);
        return ResponseEntity.ok(forum);
    }
    @DeleteMapping("/{id}")
    @Operation(summary = "Deleted a Forum")
    public ResponseEntity<Void> deleteForumById(@PathVariable Long id){
        forumService.deleteForum(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/filter")
    @Operation(summary = "Filter forums by name, type , topic")
    public ResponseEntity<List<ForumResponseDto>> filterForums(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String topic) {
        return ResponseEntity.ok(forumService.filterForums(name, type, topic));
    }


}
