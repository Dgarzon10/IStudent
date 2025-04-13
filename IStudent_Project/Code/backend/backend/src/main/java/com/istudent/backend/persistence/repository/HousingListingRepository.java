package com.istudent.backend.persistence.repository;

import com.istudent.backend.persistence.entities.HousingListing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HousingListingRepository extends JpaRepository<HousingListing, Long> {
}
