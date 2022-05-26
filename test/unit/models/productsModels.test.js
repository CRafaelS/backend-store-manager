const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connections');
const productsModels = require('../../../models/productsModels');

describe('Leitura dos produtos', () => {
  beforeEach(() => {
    const result =  [[
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
    ]]
  sinon.stub(connection, 'execute').resolves(result)
  })

  afterEach(()=> {
    connection.execute.restore();
  })

  it('retorna um array', async () => {
    const responseBD = await productsModels.getAll();
    expect(responseBD).to.be.a('array');
  })

  it('o array não esta vazio', async () => {
    const responseBD = await productsModels.getAll();
    expect(responseBD).to.be.not.empty;
  })

  it('é um array de objeto', async () => {
    const [response] = await productsModels.getAll();
    expect(response).to.deep.a('object');
  })
})
