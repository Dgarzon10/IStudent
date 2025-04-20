package com.istudent.backend.service;

import com.istudent.backend.dto.CommentDto;
import com.istudent.backend.dto.CommentResponseDto;

import com.istudent.backend.dto.UserResponseDto;
import com.istudent.backend.persistence.entities.Comment;
import com.istudent.backend.persistence.entities.Post;
import com.istudent.backend.persistence.entities.User;
import com.istudent.backend.persistence.repository.CommentRepository;
import com.istudent.backend.persistence.repository.PostRepository;
import com.istudent.backend.persistence.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.mockito.*;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CommentServiceTest {

    @InjectMocks
    private CommentService commentService;

    @Mock
    private CommentRepository commentRepository;

    @Mock
    private PostRepository postRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private ModelMapper modelMapper;

    private CommentDto commentDto;
    private CommentResponseDto commentResponseDto;
    private UserResponseDto userResponseDto;
    private User user;
    private Post post;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        user = User.builder().id(1L).email("test@correo.com").build();
        userResponseDto = new UserResponseDto();
        userResponseDto.setId(1L);
        userResponseDto.setEmail("test@correo.com");
        post = Post.builder().id(1L).build();
        commentDto = new CommentDto();
        commentDto.setUserId(1L);
        commentDto.setPostId(1L);
        commentDto.setBody("Comentario");
        commentDto.setStatus("active");

        commentResponseDto = new CommentResponseDto();
        commentResponseDto.setUser(userResponseDto);
        commentResponseDto.setPostId(1L);
        commentResponseDto.setBody("Comentario");
        commentResponseDto.setStatus("active");

    }

    @Test
    void createdComment_shouldSaveComment() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(postRepository.findById(1L)).thenReturn(Optional.of(post));
        when(commentRepository.save(any())).thenAnswer(i -> i.getArgument(0));
        when(modelMapper.map(any(Comment.class), eq(CommentResponseDto.class))).thenReturn(commentResponseDto);

        CommentResponseDto result = commentService.createdComment(commentDto);

        assertNotNull(result);
        assertEquals("Comentario", result.getBody());
    }
}
