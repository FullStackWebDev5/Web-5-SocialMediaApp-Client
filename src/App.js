import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap'
import NavbarComponent from './components/Navbar';
import Users from './components/Users';

function App() {
  return (
    <div className="App">
      <NavbarComponent />
      <Container>
        <Users />
      </Container>
    </div>
  );
}

export default App;
