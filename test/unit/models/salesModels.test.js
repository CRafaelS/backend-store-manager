const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connections');
const salesModels = require('../../../models/salesModels');

describe('Leitura dos sales', () => {
  beforeEach(() => {
    const result =  [[
      {
        "saleId": 1,
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
      },
      {
        "saleId": 1,
        "date": "2021-09-09T04:54:54.000Z",
        "productId": 2,
        "quantity": 2
      }
    ]]
  sinon.stub(connection, 'execute').resolves(result)
  })

  afterEach(()=> {
    connection.execute.restore();
  })

  it('retorna um array', async () => {
    const responseBD = await salesModels.getAll();
    expect(responseBD).to.be.a('array');
  })

  it('o array não esta vazio', async () => {
    const responseBD = await salesModels.getAll();
    expect(responseBD).to.be.not.empty;
  })

  it('é um array de objeto', async () => {
    const [response] = await salesModels.getAll();
    expect(response).to.deep.a('object');
  })

  it('Verifica o tamanho do array', async () => {
    const responseBD = await salesModels.getAll();
    expect(responseBD).to.have.lengthOf(2);;
  })
});
