import { Product } from '../domain/product';

export class ProductResponse {
  constructor(
    public id: string,
    public name: string,
    public code: string,
    public description: string,
    public createAt: string,
    public price: number,
    public category: string,
  ) {}

  static fromAggregate(product: Product) {
    return new ProductResponse(
      product.id.value,
      product.name.value,
      product.code.value,
      product.description.value,
      product.createAt.toString,
      product.price.value,
      product.category.value,
    );
  }
}
