package com.istudent.backend.service;

import com.istudent.backend.dto.CommentDto;
import com.istudent.backend.dto.CommentResponseDto;
import com.istudent.backend.persistence.entities.Comment;
import com.istudent.backend.persistence.entities.Post;
import com.istudent.backend.persistence.entities.User;
import com.istudent.backend.persistence.repository.CommentRepository;
import com.istudent.backend.persistence.repository.PostRepository;
import com.istudent.backend.persistence.repository.UserRepository;
import com.istudent.backend.security.AuthenticatedUserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final AuthenticatedUserService authenticatedUserService;

    private final ModelMapper modelMapper;

    @PreAuthorize("hasAnyAuthority('admin','visitor','student')")
    public CommentResponseDto createdComment(CommentDto commentDto){

        Post post = postRepository.findById(commentDto.getPostId())
                .orElseThrow(() -> new RuntimeException("Post not Found"));

        User user = userRepository.findById(commentDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not Found"));

        Comment comment = Comment.builder()
                .body(commentDto.getBody())
                .status(commentDto.getStatus())
                .user(user)
                .post(post)
                .createdAt(LocalDateTime.now())
                .build();

        Comment commentSaved = commentRepository.save(comment);
        return modelMapper.map(commentSaved, CommentResponseDto.class);
    }

    @PreAuthorize("hasAnyAuthority('admin','visitor','student')")
    public List<CommentResponseDto> getCommentsByPost(Long id){
        List<Comment> comments = commentRepository.findCommentsByPostId(id).orElseThrow();
        return  comments.stream()
                .map(comment -> modelMapper.map(comment, CommentResponseDto.class))
                .toList();
    }

    @PreAuthorize("hasAnyAuthority('admin','visitor','student')")
    public List<CommentResponseDto> getCommentsByUser(Long id){
        List<Comment> comments = commentRepository.findCommentsByUserId(id).orElseThrow();
        return comments.stream()
                .map(comment -> modelMapper.map(comment, CommentResponseDto.class))
                .toList();
    }

    @PreAuthorize("hasAnyAuthority('admin','visitor','student')")
    public List<CommentResponseDto> getAllComments(){
        List<Comment> comments = commentRepository.findAll();
        return comments.stream()
                .map(comment -> modelMapper.map(comment, CommentResponseDto.class))
                .toList();
    }

    @PreAuthorize("hasAnyAuthority('moderator','admin', 'student','visitor')")
    public void deletedComment(Long id){
        User currentUser = authenticatedUserService.getCurrentUser();
        Comment comment = commentRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Comment Not Found"));

        boolean isOwner = currentUser.getId().equals(comment.getUser().getId());
        boolean isAdmin = currentUser.getRole().equalsIgnoreCase("admin");

        if(!isOwner && !isAdmin){
            throw new AccessDeniedException("Not authorized to delete");
        }
        commentRepository.deleteById(id);
    }

}
