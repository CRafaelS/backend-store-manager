const sinon = require('sinon');
const { expect } = require('chai');
const productsServices = require('../../../services/productsServices');
const productsModels = require('../../../models/productsModels');

describe('Todos os produtos', () => {
  beforeEach(() => {
    sinon.stub(productsModels, 'getAll')
      .resolves([
        {
          "id": 1,
          "name": "produto A",
          "quantity": 10
        },
        {
          "id": 2,
          "name": "produto B",
          "quantity": 20
        }
      ]);
  });

  afterEach(() => {
    productsModels.getAll.restore();
  });


  it('retorna um array', async () => {
    const response = await productsServices.getAll();

    expect(response).to.be.an('array');
  });

  it('o array não está vazio', async () => {
    const response = await productsServices.getAll();

    expect(response).to.be.not.empty;
  });

  it('o array possui itens do tipo objeto', async () => {
    const [item] = await productsServices.getAll();

    expect(item).to.deep.an('object');
  });

  it('O objto tem as seguintes chaves: "id", "name", "quantity"', async () => {
    const [item] = await productsServices.getAll();

    expect(item).to.include.all.keys('id', 'name', 'quantity')
  });
});
