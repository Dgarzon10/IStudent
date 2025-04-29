package com.istudent.backend.persistence.repository;

import com.istudent.backend.persistence.entities.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    Optional<List<Post>> findPostByForumId(Long id);
    Optional<List<Post>> findPostByForumName(String name);
}
