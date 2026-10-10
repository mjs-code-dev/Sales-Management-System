const API_URL = 'http://localhost:8080/api/categorias';

export const obtenerCategorias = async () => {
    try {
        const res = await fetch(API_URL);
        return await res.json();
    } catch (error) {
        console.error('Error al obtener categorías:', error);
        return [];
    }
};

export const crearCategoria = async (categoria) => {
    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(categoria)
        });
        return await res.json();
    } catch (error) {
        console.error('Error al crear categoría:', error);
    }
};

export const actualizarCategoria = async (id, categoria) => {
    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(categoria)
        });
        return await res.json();
    } catch (error) {
        console.error('Error al actualizar categoría:', error);
    }
};

export const eliminarCategoria = async (id) => {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        return true;
    } catch (error) {
        console.error('Error al eliminar categoría:', error);
        return false;
    }
};