// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import ListaProductos from './components/ProductList';
import PrivateRoute from './routes/PrivateRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/productos" element={
          <PrivateRoute>
            <ListaProductos />
          </PrivateRoute>
        } />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
