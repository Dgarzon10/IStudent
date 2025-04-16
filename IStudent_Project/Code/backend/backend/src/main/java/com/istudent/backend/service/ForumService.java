package com.istudent.backend.service;

import com.istudent.backend.dto.ForumDto;
import com.istudent.backend.persistence.entities.Forum;
import com.istudent.backend.persistence.entities.Institute;
import com.istudent.backend.persistence.repository.ForumRepository;
import com.istudent.backend.persistence.repository.InstituteRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ForumService {

    private final ForumRepository forumRepository;
    private final InstituteRepository instituteRepository;
    private final ModelMapper modelMapper;

    public Forum createForum(ForumDto forumDto) {
        Forum forum = modelMapper.map(forumDto, Forum.class);

        if (!Objects.equals(forum.getType(), "institutional")){
            return forumRepository.save(forum);
        }
        Institute institute = instituteRepository.findById(forumDto.getInstituteId())
                .orElseThrow(() -> new RuntimeException("Institute not found"));
        forum.setInstitute(institute);
        return forumRepository.save(forum);

    }

    public List<Forum> getForumsByInstitute(Long instituteId) {
        return forumRepository.findByInstituteId(instituteId).orElseThrow();
    }

    public Forum getForumById(Long id) {
        return forumRepository.findById(id).orElseThrow();
    }
}
