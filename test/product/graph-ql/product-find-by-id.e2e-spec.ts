import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ProductE2eModule } from './product-e2e-module';
import { ProductRepository } from '../../../src/product/domain/product.repository';
import { ProductMother } from '../product-object-mother';

describe('GraphQl Product (product)', () => {
  let app: INestApplication;
  let repository: ProductRepository;
  beforeEach(async () => {
    ({ app, productRepository: repository } = await ProductE2eModule.create());
    const items = await repository.findAll();
    for await (const item of items) {
      await repository.deleteById(item.id);
    }
  });

  it('get', async () => {
    const product = ProductMother.create();
    await repository.persist(product);
    const query = `
          query{
            product(id: "${product.id.value}"){
              id
              name
              code
              description
              createAt
              price
              category
            }
          }
          `;
    return request(app.getHttpServer())
      .post(`/graphql`)
      .send({ query: query, variables: {} })
      .then(async (response) => {
        expect(response.body).toEqual({
          data: {
            product: {
              id: product.id.value,
              name: product.name.value,
              code: product.code.value,
              description: product.description.value,
              createAt: product.createAt.value,
              price: product.price.value,
              category: product.category.value,
            },
          },
        });
        const productDb = await repository.findById(product.id);
        expect(productDb).not.toBeNull();
        expect(productDb.id.value).toEqual(product.id.value);
        expect(productDb.name.value).toEqual(product.name.value);
        expect(productDb.code.value).toEqual(product.code.value);
        expect(productDb.description.value).toEqual(product.description.value);
        expect(productDb.createAt.value).toEqual(product.createAt.value);
        expect(productDb.price.value).toEqual(product.price.value);
        expect(productDb.category.value).toEqual(product.category.value);
        expect(response.statusCode).toEqual(200);
      });
  });

  it('get not exit', async () => {
    const product = ProductMother.create();
    const query = `
          query{
            product(id: "${product.id.value}"){
              id
              name
              code
              description
              createAt
              price
              category
            }
          }
          `;
    return request(app.getHttpServer())
      .post(`/graphql`)
      .send({ query: query, variables: {} })
      .then(async (response) => {
        expect(response.body).toEqual({
          data: {
            product: null,
          },
        });
        const productDb = await repository.findById(product.id);
        expect(productDb).toBeNull();
        expect(response.statusCode).toEqual(200);
      });
  });
});
