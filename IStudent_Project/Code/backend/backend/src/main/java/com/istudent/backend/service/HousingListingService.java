package com.istudent.backend.service;

import com.istudent.backend.dto.HousingListingDto;
import com.istudent.backend.dto.HousingListingResponseDto;
import com.istudent.backend.dto.UserResponseDto;
import com.istudent.backend.persistence.entities.HousingImage;
import com.istudent.backend.persistence.entities.HousingListing;
import com.istudent.backend.persistence.entities.User;
import com.istudent.backend.persistence.repository.HousingListingRepository;
import com.istudent.backend.persistence.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;


@Service
@RequiredArgsConstructor
public class HousingListingService {

    private final HousingListingRepository housingListingRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    public HousingListingResponseDto createListing(HousingListingDto dto) {
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        HousingListing listing = HousingListing.builder()
                .price(dto.getPrice())
                .location(dto.getLocation())
                .body(dto.getBody())
                .latitude(dto.getLatitude())
                .longitude(dto.getLongitude())
                .availableFrom(dto.getAvailableFrom())
                .publishedAt(LocalDateTime.now())
                .bedrooms(dto.getBedrooms())
                .bathrooms(dto.getBathrooms())
                .area(dto.getArea())
                .propertyType(dto.getPropertyType())
                .status(dto.getStatus())
                .services(dto.getServices())
                .user(user)
                .build();

        List<HousingImage> images = dto.getImageUrls().stream()
                .map(url -> HousingImage.builder()
                        .imageUrl(url)
                        .housingListing(listing)
                        .build())
                .toList();

        listing.setImages(images);

        HousingListing saved = housingListingRepository.save(listing);
        return mapToResponseDto(saved);
    }

    public List<HousingListingResponseDto> getAllListings() {
        return housingListingRepository.findAll().stream()
                .map(this::mapToResponseDto)
                .toList();
    }

    public HousingListingResponseDto getListingById(Long id) {
        HousingListing listing = housingListingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Listing not found"));
        return mapToResponseDto(listing);
    }

    public List<HousingListingResponseDto> filterListings(String location, Double minPrice, Double maxPrice) {
        List<HousingListing> listings;

        if (location != null && minPrice != null && maxPrice != null) {
            listings = housingListingRepository.findByLocationContainingIgnoreCaseAndPriceBetween(location, minPrice, maxPrice);
        } else if (location != null) {
            listings = housingListingRepository.findByLocationContainingIgnoreCase(location);
        } else if (minPrice != null && maxPrice != null) {
            listings = housingListingRepository.findByPriceBetween(minPrice, maxPrice);
        } else {
            listings = housingListingRepository.findAll();
        }

        return listings.stream()
                .map(this::mapToResponseDto)
                .toList();
    }

    @PreAuthorize("hasAnyAuthority('admin')")
    public void deleteListing(Long id) {
        housingListingRepository.deleteById(id);
    }


    private HousingListingResponseDto mapToResponseDto(HousingListing listing) {
        HousingListingResponseDto dto = modelMapper.map(listing, HousingListingResponseDto.class);

        // Map user
        UserResponseDto userDto = new UserResponseDto();
        userDto.setId(listing.getUser().getId());
        userDto.setEmail(listing.getUser().getEmail());
        userDto.setRole(listing.getUser().getRole());
        dto.setUser(userDto);

        // Map images
        List<String> urls = listing.getImages().stream()
                .map(HousingImage::getImageUrl)
                .toList();
        dto.setImageUrls(urls);

        return dto;
    }


}
