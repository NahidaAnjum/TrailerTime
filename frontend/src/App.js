import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './Routes';
import { AuthProvider } from './contexts/AuthContext';
import './styles/main.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app-container">
          <AppRoutes />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;