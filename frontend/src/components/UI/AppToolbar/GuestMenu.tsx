import {Box, Button} from '@mui/material';
import regButtonImg from '../../../assets/images/ic-registration.png';
import logButtonImg from '../../../assets/images/ic-login.png';
import {Link} from 'react-router-dom';

const regButton = {
  border: '2px solid #FFF',
  borderRadius: "10px",
  backgroundImage: `url(${regButtonImg})`,
  backgroundSize: "30px",
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'left 10px center',
  paddingLeft: '40px',
  marginRight: "20px",
  width: "150px",
  height: "45px",
};

const logButton = {
  border: '2px solid #FFF',
  borderRadius: "10px",
  backgroundImage: `url(${logButtonImg})`,
  backgroundSize: "30px",
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'left 10px center',
  paddingLeft: '40px',
  width: "150px",
  height: "45px",
};

const GuestMenu = () => {
  return (
    <>
      <Box sx={{display: "flex", flexDirection: "row"}}>
        <Button component={Link} to='/register' color="inherit" sx={regButton}>Register</Button>
        <Button component={Link} to='/login' color="inherit" sx={logButton}>Login</Button>
      </Box>
    </>
  );
};

export default GuestMenu;