import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../app/hooks.ts';
import {getAllPost} from './postsSlice.ts';
import {getPosts} from './postsThunk.ts';
import {Container} from '@mui/material';
import PostsList from './PostsList.tsx';

const Posts = () => {

  const dispatch = useAppDispatch();
  const posts = useAppSelector(getAllPost);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <Container maxWidth="md" sx={{marginTop: 15}}>
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