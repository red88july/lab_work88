import React, {useState} from 'react';
import {Post} from '../../types';
import {Box, Button, Container, Grid, TextField} from '@mui/material';
import FileInput from '../../components/FileInput/FileInput.tsx';
import {useAppDispatch} from '../../../app/hooks.ts';
import {postsCreate} from './postsThunk.ts';


const PostForm = () => {

  const dispatch = useAppDispatch();

  const [state, setState] = useState<Post>({
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
      // navigate('/');
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
    <>
      <Container maxWidth="sm">
        <Box marginTop={20}>
          <form
            autoComplete="off"
            onSubmit={onFormSubmit}
          >
            <Grid container direction="column" spacing={2}>

              <Grid item xs>
                <TextField
                  fullWidth
                  id="title"
                  label="Title"
                  name="title"
                  value={state.title}
                  onChange={inputChangeHandler}
                  required
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
                  variant="contained">Create new post</Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default PostForm;