package com.istudent.backend.controllers;

import com.istudent.backend.dto.CommentDto;
import com.istudent.backend.dto.CommentResponseDto;
import com.istudent.backend.service.CommentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/comments")
@RequiredArgsConstructor
@Tag(name = "Comments", description = "Comment operations")
@CrossOrigin
public class CommentController {

    private final CommentService commentService;

    @Operation(summary = "Created Comments over an existing Post")
    @PostMapping
    public ResponseEntity<CommentResponseDto> createComment(@RequestBody CommentDto commentDto) {
        CommentResponseDto comment = commentService.createdComment(commentDto);
        return ResponseEntity.ok(comment);
    }

    @Operation(summary = "Get all the comments of a specific Post")
    @GetMapping("/post/{postId}")
    public ResponseEntity<List<CommentResponseDto>> getCommentsByPost(@PathVariable Long postId) {
        List<CommentResponseDto> comments = commentService.getCommentsByPost(postId);
        return ResponseEntity.ok(comments);
    }

    @Operation(summary = "Get all the comments of a specific User")
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<CommentResponseDto>> getCommentsByUser(@PathVariable Long userId) {
        List<CommentResponseDto> comments = commentService.getCommentsByUser(userId);
        return ResponseEntity.ok(comments);
    }

    @Operation(summary = "Get all the comments ")
    @GetMapping
    public ResponseEntity<List<CommentResponseDto>> getAllComments() {
        List<CommentResponseDto> comments = commentService.getAllComments();
        return ResponseEntity.ok(comments);
    }

    @Operation(summary = "Deleted a specific comment")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long id) {
        commentService.deletedComment(id);
        return ResponseEntity.noContent().build();
    }

}
