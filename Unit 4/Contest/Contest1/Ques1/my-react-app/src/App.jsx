import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DataPage from './pages/DataPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/data" element={<DataPage />} />
    </Routes>
  );
}
