import dayjs from 'dayjs';
import {Box, CardMedia, Typography} from '@mui/material';

import {ApiUser} from '../../types';
import picOfPostMessage from '../../assets/images/ic-message.png';
import {apiURL} from '../../constants.ts';

const stylePostBox = {
  borderRadius:"10px",
  border: "2px solid #42a5f5",
  display: "flex",
  padding: "5px",
  alignItems: "center",
  marginBottom: "10px",
  "&:hover": {
    boxShadow: "6px 7px 21px -5px rgba(0,0,0,0.27)",
  }
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
          <Box key={id} id={id} sx={stylePostBox} >
            <Box>
              <CardMedia
                component="img"
                sx={{width: 100, borderRadius:"10px", border: "3px solid black"}}
                image={imagePost}
                alt="message"
              />
            </Box>
            <Box display="flex" flexDirection="column" marginLeft={5}>
              <Box display="flex" marginBottom={1}>
                <Typography gutterBottom variant="subtitle2" component="div" marginRight={2}>
                  <em>{dayjs(datetime).format('YYYY-MM-DD HH:mm')}</em>
                </Typography>
                <Typography gutterBottom variant="subtitle2" component="div">
                  <b>by</b>
                </Typography>
                <Typography gutterBottom variant="subtitle2" component="div" marginLeft={2}>
                  <em>{user.username}</em>
                </Typography>
              </Box>

              <Box>
                <Typography gutterBottom variant="h6" component="div">
                  {title}
                </Typography>
              </Box>
            </Box>
          </Box>
      </Box>
  );
};

export default PostsList;