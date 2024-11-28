import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        {/* Your other components/routes */}
      </div>
    </Router>
  );
}

export default App
