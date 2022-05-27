const sinon = require('sinon');
const { expect } = require('chai');
const salesServices = require('../../../services/salesServices');
const salesModels = require('../../../models/salesModels');

describe('Todos os produtos', () => {
  beforeEach(() => {
    sinon.stub(salesModels, 'getAll')
      .resolves([
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
      ]);
  });

  afterEach(() => {
    salesModels.getAll.restore();
  });


  it('retorna um array', async () => {
    const response = await salesServices.getAll();

    expect(response).to.be.an('array');
  });

  it('o array não está vazio', async () => {
    const response = await salesServices.getAll();

    expect(response).to.be.not.empty;
  });

  it('o array possui itens do tipo objeto', async () => {
    const [item] = await salesServices.getAll();

    expect(item).to.deep.an('object');
  });

  it('O objto tem as seguintes chaves: "saleId", "date", "productId" e "quantity"', async () => {
    const [item] = await salesServices.getAll();

    expect(item).to.include.all.keys('saleId', 'date', 'productId','quantity')
  });
});

describe('Busca apenas um sales no BD por seu ID', () => {
  beforeEach(async () => {
    sinon.stub(salesModels, 'findById').resolves([[]]);
  })

  afterEach(async () => {
    salesModels.findById.restore();
  })

  describe('quando não existe um produto com o ID informado', () => {
    it('retorna um array', async () => {
      const response = await salesServices.findById();
      expect(response).to.be.a('array');
    });

    // it('retorna um array vazio', async () => {
    //   const response = await salesServices.findById();
    //   expect(response).to.be(null);
    // });
  });

  describe('quando existe um sales com o ID informado', () => {

    beforeEach(() => {
      sinon.stub(salesServices, 'findById')
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
      salesServices.findById.restore();
    })

    it('retorna um objeto', async () => {
      const [response] = await salesServices.findById(1);

      expect(response).to.deep.an('object');
    });

    it('o objeto não está vazio', async () => {
      const response = await salesServices.findById(1);

      expect(response).to.be.not.empty;
    });

    it('Objeto possui as propriedades: "date", "productId" e "quantity"', async () => {
      const item = await salesServices.findById(1);
      expect(item[0]).to.include.all.keys('date', 'productId', 'quantity');
    });

    it('Verifica o tamanho do array', async () => {
      const response = await salesServices.findById(1);
      expect(response).to.have.lengthOf(2);
    })
  });
});
