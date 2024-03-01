import {Box, Button, CardMedia, Container, Typography} from '@mui/material';
import dayjs from 'dayjs';
import {useSelector} from 'react-redux';
import {selectViewPost} from './postsSlice.ts';
import {useAppDispatch} from '../../../app/hooks.ts';
import {useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {viewOnePost} from './postsThunk.ts';
import iconAuthorPost from '../../assets/images/ic-author.png';
import iconDatetimePost from '../../assets/images/ic-date.png';
import picOfPostMessage from '../../assets/images/ic-message.png';
import AddIcon from '@mui/icons-material/Add';
import {apiURL} from '../../constants.ts';

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

const ViewPost = () => {
  const dispatch = useAppDispatch();
  const viewPost = useSelector(selectViewPost);

  let imagePost = picOfPostMessage;

  if (viewPost?.image) {
    imagePost = apiURL + '/' + viewPost?.image;
  }

  const {id} = useParams();

  useEffect(() => {
    if (id) {
      dispatch(viewOnePost(id));
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
                <Button variant="contained">
                  <AddIcon />
                  Add comment
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
  );
};

export default ViewPost;