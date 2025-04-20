package com.istudent.backend.service;

import com.istudent.backend.dto.InstituteDto;
import com.istudent.backend.dto.InstituteResponseDto;
import com.istudent.backend.persistence.entities.Institute;
import com.istudent.backend.persistence.repository.InstituteRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.mockito.*;


import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class InstituteServiceTest {

    @InjectMocks
    private InstituteService instituteService;

    @Mock
    private InstituteRepository instituteRepository;

    @Mock
    private ModelMapper modelMapper;

    private Institute institute;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        institute = Institute.builder().id(1L).name("UNAL").build();
    }

    @Test
    void createInstitute_shouldSaveInstitute() {
        when(instituteRepository.save(any())).thenReturn(institute);
        when(modelMapper.map(institute, InstituteResponseDto.class)).thenReturn(new InstituteResponseDto());

        InstituteResponseDto response = instituteService.createInstitute(new InstituteDto());

        assertNotNull(response);
        verify(instituteRepository).save(any());
    }

    @Test
    void getInstituteById_shouldReturnInstitute() {
        when(instituteRepository.findById(1L)).thenReturn(Optional.of(institute));
        when(modelMapper.map(institute, InstituteResponseDto.class)).thenReturn(new InstituteResponseDto());

        InstituteResponseDto result = instituteService.getInstituteById(1L);

        assertNotNull(result);
    }
}
