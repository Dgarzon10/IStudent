package com.istudent.backend.service;

import com.istudent.backend.dto.ForumDto;
import com.istudent.backend.dto.ForumResponseDto;
import com.istudent.backend.persistence.entities.Forum;
import com.istudent.backend.persistence.entities.Institute;
import com.istudent.backend.persistence.repository.ForumRepository;
import com.istudent.backend.persistence.repository.InstituteRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.mockito.*;
import java.time.LocalDateTime;

import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ForumServiceTest {

    @InjectMocks
    private ForumService forumService;

    @Mock
    private ForumRepository forumRepository;

    @Mock
    private InstituteRepository instituteRepository;

    @Mock
    private ModelMapper modelMapper;

    private Institute institute;
    private Forum forum;
    private ForumDto forumDto;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        institute = Institute.builder().id(1L).name("Universidad Nacional").build();
        forum = Forum.builder().id(1L).name("Trabajo").topic("Empleo").createdAt(LocalDateTime.now()).institute(institute).build();
        forumDto = new ForumDto();
        forumDto.setName("Trabajo");
        forumDto.setType("institutional");
        forumDto.setTopic("Empleo");
        forumDto.setInstituteId(1L);
    }

    @Test
    void createForum_shouldReturnForumResponse() {
        when(instituteRepository.findById(1L)).thenReturn(Optional.of(institute));
        when(forumRepository.save(any())).thenReturn(forum);
        when(modelMapper.map(forum, ForumResponseDto.class)).thenReturn(new ForumResponseDto());

        ForumResponseDto response = forumService.createForum(forumDto);

        assertNotNull(response);
        verify(forumRepository).save(any());
    }

    @Test
    void createForum_shouldThrowWhenInstituteNotFound() {
        when(instituteRepository.findById(1L)).thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(RuntimeException.class, () -> forumService.createForum(forumDto));
        assertEquals("Institute not found", ex.getMessage());
        verify(forumRepository, never()).save(any());
    }
}
