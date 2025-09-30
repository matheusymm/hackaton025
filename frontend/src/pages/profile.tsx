import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

interface UserMetric { date: string; timeSpent: number; tasksCompleted: number; }
const mockUserMetrics: UserMetric[] = [
  { date: '2025-09-30', timeSpent: 120, tasksCompleted: 5 },
  { date: '2025-09-29', timeSpent: 95, tasksCompleted: 3 },
  { date: '2025-09-28', timeSpent: 45, tasksCompleted: 1 },
  { date: '2025-09-26', timeSpent: 150, tasksCompleted: 8 },
  { date: '2025-09-25', timeSpent: 75, tasksCompleted: 4 },
];

// Componentes estilizados (sem alteração na definição)
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    borderBottom: 'none',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
    cursor: 'pointer',
  }
}));


const ProfilePage = () => {
  const navigate = useNavigate();
  const [name] = useState('NOME DO USUÁRIO');
  const [metrics, setMetrics] = useState<UserMetric[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = () => {
      setTimeout(() => {
        setMetrics(mockUserMetrics);
        setLoading(false);
      }, 1500);
    };
    fetchMetrics();
  }, []);

  return (
    <div className='flex flex-col w-screen h-screen bg-gray-100'>
      <div className='w-full'>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
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

      <div className='flex flex-col flex-grow items-center justify-start p-4 md:p-8 gap-8'>
        <h1 className='text-3xl font-bold text-gray-800 mt-4'>Bem vindo, {name}!</h1>
        <p className='text-xl text-gray-600'>Este é o seu histórico de produtividade:</p>
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : metrics.length === 0 ? (
          <Typography sx={{ mt: 4 }}>Nenhuma métrica encontrada para este usuário.</Typography>
        ) : (
          <TableContainer component={Paper} sx={{ maxWidth: 800, borderRadius: '8px' }} elevation={3}>
            <Table aria-label="tabela de métricas estilizada">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Data da Visita</StyledTableCell>
                  <StyledTableCell align="center">Tempo de Foco (min)</StyledTableCell>
                  <StyledTableCell align="center">Tarefas Concluídas</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {metrics.map((metric) => (
                  <StyledTableRow key={metric.date}>
                    <StyledTableCell align="center" component="th" scope="row">
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CalendarTodayIcon sx={{ mr: 1, fontSize: '1rem', color: 'gray' }} />
                        {new Date(metric.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                      </Box>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <AccessTimeIcon sx={{ mr: 1, fontSize: '1rem', color: 'gray' }} />
                        {metric.timeSpent}
                      </Box>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CheckCircleOutlineIcon sx={{ mr: 1, fontSize: '1rem', color: 'gray' }} />
                        {metric.tasksCompleted}
                      </Box>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;