import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import AddProject from './components/AddProject';
import EditProject from './components/EditProject';
import ProjectDetails from './components/ProjectDetails';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path='/add-project' element={<PrivateRoute><AddProject /></PrivateRoute>} />
      <Route path='/edit-project/:id' element={<PrivateRoute><EditProject /></PrivateRoute>} />
      <Route path='/project/:id' element={<PrivateRoute><ProjectDetails /></PrivateRoute>} />
    </Routes>
  );
}
