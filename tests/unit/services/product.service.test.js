const { expect } = require('chai');
const sinon = require('sinon');

const productModel = require('../../../src/models/product.model');
const productService = require('../../../src/services/product.service');

const { productServiceAll, productServiceById, productSearchByName } = require('./mocks/product.service.mock');

describe('Testes dos produtos', function () {
  it('Recuperando produtos', async function () {
    sinon.stub(productModel, 'getAllProducts').resolves(productServiceAll);
    const response = { type: null, message: productServiceAll }
    const result = await productService.getProduct();
    expect(result).to.be.deep.equal(response);
  });

  it('produto por nome', async function () {
    sinon.stub(productModel, 'getProductByName').resolves(productSearchByName);
    const response = { type: null, message: productSearchByName }
    const result = await productService.getProductByName('Martelo');
    expect(result).to.be.deep.equal(response);
  });

  it('produto por nome erro', async function () {
    sinon.stub(productModel, 'getProductByName').resolves();
    const response = { type: 404, message: 'Product not found' };
    const result = await productService.getProductByName('Martelo');
    expect(result).to.be.deep.equal(response);
  });


  it('produto por id', async function () {
    sinon.stub(productModel, 'getProductById').resolves(productServiceById);
    const response = { type: null, message: productServiceById }
    const result = await productService.getProductById(1);
    expect(result).to.be.deep.equal(response);
  });

  it('erro por id', async function () {
    sinon.stub(productModel, 'getProductById').resolves(undefined);
    const response = { type: 404, message: 'Product not found' };
    const result = await productService.getProductById(99);
    expect(result).to.be.deep.equal(response);
  });

  it('novo produto mesmo id', async function () {
    sinon.stub(productModel, 'insertProduct').resolves(productServiceById);
    const response = { type: null, message: productServiceById }
    const result = await productService.insertProduct("Martelo de Thor");
    expect(result).to.be.deep.equal(response);
  });

  it('update e mesmo id', async function () {
    sinon.stub(productModel, 'getProductById').resolves(true);
    sinon.stub(productModel, 'updateProduct').resolves({ id: 1, name: "Novo Produto Atualizado" });
    const response = { type: null, message: { id: 1, name: "Novo Produto Atualizado" } }
    const result = await productService.updateProduct("1", "Martelo de Thor");
    expect(result).to.be.deep.equal(response);
  });

  it('update id erro', async function () {
    sinon.stub(productModel, 'getProductById').resolves(false);
    const response = { type: 404, message: 'Product not found' };
    const result = await productService.updateProduct("9999", "Martelo de Thor");
    expect(result).to.be.deep.equal(response);
  });

  it('excluir', async function () {
    sinon.stub(productModel, 'getProductById').resolves(true);
    sinon.stub(productModel, 'deleteProduct').resolves();
    const response = { type: null, message: undefined };
    const result = await productService.deleteProduct("1");
    expect(result).to.be.deep.equal(response);
  });

  it('excluir id invalido', async function () {
    sinon.stub(productModel, 'getProductById').resolves(false);
    const response = { type: 404, message: 'Product not found' };
    const result = await productService.deleteProduct("999");
    expect(result).to.be.deep.equal(response);
  });

  afterEach(sinon.restore);
});
