import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import WeatherPage from './pages/WeatherPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/weather/:city" element={<WeatherPage />} />
    </Routes>
  );
}
