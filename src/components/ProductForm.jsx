import { useState } from 'react';
import { api } from '../services/api';
import { createProducto } from '../services/productService';
import Swal from 'sweetalert2';

const ProductForm = ({ categorias = [], onProductoCreado }) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoriaId, setCategoriaId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !precio || !categoriaId) {
      Swal.fire('Faltan campos obligatorios', '', 'warning');
      return;
    }

    const dto = {
      name: nombre,
      description: descripcion,
      price: parseFloat(precio),
      categoryId: parseInt(categoriaId),
    };

    try {
      await createProducto(dto);
      Swal.fire('Producto creado', '', 'success');
      onProductoCreado();
      setNombre('');
      setDescripcion('');
      setPrecio('');
      setCategoriaId('');
    } catch (err) {
      console.error('Error al crear producto', err);
      Swal.fire('Error al crear producto', err.message, 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Nuevo Producto</h3>
      <input
        value={nombre}
        onChange={e => setNombre(e.target.value)}
        placeholder="Nombre"
        required
      />
      <input
        value={descripcion}
        onChange={e => setDescripcion(e.target.value)}
        placeholder="Descripción"
      />
      <input
        type="number"
        value={precio}
        onChange={e => setPrecio(e.target.value)}
        placeholder="Precio"
        required
      />
      <select
        value={categoriaId}
        onChange={e => setCategoriaId(e.target.value)}
        required
      >
        <option value="">Categoría</option>
        {categorias.map(cat => (
          <option key={cat.id} value={cat.id}>
            {cat.nombre}
          </option>
        ))}
      </select>
      <button type="submit">Guardar</button>
    </form>
  );
};

export default ProductForm;
