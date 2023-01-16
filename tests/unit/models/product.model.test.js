const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/database/connections');
const productModel = require('../../../src/models/product.model');

const { productModelMock, productSearchByName } = require('./mocks/product.model.mock');

describe('Teste Models', function () {
  it('Recuperar produtos', async function () {
    sinon.stub(connection, 'execute').resolves([productModelMock]);
    const result = await productModel.getAllProducts();
    expect(result).to.be.deep.equal(productModelMock);
  });

  it('Recuperar ID', async function () {
    sinon.stub(connection, 'execute').resolves([[productModelMock]]);
    const result = await productModel.getProductById(1);
    expect(result).to.be.deep.equal(productModelMock);
  });

  it('Recuperar nome', async function () {
    sinon.stub(connection, 'execute').resolves([productSearchByName]);
    const result = await productModel.getProductByName('Martelo');
    expect(result).to.be.deep.equal(productSearchByName);
  });

  it('re torno da ID com produto', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 42 }]);
    const result = await productModel.insertProduct('Novo Produto');
    expect(result).to.be.deep.equal({id: 42, name: "Novo Produto"});
  });

  it('retorno da ID com update', async function () {
    sinon.stub(connection, 'execute')
      .resolves([productModelMock]).onCall(1)
      .resolves().onCall(2);
    const result = await productModel.updateProduct(1, 'Novo Produto Atualizado');
    expect(result).to.be.deep.equal({ id: 1, name: "Novo Produto Atualizado" });
  });

  it('Deleta ID', async function () {
    sinon.stub(connection, 'execute')
      .resolves([{ changedRows: 1 }]);
    const result = await productModel.deleteProduct(1);
    expect(result).to.be.deep.equal(1);
  });

  afterEach(sinon.restore);
});