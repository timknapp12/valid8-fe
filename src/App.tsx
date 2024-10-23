import './App.css';
import AuthProvider from './contexts/AuthContext';
import AppProvider from './contexts/AppContext';
import Home from './pages/Home';

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Home />
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
