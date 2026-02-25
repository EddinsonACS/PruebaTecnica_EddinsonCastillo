import { API_BASE_URL } from '../../services/ApiConfig';
import { ProductService } from '../../services/ProductService';

globalThis.fetch = jest.fn() as jest.Mock;

describe('ProductService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch products successfully', async () => {
        const mockProducts = [{ id: '1', name: 'Test Product', description: 'Test', logo: 'logo', date_release: '2025-01-01', date_revision: '2026-01-01' }];
        
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ data: mockProducts }),
        });

        const products = await ProductService.getProducts();

        expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/bp/products`, expect.any(Object));
        expect(products).toEqual(mockProducts);
    });

    it('should add a product successfully', async () => {
        const newProduct = { id: '2', name: 'New Product', description: 'Test', logo: 'logo', date_release: '2025-01-01', date_revision: '2026-01-01' };
        
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ data: newProduct }),
        });

        const result = await ProductService.addProduct(newProduct);

        expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/bp/products`, expect.objectContaining({
            method: 'POST',
            body: JSON.stringify(newProduct),
        }));
        expect(result).toEqual(newProduct);
    });

    it('should handle fetch errors on getProducts', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
        });

        await expect(ProductService.getProducts()).rejects.toThrow('Failed to fetch products');
    });

    it('should verify product ID existence', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => true,
        });

        const exists = await ProductService.verifyId('123');
        expect(exists).toBe(true);
    });

    it('should handle false on verify product ID existence', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
        });

        const exists = await ProductService.verifyId('123');
        expect(exists).toBe(false);
    });

    it('should handle fetch errors on verifyId', async () => {
        (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));
        
        const exists = await ProductService.verifyId('123');
        expect(exists).toBe(false);
    });

    it('should handle fetch errors on addProduct', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
        });
        const newProduct = { id: '2', name: 'New Product', description: 'Test', logo: 'logo', date_release: '2025-01-01', date_revision: '2026-01-01' };

        await expect(ProductService.addProduct(newProduct)).rejects.toThrow('Failed to add product');
    });

    it('should handle network errors on addProduct', async () => {
        (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));
        const newProduct = { id: '2', name: 'New Product', description: 'Test', logo: 'logo', date_release: '2025-01-01', date_revision: '2026-01-01' };

        await expect(ProductService.addProduct(newProduct)).rejects.toThrow('Network error');
    });

    it('should update a product successfully', async () => {
        const updatedProduct = { id: '1', name: 'Updated Product', description: 'Test', logo: 'logo', date_release: '2025-01-01', date_revision: '2026-01-01' };
        
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ data: updatedProduct }),
        });

        const result = await ProductService.updateProduct(updatedProduct);

        expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/bp/products/1`, expect.objectContaining({
            method: 'PUT',
            body: JSON.stringify(updatedProduct),
        }));
        expect(result).toEqual(updatedProduct);
    });

    it('should handle fetch errors on updateProduct', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
        });
        const updatedProduct = { id: '1', name: 'Updated Product', description: 'Test', logo: 'logo', date_release: '2025-01-01', date_revision: '2026-01-01' };

        await expect(ProductService.updateProduct(updatedProduct)).rejects.toThrow('Failed to update product');
    });

    it('should handle network errors on updateProduct', async () => {
        (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));
        const updatedProduct = { id: '1', name: 'Updated Product', description: 'Test', logo: 'logo', date_release: '2025-01-01', date_revision: '2026-01-01' };

        await expect(ProductService.updateProduct(updatedProduct)).rejects.toThrow('Network error');
    });

    it('should delete a product successfully', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
        });

        const result = await ProductService.deleteProduct('1');

        expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/bp/products/1`, expect.objectContaining({
            method: 'DELETE',
        }));
        expect(result).toBe(true);
    });

    it('should handle fetch errors on deleteProduct', async () => {
        (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

        await expect(ProductService.deleteProduct('1')).rejects.toThrow('Network error');
    });
});
