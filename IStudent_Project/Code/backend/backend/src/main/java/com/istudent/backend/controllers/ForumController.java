package com.istudent.backend.controllers;

import com.istudent.backend.dto.ForumDto;
import com.istudent.backend.dto.ForumResponseDto;
import com.istudent.backend.persistence.entities.Forum;
import com.istudent.backend.service.ForumService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/forums")
@RequiredArgsConstructor
public class ForumController {

    private final ForumService forumService;

    @PostMapping
    public ResponseEntity<ForumResponseDto> createForum(@RequestBody ForumDto forumDto) {
        ForumResponseDto createdForum = forumService.createForum(forumDto);
        return ResponseEntity.ok(createdForum);
    }

    @GetMapping
    public ResponseEntity<List<ForumResponseDto>> getAllForums() {
        List<ForumResponseDto> forums = forumService.getAllForums();
        return ResponseEntity.ok(forums);
    }

    @GetMapping("/institute/{instituteId}")
    public ResponseEntity<List<ForumResponseDto>> getForumsByInstitute(@PathVariable Long instituteId) {
        List<ForumResponseDto> forums = forumService.getForumsByInstitute(instituteId);
        return ResponseEntity.ok(forums);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ForumResponseDto> getForumById(@PathVariable Long id) {
        ForumResponseDto forum = forumService.getForumById(id);
        return ResponseEntity.ok(forum);
    }
}
