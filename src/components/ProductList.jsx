import React, { useEffect, useState } from 'react';
import {
  getProductos,
  getProductosByCategoria,
  deleteProducto,
} from '../services/productService';
import ProductoForm from './ProductForm';
import Swal from 'sweetalert2';

const categorias = ['alimentos', 'panadería', 'bebidas'];

function ProductList() {
  const [productos, setProductos] = useState([]);
  const [productoEditado, setProductoEditado] = useState(null);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');

  const cargarProductos = async () => {
    try {
      const data = categoriaSeleccionada
        ? await getProductosByCategoria(categoriaSeleccionada)
        : await getProductos();
      setProductos(data);
    } catch (err) {
      Swal.fire('Error', 'No se pudieron obtener los productos', 'error');
    }
  };

  useEffect(() => {
    cargarProductos();
  }, [categoriaSeleccionada]);

  const confirmarEliminar = async (id) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
    });

    if (result.isConfirmed) {
      try {
        await deleteProducto(id);
        Swal.fire('Eliminado', 'El producto ha sido eliminado', 'success');
        cargarProductos();
      } catch (err) {
        Swal.fire('Error', 'No se pudo eliminar el producto', 'error');
      }
    }
  };

  return (
    <div>
      <ProductoForm
        productoEditado={productoEditado}
        onSuccess={() => {
          cargarProductos();
          setProductoEditado(null);
          Swal.fire('Éxito', 'Producto guardado correctamente', 'success');
        }}
      />

      <div>
        <label>Filtrar por categoría: </label>
        <select
          value={categoriaSeleccionada}
          onChange={(e) => setCategoriaSeleccionada(e.target.value)}
        >
          <option value="">Todas</option>
          {categorias.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <h3>Lista de productos</h3>
      <ul>
        {productos.map((p) => (
          <li key={p.id}>
            <b>{p.nombre}</b> - {p.categoria} - ${p.precio.toFixed(2)}
            <button onClick={() => setProductoEditado(p)}>Editar</button>
            <button onClick={() => confirmarEliminar(p.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
