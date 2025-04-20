package com.istudent.backend.controllers;

import com.istudent.backend.dto.PostDto;
import com.istudent.backend.dto.PostResponseDto;
import com.istudent.backend.service.PostService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/posts")
@RequiredArgsConstructor
@Tag(name = "Post", description = "Operation over Post that has to be in a Forum")
public class PostController {

    private final PostService postService;

    @PostMapping
    @Operation(summary = "Created a Post")
    public ResponseEntity<PostResponseDto> createPost(@RequestBody PostDto postDto) {
        PostResponseDto createdPost = postService.createdPost(postDto);
        return ResponseEntity.ok(createdPost);
    }

    @GetMapping
    @Operation(summary = "Get all Posts")
    public ResponseEntity<List<PostResponseDto>> getAllPosts() {
        List<PostResponseDto> posts = postService.getAllPosts();
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/forum/{forumId}")
    @Operation(summary = "Get all Posts of an specific forum")
    public ResponseEntity<List<PostResponseDto>> getPostsByForum(@PathVariable Long forumId) {
        List<PostResponseDto> posts = postService.getPostByForum(forumId);
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a specific Post")
    public ResponseEntity<PostResponseDto> getPost(@PathVariable Long id) {
        PostResponseDto post = postService.getPost(id);
        return ResponseEntity.ok(post);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deleted a Post")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        postService.deletePost(id);
        return ResponseEntity.noContent().build();
    }
}
