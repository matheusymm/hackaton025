import VideoPlayer from '../components/VideoPlayer';

const sampleApiData = [
  { id: { videoId: 'L8TB3b93y2E' }, snippet: { title: 'Planeta Terra' } },
  { id: { videoId: 'Rk6n6aQn7DE' }, snippet: { title: 'Esqui na neve' } },
  { id: { videoId: 'm2EnP2fEt4Y' }, snippet: { title: 'Areia Cinética' } },
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