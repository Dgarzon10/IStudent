package com.istudent.backend.service;

import com.istudent.backend.dto.PostDto;
import com.istudent.backend.dto.PostResponseDto;
import com.istudent.backend.persistence.entities.Forum;
import com.istudent.backend.persistence.entities.Post;
import com.istudent.backend.persistence.entities.User;
import com.istudent.backend.persistence.repository.ForumRepository;
import com.istudent.backend.persistence.repository.PostRepository;
import com.istudent.backend.persistence.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
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

    public List<Post> getPostByForum(Long id){
        return postRepository.findPostByForumId(id).orElseThrow();
    }

    public void deletePost(Long id){
        postRepository.deleteById(id);
    }

    public Post getPost(Long id){
        return postRepository.findById(id).orElseThrow();
    }

    public List<Post> getAllPosts(){
        return postRepository.findAll();
    }

}


