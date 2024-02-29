import React, {useState} from 'react';
import {User} from '../../../types';

import {Box, Button, Link, Menu, MenuItem} from '@mui/material';
import {useAppDispatch} from '../../../../app/hooks.ts';
import {logout} from '../../../features/users/usersThunk.ts';

const addPost = {
  color: 'inherit',
  textDecoration: 'none',
  underline: 'none',
  marginLeft: '20px',
  '&:hover': {
    color: 'inherit',
    textDecoration: 'underline',
  },
};

const boxStyleLink = {
  '&:hover': {
    transition: '1s',
    transform: 'scale(1.2)',
  },
};

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {

  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);


  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <Box display="flex" alignItems="center">
        <Box>
          <Button color="inherit" onClick={handleClick}>
            Hello, {user.username}
          </Button>
        </Box>
        <Box sx={boxStyleLink}>
          <Link href="/new-post" sx={addPost}>
            Add new post
          </Link>
        </Box>
      </Box>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} keepMounted>
        <MenuItem
          onClick={handleLogout}
        >Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
