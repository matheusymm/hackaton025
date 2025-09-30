import './App.css'
import { Routes, Route } from 'react-router-dom';
import Player from './pages/Player';

function App() {

  return (
    <>
      <Routes>
        <Route path="/player" element={<Player />} />
      </Routes>
    </>
  )
}

export default App
