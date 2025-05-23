package com.istudent.backend.persistence.repository;

import com.istudent.backend.persistence.entities.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    Optional<List<Comment>> findCommentsByPostId(Long id);
    Optional<List<Comment>> findCommentsByUserId(Long id);
}
