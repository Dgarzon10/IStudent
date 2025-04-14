package com.istudent.backend.service;

import com.istudent.backend.dto.CommentDto;
import com.istudent.backend.persistence.entities.Comment;
import com.istudent.backend.persistence.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;

    private final ModelMapper modelMapper;

    public Comment createdComment(CommentDto commentDto){
        Comment comment = modelMapper.map(commentDto, Comment.class);
        return commentRepository.save(comment);
    }

    public List<Comment> getCommentsByPost(Long id){
        return commentRepository.findCommentsByPostId(id).orElseThrow();
    }

    public void deletedComment(Long id){
        commentRepository.deleteById(id);
    }

}
