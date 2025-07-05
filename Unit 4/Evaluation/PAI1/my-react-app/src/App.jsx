import { Routes, Route } from 'react-router-dom';
import Tasks from './Pages/Tasks';
import About from './Pages/About';
import { useEffect, useState } from 'react';
import { Navbar } from './Components/Navbar';
import Home from './Pages/Home';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setTasks([
        { id: 1, title: 'Sample Task 1', description: 'This is one task', completed: false },
        { id: 2, title: 'Sample Task 2', description: '', completed: true },
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  const addTask = (title, description) => {
    setTasks([...tasks, {
      id: Date.now(),
      title,
      description,
      completed: false
    }]);
  };

  const toggleCompletion = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Tasks tasks={tasks} loading={loading} addTask={addTask} toggleCompletion={toggleCompletion} />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;