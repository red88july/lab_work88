import { Box, CircularProgress, Container } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { useEffect } from 'react';

import { getAllPost, isLoadPosts } from './postsSlice.ts';
import { getPosts } from './postsThunk.ts';
import PostsList from './PostsList';

const Posts = () => {

  const dispatch = useAppDispatch();
  const posts = useAppSelector(getAllPost);

  const loadingPosts = useAppSelector(isLoadPosts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <Container maxWidth="md" sx={{marginTop: 15}}>
      {loadingPosts && (<Box sx={{display: 'flex', justifyContent: 'center'}}>
        <CircularProgress size={100}/></Box>) }
      {posts.map(post => (
        <PostsList
          id={post._id}
          key={post._id}
          title={post.title}
          user={post.user}
          datetime={post.datetime}
          image={post.image}
        />
      ))}

    </Container>
  );
};

export default Posts;