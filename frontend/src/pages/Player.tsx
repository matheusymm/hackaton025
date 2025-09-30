import VideoPlayer from '../components/VideoPlayer';

const sampleApiData = [
  { id: { videoId: 'DeQ9CgfPgtI' }, snippet: { title: 'Planeta Terra' } },
  { id: { videoId: 'RUQ_j-nR1Kk' }, snippet: { title: 'Esqui na neve' } },
  { id: { videoId: 'uo9irp7Q2yE' }, snippet: { title: 'Areia Cinética' } },
  { id: { videoId: 'It-d58Py22w' }, snippet: { title: 'Paisagem Noruega' } },
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <VideoPlayer videos={sampleApiData} />
      </header>
    </div>
  );
}

export default App;