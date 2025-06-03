import React, { useEffect, useState } from 'react';
import {
  getProductos,
  deleteProducto,
} from './services/productService';
import ProductoForm from './components/ProductoForm';

function App() {
  const [productos, setProductos] = useState([]);
  const [productoEditado, setProductoEditado] = useState(null);

  const cargarProductos = async () => {
    try {
      const data = await getProductos();
      setProductos(data);
    } catch (err) {
      console.error('Error al obtener productos:', err);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  return (
    <div>
      <h2>Administración de Productos</h2>
      <ProductoForm
        productoEditado={productoEditado}
        onSuccess={cargarProductos}
      />
      <h3>Lista de productos</h3>
      <ul>
        {productos.map((p) => (
          <li key={p.id}>
            <b>{p.nombre}</b> - {p.categoria} - ${p.precio}
            <button onClick={() => setProductoEditado(p)}>Editar</button>
            <button onClick={() => deleteProducto(p.id).then(cargarProductos)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;