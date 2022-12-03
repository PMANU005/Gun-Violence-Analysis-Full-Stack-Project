import MainComponent from './components/MainComponent.js';
import { Navbar } from 'react-bootstrap';
function App() {
  return (
    <div>
      <Navbar className="justify-content-center" bg="dark" variant='dark'>
        <Navbar.Brand>Spatial Mass Shooting/ Gun Crime Analysis</Navbar.Brand>
      </Navbar>
      <MainComponent />
    </div>
  );
}

export default App;
