const sinon = require('sinon');
const { expect } = require('chai');
const productsServices = require('../../../services/productsServices');
const productsControllers = require('../../../controllers/productsControllers');

describe('Todos os dados de produtos', async () => {
  const response = {};
  const request = {};

  beforeEach(() => {
    request.body = {};

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    sinon.stub(productsServices, 'getAll')
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
  })

  afterEach(() => {
    productsServices.getAll.restore();
  });

  it('é chamado o método "status" passando o código 200', async () => {
    await productsControllers.getAll(request, response);

    expect(response.status.calledWith(200)).to.be.equal(true);
  });

  it('é chamado o método "json" passando um array', async () => {
    await productsControllers.getAll(request, response);

    expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
  });
});