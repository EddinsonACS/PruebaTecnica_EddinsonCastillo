import { API_BASE_URL, AUTHOR_ID } from './ApiConfig';
import { Product } from './Product';

const HEADERS = {
    'authorId': AUTHOR_ID,
    'Content-Type': 'application/json',
};

export const ProductService = {
    getProducts: async (): Promise<Product[]> => {
        try {
            const response = await fetch(`${API_BASE_URL}/bp/products`, {
                method: 'GET',
                headers: HEADERS,
            });
            if (!response.ok) throw new Error('Failed to fetch products');
            const json = await response.json();
            return json.data;
        } catch (error) {
            console.error('Error in getProducts:', error);
            throw error;
        }
    },

    addProduct: async (product: Product): Promise<Product> => {
        try {
            const response = await fetch(`${API_BASE_URL}/bp/products`, {
                method: 'POST',
                headers: HEADERS,
                body: JSON.stringify(product),
            });
            if (!response.ok) throw new Error('Failed to add product');
            const json = await response.json();
            return json.data;
        } catch (error) {
            console.error('Error in addProduct:', error);
            throw error;
        }
    },

    updateProduct: async (product: Product): Promise<Product> => {
        try {
            const response = await fetch(`${API_BASE_URL}/bp/products/${product.id}`, {
                method: 'PUT',
                headers: HEADERS,
                body: JSON.stringify(product),
            });
            if (!response.ok) throw new Error('Failed to update product');
            const json = await response.json();
            return json.data;
        } catch (error) {
            console.error('Error in updateProduct:', error);
            throw error;
        }
    },

    deleteProduct: async (id: string): Promise<boolean> => {
        try {
            const response = await fetch(`${API_BASE_URL}/bp/products/${id}`, {
                method: 'DELETE',
                headers: HEADERS,
            });
            return response.ok;
        } catch (error) {
            console.error('Error in deleteProduct:', error);
            throw error;
        }
    },

    verifyId: async (id: string): Promise<boolean> => {
        try {
            const response = await fetch(`${API_BASE_URL}/bp/products/verification/${id}`, {
                method: 'GET',
                headers: HEADERS,
            });
            if (!response.ok) return false;
            const exists = await response.json();
            return exists === true;
        } catch (error) {
            console.error('Error in verifyId:', error);
            return false;
        }
    },
};
