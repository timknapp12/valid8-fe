import './App.css';
import AppProvider from './contexts/AppContext';
import Home from './pages/Home';

function App() {
  return (
    <AppProvider>
      <Home />
    </AppProvider>
  );
}

export default App;
