import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Quotation from './pages/Quotation';
import Agreements from './pages/Agreements';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quotation" element={<Quotation />} />
        <Route path="/agreements" element={<Agreements />} />
      </Routes>
    </Router>
  );
}

export default App;
