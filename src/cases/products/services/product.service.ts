/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../../../lib/axios";
import type { ProductDTO } from "../dtos/product.dto";

const _ENDPOINT = "/products";


function mapProduct(apiProduct: { id: any; productid: any; name: any; description: any; price: any; active: any; category: any; brand: any; photos: any; }): ProductDTO {
  return {
    id: apiProduct.id ?? apiProduct.productid, 
    name: apiProduct.name,
    description: apiProduct.description,
    price: Number(apiProduct.price), 
    active: apiProduct.active,
    category: apiProduct.category,
    brand: apiProduct.brand,
    photos: apiProduct.photos
  };
}

export const ProductService = {
  async list(categoryId?: string): Promise<ProductDTO[]> {
    const params = categoryId ? { categoryId } : undefined;

    const result = await api.get(_ENDPOINT, { params });

    return result.data.map(mapProduct); 
  },

  async getById(id: string): Promise<ProductDTO> {
    const result = await api.get(`${_ENDPOINT}/${id}`);

    return mapProduct(result.data); 
  },
};
