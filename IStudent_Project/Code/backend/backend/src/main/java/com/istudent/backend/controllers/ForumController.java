package com.istudent.backend.controllers;

import com.istudent.backend.dto.ForumDto;
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
    public ResponseEntity<Forum> createForum(@RequestBody ForumDto forumDto) {
        Forum createdForum = forumService.createForum(forumDto);
        return ResponseEntity.ok(createdForum);
    }

    @GetMapping
    public ResponseEntity<List<Forum>> getAllForums() {
        List<Forum> forums = forumService.getAllForums();
        return ResponseEntity.ok(forums);
    }

    @GetMapping("/institute/{instituteId}")
    public ResponseEntity<List<Forum>> getForumsByInstitute(@PathVariable Long instituteId) {
        List<Forum> forums = forumService.getForumsByInstitute(instituteId);
        return ResponseEntity.ok(forums);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Forum> getForumById(@PathVariable Long id) {
        Forum forum = forumService.getForumById(id);
        return ResponseEntity.ok(forum);
    }
}
