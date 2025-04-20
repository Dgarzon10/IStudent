package com.istudent.backend.persistence.repository;

import com.istudent.backend.persistence.entities.HousingListing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HousingListingRepository extends JpaRepository<HousingListing, Long> {
    List<HousingListing> findByLocationContainingIgnoreCase(String location);
    List<HousingListing> findByPriceBetween(Double minPrice, Double maxPrice);
    List<HousingListing> findByLocationContainingIgnoreCaseAndPriceBetween(String location, Double minPrice, Double maxPrice);
}
