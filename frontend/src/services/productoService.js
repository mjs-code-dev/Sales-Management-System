const API_URL = 'http://localhost:8080/api/productos';

export const obtenerProductos = async () => {
    try {
        const res = await fetch(API_URL);
        return await res.json();
    } catch (error) {
        console.error('Error al obtener productos:', error);
        return [];
    }
};

export const crearProducto = async (producto) => {
    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(producto)
        });
        return await res.json();
    } catch (error) {
        console.error('Error al crear producto:', error);
    }
};

export const actualizarProducto = async (id, producto) => {
    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(producto)
        });
        return await res.json();
    } catch (error) {
        console.error('Error al actualizar producto:', error);
    }
};

export const eliminarProducto = async (id) => {
    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        return res.ok;
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        return false;
    }
};