import VideoPlayer from '../components/VideoPlayer';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const sampleApiData = [
  { id: { videoId: 'DeQ9CgfPgtI' }, snippet: { title: 'Planeta Terra' } },
  { id: { videoId: 'RUQ_j-nR1Kk' }, snippet: { title: 'Esqui na neve' } },
  { id: { videoId: 'uo9irp7Q2yE' }, snippet: { title: 'Areia Cinética' } },
  { id: { videoId: 'It-d58Py22w' }, snippet: { title: 'Paisagem Noruega' } },
];

function App() {
   const navigate = useNavigate();
  return (
   <div className='flex flex-col w-screen h-screen bg-gray-100'>
      <div className='w-full'>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Button color="inherit" onClick={() => navigate('/')}>Hackaton</Button>
              </Typography>
              <Button color="inherit" onClick={() => navigate('/signup')}>Cadastrar</Button>
              <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
            </Toolbar>
          </AppBar>
        </Box>
      </div>
          <VideoPlayer videos={sampleApiData} />
    </div>
  );
}

export default App;