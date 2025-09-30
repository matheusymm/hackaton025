import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import TextField from '@mui/material/TextField';

const SignupPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');

  // TODO: api integration

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setEmailError('Por favor, insira um e-mail válido.');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleSubmit = () => {
    if (!email.trim() || !password.trim() || !validateEmail()) return;

    alert(`Cadastrado: ${name}`);
  };


  return (
    <div className='flex flex-col w-screen h-screen items-center justify-center'>
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
              <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
            </Toolbar>
          </AppBar>
        </Box>
      </div>
      <div className='flex flex-col w-1/3 h-full justify-center gap-4'>
        <h1 className='text-2xl font-bold text-center'>Cadastre-se</h1>
        <TextField id="outlined-basic" label="Nome" variant="outlined" type='text' onChange={(e) => setName(e.target.value)} />
        <TextField id="outlined-basic" label="Email" variant="outlined" type='email' onChange={(e) => setEmail(e.target.value)} error={!!emailError} helperText={emailError} />
        <TextField id="outlined-basic" label="Senha" variant="outlined" type='password' onChange={(e) => setPassword(e.target.value)} />
        <Button variant="contained" onClick={handleSubmit}>Cadastrar</Button>
      </div>
    </div>
  )
}

export default SignupPage;