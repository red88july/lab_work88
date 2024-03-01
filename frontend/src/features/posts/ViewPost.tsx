import dayjs from 'dayjs';
import { Alert, Box, Button, CardMedia, Container, Typography } from '@mui/material';

import { useSelector } from 'react-redux';
import { selectViewPost } from './postsSlice.ts';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { NavLink, useParams } from 'react-router-dom';
import { useEffect } from 'react';


import { viewOnePost } from './postsThunk.ts';
import { selectUserDetails } from '../users/usersSlice.ts';
import iconUsercomment from '../../assets/images/ic-author.png';
import iconDatetimePost from '../../assets/images/ic-date.png';
import picOfPostMessage from '../../assets/images/ic-message.png';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import AddIcon from '@mui/icons-material/Add';

import { apiURL } from '../../constants.ts';
import {getCommentsByPost} from '../comments/commentsThunk.ts';
import {selectCommentsByPost} from '../comments/commentsSlice.ts';

const stylePostBox = {
  borderRadius: '10px',
  border: '2px solid #42a5f5',
  display: 'flex',
  flexDirection: 'column',
  padding: '20px 20px 20px 20px',
  alignItems: 'center',
  marginBottom: '10px',
  background: 'linear-gradient(90deg, rgba(0,224,255,0.24413515406162467) 0%, rgba(255,255,255,1) 100%)',
  '&:hover': {
    boxShadow: '6px 7px 21px -5px rgba(0,0,0,0.27)',
  }
};

const picDate = {
  padding: '5px 0 5px 50px',
  backgroundImage: `url(${iconDatetimePost})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'left center',
  backgroundSize: '40px',
};

const picAuthor = {
  padding: '5px 0 5px 50px',
  backgroundImage: `url(${iconUsercomment})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'left center',
  backgroundSize: '40px',
};

const styleCommentBox = {
  borderRadius: '5px',
  border: '1px solid #42a5f5',
  display: 'flex',
  flexDirection: 'column',
  padding: '5px 10px 5px 10px',
  marginBottom: '10px',
  background: 'linear-gradient(90deg, rgba(0,224,255,0.24413515406162467) 0%, rgba(255,255,255,1) 100%)',
  '&:hover': {
    boxShadow: '6px 7px 21px -5px rgba(0,0,0,0.27)',
  }
};

const ViewPost = () => {

  const dispatch = useAppDispatch();
  const viewPost = useSelector(selectViewPost);
  const getComments = useSelector(selectCommentsByPost);

  const user = useAppSelector(selectUserDetails);

  let imagePost = picOfPostMessage;

  if (viewPost?.image) {
    imagePost = apiURL + '/' + viewPost?.image;
  }

  const {id} = useParams();

  useEffect(() => {
    if (id) {
      dispatch(viewOnePost(id));
      dispatch(getCommentsByPost(id));
    }
  }, [dispatch, id]);


  return (
    <Container maxWidth="sm">
      <Box marginTop={10}>
        <Box key={viewPost?._id} id={viewPost?._id} sx={stylePostBox}>
          <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <CardMedia
              component="img"
              sx={{width: '80%', height: 'auto', borderRadius: '10px', border: '3px solid black'}}
              image={imagePost}
              alt="message"
            />
          </Box>
          <Box display="flex" flexDirection="column">
            <Box marginBottom={3}>
              <Typography gutterBottom variant="subtitle1" component="div">
                <p style={{textIndent: '25px'}}>{viewPost?.description}</p>
              </Typography>
            </Box>
            <Box display="flex" flexDirection="column" justifyContent="right" marginBottom={1}>
              <Box display="flex" flexDirection="column" width="300px">
                <Typography gutterBottom variant="subtitle2" component="div" sx={picDate}>
                  <em>{dayjs(viewPost?.datetime).format('YYYY-MM-DD HH:mm')}</em>
                </Typography>
              </Box>
            </Box>
            <Box display="flex" justifyContent="right">
              {user ?
                (<Button component={NavLink} to={`/comments/${id}`} variant="contained" startIcon={<AddIcon/>}>
                  Add comment
                </Button>) :
                (<Alert severity="info">
                  Only login may add comments!
                </Alert>)}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box marginTop={8}>
        <Typography gutterBottom variant="h5" component="div">
          <InsertCommentIcon />
          Comments
        </Typography>
        {getComments.map(comments => (
          <Box key={comments._id} id={comments._id} sx={styleCommentBox}>
            <Box display="flex" flexDirection="column">
              <Box marginBottom={3}>
                <Typography gutterBottom variant="subtitle1" component="div" sx={picAuthor}>
                  <strong><p style={{textIndent: '25px', margin: "4px 0 0 0"}}>{comments.user.username}</p></strong>
                </Typography>
              </Box>
              <Box marginBottom={3}>
                <Typography gutterBottom variant="subtitle1" component="div">
                  <p style={{textIndent: '25px', margin: 0}}>{comments.comment}</p>
                </Typography>
              </Box>
              <Box display="flex" flexDirection="column" justifyContent="right" marginBottom={1}>
                <Box display="flex" flexDirection="column" width="200px">
                  <Typography gutterBottom variant="subtitle2" component="div" sx={picDate}>
                    <em>{dayjs(comments.post.datetime).format('YYYY-MM-DD HH:mm')}</em>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default ViewPost;