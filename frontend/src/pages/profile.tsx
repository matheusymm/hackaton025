import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [name,] = useState('NOME DO USUÁRIO');

  return (
    <div className='flex flex-col w-screen h-screen items-center justify-center gap-10'>
      <div className='flex w-full'>
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
              <Button color="inherit" onClick={() => navigate('login')}>Login</Button>
            </Toolbar>
          </AppBar>
        </Box>
      </div>
      <div className='flex flex-col w-1/2 h-full  gap-8'>
        <div className='flex flex-col gap-4'>
          <h1 className='text-2xl font-bold text-center'>Bem vindo, {name}!</h1>
          <p className='text-lg text-center'>Dados:</p>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage;