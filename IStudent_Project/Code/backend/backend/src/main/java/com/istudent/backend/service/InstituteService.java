package com.istudent.backend.service;

import com.istudent.backend.dto.InstituteDto;
import com.istudent.backend.dto.InstituteResponseDto;
import com.istudent.backend.persistence.entities.Institute;
import com.istudent.backend.persistence.repository.InstituteRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InstituteService {

    private final InstituteRepository instituteRepository;
    private final ModelMapper modelMapper;

    public InstituteResponseDto createInstitute(InstituteDto dto) {
        Institute institute = modelMapper.map(dto, Institute.class);
        Institute savedInstitute = instituteRepository.save(institute);
        return modelMapper.map(savedInstitute, InstituteResponseDto.class);
    }

    public List<InstituteResponseDto> getAllInstitutes() {
        return instituteRepository.findAll()
                .stream()
                .map(institute -> modelMapper.map(institute, InstituteResponseDto.class))
                .toList();
    }

    public InstituteResponseDto getInstituteById(Long id) {
        Institute institute = instituteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Institute not found"));
        return modelMapper.map(institute, InstituteResponseDto.class);
    }

    public void deleteInstitute(Long id) {
        instituteRepository.deleteById(id);
    }
}
