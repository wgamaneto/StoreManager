const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/db/connections');
const salesModel = require('../../../src/models/sales.model');

const { sales, salesProductsById1, salesProductsResult } = require('./mocks/sales.model.mock');

describe('Testes de unidade do model de sales', function () {
  it('Recupera a lista de vendas', async function () {
    sinon.stub(connection, 'execute').resolves([sales]);
    const result = await salesModel.getAllSales();
    expect(result).to.be.deep.equal(sales);
  });

  it('Recupera produtos pelo Id da venda', async function () {
    sinon.stub(connection, 'execute').resolves([salesProductsById1]);
    const result = await salesModel.getSaleById(1);
    expect(result).to.be.deep.equal(salesProductsResult);
  });

  it('Registra uma venda e retorna o ID', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 42 }]);
    const result = await salesModel.insertSale();
    expect(result).to.be.deep.equal(42);
  });

  it('Registra um produto em uma venda', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 42 }]);
    const { productId, quantity } = salesProductsResult[0];
    const result = await salesModel.insertProductsSale(18, {productId, quantity} );
    expect(result).to.be.deep.equal({ id: 18, productId, quantity });
  });

  it('Atualiza produtos de uma venda', async function () {
    sinon.stub(connection, 'execute').resolves();
    const { productId } = salesProductsResult[0];
    const result = await salesModel.updateProductsSale(18, { productId, quantity: 90 });
    expect(result).to.be.deep.equal({ id: 18, productId, quantity: 90 });
  });

  it('Deleta a venda e seus produtos', async function () {
    sinon.stub(connection, 'execute').resolves();
    const result = await salesModel.deleteSale(18);
    expect(result).to.be.deep.equal();
  });

  afterEach(sinon.restore);
});