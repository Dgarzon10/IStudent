package com.istudent.backend.service;

import com.istudent.backend.dto.HousingListingDto;
import com.istudent.backend.dto.HousingListingResponseDto;
import com.istudent.backend.persistence.entities.HousingImage;
import com.istudent.backend.persistence.entities.HousingListing;
import com.istudent.backend.persistence.entities.User;
import com.istudent.backend.persistence.repository.HousingListingRepository;
import com.istudent.backend.persistence.repository.UserRepository;
import com.istudent.backend.security.AuthenticatedUserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.mockito.*;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
class HousingListingServiceTest {

    //CAMBIARLAS TODAS SACAN ERROR

    @InjectMocks
    private HousingListingService housingListingService;

    @Mock
    private HousingListingRepository housingListingRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private ModelMapper modelMapper;

    @Mock
    private AuthenticatedUserService authenticatedUserService;


    private User user;
    private HousingListingDto listingDto;
    private HousingListing listing;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        user = User.builder()
                .id(1L)
                .email("maria@correo.com")
                .role("student")
                .build();

        listingDto = new HousingListingDto();
        listingDto.setUserId(1L);
        listingDto.setPrice(500.0);
        listingDto.setLocation("New York");
        listingDto.setBody("Nice apartment");
        listingDto.setAvailableFrom(LocalDate.now());
        listingDto.setStatus("available");
        listingDto.setPropertyType("apartment");
        listingDto.setImageUrls(List.of("url1", "url2"));

        listing = HousingListing.builder()
                .id(1L)
                .price(500.0)
                .location("New York")
                .user(user)
                .status("available")
                .availableFrom(LocalDate.now())
                .publishedAt(LocalDateTime.now())
                .images(List.of(
                        new HousingImage(null, "url1", null),
                        new HousingImage(null, "url2", null)
                ))
                .build();
    }


}
