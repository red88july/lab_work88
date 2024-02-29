import { AppBar, Container, Grid, Link, Toolbar, Typography } from '@mui/material';
import GuestMenu from './GuestMenu.tsx';
import { useAppSelector } from '../../../../app/hooks.ts';
import { selectUserDetails } from '../../../features/users/usersSlice.ts';
import UserMenu from './UserMenu';

const MainNav = {
  color: 'inherit',
  textDecoration: 'none',
  underline: 'none',
  '&:hover': {
    color: 'inherit',
  },
};

const AppToolbar = () => {

  const user = useAppSelector(selectUserDetails);

  return (
    <AppBar sx={{mb: 2}}>
      <Container maxWidth="xl">
        <Toolbar>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography variant="h4" component="div" sx={{flexGrow: 1}}>
              <Link href="/" sx={MainNav}>
                Forum
              </Link>
            </Typography>
            {user ? (
              <UserMenu user={user.user} />
            ) : (<GuestMenu/>)}
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>

  );
};

export default AppToolbar;