package com.istudent.backend.service;

import com.istudent.backend.dto.PostDto;
import com.istudent.backend.dto.PostResponseDto;
import com.istudent.backend.persistence.entities.Forum;

import com.istudent.backend.persistence.entities.Post;
import com.istudent.backend.persistence.entities.User;
import com.istudent.backend.persistence.repository.ForumRepository;
import com.istudent.backend.persistence.repository.PostRepository;
import com.istudent.backend.persistence.repository.UserRepository;
import com.istudent.backend.security.AuthenticatedUserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final ForumRepository forumRepository;
    private final ModelMapper modelMapper;
    private final AuthenticatedUserService authenticatedUserService;

    @PreAuthorize("hasAnyAuthority('moderator','student','admin', 'visitor')")
    public PostResponseDto createdPost(PostDto postDto){

        User user = userRepository.findById(postDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Forum forum = forumRepository.findById(postDto.getForumId())
                .orElseThrow(() -> new RuntimeException("Forum not found"));

        Post post = Post.builder()
                .title(postDto.getTitle())
                .body(postDto.getBody())
                .status(postDto.getStatus())
                .createdAt(LocalDateTime.now())
                .user(user)
                .forum(forum)
                .build();

        Post postSaved= postRepository.save(post);

        return modelMapper.map(postSaved, PostResponseDto.class);
    }

    public List<PostResponseDto> getPostByForumId(Long id){
        List<Post> posts= postRepository.findPostByForumId(id).orElseThrow();
        return posts.stream()
                .map(post -> modelMapper.map(post, PostResponseDto.class))
                .toList();
    }

    public List<PostResponseDto> getPostByForumName(String name){
        List<Post> posts= postRepository.findPostByForumName(name).orElseThrow();
        return posts.stream()
                .map(post -> modelMapper.map(post, PostResponseDto.class))
                .toList();
    }

    @PreAuthorize("hasAnyAuthority('moderator','admin', 'student','visitor')")
    public void deletePost(Long id){
        User currentUser = authenticatedUserService.getCurrentUser();
        Post post = postRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Post Item not found"));

        boolean isOwner = currentUser.getId().equals(post.getUser().getId());
        boolean isAdmin = currentUser.getRole().equalsIgnoreCase("admin");

        if (!isOwner && !isAdmin) {
            throw new AccessDeniedException("Not authorized to delete");
        }

        postRepository.deleteById(id);
    }

    public PostResponseDto getPost(Long id){
        Post post = postRepository.findById(id).orElseThrow();
        return modelMapper.map(post, PostResponseDto.class);
    }

    public List<PostResponseDto> getAllPosts(){
        List<Post> posts= postRepository.findAll();
        return posts.stream()
                .map(post -> modelMapper.map(post, PostResponseDto.class))
                .toList();
    }

}


