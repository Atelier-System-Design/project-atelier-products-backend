/**
 * @jest-environment node
 */

const request = require('supertest');
const baseUrl = `http://localhost:3000`;

describe("GET /products", () => {
  it("should return a 200 status code", async () => {
    const response = await request(baseUrl).get('/products');
    expect(response.statusCode).toEqual(200);
  });

  it("should return 5 products by default", async () => {
    const response = await request(baseUrl).get('/products');
    expect(response.body.length).toEqual(5);
  });

  it("should return 3 products when count is 3", async () => {
    const response = await request(baseUrl).get('/products?count=3');
    expect(response.body.length).toEqual(3);
  });

  it("should not return the same list of products when pages are different", async () => {
    const response = await request(baseUrl).get('/products?page=1&count=1');
    const response2 = await request(baseUrl).get('/products?page=2&count=1');
    expect(response.body[0]).not.toEqual(response2.body[0]);
  });


  it("should return products with properties: id, name, slogan, description, category, default_price", async () => {
    const response = await request(baseUrl).get('/products');
    expect(response.body[0].hasOwnProperty('id')).toEqual(true);
    expect(response.body[0].hasOwnProperty('name')).toEqual(true);
    expect(response.body[0].hasOwnProperty('slogan')).toEqual(true);
    expect(response.body[0].hasOwnProperty('description')).toEqual(true);
    expect(response.body[0].hasOwnProperty('category')).toEqual(true);
    expect(response.body[0].hasOwnProperty('default_price')).toEqual(true);
  });
});

describe("GET products/:id", () => {
  it("should return a 200 status code", async () => {
    const response = await request(baseUrl).get('/products/2');
    expect(response.statusCode).toEqual(200);
  });

  it("should return a single product with id 2", async () => {
    const response = await request(baseUrl).get('/products/2');
    expect(response.body.id).toEqual(2);
  });

  it("product should have a features property", async () => {
    const response = await request(baseUrl).get('/products/2');
    expect(response.body.hasOwnProperty('features')).toEqual(true);
  });
})

describe("GET products/:id/styles", () => {
  it("should return a 200 status code", async () => {
    const response = await request(baseUrl).get('/products/2/styles');
    expect(response.statusCode).toEqual(200);
  });

  it("should return styles for a product with id 2", async () => {
    const response = await request(baseUrl).get('/products/2/styles');
    expect(response.body.product_id).toEqual(2);
  });

  it("should return styles with a results property", async () => {
    const response = await request(baseUrl).get('/products/2/styles');
    expect(response.body.hasOwnProperty('results')).toEqual(true);
  });

  it("each style should have properties: style_id, name, original_price, sale_price, default?, photos, skus", async () => {
    const response = await request(baseUrl).get('/products/2/styles');
    expect(response.body.results[0].hasOwnProperty('style_id')).toEqual(true);
    expect(response.body.results[0].hasOwnProperty('name')).toEqual(true);
    expect(response.body.results[0].hasOwnProperty('original_price')).toEqual(true);
    expect(response.body.results[0].hasOwnProperty('default?')).toEqual(true);
    expect(response.body.results[0].hasOwnProperty('photos')).toEqual(true);
    expect(response.body.results[0].hasOwnProperty('skus')).toEqual(true);
  });
})

describe("GET products/:id/related", () => {
  it("should return a 200 status code", async () => {
    const response = await request(baseUrl).get('/products/2/related');
    expect(response.statusCode).toEqual(200);
  });
  it("should return an array of related product id's", async () => {
    const response = await request(baseUrl).get('/products/2/related');
    expect(Array.isArray(response.body)).toEqual(true);
  });
})