import './App.css'
import { Routes, Route } from 'react-router-dom';
import VideoPlayer from './pages/VideoPlayer';

function App() {

  return (
    <>
      <Routes>
        <Route path="/player" element={<VideoPlayer />} />
      </Routes>
    </>
  )
}

export default App
