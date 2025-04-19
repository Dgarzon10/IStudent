package com.istudent.backend.persistence.repository;

import com.istudent.backend.persistence.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<List<User>> findUsersByInstituteId(Long id);
    Optional<User> findByEmail(String email);

}
