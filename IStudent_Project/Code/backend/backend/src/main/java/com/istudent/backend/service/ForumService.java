package com.istudent.backend.service;

import com.istudent.backend.dto.ForumDto;
import com.istudent.backend.dto.ForumResponseDto;
import com.istudent.backend.persistence.entities.Forum;
import com.istudent.backend.persistence.entities.Institute;
import com.istudent.backend.persistence.repository.ForumRepository;
import com.istudent.backend.persistence.repository.InstituteRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ForumService {

    private final ForumRepository forumRepository;
    private final InstituteRepository instituteRepository;
    private final ModelMapper modelMapper;

    public ForumResponseDto createForum(ForumDto forumDto) {
        Forum forum = Forum.builder()
                .name(forumDto.getName())
                .type(forumDto.getType())
                .description(forumDto.getDescription())
                .createdAt(LocalDateTime.now())
                .build();

        if (Objects.equals(forumDto.getType(), "institutional")){
            Institute institute = instituteRepository.findById(forumDto.getInstituteId())
                    .orElseThrow(() -> new RuntimeException("Institute not found"));
            forum.setInstitute(institute);
        }

        Forum forumSaved = forumRepository.save(forum);
        return modelMapper.map(forumSaved, ForumResponseDto.class);

    }

    public List<ForumResponseDto> getForumsByInstitute(Long instituteId) {
        List<Forum> forums = forumRepository.findByInstituteId(instituteId).orElseThrow();
        return forums.stream()
                .map( forum -> modelMapper.map(forum, ForumResponseDto.class))
                .toList();
    }

    public ForumResponseDto getForumById(Long id) {
        Forum forum = forumRepository.findById(id).orElseThrow();
        return modelMapper.map(forum, ForumResponseDto.class);
    }

    public List<ForumResponseDto> getAllForums() {
        List<Forum> forums = forumRepository.findAll();
        return forums.stream()
                .map( forum -> modelMapper.map(forum, ForumResponseDto.class))
                .toList();
    }

    @PreAuthorize("hasAnyAuthority('admin')")
    public void deleteForum(Long id){
        forumRepository.deleteById(id);
    }
}
