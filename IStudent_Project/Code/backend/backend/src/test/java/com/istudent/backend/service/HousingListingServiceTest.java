package com.istudent.backend.service;

import com.istudent.backend.dto.HousingListingDto;
import com.istudent.backend.dto.HousingListingResponseDto;
import com.istudent.backend.persistence.entities.HousingImage;
import com.istudent.backend.persistence.entities.HousingListing;
import com.istudent.backend.persistence.entities.User;
import com.istudent.backend.persistence.repository.HousingListingRepository;
import com.istudent.backend.persistence.repository.UserRepository;
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

    @InjectMocks
    private HousingListingService housingListingService;

    @Mock
    private HousingListingRepository housingListingRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private ModelMapper modelMapper;

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

    @Test
    void createListing_shouldSaveAndReturnListing() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(housingListingRepository.save(any())).thenReturn(listing);

        HousingListingResponseDto responseDto = new HousingListingResponseDto();
        responseDto.setId(1L);
        when(modelMapper.map(any(HousingListing.class), eq(HousingListingResponseDto.class))).thenReturn(responseDto);

        HousingListingResponseDto result = housingListingService.createListing(listingDto);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        verify(userRepository).findById(1L);
        verify(housingListingRepository).save(any());
    }

    @Test
    void createListing_shouldThrowWhenUserNotFound() {
        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () ->
                housingListingService.createListing(listingDto));

        assertEquals("User not found", exception.getMessage());
        verify(userRepository).findById(1L);
        verify(housingListingRepository, never()).save(any());
    }

    @Test
    void filterListings_shouldFilterByLocationAndPriceRange() {
        when(housingListingRepository.findByLocationContainingIgnoreCaseAndPriceBetween("New York", 300.0, 800.0))
                .thenReturn(List.of(listing));
        when(modelMapper.map(any(HousingListing.class), eq(HousingListingResponseDto.class)))
                .thenReturn(new HousingListingResponseDto());

        List<HousingListingResponseDto> results = housingListingService.filterListings("New York", 300.0, 800.0);

        assertEquals(1, results.size());
        verify(housingListingRepository).findByLocationContainingIgnoreCaseAndPriceBetween("New York", 300.0, 800.0);
    }

    @Test
    void filterListings_shouldFilterByLocationOnly() {
        when(housingListingRepository.findByLocationContainingIgnoreCase("New York"))
                .thenReturn(List.of(listing));
        when(modelMapper.map(any(HousingListing.class), eq(HousingListingResponseDto.class)))
                .thenReturn(new HousingListingResponseDto());

        List<HousingListingResponseDto> results = housingListingService.filterListings("New York", null, null);

        assertEquals(1, results.size());
        verify(housingListingRepository).findByLocationContainingIgnoreCase("New York");
    }

    @Test
    void filterListings_shouldFilterByPriceRangeOnly() {
        when(housingListingRepository.findByPriceBetween(300.0, 800.0))
                .thenReturn(List.of(listing));
        when(modelMapper.map(any(HousingListing.class), eq(HousingListingResponseDto.class)))
                .thenReturn(new HousingListingResponseDto());

        List<HousingListingResponseDto> results = housingListingService.filterListings(null, 300.0, 800.0);

        assertEquals(1, results.size());
        verify(housingListingRepository).findByPriceBetween(300.0, 800.0);
    }

    @Test
    void filterListings_shouldReturnAllWhenNoFilters() {
        when(housingListingRepository.findAll())
                .thenReturn(List.of(listing));
        when(modelMapper.map(any(HousingListing.class), eq(HousingListingResponseDto.class)))
                .thenReturn(new HousingListingResponseDto());

        List<HousingListingResponseDto> results = housingListingService.filterListings(null, null, null);

        assertEquals(1, results.size());
        verify(housingListingRepository).findAll();
    }

}
