const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const productService = require('../../../src/services/product.service');
const productController = require('../../../src/controllers/product.controller');

const {
  productControllerAll,
  productControllerById,
  productSearchByName,
} = require('./mocks/product.controller.mock');

describe('teste controller', function () {
  it('lista de produtos', async function () {
    sinon.stub(productService, 'getProduct').resolves({ type: null, message: productControllerAll });

    const req = {};
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.getProduct(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productControllerAll);
  });

  it('erro no get', async function () {
    sinon.stub(productService, 'getProduct').resolves({ type: 500, message: 'Algo deu errado!' });

    const req = {};
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.getProduct(req, res);

    expect(res.status).to.have.been.calledWith(500);
    expect(res.json).to.have.been.calledWith({ message: 'Algo deu errado!' });
  });

  it('recuperar pelo id', async function () {
    sinon.stub(productService, 'getProductById').resolves({ type: null, message: productControllerById });

    const req = { params: { id: 1 } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.getProductById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productControllerById);
  });

  it('id inexistente', async function () {
    sinon.stub(productService, 'getProductById').resolves({ type: 404, message: 'Product not found' });

    const req = { params: { id: 1 } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.getProductById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  it('novo produto', async function () {
    sinon.stub(productService, 'insertProduct')
      .resolves({ type: null, message: { id: 5, name: "Novo Produto" } });

    const req = { body: { name: 'Novo Produto' } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.insertProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith({ id: 5, name: 'Novo Produto' });
  });

  it('erro', async function () {
    sinon.stub(productService, 'insertProduct')
      .resolves({ type: 500, message: 'Aconteceu algum erro!' });

    const req = { body: { name: 'Novo Produto' } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.insertProduct(req, res);

    expect(res.status).to.have.been.calledWith(500);
    expect(res.json).to.have.been.calledWith({message: 'Aconteceu algum erro!'});
  });

  it('recuperar pelo nome', async function () {
    sinon.stub(productService, 'getProductByName').resolves({ type: null, message: productSearchByName });

    const req = { query: { q: "Martelo" } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.getProductByName(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productSearchByName);
  });

  it('erro por n existir nome', async function () {
    sinon.stub(productService, 'getProductByName').resolves({ type: 404, message: 'Product not found' });

    const req = { query: { q: "Marreta do Chapolin Colorado do SBT, axar" } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.getProductByName(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  it('retorna nomes vazios', async function () {
    sinon.stub(productService, 'getProduct').resolves({ type: null, message: productControllerAll });

    const req = { query: { q: "" } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.getProductByName(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productControllerAll);
  });

  it('update id', async function () {
    sinon.stub(productService, 'updateProduct')
      .resolves({ type: null, message: { id: 1, name: "Novo Produto Atualizado" } });

    const req = { params: { id: 1 }, body: { name: "Novo Produto Atualizado" } };

    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({ id: 1, name: "Novo Produto Atualizado"});
  });

  it('update id error', async function () {
    sinon.stub(productService, 'updateProduct')
      .resolves({ type: 404, message: 'Product not found' });

    const req = { params: { id: 18451495 }, body: { name: "Novo Produto Atualizado" } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  it('deleta id', async function () {
    sinon.stub(productService, 'deleteProduct')
      .resolves({ type: null, message: undefined });

    const req = { params: { id: 1 } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.end = sinon.stub().returns();

    await productController.deleteProduct(req, res);

    expect(res.status).to.have.been.calledWith(204);
    expect(res.end).to.have.been.calledWith();
  });

  it('id invalido ao deletar', async function () {
    sinon.stub(productService, 'deleteProduct')
      .resolves({ type: 404, message: 'Product not found' });

    const req = { params: { id: 18451495 } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.deleteProduct(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  afterEach(sinon.restore);
});