package com.istudent.backend.service;

import com.istudent.backend.dto.PostDto;
import com.istudent.backend.dto.PostResponseDto;
import com.istudent.backend.persistence.entities.Forum;
import com.istudent.backend.persistence.entities.Post;
import com.istudent.backend.persistence.entities.User;
import com.istudent.backend.persistence.repository.ForumRepository;
import com.istudent.backend.persistence.repository.PostRepository;
import com.istudent.backend.persistence.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.mockito.*;

import java.time.LocalDateTime;

import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PostServiceTest {

    @InjectMocks
    private PostService postService;

    @Mock
    private PostRepository postRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private ForumRepository forumRepository;

    @Mock
    private ModelMapper modelMapper;

    private Post post;
    private PostDto postDto;
    private PostResponseDto postResponseDto;
    private User user;
    private Forum forum;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        user = User.builder().id(1L).email("test@correo.com").build();
        forum = Forum.builder().id(1L).name("Trabajo").build();
        post = Post.builder().id(1L).user(user).forum(forum).title("Post").body("Contenido").createdAt(LocalDateTime.now()).status("active").build();
        postDto = new PostDto();
        postDto.setUserId(1L);
        postDto.setForumId(1L);
        postDto.setStatus("active");
        postDto.setTitle("Post");
        postDto.setBody("Contenido");

        postResponseDto = new PostResponseDto();
        postResponseDto.setId(1L);
        postResponseDto.setTitle("Post");
        postResponseDto.setBody("Contenido");
        postResponseDto.setStatus("active");
        postResponseDto.setCreatedAt(post.getCreatedAt());

    }

    @Test
    void createdPost_shouldSaveAndReturnPost() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(forumRepository.findById(1L)).thenReturn(Optional.of(forum));
        when(postRepository.save(any())).thenReturn(post);
        when(modelMapper.map(any(Post.class), eq(PostResponseDto.class))).thenReturn(postResponseDto);


        PostResponseDto result = postService.createdPost(postDto);

        assertNotNull(result);
        verify(postRepository).save(any());
    }

    @Test
    void getPost_shouldReturnPost() {
        when(postRepository.findById(1L)).thenReturn(Optional.of(post));
        when(modelMapper.map(any(Post.class), eq(PostResponseDto.class))).thenReturn(postResponseDto);

        PostResponseDto result = postService.getPost(1L);

        assertNotNull(result);
        assertEquals("Post", result.getTitle());
    }

    @Test
    void deletePost_shouldDelete() {
        doNothing().when(postRepository).deleteById(1L);
        postService.deletePost(1L);
        verify(postRepository).deleteById(1L);
    }
}
