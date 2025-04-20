package com.istudent.backend.service;

import com.istudent.backend.dto.CommentDto;
import com.istudent.backend.dto.CommentResponseDto;
import com.istudent.backend.persistence.entities.Comment;
import com.istudent.backend.persistence.entities.Post;
import com.istudent.backend.persistence.entities.User;
import com.istudent.backend.persistence.repository.CommentRepository;
import com.istudent.backend.persistence.repository.PostRepository;
import com.istudent.backend.persistence.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;

    private final ModelMapper modelMapper;

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

    public List<CommentResponseDto> getCommentsByPost(Long id){
        List<Comment> comments = commentRepository.findCommentsByPostId(id).orElseThrow();
        return  comments.stream()
                .map(comment -> modelMapper.map(comment, CommentResponseDto.class))
                .toList();
    }

    public List<CommentResponseDto> getCommentsByUser(Long id){
        List<Comment> comments = commentRepository.findCommentsByUserId(id).orElseThrow();
        return comments.stream()
                .map(comment -> modelMapper.map(comment, CommentResponseDto.class))
                .toList();
    }

    public List<CommentResponseDto> getAllComments(){
        List<Comment> comments = commentRepository.findAll();
        return comments.stream()
                .map(comment -> modelMapper.map(comment, CommentResponseDto.class))
                .toList();
    }

    public void deletedComment(Long id){
        commentRepository.deleteById(id);
    }

}
