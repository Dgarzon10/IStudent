package com.istudent.backend.service;

import com.istudent.backend.dto.PostDto;
import com.istudent.backend.persistence.entities.Post;
import com.istudent.backend.persistence.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;

    private final ModelMapper modelMapper;

    public Post createdPost(PostDto postDto){
        Post post = modelMapper.map(postDto, Post.class);
        return postRepository.save(post);
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

}


