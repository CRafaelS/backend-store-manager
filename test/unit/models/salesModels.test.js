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

describe('Busca apenas um sales no BD por seu ID', () => {
  beforeEach(async () => {
    const execute = [[]];

    sinon.stub(connection, 'execute').resolves(execute);
  })

  afterEach(async () => {
    connection.execute.restore();
  })

  describe('quando não existe um produto com o ID informado', () => {
    it('retorna um array', async () => {
      const response = await salesModels.findById();
      expect(response).to.be.a('array');
    });

    it('retorna um array vazio', async () => {
      const response = await salesModels.findById();
      expect(response).to.be.empty;
    });
  });

  describe('quando existe um sales com o ID informado', () => {

    beforeEach(() => {
      sinon.stub(salesModels, 'findById')
        .resolves(
          [
            {
              "date": "2021-09-09T04:54:29.000Z",
              "productId": 1,
              "quantity": 2
            },
            {
              "date": "2021-09-09T04:54:54.000Z",
              "productId": 2,
              "quantity": 2
            }
          ]
        );
    });

    afterEach(() => {
      salesModels.findById.restore();
    })

    it('retorna um objeto', async () => {
      const [response] = await salesModels.findById(1);

      expect(response).to.deep.an('object');
    });

    it('o objeto não está vazio', async () => {
      const response = await salesModels.findById(1);

      expect(response).to.be.not.empty;
    });

    it('Objeto possui as propriedades: "date", "productId" e "quantity"', async () => {
      const item = await salesModels.findById(1);
      expect(item[0]).to.include.all.keys('date', 'productId', 'quantity');
    });

    it('Verifica o tamanho do array', async () => {
      const response = await salesModels.findById(1);
      expect(response).to.have.lengthOf(2);
    })
  });
});
