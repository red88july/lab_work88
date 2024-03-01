import { Alert, Box, Button, CircularProgress, Container, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';

import { useAppDispatch } from '../../../app/hooks.ts';
import { postsCreate } from './postsThunk.ts';

import FileInput from '../../components/FileInput/FileInput';
import { useSelector } from 'react-redux';
import { isErrorPost, isLoadPost } from './postsSlice.ts';

const PostForm = () => {

  const dispatch = useAppDispatch();
  const isLoadingPost = useSelector(isLoadPost);
  const isErrorLoadPost = useSelector(isErrorPost);

  const [state, setState] = useState({
    title: '',
    description: '',
    image: null,
  });

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(postsCreate(state)).unwrap();

      setState((prevState) => {
        return {
          ...prevState,
          title: '',
          description: '',
        };
      });

    } catch (e) {
      //
    }
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    if (files) {
      setState(prevState => ({
        ...prevState, [name]: files[0]
      }));
    }
  };

  return (
      <Container maxWidth="sm">
        <Box marginTop={20}>
          {isErrorLoadPost && (
            <Box marginBottom={4}>
              <Alert severity="warning">
                {isErrorLoadPost.message}
              </Alert>
            </Box>
          )}
          <form
            autoComplete="off"
            onSubmit={onFormSubmit}>
            <Grid container direction="column" spacing={2}>
              <Grid item xs>
                <TextField
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  name="title"
                  value={state.title}
                  onChange={inputChangeHandler}
                />
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
                  id="description"
                  label="Description"
                  name="description"
                  value={state.description}
                  onChange={inputChangeHandler}
                />
              </Grid>
              <Grid item xs>
                <FileInput
                  label="Image"
                  name="image"
                  onChange={fileInputChangeHandler}
                />
              </Grid>
              <Grid item xs>
                <Button
                  fullWidth
                  type="submit"
                  color="primary"
                  variant="contained"
                disabled={isLoadingPost}>
                  {isLoadingPost ? <CircularProgress /> : 'Create new post'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
  );
};

export default PostForm;