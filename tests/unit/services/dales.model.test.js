const { expect } = require('chai');
const sinon = require('sinon');

const productModel = require('../../../src/models/product.model');
const salesModel = require('../../../src/models/sales.model');
const salesService = require('../../../src/services/sales.service');

const { sales, salesProductsResult } = require('./mocks/sales.service.mock');

describe('teste sales', function () {
  it('lista das vendas', async function () {
    sinon.stub(salesModel, 'getAllSales').resolves(sales);
    const response = { type: null, message: sales }
    const result = await salesService.getSale();
    expect(result).to.be.deep.equal(response);
  });

  it('recuperar id', async function () {
    sinon.stub(salesModel, 'getSaleById').resolves(salesProductsResult);
    const response = { type: null, message: salesProductsResult }
    const result = await salesService.getSaleById(1);
    expect(result).to.be.deep.equal(response);
  });

  it('recupera erro de id', async function () {
    sinon.stub(productModel, 'getProductById').resolves(undefined);
    const response = { type: 404, message: 'Product not found' };
    const result = await salesService.insertSales(sales);
    expect(result).to.be.deep.equal(response);
  });

  it('nova venda.', async function () {
    sinon.stub(productModel, 'getProductById').resolves(true);
    sinon.stub(salesModel, 'insertSale').resolves(88);
    sinon.stub(salesModel, 'insertProductsSale').resolves();
    const response = {type: null, message: { id: 88, itemsSold: sales }};
    const result = await salesService.insertSales(sales);
    expect(result).to.be.deep.equal(response);
  });

  it('erro id inexistente', async function () {
    sinon.stub(productModel, 'getProductById').resolves(undefined);
    const response = { type: 404, message: 'Product not found' };
    const result = await salesService.updateSale('3', sales);
    expect(result).to.be.deep.equal(response);
  });

  it('atualia com id inexistente', async function () {
    sinon.stub(productModel, 'getProductById').resolves(true);
    sinon.stub(salesModel, 'getSaleById').resolves([]);
    const response = { type: 404, message: 'Sale not found' };
    const result = await salesService.updateSale('9999', sales);
    expect(result).to.be.deep.equal(response);
  });

  it('atualiza venda', async function () {
    sinon.stub(productModel, 'getProductById').resolves(true);
    sinon.stub(salesModel, 'getSaleById').resolves([true]);
    sinon.stub(salesModel, 'updateProductsSale').resolves({ id: 18, productId: 8, quantity: 90 });
    const response = { type: null, message: { saleId: 3, itemsUpdated: sales } };
    const result = await salesService.updateSale('3', sales);
    expect(result).to.be.deep.equal(response);
  });

  it('deleta venda', async function () {
    sinon.stub(salesModel, 'getSaleById').resolves([true]);
    sinon.stub(salesModel, 'deleteSale').resolves();
    const response = { type: null, message: undefined };
    const result = await salesService.deleteSale('3');
    expect(result).to.be.deep.equal(response);
  });

  it('venda de id errado', async function () {
    sinon.stub(salesModel, 'getSaleById').resolves([]);
    sinon.stub(salesModel, 'deleteSale').resolves();
    const response = { type: 404, message: 'Sale not found' };
    const result = await salesService.deleteSale('4894523');
    expect(result).to.be.deep.equal(response);
  });

  afterEach(sinon.restore);
});