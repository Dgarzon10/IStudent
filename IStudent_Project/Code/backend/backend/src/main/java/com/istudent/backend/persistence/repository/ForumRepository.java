package com.istudent.backend.persistence.repository;

import com.istudent.backend.persistence.entities.Forum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ForumRepository extends JpaRepository<Forum, Long> {
    Optional<List<Forum>> findByInstituteId(Long id);
}
