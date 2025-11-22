import { api } from "../../../lib/axios";
import type { ProductDTO } from "../dtos/product.dto";

const _ENDPOINT = "/products";

export const ProductService = {
  async list(categoryId?: string): Promise<ProductDTO[]> {
    const params = categoryId ? { categoryId } : undefined;

    const result = await api.get(_ENDPOINT, { params });
    return result.data;
  },

  async getById(id: string): Promise<ProductDTO> {
    const result = await api.get(`${_ENDPOINT}/${id}`);
    return result.data;
  },
};