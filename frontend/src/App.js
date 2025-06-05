import React from 'react';
import AppRoutes from './routes';
import { Routes, Route } from 'react-router-dom';
import AppLayout from './components/Layout/AppLayout';

const App = () => (
  <Routes>
    <Route path="/*" element={<AppLayout />}> 
      <Route index element={<AppRoutes />} />
    </Route>
  </Routes>
);

export default App;
