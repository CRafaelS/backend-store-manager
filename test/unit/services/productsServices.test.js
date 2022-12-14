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

  it('O objto tem as seguintes chaves: "id", "name" e "quantity"', async () => {
    const [item] = await productsServices.getAll();

    expect(item).to.include.all.keys('id', 'name', 'quantity')
  });
});

describe('Busca apenas um produto no BD por seu ID', () => {
  beforeEach(async () => {
    sinon.stub(productsModels, 'findById').resolves([]);
  })

  afterEach(async () => {
    productsModels.findById.restore();
  })

  describe('quando não existe um produto com o ID informado', () => {
    it('o retorno é um boolean', async () => {
      const response = await productsServices.findById(1);

      expect(response).to.be.a('boolean');
    });

    it('o retorno é um boolean', async () => {
      const response = await productsServices.findById(1);

      expect(response).to.be.false;
    });
  });
});

describe('quando existe um produto com o ID informado', () => {

  beforeEach(() => {
    sinon.stub(productsModels, 'findById')
      .resolves(
        [{
          id: 1,
          name: "produto A",
          quantity: 10
        }]
      );
  });

  afterEach(() => {
    productsModels.findById.restore();
  })

  it('retorna um objeto', async () => {
    const response = await productsServices.findById(1);

    expect(response).to.deep.an('object');
  });

  it('o objeto não está vazio', async () => {
    const response = await productsServices.findById(1);

    expect(response).to.be.not.empty;
  });

  it('tal objeto possui as propriedades: "id", "name" e "quantity"', async () => {
    const item = await productsServices.findById(1);

    expect(item).to.include.all.keys('id', 'name', 'quantity');
  });
});

describe('Cria um produto novo', () => {

  beforeEach(() => {
    sinon.stub(productsModels, 'create')
      .resolves(
        { "id": 1, "name": "produto", "quantity": 10 }
      );
  });

  afterEach(() => {
    productsModels.create.restore();
  })

  it('retorna um objeto', async () => {
    const response = await productsServices.create({ "name": "produto", "quantity": 10 });

    expect(response).to.deep.an('object');
  });

  it('o objeto não está vazio', async () => {
    const response = await productsServices.create({ "name": "produto", "quantity": 10 });

    expect(response).to.be.not.empty;
  });

  it('tal objeto possui as propriedades: "id", "name" e "quantity"', async () => {
    const item = await productsServices.create({ "name": "produto", "quantity": 10 });

    expect(item).to.include.all.keys('id', 'name', 'quantity');
  });
});