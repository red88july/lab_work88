import { Alert, Box, Button, CircularProgress, Container, Grid, TextField } from '@mui/material';

import React, {useState} from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '../../../app/hooks.ts';
import { createComment } from './commentsThunk.ts';
import { selectViewPost } from '../posts/postsSlice.ts';
import { isErrComment, isLoadComment } from './commentsSlice.ts';

import { Comment } from '../../types';


const CommentsForm = () => {

  const dispatch = useAppDispatch();
  const loadingComment = useSelector(isLoadComment);
  const errorComment = useSelector(isErrComment);

  const getId = useSelector(selectViewPost);

  const [comment, setComment] = useState<Comment>({
    post: getId?._id as string,
    comment: '',
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setComment((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const formSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await dispatch(createComment(comment)).unwrap();
    } catch (e) {
      //error
    }

  };

  return (
    <Container component="main" maxWidth="xs">
      <Box marginTop={20}>
        {errorComment &&
        (<Alert severity="warning">
        {errorComment.error}
      </Alert>)}
        <form
          autoComplete="off"
          onSubmit={formSubmitHandler}>
          <Grid container direction="column" spacing={2}>
            <Grid item xs>
              <TextField
                fullWidth
                id="comment"
                label="comment"
                name="comment"
                value={comment.comment}
                onChange={inputChangeHandler}
              />
            </Grid>
            <Grid item xs>
              <Button
                fullWidth
                type="submit"
                color="primary"
                variant="contained"
                disabled={loadingComment}
              >
                {loadingComment ? <CircularProgress/> : 'Create new comment'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default CommentsForm;