const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/db/connections');
const productModel = require('../../../src/models/product.model');

const { productModelMock, productSearchByName } = require('./mocks/product.model.mock');

describe('models prodctus', function () {
  it('lista de produtos', async function () {
    sinon.stub(connection, 'execute').resolves([productModelMock]);
    const result = await productModel.getAllProducts();
    expect(result).to.be.deep.equal(productModelMock);
  });

  it('produto por id', async function () {
    sinon.stub(connection, 'execute').resolves([[productModelMock]]);
    const result = await productModel.getProductById(1);
    expect(result).to.be.deep.equal(productModelMock);
  });

  it('produto pornome/query', async function () {
    sinon.stub(connection, 'execute').resolves([productSearchByName]);
    const result = await productModel.getProductByName('Martelo');
    expect(result).to.be.deep.equal(productSearchByName);
  });

  it('retorno de id', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 42 }]);
    const result = await productModel.insertProduct('Novo Produto');
    expect(result).to.be.deep.equal({id: 42, name: "Novo Produto"});
  });

  it('retorna produto com mesmo id', async function () {
    sinon.stub(connection, 'execute')
      .resolves([productModelMock]).onCall(1)
      .resolves().onCall(2);
    const result = await productModel.updateProduct(1, 'Novo Produto Atualizado');
    expect(result).to.be.deep.equal({ id: 1, name: "Novo Produto Atualizado" });
  });

  it('delete com id', async function () {
    sinon.stub(connection, 'execute')
      .resolves([{ changedRows: 1 }]);
    const result = await productModel.deleteProduct(1);
    expect(result).to.be.deep.equal(1);
  });

  afterEach(sinon.restore);
});