package com.istudent.backend.controllers;

import com.istudent.backend.dto.PostDto;
import com.istudent.backend.dto.PostResponseDto;
import com.istudent.backend.persistence.entities.Post;
import com.istudent.backend.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @PostMapping
    public ResponseEntity<PostResponseDto> createPost(@RequestBody PostDto postDto) {
        PostResponseDto createdPost = postService.createdPost(postDto);
        return ResponseEntity.ok(createdPost);
    }

    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts() {
        List<Post> posts = postService.getAllPosts();
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/forum/{forumId}")
    public ResponseEntity<List<Post>> getPostsByForum(@PathVariable Long forumId) {
        List<Post> posts = postService.getPostByForum(forumId);
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Post> getPost(@PathVariable Long id) {
        Post post = postService.getPost(id);
        return ResponseEntity.ok(post);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        postService.deletePost(id);
        return ResponseEntity.noContent().build();
    }
}
