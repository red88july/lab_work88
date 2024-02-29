import Layout from './components/Layout/Layout';
import RegForm from './features/users/RegForm.tsx';
import {Box} from '@mui/material';
import {Route, Routes} from 'react-router-dom';
import PageNoFoundPicture from '../src/assets/images/404PageNotFound.jpg';
import LogForm from './features/users/LogForm.tsx';
import PostForm from './features/posts/PostForm.tsx';

function App() {
  return (
    <>
        <Layout>
            <Routes>
              <Route path="/register" element={(<RegForm />)}/>
              <Route path="/login" element={(<LogForm />)}/>
              <Route path="/new-post" element={(<PostForm />)}/>
              <Route path="*" element={(
                <Box
                  sx={{display: "flex", alignItems:'center',
                    justifyContent: 'center', marginTop: '50px'}} >
                  <Box component="img"
                       sx={{width: '50rem', height: '50rem'}}
                       src={PageNoFoundPicture}
                       alt="Page Not Found"/>
                </Box>
              )}/>
            </Routes>

        </Layout>
    </>
  );
}

export default App;