package com.istudent.backend.service;

import com.istudent.backend.dto.InstituteDto;
import com.istudent.backend.persistence.entities.Institute;
import com.istudent.backend.persistence.repository.InstituteRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InstituteService {

    private final InstituteRepository instituteRepository;

    private final ModelMapper modelMapper;

    public Institute createdInstitute(InstituteDto instituteDto){
        Institute institute = modelMapper.map(instituteDto, Institute.class);
        return instituteRepository.save(institute);
    }
}
