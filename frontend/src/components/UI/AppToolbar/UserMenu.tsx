import React, {useState} from 'react';
import {User} from '../../../types';

import {Box, Button, Link, Menu, MenuItem} from '@mui/material';
import {useAppDispatch} from '../../../../app/hooks.ts';
import {login, logout} from '../../../features/users/usersThunk.ts';
import {postsCreate} from '../../../features/posts/postsThunk.ts';
import {useSelector} from 'react-redux';
import {selecPosts} from '../../../features/posts/postsSlice.ts';

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
      <Box>
        <Button color="inherit" onClick={handleClick}>
          Hello, {user.username}
        </Button>
        <Link href="/new-post" sx={addPost}>
          Add new post
        </Link>
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
