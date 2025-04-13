package com.istudent.backend.service;

import com.istudent.backend.persistence.entities.Comment;
import com.istudent.backend.persistence.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;

    public Comment createdComment(Comment comment){
        return commentRepository.save(comment);
    }

    public List<Comment> getCommentsByPost(Long id){
        return commentRepository.findCommentsByPostId(id).orElseThrow();
    }

    public void deletedComment(Long id){
        commentRepository.deleteById(id);
    }

}
