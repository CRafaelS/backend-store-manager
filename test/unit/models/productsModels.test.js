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

  it('Verifica o tamanho do array', async () => {
    const responseBD = await productsModels.getAll();
    expect(responseBD).to.have.lengthOf(2);
  })
});

describe('Busca apenas um produto no BD por seu ID', () => {
  beforeEach(async () => {
    const execute = [[]];

    sinon.stub(connection, 'execute').resolves(execute);
  })

  afterEach(async () => {
    connection.execute.restore();
  })

  describe('quando não existe um produto com o ID informado', () => {
    it('retorna um array', async () => {
      const response = await productsModels.findById();
      expect(response).to.be.a('array');
    });

    it('retorna um array vazio', async () => {
      const response = await productsModels.findById();
      expect(response).to.be.empty;
    });
  });

  describe('quando existe um produto com o ID informado', () => {

    beforeEach(() => {
      sinon.stub(productsModels, 'findById')
        .resolves(
          {
            "id": 1,
            "name": "produto A",
            "quantity": 10
          }
        );
    });

    afterEach(() => {
      productsModels.findById.restore();
    })

    it('retorna um objeto', async () => {
      const response = await productsModels.findById(1);

      expect(response).to.deep.an('object');
    });

    it('o objeto não está vazio', async () => {
      const response = await productsModels.findById(1);

      expect(response).to.be.not.empty;
    });

    it('tal objeto possui as propriedades: "id", "name" e "quantity"', async () => {
      const item = await productsModels.findById(1);

      expect(item).to.include.all.keys('id', 'name', 'quantity');
    });
  });
});
