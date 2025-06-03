import React, { useEffect, useState } from 'react';
import ProductoForm from '../components/ProductoForm';
import ProductoLista from '../components/ProductoLista';
import { createProducto, updateProducto } from '../services/productService';
import { getCategorias } from '../services/categoryService';

const AdminProductos = () => {
  const [productoEditando, setProductoEditando] = useState(null);

  useEffect(() => {
    cargarCategorias();
  }, []);

const [categorias, setCategorias] = useState([]);

useEffect(() => {
  getCategorias()
    .then(data => setCategorias(data))
    .catch(err => console.error('Error cargando categorías', err));
}, []);

  const handleCrear = async (dto) => {
    await createProducto(dto);
    setProductoEditando(null);
  };

  const handleActualizar = async (dto) => {
    await updateProducto(productoEditando.id, dto);
    setProductoEditando(null);
  };

  return (
    <div>
      <ProductoForm
        categorias={categorias}
        onSubmit={productoEditando ? handleActualizar : handleCrear}
        initialData={productoEditando}
        modo={productoEditando ? 'editar' : 'crear'}
        onCancel={() => setProductoEditando(null)}
      />
      <ProductoLista
        categorias={categorias}
        onEdit={(producto) => setProductoEditando(producto)}
      />
    </div>
  );
};

export default AdminProductos;
