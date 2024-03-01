import dayjs from 'dayjs';
import {Box, CardMedia, Typography} from '@mui/material';

import {ApiUser} from '../../types';
import {apiURL} from '../../constants.ts';
import picOfPostMessage from '../../assets/images/ic-message.png';
import iconAuthorPost from '../../assets/images/ic-author.png';
import iconDatetimePost from '../../assets/images/ic-date.png';
import iconTitlePost from '../../assets/images/ic-title.png';

const stylePostBox = {
  borderRadius: '10px',
  border: '2px solid #42a5f5',
  display: 'flex',
  padding: '5px',
  alignItems: 'center',
  marginBottom: '10px',
  background: 'linear-gradient(90deg, rgba(0,224,255,0.24413515406162467) 0%, rgba(255,255,255,1) 100%)',
  '&:hover': {
    boxShadow: '6px 7px 21px -5px rgba(0,0,0,0.27)',
  }
};

const picAuthor = {
  padding: '5px 0 5px 50px',
  backgroundImage: `url(${iconAuthorPost})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'left center',
  backgroundSize: '30px',
};

const picDate = {
  padding: '5px 0 5px 50px',
  backgroundImage: `url(${iconDatetimePost})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'left center',
  backgroundSize: '40px',
};

const picTitle = {
  padding: '5px 0 5px 50px',
  backgroundImage: `url(${iconTitlePost})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'left center',
  backgroundSize: '30px',
};


interface Props {
  id: string;
  user: ApiUser;
  title: string;
  image: string | null;
  datetime: string;
}

const PostsList: React.FC<Props> = ({id, user, title, image, datetime}) => {

  let imagePost = picOfPostMessage;

  if (image) {
    imagePost = apiURL + '/' + image;
  }

  return (
    <Box marginTop={2}>
      <Box key={id} id={id} sx={stylePostBox}>
        <Box>
          <CardMedia
            component="img"
            sx={{width: 130, height: 130, borderRadius: '10px', border: '3px solid black'}}
            image={imagePost}
            alt="message"
          />
        </Box>
        <Box display="flex" flexDirection="column" marginLeft={5}>

          <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={1}>
            <Typography gutterBottom variant="subtitle2" component="div" sx={picAuthor} marginLeft={2}>
              <em>{user.username}</em>
            </Typography>
            <Typography gutterBottom variant="subtitle2" component="div" sx={picDate} marginLeft={4}>
              <em>{dayjs(datetime).format('YYYY-MM-DD HH:mm')}</em>
            </Typography>
          </Box>
          <Box>
            <Typography gutterBottom variant="h6" sx={picTitle} component="div">
              <strong>{title}</strong>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PostsList;