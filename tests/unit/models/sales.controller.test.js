const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const salesService = require('../../../src/services/sales.service');
const salesController = require('../../../src/controllers/sales.controller');

const { sales, salesProductsById1} = require('./mocks/sales.controller.mock');

describe('Controller sales', function () {
  it('lista de', async function () {
    sinon.stub(salesService, 'getSale').resolves({ type: null, message: sales });

    const req = {};

    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.getSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(sales);
  });

  it('id inexistente', async function () {
    sinon.stub(salesService, 'getSaleById').resolves({ type: 404, message: 'Sale not found' });

    const req = { params: 99 };

    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.getSaleById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });

  it('sales pelo id', async function () {
    sinon.stub(salesService, 'getSaleById').resolves({ type: null, message: salesProductsById1 });

    const req = { params: { id: 1 } };

    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.getSaleById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesProductsById1);
  });

  it('inserindo venda', async function () {
    sinon.stub(salesService, 'insertSales').resolves({ type: null, message: { id: 88, itemsSold: sales } });

    const req = { body: { sales } };

    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.insertSale(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith({ id: 88, itemsSold: sales });
  });

  it('inserindo venda 2', async function () {
    sinon.stub(salesService, 'insertSales').resolves({ type: 404, message: 'Product not found' });

    const req = { body: { sales } };

    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.insertSale(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  it('atualiza venda', async function () {
    sinon.stub(salesService, 'updateSale').resolves({ type: null, message: { saleId: 3, itemsUpdated: sales } });

    const req = { body: { sales }, params: { id: 1 } };

    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.updateSale(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({ saleId: 3, itemsUpdated: sales });
  });

  it('erro id invalido  update', async function () {
    sinon.stub(salesService, 'updateSale').resolves({ type: 404, message: 'Sale not found' });

    const req = { params: { id: '9765' } };

    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    await salesController.updateSale(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });

  it('deleta venda', async function () {
    sinon.stub(salesService, 'deleteSale').resolves({ type: null, message: undefined });

    const req = { params: { id: '1' } };

    const res = {};
    res.status = sinon.stub().returns(res);
    res.end = sinon.stub().returns();

    await salesController.deleteSale(req, res);

    expect(res.status).to.have.been.calledWith(204);
    expect(res.end).to.have.been.calledWith();
  });

  it('id invalido no delete', async function () {
    sinon.stub(salesService, 'deleteSale').resolves({ type: 404, message: 'Sale not found' });

    const req = { params: { id: '9765' } };

    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    await salesController.deleteSale(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });

  afterEach(sinon.restore);
});